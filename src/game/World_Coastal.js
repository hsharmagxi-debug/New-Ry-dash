import * as THREE from 'three';
import { makeNeonEnvTexture } from './EnvMap.js';

/* =========================================================================
   RYDASH — "Miami Coastal Highway" & "Alpine Peaks" World
   ☀️ Brighter world/environment lighting
   🌴 Visible buildings, palms, ocean and track surroundings
   🚘 Cars remain clearly separated from the environment
   ✨ Stronger reflections/highlights on cars
   🌫️ Reduced fog so the world doesn't look washed out
   🏁 Overhead track gantries & neon directional chevrons
   🌅 Day / Sunset / Night / Storm environments
   ========================================================================= */

function buildSky(phase = 'day') {
  let topColor, midColor, horizonColor, bottomColor;
  if (phase === 'day') {
    topColor = new THREE.Color(0x0c4cb8);
    midColor = new THREE.Color(0x388ef8);
    horizonColor = new THREE.Color(0x9bd2ff);
    bottomColor = new THREE.Color(0x1a4568);
  } else if (phase === 'sunset') {
    topColor = new THREE.Color(0x28073b);
    midColor = new THREE.Color(0x8c2146);
    horizonColor = new THREE.Color(0xff8c38);
    bottomColor = new THREE.Color(0x2d121c);
  } else if (phase === 'storm') {
    topColor = new THREE.Color(0x0b0e14);
    midColor = new THREE.Color(0x19212c);
    horizonColor = new THREE.Color(0x334152);
    bottomColor = new THREE.Color(0x0a0d12);
  } else { // night
    topColor = new THREE.Color(0x02050f);
    midColor = new THREE.Color(0x081329);
    horizonColor = new THREE.Color(0x132742);
    bottomColor = new THREE.Color(0x03060c);
  }

  const uniforms = {
    topColor: { value: topColor },
    midColor: { value: midColor },
    horizonColor: { value: horizonColor },
    bottomColor: { value: bottomColor },
    offset: { value: 15 }, exponent: { value: 0.6 },
  };

  const geo = new THREE.SphereGeometry(1400, 32, 16);
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
        if (h > 0.05) {
          col = mix(horizonColor, midColor, clamp(pow(h, exponent) * 1.5, 0.0, 1.0));
          col = mix(col, topColor, clamp(pow(h, exponent * 2.2), 0.0, 1.0));
        } else {
          col = mix(bottomColor, horizonColor, clamp((h + 0.3) / 0.35, 0.0, 1.0));
        }
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
  g.addColorStop(0, inner);
  g.addColorStop(0.35, outer);
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(c);
}

