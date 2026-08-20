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
  neon: { label: 'Neon Rain City', build: buildNeonWorld },
  sunset: { label: 'Sunset Highway', build: buildSunsetWorld },
  desert: { label: 'Neon Desert', build: buildDesertWorld },
  underground: { label: 'Underground District (RAVEX)', build: buildUndergroundWorld },
  rooftop: { label: 'Rooftop City Racing', build: buildRooftopWorld },
  storm: { label: 'Electric Storm City', build: buildStormWorld },
  coastal: { label: 'Night Coastal Highway', build: buildCoastalWorld },
  vertical: { label: 'Vertical Mega-City', build: buildVerticalWorld },
};

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
  worldId: localStorage.getItem('rydash_world') || localStorage.getItem('vx_world') || 'neon',
  soundOn: (localStorage.getItem('rydash_sound') ?? localStorage.getItem('vx_sound')) !== 'false',
  showFps: (localStorage.getItem('rydash_fps') ?? localStorage.getItem('vx_fps')) === 'true',
  totalLaps: Number(localStorage.getItem('rydash_laps')) || 3,
  session: null,
  multiplayer: null,
  isMultiplayerRace: false,
};

const $ = (id) => document.getElementById(id);
const qs = (sel) => document.querySelector(sel);

let homeStage = null;
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

function updateHomeHeroCardUI() {
  const m = CAR_MODELS[state.carIndex] || CAR_MODELS[0];
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
  if (homeStage) homeStage.setCarByIndex(state.carIndex, state.liveryIndex);
  if (garageStage) garageStage.setCarByIndex(state.carIndex, state.liveryIndex);
  updateHomeHeroCardUI();
}

