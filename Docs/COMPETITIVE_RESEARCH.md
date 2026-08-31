# COMPETITIVE_RESEARCH.md — Arcade Space Combat + Racing

Scope: genre research to inform Nitro Dust's design, per the direction
doc §25. This studies mechanics and design lessons only — no copied code,
assets, UI, text, or protected creative expression from any of these
titles appears anywhere in this repository.

Reference set: Star Fox (arcade rail/free-flight shooter), Rogue Squadron
(arcade space combat), Freelancer (open-world space sim with arcade
leanings), Descent (six-degrees-of-freedom combat), Rebel Galaxy
(accessible space combat), EVE Valkyrie / Star Citizen "Arena Commander"
(VR/PC dogfighting), Wipeout / F-Zero (anti-grav arcade racing), Twisted
Metal / Vigilante 8 (vehicular combat), Rocket League (physically
readable arcade vehicle sport).

## KEEP — proven principles worth learning from
- **Instantly readable "front" of the ship** (Star Fox, Rogue Squadron):
  players must always know where they're pointed at high speed. Informed
  our HUD's speed/hull/shield-first layout and the ship's forward-facing
  engine-glow accent.
- **Fire-rate-gated weapons over hitscan spam** (Descent, Rebel Galaxy):
  keeps combat readable and gives dodging real value. `WeaponSystem.gd`'s
  cooldown gate follows this.
- **Shields that visibly break before hull damage lands** (many
  space-combat games): gives players a clear "second life" signal.
  `HealthShield.gd` implements this as a hard rule (shield absorbs first).
- **Boost as a resource, not a toggle** (Wipeout, F-Zero): boost that
  drains and regens creates a management decision, not a free button.
  Implemented in `ShipController.gd`.

## IMPROVE — where existing games are constrained
- Many space-combat games separate "racing" and "combat" into different
  games entirely (Wipeout has no weapons in its base loop; Descent has no
  racing loop at all). Nitro Dust's four-pillar direction (racing +
  combat + exploration + shared ship taxonomy) is explicitly designed to
  not silo these — the same `ShipStats`/`WeaponStats` schemas are meant to
  serve both a race and a combat arena without a different ship model.
- Six-degrees-of-freedom games (Descent) are often praised by veterans but
  criticized by newcomers for disorientation. Nitro Dust's arcade-first
  flight model (§5 of the direction doc) keeps roll/pitch/yaw available
  but damps them enough to stay approachable — an explicit design
  response to this known friction point.

## AVOID — known design problems
- Over-simulated flight models that gate fun behind a steep mastery curve
  before the player has had any fun at all (early hardcore space sims).
  Nitro Dust's "physics fidelity must never destroy fun" rule (§5) exists
  specifically to avoid this trap.
- HUDs that permanently display every possible stat regardless of mode
  (common in sim-leaning titles) — Nitro Dust's adaptive per-mode HUD
  requirement (§9) is a direct response.

## INVENT — where Nitro Dust should establish its own identity
- A shared ship-capability schema that lets the *same* ship credibly
  participate in racing and combat with different loadouts, rather than
  racing vehicles and combat vehicles being unrelated asset classes.
- The specific visual/UI language target (§8): aerospace instrumentation
  + motorsport telemetry + tactical HUD, explicitly not LCARS-style
  panels and explicitly not "generic neon cyberpunk." This is original
  design space none of the reference titles above occupy directly.

## Prototype priority (this session)
Given Genesis Combat Arena's minimum bar (§26: one player ship, one
enemy, one arena, two weapon slots minimum, shield/hull, boost, combat
HUD, basic AI, score/timer), this session implemented the "KEEP" list's
mechanics as directly as the prototype's scope allows, and deferred
"INVENT" (shared racing/combat ship loadouts) to a later phase once combat
alone is proven fun — matching the direction doc's own sequencing (§6:
"prove that flying and shooting are exceptionally fun" before expanding).
