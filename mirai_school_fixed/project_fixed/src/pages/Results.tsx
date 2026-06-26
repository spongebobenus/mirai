import { useState } from 'react';
import { Link } from 'react-router';
import { useLang } from '../context/LangContext';
import { t } from '../data/content';
import SectionHeader from '../components/SectionHeader';
import ToriiBgDecoration from '../components/ToriiBgDecoration';
import ModalForm from '../components/ModalForm';
import { useCountUp } from '../hooks/useCountUp';

const STAT_VALUES = [
  { num: 310, suffix: '' },
  { num: 2, suffix: '' },
  { num: 20, suffix: '+' },
  { num: 98, suffix: '%' },
  { num: 15, suffix: '+' },
  { num: 4, suffix: '' },
];

function AnimatedStat({ num, suffix, label, desc }: { num: number; suffix: string; label: string; desc: string }) {
  const { count, ref } = useCountUp(num, 1800);
  return (
    <div ref={ref} className="bg-white/[0.03] border border-white/[0.06] rounded-[20px] p-8 text-center hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-1">
      <div
        className="text-[clamp(40px,5vw,64px)] font-extralight text-white leading-none tracking-tight mb-3"
        style={{ fontFamily: "'Noto Serif JP', serif" }}
      >
        <span className="text-[var(--torii-red)]">{count}</span>
        <span className="text-[var(--accent-light)]">{suffix}</span>
      </div>
      <div className="text-[13px] font-semibold text-white/70 tracking-wide mb-1">{label}</div>
      <div className="text-[11px] text-white/30 tracking-wide">{desc}</div>
    </div>
  );
}

