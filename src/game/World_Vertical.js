import * as THREE from 'three';
import { makeNeonEnvTexture } from './EnvMap.js';

/* =========================================================================
   RYDASH — "Vertical City" world: a narrow racing canyon between massive
   skyscrapers. Flying vehicles cross overhead, an elevated train sweeps
   past on its own track, giant digital billboards glow, and pedestrian
   silhouettes line the sidewalks far below the towers' neon windows.
   ========================================================================= */

function buildSky() {
  const uniforms = {
    topColor: { value: new THREE.Color(0x02030a) },
    midColor: { value: new THREE.Color(0x0a0e28) },
    horizonColor: { value: new THREE.Color(0x141a3a) },
    bottomColor: { value: new THREE.Color(0x010104) },
    offset: { value: 20 }, exponent: { value: 0.7 },
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

function billboardTexture(seedColor, big) {
  const w = 160, h = big ? 300 : 192;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#050609';
  ctx.fillRect(0, 0, w, h);
  const rows = 8 + Math.floor(Math.random() * 8), cols = 4 + Math.floor(Math.random() * 3);
  const cw = w / cols, ch = h / rows;
  for (let r = 0; r < rows; r++) for (let cI = 0; cI < cols; cI++) {
    if (Math.random() > 0.35) { ctx.fillStyle = Math.random() > 0.5 ? seedColor : 'rgba(255,255,255,0.75)'; ctx.globalAlpha = 0.35 + Math.random() * 0.55; ctx.fillRect(cI * cw + 1, r * ch + 1, cw - 2, ch - 2); }
  }
  ctx.globalAlpha = 1;
  return new THREE.CanvasTexture(c);
}

const NEON_COLORS = ['#00e5ff', '#ff2e88', '#ffb347', '#9b30ff'];

// Very tall, closely-packed towers, kept clear of a narrow racing canyon down the middle.
function buildTowerCanyon(billboardList) {
  const group = new THREE.Group();
  for (let i = 0; i < 90; i++) {
    const w = 10 + Math.random() * 16, h = 100 + Math.random() * 340, d = 10 + Math.random() * 16;
    let x = (Math.random() - 0.5) * 600;
    if (Math.abs(x) < 40) x += Math.sign(x || 1) * 40; // keep the racing canyon clear
    const z = (Math.random() - 0.5) * 900;
    const bld = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color: 0x06070d, roughness: 0.4, metalness: 0.6, emissive: 0x040611, emissiveIntensity: 0.35 }));
    bld.position.set(x, h / 2, z);
    group.add(bld);
    const color = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
    const isGiant = Math.random() > 0.85;
    const windows = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.9, h * (isGiant ? 0.5 : 0.92)), new THREE.MeshBasicMaterial({ map: billboardTexture(color, isGiant), transparent: true, opacity: isGiant ? 0.97 : 0.85 }));
    windows.position.set(x, isGiant ? h * 0.55 : h / 2, z + (x > 0 ? -d / 2 - 0.05 : d / 2 + 0.05));
    windows.rotation.y = x > 0 ? Math.PI : 0;
    group.add(windows);
    if (isGiant) billboardList.push({ mesh: windows, mat: windows.material, phase: Math.random() * 10 });
  }
  return group;
}

// Flying vehicles — small craft with a glow trail, looping through the canyon at various heights.
function buildFlyingVehicles(count = 6) {
  const list = [];
  for (let i = 0; i < count; i++) {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.ConeGeometry(0.5, 2.2, 6), new THREE.MeshStandardMaterial({ color: 0x1a1c24, metalness: 0.8, roughness: 0.3 }));
    body.rotation.x = Math.PI / 2;
    g.add(body);
    const color = NEON_COLORS[i % NEON_COLORS.length];
    const glow = new THREE.PointLight(color, 1.6, 20, 2);
    glow.position.z = -1.2;
    g.add(glow);
    const tail = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), new THREE.MeshBasicMaterial({ color }));
    tail.position.z = -1.2;
    g.add(tail);
    list.push({
      group: g, radius: 40 + Math.random() * 120, height: 30 + Math.random() * 200,
      speed: 0.06 + Math.random() * 0.08, phase: Math.random() * Math.PI * 2, cx: (Math.random() - 0.5) * 200, cz: (Math.random() - 0.5) * 300,
    });
  }
  return list;
}

// Elevated train — crosses on its own overhead track periodically, similar rhythm to Deep Run's
// underground train but visible in open air, high above the road.
function buildTrain() {
  const g = new THREE.Group();
  for (let i = 0; i < 4; i++) {
    const car = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 8), new THREE.MeshStandardMaterial({ color: 0x1a1e28, metalness: 0.6, roughness: 0.35, emissive: 0x0a0e18, emissiveIntensity: 0.3 }));
    car.position.z = -i * 8.4;
    g.add(car);
    const stripe = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.5), new THREE.MeshBasicMaterial({ color: 0x00e5ff }));
    stripe.position.set(0, 0.3, -i * 8.4 + 4.01);
    g.add(stripe);
  }
  const headlight = new THREE.PointLight(0xffffff, 3, 30, 2);
  headlight.position.z = 4.5;
  g.add(headlight);
  return g;
}

