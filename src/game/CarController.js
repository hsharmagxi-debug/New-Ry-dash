import * as THREE from 'three';

// Arcade-style car controller: velocity/steering-based (not full rigid-body physics),
// tuned for responsive, drift-capable handling — the same approach used by most
// browser/console arcade racers (NFS/Arcade-style, not sim-grade).
export class CarController {
  constructor({ carRig, statDef, isAI = false }) {
    this.rig = carRig; // { group, wheels, headlights, taillights, underGlow }
    this.stat = statDef;
    this.isAI = isAI;

    this.position = new THREE.Vector3();
    this.heading = 0; // radians
    this.speed = 0; // world units / s
    this.steerInput = 0; // -1..1
    this.throttleInput = 0; // -1..1 (reverse negative)
    this.handbrake = false;
    this.nitroActive = false;
    this.nitro = 1; // 0..1
    this.driftFactor = 0; // visual slip amount
    this.wheelSpin = 0;

    this.maxSpeed = 46 + this.stat.topSpeed * 40; // world units/s
    this.accelRate = 14 + this.stat.accel * 22;
    this.brakeRate = 40;
    this.turnRate = 1.7 + this.stat.handling * 1.4;
    this.grip = 0.86 + this.stat.handling * 0.12;

    this.lap = 1;
    this.nextCP = 1; // next checkpoint index the race loop expects this car to cross
    this.trackT = 0; // progress 0..1 along curve (approx, for lap/AI/position tracking)
    this.finished = false;
    this.raceTimeMs = 0;

    // Ramp/jump state — position.y is 0 (ground) unless airborne.
    this.airborne = false;
    this.verticalVelocity = 0;
    this.groundY = 0;
    this.justLanded = false; // one-frame flag the caller consumes to trigger a landing effect
  }

  // Launches the car into the air with the given upward + forward-boost speed (world units/s).
  // Called externally when the car crosses a ramp trigger zone at sufficient speed.
  launch(verticalSpeed, forwardBoost = 0) {
    if (this.airborne) return;
    this.airborne = true;
    this.verticalVelocity = verticalSpeed;
    this.speed += forwardBoost;
  }

  setStartTransform(pos, headingRad) {
    this.position.copy(pos);
    this.heading = headingRad;
    this.rig.group.position.copy(pos);
    this.rig.group.rotation.y = headingRad;
  }

  applyPlayerInput(input, dt) {
    this.throttleInput = input.throttle;
    this.steerInput = input.steer;
    this.handbrake = input.handbrake;
    this.nitroActive = input.nitro && this.nitro > 0.02;
  }

