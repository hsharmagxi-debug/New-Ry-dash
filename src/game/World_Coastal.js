import * as THREE from 'three';
import { makeNeonEnvTexture } from './EnvMap.js';

/* =========================================================================
   RYDASH — "Coastal Highway" world: a moonlit night drive along the coast.
   Ocean (real animated wave displacement) on one side, mountains/city
   silhouette on the other, road lights, and slow-drifting floating
   particles for a premium, calm-but-fast atmosphere.
   ========================================================================= */

function buildSky() {
  const uniforms = {
    topColor: { value: new THREE.Color(0x03060f) },
    midColor: { value: new THREE.Color(0x0a1638) },
    horizonColor: { value: new THREE.Color(0x1a3a5a) },
    bottomColor: { value: new THREE.Color(0x020308) },
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
        if (h > 0.1) { col = mix(horizonColor, midColor, clamp(pow(h, exponent) * 1.6, 0.0, 1.0)); col = mix(col, topColor, clamp(pow(h, exponent * 2.0), 0.0, 1.0)); }
        else { col = mix(bottomColor, horizonColor, clamp((h + 0.3) / 0.45, 0.0, 1.0)); }
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  return new THREE.Mesh(geo, mat);
}

function radialGlowTexture(inner, outer) {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, inner); g.addColorStop(0.5, outer); g.addColorStop(1, 'rgba(200,220,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

function buildMoon() {
  const g = new THREE.Group();
  const disc = new THREE.Mesh(new THREE.CircleGeometry(30, 40), new THREE.MeshBasicMaterial({ color: 0xf4f6ff }));
  g.add(disc);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: radialGlowTexture('rgba(230,240,255,0.9)', 'rgba(150,180,255,0.25)'), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
  glow.scale.set(280, 280, 1);
  g.add(glow);
  g.position.set(150, 130, -700);
  return g;
}

// Real animated ocean — a subdivided plane with a vertex shader sine-wave displacement, so it
// genuinely ripples rather than relying on a scrolling texture.
function buildOcean() {
  const size = 900, seg = 90;
  const geo = new THREE.PlaneGeometry(size, size, seg, seg);
  const mat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColorDeep: { value: new THREE.Color(0x030d1e) }, uColorShallow: { value: new THREE.Color(0x0e3a56) }, uMoon: { value: new THREE.Color(0xcfe0ff) } },
    vertexShader: `
      uniform float uTime;
      varying float vHeight;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 p = position;
        float h = sin(p.x * 0.06 + uTime * 0.9) * 0.6 + sin(p.y * 0.09 - uTime * 0.6) * 0.4 + sin((p.x + p.y) * 0.03 + uTime * 1.3) * 0.5;
        p.z += h;
        vHeight = h;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColorDeep; uniform vec3 uColorShallow; uniform vec3 uMoon;
      varying float vHeight; varying vec2 vUv;
      void main() {
        vec3 col = mix(uColorDeep, uColorShallow, smoothstep(-0.6, 1.0, vHeight));
        float sparkle = pow(max(0.0, vHeight), 3.0) * 0.6;
        col += uMoon * sparkle;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(220, -0.5, -100);
  return mesh;
}

function buildMountainSilhouette() {
  const group = new THREE.Group();
  const layers = [{ z: -650, h: 130, color: 0x0a1424 }, { z: -560, h: 100, color: 0x0e1c30 }, { z: -470, h: 75, color: 0x14263e }];
  layers.forEach((layer) => {
    const shape = new THREE.Shape();
    const width = 1800;
    shape.moveTo(-width / 2, -5);
    let x = -width / 2;
    while (x <= width / 2) { shape.lineTo(x, layer.h * 0.4 + Math.random() * layer.h); x += width / 14; }
    shape.lineTo(width / 2, -5); shape.closePath();
    const mesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 40, bevelEnabled: false }), new THREE.MeshStandardMaterial({ color: layer.color, roughness: 1, emissive: layer.color, emissiveIntensity: 0.15 }));
    mesh.position.set(-260, 0, layer.z);
    group.add(mesh);
  });
  // A few lit windows scattered on the near ridge to read as a distant coastal city
  for (let i = 0; i < 30; i++) {
    const dot = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.MeshBasicMaterial({ color: 0xffd9a0, transparent: true, opacity: 0.7 }));
    dot.position.set(-260 + (Math.random() - 0.5) * 700, 10 + Math.random() * 40, -470 + Math.random() * 10);
    group.add(dot);
  }
  return group;
}

function makeAsphaltTexture() {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#1c1f24';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 700; i++) { ctx.fillStyle = `rgba(${30 + Math.random() * 20},${34 + Math.random() * 22},${38 + Math.random() * 24},${Math.random() * 0.4})`; ctx.fillRect(Math.random() * size, Math.random() * size, 1.6, 1.6); }
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (let y = 0; y < size; y += 32) ctx.fillRect(size / 2 - 3, y, 6, 16);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping; tex.wrapT = THREE.RepeatWrapping; tex.repeat.set(1, 60); tex.anisotropy = 4;
  return tex;
}

function buildStreetlight(color) {
  const g = new THREE.Group();
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x1a1c22, metalness: 0.7, roughness: 0.35 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 5.5, 8), poleMat);
  pole.position.y = 2.75; g.add(pole);
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 3 }));
  lamp.position.set(0, 5.4, 0); g.add(lamp);
  const pl = new THREE.PointLight(color, 1.4, 13, 2); pl.position.copy(lamp.position); g.add(pl);
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
  const road = new THREE.Mesh(roadGeo, new THREE.MeshStandardMaterial({ map: makeAsphaltTexture(), roughness: 0.55, metalness: 0.15 }));
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
    const light = buildStreetlight(side > 0 ? 0xcfe0ff : 0x39ff9d);
    light.position.copy(pos); light.lookAt(point.x, 0, point.z);
    roadGroup.add(light);
  }
  return { curve, roadGroup, trackWidth };
}

function buildGround() {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.MeshStandardMaterial({ color: 0x0a0e14, roughness: 1 }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.05;
  mesh.receiveShadow = true;
  return mesh;
}

// Slow-drifting floating particles (mist/sparkle), unlike falling rain — they rise gently.
function buildFloatingParticles(count = 400) {
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 300;
    positions[i * 3 + 1] = Math.random() * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 300;
    speeds[i] = 0.4 + Math.random() * 0.6;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({ color: 0xcfe0ff, size: 0.3, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  return { points, positions, speeds, count };
}

export function buildWorld(scene) {
  scene.environment = makeNeonEnvTexture(['#cfe0ff', '#39ff9d', '#0e3a56', '#8fa8ff', '#ffd9a0']);
  scene.add(buildSky());
  scene.add(buildMoon());
  scene.add(buildMountainSilhouette());
  scene.add(buildGround());
  const ocean = buildOcean();
  scene.add(ocean);

  const { curve, roadGroup, trackWidth } = buildTrack();
  scene.add(roadGroup);

  const particles = buildFloatingParticles();
  scene.add(particles.points);

  const moonLight = new THREE.DirectionalLight(0xcfe0ff, 0.9);
  moonLight.position.set(150, 160, -200);
  moonLight.castShadow = true;
  moonLight.shadow.mapSize.set(2048, 2048);
  moonLight.shadow.camera.left = -160; moonLight.shadow.camera.right = 160;
  moonLight.shadow.camera.top = 160; moonLight.shadow.camera.bottom = -160;
  moonLight.shadow.camera.far = 600; moonLight.shadow.bias = -0.0015;
  scene.add(moonLight);
  scene.add(new THREE.HemisphereLight(0x4a7aaa, 0x152030, 0.9));
  scene.add(new THREE.AmbientLight(0x253040, 0.8));
  scene.fog = new THREE.FogExp2(0x040810, 0.001);

  function update(dt) {
    ocean.material.uniforms.uTime.value += dt;
    const pos = particles.points.geometry.attributes.position.array;
    for (let i = 0; i < particles.count; i++) {
      pos[i * 3 + 1] += particles.speeds[i] * dt;
      pos[i * 3] += Math.sin(performance.now() * 0.0003 + i) * dt * 0.3;
      if (pos[i * 3 + 1] > 30) pos[i * 3 + 1] = 0;
    }
    particles.points.geometry.attributes.position.needsUpdate = true;
  }

  return { curve, trackWidth, update };
}
