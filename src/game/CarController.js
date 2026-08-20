import * as THREE from 'three';

// Arcade-style high-performance car controller with realistic drift slip,
// torque-curve acceleration, responsive braking, and collision impulses.
export class CarController {
  constructor(carRig, statDef, options = {}) {
    this.rig = carRig; // { group, wheels, headlights, taillights, underGlow, exhaustPositions }
    this.stat = statDef || { topSpeed: 0.9, accel: 0.9, handling: 0.9, nitro: 0.9 };
    this.isPlayer = options.isPlayer ?? false;
    this.trackCurve = options.trackCurve || null;
    this.trackWidth = options.trackWidth || 20;

    this.position = new THREE.Vector3();
    this.velocity = new THREE.Vector3();
    this.heading = 0; // radians
    this.speed = 0; // forward speed (world units / s)
    this.lateralSpeed = 0; // sideways drift velocity
    this.steerInput = 0; // -1..1
    this.throttleInput = 0; // -1..1 (reverse negative)
    this.handbrake = false;
    this.nitroActive = false;
    this.nitro = 1; // 0..1
    this.driftFactor = 0; // visual slip amount (0..1)
    this.driftAngle = 0; // angle between heading and velocity
    this.driftScore = 0;
    this.wheelSpin = 0;

    this.maxSpeed = 48 + this.stat.topSpeed * 44; // ~190-330 km/h
    this.accelRate = 18 + this.stat.accel * 26;
    this.brakeRate = 52;
    this.turnRate = 2.0 + this.stat.handling * 1.5;
    this.grip = 0.88 + this.stat.handling * 0.12;

    this.gear = 1;
    this.rpm = 900;
    this.lastSpeed = 0;
    this.suspensionPitch = 0;

    this.lap = 1;
    this.nextCP = 1;
    this.trackT = 0;
    this.finished = false;
    this.finishTimeMs = 0;

    this.airborne = false;
    this.verticalVelocity = 0;
    this.groundY = 0;
    this.justLanded = false;

    // Collision bounce impulse
    this.collisionImpulse = new THREE.Vector3();
  }

  launch(verticalSpeed, forwardBoost = 0) {
    if (this.airborne) return;
    this.airborne = true;
    this.verticalVelocity = verticalSpeed;
    this.speed += forwardBoost;
  }

  setStartTransform(pos, headingRad) {
    this.position.copy(pos);
    this.heading = headingRad;
    this.rig.group.position.copy(pos);
    this.rig.group.rotation.y = headingRad;
  }

  applyPlayerInput(input, dt) {
    this.throttleInput = input.gas ? 1 : (input.brake ? -1 : 0);
    this.steerInput = input.steer || 0;
    this.handbrake = Boolean(input.handbrake);
    this.nitroActive = Boolean(input.nitro) && this.nitro > 0.03;
  }

  applyCollisionImpulse(impulseVec, speedPenalty = 0.85) {
    this.collisionImpulse.add(impulseVec);
    this.speed *= speedPenalty;
  }

