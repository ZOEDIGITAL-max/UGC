import React, { useEffect } from 'react';
import { X, ArrowRight, Film, Sliders, Layers, Sparkles } from 'lucide-react';
import { CaseStudyData } from '../types';

interface CaseStudyModalProps {
  caseStudy: CaseStudyData | null;
  onClose: () => void;
  onCommission: (serviceId?: string) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ caseStudy, onClose, onCommission }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (caseStudy) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [caseStudy, onClose]);

  if (!caseStudy) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-[#000000]/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#fcf9f3] max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#c4c7c7] p-6 md:p-10 relative custom-scrollbar shadow-2xl text-[#1c1c18]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          aria-label="Close Case Study"
          className="absolute top-6 right-6 text-[#1c1c18] hover:text-[#745a36] p-1 transition-colors"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-[#c4c7c7]/40 pb-6 pr-10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#745a36]">
            {caseStudy.category}
          </span>
          <h2 className="font-headline text-2xl sm:text-3xl md:text-4xl text-[#000000] tracking-tight mt-2">
            {caseStudy.title}
          </h2>
        </div>

        {/* Featured Image Still */}
        <div className="mt-6 relative w-full aspect-video overflow-hidden bg-[#1c1b1b] border border-[#c4c7c7]/40 shadow-xs">
          <img
            src={caseStudy.imageUrl}
            alt={caseStudy.title}
            className="w-full h-full object-cover filter brightness-95"
          />
          <div className="absolute bottom-4 left-4 bg-[#000000]/80 backdrop-blur-sm px-3 py-1 text-white text-[10px] font-mono uppercase tracking-widest flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffddb5]"></span>
            <span>MASTER STILL ARCHIVE</span>
          </div>
          <div className="absolute top-4 right-4 bg-[#000000]/80 backdrop-blur-sm px-2.5 py-1 text-[#ffddb5] text-[10px] font-mono uppercase">
            {caseStudy.specs.duration}
          </div>
        </div>

        {/* Specs Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 my-6 bg-[#f6f3ed] border border-[#c4c7c7]/40 px-4 text-xs font-mono">
          <div>
            <span className="text-[#745a36] uppercase block text-[10px]">FORMAT</span>
            <span className="text-[#1c1c18] font-semibold">{caseStudy.specs.format}</span>
          </div>
          <div>
            <span className="text-[#745a36] uppercase block text-[10px]">COLOR SPACE</span>
            <span className="text-[#1c1c18] font-semibold">{caseStudy.specs.colorSpace}</span>
          </div>
          <div>
            <span className="text-[#745a36] uppercase block text-[10px]">DURATION</span>
            <span className="text-[#1c1c18] font-semibold">{caseStudy.specs.duration}</span>
          </div>
          <div>
            <span className="text-[#745a36] uppercase block text-[10px]">CORE ENGINES</span>
            <span className="text-[#1c1c18] font-semibold">{caseStudy.specs.engine}</span>
          </div>
        </div>

        {/* Overview & Objective */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#1c1c18] pt-2">
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#745a36] mb-2 flex items-center space-x-2">
              <Film className="w-3.5 h-3.5" />
              <span>Project Overview</span>
            </h4>
            <p className="text-sm text-[#444748] leading-relaxed">
              {caseStudy.overview}
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#745a36] mb-2 flex items-center space-x-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>The Objective</span>
            </h4>
            <p className="text-sm text-[#444748] leading-relaxed">
              {caseStudy.objective}
            </p>
          </div>
        </div>

        {/* Creative Direction & Process */}
        <div className="space-y-4 pt-6 mt-6 border-t border-[#c4c7c7]/40">
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#745a36] flex items-center space-x-2">
            <Layers className="w-3.5 h-3.5" />
            <span>Creative Direction &amp; Synthesis Process</span>
          </h4>
          <p className="text-sm text-[#444748] leading-relaxed">
            {caseStudy.process}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between pt-8 mt-8 border-t border-[#c4c7c7]/40 gap-4">
          <div>
            <span className="text-[10px] font-mono text-[#745a36] uppercase tracking-wider block">
              Engine Architecture:
            </span>
            <span className="text-xs text-[#1c1c18] font-medium">{caseStudy.tools}</span>
          </div>
          <button
            onClick={() => onCommission(caseStudy.category)}
            className="bg-[#000000] text-white text-[11px] font-semibold uppercase tracking-[0.16em] px-6 py-3.5 hover:bg-[#745a36] transition-colors inline-flex items-center space-x-2"
          >
            <span>Commission Similar Work</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
