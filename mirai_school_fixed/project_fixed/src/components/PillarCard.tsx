interface PillarCardProps {
  kanji: string;
  title: string;
  desc: string;
}

export default function PillarCard({ kanji, title, desc }: PillarCardProps) {
  return (
    <div className="card-cute card-glow bg-white p-10 pb-8 rounded-[20px] border border-[var(--border-light)] relative overflow-hidden hover:border-transparent group cursor-default">
      <div className="absolute top-0 left-0 right-0 h-0 bg-[var(--accent-pale)] transition-all duration-500 group-hover:h-full" />
      <div className="absolute top-0 left-0 right-0 h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-[20px]"
        style={{ background: 'linear-gradient(90deg, #3B82F6, #DC2626, #D4A853)' }}
      />
      <div
        className="text-[44px] font-extralight text-[var(--accent-soft)] mb-4 transition-all duration-400 leading-none relative z-10 group-hover:text-[var(--accent)] group-hover:scale-105"
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        {kanji}
      </div>
      <h3
        className="text-lg text-[var(--text-primary)] mb-3 tracking-wide relative z-10"
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-[var(--text-secondary)] relative z-10">
        {desc}
      </p>
    </div>
  );
}
