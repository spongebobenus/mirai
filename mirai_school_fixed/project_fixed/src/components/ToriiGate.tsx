interface ToriiGateProps {
  width?: number;
  height?: number;
  color?: string;
  opacity?: number;
  animated?: boolean;
  showKanji?: boolean;
  className?: string;
  kanjiText?: string;
}

export default function ToriiGate({
  width = 200,
  height = 120,
  color = '#DC2626',
  opacity = 1,
  animated = false,
  showKanji = true,
  className = '',
  kanjiText = '鳥居',
}: ToriiGateProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        opacity,
        animation: animated ? 'toriiPulse 3s ease-in-out infinite' : undefined,
      }}
    >
      {/* Left hashira (pillar) */}
      <rect x="28" y="18" width="14" height="95" rx="2" fill={color} />
      {/* Right hashira */}
      <rect x="158" y="18" width="14" height="95" rx="2" fill={color} />
      {/* Kasagi (top lintel - curved) */}
      <path
        d="M5 12 Q100 2 195 12 L193 20 Q100 10 7 20 Z"
        fill={color}
      />
      {/* Shimaki (lower top bar) */}
      <rect x="15" y="22" width="170" height="8" rx="2" fill={color} />
      {/* Nuki (middle crossbar) */}
      <rect x="22" y="48" width="156" height="7" rx="2" fill={color} />
      {/* Kusabi left */}
      <rect x="38" y="43" width="6" height="17" rx="1" fill={color} />
      {/* Kusabi right */}
      <rect x="156" y="43" width="6" height="17" rx="1" fill={color} />
      {/* Gakuzuka (center tablet) */}
      {showKanji && (
        <g>
          <rect x="82" y="30" width="36" height="48" rx="3" fill={color} opacity="0.9" />
          <text
            x="100"
            y="60"
            textAnchor="middle"
            fontFamily="'Noto Serif JP', serif"
            fontSize="18"
            fill="white"
            fontWeight="400"
          >
            {kanjiText}
          </text>
        </g>
      )}
      {/* Foundation base */}
      <rect x="20" y="108" width="40" height="6" rx="2" fill={color} opacity="0.6" />
      <rect x="140" y="108" width="40" height="6" rx="2" fill={color} opacity="0.6" />
    </svg>
  );
}
