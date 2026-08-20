import * as THREE from 'three';
import { CAR_MODELS, CAR_LIVERIES, RARITY, buildCar } from './game/CarFactory.js';
import { buildWorld as buildNeonWorld } from './game/World.js';
import { buildWorld as buildSunsetWorld } from './game/World_Sunset.js';
import { buildWorld as buildDesertWorld } from './game/World_Desert.js';
import { buildWorld as buildUndergroundWorld } from './game/World_Underground.js';
import { buildWorld as buildRooftopWorld } from './game/World_Rooftop.js';
import { loadGhost, saveGhostIfBest, GhostRecorder, GhostPlayer } from './game/Ghost.js';

const WORLDS = {
  neon: { label: 'Neon District', build: buildNeonWorld },
  sunset: { label: 'Sunline Highway', build: buildSunsetWorld },
  desert: { label: 'Neon Desert', build: buildDesertWorld },
  underground: { label: 'Deep Run', build: buildUndergroundWorld },
  rooftop: { label: 'Skyline', build: buildRooftopWorld },
};
import { CarController, AIDriver } from './game/CarController.js';
import { buildComposer, SmokeSystem, SparkSystem } from './game/Effects.js';
import { PreviewStage } from './game/PreviewStage.js';
import { MultiplayerRoom } from './net/multiplayer.js';
import { supabaseReady } from './net/supabaseClient.js';
import * as backend from './net/backend.js';

/* ============================== APP STATE ============================== */
const state = {
  screen: 'screen-loading',
  carIndex: 0,
  liveryIndex: 0,
  playerName: localStorage.getItem('vx_name') || 'RACER',
  quality: localStorage.getItem('vx_quality') || 'high',
  cameraMode: localStorage.getItem('vx_camera') || 'chase',
  worldId: localStorage.getItem('vx_world') || 'neon',
  soundOn: localStorage.getItem('vx_sound') !== 'false',
  showFps: localStorage.getItem('vx_fps') === 'true',
  session: null,
  multiplayer: null, // MultiplayerRoom instance when in a room
  isMultiplayerRace: false,
  totalLaps: 3,
};

const $ = (id) => document.getElementById(id);
const qs = (sel) => document.querySelector(sel);

/* ============================== SCREEN ROUTER ============================== */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach((el) => el.classList.remove('active'));
  $(id).classList.add('active');
  state.screen = id;
  document.querySelectorAll('[data-back]').forEach((btn) => {
    btn.onclick = () => showScreen(btn.dataset.back);
  });
}

function toast(msg, ms = 2600) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.add('hidden'), ms);
}

/* ============================== LOADING ============================== */
async function boot() {
  const steps = ['Initializing street network…', 'Loading garage…', 'Connecting racers…', 'Warming up engine…', 'Ready.'];
  for (let i = 0; i < steps.length; i++) {
    $('loaderLabel').textContent = steps[i];
    $('loaderFill').style.width = `${((i + 1) / steps.length) * 100}%`;
    await new Promise((r) => setTimeout(r, 220));
  }
  showScreen('screen-home');
  initHomePreview();
  refreshAuthUI();
}

/* ============================== HOME ============================== */
let homeStage = null;
function initHomePreview() {
  homeStage = new PreviewStage($('homeCarPreview'), { interactive: false });
  homeStage.setCarByIndex(state.carIndex, state.liveryIndex);
  homeStage.start();
  window.__vxHomeStage = homeStage;
}

$('playBtn').addEventListener('click', () => {
  state.isMultiplayerRace = false;
  showScreen('screen-garage');
  openGarage(() => startRaceFlow(false));
});
$('multiplayerBtn').addEventListener('click', () => {
  if (!supabaseReady) {
    toast('Multiplayer needs a free Supabase project — see .env.example / README.');
  }
  showScreen('screen-lobby');
});
$('garageBtn').addEventListener('click', () => { showScreen('screen-garage'); openGarage(null); });
$('leaderboardBtn').addEventListener('click', () => { showScreen('screen-leaderboard'); loadLeaderboard(); });
$('settingsBtn').addEventListener('click', () => showScreen('screen-settings'));
$('howtoBtn').addEventListener('click', () => showScreen('screen-howto'));
$('startTrainingBtn').addEventListener('click', () => {
  state.isMultiplayerRace = false;
  showScreen('screen-garage');
  openGarage(() => startRaceFlow(false));
});
$('navAuthBtn').addEventListener('click', () => showScreen('screen-auth'));

/* ============================== AUTH ============================== */
async function refreshAuthUI() {
  state.session = await backend.getSession();
  const signedIn = Boolean(state.session);
  $('authStatus').textContent = signedIn ? state.session.user.email : 'Guest';
  $('navAuthBtn').textContent = signedIn ? 'Account' : 'Sign In';
  $('authSignOutBtn').classList.toggle('hidden', !signedIn);
  if (!supabaseReady) $('authMsg').textContent = 'Supabase not configured — playing in local/offline mode.';
}

