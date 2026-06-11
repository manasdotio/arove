import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ARTICLES } from '../data/constants';
import { ArticleCard } from '../components/ArticleCard';
import { FooterCTA } from '../components/FooterCTA';
import { SEO } from '../components/SEO';
import type { LayoutContextType } from '../components/Layout';

export const Journal: React.FC = () => {
  const { setIsContactOpen } = useOutletContext<LayoutContextType>();
  const [headerRef, headerVisible] = useIntersectionObserver();

  return (
    <>
      <SEO 
        title="Journal — Insights & Design Trends" 
        description="Stories, ideas, and insights from our creative team. Read our latest articles on web design, local business marketing, and branding trends." 
      />

      <section 
        ref={headerRef}
        className={`pt-28 pb-12 sm:pt-48 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-6 reveal ${headerVisible ? 'active' : ''}`}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-28 gap-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 text-primary">Our Insights</p>
            <h1 className="text-5xl sm:text-8xl lg:text-[110px] font-bold font-display uppercase tracking-tighter text-text-main leading-[0.9] sm:leading-[0.85]">
              The Studio <br />
              <span className="font-serif-display italic font-light text-primary normal-case">Journal</span>
            </h1>
          </div>
          <div className="max-w-sm">
            <p className="text-sm md:text-base text-on-surface/65 leading-relaxed">
              Thoughts, advice, and perspectives on helping local businesses grow their digital presence, SEO rankings, and customer conversion rates.
            </p>
          </div>
        </div>

        {/* Articles List */}
        <div className="grid gap-16 md:gap-24 max-w-5xl mx-auto mb-12 md:mb-24">
          {ARTICLES.map((article) => (
            <ArticleCard 
              key={article.id}
              article={article}
              variant="large"
              onClick={() => setIsContactOpen(true)}
            />
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <FooterCTA onStartProjectClick={() => setIsContactOpen(true)} />
    </>
  );
};
