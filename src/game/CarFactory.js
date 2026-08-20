import * as THREE from 'three';

// Vibrant, non-flat paint options: metallic + pearlescent + iridescent clearcoat looks.
export const CAR_LIVERIES = [
  { id: 'plasma',   name: 'Plasma Cyan',    color: 0x00e5ff, metalness: 0.9, clearcoat: 1, sheen: 0x8f00ff },
  { id: 'inferno',  name: 'Inferno Magenta',color: 0xff1a6b, metalness: 0.85, clearcoat: 1, sheen: 0xffae00 },
  { id: 'volt',     name: 'Volt Lime',      color: 0x9dff1a, metalness: 0.8,  clearcoat: 1, sheen: 0x00e5ff },
  { id: 'sunset',   name: 'Sunset Orange',  color: 0xff7a1a, metalness: 0.85, clearcoat: 1, sheen: 0xff1a6b },
  { id: 'void',     name: 'Void Purple',    color: 0x7a1aff, metalness: 0.9,  clearcoat: 1, sheen: 0x00e5ff },
  { id: 'chrome',   name: 'Chrome Silver',  color: 0xd7dee6, metalness: 1,    clearcoat: 1, sheen: 0x00e5ff },
  { id: 'emerald',  name: 'Emerald Racing', color: 0x0aff8c, metalness: 0.85, clearcoat: 1, sheen: 0xffffff },
  { id: 'rosegold', name: 'Rose Gold',      color: 0xffb3a3, metalness: 0.95, clearcoat: 1, sheen: 0xff2e88 },
  { id: 'stealth',  name: 'Stealth Matte',  color: 0x23262e, metalness: 0.4,  clearcoat: 0.6, sheen: 0x00e5ff },
];

// Rarity tiers — cosmetic classification shown in the garage, JDM-tuner-game style.
export const RARITY = {
  legendary: { label: 'Legendary', color: 0xffb02e },
  epic:      { label: 'Epic',      color: 0xb84bff },
  rare:      { label: 'Rare',      color: 0x00c2ff },
  common:    { label: 'Common',    color: 0x9fb0c9 },
};

 export const CAR_MODELS = [
  {
    id: 'shadow-gt',
    name: 'SHADOW GT',
    class: 'Hypercar',
    rarity: 'legendary',
    topSpeed: 0.88,
    accel: 0.86,
    handling: 0.88,
    drift: 0.82,
    nitro: 0.86,
    scale: 1.0,
    lowSlung: 1.15,
    wide: 1.08,
    wing: true,
    quadLights: false,
    hoodScoop: true,
    arches: true
  },

  {
    id: 'inferno-x',
    name: 'INFERNO X',
    class: 'Supercar',
    rarity: 'epic',
    topSpeed: 0.84,
    accel: 0.98,
    handling: 0.72,
    drift: 0.78,
    nitro: 0.88,
    scale: 0.98,
    lowSlung: 1.18,
    wide: 1.06,
    wing: true,
    quadLights: false,
    hoodScoop: true,
    arches: true
  },

  {
    id: 'cyber-veloce',
    name: 'CYBER VELOCE',
    class: 'Electric Hypercar',
    rarity: 'rare',
    topSpeed: 0.82,
    accel: 0.84,
    handling: 0.98,
    drift: 0.86,
    nitro: 0.84,
    scale: 0.99,
    lowSlung: 1.12,
    wide: 1.04,
    wing: true,
    quadLights: true,
    hoodScoop: false,
    arches: true
  },

  {
    id: 'nighthawk',
    name: 'NIGHTHAWK',
    class: 'Drift Coupe',
    rarity: 'epic',
    topSpeed: 0.8,
    accel: 0.82,
    handling: 0.88,
    drift: 1.0,
    nitro: 0.82,
    scale: 1.02,
    lowSlung: 1.02,
    wide: 1.02,
    wing: false,
    quadLights: true,
    hoodScoop: false,
    arches: true
  },

  {
    id: 'vortex-rs',
    name: 'VORTEX RS',
    class: 'Track',
    rarity: 'rare',
    topSpeed: 1.0,
    accel: 0.82,
    handling: 0.76,
    drift: 0.74,
    nitro: 0.9,
    scale: 0.97,
    lowSlung: 1.2,
    wide: 1.1,
    wing: true,
    quadLights: false,
    hoodScoop: true,
    arches: true
  },

  {
    id: 'apex-r9',
    name: 'APEX R9',
    class: 'Grand Tourer',
    rarity: 'epic',
    topSpeed: 0.9,
    accel: 0.82,
    handling: 0.88,
    drift: 0.68,
    nitro: 0.84,
    scale: 1.04,
    lowSlung: 1.0,
    wide: 1.04,
    wing: false,
    quadLights: true,
    hoodScoop: false,
    arches: true
  },

  {
    id: 'phantom-r',
    name: 'PHANTOM R',
    class: 'Highway GT',
    rarity: 'legendary',
    topSpeed: 0.98,
    accel: 0.88,
    handling: 0.78,
    drift: 0.76,
    nitro: 0.94,
    scale: 1.06,
    lowSlung: 1.1,
    wide: 1.04,
    wing: false,
    quadLights: false,
    hoodScoop: true,
    arches: true
  },

  {
    id: 'pulse-gt',
    name: 'PULSE GT',
    class: 'Sport',
    rarity: 'epic',
    topSpeed: 0.86,
    accel: 0.9,
    handling: 0.84,
    drift: 0.8,
    nitro: 1.0,
    scale: 0.97,
    lowSlung: 1.0,
    wide: 0.98,
    wing: true,
    quadLights: true,
    hoodScoop: false,
    arches: true
  },

  {
    id: 'fury-zx',
    name: 'FURY ZX',
    class: 'Street Racer',
    rarity: 'epic',
    topSpeed: 0.9,
    accel: 0.96,
    handling: 0.78,
    drift: 0.88,
    nitro: 0.86,
    scale: 1.04,
    lowSlung: 0.9,
    wide: 1.1,
    wing: false,
    quadLights: true,
    hoodScoop: true,
    arches: true
  },

  {
    id: 'aeron-x',
    name: 'AERON X',
    class: 'Track Coupe',
    rarity: 'rare',
    topSpeed: 0.84,
    accel: 0.86,
    handling: 1.0,
    drift: 0.9,
    nitro: 0.82,
    scale: 0.95,
    lowSlung: 1.15,
    wide: 0.97,
    wing: true,
    quadLights: false,
    hoodScoop: false,
    arches: true
  },

  {
    id: 'titan-rs',
    name: 'TITAN RS',
    class: 'Muscle',
    rarity: 'legendary',
    topSpeed: 0.92,
    accel: 0.88,
    handling: 0.86,
    drift: 0.7,
    nitro: 0.92,
    scale: 1.12,
    lowSlung: 0.85,
    wide: 1.16,
    wing: false,
    quadLights: true,
    hoodScoop: true,
    arches: true
  }
];
function paintMaterial(liveryColor) {
  return new THREE.MeshPhysicalMaterial({
    color: liveryColor,
    metalness: 0.6,
    roughness: 0.2,
    clearcoat: 1.0,
    clearcoatRoughness: 0.06,
    reflectivity: 0.7,
    envMapIntensity: 1.6,
  });
}

