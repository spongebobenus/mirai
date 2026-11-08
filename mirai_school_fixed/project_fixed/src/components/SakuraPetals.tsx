import { useMemo } from 'react';

const PETAL_COLORS = [
  '#FCA5A5', '#FECACA', '#F87171', '#FCA5A5',
  '#93C5FD', '#BFDBFE', '#60A5FA', '#93C5FD',
];

// Настоящая 5-лепестковая сакура
function SakuraSVG({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      {[0, 72, 144, 216, 288].map((deg) => (
        <ellipse
          key={deg}
          cx="20" cy="20"
          rx="7" ry="11"
          fill={color}
          opacity="0.82"
          transform={`rotate(${deg} 20 20) translate(0 -10)`}
          style={{ transformOrigin: '20px 20px' }}
        />
      ))}
      <circle cx="20" cy="20" r="3" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

export default function SakuraPetals() {
  const petals = useMemo(() => {
    return Array.from({ length: 28 }, (_, i) => ({
      id: i,
      left: (i * 3.7 + Math.random() * 6) % 100,
      duration: 12 + (i % 7) * 2.5,
      delay: -(i * 1.8),
      size: 14 + (i % 5) * 5,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      spin: i % 2 === 0 ? 480 : -360,
      drift: (i % 3 - 1) * 60,
    }));
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}vw`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          <SakuraSVG size={p.size} color={p.color} />
        </div>
      ))}
    </div>
  );
}
