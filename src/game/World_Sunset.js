import * as THREE from 'three';
import { makeNeonEnvTexture } from './EnvMap.js';

/* =========================================================================
   RYDASH — "Sunset Highway" world: a bright, premium mountain-pass circuit
   at golden hour. Palm trees, city skyline on the horizon, snow-capped
   peaks, warm bloom-lit sun. Companion to World.js ("Neon District").
   Call World_Sunset.update(dt) every frame to animate the sun glow /
   drifting clouds / passing traffic.
   ========================================================================= */

function buildSky() {
  const uniforms = {
    topColor: { value: new THREE.Color(0x1a0b3d) },
    midColor: { value: new THREE.Color(0xff4d7a) },
    horizonColor: { value: new THREE.Color(0xffb347) },
    bottomColor: { value: new THREE.Color(0x0a0a18) },
    offset: { value: 20 },
    exponent: { value: 0.7 },
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
        if (h > 0.15) {
          col = mix(horizonColor, midColor, clamp(pow(h, exponent) * 1.6, 0.0, 1.0));
          col = mix(col, topColor, clamp(pow(h, exponent * 2.0), 0.0, 1.0));
        } else {
          col = mix(bottomColor, horizonColor, clamp((h + 0.35) / 0.5, 0.0, 1.0));
        }
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  return new THREE.Mesh(geo, mat);
}

function radialGlowTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const grd = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, 'rgba(255,220,160,0.9)');
  grd.addColorStop(0.4, 'rgba(255,150,120,0.35)');
  grd.addColorStop(1, 'rgba(255,80,120,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function buildSun() {
  const g = new THREE.Group();
  const disc = new THREE.Mesh(new THREE.CircleGeometry(46, 48), new THREE.MeshBasicMaterial({ color: 0xfff1c9 }));
  g.add(disc);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialGlowTexture(), color: 0xffcf8a, transparent: true, opacity: 0.9,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  glow.scale.set(420, 420, 1);
  g.add(glow);
  g.position.set(0, 90, -760);
  g.userData.glow = glow;
  return g;
}

function buildMountains() {
  const group = new THREE.Group();
  const layers = [
    { z: -700, h: 140, color: 0x2a1a4a }, { z: -600, h: 110, color: 0x3a2258 }, { z: -500, h: 80, color: 0x50306e },
  ];
  layers.forEach((layer) => {
    const shape = new THREE.Shape();
    const width = 2200;
    shape.moveTo(-width / 2, -5);
    let x = -width / 2;
    const step = width / 15;
    while (x <= width / 2) {
      const y = layer.h * 0.4 + Math.random() * layer.h;
      shape.lineTo(x, y);
      x += step;
    }
    shape.lineTo(width / 2, -5);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, { depth: 40, bevelEnabled: false });
    const mat = new THREE.MeshStandardMaterial({ color: layer.color, roughness: 1, emissive: layer.color, emissiveIntensity: 0.12 });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, 0, layer.z);
    group.add(mesh);
  });
  return group;
}

function buildCitySkyline() {
  const group = new THREE.Group();
  const windowColors = [0xffb347, 0xff2e88, 0x00e5ff, 0x9dff1a];
  for (let i = 0; i < 40; i++) {
    const w = 8 + Math.random() * 14, h = 30 + Math.random() * 140, d = 8 + Math.random() * 14;
    const x = (Math.random() - 0.5) * 1400, z = -420 - Math.random() * 180;
    const bld = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color: 0x2c3550, roughness: 0.6, metalness: 0.3, emissive: 0x181e38, emissiveIntensity: 0.6 }));
    bld.position.set(x, h / 2, z);
    group.add(bld);
    if (Math.random() > 0.4) {
      const glowColor = windowColors[Math.floor(Math.random() * windowColors.length)];
      const strip = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.85, h * 0.85), new THREE.MeshBasicMaterial({ color: glowColor, transparent: true, opacity: 0.16 }));
      strip.position.set(x, h / 2, z + d / 2 + 0.1);
      group.add(strip);
    }
  }
  return group;
}

