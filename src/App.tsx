import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Star, 
  ArrowRight, 
  ArrowDown, 
  Play, 
  Check, 
  Loader2, 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  BarChart3, 
  Lightbulb, 
  Zap
} from 'lucide-react';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import { useMagnetic } from './hooks/useMagnetic';
import { useParallax } from './hooks/useParallax';

// --- DATA TYPES ---
interface Project {
  id: string;
  num: string;
  title: string;
  category: string;
  year: string;
  imageUrl: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
  rating: number;
}

interface Article {
  id: number;
  category: string;
  date: string;
  title: string;
  imageUrl: string;
}

// --- CONSTANT DATA ---
const PROJECTS: Project[] = [
  {
    id: 'project-1',
    num: '/01',
    title: 'NovaBank digital platform',
    category: 'Redesign • Experience',
    year: '2024',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAl0Dyk8gL5eLWyKIbsKbPCC5TN3uiQ3vyZzCJeNb_RZmPLWJOkXEeTNC8Vz2t4lXkSWEhf1oQ1kApoLGnrSp7jYEgo7l1yGPTKPIwLI1KEUXX1yhUcvLRo0I99rSmi_MB74JUFlMs7fho8zsV_JD3DfXvOjqXLE44F1gClNzCmhLeYgdCpYMjH1pDfgVCalo7Lu7AaoankhdB-Jywk8ZxUUlab0YgipSHunvCNt5fNA0fHEI7UkO8QVprn2Q14bLt7iKDnOnUFZS9g'
  },
  {
    id: 'project-2',
    num: '/02',
    title: 'Hello finance mobile',
    category: 'Product • Fintech',
    year: '2024',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4CNQwqUntuHEpcx7ATrdQ086c2eVWqa1oV-IsdL23fk3pYWc-WEkqY0DfOFxM6rbL3QSbviAE7QEpQIAbcLayTuv__8OxIUJeZ5h7haVH9vmcGWgXv6sse0Kc-00m9_NqZYIjilAflD1GsdhXB022-2ekAMu2RYLJtENeX1mm3Z2WhqKePIarLXUFY_A-fN2C-LTevckQscYz5jecZRf3vWot5SCSG4niLLprerKXr8Hdq9H945Gtq6pYPmuVLFAcS21iq5n7KsNk'
  },
  {
    id: 'project-3',
    num: '/03',
    title: 'Lumina Brand Identity',
    category: 'Visual System • Sustainability',
    year: '2024',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAl0Dyk8gL5eLWyKIbsKbPCC5TN3uiQ3vyZzCJeNb_RZmPLWJOkXEeTNC8Vz2t4lXkSWEhf1oQ1kApoLGnrSp7jYEgo7l1yGPTKPIwLI1KEUXX1yhUcvLRo0I99rSmi_MB74JUFlMs7fho8zsV_JD3DfXvOjqXLE44F1gClNzCmhLeYgdCpYMjH1pDfgVCalo7Lu7AaoankhdB-Jywk8ZxUUlab0YgipSHunvCNt5fNA0fHEI7UkO8QVprn2Q14bLt7iKDnOnUFZS9g'
  },
  {
    id: 'project-4',
    num: '/04',
    title: 'Nexus Web Experience',
    category: 'E-commerce • Luxury',
    year: '2024',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4CNQwqUntuHEpcx7ATrdQ086c2eVWqa1oV-IsdL23fk3pYWc-WEkqY0DfOFxM6rbL3QSbviAE7QEpQIAbcLayTuv__8OxIUJeZ5h7haVH9vmcGWgXv6sse0Kc-00m9_NqZYIjilAflD1GsdhXB022-2ekAMu2RYLJtENeX1mm3Z2WhqKePIarLXUFY_A-fN2C-LTevckQscYz5jecZRf3vWot5SCSG4niLLprerKXr8Hdq9H945Gtq6pYPmuVLFAcS21iq5n7KsNk'
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'CEO TechFlow',
    content: '"Amazing work! Our brand finally feels authentic and our sales doubled in a matter of months."',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7vssDrQwkqMfc5Hv83xEJuKCADI9SMBksasJMZTpRQNbDSxasIjUSTbRBoeRaLGGGOcD-Iw0cojz7x525q-IbxRa3PiqzbizwGxfo6lY-A70owUI5ysCyD8vobwNBOy7SnUwvCbaoWZndWEOWDV_TmAHQe5RMvPo75NW_lDio13Gmd8jf0vLrGfy4ycnm6lI6_k16Hb-MTlM5azHMa2ewjL3A9_ueglUfCdI4_in_YtyWEkwwqN7zL3m5M-JdQSsncgnIPdh_8rY_',
    rating: 5
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    role: 'CEO Heritage Co',
    content: '"They transformed our outdated website into something beautiful, highly functional, and extremely fast."',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwpOjZ3SRJbYvDBovekAcz6Df2rgUR1FM5nvAlm019nE1j1efBGxXTMWmyiDN1MTu5XKgFPzc03lmzaolYUU3wegA2qxS-LFZaLianCPOmDTYQcxH-jCdsjOexGMFfyfSohKOlQoMNfNiZr02Q33kGMzkoYquOaGDAvYGC2fSHYC66kKgOr-VkORyfRHWcGt_vxbZZbxsXw_ZZIxOijOMe4bv0h-xmAxXnqQNfESxzoxElJXbXemV39xdhI7I9mkM3_bBoiJ0AmWfN',
    rating: 5
  },
  {
    id: 3,
    name: 'Eleanor Vance',
    role: 'Founder Horizon',
    content: '"From strategy to execution, the team exceeded expectations. A level of craftsmanship rarely seen."',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    rating: 5
  }
];

