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
    icon: 'MessageSquare',
    status: 'active',
    progress: 42,
    totalSteps: 12,
    completedSteps: 5,
    description: 'Build an autonomous WhatsApp business agent that handles customer inquiries in English and Sheng/Swahili, verifies live product inventory, triggers Safaricom M-Pesa STK push checkouts, and confirms orders.',
    badgeTitle: 'Verified WhatsApp Commerce Engineer',
    tags: ['WhatsApp Cloud API', 'Gemini 3.7 Flash', 'M-Pesa STK Push', 'Live Inventory Hooks'],
    whoBuysThis: 'Retail shops, boutiques, and online sellers',
    impactStat: 'WhatsApp AI agents already resolve up to 70% of customer questions instantly',
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
          samplePrompt: `You are AfrikBot, a warm and polite sales assistant for Afridemy Artisan Kenya in Nairobi.
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
    icon: 'UserPlus',
    status: 'upcoming',
    progress: 0,
    totalSteps: 8,
    completedSteps: 0,
    description: 'Build an automated qualification agent that collects budget, location preferences (Westlands, Kilimani, Karen, Kileleshwa), schedules viewings, and syncs leads to Google Sheets and CRM webhooks.',
    badgeTitle: 'Verified Lead Automation Specialist',
    tags: ['CRM Webhooks', 'Google Sheets API', 'Calendar Scheduling', 'Property Filters'],
    whoBuysThis: 'Real estate agencies and property managers',
    impactStat: 'Slow lead response loses real estate agents the sale before they even reply',
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
    icon: 'Receipt',
    status: 'upcoming',
    progress: 0,
    totalSteps: 10,
    completedSteps: 0,
    description: 'Extract line items from photographed handwritten invoices using Gemini Vision OCR, generate automated PDF receipts, and trigger overdue payment follow-ups with M-Pesa Till payment links.',
    badgeTitle: 'Verified Financial Automation Engineer',
    tags: ['Gemini Flash Vision', 'PDF Generation', 'M-Pesa Till Reconciliation', 'Overdue Follow-ups'],
    whoBuysThis: 'Small shops, service providers, and contractors',
    impactStat: 'Automated reminders mean invoices actually get paid on time, not chased by hand',
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
  },
  {
    id: 'support-ticketing-agent',
    trackNumber: 'Track 04: Support Ops',
    title: 'AI Customer Support & Ticketing Agent',
    category: 'Support Operations',
    icon: 'Headset',
    status: 'upcoming',
    progress: 0,
    totalSteps: 6,
    completedSteps: 0,
    description: 'Build a multi-channel support agent that triages WhatsApp and email complaints, searches a business FAQ knowledge base, and escalates unresolved issues to a human agent with full conversation context attached.',
    badgeTitle: 'Verified Support Automation Engineer',
    tags: ['Knowledge Base RAG', 'Ticket Escalation', 'Sentiment Detection'],
    whoBuysThis: 'Any business fielding WhatsApp or email support',
    impactStat: 'AI-driven support automation cuts ticket backlog by up to 40%',
    steps: [
      {
        id: 'sup-step-1',
        number: '01',
        title: 'FAQ Knowledge Base & Retrieval',
        subtitle: 'Answering from a business\'s real policies, not guesses',
        status: 'locked',
        duration: '35 min',
        category: 'Architecture',
        summary: 'Indexing a business\'s actual return policy, hours, and product FAQs so the agent answers from real source material.',
        isGated: true,
        content: {
          overview: 'Build a retrieval-augmented pipeline that grounds every answer in the business\'s actual documented policies, never inventing a return window or price that was never confirmed.',
          keyLearnings: [
            'Chunking and embedding a small business knowledge base',
            'Retrieval-augmented prompting to avoid hallucinated policy answers',
            'Confidence thresholds for when to answer versus escalate'
          ]
        },
        reviews: []
      },
      {
        id: 'sup-step-2',
        number: '02',
        title: 'Escalation & Human Handoff',
        subtitle: 'Knowing exactly when to stop and call a person',
        status: 'locked',
        duration: '30 min',
        category: 'Flow Design',
        summary: 'Detecting frustration and complexity signals that mean a human needs to take over, with the full conversation history attached.',
        isGated: true,
        content: {
          overview: 'Design the handoff moment: sentiment detection, repeated unresolved queries, and explicit request-for-human triggers, each handing the human agent a clean summary instead of a raw transcript.',
          keyLearnings: [
            'Basic sentiment and frustration signal detection',
            'Structuring a clean handoff summary for a human agent',
            'Never leaving the customer without an acknowledgment'
          ]
        },
        reviews: []
      }
    ]
  },
  {
    id: 'booking-scheduler-agent',
    trackNumber: 'Track 05: Service Ops',
    title: 'AI Booking & Appointment Scheduler',
    category: 'Scheduling Automation',
    icon: 'Calendar',
    status: 'upcoming',
    progress: 0,
    totalSteps: 6,
    completedSteps: 0,
    description: 'Build a WhatsApp booking agent for salons, clinics, and repair shops that checks real calendar availability, confirms appointments, and sends automatic reminders before no-shows happen.',
    badgeTitle: 'Verified Scheduling Automation Specialist',
    tags: ['Calendar API', 'Reminder Automation', 'No-Show Reduction'],
    whoBuysThis: 'Salons, clinics, and repair shops',
    impactStat: 'Bots handle bookings 24/7, so a business never misses one after hours',
    steps: [
      {
        id: 'book-step-1',
        number: '01',
        title: 'Real-Time Availability Lookups',
        subtitle: 'Never double-booking a slot',
        status: 'locked',
        duration: '30 min',
        category: 'Integrations',
        summary: 'Connecting to a live calendar so the agent only ever offers slots that are genuinely free.',
        isGated: true,
        content: {
          overview: 'Wire the agent to Google Calendar so every offered time slot reflects the real, current schedule, not a stale cached copy.',
          keyLearnings: [
            'Calendar API read/write with conflict checking',
            'Offering slots conversationally instead of a rigid form',
            'Handling timezone edge cases for remote clients'
          ]
        },
        reviews: []
      },
      {
        id: 'book-step-2',
        number: '02',
        title: 'Automated Reminders & No-Show Reduction',
        subtitle: 'Following up before the appointment, not after',
        status: 'locked',
        duration: '25 min',
        category: 'Automation',
        summary: 'Scheduling reminder messages timed to actually reduce no-shows, with an easy reschedule path built in.',
        isGated: true,
        content: {
          overview: 'Build the reminder sequence: a confirmation on booking, a reminder the day before, and a same-morning nudge, each with a one-tap reschedule link.',
          keyLearnings: [
            'Timed message scheduling against calendar events',
            'One-tap reschedule flows inside WhatsApp',
            'Measuring no-show rate before and after automation'
          ]
        },
        reviews: []
      }
    ]
  },
  {
    id: 'social-content-agent',
    trackNumber: 'Track 06: Marketing Ops',
    title: 'AI Social Media Content Assistant',
    category: 'Marketing Automation',
    icon: 'Megaphone',
    status: 'upcoming',
    progress: 0,
    totalSteps: 5,
    completedSteps: 0,
    description: 'Build an agent that turns a business owner\'s voice notes into ready-to-post captions for Instagram and Facebook, scheduled automatically around real engagement patterns.',
    badgeTitle: 'Verified Marketing Automation Specialist',
    tags: ['Content Generation', 'Post Scheduling', 'Voice-to-Caption'],
    whoBuysThis: 'Small brands, boutiques, and local businesses',
    impactStat: 'Kenyan SMEs are shifting from rented social platforms to owned, automated systems',
    steps: [
      {
        id: 'soc-step-1',
        number: '01',
        title: 'Voice Note to Caption Pipeline',
        subtitle: 'From a 30-second voice note to a ready post',
        status: 'locked',
        duration: '30 min',
        category: 'Content Engine',
        summary: 'Transcribing a business owner\'s spoken update and turning it into a clean, on-brand caption automatically.',
        isGated: true,
        content: {
          overview: 'Build the pipeline: transcribe the voice note, extract the actual news (new stock, a sale, a closure), then draft a caption in the business\'s own established tone.',
          keyLearnings: [
            'Speech-to-text for informal spoken Kenyan English/Swahili',
            'Extracting the actual announcement from a rambling voice note',
            'Keeping generated captions in the business\'s real voice, not generic marketing-speak'
          ]
        },
        reviews: []
      },
      {
        id: 'soc-step-2',
        number: '02',
        title: 'Scheduled Posting',
        subtitle: 'Publishing at the times that actually get seen',
        status: 'locked',
        duration: '25 min',
        category: 'Automation',
        summary: 'Queuing approved posts to go out automatically at times that reflect the business\'s real audience activity.',
        isGated: true,
        content: {
          overview: 'Connect to the Meta Graph API to schedule approved posts, with a simple approval step so nothing goes live without the owner seeing it first.',
          keyLearnings: [
            'Meta Graph API post scheduling',
            'A lightweight human-approval gate before anything publishes',
            'Basic engagement tracking on published posts'
          ]
        },
        reviews: []
      }
    ]
  },
  {
    id: 'inventory-restock-agent',
    trackNumber: 'Track 07: Supply Chain',
    title: 'AI Inventory & Restock Alert Agent',
    category: 'Supply Chain Automation',
    icon: 'Package',
    status: 'upcoming',
    progress: 0,
    totalSteps: 6,
    completedSteps: 0,
    description: 'Build an agent that watches stock levels in real time, predicts when a Kenyan SME will run out based on real sales velocity, and messages the supplier to reorder before shelves go empty.',
    badgeTitle: 'Verified Supply Chain Automation Engineer',
    tags: ['Stock Forecasting', 'Supplier Messaging', 'Reorder Triggers'],
    whoBuysThis: 'Retailers, distributors, and small manufacturers',
    impactStat: 'Better demand forecasting means shops stock what actually sells, not what they guess',
    steps: [
      {
        id: 'inv2-step-1',
        number: '01',
        title: 'Sales Velocity & Stockout Prediction',
        subtitle: 'Knowing you\'ll run out before you actually do',
        status: 'locked',
        duration: '35 min',
        category: 'Forecasting',
        summary: 'Calculating real sell-through rate per SKU to predict a stockout date, not just watching a static low-stock number.',
        isGated: true,
        content: {
          overview: 'Build a simple velocity model from real order history so the agent flags "this SKU runs out in 4 days" instead of a flat threshold that\'s wrong half the time.',
          keyLearnings: [
            'Basic sales-velocity calculation from order data',
            'Setting realistic reorder points per product',
            'Avoiding false alerts from one-off bulk orders'
          ]
        },
        reviews: []
      },
      {
        id: 'inv2-step-2',
        number: '02',
        title: 'Automated Supplier Reorder Messaging',
        subtitle: 'Sending the actual reorder request, not just an alert',
        status: 'locked',
        duration: '30 min',
        category: 'Automation',
        summary: 'Drafting and sending a real reorder message to the supplier\'s WhatsApp with the exact quantities needed.',
        isGated: true,
        content: {
          overview: 'Close the loop: once a stockout is predicted, generate the actual supplier order message with quantities and delivery deadline, not just an internal notification nobody acts on.',
          keyLearnings: [
            'Structured reorder message generation',
            'Confirming supplier receipt and expected delivery date',
            'Logging reorder history for future forecasting'
          ]
        },
        reviews: []
      }
    ]
  },
  {
    id: 'hr-screening-agent',
    trackNumber: 'Track 08: HR Ops',
    title: 'AI Hiring & CV Screening Agent',
    category: 'HR Automation',
    icon: 'FileCheck',
    status: 'upcoming',
    progress: 0,
    totalSteps: 5,
    completedSteps: 0,
    description: 'Build an agent that screens incoming job applications against a role\'s actual requirements, ranks candidates fairly, and messages shortlisted applicants to schedule an interview.',
    badgeTitle: 'Verified HR Automation Specialist',
    tags: ['Resume Parsing', 'Candidate Ranking', 'Interview Scheduling'],
    whoBuysThis: 'Growing SMEs that hire regularly',
    impactStat: 'Automated screening reads every CV the same way, so no candidate gets missed in the pile',
    steps: [
      {
        id: 'hr-step-1',
        number: '01',
        title: 'Structured Resume Parsing',
        subtitle: 'Extracting real qualifications, not keyword guessing',
        status: 'locked',
        duration: '30 min',
        category: 'Data Extraction',
        summary: 'Parsing CVs into structured fields the agent can actually reason about, years of experience, specific skills, location.',
        isGated: true,
        content: {
          overview: 'Build a parser that extracts real structured data from varied CV formats, so ranking is based on actual qualifications, not just resumes with the right buzzwords.',
          keyLearnings: [
            'Structured extraction from unstructured CV text and PDFs',
            'Handling inconsistent formats without breaking',
            'Flagging fields the parser genuinely couldn\'t extract, instead of guessing'
          ]
        },
        reviews: []
      },
      {
        id: 'hr-step-2',
        number: '02',
        title: 'Fair Ranking & Interview Scheduling',
        subtitle: 'A defensible shortlist, then a booked interview',
        status: 'locked',
        duration: '30 min',
        category: 'Automation',
        summary: 'Scoring candidates against the role\'s actual stated requirements, then handing shortlisted candidates a real interview slot.',
        isGated: true,
        content: {
          overview: 'Rank candidates against explicit, stated job requirements only, avoiding proxies that could introduce bias, then message the shortlist directly to book a real interview time.',
          keyLearnings: [
            'Scoring against explicit stated requirements, not inferred proxies',
            'Keeping a human reviewer in the loop before any rejection is sent',
            'Automated interview slot booking for shortlisted candidates'
          ]
        },
        reviews: []
      }
    ]
  },
  {
    id: 'payment-collections-agent',
    trackNumber: 'Track 09: Collections Ops',
    title: 'AI Overdue Payment Follow-Up Agent',
    category: 'Collections Automation',
    icon: 'AlertCircle',
    status: 'upcoming',
    progress: 0,
    totalSteps: 5,
    completedSteps: 0,
    description: 'Build an agent that tracks unpaid invoices, sends a polite escalating sequence of WhatsApp payment reminders with a live M-Pesa link, and flags genuinely stuck accounts for a human to call.',
    badgeTitle: 'Verified Collections Automation Engineer',
    tags: ['Escalation Sequencing', 'M-Pesa Payment Links', 'Aging Reports'],
    whoBuysThis: 'Any business that invoices clients',
    impactStat: 'Automated payment reminders close a real, named gap in most SME billing today',
    steps: [
      {
        id: 'col-step-1',
        number: '01',
        title: 'Overdue Detection & Escalation Sequencing',
        subtitle: 'Polite first, firm later, never rude',
        status: 'locked',
        duration: '30 min',
        category: 'Flow Design',
        summary: 'Designing a reminder sequence that escalates tone appropriately as an invoice ages, without ever crossing into harassment.',
        isGated: true,
        content: {
          overview: 'Build a staged sequence: a friendly nudge at day 1 overdue, a firmer reminder at day 7, and a flag for human follow-up at day 21, each with a real M-Pesa payment link attached.',
          keyLearnings: [
            'Aging-based message sequencing',
            'Tone calibration so reminders stay professional, never harassing',
            'Attaching a working payment link to every reminder'
          ]
        },
        reviews: []
      },
      {
        id: 'col-step-2',
        number: '02',
        title: 'Aging Reports & Human Escalation',
        subtitle: 'Knowing which accounts genuinely need a phone call',
        status: 'locked',
        duration: '25 min',
        category: 'Reporting',
        summary: 'Generating a real accounts-aging view and flagging accounts that need a human call instead of another automated message.',
        isGated: true,
        content: {
          overview: 'Build the aging report and the escalation rule: after N automated reminders with no response, stop messaging and flag the account for a human to call directly.',
          keyLearnings: [
            'Basic accounts-receivable aging report generation',
            'Setting a sane automation-to-human handoff threshold',
            'Avoiding endless automated messaging on accounts that won\'t respond'
          ]
        },
        reviews: []
      }
    ]
  },
  {
    id: 'food-ordering-agent',
    trackNumber: 'Track 10: Hospitality Ops',
    title: 'AI Food Ordering & Delivery Agent',
    category: 'Hospitality Automation',
    icon: 'UtensilsCrossed',
    status: 'upcoming',
    progress: 0,
    totalSteps: 5,
    completedSteps: 0,
    description: 'Build a WhatsApp ordering agent for a Kenyan restaurant that reads the daily menu, takes orders with modifications, calculates delivery fees by estate, and hands off confirmed orders to the kitchen and rider.',
    badgeTitle: 'Verified Hospitality Automation Specialist',
    tags: ['Menu Parsing', 'Delivery Fee Calculation', 'Kitchen Handoff'],
    whoBuysThis: 'Restaurants, cafes, and food vendors',
    impactStat: 'Direct WhatsApp ordering can save up to 30% in margin lost to delivery apps',
    steps: [
      {
        id: 'food-step-1',
        number: '01',
        title: 'Menu Parsing & Order Capture',
        subtitle: 'Taking an order with real modifications',
        status: 'locked',
        duration: '30 min',
        category: 'Architecture',
        summary: 'Handling a real order with substitutions and special requests, not just a rigid numbered menu list.',
        isGated: true,
        content: {
          overview: 'Build an order-capture flow that understands modifications ("no onions", "extra spicy") against a structured daily menu, confirming the full order back before checkout.',
          keyLearnings: [
            'Structuring a daily menu for reliable agent lookups',
            'Handling free-text modifications without breaking the order schema',
            'Confirming the full order back to the customer before payment'
          ]
        },
        reviews: []
      },
      {
        id: 'food-step-2',
        number: '02',
        title: 'Delivery Fee Calculation & Kitchen Handoff',
        subtitle: 'From confirmed order to the kitchen and the rider',
        status: 'locked',
        duration: '25 min',
        category: 'Operations',
        summary: 'Calculating delivery fees by estate and handing the confirmed order straight to kitchen and rider, no manual relay.',
        isGated: true,
        content: {
          overview: 'Close the loop: calculate the delivery fee based on the customer\'s estate, confirm payment, and push the order directly to a kitchen display and rider dispatch, removing the manual phone-relay step.',
          keyLearnings: [
            'Estate-based delivery fee lookup tables',
            'Direct kitchen order handoff without manual re-entry',
            'Rider dispatch notification with delivery address'
          ]
        },
        reviews: []
      }
    ]
  }
];

export const INITIAL_PORTFOLIO_VERIFICATION: PortfolioVerification = {
  id: 'AFR-2026-KE-8492',
  studentName: 'Wanjiku Muthoni',
  trackTitle: 'WhatsApp AI Agent for Kenyan Retail',
  liveUrl: 'https://afridemy.ke/p/wanjiku-muthoni/retail-agent',
  githubUrl: 'https://github.com/afridemy-verified/wanjiku-muthoni-retail-bot',
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
