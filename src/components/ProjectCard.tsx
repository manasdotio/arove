import React from 'react';
import { useCardTilt } from '../hooks/useCardTilt';
import type { Project } from '../data/constants';

interface ProjectCardProps {
  project: Project;
  idx: number;
  onClick: () => void;
  isFeatured?: boolean;
  noOffset?: boolean;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  idx, 
  onClick,
  isFeatured = false,
  noOffset = false,
  className = ''
}) => {
  const cardTiltRef = useCardTilt<HTMLDivElement>(6);

  return (
    <button 
      type="button"
      className={`group cursor-pointer text-left w-full block rounded-[2rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 ${
        !isFeatured && !noOffset && idx % 2 === 1 ? 'md:mt-12' : ''
      } ${className}`}
      onClick={onClick}
    >
      {/* Project Image Frame */}
      <div 
        ref={cardTiltRef}
        className={`relative overflow-hidden rounded-[2rem] mb-4 md:mb-8 bg-surface-container shadow-sm transition-all duration-700 ease-out ${
          isFeatured ? 'aspect-[3/2] md:aspect-[2/1]' : 'aspect-[3/2]'
        }`}
      >
        <img 
          alt={project.title} 
          className="w-full h-full object-cover scale-102 group-hover:scale-105 transition-transform duration-[1200ms] grayscale group-hover:grayscale-0" 
          src={project.imageUrl}
          loading="lazy"
        />
        <div className="card-glow-overlay" />
        <div className="card-shine-overlay" />
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-700 pointer-events-none" />
      </div>

      {/* Project Details */}
      <div className="flex items-start justify-between border-t border-fine pt-4 md:pt-6 group-hover:border-primary/30 transition-colors duration-500">
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
  );
};
