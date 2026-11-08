// ─── Seeded random ───────────────────────────────────────────────────────────
export class SeededRandom {
  private s: number;
  constructor(seed = 42) { this.s = seed >>> 0; }
  next(): number {
    this.s = Math.imul(this.s ^ (this.s >>> 13), this.s | 0x61c88647);
    this.s ^= this.s >>> 7;
    return (this.s >>> 0) / 0x100000000;
  }
  range(min: number, max: number): number {
    return min + this.next() * (max - min);
  }
  gaussian(mean = 0, std = 1): number {
    let u = 0, v = 0;
    while (u === 0) u = this.next();
    while (v === 0) v = this.next();
    return mean + std * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }
}

// ─── Perlin 2D Noise ─────────────────────────────────────────────────────────
const PERM: number[] = (() => {
  const p: number[] = Array.from({ length: 256 }, (_, i) => i);
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [p[i], p[j]] = [p[j], p[i]];
  }
  return [...p, ...p];
})();

function fade(t: number): number { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(a: number, b: number, t: number): number { return a + t * (b - a); }
function grad(h: number, x: number, y: number): number {
  const g = h & 3;
  const u = g < 2 ? x : y;
  const v = g < 2 ? y : x;
  return ((g & 1) === 0 ? u : -u) + ((g & 2) === 0 ? v : -v);
}

export function noise2D(x: number, y: number): number {
  const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
  x -= Math.floor(x); y -= Math.floor(y);
  const u = fade(x), v = fade(y);
  const a = PERM[X] + Y, b = PERM[X + 1] + Y;
  return lerp(
    lerp(grad(PERM[a], x, y), grad(PERM[b], x - 1, y), u),
    lerp(grad(PERM[a + 1], x, y - 1), grad(PERM[b + 1], x - 1, y - 1), u),
    v
  );
}

// ─── Math utilities ──────────────────────────────────────────────────────────
export const clamp = (v: number, lo: number, hi: number): number =>
  Math.max(lo, Math.min(hi, v));

export const lerpN = (a: number, b: number, t: number): number => a + (b - a) * t;

export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export const easeInOutQuart = (t: number): number =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

// Spring damping: returns [newPos, newVel]
export function springStep(
  pos: number, target: number, vel: number,
  stiffness = 0.06, damping = 0.84
): [number, number] {
  const force = (target - pos) * stiffness;
  const newVel = (vel + force) * damping;
  return [pos + newVel, newVel];
}
