import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

export function buildComposer(renderer, scene, camera, width, height) {
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(width, height), 0.85, 0.5, 0.72);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());
  return { composer, bloom };
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
