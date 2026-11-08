import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { useLang } from '../context/LangContext';
import { useContent } from '../context/ContentContext';
import SectionHeader from '../components/SectionHeader';
import ToriiDivider from '../components/ToriiDivider';
import ToriiGate from '../components/ToriiGate';
import PillarCard from '../components/PillarCard';
import BranchCard from '../components/BranchCard';
import ModalForm from '../components/ModalForm';
import StatsStrip from '../components/StatsStrip';
import Marquee from '../components/Marquee';
import SchoolLife from '../components/SchoolLife';
import { useImages } from '../context/ContentContext';

export default function Home() {
  const { lang } = useLang();
  const ct = useContent();
  const imgs = useImages();
  const [modalOpen, setModalOpen] = useState(false);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      bgRef.current.style.transform = `scale(1.15) translateY(${window.scrollY * 0.18}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden" style={{ background: '#050A14' }}>

        {/* ── Background: video + image fallback + parallax ── */}
        <div
          ref={bgRef}
          className="absolute inset-0 will-change-transform"
          style={{ transform: 'scale(1.15)' }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={imgs.hero}
            className="w-full h-full object-cover"
          >
            <source src={imgs.heroVideo} type="video/mp4" />
            <img src={imgs.hero} alt="Mirai School" className="w-full h-full object-cover" />
          </video>
        </div>

        {/* ── Overlays ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(105deg, rgba(5,10,20,0.92) 0%, rgba(5,10,20,0.70) 55%, rgba(5,10,20,0.22) 100%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(5,10,20,0.80) 0%, transparent 45%)' }}
        />

        {/* ── Bottom accent line ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--torii-red)] opacity-90" />

        {/* ── Decorative kanji background ── */}
        <div
          className="absolute right-[7%] top-1/2 -translate-y-1/2 leading-none select-none pointer-events-none max-lg:right-[3%] max-md:hidden"
          style={{
            fontFamily: "'Noto Serif JP', serif",
            fontSize: 'clamp(120px, 18vw, 220px)',
            fontWeight: 200,
            color: 'rgba(255,255,255,0.028)',
          }}
        >
          未来
        </div>

        {/* ── Content ── */}
        <div className="relative z-10 px-[10%] pt-[110px] pb-[110px] max-w-5xl max-md:px-[5%] max-md:pt-28 max-md:pb-24">

          {/* Eyebrow */}
          <div
            className="flex items-center gap-3.5 mb-10 opacity-0"
            style={{ animation: 'fadeUp 0.8s 0.1s forwards' }}
          >
            <div className="w-8 h-0.5 bg-[var(--torii-red)] rounded-sm" />
            <span
              className="text-xs font-semibold uppercase tracking-[0.18em]"
              style={{ color: 'rgba(255,255,255,0.42)' }}
            >
              {ct.hero.eyebrow}
            </span>
          </div>

          {/* Main tagline — word-by-word reveal */}
          <h1
            className="leading-[1.0] tracking-tight mb-8"
            style={{
              fontFamily: "'Manrope', 'Noto Serif JP', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(52px, 9vw, 118px)',
            }}
          >
            {ct.hero.tagline.split(' ').map((word, i, arr) => {
              const isLast = i === arr.length - 1;
              return (
                <span
                  key={lang + i}
                  className="inline-block opacity-0"
                  style={{
                    animation: `fadeUp 0.65s ${0.28 + i * 0.16}s forwards`,
                    marginRight: isLast ? 0 : '0.22em',
                    color: isLast ? 'var(--torii-red)' : 'white',
                  }}
                >
                  {word}
                </span>
              );
            })}
          </h1>

          {/* Subtitle */}
          <p
            className="font-light mb-14 opacity-0 max-w-lg"
            style={{
              fontSize: 'clamp(16px, 1.8vw, 22px)',
              color: 'rgba(255,255,255,0.50)',
              letterSpacing: '0.01em',
              lineHeight: 1.65,
              animation: 'fadeUp 0.8s 0.9s forwards',
            }}
          >
            {ct.hero.desc}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex gap-4 items-center flex-wrap opacity-0"
            style={{ animation: 'fadeUp 0.8s 1.1s forwards' }}
          >
            <button
              onClick={() => setModalOpen(true)}
              className="btn-cta text-white text-[14px] tracking-[0.08em] font-semibold rounded-full cursor-pointer bg-[var(--torii-red)]"
              style={{
                padding: '17px 44px',
                boxShadow: '0 6px 32px rgba(220,38,38,0.48)',
              }}
            >
              {ct.cta.button}
            </button>
            <Link
              to="/admission"
              className="btn-outline-hero inline-flex items-center gap-2 text-[14px] tracking-[0.06em] font-medium rounded-full no-underline"
              style={{
                color: 'rgba(255,255,255,0.75)',
                padding: '16px 34px',
                border: '1.5px solid rgba(255,255,255,0.22)',
              }}
            >
              {ct.hero.ctaExcursion}
              <span className="text-base transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* ── Scroll indicator ── */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2.5 opacity-0"
          style={{ animation: 'fadeIn 1s 1.6s forwards' }}
        >
          <div
            className="w-px h-10"
            style={{ background: 'rgba(255,255,255,0.25)', animation: 'scrollLine 2s ease-in-out infinite' }}
          />
          <span
            className="text-[9px] tracking-[0.22em] uppercase font-medium"
            style={{ color: 'rgba(255,255,255,0.30)' }}
          >
            {ct.hero.scroll}
          </span>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <Marquee />

      {/* ===== STATS STRIP ===== */}
      <StatsStrip />

      {/* ===== ABOUT PREVIEW SECTION ===== */}
      <section className="py-[120px] px-[10%] bg-white max-md:py-[80px] max-md:px-[6%]">
        <div className="grid grid-cols-2 gap-20 items-center max-lg:grid-cols-1 max-lg:gap-12">
          {/* Left - Photo */}
          <div className="reveal">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[20px] shadow-[var(--shadow-xl)]">
                <img
                  src={imgs.classroom}
                  alt="Mirai School"
                  className="photo-styled w-full aspect-[4/5] object-cover block"
                />
              </div>
              {/* Decorative border */}
              <div
                className="absolute -top-4 -left-4 -bottom-4 -right-4 border-2 border-[var(--accent-soft)] rounded-[20px] -z-10"
                style={{ animation: 'borderFloat 5s ease-in-out infinite' }}
              />
              {/* Mon circle */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-white border-2 border-[var(--accent-soft)] rounded-full flex items-center justify-center text-[28px] font-light text-[var(--accent)] shadow-[var(--shadow-lg)]"
                style={{ fontFamily: "'Noto Serif JP', serif" }}
              >
                花
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="reveal reveal-d1">
            <SectionHeader
              en={ct.about.eyebrow}
              ja={ct.about.title}
            />
            <p className="text-[15px] leading-relaxed text-[var(--text-secondary)] mt-6">
              {ct.about.p1}
            </p>
            {/* Quote */}
            <div className="relative border-l-[3px] border-[var(--accent)] pl-7 py-6 bg-[var(--accent-pale)] rounded-r-[14px] my-5 overflow-hidden">
              <div
                className="absolute top-2 right-4 text-6xl text-[var(--accent-soft)] leading-none opacity-50 select-none"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                &ldquo;
              </div>
              <q
                className="text-[22px] italic text-[var(--text-primary)] leading-relaxed block relative z-10"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {ct.about.quote}
              </q>
              <cite className="block mt-3 text-[11px] tracking-[0.15em] text-[var(--text-muted)] uppercase not-italic font-semibold">
                {ct.about.cite}
              </cite>
            </div>
            <p className="text-[15px] leading-relaxed text-[var(--text-secondary)] mb-4">
              {ct.about.p2}
            </p>
            <div className="flex gap-2.5 flex-wrap mt-2">
              {[ct.about.chip1, ct.about.chip2, ct.about.chip3].map((chip) => (
                <span
                  key={chip}
                  className="px-[18px] py-2 border-[1.5px] border-[var(--border-color)] rounded-full text-xs tracking-wide text-[var(--text-secondary)] bg-white font-medium transition-all hover:border-[var(--accent)] hover:text-[var(--accent)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)] cursor-default"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PILLARS SECTION ===== */}
      <section className="py-[120px] px-[10%] max-md:py-[80px] max-md:px-[6%]" style={{ background: '#F0F4F8' }}>
        <div className="reveal">
          <SectionHeader
            en={ct.pillars.eyebrow}
            ja={ct.pillars.title}
          />
        </div>
        <ToriiDivider className="my-10" />
        <div className="grid grid-cols-3 gap-5 mt-14 max-lg:grid-cols-2 max-md:grid-cols-1">
          {ct.pillars.items.map((pillar, i) => (
            <div key={pillar.kanji} className={`reveal reveal-d${Math.min(i + 1, 3)}`}>
              <PillarCard {...pillar} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== BRANCHES PREVIEW SECTION ===== */}
      <section className="py-[120px] px-[10%] bg-[var(--bg-dark)] text-white relative overflow-hidden max-md:py-[80px] max-md:px-[6%]">

        <div className="reveal relative z-10">
          <SectionHeader
            en={ct.branches.eyebrow}
            ja={ct.branches.title}
            sub={ct.branches.subtitle}
            light
          />
        </div>
        <div className="grid grid-cols-2 gap-6 mt-14 relative z-10 max-lg:grid-cols-1">
          <div className="reveal">
            <BranchCard
              num="1"
              tag={ct.branches.branch1.tag}
              name={ct.branches.branch1.name}
              addr={ct.branches.branch1.addr}
              price={ct.branches.branch1.price}
              priceLabel={ct.branches.branch1.priceLabel}
              features={ct.branches.branch1.features}
              badge={ct.branches.branch1.badge}
              applyLabel={ct.cta.button}
              onApply={() => setModalOpen(true)}
            />
          </div>
          <div className="reveal reveal-d1">
            <BranchCard
              num="2"
              tag={ct.branches.branch2.tag}
              name={ct.branches.branch2.name}
              addr={ct.branches.branch2.addr}
              price={ct.branches.branch2.price}
              priceLabel={ct.branches.branch2.priceLabel}
              features={ct.branches.branch2.features}
              badge={ct.branches.branch2.badge}
              applyLabel={ct.cta.button}
              onApply={() => setModalOpen(true)}
            />
          </div>
        </div>
        <div className="text-center mt-12 relative z-10">
          <Link
            to="/branches"
            className="inline-flex items-center gap-2 text-[var(--accent-light)] text-sm tracking-wide font-semibold px-6 py-3.5 rounded-full border-[1.5px] border-white/20 no-underline transition-all bg-transparent hover:bg-white/5 hover:gap-3"
          >
            {ct.branches.more}
            <span className="text-base transition-transform">→</span>
          </Link>
        </div>
      </section>

      {/* ===== SCHOOL LIFE GALLERY ===== */}
      <SchoolLife />

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 px-[10%] text-center bg-[var(--bg)] max-md:px-[5%]">
        <div>
          <div className="flex justify-center mb-6">
            <ToriiGate width={120} height={70} opacity={0.08} />
          </div>
          <SectionHeader
            en={ct.admission.eyebrow}
            ja={ct.admission.title}
            centered
          />
          <p className="text-base text-[var(--text-secondary)] max-w-xl mx-auto mt-6 mb-8">
            {ct.cta.text}
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="btn-cta rainbow-pulse inline-block bg-[var(--torii-red)] text-white text-sm tracking-wide font-semibold rounded-full"
            style={{ padding: '17px 52px', boxShadow: '0 6px 32px rgba(220,38,38,0.48)' }}
          >
            {ct.cta.button}
          </button>
        </div>
      </section>

      {/* Modal */}
      <ModalForm isOpen={modalOpen} onClose={() => setModalOpen(false)} t={{ modal: ct.modal, contact: ct.contact }} />
    </>
  );
}
