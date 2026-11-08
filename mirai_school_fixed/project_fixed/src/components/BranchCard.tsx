import { Check, MapPin } from 'lucide-react';
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
  applyLabel: string;
  onApply: () => void;
}

export default function BranchCard({ num, tag, name, addr, price, priceLabel, features, badge, applyLabel, onApply }: BranchCardProps) {
  return (
    <div className="bg-[#153A66] border border-white/[0.06] p-12 relative transition-all duration-500 cursor-default rounded-[24px] overflow-hidden hover:bg-[#1E4A80] hover:-translate-y-2 hover:shadow-[0_28px_56px_rgba(0,0,0,0.28)] hover:border-white/10 group">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-[24px]" />

      {/* Torii watermark */}
      <div className="absolute top-5 right-5 opacity-[0.025] pointer-events-none">
        <ToriiGate width={100} height={60} showKanji={false} />
      </div>

      {/* Number */}
      <div
        className="text-[80px] font-extralight text-white/[0.03] absolute top-3 right-8 leading-none select-none"
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        {num}
      </div>

      {/* Tag */}
      <div className="inline-block text-[10px] tracking-[0.2em] uppercase text-[var(--torii-red-light)] border border-[var(--torii-red)]/20 px-4 py-1.5 rounded-full mb-7 font-bold bg-[var(--torii-red)]/[0.06]">
        {tag}
      </div>

      {/* Name */}
      <div className="text-[26px] font-semibold text-white mb-2 tracking-tight" style={{ fontFamily: "'Noto Serif JP', serif" }}>
        {name}
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 text-[13px] text-white/40 mb-8">
        <MapPin size={13} className="text-white/25 flex-shrink-0" />
        {addr}
      </div>

      {/* Price */}
      <div className="text-[60px] font-normal text-white leading-none mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        {price}<span className="text-[20px] text-white/30 font-light" style={{ fontFamily: "'Manrope', sans-serif" }}> 000 ₸</span>
      </div>
      <div className="text-[11px] tracking-[0.15em] uppercase text-white/20 mb-9 font-semibold">
        {priceLabel}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/[0.06] mb-7" />

      {/* Features */}
      <ul className="flex flex-col gap-4 mb-10">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-[14px] text-white/55 leading-relaxed">
            <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[var(--accent)]/15 flex items-center justify-center">
              <Check size={11} className="text-[var(--accent-light)]" strokeWidth={2.5} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onApply}
        className="btn-cta w-full py-4 border-[1.5px] border-white/15 text-white/70 text-[13px] tracking-[0.08em] uppercase font-bold cursor-pointer rounded-full bg-transparent hover:bg-white hover:text-[var(--bg-dark)] hover:border-white hover:shadow-[0_10px_28px_rgba(0,0,0,0.2)]"
      >
        {applyLabel}
      </button>

      {/* Badge */}
      <div className="absolute bottom-0 left-8 right-8 bg-[var(--accent)] text-white py-2.5 text-[11px] tracking-[0.15em] uppercase font-bold text-center rounded-t-xl">
        {badge}
      </div>
    </div>
  );
}
