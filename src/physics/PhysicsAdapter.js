/**
 * PhysicsAdapter.js
 *
 * CANDIDATE A — "Genesis Arcade Force Model"
 *
 * One of the three required physics candidates (constitution §13 / execution
 * prompt §13). This is the physics implementation living BEHIND the
 * CraftSimulationInterface — gameplay/render code never touches this file's
 * internals directly.
 *
 * Design intent for Candidate A: a low-cost, numerically stable force model
 * that stays controllable across the full 80-900 km/h Genesis range without
 * per-speed-band special-casing hacks. Candidates B (a heavier tire/aero
 * force stack) and C (a hybrid physical+assist model) are tracked as future
 * work in AI/ADR/ADR-001-Craft-Physics-Architecture.md — do not treat this
 * as the winning architecture until the three are benchmarked per
 * Benchmarks/Genesis/.
 *
 * Status: IMPLEMENTED, AUTOMATED-TESTED (tests/simulation.test.mjs).
 * Not yet: SIX-SPEED-BAND TESTED, PROFILED, INDEPENDENTLY REVIEWED, PLAYTESTED.
 */

import { CraftSimulationInterface, classifySpeedBand } from '../domain/CraftSimulationInterface.js';

const GRAVITY = 9.81;
const HOVER_HEIGHT = 0.9;

export class PhysicsAdapter extends CraftSimulationInterface {
  /**
   * @param {object} [params]
   * @param {number} [params.maxThrustAccel] m/s^2 at throttle=1, no drag/boost
   * @param {number} [params.brakeDecel] m/s^2
   * @param {number} [params.dragCoefficient] quadratic drag term
   * @param {number} [params.turnRateBase] rad/s at low speed, steering=1
   * @param {number} [params.turnRateHighSpeedFloor] rad/s minimum retained at 900 km/h
   * @param {number} [params.boostAccel] extra m/s^2 while boosting
   * @param {number} [params.boostDrainPerSecond]
   * @param {number} [params.boostRegenPerSecond]
   */
  constructor(params = {}) {
    super();
    this.p = {
      maxThrustAccel: 26,
      brakeDecel: 34,
      dragCoefficient: 0.0068,
      turnRateBase: 2.6,
      turnRateHighSpeedFloor: 0.35,
      boostAccel: 18,
      boostDrainPerSecond: 0.5,
      boostRegenPerSecond: 0.12,
      ...params,
    };
    this.reset();
  }

  reset(position = [0, 0, HOVER_HEIGHT], yaw = 0) {
    this._pos = [...position];
    this._vel = [0, 0, 0];
    this._prevSpeedMs = 0;
    this._yaw = yaw;
    this._yawRate = 0;
    this._pitch = 0;
    this._roll = 0;
    this._boostEnergy = 1;
    this._grounded = true;
    this._airborne = false;
    this._slip = 0;
    this._lastLocalVel = [0, 0, 0];
    this._input = { throttle: 0, brake: 0, steering: 0, boost: false, handbrakeYaw: false };
    this._lastAccel = [0, 0, 0];
  }

  setInput(input) {
    this._input = {
      throttle: clamp(input.throttle ?? 0, -1, 1),
      brake: clamp(input.brake ?? 0, 0, 1),
      steering: clamp(input.steering ?? 0, -1, 1),
      boost: Boolean(input.boost),
      handbrakeYaw: Boolean(input.handbrakeYaw),
    };
  }

