import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Play, ChevronDown, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCardTilt } from '../hooks/useCardTilt';
import { useMagnetic } from '../hooks/useMagnetic';
import { TESTIMONIALS, FAQ_ITEMS } from '../data/constants';
import { FooterCTA } from '../components/FooterCTA';
import { SEO } from '../components/SEO';
import type { LayoutContextType } from '../components/Layout';

export const About: React.FC = () => {
  const { setIsContactOpen, setIsVideoOpen } = useOutletContext<LayoutContextType>();
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Section observers for animation
  const [aboutRef, aboutVisible] = useIntersectionObserver();
  const [testimonialsRef, testimonialsVisible] = useIntersectionObserver();
  const [faqRef, faqVisible] = useIntersectionObserver();

  // Tilt and magnetic refs
  const videoTiltRef = useCardTilt<HTMLDivElement>(5);
  const videoPlayBtnRef = useMagnetic<HTMLButtonElement>();

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      <SEO 
        title="About Us — Design and Studio Culture" 
        description="Learn about Velis Studio. We are a small, agile team of designers, developers, and brand strategists obsessed with minimalist excellence and customer acquisition." 
      />

      {/* --- ABOUT INTRO & STATS --- */}
      <section 
        ref={aboutRef}
        id="about" 
        className={`pt-28 pb-12 sm:pt-48 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 reveal ${aboutVisible ? 'active' : ''}`}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text & Stats */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 lg:mb-6 text-primary">About Velis Studio</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 lg:mb-8 font-display uppercase leading-[0.95] text-text-main">
              Meaningful <br /> 
              Experiences <br />
              <span className="font-serif-display italic font-light text-primary normal-case">By Design.</span>
            </h1>
            <p className="text-base md:text-lg text-on-surface/65 mb-8 lg:mb-12 leading-relaxed">
              We're a small, agile team of designers, developers, and brand strategists obsessed with building digital identities that resonate and convert. Every pixel and line of code serves a purpose in our minimalist pursuit of excellence.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 sm:gap-x-8">
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

          {/* Showreel Container */}
          <div 
            ref={videoTiltRef}
            className="relative bg-surface-container-high rounded-[2rem] md:rounded-[3rem] p-1.5 aspect-video lg:aspect-square overflow-hidden group shadow-md"
          >
            <img 
              alt="Our Creative Studio Culture" 
              className="w-full h-full object-cover rounded-[1.8rem] md:rounded-[2.8rem] group-hover:scale-102 transition-transform duration-[1000ms] grayscale group-hover:grayscale-0" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4CNQwqUntuHEpcx7ATrdQ086c2eVWqa1oV-IsdL23fk3pYWc-WEkqY0DfOFxM6rbL3QSbviAE7QEpQIAbcLayTuv__8OxIUJeZ5h7haVH9vmcGWgXv6sse0Kc-00m9_NqZYIjilAflD1GsdhXB022-2ekAMu2RYLJtENeX1mm3Z2WhqKePIarLXUFY_A-fN2C-LTevckQscYz5jecZRf3vWot5SCSG4niLLprerKXr8Hdq9H945Gtq6pYPmuVLFAcS21iq5n7KsNk"
            />
            <div className="card-glow-overlay" />
            <div className="card-shine-overlay" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-300 z-10">
              <button 
                ref={videoPlayBtnRef}
                onClick={() => setIsVideoOpen(true)}
                className="bg-white/40 backdrop-blur-2xl border border-white/40 w-24 h-24 rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl group-hover:bg-primary/95 group-hover:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/50 cursor-pointer"
                aria-label="Play Studio Showreel Video"
              >
                <Play className="text-white fill-current w-8 h-8 translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-fine max-w-7xl mx-auto" />

      {/* --- TESTIMONIALS SECTION --- */}
      <section 
        ref={testimonialsRef}
        className={`py-12 sm:py-20 md:py-32 overflow-hidden reveal ${testimonialsVisible ? 'active' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-24 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Success Stories</p>
              <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold font-display uppercase tracking-tighter leading-none text-text-main">
                Loved by <br />
                <span className="font-serif-display italic font-light text-primary normal-case">local businesses</span>
              </h2>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-4">
              <button 
                onClick={prevTestimonial}
                className="btn-click-scale w-14 h-14 rounded-full border border-fine flex items-center justify-center hover:bg-surface-container-lowest hover:border-primary/30 transition-[background-color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 text-on-surface" />
              </button>
              <button 
                onClick={nextTestimonial}
                className="btn-click-scale w-14 h-14 rounded-full border border-fine flex items-center justify-center hover:bg-surface-container-lowest hover:border-primary/30 transition-[background-color,border-color] duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer"
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
              className="bg-surface-container-lowest p-6 md:p-14 rounded-[2rem] md:rounded-[2.5rem] border border-fine hover:shadow-xl transition-shadow duration-500 animate-fade-in"
            >
              <div className="flex gap-1 mb-4 md:mb-8" aria-label={`Rating: ${TESTIMONIALS[testimonialIndex].rating} out of 5 stars`}>
                {Array.from({ length: TESTIMONIALS[testimonialIndex].rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-primary fill-primary" />
                ))}
              </div>

              <blockquote className="text-xl md:text-3xl font-medium mb-6 md:mb-10 leading-snug tracking-tight text-text-main text-wrap-pretty">
                {TESTIMONIALS[testimonialIndex].content}
              </blockquote>

              <div className="flex items-center gap-4 pt-4 md:pt-6 border-t border-fine">
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

      <div className="w-full h-px bg-fine max-w-7xl mx-auto" />

      {/* --- FAQ SECTION --- */}
      <section 
        ref={faqRef}
        id="faq" 
        className={`py-12 sm:py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 reveal ${faqVisible ? 'active' : ''}`}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Header column */}
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Got Questions?</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display uppercase tracking-tighter mb-6 text-text-main text-wrap-balance leading-[0.95]">
              Frequently <br />
              Asked <br />
              <span className="font-serif-display italic font-light text-primary normal-case">Questions</span>
            </h2>
            <p className="text-sm md:text-base text-on-surface/65 mb-8 leading-relaxed max-w-md">
              Can't find what you are looking for? Send us a message through the contact form, and we'll get back to you with custom details.
            </p>
          </div>

          {/* Accordion column */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className={`border border-fine rounded-[1.5rem] p-5 md:p-6 transition-all duration-300 bg-surface-container-low/20 ${
                    isOpen ? 'bg-surface-container-low/65 border-primary/20 shadow-md' : 'hover:bg-surface-container-low/40'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between text-left focus-visible:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-display font-bold text-base md:text-lg uppercase tracking-tight text-text-main pr-4">
                      {item.q}
                    </h3>
                    <ChevronDown className={`w-5 h-5 text-on-surface/50 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                  </button>

                  <div 
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-fine' : 'grid-rows-[0fr] opacity-0 overflow-hidden'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs md:text-sm text-on-surface/75 leading-relaxed">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <FooterCTA onStartProjectClick={() => setIsContactOpen(true)} />
    </>
  );
};
