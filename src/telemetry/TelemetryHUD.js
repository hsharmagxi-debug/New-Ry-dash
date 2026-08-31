/**
 * TelemetryHUD.js
 *
 * Debug-only telemetry overlay (constitution §18/execution prompt §18).
 * Explicitly NOT final game UI — toggleable, plain, instrumentation-first.
 * Responsive for both PC (dense readout) and mobile (compact strip) per
 * the PC + Mobile first-class directive.
 */
export class TelemetryHUD {
  constructor(root = document.body) {
    this.visible = true;
    this.el = document.createElement('div');
    this.el.className = 'genesis-hud';
    root.appendChild(this.el);

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Backquote') this.toggle();
    });
  }

  toggle() {
    this.visible = !this.visible;
    this.el.style.display = this.visible ? 'grid' : 'none';
  }

  /**
   * @param {import('../domain/CraftSimulationInterface.js').CraftState} state
   * @param {import('../domain/CraftSimulationInterface.js').CraftTelemetry} t
   * @param {{frameMs:number, physicsMs:number, fov:number}} perf
   */
  update(state, t, perf) {
    if (!this.visible) return;
    this.el.innerHTML = `
      <div class="genesis-hud-row genesis-hud-speed">
        <span class="genesis-hud-value">${t.speedKmh.toFixed(0)}</span>
        <span class="genesis-hud-unit">km/h</span>
        <span class="genesis-hud-band">${t.speedBand.replace('sb-', '')}</span>
      </div>
      <div class="genesis-hud-grid">
        ${hudCell('THROTTLE/BRAKE', `${(state.acceleration[2] / 9.81).toFixed(2)} g`)}
        ${hudCell('LAT G', t.lateralG.toFixed(2))}
        ${hudCell('LONG G', t.longitudinalG.toFixed(2))}
        ${hudCell('SLIP', `${(state.slip * 100).toFixed(0)}%`)}
        ${hudCell('YAW RATE', `${state.yawRate.toFixed(2)} r/s`)}
        ${hudCell('SUSPENSION', `${(state.suspensionTravel * 100).toFixed(0)}%`)}
        ${hudCell('BOOST', `${(state.boostEnergy * 100).toFixed(0)}%`)}
        ${hudCell('AIRBORNE', state.airborne ? 'YES' : 'no')}
        ${hudCell('FOV', perf.fov.toFixed(1))}
        ${hudCell('FRAME', `${perf.frameMs.toFixed(1)} ms`)}
        ${hudCell('PHYSICS', `${perf.physicsMs.toFixed(2)} ms`)}
      </div>
    `;
  }
}

function hudCell(label, value) {
  return `<div class="genesis-hud-cell"><b>${value}</b><small>${label}</small></div>`;
}
