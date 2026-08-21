import * as THREE from 'three';
import { CAR_MODELS, CAR_LIVERIES, RARITY, buildCar } from './game/CarFactory.js';
import { buildWorld as buildNeonWorld } from './game/World.js';
import { buildWorld as buildSunsetWorld } from './game/World_Sunset.js';
import { buildWorld as buildDesertWorld } from './game/World_Desert.js';
import { buildWorld as buildUndergroundWorld } from './game/World_Underground.js';
import { buildWorld as buildRooftopWorld } from './game/World_Rooftop.js';
import { buildWorld as buildStormWorld } from './game/World_Storm.js';
import { buildWorld as buildCoastalWorld } from './game/World_Coastal.js';
import { buildWorld as buildVerticalWorld } from './game/World_Vertical.js';
import { loadGhost, saveGhostIfBest, GhostRecorder, GhostPlayer } from './game/Ghost.js';
import { HomeAtmosphere } from './game/HomeAtmosphere.js';

const WORLDS = {
  neon: {
    label: 'Neon District', subtitle: 'RAIN CITY', location: 'USA',
    build: buildNeonWorld, image: '/bg/rainy-traffic-city.jpg',
    color: '#29d8ff', difficulty: 5, laps: '3.2 km', weather: 'RAIN',
    description: 'Wet streets, reflected neon and dense night traffic.'
  },
  sunset: {
    label: 'Sunline Highway', subtitle: 'GOLDEN COAST', location: 'USA',
    build: buildSunsetWorld, image: '/bg/atlanta-sunset-highway.jpg',
    color: '#ffb84d', difficulty: 4, laps: '4.1 km', weather: 'CLEAR',
    description: 'Fast sweeping highway runs through golden-hour light.'
  },
  desert: {
    label: 'Black Desert', subtitle: 'NEON DUNES', location: 'UAE',
    build: buildDesertWorld, image: '/bg/sport-car-roadside.jpg',
    color: '#ff8b3d', difficulty: 5, laps: '4.7 km', weather: 'DRY',
    description: 'High-speed desert straights, dunes and futuristic towers.'
  },
  underground: {
    label: 'Deep Run', subtitle: 'UNDERGROUND', location: 'RAVEX',
    build: buildUndergroundWorld, image: '/bg/foggy-night-street.jpg',
    color: '#a77dff', difficulty: 5, laps: '3.0 km', weather: 'FOG',
    description: 'A technical tunnel circuit packed with lights and tight bends.'
  },
  rooftop: {
    label: 'Skyline', subtitle: 'ROOFTOP CITY', location: 'TOKYO',
    build: buildRooftopWorld, image: '/bg/panoramic-city-night.jpg',
    color: '#65e8ff', difficulty: 4, laps: '2.8 km', weather: 'CLEAR',
    description: 'Rooftop launches, elevated roads and skyline jumps.'
  },
  storm: {
    label: 'Storm City', subtitle: 'ELECTRIC FRONT', location: 'EUROPE',
    build: buildStormWorld, image: '/bg/bangkok-chinatown-night.jpg',
    color: '#c28bff', difficulty: 5, laps: '3.6 km', weather: 'STORM',
    description: 'Lightning, rain and low visibility turn every corner into a risk.'
  },
  coastal: {
    label: 'Coastal Highway', subtitle: 'OCEAN DRIVE', location: 'PACIFIC',
    build: buildCoastalWorld, image: '/bg/sport-car-roadside.jpg',
    color: '#39d9ff', difficulty: 3, laps: '4.5 km', weather: 'SEA BREEZE',
    description: 'Open coastal roads, ocean views and long flowing corners.'
  },
  vertical: {
    label: 'Vertical City', subtitle: 'MEGA-CITY', location: 'NEO TOKYO',
    build: buildVerticalWorld, image: '/bg/shibuya-neon-town.jpg',
    color: '#ff5fb2', difficulty: 5, laps: '3.4 km', weather: 'NEON',
    description: 'Towering city blocks, elevated lanes and extreme visual scale.'
  },
};

const WORLD_PHASES = {
  day:    { label: 'DAY', icon: '☀️', sky: 0x83c9f4, fog: 0xa9d7eb, light: 1.28, tint: '#66cfff' },
  sunset: { label: 'SUNSET', icon: '🌅', sky: 0xd88470, fog: 0x8f6570, light: 1.08, tint: '#ffad72' },
  night:  { label: 'NIGHT', icon: '🌙', sky: 0x10233d, fog: 0x18324f, light: 0.98, tint: '#54b9ff' },
  storm:  { label: 'STORM', icon: '⚡', sky: 0x52627c, fog: 0x60748a, light: 0.92, tint: '#a9c7ff' },
};

function applyRaceBackdrop(worldId, phaseId) {
  const screen = $('screen-race');
  const world = WORLDS[worldId] || WORLDS.neon;
  const phase = WORLD_PHASES[phaseId] || WORLD_PHASES.sunset;
  if (!screen) return;
  const gradients = {
    day: 'linear-gradient(180deg, rgba(78,170,225,.05), rgba(18,45,68,.22))',
    sunset: 'linear-gradient(180deg, rgba(255,151,93,.06), rgba(24,43,65,.20))',
    night: 'linear-gradient(180deg, rgba(16,39,64,.18), rgba(7,23,40,.28))',
    storm: 'linear-gradient(180deg, rgba(81,110,139,.12), rgba(16,31,48,.30))'
  };
  screen.style.backgroundImage = `${gradients[phaseId] || gradients.sunset}, url("${world.image}")`;
  screen.style.backgroundPosition = 'center 38%';
  screen.style.backgroundSize = 'cover';
  screen.style.backgroundAttachment = 'fixed';
  screen.style.setProperty('--race-phase-tint', phase.tint);
  screen.style.setProperty('--race-phase-id', phaseId);
  screen.dataset.world = worldId;
  screen.dataset.phase = phaseId;
}

function applyWorldPhase(scene, phaseId = 'sunset') {
  const phase = WORLD_PHASES[phaseId] || WORLD_PHASES.sunset;
  // The cinematic photo backdrop lives behind the transparent Three.js canvas.
  // Keeping scene.background transparent lets the track + cars sit over a
  // bright, readable world instead of a flat dark color.
  scene.background = null;
  if (scene.fog) {
    if (scene.fog.isFogExp2) scene.fog.density = Math.min(scene.fog.density || 0.002, phaseId === 'storm' ? 0.0022 : 0.00165);
    scene.fog.color.setHex(phase.fog);
  }
  scene.traverse((obj) => {
    if (obj.isLight) {
      const base = obj.userData.rydashBaseIntensity ?? obj.intensity;
      if (obj.userData.rydashBaseIntensity == null) obj.userData.rydashBaseIntensity = base;
      obj.intensity = base * Math.max(1.05, phase.light);
    }
    if (obj.isMesh && obj.material) {
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      mats.forEach((mat) => {
        if ('envMapIntensity' in mat) mat.envMapIntensity = Math.max(mat.envMapIntensity || 0, 2.4);
        if (mat.isMeshPhysicalMaterial) {
          mat.roughness = Math.min(mat.roughness, 0.38);
          mat.clearcoat = Math.max(mat.clearcoat || 0, 0.7);
        }
      });
    }
  });
}


import { CarController, AIDriver } from './game/CarController.js';
import { buildComposer, SmokeSystem, SparkSystem, WaterSpraySystem, NitroJetSystem } from './game/Effects.js';
import { PreviewStage } from './game/PreviewStage.js';
import { sound } from './game/Audio.js';
import { MultiplayerRoom } from './net/multiplayer.js';
import { supabaseReady } from './net/supabaseClient.js';
import * as backend from './net/backend.js';

/* ============================== APP STATE ============================== */
const state = {
  screen: 'screen-loading',
  carIndex: 0,
  liveryIndex: 0,
  playerName: localStorage.getItem('rydash_name') || localStorage.getItem('vx_name') || 'RACER',
  quality: localStorage.getItem('rydash_quality') || localStorage.getItem('vx_quality') || 'high',
  cameraMode: localStorage.getItem('rydash_camera') || localStorage.getItem('vx_camera') || 'chase',
  worldId: localStorage.getItem('rydash_world') || localStorage.getItem('vx_world') || 'coastal',
  worldPhase: localStorage.getItem('rydash_world_phase') || 'day',
  soundOn: (localStorage.getItem('rydash_sound') ?? localStorage.getItem('vx_sound')) !== 'false',
  showFps: (localStorage.getItem('rydash_fps') ?? localStorage.getItem('vx_fps')) === 'true',
  totalLaps: Number(localStorage.getItem('rydash_laps')) || 3,
  credits: Number(localStorage.getItem('rydash_credits')) || 0,
  gems: Number(localStorage.getItem('rydash_gems')) || 0,
  xp: Number(localStorage.getItem('rydash_xp')) || 0,
  session: null,
  multiplayer: null,
  isMultiplayerRace: false,
};

const $ = (id) => document.getElementById(id);
const qs = (sel) => document.querySelector(sel);

let garageStage = null;
let homeAtmosphere = null;

function initHomeAtmosphere() {
  const canvas = $('homeAtmosphereCanvas');
  if (canvas && !homeAtmosphere) {
    homeAtmosphere = new HomeAtmosphere(canvas);
    homeAtmosphere.setWorld(state.worldId);
    homeAtmosphere.start();
  }
}

// Simple, honest progression: every 1,000 XP is a level. Rewards below are earned from actual
// race results (finishing position), not fabricated — nothing here is decorative-only.
const XP_PER_LEVEL = 1000;
function levelFromXp(xp) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}
function awardRaceRewards(position, totalRacers) {
  const placementBonus = Math.max(0, totalRacers - position) * 60;
  const creditsEarned = 200 + placementBonus;
  const gemsEarned = position === 1 ? 5 : position <= 3 ? 2 : 0;
  const xpEarned = 150 + placementBonus;
  state.credits += creditsEarned;
  state.gems += gemsEarned;
  state.xp += xpEarned;
  localStorage.setItem('rydash_credits', state.credits);
  localStorage.setItem('rydash_gems', state.gems);
  localStorage.setItem('rydash_xp', state.xp);
  updateProfileHudUI();
  return { creditsEarned, gemsEarned, xpEarned };
}
function updateProfileHudUI() {
  const level = levelFromXp(state.xp);
  const xpIntoLevel = state.xp % XP_PER_LEVEL;
  const creditsEl = $('hudCredits');
  if (creditsEl) creditsEl.textContent = state.credits.toLocaleString();
  const gemsEl = $('hudGems');
  if (gemsEl) gemsEl.textContent = state.gems.toLocaleString();
  const levelEl = $('hudLevel');
  if (levelEl) levelEl.textContent = level;
  const nameEl = $('hudProfileName');
  if (nameEl) nameEl.textContent = state.playerName;
  const xpFill = $('hudXpFill');
  if (xpFill) xpFill.style.width = `${(xpIntoLevel / XP_PER_LEVEL) * 100}%`;
}

