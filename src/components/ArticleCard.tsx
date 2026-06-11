import React from 'react';
import { useCardTilt } from '../hooks/useCardTilt';
import { ArrowRight } from 'lucide-react';
import type { Article } from '../data/constants';

interface ArticleCardProps {
  article: Article;
  onClick: () => void;
  variant?: 'default' | 'large';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick, variant = 'default' }) => {
  const imageTiltRef = useCardTilt<HTMLDivElement>(5);

  if (variant === 'large') {
    return (
      <button 
        type="button"
        className="group flex flex-col pb-12 md:pb-16 border-b border-fine hover:border-primary/20 transition-colors duration-500 cursor-pointer text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
        onClick={onClick}
      >
        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-3 md:mb-4">
          {article.category} • {article.date}
        </p>
        
        <h3 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase mb-6 md:mb-8 text-text-main group-hover:text-primary transition-colors duration-300 leading-[0.95] tracking-tighter text-wrap-balance">
          {article.title}
        </h3>

        {/* 3D Tilted Image Container - Wide aspect for editorial feel */}
        <div 
          ref={imageTiltRef}
          className="w-full aspect-[3/2] md:aspect-[21/9] overflow-hidden rounded-[2rem] bg-surface-container shadow-sm relative transition-all duration-700 ease-out mb-6 md:mb-8"
        >
          <img 
            alt={article.title} 
            className="w-full h-full object-cover scale-102 group-hover:scale-105 transition-transform duration-[1200ms] grayscale group-hover:grayscale-0" 
            src={article.imageUrl}
            loading="lazy"
          />
          <div className="card-glow-overlay" />
          <div className="card-shine-overlay" />
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700 pointer-events-none" />
        </div>
        
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:translate-x-1.5 transition-transform duration-300">
          Read Article <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    );
  }

  return (
    <button 
      type="button"
      className="group flex flex-col md:flex-row items-center gap-4 md:gap-12 pb-6 md:pb-10 border-b border-fine hover:border-primary/20 transition-colors duration-500 cursor-pointer text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4"
      onClick={onClick}
    >
      {/* 3D Tilted Image Container */}
      <div 
        ref={imageTiltRef}
        className="w-full md:w-2/5 aspect-[3/2] overflow-hidden rounded-2xl bg-surface-container shadow-sm relative transition-all duration-700 ease-out"
      >
        <img 
          alt={article.title} 
          className="w-full h-full object-cover scale-102 group-hover:scale-105 transition-transform duration-[1200ms] grayscale group-hover:grayscale-0" 
          src={article.imageUrl}
          loading="lazy"
        />
        <div className="card-glow-overlay" />
        <div className="card-shine-overlay" />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700 pointer-events-none" />
      </div>
      
      <div className="w-full md:w-3/5">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary mb-2 md:mb-3">
          {article.category} • {article.date}
        </p>
        <h3 className="text-2xl md:text-3xl font-display font-bold uppercase mb-3 md:mb-4 text-text-main group-hover:text-primary transition-colors duration-200">
          {article.title}
        </h3>
        <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:translate-x-1.5 transition-transform duration-300">
          Read Article <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  );
};
