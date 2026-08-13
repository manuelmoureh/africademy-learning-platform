export interface Review {
  id: string;
  learnerName: string;
  cohort: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  date: string;
}

export interface Step {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  status: 'completed' | 'current' | 'locked';
  duration: string;
  category: string;
  summary: string;
  isGated?: boolean;
  content: {
    overview: string;
    keyLearnings: string[];
    samplePrompt?: string;
    codeSnippet?: string;
    testCase?: {
      input: string;
      expectedOutput: string;
    };
  };
  reviews?: Review[];
}

export type TrackIconName =
  | 'MessageSquare'
  | 'UserPlus'
  | 'Receipt'
  | 'Headset'
  | 'Calendar'
  | 'Megaphone'
  | 'Package'
  | 'FileCheck'
  | 'AlertCircle'
  | 'UtensilsCrossed';

export interface Track {
  id: string;
  trackNumber: string;
  title: string;
  category: string;
  icon: TrackIconName;
  status: 'active' | 'upcoming' | 'completed';
  progress: number;
  totalSteps: number;
  completedSteps: number;
  description: string;
  badgeTitle: string;
  tags: string[];
  steps: Step[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  meta?: {
    intent?: string;
    inventoryChecked?: string;
    confidence?: number;
    priceCalculated?: string;
    modelUsed?: string;
    isRealGemini?: boolean;
  };
}

export interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  priceKES: number;
  priceUSD: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  location: string;
}

export interface UserAccount {
  name: string;
  email: string;
  role: 'Learner' | 'Pro Member';
  initials: string;
  plan: 'free' | 'pro';
  location: string;
}

export interface RubricCriterion {
  id: string;
  criteria: string;
  score: number;
  maxScore: number;
  description: string;
  status: 'Passed' | 'Pending' | 'Needs Improvement';
}

export interface PortfolioVerification {
  id: string;
  studentName: string;
  trackTitle: string;
  liveUrl: string;
  githubUrl: string;
  issueDate: string;
  status: 'Verified Production Grade' | 'In Evaluation';
  overallScore: number;
  rubric: RubricCriterion[];
  smeReviewer: {
    name: string;
    role: string;
    company: string;
    location: string;
    quote: string;
    avatarInitials: string;
  };
  metrics: {
    latencyAvg: string;
    hallucinationRate: string;
    stockAccuracy: string;
    mpesaWebhookUptime: string;
  };
}

