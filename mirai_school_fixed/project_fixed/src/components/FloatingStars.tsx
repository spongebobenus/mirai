import { useMemo } from 'react';

const COLORS = [
  '#3B82F6', // синий
  '#DC2626', // красный
  '#60A5FA', // голубой
  '#EF4444', // светло-красный
  '#2563EB', // насыщенный синий
];

// 4-лучевая звёздочка
function StarShape({ size, color }: { size: number; color: string }) {
  const r = size / 2;
  const points = [0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
    const rad = (deg * Math.PI) / 180;
    const len = i % 2 === 0 ? r : r * 0.38;
    return `${r + Math.cos(rad) * len},${r + Math.sin(rad) * len}`;
  }).join(' ');

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={points} fill={color} />
      <circle cx={r} cy={r} r={r * 0.22} fill="white" opacity="0.8" />
    </svg>
  );
}

export default function FloatingStars() {
  const stars = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: (i * 4.8 + 2) % 100,
      duration: 14 + (i % 6) * 3,
      delay: -(i * 2.1),
      size: 8 + (i % 4) * 4,
      color: COLORS[i % COLORS.length],
      twinkleDuration: 1.2 + (i % 3) * 0.6,
    }));
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.left}vw`,
            bottom: '-30px',
            animation: `starFloat ${s.duration}s ${s.delay}s linear infinite`,
          }}
        >
          <div
            style={{
              animation: `twinkle ${s.twinkleDuration}s ease-in-out infinite`,
              filter: `drop-shadow(0 0 ${s.size * 0.6}px ${s.color})`,
              opacity: 0.5,
            }}
          >
            <StarShape size={s.size} color={s.color} />
          </div>
        </div>
      ))}
    </div>
  );
}