const glassMat = new THREE.MeshPhysicalMaterial({ color: 0x0a1420, metalness: 0.2, roughness: 0.05, transmission: 0.6, transparent: true, opacity: 0.85, envMapIntensity: 1 });
const darkTrim = new THREE.MeshStandardMaterial({ color: 0x0c0d10, metalness: 0.7, roughness: 0.35 });
const chromeMat = new THREE.MeshStandardMaterial({ color: 0xe8edf2, metalness: 1, roughness: 0.1 });
const tireMat = new THREE.MeshStandardMaterial({ color: 0x111214, roughness: 0.9, metalness: 0.05 });
const headlightMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xbfe9ff, emissiveIntensity: 3 });
const taillightMat = new THREE.MeshStandardMaterial({ color: 0xff2a2a, emissive: 0xff0033, emissiveIntensity: 2.6 });
const brakeCaliperMat = new THREE.MeshStandardMaterial({ color: 0xff2e2e, metalness: 0.3, roughness: 0.4 });
const exhaustMat = new THREE.MeshStandardMaterial({ color: 0xcfd6dd, metalness: 1, roughness: 0.2 });

function buildWheel(radius = 0.36, width = 0.28) {
  const g = new THREE.Group();
  const tire = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, width, 22), tireMat);
  tire.rotation.z = Math.PI / 2;
  tire.castShadow = true;
  g.add(tire);
  // multi-spoke rim (star pattern via low-seg cylinder for a forged-wheel look)
  const rim = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.66, radius * 0.66, width * 1.04, 7), chromeMat);
  rim.rotation.z = Math.PI / 2;
  g.add(rim);
  const spokeHub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.68, radius * 0.68, width * 1.06, 7, 1, false), chromeMat);
  spokeHub.rotation.z = Math.PI / 2;
  spokeHub.rotation.x = Math.PI / 7;
  g.add(spokeHub);
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(radius * 0.16, radius * 0.16, width * 1.14, 12), darkTrim);
  hub.rotation.z = Math.PI / 2;
  g.add(hub);
  // brake caliper peeking through the rim — small visual detail that reads well up close
  const caliper = new THREE.Mesh(new THREE.BoxGeometry(radius * 0.5, radius * 0.34, radius * 0.34), brakeCaliperMat);
  caliper.position.set(0, radius * 0.35, radius * 0.1);
  g.add(caliper);
  return g;
}

