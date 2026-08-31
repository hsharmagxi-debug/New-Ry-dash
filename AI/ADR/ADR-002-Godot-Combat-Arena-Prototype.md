# ADR-002: Godot 3.5 for the Nitro Dust Genesis Combat Arena Prototype

## Status
IMPLEMENTED (Candidate scope only — one playable arena, not yet independently
reviewed, not yet playtested by a human, not benchmarked on real hardware).

## Context
The direction-correction document requires the playable game (not the
command-center dashboard) to take priority, names "Genesis Space Combat
Arena" as the first playable milestone, and separately the user explicitly
directed use of "official Godot sources" for the engine. The prior
Three.js proving-ground track (`AI/ADR/ADR-000-Engine-Substitution.md` on
the sibling branch/PR #1) was a racing-only prototype; this ADR covers a
new, separate engine decision for the combat-arena milestone.

## Decision
Use **Godot 3.5.2**, installed from the official Ubuntu apt repository
(`godot3` package, upstream-built from Godot Engine's own source, not a
third-party fork), as the engine for `godot/nitro_dust/`.

Why 3.5 and not 4.x: this sandbox's apt repository serves 3.5.2 directly
with no network fetch required (network access to `downloads.tuxfamily.org`
returned 403 from this environment's proxy). Godot 3.5 is a real, current,
officially-maintained LTS-era release, fully capable of everything this
prototype needs (KinematicBody physics, GDScript, GLES2 rendering). This
is documented as a **prototype-technology choice, not a permanent one** —
per the direction doc's own rule (§19/§20): prototype technology is
disposable, architecture and design knowledge are not. A future session
with proper network access may target Godot 4.x for the vertical slice
without needing to redesign the simulation/rules/data layers below.

## Architecture
Followed the direction doc's mandatory layer separation (§13):
- **Simulation**: `scripts/simulation/` — `ShipController.gd` (movement),
  `WeaponSystem.gd` + `Projectile.gd` (weapons), `HealthShield.gd` (damage).
- **Rules**: `scripts/rules/MatchState.gd` (autoload) — score, timer, match
  lifecycle. Knows nothing about a specific ship's flight model.
- **UI**: `scripts/ui/CombatHUD.gd` — reads state via signals only.
- **Data**: `scripts/data/ShipStats.gd`, `scripts/data/WeaponStats.gd` —
  portable `Resource`-based schemas, expressible as JSON later without
  losing meaning (§14's engine-neutral-contract intent, adapted to Godot's
  native `Resource` system rather than hand-rolled JSON, since `Resource`
  already gives data-driven, inspector-editable, engine-native contracts).
- **Presentation**: primitive `PrismMesh`/`CubeMesh` geometry with
  emissive accent materials — deliberately graybox, no asset budget spent
  yet, consistent with the "ugly prototype" discipline the earlier
  Three.js track already established for this project.

## Evidence this session actually verified
- `godot3 --editor --quit` (headless, under Xvfb) successfully imported
  the project and built the global script-class cache — no import errors.
- `godot3 --path .` (headless, under Xvfb, real X display) ran the
  `CombatArena.tscn` main scene for 10+ real seconds with **zero script
  errors** (confirmed via captured stdout/stderr, filtered only for the
  expected "no audio device in this sandbox" warning).
- Captured screenshots (via `xwd` + ImageMagick `convert`, since no GPU
  screenshot tool was preinstalled) show: the player ship rendering with
  correct materials, a live HUD showing YOU 0–0 HOSTILE, a counting-down
  match timer, HULL 100/100, SHIELD 60/60, BOOST 100%, SPEED 0 m/s, and a
  cover-station cube visible in the arena — proving the render pipeline,
  autoload wiring (`MatchState`), signal-based HUD updates, and scene
  instancing (`PlayerShip.tscn`/`EnemyShip.tscn` as child instances) all
  function together, not just in isolation.
- **Not yet verified**: actual human keyboard input driving the ship (the
  headless run had no input source), enemy AI actually engaging (no
  target was manually driven into range), weapon fire hitting anything,
  score incrementing, or destruction/respawn firing. These require either
  a human playtest or a scripted input-injection test harness — neither
  exists yet. Do not read this ADR as "combat is proven fun" — it proves
  the scene *runs*, not that it *plays well*, per the direction doc's own
  quality-gate distinction (§28).

## Rejected Alternatives
- Continuing on Three.js: rejected for this milestone specifically because
  building true 6DOF flight, projectile physics, and an entity/damage
  model from scratch in Three.js duplicates work a real game engine
  already solves (collision, physics stepping, scene tree, resource
  system) — Godot's built-in `KinematicBody`/`move_and_slide`,
  `Resource` data classes, and autoload singletons directly serve the
  direction doc's simulation/rules/data separation with less hand-rolled
  plumbing than the Three.js track needed.
- Godot 4.x: rejected only because this sandbox cannot reach
  `downloads.tuxfamily.org` to fetch it; not rejected on technical merit.
  Revisit when network access allows, per Revisit Trigger below.

## UE6 / Future-Engine Risk
Low for `scripts/data/` and `scripts/rules/` (plain data + signal-driven
logic, no Godot-specific API beyond `Resource`/`Node` base classes — the
same shapes port to any engine's data-resource system). Moderate for
`scripts/simulation/` (uses `KinematicBody.move_and_slide`, a Godot-3-
specific physics API — Godot 4 renamed this to `CharacterBody3D`, and a
non-Godot engine would need an equivalent rewrite). This is the expected,
accepted cost of Category C ("engine/version-specific implementation")
per the direction doc's own architecture model.

## Rollback
Delete `godot/` — nothing outside that directory depends on it. The data
schemas (`ShipStats`, `WeaponStats`) are the only pieces worth preserving
if the engine choice changes; they are small enough to re-author in a new
engine's native format in under an hour.

## Revisit Trigger
- This sandbox (or the human's actual workstation) gains network access to
  fetch Godot 4.x, and a decision is made that 4.x's rendering/physics
  improvements are worth the migration cost.
- A human playtest of this arena reveals the arcade flight model
  (Candidate A, no alternatives built yet) doesn't feel good enough to
  build on — then a Candidate B/C flight model gets evaluated before
  more content is added on top of Candidate A.
