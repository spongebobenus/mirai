import { useState } from 'react';
import { Link } from 'react-router';
import { useLang } from '../context/LangContext';
import { t } from '../data/content';
import SectionHeader from '../components/SectionHeader';
import ToriiDivider from '../components/ToriiDivider';
import ToriiGate from '../components/ToriiGate';
import PillarCard from '../components/PillarCard';
import BranchCard from '../components/BranchCard';
import ModalForm from '../components/ModalForm';
import StatsStrip from '../components/StatsStrip';
import Marquee from '../components/Marquee';
import { IMAGES } from '../data/images';

export default function Home() {
  const { lang } = useLang();
  const ct = t[lang];
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="min-h-[100dvh] grid grid-cols-2 max-md:grid-cols-1 relative overflow-hidden bg-[var(--bg)]">
        {/* Gradient orbs */}
        <div className="absolute top-[15%] right-[2%] w-[500px] h-[500px] rounded-full blur-[140px] opacity-[0.06] pointer-events-none" style={{ background: 'radial-gradient(circle, #F472B6, #3B82F6)' }} />
        <div className="absolute bottom-[5%] left-[2%] w-[380px] h-[380px] rounded-full blur-[110px] opacity-[0.05] pointer-events-none" style={{ background: 'radial-gradient(circle, #D4A853, #DC2626)' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full blur-[160px] opacity-[0.035] pointer-events-none" style={{ background: 'radial-gradient(circle, #3B82F6, transparent)' }} />

        {/* Torii silhouette in background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-[1] pointer-events-none w-[320px] h-[180px] opacity-[0.08]">
          <ToriiGate width={320} height={180} showKanji={false} />
        </div>

        {/* Left column */}
        <div className="flex flex-col justify-center pt-[120px] pb-20 pl-[10%] pr-[8%] relative z-[2] max-md:pt-28 max-md:pb-12 max-md:px-[5%]">
          {/* Eyebrow */}
          <div
            className="flex items-center gap-3.5 mb-8 opacity-0"
            style={{ animation: 'fadeUp 0.8s 0.2s forwards' }}
          >
            <div className="w-8 h-0.5 bg-[var(--accent)] rounded-sm" />
            <span className="text-xs tracking-[0.15em] text-[var(--accent)] font-semibold uppercase">
              {ct.hero.eyebrow}
            </span>
          </div>

          {/* Hero Kanji */}
          <div
            className="opacity-0"
            style={{ animation: 'fadeUp 0.9s 0.35s forwards' }}
          >
            <div
              className="text-[clamp(52px,7vw,96px)] font-extralight text-[var(--text-primary)] leading-[0.95] tracking-tight"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              未来<span className="text-[var(--torii-red)] font-light">学</span>
              <br />校
            </div>
          </div>

          {/* Title */}
          <div
            className="text-[clamp(18px,2.2vw,26px)] font-normal text-[var(--text-secondary)] tracking-wide mt-3 mb-8 italic opacity-0"
            style={{ fontFamily: "'Cormorant Garamond', serif", animation: 'fadeUp 0.8s 0.5s forwards' }}
          >
            {ct.hero.title}
          </div>

          {/* Description */}
          <p
            className="text-base leading-relaxed text-[var(--text-secondary)] max-w-[460px] mb-10 font-normal opacity-0"
            style={{ animation: 'fadeUp 0.8s 0.65s forwards' }}
          >
            {ct.hero.desc}
          </p>

          {/* Buttons */}
          <div
            className="flex gap-4 items-center flex-wrap opacity-0"
            style={{ animation: 'fadeUp 0.8s 0.8s forwards' }}
          >
            <Link
              to="/admission"
              className="shimmer-btn inline-block bg-[var(--accent)] text-white px-8 py-3.5 text-sm tracking-wide font-semibold rounded-full no-underline transition-all shadow-[0_4px_14px_rgba(59,130,246,0.22)] hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(59,130,246,0.32)] hover:bg-[var(--accent-light)]"
            >
              {ct.hero.ctaPrimary}
            </Link>
            <Link
              to="/branches"
              className="inline-flex items-center gap-2 text-[var(--accent)] text-sm tracking-wide font-semibold px-6 py-3.5 rounded-full border-[1.5px] border-[var(--accent-soft)] no-underline transition-all bg-transparent hover:bg-[var(--accent-pale)] hover:gap-3"
            >
              {ct.hero.ctaSecondary}
              <span className="text-base transition-transform">→</span>
            </Link>
          </div>
        </div>

        {/* Right column */}
        <div className="relative overflow-hidden flex items-center justify-center p-10 max-md:min-h-[400px] max-md:p-6">
          <div className="relative w-full h-full min-h-[500px] rounded-[20px] overflow-hidden shadow-[var(--shadow-xl)] max-md:min-h-[350px]">
            <img
              src={IMAGES.hero}
              alt="Mirai School"
              className="w-full h-full object-cover block transition-transform duration-[12s] hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(15,42,77,0.12)] pointer-events-none" />
            
            {/* Torii overlay */}
            <div
              className="absolute -bottom-5 -right-8 z-[2] opacity-0"
              style={{ animation: 'fadeUp 1s 0.8s forwards' }}
            >
              <ToriiGate width={180} height={110} animated />
            </div>

            {/* Seal */}
            <div className="wiggle-sweet absolute bottom-8 left-8 z-[2] w-16 h-16 bg-[var(--torii-red)] text-white rounded-full flex items-center justify-center text-base tracking-wide shadow-[0_8px_32px_rgba(220,38,38,0.35)]"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              未来
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2.5 opacity-0"
          style={{ animation: 'fadeIn 1s 1.2s forwards' }}
        >
          <div className="w-px h-10 bg-[var(--accent)]" style={{ animation: 'scrollLine 2s ease-in-out infinite' }} />
          <span className="text-[10px] tracking-[0.2em] text-[var(--text-muted)] uppercase font-medium">
            {ct.hero.scroll}
          </span>
        </div>
      </section>

      {/* ===== MARQUEE ===== */}
      <Marquee />

      {/* ===== STATS STRIP ===== */}
      <StatsStrip />

      {/* ===== ABOUT PREVIEW SECTION ===== */}
      <section className="py-[100px] px-[10%] bg-[var(--bg)] max-md:py-[72px] max-md:px-[6%]">
        <div className="grid grid-cols-2 gap-20 items-center max-lg:grid-cols-1 max-lg:gap-12">
          {/* Left - Photo */}
          <div className="reveal">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[20px] shadow-[var(--shadow-xl)]">
                <img
                  src={IMAGES.classroom}
                  alt="Mirai School"
                  className="w-full aspect-[4/5] object-cover block"
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
      <section className="py-[100px] px-[10%] bg-[var(--bg-warm)] max-md:py-[72px] max-md:px-[6%]">
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
      <section className="py-[100px] px-[10%] bg-[var(--bg-dark)] text-white relative overflow-hidden max-md:py-[72px] max-md:px-[6%]">
        {/* Background glow */}
        <div className="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-[100px] -left-[100px] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(220,38,38,0.04)_0%,transparent_70%)] pointer-events-none" />

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
            className="shimmer-btn rainbow-pulse inline-block bg-[var(--torii-red)] text-white px-10 py-4 text-sm tracking-wide font-semibold rounded-full transition-all hover:-translate-y-0.5 hover:bg-[var(--torii-red-light)]"
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
