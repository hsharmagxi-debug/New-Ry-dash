# NAMING_MIGRATION.md

Scope: this document covers the repository as it stands on branch
`nitro-dust/genesis-combat-arena` (based on `main`, i.e. the original
RyDash codebase) plus the new `godot/` prototype added here. It does not
cover the separate `claude/genesis-storage-assessment-3o78e2` branch
(open PR #1), which already carries its own `NITRO DUST` rename for the
Three.js proving-ground track — that branch is a parallel, unmerged line
of work, not touched by this one.

## What "Race 2 Future" / "RyDash" branding exists on `main`

`main` is still the pre-rename RyDash racing game in full: `package.json`
name `rydash`, `index.html` title "RYDASH — Race the City. Own the
Night.", `README.md`, `CHANGELOG.md`, in-app UI strings, car/world assets,
Supabase schema, etc.

## Migration decision for this branch

**Not touched.** This branch adds `godot/nitro_dust/` as a new, separate
prototype and does not rename or delete any existing RyDash file. Reasons:

1. The direction doc explicitly prohibits "a blind global rename" and
   requires functional, branding, documentation, and asset changes to be
   separated rather than bundled with gameplay work (§30).
2. `main`'s RyDash content and the unmerged Three.js "Nitro Dust" rebuild
   (PR #1) are two different in-flight states of the *old* product concept
   (a street-racing game). Nitro Dust's new direction (per the correction
   doc) is a different game entirely — a spacecraft combat/racing universe
   — so renaming RyDash's street-racing strings to "Nitro Dust" would
   attach the new name to gameplay that is being superseded, not migrated.
3. Godot lives in an isolated `godot/` subtree with its own
   `project.godot`, so it introduces zero naming collisions with the
   existing web app regardless of what happens to RyDash's branding later.

## Recommendation (not yet executed — needs a GO decision)

- Treat `main`'s RyDash content as **legacy, scheduled for retirement**,
  not migrated. It answers a different product brief than the corrected
  Nitro Dust direction.
- Treat PR #1 (`claude/genesis-storage-assessment-3o78e2`) as a **separate
  decision** for the human to make: close it, merge it as a historical
  Three.js prototype archive, or fold its engine-neutral domain contracts
  (`CraftSimulationInterface`, speed-band classification, etc.) into this
  Godot track's data schemas where they still apply conceptually.
- This `godot/` prototype becomes the new authoritative Nitro Dust
  implementation track once it clears its own quality gate (see
  `AI/HANDOFF.md`).

## Safe vs. unsafe rename targets (for a future pass, once approved)

| Target | Status |
|---|---|
| `godot/nitro_dust/project.godot` `config/name` | Already "Nitro Dust" — safe, done |
| Root `package.json`, `index.html`, RyDash `README.md`/`CHANGELOG.md` | Unsafe to touch in this PR — belongs to a separate branding-only change once a GO decision is made on retiring vs. archiving RyDash |
| `.git` remote/repo name (`New-Ry-dash`) | Out of scope — repository-level rename needs the human's explicit action outside this session |
