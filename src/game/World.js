import * as THREE from 'three';

/* =========================================================================
   RYDASH — "Neon District" world: a wet, neon-lit night city.
   Rain, flickering signage, glossy reflective streets, passing background
   traffic light-streaks, and occasional lightning — all procedural,
   no external art assets. Call World.update(dt) every frame from the
   render loop to animate rain / flicker / traffic / lightning.
   ========================================================================= */

function makeNeonEnvTexture() {
  // Cheap equirectangular "reflection" texture: dark city + colorful neon blobs,
  // used as scene.environment so glossy car paint & wet road pick up neon color
  // without a real-time reflection camera (keeps perf high).
  const w = 512, h = 256;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const grd = ctx.createLinearGradient(0, 0, 0, h);
  grd.addColorStop(0, '#05030c');
  grd.addColorStop(0.55, '#0a0620');
  grd.addColorStop(1, '#160a1a');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);
  const colors = ['#00e5ff', '#ff2e88', '#9b30ff', '#ffb347', '#39ff9d'];
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * w, y = h * 0.35 + Math.random() * h * 0.6;
    const r = 6 + Math.random() * 26;
    const col = colors[Math.floor(Math.random() * colors.length)];
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, col);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildSky() {
  const uniforms = {
    topColor: { value: new THREE.Color(0x050414) },
    midColor: { value: new THREE.Color(0x160a2e) },
    horizonColor: { value: new THREE.Color(0x2a0e3a) },
    bottomColor: { value: new THREE.Color(0x030208) },
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
  const sky = new THREE.Mesh(geo, mat);
  sky.userData.isSky = true;
  return sky;
}

function billboardTexture(seedColor) {
  const w = 128, h = 192;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#050608';
  ctx.fillRect(0, 0, w, h);
  const rows = 6 + Math.floor(Math.random() * 6);
  const cols = 3 + Math.floor(Math.random() * 3);
  const cw = w / cols, ch = h / rows;
  for (let r = 0; r < rows; r++) {
    for (let cI = 0; cI < cols; cI++) {
      if (Math.random() > 0.4) {
        ctx.fillStyle = Math.random() > 0.5 ? seedColor : 'rgba(255,255,255,0.75)';
        ctx.globalAlpha = 0.35 + Math.random() * 0.5;
        ctx.fillRect(cI * cw + 1, r * ch + 1, cw - 2, ch - 2);
      }
    }
  }
  ctx.globalAlpha = 1;
  return new THREE.CanvasTexture(c);
}

const NEON_COLORS = ['#00e5ff', '#ff2e88', '#9b30ff', '#ffb347', '#39ff9d'];

function buildCitySkyline(flickerList) {
  const group = new THREE.Group();
  for (let i = 0; i < 55; i++) {
    const w = 8 + Math.random() * 16;
    const h = 40 + Math.random() * 190;
    const d = 8 + Math.random() * 16;
    const x = (Math.random() - 0.5) * 1500;
    const z = -380 - Math.random() * 260;
    const bld = new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      new THREE.MeshStandardMaterial({ color: 0x07080f, roughness: 0.5, metalness: 0.5, emissive: 0x030309, emissiveIntensity: 0.3 })
    );
    bld.position.set(x, h / 2, z);
    group.add(bld);

    const neonColorHex = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
    const windowTex = billboardTexture(neonColorHex);
    const windows = new THREE.Mesh(
      new THREE.PlaneGeometry(w * 0.92, h * 0.92),
      new THREE.MeshBasicMaterial({ map: windowTex, transparent: true, opacity: 0.9 })
    );
    windows.position.set(x, h / 2, z + d / 2 + 0.05);
    group.add(windows);

    // Occasional big neon sign billboard (flickers)
    if (Math.random() > 0.65) {
      const signColor = new THREE.Color(neonColorHex);
      const signMat = new THREE.MeshBasicMaterial({ color: signColor, transparent: true, opacity: 0.95 });
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.7, h * 0.14), signMat);
      sign.position.set(x, h * 0.75, z + d / 2 + 0.3);
      group.add(sign);
      flickerList.push({ mesh: sign, mat: signMat, baseOpacity: 0.95, phase: Math.random() * 10 });
    }
  }
  return group;
}

