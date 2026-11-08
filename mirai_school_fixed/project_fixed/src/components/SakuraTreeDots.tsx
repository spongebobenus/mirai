import { useEffect, useRef, useState } from 'react';

type DotType = 'trunk' | 'branch' | 'blossom' | 'petal';

interface Dot {
  cx: number; cy: number; r: number;
  color: string; delay: number; type: DotType;
}

const DOTS: Dot[] = [
  // ── Ствол (тёмно-синий снизу вверх) ──
  { cx: 130, cy: 312, r: 5.5, color: '#0F2A4D', delay: 0.00, type: 'trunk' },
  { cx: 130, cy: 295, r: 5.5, color: '#0F2A4D', delay: 0.08, type: 'trunk' },
  { cx: 130, cy: 278, r: 5.0, color: '#162E52', delay: 0.16, type: 'trunk' },
  { cx: 130, cy: 262, r: 4.5, color: '#1a3a63', delay: 0.24, type: 'trunk' },
  { cx: 130, cy: 247, r: 4.0, color: '#1f4270', delay: 0.32, type: 'trunk' },

  // ── Левая главная ветка ──
  { cx: 113, cy: 235, r: 3.5, color: '#2d5a8e', delay: 0.38, type: 'branch' },
  { cx: 93,  cy: 221, r: 3.0, color: '#3B82F6', delay: 0.44, type: 'branch' },
  { cx: 73,  cy: 207, r: 2.5, color: '#3B82F6', delay: 0.50, type: 'branch' },
  { cx: 53,  cy: 193, r: 2.5, color: '#60A5FA', delay: 0.56, type: 'branch' },

  // ── Правая главная ветка ──
  { cx: 147, cy: 235, r: 3.5, color: '#2d5a8e', delay: 0.38, type: 'branch' },
  { cx: 167, cy: 221, r: 3.0, color: '#3B82F6', delay: 0.44, type: 'branch' },
  { cx: 187, cy: 207, r: 2.5, color: '#3B82F6', delay: 0.50, type: 'branch' },
  { cx: 207, cy: 193, r: 2.5, color: '#60A5FA', delay: 0.56, type: 'branch' },

  // ── Центральная ветка вверх ──
  { cx: 130, cy: 230, r: 3.5, color: '#2d5a8e', delay: 0.36, type: 'branch' },
  { cx: 130, cy: 214, r: 3.0, color: '#3B82F6', delay: 0.42, type: 'branch' },
  { cx: 130, cy: 198, r: 2.5, color: '#60A5FA', delay: 0.48, type: 'branch' },

  // ── Боковые веточки ──
  { cx: 38,  cy: 178, r: 2.0, color: '#93C5FD', delay: 0.60, type: 'branch' },
  { cx: 60,  cy: 177, r: 2.0, color: '#93C5FD', delay: 0.62, type: 'branch' },
  { cx: 222, cy: 178, r: 2.0, color: '#93C5FD', delay: 0.60, type: 'branch' },
  { cx: 200, cy: 177, r: 2.0, color: '#93C5FD', delay: 0.62, type: 'branch' },
  { cx: 114, cy: 183, r: 2.5, color: '#60A5FA', delay: 0.52, type: 'branch' },
  { cx: 99,  cy: 170, r: 2.0, color: '#93C5FD', delay: 0.57, type: 'branch' },
  { cx: 146, cy: 183, r: 2.5, color: '#60A5FA', delay: 0.52, type: 'branch' },
  { cx: 161, cy: 170, r: 2.0, color: '#93C5FD', delay: 0.57, type: 'branch' },

  // ── Цветы сакуры — левый кластер ──
  { cx: 24,  cy: 162, r: 5.5, color: '#DC2626', delay: 0.65, type: 'blossom' },
  { cx: 42,  cy: 162, r: 4.5, color: '#EF4444', delay: 0.68, type: 'blossom' },
  { cx: 17,  cy: 174, r: 4.0, color: '#FCA5A5', delay: 0.71, type: 'blossom' },
  { cx: 54,  cy: 164, r: 3.5, color: '#FCA5A5', delay: 0.70, type: 'blossom' },

  // ── Цветы сакуры — правый кластер ──
  { cx: 236, cy: 162, r: 5.5, color: '#DC2626', delay: 0.65, type: 'blossom' },
  { cx: 218, cy: 162, r: 4.5, color: '#EF4444', delay: 0.68, type: 'blossom' },
  { cx: 243, cy: 174, r: 4.0, color: '#FCA5A5', delay: 0.71, type: 'blossom' },
  { cx: 206, cy: 164, r: 3.5, color: '#FCA5A5', delay: 0.70, type: 'blossom' },

  // ── Цветы — центр-лево ──
  { cx: 90,  cy: 156, r: 5.0, color: '#DC2626', delay: 0.67, type: 'blossom' },
  { cx: 75,  cy: 167, r: 4.0, color: '#EF4444', delay: 0.70, type: 'blossom' },
  { cx: 104, cy: 166, r: 3.5, color: '#FCA5A5', delay: 0.73, type: 'blossom' },

  // ── Цветы — центр-право ──
  { cx: 170, cy: 156, r: 5.0, color: '#DC2626', delay: 0.67, type: 'blossom' },
  { cx: 156, cy: 167, r: 4.0, color: '#EF4444', delay: 0.70, type: 'blossom' },
  { cx: 184, cy: 166, r: 3.5, color: '#FCA5A5', delay: 0.73, type: 'blossom' },

  // ── Цветы — верхний центр ──
  { cx: 119, cy: 152, r: 5.5, color: '#DC2626', delay: 0.72, type: 'blossom' },
  { cx: 141, cy: 152, r: 5.5, color: '#DC2626', delay: 0.72, type: 'blossom' },
  { cx: 130, cy: 141, r: 7.0, color: '#B91C1C', delay: 0.76, type: 'blossom' },
  { cx: 112, cy: 161, r: 4.0, color: '#EF4444', delay: 0.74, type: 'blossom' },
  { cx: 148, cy: 161, r: 4.0, color: '#EF4444', delay: 0.74, type: 'blossom' },

  // ── Парящие лепестки ──
  { cx: 63,  cy: 133, r: 3.0, color: '#FCA5A5', delay: 0.80, type: 'petal' },
  { cx: 104, cy: 123, r: 2.5, color: '#EF4444', delay: 0.83, type: 'petal' },
  { cx: 156, cy: 123, r: 2.5, color: '#EF4444', delay: 0.84, type: 'petal' },
  { cx: 197, cy: 133, r: 3.0, color: '#FCA5A5', delay: 0.81, type: 'petal' },
  { cx: 130, cy: 114, r: 3.5, color: '#DC2626', delay: 0.88, type: 'petal' },
  { cx: 84,  cy: 115, r: 2.0, color: '#FCA5A5', delay: 0.86, type: 'petal' },
  { cx: 176, cy: 115, r: 2.0, color: '#FCA5A5', delay: 0.87, type: 'petal' },
  { cx: 44,  cy: 147, r: 2.0, color: '#FECACA', delay: 0.78, type: 'petal' },
  { cx: 216, cy: 147, r: 2.0, color: '#FECACA', delay: 0.79, type: 'petal' },
];

