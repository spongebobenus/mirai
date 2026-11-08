import { GraduationCap } from 'lucide-react';

interface TeamCardProps {
  photo: string;
  name: string;
  role: string;
  desc: string;
}

export default function TeamCard({ photo, name, role, desc }: TeamCardProps) {
  return (
    <div className="card-premium bg-white border border-[var(--border-light)] relative overflow-hidden hover:border-transparent group cursor-default text-center flex flex-col items-center"
      style={{ padding: '44px 32px 36px' }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-[24px]" />

      {/* Photo */}
      <div className="relative mb-6">
        <img
          src={photo}
          alt={name}
          className="photo-styled w-32 h-32 rounded-full object-cover border-[3px] border-[var(--accent-pale)] group-hover:border-[var(--accent)] transition-all duration-400 group-hover:scale-105"
        />
        <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-[var(--accent)] rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
          <GraduationCap size={16} className="text-white" />
        </div>
      </div>

      {/* Name */}
      <div
        className="text-[18px] font-semibold text-[var(--text-primary)] mb-1 leading-tight"
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        {name}
      </div>

      {/* Role badge */}
      <div className="inline-flex items-center gap-1.5 text-[11px] tracking-[0.12em] uppercase text-[var(--accent)] font-bold mb-5 px-3 py-1 bg-[var(--accent-pale)] rounded-full">
        {role}
      </div>

      {/* Divider */}
      <div className="w-10 h-[1.5px] bg-[var(--border-color)] rounded-full mb-5 group-hover:w-16 group-hover:bg-[var(--accent)] transition-all duration-400" />

      {/* Description */}
      <p className="text-[13.5px] leading-[1.75] text-[var(--text-secondary)]">
        {desc}
      </p>
    </div>
  );
}
