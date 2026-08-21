import * as THREE from 'three';
import { makeNeonEnvTexture } from './EnvMap.js';

/* =========================================================================
   RYDASH — "Skyline" world: rooftop racing across a dense futuristic city.
   The circuit sits atop connected rooftops — tall towers crowd in close on
   both sides, holographic billboards glow, and the city floor glimmers far
   below through the gaps. (Track stays on one continuous rooftop-height
   plane — see the honest scope note in README for why true ramps/jumps
   between separate rooftop heights aren't included.)
   ========================================================================= */

function buildSky() {
  const uniforms = {
    topColor: { value: new THREE.Color(0x02040f) },
    midColor: { value: new THREE.Color(0x120a2e) },
    horizonColor: { value: new THREE.Color(0x2a1050) },
    bottomColor: { value: new THREE.Color(0x01020a) },
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
      if (Math.random() > 0.35) {
        ctx.fillStyle = Math.random() > 0.5 ? seedColor : 'rgba(255,255,255,0.75)';
        ctx.globalAlpha = 0.4 + Math.random() * 0.5;
        ctx.fillRect(cI * cw + 1, r * ch + 1, cw - 2, ch - 2);
      }
    }
  }
  ctx.globalAlpha = 1;
  return new THREE.CanvasTexture(c);
}

const NEON_COLORS = ['#00e5ff', '#ff2e88', '#9b30ff', '#ffb347', '#39ff9d'];

function buildTowers() {
  const group = new THREE.Group();
  // Towers rise from FAR below the rooftop plane (y=0 here represents roof height) so the
  // city floor reads as distant/below, and crowd close on both sides of the track.
  for (let i = 0; i < 70; i++) {
    const w = 10 + Math.random() * 20, d = 10 + Math.random() * 20;
    const h = 60 + Math.random() * 260; // extends up above roof level too
    const x = (Math.random() - 0.5) * 900;
    const z = (Math.random() - 0.5) * 900;
    // skip a corridor around the track origin so towers don't overlap the road itself;
    // World.buildTrack keeps the loop within roughly [-160,160] on x/z — push towers outward
    const distFromCenter = Math.hypot(x, z);
    if (distFromCenter < 45) continue;
    const bld = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color: 0x28304c, roughness: 0.5, metalness: 0.4, emissive: 0x141c30, emissiveIntensity: 0.55 }));
    bld.position.set(x, h / 2 - 90, z); // base sits well below roof plane, top pokes above
    group.add(bld);
    const glowColor = NEON_COLORS[Math.floor(Math.random() * NEON_COLORS.length)];
    const windowTex = billboardTexture(glowColor);
    [0, Math.PI / 2, Math.PI, -Math.PI / 2].forEach((rot) => {
      if (Math.random() > 0.5) return;
      const face = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.9, h * 0.94), new THREE.MeshBasicMaterial({ map: windowTex, transparent: true, opacity: 0.85 }));
      face.position.set(0, 0, Math.max(w, d) / 2 + 0.05);
      face.rotation.y = rot;
      const holder = new THREE.Group();
      holder.add(face);
      holder.position.copy(bld.position);
      group.add(holder);
    });
    if (Math.random() > 0.7) {
      const signColor = new THREE.Color(glowColor);
      const sign = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.8, h * 0.1), new THREE.MeshBasicMaterial({ color: signColor, transparent: true, opacity: 0.95 }));
      sign.position.set(x, h * 0.4 - 90, z + d / 2 + 0.3);
      group.add(sign);
    }
  }
  return group;
}

