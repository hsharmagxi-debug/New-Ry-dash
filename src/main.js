/**
 * main.js — PROJECT GENESIS bootstrap (web substitution track)
 *
 * Wires: PhysicsAdapter (behind CraftSimulationInterface) + ProvingGround +
 * CraftMesh + ChaseCamera + InputSystem + TelemetryHUD into one render loop.
 * This is the Genesis vertical slice: one craft, one graybox track, physics,
 * input, camera, sense of speed, telemetry. Nothing beyond that scope
 * (constitution §25/§26) belongs here yet.
 */
import * as THREE from 'three';
import { PhysicsAdapter } from './physics/PhysicsAdapter.js';
import { buildProvingGround } from './world/ProvingGround.js';
import { buildCraftMesh } from './render/CraftMesh.js';
import { ChaseCamera } from './camera/ChaseCamera.js';
import { InputSystem } from './input/InputSystem.js';
import { TelemetryHUD } from './telemetry/TelemetryHUD.js';

function boot() {
  const canvasHost = document.getElementById('genesis-viewport');
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.shadowMap.enabled = true;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  canvasHost.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x05070a, 200, 1400);
  scene.background = new THREE.Color(0x05070a);

  const camera = new THREE.PerspectiveCamera(62, window.innerWidth / window.innerHeight, 0.1, 3000);

  const sun = new THREE.DirectionalLight(0xcfe8ff, 1.4);
  sun.position.set(200, 400, 100);
  sun.castShadow = true;
  scene.add(sun);
  scene.add(new THREE.HemisphereLight(0x334155, 0x0a0d12, 0.9));

  const proving = buildProvingGround(scene);

  const craft = buildCraftMesh();
  craft.position.set(0, 0.9, 20);
  scene.add(craft);

  const physics = new PhysicsAdapter();
  physics.reset([0, 0.9, 20], Math.PI);

  const chaseCamera = new ChaseCamera(camera);
  const input = new InputSystem(document.body);
  const hud = new TelemetryHUD(document.body);

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  let last = performance.now();
  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const frameStart = performance.now();

    physics.setInput(input.poll());
    const physicsStart = performance.now();
    physics.step(dt);
    const physicsMs = performance.now() - physicsStart;

    const state = physics.getState();
    const telemetry = physics.getTelemetry();

    craft.position.set(...state.position);
    craft.rotation.set(state.pitch, state.yaw, state.roll);

    if (state.grounded && telemetry.speedKmh > 40 && Math.random() < 0.02) {
      chaseCamera.addShake(Math.min(0.3, telemetry.speedKmh / 3000));
    }
    chaseCamera.update(state, telemetry, dt);

    hud.update(state, telemetry, {
      frameMs: performance.now() - frameStart,
      physicsMs,
      fov: camera.fov,
    });

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