  step(dt) {
    // 1. Nitro management
    if (this.nitroActive) {
      this.nitro = Math.max(0, this.nitro - dt * 0.45);
    } else {
      // Passive recharge + drift recharge bonus
      const driftBonus = this.driftFactor > 0.25 ? dt * 0.28 : 0;
      this.nitro = Math.min(1, this.nitro + dt * 0.08 + driftBonus);
    }
    const nitroBoost = this.nitroActive ? 1.48 : 1.0;
    const targetMax = this.maxSpeed * nitroBoost;

    // 2. Dynamic Gear & RPM simulation
    const speedMagnitude = Math.abs(this.speed);
    const speedRatio = THREE.MathUtils.clamp(speedMagnitude / targetMax, 0, 1);
    
    if (this.speed < -0.5) {
      this.gear = 'R';
      this.rpm = 1200 + THREE.MathUtils.clamp(-this.speed / 15, 0, 1) * 4500;
    } else {
      // 6-speed progression
      const gearSteps = [0, 0.15, 0.32, 0.52, 0.72, 0.88, 1.0];
      for (let g = 1; g <= 6; g++) {
        if (speedRatio <= gearSteps[g] || g === 6) {
          this.gear = g;
          const prevStep = gearSteps[g - 1];
          const nextStep = gearSteps[g];
          const inGearFrac = THREE.MathUtils.clamp((speedRatio - prevStep) / (nextStep - prevStep || 0.1), 0, 1);
          this.rpm = 2500 + inGearFrac * 5800 + (this.nitroActive ? 600 : 0);
          break;
        }
      }
    }

    // 3. Torque curve & Acceleration
    const torqueMult = this.gear === 1 ? 1.35 : this.gear === 2 ? 1.2 : this.gear === 3 ? 1.05 : 0.95;
    if (this.throttleInput > 0) {
      this.speed += this.accelRate * torqueMult * nitroBoost * dt * this.throttleInput;
    } else if (this.throttleInput < 0) {
      if (this.speed > 0.8) {
        // High-bite foot braking
        this.speed -= this.brakeRate * dt;
      } else {
        // Reversing
        this.speed -= this.accelRate * 0.6 * dt;
      }
    } else {
      // Natural engine braking / rolling friction
      this.speed -= Math.sign(this.speed) * 7.5 * dt;
      if (Math.abs(this.speed) < 0.2) this.speed = 0;
    }

    if (this.handbrake) {
      // Handbrake initiates drift slide & scrubs forward speed progressively
      this.speed -= Math.sign(this.speed) * 22 * dt;
    }
    this.speed = THREE.MathUtils.clamp(this.speed, -this.maxSpeed * 0.35, targetMax);

    // 4. Steering & High-Speed Turn Dynamics
    const steerResponsiveness = THREE.MathUtils.clamp(speedMagnitude / 8, 0, 1);
    const highSpeedDamping = THREE.MathUtils.clamp(1.0 - (speedMagnitude / this.maxSpeed) * 0.28, 0.7, 1.0);
    const steerAmount = this.steerInput * this.turnRate * steerResponsiveness * highSpeedDamping * dt * (this.speed < -0.2 ? -1 : 1);

    if (speedMagnitude > 0.05) {
      this.heading += steerAmount * (this.handbrake ? 1.45 : 1.0);
    }

    // 5. Believable Drift Physics (Lateral Slip & Counter-Steer)
    const wantsDrift = (this.handbrake || (this.nitroActive && Math.abs(this.steerInput) > 0.5)) && speedMagnitude > 12;
    const targetDriftFactor = wantsDrift
      ? THREE.MathUtils.clamp(Math.abs(this.steerInput) * 0.75 + 0.2, 0.2, 0.95)
      : 0;

    this.driftFactor += (targetDriftFactor - this.driftFactor) * Math.min(1, dt * 7);

    // Lateral slip vector
    const right = new THREE.Vector3(Math.cos(this.heading), 0, -Math.sin(this.heading));
    const forward = new THREE.Vector3(Math.sin(this.heading), 0, Math.cos(this.heading));

    const targetLateralSpeed = this.driftFactor > 0.1
      ? -this.steerInput * this.driftFactor * (this.speed * 0.42)
      : 0;
    this.lateralSpeed += (targetLateralSpeed - this.lateralSpeed) * Math.min(1, dt * 6);

    // Position integration
    this.position.addScaledVector(forward, this.speed * dt);
    this.position.addScaledVector(right, this.lateralSpeed * dt);

    // Apply & decay collision impulse
    if (this.collisionImpulse.lengthSq() > 0.001) {
      this.position.addScaledVector(this.collisionImpulse, dt);
      this.collisionImpulse.multiplyScalar(Math.max(0, 1 - dt * 9));
    }

    // 6. Airborne / Jumps / Gravity
    this.justLanded = false;
    if (this.airborne) {
      const GRAVITY = 52;
      this.verticalVelocity -= GRAVITY * dt;
      this.position.y += this.verticalVelocity * dt;
      if (this.position.y <= this.groundY) {
        this.position.y = this.groundY;
        this.airborne = false;
        this.verticalVelocity = 0;
        this.justLanded = true;
      }
    } else {
      this.position.y = this.groundY;
    }

    // 7. Visual Rig Transforms & Weight Transfer
    this.wheelSpin += (this.speed / 0.36) * dt;
    this.rig.group.position.copy(this.position);

    // Roll banking into turns (leans out slightly on normal grip, in on aggressive drift)
    const rollTarget = -this.steerInput * 0.055 * THREE.MathUtils.clamp(speedMagnitude / 30, 0, 1);
    this.rig.group.rotation.z += (rollTarget - this.rig.group.rotation.z) * Math.min(1, dt * 6);

    // Yaw heading with drift angle visual offset
    const visualYaw = this.heading + (this.driftFactor > 0.05 ? -this.steerInput * this.driftFactor * 0.48 : 0);
    this.rig.group.rotation.y = visualYaw;

    // Pitch suspension squat on acceleration, dive on braking
    const longAccel = dt > 0 ? (this.speed - this.lastSpeed) / dt : 0;
    this.lastSpeed = this.speed;
    const suspensionTarget = THREE.MathUtils.clamp(-longAccel * 0.0055, -0.06, 0.06);
    this.suspensionPitch += (suspensionTarget - this.suspensionPitch) * Math.min(1, dt * 6);

    const pitchTarget = this.airborne
      ? THREE.MathUtils.clamp(this.verticalVelocity * 0.022, -0.32, 0.22)
      : this.suspensionPitch;
    this.rig.group.rotation.x += (pitchTarget - this.rig.group.rotation.x) * Math.min(1, dt * 5);

    // 8. Brake Lights Flare
    if (this.rig.taillights && this.rig.taillights[0]) {
      const isBraking = this.throttleInput < -0.05 || this.handbrake;
      const targetIntensity = isBraking ? 5.2 : 2.5;
      const mat = this.rig.taillights[0].material;
      mat.emissiveIntensity += (targetIntensity - mat.emissiveIntensity) * Math.min(1, dt * 12);
    }

    // 9. Wheel Steer Angles
    if (this.rig.wheels) {
      const frontSteer = this.steerInput * 0.52;
      [this.rig.wheels.fl, this.rig.wheels.fr].forEach((w) => {
        if (w) w.rotation.y = frontSteer;
      });
      Object.values(this.rig.wheels).forEach((w) => {
        if (w && w.children[0]) w.children[0].rotation.x = this.wheelSpin;
      });
    }

    // 10. Underglow Intensity Surge with Nitro
    if (this.rig.underGlow) {
      this.rig.underGlow.intensity = this.nitroActive ? 1.8 : 0.65;
    }
  }

