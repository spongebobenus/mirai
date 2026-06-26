interface TeamCardProps {
  photo: string;
  name: string;
  role: string;
  desc: string;
}

export default function TeamCard({ photo, name, role, desc }: TeamCardProps) {
  return (
    <div className="card-cute card-glow bg-white p-10 pb-7 text-center rounded-[20px] border border-[var(--border-light)] relative overflow-hidden hover:border-transparent group">
      <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      <img
        src={photo}
        alt={name}
        className="w-28 h-28 rounded-full object-cover mx-auto mb-5 border-[3px] border-[var(--accent-pale)] relative z-10 transition-all duration-400 group-hover:border-[var(--accent)] group-hover:scale-105"
      />
      <div
        className="text-lg text-[var(--text-primary)] mb-1 relative z-10"
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        {name}
      </div>
      <div className="text-[11px] tracking-[0.12em] uppercase text-[var(--accent)] mb-3 font-semibold relative z-10">
        {role}
      </div>
      <div className="text-[13px] leading-relaxed text-[var(--text-secondary)] relative z-10">
        {desc}
      </div>
    </div>
  );
}
