'use client';

import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { PROJECTS } from '@/lib/constants';
import { ProjectCard } from '@/components/ProjectCard';
import { FooterCTA } from '@/components/FooterCTA';
import { useModal } from '@/components/ModalProvider';

export default function WorkClient() {
  const { setIsContactOpen } = useModal();
  const [headerRef, headerVisible] = useIntersectionObserver();

  return (
    <>
      <section
        ref={headerRef}
        className={`pt-28 pb-12 sm:pt-48 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 reveal ${headerVisible ? 'active' : ''}`}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-24 gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Selected Portfolio</p>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.95] font-display uppercase text-text-main text-wrap-balance">
              Our Digital <br />
              <span className="font-serif-display italic font-light text-primary normal-case">Creations</span>
            </h1>
          </div>
          <div className="max-w-sm">
            <p className="text-sm md:text-base text-on-surface/65 mb-6 leading-relaxed">
              We focus on clean layouts, performance, and clear paths to lead conversion. Every site is built with precision.
            </p>
          </div>
        </div>

        {/* Full Projects Grid — asymmetric layout */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-24">
          {PROJECTS.map((project, idx) => {
            const isFeatured = idx % 3 === 0;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                idx={idx}
                isFeatured={isFeatured}
                noOffset={true}
                className={isFeatured ? 'md:col-span-2' : ''}
                onClick={() => setIsContactOpen(true)}
              />
            );
          })}
        </div>
      </section>

      <FooterCTA onStartProjectClick={() => setIsContactOpen(true)} />
    </>
  );
}
