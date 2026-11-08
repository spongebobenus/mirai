import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useLang } from '../context/LangContext';

export function useScrollReveal(threshold = 0.12) {
  const location = useLocation();
  const { lang } = useLang();

  useEffect(() => {
    const timer = setTimeout(() => {
      const revealEls = document.querySelectorAll('.reveal');
      if (revealEls.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold }
      );

      revealEls.forEach((el) => {
        if (!el.classList.contains('visible')) {
          observer.observe(el);
        }
      });

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname, lang, threshold]);
}
