import * as THREE from 'three';
import { buildCar, CAR_MODELS, CAR_LIVERIES } from './CarFactory.js';

// The car paint is a PBR MeshPhysicalMaterial (metalness + clearcoat) — without an environment
// map, PBR metals/clearcoats render dark and flat no matter how many direct lights are added,
// because most of their apparent brightness comes from reflected environment light, not direct
// diffuse lighting. This builds a small neon-studio env texture so the paint actually looks
// glossy/lit, matching the reflections the race-world scenes already get from their own env maps.
function makeStudioEnvTexture() {
  const w = 512, h = 256;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const grd = ctx.createLinearGradient(0, 0, 0, h);
  grd.addColorStop(0, '#1a2035');
  grd.addColorStop(0.5, '#0a0e1a');
  grd.addColorStop(1, '#141018');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);
  // Bright soft "studio window" highlights — these are what give clear-coat paint its glossy
  // streak reflections and metal its sense of shape.
  const highlights = [
    { x: w * 0.28, y: h * 0.32, r: 90, color: 'rgba(235,245,255,0.95)' },
    { x: w * 0.7, y: h * 0.42, r: 70, color: 'rgba(0,229,255,0.85)' },
    { x: w * 0.5, y: h * 0.68, r: 60, color: 'rgba(255,23,111,0.6)' },
    { x: w * 0.85, y: h * 0.25, r: 50, color: 'rgba(124,77,255,0.55)' },
  ];
  highlights.forEach((hl) => {
    const g = ctx.createRadialGradient(hl.x, hl.y, 0, hl.x, hl.y, hl.r);
    g.addColorStop(0, hl.color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(hl.x, hl.y, hl.r, 0, Math.PI * 2); ctx.fill();
  });
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/*
 * RYDASH PreviewStage
 *
 * Used by:
 *  - Home hero
 *  - Garage
 *
 * Home mode:
 *  - Large cinematic vehicle
 *  - Transparent background
 *  - Strong neon rim lighting
 *  - Subtle platform glow
 *  - Slow rotation
 *
 * Garage mode:
 *  - Interactive rotation
 *  - More centered studio presentation
 */

export class PreviewStage {
  constructor(container, { interactive = false } = {}) {
    this.container = container;
    this.interactive = interactive;

    this.scene = new THREE.Scene();
    this.scene.environment = makeStudioEnvTexture();

    /*
     * Camera
     *
     * Home gets a wider cinematic composition.
     * Garage gets a closer centered composition.
     */
    this.camera = new THREE.PerspectiveCamera(
      interactive ? 30 : 34,
      1,
      0.1,
      100
    );

    if (interactive) {
      this.camera.position.set(5.0, 2.4, 6.2);
    } else {
      this.camera.position.set(5.8, 2.35, 7.2);
    }

    this.camera.lookAt(0, 0.7, 0);

    /*
     * Renderer
     *
     * Alpha is important because the Home page already
     * has the animated city/rain background in HTML/CSS.
     */
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });

    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 2)
    );

    this.renderer.setClearColor(0x000000, 0);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    this.container.appendChild(this.renderer.domElement);

    /*
     * =========================
     * LIGHTING
     * =========================
     */

    // Main white key.
    const key = new THREE.DirectionalLight(0xffffff, 2.8);
    key.position.set(5, 7, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    this.scene.add(key);

    // Cyan front/side light.
    const cyan = new THREE.PointLight(
      0x00e5ff,
      interactive ? 3.0 : 4.5,
      22
    );
    cyan.position.set(-5, 2.8, 3);
    this.scene.add(cyan);

    // Pink rear light.
    const pink = new THREE.PointLight(
      0xff176f,
      interactive ? 2.4 : 3.8,
      22
    );
    pink.position.set(4, 2.5, -5);
    this.scene.add(pink);

    // Purple overhead light.
    const purple = new THREE.PointLight(
      0x7c4dff,
      interactive ? 1.4 : 2.2,
      18
    );
    purple.position.set(0, 6, -1);
    this.scene.add(purple);

    const ambient = new THREE.AmbientLight(
      0x24304a,
      interactive ? 1.1 : 1.25
    );

    this.scene.add(ambient);

    /*
     * =========================
     * FLOOR / SHADOW PLATFORM
     * =========================
     *
     * Kept subtle so the Home city remains visible.
     */

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x05070d,
      roughness: 0.28,
      metalness: 0.55,
      transparent: true,
      opacity: interactive ? 0.9 : 0.58
    });

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(interactive ? 6 : 5.8, 64),
      floorMaterial
    );

    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -0.04;
    floor.receiveShadow = true;

    this.scene.add(floor);

    this.floor = floor;

    /*
     * Neon platform ring.
     */
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(2.7, 2.82, 96),
      new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: interactive ? 0.55 : 0.32,
        side: THREE.DoubleSide
      })
    );

    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.015;

    this.scene.add(ring);

    this.ring = ring;

    /*
     * Secondary pink ring.
     */
    const ring2 = new THREE.Mesh(
      new THREE.RingGeometry(3.15, 3.20, 96),
      new THREE.MeshBasicMaterial({
        color: 0xff176f,
        transparent: true,
        opacity: interactive ? 0.22 : 0.14,
        side: THREE.DoubleSide
      })
    );

    ring2.rotation.x = -Math.PI / 2;
    ring2.position.y = 0.012;

    this.scene.add(ring2);

    this.ring2 = ring2;

    /*
     * =========================
     * CAR
     * =========================
     */

    this.carRig = null;

    this.dragging = false;

    this.rotY = interactive ? 0.35 : 0.15;

    this.autoRotate = true;

    /*
     * Home car rotates more slowly.
     * Garage rotates slightly faster.
     */
    this.rotationSpeed = interactive
      ? 0.004
      : 0.0022;

    /*
     * Home car sits slightly lower.
     */
    this.carYOffset = interactive ? 0 : -0.05;

    /*
     * =========================
     * GARAGE INTERACTION
     * =========================
     */

    if (interactive) {
      this.renderer.domElement.style.cursor = 'grab';
      this.renderer.domElement.style.touchAction = 'none';

      this.renderer.domElement.addEventListener(
        'pointerdown',
        (e) => {
          this.dragging = true;
          this._lastX = e.clientX;
          this.autoRotate = false;
          this.renderer.domElement.style.cursor = 'grabbing';
        }
      );

      window.addEventListener('pointerup', () => {
        if (!this.dragging) return;

        this.dragging = false;
        this.autoRotate = true;

        if (this.renderer.domElement) {
          this.renderer.domElement.style.cursor = 'grab';
        }
      });

      window.addEventListener('pointermove', (e) => {
        if (!this.dragging) return;

        const dx = e.clientX - this._lastX;

        this._lastX = e.clientX;

        this.rotY += dx * 0.008;
      });
    }

    /*
     * Resize.
     */
    this._resize = this._resize.bind(this);

    window.addEventListener(
      'resize',
      this._resize
    );

    this._resize();

    /*
     * Animation.
     */
    this._raf = null;

    this._animate = this._animate.bind(this);
  }

  /*
   * =========================
   * SET CAR
   * =========================
   */

  setCarByIndex(modelIndex, liveryIndex) {
    const modelDef =
      CAR_MODELS[modelIndex] || CAR_MODELS[0];

    const livery =
      CAR_LIVERIES[liveryIndex] || CAR_LIVERIES[0];

    if (this.carRig) {
      this.scene.remove(this.carRig.group);
    }

    this.carRig = buildCar(
      modelDef,
      livery.color
    );

    this.carRig.group.rotation.y = this.rotY;

    this.carRig.group.position.y =
      this.carYOffset;

    /*
     * Home mode makes the vehicle visually larger.
     * We scale the whole rig instead of changing
     * the underlying CarFactory model.
     */
    const scale = this.interactive
      ? 1
      : 1.12;

    this.carRig.group.scale.setScalar(scale);

    this.scene.add(this.carRig.group);

    return {
      modelDef,
      livery
    };
  }

  /*
   * =========================
   * RENDER ONCE
   * =========================
   */

  renderOnce() {
    if (this.carRig) {
      this.carRig.group.rotation.y =
        this.rotY;
    }

    this.renderer.render(
      this.scene,
      this.camera
    );
  }

  /*
   * =========================
   * START
   * =========================
   */

  start() {
    if (this._raf) return;

    this._raf =
      requestAnimationFrame(this._animate);
  }

  /*
   * =========================
   * STOP
   * =========================
   */

  stop() {
    if (this._raf) {
      cancelAnimationFrame(this._raf);
    }

    this._raf = null;
  }

  /*
   * =========================
   * ANIMATION LOOP
   * =========================
   */

  _animate() {
    this._raf =
      requestAnimationFrame(this._animate);

    const t =
      performance.now() * 0.001;

    if (this.carRig) {

      /*
       * Slow cinematic rotation on Home.
       */
      if (this.autoRotate) {
        this.rotY +=
          this.rotationSpeed;
      }

      this.carRig.group.rotation.y =
        this.rotY;

      /*
       * Subtle underglow animation.
       */
      if (this.carRig.underGlow) {
        this.carRig.underGlow.intensity =
          0.9 +
          Math.sin(t * 2.2) * 0.22;
      }
    }

    /*
     * Animate platform rings.
     */
    if (this.ring) {
      this.ring.rotation.z =
        t * 0.12;
    }

    if (this.ring2) {
      this.ring2.rotation.z =
        -t * 0.075;
    }

    this.renderer.render(
      this.scene,
      this.camera
    );
  }

  /*
   * =========================
   * RESIZE
   * =========================
   */

  _resize() {
    const w =
      this.container.clientWidth || 300;

    const h =
      this.container.clientHeight || 300;

    this.renderer.setSize(
      w,
      h,
      false
    );

    this.camera.aspect =
      w / h;

    this.camera.updateProjectionMatrix();
  }

  /*
   * =========================
   * DISPOSE
   * =========================
   */

  dispose() {
    this.stop();

    window.removeEventListener(
      'resize',
      this._resize
    );

    this.renderer.dispose();

    if (this.renderer.domElement) {
      this.renderer.domElement.remove();
    }
  }
}