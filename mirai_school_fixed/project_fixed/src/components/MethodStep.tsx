interface MethodStepProps {
  num: string;
  title: string;
  desc: string;
}

export default function MethodStep({ num, title, desc }: MethodStepProps) {
  return (
    <div className="flex gap-6 items-start p-7 bg-white rounded-[20px] border border-[var(--border-light)] transition-all duration-400 hover:border-[var(--accent-soft)] hover:shadow-[var(--shadow)] hover:translate-x-1.5">
      <div
        className="text-[32px] font-extralight text-[var(--accent)] leading-none w-12 flex-shrink-0 pt-1 opacity-50"
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        {num}
      </div>
      <div>
        <h4 className="text-lg text-[var(--text-primary)] mb-2" style={{ fontFamily: "'Noto Serif JP', serif" }}>
          {title}
        </h4>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{desc}</p>
      </div>
    </div>
  );
}