function updateHomeHeroCardUI() {
  updateProfileHudUI();
  const m = CAR_MODELS[state.carIndex] || CAR_MODELS[0];
  const photoEl = $('heroCarPhoto');
  if (photoEl) {
    photoEl.src = `/cars/car-${state.carIndex}-hd.jpg`;
    photoEl.alt = m.name;
  }
  const photoLargeEl = $('heroCarPhotoLarge');
  if (photoLargeEl) photoLargeEl.src = `/cars/car-${state.carIndex}-hd.jpg`;
  const nameFloatEl = $('heroCarNameFloat');
  if (nameFloatEl) nameFloatEl.textContent = m.name;
  const nameEl = $('heroCarName');
  if (nameEl) nameEl.textContent = m.name;
  const rarityEl = $('heroCarRarity');
  if (rarityEl) {
    const r = m.rarity || 'legendary';
    rarityEl.textContent = r.toUpperCase();
    rarityEl.className = `rarity-badge rarity-${r}`;
  }
  const driverEl = $('heroCarDriver');
  if (driverEl) driverEl.textContent = state.playerName || 'Guest';

  const spd = Math.round(m.topSpeed * 100);
  const hnd = Math.round(m.handling * 100);
  const drf = Math.round((m.drift || 0.8) * 100);
  const nit = Math.round(m.nitro * 100);
  const acc = Math.round(m.accel * 100);

  if ($('heroStatSpeed')) $('heroStatSpeed').style.width = spd + '%';
  if ($('heroNumSpeed')) $('heroNumSpeed').textContent = spd;

  if ($('heroStatHandling')) $('heroStatHandling').style.width = hnd + '%';
  if ($('heroNumHandling')) $('heroNumHandling').textContent = hnd;

  if ($('heroStatDrift')) $('heroStatDrift').style.width = drf + '%';
  if ($('heroNumDrift')) $('heroNumDrift').textContent = drf;

  if ($('heroStatNitro')) $('heroStatNitro').style.width = nit + '%';
  if ($('heroNumNitro')) $('heroNumNitro').textContent = nit;

  if ($('heroStatAccel')) $('heroStatAccel').style.width = acc + '%';
  if ($('heroNumAccel')) $('heroNumAccel').textContent = acc;

  document.querySelectorAll('.quick-car-btn').forEach((btn) => {
    btn.classList.toggle('active', Number(btn.dataset.carIdx) === state.carIndex);
  });

  const worldLabel = $('homeCurrentWorldLabel');
  if (worldLabel) {
    worldLabel.textContent = (WORLDS[state.worldId] || WORLDS.neon).label.toUpperCase();
  }
}

function updatePreviewStages() {
  if (garageStage) garageStage.setCarByIndex(state.carIndex, state.liveryIndex);
  updateHomeHeroCardUI();
}

function initGarageStage() {
  const container = $('garageStageWrap');
  if (container && !garageStage) {
    garageStage = new PreviewStage(container, { interactive: true });
    garageStage.setCarByIndex(state.carIndex, state.liveryIndex);
    garageStage.start();
  } else if (garageStage) {
    garageStage.setCarByIndex(state.carIndex, state.liveryIndex);
    garageStage.start();
  }
}

/* ============================== SCREEN ROUTER ============================== */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach((el) => el.classList.remove('active'));
  const target = $(id) || $('screen-home');
  if (target) {
    target.classList.add('active');
    state.screen = target.id;
  }

  // Navigation must remain usable even if a visual/remote subsystem fails.
  document.querySelectorAll('[data-back]').forEach((btn) => {
    btn.onclick = () => showScreen(btn.dataset.back);
  });

  try {
    if (id === 'screen-home' || id === 'screen-worldmap') {
      initHomeAtmosphere();
      homeAtmosphere?.start();
    } else {
      homeAtmosphere?.stop();
    }
  } catch (error) {
    console.warn('[RYDASH] Home atmosphere unavailable; UI remains active.', error);
  }

  try {
    if (id === 'screen-home') {
      updateHomeHeroCardUI();
      loadHomeActivityFeed().catch((error) => console.warn('[RYDASH] Activity feed unavailable.', error));
      garageStage?.stop();
    } else if (id === 'screen-garage') {
      initGarageStage();
      garageStage?.start();
    } else {
      garageStage?.stop();
    }
  } catch (error) {
    console.warn('[RYDASH] Optional screen enhancement failed; navigation remains active.', error);
  }
}

function toast(msg, ms = 2400) {
  const t = $('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.remove('hidden');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add('hidden'), ms);
}

/* ============================== SOUND TOGGLE ============================== */
function updateSoundUI() {
  const icon = $('soundIcon') || $('navSoundIcon');
  if (icon) icon.textContent = state.soundOn ? '🔊' : '🔇';
  const settingCheckbox = $('settingSound');
  if (settingCheckbox) settingCheckbox.checked = state.soundOn;
  sound.setEnabled(state.soundOn);
}

const navSoundToggle = $('navSoundToggle');
if (navSoundToggle) {
  navSoundToggle.addEventListener('click', () => {
    sound.init();
    state.soundOn = !state.soundOn;
    localStorage.setItem('rydash_sound', state.soundOn);
    updateSoundUI();
    toast(state.soundOn ? 'Sound: Enabled' : 'Sound: Muted');
  });
}

/* ============================== BOOT / INIT ============================== */
async function boot() {
  // Reveal the product immediately. Authentication, audio, atmosphere and
  // backend services are enhancements and must never block the home screen.
  showScreen('screen-home');
  window.__RYDASH_BOOTED = true;

  try {
    const authStatus = $('authStatus') || $('navPlayerName');
  if (authStatus) authStatus.textContent = state.playerName;
  updateSoundUI();
  startChallengeResetCountdown();

  // Wire Topbar / Auth Buttons
  const navAuthBtn = $('navAuthBtn') || $('navLoginBtn');
  if (navAuthBtn) navAuthBtn.onclick = () => showScreen('screen-auth');

  // Quick Race & Multiplayer
  const playBtn = $('playBtn') || $('heroRaceBtn');
  const startEngineBtn = $('startEngineBtn');
  const quickRaceHandler = () => {
    sound.init();
    startRaceFlow(false);
  };
  if (playBtn) playBtn.onclick = quickRaceHandler;
  if (startEngineBtn) startEngineBtn.onclick = quickRaceHandler;
  const multiplayerBtn = $('multiplayerBtn') || $('heroMultiBtn');
  if (multiplayerBtn) {
    multiplayerBtn.onclick = () => {
      sound.init();
      showScreen('screen-lobby');
    };
  }

  // 5-Button Dock
  const garageBtn = $('garageBtn') || $('dockGarageBtn');
  if (garageBtn) garageBtn.onclick = () => { showScreen('screen-garage'); openGarage(() => showScreen('screen-home')); };

  const leaderboardBtn = $('leaderboardBtn') || $('dockLeaderboardBtn');
  if (leaderboardBtn) leaderboardBtn.onclick = () => { showScreen('screen-leaderboard'); loadLeaderboard(); };

  const worldmapBtn = $('worldmapBtn') || $('dockWorldBtn');
  if (worldmapBtn) worldmapBtn.onclick = () => { showScreen('screen-worldmap'); setWorld(state.worldId); updateLapPillsUI(); };

  const settingsBtn = $('settingsBtn') || $('dockSettingsBtn');
  if (settingsBtn) settingsBtn.onclick = () => showScreen('screen-settings');

  const howtoBtn = $('howtoBtn') || $('dockHowToBtn');
  if (howtoBtn) howtoBtn.onclick = () => showScreen('screen-howto');

  // Nav tabs / quick-launch shortcuts share one action via data-nav, so the same
  // destination can be reachable from more than one button without id collisions.
  document.querySelectorAll('[data-nav]').forEach((btn) => {
    const target = btn.dataset.nav;
    btn.onclick = () => {
      if (target === 'garage') { showScreen('screen-garage'); openGarage(() => showScreen('screen-home')); }
      else if (target === 'leaderboard') { showScreen('screen-leaderboard'); loadLeaderboard(); }
      else if (target === 'world') { showScreen('screen-worldmap'); setWorld(state.worldId); updateLapPillsUI(); }
      else if (target === 'settings') showScreen('screen-settings');
      else if (target === 'howto') showScreen('screen-howto');
      else if (target === 'multiplayer') { sound.init(); showScreen('screen-lobby'); }
      else if (target === 'home') showScreen('screen-home');
    };
  });

  // Quick Car Strip Buttons on Home
  document.querySelectorAll('.quick-car-btn').forEach((btn) => {
    btn.onclick = () => {
      const idx = Number(btn.dataset.carIdx);
      if (!isNaN(idx)) {
        state.carIndex = idx;
        localStorage.setItem('rydash_car', idx);
        updatePreviewStages();
        toast(`Selected: ${CAR_MODELS[idx].name}`);
      }
    };
  });

  // Immediately display the home screen without waiting for auth network
  showScreen('screen-home');
  updateHomeHeroCardUI();

  // Supabase Auth (non-blocking in background)
  backend.getCurrentUser().then((user) => {
    if (user) {
      state.session = user;
      state.playerName = user.user_metadata?.driver_name || user.email?.split('@')[0] || state.playerName;
      if (authStatus) authStatus.textContent = state.playerName;
      if (navAuthBtn) navAuthBtn.textContent = '👤 ' + state.playerName;
      updateHomeHeroCardUI();
    }
    }).catch(() => {});
  } catch (error) {
    console.error('[RYDASH] Non-fatal boot initializer error:', error);
    // The home screen is already active; keep it usable.
    try { showScreen('screen-home'); } catch (_) {}
  }
}

/* ============================== AUTH HANDLERS ============================== */
const authForm = $('authForm');
if (authForm) {
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = $('authEmail')?.value.trim();
    const password = $('authPassword')?.value;
    const msg = $('authMsg');
    if (msg) msg.textContent = 'Signing in…';
    const res = await backend.signIn(email, password);
    if (res.error) {
      if (msg) msg.textContent = res.error.message || 'Failed to sign in';
    } else {
      if (msg) msg.textContent = 'Welcome back!';
      state.session = res.user;
      state.playerName = res.user.user_metadata?.driver_name || email.split('@')[0];
      const authStatus = $('authStatus') || $('navPlayerName');
      if (authStatus) authStatus.textContent = state.playerName;
      const navAuthBtn = $('navAuthBtn') || $('navLoginBtn');
      if (navAuthBtn) navAuthBtn.textContent = '👤 ' + state.playerName;
      setTimeout(() => showScreen('screen-home'), 600);
    }
  });
}

