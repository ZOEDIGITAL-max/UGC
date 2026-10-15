import React, { useState } from 'react';
import { Calculator, ArrowRight, Check, Zap, Layers } from 'lucide-react';

interface ProductionEstimatorProps {
  onApplyToInquiry: (config: {
    serviceName: string;
    format: string;
    budget: string;
    summary: string;
  }) => void;
}

export const ProductionEstimator: React.FC<ProductionEstimatorProps> = ({ onApplyToInquiry }) => {
  const [tier, setTier] = useState<'ugc' | 'commercial' | 'story' | 'spokesperson'>('commercial');
  const [videoCount, setVideoCount] = useState<number>(3);
  const [format, setFormat] = useState<'9:16' | '16:9' | 'multi'>('multi');
  const [isPriority, setIsPriority] = useState<boolean>(false);
  const [includeSpatialAudio, setIncludeSpatialAudio] = useState<boolean>(true);

  // Pricing & calculation logic
  const tierRates = {
    ugc: { base: 350, label: 'AI UGC Video Ads', days: 3 },
    commercial: { base: 650, label: 'AI Product Commercial', days: 4 },
    story: { base: 950, label: 'AI Brand Story Film', days: 6 },
    spokesperson: { base: 500, label: 'AI Spokesperson / Presenter', days: 4 },
  };

  const currentTier = tierRates[tier];
  const formatMultiplier = format === 'multi' ? 1.35 : 1.0;
  const audioAddon = includeSpatialAudio ? 150 : 0;
  const priorityMultiplier = isPriority ? 1.25 : 1.0;

  const rawEstimate = Math.round(
    (currentTier.base * videoCount * formatMultiplier + audioAddon) * priorityMultiplier
  );
  const lowBound = Math.round(rawEstimate * 0.9);
  const highBound = Math.round(rawEstimate * 1.15);

  const turnaroundDays = isPriority
    ? Math.max(2, Math.floor(currentTier.days * 0.6))
    : currentTier.days;

  const handleApply = () => {
    const budgetString = `$${lowBound.toLocaleString()} – $${highBound.toLocaleString()}`;
    const formatLabel =
      format === '9:16'
        ? 'Vertical (9:16)'
        : format === '16:9'
        ? 'Widescreen (16:9)'
        : 'Multi-Cut Bundle (9:16 + 16:9)';

    const summary = `${videoCount}x ${currentTier.label} in ${formatLabel} with ${
      includeSpatialAudio ? 'Spatial Foley & Voice AI' : 'Standard Audio'
    }${isPriority ? ' [Priority Sprint]' : ''}. Estimated: ${budgetString}.`;

    onApplyToInquiry({
      serviceName: currentTier.label,
      format: format === 'multi' ? 'multi' : format,
      budget: budgetString,
      summary,
    });
  };

  return (
    <section className="py-16 md:py-24 bg-[#fcf9f3] border-t border-[#c4c7c7]/40" id="estimator">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        <div className="border border-[#c4c7c7]/60 bg-[#f6f3ed] p-8 md:p-12 shadow-sm">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-[#c4c7c7]/40 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#745a36] mb-1">
                <Calculator className="w-3.5 h-3.5" />
                <span>Interactive Production Slate &amp; Quote Estimator</span>
              </div>
              <h3 className="font-headline text-2xl sm:text-3xl md:text-4xl text-[#000000] tracking-tight">
                Configure Your Production Slate
              </h3>
            </div>
            <p className="text-xs md:text-sm text-[#444748] max-w-md">
              Select your required deliverable specifications to calculate immediate turnaround timelines and transparent production bracket estimates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Controls Column */}
            <div className="lg:col-span-7 space-y-8">
              {/* Deliverable Type Selector */}
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#745a36] block mb-3">
                  1. Production Discipline
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'ugc', title: 'AI UGC Video Ads', note: 'Direct Response / Social' },
                    { id: 'commercial', title: 'AI Product Commercial', note: '4K Macro & Crystalline' },
                    { id: 'story', title: 'AI Brand Story Film', note: 'Cinematic Manifesto' },
                    { id: 'spokesperson', title: 'AI Spokesperson / Avatar', note: 'Multilingual Keynotes' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTier(item.id as typeof tier)}
                      className={`p-3.5 text-left border transition-all duration-200 cursor-pointer ${
                        tier === item.id
                          ? 'bg-[#000000] text-white border-[#000000] shadow-xs'
                          : 'bg-[#fcf9f3] text-[#1c1c18] border-[#c4c7c7]/60 hover:border-[#745a36]'
                      }`}
                    >
                      <div className="text-xs font-semibold">{item.title}</div>
                      <div className={`text-[10px] mt-0.5 ${tier === item.id ? 'text-[#ffddb5]' : 'text-[#444748]'}`}>
                        {item.note}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Video Count Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#745a36]">
                    2. Deliverable Cut Quantity
                  </label>
                  <span className="text-xs font-mono font-semibold bg-[#000000] text-white px-2 py-0.5">
                    {videoCount} {videoCount === 1 ? 'Cut' : 'Modular Cuts'}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={videoCount}
                  onChange={(e) => setVideoCount(parseInt(e.target.value, 10))}
                  className="w-full accent-[#745a36] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[#444748] mt-1">
                  <span>1 Single Cut</span>
                  <span>3 Standard Slate</span>
                  <span>6 Campaign Bundle</span>
                  <span>10 Multi-Market Slate</span>
                </div>
              </div>

              {/* Format Preference */}
              <div>
                <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#745a36] block mb-3">
                  3. Aspect Ratio Deliverable
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: '9:16', title: 'Vertical (9:16)', desc: 'TikTok & Reels' },
                    { id: '16:9', title: 'Widescreen (16:9)', desc: 'Web & Broadcast' },
                    { id: 'multi', title: 'Multi-Cut (Both)', desc: '9:16 + 16:9 Bundle' },
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => setFormat(fmt.id as typeof format)}
                      className={`p-3 text-left border transition-all duration-200 cursor-pointer ${
                        format === fmt.id
                          ? 'bg-[#000000] text-white border-[#000000]'
                          : 'bg-[#fcf9f3] text-[#1c1c18] border-[#c4c7c7]/60 hover:border-[#745a36]'
                      }`}
                    >
                      <div className="text-[11px] font-semibold">{fmt.title}</div>
                      <div className={`text-[9px] mt-0.5 ${format === fmt.id ? 'text-[#ffddb5]' : 'text-[#444748]'}`}>
                        {fmt.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Turnaround & Audio Addons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <label className="flex items-center space-x-3 p-3 bg-[#fcf9f3] border border-[#c4c7c7]/50 cursor-pointer hover:border-[#745a36]">
                  <input
                    type="checkbox"
                    checked={isPriority}
                    onChange={(e) => setIsPriority(e.target.checked)}
                    className="accent-[#745a36] w-4 h-4"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#1c1c18] flex items-center space-x-1">
                      <Zap className="w-3 h-3 text-[#745a36]" />
                      <span>Priority 48-Hour Sprint</span>
                    </span>
                    <span className="text-[10px] text-[#444748] block">Accelerated overnight rendering</span>
                  </div>
                </label>

                <label className="flex items-center space-x-3 p-3 bg-[#fcf9f3] border border-[#c4c7c7]/50 cursor-pointer hover:border-[#745a36]">
                  <input
                    type="checkbox"
                    checked={includeSpatialAudio}
                    onChange={(e) => setIncludeSpatialAudio(e.target.checked)}
                    className="accent-[#745a36] w-4 h-4"
                  />
                  <div>
                    <span className="text-xs font-semibold text-[#1c1c18] flex items-center space-x-1">
                      <Layers className="w-3 h-3 text-[#745a36]" />
                      <span>Bespoke Foley &amp; Voice AI</span>
                    </span>
                    <span className="text-[10px] text-[#444748] block">Multi-stem spatial sound design</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Right Summary Slate Box */}
            <div className="lg:col-span-5 bg-[#fcf9f3] border border-[#c4c7c7]/80 p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#745a36] uppercase block mb-1">
                  PRODUCTION SPECIFICATION SHEET
                </span>
                <h4 className="font-headline text-2xl text-[#000000]">Estimated Studio Quote</h4>

                {/* Price Display */}
                <div className="mt-4 pt-4 border-t border-[#c4c7c7]/40">
                  <div className="text-3xl md:text-4xl font-headline text-[#000000]">
                    ${lowBound.toLocaleString()} – ${highBound.toLocaleString()}
                  </div>
                  <div className="text-[11px] font-mono text-[#745a36] mt-1">
                    ESTIMATED TURNAROUND: {turnaroundDays} BUSINESS DAYS
                  </div>
                </div>

                {/* Manifest Checklist */}
                <div className="mt-6 space-y-2.5 pt-4 border-t border-[#c4c7c7]/30 text-xs text-[#1c1c18]">
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#745a36] shrink-0" />
                    <span>{videoCount}x Master Deliverable Files (4K UHD Master)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#745a36] shrink-0" />
                    <span>Format: {format === 'multi' ? 'Both 9:16 + 16:9 Cuts' : format}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#745a36] shrink-0" />
                    <span>Color Timing: DaVinci Resolve Rec.709 / DCI-P3</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#745a36] shrink-0" />
                    <span>Full Commercial Rights &amp; Perpetual Usage License</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-[#745a36] shrink-0" />
                    <span>Up to 2 Rounds of Micro-Prompt Iteration</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#c4c7c7]/40">
                <button
                  type="button"
                  onClick={handleApply}
                  className="w-full bg-[#000000] text-white text-[11px] font-semibold uppercase tracking-[0.16em] py-4 hover:bg-[#745a36] transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Apply Estimate to Project Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <p className="text-[10px] text-center text-[#444748] mt-2">
                  Transfers these parameters directly into the inquiry form below.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
