/**
 * ProvingGround.js
 *
 * The Genesis graybox test environment (constitution §27, execution prompt
 * §15). Deliberately plain: high-contrast markers on a neutral grid, no
 * production art. This is a laboratory for speed/physics/camera testing —
 * not a preview of the eventual academy world.
 *
 * Segments included (subset of §15's checklist, sized for Genesis scope):
 *  - long straight with 100m acceleration/braking markers
 *  - constant-radius corner
 *  - variable-radius corner (tightens)
 *  - slalom
 *  - ramp + landing zone
 */
import * as THREE from 'three';

const MARKER_COLOR = 0x39ffe0;
const WALL_COLOR = 0xff3b57;
const GRID_COLOR = 0x2a3a4a;

export function buildProvingGround(scene) {
  const group = new THREE.Group();
  group.name = 'ProvingGround';

  // Ground plane: neutral gray grid, per "ugly prototype" principle.
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(4000, 4000),
    new THREE.MeshStandardMaterial({ color: 0x14181d, roughness: 1, metalness: 0 })
  );
  ground.rotation.x = -Math.PI / 2;
  group.add(ground);

  const grid = new THREE.GridHelper(4000, 400, GRID_COLOR, GRID_COLOR);
  grid.position.y = 0.01;
  group.add(grid);

  // Straight with distance markers every 100m for acceleration/braking tests.
  for (let d = 0; d <= 1000; d += 100) {
    group.add(distanceMarker(d));
  }

  // A closed-ish loop path used for the corner/slalom/ramp segments.
  // Straight (0,0)->(0,-1000), constant-radius corner, variable corner,
  // slalom, ramp, return straight.
  const curvePoints = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(0, 0, -900),
    new THREE.Vector3(120, 0, -1050), // constant-radius corner apex
    new THREE.Vector3(320, 0, -1050),
    new THREE.Vector3(520, 0, -950), // variable-radius corner (tightens)
    new THREE.Vector3(560, 0, -700),
    new THREE.Vector3(500, 0, -500), // slalom gate 1
    new THREE.Vector3(600, 0, -350), // slalom gate 2
    new THREE.Vector3(500, 0, -200), // slalom gate 3
    new THREE.Vector3(560, 0, 0), // ramp approach
    new THREE.Vector3(400, 0, 150),
    new THREE.Vector3(200, 0, 150),
    new THREE.Vector3(0, 0, 0),
  ];
  const curve = new THREE.CatmullRomCurve3(curvePoints, true, 'catmullrom', 0.35);

  const trackWidth = 22;
  group.add(buildTrackRibbon(curve, trackWidth));
  group.add(buildGuardrails(curve, trackWidth));

  const ramp = buildRamp(new THREE.Vector3(560, 0, -20), Math.PI * 0.02);
  group.add(ramp);

  scene.add(group);

  return {
    group,
    curve,
    trackWidth,
    rampPosition: new THREE.Vector3(560, 0, -20),
  };
}

function distanceMarker(distanceMeters) {
  const g = new THREE.Group();
  const post = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 2.4, 0.3),
    new THREE.MeshStandardMaterial({ color: MARKER_COLOR, emissive: MARKER_COLOR, emissiveIntensity: 0.6 })
  );
  post.position.set(-14, 1.2, -distanceMeters);
  g.add(post);
  const post2 = post.clone();
  post2.position.x = 14;
  g.add(post2);
  return g;
}

function buildTrackRibbon(curve, width) {
  const segments = 240;
  const points = curve.getSpacedPoints(segments);
  const shapePts = [];
  for (let i = 0; i < points.length; i++) {
    const tangent = curve.getTangentAt(i / segments).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const p = points[i];
    shapePts.push(p.clone().addScaledVector(normal, width / 2));
    shapePts.push(p.clone().addScaledVector(normal, -width / 2));
  }
  const geo = new THREE.BufferGeometry();
  const verts = [];
  for (let i = 0; i < shapePts.length - 2; i++) {
    const a = shapePts[i];
    const b = shapePts[i + 1];
    const c = shapePts[i + 2];
    verts.push(a.x, a.y + 0.02, a.z, b.x, b.y + 0.02, b.z, c.x, c.y + 0.02, c.z);
  }
  geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({ color: 0x232a33, roughness: 0.9 });
  return new THREE.Mesh(geo, mat);
}

function buildGuardrails(curve, width) {
  const g = new THREE.Group();
  const segments = 80;
  const points = curve.getSpacedPoints(segments);
  const mat = new THREE.MeshStandardMaterial({ color: WALL_COLOR, emissive: WALL_COLOR, emissiveIntensity: 0.4 });
  for (let i = 0; i < points.length; i++) {
    const tangent = curve.getTangentAt(i / segments).normalize();
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const p = points[i];
    for (const side of [1, -1]) {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.1, 0.4), mat);
      post.position.copy(p).addScaledVector(normal, (width / 2 + 0.5) * side);
      post.position.y = 0.55;
      g.add(post);
    }
  }
  return g;
}

function buildRamp(position, angle) {
  const g = new THREE.Group();
  const ramp = new THREE.Mesh(
    new THREE.BoxGeometry(20, 2, 40),
    new THREE.MeshStandardMaterial({ color: 0x3a4656, roughness: 0.8 })
  );
  ramp.position.copy(position);
  ramp.position.y = 1;
  ramp.rotation.x = angle;
  g.add(ramp);
  return g;
}
