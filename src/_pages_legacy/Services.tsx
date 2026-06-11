import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { ChevronDown, Check, Loader2, ArrowRight, BarChart3, Zap, Monitor, Star } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { PROCESS_STEPS } from '../data/constants';
import { ServiceCard } from '../components/ServiceCard';
import { FooterCTA } from '../components/FooterCTA';
import { SEO } from '../components/SEO';
import type { LayoutContextType } from '../components/Layout';

export const Services: React.FC = () => {
  const { setIsContactOpen } = useOutletContext<LayoutContextType>();
  
  // Section observers for animation
  const [headerVisibleRef, headerVisible] = useIntersectionObserver();
  const [processRef, processVisible] = useIntersectionObserver();
  const [servicesRef, servicesVisible] = useIntersectionObserver();
  const [plannerRef, plannerVisible] = useIntersectionObserver();

  // Component states
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  
  const [inlineFormData, setInlineFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isInlineSubmitting, setIsInlineSubmitting] = useState(false);
  const [inlineSubmitSuccess, setInlineSubmitSuccess] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleInlineInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInlineFormData((prev) => ({ ...prev, [name]: value }));
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
      <SEO 
        title="Services & Pricing — High Performance Solutions" 
        description="See our lead capture systems, speed-optimization methods, and custom business design solutions. Use our interactive budget planner to get a custom quote." 
      />

      {/* --- SERVICES LISTING SECTION --- */}
      <section 
        ref={headerVisibleRef}
        className={`pt-28 pb-12 sm:pt-48 sm:pb-20 bg-surface-container-low/10 reveal ${headerVisible ? 'active' : ''}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-24">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Our Expertise</p>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold font-display uppercase tracking-tighter text-text-main leading-[0.95]">
              We do it all <br />
              <span className="font-serif-display italic font-light text-primary normal-case">with ease.</span>
            </h1>
            <p className="max-w-xl mx-auto text-sm sm:text-base text-on-surface/65 mt-6 leading-relaxed">
              We focus on building websites that load instantly, rank locally, and drive bookings for service-oriented businesses.
            </p>
          </div>

          <div ref={servicesRef} className={`grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 reveal ${servicesVisible ? 'active' : ''}`}>
            <ServiceCard 
              icon={<BarChart3 className="w-6 h-6" aria-hidden="true" />}
              title="Lead Capture"
              desc="Custom-designed landing pages optimized to turn visits into phone calls, quotes, and bookings."
              features={["Tap-to-Call", "Booking Forms"]}
            />

            <ServiceCard 
              icon={<Zap className="w-6 h-6" aria-hidden="true" />}
              title="Speed & SEO"
              desc="We build near-instant loading sites that rank higher on Google Maps and maximize paid ads."
              features={["95+ PageSpeed", "Schema Markup"]}
              delayClass="delay-75"
            />

            <ServiceCard 
              icon={<Monitor className="w-6 h-6" aria-hidden="true" />}
              title="Mobile-First"
              desc="Over 60% of local searches happen on mobile. We design websites built for touch screens."
              features={["Sticky Call Bars", "Fluid Layouts"]}
              delayClass="delay-150"
            />

            <ServiceCard 
              icon={<Star className="w-6 h-6" aria-hidden="true" />}
              title="Trust Sync"
              desc="Embed your live Google Maps and Yelp reviews to showcase social proof from day one."
              features={["Live Google Sync", "Trust Badges"]}
              delayClass="delay-200"
            />
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-fine max-w-7xl mx-auto" />

      {/* --- PROCESS ROADMAP SECTION --- */}
      <section 
        ref={processRef}
        id="process" 
        className={`py-12 sm:py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 reveal ${processVisible ? 'active' : ''}`}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Title Column */}
          <div className="lg:col-span-5">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">How We Work</p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display uppercase tracking-tighter mb-6 text-text-main text-wrap-balance leading-[0.95]">
              Our structured <br />
              <span className="font-serif-display italic font-light text-primary normal-case">creative</span> roadmap
            </h2>
            <p className="text-sm md:text-base text-on-surface/65 mb-8 leading-relaxed max-w-md">
              We believe that clean workflows yield outstanding results. Click on each step to learn what we deliver and how we guide your brand to success.
            </p>
            
            {/* Desktop Step Navigation */}
            <div className="hidden lg:flex flex-col gap-3 border-l-2 border-fine pl-6 mt-8">
              {PROCESS_STEPS.map((step, idx) => (
                <button
                  key={step.num}
                  onClick={() => setActiveProcessStep(idx)}
                  className={`text-left text-xs font-bold uppercase tracking-widest py-1.5 transition-all duration-300 focus-visible:outline-none focus-visible:underline cursor-pointer ${
                    activeProcessStep === idx ? 'text-primary pl-2 font-extrabold translate-x-1' : 'text-on-surface/40 hover:text-on-surface'
                  }`}
                >
                  Phase {step.num} — {step.title}
                </button>
              ))}
            </div>
          </div>

          {/* Accordion Column */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeProcessStep === idx;
              return (
                <div 
                  key={step.num}
                  className={`border border-fine rounded-[2rem] p-6 transition-all duration-500 bg-surface-container-low/20 ${
                    isActive ? 'bg-surface-container-low/70 border-primary/20 shadow-md' : 'hover:bg-surface-container-low/40'
                  }`}
                >
                  <button
                    onClick={() => setActiveProcessStep(idx)}
                    className="w-full flex items-center justify-between text-left focus-visible:outline-none cursor-pointer"
                    aria-expanded={isActive}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`font-display font-bold text-lg md:text-xl ${isActive ? 'text-primary' : 'text-on-surface/40'}`}>
                        {step.num}
                      </span>
                      <h3 className="font-display font-bold text-lg md:text-xl uppercase tracking-tight text-text-main">
                        {step.title}
                      </h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-on-surface/50 transition-transform duration-300 ${isActive ? 'rotate-180 text-primary' : ''}`} />
                  </button>

                  <div 
                    className={`grid transition-all duration-500 ease-in-out ${
                      isActive ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-fine' : 'grid-rows-[0fr] opacity-0 overflow-hidden'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs md:text-sm text-on-surface/70 leading-relaxed mb-5">
                        {step.desc}
                      </p>
                      
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-2">
                        <div>
                          <span className="block text-[9px] font-bold uppercase tracking-widest text-on-surface/40 mb-2">Deliverables</span>
                          <div className="flex flex-wrap gap-2">
                            {step.deliverables.map((deliv) => (
                              <span 
                                key={deliv}
                                className="text-[9px] font-bold uppercase tracking-wider bg-surface-container-lowest border border-fine text-on-surface/70 px-3 py-1 rounded-full"
                              >
                                {deliv}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="shrink-0 bg-primary/10 text-primary border border-primary/10 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest">
                          {step.duration}
                        </div>
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

      {/* --- SERVICE & BUDGET PLANNER --- */}
      <section 
        ref={plannerRef}
        id="planner"
        className={`py-12 sm:py-20 md:py-32 max-w-7xl mx-auto px-4 sm:px-6 reveal ${plannerVisible ? 'active' : ''}`}
      >
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-20">
          {/* Planner Intro */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Inquiry Planner</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display uppercase tracking-tighter mb-6 text-text-main">
                Configure your <br />
                <span className="font-serif-display italic font-light text-primary normal-case">custom page</span> <br />
                package.
              </h2>
              <p className="text-sm md:text-base text-on-surface/65 mb-6 leading-relaxed max-w-md">
                Select your required services and budget range on the right. The calculator compiles a live preview of your request, ensuring our teams align on scope from the first discovery call.
              </p>
            </div>
            <div className="hidden lg:block border-t border-fine pt-8">
              <p className="text-xs text-on-surface/40 font-bold uppercase tracking-wider">
                ⚡ Near-instant responses within 24 hours
              </p>
            </div>
          </div>

          {/* Interactive Form & Live sentence compiler */}
          <div className="lg:col-span-7 bg-surface-container-low/40 p-5 sm:p-10 rounded-[2rem] border border-fine">
            {inlineSubmitSuccess ? (
              <div className="py-16 text-center flex flex-col items-center justify-center gap-4 animate-fade-in">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-display font-bold text-text-main uppercase tracking-tight">Message Received!</h4>
                <p className="text-sm text-on-surface/60 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. A partner from Velis Studio will contact you within 24 hours to schedule a discovery session.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInlineFormSubmit} className="space-y-4 md:space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="inline-name-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="inline-name-input"
                      type="text"
                      name="name"
                      required
                      value={inlineFormData.name}
                      onChange={handleInlineInputChange}
                      placeholder="e.g. Alexander Cole"
                      autoComplete="name"
                      className="w-full bg-surface-container-lowest border border-fine rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 placeholder:text-on-surface/30 shadow-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="inline-email-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="inline-email-input"
                      type="email"
                      name="email"
                      required
                      spellCheck={false}
                      value={inlineFormData.email}
                      onChange={handleInlineInputChange}
                      placeholder="e.g. alex@example.com"
                      autoComplete="email"
                      className="w-full bg-surface-container-lowest border border-fine rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 placeholder:text-on-surface/30 shadow-sm"
                    />
                  </div>
                </div>

                {/* Services Tags */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-3">
                    What are we building?
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      { id: 'landing', label: 'Local Landing Page' },
                      { id: 'website', label: 'Business Website' },
                      { id: 'seo', label: 'Google Maps & Local SEO' },
                      { id: 'maintenance', label: 'Monthly Maintenance' },
                      { id: 'other', label: 'Other' }
                    ].map((srv) => {
                      const isSelected = selectedServices.includes(srv.label);
                      return (
                        <button
                          key={srv.id}
                          type="button"
                          onClick={() => toggleService(srv.label)}
                          className={`px-4 py-2.5 rounded-full border text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-sm shadow-primary/20'
                              : 'bg-surface-container-lowest text-on-surface/75 border-fine hover:border-primary/40'
                          }`}
                        >
                          {srv.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Budget Cards */}
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-3">
                    Project Budget
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'under-2k', label: '<$2k' },
                      { id: '2k-5k', label: '$2k - $5k' },
                      { id: '5k-plus', label: '$5k+' },
                      { id: 'monthly', label: 'Monthly Plan' }
                    ].map((opt) => {
                      const isSelected = selectedBudget === opt.label;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedBudget(opt.label)}
                          className={`py-3 px-1 rounded-xl border text-[11px] font-bold uppercase tracking-wider text-center transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                            isSelected
                              ? 'bg-primary/10 text-primary border-primary font-bold shadow-sm shadow-primary/5'
                              : 'bg-surface-container-lowest text-on-surface/75 border-fine hover:border-primary/40'
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Request Preview */}
                <div className="bg-surface-container-lowest border border-fine border-dashed rounded-2xl p-5 text-[11px] sm:text-xs leading-relaxed text-on-surface/75 text-center mt-6">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-on-surface/40 mb-2">Live Request Preview</span>
                  {selectedServices.length > 0 || selectedBudget ? (
                    <p className="italic font-medium">
                      "I want to partner with Velis Studio on{' '}
                      {selectedServices.length > 0 ? (
                        <strong className="text-primary not-italic">{selectedServices.join(' & ')}</strong>
                      ) : (
                        <span className="text-on-surface/40">selected services</span>
                      )}{' '}
                      with a project budget of{' '}
                      {selectedBudget ? (
                        <strong className="text-primary not-italic">{selectedBudget}</strong>
                      ) : (
                        <span className="text-on-surface/40">estimated budget</span>
                      )}
                      ."
                    </p>
                  ) : (
                    <p className="text-on-surface/45 italic">
                      Select services and budget above to compile your inquiry preview...
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="inline-message-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">
                    Project Brief & Details
                  </label>
                  <textarea
                    id="inline-message-input"
                    name="message"
                    required
                    rows={4}
                    value={inlineFormData.message}
                    onChange={handleInlineInputChange}
                    placeholder="Tell us a little bit about your goals, budget, or timeline…"
                    className="w-full bg-surface-container-lowest border border-fine rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 placeholder:text-on-surface/30 resize-none shadow-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isInlineSubmitting}
                  className="w-full bg-primary hover:bg-text-main hover:text-surface text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer shadow-md hover:shadow-lg"
                >
                  {isInlineSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Message…
                    </>
                  ) : (
                    <>
                      Send Inquiry <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <FooterCTA onStartProjectClick={() => setIsContactOpen(true)} />
    </>
  );
};
