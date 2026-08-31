/**
 * CraftMesh.js
 *
 * The Genesis test craft's visual representation. Per constitution §12
 * (physics experiment principle) this is a neutral research vehicle, not
 * a production cadet ship — geometric, high-contrast, cheap to render.
 * Original design; no franchise geometry or markings.
 */
import * as THREE from 'three';

export function buildCraftMesh() {
  const group = new THREE.Group();
  group.name = 'GenesisCraft';

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xd8dee8, metalness: 0.4, roughness: 0.35 });
  const accentMat = new THREE.MeshStandardMaterial({ color: 0x39ffe0, emissive: 0x1fae9c, emissiveIntensity: 1.1 });

  const hull = new THREE.Mesh(new THREE.ConeGeometry(1, 4.2, 6), bodyMat);
  hull.rotation.x = Math.PI / 2;
  hull.position.y = 0;
  group.add(hull);

  const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.55, 12, 10, 0, Math.PI * 2, 0, Math.PI / 1.6), bodyMat);
  canopy.position.set(0, 0.4, 0.6);
  group.add(canopy);

  for (const side of [-1, 1]) {
    const wing = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.08, 1.1), bodyMat);
    wing.position.set(side * 1.1, -0.1, -0.4);
    group.add(wing);

    const thruster = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 0.6, 10), accentMat);
    thruster.rotation.x = Math.PI / 2;
    thruster.position.set(side * 1.1, -0.1, -1.1);
    group.add(thruster);
  }

  const spine = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 3.6), accentMat);
  spine.position.set(0, 0.15, 0);
  group.add(spine);

  group.traverse((obj) => {
    if (obj.isMesh) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  return group;
}
