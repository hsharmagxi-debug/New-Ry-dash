# RYDASH — Drive. Drift. Dominate.

Created by **Urvashi Chandan**.

A free, browser-based **3D multiplayer street racing game** — built from scratch with Three.js
(WebGL), real-time multiplayer over Supabase Realtime, a Supabase Auth + Postgres leaderboard,
and eight fully animated worlds, each with its own weather, lighting, and hazards.

> **Honest scope note:** true GTA/NFS-level visuals come from licensed car models, motion capture,
> and photogrammetry built by hundreds of artists over years — not reachable from scratch for
> free. What this build has instead: 10 original stylized cars with glossy clear-coat paint,
> flared wide-body arches, quad LED lighting and chrome wheels; eight procedurally built circuits;
> bloom post-processing; drift particles; dynamic headlights; camera shake; and real-time
> multiplayer — a genuine arcade racer, not a tech demo.

## What's in it

- **3D driving** — Three.js scene, arcade drift physics (accelerate/brake/steer/handbrake-drift/nitro),
  chase / hood / orbit cameras, checkpoint-based lap tracking, **7 AI opponents (8-car grid,
  live POS X/8 standings)**, car-vs-car collisions (cars physically bump/push each other on
  contact), **off-road slowdown** (stray off the track surface and sand/grass drag kicks in),
  **nitro pickups** (glowing rings placed around every circuit — drive through one for an instant
  refill, then it's on a 10s cooldown), **camera shake** on collisions and hard landings, gamepad
  support (auto-detected — left stick steers, triggers for gas/brake, face buttons for nitro/handbrake).
- **Dynamic headlights** — the player's car casts a real forward-aimed spotlight that lights up
  the road ahead (not just an emissive mesh); AI/ghost/remote cars keep the cheaper look to
  control performance with 8 cars on screen at once.
- **Speed lines** — a screen-space streak overlay ramps in above ~110 km/h and goes full
  intensity during nitro, for a burst-of-speed feel.
- **Ghost replay** — your fastest single-player run per world+car is saved locally and replays as
  a translucent ghost car next time, so you're always racing your own best. No backend needed.
- **Eight worlds** (pick in Settings or the World Map screen):
  - **Neon District** — rain, flickering neon billboards, glossy reflective wet asphalt (env-mapped),
    passing background traffic light-streaks, occasional lightning, bloom-lit signs/headlights.
  - **Sunline Highway** — golden-hour mountain pass, snow-capped peaks, distant city skyline, palm
    trees, warm bloom-lit sun.
  - **Neon Desert** — Vegas × Dubai × Cyberpunk: a glowing futuristic skyline across a vast desert
    highway, cacti, drifting drone lights tracing loops across the sky.
  - **Deep Run** — abandoned underground tunnels/metro: concrete girders with neon strip lighting,
    a distant train light that sweeps past on a parallel track.
  - **Skyline** — rooftop racing across a dense futuristic city: towers crowd close on both sides,
    holographic billboards glow, distant helipad rings glimmer below, and two physical **launch
    ramps** send any car crossing them above ~14 units/s airborne (real gravity/airborne physics,
    not a scripted hop — AI opponents use them too).
  - **Storm City** — a violent electric storm: purple storm clouds, frequent lightning (every
    2-4s) synchronized with a headlight-sweep effect, rain that breathes in intensity waves, and
    drifting ground fog.
  - **Coastal Highway** — moonlit night drive along the coast: a real animated ocean (vertex-shader
    wave displacement, not a scrolling texture) on one side, distant mountains/city on the other,
    slow-drifting floating particles.
  - **Vertical City** — a narrow racing canyon between towering skyscrapers: flying vehicles loop
    overhead, an elevated train sweeps past on its own track, giant digital billboards flicker,
    pedestrian silhouettes line the sidewalks.
  - All eight share red/white apex curbing + guardrails, nitro pickups, and the same physics/AI.
- **10 original car models × 9 liveries** — Shadow GT (Hypercar/Legendary), Inferno X
  (Supercar/Epic), Cyber Veloce (Electric Hypercar/Rare), Nighthawk (Drift Coupe/Epic), Vortex RS
  (Track/Rare), Apex R9 (Track/Legendary), Titan S (Muscle/Epic), Phantom LX (Highway GT/Legendary),
  Storm XR (Rally GT/Rare), Raptor ZX (Street Racer/Epic) — each with clear-coat/
  pearlescent paint, flared wide-body arches, chrome forged wheels with visible brake calipers,
  canards, multi-tip exhausts, and a rotating 3D garage preview you can drag to orbit. Garage
  shows rarity badge + Speed/Handling/Drift/Nitro stat bars.
- **Real-time multiplayer** — create/join a 5-letter room code, race live against other browsers
  via Supabase Realtime Broadcast (no custom game server to host/pay for).
- **Auth + global leaderboard** — Supabase Auth (email) or guest play; best lap times saved to a
  Postgres table with row-level security; falls back to local `localStorage` if Supabase isn't
  configured yet, so the game works immediately with zero setup.
- **Full page flow** — Home, Sign in/Guest, Garage, Multiplayer Lobby, Race HUD (position/lap/timer/
  speedo/nitro/positions), Results, Leaderboard, Settings (quality/camera/world/sound/FPS), How to Play.
- Mobile touch controls + responsive layout.

## Run it locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`). Works immediately — no configuration
required. Without Supabase configured, the leaderboard uses your browser's local storage and
multiplayer is disabled (single-player + AI still fully works).

**Controls:** `W/↑` accelerate · `S/↓` brake/reverse · `A/D` or `←/→` steer · `Space` handbrake-drift
· `Shift` nitro · `C` change camera · `Esc` pause.

---

## Full go-live checklist

### 1. Push the code to GitHub

Run these commands **inside this project folder** (the zip ships as plain source, so init git
fresh — one time only):

```bash
git init
git add -A
git commit -m "RYDASH: 3D multiplayer street racing game"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/rydash.git
git push -u origin main
```

Don't have the GitHub repo yet? Go to **https://github.com/new**, name it `rydash`, keep it
**empty** (no README/`.gitignore` — this project already has both), click **Create repository**,
then copy the exact remote URL it shows you into the `git remote add origin ...` command above.
First push will ask you to sign in (browser popup, or a
[personal access token](https://github.com/settings/tokens) as the password).

### 2. Create the free Supabase project (multiplayer + real leaderboard + auth)

1. Go to **https://supabase.com** → sign up free → **New Project**.
2. Open the new project's **SQL Editor** → paste the contents of
   [`supabase_schema.sql`](supabase_schema.sql) → **Run**. This creates the `scores` (leaderboard)
   and `profiles` tables with row-level security already configured.
3. Go to **Project Settings → API** → copy the **Project URL** and the **anon public key**.
4. Locally: copy `.env.example` to `.env` and paste them in:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
   **Important:** `VITE_SUPABASE_URL` must be the *plain* project URL only — no `/rest/v1/` or
   any other path on the end. If you copy it from a REST API code example on the dashboard
   instead of the plain "Project URL" field, it'll have `/rest/v1/` appended, which silently
   breaks OAuth sign-in (auth calls end up at the wrong path) even though email/password
   sign-in still happens to work. Double-check it ends in exactly `.supabase.co` with nothing after.
5. Restart `npm run dev` — the Multiplayer Lobby, global leaderboard, and email sign-in/sign-up
   now work. No code changes needed; the app auto-detects the env vars.

### 2b. Enable Google sign-in (optional)

The Driver Login screen has a "Continue with Google" button already wired up. It won't work
until you activate the Google provider in Supabase:

1. [Google Cloud Console](https://console.cloud.google.com) → create a project (or use one) →
   **APIs & Services → Credentials** → **Create Credentials → OAuth client ID** → Web application.
2. Authorized redirect URI: `https://YOUR-PROJECT-REF.supabase.co/auth/v1/callback`.
3. Copy the generated **Client ID** and **Client Secret**.
4. In Supabase: **Authentication → Providers → Google** → paste both → **Save**.

No code changes needed — the button already calls the right provider once this is enabled.
Until then it shows a clear "provider not enabled" message instead of failing silently.

### 3. Deploy — Vercel (recommended, free)

1. Go to **https://vercel.com** → sign up/sign in (GitHub sign-in is one click) → **Add New → Project**.
2. Import the `rydash` GitHub repo you pushed in step 1.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist` (Vercel
   usually auto-detects all three).
4. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL` = your project URL — the plain one, no `/rest/v1/` on the end
   - `VITE_SUPABASE_ANON_KEY` = your anon key
5. Click **Deploy**. You get a public `https://rydash-xxxx.vercel.app` URL — **this is the link
   you share with friends**, not `localhost`. Anyone can open it on any device, no install needed,
   with multiplayer + leaderboard fully live.
6. **If you enabled Google sign-in**, one more step so it works on the live site: in Supabase go
   to **Authentication → URL Configuration** and add your Vercel URL (e.g.
   `https://rydash-xxxx.vercel.app`) to **Redirect URLs** — otherwise Google sign-in will work
   locally but fail on the deployed site with a redirect error. (Google Cloud Console's redirect
   URI doesn't need to change — it always points at Supabase, not at Vercel.)

### 3-alt. Deploy — Render (alternative, free)

1. **https://render.com** → sign up → **New + → Static Site** → connect the `rydash` GitHub repo.
2. Build command: `npm run build`. Publish directory: `dist`.
3. Under **Environment**, add the same two `VITE_SUPABASE_*` variables.
4. **Create Static Site** — Render gives you a public `https://rydash.onrender.com` URL.

Either host works well since this is a static SPA — all multiplayer/backend logic runs through
Supabase directly from the browser, so there's no server process to keep alive or pay for.

### 4. Whenever you make changes later

```bash
git add .
git commit -m "describe your change"
git push
```

Vercel/Render both auto-redeploy on every push to `main` — no extra step needed.

---

## Project structure

```
rydash/
├── index.html                 All screens/pages markup (SPA, router in main.js)
├── vite.config.js             Vite build config with vendor chunk splitting
├── src/
│   ├── main.js                 Router, race loop, input, HUD, screen wiring, world selection
│   ├── styles/main.css          Full neon UI design system
│   ├── game/
│   │   ├── CarFactory.js         10 procedural car models × 9 liveries (clear-coat paint, chrome, arches)
│   │   ├── CarController.js        Arcade drift physics + AI driver
│   │   ├── Audio.js                 Web Audio API procedural sound synthesizer (engine, drift, nitro, crashes)
│   │   ├── Effects.js               Bloom post-processing + drift smoke & spark particles
│   │   ├── EnvMap.js                Procedural equirectangular neon reflection map
│   │   ├── Ghost.js                  Local best-lap ghost recorder/player (localStorage)
│   │   ├── PreviewStage.js          Rotating 3D car preview (garage)
│   │   ├── World.js                 "Neon District" world: sky, city, rain, road, curbing, lights
│   │   ├── World_Sunset.js          "Sunline Highway" world: mountains, skyline, golden-hour sun
│   │   ├── World_Desert.js          "Neon Desert" world: glowing skyline, cacti, drone lights
│   │   ├── World_Underground.js     "Deep Run" world: tunnel girders, neon strips, passing train
│   │   ├── World_Rooftop.js         "Skyline" world: rooftop circuit, dense tower skyline, ramps
│   │   ├── World_Storm.js           "Storm City" world: lightning, storm clouds, heavy rain
│   │   ├── World_Coastal.js         "Coastal Highway" world: ocean wave vertex shaders, moonlit road
│   │   └── World_Vertical.js        "Vertical City" world: skyscraper canyons, flying traffic
│   └── net/
│       ├── supabaseClient.js        Supabase client init (local-mode fallback if unconfigured)
│       ├── multiplayer.js            Realtime room: create/join, presence, transform broadcast
│       └── backend.js                 Auth + leaderboard + profile read/write (Supabase or localStorage)
├── supabase_schema.sql        SQL to create the `scores` + `profiles` tables
└── .env.example                Copy to .env to enable Supabase
```

## Next steps / roadmap ideas

Voice chat in multiplayer rooms, a proper matchmaking queue instead of room codes, and ramps on
the other four worlds.