function buildCelestial(phase = 'day') {
  const g = new THREE.Group();
  if (phase === 'day') {
    const sunDisc = new THREE.Mesh(new THREE.CircleGeometry(42, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    g.add(sunDisc);
    const flare = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialGlowTexture('rgba(255,255,255,1.0)', 'rgba(255,220,130,0.45)'),
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    flare.scale.set(480, 480, 1);
    g.add(flare);
    g.position.set(-180, 320, -750);
  } else if (phase === 'sunset') {
    const sunDisc = new THREE.Mesh(new THREE.CircleGeometry(48, 32), new THREE.MeshBasicMaterial({ color: 0xffe294 }));
    g.add(sunDisc);
    const flare = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialGlowTexture('rgba(255,220,140,1.0)', 'rgba(255,90,40,0.5)'),
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    flare.scale.set(520, 520, 1);
    g.add(flare);
    g.position.set(220, 140, -800);
  } else if (phase === 'storm') {
    // Storm clouds without sun disc
  } else { // night
    const moonDisc = new THREE.Mesh(new THREE.CircleGeometry(32, 40), new THREE.MeshBasicMaterial({ color: 0xf5f8ff }));
    g.add(moonDisc);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialGlowTexture('rgba(230,240,255,0.95)', 'rgba(120,160,255,0.3)'),
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    glow.scale.set(320, 320, 1);
    g.add(glow);
    g.position.set(160, 220, -700);
  }
  return g;
}

// Glistening Turquoise Ocean with animated waves & sun/moon specular sparkles
function buildOcean(phase = 'day') {
  const size = 1200, seg = 100;
  const geo = new THREE.PlaneGeometry(size, size, seg, seg);
  
  let deepCol, shallowCol, lightCol;
  if (phase === 'day') {
    deepCol = new THREE.Color(0x0077b6);
    shallowCol = new THREE.Color(0x00b4d8);
    lightCol = new THREE.Color(0xffffff);
  } else if (phase === 'sunset') {
    deepCol = new THREE.Color(0x381028);
    shallowCol = new THREE.Color(0x993d38);
    lightCol = new THREE.Color(0xffd166);
  } else if (phase === 'storm') {
    deepCol = new THREE.Color(0x0d1b2a);
    shallowCol = new THREE.Color(0x1b263b);
    lightCol = new THREE.Color(0x8fa8c8);
  } else { // night
    deepCol = new THREE.Color(0x030c1e);
    shallowCol = new THREE.Color(0x0a2a46);
    lightCol = new THREE.Color(0xcae0ff);
  }

  const mat = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColorDeep: { value: deepCol },
      uColorShallow: { value: shallowCol },
      uLight: { value: lightCol }
    },
    vertexShader: `
      uniform float uTime;
      varying float vHeight;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 p = position;
        float h = sin(p.x * 0.05 + uTime * 1.2) * 0.7 + sin(p.y * 0.08 - uTime * 0.8) * 0.5 + sin((p.x + p.y) * 0.03 + uTime * 1.5) * 0.6;
        p.z += h;
        vHeight = h;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColorDeep; uniform vec3 uColorShallow; uniform vec3 uLight;
      varying float vHeight; varying vec2 vUv;
      void main() {
        vec3 col = mix(uColorDeep, uColorShallow, smoothstep(-0.8, 1.2, vHeight));
        float sparkle = pow(max(0.0, vHeight + 0.2), 3.5) * 0.75;
        col += uLight * sparkle;
        gl_FragColor = vec4(col, 0.96);
      }
    `,
    transparent: true
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(260, -0.6, -100);
  return mesh;
}

// Palm Tree model with curved brown trunk and lush tropical fronds
function buildPalmTree(height = 9) {
  const g = new THREE.Group();
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6e4a2b, roughness: 0.85, metalness: 0.05 });
  const frondMat = new THREE.MeshStandardMaterial({ color: 0x1f8a3c, roughness: 0.45, metalness: 0.1, side: THREE.DoubleSide });

  // Curved segmented trunk
  const segs = 6;
  let curY = 0, curX = 0;
  const curveAngle = (Math.random() - 0.5) * 0.08;
  for (let s = 0; s < segs; s++) {
    const h = height / segs;
    const rBottom = 0.32 - s * 0.028;
    const rTop = rBottom - 0.025;
    const trunkSeg = new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, h, 7), trunkMat);
    trunkSeg.position.set(curX, curY + h / 2, 0);
    trunkSeg.rotation.z = curveAngle * s;
    trunkSeg.castShadow = true;
    g.add(trunkSeg);
    curY += h;
    curX += Math.sin(curveAngle * s) * h;
  }

  // Coconuts
  const coconutMat = new THREE.MeshStandardMaterial({ color: 0x422813, roughness: 0.9 });
  for (let c = 0; c < 4; c++) {
    const coco = new THREE.Mesh(new THREE.SphereGeometry(0.22, 6, 6), coconutMat);
    coco.position.set(curX + Math.cos(c * 1.5) * 0.3, curY - 0.2, Math.sin(c * 1.5) * 0.3);
    g.add(coco);
  }

  // Fronds / Palm Leaves
  const numFronds = 8;
  for (let f = 0; f < numFronds; f++) {
    const angle = (f / numFronds) * Math.PI * 2;
    const frondShape = new THREE.Shape();
    frondShape.moveTo(0, 0);
    frondShape.quadraticCurveTo(0.6, 0.4, 3.2, 0);
    frondShape.quadraticCurveTo(0.6, -0.4, 0, 0);

    const frondGeo = new THREE.ShapeGeometry(frondShape);
    const frondMesh = new THREE.Mesh(frondGeo, frondMat);
    frondMesh.position.set(curX, curY + 0.1, 0);
    frondMesh.rotation.y = angle;
    frondMesh.rotation.x = 0.45;
    frondMesh.castShadow = true;
    g.add(frondMesh);
  }

  return g;
}