  get speedKmh() {
    return Math.abs(this.speed) * 3.25;
  }
}

// AI Driver: follows curve with aggressive rubber-banding & passing behavior
export class AIDriver {
  constructor(controller, curve, options = {}) {
    this.controller = controller;
    this.curve = curve;
    this.t = options.tOffset || 0;
    this.targetSpeedKmh = options.targetSpeedKmh || 260;
    this.aggro = options.aggro || 0.85;
    this.laneOffset = (Math.random() - 0.5) * 4.0;
  }

  step(dt) {
    const speedFrac = THREE.MathUtils.clamp(this.targetSpeedKmh / 280, 0.7, 1.35);
    const progressSpeed = 0.019 * this.aggro * speedFrac;
    this.t = (this.t + progressSpeed * dt) % 1;

    const point = this.curve.getPointAt(this.t);
    const tangent = this.curve.getTangentAt(this.t);
    const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

    const targetPos = point.clone().addScaledVector(normal, this.laneOffset);
    const toTarget = targetPos.clone().sub(this.controller.position);
    const desiredHeading = Math.atan2(toTarget.x, toTarget.z);

    let diff = desiredHeading - this.controller.heading;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));

    const dist = toTarget.length();
    this.controller.applyPlayerInput({
      gas: dist > 1.5 ? 1 : 0.5,
      brake: dist < 0.5,
      steer: THREE.MathUtils.clamp(diff * 1.6, -1, 1),
      handbrake: Math.abs(diff) > 0.85 && this.controller.speedKmh > 100,
      nitro: Math.random() > 0.988,
    }, dt);
  }
}

