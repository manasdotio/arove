'use client';

import React, { useState } from 'react';
import { Check, Loader2, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export default function ContactClient() {
  const [contactRef, contactVisible] = useIntersectionObserver();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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
        setSubmitSuccess(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <section
      ref={contactRef}
      id="contact"
      className={`pt-28 pb-12 sm:pt-48 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 reveal ${contactVisible ? 'active' : ''}`}
    >
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-20">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Get In Touch</p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display uppercase tracking-tighter mb-6 text-text-main leading-none">
              Let’s create <br />
              <span className="font-serif-display italic font-light text-primary normal-case">something new</span> <br />
              together.
            </h1>
            <p className="text-sm md:text-base text-on-surface/65 mb-6 leading-relaxed max-w-md">
              Have an idea, a website rebuild, or a digital platform you want to build? Tell us about it, and we will get back to you within 24 hours.
            </p>
          </div>

          <div className="space-y-4 md:space-y-6 pt-4 md:pt-6 border-t border-fine mt-4 lg:mt-0">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 mb-1">Email us</h4>
              <a href="mailto:hello@velisstudio.com" className="text-base font-bold text-text-main hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline">
                hello@velisstudio.com
              </a>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 mb-1">Our Office</h4>
              <p className="text-sm font-medium text-text-main leading-relaxed">
                Søndergade 14, 1. sal<br />
                8000 Aarhus C, Denmark
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/40 mb-1">Business Hours</h4>
              <p className="text-sm font-medium text-text-main">Mon – Fri: 9:00 AM – 5:00 PM CET</p>
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="lg:col-span-7 bg-surface-container-low/40 p-5 sm:p-10 rounded-[2rem] border border-fine">
          {submitSuccess ? (
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
            <form onSubmit={handleFormSubmit} className="space-y-4 md:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="contact-name-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">Your Name</label>
                  <input
                    id="contact-name-input"
                    type="text" name="name" required value={formData.name} onChange={handleInputChange}
                    placeholder="e.g., Alexander Cole…" autoComplete="name"
                    className="w-full bg-surface-container-lowest border border-fine rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 placeholder:text-on-surface/30 shadow-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">Email Address</label>
                  <input
                    id="contact-email-input"
                    type="email" name="email" required value={formData.email} onChange={handleInputChange}
                    placeholder="e.g., alex@example.com…" autoComplete="email" spellCheck={false}
                    className="w-full bg-surface-container-lowest border border-fine rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 placeholder:text-on-surface/30 shadow-sm"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="contact-subject-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">Subject</label>
                <input
                  id="contact-subject-input"
                  type="text" name="subject" required value={formData.subject} onChange={handleInputChange}
                  placeholder="e.g., Website Rebuild Project…"
                  autoComplete="off"
                  className="w-full bg-surface-container-lowest border border-fine rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 placeholder:text-on-surface/30 shadow-sm"
                />
              </div>
              <div>
                <label htmlFor="contact-message-input" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">Project Brief & Details</label>
                <textarea
                  id="contact-message-input"
                  name="message" required rows={6} value={formData.message} onChange={handleInputChange}
                  placeholder="e.g., Tell us a little bit about your goals, timeline, or current website…"
                  autoComplete="off"
                  className="w-full bg-surface-container-lowest border border-fine rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 placeholder:text-on-surface/30 resize-none shadow-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-text-main hover:text-surface text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer shadow-md hover:shadow-lg"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending Message…</>
                ) : (
                  <>Send Message <ArrowRight className="w-4 h-4" aria-hidden="true" /></>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
