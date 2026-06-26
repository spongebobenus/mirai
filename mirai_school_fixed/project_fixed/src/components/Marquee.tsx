import { useLang } from '../context/LangContext';
import { t } from '../data/content';

const ICONS = ['桜', '学', '道', '心', '和', '美', '知', '誠'];

export default function Marquee() {
  const { lang } = useLang();
  const ct = t[lang];

  const items = ct.statsStrip.map((s, i) => ({
    label: s.label,
    icon: ICONS[i % ICONS.length],
  }));

  const doubled = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden bg-white border-y border-[var(--border-light)] py-3.5 select-none">
      <div
        className="absolute left-0 top-0 h-full w-16 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, white, transparent)' }}
      />
      <div
        className="absolute right-0 top-0 h-full w-16 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to left, white, transparent)' }}
      />
      <div className="marquee-track">
        {doubled.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 px-8"
          >
            <span
              className="text-[18px] text-[var(--accent-soft)]"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              {item.icon}
            </span>
            <span className="text-[11px] tracking-[0.18em] uppercase text-[var(--text-muted)] font-semibold whitespace-nowrap">
              {item.label}
            </span>
            <span className="w-1 h-1 rounded-full bg-[var(--border-color)] mx-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