const authSignUpBtn = $('authSignUpBtn');
if (authSignUpBtn) {
  authSignUpBtn.addEventListener('click', async () => {
    const email = $('authEmail')?.value.trim();
    const password = $('authPassword')?.value;
    const msg = $('authMsg');
    if (!email || password.length < 6) {
      if (msg) msg.textContent = 'Enter email & 6+ char password';
      return;
    }
    if (msg) msg.textContent = 'Creating account…';
    const res = await backend.signUp(email, password, { driver_name: email.split('@')[0] });
    if (res.error) {
      if (msg) msg.textContent = res.error.message || 'Sign up failed';
    } else {
      if (msg) msg.textContent = 'Account created! Check email or sign in.';
    }
  });
}

const authGuestBtn = $('authGuestBtn');
if (authGuestBtn) {
  authGuestBtn.addEventListener('click', () => {
    toast('Continuing in Guest Mode');
    showScreen('screen-home');
  });
}

/* ============================== GARAGE ============================== */
let garageOnConfirm = null;

function openGarage(onConfirm) {
  garageOnConfirm = onConfirm;
  initGarageStage();
  buildGarageCards();
  buildColorSwatches();
}

function buildGarageCards() {
  const grid = $('garageGrid');
  if (!grid) return;
  grid.innerHTML = '';
  CAR_MODELS.forEach((m, idx) => {
    const card = document.createElement('div');
    const rarityClass = 'rarity-' + (m.rarity || 'rare');
    card.className = `car-card car-card-${idx} ${rarityClass} ${idx === state.carIndex ? 'active selected' : ''}`;
    const num = String(idx + 1).padStart(2, '0');
    const spd = Math.round(m.topSpeed * 100);
    const hnd = Math.round(m.handling * 100);
    const acc = Math.round(m.accel * 100);
    const nit = Math.round(m.nitro * 100);
    card.innerHTML = `
      <div class="car-card-header">
        <span class="car-num">${num}</span>
        <span class="car-title">${m.name}</span>
        <span class="rarity-tag ${rarityClass}">${(m.rarity || 'RARE').toUpperCase()}</span>
      </div>
      <div class="car-class">${(m.class || 'EXOTIC GT').toUpperCase()}</div>
      <img src="./cars/car-${idx}-hd.jpg" alt="${m.name}" class="car-card-img" />
      <div class="car-stats">
        <div class="stat-row">
          <span class="stat-name">SPEED</span>
          <div class="stat-bar-track"><div class="stat-bar-fill fill-orange" style="width:${spd}%"></div></div>
          <span class="stat-val">${spd}</span>
        </div>
        <div class="stat-row">
          <span class="stat-name">HANDLING</span>
          <div class="stat-bar-track"><div class="stat-bar-fill fill-cyan" style="width:${hnd}%"></div></div>
          <span class="stat-val">${hnd}</span>
        </div>
        <div class="stat-row">
          <span class="stat-name">ACCELERATION</span>
          <div class="stat-bar-track"><div class="stat-bar-fill fill-purple" style="width:${acc}%"></div></div>
          <span class="stat-val">${acc}</span>
        </div>
        <div class="stat-row">
          <span class="stat-name">NITRO</span>
          <div class="stat-bar-track"><div class="stat-bar-fill fill-green" style="width:${nit}%"></div></div>
          <span class="stat-val">${nit}</span>
        </div>
      </div>
    `;
    card.onclick = () => {
      state.carIndex = idx;
      localStorage.setItem('rydash_car', idx);
      updatePreviewStages();
      buildGarageCards();
      toast(`Selected: ${m.name}`);
    };
    grid.appendChild(card);
  });
}

function buildColorSwatches() {
  const wrap = $('colorSwatches');
  if (!wrap) return;
  wrap.innerHTML = '';
  CAR_LIVERIES.forEach((l, i) => {
    const hex = '#' + l.color.toString(16).padStart(6, '0');
    const b = document.createElement('button');
    b.className = 'swatch' + (i === state.liveryIndex ? ' active' : '');
    b.style.background = hex;
    b.style.color = hex;
    b.title = l.name;
    b.onclick = () => {
      state.liveryIndex = i;
      localStorage.setItem('rydash_livery', i);
      updatePreviewStages();
      buildColorSwatches();
    };
    wrap.appendChild(b);
  });
}

const selectCarBtn = $('selectCarBtn');
if (selectCarBtn) {
  selectCarBtn.addEventListener('click', () => {
    if (garageOnConfirm) garageOnConfirm();
    else showScreen('screen-worldmap');
  });
}

// Garage Bottom Dock Buttons
$('garageWorldBtn')?.addEventListener('click', () => { showScreen('screen-worldmap'); setWorld(state.worldId); updateLapPillsUI(); });
$('garageLeadBtn')?.addEventListener('click', () => { showScreen('screen-leaderboard'); loadLeaderboard(); });
$('garageMultiBtn')?.addEventListener('click', () => { showScreen('screen-lobby'); });
$('garageSettingsBtn')?.addEventListener('click', () => { showScreen('screen-settings'); });
$('garageHowtoBtn')?.addEventListener('click', () => { showScreen('screen-howto'); });
$('garageQuickRaceBtn')?.addEventListener('click', () => { sound.init(); startRaceFlow(false); });

/* ============================== LOBBY (MULTIPLAYER) ============================== */
const createRoomBtn = $('createRoomBtn');
if (createRoomBtn) {
  createRoomBtn.addEventListener('click', async () => {
    const code = MultiplayerRoom.generateCode();
    await joinRoom(code, true);
  });
}

const joinRoomBtn = $('joinRoomBtn');
if (joinRoomBtn) {
  joinRoomBtn.addEventListener('click', async () => {
    const code = $('joinCodeInput')?.value.trim().toUpperCase();
    if (!code || code.length !== 5) {
      const msg = $('lobbyMsg');
      if (msg) msg.textContent = 'Enter a valid 5-letter code.';
      return;
    }
    await joinRoom(code, false);
  });
}

async function joinRoom(code, isHost) {
  const msg = $('lobbyMsg');
  if (msg) msg.textContent = 'Connecting to room…';
  try {
    const local = { id: backend.getGuestId(), name: state.playerName, carModel: CAR_MODELS[state.carIndex].id, livery: CAR_LIVERIES[state.liveryIndex].id };
    const room = new MultiplayerRoom(code, local);
    room.onPlayerJoin = () => updateLobbyUI(room);
    room.onPlayerLeave = () => updateLobbyUI(room);
    room.onRaceStart = () => { state.isMultiplayerRace = true; beginRace(); };
    await room.connect();
    state.multiplayer = room;
    const roomCodeDisplay = $('roomCodeDisplay');
    if (roomCodeDisplay) roomCodeDisplay.textContent = code;
    const roomInfo = $('roomInfo');
    if (roomInfo) roomInfo.classList.remove('hidden');
    const startRaceBtn = $('startRaceBtn');
    if (startRaceBtn) startRaceBtn.classList.toggle('hidden', !isHost);
    if (msg) msg.textContent = isHost ? 'Room created — share this code!' : 'Joined room!';
    updateLobbyUI(room);
  } catch (err) {
    if (msg) msg.textContent = err.message || 'Connection failed';
  }
}

function updateLobbyUI(room) {
  const playerCount = $('playerCount');
  if (playerCount) playerCount.textContent = `${room.playerCount} / 8 Racers`;
  const list = $('lobbyPlayerList');
  if (list) {
    list.innerHTML = `<li>🏁 ${state.playerName} (you)</li>`;
    room.remotePlayers.forEach((p) => {
      const li = document.createElement('li');
      li.textContent = `🚗 ${p.name || 'Racer'}`;
      list.appendChild(li);
    });
  }
}

const startRaceBtn = $('startRaceBtn');
if (startRaceBtn) {
  startRaceBtn.addEventListener('click', () => {
    state.multiplayer?.sendRaceStart({ startedAt: Date.now() });
    state.isMultiplayerRace = true;
    beginRace();
  });
}

const leaveRoomBtn = $('leaveRoomBtn');
if (leaveRoomBtn) {
  leaveRoomBtn.addEventListener('click', () => {
    state.multiplayer?.leave?.();
    state.multiplayer = null;
    $('roomInfo')?.classList.add('hidden');
    showScreen('screen-home');
  });
}

/* ============================== RACE ENGINE ============================== */
let raceCtx = null;

function startRaceFlow(multiplayer) {
  state.isMultiplayerRace = multiplayer;
  beginRace();
}

