interface ReviewCardProps {
  text: string;
  name: string;
  role: string;
  avatar: string;
}

const IconStar = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
);

export default function ReviewCard({ text, name, role, avatar }: ReviewCardProps) {
  return (
    <div className="card-cute card-glow bg-white p-9 rounded-[20px] border border-[var(--border-light)] relative hover:border-transparent">
      <div className="flex gap-0.5 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-[#D4A853]">
            <IconStar />
          </span>
        ))}
      </div>
      <div
        className="text-lg leading-relaxed text-[var(--text-primary)] mb-6 italic"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {text}
      </div>
      <div className="flex items-center gap-3.5">
        <img src={avatar} alt={name} className="w-11 h-11 rounded-full object-cover border-2 border-[var(--accent-pale)]" />
        <div>
          <div className="text-[15px] text-[var(--text-primary)]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            {name}
          </div>
          <div className="text-[11px] text-[var(--text-muted)] tracking-wide font-medium">
            {role}
          </div>
        </div>
      </div>
      <div
        className="absolute top-5 right-6 text-[80px] text-[var(--accent-soft)] leading-none pointer-events-none select-none"
        style={{ fontFamily: "'Cormorant Garamond', serif", opacity: 0.4 }}
      >
        &ldquo;
      </div>
    </div>
  );
}
