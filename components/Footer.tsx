'use client';

import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export function Footer() {
  const [footerRef, footerVisible] = useIntersectionObserver();

  return (
    <footer
      ref={footerRef}
      className={`py-12 border-t border-fine bg-surface reveal ${footerVisible ? 'active' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.25em] text-on-surface/40 gap-6 text-center">
        <p>© 2026 Velis Studio. All rights reserved.</p>
        <div className="flex gap-8 md:gap-12">
          <a className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline" href="#">Privacy Policy</a>
          <a className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline" href="#">Terms of Service</a>
        </div>
        <p>Crafted with Precision</p>
      </div>
    </footer>
  );
}