function beginRace() {
  showScreen('screen-race');
  const canvas = $('gameCanvas');
  const width = window.innerWidth, height = window.innerHeight;

  // Ultra-crisp rendering: anti-aliasing & HiDPI retina pixel ratio
  const pixelRatio = Math.min(window.devicePixelRatio, state.quality === 'high' ? 2.0 : 1.5);
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = state.quality !== 'low';
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.setClearColor(0x000000, 0);
  renderer.toneMappingExposure = state.quality === 'high' ? 2.08 : 1.86;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(62, width / height, 0.1, 1400);

  // 2026 readability rig: a neutral sky fill plus a moving cool key keep the
  // player's paint, wheels and bodywork readable even in dark environments.
  const raceSkyFill = new THREE.HemisphereLight(0xe8f7ff, 0x355875, 1.65);
  raceSkyFill.userData.rydashBaseIntensity = 1.65;
  scene.add(raceSkyFill);
  const carKey = new THREE.PointLight(0xb9eaff, 4.6, 34, 2);
  carKey.userData.rydashBaseIntensity = 4.6;
  scene.add(carKey);
  const carRim = new THREE.DirectionalLight(0xffffff, 1.15);
  carRim.userData.rydashBaseIntensity = 1.15;
  carRim.position.set(6, 10, -8);
  scene.add(carRim);

  const activeWorld = WORLDS[state.worldId] || WORLDS.neon;
  applyRaceBackdrop(state.worldId, state.worldPhase);
  const { curve, trackWidth, update: updateWorld, ramps = [] } = activeWorld.build(scene, { phase: state.worldPhase });
  applyWorldPhase(scene, state.worldPhase);

  // Race gates are ordered around the actual closed track.  The previous build
  // used a very wide 10-point proximity test, which could skip gates at speed
  // and make laps feel like a dummy counter.  We use 20 narrow, directional gates.
  const CP_COUNT = 20;
  const checkpointPoints = curve.getSpacedPoints(CP_COUNT);
  const checkpoints = checkpointPoints.slice(0, CP_COUNT).map((p) => p.clone());
  const checkpointRadius = Math.max(4.2, trackWidth * 0.48);

  function buildRaceGates() {
    const group = new THREE.Group();
    group.name = 'RYDASH_RACE_GATES';
    checkpoints.forEach((p, i) => {
      const tangent = curve.getTangentAt(i / CP_COUNT).normalize();
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
      const isStart = i === 0;
      const gate = new THREE.Group();
      gate.position.set(p.x, 0, p.z);
      gate.lookAt(p.x + tangent.x, 0, p.z + tangent.z);

      const postMat = new THREE.MeshStandardMaterial({
        color: isStart ? 0x39ff9d : 0x6ecbff,
        emissive: isStart ? 0x39ff9d : 0x168cff,
        emissiveIntensity: isStart ? 1.8 : 0.9,
        metalness: 0.35, roughness: 0.28
      });
      const postGeo = new THREE.CylinderGeometry(0.11, 0.14, 3.0, 10);
      [-trackWidth * 0.48, trackWidth * 0.48].forEach((x) => {
        const post = new THREE.Mesh(postGeo, postMat);
        post.position.set(x, 1.5, 0);
        gate.add(post);
      });

      if (isStart) {
        const banner = new THREE.Mesh(
          new THREE.BoxGeometry(trackWidth * 0.96, 0.55, 0.16),
          new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x39ff9d, emissiveIntensity: 0.9 })
        );
        banner.position.y = 3.0;
        gate.add(banner);
      }
      group.add(gate);
    });
    scene.add(group);
    return group;
  }
  const raceGates = buildRaceGates();

  // Minimap
  const minimapCanvas = $('minimapCanvas');
  const minimapCtx = minimapCanvas ? minimapCanvas.getContext('2d') : null;
  let minimapPoints = null;
  let mapProject = null;
  if (minimapCtx) {
    const raw = curve.getSpacedPoints(48).map((p) => ({ x: p.x, z: p.z }));
    const xs = raw.map((p) => p.x), zs = raw.map((p) => p.z);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minZ = Math.min(...zs), maxZ = Math.max(...zs);
    const span = Math.max(maxX - minX, maxZ - minZ) || 1;
    const pad = 18, size = minimapCanvas.width;
    const scale = (size - pad * 2) / span;
    const centerX = (minX + maxX) / 2, centerZ = (minZ + maxZ) / 2;
    mapProject = (wx, wz) => ({ x: size / 2 + (wx - centerX) * scale, y: size / 2 + (wz - centerZ) * scale });
    minimapPoints = raw.map((p) => mapProject(p.x, p.z));
  }
  function updateMinimap() {
    if (!minimapCtx) return;
    const size = minimapCanvas.width;
    minimapCtx.clearRect(0, 0, size, size);
    minimapCtx.save();
    minimapCtx.beginPath();
    minimapCtx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
    minimapCtx.clip();

    minimapCtx.beginPath();
    minimapPoints.forEach((p, i) => (i === 0 ? minimapCtx.moveTo(p.x, p.y) : minimapCtx.lineTo(p.x, p.y)));
    minimapCtx.closePath();
    minimapCtx.strokeStyle = 'rgba(0,229,255,.55)';
    minimapCtx.lineWidth = 3;
    minimapCtx.stroke();

    remoteRacers.forEach((r) => {
      if (!r.rig.group.visible) return;
      const p = mapProject(r.rig.group.position.x, r.rig.group.position.z);
      minimapCtx.fillStyle = '#ffd166';
      minimapCtx.beginPath();
      minimapCtx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      minimapCtx.fill();
    });

    opponents.forEach((o) => {
      const p = mapProject(o.ctrl.position.x, o.ctrl.position.z);
      minimapCtx.fillStyle = '#ff2e88';
      minimapCtx.beginPath();
      minimapCtx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
      minimapCtx.fill();
    });

    const pp = mapProject(player.position.x, player.position.z);
    minimapCtx.fillStyle = '#00e5ff';
    minimapCtx.shadowColor = '#00e5ff';
    minimapCtx.shadowBlur = 6;
    minimapCtx.beginPath();
    minimapCtx.arc(pp.x, pp.y, 4, 0, Math.PI * 2);
    minimapCtx.fill();
    minimapCtx.shadowBlur = 0;
    minimapCtx.restore();
  }

  // Nitro pickups
  const NITRO_PICKUP_TS = [0.12, 0.32, 0.5, 0.68, 0.85];
  const nitroPickups = NITRO_PICKUP_TS.map((t) => {
    const p = curve.getPointAt(t);
    const group = new THREE.Group();
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.1, 0.14, 10, 24),
      new THREE.MeshStandardMaterial({ color: 0x39ff9d, emissive: 0x39ff9d, emissiveIntensity: 2.2, metalness: 0.3, roughness: 0.3 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.set(p.x, 1.0, p.z);
    group.add(ring);
    const glow = new THREE.PointLight(0x39ff9d, 1.4, 8, 2);
    glow.position.copy(ring.position);
    group.add(glow);
    scene.add(group);
    return { position: new THREE.Vector3(p.x, 0, p.z), group, ring, radius: 2.4, cooldown: 0 };
  });

  function updateNitroPickups(dt) {
    nitroPickups.forEach((pk) => {
      if (pk.cooldown > 0) {
        pk.cooldown -= dt;
        pk.group.visible = pk.cooldown <= 0;
      }
      pk.ring.rotation.z += dt * 1.2;
      pk.ring.position.y = 1.0 + Math.sin(performance.now() * 0.003 + pk.position.x) * 0.15;
    });
  }

  function checkNitroPickup(ctrl) {
    if (ctrl.nitro >= 0.98) return;
    for (const pk of nitroPickups) {
      if (pk.cooldown > 0) continue;
      const dx = ctrl.position.x - pk.position.x;
      const dz = ctrl.position.z - pk.position.z;
      if (Math.hypot(dx, dz) < pk.radius) {
        ctrl.nitro = 1;
        pk.cooldown = 10;
        pk.group.visible = false;
        smoke.emit(ctrl.rig.group.position, 0.8);
        if (ctrl === player) {
          toast('Nitro refilled!');
          sound.playPickup();
        }
        break;
      }
    }
  }

  // Player car
  const modelDef = CAR_MODELS[state.carIndex];
  const livery = CAR_LIVERIES[state.liveryIndex];
  const playerRig = buildCar(modelDef, livery.color);
  scene.add(playerRig.group);

  if (state.quality !== 'low') {
    playerRig.headlightSpots.forEach((spot) => {
      spot.intensity = 3.2;
      spot.castShadow = state.quality === 'high';
      if (spot.castShadow) { spot.shadow.mapSize.set(512, 512); spot.shadow.bias = -0.003; }
    });
  }

  const player = new CarController(playerRig, modelDef, { isPlayer: true, trackCurve: curve, trackWidth });
  const startPoint = checkpoints[0];
  const startTangent = curve.getTangentAt(0);
  const startHeading = Math.atan2(startTangent.x, startTangent.z);
  const startNormal = new THREE.Vector3(-startTangent.z, 0, startTangent.x).normalize();
  player.setStartTransform(startPoint.clone().addScaledVector(startNormal, -2.4), startHeading);
  player.nextCP = 1;
  player.lap = 1;
  $('hudLap') && ($('hudLap').textContent = '1');
  $('hudTotalLaps') && ($('hudTotalLaps').textContent = String(state.totalLaps));

  // Opponents: 7 AI racers
  const opponents = [];
  const opponentDefs = [
    { name: 'NitroKing', modelIdx: 0, liveryIdx: 1 },
    { name: 'SpeedDemon', modelIdx: 1, liveryIdx: 2 },
    { name: 'DriftGhost', modelIdx: 2, liveryIdx: 0 },
    { name: 'PhantomX', modelIdx: 3, liveryIdx: 4 },
    { name: 'StreetLegend', modelIdx: 4, liveryIdx: 5 },
    { name: 'NightRider', modelIdx: 5, liveryIdx: 6 },
    { name: 'Redline', modelIdx: 6, liveryIdx: 7 },
  ];

  opponentDefs.forEach((def, i) => {
    const oppModel = CAR_MODELS[def.modelIdx % CAR_MODELS.length];
    const oppLivery = CAR_LIVERIES[def.liveryIdx % CAR_LIVERIES.length];
    const oppRig = buildCar(oppModel, oppLivery.color);
    scene.add(oppRig.group);
    const oppCtrl = new CarController(oppRig, oppModel, { isPlayer: false, trackCurve: curve, trackWidth });
    const row = Math.floor(i / 2);
    const col = i % 2;
    const t0 = -(row + 1) * 0.012;
    const tStart = ((t0 % 1) + 1) % 1;
    const p0 = curve.getPointAt(tStart);
    const tangent0 = curve.getTangentAt(tStart).normalize();
    const normal0 = new THREE.Vector3(-tangent0.z, 0, tangent0.x).normalize();
    const lateral = (col === 0 ? -1 : 1) * 3.1;
    oppCtrl.setStartTransform(p0.clone().addScaledVector(normal0, lateral), Math.atan2(tangent0.x, tangent0.z));
    // Race progress belongs to the controller itself. The previous build kept
    // nextCP/lap only on the wrapper object, while checkpointAdvance() reads
    // ctrl.nextCP/ctrl.lap — making AI lap progression effectively a dummy state.
    oppCtrl.nextCP = 1;
    oppCtrl.lap = 1;
    oppCtrl.finished = false;
    const ai = new AIDriver(oppCtrl, curve, { tOffset: ((t0 % 1) + 1) % 1, targetSpeedKmh: oppModel.topSpeed * 290, aggro: 0.82 + i * 0.03 });
    opponents.push({ ctrl: oppCtrl, ai, name: def.name, finishTimeMs: null });
  });

  // Live multiplayer cars: remote racers are real Three.js car rigs driven by
  // Supabase Realtime transforms, not placeholder dots in the lobby.
  const remoteRacers = new Map();

  function ensureRemoteRacer(id, meta = {}) {
    if (!state.multiplayer || id === state.multiplayer.local.id) return null;
    if (remoteRacers.has(id)) return remoteRacers.get(id);

    const model = CAR_MODELS.find((c) => c.id === meta.carModel) || CAR_MODELS[0];
    const liver = CAR_LIVERIES.find((l) => l.id === meta.livery) || CAR_LIVERIES[0];
    const rig = buildCar(model, liver.color);
    rig.group.scale.multiplyScalar(1.01);
    scene.add(rig.group);
    const racer = {
      id, name: meta.name || 'Racer', rig,
      target: null, lastSeen: performance.now(),
      lap: 1, nextCP: 1, finished: false
    };
    // Put a connected racer into a visible grid slot immediately instead of
    // leaving an invisible car at world origin until its first network packet.
    const gridIndex = Math.max(0, remoteRacers.size);
    const gridT = (((gridIndex + 2) * -0.012) % 1 + 1) % 1;
    const gridPoint = curve.getPointAt(gridT);
    const gridTangent = curve.getTangentAt(gridT).normalize();
    const gridNormal = new THREE.Vector3(-gridTangent.z, 0, gridTangent.x).normalize();
    racer.rig.group.position.copy(gridPoint.clone().addScaledVector(gridNormal, gridIndex % 2 ? 3.1 : -3.1));
    racer.rig.group.rotation.y = Math.atan2(gridTangent.x, gridTangent.z);
    remoteRacers.set(id, racer);
    return racer;
  }

  function removeRemoteRacer(id) {
    const racer = remoteRacers.get(id);
    if (!racer) return;
    scene.remove(racer.rig.group);
    remoteRacers.delete(id);
  }

  if (state.multiplayer) {
    const room = state.multiplayer;
    room.remotePlayers.forEach((meta, id) => ensureRemoteRacer(id, meta));
    room.onPlayerJoin = (id, meta) => { ensureRemoteRacer(id, meta); updateLobbyUI(room); };
    room.onPlayerLeave = (id) => { removeRemoteRacer(id); updateLobbyUI(room); };
    room.onTransform = (payload) => {
      const racer = ensureRemoteRacer(payload.id, room.remotePlayers.get(payload.id) || {});
      if (racer) {
        racer.target = payload;
        racer.lap = Number(payload.lap) || racer.lap;
        racer.nextCP = Number(payload.cp) || racer.nextCP;
        racer.finished = Boolean(payload.finished);
        racer.lastSeen = performance.now();
      }
    };
  }

  // Effects
  const smoke = new SmokeSystem(scene, 140);
  const sparks = new SparkSystem(scene, 240);
  const waterSpray = new WaterSpraySystem(scene, 180);
  const nitroJets = new NitroJetSystem(scene);

  const { composer, bloom, motionBlur } = buildComposer(renderer, scene, camera, width, height);
  bloom.enabled = state.quality !== 'low';
  motionBlur.enabled = state.quality !== 'low';

  // Input
  const input = { gas: 0, brake: 0, steer: 0, handbrake: 0, nitro: false, horn: false };
  const keys = new Set();
  function onKeyDown(e) {
    keys.add(e.code);
    if (e.code === 'Escape') togglePause();
    if (e.code === 'KeyC') cycleCamera();
    if (e.code === 'KeyH') sound.startHorn();
  }
  function onKeyUp(e) {
    keys.delete(e.code);
    if (e.code === 'KeyH') sound.stopHorn();
  }
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const touchControls = $('touchControls');
  if (touchControls) touchControls.classList.toggle('hidden', !isTouch);
  const touchState = { gas: false, brake: false, left: false, right: false, nitro: false, horn: false };
  function bindTouch(id, key) {
    const el = $(id);
    if (!el) return;
    const set = (v) => {
      touchState[key] = v;
      if (key === 'horn') {
        if (v) sound.startHorn();
        else sound.stopHorn();
      }
    };
    el.addEventListener('touchstart', (e) => { e.preventDefault(); set(true); }, { passive: false });
    el.addEventListener('touchend', (e) => { e.preventDefault(); set(false); }, { passive: false });
    el.addEventListener('mousedown', () => set(true));
    el.addEventListener('mouseup', () => set(false));
  }
  bindTouch('touchGas', 'gas');
  bindTouch('touchBrake', 'brake');
  bindTouch('touchLeft', 'left');
  bindTouch('touchRight', 'right');
  bindTouch('touchNitro', 'nitro');
  bindTouch('touchHorn', 'horn');

  function readInput() {
    sound.init();
    const gas = keys.has('KeyW') || keys.has('ArrowUp') || touchState.gas;
    const brake = keys.has('KeyS') || keys.has('ArrowDown') || touchState.brake;
    const left = keys.has('KeyA') || keys.has('ArrowLeft') || touchState.left;
    const right = keys.has('KeyD') || keys.has('ArrowRight') || touchState.right;
    const hornKey = keys.has('KeyH') || touchState.horn;

    input.gas = gas ? 1 : 0;
    input.brake = brake ? 1 : 0;
    // Note: the chase camera looks along +dir (opposite Three.js's default -Z view direction),
    // which mirrors screen-left/right relative to world +X/-X -- so the sign here is intentionally
    // inverted from the "obvious" left=-1/right=+1 mapping to actually turn the right way on screen.
    input.steer = (left ? 1 : 0) + (right ? -1 : 0);
    input.handbrake = keys.has('Space') || (touchState.brake && gas);
    input.nitro = keys.has('ShiftLeft') || keys.has('ShiftRight') || touchState.nitro;
    input.horn = hornKey;
  }

  // Camera modes & Tight Chase Camera
  let camMode = state.cameraMode;
  function cycleCamera() {
    camMode = camMode === 'chase' ? 'hood' : camMode === 'hood' ? 'orbit' : 'chase';
    toast(`Camera: ${camMode}`);
  }
  const camOffset = new THREE.Vector3();
  let shakeIntensity = 0;
  function bumpShake(amount) {
    shakeIntensity = Math.min(1.6, shakeIntensity + amount);
    sound.playImpact(amount);
  }

  let countdownT = 0;
  let isCountingDown = true;

  function updateCamera(dt) {
    const carPos = player.rig.group.position;
    const heading = player.heading;
    const dir = new THREE.Vector3(Math.sin(heading), 0, Math.cos(heading));
    
    let shakeX = 0, shakeY = 0;
    if (shakeIntensity > 0.001) {
      shakeX = (Math.random() - 0.5) * shakeIntensity * 0.55;
      shakeY = (Math.random() - 0.5) * shakeIntensity * 0.35;
      shakeIntensity *= Math.max(0, 1 - dt * 7);
    } else {
      shakeIntensity = 0;
    }

    if (isCountingDown) {
      // 3D Cinematic opening crane shot sweeping from front-quarter beauty angle to rear chase position
      const orbitAngle = heading + Math.PI * 0.8 * (1 - countdownT);
      const orbitDist = 5.6 - countdownT * 0.6;
      const orbitHeight = 1.6 + (1 - countdownT) * 1.2;
      camera.position.set(
        carPos.x - Math.sin(orbitAngle) * orbitDist + shakeX,
        carPos.y + orbitHeight + shakeY,
        carPos.z - Math.cos(orbitAngle) * orbitDist
      );
      camera.lookAt(carPos.x, carPos.y + 0.9, carPos.z);
      camera.fov = 68;
      camera.updateProjectionMatrix();
      return;
    }

    if (camMode === 'chase') {
      // Tighter dynamic chase camera
      const speedRatio = THREE.MathUtils.clamp(player.speedKmh / 300, 0, 1);
      const targetDist = player.nitroActive ? 7.0 : (6.0 + speedRatio * 0.9);
      const targetHeight = 2.05 + speedRatio * 0.38;
      
      camOffset.set(-dir.x * targetDist, targetHeight, -dir.z * targetDist);
      const target = carPos.clone().add(camOffset);
      camera.position.lerp(target, Math.min(1, dt * 8.5));
      camera.position.x += shakeX;
      camera.position.y += shakeY;

      const lookTarget = carPos.clone().add(new THREE.Vector3(dir.x * 4.2, 1.05, dir.z * 4.2));
      camera.lookAt(lookTarget);

      const targetRoll = -player.steerInput * 0.045 * THREE.MathUtils.clamp(player.speedKmh / 60, 0, 1);
      camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRoll, Math.min(1, dt * 6));

      const baseFov = 68;
      const speedFov = (player.speedKmh / 320) * 13;
      const nitroFov = player.nitroActive ? 6.5 : 0;
      camera.fov = THREE.MathUtils.lerp(camera.fov, baseFov + speedFov + nitroFov, Math.min(1, dt * 6));
      camera.updateProjectionMatrix();
    } else if (camMode === 'hood') {
      const hoodPos = carPos.clone().add(new THREE.Vector3(dir.x * 1.35, 1.12, dir.z * 1.35));
      camera.position.lerp(hoodPos, Math.min(1, dt * 12));
      camera.position.x += shakeX; camera.position.y += shakeY;
      camera.lookAt(carPos.x + dir.x * 12, carPos.y + 0.95, carPos.z + dir.z * 12);
    } else {
      const t = performance.now() * 0.0003;
      camera.position.set(carPos.x + Math.sin(t) * 11 + shakeX, 4.5 + shakeY, carPos.z + Math.cos(t) * 11);
      camera.lookAt(carPos);
    }
  }

  // Countdown + race state
  let raceStarted = false;
  let raceFinished = false;
  let elapsedMs = 0;
  let lastFrame = performance.now();
  let lastLapStartMs = 0;
  let bestLapMs = null;
  let lastGear = 1;

  runCountdown(() => {
    raceStarted = true;
    isCountingDown = false;
    lastFrame = performance.now();
    sound.startEngine();
  });

  const hudTotalLaps = $('hudTotalLaps');
  if (hudTotalLaps) hudTotalLaps.textContent = state.totalLaps;
  const hudWorldName = $('hudWorldName');
  if (hudWorldName) hudWorldName.textContent = (WORLDS[state.worldId] || WORLDS.neon).label.toUpperCase();
  const hudWorldPhase = $('hudWorldPhase');
  if (hudWorldPhase) {
    const phase = WORLD_PHASES[state.worldPhase] || WORLD_PHASES.sunset;
    hudWorldPhase.textContent = `${phase.icon} ${phase.label}`;
  }
  const hudLast = $('hudLast');
  if (hudLast) hudLast.textContent = '--:--.---';
  
  const resumeBtn = $('resumeBtn');
  if (resumeBtn) resumeBtn.onclick = togglePause;
  const restartBtn = $('restartBtn');
  if (restartBtn) restartBtn.onclick = () => { teardownRace(); beginRace(); };
  const quitBtn = $('quitBtn');
  if (quitBtn) quitBtn.onclick = () => { teardownRace(); showScreen('screen-home'); };
  const pauseBtn = $('pauseBtn');
  if (pauseBtn) pauseBtn.onclick = togglePause;
  const raceBackBtn = $('raceBackBtn');
  if (raceBackBtn) raceBackBtn.onclick = () => {
    if (raceFinished || confirm('Leave this race? Your current race will end.')) {
      teardownRace();
      state.isMultiplayerRace = false;
      showScreen(state.multiplayer ? 'screen-lobby' : 'screen-home');
    }
  };

  let paused = false;
  function togglePause() {
    if (!raceStarted || raceFinished) return;
    paused = !paused;
    $('pauseOverlay')?.classList.toggle('hidden', !paused);
    if (!paused) lastFrame = performance.now();
  }

  function checkpointAdvance(ctrl, pos) {
    if (!ctrl || ctrl.finished) return false;
    const cp = checkpoints[ctrl.nextCP];
    if (!cp) return false;

    const dx = pos.x - cp.x;
    const dz = pos.z - cp.z;
    if ((dx * dx + dz * dz) <= checkpointRadius * checkpointRadius) {
      ctrl.nextCP += 1;
      if (ctrl.nextCP >= CP_COUNT) {
        ctrl.nextCP = 0;
        ctrl.lap = (ctrl.lap || 1) + 1;
        return true;
      }
    }
    return false;
  }

  // Elastic vehicle-to-vehicle collision detection & impulse physics
  const CAR_RADIUS = 2.15;
  function resolveCarCollisions(playerCtrl, aiList) {
    const all = [playerCtrl, ...aiList.map((o) => o.ctrl)];
    for (let i = 0; i < all.length; i++) {
      for (let j = i + 1; j < all.length; j++) {
        const a = all[i], b = all[j];
        const dx = a.position.x - b.position.x;
        const dz = a.position.z - b.position.z;
        const dist = Math.hypot(dx, dz);
        const minDist = CAR_RADIUS * 2;
        if (dist > 0.0001 && dist < minDist) {
          const overlap = (minDist - dist) / 2;
          const nx = dx / dist, nz = dz / dist;
          const normal = new THREE.Vector3(nx, 0, nz);
          
          a.position.x += nx * overlap; a.position.z += nz * overlap;
          b.position.x -= nx * overlap; b.position.z -= nz * overlap;
          a.rig.group.position.copy(a.position);
          b.rig.group.position.copy(b.position);

          const relativeSpeed = Math.abs(a.speed - b.speed) + 4;
          const impulseMagnitude = Math.min(22, relativeSpeed * 1.2);
          
          if (a.applyCollisionImpulse) a.applyCollisionImpulse(normal.clone().multiplyScalar(impulseMagnitude), 0.88);
          if (b.applyCollisionImpulse) b.applyCollisionImpulse(normal.clone().multiplyScalar(-impulseMagnitude), 0.88);

          const contactPoint = a.rig.group.position.clone().lerp(b.rig.group.position, 0.5);
          contactPoint.y += 0.45;
          sparks.emit(contactPoint, Math.min(20, Math.round(relativeSpeed * 1.5)));

          if (a === playerCtrl || b === playerCtrl) {
            bumpShake(Math.min(1.2, relativeSpeed / 45));
          }
        }
      }
    }
  }

  function segmentDistance(px, pz, ax, az, bx, bz) {
    const abx = bx - ax, abz = bz - az;
    const apx = px - ax, apz = pz - az;
    const abLenSq = abx * abx + abz * abz || 1;
    const t = THREE.MathUtils.clamp((apx * abx + apz * abz) / abLenSq, 0, 1);
    const cx = ax + abx * t, cz = az + abz * t;
    return Math.hypot(px - cx, pz - cz);
  }

  function applyOffRoadDrag(ctrl, dt) {
    const prevCP = checkpoints[(ctrl.nextCP - 1 + CP_COUNT) % CP_COUNT];
    const nextCP = checkpoints[ctrl.nextCP];
    const dist = segmentDistance(ctrl.position.x, ctrl.position.z, prevCP.x, prevCP.z, nextCP.x, nextCP.z);
    const offRoad = dist > trackWidth / 2 + 1.6;
    if (offRoad && !ctrl.airborne) {
      ctrl.speed *= Math.max(0.88, 1 - dt * 1.6);
      ctrl.offRoad = true;
    } else {
      ctrl.offRoad = false;
    }
  }

  function checkRamps(ctrl) {
    if (!ctrl.airborne) {
      for (const ramp of ramps) {
        const dx = ctrl.position.x - ramp.position.x;
        const dz = ctrl.position.z - ramp.position.z;
        if (Math.hypot(dx, dz) < ramp.radius && Math.abs(ctrl.speed) > ramp.minSpeed) {
          ctrl.launch(ramp.launchVy, ramp.forwardBoost);
          break;
        }
      }
    }
    if (ctrl.justLanded) {
      smoke.emit(ctrl.rig.group.position, 1.6);
      if (ctrl === player) bumpShake(0.8);
    }
  }

  function finishRace() {
    raceFinished = true;
    sound.stopEngine();
    sound.updateDrift(0);
    sound.updateNitro(false);
    const timeMs = Math.round(elapsedMs);
    backend.submitScore({ name: state.playerName, timeMs, car: modelDef.id, livery: livery.id });
    const finishedAhead = opponents.filter((o) => (o.finishTimeMs ?? Infinity) < timeMs).length;
    awardRaceRewards(finishedAhead + 1, opponents.length + 1);
    showResults(timeMs, opponents);
  }

  let fpsAcc = 0, fpsFrames = 0, fpsLast = performance.now();

  function frame(now) {
    raceCtx.rafId = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - lastFrame) / 1000);
    lastFrame = now;

    if (isCountingDown) {
      countdownT = Math.min(1, countdownT + dt * 0.35);
      updateCamera(dt);
      composer.render();
      return;
    }

    if (raceStarted && !paused && !raceFinished) {
      elapsedMs += dt * 1000;
      readInput();
      player.applyPlayerInput(input, dt);
      player.step(dt);

      if (state.multiplayer) {
        state.multiplayer.sendTransform({
          x: player.position.x, y: player.position.y, z: player.position.z,
          heading: player.heading, speed: player.speed, lap: player.lap,
          cp: player.nextCP, finished: Boolean(player.finished)
        });
      }

      remoteRacers.forEach((racer) => {
        if (!racer.target) return;
        const t = racer.target;
        racer.rig.group.position.lerp(
          new THREE.Vector3(Number(t.x) || 0, Number(t.y) || 0, Number(t.z) || 0),
          Math.min(1, dt * 12)
        );
        if (Number.isFinite(Number(t.heading))) {
          racer.rig.group.rotation.y = THREE.MathUtils.lerp(
            racer.rig.group.rotation.y, Number(t.heading), Math.min(1, dt * 10)
          );
        }
        racer.rig.group.visible = performance.now() - racer.lastSeen < 5000;
      });

      // Check gear shift pop
      if (player.gear !== lastGear && player.gear !== 'R') {
        sound.playGearShift();
        lastGear = player.gear;
      }

      sound.updateEngine(player.speedKmh, player.rpm || 3000, input.gas, player.nitroActive);
      sound.updateDrift(player.driftFactor);
      sound.updateNitro(player.nitroActive);

      if (checkpointAdvance(player, player.rig.group.position)) {
        const hudLap = $('hudLap');
        if (hudLap) hudLap.textContent = Math.min(player.lap, state.totalLaps);
        if (player.lap <= state.totalLaps) {
          const msgOverlay = $('raceMsgOverlay');
          const msgText = $('raceMsgText');
          if (msgOverlay && msgText) {
            msgText.textContent = `LAP ${player.lap - 1} COMPLETE  •  ${formatRaceTime(elapsedMs - lastLapStartMs)}`;
            msgOverlay.classList.remove('hidden');
            clearTimeout(window.__rydashLapToast);
            window.__rydashLapToast = setTimeout(() => msgOverlay.classList.add('hidden'), 1700);
          }
        }
        const lapTime = elapsedMs - lastLapStartMs;
        lastLapStartMs = elapsedMs;
        const hudLast = $('hudLast');
        if (hudLast) hudLast.textContent = formatRaceTime(lapTime);
        if (bestLapMs === null || lapTime < bestLapMs) {
          bestLapMs = lapTime;
          const hudBest = $('hudBest');
          if (hudBest) hudBest.textContent = formatRaceTime(bestLapMs);
        }
        if (player.lap > state.totalLaps) {
          player.finished = true;
          if (state.multiplayer) state.multiplayer.sendFinish({ timeMs: Math.round(elapsedMs), lap: player.lap });
          finishRace();
        }
      }

      // Tire smoke on drift / hard acceleration
      if (player.driftFactor > 0.12 && Math.abs(player.speed) > 5) {
        const rl = player.rig.wheels.rl.getWorldPosition(new THREE.Vector3());
        const rr = player.rig.wheels.rr.getWorldPosition(new THREE.Vector3());
        smoke.emit(rl, player.driftFactor * 1.5);
        smoke.emit(rr, player.driftFactor * 1.5);
      }

      // Water spray on wet tracks (Neon Rain, Storm City, Coastal)
      const isWetTrack = state.worldId === 'neon' || state.worldId === 'storm' || state.worldId === 'coastal';
      if (isWetTrack && player.speedKmh > 35) {
        const dir = new THREE.Vector3(Math.sin(player.heading), 0, Math.cos(player.heading));
        const rl = player.rig.wheels.rl.getWorldPosition(new THREE.Vector3());
        const rr = player.rig.wheels.rr.getWorldPosition(new THREE.Vector3());
        waterSpray.emit(rl, dir, player.speedKmh);
        waterSpray.emit(rr, dir, player.speedKmh);
      }

      // Nitro jet flames
      nitroJets.update(player.position, player.heading, player.nitroActive, dt);

      opponents.forEach((o) => {
        o.ai.step(dt);
        o.ctrl.step(dt);
        if (checkpointAdvance(o.ctrl, o.ctrl.rig.group.position)) {
          if (o.ctrl.lap > state.totalLaps && !o.finishTimeMs) {
            o.ctrl.finished = true;
            o.finishTimeMs = Math.round(elapsedMs);
          }
        }
      });

      resolveCarCollisions(player, opponents);
      checkRamps(player);
      opponents.forEach((o) => checkRamps(o.ctrl));
      applyOffRoadDrag(player, dt);
      opponents.forEach((o) => applyOffRoadDrag(o.ctrl, dt));
      updateNitroPickups(dt);
      checkNitroPickup(player);
      opponents.forEach((o) => checkNitroPickup(o.ctrl));

      updateCamera(dt);
      updateHud(player, opponents, elapsedMs, remoteRacers);
      updateMinimap();

      if (motionBlur.enabled) {
        const speedFrac = THREE.MathUtils.clamp((player.speedKmh - 120) / 140, 0, 1);
        const targetBlur = player.nitroActive ? 1.0 : speedFrac * 0.7;
        const targetAberration = player.nitroActive ? 1.0 : (player.speedKmh > 240 ? 0.4 : 0);
        motionBlur.uniforms.uIntensity.value = THREE.MathUtils.lerp(motionBlur.uniforms.uIntensity.value, targetBlur, Math.min(1, dt * 7));
        if (motionBlur.uniforms.uAberration) {
          motionBlur.uniforms.uAberration.value = THREE.MathUtils.lerp(motionBlur.uniforms.uAberration.value, targetAberration, Math.min(1, dt * 7));
        }
      }
    }

    smoke.update(dt);
    sparks.update(dt);
    waterSpray.update(dt);
    updateWorld(dt);
    if (player) {
      carKey.position.set(player.position.x - Math.sin(player.heading) * 2.5, player.position.y + 4.5, player.position.z - Math.cos(player.heading) * 2.5);
    }
    composer.render();

    if (state.showFps) {
      fpsAcc += dt; fpsFrames++;
      if (now - fpsLast > 500) {
        const fpsCounter = $('fpsCounter');
        if (fpsCounter) fpsCounter.textContent = `${Math.round(fpsFrames / fpsAcc)} FPS`;
        fpsAcc = 0; fpsFrames = 0; fpsLast = now;
      }
    }
  }

  function onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const pr = Math.min(window.devicePixelRatio, state.quality === 'high' ? 2.0 : 1.5);
    renderer.setPixelRatio(pr);
    renderer.setSize(w, h);
    composer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  raceCtx = {
    rafId: null,
    teardown() {
      cancelAnimationFrame(this.rafId);
      sound.stopEngine();
      sound.updateDrift(0);
      sound.updateNitro(false);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    },
  };
  const fpsCounter = $('fpsCounter');
  if (fpsCounter) fpsCounter.classList.toggle('hidden', !state.showFps);
  raceCtx.rafId = requestAnimationFrame(frame);
}

