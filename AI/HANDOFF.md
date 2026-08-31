# AI/HANDOFF.md

## Current branch
`claude/genesis-storage-assessment-3o78e2`

## What this session did
Full from-scratch rebuild of this repository under **PROJECT GENESIS**, per
`AI/MASTER-CONSTITUTION.md` and `AI/GENESIS-EXECUTION-PROMPT.md` (uploaded by
the human, stored verbatim in `AI/`), with one explicit, human-directed
substitution:

- **Engine:** Unreal Engine 5.8.2 → **Three.js + Vite (browser-native)**.
  Reason: the development workstation does not have the free disk space to
  install and run UE5 (see the prior storage assessment in this session's
  history — 56-57 GB free vs. Genesis's ~120-150 GB requirement). This is a
  human-approved substitution, not an autonomous engine change.
- **Theme:** the human asked for a "Starfleet Academy" (Star Trek) theme.
  Per constitution §38 (never copy fictional branding/lore), this was
  substituted with an **original** space-academy aesthetic — same tone
  (cadet pilots, training proving-grounds, sleek dark instrumentation UI),
  no Star Trek names, insignia, or copyrighted material. Needs a human-
  approved name; current codename is `PROJECT GENESIS`.
- **Platforms:** built PC + mobile as first-class from the start (per the
  human's explicit correction mid-session) — `InputSystem.js` has real
  touch controls (steer stick, throttle slider, boost button), not a
  PC-only control scheme with mobile bolted on.

All previous RyDash-specific code, assets, and docs were removed
(`git rm`) rather than layered over — this was an explicit "rebuild from
scratch" instruction.

## Repository state
Old repo (`rydash`) contents fully removed. New structure:

```
src/
  domain/CraftSimulationInterface.js   Category A: portable contract
  physics/PhysicsAdapter.js            Candidate A physics (behind interface)
  render/CraftMesh.js                  Category B/C: Three.js craft visual
  world/ProvingGround.js               Genesis graybox track
  camera/ChaseCamera.js                Camera Candidate A
  telemetry/TelemetryHUD.js            Debug HUD
  input/InputSystem.js                 PC keyboard + mobile touch
  styles/genesis.css                   Responsive PC/mobile shell
  main.js                              Bootstrap / render loop
tests/simulation.test.mjs              node --test automated validation
AI/                                    constitution, execution prompt, ADRs
Docs/ENVIRONMENT-AUDIT.md              G0 deliverable
Benchmarks/Genesis/                    reserved for six-speed-band data
```

## Status (constitution §43 language)
- Vehicle Simulation Interface: **DESIGNED, IMPLEMENTED**
- PhysicsAdapter (Candidate A): **IMPLEMENTED, AUTOMATED-TESTED** (8/8 passing)
- ProvingGround: **IMPLEMENTED** (straight + corners + slalom + ramp; not yet
  fully instrumented with lap/segment markers for every §15 item)
- ChaseCamera (Candidate A only): **IMPLEMENTED**, manually smoke-tested
- TelemetryHUD: **IMPLEMENTED**
- InputSystem (PC + mobile): **IMPLEMENTED**
- Manual browser verification: **PLAYTESTED** (informal — see below), not
  yet a structured playtest per §20/§30

## What was actually verified this session
- `npm test` → 8/8 automated tests pass (finite-state, drag convergence,
  braking, steering-authority decay, speed-band classification, dt-spike
  safety, reset contract).
- `npm run build` → clean production build.
- Headless-browser smoke test (Playwright, both 1280×800 desktop and a
  390×844 mobile viewport): scene renders, craft accelerates under
  keyboard input from 0→221 km/h and holds a drag-limited equilibrium,
  turns while driving, HUD updates live, no console/page errors.
- **Not yet done:** the six-speed-band test matrix (80/150/250/400/600/900),
  transition testing, Unreal-Insights-equivalent profiling, Candidates B/C
  for physics and camera, independent (Codex) review, structured playtest
  with recorded evidence, benchmark data files under `Benchmarks/Genesis/`.

## Known gaps / next steps (in priority order)
1. Human approval on the placeholder codename/branding (currently unnamed
   beyond "PROJECT GENESIS" — pick a non-infringing academy name).
2. `AI/ADR/ADR-000-Engine-Substitution.md` and
   `AI/ADR/ADR-001-Craft-Physics-Architecture.md` — write these up properly
   (this session created the working code before the ADRs; per constitution
   §45 "no mass code dumps" the ADRs should exist for the record even
   though implementation came first this round — flag as a process gap).
2. Six-speed-band validation run + `Benchmarks/Genesis/` data files.
3. Camera Candidates B (velocity-predictive) and C (hybrid trajectory-aware).
4. Physics Candidates B (heavier tire/aero stack) and C (hybrid assist model).
5. Independent review pass (Codex) on `PhysicsAdapter.js` and `ChaseCamera.js`.
6. Automated headless-browser test wired into CI (this session's Playwright
   smoke test was manual/local only — not yet in `.github/workflows/`).

## Human approvals needed
- Confirm the engine substitution (UE5 → Three.js) as permanent for this
  machine, or as a temporary prototyping track pending a better workstation.
- Approve or reject the placeholder theme substitution and pick a final name.
- Approve moving from this informal smoke test to a structured G2/G3 pass.

## Unmerged worktrees
None — all work done directly on `claude/genesis-storage-assessment-3o78e2`
(single-agent session; the constitution's worktree-per-agent policy applies
once multiple implementation agents are actually running concurrently).
