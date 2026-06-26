interface StepItemProps {
  num: string;
  title: string;
  desc: string;
}

export default function StepItem({ num, title, desc }: StepItemProps) {
  return (
    <div className="group">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-[58px] h-[58px] border-2 border-[var(--accent-soft)] rounded-full flex items-center justify-center flex-shrink-0 bg-white transition-all duration-400 group-hover:border-[var(--accent)] group-hover:bg-[var(--accent-pale)] group-hover:scale-110">
          <span className="text-[22px] text-[var(--accent)]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            {num}
          </span>
        </div>
      </div>
      <div className="bg-white p-9 rounded-[20px] border border-[var(--border-light)] shadow-[var(--shadow)] flex-1">
        <h4
          className="text-[28px] font-semibold text-[var(--text-primary)] mb-3.5 leading-tight tracking-wide"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {title}
        </h4>
        <p className="text-base leading-relaxed text-[var(--text-secondary)]">{desc}</p>
      </div>
    </div>
  );
}