function teardownRace() {
  if (raceCtx) { raceCtx.teardown(); raceCtx = null; }
  sound.stopEngine();
  sound.updateDrift(0);
  sound.updateNitro(false);
  $('pauseOverlay')?.classList.add('hidden');
}

function runCountdown(onGo) {
  const overlay = $('countdownOverlay');
  const num = $('countdownNum');
  if (overlay) overlay.classList.remove('hidden');
  let n = 3;
  if (num) num.textContent = n;
  sound.playCountdown(false);
  const iv = setInterval(() => {
    n -= 1;
    if (n > 0) {
      if (num) num.textContent = n;
      sound.playCountdown(false);
    } else if (n === 0) {
      if (num) num.textContent = 'GO!';
      sound.playCountdown(true);
    } else {
      clearInterval(iv);
      if (overlay) overlay.classList.add('hidden');
      onGo();
    }
  }, 800);
}

function formatRaceTime(ms) {
  const m = Math.floor(ms / 60000);
  const s = ((ms % 60000) / 1000).toFixed(3);
  return `${m}:${s.padStart(6, '0')}`;
}

const SPEEDO_MAX_KMH = 320;
const SPEEDO_CIRCUMFERENCE = 2 * Math.PI * 70;

function updateHud(player, opponents, elapsedMs, remoteRacers = null) {
  const hudSpeed = $('hudSpeed');
  if (hudSpeed) hudSpeed.textContent = Math.round(player.speedKmh);
  
  const gearVal = player.gear || (player.speed < -0.2 ? 'R' : (Math.min(6, Math.floor(player.speedKmh / 45) + 1)));
  const hudGear = $('hudGear');
  if (hudGear) hudGear.textContent = gearVal;
  
  const rpmEl = $('hudRpm');
  if (rpmEl) {
    rpmEl.textContent = `${Math.round(player.rpm || 3000).toLocaleString()} RPM`;
  }

  const nitroFill = $('nitroFill');
  if (nitroFill) nitroFill.style.width = `${player.nitro * 100}%`;
  
  const hudTimer = $('hudTimer');
  if (hudTimer) hudTimer.textContent = formatRaceTime(elapsedMs);

  const speedoFrac = THREE.MathUtils.clamp(player.speedKmh / SPEEDO_MAX_KMH, 0, 1);
  const ring = $('speedoFillRing');
  if (ring) {
    ring.style.strokeDashoffset = SPEEDO_CIRCUMFERENCE * (1 - speedoFrac);
    ring.style.stroke = speedoFrac > 0.85 ? '#ff2e2e' : speedoFrac > 0.6 ? '#ff7a1a' : '#00e5ff';
  }

  const speedFrac = THREE.MathUtils.clamp((player.speedKmh - 110) / 100, 0, 1);
  const linesOpacity = player.nitroActive ? 0.85 : speedFrac * 0.5;
  const speedLines = $('speedLines');
  if (speedLines) speedLines.style.opacity = linesOpacity;

  const progressOf = (r) => {
    const lap = Math.max(1, Number(r.lap) || 1);
    const cp = Math.max(0, Number(r.nextCP) || 0);
    return ((lap - 1) * CP_COUNT) + cp;
  };
  const remoteStandings = remoteRacers ? Array.from(remoteRacers.values()).map((r) => ({
    name: r.name || 'Racer',
    lap: Number(r.target?.lap || r.lap || 1),
    cp: Number(r.target?.cp || r.nextCP || 0),
    me: false
  })) : [];
  const standings = [{ name: state.playerName + ' (you)', lap: player.lap || 1, cp: player.nextCP || 0, me: true }]
    .concat(opponents.map((o) => ({ name: o.name, lap: o.ctrl?.lap || 1, cp: o.ctrl?.nextCP || 0, me: false })))
    .concat(remoteStandings);
  standings.sort((a, b) => progressOf(b) - progressOf(a));
  
  const myRank = standings.findIndex((s) => s.me) + 1;
  const hudPos = $('hudPos');
  if (hudPos) hudPos.textContent = String(myRank).padStart(2, '0');
  const hudPosTotal = $('hudPosTotal');
  if (hudPosTotal) hudPosTotal.textContent = String(standings.length).padStart(2, '0');

  const hudPositions = $('hudPositions');
  if (hudPositions) {
    hudPositions.innerHTML = standings.slice(0, 8).map((s, idx) => {
      const label = s.me ? 'YOU' : String(s.name || 'RACER').replace(' (you)', '').slice(0, 12).toUpperCase();
      const lapLabel = `L${Math.min(state.totalLaps, Number(s.lap) || 1)}`;
      const active = s.me ? ' you' : '';
      return `<div class="race-order-row${active}"><b>${idx + 1}</b><span>${escapeHtml(label)}</span><em>${lapLabel}</em></div>`;
    }).join('');
  }

  const currentLap = Math.min(state.totalLaps, Math.max(1, Number(player.lap) || 1));
  const cpProgress = THREE.MathUtils.clamp((Number(player.nextCP) || 1) / CP_COUNT, 0, 1);
  const lapFill = $('hudLapProgressFill');
  if (lapFill) lapFill.style.width = `${cpProgress * 100}%`;
  const lapProgressText = $('hudLapProgressText');
  if (lapProgressText) lapProgressText.textContent = `LAP ${currentLap} / ${state.totalLaps}`;
}

