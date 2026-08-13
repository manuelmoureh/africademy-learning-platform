import { Track, InventoryItem, PortfolioVerification } from '../types';

export const INVENTORY_CATALOG: InventoryItem[] = [
  {
    id: 'inv-1',
    sku: 'MSI-SND-01',
    name: 'Handmade Maasai Beaded Sandals (Size 38-43)',
    category: 'Footwear',
    priceKES: 2800,
    priceUSD: 22,
    stock: 18,
    status: 'In Stock',
    location: 'Nairobi CBD'
  },
  {
    id: 'inv-2',
    sku: 'KKY-WRT-02',
    name: 'Authentic Handwoven Mombasa Kikoy Wrap',
    category: 'Apparel',
    priceKES: 1400,
    priceUSD: 11,
    stock: 12,
    status: 'In Stock',
    location: 'Mombasa Old Town'
  },
  {
    id: 'inv-3',
    sku: 'KRC-TEA-03',
    name: 'Kericho Reserve Pure Black Tea (500g Tin)',
    category: 'Beverages',
    priceKES: 850,
    priceUSD: 7,
    stock: 5,
    status: 'Low Stock',
    location: 'Kericho Depot'
  },
  {
    id: 'inv-4',
    sku: 'MCD-OIL-04',
    name: 'Mt. Kenya Cold-Pressed Macadamia Oil (250ml)',
    category: 'Organic Care',
    priceKES: 1950,
    priceUSD: 15,
    stock: 24,
    status: 'In Stock',
    location: 'Nanyuki / Nairobi'
  },
  {
    id: 'inv-5',
    sku: 'KSS-STN-05',
    name: 'Handcarved Kisii Soapstone Sculptural Decor',
    category: 'Home & Living',
    priceKES: 3200,
    priceUSD: 25,
    stock: 0,
    status: 'Out of Stock',
    location: 'Kilimani Warehouse'
  }
];

