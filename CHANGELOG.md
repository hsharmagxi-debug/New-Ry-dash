# Changelog

## [0.1.0-genesis] — Full rebuild: PROJECT GENESIS

- Removed all prior RyDash code, assets, and docs (full from-scratch
  rebuild, per explicit instruction).
- New engine-neutral architecture: `CraftSimulationInterface` (domain) →
  `PhysicsAdapter` (Candidate A) → Three.js render/camera/world/telemetry
  layers, matching the constitution's mandatory abstraction boundaries.
- Engine substitution: Unreal Engine 5.8.2 → Three.js + Vite (see
  `AI/ADR/ADR-000-Engine-Substitution.md`) — this workstation cannot
  safely host a UE5 install.
- Genesis graybox proving ground: straight with 100m markers, constant-
  and variable-radius corners, slalom, ramp.
- Chase camera (Candidate A): speed-reactive FOV/distance, damped follow.
- Debug telemetry HUD: speed, G-forces, slip, yaw rate, boost, frame/
  physics timing.
- PC keyboard + mobile touch input, both first-class from the start.
- 8 automated validation tests (`node --test`) covering finite-state
  safety, drag convergence, braking, steering-authority decay, speed-band
  classification, dt-spike safety, and reset contract — all passing.
- Manual headless-browser verification (desktop + mobile viewports): no
  runtime errors, live HUD, working acceleration/turning.
- Constitution, execution prompt, and initial ADRs stored under `AI/`.
