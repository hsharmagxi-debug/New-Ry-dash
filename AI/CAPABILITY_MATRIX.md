# CAPABILITY_MATRIX.md

Evidence-based, scoped to what exists in this repository as of this branch.
"Current State" reflects actual code found or written this session — no
hallucinated functionality.

| System | Current State | Target State (Genesis Combat Arena) | Gap | Priority | Complexity |
|---|---|---|---|---|---|
| Flight | Arcade 6DOF (thrust/strafe/pitch/yaw/roll/boost) in `ShipController.gd`, manually verified via headless run | Same, tuned for feel | Needs real playtest (human input, not just headless idle run) | High | Low (done, needs tuning) |
| Combat — weapons | Single hitscan-speed projectile weapon (`WeaponSystem.gd`/`Projectile.gd`), fire-rate gated | Primary + secondary per §6 | Secondary weapon type missing | High | Low |
| Combat — damage | Hull/shield with regen delay (`HealthShield.gd`) | Same | Meets minimum bar | High | Done |
| AI | Single-behavior "face target, close distance, strafe, fire" (`EnemyShip.gd`) | Same for prototype scope | Meets §6 minimum ("basic enemy AI") | High | Low |
| Multiplayer | None | Not required for first playable per §6/§26 | N/A yet | Deferred | High |
| Ships | One player hull, one enemy hull, both driven by shared `ShipStats` schema | Modular taxonomy (§4) | Only "interceptor"/"assault" role stubs exist; no full taxonomy | Medium | Medium |
| Weapons data | `WeaponStats` schema (damage/fire-rate/speed/range) | Full weapon variety | One weapon type implemented | Medium | Low |
| Environments | One graybox arena: open space, 3 cover cubes, directional lights, fog | One memorable location per §10 | Graybox only, no destructible/hazard elements yet | Medium | Medium |
| Camera | Fixed chase camera parented to player ship | Combat-aware camera (target lead, situational awareness) | No target-lock camera behavior yet | Medium | Medium |
| HUD | Combat-mode readout: hull/shield/boost/speed/score/timer/status (`CombatHUD.gd`) | Adaptive per-mode HUD (§9) | Only combat mode exists; racing/exploration modes not built (racing HUD exists separately in the unmerged Three.js track) | Medium | Medium |
| Audio | None (dummy audio driver in this headless env; no SFX authored) | Weapon/engine/impact audio | Not started | Low for prototype | Medium |
| VFX | Emissive materials only, no particles | Destruction, muzzle flash, impact particles | Not started | Low for prototype | Medium |
| Progression | None | Persistent player identity (long-term) | Not started, correctly deferred | Deferred | High |
| Missions/Exploration | None | Long-term pillar | Not started, correctly deferred | Deferred | High |
| Telemetry | None yet in Godot track (the Three.js track has a telemetry HUD pattern that could be ported) | Frame time, physics time, hit registration logging | Not started | Medium | Low |
| Performance | Verified only as "runs without script errors for 10s headless, software (llvmpipe) rendering" | Declared frame-time budget on real GPU hardware | No real GPU benchmark available in this sandbox | High before calling this "playable" | N/A (needs real hardware) |
| Persistence | None | Player identity/save data | Not started, correctly deferred | Deferred | High |
| Platform abstraction | Godot project only targets desktop defaults; no console/mobile input mapping yet | Controller-compatible input architecture (§6) | Keyboard-only input implemented this session | Medium | Medium |
| Testing | Manual headless smoke run + screenshot only | Automated test coverage (GUT or equivalent) | No automated test framework installed/configured yet | High | Low-Medium |
| Branding/naming migration | See `AI/NAMING_MIGRATION.md` | Full Nitro Dust identity | RyDash legacy content on `main` untouched, PR #1's Three.js track has its own separate rename | Medium | See naming doc |
