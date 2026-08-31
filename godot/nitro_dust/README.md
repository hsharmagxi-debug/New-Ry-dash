# Nitro Dust — Genesis Combat Arena (Godot prototype)

First-playable milestone per `AI/HANDOFF.md` / `AI/ADR/ADR-002-...md`.

## Run it
Requires Godot 3.5.x (the official Ubuntu `godot3` apt package works; a
matching build from godotengine.org also works).

```bash
godot3 --path godot/nitro_dust
```

## Controls (prototype, keyboard only — controller/console input is future work)
- `W` / `S` — thrust forward / back
- `A` / `D` — strafe left / right
- `R` / `F` — vertical thrust up / down
- `Q` / `E` — roll left / right
- Arrow Up/Down — pitch
- Arrow Left/Right — yaw
- `Shift` — boost
- `Space` — fire primary weapon

## Structure
```
scripts/
  data/         portable Resource-based schemas (ShipStats, WeaponStats)
  simulation/   movement, weapons, damage — no rendering/UI logic
  rules/        MatchState autoload — score, timer, match lifecycle
  ui/           CombatHUD — reads state via signals only
  PlayerShip.gd / EnemyShip.gd   glue nodes tying the above together
scenes/
  CombatArena.tscn   the one arena
  PlayerShip.tscn / EnemyShip.tscn / Projectile.tscn / CombatHUD.tscn
  data/*.tres        ShipStats/WeaponStats resource instances
```

## Status
See `AI/CAPABILITY_MATRIX.md`. Short version: it runs and renders
(headless-verified this session), but no human has played it yet — treat
"is it fun" as an open question, not a solved one.
