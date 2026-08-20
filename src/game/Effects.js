import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

// Honest scope note: real motion blur needs a per-pixel velocity buffer (comparing this frame's
// object motion to last frame's) — expensive and a much bigger change. This is the cheap, widely
// used arcade-racer approximation instead: a radial/zoom blur that samples toward the screen
// center, intensity driven by speed/nitro. It reads as "blur while going fast," which is the
// effect that actually matters for game feel, without the cost of true motion vectors.
const RadialBlurShader = {
  uniforms: { tDiffuse: { value: null }, uIntensity: { value: 0 } },
  vertexShader: `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float uIntensity;
    varying vec2 vUv;
    void main() {
      if (uIntensity <= 0.001) { gl_FragColor = texture2D(tDiffuse, vUv); return; }
      vec2 center = vec2(0.5, 0.5);
      vec2 toCenter = center - vUv;
      vec4 color = vec4(0.0);
      const int SAMPLES = 8;
      for (int i = 0; i < SAMPLES; i++) {
        float t = float(i) / float(SAMPLES - 1) * uIntensity * 0.06;
        color += texture2D(tDiffuse, vUv + toCenter * t);
      }
      gl_FragColor = color / float(SAMPLES);
    }
  `,
};

export function buildComposer(renderer, scene, camera, width, height) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(width, height), 0.85, 0.5, 0.72);
  composer.addPass(bloom);
  const motionBlur = new ShaderPass(RadialBlurShader);
  composer.addPass(motionBlur);
  composer.addPass(new OutputPass());
  return { composer, bloom, motionBlur };
}

// Lightweight drift-smoke particle system (canvas-sprite based, GPU-cheap).
export class SmokeSystem {
  constructor(scene, maxParticles = 120) {
    this.scene = scene;
    this.max = maxParticles;
    this.particles = [];
    const tex = this._smokeTexture();
    this.material = new THREE.SpriteMaterial({ map: tex, color: 0xbbbbbb, transparent: true, opacity: 0.5, depthWrite: false });
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
    g.addColorStop(0, 'rgba(255,255,255,0.7)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }

  emit(position, intensity = 1) {
    for (let i = 0; i < Math.ceil(intensity * 2); i++) {
      const p = this.pool[this._cursor];
      this._cursor = (this._cursor + 1) % this.pool.length;
      p.sprite.position.copy(position);
      p.sprite.position.x += (Math.random() - 0.5) * 0.4;
      p.sprite.position.y += Math.random() * 0.2;
      p.sprite.position.z += (Math.random() - 0.5) * 0.4;
      p.sprite.visible = true;
      p.sprite.scale.setScalar(0.4 + Math.random() * 0.3);
      p.sprite.material.opacity = 0.5;
      p.life = 0.6 + Math.random() * 0.4;
      p.vel.set((Math.random() - 0.5) * 0.6, 0.6 + Math.random() * 0.4, (Math.random() - 0.5) * 0.6);
    }
  }

  update(dt) {
    for (const p of this.pool) {
      if (!p.sprite.visible) continue;
      p.life -= dt;
      if (p.life <= 0) { p.sprite.visible = false; continue; }
      p.sprite.position.addScaledVector(p.vel, dt);
      p.sprite.scale.multiplyScalar(1 + dt * 0.8);
      p.sprite.material.opacity = Math.max(0, p.life) * 0.6;
    }
  }
}

// Bright, fast, gravity-affected spark particles for collision impacts (visually distinct from
// smoke: additive-blended, small, orange/white, short-lived, arcs downward).
export class SparkSystem {
  constructor(scene, maxParticles = 80) {
    this.scene = scene;
    const tex = this._sparkTexture();
    this.pool = [];
    for (let i = 0; i < maxParticles; i++) {
      const mat = new THREE.SpriteMaterial({ map: tex, color: 0xffb347, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
      const s = new THREE.Sprite(mat);
      s.visible = false;
      s.scale.set(0.12, 0.12, 0.12);
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
    g.addColorStop(0.4, 'rgba(255,180,70,0.9)');
    g.addColorStop(1, 'rgba(255,120,20,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(c);
  }

  emit(position, count = 10) {
    const colors = [0xffe08a, 0xffb347, 0xffffff];
    for (let i = 0; i < count; i++) {
      const p = this.pool[this._cursor];
      this._cursor = (this._cursor + 1) % this.pool.length;
      p.sprite.position.copy(position);
      p.sprite.position.y += 0.3;
      p.sprite.visible = true;
      p.sprite.material.color.setHex(colors[i % colors.length]);
      p.sprite.scale.setScalar(0.1 + Math.random() * 0.1);
      p.sprite.material.opacity = 1;
      p.life = 0.35 + Math.random() * 0.35;
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      p.vel.set(Math.cos(angle) * speed, 2 + Math.random() * 3, Math.sin(angle) * speed);
    }
  }

  update(dt) {
    for (const p of this.pool) {
      if (!p.sprite.visible) continue;
      p.life -= dt;
      if (p.life <= 0) { p.sprite.visible = false; continue; }
      p.vel.y -= dt * 14; // gravity — sparks arc down and fade, unlike rising smoke
      p.sprite.position.addScaledVector(p.vel, dt);
      p.sprite.material.opacity = Math.max(0, p.life) * 2;
    }
  }
}
