import React, { useState, useMemo } from 'react';
import { Play, ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_PROJECTS, CASE_STUDIES } from '../data/studioData';
import { CategoryType, CaseStudyData } from '../types';

interface PortfolioProps {
  onOpenCaseStudy: (caseStudy: CaseStudyData) => void;
}

const CATEGORIES: { id: CategoryType; label: string }[] = [
  { id: 'all', label: 'All Projects' },
  { id: 'product-commercials', label: 'Product Commercials' },
  { id: 'skincare-beauty', label: 'Skincare & Beauty' },
  { id: 'lifestyle-ugc', label: 'Lifestyle UGC' },
  { id: 'brand-storytelling', label: 'Brand Storytelling' },
  { id: 'real-estate', label: 'Real Estate & Property' },
  { id: 'fashion-clothing', label: 'Fashion & Clothing' },
  { id: 'ai-spokesperson', label: 'AI Spokesperson' },
];

export const Portfolio: React.FC<PortfolioProps> = ({ onOpenCaseStudy }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return PORTFOLIO_PROJECTS;
    return PORTFOLIO_PROJECTS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleCardClick = (caseStudyId: string) => {
    const study = CASE_STUDIES[caseStudyId] || CASE_STUDIES.skincare;
    onOpenCaseStudy(study);
  };

  return (
    <section className="py-20 md:py-32 bg-[#f6f3ed] border-t border-[#c4c7c7]/40" id="work">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#c4c7c7]/40">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#745a36]">
              Portfolio &amp; Production Slate
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-[#000000] tracking-tight mt-2">
              Selected Work
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#444748] max-w-md mt-4 md:mt-0 leading-relaxed">
            A collection of visual experiments, brand concepts, and video productions created to bring products and stories to life.
          </p>
        </div>

        {/* Filterable Category Tabs (Buttons) */}
        <div className="flex flex-wrap gap-2 md:gap-3 mb-12 items-center" role="tablist">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                  isActive
                    ? 'bg-[#000000] text-white border-[#000000] shadow-xs'
                    : 'bg-[#fcf9f3] text-[#1c1c18] border-[#c4c7c7]/60 hover:border-[#000000]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`portfolio-item ${project.colSpan} flex flex-col`}
            >
              <div className="border border-[#c4c7c7]/40 bg-[#fcf9f3] flex flex-col h-full group hover:shadow-[0_12px_32px_-4px_rgba(116,90,54,0.14)] hover:border-[#745a36]/40 transition-all duration-300">
                {/* Media Container with explicit aspect ratio */}
                <div
                  className={`relative overflow-hidden bg-[#1c1b1b] cursor-pointer ${
                    project.aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-video'
                  }`}
                  onClick={() => handleCardClick(project.caseStudyId)}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Dark subtle overlay on hover */}
                  <div className="absolute inset-0 bg-[#000000]/20 group-hover:bg-[#000000]/40 transition-colors duration-300"></div>

                  {/* Format pill badge */}
                  <div className="absolute top-4 left-4 bg-[#000000]/80 backdrop-blur-xs px-2.5 py-1 text-white text-[10px] font-mono uppercase tracking-wider">
                    {project.badge}
                  </div>

                  {/* Center Play Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/90 text-[#000000] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <Play className="w-6 h-6 md:w-7 md:h-7 ml-1 fill-current" />
                    </span>
                  </div>
                </div>

                {/* Content details */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#745a36]">
                      {project.categoryLabel}
                    </span>
                    <h3 className="font-headline text-xl md:text-2xl text-[#000000] mt-1.5 mb-2 leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#444748] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-[#c4c7c7]/30 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#444748]">
                      {project.duration} · {project.resolution}
                    </span>
                    <button
                      onClick={() => handleCardClick(project.caseStudyId)}
                      className="text-[11px] font-semibold uppercase tracking-wider text-[#000000] hover:text-[#745a36] underline underline-offset-4 decoration-1 inline-flex items-center space-x-1"
                    >
                      <span>View Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
