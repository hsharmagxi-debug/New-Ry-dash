# RYDASH 2026 — FINAL RELEASE CANDIDATE

## Critical fix in this release
The previous target-view package could leave the browser showing only the cinematic background because the startup path depended on the JavaScript initializer completing before the product UI was revealed.

This release changes boot behavior so:
- Home UI is visible immediately in HTML.
- The loading layer is not active by default.
- The home screen is fail-safe and cannot be covered by a stale loading layer.
- Optional atmosphere, audio, backend/auth and activity-feed initialization are non-blocking.
- Navigation has a lightweight fallback if the main enhancement script fails.
- Main router activates the requested screen before optional enhancements.
- Non-fatal initializer errors are caught and logged instead of trapping the user behind the loading screen.

## Visual/game systems retained
- 8 visual worlds
- Day / Sunset / Night / Storm phases
- World-specific cinematic environments
- Clear race lighting and reduced fog
- 10 HD car presentation assets
- Live POS/LAP/race order HUD
- TIME/BEST/LAST lap telemetry
- Real checkpoint/lap progression
- AI racing
- Multiplayer lobby and realtime networking hooks
- Garage / World / Leaderboard / Settings / How to Play
- Back navigation

## Validation
- All JavaScript source files pass `node --check`.
- No `node_modules`, `dist` or `.vite` transient directories are packaged.
- Run locally:
  `npm install`
  `npm run build`
  `npm run dev`
