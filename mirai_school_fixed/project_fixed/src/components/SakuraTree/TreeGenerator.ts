import { SeededRandom } from './Noise';
import type { Branch, ParticleTarget, TreeStructure, Vec2 } from './Types';

// ─── Color palettes ───────────────────────────────────────────────────────────
const TRUNK_COLORS: Array<[number, number, number]> = [
  [90, 53, 37],   // #5A3525
  [77, 45, 33],   // #4D2D21
  [107, 68, 52],  // #6B4434
];
const BRANCH_COLORS: Array<[number, number, number]> = [
  [110, 70, 55],
  [130, 85, 65],
  [150, 100, 80],
];
const BLOSSOM_COLORS: Array<[number, number, number]> = [
  [250, 214, 231], // #FAD6E7
  [246, 191, 215], // #F6BFD7
  [243, 166, 198], // #F3A6C6
  [238, 137, 181], // #EE89B5
  [249, 220, 235], // #F9DCEB
  [255, 240, 248], // near white highlight
];

function pickBlossom(rng: SeededRandom): [number, number, number] {
  return BLOSSOM_COLORS[Math.floor(rng.next() * BLOSSOM_COLORS.length)];
}

// ─── Bezier sampling ──────────────────────────────────────────────────────────
function sampleCubicBezier(
  x1: number, y1: number, cx1: number, cy1: number,
  cx2: number, cy2: number, x2: number, y2: number,
  t: number
): Vec2 {
  const u = 1 - t;
  return {
    x: u * u * u * x1 + 3 * u * u * t * cx1 + 3 * u * t * t * cx2 + t * t * t * x2,
    y: u * u * u * y1 + 3 * u * u * t * cy1 + 3 * u * t * t * cy2 + t * t * t * y2,
  };
}

function bezierLength(b: Branch, steps = 20): number {
  let len = 0;
  let prev = sampleCubicBezier(b.x1, b.y1, b.cx1, b.cy1, b.cx2, b.cy2, b.x2, b.y2, 0);
  for (let i = 1; i <= steps; i++) {
    const p = sampleCubicBezier(b.x1, b.y1, b.cx1, b.cy1, b.cx2, b.cy2, b.x2, b.y2, i / steps);
    const dx = p.x - prev.x, dy = p.y - prev.y;
    len += Math.sqrt(dx * dx + dy * dy);
    prev = p;
  }
  return len;
}

// ─── Branch generator ─────────────────────────────────────────────────────────
interface BranchParams {
  x1: number; y1: number;
  angle: number;
  length: number;
  thickness: number;
  depth: number;
  maxDepth: number;
}

function generateBranches(
  params: BranchParams,
  branches: Branch[],
  blossomClusters: Array<{ cx: number; cy: number; r: number }>,
  rng: SeededRandom
): void {
  const { x1, y1, angle, length, thickness, depth, maxDepth } = params;

  // Organic curve: control points deviate from straight line
  const curveLeft = rng.range(-0.35, 0.35);
  const curveRight = rng.range(-0.35, 0.35);
  const wobble = (rng.next() - 0.5) * 0.2;
  const actualAngle = angle + wobble;

  const cx1 = x1 + Math.cos(actualAngle + curveLeft) * length * 0.33;
  const cy1 = y1 + Math.sin(actualAngle + curveLeft) * length * 0.33;
  const cx2 = x1 + Math.cos(actualAngle + curveRight) * length * 0.66;
  const cy2 = y1 + Math.sin(actualAngle + curveRight) * length * 0.66;
  const x2 = x1 + Math.cos(actualAngle) * length;
  const y2 = y1 + Math.sin(actualAngle) * length;

  branches.push({ x1, y1, cx1, cy1, cx2, cy2, x2, y2, thickness, depth });

  if (depth >= maxDepth) {
    // Leaf node — generate blossom cluster
    const clusterRadius = 28 + rng.range(-8, 16);
    blossomClusters.push({ cx: x2, cy: y2, r: clusterRadius });
    // Extra mini clusters near tip
    for (let k = 0; k < 2; k++) {
      blossomClusters.push({
        cx: x2 + rng.gaussian(0, clusterRadius * 0.4),
        cy: y2 + rng.gaussian(0, clusterRadius * 0.4),
        r: clusterRadius * 0.55,
      });
    }
    return;
  }

  // Split into children
  const numChildren = depth < 3 ? 2 : (rng.next() > 0.55 ? 3 : 2);
  const spread = 0.38 + rng.range(0, 0.28);

  for (let c = 0; c < numChildren; c++) {
    const childOffset = (c - (numChildren - 1) / 2) * spread;
    const childAngle = actualAngle + childOffset + rng.range(-0.1, 0.1);
    const childLength = length * rng.range(0.58, 0.74);
    const childThickness = thickness * rng.range(0.58, 0.68);

    generateBranches(
      { x1: x2, y1: y2, angle: childAngle, length: childLength, thickness: childThickness, depth: depth + 1, maxDepth },
      branches, blossomClusters, rng
    );
  }
}