// Modern Miami Skyscraper Towers with glass windows & roof beacons
function buildMiamiBuilding(width = 24, height = 75, depth = 24, color = 0x224466) {
  const g = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.18,
    metalness: 0.82,
    envMapIntensity: 2.2
  });

  const body = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), bodyMat);
  body.position.y = height / 2;
  body.castShadow = true;
  body.receiveShadow = true;
  g.add(body);

  // Horizontal window bands / balconies
  const bandMat = new THREE.MeshBasicMaterial({ color: 0x9be2ff, transparent: true, opacity: 0.65 });
  for (let y = 6; y < height - 6; y += 4.5) {
    const band = new THREE.Mesh(new THREE.BoxGeometry(width + 0.3, 1.4, depth + 0.3), bandMat);
    band.position.y = y;
    g.add(band);
  }

  // Roof crown / spire
  const roof = new THREE.Mesh(new THREE.BoxGeometry(width * 0.7, 4, depth * 0.7), bodyMat);
  roof.position.y = height + 2;
  g.add(roof);

  const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.6, 12, 6), new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9 }));
  spire.position.y = height + 10;
  g.add(spire);

  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.5, 6, 6), new THREE.MeshBasicMaterial({ color: 0xff2244 }));
  beacon.position.y = height + 16;
  g.add(beacon);

  return g;
}

// Overhead Track Gantry Banner: RYDASH — DRIVE. DRIFT. DOMINATE.
function buildTrackGantry(width = 16) {
  const g = new THREE.Group();
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x1e2430, metalness: 0.85, roughness: 0.3 });

  // Pillars
  const p1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 9, 8), metalMat);
  p1.position.set(-width / 2, 4.5, 0);
  g.add(p1);

  const p2 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 9, 8), metalMat);
  p2.position.set(width / 2, 4.5, 0);
  g.add(p2);

  // Cross truss
  const beam = new THREE.Mesh(new THREE.BoxGeometry(width + 1.2, 0.8, 0.8), metalMat);
  beam.position.set(0, 8.6, 0);
  g.add(beam);

  // Banner Canvas Texture
  const c = document.createElement('canvas');
  c.width = 1024; c.height = 180;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#060d1f';
  ctx.fillRect(0, 0, 1024, 180);
  ctx.strokeStyle = '#00e5ff';
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 1016, 172);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 74px Orbitron, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('RYDASH', 512, 60);

  ctx.fillStyle = '#00e5ff';
  ctx.font = 'bold 28px Rajdhani, sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillText('DRIVE. DRIFT. DOMINATE.', 512, 130);

  const bannerTex = new THREE.CanvasTexture(c);
  const banner = new THREE.Mesh(new THREE.PlaneGeometry(width - 1.5, 2.2), new THREE.MeshBasicMaterial({ map: bannerTex }));
  banner.position.set(0, 7.2, 0.1);
  g.add(banner);

  return g;
}

// Glowing Directional Neon Chevron Barrier (>>>)
function buildChevronBarrier(len = 12) {
  const g = new THREE.Group();
  const c = document.createElement('canvas');
  c.width = 512; c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#0b162a';
  ctx.fillRect(0, 0, 512, 128);

  ctx.fillStyle = '#00e5ff';
  for (let x = 40; x < 500; x += 90) {
    ctx.beginPath();
    ctx.moveTo(x, 15);
    ctx.lineTo(x + 45, 64);
    ctx.lineTo(x, 113);
    ctx.lineTo(x + 22, 113);
    ctx.lineTo(x + 67, 64);
    ctx.lineTo(x + 22, 15);
    ctx.closePath();
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.repeat.set(len / 6, 1);

  const barrier = new THREE.Mesh(
    new THREE.BoxGeometry(0.25, 1.2, len),
    new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00b4d8,
      emissiveMap: tex,
      emissiveIntensity: 1.8,
      roughness: 0.3
    })
  );
  barrier.position.y = 0.6;
  g.add(barrier);
  return g;
}

function makeAsphaltTexture() {
  const size = 512;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#22262c';
  ctx.fillRect(0, 0, size, size);

  // Asphalt grain
  for (let i = 0; i < 1500; i++) {
    ctx.fillStyle = `rgba(${40 + Math.random() * 25},${45 + Math.random() * 25},${50 + Math.random() * 25},${Math.random() * 0.5})`;
    ctx.fillRect(Math.random() * size, Math.random() * size, 1.8, 1.8);
  }

  // White lane dashes
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';
  for (let y = 0; y < size; y += 48) {
    ctx.fillRect(size / 2 - 4, y, 8, 26);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 70);
  tex.anisotropy = 8;
  return tex;
}

