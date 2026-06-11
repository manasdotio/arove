'use client';

import React from 'react';
import { useCardTilt } from '@/hooks/useCardTilt';
import { useMagnetic } from '@/hooks/useMagnetic';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  features: string[];
  delayClass?: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, desc, features, delayClass = '' }) => {
  const cardRef = useCardTilt<HTMLDivElement>(5);
  const iconRef = useMagnetic<HTMLDivElement>();

  return (
    <div
      ref={cardRef}
      className={`bg-surface-container-lowest p-6 md:p-10 rounded-[2rem] border border-fine hover:border-primary/30 transition-all duration-500 group shadow-sm relative overflow-hidden ${delayClass}`}
    >
      <div className="card-glow-overlay" />
      <div className="card-shine-overlay" />

      <div
        ref={iconRef}
        className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 md:mb-8 transition-transform duration-300 relative z-10"
      >
        {icon}
      </div>

      <h3 className="text-2xl md:text-3xl font-display font-bold uppercase mb-3 md:mb-4 text-text-main group-hover:text-primary transition-colors duration-300 relative z-10">
        {title}
      </h3>

      <p className="text-sm md:text-base text-on-surface/65 mb-6 md:mb-8 leading-relaxed relative z-10">
        {desc}
      </p>

      <ul className="space-y-3 relative z-10 border-t border-fine pt-6" aria-label={`Key deliverables for ${title}`}>
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-on-surface/70">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};