/**
 * Builds an original stylized low-poly sports-car silhouette — wide flared arches, wedge nose,
 * quad or bar LED lighting, hood scoop, aggressive diffuser/exhaust — not modeled on any real
 * make/model, but tuned to read as an aggressive JDM-tuner / hypercar hybrid silhouette.
 * Returns { group, wheels:{fl,fr,rl,rr}, headlights, taillights, underGlow }
 */
export function buildCar(modelDef, liveryColor) {
  const car = new THREE.Group();
  const S = modelDef.scale;
  const low = modelDef.lowSlung;
  const wide = modelDef.wide;

  const paint = paintMaterial(liveryColor);

  // Lower chassis / floor
  const chassis = new THREE.Mesh(new THREE.BoxGeometry(1.92 * wide, 0.26, 4.25), darkTrim);
  chassis.position.y = 0.32 * low;
  car.add(chassis);

  // Main cabin body — built from 3 stacked/tapered sections for a smoother wedge than a single box
  const bodyMid = new THREE.Mesh(new THREE.BoxGeometry(1.88 * wide, 0.5, 2.6), paint);
  bodyMid.position.set(0, 0.6 * low, -0.3);
  bodyMid.castShadow = true;
  car.add(bodyMid);

  const noseUpper = new THREE.Mesh(new THREE.BoxGeometry(1.66 * wide, 0.36, 1.15), paint);
  noseUpper.position.set(0, 0.52 * low, 1.75);
  noseUpper.castShadow = true;
  car.add(noseUpper);

  const noseTip = new THREE.Mesh(new THREE.BoxGeometry(1.4 * wide, 0.24, 0.55), paint);
  noseTip.position.set(0, 0.42 * low, 2.35);
  noseTip.castShadow = true;
  car.add(noseTip);

  // Front splitter + canards
  const splitter = new THREE.Mesh(new THREE.BoxGeometry(1.78 * wide, 0.06, 0.42), darkTrim);
  splitter.position.set(0, 0.2 * low, 2.5);
  car.add(splitter);
  [-1, 1].forEach((side) => {
    const canard = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, 0.22), darkTrim);
    canard.position.set(side * 0.85 * wide, 0.26 * low, 2.35);
    canard.rotation.y = side * 0.3;
    car.add(canard);
  });

  // Hood scoop / vent
  if (modelDef.hoodScoop) {
    const scoop = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.09, 0.55), darkTrim);
    scoop.position.set(0, 0.86 * low, 1.35);
    car.add(scoop);
  }

  // Flared wheel arches — small bulges at each corner give the "wide body" look
  if (modelDef.arches) {
    const archPositions = [
      [-1.02 * wide, 0.4 * low, 1.35], [1.02 * wide, 0.4 * low, 1.35],
      [-1.04 * wide, 0.4 * low, -1.3], [1.04 * wide, 0.4 * low, -1.3],
    ];
    archPositions.forEach(([x, y, z]) => {
      const arch = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.42, 0.85), paint);
      arch.position.set(x, y, z);
      arch.castShadow = true;
      car.add(arch);
    });
  }

  // Cabin/greenhouse (glass) — tapered toward the rear
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.32 * wide, 0.4, 1.55), glassMat);
  cabin.position.set(0, 0.98 * low, -0.4);
  car.add(cabin);
  const cabinRear = new THREE.Mesh(new THREE.BoxGeometry(1.2 * wide, 0.32, 0.7), glassMat);
  cabinRear.position.set(0, 0.9 * low, -1.25);
  car.add(cabinRear);

  // Rear deck + haunches
  const rear = new THREE.Mesh(new THREE.BoxGeometry(1.86 * wide, 0.48, 0.95), paint);
  rear.position.set(0, 0.64 * low, -1.9);
  rear.castShadow = true;
  car.add(rear);

  // Diffuser with fins
  const diffuser = new THREE.Mesh(new THREE.BoxGeometry(1.74 * wide, 0.16, 0.32), darkTrim);
  diffuser.position.set(0, 0.26 * low, -2.36);
  car.add(diffuser);
  for (let i = -2; i <= 2; i++) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.14, 0.3), darkTrim);
    fin.position.set(i * 0.32 * wide, 0.26 * low, -2.36);
    car.add(fin);
  }

  // Exhaust tips
  const exhaustCount = modelDef.class === 'Muscle' ? 4 : 2;
  const exStep = 0.32;
  for (let i = 0; i < exhaustCount; i++) {
    const offset = (i - (exhaustCount - 1) / 2) * exStep;
    const ex = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.08, 0.22, 10), exhaustMat);
    ex.rotation.x = Math.PI / 2;
    ex.position.set(offset * wide, 0.22 * low, -2.42);
    car.add(ex);
  }

  // Side skirts
  [-1, 1].forEach((side) => {
    const skirt = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 3.5), darkTrim);
    skirt.position.set(side * 0.97 * wide, 0.32 * low, -0.1);
    car.add(skirt);
  });

  // Spoiler / wing — angled endplates for a more aggressive GT-style look
  if (modelDef.wing) {
    const wingGroup = new THREE.Group();
    const wingPlane = new THREE.Mesh(new THREE.BoxGeometry(1.55 * wide, 0.06, 0.4), darkTrim);
    wingPlane.position.set(0, 1.08 * low, -2.2);
    wingGroup.add(wingPlane);
    [-0.62, 0.62].forEach((x) => {
      const strut = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.42, 0.12), darkTrim);
      strut.position.set(x * wide, 0.84 * low, -2.2);
      wingGroup.add(strut);
      const endplate = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.24, 0.42), darkTrim);
      endplate.position.set(x * wide, 1.08 * low, -2.2);
      wingGroup.add(endplate);
    });
    car.add(wingGroup);
  }

  // Headlights — either a slim LED bar or aggressive quad-round cluster
  const headlights = [];
  if (modelDef.quadLights) {
    [-0.68, -0.42, 0.42, 0.68].forEach((x) => {
      const hl = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), headlightMat);
      hl.position.set(x * wide, 0.56 * low, 2.55);
      car.add(hl);
      headlights.push(hl);
    });
  } else {
    [-0.62, 0.62].forEach((x) => {
      const hl = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.1, 0.08), headlightMat);
      hl.position.set(x * wide, 0.56 * low, 2.55);
      car.add(hl);
      headlights.push(hl);
    });
  }

  // Dynamic headlight spotlights — real light sources that actually illuminate the road ahead,
  // not just emissive meshes. Built for every car but left at intensity 0 by default; main.js
  // turns the player's up (keeping AI/ghost/remote cars cheap — real-time shadowed spotlights
  // on all 8 cars at once would be a real perf hit).
  const headlightSpots = [];
  headlights.forEach((hl) => {
    const spot = new THREE.SpotLight(0xdfefff, 0, 26, Math.PI / 6.5, 0.4, 1.4);
    spot.position.copy(hl.position);
    const target = new THREE.Object3D();
    target.position.set(hl.position.x * 0.3, hl.position.y - 0.3, hl.position.z + 20);
    car.add(target);
    spot.target = target;
    car.add(spot);
    headlightSpots.push(spot);
  });

  // Taillights — full-width LED strip look
  const taillights = [];
  const tailStrip = new THREE.Mesh(new THREE.BoxGeometry(1.7 * wide, 0.1, 0.05), taillightMat);
  tailStrip.position.set(0, 0.74 * low, -2.38);
  car.add(tailStrip);
  taillights.push(tailStrip);

  // Wheels
  const wheelR = 0.37 * S;
  const axleFront = 1.35, axleRear = -1.3, track = 1.0 * wide;
  const fl = buildWheel(wheelR); fl.position.set(-track, wheelR, axleFront);
  const fr = buildWheel(wheelR); fr.position.set(track, wheelR, axleFront);
  const rl = buildWheel(wheelR); rl.position.set(-track, wheelR, axleRear);
  const rr = buildWheel(wheelR); rr.position.set(track, wheelR, axleRear);
  [fl, fr, rl, rr].forEach((w) => car.add(w));

  // Underglow (nice arcade touch, subtle)
  const underGlow = new THREE.PointLight(liveryColor, 0.6, 3.4, 2);
  underGlow.position.set(0, 0.05, 0);
  car.add(underGlow);

  car.scale.setScalar(S);
  car.traverse((o) => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });

  return {
    group: car,
    wheels: { fl, fr, rl, rr },
    headlights,
    headlightSpots,
    taillights,
    underGlow,
  };
}