export const INITIAL_TRACKS: Track[] = [
  {
    id: 'whatsapp-retail-agent',
    trackNumber: 'Track 01: Core Commerce',
    title: 'WhatsApp AI Agent for Kenyan Retail',
    category: 'Conversational Commerce',
    status: 'active',
    progress: 42,
    totalSteps: 12,
    completedSteps: 5,
    description: 'Build an autonomous WhatsApp business agent that handles customer inquiries in English and Sheng/Swahili, verifies live product inventory, triggers Safaricom M-Pesa STK push checkouts, and confirms orders.',
    badgeTitle: 'Verified WhatsApp Commerce Engineer',
    tags: ['WhatsApp Cloud API', 'Gemini 3.7 Flash', 'M-Pesa STK Push', 'Live Inventory Hooks'],
    steps: [
      {
        id: 'step-1',
        number: '01',
        title: 'Conversational Architecture & State Routing',
        subtitle: 'State machine vs LLM agent flows for retail',
        status: 'completed',
        duration: '25 min',
        category: 'Architecture',
        summary: 'Understanding hybrid deterministic state handling combined with LLM natural language understanding for reliable African e-commerce transactions.',
        isGated: false,
        content: {
          overview: 'Retail WhatsApp bots in Nairobi cannot afford hallucinations when charging customers via M-Pesa or confirming available stock. You learn to build a hybrid router combining high-confidence intent classification with rigid transaction schemas.',
          keyLearnings: [
            'Hybrid intent classification & slot extraction strategies',
            'Fallback mechanisms when customer input is ambiguous or regional slang',
            'Context window pruning for low-bandwidth mobile WhatsApp users'
          ],
          codeSnippet: `// Example Kenya Commerce Intent Router
const classifyIntent = async (message: string) => {
  return await llm.classify(message, {
    intents: ['INQUIRE_STOCK', 'GET_PRICE', 'TRIGGER_MPESA', 'TALK_TO_MERCHANT']
  });
};`
        }
      },
      {
        id: 'step-2',
        number: '02',
        title: 'Meta WhatsApp Cloud API Setup',
        subtitle: 'Phone number registration & token security',
        status: 'completed',
        duration: '35 min',
        category: 'Integrations',
        summary: 'Provisioning Meta Developer portal credentials, configuring webhook callbacks, and handling HMAC signature verification.',
        isGated: false,
        content: {
          overview: 'Learn how to securely establish bidirectional communication with the WhatsApp Cloud API using Node/TypeScript micro-services with proper webhook signature verification.',
          keyLearnings: [
            'Configuring permanent access tokens in Meta System Users',
            'Setting up webhook challenge verification (hub.challenge)',
            'Handling WhatsApp template message rate limits and opt-ins'
          ]
        }
      },
      {
        id: 'step-3',
        number: '03',
        title: 'The Logic Flow & Guardrails',
        subtitle: 'Mapping the user journey for Kenyan retail sales',
        status: 'completed',
        duration: '40 min',
        category: 'Flow Design',
        summary: 'Designing conversational branching logic from initial greeting through product selection, size/color variant checks, and order confirmation.',
        isGated: false,
        content: {
          overview: 'Map the complete retail shopping journey. Prevent out-of-bounds queries, maintain polite Kenyan merchant tone, and keep the user on track to complete their purchase.',
          keyLearnings: [
            'Designing customer-centric friction-free buying stages',
            'Adding soft guardrails against off-topic or malicious prompts',
            'Handling currency formatting (KES / USD) and delivery zones in Nairobi'
          ]
        }
      },
      {
        id: 'step-4',
        number: '04',
        title: 'Catalog Data Ingestion & Indexing',
        subtitle: 'Structuring real-time SKU inventory',
        status: 'completed',
        duration: '30 min',
        category: 'Data & State',
        summary: 'Structuring retail product catalogs with fuzzy search indices so buyers can find items even with typos, Swahili names, or shorthand.',
        isGated: false,
        content: {
          overview: 'Kenyan shoppers on WhatsApp use shorthand and colloquial phrases (e.g. "sandals za maasai", "kericho tea 500g", "kikoy blue"). Learn to index product catalogs with keyword and semantic scoring.',
          keyLearnings: [
            'SKU and variant mapping in key-value memory',
            'Fuzzy name matching for colloquial product queries',
            'Real-time stock decrement locks during reservation'
          ]
        }
      },
      {
        id: 'step-5',
        number: '05',
        title: 'System Persona & Kenyan Nuance',
        subtitle: 'Crafting the voice of high-touch commerce',
        status: 'completed',
        duration: '35 min',
        category: 'Prompt Design',
        summary: 'Tuning tone of voice, professional courtesy, and localized greeting styles (Karibu, Habari, Asante) to boost buyer trust and retention.',
        isGated: false,
        content: {
          overview: 'Build a trustworthy, warm retail persona that answers concisely, quotes clear prices in KES, and formats WhatsApp markdown (bolding, lists) cleanly without fluff.',
          keyLearnings: [
            'Formatting WhatsApp bold (*text*), italics (_text_), and bullet lists',
            'Injecting dynamic store hours and Nairobi dispatch terms',
            'Handling returns and escalation to human store manager seamlessly'
          ]
        }
      },
      {
        id: 'step-6',
        number: '06',
        title: 'Prompt Engineering for Live Inventory',
        subtitle: 'Building the memory system for products',
        status: 'current',
        duration: '45 min',
        category: 'Prompt Engineering',
        summary: 'Constructing dynamic system prompts with runtime inventory injection, stock-level checks, and automated order JSON extraction.',
        isGated: true,
        content: {
          overview: 'In this core lesson, you construct a resilient system prompt that injects the current live inventory array into the context window. The agent must accurately verify stock levels, decline sold-out SKUs with alternatives, and summarize order totals.',
          keyLearnings: [
            'Injecting structured JSON inventory data into LLM system prompts',
            'Writing strict negative constraints against inventing non-existent SKUs',
            'Calculating multi-item subtotals and discounts reliably',
            'Extracting structured checkout payloads for backend fulfillment'
          ],
          samplePrompt: `You are AfrikBot, a warm and polite sales assistant for Africademy Artisan Kenya in Nairobi.
Always format prices in KES and USD.
Check the LIVE INVENTORY table before answering.
- If an item is "Out of Stock", politely explain and suggest an in-stock alternative.
- Keep WhatsApp messages concise (under 3 sentences) with clean formatting.
- If the customer wants to buy, summarize the order with [ORDER_CONFIRMED: {"sku": "...", "qty": 1}].`,
          codeSnippet: `export function buildKenyanInventoryPrompt(inventory: InventoryItem[], userQuery: string) {
  const table = inventory
    .map(i => \`- \${i.name} (SKU: \${i.sku}) | KES \${i.priceKES} / $\${i.priceUSD} | Stock: \${i.stock} (\${i.status})\`)
    .join('\\n');

  return \`CURRENT STORE INVENTORY:\\n\${table}\\n\\nCUSTOMER MESSAGE: "\${userQuery}"\\nGenerate a helpful WhatsApp reply:\`;
}`,
          testCase: {
            input: 'Habari! Do you have the Handmade Maasai Beaded Sandals in size 40, and how much is it in Kenyan Shillings?',
            expectedOutput: 'Karibu! Yes, we have 18 pairs of the Handmade Maasai Beaded Sandals in stock. Price is KES 2,800 (approx $22). Would you like me to reserve a pair for you?'
          }
        }
      },
      {
        id: 'step-7',
        number: '07',
        title: 'Backend API Integration & Queues',
        subtitle: 'Connecting your LLM logic to Express & Meta Webhooks',
        status: 'locked',
        duration: '50 min',
        category: 'Backend Dev',
        summary: 'Deploying the Express webhook server, establishing message queues, and sending media templates.',
        isGated: true,
        content: {
          overview: 'Hook up your tested prompt engine to a live Node.js microservice receiving WhatsApp POST webhooks and sending back Graph API replies within 3 seconds.',
          keyLearnings: [
            'Handling concurrent user sessions via Redis/memory store',
            'Media message payloads (sending product photos and catalog items)',
            'WhatsApp Quick Reply and Interactive List buttons'
          ]
        }
      },
      {
        id: 'step-8',
        number: '08',
        title: 'M-Pesa Express & Daraja API Integration',
        subtitle: 'Automating STK Push checkouts in WhatsApp chat',
        status: 'locked',
        duration: '45 min',
        category: 'Payments',
        summary: 'Triggering dynamic Safaricom M-Pesa STK push prompts and validating Daraja payment confirmation callbacks.',
        isGated: true,
        content: {
          overview: 'Generate instant M-Pesa Express STK Push prompts to customer phone numbers (+254 7XX XXX XXX) when the user confirms their cart, and listen for instant Daraja callbacks.',
          keyLearnings: [
            'Safaricom Daraja API authentication and password hashing',
            'Triggering Lipa Na M-Pesa Online (STK Push)',
            'Validating CallbackPayload and confirming transaction in chat'
          ]
        }
      },
      {
        id: 'step-9',
        number: '09',
        title: 'Nairobi Delivery & Dispatch Automation',
        subtitle: 'Automating motorcycle dispatch alerts',
        status: 'locked',
        duration: '30 min',
        category: 'Operations',
        summary: 'Capturing WhatsApp location pins and street descriptions (Westlands, Kilimani, Upper Hill) to forward to rider dispatch APIs.',
        isGated: true,
        content: {
          overview: 'Parse WhatsApp GPS location coordinates and estate descriptions, then automatically generate dispatch waybills for local motorcycle delivery.',
          keyLearnings: [
            'Decoding WhatsApp latitude/longitude payloads',
            'Calculating distance-based Nairobi dispatch fees',
            'Notifying warehouse fulfillment teams via automated dispatch triggers'
          ]
        }
      },
      {
        id: 'step-10',
        number: '10',
        title: 'Analytics & Funnel Conversion Telemetry',
        subtitle: 'Measuring drop-offs and revenue metrics',
        status: 'locked',
        duration: '35 min',
        category: 'Analytics',
        summary: 'Tracking conversation conversion rates, average order value in KES, and most requested out-of-stock items.',
        isGated: true,
        content: {
          overview: 'Instrument events to identify drop-off rates between product inquiry, variant selection, and M-Pesa payment completion.',
          keyLearnings: [
            'Tracking conversion funnel metrics across conversation turns',
            'Unanswered query logging for continuous prompt calibration',
            'A/B testing greeting copy for higher checkout completion'
          ]
        }
      },
      {
        id: 'step-11',
        number: '11',
        title: 'Sheng & Multi-Lingual Dialect Nuances',
        subtitle: 'Handling Nairobi urban vernacular smoothly',
        status: 'locked',
        duration: '40 min',
        category: 'AI Calibration',
        summary: 'Equipping the LLM agent to understand English, standard Swahili, and Nairobi Sheng phrases gracefully.',
        isGated: true,
        content: {
          overview: 'Train the prompt instructions to recognize multi-lingual conversational cues, bargaining queries, and local slang without breaking transaction schemas.',
          keyLearnings: [
            'Sheng and Swahili sales vocabulary comprehension',
            'Cross-lingual pricing queries',
            'Maintaining brand tone across language switches'
          ]
        }
      },
      {
        id: 'step-12',
        number: '12',
        title: 'Verified Portfolio Artifact Deployment',
        subtitle: 'Deploying your verified live link & rubric audit',
        status: 'locked',
        duration: '60 min',
        category: 'Verification',
        summary: 'Run automated end-to-end load tests on your bot, pass the 5-point commerce reliability rubric, and unlock your public verified portfolio.',
        isGated: true,
        content: {
          overview: 'Pass all simulated customer edge cases to earn your verified portfolio credential and showcase your live demo link to prospective clients and employers.',
          keyLearnings: [
            'End-to-end automated grading tests',
            'Generating verified public portfolio URL with rubric breakdown',
            'Submitting artifact for SME industry audit'
          ]
        }
      }
    ]
  },
  {
    id: 'lead-capture-bot',
    trackNumber: 'Track 02: Growth Engines',
    title: 'Lead Qualification Agent for Real Estate',
    category: 'Lead Generation',
    status: 'upcoming',
    progress: 0,
    totalSteps: 8,
    completedSteps: 0,
    description: 'Build an automated qualification agent that collects budget, location preferences (Westlands, Kilimani, Karen, Kileleshwa), schedules viewings, and syncs leads to Google Sheets and CRM webhooks.',
    badgeTitle: 'Verified Lead Automation Specialist',
    tags: ['CRM Webhooks', 'Google Sheets API', 'Calendar Scheduling', 'Property Filters'],
    steps: [
      {
        id: 'lc-step-1',
        number: '01',
        title: 'Property Qualification State Engine',
        subtitle: 'Extracting budget, bedroom count & neighborhood',
        status: 'locked',
        duration: '30 min',
        category: 'Architecture',
        summary: 'Structuring strict lead qualification criteria so high-intent buyers are prioritized for real estate viewings.',
        isGated: true,
        content: {
          overview: 'Design conversational routing to capture buyer criteria (budget in KES/USD, 2-bedroom vs 3-bedroom, rental vs purchase) in under 4 chat turns.',
          keyLearnings: [
            'Structured slot filling without interrogation fatigue',
            'Validating budget ranges against live property listings',
            'Disqualifying out-of-scope inquiries politely'
          ]
        }
      },
      {
        id: 'lc-step-2',
        number: '02',
        title: 'Calendar Appointment Scheduling',
        subtitle: 'Automating agent walkthrough bookings',
        status: 'locked',
        duration: '40 min',
        category: 'Integrations',
        summary: 'Connecting Google Calendar and Calendly webhooks to offer dynamic viewing slots.',
        isGated: true,
        content: {
          overview: 'Enable buyers to select available 30-minute viewing slots with estate managers directly in WhatsApp.',
          keyLearnings: [
            'Timezone-safe slot booking',
            'WhatsApp interactive list selection',
            'Automated SMS / WhatsApp reminders 2 hours before viewing'
          ]
        }
      },
      {
        id: 'lc-step-3',
        number: '03',
        title: 'CRM & Google Sheets Real-time Sync',
        subtitle: 'Piping qualified leads into sales pipelines',
        status: 'locked',
        duration: '35 min',
        category: 'Backend Dev',
        summary: 'Writing secure webhooks to pipe contact info and lead scores directly into Airtable, HubSpot, and Google Sheets.',
        isGated: true,
        content: {
          overview: 'Format clean lead objects and push real-time notifications to agent Slack and WhatsApp groups.',
          keyLearnings: [
            'Google Sheets API v4 service account authentication',
            'Lead scoring algorithms based on buyer timeframe',
            'Instant webhook dispatch to sales team'
          ]
        }
      },
      {
        id: 'lc-step-4',
        number: '04',
        title: 'Automated Property Brochure Dispatch',
        subtitle: 'Sending PDF floor plans and virtual tours',
        status: 'locked',
        duration: '35 min',
        category: 'Media Engine',
        summary: 'Delivering tailored PDF brochures based on selected Nairobi neighborhoods.',
        isGated: true,
        content: {
          overview: 'Dynamically match user criteria with property media assets and send PDFs instantly in WhatsApp.',
          keyLearnings: [
            'WhatsApp Media API uploads',
            'Dynamic brochure generation',
            'Tracking open and click metrics'
          ]
        }
      }
    ]
  },
  {
    id: 'invoicing-assistant',
    trackNumber: 'Track 03: SME Finance',
    title: 'Invoicing & Receipt AI Assistant',
    category: 'Financial Automation',
    status: 'upcoming',
    progress: 0,
    totalSteps: 10,
    completedSteps: 0,
    description: 'Extract line items from photographed handwritten invoices using Gemini Vision OCR, generate automated PDF receipts, and trigger overdue payment follow-ups with M-Pesa Till payment links.',
    badgeTitle: 'Verified Financial Automation Engineer',
    tags: ['Gemini Flash Vision', 'PDF Generation', 'M-Pesa Till Reconciliation', 'Overdue Follow-ups'],
    steps: [
      {
        id: 'inv-step-1',
        number: '01',
        title: 'Receipt & Invoice Image Ingestion',
        subtitle: 'Extracting structured JSON from camera snapshots',
        status: 'locked',
        duration: '35 min',
        category: 'Vision OCR',
        summary: 'Using Gemini Vision to parse handwritten Kenyan SME receipts, quantities, VAT, and totals.',
        isGated: true,
        content: {
          overview: 'Build an image ingestion pipeline that handles wrinkled paper receipts, low-light photos, and handwritten Kenyan shilling totals.',
          keyLearnings: [
            'Gemini Vision multimodal prompt engineering',
            'Strict JSON output validation with Zod schemas',
            'Handling 16% Kenyan VAT calculations and subtotal checks'
          ]
        }
      },
      {
        id: 'inv-step-2',
        number: '02',
        title: 'Dynamic PDF Invoice & Receipt Generation',
        subtitle: 'Generating branded downloadable receipts',
        status: 'locked',
        duration: '45 min',
        category: 'PDF Engine',
        summary: 'Compiling structured receipt data into clean, branded PDFs delivered directly to customer WhatsApp.',
        isGated: true,
        content: {
          overview: 'Generate professional vector PDF receipts with QR codes linking to M-Pesa transaction verification.',
          keyLearnings: [
            'Headless PDF rendering with custom typography',
            'Embedding M-Pesa transaction codes and merchant stamps',
            'Uploading to secure cloud storage with time-limited signed URLs'
          ]
        }
      },
      {
        id: 'inv-step-3',
        number: '03',
        title: 'M-Pesa Till & Paybill Reconciliation',
        subtitle: 'Matching payment SMS codes to open invoice balances',
        status: 'locked',
        duration: '40 min',
        category: 'Reconciliation',
        summary: 'Automating the parsing of Safaricom M-Pesa confirmation SMS text strings to mark invoices paid.',
        isGated: true,
        content: {
          overview: 'Build a regex and LLM extractor that parses standard Safaricom SMS formats (e.g. "QK871234 Confirmed. Ksh 4,500 paid to...") and updates accounting ledger status.',
          keyLearnings: [
            'M-Pesa SMS string parsing and transaction ID validation',
            'Automated invoice status updates in database',
            'Sending instant thank-you receipts to the payer'
          ]
        }
      }
    ]
  }
];