  step(dt) {
    // Nitro
    if (this.nitroActive) {
      this.nitro = Math.max(0, this.nitro - dt * 0.55);
    } else {
      this.nitro = Math.min(1, this.nitro + dt * 0.12);
    }
    const nitroBoost = this.nitroActive ? 1.55 : 1;
    const targetMax = this.maxSpeed * nitroBoost;

    // Throttle / brake
    if (this.throttleInput > 0) {
      this.speed += this.accelRate * nitroBoost * dt * this.throttleInput;
    } else if (this.throttleInput < 0) {
      if (this.speed > 0.5) this.speed -= this.brakeRate * dt;
      else this.speed += this.accelRate * 0.5 * dt * this.throttleInput;
    } else {
      // engine braking / friction
      this.speed -= Math.sign(this.speed) * 6 * dt;
      if (Math.abs(this.speed) < 0.3) this.speed = 0;
    }
    if (this.handbrake) {
      this.speed -= Math.sign(this.speed) * 24 * dt;
    }
    this.speed = THREE.MathUtils.clamp(this.speed, -this.maxSpeed * 0.4, targetMax);

    // Steering — responsive arcade handling
const speedFactor = THREE.MathUtils.clamp(
  Math.abs(this.speed) / this.maxSpeed,
  0.12,
  1
);

const steerAmount =
  this.steerInput *
  this.turnRate *
  speedFactor *
  dt *
  (this.speed < 0 ? -1 : 1);

// Normal steering.
// Handbrake gives only a modest steering boost.
this.heading += steerAmount * (this.handbrake ? 1.25 : 1);

// Drift factor — mainly visual, with controlled sideways movement.
const targetDrift = this.handbrake
  ? THREE.MathUtils.clamp(
      Math.abs(this.steerInput) * 0.65 + 0.08,
      0,
      0.8
    )
  : 0;

this.driftFactor +=
  (targetDrift - this.driftFactor) *
  Math.min(1, dt * 6);

// Move forward along heading.
const forward = new THREE.Vector3(
  Math.sin(this.heading),
  0,
  Math.cos(this.heading)
);

const right = new THREE.Vector3(
  Math.cos(this.heading),
  0,
  -Math.sin(this.heading)
);

// Smaller sideways drift = easier control.
const slip = this.handbrake
  ? this.steerInput * this.driftFactor * 3
  : 0;

this.position.addScaledVector(forward, this.speed * dt);
this.position.addScaledVector(right, slip * dt);

    // Gravity / airborne — engaged only after launch() is called (ramp jumps).
    this.justLanded = false;
    if (this.airborne) {
      const GRAVITY = 55; // units/s^2, tuned for a satisfying ~0.8-1.2s hang time off ramps
      this.verticalVelocity -= GRAVITY * dt;
      this.position.y += this.verticalVelocity * dt;
      if (this.position.y <= this.groundY) {
        this.position.y = this.groundY;
        this.airborne = false;
        this.verticalVelocity = 0;
        this.justLanded = true;
      }
    } else {
      this.position.y = this.groundY;
    }

    // Wheel spin visual
    this.wheelSpin += (this.speed / 0.36) * dt;

    // Apply to rig
    this.rig.group.position.copy(this.position);
    const leanTarget = -this.steerInput * 0.05 * speedFactor;
    this.rig.group.rotation.z += (leanTarget - this.rig.group.rotation.z) * Math.min(1, dt * 5);
    this.rig.group.rotation.y = this.heading - this.driftFactor * this.steerInput * 0.5;
    const pitchTarget = this.airborne ? THREE.MathUtils.clamp(this.verticalVelocity * 0.02, -0.35, 0.25) : 0;
    this.rig.group.rotation.x += (pitchTarget - this.rig.group.rotation.x) * Math.min(1, dt * 4);

    // wheel rotation + steer angle on front wheels
    [this.rig.wheels.fl, this.rig.wheels.fr].forEach((w) => {
      w.rotation.y = this.steerInput * 0.5;
    });
    Object.values(this.rig.wheels).forEach((w) => {
      w.children[0].rotation.x = this.wheelSpin;
    });

    // underglow pulse with nitro
    if (this.rig.underGlow) {
      this.rig.underGlow.intensity = this.nitroActive ? 1.6 : 0.6;
    }
  }

  get speedKmh() {
    return Math.abs(this.speed) * 3.2; // scaled for arcade "feel"
  }
}

// Simple AI: follows the track curve at a target T-offset with basic rubber-banding.
export class AIDriver {
  constructor(controller, curve, tOffset, skill = 0.85) {
    this.controller = controller;
    this.curve = curve;
    this.t = tOffset;
    this.skill = skill;
  }

  step(dt) {
    const speed = 0.02 * this.skill * (0.7 + Math.random() * 0.05);
    this.t = (this.t + speed * dt) % 1;
    const point = this.curve.getPointAt(this.t);
    const target = new THREE.Vector3(point.x, 0, point.z);
    const toTarget = target.clone().sub(this.controller.position);
    const dist = toTarget.length();
    const desiredHeading = Math.atan2(toTarget.x, toTarget.z);
    let diff = desiredHeading - this.controller.heading;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    this.controller.applyPlayerInput({
      throttle: THREE.MathUtils.clamp(dist * 0.4, 0.35, 1) * this.skill,
      steer: THREE.MathUtils.clamp(diff * 1.4, -1, 1),
      handbrake: Math.abs(diff) > 0.9,
      nitro: Math.random() > 0.985,
    }, dt);
  }
}
