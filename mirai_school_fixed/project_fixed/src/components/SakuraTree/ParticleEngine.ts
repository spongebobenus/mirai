import { SeededRandom, springStep } from './Noise';
import type { AnimPhase, ParticleTarget, Vec2 } from './Types';

const FIELDS = 14; // x,y,vx,vy,tx,ty,ox,oy,r,g,b,size,delay,windF

// Language dots: Kazakh is primary (red), rest are pink
const DOT_LABELS = ['Қазақ', 'Русский', '日本語', 'English'];

export class ParticleEngine {
  private buf: Float32Array;
  private count: number;
  private phase: AnimPhase = 'dots';
  private phaseTime = 0;
  private rng = new SeededRandom(1234);
  private windX = 0;
  private dotPositions: Vec2[] = [];

  constructor() {
    this.buf = new Float32Array(0);
    this.count = 0;
  }

  init(targets: ParticleTarget[], canvasW: number, canvasH: number): void {
    this.count = targets.length;
    this.buf = new Float32Array(this.count * FIELDS);

    // 4 language dots spread across canvas — Kazakh (bottom-left, primary),
    // Russian (top-left), Japanese (top-right), English (bottom-right)
    this.dotPositions = [
      { x: canvasW * 0.28, y: canvasH * 0.62 }, // Қазақ — primary
      { x: canvasW * 0.28, y: canvasH * 0.34 }, // Русский
      { x: canvasW * 0.72, y: canvasH * 0.34 }, // 日本語
      { x: canvasW * 0.72, y: canvasH * 0.62 }, // English
    ];

    for (let i = 0; i < this.count; i++) {
      const t = targets[i];
      const dot = this.dotPositions[i % 4];
      const base = i * FIELDS;

      this.buf[base + 0] = dot.x;
      this.buf[base + 1] = dot.y;
      this.buf[base + 2] = 0;
      this.buf[base + 3] = 0;
      this.buf[base + 4] = t.x;
      this.buf[base + 5] = t.y;
      this.buf[base + 6] = dot.x;
      this.buf[base + 7] = dot.y;
      this.buf[base + 8] = t.r;
      this.buf[base + 9] = t.g;
      this.buf[base + 10] = t.b;
      this.buf[base + 11] = t.size;

      // Long staggered delay — particles near the tree core arrive first,
      // outer blossom clusters drift in slowly afterward
      const dist = Math.hypot(t.x - canvasW * 0.5, t.y - canvasH * 0.42);
      this.buf[base + 12] = this.rng.range(0.5, 5.0) + dist / canvasW * 4.0;
      this.buf[base + 13] = this.rng.range(0.3, 0.9); // wind factor
    }
  }

  triggerBurst(): void {
    for (let i = 0; i < this.count; i++) {
      const base = i * FIELDS;
      const angle = this.rng.range(0, Math.PI * 2);
      // Gentle burst — not explosive, more like a slow dispersal
      const speed = this.rng.range(0.6, 2.8);
      this.buf[base + 2] = Math.cos(angle) * speed;
      this.buf[base + 3] = Math.sin(angle) * speed;
    }
    this.phase = 'bursting';
    this.phaseTime = 0;
  }

  setPhase(p: AnimPhase): void { this.phase = p; this.phaseTime = 0; }
  getPhase(): AnimPhase { return this.phase; }
  setWind(wx: number, _wy: number): void { this.windX = wx; }

