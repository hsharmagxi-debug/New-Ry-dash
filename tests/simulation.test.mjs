import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PhysicsAdapter } from '../src/physics/PhysicsAdapter.js';
import { classifySpeedBand, SPEED_BANDS } from '../src/domain/CraftSimulationInterface.js';

function stepFor(physics, seconds, dt, input) {
  physics.setInput(input);
  const steps = Math.round(seconds / dt);
  for (let i = 0; i < steps; i++) physics.step(dt);
}

test('reset() produces a finite, grounded initial state', () => {
  const p = new PhysicsAdapter();
  const state = p.getState();
  assert.ok(state.position.every(Number.isFinite));
  assert.ok(state.worldVelocity.every(Number.isFinite));
  assert.equal(state.grounded, true);
});

test('full throttle for 10s never produces NaN/Inf state (constitution §26)', () => {
  const p = new PhysicsAdapter();
  stepFor(p, 10, 1 / 60, { throttle: 1, brake: 0, steering: 0, boost: true });
  const state = p.getState();
  const telemetry = p.getTelemetry();
  for (const v of [...state.position, ...state.worldVelocity, state.yaw, state.yawRate]) {
    assert.ok(Number.isFinite(v), `expected finite, got ${v}`);
  }
  assert.ok(Number.isFinite(telemetry.speedKmh));
});

test('drag caps top speed — does not accelerate without bound', () => {
  const p = new PhysicsAdapter();
  stepFor(p, 30, 1 / 60, { throttle: 1, brake: 0, steering: 0, boost: false });
  const kmhAt30s = p.getTelemetry().speedKmh;
  stepFor(p, 30, 1 / 60, { throttle: 1, brake: 0, steering: 0, boost: false });
  const kmhAt60s = p.getTelemetry().speedKmh;
  // Should be converging, not still growing linearly.
  assert.ok(kmhAt60s - kmhAt30s < kmhAt30s * 0.15, `expected convergence, got ${kmhAt30s} -> ${kmhAt60s}`);
});

test('brake reduces speed from a cruising state', () => {
  const p = new PhysicsAdapter();
  stepFor(p, 8, 1 / 60, { throttle: 1, brake: 0, steering: 0, boost: false });
  const before = p.getTelemetry().speedKmh;
  stepFor(p, 2, 1 / 60, { throttle: 0, brake: 1, steering: 0, boost: false });
  const after = p.getTelemetry().speedKmh;
  assert.ok(after < before, `expected braking to reduce speed: ${before} -> ${after}`);
});

test('steering authority decreases at high speed but never reaches zero', () => {
  const p = new PhysicsAdapter();
  stepFor(p, 1, 1 / 60, { throttle: 1, brake: 0, steering: 0, boost: false });
  const lowSpeedYawRateCapacity = p.p.turnRateBase;
  stepFor(p, 20, 1 / 60, { throttle: 1, brake: 0, steering: 0, boost: true });
  stepFor(p, 0.5, 1 / 60, { throttle: 1, brake: 0, steering: 1, boost: true });
  const state = p.getState();
  assert.ok(Math.abs(state.yawRate) > 0, 'expected non-zero turn authority at high speed');
  assert.ok(Math.abs(state.yawRate) < lowSpeedYawRateCapacity, 'expected reduced authority vs. low-speed base rate');
});

test('classifySpeedBand matches the six-band table', () => {
  assert.equal(classifySpeedBand(0), 'sb-080');
  assert.equal(classifySpeedBand(79), 'sb-080');
  assert.equal(classifySpeedBand(80), 'sb-080');
  assert.equal(classifySpeedBand(149), 'sb-080');
  assert.equal(classifySpeedBand(150), 'sb-150');
  assert.equal(classifySpeedBand(899), 'sb-600');
  assert.equal(classifySpeedBand(900), 'sb-900');
  assert.equal(classifySpeedBand(1500), 'sb-900');
  assert.equal(SPEED_BANDS.length, 6);
});

test('a huge dt spike (tab-away stall) does not explode the simulation', () => {
  const p = new PhysicsAdapter();
  stepFor(p, 5, 1 / 60, { throttle: 1, brake: 0, steering: 0, boost: true });
  p.setInput({ throttle: 1, brake: 0, steering: 0, boost: true });
  p.step(4.0); // 4 second stall, well beyond the adapter's internal clamp
  const state = p.getState();
  assert.ok(state.position.every(Number.isFinite));
  assert.ok(state.worldVelocity.every(Number.isFinite));
});

test('reset() restores a fresh, controllable state after abuse', () => {
  const p = new PhysicsAdapter();
  stepFor(p, 20, 1 / 60, { throttle: 1, brake: 0, steering: 1, boost: true });
  p.reset([0, 0.9, 0], 0);
  const state = p.getState();
  assert.deepEqual(state.position, [0, 0.9, 0]);
  assert.equal(state.yaw, 0);
  assert.equal(p.getTelemetry().speedKmh, 0);
});
