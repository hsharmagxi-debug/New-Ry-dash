import * as THREE from 'three';

// Local best-lap ghost: records {t,x,z,ry} samples through a race attempt and replays the
// fastest one as a translucent car you can race against. Stored per (world, car) in localStorage
// — no backend needed, works entirely offline.

const KEY_PREFIX = 'rydash_ghost_';

function ghostKey(worldId, carId) {
  return `${KEY_PREFIX}${worldId}_${carId}`;
}

export function loadGhost(worldId, carId) {
  try {
    const raw = localStorage.getItem(ghostKey(worldId, carId));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.samples) || parsed.samples.length < 2) return null;
    return parsed; // { timeMs, samples: [{t,x,z,ry}, ...] }
  } catch {
    return null;
  }
}

export function saveGhostIfBest(worldId, carId, timeMs, samples) {
  const existing = loadGhost(worldId, carId);
  if (existing && existing.timeMs <= timeMs) return false;
  localStorage.setItem(ghostKey(worldId, carId), JSON.stringify({ timeMs, samples }));
  return true;
}

export class GhostRecorder {
  constructor(sampleIntervalMs = 100) {
    this.interval = sampleIntervalMs;
    this.samples = [];
    this._lastSampleT = -Infinity;
  }
  record(elapsedMs, x, z, ry) {
    if (elapsedMs - this._lastSampleT < this.interval) return;
    this._lastSampleT = elapsedMs;
    this.samples.push({ t: elapsedMs, x, z, ry });
  }
}

export class GhostPlayer {
  constructor(rig, ghostData) {
    this.rig = rig;
    this.samples = ghostData.samples;
    this.finished = false;
    // translucent "spirit" material so it reads as a ghost, not a real opponent
    rig.group.traverse((o) => {
      if (o.isMesh) {
        o.material = o.material.clone();
        o.material.transparent = true;
        o.material.opacity = 0.38;
        o.material.depthWrite = false;
        o.castShadow = false;
        o.receiveShadow = false;
      }
    });
  }

  update(elapsedMs) {
    const s = this.samples;
    if (elapsedMs >= s[s.length - 1].t) {
      this.finished = true;
      this.rig.group.visible = false;
      return;
    }
    // binary search for the surrounding pair of samples
    let lo = 0, hi = s.length - 1;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      if (s[mid].t <= elapsedMs) lo = mid; else hi = mid;
    }
    const a = s[lo], b = s[hi];
    const span = Math.max(1, b.t - a.t);
    const f = THREE.MathUtils.clamp((elapsedMs - a.t) / span, 0, 1);
    this.rig.group.position.set(THREE.MathUtils.lerp(a.x, b.x, f), 0, THREE.MathUtils.lerp(a.z, b.z, f));
    let dh = b.ry - a.ry;
    dh = Math.atan2(Math.sin(dh), Math.cos(dh));
    this.rig.group.rotation.y = a.ry + dh * f;
  }
}