export const INITIAL_PORTFOLIO_VERIFICATION: PortfolioVerification = {
  id: 'AFR-2026-KE-8492',
  studentName: 'Wanjiku Muthoni',
  trackTitle: 'WhatsApp AI Agent for Kenyan Retail',
  liveUrl: 'https://africademy.ke/p/wanjiku-muthoni/retail-agent',
  githubUrl: 'https://github.com/africademy-verified/wanjiku-muthoni-retail-bot',
  issueDate: 'August 2026',
  status: 'Verified Production Grade',
  overallScore: 98,
  rubric: [
    {
      id: 'rubric-1',
      criteria: 'Inventory Consistency & Stock Decrement',
      score: 10,
      maxScore: 10,
      description: 'Zero hallucinated SKUs; correctly informs out-of-stock items with alternatives.',
      status: 'Passed'
    },
    {
      id: 'rubric-2',
      criteria: 'M-Pesa STK Push Integration & Error Routing',
      score: 9.8,
      maxScore: 10,
      description: 'Generates valid Safaricom Daraja payloads and handles cancelled push prompts gracefully.',
      status: 'Passed'
    },
    {
      id: 'rubric-3',
      criteria: 'Kenyan Regional Nuance & Sheng Comprehension',
      score: 9.5,
      maxScore: 10,
      description: 'Handles English, Swahili greetings, and Nairobi slang without breaking transaction schemas.',
      status: 'Passed'
    },
    {
      id: 'rubric-4',
      criteria: 'Latency & Webhook Response Timeout (<3s)',
      score: 10,
      maxScore: 10,
      description: 'Consistently returns HTTP 200 to Meta within 1.2s; async queues for heavy LLM calls.',
      status: 'Passed'
    },
    {
      id: 'rubric-5',
      criteria: 'Guardrails & Prompt Injection Defense',
      score: 9.7,
      maxScore: 10,
      description: 'Resists system prompt extraction and off-topic prompt hijacking.',
      status: 'Passed'
    }
  ],
  smeReviewer: {
    name: 'Brian Omondi',
    role: 'Lead Conversational Architect',
    company: 'Nairobi Enterprise AI Labs',
    location: 'Westlands, Nairobi',
    quote: 'Wanjiku demonstrates exemplary discipline in conversational error handling. Her implementation of the Safaricom Daraja payment webhook coupled with strict catalog memory injection is ready for production e-commerce deployment.',
    avatarInitials: 'BO'
  },
  metrics: {
    latencyAvg: '1.18s',
    hallucinationRate: '0.0%',
    stockAccuracy: '100.0%',
    mpesaWebhookUptime: '99.9%'
  }
};
