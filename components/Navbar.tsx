'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';
import { useMagnetic } from '@/hooks/useMagnetic';
import { useModal } from '@/components/ModalProvider';

type Theme = 'light' | 'dark' | 'system';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'About', path: '/about' },
  { label: 'Journal', path: '/journal' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const { setIsContactOpen } = useModal();

  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('theme') as Theme;
    if (saved) setTheme(saved);
  }, []);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const callBtnRef = useMagnetic<HTMLButtonElement>();

  // Close mobile menu on route change
  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // ESC closes mobile menu
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMobileMenuOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Theme sync
  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    root.classList.remove('dark', 'light');
    if (theme === 'dark') { root.classList.add('dark'); }
    else if (theme === 'light') { root.classList.add('light'); }
    else {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) root.classList.add('dark');
      else root.classList.add('light');
    }
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        root.classList.remove('dark', 'light');
        root.classList.add(e.matches ? 'dark' : 'light');
      };
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [theme]);

  // Click-outside theme dropdown
  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target as Node)) {
        setIsThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-40 px-4 transition-all duration-300 ${isScrolled ? 'py-2 sm:py-3' : 'py-4 sm:py-5'}`}>
        <div className={`max-w-7xl mx-auto flex justify-between items-center rounded-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 border border-fine transition-all duration-300 ${
          isScrolled
            ? 'bg-surface/90 backdrop-blur-md shadow-md'
            : 'bg-surface-container-low/40 backdrop-blur-sm shadow-none'
        }`}>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-lg">
            <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white" aria-hidden="true">
              <span className="material-symbols-outlined text-[15px] select-none font-bold">bubble_chart</span>
            </span>
            <span className="font-bold text-lg tracking-tight font-display text-text-main">Velis Studio.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[13px] font-bold uppercase tracking-wider text-text-main">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`nav-link transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:rounded-md px-2.5 py-1 ${
                    isActive ? 'text-primary font-extrabold active' : 'text-text-main/85 hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* CTA + Theme */}
          <div className="flex items-center gap-3">
            {/* Theme Dropdown */}
            <div className="relative flex items-center" ref={themeDropdownRef}>
              <button
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                className="p-2.5 rounded-full hover:bg-on-surface/5 border border-fine transition-all duration-300 flex items-center justify-center text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                aria-label="Change theme"
                aria-haspopup="true"
                aria-expanded={isThemeDropdownOpen}
              >
                {!mounted ? (
                  <Monitor className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <>
                    {theme === 'light' && <Sun className="w-4 h-4" aria-hidden="true" />}
                    {theme === 'dark' && <Moon className="w-4 h-4" aria-hidden="true" />}
                    {theme === 'system' && <Monitor className="w-4 h-4" aria-hidden="true" />}
                  </>
                )}
              </button>
              {isThemeDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-surface-container-lowest border border-fine rounded-2xl shadow-xl p-1.5 min-w-[130px] flex flex-col gap-1 z-50 animate-fade-in">
                  {(['light', 'dark', 'system'] as Theme[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => { setTheme(t); setIsThemeDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                        (mounted ? theme : 'system') === t ? 'bg-primary/10 text-primary' : 'hover:bg-on-surface/5 text-on-surface'
                      }`}
                    >
                      {t === 'light' && <Sun className="w-3.5 h-3.5" aria-hidden="true" />}
                      {t === 'dark' && <Moon className="w-3.5 h-3.5" aria-hidden="true" />}
                      {t === 'system' && <Monitor className="w-3.5 h-3.5" aria-hidden="true" />}
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              ref={callBtnRef}
              onClick={() => setIsContactOpen(true)}
              className="btn-magnetic btn-click-scale hidden sm:inline-block bg-text-main text-surface hover:text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
            >
              Book a call
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden hover:bg-on-surface/5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 z-50 bg-surface/98 backdrop-blur-2xl md:hidden transition-all duration-300 overflow-y-auto ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`}
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="flex flex-col min-h-full justify-between p-6 sm:p-8">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xl tracking-tight font-display text-text-main">Velis Studio.</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 hover:bg-on-surface/5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col gap-5 text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight my-auto text-left pl-4">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isActive ? 'text-primary' : 'text-text-main'}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Theme Selector */}
            <div className="border-t border-fine pt-6 pb-6 my-auto">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/50 mb-3 text-center">Appearance</p>
              <div className="bg-surface-container-low p-1.5 rounded-2xl flex gap-1 border border-fine">
                {(['light', 'dark', 'system'] as Theme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`flex-1 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                      (mounted ? theme : 'system') === t ? 'bg-primary text-white shadow-md' : 'text-on-surface/60 hover:bg-on-surface/5'
                    }`}
                  >
                    {t === 'light' && <Sun className="w-4 h-4" aria-hidden="true" />}
                    {t === 'dark' && <Moon className="w-4 h-4" aria-hidden="true" />}
                    {t === 'system' && <Monitor className="w-4 h-4" aria-hidden="true" />}
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => { setIsMobileMenuOpen(false); setIsContactOpen(true); }}
              className="w-full bg-primary text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-text-main hover:text-surface transition-colors duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Book a call
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
