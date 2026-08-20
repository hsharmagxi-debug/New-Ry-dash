import * as THREE from 'three';
import { buildCar, CAR_MODELS, CAR_LIVERIES } from './CarFactory.js';

// Self-contained rotating-car preview renderer, reused by the home hero and the garage.
export class PreviewStage {
  constructor(container, { interactive = false } = {}) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    this.camera.position.set(4.6, 2.1, 5.6);
    this.camera.lookAt(0, 0.5, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);

    // studio-ish lighting with a colored rim light for drama
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(4, 6, 4);
    key.castShadow = true;
    this.scene.add(key);
    const rim = new THREE.PointLight(0x00e5ff, 3, 20);
    rim.position.set(-4, 2, -3);
    this.scene.add(rim);
    const rim2 = new THREE.PointLight(0xff2e88, 2.2, 20);
    rim2.position.set(3, 1, -4);
    this.scene.add(rim2);
    const ambient = new THREE.AmbientLight(0x445, 0.9);
    this.scene.add(ambient);

    const floorMat = new THREE.MeshStandardMaterial({ color: 0x090a10, roughness: 0.35, metalness: 0.4 });
    const floor = new THREE.Mesh(new THREE.CircleGeometry(6, 48), floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    this.scene.add(floor);

    const ringGeo = new THREE.RingGeometry(2.6, 2.72, 64);
    const ring = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.5, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.02;
    this.scene.add(ring);

    this.carRig = null;
    this.interactive = interactive;
    this.dragging = false;
    this.rotY = 0.4;
    this.autoRotate = true;

    if (interactive) {
      this.renderer.domElement.style.cursor = 'grab';
      this.renderer.domElement.addEventListener('pointerdown', (e) => { this.dragging = true; this._lastX = e.clientX; this.autoRotate = false; });
      window.addEventListener('pointerup', () => { this.dragging = false; });
      window.addEventListener('pointermove', (e) => {
        if (!this.dragging) return;
        const dx = e.clientX - this._lastX;
        this._lastX = e.clientX;
        this.rotY += dx * 0.008;
      });
    }

    this._resize = this._resize.bind(this);
    window.addEventListener('resize', this._resize);
    this._resize();

    this._raf = null;
    this._animate = this._animate.bind(this);
  }

  setCarByIndex(modelIndex, liveryIndex) {
    const modelDef = CAR_MODELS[modelIndex];
    const livery = CAR_LIVERIES[liveryIndex];
    if (this.carRig) this.scene.remove(this.carRig.group);
    this.carRig = buildCar(modelDef, livery.color);
    this.carRig.group.rotation.y = this.rotY;
    this.scene.add(this.carRig.group);
    return { modelDef, livery };
  }

  renderOnce() {
    if (this.carRig) this.carRig.group.rotation.y = this.rotY;
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    if (this._raf) return;
    this._raf = requestAnimationFrame(this._animate);
  }

  stop() {
    if (this._raf) cancelAnimationFrame(this._raf);
    this._raf = null;
  }

  _animate() {
    this._raf = requestAnimationFrame(this._animate);
    if (this.carRig) {
      if (this.autoRotate) this.rotY += 0.0032 * (this._speedMul || 1);
      this.carRig.group.rotation.y = this.rotY;
      // idle headlight/taillight shimmer + wheel spin for life
      const t = performance.now() * 0.001;
      this.carRig.underGlow.intensity = 0.9 + Math.sin(t * 2) * 0.25;
    }
    this.renderer.render(this.scene, this.camera);
  }

  _resize() {
    const w = this.container.clientWidth || 300;
    const h = this.container.clientHeight || 300;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  dispose() {
    this.stop();
    window.removeEventListener('resize', this._resize);
    this.renderer.dispose();
    this.renderer.domElement.remove();
  }
}
