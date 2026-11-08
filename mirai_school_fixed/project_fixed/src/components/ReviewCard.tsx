import { Star } from 'lucide-react';

interface ReviewCardProps {
  text: string;
  name: string;
  role: string;
  avatar: string;
}

export default function ReviewCard({ text, name, role, avatar }: ReviewCardProps) {
  return (
    <div className="card-premium bg-white p-10 border border-[var(--border-light)] relative overflow-hidden hover:border-transparent group cursor-default flex flex-col">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--torii-red)] opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-[24px]" />

      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={15} fill="currentColor" className="text-[var(--torii-red)]" />
        ))}
      </div>

      {/* Quote text */}
      <div
        className="text-[17px] leading-[1.75] text-[var(--text-primary)] mb-7 flex-1"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic' }}
      >
        {text}
      </div>

      {/* Author */}
      <div className="flex items-center gap-4 pt-5 border-t border-[var(--border-light)]">
        <img
          src={avatar}
          alt={name}
          className="photo-styled w-12 h-12 rounded-full object-cover border-2 border-[var(--accent-pale)] group-hover:border-[var(--accent)] transition-colors duration-300 flex-shrink-0"
        />
        <div>
          <div
            className="text-[15px] font-semibold text-[var(--text-primary)] leading-tight"
            style={{ fontFamily: "'Manrope', sans-serif" }}
          >
            {name}
          </div>
          <div className="text-[12px] text-[var(--text-muted)] tracking-wide font-medium mt-0.5">
            {role}
          </div>
        </div>
      </div>

      {/* Decorative quote mark */}
      <div
        className="absolute top-4 right-6 text-[90px] text-[var(--accent-soft)] leading-none pointer-events-none select-none transition-colors duration-300 group-hover:text-[var(--accent-pale)]"
        style={{ fontFamily: "'Cormorant Garamond', serif", opacity: 0.5 }}
      >
        &ldquo;
      </div>
    </div>
  );
}