function buildGround() {
  const geo = new THREE.PlaneGeometry(3000, 3000, 1, 1);
  const mat = new THREE.MeshStandardMaterial({ color: 0x03040a, roughness: 0.9, metalness: 0.1 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.03;
  mesh.receiveShadow = true;
  return mesh;
}

function buildStreetlight(color) {
  const g = new THREE.Group();
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x14161c, metalness: 0.8, roughness: 0.3 });
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

/** Builds a flowing racing circuit path and its wet, reflective road mesh. */
export function buildTrack() {
  const pts = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(60, 0, -40),
    new THREE.Vector3(90, 0, -140),
    new THREE.Vector3(60, 0, -230),
    new THREE.Vector3(-20, 0, -260),
    new THREE.Vector3(-110, 0, -220),
    new THREE.Vector3(-140, 0, -120),
    new THREE.Vector3(-100, 0, -30),
    new THREE.Vector3(-40, 0, 40),
    new THREE.Vector3(30, 0, 60),
  ];
  const curve = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.5);
  const trackWidth = 14;
  const segments = 400;
  const roadGroup = new THREE.Group();

  const roadPositions = [];
  const roadUvs = [];
  const roadIndices = [];
  const curbPositionsL = [];
  const curbPositionsR = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const left = point.clone().addScaledVector(normal, trackWidth / 2);
    const right = point.clone().addScaledVector(normal, -trackWidth / 2);
    roadPositions.push(left.x, 0.01, left.z, right.x, 0.01, right.z);
    roadUvs.push(0, t * 60, 1, t * 60);
    curbPositionsL.push({ pos: left, normal });
    curbPositionsR.push({ pos: right, normal });
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

  const asphaltTex = makeAsphaltTexture();
  // Wet asphalt: dark, low roughness so it catches neon-colored specular highlights
  // and the environment reflection texture — reads as rain-slicked street.
  const roadMat = new THREE.MeshStandardMaterial({
    map: asphaltTex,
    roughness: 0.22,
    metalness: 0.35,
    envMapIntensity: 1.6,
  });
  const road = new THREE.Mesh(roadGeo, roadMat);
  road.receiveShadow = true;
  roadGroup.add(road);

  [curbPositionsL, curbPositionsR].forEach((side, sideIdx) => {
    for (let i = 0; i < side.length - 1; i += 4) {
      const seg = side[i];
      const next = side[Math.min(i + 4, side.length - 1)];
      const dir = next.pos.clone().sub(seg.pos);
      const len = dir.length() || 0.01;
      const outward = seg.normal.clone().multiplyScalar(sideIdx === 0 ? 1 : -1);
      const curb = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.12, len),
        new THREE.MeshStandardMaterial({ color: (i / 4) % 2 === 0 ? 0xd6142a : 0xf2f2f2, roughness: 0.5, metalness: 0.1 })
      );
      const mid = seg.pos.clone().lerp(next.pos, 0.5).addScaledVector(outward, 0.55);
      curb.position.set(mid.x, 0.06, mid.z);
      curb.lookAt(next.pos.x, 0.06, next.pos.z);
      roadGroup.add(curb);

      if ((i / 4) % 3 === 0) {
        const rail = new THREE.Mesh(
          new THREE.BoxGeometry(0.12, 0.7, len * 1.05),
          new THREE.MeshStandardMaterial({ color: 0x9aa4b0, metalness: 0.9, roughness: 0.25 })
        );
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
    const light = buildStreetlight(side > 0 ? 0x00e5ff : 0xff2e88);
    light.position.copy(pos);
    light.lookAt(point.x, 0, point.z);
    roadGroup.add(light);
  }

  return { curve, roadGroup, trackWidth };
}

function makeAsphaltTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#191a20';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 700; i++) {
    ctx.fillStyle = `rgba(${30 + Math.random() * 25},${30 + Math.random() * 25},${36 + Math.random() * 25},${Math.random() * 0.4})`;
    ctx.fillRect(Math.random() * size, Math.random() * size, 1.6, 1.6);
  }
  ctx.fillStyle = 'rgba(255,255,255,0.85)';
  for (let y = 0; y < size; y += 32) {
    ctx.fillRect(size / 2 - 3, y, 6, 16);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 60);
  tex.anisotropy = 4;
  return tex;
}