export function buildTrack() {
  const pts = [
    new THREE.Vector3(0, 0, 0), new THREE.Vector3(70, 0, -50), new THREE.Vector3(110, 0, -160),
    new THREE.Vector3(80, 0, -260), new THREE.Vector3(-20, 0, -300), new THREE.Vector3(-130, 0, -250),
    new THREE.Vector3(-160, 0, -140), new THREE.Vector3(-110, 0, -40), new THREE.Vector3(-50, 0, 50),
    new THREE.Vector3(40, 0, 70),
  ];
  const curve = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.5);
  const trackWidth = 15;
  const segments = 450;
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
    roadUvs.push(0, t * 70, 1, t * 70);
    curbL.push({ pos: left, normal });
    curbR.push({ pos: right, normal });
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

  const road = new THREE.Mesh(
    roadGeo,
    new THREE.MeshStandardMaterial({
      map: makeAsphaltTexture(),
      roughness: 0.32,
      metalness: 0.25,
      envMapIntensity: 1.8
    })
  );
  road.receiveShadow = true;
  roadGroup.add(road);

  // Red & White racing kerbs
  [curbL, curbR].forEach((side, sideIdx) => {
    for (let i = 0; i < side.length - 1; i += 4) {
      const seg = side[i];
      const next = side[Math.min(i + 4, side.length - 1)];
      const len = next.pos.clone().sub(seg.pos).length() || 0.01;
      const outward = seg.normal.clone().multiplyScalar(sideIdx === 0 ? 1 : -1);
      const curb = new THREE.Mesh(
        new THREE.BoxGeometry(1.0, 0.14, len),
        new THREE.MeshStandardMaterial({
          color: (i / 4) % 2 === 0 ? 0xd6142a : 0xf4f6f8,
          roughness: 0.4
        })
      );
      const mid = seg.pos.clone().lerp(next.pos, 0.5).addScaledVector(outward, 0.6);
      curb.position.set(mid.x, 0.07, mid.z);
      curb.lookAt(next.pos.x, 0.07, next.pos.z);
      roadGroup.add(curb);
    }
  });

  // Track Gantry Banner at start line
  const startP = curve.getPointAt(0);
  const startT = curve.getTangentAt(0);
  const startN = new THREE.Vector3(-startT.z, 0, startT.x).normalize();
  const gantry = buildTrackGantry(trackWidth);
  gantry.position.copy(startP);
  gantry.lookAt(startP.clone().add(startT));
  roadGroup.add(gantry);

  // Palm trees along boulevard on ocean side
  for (let i = 10; i < segments; i += 16) {
    const t = i / segments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const palm = buildPalmTree(8 + Math.random() * 4);
    palm.position.copy(point).addScaledVector(normal, trackWidth / 2 + 4.5);
    roadGroup.add(palm);
  }

  // Miami Skyscraper Towers on inland side
  const buildings = [
    { w: 26, h: 90, d: 26, col: 0x1e3a5f },
    { w: 32, h: 115, d: 28, col: 0x142c4a },
    { w: 24, h: 80, d: 24, col: 0x244c7a },
    { w: 30, h: 105, d: 30, col: 0x183454 },
    { w: 28, h: 95, d: 28, col: 0x20446e },
  ];
  let bIdx = 0;
  for (let i = 15; i < segments; i += 28) {
    const t = i / segments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const bDef = buildings[bIdx % buildings.length];
    const bldg = buildMiamiBuilding(bDef.w, bDef.h, bDef.d, bDef.col);
    bldg.position.copy(point).addScaledVector(normal, -(trackWidth / 2 + 28 + Math.random() * 10));
    roadGroup.add(bldg);
    bIdx++;
  }

  // Neon Chevron Barriers on tight curves
  [curbL, curbR].forEach((side, sIdx) => {
    for (let i = 60; i < side.length - 60; i += 60) {
      const seg = side[i];
      const next = side[Math.min(i + 12, side.length - 1)];
      const outward = seg.normal.clone().multiplyScalar(sIdx === 0 ? 1 : -1);
      const chev = buildChevronBarrier(14);
      chev.position.copy(seg.pos).addScaledVector(outward, 2.2);
      chev.lookAt(next.pos.x, 0.6, next.pos.z);
      roadGroup.add(chev);
    }
  });

  return { curve, roadGroup, trackWidth };
}

