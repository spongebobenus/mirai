import { useCountUp } from '../hooks/useCountUp';
import { useLang } from '../context/LangContext';
import { t } from '../data/content';

const STAT_NUMS = [
  { num: 310, suffix: '' },
  { num: 2, suffix: '' },
  { num: 20, suffix: '+' },
  { num: 98, suffix: '%' },
  { num: 15, suffix: '+' },
];

const ACCENT_COLORS = ['#3B82F6', '#DC2626', '#D4A853', '#3B82F6', '#DC2626'];

function StatItem({ num, suffix, label, accent }: { num: number; suffix: string; label: string; accent: string }) {
  const { count, ref } = useCountUp(num, 1600);
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center px-4 group">
      <div
        className="text-[clamp(32px,4vw,52px)] font-extralight leading-none tracking-tight transition-colors duration-400"
        style={{ fontFamily: "'Noto Serif JP', serif", color: accent }}
      >
        {count}{suffix}
      </div>
      <div className="text-[10px] tracking-[0.18em] text-white/35 uppercase font-semibold mt-1.5 group-hover:text-white/60 transition-colors duration-300">
        {label}
      </div>
    </div>
  );
}

export default function StatsStrip() {
  const { lang } = useLang();
  const items = t[lang].statsStrip;

  return (
    <section className="py-10 px-[5%] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F2A4D 0%, #0a1e38 60%, #0F2A4D 100%)' }}>
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.018] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      {/* Top + bottom accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, #3B82F6 30%, #DC2626 70%, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)' }} />
      <div className="flex justify-around items-center gap-6 flex-wrap relative z-10 max-w-5xl mx-auto">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-6">
            <StatItem num={STAT_NUMS[i].num} suffix={STAT_NUMS[i].suffix} label={item.label} accent={ACCENT_COLORS[i]} />
            {i < items.length - 1 && (
              <div className="w-px h-12 hidden md:block" style={{ background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)' }} />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
