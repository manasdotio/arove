import { useEffect, useRef } from 'react';

export function useParallax(speed: number = 0.1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const yPos = -(scrollY * speed);
      // Maintains the centered placement from absolute centering styles (-50%)
      el.style.transform = `translate3d(-50%, calc(-50% + ${yPos}px), 0)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially to align position on render
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return ref;
}
