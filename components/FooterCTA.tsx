'use client';

import React from 'react';
import Link from 'next/link';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useParallax } from '@/hooks/useParallax';
import { useMagnetic } from '@/hooks/useMagnetic';

interface FooterCTAProps {
  onStartProjectClick: () => void;
}

const ctaLinks = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Journal', path: '/journal' },
  { label: 'Contact', path: '/contact' },
];

export const FooterCTA: React.FC<FooterCTAProps> = ({ onStartProjectClick }) => {
  const [ctaRef, ctaVisible] = useIntersectionObserver();
  const parallaxTextRef = useParallax(0.08);
  const footerCtaBtnRef = useMagnetic<HTMLButtonElement>();

  return (
    <section
      ref={ctaRef}
      className={`py-12 sm:py-20 md:py-32 bg-[#2D2926] dark:bg-surface-container-low text-white mx-4 md:mx-6 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[4rem] mb-12 relative overflow-hidden reveal ${
        ctaVisible ? 'active' : ''
      }`}
    >
      {/* Parallax Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] opacity-[0.03] pointer-events-none">
        <span
          ref={parallaxTextRef}
          className="parallax-bg text-[38vw] font-black leading-none select-none font-display uppercase italic block absolute top-1/2 left-1/2"
        >
          VELIS
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <p className="text-xs font-bold uppercase tracking-[0.3em] mb-6 text-white/50">Ready to tackle your project?</p>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[95px] font-bold mb-6 md:mb-14 tracking-tighter leading-[0.9] font-display uppercase text-balance">
          Let’s <span className="italic font-serif-display font-light text-primary normal-case">make it</span>{' '}
          <br className="hidden md:inline" /> happen together.
        </h2>
        <button
          ref={footerCtaBtnRef}
          onClick={onStartProjectClick}
          className="btn-magnetic btn-click-scale bg-primary text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-103 transition-transform duration-300 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
        >
          Start a project
        </button>

        <div className="mt-12 md:mt-28 pt-8 md:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            {ctaLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-4">
            <a
              className="btn-click-scale w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              href="#"
              aria-label="Follow us on Twitter"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              className="btn-click-scale w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              href="#"
              aria-label="Follow us on Instagram"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
