import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

// High-speed radial zoom blur with chromatic aberration (RGB split) for high-octane nitro sensation
const RadialBlurShader = {
  uniforms: {
    tDiffuse: { value: null },
    uIntensity: { value: 0 },
    uAberration: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uIntensity;
    uniform float uAberration;
    varying vec2 vUv;
    void main() {
      if (uIntensity <= 0.001 && uAberration <= 0.001) {
        gl_FragColor = texture2D(tDiffuse, vUv);
        return;
      }
      vec2 center = vec2(0.5, 0.5);
      vec2 toCenter = center - vUv;
      vec4 color = vec4(0.0);
      const int SAMPLES = 10;
      for (int i = 0; i < SAMPLES; i++) {
        float t = float(i) / float(SAMPLES - 1) * uIntensity * 0.075;
        vec2 sampleUv = vUv + toCenter * t;
        float rOffset = uAberration * 0.012 * (float(i) / float(SAMPLES));
        float bOffset = -uAberration * 0.012 * (float(i) / float(SAMPLES));
        float r = texture2D(tDiffuse, sampleUv + toCenter * rOffset).r;
        float g = texture2D(tDiffuse, sampleUv).g;
        float b = texture2D(tDiffuse, sampleUv + toCenter * bOffset).b;
        float a = texture2D(tDiffuse, sampleUv).a;
        color += vec4(r, g, b, a);
      }
      gl_FragColor = color / float(SAMPLES);
    }
  `,
};

export function buildComposer(renderer, scene, camera, width, height) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(width, height), 0.95, 0.45, 0.6);
  composer.addPass(bloom);
  const motionBlur = new ShaderPass(RadialBlurShader);
  composer.addPass(motionBlur);
  composer.addPass(new OutputPass());
  return { composer, bloom, motionBlur };
}

// Lightweight drift-smoke particle system
export class SmokeSystem {
  constructor(scene, maxParticles = 140) {
    this.scene = scene;
    this.max = maxParticles;
    const tex = this._smokeTexture();
    this.material = new THREE.SpriteMaterial({ map: tex, color: 0xcccccc, transparent: true, opacity: 0.55, depthWrite: false });
    this.pool = [];
    for (let i = 0; i < maxParticles; i++) {
      const s = new THREE.Sprite(this.material.clone());
      s.visible = false;
      s.scale.set(0.1, 0.1, 0.1);
      scene.add(s);
      this.pool.push({ sprite: s, life: 0, vel: new THREE.Vector3() });
    }
    this._cursor = 0;
  }

  _smokeTexture() {
    const size = 64;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,0.75)');
    g.addColorStop(0.5, 'rgba(220,230,245,0.4)');
    g.addColorStop(1, 'rgba(200,210,230,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }

  emit(position, intensity = 1) {
    const count = Math.min(4, Math.ceil(intensity * 3));
    for (let i = 0; i < count; i++) {
      const p = this.pool[this._cursor];
      this._cursor = (this._cursor + 1) % this.pool.length;
      p.sprite.position.copy(position);
      p.sprite.position.x += (Math.random() - 0.5) * 0.35;
      p.sprite.position.y += 0.1 + Math.random() * 0.15;
      p.sprite.position.z += (Math.random() - 0.5) * 0.35;
      p.sprite.visible = true;
      p.sprite.scale.setScalar(0.45 + Math.random() * 0.4);
      p.sprite.material.opacity = 0.55;
      p.life = 0.65 + Math.random() * 0.45;
      p.vel.set((Math.random() - 0.5) * 0.8, 0.8 + Math.random() * 0.5, (Math.random() - 0.5) * 0.8);
    }
  }

  update(dt) {
    for (const p of this.pool) {
      if (!p.sprite.visible) continue;
      p.life -= dt;
      if (p.life <= 0) { p.sprite.visible = false; continue; }
      p.sprite.position.addScaledVector(p.vel, dt);
      p.sprite.scale.multiplyScalar(1 + dt * 1.1);
      p.sprite.material.opacity = Math.max(0, p.life) * 0.65;
    }
  }
}

// Water spray system behind wheels on wet roads (Neon Rain, Storm City, Coastal)
export class WaterSpraySystem {
  constructor(scene, maxParticles = 160) {
    this.scene = scene;
    this.max = maxParticles;
    const tex = this._sprayTexture();
    this.material = new THREE.SpriteMaterial({
      map: tex,
      color: 0xcae8ff,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this.pool = [];
    for (let i = 0; i < maxParticles; i++) {
      const s = new THREE.Sprite(this.material.clone());
      s.visible = false;
      s.scale.set(0.1, 0.1, 0.1);
      scene.add(s);
      this.pool.push({ sprite: s, life: 0, vel: new THREE.Vector3() });
    }
    this._cursor = 0;
  }

  _sprayTexture() {
    const size = 32;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,0.85)');
    g.addColorStop(0.4, 'rgba(180,225,255,0.5)');
    g.addColorStop(1, 'rgba(140,200,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }

  emit(position, forwardVec, speedKmh) {
    if (speedKmh < 30) return;
    const count = Math.min(3, Math.ceil(speedKmh / 60));
    for (let i = 0; i < count; i++) {
      const p = this.pool[this._cursor];
      this._cursor = (this._cursor + 1) % this.pool.length;
      p.sprite.position.copy(position);
      p.sprite.position.x += (Math.random() - 0.5) * 0.2;
      p.sprite.position.y += 0.05 + Math.random() * 0.1;
      p.sprite.position.z += (Math.random() - 0.5) * 0.2;
      p.sprite.visible = true;
      p.sprite.scale.setScalar(0.25 + Math.random() * 0.25);
      p.sprite.material.opacity = 0.65;
      p.life = 0.25 + Math.random() * 0.2;
      const speedRatio = speedKmh / 150;
      p.vel.set(
        (Math.random() - 0.5) * 1.5,
        0.6 + Math.random() * 0.8,
        -forwardVec.z * (2 + speedRatio * 3) + (Math.random() - 0.5) * 1.2
      );
    }
  }

  update(dt) {
    for (const p of this.pool) {
      if (!p.sprite.visible) continue;
      p.life -= dt;
      if (p.life <= 0) { p.sprite.visible = false; continue; }
      p.vel.y -= dt * 6;
      p.sprite.position.addScaledVector(p.vel, dt);
      p.sprite.scale.multiplyScalar(1 + dt * 1.8);
      p.sprite.material.opacity = Math.max(0, p.life) * 1.8;
    }
  }
}

// Spark particles for collision impacts
export class SparkSystem {
  constructor(scene, maxParticles = 120) {
    this.scene = scene;
    const tex = this._sparkTexture();
    this.pool = [];
    for (let i = 0; i < maxParticles; i++) {
      const mat = new THREE.SpriteMaterial({ map: tex, color: 0xffb347, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
      const s = new THREE.Sprite(mat);
      s.visible = false;
      s.scale.set(0.15, 0.15, 0.15);
      scene.add(s);
      this.pool.push({ sprite: s, life: 0, vel: new THREE.Vector3() });
    }
    this._cursor = 0;
  }

  _sparkTexture() {
    const size = 32;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.4, 'rgba(255,180,70,0.95)');
    g.addColorStop(1, 'rgba(255,120,20,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }

  emit(position, count = 14) {
    const colors = [0xffffff, 0xffd166, 0xff5400, 0x00e5ff];
    for (let i = 0; i < count; i++) {
      const p = this.pool[this._cursor];
      this._cursor = (this._cursor + 1) % this.pool.length;
      p.sprite.position.copy(position);
      p.sprite.position.y += 0.25;
      p.sprite.visible = true;
      p.sprite.material.color.setHex(colors[i % colors.length]);
      p.sprite.scale.setScalar(0.12 + Math.random() * 0.14);
      p.sprite.material.opacity = 1;
      p.life = 0.35 + Math.random() * 0.35;
      const angle = Math.random() * Math.PI * 2;
      const speed = 3.5 + Math.random() * 5.5;
      p.vel.set(Math.cos(angle) * speed, 2.5 + Math.random() * 4, Math.sin(angle) * speed);
    }
  }

  update(dt) {
    for (const p of this.pool) {
      if (!p.sprite.visible) continue;
      p.life -= dt;
      if (p.life <= 0) { p.sprite.visible = false; continue; }
      p.vel.y -= dt * 16;
      p.sprite.position.addScaledVector(p.vel, dt);
      p.sprite.material.opacity = Math.max(0, p.life) * 2.2;
    }
  }
}

// Dual exhaust Nitro Jet flame effect with inner cyan core & outer magenta flame
export class NitroJetSystem {
  constructor(scene) {
    this.scene = scene;
    const flameGeo = new THREE.ConeGeometry(0.14, 0.9, 12);
    flameGeo.rotateX(-Math.PI / 2);
    flameGeo.translate(0, 0, -0.45);

    const innerGeo = new THREE.ConeGeometry(0.07, 0.65, 12);
    innerGeo.rotateX(-Math.PI / 2);
    innerGeo.translate(0, 0, -0.32);

    this.flameMat = new THREE.MeshBasicMaterial({
      color: 0xff007f,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    this.innerMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.flames = [];
    for (let i = 0; i < 2; i++) {
      const outer = new THREE.Mesh(flameGeo, this.flameMat);
      const inner = new THREE.Mesh(innerGeo, this.innerMat);
      const group = new THREE.Group();
      group.add(outer);
      group.add(inner);
      group.visible = false;
      scene.add(group);
      this.flames.push(group);
    }
  }

  update(carPosition, carHeading, active, dt) {
    if (!active) {
      this.flames.forEach((f) => { f.visible = false; });
      return;
    }
    const offsets = [-0.42, 0.42];
    const t = performance.now() * 0.05;
    for (let i = 0; i < 2; i++) {
      const f = this.flames[i];
      f.visible = true;
      const pulse = 0.85 + 0.3 * Math.sin(t + i * 2);
      f.scale.set(pulse, pulse, 1.2 + 0.4 * Math.cos(t * 1.5));
      
      const pos = carPosition.clone();
      const right = new THREE.Vector3(Math.cos(carHeading), 0, -Math.sin(carHeading));
      const forward = new THREE.Vector3(Math.sin(carHeading), 0, Math.cos(carHeading));
      
      pos.addScaledVector(right, offsets[i]);
      pos.addScaledVector(forward, -2.4);
      pos.y += 0.32;
      
      f.position.copy(pos);
      f.rotation.y = carHeading;
    }
  }
}
