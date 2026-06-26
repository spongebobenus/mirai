import { Link } from 'react-router';
import { useLang } from '../context/LangContext';
import { t } from '../data/content';
import SectionHeader from '../components/SectionHeader';
import ToriiDivider from '../components/ToriiDivider';
import ToriiBgDecoration from '../components/ToriiBgDecoration';
import ToriiGate from '../components/ToriiGate';
import StepItem from '../components/StepItem';
import ReviewCard from '../components/ReviewCard';
import FAQItem from '../components/FAQItem';
import ContactForm from '../components/ContactForm';

import { IMAGES } from '../data/images';
const reviewAvatars = IMAGES.reviews;

const IconPin = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
);

const IconPhone = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z"/>
  </svg>
);

const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const IconClock = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

export default function Admission() {
  const { lang } = useLang();
  const ct = t[lang];

  return (
    <>
      {/* ===== ADMISSION HERO ===== */}
      <section className="pt-[140px] pb-20 px-[10%] text-center bg-[var(--bg-dark)] relative overflow-hidden max-md:px-[5%] max-md:pt-[120px]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <ToriiGate width={240} height={140} opacity={0.06} showKanji={false} />
        </div>
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="reveal relative z-10">
          <div className="text-xs text-white/30 mb-6">
            <Link to="/" className="no-underline text-white/30 hover:text-white/60 transition-colors">{ct.breadcrumb.home}</Link>
            <span className="mx-2">/</span>
            <span>{ct.nav.admission}</span>
          </div>
          <SectionHeader
            en={ct.admissionPage.heroEyebrow}
            ja={ct.admissionPage.heroTitle}
            sub={ct.admissionPage.heroSubtitle}
            light
            centered
          />
        </div>
      </section>

      {/* ===== STEPS SECTION ===== */}
      <section className="py-[100px] px-[10%] bg-[var(--bg)] max-md:py-[72px] max-md:px-[6%]">
        <div className="reveal text-center">
          <SectionHeader
            en={ct.admissionPage.stepsEyebrow}
            ja={ct.admissionPage.stepsTitle}
            centered
          />
        </div>
        <div className="grid grid-cols-2 gap-6 mt-16 max-lg:grid-cols-1">
          {ct.admission.steps.map((step, i) => (
            <div key={`step-${step.num}`} className={`reveal reveal-d${Math.min(i + 1, 3)}`}>
              <StepItem {...step} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== REVIEWS SECTION ===== */}
      <section className="py-[100px] px-[10%] bg-[var(--bg-warm)] max-md:py-[72px] max-md:px-[6%]">
        <div className="reveal text-center">
          <SectionHeader
            en={ct.reviews.eyebrow}
            ja={ct.reviews.title}
            centered
          />
        </div>
        <div className="grid grid-cols-3 gap-5 mt-14 max-lg:grid-cols-2 max-md:grid-cols-1">
          {ct.reviews.items.map((review, i) => (
            <div key={`review-${i}`} className={`reveal reveal-d${Math.min(i + 1, 3)}`}>
              <ReviewCard
                text={review.text}
                name={review.name}
                role={review.role}
                avatar={reviewAvatars[i]}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-[100px] px-[10%] bg-[var(--bg)] max-md:py-[72px] max-md:px-[6%]">
        <div className="reveal text-center">
          <SectionHeader
            en={ct.faq.eyebrow}
            ja={ct.faq.title}
            centered
          />
        </div>
        <ToriiDivider className="my-10" />
        <div className="max-w-[800px] mx-auto mt-14 flex flex-col gap-3">
          {ct.faq.items.map((item, i) => (
            <div key={i} className={`reveal reveal-d${Math.min(i + 1, 3)}`}>
              <FAQItem question={item.q} answer={item.a} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section className="py-[100px] px-[10%] bg-[var(--bg-dark)] text-white relative overflow-hidden max-md:py-[72px] max-md:px-[5%]">
        <ToriiBgDecoration position="bottom-right" size={400} opacity={0.02} rotate={15} />
        <div
          className="absolute -bottom-[60px] right-[5%] text-[200px] font-extralight text-white/[0.012] pointer-events-none leading-none select-none"
          style={{ fontFamily: "'Noto Serif JP', serif" }}
        >
          連絡
        </div>

        <div className="grid grid-cols-2 gap-20 relative z-10 max-lg:grid-cols-1 max-lg:gap-12">
          {/* Left - Contact info */}
          <div className="reveal">
            <SectionHeader
              en={ct.contact.eyebrow}
              ja={ct.contact.title}
              sub={ct.contact.subtitle}
              light
            />
            <div className="flex flex-col gap-7 mt-12">
              {[
                { icon: <IconPin />,   label: ct.contact.addressLabel, val: ct.contact.address },
                { icon: <IconPhone />, label: ct.contact.phoneLabel,   val: '+7 (707) 700-76-04', href: 'tel:+77077007604' },
                { icon: <IconClock />, label: ct.contact.hoursLabel,   val: ct.contact.hours },
              ].map((item) => (
                <div key={item.label} className="flex gap-[18px] items-start group">
                  <div className="w-11 h-11 border-[1.5px] border-white/[0.08] rounded-[10px] flex items-center justify-center flex-shrink-0 text-white/40 bg-white/[0.03] transition-all group-hover:border-[var(--accent)] group-hover:bg-[rgba(59,130,246,0.12)] group-hover:text-[var(--accent-light)]">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-1.5 font-semibold">
                      {item.label}
                    </div>
                    <div className="text-sm text-white/55 leading-relaxed">
                      {item.href ? (
                        <a href={item.href} className="text-[var(--accent-light)] no-underline transition-colors hover:text-white font-medium">
                          {item.val}
                        </a>
                      ) : (
                        item.val
                      )}
                    </div>
                  </div>
                </div>

              ))}

              {/* Email block — multiple addresses */}
              <div className="flex gap-[18px] items-start group">
                <div className="w-11 h-11 border-[1.5px] border-white/[0.08] rounded-[10px] flex items-center justify-center flex-shrink-0 text-white/40 bg-white/[0.03] transition-all group-hover:border-[var(--accent)] group-hover:bg-[rgba(59,130,246,0.12)] group-hover:text-[var(--accent-light)]">
                  <IconMail />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-white/25 mb-2.5 font-semibold">
                    {ct.contact.emailLabel}
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      { addr: 'support@miraischooll.kz',   hint: 'Общая поддержка' },
                      { addr: 'admission@miraischooll.kz', hint: 'Поступление и заявки' },
                      { addr: 'director@miraischooll.kz',  hint: 'Директор школы' },
                      { addr: 'finance@miraischooll.kz',   hint: 'Оплата и договоры' },
                    ].map(({ addr, hint }) => (
                      <div key={addr} className="flex items-center gap-2.5">
                        <a
                          href={`mailto:${addr}`}
                          className="text-sm text-[var(--accent-light)] no-underline transition-colors hover:text-white font-medium"
                        >
                          {addr}
                        </a>
                        <span className="text-[11px] text-white/20 hidden sm:inline">— {hint}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="reveal reveal-d1">
            <ContactForm t={ct.contact} />
          </div>
        </div>
      </section>
    </>
  );
}
