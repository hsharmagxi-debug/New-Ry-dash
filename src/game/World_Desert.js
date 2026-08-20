import * as THREE from 'three';
import { makeNeonEnvTexture } from './EnvMap.js';

/* =========================================================================
   RYDASH — "Neon Desert" world: Vegas x Dubai x Cyberpunk. A vast desert
   highway with a glowing futuristic skyline on the horizon, drifting sand,
   heat-haze shimmer, and drone lights crossing the sky.
   ========================================================================= */

function buildSky() {
  const uniforms = {
    topColor: { value: new THREE.Color(0x100826) },
    midColor: { value: new THREE.Color(0x6a1e6e) },
    horizonColor: { value: new THREE.Color(0xff7a3d) },
    bottomColor: { value: new THREE.Color(0x1a0e10) },
    offset: { value: 20 },
    exponent: { value: 0.65 },
  };
  const geo = new THREE.SphereGeometry(900, 32, 16);
  const mat = new THREE.ShaderMaterial({
    uniforms,
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: `
      varying vec3 vWorldPosition;
      void main() {
        vec4 worldPosition = modelMatrix * vec4(position, 1.0);
        vWorldPosition = worldPosition.xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor; uniform vec3 midColor; uniform vec3 horizonColor; uniform vec3 bottomColor;
      uniform float offset; uniform float exponent;
      varying vec3 vWorldPosition;
      void main() {
        float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
        vec3 col;
        if (h > 0.1) {
          col = mix(horizonColor, midColor, clamp(pow(h, exponent) * 1.7, 0.0, 1.0));
          col = mix(col, topColor, clamp(pow(h, exponent * 2.2), 0.0, 1.0));
        } else {
          col = mix(bottomColor, horizonColor, clamp((h + 0.3) / 0.45, 0.0, 1.0));
        }
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  return new THREE.Mesh(geo, mat);
}

function makeSandTexture() {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#3a2c22';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 1400; i++) {
    ctx.fillStyle = `rgba(${90 + Math.random() * 60},${65 + Math.random() * 40},${40 + Math.random() * 25},${Math.random() * 0.5})`;
    ctx.fillRect(Math.random() * size, Math.random() * size, 1.4, 1.4);
  }
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (let y = 0; y < size; y += 32) ctx.fillRect(size / 2 - 3, y, 6, 16);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 60);
  tex.anisotropy = 4;
  return tex;
}

function buildGround() {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.MeshStandardMaterial({ color: 0x2a1f18, roughness: 1 }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.02;
  mesh.receiveShadow = true;
  return mesh;
}

function buildGlowSkyline() {
  const group = new THREE.Group();
  const colors = [0xff7a3d, 0xff2e88, 0x00e5ff, 0xffd166];
  for (let i = 0; i < 45; i++) {
    const w = 7 + Math.random() * 15, h = 35 + Math.random() * 200, d = 7 + Math.random() * 15;
    const x = (Math.random() - 0.5) * 1500, z = -400 - Math.random() * 260;
    const bld = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color: 0x140a10, roughness: 0.5, metalness: 0.4, emissive: 0x1a0a12, emissiveIntensity: 0.35 }));
    bld.position.set(x, h / 2, z);
    group.add(bld);
    const glowColor = colors[Math.floor(Math.random() * colors.length)];
    const stripe = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.5, h * 0.96), new THREE.MeshBasicMaterial({ color: glowColor, transparent: true, opacity: 0.5 }));
    stripe.position.set(x, h / 2, z + d / 2 + 0.08);
    group.add(stripe);
  }
  return group;
}

function buildCactus() {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x1e5c3f, roughness: 0.9, emissive: 0x0a2515, emissiveIntensity: 0.2 });
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 2.4, 8), mat);
  trunk.position.y = 1.2;
  g.add(trunk);
  [-1, 1].forEach((side) => {
    const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 1.1, 8), mat);
    arm.position.set(side * 0.32, 1.6, 0);
    arm.rotation.z = side * 0.5;
    g.add(arm);
  });
  return g;
}

function buildDrone(color) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), new THREE.MeshStandardMaterial({ color: 0x111318, metalness: 0.8, roughness: 0.3 }));
  g.add(body);
  const light = new THREE.PointLight(color, 1.8, 12, 2);
  g.add(light);
  const glowDot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 8, 8), new THREE.MeshBasicMaterial({ color }));
  glowDot.position.y = -0.15;
  g.add(glowDot);
  return g;
}

function buildStreetlight(color) {
  const g = new THREE.Group();
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x1a1c22, metalness: 0.7, roughness: 0.4 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 6, 8), poleMat);
  pole.position.y = 3;
  g.add(pole);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.1, 0.1), poleMat);
  arm.position.set(0.75, 5.9, 0);
  g.add(arm);
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 3.2 }));
  lamp.position.set(1.5, 5.75, 0);
  g.add(lamp);
  const pl = new THREE.PointLight(color, 1.6, 15, 2);
  pl.position.copy(lamp.position);
  g.add(pl);
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
    if (i < segments) {
      const a = i * 2, b = i * 2 + 1, c = i * 2 + 2, d = i * 2 + 3;
      roadIndices.push(a, b, c, b, d, c);
    }
  }

  const roadGeo = new THREE.BufferGeometry();
  roadGeo.setAttribute('position', new THREE.Float32BufferAttribute(roadPositions, 3));
  roadGeo.setAttribute('uv', new THREE.Float32BufferAttribute(roadUvs, 2));
  roadGeo.setIndex(roadIndices);
  roadGeo.computeVertexNormals();
  const road = new THREE.Mesh(roadGeo, new THREE.MeshStandardMaterial({ map: makeSandTexture(), roughness: 0.85, metalness: 0.1 }));
  road.receiveShadow = true;
  roadGroup.add(road);

  [curbL, curbR].forEach((side, sideIdx) => {
    for (let i = 0; i < side.length - 1; i += 4) {
      const seg = side[i];
      const next = side[Math.min(i + 4, side.length - 1)];
      const len = next.pos.clone().sub(seg.pos).length() || 0.01;
      const outward = seg.normal.clone().multiplyScalar(sideIdx === 0 ? 1 : -1);
      const curb = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.12, len), new THREE.MeshStandardMaterial({ color: (i / 4) % 2 === 0 ? 0xd6142a : 0xf2f2f2, roughness: 0.6 }));
      const mid = seg.pos.clone().lerp(next.pos, 0.5).addScaledVector(outward, 0.55);
      curb.position.set(mid.x, 0.06, mid.z);
      curb.lookAt(next.pos.x, 0.06, next.pos.z);
      roadGroup.add(curb);
      if ((i / 4) % 3 === 0) {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.7, len * 1.05), new THREE.MeshStandardMaterial({ color: 0xb08a5a, metalness: 0.7, roughness: 0.4 }));
        const railMid = seg.pos.clone().lerp(next.pos, 0.5).addScaledVector(outward, 1.4);
        rail.position.set(railMid.x, 0.55, railMid.z);
        rail.lookAt(next.pos.x, 0.55, next.pos.z);
        roadGroup.add(rail);
      }
    }
  });

  for (let i = 0; i < segments; i += 18) {
    const t = i / segments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const side = i % 36 === 0 ? 1 : -1;
    const pos = point.clone().addScaledVector(normal, side * (trackWidth / 2 + 4));
    if (i % 36 === 0) {
      const light = buildStreetlight(side > 0 ? 0xff7a3d : 0x00e5ff);
      light.position.copy(pos);
      light.lookAt(point.x, 0, point.z);
      roadGroup.add(light);
    } else {
      const cactus = buildCactus();
      cactus.position.copy(pos);
      roadGroup.add(cactus);
    }
  }

  return { curve, roadGroup, trackWidth };
}

export function buildWorld(scene) {
  scene.environment = makeNeonEnvTexture(['#ff7a3d', '#ff2e88', '#00e5ff', '#ffd166', '#ffb347']);
  scene.add(buildSky());
  scene.add(buildGlowSkyline());
  scene.add(buildGround());

  const { curve, roadGroup, trackWidth } = buildTrack();
  scene.add(roadGroup);

  const sunLight = new THREE.DirectionalLight(0xffb37a, 1.3);
  sunLight.position.set(-100, 130, -180);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.left = -160; sunLight.shadow.camera.right = 160;
  sunLight.shadow.camera.top = 160; sunLight.shadow.camera.bottom = -160;
  sunLight.shadow.camera.far = 600; sunLight.shadow.bias = -0.0015;
  scene.add(sunLight);

  scene.add(new THREE.HemisphereLight(0xff7a3d, 0x2a0e10, 0.6));
  scene.add(new THREE.AmbientLight(0x4a2a20, 0.55));
  scene.fog = new THREE.FogExp2(0x2a1418, 0.0019);

  // A handful of drones drifting across the sky, tracing lazy loops
  const drones = [];
  const droneColors = [0x00e5ff, 0xff2e88, 0xffd166];
  for (let i = 0; i < 5; i++) {
    const drone = buildDrone(droneColors[i % droneColors.length]);
    const radius = 60 + Math.random() * 120;
    const height = 30 + Math.random() * 40;
    const speed = 0.05 + Math.random() * 0.05;
    const phase = Math.random() * Math.PI * 2;
    const cx = (Math.random() - 0.5) * 200, cz = -100 - Math.random() * 200;
    scene.add(drone);
    drones.push({ mesh: drone, radius, height, speed, phase, cx, cz });
  }

  function update(dt) {
    const t = performance.now() * 0.001;
    drones.forEach((d) => {
      const a = t * d.speed + d.phase;
      d.mesh.position.set(d.cx + Math.cos(a) * d.radius, d.height + Math.sin(a * 2) * 4, d.cz + Math.sin(a) * d.radius);
    });
  }

  return { curve, trackWidth, update };
}
