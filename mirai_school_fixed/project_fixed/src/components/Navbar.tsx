import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router';
import { useLang } from '../context/LangContext';
import { t, type Lang } from '../data/content';

export default function Navbar() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const ct = t[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const langOptions: Lang[] = ['kz', 'ru', 'en'];
  const langLabels: Record<Lang, string> = { kz: 'ҚЗ', ru: 'РУ', en: 'EN' };

  const LangSwitcher = ({ mobile = false }: { mobile?: boolean }) => (
    <div className={`flex items-center gap-0.5 p-1 rounded-full border transition-all ${
      mobile
        ? 'border-[var(--border-color)] bg-[var(--bg-warm)]'
        : 'border-[var(--border-color)] bg-white shadow-[var(--shadow-sm)]'
    }`}>
      {langOptions.map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`border-none cursor-pointer text-[11px] font-semibold tracking-wider px-3 py-1.5 rounded-full transition-all ${
            lang === l
              ? 'text-white bg-[var(--accent)] shadow-[0_2px_8px_rgba(59,130,246,0.25)]'
              : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--bg-warm)]'
          }`}
        >
          {langLabels[l]}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] h-[72px] flex items-center justify-between px-[5%] transition-all duration-400 ${
          scrolled
            ? 'h-[60px] bg-white/[0.96] shadow-[var(--shadow-sm)]'
            : 'bg-[rgba(232,244,252,0.92)] backdrop-blur-[24px] border-b border-[var(--border-color)]'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 no-underline transition-opacity hover:opacity-70">
          <div>
            <div
              className="text-2xl font-light text-[var(--accent)] tracking-wide leading-none"
              style={{ fontFamily: "'Noto Serif JP', serif" }}
            >
              未来学校
            </div>
            <div className="text-[11px] tracking-[0.15em] text-[var(--text-muted)] uppercase leading-none font-medium mt-1">
              Mirai School — Алматы
            </div>
          </div>
        </NavLink>

        {/* Desktop links + lang */}
        <ul className="hidden md:flex gap-6 list-none items-center">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `no-underline text-[13px] tracking-wide text-[var(--text-secondary)] transition-all font-medium relative py-1 hover:text-[var(--text-primary)] ${
                  isActive ? 'text-[var(--text-primary)]' : ''
                }`
              }
              style={navLinkStyle}
              end
            >
              {ct.nav.home}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `no-underline text-[13px] tracking-wide text-[var(--text-secondary)] transition-all font-medium relative py-1 hover:text-[var(--text-primary)] ${
                  isActive ? 'text-[var(--text-primary)]' : ''
                }`
              }
              style={navLinkStyle}
            >
              {ct.nav.about}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/results"
              className={({ isActive }) =>
                `no-underline text-[13px] tracking-wide text-[var(--text-secondary)] transition-all font-medium relative py-1 hover:text-[var(--text-primary)] ${
                  isActive ? 'text-[var(--text-primary)]' : ''
                }`
              }
              style={navLinkStyle}
            >
              {ct.nav.results}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/branches"
              className={({ isActive }) =>
                `no-underline text-[13px] tracking-wide text-[var(--text-secondary)] transition-all font-medium relative py-1 hover:text-[var(--text-primary)] ${
                  isActive ? 'text-[var(--text-primary)]' : ''
                }`
              }
              style={navLinkStyle}
            >
              {ct.nav.branches}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admission"
              className={({ isActive }) =>
                `no-underline text-[13px] tracking-wide text-[var(--text-secondary)] transition-all font-medium relative py-1 hover:text-[var(--text-primary)] ${
                  isActive ? 'text-[var(--text-primary)]' : ''
                }`
              }
              style={navLinkStyle}
            >
              {ct.nav.admission}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admission"
              className="no-underline text-[13px] tracking-wide text-white bg-[var(--accent)] px-5 py-2.5 rounded-full font-semibold transition-all shadow-[0_4px_14px_rgba(59,130,246,0.22)] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(59,130,246,0.32)] hover:bg-[var(--accent-light)]"
            >
              {ct.nav.apply}
            </NavLink>
          </li>
          {/* Language switcher — integrated into nav */}
          <li className="ml-1">
            <LangSwitcher />
          </li>
        </ul>

        {/* Burger + mobile lang */}
        <div className="hidden max-md:flex items-center gap-3">
          <LangSwitcher />
          <button
            className="flex flex-col gap-[5px] cursor-pointer p-2.5 z-[101]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span
              className={`block w-[22px] h-0.5 bg-[var(--text-primary)] rounded-sm transition-all duration-400 ${
                menuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`block w-[22px] h-0.5 bg-[var(--text-primary)] rounded-sm transition-all duration-400 ${
                menuOpen ? 'opacity-0 scale-x-0' : ''
              }`}
            />
            <span
              className={`block w-[22px] h-0.5 bg-[var(--text-primary)] rounded-sm transition-all duration-400 ${
                menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-white/[0.98] backdrop-blur-[30px] pt-28 px-[8%] pb-10 z-[99] flex flex-col justify-center transition-all duration-500 ${
          menuOpen ? 'translate-x-0 opacity-100 pointer-events-auto' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <ul className="list-none flex flex-col gap-2">
          {[
            { to: '/', label: ct.nav.home },
            { to: '/about', label: ct.nav.about },
            { to: '/results', label: ct.nav.results },
            { to: '/branches', label: ct.nav.branches },
            { to: '/admission', label: ct.nav.admission },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                onClick={() => setMenuOpen(false)}
                className="no-underline text-[22px] tracking-tight text-[var(--text-primary)] block py-3.5 border-b border-[var(--border-light)] font-medium transition-all hover:text-[var(--accent)] hover:pl-3"
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li className="mt-6">
            <NavLink
              to="/admission"
              onClick={() => setMenuOpen(false)}
              className="inline-block bg-[var(--accent)] text-white px-8 py-4 text-center w-full text-[15px] tracking-wide font-semibold rounded-full shadow-[0_4px_14px_rgba(59,130,246,0.25)] no-underline hover:bg-[var(--accent-light)]"
            >
              {ct.nav.apply}
            </NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

const navLinkStyle: React.CSSProperties = {
  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
};