// Flat pedestrian silhouettes lining the sidewalks — cheap, static, reads well from a distance.
function buildPedestrians(curve, trackWidth) {
  const group = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({ color: 0x0a0a0e });
  for (let i = 0; i < 60; i++) {
    const t = Math.random();
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    const pos = point.clone().addScaledVector(normal, side * (trackWidth / 2 + 2.5 + Math.random() * 3));
    const h = 1.6 + Math.random() * 0.3;
    const silhouette = new THREE.Mesh(new THREE.CapsuleGeometry(0.22, h * 0.6, 2, 6), mat);
    silhouette.position.set(pos.x, h / 2, pos.z);
    group.add(silhouette);
  }
  return group;
}

function makeAsphaltTexture() {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#1a1b20';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 700; i++) { ctx.fillStyle = `rgba(${28 + Math.random() * 22},${28 + Math.random() * 22},${34 + Math.random() * 24},${Math.random() * 0.4})`; ctx.fillRect(Math.random() * size, Math.random() * size, 1.6, 1.6); }
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (let y = 0; y < size; y += 32) ctx.fillRect(size / 2 - 3, y, 6, 16);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(1, 60); tex.anisotropy = 4;
  return tex;
}

function buildStreetlight(color) {
  const g = new THREE.Group();
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x14141c, metalness: 0.8, roughness: 0.3 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 6, 8), poleMat);
  pole.position.y = 3; g.add(pole);
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 3.2 }));
  lamp.position.set(0, 5.9, 0); g.add(lamp);
  const pl = new THREE.PointLight(color, 1.5, 14, 2); pl.position.copy(lamp.position); g.add(pl);
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
  const road = new THREE.Mesh(roadGeo, new THREE.MeshStandardMaterial({ map: makeAsphaltTexture(), roughness: 0.4, metalness: 0.3, envMapIntensity: 1.2 }));
  road.receiveShadow = true;
  roadGroup.add(road);
  [curbL, curbR].forEach((side, sideIdx) => {
    for (let i = 0; i < side.length - 1; i += 4) {
      const seg = side[i]; const next = side[Math.min(i + 4, side.length - 1)];
      const len = next.pos.clone().sub(seg.pos).length() || 0.01;
      const outward = seg.normal.clone().multiplyScalar(sideIdx === 0 ? 1 : -1);
      const curb = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, len), new THREE.MeshStandardMaterial({ color: (i / 4) % 2 === 0 ? 0xd6142a : 0xf2f2f2, roughness: 0.6 }));
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
    const light = buildStreetlight(side > 0 ? 0x00e5ff : 0xff2e88);
    light.position.copy(pos); light.lookAt(point.x, 0, point.z);
    roadGroup.add(light);
  }
  return { curve, roadGroup, trackWidth };
}

function buildGround() {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.MeshStandardMaterial({ color: 0x04050a, roughness: 0.85 }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.03;
  mesh.receiveShadow = true;
  return mesh;
}

export function buildWorld(scene) {
  scene.environment = makeNeonEnvTexture(['#00e5ff', '#ff2e88', '#ffb347', '#9b30ff']);
  scene.add(buildSky());
  scene.add(buildGround());
  const billboardList = [];
  scene.add(buildTowerCanyon(billboardList));

  const { curve, roadGroup, trackWidth } = buildTrack();
  scene.add(roadGroup);
  scene.add(buildPedestrians(curve, trackWidth));

  const flyers = buildFlyingVehicles();
  flyers.forEach((f) => scene.add(f.group));

  const train = buildTrain();
  scene.add(train);
  let trainActive = false, trainT = 0, trainCooldown = 4 + Math.random() * 4;

  const key = new THREE.DirectionalLight(0x8fa8ff, 0.7);
  key.position.set(-120, 200, -160);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -160; key.shadow.camera.right = 160;
  key.shadow.camera.top = 160; key.shadow.camera.bottom = -160;
  key.shadow.camera.far = 600; key.shadow.bias = -0.0015;
  scene.add(key);
  scene.add(new THREE.HemisphereLight(0x00e5ff, 0x05050f, 0.5));
  scene.add(new THREE.AmbientLight(0x0f1230, 0.55));
  scene.fog = new THREE.FogExp2(0x03040a, 0.0021);

  function update(dt) {
    const t = performance.now() * 0.001;

    flyers.forEach((f) => {
      const a = t * f.speed + f.phase;
      f.group.position.set(f.cx + Math.cos(a) * f.radius, f.height + Math.sin(a * 1.7) * 6, f.cz + Math.sin(a) * f.radius);
      f.group.rotation.y = -a - Math.PI / 2;
    });

    billboardList.forEach((b) => {
      const flick = 0.8 + 0.2 * Math.sin(t * 3 + b.phase);
      b.mat.opacity = 0.9 * flick;
    });

    if (!trainActive) {
      trainCooldown -= dt;
      train.visible = false;
      if (trainCooldown <= 0) { trainActive = true; trainT = 0; }
    } else {
      train.visible = true;
      trainT += dt * 40;
      train.position.set(-160 + trainT, 90, -60);
      train.rotation.y = Math.PI / 2;
      if (trainT > 320) { trainActive = false; trainCooldown = 6 + Math.random() * 6; }
    }
  }

  return { curve, trackWidth, update };
}
