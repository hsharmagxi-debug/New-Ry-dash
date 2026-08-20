/**
 * RYDASH Procedural Web Audio Engine
 * Lightweight, zero-asset sound synthesizer for racing audio:
 * - Engine pitch modulation (RPM / speed)
 * - Drift tire screech (filtered noise)
 * - Nitro boost flame whoosh
 * - Collision impacts & landings
 * - Nitro pickup chimes
 * - Countdown tones
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.masterGain = null;

    // Engine sound nodes
    this.engineOsc = null;
    this.engineGain = null;
    this.engineFilter = null;

    // Drift noise nodes
    this.driftSource = null;
    this.driftGain = null;
    this.driftFilter = null;

    // Nitro noise nodes
    this.nitroSource = null;
    this.nitroGain = null;

    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.4;
      this.masterGain.connect(this.ctx.destination);
      this._setupEngine();
      this._setupDrift();
      this._setupNitro();
      this.initialized = true;
    } catch (e) {
      console.warn('[RYDASH Sound] Web Audio init failed:', e);
    }
  }

  _ensureContext() {
    if (!this.initialized) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  _setupEngine() {
    if (!this.ctx) return;
    this.engineOsc = this.ctx.createOscillator();
    this.engineOsc.type = 'sawtooth';
    this.engineOsc.frequency.setValueAtTime(55, this.ctx.currentTime);

    this.engineFilter = this.ctx.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.setValueAtTime(320, this.ctx.currentTime);

    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.engineOsc.connect(this.engineFilter);
    this.engineFilter.connect(this.engineGain);
    this.engineGain.connect(this.masterGain);
    this.engineOsc.start();
  }

  _createNoiseBuffer() {
    if (!this.ctx) return null;
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  _setupDrift() {
    if (!this.ctx) return;
    const noiseBuffer = this._createNoiseBuffer();
    this.driftSource = this.ctx.createBufferSource();
    this.driftSource.buffer = noiseBuffer;
    this.driftSource.loop = true;

    this.driftFilter = this.ctx.createBiquadFilter();
    this.driftFilter.type = 'bandpass';
    this.driftFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);
    this.driftFilter.Q.setValueAtTime(3.0, this.ctx.currentTime);

    this.driftGain = this.ctx.createGain();
    this.driftGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.driftSource.connect(this.driftFilter);
    this.driftFilter.connect(this.driftGain);
    this.driftGain.connect(this.masterGain);
    this.driftSource.start();
  }

  _setupNitro() {
    if (!this.ctx) return;
    const noiseBuffer = this._createNoiseBuffer();
    this.nitroSource = this.ctx.createBufferSource();
    this.nitroSource.buffer = noiseBuffer;
    this.nitroSource.loop = true;

    const nitroFilter = this.ctx.createBiquadFilter();
    nitroFilter.type = 'lowpass';
    nitroFilter.frequency.setValueAtTime(800, this.ctx.currentTime);

    this.nitroGain = this.ctx.createGain();
    this.nitroGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.nitroSource.connect(nitroFilter);
    nitroFilter.connect(this.nitroGain);
    this.nitroGain.connect(this.masterGain);
    this.nitroSource.start();
  }

  setEnabled(val) {
    this.enabled = val;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(val ? 0.4 : 0, this.ctx.currentTime, 0.05);
    }
  }

  updateEngine(speedKmh, throttleInput, nitroActive) {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const normSpeed = Math.min(1, speedKmh / 280);
    const targetFreq = 45 + normSpeed * 190 + (throttleInput > 0 ? 30 : 0) + (nitroActive ? 60 : 0);
    const targetFilter = 250 + normSpeed * 650 + (nitroActive ? 300 : 0);
    const targetGain = 0.06 + normSpeed * 0.14 + (Math.abs(throttleInput) > 0.05 ? 0.08 : 0);

    this.engineOsc.frequency.setTargetAtTime(targetFreq, now, 0.08);
    this.engineFilter.frequency.setTargetAtTime(targetFilter, now, 0.08);
    this.engineGain.gain.setTargetAtTime(targetGain, now, 0.08);
  }

  stopEngine() {
    if (!this.initialized || !this.ctx) return;
    this.engineGain?.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
  }

  updateDrift(driftFactor) {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    const gain = driftFactor > 0.2 ? Math.min(0.22, (driftFactor - 0.2) * 0.4) : 0;
    this.driftGain?.gain.setTargetAtTime(gain, this.ctx.currentTime, 0.05);
  }

  updateNitro(nitroActive) {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    const gain = nitroActive ? 0.18 : 0;
    this.nitroGain?.gain.setTargetAtTime(gain, this.ctx.currentTime, 0.08);
  }

  playImpact(strength = 1) {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    this._ensureContext();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(30, now + 0.25);
    gain.gain.setValueAtTime(Math.min(0.5, 0.2 * strength), now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  playPickup() {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    this._ensureContext();
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);
      gain.gain.setValueAtTime(0.18, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.2);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.21);
    });
  }

  playCountdown(isGo = false) {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    this._ensureContext();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isGo ? 880 : 440, now);
    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (isGo ? 0.6 : 0.25));
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + (isGo ? 0.62 : 0.26));
  }
}

export const sound = new SoundEngine();
