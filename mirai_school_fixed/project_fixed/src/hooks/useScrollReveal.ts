import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function useScrollReveal(threshold = 0.12) {
  const location = useLocation();

  useEffect(() => {
    // Small delay to let the new page render before observing
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
        // Reset visibility so elements re-animate on each page visit
        el.classList.remove('visible');
        observer.observe(el);
      });

      return () => observer.disconnect();
    }, 50);

    return () => clearTimeout(timer);
  }, [location.pathname, threshold]);
}
