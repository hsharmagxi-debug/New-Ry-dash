import * as THREE from 'three';
import { makeNeonEnvTexture } from './EnvMap.js';

/* =========================================================================
   RYDASH — "Storm City" world: a violent electric storm over a dark city.
   Purple storm clouds, frequent lightning flashes with a synchronized
   headlight-sweep effect, drifting fog through the streets, and rain that
   intensifies and eases in waves rather than staying constant.
   ========================================================================= */

function buildSky() {
  const uniforms = {
    topColor: { value: new THREE.Color(0x0a0616) },
    midColor: { value: new THREE.Color(0x2a1050) },
    horizonColor: { value: new THREE.Color(0x3a1a5a) },
    bottomColor: { value: new THREE.Color(0x030208) },
    offset: { value: 20 },
    exponent: { value: 0.6 },
  };
  const geo = new THREE.SphereGeometry(900, 32, 16);
  const mat = new THREE.ShaderMaterial({
    uniforms, side: THREE.BackSide, depthWrite: false,
    vertexShader: `varying vec3 vWorldPosition; void main() { vec4 wp = modelMatrix * vec4(position,1.0); vWorldPosition = wp.xyz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
    fragmentShader: `
      uniform vec3 topColor; uniform vec3 midColor; uniform vec3 horizonColor; uniform vec3 bottomColor;
      uniform float offset; uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
        vec3 col;
        if (h > 0.1) { col = mix(horizonColor, midColor, clamp(pow(h, exponent) * 1.7, 0.0, 1.0)); col = mix(col, topColor, clamp(pow(h, exponent * 2.2), 0.0, 1.0)); }
        else { col = mix(bottomColor, horizonColor, clamp((h + 0.3) / 0.45, 0.0, 1.0)); }
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  return new THREE.Mesh(geo, mat);
}

// Storm clouds — flat, slow-drifting purple-lit planes high overhead, lit from within on flash.
function buildStormClouds() {
  const group = new THREE.Group();
  const cloudMat = new THREE.MeshBasicMaterial({ color: 0x3a2060, transparent: true, opacity: 0.35 });
  const clouds = [];
  for (let i = 0; i < 12; i++) {
    const cloud = new THREE.Mesh(new THREE.PlaneGeometry(120 + Math.random() * 180, 40 + Math.random() * 40), cloudMat.clone());
    cloud.position.set((Math.random() - 0.5) * 900, 140 + Math.random() * 60, (Math.random() - 0.5) * 900);
    cloud.rotation.x = Math.PI / 2;
    group.add(cloud);
    clouds.push(cloud);
  }
  return { group, clouds };
}

function billboardTexture(seedColor) {
  const w = 128, h = 192;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#04050a';
  ctx.fillRect(0, 0, w, h);
  const rows = 6 + Math.floor(Math.random() * 6), cols = 3 + Math.floor(Math.random() * 3);
  const cw = w / cols, ch = h / rows;
  for (let r = 0; r < rows; r++) for (let cI = 0; cI < cols; cI++) {
    if (Math.random() > 0.45) { ctx.fillStyle = Math.random() > 0.5 ? seedColor : 'rgba(220,200,255,0.7)'; ctx.globalAlpha = 0.3 + Math.random() * 0.4; ctx.fillRect(cI * cw + 1, r * ch + 1, cw - 2, ch - 2); }
  }
  ctx.globalAlpha = 1;
  return new THREE.CanvasTexture(c);
}

function buildCitySkyline() {
  const group = new THREE.Group();
  const colors = ['#8b30ff', '#6a1eb0', '#3a5cff', '#c0a0ff'];
  for (let i = 0; i < 55; i++) {
    const w = 8 + Math.random() * 16, h = 40 + Math.random() * 190, d = 8 + Math.random() * 16;
    const x = (Math.random() - 0.5) * 1500, z = -380 - Math.random() * 260;
    const bld = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color: 0x08060f, roughness: 0.4, metalness: 0.6, emissive: 0x0a0618, emissiveIntensity: 0.3 }));
    bld.position.set(x, h / 2, z);
    group.add(bld);
    const windows = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.92, h * 0.92), new THREE.MeshBasicMaterial({ map: billboardTexture(colors[Math.floor(Math.random() * colors.length)]), transparent: true, opacity: 0.85 }));
    windows.position.set(x, h / 2, z + d / 2 + 0.05);
    group.add(windows);
  }
  return group;
}