$('authForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  await handleAuth('signin');
});
$('authSignUpBtn').addEventListener('click', () => handleAuth('signup'));
async function handleAuth(mode) {
  const email = $('authEmail').value.trim();
  const password = $('authPassword').value;
  $('authMsg').textContent = 'Working…';
  try {
    if (mode === 'signup') await backend.signUp(email, password);
    else await backend.signIn(email, password);
    await refreshAuthUI();
    $('authMsg').textContent = mode === 'signup' ? 'Account created! Check email if confirmation is required.' : 'Signed in!';
    setTimeout(() => showScreen('screen-home'), 700);
  } catch (err) {
    $('authMsg').textContent = err.message || 'Something went wrong.';
  }
}
$('authGuestBtn').addEventListener('click', () => showScreen('screen-home'));
$('authSignOutBtn').addEventListener('click', async () => { await backend.signOut(); await refreshAuthUI(); });

/* ============================== GARAGE ============================== */
let garageStage = null;
function openGarage(onContinue) {
  if (!garageStage) {
    garageStage = new PreviewStage($('garageViewport'), { interactive: true });
    garageStage.start();
    window.__vxGarageStage = garageStage;
  }
  renderGarageInfo();
  buildColorSwatches();

  $('carPrev').onclick = () => { state.carIndex = (state.carIndex - 1 + CAR_MODELS.length) % CAR_MODELS.length; renderGarageInfo(); };
  $('carNext').onclick = () => { state.carIndex = (state.carIndex + 1) % CAR_MODELS.length; renderGarageInfo(); };
  $('selectCarBtn').onclick = () => {
    localStorage.setItem('vx_car', state.carIndex);
    localStorage.setItem('vx_livery', state.liveryIndex);
    if (onContinue) onContinue();
    else showScreen('screen-home');
  };
}

function renderGarageInfo() {
  const { modelDef, livery } = garageStage.setCarByIndex(state.carIndex, state.liveryIndex);
  const rarity = RARITY[modelDef.rarity] || RARITY.common;
  $('carName').textContent = modelDef.name;
  $('carClass').textContent = `${modelDef.class} · ${livery.name}`;
  $('carRarity').textContent = rarity.label;
  $('carRarity').style.color = `#${rarity.color.toString(16).padStart(6, '0')}`;
  $('carRarity').style.borderColor = `#${rarity.color.toString(16).padStart(6, '0')}`;
  $('statSpeed').style.width = `${modelDef.topSpeed * 100}%`;
  $('statHandling').style.width = `${modelDef.handling * 100}%`;
  $('statAccel').style.width = `${modelDef.accel * 100}%`;
  $('statNitro').style.width = `${modelDef.nitro * 100}%`;
  buildColorSwatches();
}

function buildColorSwatches() {
  const wrap = $('colorSwatches');
  wrap.innerHTML = '';
  CAR_LIVERIES.forEach((l, i) => {
    const b = document.createElement('button');
    b.className = 'swatch' + (i === state.liveryIndex ? ' active' : '');
    b.style.background = `#${l.color.toString(16).padStart(6, '0')}`;
    b.style.color = b.style.background;
    b.title = l.name;
    b.onclick = () => { state.liveryIndex = i; renderGarageInfo(); };
    wrap.appendChild(b);
  });
}

/* ============================== LOBBY (MULTIPLAYER) ============================== */
$('createRoomBtn').addEventListener('click', async () => {
  const code = MultiplayerRoom.generateCode();
  await joinRoom(code, true);
});
$('joinRoomBtn').addEventListener('click', async () => {
  const code = $('joinCodeInput').value.trim().toUpperCase();
  if (code.length !== 5) { $('lobbyMsg').textContent = 'Enter a valid 5-letter room code.'; return; }
  await joinRoom(code, false);
});

async function joinRoom(code, isHost) {
  $('lobbyMsg').textContent = 'Connecting…';
  try {
    const local = { id: backend.getGuestId(), name: state.playerName, carModel: CAR_MODELS[state.carIndex].id, livery: CAR_LIVERIES[state.liveryIndex].id };
    const room = new MultiplayerRoom(code, local);
    room.onPlayerJoin = () => updateLobbyUI(room);
    room.onPlayerLeave = () => updateLobbyUI(room);
    room.onRaceStart = () => { state.isMultiplayerRace = true; beginRace(); };
    await room.connect();
    state.multiplayer = room;
    $('roomCodeDisplay').textContent = code;
    $('roomInfo').classList.remove('hidden');
    $('startRaceBtn').classList.toggle('hidden', !isHost);
    $('lobbyMsg').textContent = isHost ? 'Room created — share this code!' : 'Joined room!';
    updateLobbyUI(room);
  } catch (err) {
    $('lobbyMsg').textContent = err.message;
  }
}

