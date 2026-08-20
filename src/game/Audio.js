/**
 * RYDASH High-Fidelity Procedural Web Audio Engine
 * Pure Web Audio API racing synthesizer:
 * - Multi-harmonic Sports Car Engine (Twin-turbo V8/V10 sound)
 * - Supercar Dual-Tone Horn (Euro dual-note F4/A4 with rich overtone)
 * - Turbo Spool & Blow-Off Valve Hiss
 * - Gear Shift Backfire / Exhaust Crackle Pops
 * - Realistic Drift Tire Screech
 * - Nitro Flame Jet Vortex
 * - Metallic Collision Impacts & Ramp Landings
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.masterGain = null;

    // Engine Nodes
    this.engineSubOsc = null;
    this.engineMainOsc = null;
    this.engineHighOsc = null;
    this.engineGain = null;
    this.engineFilter = null;
    this.engineDistortion = null;

    // Turbo Spool Nodes
    this.turboOsc = null;
    this.turboGain = null;

    // Drift Noise Nodes
    this.driftSource = null;
    this.driftGain = null;
    this.driftFilter = null;

    // Nitro Noise Nodes
    this.nitroSource = null;
    this.nitroGain = null;
    this.nitroFilter = null;

    // Horn Nodes
    this.hornOsc1 = null;
    this.hornOsc2 = null;
    this.hornGain = null;
    this.hornActive = false;

    this.initialized = false;
    this.lastGear = 1;
    this.lastThrottle = 0;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.45;
      this.masterGain.connect(this.ctx.destination);

      this._setupEngine();
      this._setupTurbo();
      this._setupDrift();
      this._setupNitro();
      this._setupHorn();

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

  _makeDistortionCurve(amount = 20) {
    const k = amount;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }

  _setupEngine() {
    if (!this.ctx) return;

    // Low sub rumble
    this.engineSubOsc = this.ctx.createOscillator();
    this.engineSubOsc.type = 'triangle';
    this.engineSubOsc.frequency.setValueAtTime(45, this.ctx.currentTime);

    // Main roar
    this.engineMainOsc = this.ctx.createOscillator();
    this.engineMainOsc.type = 'sawtooth';
    this.engineMainOsc.frequency.setValueAtTime(90, this.ctx.currentTime);

    // High formant harmonic
    this.engineHighOsc = this.ctx.createOscillator();
    this.engineHighOsc.type = 'sawtooth';
    this.engineHighOsc.frequency.setValueAtTime(180, this.ctx.currentTime);

    // Waveshaper distortion for aggressive race-car growl
    this.engineDistortion = this.ctx.createWaveShaper();
    this.engineDistortion.curve = this._makeDistortionCurve(18);
    this.engineDistortion.oversample = '2x';

    // Dynamic lowpass filter
    this.engineFilter = this.ctx.createBiquadFilter();
    this.engineFilter.type = 'lowpass';
    this.engineFilter.frequency.setValueAtTime(380, this.ctx.currentTime);
    this.engineFilter.Q.setValueAtTime(2.2, this.ctx.currentTime);

    this.engineGain = this.ctx.createGain();
    this.engineGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.engineSubOsc.connect(this.engineFilter);
    this.engineMainOsc.connect(this.engineDistortion);
    this.engineHighOsc.connect(this.engineDistortion);
    this.engineDistortion.connect(this.engineFilter);

    this.engineFilter.connect(this.engineGain);
    this.engineGain.connect(this.masterGain);

    this.engineSubOsc.start();
    this.engineMainOsc.start();
    this.engineHighOsc.start();
  }

  _setupTurbo() {
    if (!this.ctx) return;
    this.turboOsc = this.ctx.createOscillator();
    this.turboOsc.type = 'sine';
    this.turboOsc.frequency.setValueAtTime(1200, this.ctx.currentTime);

    this.turboGain = this.ctx.createGain();
    this.turboGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.turboOsc.connect(this.turboGain);
    this.turboGain.connect(this.masterGain);
    this.turboOsc.start();
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
    this.driftFilter.frequency.setValueAtTime(1500, this.ctx.currentTime);
    this.driftFilter.Q.setValueAtTime(3.8, this.ctx.currentTime);

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

    this.nitroFilter = this.ctx.createBiquadFilter();
    this.nitroFilter.type = 'lowpass';
    this.nitroFilter.frequency.setValueAtTime(950, this.ctx.currentTime);

    this.nitroGain = this.ctx.createGain();
    this.nitroGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.nitroSource.connect(this.nitroFilter);
    this.nitroFilter.connect(this.nitroGain);
    this.nitroGain.connect(this.masterGain);
    this.nitroSource.start();
  }

  _setupHorn() {
    if (!this.ctx) return;
    // Supercar Dual-Tone Horn (F4 349.23Hz + A4 440.00Hz with slight harmonic overtone)
    this.hornOsc1 = this.ctx.createOscillator();
    this.hornOsc1.type = 'sawtooth';
    this.hornOsc1.frequency.setValueAtTime(349.23, this.ctx.currentTime);

    this.hornOsc2 = this.ctx.createOscillator();
    this.hornOsc2.type = 'sawtooth';
    this.hornOsc2.frequency.setValueAtTime(440.0, this.ctx.currentTime);

    const hornFilter = this.ctx.createBiquadFilter();
    hornFilter.type = 'lowpass';
    hornFilter.frequency.setValueAtTime(2400, this.ctx.currentTime);

    this.hornGain = this.ctx.createGain();
    this.hornGain.gain.setValueAtTime(0, this.ctx.currentTime);

    this.hornOsc1.connect(hornFilter);
    this.hornOsc2.connect(hornFilter);
    hornFilter.connect(this.hornGain);
    this.hornGain.connect(this.masterGain);

    this.hornOsc1.start();
    this.hornOsc2.start();
  }

  startHorn() {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    this._ensureContext();
    if (this.hornActive) return;
    this.hornActive = true;
    const now = this.ctx.currentTime;
    this.hornGain.gain.cancelScheduledValues(now);
    this.hornGain.gain.setValueAtTime(this.hornGain.gain.value, now);
    this.hornGain.gain.linearRampToValueAtTime(0.35, now + 0.04);
  }

  stopHorn() {
    if (!this.initialized || !this.ctx || !this.hornActive) return;
    this.hornActive = false;
    const now = this.ctx.currentTime;
    this.hornGain.gain.cancelScheduledValues(now);
    this.hornGain.gain.setValueAtTime(this.hornGain.gain.value, now);
    this.hornGain.gain.linearRampToValueAtTime(0.0001, now + 0.08);
  }

  setEnabled(val) {
    this.enabled = val;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(val ? 0.45 : 0, this.ctx.currentTime, 0.05);
    }
  }

  startEngine() {
    this._ensureContext();
    if (this.engineGain && this.ctx) {
      this.engineGain.gain.setTargetAtTime(0.12, this.ctx.currentTime, 0.1);
    }
  }

  updateEngine(speedKmh, rpm = 3000, throttleInput = 1, nitroActive = false) {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    const now = this.ctx.currentTime;

    const rpmFrac = Math.max(0.1, Math.min(1.0, rpm / 8500));
    const subFreq = 35 + rpmFrac * 85;
    const mainFreq = 70 + rpmFrac * 220;
    const highFreq = 140 + rpmFrac * 440;

    const filterFreq = 320 + rpmFrac * 1600 + (nitroActive ? 600 : 0);
    const targetGain = 0.08 + rpmFrac * 0.16 + (Math.abs(throttleInput) > 0.05 ? 0.06 : 0) + (nitroActive ? 0.08 : 0);

    this.engineSubOsc?.frequency.setTargetAtTime(subFreq, now, 0.05);
    this.engineMainOsc?.frequency.setTargetAtTime(mainFreq, now, 0.05);
    this.engineHighOsc?.frequency.setTargetAtTime(highFreq, now, 0.05);
    this.engineFilter?.frequency.setTargetAtTime(filterFreq, now, 0.06);
    this.engineGain?.gain.setTargetAtTime(targetGain, now, 0.05);

    // Turbo spool whistle
    const turboGain = throttleInput > 0.3 ? rpmFrac * 0.09 : 0;
    const turboFreq = 1000 + rpmFrac * 2600;
    this.turboOsc?.frequency.setTargetAtTime(turboFreq, now, 0.1);
    this.turboGain?.gain.setTargetAtTime(turboGain, now, 0.08);

    // Blow-off valve release hiss when abruptly lifting off throttle at high RPM
    if (this.lastThrottle > 0.6 && throttleInput < 0.1 && rpm > 4500) {
      this.playBlowOffValve();
    }
    this.lastThrottle = throttleInput;
  }

  playGearShift() {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    this._ensureContext();
    const now = this.ctx.currentTime;

    // Exhaust crackle pop
    const noiseBuffer = this._createNoiseBuffer();
    if (!noiseBuffer) return;
    const src = this.ctx.createBufferSource();
    src.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(450, now);
    filter.Q.setValueAtTime(2.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    src.start(now);
    src.stop(now + 0.15);
  }

  playBlowOffValve() {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    this._ensureContext();
    const now = this.ctx.currentTime;
    const noiseBuffer = this._createNoiseBuffer();
    if (!noiseBuffer) return;

    const src = this.ctx.createBufferSource();
    src.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + 0.28);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    src.start(now);
    src.stop(now + 0.29);
  }

  stopEngine() {
    if (!this.initialized || !this.ctx) return;
    this.engineGain?.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    this.turboGain?.gain.setTargetAtTime(0, this.ctx.currentTime, 0.1);
    this.stopHorn();
  }

  updateDrift(driftFactor) {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    const gain = driftFactor > 0.18 ? Math.min(0.28, (driftFactor - 0.18) * 0.5) : 0;
    this.driftGain?.gain.setTargetAtTime(gain, this.ctx.currentTime, 0.04);
  }

  updateNitro(nitroActive) {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    const gain = nitroActive ? 0.24 : 0;
    this.nitroGain?.gain.setTargetAtTime(gain, this.ctx.currentTime, 0.06);
  }

  playImpact(strength = 1) {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    this._ensureContext();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 0.28);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);

    gain.gain.setValueAtTime(Math.min(0.55, 0.25 * strength), now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.29);
  }

  playPickup() {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    this._ensureContext();
    const now = this.ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);
      gain.gain.setValueAtTime(0.2, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.22);
      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.23);
    });
  }

  playCountdown(isGo = false) {
    if (!this.initialized || !this.enabled || !this.ctx) return;
    this._ensureContext();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(isGo ? 987.77 : 493.88, now); // B5 (Go) / B4 (Beep)
    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (isGo ? 0.7 : 0.26));
    osc.connect(gain);
    gain.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + (isGo ? 0.72 : 0.27));
  }
}

export const sound = new SoundEngine();