// ─── Particle target distribution ─────────────────────────────────────────────
function distributeAlongBranch(
  branch: Branch,
  count: number,
  rng: SeededRandom,
  targets: ParticleTarget[]
): void {
  const isDeep = branch.depth > 3;
  const colors = isDeep ? BRANCH_COLORS : TRUNK_COLORS;

  for (let i = 0; i < count; i++) {
    const t = rng.next();
    const p = sampleCubicBezier(
      branch.x1, branch.y1, branch.cx1, branch.cy1,
      branch.cx2, branch.cy2, branch.x2, branch.y2, t
    );
    const noise = branch.thickness * 0.3;
    const color = colors[Math.floor(rng.next() * colors.length)];
    const sz = Math.max(0.8, branch.thickness * (isDeep ? 0.5 : 0.7) - t * 0.5);

    targets.push({
      x: p.x + rng.gaussian(0, noise),
      y: p.y + rng.gaussian(0, noise),
      r: color[0], g: color[1], b: color[2],
      size: Math.min(sz, 3),
      type: branch.depth < 2 ? 'trunk' : 'branch',
    });
  }
}

// ─── Main entry point ─────────────────────────────────────────────────────────
export function generateTree(
  canvasW: number,
  canvasH: number,
  particleCount = 12000
): TreeStructure {
  const rng = new SeededRandom(7391);
  const branches: Branch[] = [];
  const blossomClusters: Array<{ cx: number; cy: number; r: number }> = [];

  const trunkBaseX = canvasW * 0.5;
  const trunkBaseY = canvasH * 0.95;
  const trunkLen = canvasH * 0.32;
  const trunkAngle = -Math.PI / 2 + rng.range(-0.08, 0.08);

  generateBranches(
    { x1: trunkBaseX, y1: trunkBaseY, angle: trunkAngle, length: trunkLen, thickness: 12, depth: 0, maxDepth: 6 },
    branches, blossomClusters, rng
  );

  // Compute canopy
  let sumX = 0, sumY = 0, minX = Infinity, maxX = -Infinity, minY = Infinity;
  for (const c of blossomClusters) {
    sumX += c.cx; sumY += c.cy;
    minX = Math.min(minX, c.cx - c.r);
    maxX = Math.max(maxX, c.cx + c.r);
    minY = Math.min(minY, c.cy - c.r);
  }
  const canopyCenter: Vec2 = { x: sumX / blossomClusters.length, y: sumY / blossomClusters.length };
  const canopyRadius = (maxX - minX) / 2 + 20;

  // Distribute particles
  const targets: ParticleTarget[] = [];
  const blossomCount = Math.floor(particleCount * 0.72);
  const branchCount = Math.floor(particleCount * 0.28);

  // Branch particles
  const totalBranchLen = branches.reduce((s, b) => s + bezierLength(b) * b.thickness, 0);
  for (const b of branches) {
    const share = (bezierLength(b) * b.thickness) / totalBranchLen;
    const n = Math.max(1, Math.floor(branchCount * share));
    distributeAlongBranch(b, n, rng, targets);
  }

  // Blossom particles — distributed across clusters by radius
  const totalArea = blossomClusters.reduce((s, c) => s + c.r * c.r, 0);
  for (const cluster of blossomClusters) {
    const share = (cluster.r * cluster.r) / totalArea;
    const n = Math.max(1, Math.floor(blossomCount * share));
    for (let i = 0; i < n; i++) {
      // Gaussian distribution within cluster
      const bx = rng.gaussian(cluster.cx, cluster.r * 0.38);
      const by = rng.gaussian(cluster.cy, cluster.r * 0.38);
      const [r, g, b] = pickBlossom(rng);
      const sz = rng.range(1.0, 2.8);
      targets.push({ x: bx, y: by, r, g, b, size: sz, type: 'blossom' });
    }
  }

  const blossomPoints: Vec2[] = blossomClusters.map(c => ({ x: c.cx, y: c.cy }));

  return { branches, targets, blossomPoints, canopyCenter, canopyRadius };
}
