import React from 'react';

export const AboutStudio: React.FC = () => {
  const principles = [
    {
      num: '01',
      title: 'Strategy before production',
      desc: 'Every prompt serves a commercial intent',
    },
    {
      num: '02',
      title: 'Storytelling before effects',
      desc: 'Visual spectacle without narrative falls flat',
    },
    {
      num: '03',
      title: 'Visual quality in every frame',
      desc: 'Editorial rigor down to single-pixel details',
    },
    {
      num: '04',
      title: 'Technology guided by human creativity',
      desc: 'Art direction dictates the algorithm',
    },
    {
      num: '05',
      title: 'Every deliverable tailored to its intended purpose',
      desc: 'Context-native specs for maximum ROI',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-[#f6f3ed] border-y border-[#c4c7c7]/40" id="about">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Portrait / Atelier Frame */}
          <div className="lg:col-span-5">
            <div className="border border-[#c4c7c7]/60 p-3 bg-[#fcf9f3] shadow-sm">
              <div className="aspect-[3/4] relative overflow-hidden bg-[#1c1b1b]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAa4DARE-jWVzIMlGhN2FYDJCZ0iULpYchMmdE413AEQYY_LRvIX-ADZXejS0w9Bu8i-QMwmWD_ZNNB2VoIiUByRKD47507TDfpFbdBN8uDsXoz_xD9cAt-sasmpSXhXstwUfodX4-olpXvsDWwfrR9olgluTdIZ3PDHiT5NYL1xney0-qRhvdvZdsaR6j9sIzeQl1QTGdgoD30KjIKYWW-YKDDCoqZdsXpTx-gsBrZWocumsqeyM7BvH_67cm8Jl8o1kDxqZLReB4ueAI"
                  alt="Fowotade Oyindamola Zoe Founder"
                  className="w-full h-full object-cover filter grayscale contrast-105"
                />
                <div className="absolute bottom-4 left-4 bg-[#000000]/80 backdrop-blur-sm text-white px-3 py-1 text-[10px] font-mono uppercase tracking-widest">
                  FOWOTADE OYINDAMOLA zoe · FOUNDER
                </div>
              </div>
              <div className="pt-4 flex justify-between items-center text-[11px] font-mono text-[#444748]">
                <span>DIRECTOR // AI SYNTHESIS</span>
                <span>EST. 2024</span>
              </div>
            </div>
          </div>

          {/* Narrative Editorial Content */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#745a36]">
                Philosophy &amp; Method
              </span>
              <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-[#000000] tracking-tight mt-2 text-balance">
                Creative Thinking. Intelligent Production. Meaningful Stories.
              </h2>
            </div>

            <div className="text-sm md:text-base text-[#444748] space-y-4 leading-relaxed">
              <p>
                We view artificial intelligence not as an automated shortcut, but as a virtuoso lens. In our studio, algorithms are directed with the same rigorous intentionality that traditional filmmakers bring to 35mm cameras, anamorphic lenses, and physical lighting design.
              </p>
              <p>
                By anchoring cutting-edge neural synthesis in timeless storytelling principles, we create video assets that transcend algorithmic genericism—delivering the sensory richness, emotional resonance, and conversion velocity modern luxury brands demand.
              </p>
            </div>

            {/* 5 Core Principles Editorial List */}
            <div className="pt-4 border-t border-[#c4c7c7]/40">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#000000] mb-6">
                Our 5 Core Principles
              </h4>
              <div className="space-y-4">
                {principles.map((principle) => (
                  <div
                    key={principle.num}
                    className="flex items-start justify-between py-3 border-b border-[#c4c7c7]/20 group hover:border-[#745a36]/50 transition-colors"
                  >
                    <span className="text-xs font-mono text-[#745a36] font-semibold">
                      {principle.num}
                    </span>
                    <span className="font-headline text-base md:text-lg text-[#000000] flex-1 ml-6 group-hover:text-[#745a36] transition-colors">
                      {principle.title}
                    </span>
                    <span className="text-xs font-mono text-[#444748] hidden sm:inline">
                      {principle.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