function updateLobbyUI(room) {
  $('playerCount').textContent = `${room.playerCount} racer${room.playerCount > 1 ? 's' : ''} connected`;
  const list = $('lobbyPlayerList');
  list.innerHTML = `<li>🏁 ${state.playerName} (you)</li>`;
  room.remotePlayers.forEach((p) => {
    const li = document.createElement('li');
    li.textContent = `🚗 ${p.name || 'Racer'}`;
    list.appendChild(li);
  });
}

$('startRaceBtn').addEventListener('click', () => {
  state.multiplayer?.sendRaceStart({ startedAt: Date.now() });
  state.isMultiplayerRace = true;
  beginRace();
});

/* ============================== RACE ENGINE ============================== */
let raceCtx = null; // holds everything for the active race, torn down on exit

function startRaceFlow(multiplayer) {
  state.isMultiplayerRace = multiplayer;
  beginRace();
}

function beginRace() {
  showScreen('screen-race');
  const canvas = $('gameCanvas');
  const width = window.innerWidth, height = window.innerHeight;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: state.quality !== 'low', powerPreference: 'high-performance', preserveDrawingBuffer: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, state.quality === 'high' ? 2 : 1.3));
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

  // Checkpoints for lap tracking (robust regardless of racing line)
  const CP_COUNT = 10;
  const checkpoints = curve.getSpacedPoints(CP_COUNT).slice(0, CP_COUNT);

  // Minimap — a live top-down radar. Track outline + the world->map transform are computed once
  // (the curve never changes mid-race); car dots are re-projected with that same transform and
  // redrawn every frame.
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
    minimapCtx.clip(); // circular clip so the track/dots never poke past the round canvas edge

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

  // Nitro pickups — glowing rings placed around every circuit (world-agnostic, unlike ramps).
  // Driving through one instantly refills nitro; it goes on cooldown and reappears after a bit.
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
    if (ctrl.nitro >= 0.98) return; // already full, nothing to collect
    for (const pk of nitroPickups) {
      if (pk.cooldown > 0) continue;
      const dx = ctrl.position.x - pk.position.x;
      const dz = ctrl.position.z - pk.position.z;
      if (Math.hypot(dx, dz) < pk.radius) {
        ctrl.nitro = 1;
        pk.cooldown = 10;
        pk.group.visible = false;
        smoke.emit(ctrl.rig.group.position, 0.8);
        if (ctrl === player) toast('Nitro refilled!');
        break;
      }
    }
  }

  // Nitro exhaust flames — small bright bursts from each exhaust tip while nitro is active.
  // Reuses the same SparkSystem as collision sparks (bright/additive/short-lived reads as a
  // flame here too) rather than a whole separate particle class.
  function emitNitroFlame(ctrl) {
    if (!ctrl.nitroActive || !ctrl.rig.exhaustPositions) return;
    ctrl.rig.exhaustPositions.forEach((localPos) => {
      const worldPos = ctrl.rig.group.localToWorld(localPos.clone());
      sparks.emit(worldPos, 2);
    });
  }
  function emitAllNitroFlames() {
    emitNitroFlame(player);
    opponents.forEach((o) => emitNitroFlame(o.ctrl));
  }

  // Player car
  const modelDef = CAR_MODELS[state.carIndex];
  const livery = CAR_LIVERIES[state.liveryIndex];
  const playerRig = buildCar(modelDef, livery.color);
  scene.add(playerRig.group);
  // Real dynamic headlights only for the player's car (perf-bounded — see CarFactory.js note).
  if (state.quality !== 'low') {
    playerRig.headlightSpots.forEach((spot) => {
      spot.intensity = 3.2;
      spot.castShadow = state.quality === 'high';
      if (spot.castShadow) { spot.shadow.mapSize.set(512, 512); spot.shadow.bias = -0.003; }
    });
  }
  const player = new CarController({ carRig: playerRig, statDef: modelDef });
  const startPoint = checkpoints[0];
  const startTangent = curve.getTangentAt(0);
  const startHeading = Math.atan2(startTangent.x, startTangent.z);
  player.setStartTransform(new THREE.Vector3(startPoint.x - 2, 0, startPoint.z), startHeading);
  player.nextCP = 1;

  // Opponents: AI (single-player) OR remote players (multiplayer)
  const opponents = [];
  const remoteRigs = new Map();

  if (state.isMultiplayerRace && state.multiplayer) {
    state.multiplayer.remotePlayers.forEach((p, id) => {
      const mDef = CAR_MODELS.find((m) => m.id === p.carModel) || CAR_MODELS[0];
      const lv = CAR_LIVERIES.find((l) => l.id === p.livery) || CAR_LIVERIES[1];
      const rig = buildCar(mDef, lv.color);
      rig.group.position.set(startPoint.x + 2, 0, startPoint.z);
      scene.add(rig.group);
      remoteRigs.set(id, { rig, name: p.name || 'Racer' });
    });
    state.multiplayer.onTransform = (payload) => {
      const entry = remoteRigs.get(payload.id);
      if (entry) {
        entry.rig.group.position.set(payload.x, 0, payload.z);
        entry.rig.group.rotation.y = payload.ry;
      }
    };
  } else {
    // 7 AI opponents + the player = an 8-car grid (matches the "POS 03/08" HUD format).
    const aiCount = 7;
    const gridCols = 2;
    for (let i = 0; i < aiCount; i++) {
      const mDef = CAR_MODELS[(state.carIndex + i + 1) % CAR_MODELS.length];
      const lv = CAR_LIVERIES[(state.liveryIndex + i * 2 + 1) % CAR_LIVERIES.length];
      const rig = buildCar(mDef, lv.color);
      scene.add(rig.group);
      const ctrl = new CarController({ carRig: rig, statDef: mDef, isAI: true });
      // Stagger the grid back in rows of 2 so 8 cars don't spawn stacked on top of each other.
      const row = Math.floor(i / gridCols);
      const col = i % gridCols;
      const t0 = -(row + 1) * 0.012;
      const p0 = curve.getPointAt(((t0 % 1) + 1) % 1);
      const lateral = (col === 0 ? -1 : 1) * 3;
      ctrl.setStartTransform(new THREE.Vector3(p0.x + lateral, 0, p0.z), startHeading);
      const ai = new AIDriver(ctrl, curve, ((t0 % 1) + 1) % 1, 0.74 + Math.random() * 0.22);
      opponents.push({ ctrl, ai, name: `CPU ${i + 1}`, nextCP: 1, lap: 1 });
    }
  }

  // Ghost replay — your fastest recorded run on this world+car, shown as a translucent car
  // to race against. Local-only (localStorage), single-player races only.
  const ghostRecorder = new GhostRecorder();
  let ghostPlayer = null;
  if (!state.isMultiplayerRace) {
    const savedGhost = loadGhost(state.worldId, modelDef.id);
    if (savedGhost) {
      const ghostRig = buildCar(modelDef, livery.color);
      scene.add(ghostRig.group);
      ghostPlayer = new GhostPlayer(ghostRig, savedGhost);
      toast(`Racing your ghost — beat ${formatRaceTime(savedGhost.timeMs)}`);
    }
  }

  const smoke = new SmokeSystem(scene, 100);
  const sparks = new SparkSystem(scene, 220);
  const { composer, bloom, motionBlur } = buildComposer(renderer, scene, camera, width, height);
  bloom.enabled = state.quality !== 'low';
  motionBlur.enabled = state.quality !== 'low';

  // Input
  const input = { throttle: 0, steer: 0, handbrake: false, nitro: false };
  const keys = new Set();
  function onKeyDown(e) {
    keys.add(e.code);
    if (e.code === 'Escape') togglePause();
    if (e.code === 'KeyC') cycleCamera();
  }
  function onKeyUp(e) { keys.delete(e.code); }
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);

  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  $('touchControls').classList.toggle('hidden', !isTouch);
  const touchState = { gas: false, brake: false, left: false, right: false, nitro: false };
  function bindTouch(id, key) {
    const el = $(id);
    const set = (v) => (touchState[key] = v);
    el.addEventListener('touchstart', (e) => { e.preventDefault(); set(true); }, { passive: false });
    el.addEventListener('touchend', (e) => { e.preventDefault(); set(false); }, { passive: false });
    el.addEventListener('mousedown', () => set(true));
    el.addEventListener('mouseup', () => set(false));
  }
  bindTouch('touchGas', 'gas'); bindTouch('touchBrake', 'brake'); bindTouch('touchLeft', 'left'); bindTouch('touchRight', 'right'); bindTouch('touchNitro', 'nitro');

  // Gamepad support — standard mapping: left stick X steers, RT/R2 (button 7) throttle,
  // LT/L2 (button 6) brake, A/Cross (button 0) nitro, B/Circle or bumpers handbrake.
  function readGamepad() {
    const pads = navigator.getGamepads ? navigator.getGamepads() : [];
    for (const pad of pads) {
      if (!pad || !pad.connected) continue;
      const deadzone = 0.15;
      const stickX = pad.axes[0] || 0;
      const steer = Math.abs(stickX) > deadzone ? stickX : 0;
      const rt = pad.buttons[7] ? pad.buttons[7].value : 0;
      const lt = pad.buttons[6] ? pad.buttons[6].value : 0;
      const nitroBtn = pad.buttons[0] && pad.buttons[0].pressed;
      const handbrakeBtn = (pad.buttons[1] && pad.buttons[1].pressed) || (pad.buttons[4] && pad.buttons[4].pressed) || (pad.buttons[5] && pad.buttons[5].pressed);
      if (Math.abs(stickX) > deadzone || rt > 0.05 || lt > 0.05 || nitroBtn || handbrakeBtn) {
        return { steer, throttle: rt > 0.05 ? rt : lt > 0.05 ? -lt : 0, handbrake: handbrakeBtn, nitro: nitroBtn };
      }
    }
    return null;
  }

  function readInput() {
    const gp = readGamepad();
    if (gp) {
      input.throttle = gp.throttle;
      input.steer = gp.steer;
      input.handbrake = gp.handbrake;
      input.nitro = gp.nitro;
      return;
    }
    const gas = keys.has('KeyW') || keys.has('ArrowUp') || touchState.gas;
    const brake = keys.has('KeyS') || keys.has('ArrowDown') || touchState.brake;
    const left = keys.has('KeyA') || keys.has('ArrowLeft') || touchState.left;
    const right = keys.has('KeyD') || keys.has('ArrowRight') || touchState.right;
    input.throttle = gas ? 1 : brake ? -1 : 0;
    input.steer = (left ? -1 : 0) + (right ? 1 : 0);
    input.handbrake = keys.has('Space') || touchState.brake && gas;
    input.nitro = keys.has('ShiftLeft') || keys.has('ShiftRight') || touchState.nitro;
  }

  // Camera modes
  let camMode = state.cameraMode;
  function cycleCamera() {
    camMode = camMode === 'chase' ? 'hood' : camMode === 'hood' ? 'orbit' : 'chase';
    toast(`Camera: ${camMode}`);
  }
  const camOffset = new THREE.Vector3();
  // Camera shake — an impulse-decay system. bumpShake() is called on collisions/landings;
  // the offset decays back to zero each frame so it reads as a jolt, not constant jitter.
  let shakeIntensity = 0;
  function bumpShake(amount) {
    shakeIntensity = Math.min(1.5, shakeIntensity + amount);
  }
  function updateCamera(dt) {
    const carPos = player.rig.group.position;
    const heading = player.heading;
    const dir = new THREE.Vector3(Math.sin(heading), 0, Math.cos(heading));
    let shakeX = 0, shakeY = 0;
    if (shakeIntensity > 0.001) {
      shakeX = (Math.random() - 0.5) * shakeIntensity * 0.6;
      shakeY = (Math.random() - 0.5) * shakeIntensity * 0.4;
      shakeIntensity *= Math.max(0, 1 - dt * 6);
    } else {
      shakeIntensity = 0;
    }
    if (camMode === 'chase') {
      camOffset.set(-dir.x * 8.5, 3.4, -dir.z * 8.5);
      const target = carPos.clone().add(camOffset);
      camera.position.lerp(target, Math.min(1, dt * 4));
      camera.position.x += shakeX; camera.position.y += shakeY;
      camera.lookAt(carPos.x, carPos.y + 1.1, carPos.z);
      camera.fov = THREE.MathUtils.lerp(camera.fov, 62 + Math.min(20, player.speedKmh / 12), 0.05);
      camera.updateProjectionMatrix();
    } else if (camMode === 'hood') {
      const hoodPos = carPos.clone().add(new THREE.Vector3(dir.x * 1.4, 1.15, dir.z * 1.4));
      camera.position.lerp(hoodPos, Math.min(1, dt * 10));
      camera.position.x += shakeX; camera.position.y += shakeY;
      camera.lookAt(carPos.x + dir.x * 10, carPos.y + 1, carPos.z + dir.z * 10);
    } else {
      const t = performance.now() * 0.0003;
      camera.position.set(carPos.x + Math.sin(t) * 12 + shakeX, 5 + shakeY, carPos.z + Math.cos(t) * 12);
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
  runCountdown(() => { raceStarted = true; lastFrame = performance.now(); });

  $('hudTotalLaps').textContent = state.totalLaps;
  $('resumeBtn').onclick = togglePause;
  $('restartBtn').onclick = () => { teardownRace(); beginRace(); };
  $('quitBtn').onclick = () => { teardownRace(); showScreen('screen-home'); };
  $('pauseBtn').onclick = togglePause;
  let paused = false;
  function togglePause() {
    if (!raceStarted || raceFinished) return;
    paused = !paused;
    $('pauseOverlay').classList.toggle('hidden', !paused);
    if (!paused) lastFrame = performance.now();
  }

  function checkpointAdvance(ctrl, pos) {
    const cp = checkpoints[ctrl.nextCP];
    if (pos.distanceTo(new THREE.Vector3(cp.x, 0, cp.z)) < trackWidth) {
      ctrl.nextCP++;
      if (ctrl.nextCP >= CP_COUNT) {
        ctrl.nextCP = 0;
        ctrl.lap = (ctrl.lap || 1) + 1;
        return true; // crossed start/finish
      }
    }
    return false;
  }
  player.lap = 1;

  // Simple arcade car-vs-car collision: circle-overlap push-apart + speed dampening.
  // Not a physics sim — just enough to make cars feel solid and bump each other on contact.
  const CAR_RADIUS = 2.1;
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
          a.position.x += nx * overlap; a.position.z += nz * overlap;
          b.position.x -= nx * overlap; b.position.z -= nz * overlap;
          a.rig.group.position.copy(a.position);
          b.rig.group.position.copy(b.position);
          const impactSpeed = Math.abs(a.speed) + Math.abs(b.speed);
          a.speed *= 0.82; b.speed *= 0.82;
          if (impactSpeed > 8) {
            const contactPoint = a.rig.group.position.clone().lerp(b.rig.group.position, 0.5);
            contactPoint.y += 0.4;
            sparks.emit(contactPoint, Math.min(16, Math.round(impactSpeed)));
          }
          if (a === playerCtrl || b === playerCtrl) bumpShake(Math.min(1, impactSpeed / 60));
        }
      }
    }
  }

  // Off-road penalty: cars straying outside the road surface get a speed drag, using the
  // nearest checkpoint segment as a cheap approximation of distance-from-centerline.
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
    const offRoad = dist > trackWidth / 2 + 1.5; // small buffer past the curb before it bites
    if (offRoad && !ctrl.airborne) {
      ctrl.speed *= Math.max(0.9, 1 - dt * 1.4); // sand/grass drag
      ctrl.offRoad = true;
    } else {
      ctrl.offRoad = false;
    }
  }

  // Ramp jumps (currently only Skyline defines ramps — harmless no-op elsewhere since
  // `ramps` defaults to []) + a small dust puff on landing for any airborne car.
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
      smoke.emit(ctrl.rig.group.position, 1.4);
      if (ctrl === player) bumpShake(0.7);
    }
  }

  function finishRace() {
    raceFinished = true;
    const timeMs = Math.round(elapsedMs);
    backend.submitScore({ name: state.playerName, timeMs, car: modelDef.id, livery: livery.id });
    if (state.isMultiplayerRace) state.multiplayer?.sendFinish({ timeMs });
    if (!state.isMultiplayerRace) {
      const isNewBest = saveGhostIfBest(state.worldId, modelDef.id, timeMs, ghostRecorder.samples);
      if (isNewBest) toast('New ghost best lap saved!');
    }
    showResults(timeMs, opponents);
  }

  let fpsAcc = 0, fpsFrames = 0, fpsLast = performance.now();

  function frame(now) {
    raceCtx.rafId = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - lastFrame) / 1000);
    lastFrame = now;

    if (raceStarted && !paused && !raceFinished) {
      elapsedMs += dt * 1000;
      readInput();
      player.applyPlayerInput(input, dt);
      player.step(dt);
      if (checkpointAdvance(player, player.rig.group.position)) {
        $('hudLap').textContent = Math.min(player.lap, state.totalLaps);
        const lapTime = elapsedMs - lastLapStartMs;
        lastLapStartMs = elapsedMs;
        if (bestLapMs === null || lapTime < bestLapMs) {
          bestLapMs = lapTime;
          $('hudBest').textContent = formatRaceTime(bestLapMs);
        }
        if (player.lap > state.totalLaps) finishRace();
      }
      if (player.driftFactor > 0.15 && Math.abs(player.speed) > 4) {
        const rl = player.rig.wheels.rl.getWorldPosition(new THREE.Vector3());
        const rr = player.rig.wheels.rr.getWorldPosition(new THREE.Vector3());
        smoke.emit(rl, player.driftFactor); smoke.emit(rr, player.driftFactor);
      }

      opponents.forEach((o) => {
        o.ai.step(dt);
        o.ctrl.step(dt);
        checkpointAdvance(o.ctrl, o.ctrl.rig.group.position);
      });

      resolveCarCollisions(player, opponents);
      checkRamps(player);
      opponents.forEach((o) => checkRamps(o.ctrl));
      applyOffRoadDrag(player, dt);
      opponents.forEach((o) => applyOffRoadDrag(o.ctrl, dt));
      updateNitroPickups(dt);
      checkNitroPickup(player);
      opponents.forEach((o) => checkNitroPickup(o.ctrl));
      emitAllNitroFlames();

      ghostRecorder.record(elapsedMs, player.position.x, player.position.z, player.heading);
      if (ghostPlayer && !ghostPlayer.finished) ghostPlayer.update(elapsedMs);

      if (state.isMultiplayerRace && state.multiplayer) {
        state.multiplayer.sendTransform({ x: player.position.x, z: player.position.z, ry: player.heading, speed: player.speedKmh });
      }

      updateCamera(dt);
      updateHud(player, opponents, elapsedMs);
      updateMinimap();
      if (motionBlur.enabled) {
        const speedFrac = THREE.MathUtils.clamp((player.speedKmh - 130) / 120, 0, 1);
        const targetBlur = player.nitroActive ? 1 : speedFrac;
        motionBlur.uniforms.uIntensity.value = THREE.MathUtils.lerp(motionBlur.uniforms.uIntensity.value, targetBlur, Math.min(1, dt * 6));
      }
    }

    smoke.update(dt);
    sparks.update(dt);
    updateWorld(dt);
    composer.render();

    if (state.showFps) {
      fpsAcc += dt; fpsFrames++;
      if (now - fpsLast > 500) {
        $('fpsCounter').textContent = `${Math.round(fpsFrames / fpsAcc)} FPS`;
        fpsAcc = 0; fpsFrames = 0; fpsLast = now;
      }
    }
  }

  function onResize() {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    composer.setSize(w, h);
  }
  window.addEventListener('resize', onResize);

  // Debug hook so we can force-render frames even if the tab is backgrounded/throttled.
  window.__vxDebug = {
    forceFrame(dt = 0.05) {
      if (!raceStarted) { raceStarted = true; lastFrame = performance.now(); }
      elapsedMs += dt * 1000;
      readInput();
      player.applyPlayerInput(input, dt);
      player.step(dt);
      if (checkpointAdvance(player, player.rig.group.position)) {
        $('hudLap').textContent = Math.min(player.lap, state.totalLaps);
        const lapTime = elapsedMs - lastLapStartMs;
        lastLapStartMs = elapsedMs;
        if (bestLapMs === null || lapTime < bestLapMs) {
          bestLapMs = lapTime;
          $('hudBest').textContent = formatRaceTime(bestLapMs);
        }
      }
      opponents.forEach((o) => { o.ai.step(dt); o.ctrl.step(dt); checkpointAdvance(o.ctrl, o.ctrl.rig.group.position); });
      resolveCarCollisions(player, opponents);
      checkRamps(player);
      opponents.forEach((o) => checkRamps(o.ctrl));
      applyOffRoadDrag(player, dt);
      opponents.forEach((o) => applyOffRoadDrag(o.ctrl, dt));
      updateNitroPickups(dt);
      checkNitroPickup(player);
      opponents.forEach((o) => checkNitroPickup(o.ctrl));
      emitAllNitroFlames();
      updateCamera(dt);
      updateHud(player, opponents, elapsedMs);
      updateMinimap();
      if (motionBlur.enabled) {
        const speedFrac = THREE.MathUtils.clamp((player.speedKmh - 130) / 120, 0, 1);
        const targetBlur = player.nitroActive ? 1 : speedFrac;
        motionBlur.uniforms.uIntensity.value = THREE.MathUtils.lerp(motionBlur.uniforms.uIntensity.value, targetBlur, Math.min(1, dt * 6));
      }
      smoke.update(dt);
      sparks.update(dt);
      updateWorld(dt);
      composer.render();
    },
    setInput(i) { Object.assign(touchState, i); },
    player,
    ramps,
    nitroPickups,
    curve,
    motionBlur,
    sparks,
  };

  raceCtx = {
    rafId: null,
    teardown() {
      cancelAnimationFrame(this.rafId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    },
  };
  $('fpsCounter').classList.toggle('hidden', !state.showFps);
  raceCtx.rafId = requestAnimationFrame(frame);
}