function SatisfactionBar({ label, pct }: { label: string; pct: string }) {
  const value = parseInt(pct, 10);
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-[13px] text-[var(--text-secondary)] font-medium">{label}</span>
        <span className="text-[13px] font-bold text-[var(--accent)]">{pct}%</span>
      </div>
      <div className="h-2 bg-[var(--border-color)] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-light)] rounded-full transition-all duration-1000"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default function Results() {
  const { lang } = useLang();
  const ct = t[lang];
  const rp = ct.resultsPage;
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const tabs = [rp.tab1, rp.tab2, rp.tab3];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="pt-[140px] pb-20 px-[10%] text-center bg-[var(--bg-dark)] relative overflow-hidden max-md:px-[5%] max-md:pt-[120px]">
        <ToriiBgDecoration position="top-left" size={300} opacity={0.04} rotate={-8} />
        <ToriiBgDecoration position="top-right" size={280} opacity={0.04} rotate={8} />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="reveal relative z-10">
          <div className="text-xs text-white/30 mb-6">
            <Link to="/" className="no-underline text-white/30 hover:text-white/60 transition-colors">{ct.breadcrumb.home}</Link>
            <span className="mx-2">/</span>
            <span>{ct.nav.results}</span>
          </div>
          <SectionHeader
            en={rp.heroEyebrow}
            ja={rp.heroTitle}
            light
            centered
          />
          <p className="text-base text-white/50 max-w-2xl mx-auto mt-6">
            {rp.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ===== ANIMATED STATS GRID ===== */}
      <section className="py-[100px] px-[10%] bg-[var(--bg-dark)] max-md:py-[72px] max-md:px-[6%]">
        <div className="reveal">
          <SectionHeader en={rp.statsEyebrow} ja={rp.statsTitle} light />
        </div>
        <div className="grid grid-cols-3 gap-5 mt-14 max-lg:grid-cols-2 max-md:grid-cols-1">
          {rp.stats.map((s, i) => (
            <div key={i} className={`reveal reveal-d${Math.min(i + 1, 3)}`}>
              <AnimatedStat
                num={STAT_VALUES[i].num}
                suffix={STAT_VALUES[i].suffix}
                label={s.label}
                desc={s.desc}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== TABS SECTION ===== */}
      <section className="py-[100px] px-[10%] bg-[var(--bg)] max-md:py-[72px] max-md:px-[6%]">
        {/* Tab nav */}
        <div className="reveal flex gap-2 flex-wrap mb-14">
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`px-7 py-3 rounded-full text-[13px] font-semibold tracking-wide border-[1.5px] transition-all cursor-pointer ${
                activeTab === i
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-[0_4px_14px_rgba(59,130,246,0.25)]'
                  : 'bg-white text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab 0: Students */}
        {activeTab === 0 && (
          <div key="tab-0" style={{ animation: 'fadeUp 0.5s forwards' }}>
            <SectionHeader en={rp.studentsEyebrow} ja={rp.studentsTitle} />
            <div className="grid grid-cols-2 gap-8 mt-14 max-lg:grid-cols-1">
              {/* Branch 1 */}
              <div className="bg-white rounded-[20px] p-8 shadow-[var(--shadow-lg)] border border-[var(--border-light)]">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-[11px] tracking-[0.15em] text-[var(--accent)] font-semibold uppercase mb-2">
                      {ct.branches.eyebrow} 1
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">{rp.branch1Name}</h3>
                    <p className="text-[13px] text-[var(--text-muted)] mt-1">{rp.branch1Sub}</p>
                  </div>
                  <div
                    className="w-14 h-14 bg-[var(--accent-pale)] rounded-full flex items-center justify-center text-2xl font-light text-[var(--accent)]"
                    style={{ fontFamily: "'Noto Serif JP', serif" }}
                  >
                    花
                  </div>
                </div>
                <div className="flex gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-extralight text-[var(--torii-red)]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                      {rp.branch1Count}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mt-1 font-medium">
                      {rp.enrolled}
                    </div>
                  </div>
                  <div className="w-px bg-[var(--border-light)]" />
                  <div className="text-center">
                    <div className="text-5xl font-extralight text-[var(--accent)]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                      {rp.branch1Capacity}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mt-1 font-medium">
                      max
                    </div>
                  </div>
                  <div className="w-px bg-[var(--border-light)]" />
                  <div className="text-center">
                    <div className="text-5xl font-extralight text-[#16a34a]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                      {rp.branch1Free}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mt-1 font-medium">
                      {rp.freeLabel}
                    </div>
                  </div>
                </div>
                {/* Fill bar */}
                <div className="mb-1 flex justify-between text-[11px] text-[var(--text-muted)]">
                  <span>{rp.branch1Count} {rp.ofLabel} {rp.branch1Capacity}</span>
                  <span>80%</span>
                </div>
                <div className="h-2.5 bg-[var(--border-light)] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--torii-red)] rounded-full" style={{ width: '80%' }} />
                </div>
                {/* Grade bar */}
                <div className="mt-5 flex gap-1.5">
                  {['1', '2', '3', '4'].map((g) => (
                    <div key={g} className="flex-1">
                      <div className="bg-[var(--accent)] rounded-t-sm h-6 opacity-80" />
                      <div className="text-center text-[10px] text-[var(--text-muted)] mt-1 font-medium">{g}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Branch 2 */}
              <div className="bg-white rounded-[20px] p-8 shadow-[var(--shadow-lg)] border border-[var(--border-light)]">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-[11px] tracking-[0.15em] text-[var(--torii-red)] font-semibold uppercase mb-2">
                      {ct.branches.eyebrow} 2
                    </div>
                    <h3 className="text-xl font-semibold text-[var(--text-primary)]">{rp.branch2Name}</h3>
                    <p className="text-[13px] text-[var(--text-muted)] mt-1">{rp.branch2Sub}</p>
                  </div>
                  <div
                    className="w-14 h-14 bg-[var(--torii-red-pale)] rounded-full flex items-center justify-center text-2xl font-light text-[var(--torii-red)]"
                    style={{ fontFamily: "'Noto Serif JP', serif" }}
                  >
                    桜
                  </div>
                </div>
                <div className="flex gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-5xl font-extralight text-[var(--torii-red)]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                      {rp.branch2Count}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mt-1 font-medium">
                      {rp.enrolled}
                    </div>
                  </div>
                  <div className="w-px bg-[var(--border-light)]" />
                  <div className="text-center">
                    <div className="text-5xl font-extralight text-[var(--accent)]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                      {rp.branch2Capacity}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mt-1 font-medium">
                      max
                    </div>
                  </div>
                  <div className="w-px bg-[var(--border-light)]" />
                  <div className="text-center">
                    <div className="text-5xl font-extralight text-[#16a34a]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
                      {rp.branch2Free}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wide mt-1 font-medium">
                      {rp.freeLabel}
                    </div>
                  </div>
                </div>
                {/* Fill bar */}
                <div className="mb-1 flex justify-between text-[11px] text-[var(--text-muted)]">
                  <span>{rp.branch2Count} {rp.ofLabel} {rp.branch2Capacity}</span>
                  <span>60%</span>
                </div>
                <div className="h-2.5 bg-[var(--border-light)] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--torii-red)] rounded-full" style={{ width: '60%' }} />
                </div>
                {/* Grade bar — proportional heights */}
                <div className="mt-5 flex gap-1.5 items-end">
                  {[
                    { g: '1', h: 24 }, { g: '2', h: 20 }, { g: '3', h: 22 },
                    { g: '4', h: 18 }, { g: '5', h: 16 }, { g: '6', h: 14 },
                    { g: '7', h: 14 }, { g: '8', h: 12 }, { g: '9', h: 10 },
                  ].map(({ g, h }) => (
                    <div key={g} className="flex-1">
                      <div className="bg-[var(--torii-red)] rounded-t-sm opacity-70" style={{ height: `${h}px` }} />
                      <div className="text-center text-[9px] text-[var(--text-muted)] mt-1 font-medium">{g}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Satisfaction bars */}
            <div className="mt-12 bg-white rounded-[20px] p-8 shadow-[var(--shadow)] border border-[var(--border-light)]">
              <SectionHeader en={rp.satisfactionEyebrow} ja={rp.satisfactionTitle} />
              <div className="flex flex-col gap-5 mt-8">
                {rp.satisfactionItems.map((item) => (
                  <SatisfactionBar key={item.label} label={item.label} pct={item.pct} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: Teachers */}
        {activeTab === 1 && (
          <div key="tab-1" style={{ animation: 'fadeUp 0.5s forwards' }}>
            <SectionHeader en={rp.teachersEyebrow} ja={rp.teachersTitle} />
            <div className="grid grid-cols-4 gap-5 mt-14 max-lg:grid-cols-2 max-md:grid-cols-1">
              {rp.teacherStats.map((s, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[20px] p-7 text-center shadow-[var(--shadow)] border border-[var(--border-light)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div
                    className="text-4xl font-extralight text-[var(--accent)] mb-3"
                    style={{ fontFamily: "'Noto Serif JP', serif" }}
                  >
                    {s.num}
                  </div>
                  <div className="text-[12px] text-[var(--text-muted)] tracking-wide leading-relaxed font-medium">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 bg-[var(--accent-pale)] border-l-[3px] border-[var(--accent)] rounded-r-[14px] p-7">
              <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
                {rp.teacherDesc}
              </p>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-lg:grid-cols-1">
              {ct.team.members.map((member, i) => (
                <div key={i} className="bg-white rounded-[20px] p-6 shadow-[var(--shadow)] border border-[var(--border-light)]">
                  <div className="text-[11px] tracking-[0.12em] text-[var(--accent)] uppercase font-semibold mb-3">
                    {member.role}
                  </div>
                  <h4 className="text-[16px] font-semibold text-[var(--text-primary)] mb-2">{member.name}</h4>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{member.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Achievements */}
        {activeTab === 2 && (
          <div key="tab-2" style={{ animation: 'fadeUp 0.5s forwards' }}>
            <SectionHeader en={rp.achieveEyebrow} ja={rp.achieveTitle} />
            <div className="grid grid-cols-2 gap-6 mt-14 max-md:grid-cols-1">
              {rp.achievements.map((a) => (
                <div
                  key={a.num}
                  className="bg-white rounded-[20px] p-8 shadow-[var(--shadow-lg)] border border-[var(--border-light)] hover:-translate-y-1 transition-all duration-300 flex gap-6"
                >
                  <div
                    className="text-[28px] font-extralight text-[var(--torii-red)] opacity-40 flex-shrink-0 mt-1"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {a.num}
                  </div>
                  <div>
                    <h4 className="text-[17px] font-semibold text-[var(--text-primary)] mb-2">{a.title}</h4>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Satisfaction summary */}
            <div className="mt-12 bg-[var(--bg-dark)] rounded-[20px] p-10 text-center">
              <div
                className="text-[clamp(52px,6vw,80px)] font-extralight text-[var(--torii-red)] leading-none"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                98%
              </div>
              <div className="text-white/60 text-[14px] tracking-wide mt-3">
                {rp.satisfactionItems[0].label}
              </div>
              <div className="text-white/25 text-[11px] tracking-[0.15em] uppercase mt-2">
                {rp.satisfactionEyebrow}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 px-[10%] text-center bg-[var(--bg-warm)] max-md:px-[5%]">
        <SectionHeader
          en={ct.admission.eyebrow}
          ja={ct.cta.text}
          centered
        />
        <button
          onClick={() => setModalOpen(true)}
          className="mt-8 inline-block bg-[var(--torii-red)] text-white px-10 py-4 text-sm tracking-wide font-semibold rounded-full transition-all shadow-[0_4px_14px_rgba(220,38,38,0.22)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(220,38,38,0.32)] hover:bg-[var(--torii-red-light)]"
        >
          {ct.cta.button}
        </button>
      </section>

      <ModalForm isOpen={modalOpen} onClose={() => setModalOpen(false)} t={{ modal: ct.modal, contact: ct.contact }} />
    </>
  );
}
