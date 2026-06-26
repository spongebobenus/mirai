import ToriiGate from './ToriiGate';

interface ToriiDividerProps {
  color?: string;
  className?: string;
}

export default function ToriiDivider({ color = '#DC2626', className = '' }: ToriiDividerProps) {
  return (
    <div className={`w-full h-[100px] flex items-center justify-center gap-6 relative overflow-hidden ${className}`}>
      <div className="w-20 h-px bg-[var(--border-color)]" />
      <ToriiGate width={160} height={90} color={color} opacity={0.15} />
      <div className="w-20 h-px bg-[var(--border-color)]" />
    </div>
  );
}
