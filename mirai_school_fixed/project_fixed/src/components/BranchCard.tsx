import ToriiGate from './ToriiGate';

interface BranchCardProps {
  num: string;
  tag: string;
  name: string;
  addr: string;
  price: string;
  priceLabel: string;
  features: readonly string[];
  badge: string;
  onApply: () => void;
}

export default function BranchCard({ num, tag, name, addr, price, priceLabel, features, badge, onApply }: BranchCardProps) {
  return (
    <div className="bg-[var(--bg-dark-alt)] border border-white/[0.06] p-12 relative transition-all duration-500 cursor-default rounded-[20px] overflow-hidden hover:bg-white/[0.04] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(0,0,0,0.25)] hover:border-white/10 group">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      
      {/* Torii watermark */}
      <div className="absolute top-5 right-5 opacity-[0.02] pointer-events-none">
        <ToriiGate width={100} height={60} showKanji={false} />
      </div>

      {/* Number */}
      <div
        className="text-[72px] font-extralight text-white/[0.03] absolute top-5 right-8 leading-none"
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        {num}
      </div>

      {/* Tag */}
      <div className="inline-block text-[10px] tracking-[0.2em] uppercase text-[var(--torii-red-light)] border border-[var(--torii-red)]/20 px-4 py-1.5 rounded-full mb-6 font-semibold bg-[var(--torii-red)]/[0.06]">
        {tag}
      </div>

      {/* Name */}
      <div className="text-2xl text-white mb-1.5 tracking-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
        {name}
      </div>

      {/* Address */}
      <div className="text-[13px] text-white/35 mb-7 tracking-wide">{addr}</div>

      {/* Price */}
      <div className="text-[56px] font-normal text-white leading-none mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {price}<span className="text-lg text-white/30" style={{ fontFamily: "'Inter', sans-serif" }}> 000 ₸</span>
      </div>
      <div className="text-[11px] tracking-[0.15em] uppercase text-white/20 mb-8 font-medium">
        {priceLabel}
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-3.5 mb-9">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3.5 text-sm text-white/50 leading-relaxed">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
              <path d="M16.6667 5L7.5 14.1667L3.33333 10" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onApply}
        className="inline-block px-8 py-3.5 border-[1.5px] border-white/12 text-white/60 text-xs tracking-[0.1em] uppercase font-semibold cursor-pointer transition-all rounded-full bg-transparent hover:bg-white hover:text-[var(--bg-dark)] hover:border-white hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
      >
        Записаться на встречу
      </button>

      {/* Badge */}
      <div className="absolute bottom-0 left-10 right-10 bg-[var(--accent)] text-white py-2.5 text-[11px] tracking-[0.15em] uppercase font-semibold text-center rounded-t-lg">
        {badge}
      </div>
    </div>
  );
}
