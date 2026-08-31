/**
 * ChaseCamera.js
 *
 * CAMERA CANDIDATE A — "Physics-Following Spring Chase"
 *
 * Per constitution §32/execution prompt §21, camera is a foundational
 * system, not a cosmetic afterthought, and Genesis must evaluate multiple
 * camera candidates. This is Candidate A: a damped spring that follows
 * behind the craft with speed-reactive FOV and distance. Candidates B
 * (velocity-predictive) and C (hybrid trajectory-aware) are tracked in
 * AI/ADR/ADR-002-Camera-Architecture.md as future benchmarked work — do
 * not treat Candidate A as final.
 */
import * as THREE from 'three';

const BASE_FOV = 62;
const MAX_FOV_BONUS = 22; // reached near 900 km/h
const BASE_DISTANCE = 8;
const MAX_DISTANCE_BONUS = 5;
const BASE_HEIGHT = 3.2;

export class ChaseCamera {
  constructor(camera) {
    this.camera = camera;
    this._pos = new THREE.Vector3();
    this._lookAt = new THREE.Vector3();
    this._shake = 0;
  }

  addShake(amount) {
    this._shake = Math.min(1, this._shake + amount);
  }

  /**
   * @param {import('../domain/CraftSimulationInterface.js').CraftState} state
   * @param {import('../domain/CraftSimulationInterface.js').CraftTelemetry} telemetry
   * @param {number} dt
   */
  update(state, telemetry, dt) {
    const speedFrac = Math.min(1, telemetry.speedKmh / 900);
    const targetFov = BASE_FOV + speedFrac * MAX_FOV_BONUS;
    const targetDistance = BASE_DISTANCE + speedFrac * MAX_DISTANCE_BONUS;

    const yaw = state.yaw;
    const behind = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw)).multiplyScalar(targetDistance);
    const desired = new THREE.Vector3(state.position[0], state.position[1] + BASE_HEIGHT, state.position[2]).add(behind);

    // Damped follow — heavier damping at low speed (parking precision),
    // lighter/snappier at high speed (readability under fast direction change).
    const followLerp = 1 - Math.exp(-dt * (4 + speedFrac * 4));
    this._pos.lerp(desired, followLerp);

    const lookTarget = new THREE.Vector3(
      state.position[0] + Math.sin(yaw) * 6,
      state.position[1] + 1.2,
      state.position[2] + Math.cos(yaw) * 6
    );
    this._lookAt.lerp(lookTarget, 1 - Math.exp(-dt * 10));

    this._shake *= Math.max(0, 1 - dt * 6);
    const shakeOffset = this._shake > 0.001
      ? new THREE.Vector3((Math.random() - 0.5) * this._shake * 0.4, (Math.random() - 0.5) * this._shake * 0.4, 0)
      : null;

    this.camera.position.copy(this._pos);
    if (shakeOffset) this.camera.position.add(shakeOffset);
    this.camera.lookAt(this._lookAt);
    this.camera.fov = THREE.MathUtils.lerp(this.camera.fov, targetFov, 1 - Math.exp(-dt * 5));
    this.camera.updateProjectionMatrix();
  }
}