function buildGround() {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.MeshStandardMaterial({ color: 0x03040a, roughness: 0.15, metalness: 0.5 }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.03;
  mesh.receiveShadow = true;
  return mesh;
}

function makeAsphaltTexture() {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#16151f';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 700; i++) { ctx.fillStyle = `rgba(${25 + Math.random() * 25},${20 + Math.random() * 22},${40 + Math.random() * 30},${Math.random() * 0.4})`; ctx.fillRect(Math.random() * size, Math.random() * size, 1.6, 1.6); }
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (let y = 0; y < size; y += 32) ctx.fillRect(size / 2 - 3, y, 6, 16);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(1, 60); tex.anisotropy = 4;
  return tex;
}

function buildStreetlight(color) {
  const g = new THREE.Group();
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x14141c, metalness: 0.8, roughness: 0.25 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 6, 8), poleMat);
  pole.position.y = 3; g.add(pole);
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 3.2 }));
  lamp.position.set(0, 5.9, 0); g.add(lamp);
  const pl = new THREE.PointLight(color, 1.6, 14, 2); pl.position.copy(lamp.position); g.add(pl);
  return g;
}

export function buildTrack() {
  const pts = [
    new THREE.Vector3(0, 0, 0), new THREE.Vector3(60, 0, -40), new THREE.Vector3(90, 0, -140),
    new THREE.Vector3(60, 0, -230), new THREE.Vector3(-20, 0, -260), new THREE.Vector3(-110, 0, -220),
    new THREE.Vector3(-140, 0, -120), new THREE.Vector3(-100, 0, -30), new THREE.Vector3(-40, 0, 40),
    new THREE.Vector3(30, 0, 60),
  ];
  const curve = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.5);
  const trackWidth = 14;
  const segments = 400;
  const roadGroup = new THREE.Group();
  const roadPositions = [], roadUvs = [], roadIndices = [], curbL = [], curbR = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const left = point.clone().addScaledVector(normal, trackWidth / 2);
    const right = point.clone().addScaledVector(normal, -trackWidth / 2);
    roadPositions.push(left.x, 0.01, left.z, right.x, 0.01, right.z);
    roadUvs.push(0, t * 60, 1, t * 60);
    curbL.push({ pos: left, normal }); curbR.push({ pos: right, normal });
    if (i < segments) { const a = i * 2, b = i * 2 + 1, c = i * 2 + 2, d = i * 2 + 3; roadIndices.push(a, b, c, b, d, c); }
  }
  const roadGeo = new THREE.BufferGeometry();
  roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(roadPositions, 3));
  roadGeo.setAttribute('uv', new THREE.Float32BufferAttribute(roadUvs, 2));
  roadGeo.setIndex(roadIndices);
  roadGeo.computeVertexNormals();
  const road = new THREE.Mesh(roadGeo, new THREE.MeshStandardMaterial({ map: makeAsphaltTexture(), roughness: 0.15, metalness: 0.45, envMapIntensity: 1.8 }));
  road.receiveShadow = true;
  roadGroup.add(road);
  [curbL, curbR].forEach((side, sideIdx) => {
    for (let i = 0; i < side.length - 1; i += 4) {
      const seg = side[i]; const next = side[Math.min(i + 4, side.length - 1)];
      const len = next.pos.clone().sub(seg.pos).length() || 0.01;
      const outward = seg.normal.clone().multiplyScalar(sideIdx === 0 ? 1 : -1);
      const curb = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, len), new THREE.MeshStandardMaterial({ color: (i / 4) % 2 === 0 ? 0xd6142a : 0xf2f2f2, roughness: 0.5 }));
      const mid = seg.pos.clone().lerp(next.pos, 0.5).addScaledVector(outward, 0.55);
      curb.position.set(mid.x, 0.06, mid.z); curb.lookAt(next.pos.x, 0.06, next.pos.z);
      roadGroup.add(curb);
    }
  });
  for (let i = 0; i < segments; i += 18) {
    const t = i / segments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const side = i % 36 === 0 ? 1 : -1;
    const pos = point.clone().addScaledVector(normal, side * (trackWidth / 2 + 4));
    const light = buildStreetlight(side > 0 ? 0x8b30ff : 0x3a5cff);
    light.position.copy(pos); light.lookAt(point.x, 0, point.z);
    roadGroup.add(light);
  }
  return { curve, roadGroup, trackWidth };
}

function buildRain(count = 2600) {
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  const spread = 220;
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = Math.random() * 80;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    speeds[i] = 65 + Math.random() * 40;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color: 0xc4b8ff, size: 0.24, transparent: true, opacity: 0.6, depthWrite: false });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  return { points, positions, speeds, spread, count, mat };
}

// Drifting ground fog — flat, semi-transparent planes that slide slowly through the streets.
function buildFogVolumes() {
  const group = new THREE.Group();
  const fogMat = new THREE.MeshBasicMaterial({ color: 0x4a3a6a, transparent: true, opacity: 0.14, depthWrite: false });
  const volumes = [];
  for (let i = 0; i < 8; i++) {
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(80 + Math.random() * 60, 30 + Math.random() * 20), fogMat.clone());
    plane.rotation.x = -Math.PI / 2;
    plane.position.set((Math.random() - 0.5) * 300, 1 + Math.random() * 3, (Math.random() - 0.5) * 300);
    group.add(plane);
    volumes.push({ mesh: plane, dir: Math.random() * Math.PI * 2, speed: 2 + Math.random() * 3 });
  }
  return { group, volumes };
}

