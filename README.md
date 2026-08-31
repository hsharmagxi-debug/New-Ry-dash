# NITRO DUST

**"Can we reinvent the feeling of speed?"**

An original space-academy craft-racing game, built as this workstation's
substitution track for Unreal Engine 5.8.2 (no local disk budget for a
UE5 install — see `AI/ADR/ADR-000-Engine-Substitution.md`).

The game is **not** finished. It is currently in its **PROJECT GENESIS**
milestone: the foundational driving-technology proving ground defined by
`AI/MASTER-CONSTITUTION.md` and `AI/GENESIS-EXECUTION-PROMPT.md` — one
craft, one graybox track, physics, camera, sense of speed, and telemetry.
Nothing else yet.

> **Naming note:** an earlier direction asked for a literal "Starfleet
> Academy" (Star Trek) theme. Per the constitution's own originality rule
> (never copy fictional branding/lore), this project uses an **original**
> space-academy aesthetic instead — same tone, no Star Trek IP. The game's
> name is **Nitro Dust** (human-approved); `PROJECT GENESIS` remains the
> name of this current development milestone, not the game itself.

## Stack
- **Three.js** + **Vite**, vanilla ES modules — chosen as the lowest-
  footprint real-time-3D substitute for UE5 that still runs identically on
  desktop and mobile browsers. See `AI/ADR/ADR-000-Engine-Substitution.md`.
- Gameplay code depends only on `src/domain/CraftSimulationInterface.js`
  (engine-neutral contract) — never directly on `three` or the physics
  implementation, per the constitution's mandatory Vehicle Simulation
  Interface pattern.

## Run it
```bash
npm install
npm run dev       # local dev server with HMR
npm run build     # production build -> dist/
npm run preview   # serve the production build
npm test          # automated validation (node --test)
```

## Platforms
Built PC + mobile as co-equal first-class targets from the start — the
input layer (`src/input/InputSystem.js`) implements real touch controls
(steer stick, throttle slider, boost button) alongside keyboard/mouse, not
a mobile afterthought.

## Structure
```
src/
  domain/      portable game-domain contracts (engine-agnostic)
  physics/     physics adapter implementing the domain contract
  render/      Three.js-specific visuals
  world/       Genesis graybox proving ground
  camera/      chase-camera candidate(s)
  telemetry/   debug HUD
  input/       PC + mobile input
tests/         automated validation (node --test)
AI/            constitution, execution prompt, ADRs, handoff
Docs/          environment audit and other design docs
Benchmarks/Genesis/   reserved for six-speed-band benchmark data
```

## Status
See `AI/HANDOFF.md` for exactly what is implemented, tested, and still
outstanding (this is Candidate-A-only physics and camera; Candidates B/C,
the six-speed-band validation pass, and independent review are still
pending — do not treat this as a finished evaluation).
