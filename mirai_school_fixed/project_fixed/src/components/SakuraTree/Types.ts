export interface Vec2 {
  x: number;
  y: number;
}

export interface Branch {
  x1: number; y1: number;
  cx1: number; cy1: number;
  cx2: number; cy2: number;
  x2: number; y2: number;
  thickness: number;
  depth: number;
}

export interface ParticleTarget {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  size: number;
  type: 'trunk' | 'branch' | 'blossom';
}

export interface TreeStructure {
  branches: Branch[];
  targets: ParticleTarget[];
  blossomPoints: Vec2[];
  canopyCenter: Vec2;
  canopyRadius: number;
}

export interface PetalData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotSpeed: number;
  opacity: number;
  size: number;
  life: number;
  maxLife: number;
  active: boolean;
}

export type AnimPhase = 'dots' | 'bursting' | 'forming' | 'alive';

export interface SakuraTreeProps {
  className?: string;
  width?: number;
  height?: number;
  blossomColor?: string;
  petalCount?: number;
  particleCount?: number;
  windStrength?: number;
  enableInteraction?: boolean;
}
