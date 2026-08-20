import * as THREE from 'three';

// Shared environment-reflection texture for car paint (PBR metalness/clearcoat materials render
// dark and flat without scene.environment, regardless of how many direct lights a world has —
// most of their apparent brightness comes from reflected environment light). Every world calls
// this once and assigns it to scene.environment so cars actually look glossy/lit everywhere,
// not just in the one world that originally had its own copy of this texture.
export function makeNeonEnvTexture(paletteColors) {
  const colors = paletteColors || ['#00e5ff', '#ff2e88', '#9b30ff', '#ffb347', '#39ff9d'];
  const w = 512, h = 256;
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  const grd = ctx.createLinearGradient(0, 0, 0, h);
  grd.addColorStop(0, '#05030c');
  grd.addColorStop(0.55, '#0a0620');
  grd.addColorStop(1, '#160a1a');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, w, h);
  for (let i = 0; i < 60; i++) {
    const x = Math.random() * w, y = h * 0.35 + Math.random() * h * 0.6;
    const r = 6 + Math.random() * 26;
    const col = colors[Math.floor(Math.random() * colors.length)];
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, col);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }
  ctx.globalAlpha = 1;
  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