const ARTICLES: Article[] = [
  {
    id: 1,
    category: 'Design',
    date: 'September 8, 2024',
    title: 'Stories, ideas, and insights from our creative studio',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4CNQwqUntuHEpcx7ATrdQ086c2eVWqa1oV-IsdL23fk3pYWc-WEkqY0DfOFxM6rbL3QSbviAE7QEpQIAbcLayTuv__8OxIUJeZ5h7haVH9vmcGWgXv6sse0Kc-00m9_NqZYIjilAflD1GsdhXB022-2ekAMu2RYLJtENeX1mm3Z2WhqKePIarLXUFY_A-fN2C-LTevckQscYz5jecZRf3vWot5SCSG4niLLprerKXr8Hdq9H945Gtq6pYPmuVLFAcS21iq5n7KsNk'
  },
  {
    id: 2,
    category: 'Trends',
    date: 'September 5, 2024',
    title: 'Latest design insights and industry trends from our experts',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAl0Dyk8gL5eLWyKIbsKbPCC5TN3uiQ3vyZzCJeNb_RZmPLWJOkXEeTNC8Vz2t4lXkSWEhf1oQ1kApoLGnrSp7jYEgo7l1yGPTKPIwLI1KEUXX1yhUcvLRo0I99rSmi_MB74JUFlMs7fho8zsV_JD3DfXvOjqXLE44F1gClNzCmhLeYgdCpYMjH1pDfgVCalo7Lu7AaoankhdB-Jywk8ZxUUlab0YgipSHunvCNt5fNA0fHEI7UkO8QVprn2Q14bLt7iKDnOnUFZS9g'
  }
];

