import React from 'react';
import { ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { SERVICES_LIST } from '../data/studioData';

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section className="py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto" id="services">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#c4c7c7]/40">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#745a36]">
            Capabilities &amp; Studio Offerings
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-[#000000] tracking-tight mt-2 text-balance">
            Creative Services for Brands With a Vision
          </h2>
        </div>
        <p className="text-sm md:text-base text-[#444748] max-w-md mt-4 md:mt-0 leading-relaxed">
          From the first idea to the final frame, we create distinctive video content that brings brand stories to life.
        </p>
      </div>

      {/* 8 Elegant Service Cards: 4x2 Grid on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SERVICES_LIST.map((service) => (
          <div
            key={service.id}
            className="border border-[#c4c7c7]/40 p-8 bg-[#f6f3ed] flex flex-col justify-between hover:border-[#745a36] hover:bg-[#fcf9f3] transition-all duration-300 group shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-[#745a36] tracking-widest uppercase">
                  SERVICE // {service.number}
                </span>
                <span className="text-[10px] font-mono text-[#444748] flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-[#745a36]" />
                  <span>{service.turnaround}</span>
                </span>
              </div>

              <h3 className="font-headline text-xl text-[#000000] mb-3 group-hover:text-[#745a36] transition-colors">
                {service.title}
              </h3>

              <p className="text-xs md:text-sm text-[#444748] leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="pt-3 border-t border-[#c4c7c7]/20 flex items-start space-x-1.5 text-[11px] text-[#745a36]">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span className="text-[#444748] font-mono text-[10px] leading-tight">
                  {service.deliverable}
                </span>
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-[#c4c7c7]/30">
              <button
                type="button"
                onClick={() => onSelectService(service.title)}
                className="text-[11px] font-semibold uppercase tracking-wider text-[#000000] group-hover:text-[#745a36] inline-flex items-center space-x-1 transition-colors"
              >
                <span>Inquire About This Service</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
