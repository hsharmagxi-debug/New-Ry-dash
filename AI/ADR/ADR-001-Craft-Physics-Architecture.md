# ADR-001: Craft Physics Architecture — Candidate A Only (Interim)

## Status
**IMPLEMENTED, AUTOMATED-TESTED.** Not yet SIX-SPEED-BAND TESTED,
INDEPENDENTLY REVIEWED, or BENCHMARKED against Candidates B/C — this ADR
records Candidate A's design and explicitly defers final selection.

## Context
Constitution §9 requires gameplay code never depend directly on the
underlying physics implementation; execution prompt §13 requires (where
practical) three materially different physics candidates be evaluated
before committing to a foundational architecture.

## Problem
Given the engine substitution (ADR-000), there is no Chaos Vehicles
equivalent available. A custom force model must be built directly, but it
must still sit behind the `CraftSimulationInterface` boundary so future
candidates (or a future native-engine implementation) can be swapped in
without touching gameplay/render/camera/telemetry code.

## Candidate A (implemented): "Genesis Arcade Force Model"
`src/physics/PhysicsAdapter.js`. A quadratic-drag longitudinal model
(throttle/brake/boost accelerate, drag opposes velocity², producing a
speed-dependent equilibrium rather than unbounded acceleration) combined
with a continuously speed-scaled turn-rate curve (full authority at low
speed, floor authority at 900 km/h — never zero, per constitution §30's
"no arbitrary hidden mode switching").

Automated test evidence (`tests/simulation.test.mjs`, 8/8 passing):
- Never produces NaN/Inf state under 10s full-throttle+boost.
- Speed converges (drag-capped) rather than growing linearly over 60s.
- Braking measurably reduces speed from a cruising state.
- Turn authority is measurably reduced at high speed but never reaches 0.
- Six-band classifier (`classifySpeedBand`) matches the constitution's
  80/150/250/400/600/900 km/h table exactly.
- A 4-second dt stall (tab-away scenario) does not explode the simulation
  (internal dt clamp to 1/15s per step).
- `reset()` returns to a clean, deterministic state.

Manual browser verification (Playwright, this session): craft accelerates
0→~221 km/h and holds equilibrium under sustained throttle, turns
correctly while moving, no runtime errors across a PC (1280×800) and a
mobile (390×844, touch) viewport.

## Candidates B and C (not yet implemented)
Per execution prompt §13, tracked as required follow-up work, NOT optional:
- **Candidate B — heavier tire/aero force stack:** per-corner slip/load
  simulation instead of a single aggregate slip proxy; more physically
  grounded but more expensive and harder to tune for the 900 km/h ceiling.
- **Candidate C — hybrid physical + assist layer:** Candidate A's physical
  base plus an explicit, telemetry-exposed assistance layer for the
  600-900 km/h band (stability-control-style correction), matching the
  execution prompt's "hybrid future-racing model" framing.

## Decision
Ship Candidate A as the interim playable baseline so camera, telemetry,
input, and world systems have something real to integrate against. This
is explicitly **not** a final architecture decision — do not treat
`PhysicsAdapter.js` as "the" physics system. The three-candidate
comparison (constitution §14's weighted matrix) has not been run.

## Rejected Alternatives
None formally rejected yet — B and C are deferred, not rejected.

## Rollback
Trivial: `CraftSimulationInterface` consumers (`main.js`, `ChaseCamera.js`,
`TelemetryHUD.js`) only call the four contract methods
(`setInput`/`step`/`getState`/`getTelemetry`), so a Candidate B/C class
implementing the same contract is a one-line swap in `main.js`.

## Revisit Trigger
- Before any claim that Genesis's physics is "done" — Candidates B and C
  must exist and be benchmarked per §14 first.
- If six-speed-band testing reveals instability at 600-900 km/h that
  Candidate A's simple drag/turn model cannot resolve without hacks.
