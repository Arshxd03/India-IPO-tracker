export type IPOStatus = 'Ongoing' | 'Upcoming' | 'Closed';
export type IPOType = 'Mainboard' | 'SME';

export interface IPOData {
  id: string;
  companyName: string;
  type: IPOType;
  status: IPOStatus;
  priceBand: string;
  lotSize: number;
  issueSize: string;
  openDate: string;
  closeDate: string;
  listingDate: string;
  subscription: {
    retail: string;
    nii: string;
    qib: string;
  };
  gmp: string;
  expectedGain: string;
  listingGain?: string; // e.g., "45%" or "-5%"
  listingPrice?: string; // e.g., "₹540"
  registrar?: string;
  leadManager?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Basic' | 'Intermediate' | 'Expert';
}

export interface LearningTopic {
  title: string;
  content: string;
  icon: string;
}

export interface LearningSection {
  id: string;
  title: string;
  description: string;
  topics: LearningTopic[];
}

export interface StaticAcademyData {
  timeline: Array<{ year: string; title: string; description: string }>;
  marketEvolution: Array<{ stage: string; description: string }>;
  learningSections: LearningSection[];
}

export interface GlossaryItem {
  term: string;
  definition: string;
}