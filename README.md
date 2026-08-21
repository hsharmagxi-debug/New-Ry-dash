# RYDASH — 2026 Live Racing Build

**RACE. DRIFT. DOMINATE.**  
A browser-based 3D arcade racing game built with Three.js + Vite, with optional Supabase Realtime multiplayer.

## What was fixed in this build

- Real sequential 20-gate lap system instead of a loose dummy counter.
- Visible start/finish and checkpoint gates in every 3D environment.
- Correct starting grid orientation based on each track's tangent/normal.
- Live lap completion feedback and real race-start HUD values.
- Brighter, more readable UI and environment lighting across the worlds.
- Live multiplayer remote cars rendered in the actual 3D race.
- Remote-player interpolation and minimap markers.
- Exit Race navigation plus Back buttons across previously missing pages.
- Preserved the 10-car garage and the existing eight environments.
- Mobile/touch controls remain supported.
- Existing Supabase score/leaderboard integration is preserved.

## Environments

Neon Rain City, Sunset Highway, Neon Desert, Underground District, Rooftop City Racing, Electric Storm City, Night Coastal Highway, Vertical Mega-City.

## Run locally

```bash
npm install
npm run dev
```

Then open the Vite URL shown in the terminal.

## Production build

```bash
npm run build
npm run preview
```

## Multiplayer

Multiplayer requires a free Supabase project.

1. Copy `.env.example` to `.env`.
2. Set `VITE_SUPABASE_URL`.
3. Set `VITE_SUPABASE_ANON_KEY`.
4. Run the SQL in `supabase_schema.sql`.
5. Build and deploy.

The multiplayer transport uses Supabase Realtime Broadcast/Presence. The race now sends live transforms and renders connected racers as real 3D cars.

## Controls

- W / Arrow Up — throttle
- S / Arrow Down — brake/reverse
- A/D or Arrow Left/Right — steering
- Space — handbrake
- Shift — nitro
- C — camera
- H — horn
- Esc — pause

## Git push

```bash
git add .
git commit -m "RYDASH 2026 live racing rebuild"
git push
```

## Credits

**RYDASH — Created by Urvashi Chandan**