function App() {
  // --- STATE ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // --- REVEAL REFERENCES (Scroll animations) ---
  const [headerRef, headerVisible] = useIntersectionObserver();
  const [tickerRef, tickerVisible] = useIntersectionObserver();
  const [projectsRef, projectsVisible] = useIntersectionObserver();
  const [aboutRef, aboutVisible] = useIntersectionObserver();
  const [servicesRef, servicesVisible] = useIntersectionObserver();
  const [testimonialsRef, testimonialsVisible] = useIntersectionObserver();
  const [journalRef, journalVisible] = useIntersectionObserver();
  const [ctaRef, ctaVisible] = useIntersectionObserver();
  const [footerRef, footerVisible] = useIntersectionObserver();

  // --- MAGNETIC BTNS ---
  const callBtnRef = useMagnetic<HTMLButtonElement>();
  const heroCallBtnRef = useMagnetic<HTMLButtonElement>();
  const footerCtaBtnRef = useMagnetic<HTMLButtonElement>();

  // --- PARALLAX TEXT ---
  const parallaxTextRef = useParallax(0.08);

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

  // --- HANDLERS ---
  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
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

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans antialiased selection:bg-primary selection:text-white">
      
      {/* --- SKIP LINK FOR ACCESSIBILITY --- */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50">
        Skip to main content
      </a>

      {/* --- FLOATING HEADER / NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full z-40 px-4 py-3 sm:px-6 sm:py-4 transition-[background-color,backdrop-filter] duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/80 dark:bg-black/50 backdrop-blur-xl border border-black/5 rounded-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 shadow-sm">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-lg">
            <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white" aria-hidden="true">
              <span className="material-symbols-outlined text-[15px] select-none font-bold">bubble_chart</span>
            </span>
            <span className="font-bold text-lg tracking-tight font-display text-text-main">Velis Studio.</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-10 text-[11px] font-bold uppercase tracking-widest">
            <a onClick={(e) => scrollToSection(e, 'home')} className="nav-link hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline" href="#home">Home</a>
            <a onClick={(e) => scrollToSection(e, 'about')} className="nav-link hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline" href="#about">About</a>
            <a onClick={(e) => scrollToSection(e, 'projects')} className="nav-link hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline" href="#projects">Work</a>
            <a onClick={(e) => scrollToSection(e, 'services')} className="nav-link hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline" href="#services">Services</a>
            <a onClick={(e) => scrollToSection(e, 'journal')} className="nav-link hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline" href="#journal">Journal</a>
            <a onClick={(e) => scrollToSection(e, 'testimonials')} className="nav-link hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline" href="#testimonials">Notes</a>
          </div>

          {/* CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button 
              ref={callBtnRef}
              onClick={() => setIsContactOpen(true)}
              className="btn-magnetic btn-click-scale hidden sm:inline-block bg-text-main text-white px-6 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest hover:bg-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Book a call
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 md:hidden hover:bg-black/5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 z-50 bg-white/98 backdrop-blur-2xl md:hidden transition-all duration-300 overflow-y-auto ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}`} 
          aria-hidden={!isMobileMenuOpen}
        >
          <div className="flex flex-col min-h-full justify-between p-6 sm:p-8">
            <div className="flex justify-between items-center">
              <span className="font-bold text-xl tracking-tight font-display text-text-main">Velis Studio.</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 hover:bg-black/5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex flex-col gap-6 text-3xl font-display font-bold uppercase tracking-tight my-auto text-left pl-4">
              <a onClick={(e) => { setIsMobileMenuOpen(false); scrollToSection(e, 'home'); }} href="#home" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Home</a>
              <a onClick={(e) => { setIsMobileMenuOpen(false); scrollToSection(e, 'about'); }} href="#about" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">About</a>
              <a onClick={(e) => { setIsMobileMenuOpen(false); scrollToSection(e, 'projects'); }} href="#projects" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Work</a>
              <a onClick={(e) => { setIsMobileMenuOpen(false); scrollToSection(e, 'services'); }} href="#services" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Services</a>
              <a onClick={(e) => { setIsMobileMenuOpen(false); scrollToSection(e, 'journal'); }} href="#journal" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Journal</a>
              <a onClick={(e) => { setIsMobileMenuOpen(false); scrollToSection(e, 'testimonials'); }} href="#testimonials" className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">Notes</a>
            </div>

            <button 
              onClick={() => { setIsMobileMenuOpen(false); setIsContactOpen(true); }}
              className="w-full bg-primary text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-text-main transition-colors duration-300"
            >
              Book a call
            </button>
          </div>
        </div>
      </nav>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <main id="main-content" className="outline-none">
        
        {/* --- HERO / HEADER SECTION --- */}
        <header 
          ref={headerRef} 
          id="home"
          className={`relative pt-36 pb-20 md:pt-48 md:pb-28 overflow-hidden bg-surface-container-low/20 reveal ${headerVisible ? 'active' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-full mb-8 md:mb-10 border border-black/5 shadow-sm stagger-item transition-all duration-700" style={{ transitionDelay: '100ms' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-on-surface/70">
                <span className="hidden sm:inline">Creative services for modern brands</span>
                <span className="sm:hidden">Creative services</span>
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl min-[400px]:text-4xl sm:text-6xl lg:text-8xl xl:text-[105px] font-bold tracking-tighter leading-[0.9] mb-10 md:mb-12 font-display uppercase stagger-item transition-all duration-700 text-text-main" style={{ transitionDelay: '200ms' }}>
              <span className="inline-block">We</span>{' '}
              <span className="font-serif-display italic font-light text-primary normal-case inline-block">build</span>{' '}
              <span className="inline-block">brands</span> <br className="hidden md:inline" />
              <span className="inline-block">that stand out</span>
            </h1>

            {/* Paragraph Description */}
            <p className="max-w-2xl mx-auto text-base md:text-lg text-on-surface/70 mb-10 md:mb-14 font-medium leading-relaxed stagger-item transition-all duration-700" style={{ transitionDelay: '300ms' }}>
              We design brands that become your favorites and digital experiences that keep you coming back. Based in the intersection of strategy and soul.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-16 md:mb-24 stagger-item transition-all duration-700" style={{ transitionDelay: '400ms' }}>
              <button 
                ref={heroCallBtnRef}
                onClick={() => setIsContactOpen(true)}
                className="btn-magnetic btn-click-scale w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/25 transition-[background-color,transform,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Book a call
              </button>
              <a 
                href="#projects"
                onClick={(e) => scrollToSection(e, 'projects')}
                className="btn-click-scale w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-full"
              >
                Our process 
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" aria-hidden="true" />
              </a>
            </div>

            {/* Hero Image Container */}
            <div className="relative group max-w-6xl mx-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl bg-surface-dim stagger-item animate-float transition-all duration-700" style={{ transitionDelay: '500ms' }}>
              <img 
                alt="3D Abstract Render Art" 
                className="w-full h-[350px] sm:h-[500px] md:h-[680px] object-cover scale-102 group-hover:scale-105 transition-transform duration-[1200ms] ease-out" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl0Dyk8gL5eLWyKIbsKbPCC5TN3uiQ3vyZzCJeNb_RZmPLWJOkXEeTNC8Vz2t4lXkSWEhf1oQ1kApoLGnrSp7jYEgo7l1yGPTKPIwLI1KEUXX1yhUcvLRo0I99rSmi_MB74JUFlMs7fho8zsV_JD3DfXvOjqXLE44F1gClNzCmhLeYgdCpYMjH1pDfgVCalo7Lu7AaoankhdB-Jywk8ZxUUlab0YgipSHunvCNt5fNA0fHEI7UkO8QVprn2Q14bLt7iKDnOnUFZS9g"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
            </div>

          </div>
        </header>

        {/* --- LOGO TICKER SECTION --- */}
        <section 
          ref={tickerRef}
          className={`py-12 md:py-16 border-y border-fine bg-white/40 reveal ${tickerVisible ? 'active' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-center text-[10px] font-bold uppercase tracking-[0.3em] mb-10 text-on-surface/40">
              The company we keep
            </h2>
            <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 sm:gap-8 md:gap-12 grayscale opacity-45 hover:opacity-85 transition-opacity duration-300">
              <div className="flex items-center gap-2 font-display font-bold text-xl md:text-2xl tracking-tighter uppercase select-none">TRACE</div>
              <div className="flex items-center gap-2 font-display font-bold text-xl md:text-2xl tracking-tighter italic uppercase select-none">DENMARK</div>
              <div className="flex items-center gap-2 font-display font-bold text-xl md:text-2xl tracking-tighter uppercase underline decoration-primary decoration-2 underline-offset-4 select-none">PROLINE</div>
              <div className="flex items-center gap-2 font-display font-bold text-xl md:text-2xl tracking-tighter uppercase select-none">HITECH</div>
              <div className="flex items-center gap-2 font-display font-bold text-xl md:text-2xl tracking-tighter uppercase select-none">FLUX</div>
            </div>
          </div>
        </section>

        {/* --- WORK / PROJECTS SECTION --- */}
        <section 
          ref={projectsRef}
          id="projects" 
          className={`py-16 sm:py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 reveal ${projectsVisible ? 'active' : ''}`}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Selected Work</p>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter leading-[0.95] font-display uppercase text-text-main text-wrap-balance">
                Our Latest <br />
                <span className="font-serif-display italic font-light text-primary normal-case">Creations</span>
              </h2>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col items-start">
              <p className="text-sm md:text-base text-on-surface/65 max-w-sm mb-6 leading-relaxed">
                A curated collection of digital experiences built for impact, conversion, and aesthetic perfection.
              </p>
              <button 
                onClick={() => setIsContactOpen(true)}
                className="btn-click-scale inline-flex items-center gap-2.5 px-8 py-3.5 border border-black/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white hover:border-black transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Start Your Project <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-28">
            {PROJECTS.map((project, idx) => (
              <button 
                key={project.id} 
                type="button"
                className={`group cursor-pointer text-left w-full block rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 ${idx % 2 === 1 ? 'md:mt-24' : ''}`}
                onClick={() => setIsContactOpen(true)}
              >
                {/* Project Image Frame */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] mb-6 md:mb-8 bg-surface-container shadow-sm group-hover:-translate-y-2 group-hover:shadow-xl transition-all duration-700 ease-out">
                  <img 
                    alt={project.title} 
                    className="w-full h-full object-cover scale-102 group-hover:scale-105 transition-transform duration-[1200ms] grayscale group-hover:grayscale-0" 
                    src={project.imageUrl}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700" />
                </div>

                {/* Project Details */}
                <div className="flex items-start justify-between border-t border-fine pt-6 group-hover:border-primary/30 transition-colors duration-500">
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold mb-2 uppercase tracking-tight group-hover:text-primary transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-on-surface/40">
                      {project.category} • {project.year}
                    </p>
                  </div>
                  <span className="text-sm font-semibold opacity-30 font-display" aria-hidden="true">
                    {project.num}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="w-full h-px bg-fine max-w-7xl mx-auto" />

        {/* --- ABOUT SECTION --- */}
        <section 
          ref={aboutRef}
          id="about" 
          className={`py-16 sm:py-24 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 reveal ${aboutVisible ? 'active' : ''}`}
        >
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Text & Stats */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-6 text-primary">About Velis Studio</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8 font-display uppercase leading-[0.95] text-text-main">
                Meaningful <br /> 
                Experiences <br />
                <span className="font-serif-display italic font-light text-primary normal-case">By Design.</span>
              </h2>
              <p className="text-base md:text-lg text-on-surface/65 mb-12 leading-relaxed">
                We're a small, agile team of designers, developers, and brand strategists obsessed with building digital identities that resonate and convert. Every pixel and line of code serves a purpose in our minimalist pursuit of excellence.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-y-8 gap-x-6 sm:gap-x-8">
                <div className="group">
                  <div className="text-4xl md:text-5xl font-display font-bold text-text-main mb-1.5 group-hover:text-primary transition-colors duration-300">172<span className="text-primary">+</span></div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface/50">Digital projects</div>
                </div>
                <div className="group">
                  <div className="text-4xl md:text-5xl font-display font-bold text-text-main mb-1.5 group-hover:text-primary transition-colors duration-300">500<span className="text-xl font-bold text-primary ml-0.5 align-top uppercase">m</span></div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface/50">Client Revenue Generated</div>
                </div>
                <div className="group">
                  <div className="text-4xl md:text-5xl font-display font-bold text-text-main mb-1.5 group-hover:text-primary transition-colors duration-300">100<span className="text-xl font-bold text-primary ml-0.5 align-top">%</span></div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface/50">Client Satisfaction</div>
                </div>
                <div className="group">
                  <div className="text-4xl md:text-5xl font-display font-bold text-text-main mb-1.5 group-hover:text-primary transition-colors duration-300">612<span className="text-primary">+</span></div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface/50">Cups of Coffee</div>
                </div>
              </div>
            </div>

            {/* Video Play Container */}
            <div className="relative bg-surface-container-high rounded-[2rem] md:rounded-[3rem] p-1.5 aspect-video lg:aspect-square overflow-hidden group shadow-md">
              <img 
                alt="Our Creative Studio Culture" 
                className="w-full h-full object-cover rounded-[1.8rem] md:rounded-[2.8rem] group-hover:scale-102 transition-transform duration-[1000ms] grayscale group-hover:grayscale-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4CNQwqUntuHEpcx7ATrdQ086c2eVWqa1oV-IsdL23fk3pYWc-WEkqY0DfOFxM6rbL3QSbviAE7QEpQIAbcLayTuv__8OxIUJeZ5h7haVH9vmcGWgXv6sse0Kc-00m9_NqZYIjilAflD1GsdhXB022-2ekAMu2RYLJtENeX1mm3Z2WhqKePIarLXUFY_A-fN2C-LTevckQscYz5jecZRf3vWot5SCSG4niLLprerKXr8Hdq9H945Gtq6pYPmuVLFAcS21iq5n7KsNk"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-300">
                <button 
                  onClick={() => setIsVideoOpen(true)}
                  className="bg-white/40 backdrop-blur-2xl border border-white/40 w-24 h-24 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl group-hover:bg-primary/95 group-hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
                  aria-label="Play Studio Showreel Video"
                >
                  <Play className="text-white fill-current w-8 h-8 translate-x-0.5" />
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* --- SERVICES SECTION --- */}
        <section 
          ref={servicesRef}
          id="services" 
          className={`py-16 sm:py-24 md:py-32 bg-surface-container-low/40 reveal ${servicesVisible ? 'active' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16 md:mb-24">
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Our Expertise</p>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display uppercase tracking-tighter text-text-main">
                We do it all <span className="font-serif-display italic font-light text-primary normal-case">with ease.</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1 - Explore */}
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-fine hover:border-primary/20 hover:-translate-y-1.5 transition-all duration-500 group shadow-sm">
                <div className="w-14 h-14 bg-surface-container-low text-on-surface rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Search className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase text-text-main">Explore</h3>
                <p className="text-on-surface/60 text-xs md:text-sm leading-relaxed mb-8">
                  Dive deep into possibilities and discover your potential through comprehensive market research.
                </p>
                <ul className="space-y-3.5 text-[9px] font-bold uppercase tracking-widest text-on-surface/40">
                  <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> Market Analysis</li>
                  <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> User Research</li>
                </ul>
              </div>

              {/* Card 2 - Analyze */}
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-fine hover:border-primary/20 hover:-translate-y-1.5 transition-all duration-500 group shadow-sm delay-75">
                <div className="w-14 h-14 bg-surface-container-low text-on-surface rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <BarChart3 className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase text-text-main">Analyze</h3>
                <p className="text-on-surface/60 text-xs md:text-sm leading-relaxed mb-8">
                  We convert our findings into actionable insights and strategic business requirements.
                </p>
                <ul className="space-y-3.5 text-[9px] font-bold uppercase tracking-widest text-on-surface/40">
                  <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> Data Mining</li>
                  <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> UX Audits</li>
                </ul>
              </div>

              {/* Card 3 - Strategy */}
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-fine hover:border-primary/20 hover:-translate-y-1.5 transition-all duration-500 group shadow-sm delay-150">
                <div className="w-14 h-14 bg-surface-container-low text-on-surface rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Lightbulb className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase text-text-main">Strategy</h3>
                <p className="text-on-surface/60 text-xs md:text-sm leading-relaxed mb-8">
                  Armed with knowledge, we start building the strategy and the narrative of your brand.
                </p>
                <ul className="space-y-3.5 text-[9px] font-bold uppercase tracking-widest text-on-surface/40">
                  <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> Brand Voice</li>
                  <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> Narrative</li>
                </ul>
              </div>

              {/* Card 4 - Execute */}
              <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-fine hover:border-primary/20 hover:-translate-y-1.5 transition-all duration-500 group shadow-sm delay-200">
                <div className="w-14 h-14 bg-surface-container-low text-on-surface rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                  <Zap className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold mb-4 uppercase text-text-main">Execute</h3>
                <p className="text-on-surface/60 text-xs md:text-sm leading-relaxed mb-8">
                  This is where we bring our ideas to life. High-fidelity design meets robust development.
                </p>
                <ul className="space-y-3.5 text-[9px] font-bold uppercase tracking-widest text-on-surface/40">
                  <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> UI/UX Design</li>
                  <li className="flex items-center gap-2.5"><span className="w-1.5 h-1.5 bg-primary rounded-full" /> Launch</li>
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* --- TESTIMONIALS SECTION --- */}
        <section 
          ref={testimonialsRef}
          id="testimonials" 
          className={`py-16 sm:py-24 md:py-32 overflow-hidden reveal ${testimonialsVisible ? 'active' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Testimonials</p>
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display uppercase tracking-tighter leading-none text-text-main">
                  Read the <br />
                  <span className="font-serif-display italic font-light text-primary normal-case">love notes</span>
                </h2>
              </div>

              {/* Navigation Arrows */}
              <div className="flex gap-4">
                <button 
                  onClick={prevTestimonial}
                  className="btn-click-scale w-14 h-14 rounded-full border border-fine flex items-center justify-center hover:bg-white hover:border-primary/30 transition-[background-color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-on-surface" />
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="btn-click-scale w-14 h-14 rounded-full border border-fine flex items-center justify-center hover:bg-white hover:border-primary/30 transition-[background-color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-on-surface" />
                </button>
              </div>
            </div>

            {/* Testimonial Box */}
            <div className="max-w-4xl mx-auto">
              <div 
                key={testimonialIndex}
                className="bg-white p-6 md:p-14 rounded-[2rem] md:rounded-[2.5rem] border border-fine hover:shadow-xl transition-shadow duration-500 animate-fade-in"
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6 md:mb-8" aria-label={`Rating: ${TESTIMONIALS[testimonialIndex].rating} out of 5 stars`}>
                  {Array.from({ length: TESTIMONIALS[testimonialIndex].rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-xl md:text-3xl font-medium mb-8 md:mb-10 leading-snug tracking-tight text-text-main text-wrap-pretty">
                  {TESTIMONIALS[testimonialIndex].content}
                </blockquote>

                {/* Client Profile */}
                <div className="flex items-center gap-4 pt-6 border-t border-fine">
                  <img 
                    alt={TESTIMONIALS[testimonialIndex].name} 
                    className="w-12 h-12 rounded-full object-cover grayscale" 
                    src={TESTIMONIALS[testimonialIndex].avatarUrl} 
                    loading="lazy"
                  />
                  <div>
                    <p className="font-bold text-text-main text-sm md:text-base">{TESTIMONIALS[testimonialIndex].name}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface/40">{TESTIMONIALS[testimonialIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- JOURNAL SECTION --- */}
        <section 
          ref={journalRef}
          id="journal" 
          className={`py-16 sm:py-24 md:py-32 bg-surface border-t border-fine reveal ${journalVisible ? 'active' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-16 md:mb-24">
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Our Journal</p>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display uppercase tracking-tighter mb-4 text-text-main">
                The <span className="font-serif-display italic font-light text-primary normal-case">studio</span> journal
              </h2>
              <div className="w-16 h-0.5 bg-primary mx-auto" />
            </div>

            <div className="grid gap-10 max-w-5xl mx-auto">
              {ARTICLES.map((article) => (
                <button 
                  key={article.id} 
                  type="button"
                  className="group flex flex-col md:flex-row items-center gap-8 md:gap-12 pb-10 border-b border-fine hover:border-primary/20 transition-colors duration-500 cursor-pointer text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
                  onClick={() => setIsContactOpen(true)}
                >
                  <div className="w-full md:w-2/5 aspect-[3/2] overflow-hidden rounded-2xl bg-surface-container shadow-sm">
                    <img 
                      alt={article.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-103 transition-all duration-[800ms]" 
                      src={article.imageUrl}
                      loading="lazy"
                    />
                  </div>
                  <div className="w-full md:w-3/5">
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary mb-3">
                      {article.category} • {article.date}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-display font-bold uppercase mb-4 text-text-main group-hover:text-primary transition-colors duration-200">
                      {article.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest group-hover:gap-3.5 transition-all duration-300">
                      Read more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* --- FOOTER CTA SECTION --- */}
        <section 
          ref={ctaRef}
          className={`py-16 sm:py-24 md:py-32 bg-text-main text-white mx-4 md:mx-6 rounded-[2rem] sm:rounded-[2.5rem] md:rounded-[4rem] mb-12 relative overflow-hidden reveal ${ctaVisible ? 'active' : ''}`}
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
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-8 text-white/50">Ready to tackle your project?</p>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl xl:text-[95px] font-bold mb-10 md:mb-14 tracking-tighter leading-[0.9] font-display uppercase text-wrap-balance">
              Let's <span className="italic font-serif-display font-light text-primary normal-case">make it</span> <br className="hidden md:inline" /> happen together.
            </h2>
            <button 
              ref={footerCtaBtnRef}
              onClick={() => setIsContactOpen(true)}
              className="btn-magnetic btn-click-scale bg-primary text-white px-10 py-5 rounded-full font-bold text-xs uppercase tracking-widest hover:scale-103 transition-transform duration-300 shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Start a project
            </button>

            {/* Links and Socials */}
            <div className="mt-20 md:mt-28 pt-12 md:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                <a onClick={(e) => scrollToSection(e, 'home')} className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline" href="#home">Home</a>
                <a onClick={(e) => scrollToSection(e, 'about')} className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline" href="#about">About</a>
                <a onClick={(e) => scrollToSection(e, 'projects')} className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline" href="#projects">Work</a>
                <a onClick={(e) => scrollToSection(e, 'services')} className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline" href="#services">Services</a>
                <a onClick={(e) => scrollToSection(e, 'journal')} className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline" href="#journal">Journal</a>
              </div>
              <div className="flex gap-4">
                <a 
                  className="btn-click-scale w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" 
                  href="#"
                  aria-label="Follow us on Twitter"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                </a>
                <a 
                  className="btn-click-scale w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" 
                  href="#"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204 0.013-3.583 0.07-4.849 0.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259 0.014 3.668 0.072 4.948 0.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98 0.059-1.28 0.073-1.689 0.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s0.645 1.44 1.441 1.44c0.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* --- SITE FOOTER --- */}
        <footer 
          ref={footerRef}
          className={`py-12 border-t border-fine bg-surface reveal ${footerVisible ? 'active' : ''}`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.25em] text-on-surface/40 gap-6 text-center">
            <p>© 2024 Velis Studio. All rights reserved.</p>
            <div className="flex gap-8 md:gap-12">
              <a className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline" href="#">Privacy Policy</a>
              <a className="hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline" href="#">Terms of Service</a>
            </div>
            <p>Crafted with Precision</p>
          </div>
        </footer>

      </main>

      {/* --- INTERACTIVE MODAL: CONTACT & BOOKING --- */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setIsContactOpen(false)}
          />
          <div 
            className="bg-white rounded-[2rem] w-full max-w-lg p-6 md:p-10 shadow-2xl relative z-10 border border-black/5 max-h-[90vh] overflow-y-auto animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button 
              onClick={() => setIsContactOpen(false)}
              className="absolute top-6 right-6 p-1.5 hover:bg-black/5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
              <div className="py-12 text-center flex flex-col items-center justify-center gap-4 animate-fadeIn">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-text-main">Request Sent!</h4>
                <p className="text-sm text-on-surface/60">We will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-2">
                    Your Name
                  </label>
                  <input
                    id="name-input"
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full bg-surface-container-low border border-black/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 placeholder:text-on-surface/30"
                  />
                </div>

                <div>
                  <label htmlFor="email-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email-input"
                    type="email"
                    name="email"
                    required
                    spellCheck={false}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. sarah@example.com"
                    className="w-full bg-surface-container-low border border-black/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 placeholder:text-on-surface/30"
                  />
                </div>

                <div>
                  <label htmlFor="message-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-2">
                    Brief Project Details
                  </label>
                  <textarea
                    id="message-input"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us a little bit about what you're building…"
                    className="w-full bg-surface-container-low border border-black/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 placeholder:text-on-surface/30 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-text-main text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-75 disabled:cursor-not-allowed"
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
            
            {/* Embedded video - standard high-quality cinematic placeholder */}
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
}

export default App;