function showResults(timeMs, opponents) {
  teardownRace();
  showScreen('screen-results');
  const mins = Math.floor(timeMs / 60000);
  const secs = ((timeMs % 60000) / 1000).toFixed(3);
  const list = [{ name: state.playerName + ' (you)', time: timeMs, me: true }];

  // Real result per opponent when they actually crossed the line during the race
  // (o.finishTimeMs, set live in the race loop); for anyone still on track when the
  // player finished, project their time from their own simulated lap progress instead
  // of inventing a random number.
  (opponents || []).forEach((o) => {
    // Never invent a finish time. A racer who has not crossed the line is DNF.
    list.push({ name: o.name, time: o.finishTimeMs, me: false, dnf: o.finishTimeMs == null });
  });

  list.sort((a, b) => {
    if (a.dnf && !b.dnf) return 1;
    if (!a.dnf && b.dnf) return -1;
    if (a.dnf && b.dnf) return 0;
    return a.time - b.time;
  });
  const resultsList = $('resultsList');
  if (resultsList) {
    resultsList.innerHTML = list.map((r, i) => {
      if (r.dnf) {
        return `<div class="res-row ${r.me ? 'me' : ''}"><span>${i + 1}. ${escapeHtml(r.name)}</span><span class="dnf">DNF</span></div>`;
      }
      const m = Math.floor(r.time / 60000);
      const s = ((r.time % 60000) / 1000).toFixed(3);
      return `<div class="res-row ${r.me ? 'me' : ''}"><span>${i + 1}. ${escapeHtml(r.name)}</span><span>${m}:${s.padStart(6, '0')}</span></div>`;
    }).join('');
  }

  const myRank = list.findIndex((r) => r.me) + 1;
  const resultsBest = $('resultsBest');
  if (resultsBest) {
    resultsBest.textContent = `Rank: ${myRank}/${list.length} • Your time: ${mins}:${secs.padStart(6, '0')}`;
  }
}

