/**
 * CraftSimulationInterface.js
 *
 * PORTABLE GAME-DOMAIN CONTRACT (Category A, per AI/MASTER-CONSTITUTION.md §8).
 *
 * This is the web-substitution analog of the constitution's mandatory
 * "Vehicle Simulation Interface" (§9 / §11 of the execution prompt).
 * UE5 is not available on this workstation (storage-constrained), so the
 * physics/render/engine layers underneath this contract are implemented
 * with Three.js + a custom force model instead of Chaos Vehicles — but
 * gameplay code depends ONLY on this interface, never on the renderer or
 * physics library directly. That boundary is what keeps a future engine
 * swap (a native/UE6 build, a different web physics engine, etc.) from
 * requiring a rewrite of gameplay logic.
 *
 *   Gameplay Systems
 *         v
 *   CraftSimulationInterface   <-- this file
 *         v
 *   Genesis Physics Layer      (src/physics/GenesisForceModel.js)
 *         v
 *   Physics Adapter            (src/physics/PhysicsAdapter.js)
 *         v
 *   Custom Force Implementation  (today)
 *   / Alternative Implementation (future)
 */

/**
 * @typedef {Object} CraftInput
 * @property {number} throttle   -1..1 (negative = reverse thrust)
 * @property {number} brake      0..1
 * @property {number} steering  -1..1
 * @property {boolean} boost
 * @property {boolean} handbrakeYaw  sharp-yaw assist, analog to handbrake
 */

/**
 * @typedef {Object} CraftState
 * @property {[number,number,number]} position
 * @property {[number,number,number]} worldVelocity
 * @property {[number,number,number]} localVelocity
 * @property {[number,number,number]} acceleration
 * @property {number} yaw
 * @property {number} yawRate
 * @property {number} pitch
 * @property {number} roll
 * @property {boolean} grounded        contact with the proving-ground surface
 * @property {number} suspensionTravel 0..1, hover-suspension compression proxy
 * @property {number} slip             0..1 lateral slip magnitude
 * @property {number} boostEnergy      0..1
 * @property {boolean} airborne
 */

/**
 * @typedef {Object} CraftTelemetry
 * @property {number} speedMs
 * @property {number} speedKmh
 * @property {number} forwardSpeedMs
 * @property {number} lateralSpeedMs
 * @property {number} longitudinalG
 * @property {number} lateralG
 * @property {number} verticalG
 * @property {string} speedBand   one of SPEED_BANDS keys
 */

export const SPEED_BANDS = /** @type {const} */ ([
  { id: 'sb-080', label: '80 km/h', kmh: 80 },
  { id: 'sb-150', label: '150 km/h', kmh: 150 },
  { id: 'sb-250', label: '250 km/h', kmh: 250 },
  { id: 'sb-400', label: '400 km/h', kmh: 400 },
  { id: 'sb-600', label: '600 km/h', kmh: 600 },
  { id: 'sb-900', label: '900 km/h', kmh: 900 },
]);

/**
 * Classify a km/h reading into the nearest-below speed band, per
 * MASTER-CONSTITUTION.md §28 (Six Speed-Band Tests).
 * @param {number} kmh
 * @returns {string} speed band id
 */
export function classifySpeedBand(kmh) {
  let current = SPEED_BANDS[0].id;
  for (const band of SPEED_BANDS) {
    if (kmh >= band.kmh) current = band.id;
  }
  return current;
}

/**
 * Contract every physics adapter (Candidate A/B/C, per §13 of the execution
 * prompt) must satisfy. This is intentionally minimal for Genesis scope —
 * expand only when an experiment demonstrates the need (constitution §11).
 */
export class CraftSimulationInterface {
  /** @param {CraftInput} _input */
  setInput(_input) {
    throw new Error('CraftSimulationInterface.setInput not implemented');
  }

  /** @param {number} _dtSeconds */
  step(_dtSeconds) {
    throw new Error('CraftSimulationInterface.step not implemented');
  }

  /** @returns {CraftState} */
  getState() {
    throw new Error('CraftSimulationInterface.getState not implemented');
  }

  /** @returns {CraftTelemetry} */
  getTelemetry() {
    throw new Error('CraftSimulationInterface.getTelemetry not implemented');
  }

  reset(_position = [0, 0, 0], _yaw = 0) {
    throw new Error('CraftSimulationInterface.reset not implemented');
  }
}