  update(dt: number, time: number): boolean {
    this.phaseTime += dt;
    const buf = this.buf;
    let allSettled = true;

    for (let i = 0; i < this.count; i++) {
      const base = i * FIELDS;
      let x = buf[base], y = buf[base + 1];
      let vx = buf[base + 2], vy = buf[base + 3];
      const tx = buf[base + 4], ty = buf[base + 5];
      const delay = buf[base + 12];
      const wf = buf[base + 13];

      if (this.phase === 'dots') {
        // Very slow pulse — dots breathe gently
        const pulse = Math.sin(time * 1.1 + i * 0.017) * 0.3;
        buf[base] = buf[base + 6] + pulse;
        buf[base + 1] = buf[base + 7] + pulse;
        continue;
      }

      if (this.phase === 'bursting') {
        // Slow free drift
        vx *= 0.97;
        vy *= 0.97;
        x += vx;
        y += vy;
        // Longer burst phase — let particles scatter before homing in
        if (this.phaseTime > 1.8) {
          this.phase = 'forming';
          this.phaseTime = 0;
        }
        buf[base] = x; buf[base + 1] = y;
        buf[base + 2] = vx; buf[base + 3] = vy;
        allSettled = false;
        continue;
      }

      if (this.phase === 'forming') {
        if (this.phaseTime < delay) {
          // Float in place, very light drift
          vx *= 0.94; vy *= 0.94;
          x += vx; y += vy;
          buf[base] = x; buf[base + 1] = y;
          buf[base + 2] = vx; buf[base + 3] = vy;
          allSettled = false;
          continue;
        }

        // Slow spring — feels like petals drifting home
        const [nx, nvx] = springStep(x, tx, vx, 0.018, 0.88);
        const [ny, nvy] = springStep(y, ty, vy, 0.018, 0.88);
        buf[base] = nx; buf[base + 1] = ny;
        buf[base + 2] = nvx; buf[base + 3] = nvy;

        const d = Math.hypot(nx - tx, ny - ty);
        if (d > 0.5) allSettled = false;
        continue;
      }

      if (this.phase === 'alive') {
        // Gentle breathing + subtle wind sway
        const breathe = Math.sin(time * 0.32 + i * 0.004) * 0.7;
        const windOscX = this.windX * wf * (Math.sin(time * 0.55 + i * 0.006) * 0.5 + 0.5);
        buf[base] = tx + windOscX + breathe * 0.25;
        buf[base + 1] = ty + breathe * 0.12;
      }
    }

    return allSettled;
  }

  drawDots(ctx: CanvasRenderingContext2D, time: number, _dpr: number): void {
    for (let i = 0; i < this.dotPositions.length; i++) {
      const dot = this.dotPositions[i];
      const isPrimary = i === 0; // Kazakh dot is red/primary

      // Each dot pulses at a slightly different phase for organic feel
      const pulse = 1 + Math.sin(time * 1.0 + i * (Math.PI * 0.5)) * 0.16;
      const coreR = isPrimary ? 7 : 5.5;
      const r = coreR * pulse;
      const glowR = r * 3.8;

      // Outer glow
      ctx.beginPath();
      const grd = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, glowR);
      if (isPrimary) {
        grd.addColorStop(0, 'rgba(210,35,35,0.30)');
        grd.addColorStop(0.45, 'rgba(210,35,35,0.10)');
        grd.addColorStop(1, 'rgba(210,35,35,0)');
      } else {
        grd.addColorStop(0, 'rgba(248,185,218,0.45)');
        grd.addColorStop(0.45, 'rgba(235,130,175,0.15)');
        grd.addColorStop(1, 'rgba(235,130,175,0)');
      }
      ctx.fillStyle = grd;
      ctx.arc(dot.x, dot.y, glowR, 0, Math.PI * 2);
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.fillStyle = isPrimary ? 'rgba(205,32,32,0.86)' : 'rgba(244,165,200,0.90)';
      ctx.arc(dot.x, dot.y, r * 0.62, 0, Math.PI * 2);
      ctx.fill();

      // Label — fades in over the first 3 seconds
      const labelAlpha = Math.min(1, time * 0.38);
      if (labelAlpha < 0.02) continue;

      // Bottom dots (i=0,3): label below; top dots (i=1,2): label above
      const isBottom = i === 0 || i === 3;
      const labelY = isBottom ? dot.y + glowR + 5 : dot.y - glowR - 5;

      ctx.save();
      ctx.globalAlpha = labelAlpha * (isPrimary ? 0.88 : 0.66);
      ctx.textAlign = 'center';
      ctx.textBaseline = isBottom ? 'top' : 'bottom';

      if (isPrimary) {
        ctx.font = '600 12px Manrope, Inter, sans-serif';
        ctx.fillStyle = 'rgba(150,12,12,0.82)';
      } else {
        ctx.font = '400 11px Manrope, Inter, sans-serif';
        ctx.fillStyle = 'rgba(88,38,58,0.68)';
      }

      ctx.fillText(DOT_LABELS[i], dot.x, labelY);
      ctx.restore();
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const buf = this.buf;
    ctx.save();

    let lastR = -1, lastG = -1, lastB = -1;

    for (let i = 0; i < this.count; i++) {
      const base = i * FIELDS;
      const x = buf[base];
      const y = buf[base + 1];
      const r = buf[base + 8];
      const g = buf[base + 9];
      const b = buf[base + 10];
      const size = buf[base + 11];

      if (x === 0 && y === 0) continue;

      if (r !== lastR || g !== lastG || b !== lastB) {
        ctx.fillStyle = `rgb(${r|0},${g|0},${b|0})`;
        lastR = r; lastG = g; lastB = b;
      }

      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  getDotPositions(): Vec2[] { return this.dotPositions; }
  getCount(): number { return this.count; }
}
