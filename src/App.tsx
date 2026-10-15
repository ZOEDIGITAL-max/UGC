import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Portfolio } from './components/Portfolio';
import { Services } from './components/Services';
import { ProductionEstimator } from './components/ProductionEstimator';
import { AboutStudio } from './components/AboutStudio';
import { WorkflowSystems } from './components/WorkflowSystems';
import { PracticeArchive } from './components/PracticeArchive';
import { ContactInquiry } from './components/ContactInquiry';
import { Footer } from './components/Footer';
import { ShowreelModal } from './components/ShowreelModal';
import { CaseStudyModal } from './components/CaseStudyModal';
import { CaseStudyData } from './types';

export default function App() {
  const [isReelOpen, setIsReelOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudyData | null>(null);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [appliedEstimate, setAppliedEstimate] = useState<{
    serviceName: string;
    format: string;
    budget: string;
    summary: string;
  } | null>(null);

  const scrollToContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName: string) => {
    setPreselectedService(serviceName);
    scrollToContact();
  };

  const handleApplyEstimate = (config: {
    serviceName: string;
    format: string;
    budget: string;
    summary: string;
  }) => {
    setAppliedEstimate(config);
    scrollToContact();
  };

  const handleCommissionFromCaseStudy = (serviceCategory?: string) => {
    setSelectedCaseStudy(null);
    if (serviceCategory) {
      setPreselectedService(serviceCategory);
    }
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-[#fcf9f3] text-[#1c1c18] font-sans relative selection:bg-[#ffddb5] selection:text-[#2a1800]">
      {/* Top Header */}
      <Header onStartProject={scrollToContact} />

      {/* Main Content Area */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenReel={() => setIsReelOpen(true)}
          onExploreWork={() => {
            const workElem = document.getElementById('work');
            if (workElem) workElem.scrollIntoView({ behavior: 'smooth' });
          }}
          onContact={scrollToContact}
        />

        {/* Selected Work Portfolio */}
        <Portfolio onOpenCaseStudy={(study) => setSelectedCaseStudy(study)} />

        {/* Studio Services */}
        <Services onSelectService={handleSelectService} />

        {/* Interactive Production Slate & Quote Estimator */}
        <ProductionEstimator onApplyToInquiry={handleApplyEstimate} />

        {/* About the Studio & 5 Core Principles */}
        <AboutStudio />

        {/* Tools and Production Workflow */}
        <WorkflowSystems />

        {/* Experience & Practice Archive */}
        <PracticeArchive onOpenCaseStudy={(study) => setSelectedCaseStudy(study)} />

        {/* Client Conversion / Project Commissioning */}
        <ContactInquiry
          initialService={preselectedService}
          initialEstimate={appliedEstimate}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* 4K Showreel Master Modal */}
      <ShowreelModal isOpen={isReelOpen} onClose={() => setIsReelOpen(false)} />

      {/* Case Study Detail Modal */}
      <CaseStudyModal
        caseStudy={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onCommission={handleCommissionFromCaseStudy}
      />
    </div>
  );
}