/* ---------------------------- Rain ---------------------------- */
function buildRain(count = 2200) {
  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);
  const spread = 220;
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = Math.random() * 80;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    speeds[i] = 55 + Math.random() * 35;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: 0xaad4ff,
    size: 0.22,
    transparent: true,
    opacity: 0.55,
    depthWrite: false,
  });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  return { points, positions, speeds, spread, count };
}

/* ---------------------- Background traffic streaks ---------------------- */
function buildTrafficStreaks(count = 14) {
  const group = new THREE.Group();
  const streaks = [];
  for (let i = 0; i < count; i++) {
    const isRed = Math.random() > 0.5;
    const mat = new THREE.MeshBasicMaterial({ color: isRed ? 0xff2233 : 0xbfe9ff, transparent: true, opacity: 0.9 });
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 3.2), mat);
    const lane = (Math.random() - 0.5) * 220;
    const speed = 40 + Math.random() * 50;
    mesh.position.set(lane, 0.4 + Math.random() * 1.2, -300 + Math.random() * 600);
    group.add(mesh);
    streaks.push({ mesh, speed: isRed ? -speed : speed, laneX: lane });
  }
  return { group, streaks };
}

export function buildWorld(scene) {
  const flickerList = [];
  const envTex = makeNeonEnvTexture();
  scene.environment = envTex;

  scene.add(buildSky());
  scene.add(buildCitySkyline(flickerList));
  scene.add(buildGround());

  const { curve, roadGroup, trackWidth } = buildTrack();
  roadGroup.children[0].material.envMap = envTex;
  scene.add(roadGroup);

  const rain = buildRain();
  scene.add(rain.points);

  const { group: trafficGroup, streaks } = buildTrafficStreaks();
  scene.add(trafficGroup);

  // Lighting: cool blue moon key light + magenta/cyan neon fill, low ambient (moody night)
  const moon = new THREE.DirectionalLight(0x7fb8ff, 0.55);
  moon.position.set(-100, 160, -160);
  moon.castShadow = true;
  moon.shadow.mapSize.set(2048, 2048);
  moon.shadow.camera.left = -160;
  moon.shadow.camera.right = 160;
  moon.shadow.camera.top = 160;
  moon.shadow.camera.bottom = -160;
  moon.shadow.camera.far = 600;
  moon.shadow.bias = -0.0015;
  scene.add(moon);

  const fillCyan = new THREE.HemisphereLight(0x00e5ff, 0x0a0616, 0.55);
  scene.add(fillCyan);
  const ambient = new THREE.AmbientLight(0x1a1030, 0.55);
  scene.add(ambient);

  scene.fog = new THREE.FogExp2(0x0a0618, 0.0022);

  // Occasional lightning flash
  let lightningTimer = 4 + Math.random() * 6;
  const lightningLight = new THREE.PointLight(0xdfe8ff, 0, 500, 1.5);
  lightningLight.position.set(0, 200, -150);
  scene.add(lightningLight);

  function update(dt) {
    // Rain fall
    const pos = rain.points.geometry.attributes.position.array;
    for (let i = 0; i < rain.count; i++) {
      pos[i * 3 + 1] -= rain.speeds[i] * dt;
      if (pos[i * 3 + 1] < 0) pos[i * 3 + 1] = 60 + Math.random() * 20;
    }
    rain.points.geometry.attributes.position.needsUpdate = true;

    // Neon sign flicker
    const t = performance.now() * 0.001;
    flickerList.forEach((f) => {
      const flick = 0.75 + 0.25 * Math.sin(t * 6 + f.phase) * (Math.random() > 0.02 ? 1 : 0.2);
      f.mat.opacity = f.baseOpacity * flick;
    });

    // Background traffic loop
    streaks.forEach((s) => {
      s.mesh.position.z += s.speed * dt;
      if (s.mesh.position.z > 320) s.mesh.position.z = -320;
      if (s.mesh.position.z < -320) s.mesh.position.z = 320;
    });

    // Lightning
    lightningTimer -= dt;
    if (lightningTimer <= 0) {
      lightningLight.intensity = 6 + Math.random() * 4;
      lightningTimer = 5 + Math.random() * 9;
      setTimeout(() => { lightningLight.intensity = 0; }, 90);
    }
  }

  return { curve, trackWidth, update };
}