$('raceAgainBtn')?.addEventListener('click', () => beginRace());
$('resultsMenuBtn')?.addEventListener('click', () => showScreen('screen-home'));

/* ============================== DAILY CHALLENGE RESET COUNTDOWN ============================== */
// A real countdown to the next local midnight, ticking every second -- not a static placeholder.
let challengeCountdownStarted = false;
function tickChallengeResetCountdown() {
  const el = $('challengeResetTimer');
  if (!el) return;
  const now = new Date();
  const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0, 0);
  const remainingMs = nextMidnight - now;
  const h = Math.floor(remainingMs / 3600000);
  const m = Math.floor((remainingMs % 3600000) / 60000);
  const s = Math.floor((remainingMs % 60000) / 1000);
  el.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
function startChallengeResetCountdown() {
  if (challengeCountdownStarted) return;
  challengeCountdownStarted = true;
  tickChallengeResetCountdown();
  setInterval(tickChallengeResetCountdown, 1000);
}

/* ============================== HOME ACTIVITY FEED ============================== */
// Shows real recent race submissions from the scores table (or local fallback) — never
// invented player names. An empty backend shows an honest "be the first" state instead.
function timeAgoLabel(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
async function loadHomeActivityFeed() {
  const feed = $('homeActivityFeed');
  if (!feed) return;
  const rows = await backend.fetchRecentActivity(5);
  if (!rows.length) {
    feed.innerHTML = '<p class="activity-empty muted">No races submitted yet — be the first on the board.</p>';
    return;
  }
  feed.innerHTML = rows.map((r) => {
    const m = Math.floor(r.time_ms / 60000);
    const s = ((r.time_ms % 60000) / 1000).toFixed(3);
    return `<p class="activity-row">💬 <b>${escapeHtml(r.driver_name)}</b> set ${m}:${s.padStart(6, '0')} in <span class="accent">${escapeHtml(r.car)}</span> <span class="activity-time">${timeAgoLabel(r.created_at)}</span></p>`;
  }).join('');
}

/* ============================== LEADERBOARD ============================== */
// Every column here is real (POS/PLAYER/CAR/BEST LAP come straight from the scores table).
// No fabricated fallback rows or made-up races/wins counts -- an empty table shows an
// honest "no times yet" state instead.
async function loadLeaderboard() {
  const body = $('leaderboardBody');
  if (!body) return;
  body.innerHTML = '<tr><td colspan="4" class="muted center">Loading records…</td></tr>';
  const rows = await backend.fetchLeaderboard(25);

  if (!rows || !rows.length) {
    body.innerHTML = '<tr><td colspan="4" class="muted center">No lap times submitted yet — finish a race to set the first one.</td></tr>';
    return;
  }

  body.innerHTML = rows.map((r, i) => {
    const m = Math.floor(r.time_ms / 60000);
    const s = ((r.time_ms % 60000) / 1000).toFixed(3);
    return `<tr>
      <td><b>#${i + 1}</b></td>
      <td>${escapeHtml(r.driver_name)}</td>
      <td><span class="accent">${escapeHtml(r.car)}</span></td>
      <td><b>${m}:${s.padStart(6, '0')}</b></td>
    </tr>`;
  }).join('');
}
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

document.querySelectorAll('.lead-tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.lead-tab-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    loadLeaderboard();
  });
});