function buildPalm() {
  const g = new THREE.Group();
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x2a1f18, roughness: 1 });
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.22, 5.5, 6), trunkMat);
  trunk.position.y = 2.75;
  trunk.rotation.z = (Math.random() - 0.5) * 0.15;
  g.add(trunk);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x0c3d2e, roughness: 0.8, emissive: 0x0c3d2e, emissiveIntensity: 0.15 });
  for (let i = 0; i < 6; i++) {
    const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.35, 2.6, 4), leafMat);
    leaf.position.y = 5.4;
    leaf.rotation.z = Math.PI / 2.4;
    leaf.rotation.y = (i / 6) * Math.PI * 2;
    leaf.rotation.x = 0.5;
    g.add(leaf);
  }
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
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 3 }));
  lamp.position.set(1.5, 5.75, 0);
  g.add(lamp);
  const pl = new THREE.PointLight(color, 1.4, 14, 2);
  pl.position.copy(lamp.position);
  g.add(pl);
  return g;
}

function makeAsphaltTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#2a2c33';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = `rgba(${20 + Math.random() * 30},${20 + Math.random() * 30},${24 + Math.random() * 30},${Math.random() * 0.5})`;
    ctx.fillRect(Math.random() * size, Math.random() * size, 1.6, 1.6);
  }
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (let y = 0; y < size; y += 32) ctx.fillRect(size / 2 - 3, y, 6, 16);
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 60);
  tex.anisotropy = 4;
  return tex;
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
  const road = new THREE.Mesh(roadGeo, new THREE.MeshStandardMaterial({ map: makeAsphaltTexture(), roughness: 0.95, metalness: 0.05 }));
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
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.7, len * 1.05), new THREE.MeshStandardMaterial({ color: 0xb9c2cc, metalness: 0.8, roughness: 0.35 }));
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
      const light = buildStreetlight(side > 0 ? 0xffb347 : 0xff2e88);
      light.position.copy(pos);
      light.lookAt(point.x, 0, point.z);
      roadGroup.add(light);
    } else {
      const palm = buildPalm();
      palm.position.copy(pos);
      roadGroup.add(palm);
    }
  }

  return { curve, roadGroup, trackWidth };
}

function buildGround() {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.MeshStandardMaterial({ color: 0x24382c, roughness: 0.9 }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.02;
  mesh.receiveShadow = true;
  return mesh;
}

export function buildWorld(scene) {
  scene.environment = makeNeonEnvTexture(['#ffb347', '#ff7a1a', '#7c4dff', '#ffe08a', '#ff2e88']);
  scene.add(buildSky());
  const sun = buildSun();
  scene.add(sun);
  scene.add(buildMountains());
  scene.add(buildCitySkyline());
  scene.add(buildGround());

  const { curve, roadGroup, trackWidth } = buildTrack();
  scene.add(roadGroup);

  const sunLight = new THREE.DirectionalLight(0xffd9a8, 1.4);
  sunLight.position.set(-120, 140, -200);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.left = -160; sunLight.shadow.camera.right = 160;
  sunLight.shadow.camera.top = 160; sunLight.shadow.camera.bottom = -160;
  sunLight.shadow.camera.far = 600; sunLight.shadow.bias = -0.0015;
  scene.add(sunLight);

  scene.add(new THREE.HemisphereLight(0x9a8bff, 0x2a1a3e, 0.9));
  scene.add(new THREE.AmbientLight(0x503a65, 0.75));
  scene.fog = new THREE.FogExp2(0x1a0e2e, 0.001);

  function update(dt) {
    const t = performance.now() * 0.001;
    sun.userData.glow.material.opacity = 0.8 + Math.sin(t * 0.4) * 0.1;
  }

  return { curve, trackWidth, update };
}
