'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight, ArrowDown, Play, Star,
  ChevronLeft, ChevronRight, BarChart3, Zap,
  Monitor, ChevronDown, Check, Loader2,
} from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useMagnetic } from '@/hooks/useMagnetic';
import { useCardTilt } from '@/hooks/useCardTilt';
import { PROJECTS, TESTIMONIALS, ARTICLES, PROCESS_STEPS, FAQ_ITEMS } from '@/lib/constants';
import { ProjectCard } from '@/components/ProjectCard';
import { ServiceCard } from '@/components/ServiceCard';
import { ArticleCard } from '@/components/ArticleCard';
import { FooterCTA } from '@/components/FooterCTA';
import { useModal } from '@/components/ModalProvider';

export default function HomeClient() {
  const { setIsContactOpen, setIsVideoOpen } = useModal();

  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [inlineFormData, setInlineFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isInlineSubmitting, setIsInlineSubmitting] = useState(false);
  const [inlineSubmitSuccess, setInlineSubmitSuccess] = useState(false);

  const [headerRef, headerVisible] = useIntersectionObserver();
  const [projectsRef, projectsVisible] = useIntersectionObserver();
  const [aboutRef, aboutVisible] = useIntersectionObserver();
  const [processRef, processVisible] = useIntersectionObserver();
  const [servicesRef, servicesVisible] = useIntersectionObserver();
  const [testimonialsRef, testimonialsVisible] = useIntersectionObserver();
  const [journalRef, journalVisible] = useIntersectionObserver();
  const [faqRef, faqVisible] = useIntersectionObserver();
  const [contactRef, contactVisible] = useIntersectionObserver();

  const heroCallBtnRef = useMagnetic<HTMLButtonElement>();
  const heroImageTiltRef = useCardTilt<HTMLDivElement>(4);
  const videoTiltRef = useCardTilt<HTMLDivElement>(5);
  const videoPlayBtnRef = useMagnetic<HTMLButtonElement>();

  const nextTestimonial = () => setTestimonialIndex((p) => (p + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setTestimonialIndex((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const toggleFaq = (i: number) => setOpenFaqIndex((p) => (p === i ? null : i));
  const toggleService = (s: string) => setSelectedServices((p) => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  const handleInlineInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInlineFormData(p => ({ ...p, [name]: value }));
  };

  const handleInlineFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInlineSubmitting(true);
    setTimeout(() => {
      setIsInlineSubmitting(false);
      setInlineSubmitSuccess(true);
      setTimeout(() => {
        setInlineSubmitSuccess(false);
        setInlineFormData({ name: '', email: '', subject: '', message: '' });
        setSelectedServices([]);
        setSelectedBudget('');
      }, 3000);
    }, 1500);
  };

  return (
    <>
      {/* ── HERO ── */}
      <header
        ref={headerRef}
        id="home"
        className={`relative pt-28 pb-14 md:pt-48 md:pb-28 overflow-hidden bg-surface-container-low/20 reveal ${headerVisible ? 'active' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-surface-container-lowest px-4 py-2 sm:px-5 sm:py-2.5 rounded-full mb-6 md:mb-10 border border-fine shadow-sm stagger-item transition-all duration-700" style={{ transitionDelay: '100ms' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-on-surface/70">
              <span className="hidden sm:inline">High-converting websites for local businesses</span>
              <span className="sm:hidden">Websites for local businesses</span>
            </span>
          </div>

          <h1 className="text-4xl min-[400px]:text-5xl sm:text-6xl lg:text-8xl xl:text-[105px] font-bold tracking-tighter leading-[0.9] mb-6 md:mb-12 font-display uppercase stagger-item transition-all duration-700 text-text-main" style={{ transitionDelay: '200ms' }}>
            <span className="inline-block">We</span>{' '}
            <span className="font-serif-display italic font-light text-primary normal-case inline-block">build</span>{' '}
            <span className="inline-block">websites</span>{' '}
            <br className="hidden md:inline" />
            <span className="inline-block">that</span>{' '}
            <span className="inline-block">get</span>{' '}
            <span className="inline-block">you</span>{' '}
            <span className="inline-block">customers</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-on-surface/70 mb-8 md:mb-14 font-medium leading-relaxed stagger-item transition-all duration-700" style={{ transitionDelay: '300ms' }}>
            We design high-speed, mobile-friendly websites that turn local search traffic into phone calls, bookings, and quote requests.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-10 md:mb-24 stagger-item transition-all duration-700" style={{ transitionDelay: '400ms' }}>
            <button
              ref={heroCallBtnRef}
              onClick={() => setIsContactOpen(true)}
              className="btn-magnetic btn-click-scale w-full sm:w-auto bg-primary text-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:shadow-2xl hover:shadow-primary/25 transition-[background-color,transform,box-shadow] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
            >
              Book a call
            </button>
            <a
              href="#process"
              onClick={(e) => { e.preventDefault(); document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="btn-click-scale w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded-full"
            >
              Our process
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" aria-hidden="true" />
            </a>
          </div>

          <div
            ref={heroImageTiltRef}
            className="relative group max-w-6xl mx-auto rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl bg-surface-dim stagger-item animate-float transition-all duration-700"
            style={{ transitionDelay: '500ms' }}
          >
            <img
              alt="3D Abstract Render Art"
              width={1152}
              height={680}
              fetchPriority="high"
              className="w-full h-[350px] sm:h-[500px] md:h-[680px] object-cover scale-102 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl0Dyk8gL5eLWyKIbsKbPCC5TN3uiQ3vyZzCJeNb_RZmPLWJOkXEeTNC8Vz2t4lXkSWEhf1oQ1kApoLGnrSp7jYEgo7l1yGPTKPIwLI1KEUXX1yhUcvLRo0I99rSmi_MB74JUFlMs7fho8zsV_JD3DfXvOjqXLE44F1gClNzCmhLeYgdCpYMjH1pDfgVCalo7Lu7AaoankhdB-Jywk8ZxUUlab0YgipSHunvCNt5fNA0fHEI7UkO8QVprn2Q14bLt7iKDnOnUFZS9g"
            />
            <div className="card-glow-overlay" />
            <div className="card-shine-overlay" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none z-10" />
          </div>
        </div>
      </header>

      {/* ── PROJECTS ── */}
      <section ref={projectsRef} id="projects" className={`py-12 sm:py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24 reveal ${projectsVisible ? 'active' : ''}`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-24">
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
            <Link
              href="/work"
              className="btn-click-scale inline-flex items-center gap-2.5 px-8 py-3.5 border border-fine rounded-full text-xs font-bold uppercase tracking-widest hover:bg-on-surface hover:text-surface hover:border-on-surface transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              View All Creations <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-16">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} onClick={() => setIsContactOpen(true)} />
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-fine max-w-7xl mx-auto" />

      {/* ── ABOUT ── */}
      <section ref={aboutRef} id="about" className={`py-12 sm:py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24 reveal ${aboutVisible ? 'active' : ''}`}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 lg:mb-6 text-primary">About Velis Studio</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 lg:mb-8 font-display uppercase leading-[0.95] text-text-main">
              Meaningful <br />Experiences <br />
              <span className="font-serif-display italic font-light text-primary normal-case">By Design.</span>
            </h2>
            <p className="text-base md:text-lg text-on-surface/65 mb-8 lg:mb-12 leading-relaxed">
              We’re a small, agile team of designers, developers, and brand strategists obsessed with building digital identities that resonate and convert. Every pixel and line of code serves a purpose in our minimalist pursuit of excellence.
            </p>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 sm:gap-x-8">
              {[['172+', 'Digital projects'], ['500m', 'Client Revenue Generated'], ['100%', 'Client Satisfaction'], ['612+', 'Cups of Coffee']].map(([v, l]) => (
                <div key={l} className="group">
                  <div className="text-4xl md:text-5xl font-display font-bold text-text-main mb-1.5 group-hover:text-primary transition-colors duration-300">{v}</div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface/50">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div ref={videoTiltRef} className="relative bg-surface-container-high rounded-[2rem] md:rounded-[3rem] p-1.5 aspect-video lg:aspect-square overflow-hidden group shadow-md">
            <img
              alt="Our Creative Studio Culture"
              width={800}
              height={800}
              loading="lazy"
              className="w-full h-full object-cover rounded-[1.8rem] md:rounded-[2.8rem] group-hover:scale-102 transition-transform duration-[1000ms] grayscale group-hover:grayscale-0"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4CNQwqUntuHEpcx7ATrdQ086c2eVWqa1oV-IsdL23fk3pYWc-WEkqY0DfOFxM6rbL3QSbviAE7QEpQIAbcLayTuv__8OxIUJeZ5h7haVH9vmcGWgXv6sse0Kc-00m9_NqZYIjilAflD1GsdhXB022-2ekAMu2RYLJtENeX1mm3Z2WhqKePIarLXUFY_A-fN2C-LTevckQscYz5jecZRf3vWot5SCSG4niLLprerKXr8Hdq9H945Gtq6pYPmuVLFAcS21iq5n7KsNk"
            />
            <div className="card-glow-overlay" />
            <div className="card-shine-overlay" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-300 z-10">
              <button ref={videoPlayBtnRef} onClick={() => setIsVideoOpen(true)} className="bg-white/40 backdrop-blur-2xl border border-white/40 w-24 h-24 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl group-hover:bg-primary/95 group-hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 cursor-pointer" aria-label="Play Studio Showreel Video">
                <Play className="text-white fill-current w-8 h-8 translate-x-0.5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-fine max-w-7xl mx-auto" />

      {/* ── PROCESS ── */}
      <section ref={processRef} id="process" className={`py-12 sm:py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24 reveal ${processVisible ? 'active' : ''}`}>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">How We Work</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display uppercase tracking-tighter mb-6 text-text-main text-wrap-balance leading-[0.95]">
              Our structured <br />
              <span className="font-serif-display italic font-light text-primary normal-case">creative</span> roadmap
            </h2>
            <p className="text-sm md:text-base text-on-surface/65 mb-8 leading-relaxed max-w-md">
              We believe that clean workflows yield outstanding results. Click on each step to learn what we deliver and how we guide your brand to success.
            </p>
            <div className="hidden lg:flex flex-col gap-3 border-l-2 border-fine pl-6 mt-8">
              {PROCESS_STEPS.map((step, idx) => (
                <button key={step.num} onClick={() => setActiveProcessStep(idx)} className={`text-left text-xs font-bold uppercase tracking-widest py-1.5 transition-all duration-300 focus-visible:outline-none focus-visible:underline cursor-pointer ${activeProcessStep === idx ? 'text-primary pl-2 font-extrabold translate-x-1' : 'text-on-surface/40 hover:text-on-surface'}`}>
                  Phase {step.num} — {step.title}
                </button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-4">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeProcessStep === idx;
              return (
                <div key={step.num} className={`border border-fine rounded-[2rem] p-6 transition-all duration-500 bg-surface-container-low/20 ${isActive ? 'bg-surface-container-low/70 border-primary/20 shadow-md' : 'hover:bg-surface-container-low/40'}`}>
                  <button onClick={() => setActiveProcessStep(idx)} className="w-full flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:rounded-2xl cursor-pointer" aria-expanded={isActive}>
                    <div className="flex items-center gap-4">
                      <span className={`font-display font-bold text-lg md:text-xl ${isActive ? 'text-primary' : 'text-on-surface/40'}`}>{step.num}</span>
                      <h3 className="font-display font-bold text-lg md:text-xl uppercase tracking-tight text-text-main">{step.title}</h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-on-surface/50 transition-transform duration-300 ${isActive ? 'rotate-180 text-primary' : ''}`} aria-hidden="true" />
                  </button>
                  <div className={`grid transition-all duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-fine' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}>
                    <div className="overflow-hidden">
                      <p className="text-xs md:text-sm text-on-surface/70 leading-relaxed mb-5">{step.desc}</p>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                        <div>
                          <span className="block text-[9px] font-bold uppercase tracking-widest text-on-surface/40 mb-2">Deliverables</span>
                          <div className="flex flex-wrap gap-2">
                            {step.deliverables.map((d) => (
                              <span key={d} className="text-[9px] font-bold uppercase tracking-wider bg-surface-container-lowest border border-fine text-on-surface/70 px-3 py-1 rounded-full">{d}</span>
                            ))}
                          </div>
                        </div>
                        <div className="shrink-0 bg-primary/10 text-primary border border-primary/10 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest">{step.duration}</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-fine max-w-7xl mx-auto" />

      {/* ── SERVICES ── */}
      <section ref={servicesRef} id="services" className={`py-12 sm:py-20 md:py-32 bg-surface-container-low/40 scroll-mt-24 reveal ${servicesVisible ? 'active' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-24">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Our Expertise</p>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display uppercase tracking-tighter text-text-main">
              We do it all <span className="font-serif-display italic font-light text-primary normal-case">with ease.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <ServiceCard icon={<BarChart3 className="w-6 h-6" aria-hidden="true" />} title="Lead Capture" desc="Custom-designed landing pages optimized to turn visits into phone calls, quotes, and bookings." features={['Tap-to-Call', 'Booking Forms']} />
            <ServiceCard icon={<Zap className="w-6 h-6" aria-hidden="true" />} title="Speed & SEO" desc="We build near-instant loading sites that rank higher on Google Maps and maximize paid ads." features={['95+ PageSpeed', 'Schema Markup']} delayClass="delay-75" />
            <ServiceCard icon={<Monitor className="w-6 h-6" aria-hidden="true" />} title="Mobile-First" desc="Over 60% of local searches happen on mobile. We design websites built for touch screens." features={['Sticky Call Bars', 'Fluid Layouts']} delayClass="delay-150" />
            <ServiceCard icon={<Star className="w-6 h-6" aria-hidden="true" />} title="Trust Sync" desc="Embed your live Google Maps and Yelp reviews to showcase social proof from day one." features={['Live Google Sync', 'Trust Badges']} delayClass="delay-200" />
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-fine max-w-7xl mx-auto" />

      {/* ── PLANNER ── */}
      <section id="planner" className="py-12 sm:py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-20">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Inquiry Planner</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display uppercase tracking-tighter mb-6 text-text-main">
                Configure your <br />
                <span className="font-serif-display italic font-light text-primary normal-case">custom page</span> <br />
                package.
              </h2>
              <p className="text-sm md:text-base text-on-surface/65 mb-6 leading-relaxed max-w-md">
                Select your required services and budget range on the right. The calculator compiles a live preview of your request.
              </p>
            </div>
            <div className="hidden lg:block border-t border-fine pt-8">
              <p className="text-xs text-on-surface/40 font-bold uppercase tracking-wider">⚡ Near-instant responses within 24 hours</p>
            </div>
          </div>
          <div className="lg:col-span-7 bg-surface-container-low/40 p-5 sm:p-10 rounded-[2rem] border border-fine">
            {inlineSubmitSuccess ? (
              <div className="py-16 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary"><Check className="w-8 h-8" /></div>
                <h4 className="text-2xl font-display font-bold text-text-main uppercase tracking-tight">Message Received!</h4>
                <p className="text-sm text-on-surface/60 max-w-sm mx-auto leading-relaxed">A partner from Velis Studio will contact you within 24 hours to schedule a discovery session.</p>
              </div>
            ) : (
              <form onSubmit={handleInlineFormSubmit} className="space-y-4 md:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="inline-name-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">Your Name</label>
                    <input id="inline-name-input" type="text" name="name" required value={inlineFormData.name} onChange={handleInlineInputChange} placeholder="e.g., Alexander Cole…" autoComplete="name" className="w-full bg-surface-container-lowest border border-fine rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface/30 shadow-sm" />
                  </div>
                  <div>
                    <label htmlFor="inline-email-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">Email Address</label>
                    <input id="inline-email-input" type="email" name="email" required value={inlineFormData.email} onChange={handleInlineInputChange} placeholder="e.g., alex@example.com…" autoComplete="email" spellCheck={false} className="w-full bg-surface-container-lowest border border-fine rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface/30 shadow-sm" />
                  </div>
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-3">What are we building?</span>
                  <div className="flex flex-wrap gap-2.5">
                    {[{ id: 'landing', label: 'Local Landing Page' }, { id: 'website', label: 'Business Website' }, { id: 'seo', label: 'Google Maps & Local SEO' }, { id: 'maintenance', label: 'Monthly Maintenance' }, { id: 'other', label: 'Other' }].map((srv) => {
                      const isSel = selectedServices.includes(srv.label);
                      return (
                        <button key={srv.id} type="button" onClick={() => toggleService(srv.label)} className={`px-4 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isSel ? 'bg-primary text-white border-primary shadow-sm shadow-primary/20' : 'bg-surface-container-lowest text-on-surface/75 border-fine hover:border-primary/40'}`}>
                          {srv.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-3">Project Budget</span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[{ id: 'under-2k', label: '<$2k' }, { id: '2k-5k', label: '$2k - $5k' }, { id: '5k-plus', label: '$5k+' }, { id: 'monthly', label: 'Monthly Plan' }].map((opt) => {
                      const isSel = selectedBudget === opt.label;
                      return (
                        <button key={opt.id} type="button" onClick={() => setSelectedBudget(opt.label)} className={`py-3 px-1 rounded-xl border text-[11px] font-bold uppercase tracking-wider text-center transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isSel ? 'bg-primary/10 text-primary border-primary font-bold shadow-sm' : 'bg-surface-container-lowest text-on-surface/75 border-fine hover:border-primary/40'}`}>
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="bg-surface-container-lowest border border-fine border-dashed rounded-2xl p-5 text-[11px] sm:text-xs leading-relaxed text-on-surface/75 text-center mt-6">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface/40 mb-2">Live Request Preview</span>
                  {selectedServices.length > 0 || selectedBudget ? (
                    <p className="italic font-medium">
                      “I want to partner with Velis Studio on{' '}
                      {selectedServices.length > 0 ? <strong className="text-primary not-italic">{selectedServices.join(' & ')}</strong> : <span className="text-on-surface/40">selected services</span>}
                      {' '}with a project budget of{' '}
                      {selectedBudget ? <strong className="text-primary not-italic">{selectedBudget}</strong> : <span className="text-on-surface/40">estimated budget</span>}.”
                    </p>
                  ) : (
                    <p className="text-on-surface/45 italic">Select services and budget above to compile your inquiry preview…</p>
                  )}
                </div>
                <div>
                  <label htmlFor="inline-message-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">Project Brief & Details</label>
                  <textarea id="inline-message-input" name="message" required rows={4} value={inlineFormData.message} onChange={handleInlineInputChange} placeholder="e.g., We need a speed-optimized service site…" autoComplete="off" className="w-full bg-surface-container-lowest border border-fine rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface/30 resize-none shadow-sm" />
                </div>
                <button type="submit" disabled={isInlineSubmitting} className="w-full bg-primary hover:bg-text-main hover:text-surface text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer shadow-md hover:shadow-lg">
                  {isInlineSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending Message…</> : <>Send Inquiry <ArrowRight className="w-4 h-4" aria-hidden="true" /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-fine max-w-7xl mx-auto" />

      {/* ── TESTIMONIALS ── */}
      <section ref={testimonialsRef} id="testimonials" className={`py-12 sm:py-20 md:py-32 overflow-hidden scroll-mt-24 reveal ${testimonialsVisible ? 'active' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-24 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Testimonials</p>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display uppercase tracking-tighter leading-none text-text-main">
                Read the <br />
                <span className="font-serif-display italic font-light text-primary normal-case">love notes</span>
              </h2>
            </div>
            <div className="flex gap-4">
              <button onClick={prevTestimonial} className="btn-click-scale w-14 h-14 rounded-full border border-fine flex items-center justify-center hover:bg-surface-container-lowest hover:border-primary/30 transition-[background-color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer" aria-label="Previous testimonial"><ChevronLeft className="w-5 h-5 text-on-surface" aria-hidden="true" /></button>
              <button onClick={nextTestimonial} className="btn-click-scale w-14 h-14 rounded-full border border-fine flex items-center justify-center hover:bg-surface-container-lowest hover:border-primary/30 transition-[background-color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer" aria-label="Next testimonial"><ChevronRight className="w-5 h-5 text-on-surface" aria-hidden="true" /></button>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div key={testimonialIndex} className="bg-surface-container-lowest p-6 md:p-14 rounded-[2rem] md:rounded-[2.5rem] border border-fine hover:shadow-xl transition-shadow duration-500 animate-fade-in">
              <div className="flex gap-1 mb-4 md:mb-8" aria-label={`Rating: ${TESTIMONIALS[testimonialIndex].rating} out of 5 stars`}>
                {Array.from({ length: TESTIMONIALS[testimonialIndex].rating }).map((_, i) => <Star key={i} className="w-5 h-5 text-primary fill-primary" aria-hidden="true" />)}
              </div>
              <blockquote className="text-xl md:text-3xl font-medium mb-6 md:mb-10 leading-snug tracking-tight text-text-main text-wrap-pretty">{TESTIMONIALS[testimonialIndex].content}</blockquote>
              <div className="flex items-center gap-4 pt-4 md:pt-6 border-t border-fine">
                <img
                  alt={TESTIMONIALS[testimonialIndex].name}
                  width={48}
                  height={48}
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

      <div className="w-full h-px bg-fine max-w-7xl mx-auto" />

      {/* ── JOURNAL ── */}
      <section ref={journalRef} id="journal" className={`py-12 sm:py-20 md:py-32 bg-surface border-b border-fine scroll-mt-24 reveal ${journalVisible ? 'active' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-24">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Our Journal</p>
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display uppercase tracking-tighter mb-4 text-text-main">
              The <span className="font-serif-display italic font-light text-primary normal-case">studio</span> journal
            </h2>
            <div className="w-16 h-0.5 bg-primary mx-auto" />
          </div>
          <div className="grid gap-6 md:gap-10 max-w-5xl mx-auto">
            {ARTICLES.map((article) => (
              <ArticleCard key={article.id} article={article} onClick={() => setIsContactOpen(true)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section ref={faqRef} id="faq" className={`py-12 sm:py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 scroll-mt-24 reveal ${faqVisible ? 'active' : ''}`}>
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Got Questions?</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display uppercase tracking-tighter mb-6 text-text-main text-wrap-balance leading-[0.95]">
              Frequently <br />Asked <br />
              <span className="font-serif-display italic font-light text-primary normal-case">Questions</span>
            </h2>
            <p className="text-sm md:text-base text-on-surface/65 mb-8 leading-relaxed max-w-md">
              Can’t find what you are looking for? Send us a message through the contact form, and we’ll get back to you with custom details.
            </p>
          </div>
          <div className="lg:col-span-7 flex flex-col gap-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className={`border border-fine rounded-[1.5rem] p-5 md:p-6 transition-all duration-300 bg-surface-container-low/20 ${isOpen ? 'bg-surface-container-low/65 border-primary/20 shadow-md' : 'hover:bg-surface-container-low/40'}`}>
                  <button onClick={() => toggleFaq(idx)} className="w-full flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:rounded-2xl cursor-pointer" aria-expanded={isOpen}>
                    <h3 className="font-display font-bold text-base md:text-lg uppercase tracking-tight text-text-main pr-4">{item.q}</h3>
                    <ChevronDown className={`w-5 h-5 text-on-surface/50 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-primary' : ''}`} aria-hidden="true" />
                  </button>
                  <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-fine' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}>
                    <div className="overflow-hidden">
                      <p className="text-xs md:text-sm text-on-surface/75 leading-relaxed">{item.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section ref={contactRef} id="contact" className={`py-12 sm:py-20 md:py-32 bg-surface scroll-mt-24 reveal ${contactVisible ? 'active' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-20">
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Get In Touch</p>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display uppercase tracking-tighter mb-6 text-text-main">
                  Let’s create <br />
                  <span className="font-serif-display italic font-light text-primary normal-case">something new</span> <br />
                  together.
                </h2>
                <p className="text-sm md:text-base text-on-surface/65 mb-6 leading-relaxed max-w-md">
                  Have an idea, a rebranding project, or a digital platform you want to build? Tell us about it, and we will get back to you within 24 hours.
                </p>
              </div>
              <div className="space-y-4 md:space-y-6 pt-4 md:pt-6 border-t border-fine mt-4 lg:mt-0">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 mb-1">Email us</h4>
                  <a href="mailto:hello@velisstudio.com" className="text-base font-bold text-text-main hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline">hello@velisstudio.com</a>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 mb-1">Our Office</h4>
                  <p className="text-sm font-medium text-text-main leading-relaxed">Søndergade 14, 1. sal<br />8000 Aarhus C, Denmark</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 mb-1">Business Hours</h4>
                  <p className="text-sm font-medium text-text-main">Mon – Fri: 9:00 AM – 5:00 PM CET</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 bg-surface-container-low/40 p-5 sm:p-10 rounded-[2rem] border border-fine">
              {inlineSubmitSuccess ? (
                <div className="py-16 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary"><Check className="w-8 h-8" /></div>
                  <h4 className="text-2xl font-display font-bold text-text-main uppercase tracking-tight">Message Received!</h4>
                  <p className="text-sm text-on-surface/60 max-w-sm mx-auto leading-relaxed">Thank you for reaching out. A partner from Velis Studio will contact you within 24 hours to schedule a discovery session.</p>
                </div>
              ) : (
                <form onSubmit={handleInlineFormSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="home-contact-name" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">Your Name</label>
                      <input id="home-contact-name" type="text" name="name" required value={inlineFormData.name} onChange={handleInlineInputChange} placeholder="e.g., Alexander Cole…" autoComplete="name" className="w-full bg-surface-container-lowest border border-fine rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface/30 shadow-sm" />
                    </div>
                    <div>
                      <label htmlFor="home-contact-email" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">Email Address</label>
                      <input id="home-contact-email" type="email" name="email" required value={inlineFormData.email} onChange={handleInlineInputChange} placeholder="e.g., alex@example.com…" autoComplete="email" spellCheck={false} className="w-full bg-surface-container-lowest border border-fine rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface/30 shadow-sm" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="home-contact-subject" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">Subject</label>
                    <input id="home-contact-subject" type="text" name="subject" required value={inlineFormData.subject} onChange={handleInlineInputChange} placeholder="e.g., Rebranding & Custom Build…" autoComplete="off" className="w-full bg-surface-container-lowest border border-fine rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface/30 shadow-sm" />
                  </div>
                  <div>
                    <label htmlFor="home-contact-message" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">Project Brief & Details</label>
                    <textarea id="home-contact-message" name="message" required rows={4} value={inlineFormData.message} onChange={handleInlineInputChange} placeholder="e.g., Tell us a little bit about your goals, budget, or timeline…" autoComplete="off" className="w-full bg-surface-container-lowest border border-fine rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface/30 resize-none shadow-sm" />
                  </div>
                  <button type="submit" disabled={isInlineSubmitting} className="w-full bg-primary hover:bg-text-main hover:text-surface text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer shadow-md hover:shadow-lg">
                    {isInlineSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending Message…</> : <>Send Inquiry <ArrowRight className="w-4 h-4" aria-hidden="true" /></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <FooterCTA onStartProjectClick={() => setIsContactOpen(true)} />
    </>
  );
}
