import React, { useState, useEffect } from 'react';
import { Mail, MessageCircle, Clock, CheckCircle2, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';
import { InquiryFormData } from '../types';

interface ContactInquiryProps {
  initialService?: string;
  initialEstimate?: {
    serviceName: string;
    format: string;
    budget: string;
    summary: string;
  } | null;
}

const AVAILABLE_SERVICES = [
  'AI UGC Video Ads',
  'Product Commercial',
  'Brand Story Film',
  'AI Spokesperson',
  'Monthly Package',
  'Post-Production Only',
];

export const ContactInquiry: React.FC<ContactInquiryProps> = ({
  initialService,
  initialEstimate,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    workEmail: '',
    brandName: '',
    websiteLink: '',
    selectedServices: ['Product Commercial'],
    formats: ['9:16', '16:9'],
    projectScope: '',
    budgetRange: '$2,500 – $5,000',
    deadlineDate: '',
    referenceLinks: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<InquiryFormData | null>(null);

  // Sync initialService when user clicks "Inquire About This Service"
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({
        ...prev,
        selectedServices: Array.from(new Set([...prev.selectedServices, initialService])),
      }));
    }
  }, [initialService]);

  // Sync initialEstimate when user calculates via ProductionEstimator
  useEffect(() => {
    if (initialEstimate) {
      setFormData((prev) => ({
        ...prev,
        selectedServices: [initialEstimate.serviceName],
        formats: initialEstimate.format === 'multi' ? ['9:16', '16:9', 'multi'] : [initialEstimate.format],
        budgetRange: initialEstimate.budget,
        projectScope: prev.projectScope
          ? `${prev.projectScope}\n\n[Configured Slate]: ${initialEstimate.summary}`
          : `[Configured Slate]: ${initialEstimate.summary}`,
      }));
    }
  }, [initialEstimate]);

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(service);
      const updated = exists
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service];
      return { ...prev, selectedServices: updated };
    });
  };

  const toggleFormat = (fmt: string) => {
    setFormData((prev) => {
      const exists = prev.formats.includes(fmt);
      const updated = exists
        ? prev.formats.filter((f) => f !== fmt)
        : [...prev.formats, fmt];
      return { ...prev, formats: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionReceipt({ ...formData });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmissionReceipt(null);
    setFormData({
      fullName: '',
      workEmail: '',
      brandName: '',
      websiteLink: '',
      selectedServices: ['AI UGC Video Ads'],
      formats: ['9:16'],
      projectScope: '',
      budgetRange: '$2,500 – $5,000',
      deadlineDate: '',
      referenceLinks: '',
    });
  };

  return (
    <section className="py-20 md:py-32 px-6 md:px-16 max-w-7xl mx-auto" id="contact">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Context & Direct Channels */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#745a36]">
              Project Commissioning
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-[#000000] tracking-tight mt-2 text-balance">
              Let's Make Something Remarkable.
            </h2>
            <p className="text-sm md:text-base text-[#444748] mt-6 leading-relaxed">
              Have a product to launch, a story to tell, or a campaign to bring to life? Tell us about your project and let's explore the creative possibilities.
            </p>

            {/* Direct Communication Options */}
            <div className="mt-10 space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="w-5 h-5 text-[#745a36] mt-1 shrink-0" />
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#444748] block">
                    Electronic Mail
                  </span>
                  <a
                    href="mailto:zoedigital8@gmail.com"
                    className="font-headline text-lg text-[#000000] hover:text-[#745a36] transition-colors"
                  >
                    zoedigital8@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MessageCircle className="w-5 h-5 text-[#745a36] mt-1 shrink-0" />
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#444748] block">
                    Direct Studio Concierge
                  </span>
                  <a
                    href="https://wa.me/2348023834221"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-headline text-lg text-[#000000] hover:text-[#745a36] transition-colors inline-flex items-center space-x-2"
                  >
                    <span>Chat via WhatsApp (+2348023834221)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-5 h-5 text-[#745a36] mt-1 shrink-0" />
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#444748] block">
                    Availability &amp; Turnaround
                  </span>
                  <p className="text-xs text-[#000000] mt-0.5">
                    Currently accepting jobs and offers. Typical delivery time 2–7 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 mt-12 border-t border-[#c4c7c7]/40 text-[11px] font-mono text-[#444748]">
            LONDON &amp; LAGOS // WORLDWIDE REMOTE PRODUCTION
          </div>
        </div>

        {/* Right Column: Interactive Inquiry Form */}
        <div className="lg:col-span-7 border border-[#c4c7c7]/40 p-8 md:p-12 bg-[#f6f3ed] shadow-sm">
          {/* Live Confirmation Alert Banner */}
          {isSubmitted && submissionReceipt && (
            <div className="mb-8 p-6 bg-[#000000] text-white border-l-4 border-[#745a36] animate-fadeIn">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#ffddb5]" />
                <h4 className="font-headline text-lg">Inquiry Dispatched Successfully</h4>
              </div>
              <p className="text-xs text-white/80 mt-2 leading-relaxed">
                Thank you for reaching out, <span className="font-semibold text-white">{submissionReceipt.fullName}</span>. We have logged your production specifications for <span className="font-semibold text-[#ffddb5]">{submissionReceipt.brandName || 'your brand'}</span> and our creative directors will respond via {submissionReceipt.workEmail} within 24 hours.
              </p>
              <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#ffddb5]">REF: PROD-2026-{Math.floor(1000 + Math.random() * 9000)}</span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="underline hover:text-[#ffddb5] transition-colors"
                >
                  Submit Another Project
                </button>
              </div>
            </div>
          )}

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-[#745a36]" htmlFor="fullName">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder="Fowotade Oyindamola"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="bg-transparent border-0 border-b border-[#000000] focus:border-b-2 focus:ring-0 px-0 py-2 text-sm text-[#000000] placeholder:text-[#c4c7c7] outline-none"
                />
              </div>

              {/* Work Email */}
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-[#745a36]" htmlFor="workEmail">
                  Work Email *
                </label>
                <input
                  id="workEmail"
                  type="email"
                  required
                  placeholder="fowotade@company.com"
                  value={formData.workEmail}
                  onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                  className="bg-transparent border-0 border-b border-[#000000] focus:border-b-2 focus:ring-0 px-0 py-2 text-sm text-[#000000] placeholder:text-[#c4c7c7] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Brand / Company */}
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-[#745a36]" htmlFor="brandName">
                  Brand / Organization
                </label>
                <input
                  id="brandName"
                  type="text"
                  placeholder="Maison de Luxe"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  className="bg-transparent border-0 border-b border-[#000000] focus:border-b-2 focus:ring-0 px-0 py-2 text-sm text-[#000000] placeholder:text-[#c4c7c7] outline-none"
                />
              </div>

              {/* Website / Social */}
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-[#745a36]" htmlFor="websiteLink">
                  Website or Social Handle
                </label>
                <input
                  id="websiteLink"
                  type="text"
                  placeholder="instagram.com/yourbrand"
                  value={formData.websiteLink}
                  onChange={(e) => setFormData({ ...formData, websiteLink: e.target.value })}
                  className="bg-transparent border-0 border-b border-[#000000] focus:border-b-2 focus:ring-0 px-0 py-2 text-sm text-[#000000] placeholder:text-[#c4c7c7] outline-none"
                />
              </div>
            </div>

            {/* Services Multi-Select Pills */}
            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-[#745a36] block">
                Required Services (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2 pt-1">
                {AVAILABLE_SERVICES.map((service) => {
                  const isSelected = formData.selectedServices.includes(service);
                  return (
                    <button
                      key={service}
                      type="button"
                      onClick={() => toggleService(service)}
                      className={`px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors border cursor-pointer ${
                        isSelected
                          ? 'bg-[#000000] text-white border-[#000000]'
                          : 'bg-[#fcf9f3] text-[#000000] border-[#c4c7c7]/60 hover:border-[#000000]'
                      }`}
                    >
                      {service}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Deliverables Preference Checkboxes */}
            <div className="space-y-2">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-[#745a36] block">
                Preferred Format Deliverables
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: '9:16', label: 'Vertical (9:16)' },
                  { value: '16:9', label: 'Widescreen (16:9)' },
                  { value: 'multi', label: 'Multi-Cut Bundle' },
                ].map((fmt) => (
                  <label
                    key={fmt.value}
                    className="flex items-center space-x-3 p-3 border border-[#c4c7c7]/40 bg-[#fcf9f3] cursor-pointer hover:border-[#000000] transition-colors"
                  >
                    <input
                      type="checkbox"
                      value={fmt.value}
                      checked={formData.formats.includes(fmt.value)}
                      onChange={() => toggleFormat(fmt.value)}
                      className="accent-[#000000] w-4 h-4 cursor-pointer"
                    />
                    <span className="text-xs text-[#000000]">{fmt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Project Description */}
            <div className="flex flex-col space-y-1">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-[#745a36]" htmlFor="projectScope">
                Project Description &amp; Objectives *
              </label>
              <textarea
                id="projectScope"
                rows={4}
                required
                placeholder="Tell us about the narrative hook, product features, and target distribution channels..."
                value={formData.projectScope}
                onChange={(e) => setFormData({ ...formData, projectScope: e.target.value })}
                className="bg-transparent border-0 border-b border-[#000000] focus:border-b-2 focus:ring-0 px-0 py-2 text-sm text-[#000000] placeholder:text-[#c4c7c7] outline-none resize-y"
              ></textarea>
            </div>

            {/* Estimated Budget & Deadline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-[#745a36]" htmlFor="budgetRange">
                  Estimated Budget Range
                </label>
                <select
                  id="budgetRange"
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="bg-transparent border-0 border-b border-[#000000] focus:border-b-2 focus:ring-0 px-0 py-2 text-sm text-[#000000] outline-none"
                >
                  <option value="$1,000 – $2,500">$1,000 – $2,500 (Test Shoot / Single Cut)</option>
                  <option value="$2,500 – $5,000">$2,500 – $5,000 (Standard Commercial / 3 Cuts)</option>
                  <option value="$5,000 – $10,000">$5,000 – $10,000 (Multi-Cut Campaign Slate)</option>
                  <option value="$10,000+">$10,000+ (Monthly Retainer / Global Rollout)</option>
                </select>
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-[#745a36]" htmlFor="deadlineDate">
                  Desired Completion Date
                </label>
                <input
                  id="deadlineDate"
                  type="text"
                  placeholder="e.g. End of April 2025"
                  value={formData.deadlineDate}
                  onChange={(e) => setFormData({ ...formData, deadlineDate: e.target.value })}
                  className="bg-transparent border-0 border-b border-[#000000] focus:border-b-2 focus:ring-0 px-0 py-2 text-sm text-[#000000] placeholder:text-[#c4c7c7] outline-none"
                />
              </div>
            </div>

            {/* Reference Links */}
            <div className="flex flex-col space-y-1">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-[#745a36]" htmlFor="referenceLinks">
                Reference Links / Moodboard (Google Drive, Figma, or URL)
              </label>
              <input
                id="referenceLinks"
                type="url"
                placeholder="https://..."
                value={formData.referenceLinks}
                onChange={(e) => setFormData({ ...formData, referenceLinks: e.target.value })}
                className="bg-transparent border-0 border-b border-[#000000] focus:border-b-2 focus:ring-0 px-0 py-2 text-sm text-[#000000] placeholder:text-[#c4c7c7] outline-none"
              />
            </div>

            {/* Submit & WhatsApp Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#000000] text-white text-[11px] font-semibold uppercase tracking-[0.16em] px-10 py-4 hover:bg-[#745a36] transition-colors flex items-center justify-center space-x-2 shadow-xs"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href="https://wa.me/2348023834221"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto border border-[#000000] text-[#000000] text-[11px] font-semibold uppercase tracking-[0.16em] px-6 py-4 hover:bg-[#000000] hover:text-white transition-colors text-center inline-flex items-center justify-center space-x-2"
              >
                <span>Chat via WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
