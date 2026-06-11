'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Check, Loader2, X } from 'lucide-react';

interface ModalContextType {
  setIsContactOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVideoOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalContext = createContext<ModalContextType>({
  setIsContactOpen: () => {},
  setIsVideoOpen: () => {},
});

export const useModal = () => useContext(ModalContext);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isContactOpen || isVideoOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isContactOpen, isVideoOpen]);

  // ESC closes modals
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsContactOpen(false);
        setIsVideoOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    <ModalContext.Provider value={{ setIsContactOpen, setIsVideoOpen }}>
      {children}

      {/* ── Contact Modal ── */}
      {isContactOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Contact us"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsContactOpen(false)}
          />
          <div className="relative bg-surface-container-lowest rounded-[2rem] p-6 sm:p-10 max-w-lg w-full border border-fine shadow-2xl z-10">
            <button
              onClick={() => setIsContactOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-on-surface/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              aria-label="Close"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>

            {submitSuccess ? (
              <div className="py-12 text-center flex flex-col items-center gap-4 animate-fade-in">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  <Check className="w-8 h-8" aria-hidden="true" />
                </div>
                <h4 className="text-2xl font-display font-bold text-text-main uppercase tracking-tight">Message Sent!</h4>
                <p className="text-sm text-on-surface/60 max-w-xs leading-relaxed">
                  A partner from Velis Studio will contact you within 24 hours to schedule a discovery session.
                </p>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.3em] mb-2 text-primary">Let’s Talk</p>
                <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight mb-6 text-text-main leading-none">
                  Book a Free<br />
                  <span className="font-serif-display italic font-light text-primary normal-case">Strategy Call</span>
                </h3>
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="modal-name" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">Your Name</label>
                    <input
                      id="modal-name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g., Alexander Cole…"
                      autoComplete="name"
                      className="w-full bg-surface-container-low border border-fine rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-email" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">Email</label>
                    <input
                      id="modal-email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g., alex@example.com…"
                      autoComplete="email"
                      spellCheck={false}
                      className="w-full bg-surface-container-low border border-fine rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface/30"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-message" className="block text-xs font-bold uppercase tracking-widest text-on-surface/50 mb-1.5">Tell Us About Your Project</label>
                    <textarea
                      id="modal-message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="e.g., We need a speed-optimized service site…"
                      autoComplete="off"
                      className="w-full bg-surface-container-low border border-fine rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-on-surface/30 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-text-main text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> Sending…</> : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Video Modal ── */}
      {isVideoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label="Studio showreel"
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsVideoOpen(false)}
          />
          <div className="relative w-full max-w-4xl aspect-video rounded-[2rem] overflow-hidden bg-black z-10">
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              aria-label="Close video"
            >
              <X className="w-5 h-5 text-white" aria-hidden="true" />
            </button>
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Studio Showreel"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
