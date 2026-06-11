import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Monitor, Check, Loader2 } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

type Theme = 'light' | 'dark' | 'system';

export interface LayoutContextType {
  setIsContactOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVideoOpen: React.Dispatch<React.SetStateAction<boolean>>;
  theme: Theme;
}

export const Layout: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'system');
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isScrolled, setIsScrolled] = useState(false);
  
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Work', path: '/work' },
    { label: 'About', path: '/about' },
    { label: 'Journal', path: '/journal' },
    { label: 'Contact', path: '/contact' }
  ];

  // Intersection observer for footer
  const [footerRef, footerVisible] = useIntersectionObserver();

  // Magnetic elements
  const callBtnRef = useMagnetic<HTMLButtonElement>();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close modals on ESC press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsContactOpen(false);
        setIsVideoOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent body scroll when menu or modal is open
  useEffect(() => {
    if (isMobileMenuOpen || isContactOpen || isVideoOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, isContactOpen, isVideoOpen]);

  // Listen for scroll to toggle navbar styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme synchronization
  useEffect(() => {
    localStorage.setItem('theme', theme);
    const applyTheme = (t: Theme) => {
      const root = document.documentElement;
      root.classList.remove('dark', 'light');
      
      if (t === 'dark') {
        root.classList.add('dark');
      } else if (t === 'light') {
        root.classList.add('light');
      } else {
        const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isSystemDark) {
          root.classList.add('dark');
        } else {
          root.classList.add('light');
        }
      }
    };

    applyTheme(theme);

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        const root = document.documentElement;
        root.classList.remove('dark', 'light');
        if (e.matches) {
          root.classList.add('dark');
        } else {
          root.classList.add('light');
        }
      };
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, [theme]);

  // Click outside theme dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target as Node)) {
        setIsThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setIsContactOpen(false);
        setSubmitSuccess(false);
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans antialiased selection:bg-primary selection:text-white">
      {/* --- SKIP LINK FOR ACCESSIBILITY --- */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50">
        Skip to main content
      </a>

      {/* --- FLOATING HEADER / NAVIGATION --- */}
      <nav className={`fixed top-0 left-0 w-full z-40 px-4 transition-all duration-300 ${isScrolled ? 'py-2 sm:py-3' : 'py-4 sm:py-5'}`}>
        <div className={`max-w-7xl mx-auto flex justify-between items-center rounded-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 border border-fine transition-all duration-300 ${
          isScrolled 
            ? 'bg-surface/90 backdrop-blur-md shadow-md' 
            : 'bg-surface-container-low/40 backdrop-blur-sm shadow-none'
        }`}>
          
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-lg">
            <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white" aria-hidden="true">
              <span className="material-symbols-outlined text-[15px] select-none font-bold">bubble_chart</span>
            </span>
            <span className="font-bold text-lg tracking-tight font-display text-text-main">Velis Studio.</span>
          </NavLink>

          {/* Desktop Menu - High contrast text_main color, larger font, easily visible */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-[13px] font-bold uppercase tracking-wider text-text-main">
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={({ isActive }) => 
                  `nav-link transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/45 focus-visible:rounded-md px-2.5 py-1 ${
                    isActive ? 'text-primary font-extrabold' : 'text-text-main/85 hover:text-primary'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* CTA & Theme Selector */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Dropdown */}
            <div className="relative flex items-center" ref={themeDropdownRef}>
              <button 
                onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
                className="p-2.5 rounded-full hover:bg-on-surface/5 border border-fine transition-all duration-300 flex items-center justify-center text-text-main focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer animate-[fade-in_0.5s_ease]"
                aria-label="Change theme"
                aria-haspopup="true"
                aria-expanded={isThemeDropdownOpen}
              >
                {theme === 'light' && <Sun className="w-4 h-4" />}
                {theme === 'dark' && <Moon className="w-4 h-4" />}
                {theme === 'system' && <Monitor className="w-4 h-4" />}
              </button>

              {isThemeDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 bg-surface-container-lowest border border-fine rounded-2xl shadow-xl p-1.5 min-w-[130px] flex flex-col gap-1 z-50 animate-fade-in">
                  <button
                    onClick={() => { setTheme('light'); setIsThemeDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                      theme === 'light' ? 'bg-primary/10 text-primary' : 'hover:bg-on-surface/5 text-on-surface'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    Light
                  </button>
                  <button
                    onClick={() => { setTheme('dark'); setIsThemeDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                      theme === 'dark' ? 'bg-primary/10 text-primary' : 'hover:bg-on-surface/5 text-on-surface'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    Dark
                  </button>
                  <button
                    onClick={() => { setTheme('system'); setIsThemeDropdownOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer ${
                      theme === 'system' ? 'bg-primary/10 text-primary' : 'hover:bg-on-surface/5 text-on-surface'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    System
                  </button>
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
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Mobile Nav Links - High visibility */}
            <div className="flex flex-col gap-5 text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight my-auto text-left pl-4">
              {navItems.map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path} 
                  className={({ isActive }) => 
                    `hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive ? 'text-primary' : 'text-text-main'
                    }`
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Theme Selector */}
            <div className="border-t border-fine pt-6 pb-6 my-auto">
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/50 mb-3 text-center">Appearance</p>
              <div className="bg-surface-container-low p-1.5 rounded-2xl flex gap-1 border border-fine">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex-1 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                    theme === 'light' ? 'bg-primary text-white shadow-md' : 'text-on-surface/60 hover:bg-on-surface/5'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex-1 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                    theme === 'dark' ? 'bg-primary text-white shadow-md' : 'text-on-surface/60 hover:bg-on-surface/5'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  Dark
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`flex-1 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                    theme === 'system' ? 'bg-primary text-white shadow-md' : 'text-on-surface/60 hover:bg-on-surface/5'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  System
                </button>
              </div>
            </div>

            <button 
              onClick={() => { setIsMobileMenuOpen(false); setIsContactOpen(true); }}
              className="w-full bg-primary text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-text-main hover:text-surface transition-colors duration-300 cursor-pointer"
            >
              Book a call
            </button>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <main id="main-content" className="outline-none">
        <Outlet context={{ setIsContactOpen, setIsVideoOpen, theme }} />
      </main>

      {/* --- SITE FOOTER --- */}
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

      {/* --- INTERACTIVE MODAL: CONTACT & BOOKING --- */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsContactOpen(false)}
          />
          <div 
            className="bg-surface rounded-[2rem] w-full max-w-lg p-5 md:p-10 shadow-2xl relative z-10 border border-fine max-h-[90vh] overflow-y-auto animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button 
              onClick={() => setIsContactOpen(false)}
              className="absolute top-6 right-6 p-1.5 hover:bg-on-surface/5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5 text-on-surface/70" />
            </button>

            <h3 id="modal-title" className="text-3xl font-display font-bold uppercase text-text-main mb-3">
              Book a Call
            </h3>
            <p className="text-sm text-on-surface/60 mb-8 leading-relaxed">
              Fill in your details below and we’ll schedule a discovery call within 24 hours. Let’s make something beautiful.
            </p>

            {submitSuccess ? (
              <div className="py-12 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-text-main">Request Sent!</h4>
                <p className="text-sm text-on-surface/60">We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="name-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-surface-container-low border border-fine rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 placeholder:text-on-surface/30"
                  />
                </div>

                <div>
                  <label htmlFor="email-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    spellCheck={false}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. sarah@example.com"
                    className="w-full bg-surface-container-low border border-fine rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 placeholder:text-on-surface/30"
                  />
                </div>

                <div>
                  <label htmlFor="message-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">
                    Brief Project Details
                  </label>
                  <textarea
                    id="message-input"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us a little bit about what you're building…"
                    className="w-full bg-surface-container-low border border-fine rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 placeholder:text-on-surface/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-text-main hover:text-surface text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Request…
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* --- INTERACTIVE MODAL: VIDEO SHOWREEL --- */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsVideoOpen(false)}
          />
          <div 
            className="w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative z-10 border border-white/5 animate-scaleIn"
            role="dialog"
            aria-modal="true"
            aria-label="Studio Showreel Video"
          >
            <button 
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-black/85 border border-white/10 rounded-full transition-colors text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close video player"
            >
              <X className="w-5 h-5" />
            </button>
            <iframe 
              className="w-full h-full border-none"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Velis Studio Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};
