import { noise2D } from './Noise';
import { ParticleEngine } from './ParticleEngine';
import { PetalSystem } from './PetalSystem';
import { generateTree } from './TreeGenerator';
import type { AnimPhase, Branch, SakuraTreeProps, TreeStructure } from './Types';

export class Renderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private offscreen: HTMLCanvasElement;
  private offCtx: CanvasRenderingContext2D;
  private dpr: number;

  private particles: ParticleEngine;
  private petals: PetalSystem;
  private tree: TreeStructure | null = null;

  private rafId = 0;
  private lastTime = 0;
  private time = 0;
  private phase: AnimPhase = 'dots';
  private formingSettled = false;
  private offscreenReady = false;

  private windNoiseX = 0;
  private windNoiseY = 0;
  private windX = 0;
  private windY = 0;
  private mouseInfluenceX = 0;
  private mouseInfluenceY = 0;

  private props: Required<SakuraTreeProps>;

  constructor(canvas: HTMLCanvasElement, props: Required<SakuraTreeProps>) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true })!;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.props = props;

    this.offscreen = document.createElement('canvas');
    this.offCtx = this.offscreen.getContext('2d')!;

    this.particles = new ParticleEngine();
    this.petals = new PetalSystem(props.petalCount);
  }

  resize(w: number, h: number): void {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = w * this.dpr;
    this.canvas.height = h * this.dpr;
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.ctx.scale(this.dpr, this.dpr);

    this.offscreen.width = w * this.dpr;
    this.offscreen.height = h * this.dpr;
    this.offCtx.scale(this.dpr, this.dpr);

    this.offscreenReady = false;

    // Re-generate tree for new size
    this.tree = generateTree(w, h, this.props.particleCount);
    this.particles.init(this.tree.targets, w, h);
    this.petals.setSpawnPoints(this.tree.blossomPoints);
    this.petals.setWind(this.windX, this.windY);
  }

  onMouseMove(x: number, y: number): void {
    const w = this.canvas.offsetWidth;
    const h = this.canvas.offsetHeight;
    // Gentle wind shift based on mouse position
    this.mouseInfluenceX = ((x / w) - 0.5) * 2 * this.props.windStrength;
    this.mouseInfluenceY = ((y / h) - 0.5) * 0.5 * this.props.windStrength;
  }

  trigger(): void {
    if (this.phase !== 'dots') return;
    this.particles.triggerBurst();
    this.phase = 'bursting';
  }

  start(): void {
    this.lastTime = performance.now();
    this.rafId = requestAnimationFrame(this.loop);
  }

  stop(): void {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  private loop = (now: number): void => {
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;
    this.time += dt;

    // Pause when tab hidden
    if (document.hidden) {
      this.rafId = requestAnimationFrame(this.loop);
      return;
    }

    this.updateWind();
    this.updatePhase(dt);
    this.render(dt);

    this.rafId = requestAnimationFrame(this.loop);
  };

  private updateWind(): void {
    this.windNoiseX += 0.0012;
    this.windNoiseY += 0.0008;
    const nx = noise2D(this.windNoiseX, 0) * 1.4;
    const ny = noise2D(0, this.windNoiseY) * 0.35;
    // Very slow wind transition — feels like a gentle breeze
    this.windX += (nx * this.props.windStrength + this.mouseInfluenceX - this.windX) * 0.012;
    this.windY += (ny * this.props.windStrength + this.mouseInfluenceY - this.windY) * 0.012;
    this.particles.setWind(this.windX, this.windY);
    this.petals.setWind(this.windX, this.windY);
  }

  private updatePhase(dt: number): void {
    if (this.phase === 'bursting') {
      const pPhase = this.particles.getPhase();
      if (pPhase === 'forming') this.phase = 'forming';
    }

    if (this.phase === 'forming') {
      const done = this.particles.update(dt, this.time);
      if (done && !this.formingSettled) {
        this.formingSettled = true;
        setTimeout(() => {
          this.phase = 'alive';
          this.particles.setPhase('alive');
          this.petals.enable();
        }, 400);
      }
    } else {
      this.particles.update(dt, this.time);
    }

    if (this.phase === 'alive') {
      this.petals.update(dt, this.time);
    }
  }

  private render(dt: number): void {
    void dt;
    const ctx = this.ctx;
    const w = this.canvas.offsetWidth;
    const h = this.canvas.offsetHeight;

    ctx.clearRect(0, 0, w, h);

    if (this.phase === 'dots') {
      this.particles.drawDots(ctx, this.time, this.dpr);
      return;
    }

    // Draw branches (once to offscreen when alive)
    if (this.phase === 'alive' && !this.offscreenReady && this.tree) {
      this.renderBranchesOffscreen(this.tree.branches, w, h);
      this.offscreenReady = true;
    }

    if (this.offscreenReady) {
      ctx.drawImage(this.offscreen, 0, 0, w, h);
    } else if (this.tree) {
      this.renderBranches(ctx, this.tree.branches);
    }

    // Particles
    this.particles.draw(ctx);

    // Petals on top
    if (this.phase === 'alive') {
      this.petals.draw(ctx);
    }
  }

  private renderBranchesOffscreen(branches: Branch[], w: number, h: number): void {
    this.offCtx.clearRect(0, 0, w, h);
    this.renderBranches(this.offCtx, branches);
  }

  private renderBranches(ctx: CanvasRenderingContext2D, branches: Branch[]): void {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (const b of branches) {
      // Color + thickness gradient by depth
      const t = Math.min(b.depth / 6, 1);
      const r = Math.round(90 - t * 25);
      const g = Math.round(53 - t * 8);
      const bv = Math.round(37 - t * 5);
      const alpha = 1 - t * 0.3;

      ctx.strokeStyle = `rgba(${r},${g},${bv},${alpha})`;
      ctx.lineWidth = Math.max(0.5, b.thickness - b.depth * 1.6);

      ctx.beginPath();
      ctx.moveTo(b.x1, b.y1);
      ctx.bezierCurveTo(b.cx1, b.cy1, b.cx2, b.cy2, b.x2, b.y2);
      ctx.stroke();
    }
    ctx.restore();
  }

  destroy(): void {
    this.stop();
  }
}
