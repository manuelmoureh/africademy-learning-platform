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
  whoBuysThis: string;
  impactStat: string;
  // One-time price in KES for the full system (first 5 lessons are free regardless -
  // that's a sales hook, not tied to this number). Tiered by business value, not step count.
  price: number;
  // Placeholder rating/review count shown on cards until real submissions (track_ratings
  // table, submitTrackRating in lib/db.ts) accumulate enough volume to compute a real average.
  rating: number;
  reviewCount: number;
  steps: Step[];
  // Explicit opt-in for the homepage Curriculum Tracks section, so featuring a course there
  // is a data decision on the course itself, not a hardcoded slice in LandingPage.tsx.
  featuredOnHomepage?: boolean;
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
  // One plain-language sentence describing what the system actually does, for a
  // non-technical visitor (a business owner, not a developer).
  summary: string;
  rubric: RubricCriterion[];
  smeReviewer: {
    name: string;
    role: string;
    company: string;
    location: string;
    quote: string;
    avatarInitials: string;
  };
  // A short list of system-specific metrics. Kept generic (label/value pairs) rather than
  // fixed fields like "stock accuracy", since those only make sense for a retail agent -
  // an invoicing or support system has its own relevant numbers.
  metrics: { label: string; value: string }[];
}

