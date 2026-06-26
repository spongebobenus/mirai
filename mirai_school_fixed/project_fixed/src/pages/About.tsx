import { useState } from 'react';
import { Link } from 'react-router';
import { useLang } from '../context/LangContext';
import { t } from '../data/content';
import SectionHeader from '../components/SectionHeader';
import ToriiDivider from '../components/ToriiDivider';
import ToriiBgDecoration from '../components/ToriiBgDecoration';
import ToriiGate from '../components/ToriiGate';
import MethodStep from '../components/MethodStep';
import TeamCard from '../components/TeamCard';
import ModalForm from '../components/ModalForm';
import { IMAGES } from '../data/images';

const galleryImages = IMAGES.gallery.map((src) => ({ src, caption: '' }));
const teamPhotos = IMAGES.team;

export default function About() {
  const { lang } = useLang();
  const ct = t[lang];
  const [modalOpen, setModalOpen] = useState(false);

  const stats = [
    { num: '2', label: ct.aboutPage.stat1 },
    { num: '16', label: ct.aboutPage.stat2 },
    { num: '2', label: ct.aboutPage.stat3 },
    { num: '1–9', label: ct.aboutPage.stat4 },
  ];

  return (
    <>
      {/* ===== ABOUT HERO ===== */}
      <section className="pt-[140px] pb-20 px-[10%] text-center bg-[var(--bg-dark)] relative overflow-hidden max-md:px-[5%] max-md:pt-[120px]">
        <ToriiBgDecoration position="top-left" size={300} opacity={0.04} rotate={-8} />
        <ToriiBgDecoration position="top-right" size={280} opacity={0.04} rotate={8} />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none" />

        {/* Breadcrumb */}
        <div className="reveal relative z-10">
          <div className="text-xs text-white/30 mb-6">
            <Link to="/" className="no-underline text-white/30 hover:text-white/60 transition-colors">{ct.breadcrumb.home}</Link>
            <span className="mx-2">/</span>
            <span>{ct.nav.about}</span>
          </div>
          <SectionHeader
            en={ct.aboutPage.heroEyebrow}
            ja={ct.aboutPage.heroTitle}
            light
            centered
          />
          <p className="text-base text-white/50 max-w-2xl mx-auto mt-6">
            {ct.aboutPage.heroSubtitle}
          </p>

          {/* Stats */}
          <div className="flex gap-12 justify-center mt-12 flex-wrap">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="text-5xl text-[var(--torii-red)] font-light"
                  style={{ fontFamily: "'Noto Serif JP', serif" }}
                >
                  {s.num}
                </div>
                <div className="text-[11px] uppercase text-white/30 tracking-wide mt-2 font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PHILOSOPHY SECTION ===== */}
      <section className="py-[100px] px-[10%] bg-[var(--bg)] max-md:py-[72px] max-md:px-[6%]">
        <div className="reveal">
          <SectionHeader
            en={ct.aboutPage.philEyebrow}
            ja={ct.aboutPage.philTitle}
          />
        </div>
        <div className="grid grid-cols-2 gap-20 mt-14 items-start max-lg:grid-cols-1 max-lg:gap-12">
          {/* Left - Photo */}
          <div className="reveal">
            <div className="relative">
              <div className="relative overflow-hidden rounded-[20px] shadow-[var(--shadow-xl)]">
                <img src={IMAGES.classroom} alt="Mirai School" className="w-full aspect-[4/3] object-cover block" />
              </div>
              <div
                className="absolute -top-4 -left-4 -bottom-4 -right-4 border-2 border-[var(--accent-soft)] rounded-[20px] -z-10"
                style={{ animation: 'borderFloat 5s ease-in-out infinite' }}
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="reveal reveal-d1 flex flex-col gap-6">
            <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
              {ct.about.p1}
            </p>
            <p className="text-[15px] leading-relaxed text-[var(--text-secondary)]">
              {ct.about.p2}
            </p>
            {/* Quote */}
            <div className="relative border-l-[3px] border-[var(--torii-red)] pl-7 py-6 bg-[var(--torii-red-pale)] rounded-r-[14px] overflow-hidden my-1">
              <div
                className="absolute top-2 right-4 text-6xl text-[var(--torii-red)]/20 leading-none select-none"
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
            <div className="flex gap-2.5 flex-wrap mt-1">
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

      {/* ===== METHODOLOGY SECTION ===== */}
      <section className="py-[100px] px-[10%] bg-[var(--bg-warm)] max-md:py-[72px] max-md:px-[6%]">
        <div className="reveal">
          <SectionHeader
            en={ct.methodology.eyebrow}
            ja={ct.methodology.title}
          />
        </div>
        <div className="grid grid-cols-2 gap-20 mt-14 items-start max-lg:grid-cols-1 max-lg:gap-12">
          {/* Left - Visual */}
          <div className="reveal flex justify-center max-lg:static">
            <div className="sticky top-[100px] flex flex-col items-center">
              <ToriiGate width={280} height={170} animated color="#DC2626" showKanji kanjiText="道" />
              <div className="mt-4 text-[11px] tracking-[0.2em] uppercase text-[var(--text-muted)] font-semibold text-center">
                Путь
              </div>
              {/* Decorative dots */}
              <div className="flex gap-6 mt-6">
                <div className="w-3 h-3 rounded-full bg-[var(--accent)] shadow-[0_0_16px_rgba(59,130,246,0.3)]" />
                <div className="w-3 h-3 rounded-full bg-[var(--torii-red)] shadow-[0_0_16px_rgba(220,38,38,0.3)]" />
                <div className="w-3 h-3 rounded-full bg-[var(--gold)] shadow-[0_0_16px_rgba(212,168,83,0.3)]" />
                <div className="w-3 h-3 rounded-full bg-[var(--accent-light)] shadow-[0_0_16px_rgba(96,165,250,0.3)]" />
              </div>
            </div>
          </div>

          {/* Right - Steps */}
          <div className="reveal reveal-d1">
            <div className="flex flex-col gap-8">
              {ct.methodology.steps.map((step) => (
                <MethodStep key={step.num} {...step} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALLERY SECTION ===== */}
      <section className="py-20 bg-[var(--bg)] overflow-hidden max-md:py-16">
        <div className="px-[10%] mb-12 max-md:px-[5%]">
          <div className="reveal">
            <SectionHeader
              en={ct.gallery.eyebrow}
              ja={ct.gallery.title}
            />
          </div>
        </div>
        <ToriiDivider className="mb-8" />
        <div className="gallery-reel">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="reveal flex-shrink-0 w-[360px] h-[260px] rounded-[20px] shadow-[var(--shadow)] overflow-hidden relative transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[var(--shadow-xl)] max-md:w-[300px] max-md:h-[210px]"
              style={{ scrollSnapAlign: 'start' }}
            >
              <img
                src={img.src}
                alt={ct.gallery.captions[i]}
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-[1.08]"
              />
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[rgba(15,42,77,0.75)] to-transparent text-white/90 text-[13px] font-medium opacity-0 translate-y-2 transition-all duration-500 hover:opacity-100 hover:translate-y-0">
                {ct.gallery.captions[i]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TEAM SECTION ===== */}
      <section className="py-[100px] px-[10%] bg-[var(--bg-warm)] max-md:py-[72px] max-md:px-[6%]">
        <div className="reveal">
          <SectionHeader
            en={ct.team.eyebrow}
            ja={ct.team.title}
            sub={ct.team.subtitle}
          />
        </div>
        <div className="grid grid-cols-3 gap-6 mt-14 max-lg:grid-cols-2 max-md:grid-cols-1">
          {ct.team.members.map((member, i) => (
            <div key={member.name} className={`reveal reveal-d${Math.min(i + 1, 3)}`}>
              <TeamCard
                photo={teamPhotos[i]}
                name={member.name}
                role={member.role}
                desc={member.desc}
              />
            </div>
          ))}
        </div>
      </section>

      <ModalForm isOpen={modalOpen} onClose={() => setModalOpen(false)} t={{ modal: ct.modal, contact: ct.contact }} />
    </>
  );
}