export function buildWorld(scene) {
  scene.environment = makeNeonEnvTexture(['#8b30ff', '#6a1eb0', '#3a5cff', '#c0a0ff', '#e8e0ff']);
  scene.add(buildSky());
  scene.add(buildCitySkyline());
  scene.add(buildGround());
  const { group: cloudGroup, clouds } = buildStormClouds();
  scene.add(cloudGroup);

  const { curve, roadGroup, trackWidth } = buildTrack();
  scene.add(roadGroup);

  const rain = buildRain();
  scene.add(rain.points);

  const { group: fogGroup, volumes } = buildFogVolumes();
  scene.add(fogGroup);

  const moon = new THREE.DirectionalLight(0x8b7fff, 0.45);
  moon.position.set(-100, 160, -160);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  moon.shadow.camera.left = -160; moon.shadow.camera.right = 160;
  moon.shadow.camera.top = 160; moon.shadow.camera.bottom = -160;
  moon.shadow.camera.far = 600; moon.shadow.bias = -0.0015;
  scene.add(moon);
  scene.add(new THREE.HemisphereLight(0x8b30ff, 0x0a0616, 0.5));
  scene.add(new THREE.AmbientLight(0x1a1030, 0.5));
  scene.fog = new THREE.FogExp2(0x0a0618, 0.0026);

  // Frequent lightning (every 2-4s per the brief), synchronized with a "headlight sweep" — a
  // fast-moving spotlight streaking across the scene right after each flash.
  let lightningTimer = 1.5 + Math.random() * 2;
  const lightningLight = new THREE.PointLight(0xe8e0ff, 0, 600, 1.4);
  lightningLight.position.set(0, 220, -100);
  scene.add(lightningLight);

  const sweepLight = new THREE.SpotLight(0xdfefff, 0, 300, Math.PI / 5, 0.6, 1);
  sweepLight.position.set(-200, 40, 0);
  const sweepTarget = new THREE.Object3D();
  sweepTarget.position.set(0, 0, 0);
  scene.add(sweepTarget);
  sweepLight.target = sweepTarget;
  scene.add(sweepLight);
  let sweepActive = false, sweepT = 0;

  let rainIntensityPhase = 0;

  function update(dt) {
    const t = performance.now() * 0.001;

    // Rain intensity waves — opacity + fall speed multiplier breathe in and out over ~12s cycles.
    rainIntensityPhase += dt;
    const intensity = 0.55 + 0.35 * (0.5 + 0.5 * Math.sin(rainIntensityPhase * 0.18));
    rain.mat.opacity = intensity;
    const pos = rain.points.geometry.attributes.position.array;
    for (let i = 0; i < rain.count; i++) {
      pos[i * 3 + 1] -= rain.speeds[i] * dt * (0.7 + intensity * 0.6);
      if (pos[i * 3 + 1] < 0) pos[i * 3 + 1] = 60 + Math.random() * 20;
    }
    rain.points.geometry.attributes.position.needsUpdate = true;

    // Storm clouds drift + flare on lightning
    clouds.forEach((c, i) => { c.position.x += Math.sin(t * 0.05 + i) * dt * 2; });

    // Drifting fog
    volumes.forEach((v) => {
      v.mesh.position.x += Math.cos(v.dir) * v.speed * dt;
      v.mesh.position.z += Math.sin(v.dir) * v.speed * dt;
      if (Math.abs(v.mesh.position.x) > 200) v.dir = Math.PI - v.dir;
      if (Math.abs(v.mesh.position.z) > 200) v.dir = -v.dir;
    });

    // Lightning + synchronized headlight sweep
    lightningTimer -= dt;
    if (lightningTimer <= 0) {
      lightningLight.intensity = 8 + Math.random() * 5;
      lightningTimer = 2 + Math.random() * 2.5;
      clouds.forEach((c) => { c.material.opacity = 0.7; });
      setTimeout(() => { lightningLight.intensity = 0; clouds.forEach((c) => { c.material.opacity = 0.35; }); }, 100);
      sweepActive = true;
      sweepT = 0;
      sweepLight.intensity = 4;
    }
    if (sweepActive) {
      sweepT += dt;
      const sx = -220 + sweepT * 180;
      sweepLight.position.set(sx, 35, -30 + Math.sin(sweepT * 2) * 40);
      sweepTarget.position.set(sx + 20, 0, -30);
      if (sweepT > 2.2) { sweepActive = false; sweepLight.intensity = 0; }
    }
  }

  return { curve, trackWidth, update };
}
