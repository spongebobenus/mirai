interface SectionHeaderProps {
  en: string;
  ja: string;
  sub?: string;
  centered?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({ en, ja, sub, centered = false, light = false, className = '' }: SectionHeaderProps) {
  return (
    <div className={className}>
      <div className={`section-en ${centered ? 'centered' : ''} ${light ? '[&::before]:bg-white/15 text-white/30' : ''}`}>
        <span>{en}</span>
      </div>
      <h2
        className={`section-ja mt-3 mb-4 ${light ? 'text-white' : ''}`}
        dangerouslySetInnerHTML={{ __html: ja }}
      />
      {sub && (
        <p className={`section-sub ${light ? 'text-white/40' : ''} ${centered ? 'mx-auto' : ''}`}>
          {sub}
        </p>
      )}
    </div>
  );
}