/* ============================== SETTINGS ============================== */
document.querySelectorAll('.set-tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.set-tab-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

const settingQuality = $('settingQuality');
if (settingQuality) settingQuality.value = state.quality;
const settingSound = $('settingSound');
if (settingSound) settingSound.checked = state.soundOn;
const settingFps = $('settingFps');
if (settingFps) settingFps.checked = state.showFps;
sound.setEnabled(state.soundOn);

const resetSettingsBtn = $('resetSettingsBtn');
if (resetSettingsBtn) {
  resetSettingsBtn.addEventListener('click', () => {
    if (settingQuality) settingQuality.value = 'high';
    if (settingSound) settingSound.checked = true;
    if (settingFps) settingFps.checked = false;
    toast('Settings reset to defaults');
  });
}

const applySettingsBtn = $('applySettingsBtn');
if (applySettingsBtn) {
  applySettingsBtn.addEventListener('click', () => {
    if (settingQuality) state.quality = settingQuality.value;
    if (settingSound) state.soundOn = settingSound.checked;
    if (settingFps) state.showFps = settingFps.checked;
    localStorage.setItem('rydash_quality', state.quality);
    localStorage.setItem('rydash_sound', state.soundOn);
    localStorage.setItem('rydash_fps', state.showFps);
    sound.setEnabled(state.soundOn);
    toast('Settings applied successfully!');
    showScreen('screen-home');
  });
}

function renderWorldPreview() {
  const w = WORLDS[state.worldId] || WORLDS.neon;
  const p = WORLD_PHASES[state.worldPhase] || WORLD_PHASES.night;
  const img = $('worldPreviewImage');
  if (img) {
    img.src = w.image;
    img.alt = `${w.label} ${p.label}`;
  }
  const title = $('worldPreviewTitle');
  if (title) title.textContent = w.label;
  const sub = $('worldPreviewSubtitle');
  if (sub) sub.textContent = `${w.subtitle} • ${w.location}`;
  const desc = $('worldPreviewDescription');
  if (desc) desc.textContent = w.description;
  const meta = $('worldPreviewMeta');
  if (meta) meta.innerHTML = `<span>${w.weather}</span><span>${w.laps}</span><span>${'★'.repeat(w.difficulty)}${'☆'.repeat(5-w.difficulty)}</span>`;
  const phaseLabel = $('worldPreviewPhase');
  if (phaseLabel) phaseLabel.textContent = `${p.icon} ${p.label}`;
  document.querySelectorAll('.world-card').forEach((card) => card.classList.toggle('active', card.dataset.world === state.worldId));
  document.querySelectorAll('.world-phase-btn').forEach((btn) => btn.classList.toggle('active', btn.dataset.phase === state.worldPhase));

  // Keep the multiplayer track preview in sync with the selected world.
  const lobbyImage = $('lobbyWorldImage');
  if (lobbyImage) lobbyImage.src = w.image;
  const lobbyName = $('lobbyWorldName');
  if (lobbyName) lobbyName.textContent = w.label.toUpperCase();
  const lobbyMeta = $('lobbyWorldMeta');
  if (lobbyMeta) lobbyMeta.textContent = `${w.subtitle} • ${w.location} • ${w.laps}`;
  const lobbyWeather = $('lobbyWorldWeather');
  if (lobbyWeather) lobbyWeather.textContent = w.weather;
}

function setWorld(id) {
  if (!WORLDS[id]) return;
  state.worldId = id;
  localStorage.setItem('rydash_world', id);
  document.querySelectorAll('.world-node, .world-card').forEach((n) => n.classList.toggle('active', n.dataset.world === id));
  if (homeAtmosphere) homeAtmosphere.setWorld(id);
  renderWorldPreview();
  updateHomeHeroCardUI();
}

function setWorldPhase(id) {
  if (!WORLD_PHASES[id]) return;
  state.worldPhase = id;
  localStorage.setItem('rydash_world_phase', id);
  renderWorldPreview();
  toast(`World phase: ${WORLD_PHASES[id].label}`);
}

function updateLapPillsUI() {
  document.querySelectorAll('.lap-pill').forEach((pill) => {
    pill.classList.toggle('active', Number(pill.dataset.laps) === state.totalLaps);
  });
}

document.querySelectorAll('.lap-pill').forEach((pill) => {
  pill.addEventListener('click', () => {
    state.totalLaps = Number(pill.dataset.laps) || 3;
    localStorage.setItem('rydash_laps', state.totalLaps);
    updateLapPillsUI();
    toast(`Race Length: ${state.totalLaps} ${state.totalLaps === 1 ? 'Lap' : 'Laps'}`);
  });
});

document.querySelectorAll('.world-node, .world-card').forEach((node) => {
  node.addEventListener('click', () => setWorld(node.dataset.world));
});
document.querySelectorAll('.world-phase-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    setWorldPhase(btn.dataset.phase);
  });
});
renderWorldPreview();

const worldSelectConfirmBtn = $('worldSelectConfirmBtn');
if (worldSelectConfirmBtn) {
  worldSelectConfirmBtn.addEventListener('click', () => {
    toast(`Launching ${(WORLDS[state.worldId] || WORLDS.neon).label}…`);
    startRaceFlow(false);
  });
}

$('settingQuality')?.addEventListener('change', (e) => {
  state.quality = e.target.value;
  localStorage.setItem('rydash_quality', state.quality);
});
$('settingSound')?.addEventListener('change', (e) => {
  state.soundOn = e.target.checked;
  localStorage.setItem('rydash_sound', state.soundOn);
  sound.setEnabled(state.soundOn);
});

const savedCar = localStorage.getItem('rydash_car') ?? localStorage.getItem('vx_car');
const savedLivery = localStorage.getItem('rydash_livery') ?? localStorage.getItem('vx_livery');
if (savedCar !== null) state.carIndex = Number(savedCar);
if (savedLivery !== null) state.liveryIndex = Number(savedLivery);

// Ensure boot is executed when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