function initHomeHeroStage() {
  const container = $('homeHeroStage');
  if (container && !homeStage) {
    homeStage = new PreviewStage(container, { interactive: false });
    homeStage.setCarByIndex(state.carIndex, state.liveryIndex);
    homeStage.start();
  } else if (homeStage) {
    homeStage.setCarByIndex(state.carIndex, state.liveryIndex);
    homeStage.start();
  }
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
  const target = $(id);
  if (target) {
    target.classList.add('active');
    state.screen = id;
  }
  document.querySelectorAll('[data-back]').forEach((btn) => {
    btn.onclick = () => showScreen(btn.dataset.back);
  });

  if (id === 'screen-home' || id === 'screen-worldmap') {
    initHomeAtmosphere();
    homeAtmosphere?.start();
  } else {
    homeAtmosphere?.stop();
  }

  if (id === 'screen-home') {
    initHomeHeroStage();
    homeStage?.start();
    garageStage?.stop();
  } else if (id === 'screen-garage') {
    initGarageStage();
    garageStage?.start();
    homeStage?.stop();
  } else {
    homeStage?.stop();
    garageStage?.stop();
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
  const authStatus = $('authStatus') || $('navPlayerName');
  if (authStatus) authStatus.textContent = state.playerName;
  updateSoundUI();

  // Wire Topbar / Auth Buttons
  const navAuthBtn = $('navAuthBtn') || $('navLoginBtn');
  if (navAuthBtn) navAuthBtn.onclick = () => showScreen('screen-auth');

  // Quick Race & Multiplayer
  const playBtn = $('playBtn') || $('heroRaceBtn');
  if (playBtn) {
    playBtn.onclick = () => {
      sound.init();
      startRaceFlow(false);
    };
  }
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
      <div class="car-card-img"></div>
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
    powerPreference: 'high-performance',
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);
  renderer.shadowMap.enabled = state.quality !== 'low';
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(62, width / height, 0.1, 1400);

  const activeWorld = WORLDS[state.worldId] || WORLDS.neon;
  const { curve, trackWidth, update: updateWorld, ramps = [] } = activeWorld.build(scene);

  const CP_COUNT = 10;
  const checkpoints = curve.getSpacedPoints(CP_COUNT).slice(0, CP_COUNT);

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
  player.setStartTransform(new THREE.Vector3(startPoint.x - 2, 0, startPoint.z), startHeading);
  player.nextCP = 1;

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
    const p0 = curve.getPointAt(((t0 % 1) + 1) % 1);
    const lateral = (col === 0 ? -1 : 1) * 3;
    oppCtrl.setStartTransform(new THREE.Vector3(p0.x + lateral, 0, p0.z), startHeading);
    const ai = new AIDriver(oppCtrl, curve, { tOffset: ((t0 % 1) + 1) % 1, targetSpeedKmh: oppModel.topSpeed * 290, aggro: 0.82 + i * 0.03 });
    opponents.push({ ctrl: oppCtrl, ai, name: def.name, nextCP: 1, lap: 1, finishTimeMs: null });
  });

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
    input.steer = (left ? -1 : 0) + (right ? 1 : 0);
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
      camera.fov = 62;
      camera.updateProjectionMatrix();
      return;
    }

    if (camMode === 'chase') {
      // Tighter dynamic chase camera
      const speedRatio = THREE.MathUtils.clamp(player.speedKmh / 300, 0, 1);
      const targetDist = player.nitroActive ? 5.8 : (4.9 + speedRatio * 0.8);
      const targetHeight = 1.82 + speedRatio * 0.32;
      
      camOffset.set(-dir.x * targetDist, targetHeight, -dir.z * targetDist);
      const target = carPos.clone().add(camOffset);
      camera.position.lerp(target, Math.min(1, dt * 8.5));
      camera.position.x += shakeX;
      camera.position.y += shakeY;

      const lookTarget = carPos.clone().add(new THREE.Vector3(dir.x * 2.2, 0.95, dir.z * 2.2));
      camera.lookAt(lookTarget);

      const targetRoll = -player.steerInput * 0.045 * THREE.MathUtils.clamp(player.speedKmh / 60, 0, 1);
      camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, targetRoll, Math.min(1, dt * 6));

      const baseFov = 62;
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
  
  const resumeBtn = $('resumeBtn');
  if (resumeBtn) resumeBtn.onclick = togglePause;
  const restartBtn = $('restartBtn');
  if (restartBtn) restartBtn.onclick = () => { teardownRace(); beginRace(); };
  const quitBtn = $('quitBtn');
  if (quitBtn) quitBtn.onclick = () => { teardownRace(); showScreen('screen-home'); };
  const pauseBtn = $('pauseBtn');
  if (pauseBtn) pauseBtn.onclick = togglePause;

  let paused = false;
  function togglePause() {
    if (!raceStarted || raceFinished) return;
    paused = !paused;
    $('pauseOverlay')?.classList.toggle('hidden', !paused);
    if (!paused) lastFrame = performance.now();
  }

  function checkpointAdvance(ctrl, pos) {
    const cp = checkpoints[ctrl.nextCP];
    if (pos.distanceTo(new THREE.Vector3(cp.x, 0, cp.z)) < trackWidth) {
      ctrl.nextCP++;
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
        const lapTime = elapsedMs - lastLapStartMs;
        lastLapStartMs = elapsedMs;
        if (bestLapMs === null || lapTime < bestLapMs) {
          bestLapMs = lapTime;
          const hudBest = $('hudBest');
          if (hudBest) hudBest.textContent = formatRaceTime(bestLapMs);
        }
        if (player.lap > state.totalLaps) finishRace();
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
      updateHud(player, opponents, elapsedMs);
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

function updateHud(player, opponents, elapsedMs) {
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

  const standings = [{ name: state.playerName + ' (you)', lap: player.lap || 1, cp: player.nextCP || 0, me: true }]
    .concat(opponents.map((o) => ({ name: o.name, lap: o.ctrl?.lap || 1, cp: o.ctrl?.nextCP || 0, me: false })));
  standings.sort((a, b) => (b.lap - a.lap) || (b.cp - a.cp));
  
  const myRank = standings.findIndex((s) => s.me) + 1;
  const hudPos = $('hudPos');
  if (hudPos) hudPos.textContent = String(myRank).padStart(2, '0');
  const hudPosTotal = $('hudPosTotal');
  if (hudPosTotal) hudPosTotal.textContent = String(standings.length).padStart(2, '0');
}

function showResults(timeMs, opponents) {
  teardownRace();
  showScreen('screen-results');
  const mins = Math.floor(timeMs / 60000);
  const secs = ((timeMs % 60000) / 1000).toFixed(3);
  const list = [{ name: state.playerName + ' (you)', time: timeMs, me: true }];

  (opponents || []).forEach((o, i) => {
    const oppTime = timeMs + (i + 1) * 1400 + Math.round(Math.random() * 800);
    list.push({ name: o.name, time: oppTime, me: false });
  });

  list.sort((a, b) => a.time - b.time);
  const resultsList = $('resultsList');
  if (resultsList) {
    resultsList.innerHTML = list.map((r, i) => {
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

/* ============================== LEADERBOARD ============================== */
async function loadLeaderboard() {
  const body = $('leaderboardBody');
  if (!body) return;
  body.innerHTML = '<tr><td colspan="6" class="muted center">Loading records…</td></tr>';
  const rows = await backend.fetchLeaderboard(25);
  
  const defaultEntries = [
    { rank: 1, driver_name: 'NitroKing', car: 'SHADOW GT', time_ms: 108753, races: 168, wins: 94 },
    { rank: 2, driver_name: 'SpeedDemon', car: 'APEX R9', time_ms: 112664, races: 152, wins: 48 },
    { rank: 3, driver_name: 'DriftGhost', car: 'INFERNO X', time_ms: 113921, races: 140, wins: 35 },
    { rank: 4, driver_name: 'PhantomX', car: 'CYBER VELOCE', time_ms: 114102, races: 128, wins: 33 },
    { rank: 5, driver_name: 'StreetLegend', car: 'NIGHTHAWK', time_ms: 114853, races: 101, wins: 21 },
    { rank: 6, driver_name: 'NightRider', car: 'VORTEX RS', time_ms: 115231, races: 96, wins: 18 },
  ];

  const data = (rows && rows.length) ? rows : defaultEntries;

  body.innerHTML = data.map((r, i) => {
    const rank = r.rank || (i + 1);
    const m = Math.floor(r.time_ms / 60000);
    const s = ((r.time_ms % 60000) / 1000).toFixed(3);
    const races = r.races || (120 - i * 8);
    const wins = r.wins || (45 - i * 5);
    return `<tr>
      <td><b>#${rank}</b></td>
      <td>${escapeHtml(r.driver_name)}</td>
      <td><span class="accent">${escapeHtml(r.car)}</span></td>
      <td><b>${m}:${s.padStart(6, '0')}</b></td>
      <td>${races}</td>
      <td>${wins}</td>
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

function setWorld(id) {
  state.worldId = id;
  localStorage.setItem('rydash_world', id);
  document.querySelectorAll('.world-node').forEach((n) => n.classList.toggle('active', n.dataset.world === id));
  const label = (WORLDS[id] || WORLDS.neon).label;
  const sel = $('worldMapSelected');
  if (sel) sel.textContent = `Selected: ${label}`;
  if (homeAtmosphere) homeAtmosphere.setWorld(id);
  updateHomeHeroCardUI();
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

document.querySelectorAll('.world-node').forEach((node) => {
  node.addEventListener('click', () => setWorld(node.dataset.world));
});

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
