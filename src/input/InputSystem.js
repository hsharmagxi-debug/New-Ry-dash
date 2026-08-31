/**
 * InputSystem.js
 *
 * PC + Mobile first-class input, per the project's PC + Mobile vertical-slice
 * directive: this is not "PC input downgraded for touch" — touch is a real,
 * dedicated input path (twin virtual sticks / lean-steer + thrust), built
 * alongside keyboard from day one, both feeding the same CraftInput contract.
 */

export class InputSystem {
  constructor(root = document.body) {
    this.root = root;
    this.state = { throttle: 0, brake: 0, steering: 0, boost: false, handbrakeYaw: false };
    this._keys = new Set();
    this._touchSteer = 0; // -1..1
    this._touchThrottle = 0; // -1..1 (from a thrust slider/joystick)
    this._touchBoost = false;
    this.isTouchDevice = matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;

    this._bindKeyboard();
    if (this.isTouchDevice) this._buildTouchControls();
  }

  _bindKeyboard() {
    window.addEventListener('keydown', (e) => this._keys.add(e.code));
    window.addEventListener('keyup', (e) => this._keys.delete(e.code));
  }

  _buildTouchControls() {
    const wrap = document.createElement('div');
    wrap.className = 'genesis-touch-controls';
    wrap.innerHTML = `
      <div class="genesis-touch-stick" data-role="steer">
        <div class="genesis-touch-stick-knob"></div>
      </div>
      <div class="genesis-touch-thrust">
        <button class="genesis-touch-boost" data-role="boost">BOOST</button>
        <div class="genesis-touch-throttle" data-role="throttle">
          <div class="genesis-touch-throttle-fill"></div>
        </div>
      </div>
    `;
    this.root.appendChild(wrap);

    const steerEl = wrap.querySelector('[data-role="steer"]');
    const knob = wrap.querySelector('.genesis-touch-stick-knob');
    let steerActive = false;
    let steerOriginX = 0;

    const onSteerStart = (clientX) => {
      steerActive = true;
      steerOriginX = clientX;
    };
    const onSteerMove = (clientX) => {
      if (!steerActive) return;
      const dx = clamp((clientX - steerOriginX) / 60, -1, 1);
      this._touchSteer = dx;
      knob.style.transform = `translateX(${dx * 30}px)`;
    };
    const onSteerEnd = () => {
      steerActive = false;
      this._touchSteer = 0;
      knob.style.transform = 'translateX(0)';
    };

    steerEl.addEventListener('touchstart', (e) => onSteerStart(e.touches[0].clientX), { passive: true });
    steerEl.addEventListener('touchmove', (e) => onSteerMove(e.touches[0].clientX), { passive: true });
    steerEl.addEventListener('touchend', onSteerEnd);
    steerEl.addEventListener('mousedown', (e) => onSteerStart(e.clientX));
    window.addEventListener('mousemove', (e) => onSteerMove(e.clientX));
    window.addEventListener('mouseup', onSteerEnd);

    const throttleEl = wrap.querySelector('[data-role="throttle"]');
    const fill = wrap.querySelector('.genesis-touch-throttle-fill');
    const setThrottleFromY = (clientY) => {
      const rect = throttleEl.getBoundingClientRect();
      const frac = clamp(1 - (clientY - rect.top) / rect.height, 0, 1);
      this._touchThrottle = frac;
      fill.style.height = `${frac * 100}%`;
    };
    throttleEl.addEventListener('touchstart', (e) => setThrottleFromY(e.touches[0].clientY), { passive: true });
    throttleEl.addEventListener('touchmove', (e) => setThrottleFromY(e.touches[0].clientY), { passive: true });
    throttleEl.addEventListener('touchend', () => {
      this._touchThrottle = 0;
      fill.style.height = '0%';
    });

    const boostBtn = wrap.querySelector('[data-role="boost"]');
    boostBtn.addEventListener('touchstart', () => (this._touchBoost = true), { passive: true });
    boostBtn.addEventListener('touchend', () => (this._touchBoost = false));
  }

  poll() {
    const kb = this._keys;
    let throttle = 0;
    let brake = 0;
    let steering = 0;

    if (kb.has('KeyW') || kb.has('ArrowUp')) throttle = 1;
    if (kb.has('KeyS') || kb.has('ArrowDown')) brake = 1;
    if (kb.has('KeyA') || kb.has('ArrowLeft')) steering -= 1;
    if (kb.has('KeyD') || kb.has('ArrowRight')) steering += 1;
    const boost = kb.has('ShiftLeft') || kb.has('ShiftRight') || this._touchBoost;
    const handbrakeYaw = kb.has('Space');

    if (this.isTouchDevice) {
      steering = clamp(steering + this._touchSteer, -1, 1);
      if (this._touchThrottle > 0) throttle = Math.max(throttle, this._touchThrottle);
    }

    this.state = { throttle, brake, steering, boost, handbrakeYaw };
    return this.state;
  }
}

function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}