function teardownRace() {
  if (raceCtx) { raceCtx.teardown(); raceCtx = null; }
  $('pauseOverlay').classList.add('hidden');
}

function runCountdown(onGo) {
  const overlay = $('countdownOverlay');
  const num = $('countdownNum');
  overlay.classList.remove('hidden');
  let n = 3;
  num.textContent = n;
  const iv = setInterval(() => {
    n -= 1;
    if (n > 0) { num.textContent = n; }
    else if (n === 0) { num.textContent = 'GO!'; }
    else {
      clearInterval(iv);
      overlay.classList.add('hidden');
      onGo();
    }
  }, 800);
}

function formatRaceTime(ms) {
  const m = Math.floor(ms / 60000);
  const s = ((ms % 60000) / 1000).toFixed(3);
  return `${m}:${s.padStart(6, '0')}`;
}

const SPEEDO_MAX_KMH = 320; // dial's full-sweep speed — matches the highest realistic top speed
const SPEEDO_CIRCUMFERENCE = 2 * Math.PI * 70; // r=70, matches the SVG circle radius

function updateHud(player, opponents, elapsedMs) {
  $('hudSpeed').textContent = Math.round(player.speedKmh);
  $('hudGear').textContent = player.speed < -0.2 ? 'R' : 'D';
  $('nitroFill').style.width = `${player.nitro * 100}%`;
  $('hudTimer').textContent = formatRaceTime(elapsedMs);

  // Circular speedo — arc fills clockwise with speed, color shifts cyan -> orange -> red as a
  // cheap "redline" cue.
  const speedoFrac = THREE.MathUtils.clamp(player.speedKmh / SPEEDO_MAX_KMH, 0, 1);
  const ring = $('speedoFillRing');
  ring.style.strokeDashoffset = SPEEDO_CIRCUMFERENCE * (1 - speedoFrac);
  ring.style.stroke = speedoFrac > 0.85 ? '#ff2e2e' : speedoFrac > 0.6 ? '#ff7a1a' : '#00e5ff';

  // Speed lines ramp in at high speed, and go full intensity during nitro for a burst feel.
  const speedFrac = THREE.MathUtils.clamp((player.speedKmh - 110) / 100, 0, 1);
  const linesOpacity = player.nitroActive ? 0.85 : speedFrac * 0.5;
  $('speedLines').style.opacity = linesOpacity;

  // Position = lap first, then how many checkpoints into the current lap (nextCP) as a proxy
  // for track progress — cheap and accurate enough for standings without a curve-projection.
  const standings = [{ name: state.playerName + ' (you)', lap: player.lap, cp: player.nextCP || 0, me: true }]
    .concat(opponents.map((o) => ({ name: o.name, lap: o.ctrl.lap || 1, cp: o.ctrl.nextCP || 0, me: false })));
  standings.sort((a, b) => (b.lap - a.lap) || (b.cp - a.cp));
  $('hudPositions').innerHTML = standings.map((s, i) => `<div class="pos-row ${s.me ? 'me' : ''}">${i + 1}. ${s.name}</div>`).join('');
  const myRank = standings.findIndex((s) => s.me) + 1;
  $('hudPos').textContent = String(myRank).padStart(2, '0');
  $('hudPosTotal').textContent = String(standings.length).padStart(2, '0');
}

