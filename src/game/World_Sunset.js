import * as THREE from 'three';
import { makeNeonEnvTexture } from './EnvMap.js';

/* =========================================================================
   RYDASH — "Alpine Peaks" & "Sunline Highway" World
   ☀️ Brighter world/environment lighting
   🏔️ Towering mountain ridges, pine trees & scenic pass
   🚘 High contrast metallic car separation
   ✨ Real-time environmental reflections
   🌫️ Reduced fog for crystal-clear long distance visibility
   ========================================================================= */

function buildSky(phase = 'sunset') {
  let topColor, midColor, horizonColor, bottomColor;
  if (phase === 'day') {
    topColor = new THREE.Color(0x1055c4);
    midColor = new THREE.Color(0x4299ff);
    horizonColor = new THREE.Color(0xa8dbff);
    bottomColor = new THREE.Color(0x284a32);
  } else if (phase === 'storm') {
    topColor = new THREE.Color(0x0e131b);
    midColor = new THREE.Color(0x1c2432);
    horizonColor = new THREE.Color(0x3d4b5e);
    bottomColor = new THREE.Color(0x0d1218);
  } else if (phase === 'night') {
    topColor = new THREE.Color(0x030612);
    midColor = new THREE.Color(0x091630);
    horizonColor = new THREE.Color(0x1a3356);
    bottomColor = new THREE.Color(0x040810);
  } else { // sunset
    topColor = new THREE.Color(0x250b46);
    midColor = new THREE.Color(0xff4a6e);
    horizonColor = new THREE.Color(0xffaa40);
    bottomColor = new THREE.Color(0x1a0f24);
  }

  const uniforms = {
    topColor: { value: topColor },
    midColor: { value: midColor },
    horizonColor: { value: horizonColor },
    bottomColor: { value: bottomColor },
    offset: { value: 18 }, exponent: { value: 0.65 },
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
        if (h > 0.08) {
          col = mix(horizonColor, midColor, clamp(pow(h, exponent) * 1.5, 0.0, 1.0));
          col = mix(col, topColor, clamp(pow(h, exponent * 2.0), 0.0, 1.0));
        } else {
          col = mix(bottomColor, horizonColor, clamp((h + 0.3) / 0.4, 0.0, 1.0));
        }
        gl_FragColor = vec4(col, 1.0);
      }`,
  });
  return new THREE.Mesh(geo, mat);
}

function radialGlowTexture(inner, outer) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const grd = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grd.addColorStop(0, inner);
  grd.addColorStop(0.35, outer);
  grd.addColorStop(1, 'rgba(255,100,100,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function buildSun(phase = 'sunset') {
  const g = new THREE.Group();
  if (phase === 'day') {
    const disc = new THREE.Mesh(new THREE.CircleGeometry(44, 32), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    g.add(disc);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialGlowTexture('rgba(255,255,255,1.0)', 'rgba(255,230,150,0.45)'),
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    glow.scale.set(480, 480, 1);
    g.add(glow);
    g.position.set(-160, 300, -750);
  } else if (phase === 'sunset') {
    const disc = new THREE.Mesh(new THREE.CircleGeometry(52, 48), new THREE.MeshBasicMaterial({ color: 0xfff0c4 }));
    g.add(disc);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialGlowTexture('rgba(255,230,170,0.95)', 'rgba(255,120,60,0.45)'),
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    glow.scale.set(540, 540, 1);
    g.add(glow);
    g.position.set(180, 160, -780);
    g.userData.glow = glow;
  } else if (phase === 'night') {
    const disc = new THREE.Mesh(new THREE.CircleGeometry(36, 40), new THREE.MeshBasicMaterial({ color: 0xf5f8ff }));
    g.add(disc);
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialGlowTexture('rgba(230,240,255,0.9)', 'rgba(120,170,255,0.3)'),
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    glow.scale.set(340, 340, 1);
    g.add(glow);
    g.position.set(140, 240, -700);
  }
  return g;
}

// Alpine Mountain Ridges with sharp granite peaks
function buildMountains(phase = 'sunset') {
  const group = new THREE.Group();
  let peakCol1, peakCol2, peakCol3;
  if (phase === 'day') {
    peakCol1 = 0x2d4838; peakCol2 = 0x3d5c48; peakCol3 = 0x4f7058;
  } else if (phase === 'sunset') {
    peakCol1 = 0x3d1b38; peakCol2 = 0x582442; peakCol3 = 0x7a364e;
  } else {
    peakCol1 = 0x0c1422; peakCol2 = 0x142034; peakCol3 = 0x1a2b44;
  }

  const layers = [
    { z: -720, h: 220, color: peakCol1 },
    { z: -600, h: 160, color: peakCol2 },
    { z: -480, h: 110, color: peakCol3 }
  ];

  layers.forEach((layer) => {
    const shape = new THREE.Shape();
    const width = 2200;
    shape.moveTo(-width / 2, -10);
    let x = -width / 2;
    while (x <= width / 2) {
      shape.lineTo(x, layer.h * 0.35 + Math.random() * layer.h);
      x += width / 18;
    }
    shape.lineTo(width / 2, -10);
    shape.closePath();

    const geo = new THREE.ExtrudeGeometry(shape, { depth: 50, bevelEnabled: false });
    const mat = new THREE.MeshStandardMaterial({
      color: layer.color,
      roughness: 0.9,
      metalness: 0.1,
      emissive: layer.color,
      emissiveIntensity: phase === 'sunset' ? 0.25 : 0.1
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, 0, layer.z);
    group.add(mesh);
  });
  return group;
}

// Pine Tree model for Alpine pass
function buildPineTree(height = 7) {
  const g = new THREE.Group();
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2e1b, roughness: 0.9 });
  const pineMat = new THREE.MeshStandardMaterial({ color: 0x1c4a2a, roughness: 0.6, metalness: 0.1 });

  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.28, height * 0.35, 6), trunkMat);
  trunk.position.y = (height * 0.35) / 2;
  trunk.castShadow = true;
  g.add(trunk);

  // 3 stacked pine cones
  for (let c = 0; c < 3; c++) {
    const rBottom = (height * 0.38) * (1 - c * 0.22);
    const coneH = height * 0.42;
    const cone = new THREE.Mesh(new THREE.ConeGeometry(rBottom, coneH, 7), pineMat);
    cone.position.y = (height * 0.25) + c * (height * 0.24);
    cone.castShadow = true;
    g.add(cone);
  }
  return g;
}

function makeAsphaltTexture() {
  const size = 512;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#23272e';
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 1400; i++) {
    ctx.fillStyle = `rgba(${45 + Math.random() * 25},${48 + Math.random() * 25},${52 + Math.random() * 25},${Math.random() * 0.5})`;
    ctx.fillRect(Math.random() * size, Math.random() * size, 1.8, 1.8);
  }

  // Double yellow center lines
  ctx.fillStyle = '#ffb300';
  ctx.fillRect(size / 2 - 8, 0, 4, size);
  ctx.fillRect(size / 2 + 4, 0, 4, size);

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 65);
  tex.anisotropy = 8;
  return tex;
}

export function buildTrack() {
  const pts = [
    new THREE.Vector3(0, 0, 0), new THREE.Vector3(65, 0, -45), new THREE.Vector3(100, 0, -150),
    new THREE.Vector3(75, 0, -240), new THREE.Vector3(-15, 0, -280), new THREE.Vector3(-120, 0, -230),
    new THREE.Vector3(-150, 0, -130), new THREE.Vector3(-105, 0, -35), new THREE.Vector3(-45, 0, 45),
    new THREE.Vector3(35, 0, 65),
  ];
  const curve = new THREE.CatmullRomCurve3(pts, true, 'catmullrom', 0.5);
  const trackWidth = 14.5;
  const segments = 420;
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
    roadUvs.push(0, t * 65, 1, t * 65);
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
      roughness: 0.35,
      metalness: 0.22,
      envMapIntensity: 2.0
    })
  );
  road.receiveShadow = true;
  roadGroup.add(road);

  // Red & White racing curbs
  [curbL, curbR].forEach((side, sideIdx) => {
    for (let i = 0; i < side.length - 1; i += 4) {
      const seg = side[i];
      const next = side[Math.min(i + 4, side.length - 1)];
      const len = next.pos.clone().sub(seg.pos).length() || 0.01;
      const outward = seg.normal.clone().multiplyScalar(sideIdx === 0 ? 1 : -1);
      const curb = new THREE.Mesh(
        new THREE.BoxGeometry(0.95, 0.14, len),
        new THREE.MeshStandardMaterial({
          color: (i / 4) % 2 === 0 ? 0xd6142a : 0xf2f4f8,
          roughness: 0.45
        })
      );
      const mid = seg.pos.clone().lerp(next.pos, 0.5).addScaledVector(outward, 0.55);
      curb.position.set(mid.x, 0.07, mid.z);
      curb.lookAt(next.pos.x, 0.07, next.pos.z);
      roadGroup.add(curb);
    }
  });

  // Pine trees along the mountain highway
  for (let i = 8; i < segments; i += 14) {
    const t = i / segments;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const side = i % 28 === 0 ? 1 : -1;
    const pine = buildPineTree(6 + Math.random() * 4);
    pine.position.copy(point).addScaledVector(normal, side * (trackWidth / 2 + 4.2));
    roadGroup.add(pine);
  }

  return { curve, roadGroup, trackWidth };
}

function buildGround(phase = 'sunset') {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(3000, 3000),
    new THREE.MeshStandardMaterial({
      color: phase === 'sunset' ? 0x2e1a22 : 0x223625,
      roughness: 0.92
    })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.y = -0.02;
  mesh.receiveShadow = true;
  return mesh;
}

export function buildWorld(scene, options = {}) {
  const phase = options.phase || 'sunset';

  scene.environment = makeNeonEnvTexture(
    phase === 'day'
      ? ['#ffffff', '#62b6ff', '#8bc3eb', '#fffaed']
      : ['#ffb84d', '#ff7a1a', '#9c2742', '#ffe08a', '#ff4d7a']
  );

  scene.add(buildSky(phase));
  const sun = buildSun(phase);
  scene.add(sun);
  scene.add(buildMountains(phase));
  scene.add(buildGround(phase));

  const { curve, roadGroup, trackWidth } = buildTrack();
  scene.add(roadGroup);

  // ☀️ BRIGHTER ENVIRONMENT LIGHTING
  let sunLight, ambientLight, hemiLight;
  if (phase === 'day') {
    sunLight = new THREE.DirectionalLight(0xfffaee, 3.2);
    sunLight.position.set(-140, 240, -220);
    ambientLight = new THREE.AmbientLight(0x9bd2ff, 1.4);
    hemiLight = new THREE.HemisphereLight(0x62b6ff, 0x1e3a24, 1.2);
    scene.fog = new THREE.Fog(0x8bc3eb, 280, 2200);
  } else { // sunset
    sunLight = new THREE.DirectionalLight(0xffd5a0, 3.0);
    sunLight.position.set(-140, 180, -240);
    ambientLight = new THREE.AmbientLight(0xff9966, 1.3);
    hemiLight = new THREE.HemisphereLight(0xff8866, 0x2a1424, 1.1);
    scene.fog = new THREE.Fog(0xde7b45, 260, 2000);
  }

  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.left = -180;
  sunLight.shadow.camera.right = 180;
  sunLight.shadow.camera.top = 180;
  sunLight.shadow.camera.bottom = -180;
  sunLight.shadow.camera.far = 700;
  sunLight.shadow.bias = -0.001;

  scene.add(sunLight);
  scene.add(ambientLight);
  scene.add(hemiLight);

  function update(dt) {
    if (sun.userData && sun.userData.glow) {
      const t = performance.now() * 0.001;
      sun.userData.glow.material.opacity = 0.85 + Math.sin(t * 0.5) * 0.1;
    }
  }

  return { curve, trackWidth, update };
}
