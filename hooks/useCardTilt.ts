import { useEffect, useRef } from 'react';

export function useCardTilt<T extends HTMLElement>(maxTilt: number = 8) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Set perspective on the parent if not already set, or on the element itself
    el.style.willChange = 'transform';
    el.style.transition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)';

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; // mouse x relative to card
      const y = e.clientY - rect.top;  // mouse y relative to card
      
      const w = rect.width;
      const h = rect.height;
      
      // Normalize position to range [-1, 1]
      const dx = (x - w / 2) / (w / 2);
      const dy = (y - h / 2) / (h / 2);
      
      // Calculate rotation angles
      // Tilt around X-axis (vertical offset) and Y-axis (horizontal offset)
      const rotateX = -(dy * maxTilt).toFixed(2);
      const rotateY = (dx * maxTilt).toFixed(2);
      
      const mouseXPct = ((x / w) * 100).toFixed(2);
      const mouseYPct = ((y / h) * 100).toFixed(2);
      el.style.setProperty('--mouse-x', `${mouseXPct}%`);
      el.style.setProperty('--mouse-y', `${mouseYPct}%`);

      el.style.transition = 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1)';
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      el.style.setProperty('--mouse-x', '50%');
      el.style.setProperty('--mouse-y', '50%');
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [maxTilt]);

  return ref;
}