function buildHelipadMarkers() {
  // Faint glowing ring markers scattered off to the sides, reading as distant helipads.
  const group = new THREE.Group();
  for (let i = 0; i < 10; i++) {
    const ring = new THREE.Mesh(new THREE.RingGeometry(3, 3.6, 24), new THREE.MeshBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.set((Math.random() - 0.5) * 500, -2 + Math.random() * 4, (Math.random() - 0.5) * 500);
    group.add(ring);
  }
  return group;
}

function buildGround() {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.MeshStandardMaterial({ color: 0x1e2438, roughness: 0.6, metalness: 0.35 }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.02;
  mesh.receiveShadow = true;
  return mesh;
}

function makeAsphaltTexture() {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#26272e';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 800; i++) {
    ctx.fillStyle = `rgba(${25 + Math.random() * 25},${25 + Math.random() * 25},${30 + Math.random() * 28},${Math.random() * 0.5})`;
    ctx.fillRect(Math.random() * size, Math.random() * size, 1.6, 1.6);
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

// A launch ramp — a wedge rising from track height, angled to send the car airborne when it
// crosses the top at speed. Built from a triangular extrusion so it reads as a real ramp surface.
function buildRamp(width) {
  const shape = new THREE.Shape();
  const len = 7, height = 2.6;
  shape.moveTo(-len / 2, 0);
  shape.lineTo(len / 2, height);
  shape.lineTo(len / 2, 0);
  shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, { depth: width, bevelEnabled: false });
  geo.rotateY(Math.PI / 2);
  geo.translate(-width / 2, 0, 0);
  const mat = new THREE.MeshStandardMaterial({ color: 0x2a2d36, metalness: 0.6, roughness: 0.4, emissive: 0xff7a1a, emissiveIntensity: 0.25 });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  // warning stripes at the base
  const stripes = new THREE.Mesh(new THREE.PlaneGeometry(width * 0.9, 0.6), new THREE.MeshBasicMaterial({ color: 0xff7a1a }));
  stripes.rotation.x = -Math.PI / 2;
  stripes.position.set(0, 0.02, -len / 2 + 0.3);
  mesh.add(stripes);
  return mesh;
}

function buildStreetlight(color) {
  const g = new THREE.Group();
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x1a1c22, metalness: 0.7, roughness: 0.4 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 5, 8), poleMat);
  pole.position.y = 2.5;
  g.add(pole);
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 3.2 }));
  lamp.position.set(0, 5, 0);
  g.add(lamp);
  const pl = new THREE.PointLight(color, 1.6, 14, 2);
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
  const road = new THREE.Mesh(roadGeo, new THREE.MeshStandardMaterial({ map: makeAsphaltTexture(), roughness: 0.5, metalness: 0.25, envMapIntensity: 1.3 }));
  road.receiveShadow = true;
  roadGroup.add(road);

  // Roof-edge guardrails (taller/more solid — this is the edge of a building, a fall matters)
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
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.1, len * 1.05), new THREE.MeshStandardMaterial({ color: 0x2a2d36, metalness: 0.7, roughness: 0.35, emissive: 0x00e5ff, emissiveIntensity: 0.15 }));
      const railMid = seg.pos.clone().lerp(next.pos, 0.5).addScaledVector(outward, 1.4);
      rail.position.set(railMid.x, 0.7, railMid.z);
      rail.lookAt(next.pos.x, 0.7, next.pos.z);
      roadGroup.add(rail);
    }
  });

  for (let i = 0; i < segments; i += 16) {
    const t = i / segments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const side = i % 32 === 0 ? 1 : -1;
    const pos = point.clone().addScaledVector(normal, side * (trackWidth / 2 + 3));
    const light = buildStreetlight(side > 0 ? 0x00e5ff : 0xff2e88);
    light.position.copy(pos);
    roadGroup.add(light);
  }

  // Launch ramps at two points along the loop — placed on straighter sections so
  // hitting them at speed feels intentional rather than accidental.
  const ramps = [];
  [0.22, 0.62].forEach((t) => {
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const heading = Math.atan2(tangent.x, tangent.z);
    const ramp = buildRamp(trackWidth * 0.8);
    ramp.position.set(point.x, 0, point.z);
    ramp.rotation.y = heading;
    roadGroup.add(ramp);
    ramps.push({
      position: new THREE.Vector3(point.x, 0, point.z),
      radius: 4,
      minSpeed: 14, // world units/s — must be going reasonably fast to launch
      launchVy: 17,
      forwardBoost: 4,
    });
  });

  return { curve, roadGroup, trackWidth, ramps };
}

export function buildWorld(scene) {
  scene.environment = makeNeonEnvTexture(['#00e5ff', '#ff2e88', '#9b30ff', '#ffb347']);
  scene.add(buildSky());
  scene.add(buildTowers());
  scene.add(buildHelipadMarkers());
  scene.add(buildGround());

  const { curve, roadGroup, trackWidth, ramps } = buildTrack();
  scene.add(roadGroup);

  const key = new THREE.DirectionalLight(0x9fbfff, 0.9);
  key.position.set(-100, 140, -160);
  key.castShadow = true;
  key.shadow.mapSize.set(2048, 2048);
  key.shadow.camera.left = -160; key.shadow.camera.right = 160;
  key.shadow.camera.top = 160; key.shadow.camera.bottom = -160;
  key.shadow.camera.far = 600; key.shadow.bias = -0.0015;
  scene.add(key);

  scene.add(new THREE.HemisphereLight(0x40eaff, 0x1a1630, 0.85));
  scene.add(new THREE.AmbientLight(0x4c5e7d, 1.0));
  scene.fog = new THREE.FogExp2(0x152038, 0.0009);

  function update() {
    // static scene — towers/skyline are fixed; kept for API parity with the other worlds.
  }

  return { curve, trackWidth, update, ramps };
}
