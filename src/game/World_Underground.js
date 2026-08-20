import * as THREE from 'three';

/* =========================================================================
   RYDASH — "Deep Run" world: abandoned metro tunnels / underground highway.
   Concrete girders, neon strip lighting along the tunnel walls, sparks,
   a distant train light sweeping past on a parallel track.
   ========================================================================= */

function makeAsphaltTexture() {
  const size = 256;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#1c1d22';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 800; i++) {
    ctx.fillStyle = `rgba(${15 + Math.random() * 20},${15 + Math.random() * 20},${20 + Math.random() * 22},${Math.random() * 0.5})`;
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

function buildGround() {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.MeshStandardMaterial({ color: 0x08090c, roughness: 0.95 }));
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.02;
  mesh.receiveShadow = true;
  return mesh;
}

function buildCeiling() {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(3000, 3000), new THREE.MeshStandardMaterial({ color: 0x0a0b10, roughness: 1, side: THREE.DoubleSide }));
  mesh.rotation.x = Math.PI / 2;
  mesh.position.y = 42;
  return mesh;
}

function buildGirder(color) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x1a1c22, metalness: 0.6, roughness: 0.5 });
  const beam = new THREE.Mesh(new THREE.BoxGeometry(0.5, 40, 0.5), mat);
  beam.position.y = 20;
  g.add(beam);
  const crossbeam = new THREE.Mesh(new THREE.BoxGeometry(24, 0.4, 0.4), mat);
  crossbeam.position.y = 38;
  g.add(crossbeam);
  // neon strip running down the girder
  const strip = new THREE.Mesh(new THREE.BoxGeometry(0.08, 38, 0.08), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 3 }));
  strip.position.set(0.3, 20, 0);
  g.add(strip);
  const pl = new THREE.PointLight(color, 1.2, 16, 2);
  pl.position.set(0.3, 20, 0);
  g.add(pl);
  return g;
}

function buildTrainLight() {
  const g = new THREE.Group();
  const disc = new THREE.Mesh(new THREE.CircleGeometry(1.2, 16), new THREE.MeshBasicMaterial({ color: 0xfff4c9 }));
  g.add(disc);
  const glow = new THREE.PointLight(0xfff4c9, 4, 40, 2);
  g.add(glow);
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
  const road = new THREE.Mesh(roadGeo, new THREE.MeshStandardMaterial({ map: makeAsphaltTexture(), roughness: 0.4, metalness: 0.3, envMapIntensity: 1.2 }));
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
    }
  });

  // Girders + neon strips lining both sides of the tunnel, alternating cyan/magenta
  for (let i = 0; i < segments; i += 14) {
    const t = i / segments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const side = i % 28 === 0 ? 1 : -1;
    const pos = point.clone().addScaledVector(normal, side * (trackWidth / 2 + 3));
    const girder = buildGirder(side > 0 ? 0x00e5ff : 0xff2e88);
    girder.position.copy(pos);
    roadGroup.add(girder);
  }

  return { curve, roadGroup, trackWidth };
}

export function buildWorld(scene) {
  scene.background = new THREE.Color(0x030304);
  scene.add(buildGround());
  scene.add(buildCeiling());

  const { curve, roadGroup, trackWidth } = buildTrack();
  scene.add(roadGroup);

  const headlampFill = new THREE.HemisphereLight(0x2a3a55, 0x0a0a0d, 0.5);
  scene.add(headlampFill);
  scene.add(new THREE.AmbientLight(0x151622, 0.6));
  scene.fog = new THREE.FogExp2(0x040406, 0.006);

  // A distant train light that sweeps past on a parallel "track" every so often
  const train = buildTrainLight();
  scene.add(train);
  let trainT = -0.4;
  let trainActive = false;
  let trainCooldown = 3 + Math.random() * 5;

  function update(dt) {
    if (!trainActive) {
      trainCooldown -= dt;
      if (trainCooldown <= 0) { trainActive = true; trainT = -0.15; }
      train.visible = false;
    } else {
      train.visible = true;
      trainT += dt * 0.35;
      const p = curve.getPointAt(((trainT % 1) + 1) % 1);
      const tangent = curve.getTangentAt(((trainT % 1) + 1) % 1).normalize();
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
      const pos = p.clone().addScaledVector(normal, trackWidth / 2 + 8);
      train.position.set(pos.x, 3, pos.z);
      if (trainT > 0.5) { trainActive = false; trainCooldown = 6 + Math.random() * 8; }
    }
  }

  return { curve, trackWidth, update };
}
