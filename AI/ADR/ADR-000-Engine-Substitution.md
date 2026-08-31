# ADR-000: Engine Substitution — Unreal Engine 5.8.2 → Three.js/WebGL

## Status
**HUMAN-DIRECTED SUBSTITUTION** (not autonomous — the human explicitly asked
for "the best possible alternative" to UE5 for this workstation).

## Context
`AI/MASTER-CONSTITUTION.md` and `AI/GENESIS-EXECUTION-PROMPT.md` specify
Unreal Engine 5.8.2 as the technical baseline. A prior storage assessment in
this session established that the development workstation has ~56-57 GB
free on its system drive against a realistic ~130+ GB footprint for
Unreal + MSVC + Windows SDK + DDC + Intermediate/Binaries — i.e. installing
Unreal here is currently unsafe.

The human's instruction: keep building, but replace UE5 with the best
available alternative given this constraint.

## Problem
Genesis needs a real-time 3D engine capable of: a controllable craft with
continuous physics integration, a graybox 3D environment, a chase camera,
and a live telemetry HUD — all without requiring a multi-hundred-GB local
toolchain.

## Candidates considered
- **Godot 4** — good C#/GDScript engine, but still a multi-GB desktop
  install + export toolchain, and does not solve the "runs today on this
  machine with near-zero footprint" requirement as directly as a browser
  target.
- **Bare WebGL** — maximum control, but reimplementing a scene graph,
  matrix math, and loaders from scratch is pure waste for a Genesis-scoped
  prototype.
- **Three.js + Vite** (chosen) — already a dependency in this repository
  (the prior RyDash build used it), runs in any browser (desktop or
  mobile) with a `npm install && npm run dev`, near-zero disk footprint,
  and is popular/documented enough that "no fake APIs" (constitution §44)
  is easy to honor.

## Decision
Use **Three.js + Vite + vanilla JS (ES modules)** as the Category B/C
implementation layer. Gameplay code (`src/domain/`) depends only on the
engine-neutral `CraftSimulationInterface`, never on `three` directly —
mirroring the constitution's mandatory
`Gameplay → Vehicle Simulation Interface → Physics Layer → Physics Adapter`
boundary (§9), substituting "Chaos Implementation" with a custom force
model (`PhysicsAdapter.js`) and "Physics Adapter" boundary staying intact
for a future swap (e.g. a WASM physics engine, or eventually UE5/6 on a
capable workstation).

## Advantages
- Zero-install prototyping loop on constrained hardware.
- Cross-platform for free: the same build runs on PC and mobile browsers
  (aligns with the human's PC + mobile first-class directive).
- Fast iteration (`npm run dev`, sub-second HMR) vs. Unreal's compile times
  on a 6-core/12-thread CPU.

## Disadvantages
- Not Nanite/Lumen/Chaos — rendering and physics fidelity ceiling is lower
  than native UE5. Acceptable for Genesis's "ugly graybox" scope (§27); NOT
  acceptable as the final production engine for a AAA vertical slice.
- No native profiling equivalent to Unreal Insights — this ADR does not
  claim performance parity, only that `performance.now()`-based frame/
  physics timing is used as a substitute (see `TelemetryHUD.js`).
- WebGL/JS numeric performance ceiling is real; the six-speed-band and
  collision stress tests (constitution §28, §25) still need to be run here
  to know whether this substitution holds up at the top of the range.

## UE6 / Future-Engine Risk
Low for `src/domain/` (portable, engine-agnostic). Moderate for
`src/render/` and `src/physics/` (Three.js/JS-specific) — expected and
accepted, since those map to the constitution's Category C
("engine/version-specific implementations") which is explicitly allowed to
be replaced.

## Decision Scope
This substitution applies **to this workstation's prototyping track only**.
It does not retire UE5 as the eventual target platform for a production
build — that remains a separate, human-approved decision once hardware
allows it.

## Rollback
Revert to a UE5 project once disk space is available (per the prior
storage-recovery plan targeting 120-150 GB free). The `src/domain/`
contract is written so the eventual UE5 vehicle logic can reuse the same
conceptual interface, minimizing rework.

## Revisit Trigger
- Workstation gains sufficient free disk space for a safe UE5 install, OR
- Three.js/WebGL performance proves insufficient even for graybox testing
  at the higher speed bands (400-900 km/h), OR
- The human explicitly requests reconsideration.
