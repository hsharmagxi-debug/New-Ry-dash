# RYDASH 2026 FINAL — Visual + Race HUD Overhaul

## Race view
- Transparent Three.js race canvas now sits over a cinematic world-specific backdrop.
- Each world uses its own visual environment image during Quick Race and multiplayer.
- Day / Sunset / Night / Storm phases remain supported.
- Brighter exposure and stronger neutral/car lighting improve body paint and road visibility.
- Reduced atmospheric fog density for clearer long-distance world views.
- Improved chase camera framing and race readability.

## Lap HUD
- Prominent POS and LAP cards.
- Real-time lap progress bar.
- Real live 8-racer order panel.
- TIME / BEST / LAST lap telemetry.
- Lap completion updates LAST and BEST.
- Actual checkpoint progression remains the source of lap state.

## World Select
- Fixed hidden world-card imagery caused by incorrect stacking.
- Eight visual world cards now show their images clearly.
- Large selected-world preview remains synchronized.
- Phase buttons remain live and persisted.

## Multiplayer
- Rebuilt lobby into a clearer 2026 racing dashboard.
- Selected world preview, room creation, join flow, live rooms and room roster.
- Existing multiplayer IDs and networking logic preserved.

## Car presentation
- Generated 4x HD presentation assets from the existing car source images.
- Home, garage and car-card UI now use HD assets instead of stretching 182x102 images.

## Validation
- 29/29 JavaScript modules pass `node --check`.
- Production build was attempted in the sandbox, but dependency installation timed out; run `npm install` and `npm run build` locally before deployment.