function buildGround(phase = 'day') {
  const g = new THREE.Group();
  
  // Sandy Beach edge along coast
  const sandMat = new THREE.MeshStandardMaterial({
    color: phase === 'sunset' ? 0xd4a373 : 0xf4e2bb,
    roughness: 0.95
  });
  const sand = new THREE.Mesh(new THREE.PlaneGeometry(600, 1600), sandMat);
  sand.rotation.x = -Math.PI / 2;
  sand.position.set(120, -0.3, -100);
  sand.receiveShadow = true;
  g.add(sand);

  // Inland City Ground
  const cityGroundMat = new THREE.MeshStandardMaterial({
    color: phase === 'sunset' ? 0x221820 : 0x2a323c,
    roughness: 0.9
  });
  const cityGround = new THREE.Mesh(new THREE.PlaneGeometry(1600, 2000), cityGroundMat);
  cityGround.rotation.x = -Math.PI / 2;
  cityGround.position.set(-300, -0.4, -100);
  cityGround.receiveShadow = true;
  g.add(cityGround);

  return g;
}

export function buildWorld(scene, options = {}) {
  const phase = options.phase || 'day';

  // Environment Reflection Map for shiny metallic cars & buildings
  scene.environment = makeNeonEnvTexture(
    phase === 'day'
      ? ['#ffffff', '#62b6ff', '#00b4d8', '#fffaed', '#8bc3eb']
      : phase === 'sunset'
      ? ['#ffd166', '#ff8c38', '#9c2742', '#ff5a28', '#28073b']
      : ['#cfe0ff', '#00e5ff', '#39ff9d', '#0e3a56', '#ffd9a0']
  );

  scene.add(buildSky(phase));
  scene.add(buildCelestial(phase));
  scene.add(buildGround(phase));

  const ocean = buildOcean(phase);
  scene.add(ocean);

  const { curve, roadGroup, trackWidth } = buildTrack();
  scene.add(roadGroup);

  // ☀️ BRIGHTER ENVIRONMENT LIGHTING
  let sunLight, ambientLight, hemiLight;

  if (phase === 'day') {
    sunLight = new THREE.DirectionalLight(0xfffaed, 3.2);
    sunLight.position.set(-180, 260, -220);
    ambientLight = new THREE.AmbientLight(0x9bd2ff, 1.4);
    hemiLight = new THREE.HemisphereLight(0x62b6ff, 0x224455, 1.2);
    // 🌫️ REDUCED FOG (Crisp visual distance, not washed out)
    scene.fog = new THREE.Fog(0x8bc3eb, 280, 2200);
  } else if (phase === 'sunset') {
    sunLight = new THREE.DirectionalLight(0xffaa44, 2.8);
    sunLight.position.set(220, 140, -300);
    ambientLight = new THREE.AmbientLight(0xff8855, 1.2);
    hemiLight = new THREE.HemisphereLight(0xff6644, 0x280820, 1.0);
    scene.fog = new THREE.Fog(0xd46830, 220, 1900);
  } else if (phase === 'storm') {
    sunLight = new THREE.DirectionalLight(0xa0c0e0, 1.6);
    sunLight.position.set(100, 200, -150);
    ambientLight = new THREE.AmbientLight(0x334455, 0.9);
    hemiLight = new THREE.HemisphereLight(0x445566, 0x111520, 0.8);
    scene.fog = new THREE.Fog(0x1a2430, 180, 1600);
  } else { // night
    sunLight = new THREE.DirectionalLight(0xcae0ff, 1.8);
    sunLight.position.set(160, 200, -180);
    ambientLight = new THREE.AmbientLight(0x1a2e48, 1.1);
    hemiLight = new THREE.HemisphereLight(0x284a70, 0x081220, 0.9);
    scene.fog = new THREE.Fog(0x0e1c2e, 220, 1700);
  }

  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.left = -200;
  sunLight.shadow.camera.right = 200;
  sunLight.shadow.camera.top = 200;
  sunLight.shadow.camera.bottom = -200;
  sunLight.shadow.camera.far = 700;
  sunLight.shadow.bias = -0.001;

  scene.add(sunLight);
  scene.add(ambientLight);
  scene.add(hemiLight);

  function update(dt) {
    if (ocean && ocean.material.uniforms) {
      ocean.material.uniforms.uTime.value += dt;
    }
  }

  return { curve, trackWidth, update };
}
