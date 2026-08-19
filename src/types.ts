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
    // The actual lesson: real instructional writing that teaches the concept - not a
    // restatement of `overview`. Paragraphs separated by blank lines. Optional only
    // because most existing lessons predate this field and still need a real content
    // pass; every newly authored lesson must have it.
    lessonBody?: string;
    keyLearnings: string[];
    samplePrompt?: string;
    codeSnippet?: string;
    testCase?: {
      input: string;
      expectedOutput: string;
    };
    // The lesson's one active-recall moment (the "testing effect" - Roediger & Karpicke
    // 2006). For conceptual lessons with no code, a low-stakes multiple-choice check;
    // 'scenario' mode has no right answer, just per-option feedback, for questions about
    // judgment rather than fact.
    interactiveCheck?: {
      type: 'quiz' | 'scenario';
      question: string;
      options: {
        text: string;
        feedback: string;
        correct?: boolean; // only meaningful when type is 'quiz'
      }[];
    };
    // The technical-lesson version of the same active-recall beat: a worked example the
    // learner reads, then a near-identical problem with the critical piece removed for
    // them to attempt before the answer is revealed (the "worked example effect" -
    // Sweller 1988). Ungraded and low-stakes by design - no pass/fail, just attempt then
    // compare, so it never manufactures fake failure.
    fadedPractice?: {
      setup: string;
      workedExample: string;
      challenge: string;
      placeholder: string;
      solution: string;
      explanation: string;
    };
    // Visual breaks interleaved between lessonBody paragraphs, so a lesson isn't one long
    // scroll of text (Mayer's multimedia learning principles: a visual only earns its
    // place if it signals/reinforces the adjacent text, never decorative). afterParagraph
    // is the 0-based index of the lessonBody paragraph (split on blank lines) it follows.
    visualBreaks?: {
      afterParagraph: number;
      caption: string;
      chat?: { sender: 'customer' | 'agent'; text: string }[];
      flow?: string[];
    }[];
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