function showResults(timeMs, opponents) {
  teardownRace();
  showScreen('screen-results');
  const mins = Math.floor(timeMs / 60000);
  const secs = ((timeMs % 60000) / 1000).toFixed(3);
  const list = [{ name: state.playerName + ' (you)', time: timeMs, me: true }]
    .concat((opponents || []).map((o) => ({ name: o.name, time: timeMs + Math.round(Math.random() * 8000 + 1000), me: false })));
  list.sort((a, b) => a.time - b.time);
  $('resultsList').innerHTML = list.map((r, i) => {
    const m = Math.floor(r.time / 60000);
    const s = ((r.time % 60000) / 1000).toFixed(3);
    return `<div class="res-row ${r.me ? 'me' : ''}"><span>${i + 1}. ${r.name}</span><span>${m}:${s.padStart(6, '0')}</span></div>`;
  }).join('');
  $('resultsBest').textContent = `Your time: ${mins}:${secs.padStart(6, '0')}`;
}
$('raceAgainBtn').addEventListener('click', () => beginRace());
$('resultsMenuBtn').addEventListener('click', () => showScreen('screen-home'));

/* ============================== LEADERBOARD ============================== */
async function loadLeaderboard() {
  const body = $('leaderboardBody');
  body.innerHTML = '<tr><td colspan="5" class="muted">Loading…</td></tr>';
  const rows = await backend.fetchLeaderboard(25);
  if (!rows.length) { body.innerHTML = '<tr><td colspan="5" class="muted">No times yet — be the first!</td></tr>'; return; }
  body.innerHTML = rows.map((r, i) => {
    const m = Math.floor(r.time_ms / 60000);
    const s = ((r.time_ms % 60000) / 1000).toFixed(3);
    const date = r.created_at ? new Date(r.created_at).toLocaleDateString() : '—';
    return `<tr><td>${i + 1}</td><td>${escapeHtml(r.driver_name)}</td><td>${escapeHtml(r.car)}</td><td>${m}:${s.padStart(6, '0')}</td><td>${date}</td></tr>`;
  }).join('');
}
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

