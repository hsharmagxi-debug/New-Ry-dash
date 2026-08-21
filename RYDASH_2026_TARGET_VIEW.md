# RYDASH 2026 — Target Racing View

This build targets the supplied reference: a clear, identifiable arcade-racing world rather than a dark abstract scene.

## Race view
- Wide chase camera shows more road, sky, buildings and track environment.
- World-specific cinematic backplate is visible behind the transparent Three.js race layer.
- Player car remains a real 3D playable vehicle.
- Road, checkpoints, AI cars, physics and lap progression remain real 3D game systems.
- POS / LAP / live order / TIME / BEST / LAST remain visible and crisp.
- Day / Sunset / Night / Storm tinting changes the presentation of the selected world.

## Default presentation
- New users start on Coastal Highway / Day for a bright, immediately identifiable racing view.
- Existing local selections are preserved.

## Validation
- 29 JavaScript modules pass `node --check`.
- Production build should be verified locally with `npm install` then `npm run build` before deployment.
