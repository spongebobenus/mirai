import { Users, Building2, BookOpen, ThumbsUp, Trophy } from 'lucide-react';
import { useCountUp } from '../hooks/useCountUp';
import { useContent } from '../context/ContentContext';

const STAT_NUMS = [
  { num: 407, suffix: '' },
  { num: 2, suffix: '' },
  { num: 20, suffix: '+' },
  { num: 98, suffix: '%' },
  { num: 15, suffix: '+' },
];

const STAT_ICONS = [Users, Building2, BookOpen, ThumbsUp, Trophy];
const ACCENT_COLORS = ['#3B82F6', '#DC2626', '#60A5FA', '#3B82F6', '#DC2626'];

function StatItem({ num, suffix, label, accent, Icon }: { num: number; suffix: string; label: string; accent: string; Icon: React.ElementType }) {
  const { count, ref } = useCountUp(num, 1600);
  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center px-4 group">
      <Icon size={18} style={{ color: accent }} className="mb-2 opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
      <div
        className="text-[clamp(30px,3.8vw,50px)] font-bold leading-none tracking-tight transition-colors duration-400"
        style={{ fontFamily: "'Manrope', sans-serif", color: accent }}
      >
        {count}{suffix}
      </div>
      <div className="text-[10px] tracking-[0.18em] text-white/35 uppercase font-bold mt-1.5 group-hover:text-white/60 transition-colors duration-300">
        {label}
      </div>
    </div>
  );
}

export default function StatsStrip() {
  const ct = useContent();
  const items = ct.statsStrip;

  return (
    <section className="py-11 px-[5%] relative overflow-hidden" style={{ background: '#0F2A4D' }}>
      <div className="absolute inset-0 opacity-[0.018] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
      <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none" style={{ background: '#3B82F6' }} />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] pointer-events-none" style={{ background: 'rgba(255,255,255,0.07)' }} />
      <div className="flex justify-around items-center gap-6 flex-wrap relative z-10 max-w-5xl mx-auto">
        {items.map((item, i) => {
          const Icon = STAT_ICONS[i];
          return (
            <div key={i} className="flex items-center gap-6">
              <StatItem num={STAT_NUMS[i].num} suffix={STAT_NUMS[i].suffix} label={item.label} accent={ACCENT_COLORS[i]} Icon={Icon} />
              {i < items.length - 1 && (
                <div className="w-px h-12 hidden md:block" style={{ background: 'rgba(255,255,255,0.10)' }} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
