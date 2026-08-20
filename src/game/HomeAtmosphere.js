/**
 * HomeAtmosphere.js
 * High-performance 60fps 2D/Canvas atmospheric background engine for RYDASH
 * Renders 8 distinct environmental concepts with live animations:
 * 1. Neon Rain City (Rain, wet road reflections, flickering neon signs, lightning, traffic)
 * 2. Sunset Highway (Golden-hour sunset, mountains, drifting clouds, sun flare, highway cars)
 * 3. Vertical Mega-City (Skyscrapers, flying vehicles, holographic billboards, sky-trains)
 * 4. Neon Desert (Desert dunes, glowing futuristic towers, blowing sand, shooting stars)
 * 5. Night Coastal Highway (Ocean waves, moonlight reflection, suspension bridge, lighthouse)
 * 6. Underground District (Tunnel arches, steam pipes, neon graffiti, hazard lights, sparks)
 * 7. Rooftop City Racing (Sky-high rooftops, jump ramps, searchlights, flying drones)
 * 8. Electric Storm City (Purple storm clouds, violent lightning bolts, heavy rain, fog)
 */

export class HomeAtmosphere {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.worldId = 'neon';
    this.running = false;
    this.animId = null;
    this.width = 0;
    this.height = 0;
    this.time = 0;
    this.lastTime = performance.now();

    // World-specific state
    this.rainDrops = [];
    this.trafficCars = [];
    this.clouds = [];
    this.particles = [];
    this.flyingVehicles = [];
    this.lightningTimer = 4.0;
    this.lightningAlpha = 0;
    this.lightningBolts = [];
    this.sparks = [];
    this.steamPlumes = [];
    this.searchlights = [];

