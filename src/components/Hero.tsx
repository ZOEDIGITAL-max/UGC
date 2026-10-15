import React from 'react';
import { ArrowDown, Play, Volume2 } from 'lucide-react';

interface HeroProps {
  onOpenReel: () => void;
  onExploreWork: () => void;
  onContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReel, onExploreWork, onContact }) => {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-28 px-6 md:px-16 max-w-7xl mx-auto" id="hero">
      {/* Editorial Headline Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-end">
        {/* Left Column: Headline & Primary Narrative */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 rounded-full bg-[#745a36]"></span>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#745a36]">
              AI UGC · Product Films · Creative Storytelling
            </p>
          </div>

          <h1 className="font-headline text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] text-[#000000] tracking-tight leading-[1.08] text-balance">
            Stories That Sell. <br className="hidden sm:inline" />
            <span className="italic font-normal">Visuals That Stay.</span>
          </h1>

          <p className="text-[#444748] text-base md:text-lg max-w-2xl font-normal leading-relaxed pt-1">
            We create compelling AI-powered UGC videos, product commercials, and visual stories that help brands capture attention and connect with their audiences.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={onExploreWork}
              type="button"
              className="bg-[#000000] text-white text-[11px] font-semibold uppercase tracking-[0.16em] px-8 py-4 hover:bg-[#745a36] transition-colors duration-250 inline-flex items-center space-x-2"
            >
              <span>Explore Our Work</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onContact}
              type="button"
              className="border border-[#000000] text-[#000000] text-[11px] font-semibold uppercase tracking-[0.16em] px-8 py-4 hover:bg-[#000000] hover:text-white transition-colors duration-250"
            >
              Let's Create Together
            </button>
          </div>
        </div>

        {/* Right Column: Studio Metadata */}
        <div className="lg:col-span-4 flex flex-col justify-end lg:border-l lg:border-[#c4c7c7]/40 lg:pl-8 space-y-4">
          <span className="text-[11px] font-mono tracking-widest text-[#745a36] uppercase">
            Studio Edition 2025 // 01
          </span>
          <p className="text-xs md:text-sm text-[#444748] leading-relaxed">
            Pioneering the synthesis of haute-couture film discipline and generative synthetic cinematography. Based in London &amp; Lagos, collaborating worldwide.
          </p>
          <div className="flex items-center space-x-6 pt-2 text-[11px] font-mono text-[#444748]">
            <div>
              <span className="text-[#000000] font-semibold">LOC:</span> LAG / LON
            </div>
            <div>
              <span className="text-[#000000] font-semibold">FORMAT:</span> 4K / 9:16 / 16:9
            </div>
          </div>
        </div>
      </div>

      {/* Featured Showreel Preview Container */}
      <div className="mt-12 md:mt-20 border border-[#c4c7c7]/40 bg-[#f6f3ed] p-2 md:p-3 relative group">
        <div className="relative w-full aspect-video overflow-hidden bg-[#1c1b1b]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNX2C6vCdHCTCBlO-olCutDQ1Ut4SYd0Ymw2vS3vjLkc5UxG6MoYh5Gr072r1S0CCQwzlqE1tme9AbJbHlT0mz9qCUY-vg6AMTbSP4kef0aukby76pF6unkIkDyCYuwrZxUTDqZ5rzFyBKa05YG-8xxV7-KmT-uzMyEZXf7yI0o66-SqwE6B1TJ_gTsQn4bk1mIVFsJkE0_7FjGiNA-9qjIHvVChCAEz-1EhOcOQofS4CAXOUkDWDeqw"
            alt="Studio Showreel Still"
            className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-out filter brightness-95"
          />

          {/* Cinematic Grain & Scrim */}
          <div className="absolute inset-0 bg-[#000000]/25 pointer-events-none film-grain"></div>

          {/* Frame HUD Overlays */}
          <div className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center space-x-3 bg-[#000000]/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-white">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
            <span className="text-[10px] md:text-xs font-mono tracking-widest uppercase">
              SHOWREEL 2025 · 4K MASTER
            </span>
          </div>

          <div className="absolute top-4 right-4 md:top-6 md:right-6 flex items-center space-x-2 bg-[#000000]/80 backdrop-blur-md px-3 py-1.5 border border-white/10 text-white">
            <Volume2 className="w-3.5 h-3.5 text-[#ffddb5]" />
            <span className="text-[10px] md:text-xs font-mono tracking-wider">AUDIO SIMULATION</span>
          </div>

          {/* Center Interactive Badge */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={onOpenReel}
              aria-label="Play 4K Studio Showreel"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/40 bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 hover:bg-[#745a36] hover:border-[#745a36] transition-all duration-300 shadow-xl group-hover:bg-[#745a36]"
            >
              <Play className="w-8 h-8 md:w-10 md:h-10 ml-1 fill-white" />
            </button>
          </div>

          {/* Bottom Transport Bar Preview */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#000000]/90 to-transparent p-4 md:p-6 flex items-center justify-between text-white text-[11px] font-mono">
            <div className="flex items-center space-x-4">
              <span>[00:01:24:18]</span>
              <span className="hidden sm:inline text-white/60">COLOR: REC.709 DCI-P3</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-[#ffddb5]">GEN-AI VIDEO SPEC</span>
              <span className="px-1.5 py-0.5 border border-white/30 text-[9px] tracking-wider">4K UHD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
