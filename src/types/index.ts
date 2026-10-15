export type CategoryType =
  | 'all'
  | 'product-commercials'
  | 'skincare-beauty'
  | 'lifestyle-ugc'
  | 'brand-storytelling'
  | 'real-estate'
  | 'fashion-clothing'
  | 'ai-spokesperson';

export interface PortfolioProject {
  id: string;
  title: string;
  category: CategoryType;
  categoryLabel: string;
  aspectRatio: '9:16' | '16:9';
  colSpan: string;
  badge: string;
  duration: string;
  resolution: string;
  description: string;
  imageUrl: string;
  caseStudyId: string;
}

export interface CaseStudyData {
  id: string;
  title: string;
  category: string;
  overview: string;
  objective: string;
  creativeDirection: string;
  process: string;
  tools: string;
  imageUrl: string;
  specs: {
    format: string;
    duration: string;
    colorSpace: string;
    engine: string;
  };
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverable: string;
  turnaround: string;
}

export interface ArchiveRecord {
  id: string;
  title: string;
  category: string;
  role: string;
  year: string;
  deliverables: string;
  status: 'Commercial' | 'Concept Exploration';
  caseStudyId?: string;
}

export interface InquiryFormData {
  fullName: string;
  workEmail: string;
  brandName: string;
  websiteLink: string;
  selectedServices: string[];
  formats: string[];
  projectScope: string;
  budgetRange: string;
  deadlineDate: string;
  referenceLinks: string;
}
