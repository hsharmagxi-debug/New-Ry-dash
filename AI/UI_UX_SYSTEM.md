# UI_UX_SYSTEM.md

Source: a human-provided "Nitro Dust UI Kit" reference design (a bundled
HTML/React export from Claude Design), covering 7 mockup screens: title/
loading, main menu, ship bay/select, in-mission HUD, pause/settings,
mission results, and a buttons/icon-set sheet.

## IP flag — one string not ported

The reference design's title screen includes the subtitle **"STARFLEET
COMBAT ACADEMY"**. That is literal Star Trek trademark language. Per this
project's own direction doc (explicit prohibition on Star Trek names,
terms, or branding) it was **not** ported. Everything else in the kit —
palette, typography, panel/bracket language, layout — is original design
work and was ported as-is (and is legitimately reusable regardless).

## What was ported into the Godot combat HUD (this session)

Only **Screen 04 — In-Mission HUD** maps to anything currently built
(the Genesis Combat Arena's `CombatHUD.tscn`/`.gd`). The other six
screens (title, main menu, ship bay, pause, results, buttons/icons) are
recorded here for the UI system's future phases but not yet implemented
— there is no menu system, ship-bay screen, pause screen, or results
screen in this repository yet.

### Palette (extracted from the reference's computed styles)
| Token | Value | Use |
|---|---|---|
| Background (near-black) | `rgb(5, 6, 10)` | page/void background |
| Panel | `rgb(18, 21, 27)` at ~82% opacity | HUD panel fill |
| Amber accent | `rgb(201, 143, 60)` | brand, bracket corners, active bars, primary readouts |
| Danger red | `rgb(181, 69, 58)` | hull-critical, damage alerts, defeat state |
| Text primary | `rgb(232, 230, 225)` | body labels |
| Text secondary | `rgb(138, 141, 148)` | subtitles, dim labels |

### Typography (real Google Fonts, OFL-licensed, fetched this session — see `godot/nitro_dust/assets/fonts/LICENSE.md`)
- **Michroma** — display/brand wordmark ("NITRO DUST")
- **Rajdhani** (Medium/SemiBold/Bold) — HUD labels, condensed technical feel
- **Share Tech Mono** — numeric readouts (speed, timer) where digit alignment matters

### Panel language
Bracket corners (four short L-shaped marks per panel, not a full
rectangle border) instead of a solid frame — implemented as a reusable
`CornerFrame.gd` custom-draw Control, not baked into any one panel.

## Not yet ported / future work
- Main menu, ship-bay/ship-select, pause/settings, and mission-results
  screens from the reference — none of these exist as Godot scenes yet.
  The reference is a good spec for when those screens get built.
- The reference's icon set (shield/weapon/comms/radar/power/alert/target)
  — current HUD uses text labels only, no iconography yet.
- Target-lock / radar / threat readouts shown in the reference's Screen 04
  — this prototype's combat HUD has hull/shield/boost/speed/score/timer
  only; targeting UI is future work once the combat loop itself is proven.