  step(dt) {
    if (!Number.isFinite(dt) || dt <= 0) return;
    dt = Math.min(dt, 1 / 15); // clamp huge stalls so the sim never explodes

    const { throttle, brake, steering, boost, handbrakeYaw } = this._input;
    const forwardX = Math.sin(this._yaw);
    const forwardZ = Math.cos(this._yaw);

    const speedMs = Math.hypot(this._vel[0], this._vel[2]);
    const forwardSign = Math.sign(this._vel[0] * forwardX + this._vel[2] * forwardZ) || 1;

    // --- Longitudinal force ---
    let longAccel = 0;
    if (throttle !== 0) longAccel += throttle * this.p.maxThrustAccel;
    if (boost && this._boostEnergy > 0 && throttle > 0) {
      longAccel += this.p.boostAccel;
      this._boostEnergy = clamp(this._boostEnergy - this.p.boostDrainPerSecond * dt, 0, 1);
    } else {
      this._boostEnergy = clamp(this._boostEnergy + this.p.boostRegenPerSecond * dt, 0, 1);
    }
    if (brake > 0) longAccel -= forwardSign * brake * this.p.brakeDecel;

    // Quadratic aero drag opposes velocity — this is what makes 900 km/h
    // reachable but not free, and what gives high-speed stability instead
    // of unbounded acceleration.
    const dragAccel = this.p.dragCoefficient * speedMs * speedMs;
    longAccel -= Math.sign(this._vel[0] * forwardX + this._vel[2] * forwardZ || 1) * dragAccel;

    // --- Turn authority shrinks with speed (not a hard mode switch — a
    // continuous curve, per constitution §30 "transition quality"). ---
    const speedFrac = clamp(speedMs / 250, 0, 1); // 250 m/s ~= 900 km/h
    const turnRate = lerp(this.p.turnRateBase, this.p.turnRateHighSpeedFloor, speedFrac);
    const yawInput = steering * turnRate * (handbrakeYaw ? 1.6 : 1);
    this._yawRate = lerp(this._yawRate, yawInput, clamp(dt * 8, 0, 1));
    this._yaw += this._yawRate * dt;

    // --- Integrate velocity along the (now-rotated) forward axis ---
    const fX = Math.sin(this._yaw);
    const fZ = Math.cos(this._yaw);
    let newSpeed = speedMs + longAccel * dt;
    newSpeed = Math.max(newSpeed, -0.35 * (this.p.maxThrustAccel)); // small reverse cap

    this._vel[0] = fX * newSpeed;
    this._vel[2] = fZ * newSpeed;

    // Lateral slip proxy: how much velocity direction lags the facing
    // direction under a hard turn at speed — used by telemetry + camera.
    const velYaw = Math.atan2(this._vel[0], this._vel[2]);
    let slipAngle = angleDelta(velYaw, this._yaw);
    this._slip = clamp(Math.abs(slipAngle) / (Math.PI / 4), 0, 1);

    // --- Position integration ---
    this._pos[0] += this._vel[0] * dt;
    this._pos[2] += this._vel[2] * dt;

    // --- Simple hover suspension: settle toward hover height, react to dt ---
    const targetY = HOVER_HEIGHT;
    this._pos[1] = lerp(this._pos[1], targetY, clamp(dt * 10, 0, 1));
    this._grounded = Math.abs(this._pos[1] - targetY) < 0.05;
    this._airborne = !this._grounded;

    // Pitch/roll cosmetic feedback from accel/turn (readability, not force)
    const accel = (newSpeed - this._prevSpeedMs) / dt;
    this._pitch = lerp(this._pitch, clamp(-accel / 40, -0.12, 0.12), clamp(dt * 6, 0, 1));
    this._roll = lerp(this._roll, clamp(-this._yawRate / turnRate, -1, 1) * 0.18, clamp(dt * 6, 0, 1));

    this._lastAccel = [
      (fX * newSpeed - this._vel[0]) / dt || 0,
      0,
      accel,
    ];
    this._prevSpeedMs = newSpeed;

    assertFinite(this._pos, 'position');
    assertFinite(this._vel, 'velocity');
  }

  getState() {
    return {
      position: [...this._pos],
      worldVelocity: [...this._vel],
      localVelocity: this._toLocal(this._vel),
      acceleration: [...this._lastAccel],
      yaw: this._yaw,
      yawRate: this._yawRate,
      pitch: this._pitch,
      roll: this._roll,
      grounded: this._grounded,
      suspensionTravel: clamp(1 - Math.abs(this._pos[1] - HOVER_HEIGHT) / HOVER_HEIGHT, 0, 1),
      slip: this._slip,
      boostEnergy: this._boostEnergy,
      airborne: this._airborne,
    };
  }

  getTelemetry() {
    const speedMs = Math.hypot(this._vel[0], this._vel[2]);
    const local = this._toLocal(this._vel);
    const g = this._lastAccel.map((a) => a / GRAVITY);
    return {
      speedMs,
      speedKmh: speedMs * 3.6,
      forwardSpeedMs: local[2],
      lateralSpeedMs: local[0],
      longitudinalG: g[2] || 0,
      lateralG: g[0] || 0,
      verticalG: g[1] || 0,
      speedBand: classifySpeedBand(speedMs * 3.6),
    };
  }

  _toLocal(worldVec) {
    const s = Math.sin(-this._yaw);
    const c = Math.cos(-this._yaw);
    return [worldVec[0] * c - worldVec[2] * s, worldVec[1], worldVec[0] * s + worldVec[2] * c];
  }
}

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function angleDelta(a, b) {
  let d = a - b;
  while (d > Math.PI) d -= Math.PI * 2;
  while (d < -Math.PI) d += Math.PI * 2;
  return d;
}
function assertFinite(vec, label) {
  for (const v of vec) {
    if (!Number.isFinite(v)) throw new Error(`PhysicsAdapter produced non-finite ${label}: ${vec}`);
  }
}
