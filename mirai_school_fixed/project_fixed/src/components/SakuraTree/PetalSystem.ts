import { SeededRandom } from './Noise';
import type { PetalData, Vec2 } from './Types';

export class PetalSystem {
  private petals: PetalData[];
  private rng = new SeededRandom(9999);
  private spawnPoints: Vec2[] = [];
  private windX = 0;
  private active = false;

  constructor(maxPetals = 80) {
    this.petals = Array.from({ length: maxPetals }, () => this.createPetal(true));
  }

  setSpawnPoints(points: Vec2[]): void {
    this.spawnPoints = points;
  }

  setWind(wx: number, _wy: number): void {
    this.windX = wx;
  }

  enable(): void { this.active = true; }
  disable(): void { this.active = false; }

  private spawnPoint(): Vec2 {
    if (this.spawnPoints.length === 0) return { x: 300, y: 200 };
    const p = this.spawnPoints[Math.floor(this.rng.next() * this.spawnPoints.length)];
    return {
      x: p.x + this.rng.gaussian(0, 25),
      y: p.y + this.rng.gaussian(0, 25),
    };
  }

  private createPetal(initialRandom = false): PetalData {
    const sp = this.spawnPoint();
    const maxLife = this.rng.range(7, 16);
    return {
      x: sp.x,
      y: initialRandom ? this.rng.range(-200, 600) : sp.y,
      vx: this.rng.range(-0.8, 0.8),
      vy: this.rng.range(0.3, 0.9),
      rotation: this.rng.range(0, Math.PI * 2),
      rotSpeed: this.rng.range(-0.03, 0.03),
      opacity: this.rng.range(0.5, 0.9),
      size: this.rng.range(3, 6.5),
      life: initialRandom ? this.rng.range(0, maxLife) : 0,
      maxLife,
      active: true,
    };
  }

  update(dt: number, time: number): void {
    if (!this.active) return;

    for (const p of this.petals) {
      if (!p.active) {
        // Respawn
        const newP = this.createPetal(false);
        Object.assign(p, newP);
        continue;
      }

      p.life += dt;
      if (p.life >= p.maxLife) {
        p.active = false;
        continue;
      }

      // Wind influence with slow oscillation
      const windWave = Math.sin(time * 0.45 + p.x * 0.008) * 0.25;
      p.vx += (this.windX * 0.007 + windWave * 0.012);
      p.vy += 0.006; // gentle gravity
      p.vx *= 0.988;
      p.vy *= 0.988;

      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed + Math.sin(time + p.x * 0.01) * 0.008;

      // Fade in/out
      const progress = p.life / p.maxLife;
      p.opacity = progress < 0.15
        ? progress / 0.15 * 0.85
        : progress > 0.8
        ? (1 - (progress - 0.8) / 0.2) * 0.85
        : 0.85;
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (!this.active) return;

    ctx.save();
    for (const p of this.petals) {
      if (!p.active || p.opacity <= 0.01) continue;

      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      // Petal shape: ellipse with a slight heart-like form
      const w = p.size;
      const h = p.size * 0.55;

      ctx.beginPath();
      ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2);

      // Gradient for depth
      const grad = ctx.createRadialGradient(-w * 0.2, 0, 0, 0, 0, w);
      grad.addColorStop(0, 'rgba(255,240,250,0.95)');
      grad.addColorStop(0.5, 'rgba(246,191,215,0.85)');
      grad.addColorStop(1, 'rgba(238,137,181,0.3)');
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.restore();
    }
    ctx.restore();
  }
}
