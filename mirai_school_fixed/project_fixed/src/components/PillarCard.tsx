interface PillarCardProps {
  kanji: string;
  title: string;
  desc: string;
}

export default function PillarCard({ kanji, title, desc }: PillarCardProps) {
  return (
    <div className="card-cute card-glow bg-white rounded-[24px] border border-[var(--border-light)] relative overflow-hidden hover:border-transparent group cursor-default flex flex-col"
      style={{ padding: '40px 36px 36px' }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-[24px]"
        style={{ background: '#DC2626' }}
      />

      {/* Hover bg fill */}
      <div className="absolute top-0 left-0 right-0 h-0 bg-[var(--accent-pale)] transition-all duration-500 group-hover:h-full" />

      {/* Kanji block */}
      <div className="relative z-10 mb-7">
        <div
          className="text-[56px] font-extralight leading-none text-[var(--accent-soft)] transition-all duration-400 group-hover:text-[var(--accent)] group-hover:scale-110 origin-left"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          {kanji}
        </div>
        {/* Divider line under kanji */}
        <div className="mt-5 w-8 h-[2px] rounded-full bg-[var(--border-color)] transition-all duration-400 group-hover:w-14 group-hover:bg-[var(--accent)]" />
      </div>

      {/* Text block */}
      <div className="relative z-10 flex flex-col gap-3">
        <h3
          className="text-[17px] font-medium text-[var(--text-primary)] tracking-wide leading-snug"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          {title}
        </h3>
        <p className="text-[14px] leading-[1.75] text-[var(--text-secondary)]">
          {desc}
        </p>
      </div>

      {/* Corner accent */}
      <div className="absolute bottom-5 right-5 text-[11px] tracking-[0.15em] uppercase font-semibold text-[var(--border-color)] transition-colors duration-300 group-hover:text-[var(--accent-soft)] select-none">
        {kanji}
      </div>
    </div>
  );
}
