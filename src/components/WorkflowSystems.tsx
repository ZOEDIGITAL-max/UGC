import React from 'react';

export const WorkflowSystems: React.FC = () => {
  const toolGroups = [
    {
      num: '01',
      kicker: '01 // VIDEO SYNTHESIS',
      title: 'AI Video Engines',
      items: [
        'Google Flow / Veo',
        'Kling AI High-Fidelity',
        'Runway Gen-3 Alpha',
        'OpenAI Sora (Select)',
      ],
    },
    {
      num: '02',
      kicker: '02 // CONCEPT & ASSETS',
      title: 'Visual Ideation',
      items: [
        'Midjourney v6.1',
        'ChatGPT Custom GPTs',
        'Photoshop Generative Fill',
        'LoRA Subject Training',
      ],
    },
    {
      num: '03',
      kicker: '03 // VOICE & FOLEY',
      title: 'Acoustic Design',
      items: [
        'ElevenLabs Voice AI',
        'Bespoke Voice Cloning',
        'Suno & Udio Stems',
        'Spatial Foley Layering',
      ],
    },
    {
      num: '04',
      kicker: '04 // FINISHING & COLOR',
      title: 'Editorial Finishing',
      items: [
        'DaVinci Resolve Studio',
        'Adobe Premiere Pro',
        'Topaz Video AI Upscaling',
        'CapCut Pro Direct Publishing',
      ],
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Discover',
      desc: 'Brand immersion, target audience analysis, hook definition, and aesthetic benchmarking. We align on visual moodboards before generating a single frame.',
      deliverable: 'DELIVERABLE: CREATIVE BRIEF',
    },
    {
      step: '02',
      title: 'Concept',
      desc: 'Script development, psychological hooks, prompt architecture, and AI storyboard generation. Visual tone keys are established and approved.',
      deliverable: 'DELIVERABLE: KEYFRAME SLATE',
    },
    {
      step: '03',
      title: 'Produce',
      desc: 'Generative camera sweeps, character consistency maintenance, cinematic lighting orchestration, and multi-seed scene synthesis.',
      deliverable: 'DELIVERABLE: ASSEMBLED ROUGH CUT',
    },
    {
      step: '04',
      title: 'Refine & Deliver',
      desc: 'Color timing, acoustic Foley master, AI voice modulation, typography integration, and export in 9:16 vertical and 16:9 widescreen formats.',
      deliverable: 'DELIVERABLE: MASTER BROADCAST FILES',
    },
  ];

  return (
    <section className="py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto" id="workflow">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#c4c7c7]/40">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#745a36]">
            Systems &amp; Execution
          </span>
          <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-[#000000] tracking-tight mt-2 text-balance">
            The Tools Behind the Vision
          </h2>
        </div>
        <p className="text-sm md:text-base text-[#444748] max-w-md mt-4 md:mt-0 leading-relaxed">
          Tools are curated specifically per project brief to achieve uncompromised fidelity, emotional warmth, and cinematic coherence.
        </p>
      </div>

      {/* Grouped Tooling Architecture */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {toolGroups.map((group) => (
          <div
            key={group.num}
            className="p-6 border border-[#c4c7c7]/40 bg-[#fcf9f3] hover:border-[#745a36]/60 transition-colors shadow-2xs"
          >
            <span className="text-[10px] font-mono text-[#745a36] uppercase tracking-wider block mb-3">
              {group.kicker}
            </span>
            <h4 className="font-headline text-xl text-[#000000] mb-4">{group.title}</h4>
            <ul className="text-xs text-[#444748] space-y-2.5">
              {group.items.map((item) => (
                <li key={item} className="flex items-center space-x-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#745a36]"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Production Workflow 4-Step Timeline */}
      <div className="border-t border-[#c4c7c7]/40 pt-16">
        <div className="mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#745a36]">
            End-to-End Process
          </span>
          <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl text-[#000000] mt-1">
            From Concept to Delivery
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {steps.map((item) => (
            <div key={item.step} className="relative flex flex-col space-y-3">
              <div className="font-headline text-5xl md:text-6xl text-[#c4c7c7]/50 font-normal select-none">
                {item.step}
              </div>
              <h4 className="font-headline text-xl text-[#000000]">{item.title}</h4>
              <p className="text-xs md:text-sm text-[#444748] leading-relaxed">
                {item.desc}
              </p>
              <div className="text-[10px] font-mono text-[#745a36] pt-2 font-medium">
                {item.deliverable}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
