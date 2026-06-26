import ToriiGate from './ToriiGate';

interface ToriiBgDecorationProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  opacity?: number;
  rotate?: number;
}

export default function ToriiBgDecoration({
  position,
  size = 300,
  opacity = 0.04,
  rotate = 0,
}: ToriiBgDecorationProps) {
  const posClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <div
      className={`absolute ${posClasses[position]} pointer-events-none z-0`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <ToriiGate
        width={size}
        height={size * 0.6}
        opacity={opacity}
        showKanji={false}
      />
    </div>
  );
}
