import { useState } from 'react';
import { Link } from 'react-router';
import { useLang } from '../context/LangContext';
import { t } from '../data/content';
import SectionHeader from '../components/SectionHeader';
import ToriiDivider from '../components/ToriiDivider';
import ToriiBgDecoration from '../components/ToriiBgDecoration';
import BranchCard from '../components/BranchCard';
import ModalForm from '../components/ModalForm';
import { IMAGES } from '../data/images';

export default function Branches() {
  const { lang } = useLang();
  const ct = t[lang];
  const [modalOpen, setModalOpen] = useState(false);

  const comparisonData = [
    { param: ct.comparison.classes, isayeva: '1–4', askarova: '1–9' },
    { param: ct.comparison.price, isayeva: '250 000 ₸', askarova: '350 000 ₸' },
    { param: ct.comparison.students, isayeva: '16', askarova: '16' },
    { param: ct.comparison.teachers, isayeva: '2', askarova: '2' },
    { param: ct.comparison.meals, isayeva: ct.branches.branch1.features[3], askarova: ct.branches.branch2.features[3] },
    { param: ct.comparison.language, isayeva: ct.branches.branch1.features[2], askarova: ct.branches.branch2.features[2] },
    { param: ct.comparison.ort, isayeva: '—', askarova: '✓' },
  ];

  return (
    <>
      {/* ===== BRANCHES HERO ===== */}
      <section className="pt-[140px] pb-20 px-[10%] text-center bg-[var(--bg-dark)] relative overflow-hidden max-md:px-[5%] max-md:pt-[120px]">
        <ToriiBgDecoration position="top-left" size={300} opacity={0.04} rotate={-8} />
        <ToriiBgDecoration position="top-right" size={280} opacity={0.04} rotate={8} />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_70%)] pointer-events-none" />

        <div className="reveal relative z-10">
          <div className="text-xs text-white/30 mb-6">
            <Link to="/" className="no-underline text-white/30 hover:text-white/60 transition-colors">{ct.breadcrumb.home}</Link>
            <span className="mx-2">/</span>
            <span>{ct.nav.branches}</span>
          </div>
          <SectionHeader
            en={ct.branchesPage.heroEyebrow}
            ja={ct.branchesPage.heroTitle}
            sub={ct.branchesPage.heroSubtitle}
            light
            centered
          />
        </div>
      </section>

      {/* ===== BRANCHES DETAIL ===== */}
      <section className="py-[100px] px-[10%] bg-[var(--bg)] max-md:py-[72px] max-md:px-[6%]">
        {/* Branch 1: Ораза Исаева */}
        <div className="reveal">
          <div className="grid grid-cols-[1.2fr_1fr] gap-12 items-center max-lg:grid-cols-1 max-lg:gap-8">
            <div className="relative overflow-hidden rounded-[20px] shadow-[var(--shadow-xl)]">
              <img
                src={IMAGES.branches.isayeva}
                alt={ct.branches.branch1.name}
                className="w-full aspect-video object-cover block"
              />
            </div>
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
        </div>

        <ToriiDivider className="my-16" />

        {/* Branch 2: Аскарова */}
        <div className="reveal">
          <div className="grid grid-cols-[1fr_1.2fr] gap-12 items-center max-lg:grid-cols-1 max-lg:gap-8">
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
            <div className="relative overflow-hidden rounded-[20px] shadow-[var(--shadow-xl)] max-lg:order-first">
              <img
                src={IMAGES.branches.askarova}
                alt={ct.branches.branch2.name}
                className="w-full aspect-video object-cover block"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMPARISON SECTION ===== */}
      <section className="py-[100px] px-[10%] bg-[var(--bg-warm)] max-md:py-[72px] max-md:px-[5%]">
        <div className="reveal">
          <SectionHeader
            en={ct.aboutPage.compEyebrow}
            ja={ct.aboutPage.compTitle}
          />
        </div>
        <div className="reveal reveal-d1 mt-14 overflow-x-auto">
          <table className="comparison-table min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left">{ct.comparison.param}</th>
                <th>{ct.branches.branch1.name}</th>
                <th>{ct.branches.branch2.name}</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr key={i}>
                  <td>{row.param}</td>
                  <td className={`text-center ${row.isayeva === '✓' ? 'text-[var(--torii-red)] font-bold' : ''}`}>
                    {row.isayeva}
                  </td>
                  <td className={`text-center ${row.askarova === '✓' ? 'text-[var(--torii-red)] font-bold' : ''}`}>
                    {row.askarova}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <ModalForm isOpen={modalOpen} onClose={() => setModalOpen(false)} t={{ modal: ct.modal, contact: ct.contact }} />
    </>
  );
}