    this._initParticles();
    this._onResize = this._onResize.bind(this);
    window.addEventListener('resize', this._onResize);
    this._onResize();
  }

  _onResize() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement ? this.canvas.parentElement.getBoundingClientRect() : { width: window.innerWidth, height: window.innerHeight };
    this.width = this.canvas.width = Math.max(rect.width, 320);
    this.height = this.canvas.height = Math.max(rect.height, 320);
    this._initParticles();
  }

  setWorld(worldId) {
    this.worldId = worldId || 'neon';
    this.time = 0;
    this.lightningAlpha = 0;
    this._initParticles();
  }

  _initParticles() {
    const w = this.width || 1200;
    const h = this.height || 800;

    // Rain
    this.rainDrops = [];
    for (let i = 0; i < 180; i++) {
      this.rainDrops.push({
        x: Math.random() * w,
        y: Math.random() * h,
        len: 15 + Math.random() * 25,
        speed: 18 + Math.random() * 14,
        alpha: 0.2 + Math.random() * 0.5,
        thick: 1 + Math.random() * 1.2
      });
    }

    // Traffic cars
    this.trafficCars = [];
    for (let i = 0; i < 7; i++) {
      this.trafficCars.push({
        x: Math.random() * w,
        y: h * 0.72 + (Math.random() * 60 - 30),
        speed: (Math.random() > 0.5 ? 1 : -1) * (1.5 + Math.random() * 3.5),
        color: Math.random() > 0.4 ? '#ff2a6d' : '#00e5ff',
        len: 20 + Math.random() * 25
      });
    }

    // Clouds for sunset
    this.clouds = [];
    for (let i = 0; i < 6; i++) {
      this.clouds.push({
        x: Math.random() * w,
        y: 40 + Math.random() * (h * 0.35),
        radius: 80 + Math.random() * 140,
        speed: 0.15 + Math.random() * 0.25,
        alpha: 0.15 + Math.random() * 0.25
      });
    }

    // Flying vehicles for vertical mega-city & rooftop
    this.flyingVehicles = [];
    for (let i = 0; i < 8; i++) {
      this.flyingVehicles.push({
        x: Math.random() * w,
        y: 60 + Math.random() * (h * 0.5),
        speed: (Math.random() > 0.5 ? 1 : -1) * (2.0 + Math.random() * 4.0),
        color: Math.random() > 0.5 ? '#00e5ff' : '#ffb02e',
        trailLen: 40 + Math.random() * 60
      });
    }

    // Floating particles (sand / sea spray / dust / embers)
    this.particles = [];
    for (let i = 0; i < 70; i++) {
      this.particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.2,
        size: 1 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.6
      });
    }

    // Searchlights
    this.searchlights = [
      { x: w * 0.2, angle: -0.3, speed: 0.008, color: 'rgba(0, 229, 255, 0.15)' },
      { x: w * 0.5, angle: 0.2, speed: -0.006, color: 'rgba(255, 46, 136, 0.12)' },
      { x: w * 0.8, angle: -0.1, speed: 0.007, color: 'rgba(184, 75, 255, 0.15)' }
    ];
  }

  start() {
    if (this.running) return;
    this.running = true;
    this.lastTime = performance.now();
    const loop = (now) => {
      if (!this.running) return;
      const dt = Math.min((now - this.lastTime) / 1000, 0.1);
      this.lastTime = now;
      this.time += dt;
      this.update(dt);
      this.render();
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  stop() {
    this.running = false;
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  destroy() {
    this.stop();
    window.removeEventListener('resize', this._onResize);
  }

  update(dt) {
    const w = this.width;
    const h = this.height;

    // Update rain
    if (this.worldId === 'neon' || this.worldId === 'storm') {
      const angle = this.worldId === 'storm' ? 0.35 : 0.12;
      for (const d of this.rainDrops) {
        d.y += d.speed * (this.worldId === 'storm' ? 1.4 : 1.0);
        d.x += d.speed * angle;
        if (d.y > h) {
          d.y = -d.len;
          d.x = Math.random() * w;
        }
        if (d.x > w) d.x = 0;
      }
    }

    // Lightning
    if (this.worldId === 'neon' || this.worldId === 'storm') {
      this.lightningTimer -= dt;
      if (this.lightningTimer <= 0) {
        this.lightningAlpha = 0.85;
        this.lightningTimer = this.worldId === 'storm' ? (1.5 + Math.random() * 3.5) : (4.0 + Math.random() * 6.0);
        this._generateLightningBolts();
      }
      if (this.lightningAlpha > 0) {
        this.lightningAlpha -= dt * 3.5;
        if (this.lightningAlpha < 0) this.lightningAlpha = 0;
      }
    }

    // Traffic
    for (const c of this.trafficCars) {
      c.x += c.speed;
      if (c.speed > 0 && c.x > w + 60) c.x = -60;
      if (c.speed < 0 && c.x < -60) c.x = w + 60;
    }

    // Flying vehicles
    for (const f of this.flyingVehicles) {
      f.x += f.speed;
      if (f.speed > 0 && f.x > w + 100) f.x = -100;
      if (f.speed < 0 && f.x < -100) f.x = w + 100;
    }

    // Clouds
    for (const cl of this.clouds) {
      cl.x += cl.speed;
      if (cl.x - cl.radius > w) cl.x = -cl.radius;
    }

    // Particles
    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = w;
      if (p.x > w) p.x = 0;
      if (p.y < 0) p.y = h;
      if (p.y > h) p.y = 0;
    }

    // Searchlights
    for (const s of this.searchlights) {
      s.angle += s.speed;
      if (Math.abs(s.angle) > 0.45) s.speed *= -1;
    }
  }

  _generateLightningBolts() {
    const w = this.width;
    const h = this.height;
    this.lightningBolts = [];
    const count = 1 + Math.floor(Math.random() * 2);
    for (let b = 0; b < count; b++) {
      const startX = w * (0.2 + Math.random() * 0.6);
      let curX = startX;
      let curY = 0;
      const points = [{ x: curX, y: curY }];
      while (curY < h * 0.65) {
        curY += 20 + Math.random() * 30;
        curX += (Math.random() - 0.5) * 60;
        points.push({ x: curX, y: curY });
      }
      this.lightningBolts.push(points);
    }
  }

  render() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;
    if (!ctx || w === 0 || h === 0) return;

    ctx.clearRect(0, 0, w, h);

    switch (this.worldId) {
      case 'sunset':
        this._renderSunset(ctx, w, h);
        break;
      case 'desert':
        this._renderDesert(ctx, w, h);
        break;
      case 'vertical':
        this._renderVertical(ctx, w, h);
        break;
      case 'coastal':
        this._renderCoastal(ctx, w, h);
        break;
      case 'underground':
        this._renderUnderground(ctx, w, h);
        break;
      case 'rooftop':
        this._renderRooftop(ctx, w, h);
        break;
      case 'storm':
        this._renderStorm(ctx, w, h);
        break;
      case 'neon':
      default:
        this._renderNeonCity(ctx, w, h);
        break;
    }
  }

  /* ------------------- 01 NEON RAIN CITY (RYDASH) ------------------- */
  _renderNeonCity(ctx, w, h) {
    // Lightning Flash over the background
    if (this.lightningAlpha > 0) {
      ctx.fillStyle = `rgba(180, 220, 255, ${this.lightningAlpha * 0.35})`;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.lightningAlpha})`;
      ctx.lineWidth = 2.5;
      for (const bolt of this.lightningBolts) {
        ctx.beginPath();
        for (let i = 0; i < bolt.length; i++) {
          if (i === 0) ctx.moveTo(bolt[i].x, bolt[i].y);
          else ctx.lineTo(bolt[i].x, bolt[i].y);
        }
        ctx.stroke();
      }
    }

    // Distant searchlight sweeps
    this._drawSearchlights(ctx, w, h);

    // Traffic Headlights & Taillights
    this._drawTraffic(ctx, w, h);
  }

  /* ------------------- 02 SUNSET HIGHWAY (VELORA) ------------------- */
  _renderSunset(ctx, w, h) {
    // Vibrant Sunset Sky
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.75);
    sky.addColorStop(0, '#1a0826');
    sky.addColorStop(0.3, '#5c1042');
    sky.addColorStop(0.6, '#b53326');
    sky.addColorStop(0.85, '#e06616');
    sky.addColorStop(1, '#ffab2e');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Sun Disk with Flare
    const sunX = w * 0.68;
    const sunY = h * 0.42;
    const sunGlow = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 200);
    sunGlow.addColorStop(0, 'rgba(255, 245, 200, 0.9)');
    sunGlow.addColorStop(0.3, 'rgba(255, 140, 40, 0.6)');
    sunGlow.addColorStop(0.7, 'rgba(220, 50, 80, 0.25)');
    sunGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGlow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 200, 0, Math.PI * 2);
    ctx.fill();

    // Drifting Sunset Clouds
    for (const c of this.clouds) {
      const cg = ctx.createRadialGradient(c.x, c.y, 10, c.x, c.y, c.radius);
      cg.addColorStop(0, `rgba(255, 120, 80, ${c.alpha})`);
      cg.addColorStop(0.6, `rgba(140, 30, 80, ${c.alpha * 0.5})`);
      cg.addColorStop(1, 'transparent');
      ctx.fillStyle = cg;
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Mountain Ridge Silhouettes
    this._drawMountains(ctx, w, h, 0.52, '#2b0c2a');
    this._drawMountains(ctx, w, h, 0.62, '#14061a');

    // Highway Road with Amber Markers
    this._drawHighway(ctx, w, h, '#180a1c', '#ffb02e');

    // Distant Sunset Traffic
    this._drawTraffic(ctx, w, h);

    // Dust / Heat Particles
    this._drawParticles(ctx, 'rgba(255, 180, 80, 0.6)');
  }

  /* ------------------- 03 VERTICAL MEGA-CITY (RYDRIX) ------------------- */
  _renderVertical(ctx, w, h) {
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#020309');
    sky.addColorStop(0.6, '#060c22');
    sky.addColorStop(1, '#02040c');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Colossal Megastructures
    this._drawSkyscrapers(ctx, w, h, 0.35, '#050918', '#00e5ff', 0.4);
    this._drawSkyscrapers(ctx, w, h, 0.55, '#08102b', '#b84bff', 0.6);

    // Sky Bridges
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.35)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(w * 0.1, h * 0.3); ctx.lineTo(w * 0.45, h * 0.35);
    ctx.moveTo(w * 0.55, h * 0.22); ctx.lineTo(w * 0.9, h * 0.26);
    ctx.stroke();

    // Flying Vehicles with engine glow trails
    for (const f of this.flyingVehicles) {
      const grad = ctx.createLinearGradient(f.x, f.y, f.x - f.trailLen * (f.speed > 0 ? 1 : -1), f.y);
      grad.addColorStop(0, f.color);
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(f.x - (f.speed > 0 ? f.trailLen : 0), f.y - 1.5, f.trailLen, 3);
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(f.x, f.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Multi-tier Road
    this._drawWetRoad(ctx, w, h, '#070d24');
    this._drawTraffic(ctx, w, h);
  }

  /* ------------------- 04 NEON DESERT (NITRYX) ------------------- */
  _renderDesert(ctx, w, h) {
    // Starry Desert Night
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.7);
    sky.addColorStop(0, '#04030a');
    sky.addColorStop(0.5, '#120822');
    sky.addColorStop(0.9, '#301438');
    sky.addColorStop(1, '#4a1e3e');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Stars
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 40; i++) {
      const sx = (i * 137.5) % w;
      const sy = (i * 89.3) % (h * 0.45);
      ctx.fillRect(sx, sy, 1.2, 1.2);
    }

    // Glowing Neon Hotel Towers & Pyramids on Horizon
    this._drawPyramid(ctx, w * 0.75, h * 0.55, 140, 110, '#b84bff', '#00e5ff');
    this._drawSkyscrapers(ctx, w, h, 0.58, '#1e0a2b', '#ffb02e', 0.5);

    // Sand Dunes
    this._drawDunes(ctx, w, h);

    // Desert Highway
    this._drawHighway(ctx, w, h, '#1a0d1e', '#ffb02e');
    this._drawTraffic(ctx, w, h);

    // Sand Drift Particles
    this._drawParticles(ctx, 'rgba(255, 190, 100, 0.55)');
  }

  /* ------------------- 05 NIGHT COASTAL HIGHWAY (AURORA) ------------------- */
  _renderCoastal(ctx, w, h) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.65);
    sky.addColorStop(0, '#01040d');
    sky.addColorStop(0.5, '#051329');
    sky.addColorStop(1, '#0a2342');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Full Moon
    const moonX = w * 0.35;
    const moonY = h * 0.22;
    const mg = ctx.createRadialGradient(moonX, moonY, 8, moonX, moonY, 90);
    mg.addColorStop(0, '#ffffff');
    mg.addColorStop(0.3, 'rgba(200, 235, 255, 0.7)');
    mg.addColorStop(1, 'transparent');
    ctx.fillStyle = mg;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 90, 0, Math.PI * 2);
    ctx.fill();

    // Ocean Waves with Moonlight Shimmer
    const seaTop = h * 0.52;
    const seaGrad = ctx.createLinearGradient(0, seaTop, 0, h);
    seaGrad.addColorStop(0, '#04162e');
    seaGrad.addColorStop(1, '#010814');
    ctx.fillStyle = seaGrad;
    ctx.fillRect(0, seaTop, w * 0.55, h - seaTop);

    // Moonlight path on water
    const mp = ctx.createLinearGradient(moonX - 40, seaTop, moonX + 40, h);
    mp.addColorStop(0, 'rgba(180, 230, 255, 0.5)');
    mp.addColorStop(1, 'transparent');
    ctx.fillStyle = mp;
    ctx.fillRect(moonX - 45, seaTop, 90, h - seaTop);

    // Suspension Bridge in Distance
    this._drawSuspensionBridge(ctx, w * 0.15, seaTop - 15, w * 0.45, 50);

    // Coastline Cliffs on Right
    this._drawMountains(ctx, w, h, 0.58, '#08101f');

    // Coastal Highway
    this._drawHighway(ctx, w, h, '#060e1c', '#00e5ff');
    this._drawTraffic(ctx, w, h);
    this._drawParticles(ctx, 'rgba(180, 240, 255, 0.4)');
  }

  /* ------------------- 06 UNDERGROUND DISTRICT (RAVEX) ------------------- */
  _renderUnderground(ctx, w, h) {
    // Tunnel Dark Vault
    const bg = ctx.createLinearGradient(0, 0, 0, h);
    bg.addColorStop(0, '#0d0d12');
    bg.addColorStop(0.5, '#16121a');
    bg.addColorStop(1, '#07070a');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Tunnel Ceiling Arch Ribs
    ctx.strokeStyle = 'rgba(255, 176, 46, 0.3)';
    ctx.lineWidth = 3;
    for (let i = 0; i < 7; i++) {
      const archY = (i * 45);
      ctx.beginPath();
      ctx.arc(w * 0.5, archY + h * 0.4, w * 0.55, Math.PI, Math.PI * 2, false);
      ctx.stroke();
    }

    // Industrial Pipes with Steam Vents
    ctx.fillStyle = '#222530';
    ctx.fillRect(0, h * 0.28, w, 18);
    ctx.fillRect(0, h * 0.34, w, 12);

    // Flashing Warning Beacons
    const flash = Math.sin(this.time * 6) > 0;
    ctx.fillStyle = flash ? '#ff9900' : '#442200';
    ctx.beginPath();
    ctx.arc(w * 0.2, h * 0.37, 6, 0, Math.PI * 2);
    ctx.arc(w * 0.8, h * 0.37, 6, 0, Math.PI * 2);
    ctx.fill();

    // Concrete Road with Tire Skidmarks
    this._drawWetRoad(ctx, w, h, '#14141c');
    this._drawTraffic(ctx, w, h);
    this._drawParticles(ctx, 'rgba(255, 150, 50, 0.45)');
  }

  /* ------------------- 07 ROOFTOP CITY RACING (AERO) ------------------- */
  _renderRooftop(ctx, w, h) {
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#030511');
    sky.addColorStop(0.6, '#08112e');
    sky.addColorStop(1, '#02040b');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Sweeping Searchlights
    for (const s of this.searchlights) {
      ctx.save();
      ctx.translate(s.x, h * 0.65);
      ctx.rotate(s.angle);
      const beam = ctx.createLinearGradient(0, 0, 0, -h * 0.7);
      beam.addColorStop(0, s.color);
      beam.addColorStop(1, 'transparent');
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(-15, 0);
      ctx.lineTo(15, 0);
      ctx.lineTo(90, -h * 0.75);
      ctx.lineTo(-90, -h * 0.75);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Lower City Skyline
    this._drawSkyscrapers(ctx, w, h, 0.52, '#060a1c', '#00e5ff', 0.35);

    // Rooftop Platforms with Glowing Guardrails
    ctx.fillStyle = '#0a1024';
    ctx.fillRect(0, h * 0.68, w, h * 0.32);
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#00e5ff';
    ctx.shadowBlur = 15;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.68);
    ctx.lineTo(w, h * 0.68);
    ctx.stroke();
    ctx.shadowBlur = 0;

    this._drawTraffic(ctx, w, h);
  }

  /* ------------------- 08 ELECTRIC STORM CITY (VOLTX) ------------------- */
  _renderStorm(ctx, w, h) {
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#0a0518');
    sky.addColorStop(0.5, '#190a36');
    sky.addColorStop(1, '#06030e');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Violent Lightning Flash
    if (this.lightningAlpha > 0) {
      ctx.fillStyle = `rgba(210, 160, 255, ${this.lightningAlpha * 0.55})`;
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.lightningAlpha})`;
      ctx.lineWidth = 3.5;
      for (const bolt of this.lightningBolts) {
        ctx.beginPath();
        for (let i = 0; i < bolt.length; i++) {
          if (i === 0) ctx.moveTo(bolt[i].x, bolt[i].y);
          else ctx.lineTo(bolt[i].x, bolt[i].y);
        }
        ctx.stroke();
      }
    }

    // Storm City Skyline
    this._drawSkyscrapers(ctx, w, h, 0.55, '#0e0720', '#b84bff', 0.4);
    this._drawWetRoad(ctx, w, h, '#0d061c');
    this._drawTraffic(ctx, w, h);
    this._drawRain(ctx, w, h, 'rgba(200, 160, 255, 0.6)');
  }

  /* ------------------- COMMON DRAW HELPERS ------------------- */
  _drawSkyscrapers(ctx, w, h, horizonRatio, bodyColor, winColor, winDensity) {
    const horizon = h * horizonRatio;
    ctx.fillStyle = bodyColor;
    const count = 18;
    const bWidth = w / count;

    for (let i = 0; i < count; i++) {
      const bHeight = 120 + ((i * 47) % (h * 0.4));
      const bx = i * bWidth;
      const by = horizon - bHeight + 40;
      ctx.fillRect(bx, by, bWidth + 2, bHeight);

      // Windows
      ctx.fillStyle = winColor;
      for (let wy = by + 12; wy < horizon; wy += 14) {
        for (let wx = bx + 6; wx < bx + bWidth - 6; wx += 10) {
          if (((wx * 17 + wy * 31) % 100) < winDensity * 100) {
            ctx.globalAlpha = 0.65;
            ctx.fillRect(wx, wy, 4, 6);
          }
        }
      }
      ctx.globalAlpha = 1.0;
      ctx.fillStyle = bodyColor;
    }
  }

  _drawNeonBillboards(ctx, w, h) {
    const signs = [
      { x: w * 0.18, y: h * 0.38, text: 'RYDASH', color: '#00e5ff' },
      { x: w * 0.52, y: h * 0.32, text: 'NITRO', color: '#ff2e88' },
      { x: w * 0.82, y: h * 0.40, text: 'CYBER', color: '#ffb02e' }
    ];
    for (const s of signs) {
      ctx.save();
      ctx.font = 'bold 16px "Orbitron", sans-serif';
      ctx.fillStyle = s.color;
      ctx.shadowColor = s.color;
      ctx.shadowBlur = 18;
      ctx.fillText(s.text, s.x, s.y);
      ctx.restore();
    }
  }

  _drawWetRoad(ctx, w, h, baseColor) {
    const roadTop = h * 0.68;
    const roadGrad = ctx.createLinearGradient(0, roadTop, 0, h);
    roadGrad.addColorStop(0, baseColor);
    roadGrad.addColorStop(1, '#02040a');
    ctx.fillStyle = roadGrad;
    ctx.fillRect(0, roadTop, w, h - roadTop);

    // Wet reflective sheen
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, roadTop);
    ctx.lineTo(w, roadTop);
    ctx.stroke();

    // Moving lane divider dashes
    const dashOffset = (this.time * 120) % 60;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 2;
    ctx.setLineDash([20, 20]);
    ctx.lineDashOffset = -dashOffset;
    ctx.beginPath();
    ctx.moveTo(0, roadTop + (h - roadTop) * 0.45);
    ctx.lineTo(w, roadTop + (h - roadTop) * 0.45);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  _drawHighway(ctx, w, h, baseColor, markerColor) {
    const roadTop = h * 0.65;
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, roadTop, w, h - roadTop);

    ctx.strokeStyle = markerColor;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, roadTop);
    ctx.lineTo(w, roadTop);
    ctx.stroke();

    const dashOffset = (this.time * 90) % 50;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.setLineDash([25, 25]);
    ctx.lineDashOffset = -dashOffset;
    ctx.beginPath();
    ctx.moveTo(0, roadTop + (h - roadTop) * 0.5);
    ctx.lineTo(w, roadTop + (h - roadTop) * 0.5);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  _drawSearchlights(ctx, w, h) {
    // Faint distant beams sweeping the skyline behind the neon-city traffic layer.
    for (const s of this.searchlights) {
      ctx.save();
      ctx.translate(s.x, h * 0.58);
      ctx.rotate(s.angle);
      const beam = ctx.createLinearGradient(0, 0, 0, -h * 0.5);
      beam.addColorStop(0, s.color);
      beam.addColorStop(1, 'transparent');
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.moveTo(-8, 0);
      ctx.lineTo(8, 0);
      ctx.lineTo(55, -h * 0.5);
      ctx.lineTo(-55, -h * 0.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  _drawTraffic(ctx, w, h) {
    for (const c of this.trafficCars) {
      ctx.fillStyle = c.color;
      ctx.shadowColor = c.color;
      ctx.shadowBlur = 10;
      ctx.fillRect(c.x, c.y, c.len, 4);
      // Headlight cone
      if (c.speed > 0) {
        const cone = ctx.createLinearGradient(c.x + c.len, c.y, c.x + c.len + 40, c.y);
        cone.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        cone.addColorStop(1, 'transparent');
        ctx.fillStyle = cone;
        ctx.fillRect(c.x + c.len, c.y - 2, 40, 8);
      }
      ctx.shadowBlur = 0;
    }
  }

  _drawRain(ctx, w, h, color) {
    ctx.strokeStyle = color;
    for (const d of this.rainDrops) {
      ctx.lineWidth = d.thick;
      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + d.len * 0.2, d.y + d.len);
      ctx.stroke();
    }
  }

  _drawParticles(ctx, color) {
    ctx.fillStyle = color;
    for (const p of this.particles) {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;
  }

  _drawMountains(ctx, w, h, horizonRatio, color) {
    const horizon = h * horizonRatio;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, horizon);
    for (let x = 0; x <= w; x += 60) {
      const peak = horizon - 30 - Math.sin(x * 0.008) * 45 - Math.cos(x * 0.02) * 25;
      ctx.lineTo(x, peak);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  }

  _drawDunes(ctx, w, h) {
    const duneY = h * 0.58;
    ctx.fillStyle = '#220b24';
    ctx.beginPath();
    ctx.moveTo(0, h);
    ctx.lineTo(0, duneY);
    for (let x = 0; x <= w; x += 40) {
      const dy = duneY + Math.sin(x * 0.005) * 35;
      ctx.lineTo(x, dy);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();

    // Glowing Neon Edge Strip
    ctx.strokeStyle = '#ff2e88';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#ff2e88';
    ctx.shadowBlur = 12;
    ctx.beginPath();
    for (let x = 0; x <= w; x += 40) {
      const dy = duneY + Math.sin(x * 0.005) * 35;
      if (x === 0) ctx.moveTo(x, dy);
      else ctx.lineTo(x, dy);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  _drawPyramid(ctx, x, y, width, height, neonColor, fillCol) {
    ctx.fillStyle = '#180720';
    ctx.beginPath();
    ctx.moveTo(x, y - height);
    ctx.lineTo(x - width * 0.5, y);
    ctx.lineTo(x + width * 0.5, y);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = neonColor;
    ctx.lineWidth = 2;
    ctx.shadowColor = neonColor;
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  _drawSuspensionBridge(ctx, x, y, width, height) {
    ctx.strokeStyle = 'rgba(0, 229, 255, 0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    // Towers
    ctx.moveTo(x + width * 0.3, y); ctx.lineTo(x + width * 0.3, y - height);
    ctx.moveTo(x + width * 0.7, y); ctx.lineTo(x + width * 0.7, y - height);
    // Cable
    ctx.moveTo(x, y);
    ctx.quadraticCurveTo(x + width * 0.3, y - height, x + width * 0.5, y - height * 0.3);
    ctx.quadraticCurveTo(x + width * 0.7, y - height, x + width, y);
    ctx.stroke();
  }
}