/* ============================== SETTINGS ============================== */
$('settingQuality').value = state.quality;
$('settingCamera').value = state.cameraMode;
$('settingWorld').value = state.worldId;
$('settingSound').checked = state.soundOn;
$('settingFps').checked = state.showFps;
$('settingQuality').addEventListener('change', (e) => { state.quality = e.target.value; localStorage.setItem('vx_quality', state.quality); });
$('settingCamera').addEventListener('change', (e) => { state.cameraMode = e.target.value; localStorage.setItem('vx_camera', state.cameraMode); });
function setWorld(id) {
  state.worldId = id;
  localStorage.setItem('vx_world', id);
  $('settingWorld').value = id;
  document.querySelectorAll('.world-node').forEach((n) => n.classList.toggle('selected', n.dataset.world === id));
  const label = (WORLDS[id] || WORLDS.neon).label;
  const sel = $('worldMapSelected');
  if (sel) sel.textContent = `Selected: ${label}`;
}
$('settingWorld').addEventListener('change', (e) => setWorld(e.target.value));
$('openWorldMapBtn').addEventListener('click', () => { showScreen('screen-worldmap'); setWorld(state.worldId); });
document.querySelectorAll('.world-node').forEach((node) => {
  node.addEventListener('click', () => setWorld(node.dataset.world));
});
$('settingSound').addEventListener('change', (e) => { state.soundOn = e.target.checked; localStorage.setItem('vx_sound', state.soundOn); });
$('settingFps').addEventListener('change', (e) => { state.showFps = e.target.checked; localStorage.setItem('vx_fps', state.showFps); $('fpsCounter').classList.toggle('hidden', !state.showFps); });

/* Restore saved car */
const savedCar = localStorage.getItem('vx_car');
const savedLivery = localStorage.getItem('vx_livery');
if (savedCar !== null) state.carIndex = Number(savedCar);
if (savedLivery !== null) state.liveryIndex = Number(savedLivery);

boot();
