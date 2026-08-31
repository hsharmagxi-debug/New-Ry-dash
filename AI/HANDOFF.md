# AI/HANDOFF.md

Scope: branch `nitro-dust/genesis-combat-arena`, based on `main`.

## What this session did
Executed the direction-correction document's PHASE 0–5 sequence for the
**Nitro Dust Genesis Space Combat Arena** first-playable milestone:

- Repository audit (below) — confirmed no Codex activity/collision on
  either `main` or the one open PR (#1, a separate Three.js racing track).
- Built a new, isolated Godot 3.5.2 prototype under `godot/nitro_dust/`
  (official apt-packaged Godot, not a third-party build) implementing the
  minimum combat-arena bar from the direction doc §26: one player ship,
  one AI enemy, one arena, primary weapon, shield/hull, boost, combat HUD,
  score, timer, basic AI, respawn.
- Verified the project actually imports and runs headless (Xvfb) with
  zero script errors, and captured screenshots proving the scene renders
  with live HUD data. See `AI/ADR/ADR-002-Godot-Combat-Arena-Prototype.md`
  for the full evidence trail and what is *not* yet verified (no human
  playtest happened this session).
- Wrote `AI/CAPABILITY_MATRIX.md`, `AI/NAMING_MIGRATION.md`,
  `Docs/COMPETITIVE_RESEARCH.md` per the direction doc's documentation
  requirements — scoped to what's real, not a full 12-document set (the
  doc itself says "do not create empty bureaucracy").

## Repository truth (Phase 0 audit results)
- `main`: still the original RyDash street-racing game, untouched.
- `claude/genesis-storage-assessment-3o78e2` (PR #1, open/draft): a
  separate, unmerged Three.js rebuild of the *old* racing-focused Nitro
  Dust direction. Not touched by this branch. See
  `AI/NAMING_MIGRATION.md` for how these relate.
- No Codex commits, comments, or reviews found on any branch or on PR #1
  at audit time — no collision, nothing was locked/avoided.
- `origin/gh-pages`: a stale auto-deploy branch from a fork
  (`messyuc-786/rydash`), unrelated to Codex, not touched.

## Status (constitution-style language, carried over from the prior track)
- Flight model (Candidate A only): **IMPLEMENTED**, manually verified via
  headless run — NOT yet human-playtested, NOT benchmarked on real GPU
  hardware (this sandbox has no GPU; rendering used software `llvmpipe`).
- Combat loop (weapon/damage/AI/score/respawn): **IMPLEMENTED**, same
  verification caveat as above.
- Automated test coverage: **NOT STARTED** — no test framework (e.g. GUT)
  installed yet; this session's validation was a manual headless smoke
  run + screenshot capture, not a repeatable automated suite.
- Independent (Codex) review: **NOT DONE** — per the direction doc's own
  rule, this implementation cannot self-approve as finished.
- IP/originality review: informally self-checked (no Star Trek naming,
  assets, or UI patterns used — original role-based ship terminology, an
  aerospace/motorsport-telemetry-inspired HUD, not LCARS-styled), but not
  independently verified by a separate reviewer per §29.

## What was NOT done (explicitly, so no one assumes otherwise)
- No human ever pressed a key in this session — the headless run had no
  live input source. The flight model's actual *feel* is unverified.
- No racing mode, no second weapon, no destructible environment, no real
  ship taxonomy beyond two stat-block instances, no multiplayer, no
  progression/persistence, no audio, no VFX beyond emissive materials.
- The Genesis Command Center (Three.js dashboard track, PR #1) was not
  touched, expanded, or treated as more important than this playable
  build, per the direction doc's explicit priority order.

## Next steps (priority order)
1. A human needs to actually play this (open the Godot editor locally, or
   export a build) and report whether the flight/combat loop feels good —
   this session cannot self-certify "fun."
2. Independent review pass (Codex) on `scripts/simulation/` before adding
   more content on top of Candidate A.
3. Decide (human GO/NO-GO) what happens to PR #1 (the old racing-focused
   Three.js track) and to `main`'s legacy RyDash content, per
   `AI/NAMING_MIGRATION.md`.
4. Add a second weapon type and basic destructible/hazard element to the
   arena to fully close out the §26 minimum bar.
5. Set up an automated test framework (GUT is the standard choice for
   Godot 3.x) so future changes get more than a manual smoke run.

## Human approvals needed
- GO/NO-GO on this Godot track as the authoritative Nitro Dust playable
  implementation going forward (vs. the unmerged Three.js track in PR #1).
- Confirm Godot 3.5.2 (apt-packaged) is acceptable as the prototype engine
  pending eventual network access for Godot 4.x, per
  `AI/ADR/ADR-002-Godot-Combat-Arena-Prototype.md`.

## Unmerged worktrees
None — single-agent session, direct commits on this branch only.