export default function SakuraTreeDots() {
  const [active, setActive] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setActive(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 260 320"
      width="260"
      height="320"
      style={{ overflow: 'visible' }}
      aria-hidden="true"
    >
      <defs>
        <filter id="sakura-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <style>{`
          @keyframes sakuraDotIn {
            0%   { opacity: 0; transform: scale(0); }
            65%  { opacity: 1; transform: scale(1.25); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes blossomBreathe {
            0%, 100% { transform: scale(1) translateY(0px); }
            50%       { transform: scale(1.12) translateY(-4px); }
          }
          @keyframes petalDrift {
            0%   { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; }
            33%  { transform: translateY(-10px) translateX(5px) rotate(22deg); opacity: 0.4; }
            66%  { transform: translateY(-6px) translateX(-4px) rotate(-12deg); opacity: 0.6; }
            100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.8; }
          }
        `}</style>
      </defs>

      {DOTS.map((dot, i) => {
        const isBlossom = dot.type === 'blossom';
        const isPetal = dot.type === 'petal';
        const floatDur = 2.4 + ((dot.cx * 7 + dot.cy * 3 + i) % 19) * 0.13;

        let anim = 'none';
        if (active) {
          const appear = `sakuraDotIn 0.55s ${dot.delay}s cubic-bezier(0.34,1.56,0.64,1) forwards`;
          if (isBlossom) {
            anim = `${appear}, blossomBreathe ${floatDur}s ${dot.delay + 0.65}s ease-in-out infinite`;
          } else if (isPetal) {
            anim = `${appear}, petalDrift ${floatDur + 1.2}s ${dot.delay + 0.65}s ease-in-out infinite`;
          } else {
            anim = appear;
          }
        }

        return (
          <g key={i} style={{ transform: `translate(${dot.cx}px, ${dot.cy}px)` }}>
            <g style={{ opacity: 0, animation: anim }}>
              <circle
                r={dot.r}
                fill={dot.color}
                filter={isBlossom ? 'url(#sakura-glow)' : undefined}
              />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
