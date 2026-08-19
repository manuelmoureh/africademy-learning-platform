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
    price: 6999,
    rating: 4.9,
    reviewCount: 8,
    tags: ['WhatsApp Cloud API', 'Gemini 3.7 Flash', 'M-Pesa STK Push', 'Live Inventory Hooks'],
    whoBuysThis: 'Retail shops, boutiques, and online sellers',
    impactStat: 'WhatsApp AI agents already resolve up to 70% of customer questions instantly',
    featuredOnHomepage: true,
    steps: [
        {
          "id": "step-1",
          "number": "01",
          "title": "Introduction to WhatsApp Commerce",
          "subtitle": "The landscape of chat-based retail in Kenya",
          "status": "locked",
          "duration": "25 min",
          "category": "Architecture",
          "summary": "Understanding why WhatsApp is the primary storefront for Kenyan SMEs and mapping the agent architecture.",
          "isGated": false,
          "content": {
            "overview": "Before writing code, we must understand the environment. WhatsApp handles product discovery, inquiry, and payment for many Kenyan businesses. We will map out an autonomous agent that integrates WhatsApp Cloud API, Gemini 3.7 Flash, and M-Pesa STK push.",
            "lessonBody": "Most Kenyan SMEs never built a website, and most of their customers never asked for one. The storefront is already WhatsApp: a customer sees a product on Instagram or hears about a shop from a friend, opens a chat, and asks what's in stock. No app to download, no account to create, no browser tab to keep open. That's the whole reason this course exists. If you're going to automate a retail business, you automate where the business already happens.\n\nThere are two completely different products hiding behind the name \"WhatsApp Business.\" The WhatsApp Business App is the free app a shop owner installs on their own phone: one device, one person (or a small team sharing a phone) typing replies by hand. It's what most small businesses use today, and it has a hard ceiling, because a human has to read and answer every single message. The WhatsApp Cloud API is a different product entirely: Meta's hosted API that lets a program, not a person, send and receive those same messages. No app on a phone at all. Your code talks to Meta's servers over HTTPS, and Meta relays messages to and from the customer's WhatsApp app. This is the only version of WhatsApp that an autonomous agent can actually run on, and it's what every remaining lesson in this course is built on top of.\n\nGetting access isn't automatic. A real business has to register with Meta as a developer, create a Business app, and either use a temporary test number or verify their own. That setup work is next lesson, step by step. For now, the important thing to understand is what changes once it's done: instead of a notification popping up on someone's personal phone, an incoming customer message becomes an HTTP request delivered to a webhook URL your code controls. From that moment, everything is programmable.\n\nHere's the shape of the system you're building across this whole course, so each later lesson has somewhere to slot in. A customer message arrives at your webhook. Your code hands that message to an LLM (Gemini, in this course) along with the store's actual live inventory, so the model answers from real stock data instead of guessing. The model decides what to say back, or recognizes that the customer wants to buy something and extracts a structured order. If it's a purchase, your code triggers a real M-Pesa STK push so the customer's phone prompts them for their PIN right there in the chat. Once payment clears, you confirm the order and hand off for delivery. Every one of those steps becomes its own lesson: webhook setup, conversation state, connecting the LLM, injecting inventory, extracting structured orders, M-Pesa integration, and handling everything that goes wrong along the way.\n\nOne more thing worth being honest about before you move on: this lesson is orientation, not construction. You won't write a line of code until lesson 2. That's deliberate. Building the wrong mental model of what WhatsApp Cloud API actually is, and then trying to debug webhook and token issues on top of that confusion, is a much worse experience than spending 25 minutes now making sure the architecture actually makes sense.",
            "keyLearnings": [
              "The difference between WhatsApp Business App and WhatsApp Cloud API",
              "Mapping the user journey from inquiry to M-Pesa checkout",
              "Understanding the role of LLMs in conversational commerce"
            ]
          }
        },
        {
          "id": "step-2",
          "number": "02",
          "title": "Setting up WhatsApp Cloud API",
          "subtitle": "Connecting to Meta Graph API and webhooks",
          "status": "locked",
          "duration": "35 min",
          "category": "Integrations",
          "summary": "Creating a Meta developer app, provisioning a test number, and setting up a secure Node.js webhook.",
          "isGated": false,
          "content": {
            "overview": "To receive and reply to messages autonomously, we need to bypass the standard WhatsApp app. We'll register a Meta Developer App, obtain a Cloud API token, and set up an Express.js webhook to listen for incoming text messages from customers.",
            "keyLearnings": [
              "Provisioning a test number via the Meta Developer portal",
              "Handling WhatsApp's webhook verification challenge",
              "Extracting message text and sender IDs from the incoming JSON payload"
            ],
            "codeSnippet": "app.post('/webhook', (req, res) => {\n  const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];\n  if (message?.type === 'text') {\n    console.log(`Received: ${message.text.body} from ${message.from}`);\n  }\n  res.sendStatus(200);\n});"
          }
        },
        {
          "id": "step-3",
          "number": "03",
          "title": "Designing the Chat Flow & State",
          "subtitle": "Managing conversation state without a database",
          "status": "locked",
          "duration": "30 min",
          "category": "Flow Design",
          "summary": "Tracking where the user is in the buying journey (browsing, checkout, payment).",
          "isGated": false,
          "content": {
            "overview": "Conversational commerce is not just QA; it's a state machine. A customer moves from asking about products to confirming an order. We will implement an in-memory session manager to track phone numbers and their active context window before handing off to the LLM.",
            "keyLearnings": [
              "Defining conversational states: GREETING, BROWSING, CHECKOUT",
              "Using phone numbers as unique session identifiers",
              "Appending new messages to the active LLM context history"
            ]
          }
        },
        {
          "id": "step-4",
          "number": "04",
          "title": "Connecting the Gemini Flash LLM",
          "subtitle": "Wiring up the brain of the agent",
          "status": "locked",
          "duration": "40 min",
          "category": "Data & State",
          "summary": "Using Google's Gemini SDK to generate replies based on customer inquiries.",
          "isGated": false,
          "content": {
            "overview": "We replace static keyword replies with Gemini 3.7 Flash, which can understand messy human input. We will initialize the generative AI client and pass the WhatsApp message history to generate contextual, natural responses.",
            "keyLearnings": [
              "Initializing the Google GenAI SDK with API keys",
              "Formatting WhatsApp chat history into Gemini's multi-turn message array",
              "Handling latency and async API calls smoothly"
            ],
            "codeSnippet": "const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });\nconst chat = model.startChat({ history: sessionHistory });\nconst result = await chat.sendMessage(customerMessage);\nreturn result.response.text();"
          }
        },
        {
          "id": "step-5",
          "number": "05",
          "title": "System Persona & Kenyan Nuance",
          "subtitle": "Crafting the voice of high-touch commerce",
          "status": "locked",
          "duration": "35 min",
          "category": "Prompt Design",
          "summary": "Designing a persona that greets naturally in English, Swahili, or Sheng, keeps replies short enough to read on a phone, and knows exactly when to stop and hand off to a human.",
          "isGated": false,
          "content": {
            "overview": "A prompt that answers correctly but sounds like a script loses trust fast. This lesson builds the agent's actual voice: warm but brief, price-first, and comfortable matching a customer's own opening, whether that's a formal 'Habari, how can I help?' or a casual 'Sasa, niaje!'.",
            "keyLearnings": [
              "WhatsApp's real formatting syntax, *bold*, _italic_, ~strikethrough~, and monospace with triple backticks, not generic markdown",
              "Keeping replies to roughly 2-3 short lines so they're readable on a phone screen without scrolling",
              "Mirroring the customer's own greeting style instead of forcing one fixed house tone on every chat",
              "Defining the exact phrase that hands a conversation to a human store manager, so the agent never fakes confidence it doesn't have"
            ],
            "samplePrompt": "You are AfrikBot, a warm sales assistant for a Nairobi boutique.\nMirror the customer's opening: reply in English if they wrote in English, in Swahili/Sheng if they did.\nAlways quote prices in KES. Keep replies to 2-3 short lines.\nIf you're not confident you can help (a complaint, a bulk order, anything unusual), say so and say a team member will follow up — never guess."
          }
        },
        {
          "id": "step-6",
          "number": "06",
          "title": "Prompt Engineering for Live Inventory",
          "subtitle": "Building the memory system for products",
          "status": "locked",
          "duration": "45 min",
          "category": "Prompt Engineering",
          "summary": "Grounding every answer in real, current stock instead of the model's training data, and keeping that grounding cheap enough to run on every message.",
          "isGated": true,
          "content": {
            "overview": "An LLM has no idea what's actually in stock right now, so it will confidently invent an answer unless you stop it. This lesson injects live inventory into the prompt as structured data the model must check before replying — and covers the thing that breaks this approach at scale: you can't paste a 500-SKU catalog into every message and expect it to stay fast or cheap, so you also filter down to only the products the customer is actually asking about before injecting anything.",
            "keyLearnings": [
              "Injecting structured inventory data into the prompt and treating it as the only source of truth for stock",
              "Filtering to a relevant subset of SKUs before injection instead of sending the full catalog on every message",
              "Writing an explicit instruction against inventing a SKU, price, or stock count that isn't in the injected data",
              "Extracting a structured order payload the backend can act on, not just a friendly sentence"
            ],
            "samplePrompt": "You are AfrikBot, a warm and polite sales assistant for a Nairobi retail store.\nAlways quote prices in KES.\nOnly reference products in the RELEVANT INVENTORY list below — never invent a SKU, price, or stock count.\n- If the requested item isn't in the list or shows 0 stock, say so and suggest the closest listed alternative.\n- Keep replies to 2-3 short lines.\n- When the customer confirms a purchase, end your reply with [ORDER_CONFIRMED: {\"sku\": \"...\", \"qty\": 1}].",
            "codeSnippet": "export function buildInventoryPrompt(catalog: InventoryItem[], userQuery: string) {\n  // Don't inject the whole catalog - filter to what's actually relevant to this\n  // message first (simple keyword match here; a real system would use embeddings search).\n  const relevant = catalog.filter(item =>\n    userQuery.toLowerCase().includes(item.name.toLowerCase().split(' ')[0])\n  );\n  const table = (relevant.length ? relevant : catalog.slice(0, 5))\n    .map(i => `- ${i.name} (SKU: ${i.sku}) | KES ${i.priceKES} | Stock: ${i.stock} (${i.status})`)\n    .join('\\n');\n\n  return `RELEVANT INVENTORY:\\n${table}\\n\\nCUSTOMER MESSAGE: \"${userQuery}\"\\nGenerate a helpful WhatsApp reply:`;\n}",
            "testCase": {
              "input": "Habari! Do you have the Handmade Maasai Beaded Sandals in size 40, and how much is it in Kenyan Shillings?",
              "expectedOutput": "Karibu! Yes, we have 18 pairs of the Handmade Maasai Beaded Sandals in stock, KES 2,800. Would you like me to reserve a pair for you?"
            }
          }
        },
        {
          "id": "step-7",
          "number": "07",
          "title": "Extracting JSON Orders for Checkout",
          "subtitle": "Enforcing structured outputs from Gemini",
          "status": "locked",
          "duration": "45 min",
          "category": "Backend Dev",
          "summary": "Using Gemini's Structured Outputs (JSON Schema) to reliably parse a conversational order into a strict data object.",
          "isGated": true,
          "content": {
            "overview": "When a customer says 'I want to buy the red shoes and pay now', the agent needs to transition from conversation to a strict transaction. We will use Gemini's response_schema parameter to force the LLM to output a clean JSON object containing the SKU, quantity, and total price.",
            "keyLearnings": [
              "Configuring response_mime_type to 'application/json'",
              "Defining a strict Pydantic/Zod schema for the order payload",
              "Validating the extracted JSON against the live inventory before proceeding"
            ],
            "codeSnippet": "const response = await model.generateContent({\n  contents: prompt,\n  generationConfig: {\n    responseMimeType: 'application/json',\n    responseSchema: orderSchema,\n  },\n});\nconst orderData = JSON.parse(response.text());"
          }
        },
        {
          "id": "step-8",
          "number": "08",
          "title": "Integrating Safaricom M-Pesa STK Push",
          "subtitle": "Triggering a payment prompt on the customer's phone",
          "status": "locked",
          "duration": "55 min",
          "category": "Payments",
          "summary": "Connecting the Safaricom Daraja API to trigger a seamless M-Pesa PIN prompt right after the order is confirmed.",
          "isGated": true,
          "content": {
            "overview": "Once the order JSON is extracted, we must collect payment. In Kenya, this means M-Pesa. We will authenticate with the Daraja API and fire an STK Push (Lipa Na M-Pesa Online) request so a payment prompt pops up directly on the customer's phone.",
            "keyLearnings": [
              "Generating the base64 Daraja auth token and timestamp passwords",
              "Initiating the STK Push request with the correct Paybill/Till number",
              "Handling the phone number formatting (converting 07... to 2547...)"
            ],
            "codeSnippet": "const stkPayload = {\n  BusinessShortCode: 174379,\n  Password: generatePassword(),\n  Timestamp: getTimestamp(),\n  TransactionType: 'CustomerPayBillOnline',\n  Amount: orderTotal,\n  PartyA: customerPhone,\n  PhoneNumber: customerPhone,\n  CallBackURL: 'https://our-api.com/mpesa-callback',\n  AccountReference: orderId,\n  TransactionDesc: 'Retail Purchase'\n};"
          }
        },
        {
          "id": "step-9",
          "number": "09",
          "title": "Handling Edge Cases: Stockouts & Failures",
          "subtitle": "Building robust operational fallback logic",
          "status": "locked",
          "duration": "40 min",
          "category": "Operations",
          "summary": "Managing cancelled M-Pesa transactions, race conditions on stock, and fallback to human staff.",
          "isGated": true,
          "content": {
            "overview": "Real-world commerce is messy. What if two people order the last pair of shoes at the same time? What if the customer cancels the M-Pesa PIN prompt? We will implement Daraja callback listeners to process successful/failed payments and update inventory locks accordingly.",
            "keyLearnings": [
              "Listening to M-Pesa callbacks to confirm payment success or failure",
              "Handling stock reservation race conditions",
              "Gracefully handing off the chat to a human manager if the bot gets stuck"
            ],
            "testCase": {
              "input": "Daraja Callback: ResultCode=1032 (Request cancelled by user)",
              "expectedOutput": "Agent sends WhatsApp message: 'I noticed the M-Pesa payment was cancelled. Let me know if you'd like me to resend the prompt or if you need help!'"
            }
          }
        },
        {
          "id": "step-10",
          "number": "10",
          "title": "Sheng Calibration & Guardrails",
          "subtitle": "Making the agent sound locally authentic but safe",
          "status": "locked",
          "duration": "35 min",
          "category": "AI Calibration",
          "summary": "Tuning the LLM to understand Nairobi Sheng without losing professional boundaries, and preventing prompt injection.",
          "isGated": true,
          "content": {
            "overview": "Nairobi customers mix English, Swahili, and Sheng ('Niko na 2k, naweza pata hii?'). The agent must understand the intent without replying in overly casual slang that damages the brand. We will also implement guardrails to stop users from manipulating the bot into offering fake discounts.",
            "keyLearnings": [
              "Adding few-shot examples of Sheng inquiries and professional Swahili/English replies",
              "Implementing system instructions to ignore price-haggling beyond approved limits",
              "Testing the agent against basic prompt injection attacks"
            ],
            "testCase": {
              "input": "Niaje, form ni gani? Hii mboka ni fiti, nikupee 1500 saizi?",
              "expectedOutput": "Safi sana! The price for this item is fixed at KES 2,000. Let me know if you'd like to proceed with the purchase via M-Pesa."
            }
          }
        },
        {
          "id": "step-11",
          "number": "11",
          "title": "Basic Analytics & Dashboards",
          "subtitle": "Giving the shop owner visibility",
          "status": "locked",
          "duration": "30 min",
          "category": "Analytics",
          "summary": "Pushing order data to a Google Sheet so the retail owner can track daily sales and bot performance.",
          "isGated": true,
          "content": {
            "overview": "An agent working in the background is useless if the owner doesn't know what it's selling. We will use the Google Sheets API to log every successful M-Pesa transaction, giving the SME owner a live, free dashboard of their WhatsApp sales.",
            "keyLearnings": [
              "Authenticating with the Google Sheets API via service accounts",
              "Appending rows automatically upon successful M-Pesa callback",
              "Tracking bot conversation length as a metric for efficiency"
            ]
          }
        },
        {
          "id": "step-12",
          "number": "12",
          "title": "Verified Portfolio Deployment",
          "subtitle": "Launch your retail agent and prove it works",
          "status": "locked",
          "duration": "45 min",
          "category": "Deployment",
          "summary": "Deploy the complete webhook to production, run a live transaction, and capture proof for your Afridemy portfolio.",
          "isGated": true,
          "content": {
            "overview": "It's time to ship. You will deploy your Node.js agent to a production environment like Render or Railway. You will run a real M-Pesa transaction (even if just KES 1) through WhatsApp, record a short demo of the chat flow, and secure a quote from the business owner you built this for. This verified deployment is your actual portfolio credential—no scores, no grades, just a working system.",
            "keyLearnings": [
              "Deploying the Express webhook securely with HTTPS",
              "Recording a seamless screen capture of the WhatsApp-to-MPesa user journey",
              "Collecting and submitting the business owner's validation quote"
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
    totalSteps: 12,
    completedSteps: 0,
    description: 'Build an automated qualification agent that collects budget, location preferences (Westlands, Kilimani, Karen, Kileleshwa), schedules viewings, and syncs leads to Google Sheets and CRM webhooks.',
    badgeTitle: 'Verified Lead Automation Specialist',
    price: 6999,
    rating: 4.8,
    reviewCount: 5,
    tags: ['CRM Webhooks', 'Google Sheets API', 'Calendar Scheduling', 'Property Filters'],
    whoBuysThis: 'Real estate agencies and property managers',
    impactStat: 'Slow lead response loses real estate agents the sale before they even reply',
    featuredOnHomepage: true,
    steps: [
        {
          "id": "lc-step-1",
          "number": "01",
          "title": "Property Qualification State Engine",
          "subtitle": "Guiding the buyer journey seamlessly",
          "status": "locked",
          "duration": "30 min",
          "category": "Architecture",
          "summary": "Map out a structured conversation flow to capture lead preferences like budget and location without overwhelming them.",
          "isGated": false,
          "content": {
            "overview": "Build a state machine that tracks which critical pieces of information (budget, neighborhood, property size) have been captured and what is still missing. This ensures the agent only asks relevant follow-ups.",
            "keyLearnings": [
              "Designing conversational states for budget, location, and property type",
              "Storing temporary user data reliably during the chat session",
              "Using graceful fallbacks when a user provides vague or non-standard answers"
            ]
          }
        },
        {
          "id": "lc-step-2",
          "number": "02",
          "title": "Calendar Appointment Scheduling",
          "subtitle": "Booking site visits automatically",
          "status": "locked",
          "duration": "40 min",
          "category": "Integrations",
          "summary": "Integrate with the Google Calendar API to allow leads to book property viewing appointments seamlessly within WhatsApp.",
          "isGated": false,
          "content": {
            "overview": "Enable the bot to check an agent's real-time availability and present open slots to the prospect. You will integrate the Google Calendar API to automatically create calendar events for site viewings.",
            "keyLearnings": [
              "Authenticating and securely calling the Google Calendar API",
              "Formatting available time slots for easy readability on mobile devices",
              "Handling double-booking conflicts and timezone offsets correctly"
            ],
            "codeSnippet": "export async function bookViewing(date: string, userPhone: string) {\n  const event = {\n    summary: 'Property Viewing - Lead',\n    description: `Contact: ${userPhone}`,\n    start: { dateTime: date },\n    end: { dateTime: addHour(date) },\n  };\n  return await calendar.events.insert({ calendarId: 'primary', resource: event });\n}"
          }
        },
        {
          "id": "lc-step-3",
          "number": "03",
          "title": "CRM & Google Sheets Real-time Sync",
          "subtitle": "Building a lightweight CRM",
          "status": "locked",
          "duration": "35 min",
          "category": "Backend Dev",
          "summary": "Push captured lead data to Google Sheets to serve as a lightweight, accessible CRM for real estate agents.",
          "isGated": false,
          "content": {
            "overview": "Ensure agents never miss a hot lead by syncing chat data into a structured Google Sheet. You will set up webhook handlers that parse the conversation state and append rows containing budget, location, and contact details.",
            "keyLearnings": [
              "Setting up a Google Service Account for automated Sheets API access",
              "Structuring incoming webhook data into clean, tabular rows",
              "Handling network failures and building reliable retry logic"
            ]
          }
        },
        {
          "id": "lc-step-4",
          "number": "04",
          "title": "Automated Property Brochure Dispatch",
          "subtitle": "Delivering rich media instantly",
          "status": "locked",
          "duration": "35 min",
          "category": "Media Engine",
          "summary": "Send rich media like property brochures (PDFs) based on the user's qualified preferences such as a 2-bedroom in Westlands.",
          "isGated": false,
          "content": {
            "overview": "Enhance the prospect's experience by instantly delivering property floor plans and brochures. You will map user preferences to a media database and trigger WhatsApp document messages.",
            "keyLearnings": [
              "Uploading and managing media assets via the WhatsApp Cloud API",
              "Dynamically selecting the right brochure based on captured state data",
              "Crafting compelling caption copy to accompany file attachments"
            ]
          }
        },
        {
          "id": "lc-step-5",
          "number": "05",
          "title": "Disqualifying Tire-Kickers",
          "subtitle": "Protecting human agent time",
          "status": "locked",
          "duration": "30 min",
          "category": "Lead Scoring",
          "summary": "Use soft-qualification questions to filter out low-intent leads before they consume a human agent's valuable time.",
          "isGated": false,
          "content": {
            "overview": "Not all inquiries are ready to buy. Design a gentle funnel that identifies low-budget or 'just browsing' users, redirecting them to an automated email list rather than booking an in-person viewing.",
            "keyLearnings": [
              "Defining disqualification triggers (e.g., extremely low budget for a premium area)",
              "Writing polite, brand-appropriate disqualification and redirection messages",
              "Funneling low-intent leads into automated, long-term nurture sequences"
            ]
          }
        },
        {
          "id": "lc-step-6",
          "number": "06",
          "title": "Intent Scoring & Handoff",
          "subtitle": "Identifying the hottest leads",
          "status": "locked",
          "duration": "45 min",
          "category": "Prompt Engineering",
          "summary": "Design a prompt that evaluates the chat transcript and assigns a buyer intent score, escalating top scores to a human.",
          "isGated": true,
          "content": {
            "overview": "Leverage an LLM to read the subtext of a conversation. You will construct a prompt that evaluates urgency, specific requests, and financial readiness, outputting a JSON score that triggers a webhook to a human broker.",
            "keyLearnings": [
              "Prompting an LLM to evaluate text for urgency and budget readiness",
              "Outputting structured JSON with a numerical intent score",
              "Triggering a human handoff protocol via webhook for high-value leads"
            ],
            "samplePrompt": "You are a real estate intent analyzer. Review this WhatsApp chat transcript. Score the user's intent from 1-10 based on stated budget, urgency, and specific neighborhood requests (e.g., Kilimani, Karen). Output JSON strictly formatted as {'score': 8, 'reasoning': '...', 'escalate': true/false}. Escalate if score > 7.",
            "testCase": {
              "input": "I need a 3-bedroom in Kileleshwa, budget 150k KES/month, moving next week.",
              "expectedOutput": "{\"score\": 9, \"reasoning\": \"High urgency (moving next week) and clear budget for target area.\", \"escalate\": true}"
            }
          }
        },
        {
          "id": "lc-step-7",
          "number": "07",
          "title": "Multi-Property Comparison",
          "subtitle": "Helping buyers make choices",
          "status": "locked",
          "duration": "40 min",
          "category": "Data Handling",
          "summary": "Enable the agent to suggest and compare 2-3 properties that fit the user's budget, giving them a summary of pros and cons.",
          "isGated": true,
          "content": {
            "overview": "When a buyer's criteria match several listings, the bot must present options clearly. You will query a property database and use an LLM to generate a scannable, side-by-side comparison of amenities and pricing.",
            "keyLearnings": [
              "Querying the property database based on multiple, intersecting user constraints",
              "Formatting a text comparison that reads well on small mobile screens",
              "Prompting the LLM to highlight distinct features of each property (e.g., balcony vs. closer to road)"
            ]
          }
        },
        {
          "id": "lc-step-8",
          "number": "08",
          "title": "WhatsApp Business API Compliance",
          "subtitle": "Playing by Meta's rules",
          "status": "locked",
          "duration": "25 min",
          "category": "Compliance",
          "summary": "Ensure your real estate agent follows Meta's opt-in rules and 24-hour window policies to avoid account bans.",
          "isGated": true,
          "content": {
            "overview": "Outbound messaging in real estate is highly regulated by WhatsApp. Learn how to securely collect user opt-ins during the chat and manage the 24-hour customer service window constraint for follow-ups.",
            "keyLearnings": [
              "Tracking and managing the 24-hour customer service messaging window",
              "Implementing explicit opt-in flows for future property alerts",
              "Creating and approving message templates for outbound follow-ups"
            ]
          }
        },
        {
          "id": "lc-step-9",
          "number": "09",
          "title": "Handling Objection & Negotiation",
          "subtitle": "Keeping the conversation alive",
          "status": "locked",
          "duration": "35 min",
          "category": "Prompt Design",
          "summary": "Train the AI to handle common real estate objections gracefully, such as price concerns or location issues.",
          "isGated": true,
          "content": {
            "overview": "Prospective tenants or buyers often push back on price. Build a knowledge base of typical objections and approved responses, instructing the bot to offer alternative listings or payment plans before they disengage.",
            "keyLearnings": [
              "Creating a structured knowledge base of typical real estate objections",
              "Instructing the LLM to pivot smoothly to alternative listings",
              "Recognizing when to escalate to human negotiation safely"
            ],
            "codeSnippet": "function handleObjection(userMessage: string) {\n  const prompt = `User says: \"${userMessage}\". Using our Nairobi real estate playbook, provide a polite response offering alternative payment plans or a different property. Keep it under 2 sentences.`;\n  return callLLM(prompt);\n}"
          }
        },
        {
          "id": "lc-step-10",
          "number": "10",
          "title": "Interactive Viewings & Virtual Tours",
          "subtitle": "Immersive property previews",
          "status": "locked",
          "duration": "30 min",
          "category": "Media Engine",
          "summary": "Enhance the lead experience by sending virtual tour links or interactive 360 images directly via WhatsApp.",
          "isGated": true,
          "content": {
            "overview": "Increase conversion rates prior to physical viewings by providing interactive virtual tours. You will use WhatsApp interactive buttons to let users trigger rich media experiences on demand.",
            "keyLearnings": [
              "Configuring WhatsApp interactive buttons for 'Take Virtual Tour' prompts",
              "Embedding and tracking click-through rates on rich media links",
              "Timing the delivery of high-bandwidth media so it doesn't interrupt the core chat flow"
            ]
          }
        },
        {
          "id": "lc-step-11",
          "number": "11",
          "title": "Lead Analytics Dashboard",
          "subtitle": "Tracking agency performance",
          "status": "locked",
          "duration": "40 min",
          "category": "Reporting",
          "summary": "Build a simple analytics view summarizing lead volume, top requested neighborhoods, and conversion-to-viewing rates.",
          "isGated": true,
          "content": {
            "overview": "Agency owners need visibility into bot performance. You will aggregate webhook data into Google Sheets or a basic dashboard to generate daily and weekly summaries of lead metrics.",
            "keyLearnings": [
              "Aggregating webhook event data into daily and weekly summaries",
              "Calculating drop-off rates at different stages of the qualification flow",
              "Delivering automated summary reports via WhatsApp to the agency admin"
            ]
          }
        },
        {
          "id": "lc-step-12",
          "number": "12",
          "title": "Verified Portfolio Deployment",
          "subtitle": "Launching your real estate agent",
          "status": "locked",
          "duration": "45 min",
          "category": "Deployment",
          "summary": "Finalize and deploy the lead qualification agent. Test the full CRM sync flow and hand it over to a real agency to get your verified portfolio link.",
          "isGated": true,
          "content": {
            "overview": "Bring all components together into a production-ready system. You will connect a live WhatsApp number, conduct end-to-end testing, and deploy the bot for a real property manager to earn your Verified portfolio asset.",
            "keyLearnings": [
              "Conducting end-to-end testing of the WhatsApp-to-Sheets pipeline",
              "Securing production API keys, webhooks, and Google credentials",
              "Recording a 60-second video demo of a successful property qualification flow"
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
    totalSteps: 12,
    completedSteps: 0,
    description: 'Extract line items from photographed handwritten invoices using Gemini Vision OCR, generate automated PDF receipts, and trigger overdue payment follow-ups with M-Pesa Till payment links.',
    badgeTitle: 'Verified Financial Automation Engineer',
    price: 4999,
    rating: 4.7,
    reviewCount: 4,
    tags: ['Gemini Flash Vision', 'PDF Generation', 'M-Pesa Till Reconciliation', 'Overdue Follow-ups'],
    whoBuysThis: 'Small shops, service providers, and contractors',
    impactStat: 'Automated reminders mean invoices actually get paid on time, not chased by hand',
    featuredOnHomepage: true,
    steps: [
        {
          "id": "inv-step-1",
          "number": "01",
          "title": "Receipt & Invoice Image Ingestion",
          "subtitle": "Reading handwritten shop receipts with Gemini Vision",
          "status": "locked",
          "duration": "35 min",
          "category": "Vision OCR",
          "summary": "Introduce Gemini 1.5 Flash Vision to parse physical, handwritten receipts from local vendors into digital records.",
          "isGated": false,
          "content": {
            "overview": "Start by building the ingestion layer. You will use the Gemini Vision API to accept a photo of a physical receipt (like a standard Kenyan Ndovu receipt book) and extract the text. The goal is to capture line items, dates, and amounts accurately, even if the handwriting is messy.",
            "keyLearnings": [
              "Calling the Gemini Vision API with image payloads",
              "Handling image resizing and basic pre-processing to save bandwidth",
              "Extracting raw text from crinkled or poorly lit photos"
            ]
          }
        },
        {
          "id": "inv-step-2",
          "number": "02",
          "title": "Structuring Extracted Data & VAT",
          "subtitle": "Enforcing JSON schemas and 16% VAT calculation",
          "status": "locked",
          "duration": "30 min",
          "category": "Data Modeling",
          "summary": "Transform raw OCR text into structured JSON, automatically separating the 16% KRA VAT from the gross amount.",
          "isGated": false,
          "content": {
            "overview": "Raw text isn't useful for bookkeeping. Here, you'll enforce a strict JSON output schema using Gemini's Structured Outputs feature. You will also implement the logic to calculate the 16% VAT portion if the receipt is VAT-inclusive.",
            "keyLearnings": [
              "Using Pydantic or JSON schemas to force Gemini's output format",
              "Separating VAT (16%) from net and gross totals mathematically",
              "Identifying merchant names and KRA PINs from the parsed data"
            ],
            "samplePrompt": "Extract the merchant name, date, total amount, KRA PIN, and a list of line items from this receipt image. Return the output as JSON conforming to the provided schema.",
            "testCase": {
              "input": "Handwritten receipt for KES 1,160 inclusive of VAT.",
              "expectedOutput": "{\"merchant\": \"Local Hardware\", \"totalGross\": 1160, \"vat16\": 160, \"totalNet\": 1000}"
            }
          }
        },
        {
          "id": "inv-step-3",
          "number": "03",
          "title": "Dynamic PDF Invoice & Receipt Generation",
          "subtitle": "Creating professional PDFs with Puppeteer",
          "status": "locked",
          "duration": "45 min",
          "category": "PDF Engine",
          "summary": "Generate beautiful, brandable PDF invoices from HTML templates using Node.js and Handlebars.",
          "isGated": false,
          "content": {
            "overview": "Once data is structured, you need to issue professional documents. You'll build a PDF generation microservice using Puppeteer and Handlebars. This takes your structured JSON and injects it into an HTML template, complete with your client's logo and payment details.",
            "keyLearnings": [
              "Using Handlebars for dynamic HTML templating",
              "Running headless Puppeteer to print HTML to PDF",
              "Applying CSS print media queries to ensure clean page breaks"
            ],
            "codeSnippet": "const html = template({ customerName: 'Wanjiku', total: 2500, currency: 'KES' });\nawait page.setContent(html, { waitUntil: 'networkidle0' });\nawait page.pdf({ path: 'invoice.pdf', format: 'A4' });"
          }
        },
        {
          "id": "inv-step-4",
          "number": "04",
          "title": "M-Pesa Till & Paybill Reconciliation",
          "subtitle": "Matching digital payments to open invoices",
          "status": "locked",
          "duration": "40 min",
          "category": "Reconciliation",
          "summary": "Connect to the Safaricom Daraja API to automatically mark invoices as paid when an M-Pesa transaction arrives.",
          "isGated": false,
          "content": {
            "overview": "Manual reconciliation is the biggest pain point for Kenyan SMEs. In this lesson, you will set up a webhook to receive M-Pesa C2B (Customer to Business) notifications via the Daraja API, matching the transaction amount and phone number to an open invoice.",
            "keyLearnings": [
              "Registering C2B confirmation URLs on the Safaricom Daraja portal",
              "Parsing M-Pesa payload data (TransAmount, MSISDN, BillRefNumber)",
              "Updating the invoice status in your database automatically upon payment"
            ]
          }
        },
        {
          "id": "inv-step-5",
          "number": "05",
          "title": "Error Handling for Blurry Photos",
          "subtitle": "Building resilient fallback mechanisms",
          "status": "locked",
          "duration": "35 min",
          "category": "Error Handling",
          "summary": "Detect unreadable receipts and prompt the user for a clearer photo instead of saving garbage data.",
          "isGated": false,
          "content": {
            "overview": "Camera phones in low-light shops produce blurry images. You will configure the AI to confidently report when a receipt is illegible, triggering an automated WhatsApp reply asking the shop owner to retake the photo.",
            "keyLearnings": [
              "Setting a confidence threshold for OCR extraction",
              "Designing the 'retake photo' user flow without frustrating the owner",
              "Handling partial extractions where only the total is visible"
            ]
          }
        },
        {
          "id": "inv-step-6",
          "number": "06",
          "title": "Prompt Engineering for Handwritten Receipts",
          "subtitle": "Tuning the Vision model for Kenyan handwriting",
          "status": "locked",
          "duration": "45 min",
          "category": "Prompt Engineering",
          "summary": "Advanced prompting techniques to handle Sheng abbreviations, faint carbon-copy paper, and mixed date formats.",
          "isGated": true,
          "content": {
            "overview": "Standard OCR struggles with abbreviations like 'Pcs' or dates written as '12/5/24'. You will engineer a robust system prompt that guides Gemini to understand common local shorthand and accurately extract data from faded, blue carbon-copy receipt books.",
            "keyLearnings": [
              "Injecting local context (Sheng terms, KES currency symbols) into the system prompt",
              "Guiding the AI to infer dates based on current context if the year is missing",
              "Writing negative constraints to prevent hallucinated line items"
            ],
            "samplePrompt": "You are processing handwritten Kenyan receipts. The currency is often implied as KES. 'Pcs' means pieces. If a line item is illegible, output 'UNKNOWN_ITEM' rather than guessing. Do not invent items.",
            "testCase": {
              "input": "Image of a blue carbon copy receipt with faint text: '2 Pcs unga @250 = 500'",
              "expectedOutput": "{\"items\": [{\"description\": \"Unga\", \"quantity\": 2, \"unitPrice\": 250, \"total\": 500}]}"
            }
          }
        },
        {
          "id": "inv-step-7",
          "number": "07",
          "title": "Basic Overdue Invoice Follow-ups",
          "subtitle": "Gentle, automated WhatsApp reminders",
          "status": "locked",
          "duration": "40 min",
          "category": "Messaging",
          "summary": "Configure a simple, polite scheduled message to remind clients of unpaid invoices before they become seriously overdue.",
          "isGated": true,
          "content": {
            "overview": "While dedicated collections agents handle severe debt, a basic invoicing assistant should send a gentle 'just checking in' reminder after 3 days. You will build a scheduled cron job that triggers a WhatsApp message containing a payment link.",
            "keyLearnings": [
              "Querying the database for invoices past their due date",
              "Crafting a polite, non-confrontational reminder message",
              "Including a direct M-Pesa payment link or Paybill instructions in the text"
            ]
          }
        },
        {
          "id": "inv-step-8",
          "number": "08",
          "title": "Handling Partial M-Pesa Payments",
          "subtitle": "Managing deposits and short payments",
          "status": "locked",
          "duration": "35 min",
          "category": "Reconciliation",
          "summary": "Update invoice balances accurately when a client pays less than the full amount via M-Pesa.",
          "isGated": true,
          "content": {
            "overview": "It is common for clients to pay a 50% deposit upfront and the rest later. You will expand your reconciliation logic to handle partial M-Pesa payments, keeping the invoice in a 'Partially Paid' state and calculating the remaining balance.",
            "keyLearnings": [
              "Calculating remaining balances by deducting the M-Pesa TransAmount",
              "Flagging an invoice as 'Partially Paid' instead of 'Closed'",
              "Generating an updated receipt reflecting the current balance due"
            ]
          }
        },
        {
          "id": "inv-step-9",
          "number": "09",
          "title": "Multi-Currency & Multi-Branch Logic",
          "subtitle": "Scaling for regional or multi-location SMEs",
          "status": "locked",
          "duration": "30 min",
          "category": "Architecture",
          "summary": "Handle USD invoices for expats/tourists and organize data by shop branch.",
          "isGated": true,
          "content": {
            "overview": "Many Nairobi SMEs deal in both KES and USD, or have branches in different neighborhoods. You will structure the database to tag invoices by currency and branch location, ensuring reports don't incorrectly sum USD and KES together.",
            "keyLearnings": [
              "Adding currency flags (KES/USD) to the JSON schema",
              "Handling exchange rate metadata if required by the owner",
              "Tagging records with branch IDs (e.g., 'Westlands', 'Kilimani')"
            ]
          }
        },
        {
          "id": "inv-step-10",
          "number": "10",
          "title": "eTIMS Readiness & Data Formatting",
          "subtitle": "Preparing records for KRA compliance",
          "status": "locked",
          "duration": "35 min",
          "category": "Tax Compliance",
          "summary": "Format your structured JSON data so it is ready to be exported or pushed to an eTIMS-compliant accounting system.",
          "isGated": true,
          "content": {
            "overview": "With the Kenya Revenue Authority mandating eTIMS for all businesses, your assistant's data must be cleanly formatted for tax reporting. You will build an export layer that packages the gross sales, VAT amounts, and client details into a standardized format.",
            "keyLearnings": [
              "Understanding the data fields required for eTIMS compliance",
              "Ensuring no 'Nil' returns are accidentally generated",
              "Structuring an export CSV or JSON payload for external accounting tools"
            ]
          }
        },
        {
          "id": "inv-step-11",
          "number": "11",
          "title": "Monthly Bookkeeping Summaries",
          "subtitle": "Automated reports for the business owner",
          "status": "locked",
          "duration": "45 min",
          "category": "Reporting",
          "summary": "Generate a clean, end-of-month financial summary and send it directly to the owner's WhatsApp.",
          "isGated": true,
          "content": {
            "overview": "SME owners rarely log into complex dashboards. You will build a script that runs on the 1st of every month, sums the total invoiced, total collected via M-Pesa, and total outstanding, and messages a concise summary to the owner.",
            "keyLearnings": [
              "Aggregating monthly sales and collection data",
              "Calculating the outstanding accounts receivable balance",
              "Formatting the summary cleanly using WhatsApp markdown (bolding, lists)"
            ]
          }
        },
        {
          "id": "inv-step-12",
          "number": "12",
          "title": "Verified Portfolio Deployment",
          "subtitle": "Going live with a real local shop",
          "status": "locked",
          "duration": "50 min",
          "category": "Deployment",
          "summary": "Deploy your invoicing assistant to the cloud and connect it to a real SME's M-Pesa Till and WhatsApp number.",
          "isGated": true,
          "content": {
            "overview": "Your final step is to take the system out of the sandbox. You will deploy your Node.js application, register the live Safaricom production URLs, and hand it over to a real business. Once they process their first live receipt, you'll record a short demo to earn your Verified Portfolio link.",
            "keyLearnings": [
              "Moving from Safaricom Sandbox to the Production Daraja portal",
              "Deploying the Node.js/Puppeteer service to a cloud provider",
              "Recording the system working in the real world for your portfolio"
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
    totalSteps: 12,
    completedSteps: 0,
    description: 'Build a multi-channel support agent that triages WhatsApp and email complaints, searches a business FAQ knowledge base, and escalates unresolved issues to a human agent with full conversation context attached.',
    badgeTitle: 'Verified Support Automation Engineer',
    price: 2999,
    rating: 4.8,
    reviewCount: 3,
    tags: ['Knowledge Base RAG', 'Ticket Escalation', 'Sentiment Detection'],
    whoBuysThis: 'Any business fielding WhatsApp or email support',
    impactStat: 'AI-driven support automation cuts ticket backlog by up to 40%',
    featuredOnHomepage: true,
    steps: [
        {
          "id": "sup-step-1",
          "number": "01",
          "title": "Architecture of a Unified Support Agent",
          "subtitle": "Bringing WhatsApp and email into a single AI brain",
          "status": "locked",
          "duration": "30 min",
          "category": "Architecture",
          "summary": "Map out how customer messages flow from WhatsApp Cloud API and support email inboxes into a central processing engine.",
          "isGated": false,
          "content": {
            "overview": "Before writing code, you need to understand the data flow. This lesson covers how to unify disjointed support channels—like a business's WhatsApp number and their support email domain—into a single webhook endpoint that our AI agent can monitor and respond to.",
            "keyLearnings": [
              "Designing a unified payload schema for WhatsApp and email messages",
              "Mapping the data flow from webhook trigger to agent response",
              "Understanding the constraints of the WhatsApp 24-hour service window"
            ]
          }
        },
        {
          "id": "sup-step-2",
          "number": "02",
          "title": "Document Ingestion for Kenyan SMEs",
          "subtitle": "Prepping refund policies and FAQs for the AI",
          "status": "locked",
          "duration": "35 min",
          "category": "Data Pipeline",
          "summary": "Extract text from actual business documents, pricing PDFs, and return policies to serve as the agent's source of truth.",
          "isGated": false,
          "content": {
            "overview": "A support agent must never invent answers. In this lesson, we build a pipeline that reads standard business documents (like a Nairobi shop's return policy or delivery fee schedule) and splits them into clean, indexable chunks.",
            "keyLearnings": [
              "Extracting text from PDF and Word documents using simple parsing libraries",
              "Chunking text to preserve context boundaries for accurate AI retrieval",
              "Handling common formatting issues in handwritten or scanned policies"
            ]
          }
        },
        {
          "id": "sup-step-3",
          "number": "03",
          "title": "Building the Knowledge Base (RAG)",
          "subtitle": "Storing policies in a vector database",
          "status": "locked",
          "duration": "45 min",
          "category": "Database",
          "summary": "Convert your document chunks into vector embeddings and store them for rapid, similarity-based search when a customer asks a question.",
          "isGated": false,
          "content": {
            "overview": "To answer a customer query about delivery fees, the agent needs to instantly find the delivery fee policy. We use an embedding model to convert text chunks into numbers, and store them in a vector database to enable fast retrieval.",
            "keyLearnings": [
              "Generating text embeddings from chunked policy documents",
              "Setting up a basic vector store for fast similarity search",
              "Testing retrieval accuracy against common customer queries"
            ]
          }
        },
        {
          "id": "sup-step-4",
          "number": "04",
          "title": "Retrieval & Fact Grounding",
          "subtitle": "Ensuring the agent only uses real business data",
          "status": "locked",
          "duration": "40 min",
          "category": "Prompt Design",
          "summary": "Draft the foundational prompt that forces the LLM to rely strictly on the retrieved knowledge base context and politely decline unknown queries.",
          "isGated": false,
          "content": {
            "overview": "The biggest risk in AI support is hallucination. You will write a system prompt that explicitly restricts the agent to the provided context. If a customer asks about a product not mentioned in the retrieved FAQs, the agent must smoothly admit it doesn't know.",
            "keyLearnings": [
              "Injecting retrieved vector chunks into the LLM context window",
              "Writing strict constraints to prevent the AI from guessing answers",
              "Calibrating the tone for polite, concise Kenyan business communication"
            ]
          }
        },
        {
          "id": "sup-step-5",
          "number": "05",
          "title": "Sentiment Detection & Triage",
          "subtitle": "Identifying angry customers and urgent issues",
          "status": "locked",
          "duration": "35 min",
          "category": "Analysis",
          "summary": "Use the LLM to evaluate the emotional tone of incoming messages to tag high-priority tickets or frustrated customers.",
          "isGated": false,
          "content": {
            "overview": "Not all tickets are equal. A customer asking for operating hours can wait, but someone complaining about a missing M-Pesa payment needs immediate attention. We'll use sentiment analysis to automatically tag and escalate urgent or angry messages.",
            "keyLearnings": [
              "Prompting the LLM to score sentiment as positive, neutral, or negative",
              "Detecting urgency keywords (e.g., 'stuck', 'failed', 'refund')",
              "Assigning priority tags based on combined sentiment and intent"
            ]
          }
        },
        {
          "id": "sup-step-6",
          "number": "06",
          "title": "Prompt Engineering for Support Resolutions",
          "subtitle": "Generating accurate, multi-turn answers",
          "status": "locked",
          "duration": "50 min",
          "category": "Prompt Engineering",
          "summary": "Construct dynamic prompts that combine conversation history, retrieved knowledge, and priority tags to generate final customer replies.",
          "isGated": true,
          "content": {
            "overview": "This is the core logic of the support agent. You will build a comprehensive prompt that feeds the LLM the customer's exact question, the past few messages for context, and the exact policy snippets retrieved from the vector database.",
            "keyLearnings": [
              "Managing conversational memory to handle follow-up questions",
              "Formatting complex policies into simple, readable WhatsApp replies",
              "Instructing the LLM to output structured JSON for internal ticket tracking"
            ],
            "samplePrompt": "You are a customer support agent for a Nairobi electronics shop. Answer the customer using ONLY the context provided below.\n\nCONTEXT:\n{retrieved_chunks}\n\nCONVERSATION HISTORY:\n{history}\n\nRULES:\n- Keep answers under 3 sentences.\n- Use KES for all prices.\n- If the answer is not in the context, say: 'I don't have that information, let me connect you to a human agent.'",
            "testCase": {
              "input": "My order arrived damaged. What is your return policy?",
              "expectedOutput": "Pole sana for the damaged order. Our policy allows returns within 7 days of delivery for defective items. Please share a photo of the damage and we will process a replacement or a full refund via M-Pesa."
            }
          }
        },
        {
          "id": "sup-step-7",
          "number": "07",
          "title": "Ticket Escalation & Human Handoff",
          "subtitle": "Knowing when to step back for a human manager",
          "status": "locked",
          "duration": "45 min",
          "category": "Flow Design",
          "summary": "Design the fail-safes that automatically pause the AI and alert a human team member when a complex or sensitive issue arises.",
          "isGated": true,
          "content": {
            "overview": "AI shouldn't handle everything. When the agent detects negative sentiment, an SLA breach, or an unanswerable question, it must gracefully hand off the conversation. We'll build the logic to pause the bot's auto-replies and notify a human manager via an internal alert.",
            "keyLearnings": [
              "Implementing an 'AI paused' state in the conversation database",
              "Triggering internal notifications for human intervention",
              "Writing a polite handoff message to manage the customer's expectations"
            ],
            "codeSnippet": "function checkEscalation(sentimentScore, failureCount) {\n  if (sentimentScore < 0.3 || failureCount >= 2) {\n    db.updateTicket(ticketId, { status: 'escalated', ai_paused: true });\n    notifyHumanAgent(`URGENT: Ticket ${ticketId} requires manual review.`);\n    return \"I'm escalating this to our support manager who will assist you shortly.\";\n  }\n  return null;\n}"
          }
        },
        {
          "id": "sup-step-8",
          "number": "08",
          "title": "SLA Tracking Logic",
          "subtitle": "Monitoring response and resolution times",
          "status": "locked",
          "duration": "40 min",
          "category": "Logic Rules",
          "summary": "Build background trackers that ensure no customer waits longer than the business's promised service level agreement.",
          "isGated": true,
          "content": {
            "overview": "Timely responses define good customer service. In this lesson, we implement timers that track how long a ticket has been open or waiting on a human. If a ticket approaches its SLA limit, the system escalates its priority automatically.",
            "keyLearnings": [
              "Calculating elapsed time during business hours only",
              "Setting threshold triggers for 1-hour and 4-hour SLA warnings",
              "Updating ticket priority tags dynamically based on wait time"
            ]
          }
        },
        {
          "id": "sup-step-9",
          "number": "09",
          "title": "Integrating with Ticketing Systems",
          "subtitle": "Syncing with Zendesk or Freshdesk",
          "status": "locked",
          "duration": "50 min",
          "category": "Backend Dev",
          "summary": "Connect your custom agent to standard helpdesk software using REST APIs to keep all customer records unified.",
          "isGated": true,
          "content": {
            "overview": "Many businesses already use tools like Zendesk or Freshdesk. Instead of replacing them, we'll configure our AI agent to act as the first line of defense, creating structured tickets via API and only leaving them open if a human needs to step in.",
            "keyLearnings": [
              "Authenticating with helpdesk REST APIs using secure tokens",
              "Mapping our internal ticket schema to Zendesk/Freshdesk fields",
              "Updating external ticket statuses when the AI resolves an issue automatically"
            ],
            "codeSnippet": "async function createZendeskTicket(user, issue, priority) {\n  const payload = {\n    ticket: {\n      requester: { name: user.name, email: user.email },\n      subject: 'WhatsApp Support Query',\n      comment: { body: issue },\n      priority: priority\n    }\n  };\n  return await axios.post('https://yourdomain.zendesk.com/api/v2/tickets', payload, { headers });\n}"
          }
        },
        {
          "id": "sup-step-10",
          "number": "10",
          "title": "Multi-channel Unification",
          "subtitle": "Merging email and WhatsApp histories",
          "status": "locked",
          "duration": "45 min",
          "category": "Integrations",
          "summary": "Ensure that if a customer emails you on Monday and WhatsApps you on Tuesday, the AI sees the full unified history.",
          "isGated": true,
          "content": {
            "overview": "Fragmented support frustrates customers. We will build a contact resolution function that links a user's phone number to their email address in the database, allowing the AI to reference past emails when answering a WhatsApp query.",
            "keyLearnings": [
              "Normalizing phone numbers and email addresses for database lookups",
              "Querying cross-channel interaction histories",
              "Injecting multi-channel context into the LLM prompt"
            ]
          }
        },
        {
          "id": "sup-step-11",
          "number": "11",
          "title": "Support Analytics Dashboard",
          "subtitle": "Giving the owner visibility into common complaints",
          "status": "locked",
          "duration": "35 min",
          "category": "Reporting",
          "summary": "Aggregate ticket tags to build a simple view showing the business owner the most frequent support issues.",
          "isGated": true,
          "content": {
            "overview": "Support data is a goldmine for business improvement. If a significant percentage of tickets are about delayed deliveries, the owner needs to know. We'll write an aggregation script that counts ticket categories over the last 30 days and outputs a clear summary report.",
            "keyLearnings": [
              "Querying the database for category frequencies and SLA breaches",
              "Generating a daily or weekly summary payload",
              "Sending the analytics report to the owner via automated email or WhatsApp"
            ]
          }
        },
        {
          "id": "sup-step-12",
          "number": "12",
          "title": "Deploying the Support Engine",
          "subtitle": "Going live with a verified business portfolio",
          "status": "locked",
          "duration": "60 min",
          "category": "Deployment",
          "summary": "Connect your unified support agent to a real business's knowledge base and WhatsApp number, delivering a live, verified portfolio piece.",
          "isGated": true,
          "content": {
            "overview": "This is where you prove you can build. You will deploy the fully configured AI support agent for a real client, ingesting their actual FAQs and handling live inquiries. Your final deliverable is a live link, a video demo of the escalation flow, and a verified quote from the business owner.",
            "keyLearnings": [
              "Deploying the webhook and vector store to a production server",
              "Conducting live tests on knowledge retrieval and human handoff limits",
              "Securing the final verification from the client to complete your portfolio"
            ]
          }
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
    totalSteps: 12,
    completedSteps: 0,
    description: 'Build a WhatsApp booking agent for salons, clinics, and repair shops that checks real calendar availability, confirms appointments, and sends automatic reminders before no-shows happen.',
    badgeTitle: 'Verified Scheduling Automation Specialist',
    price: 4999,
    rating: 4.9,
    reviewCount: 6,
    tags: ['Calendar API', 'Reminder Automation', 'No-Show Reduction'],
    whoBuysThis: 'Salons, clinics, and repair shops',
    impactStat: 'Bots handle bookings 24/7, so a business never misses one after hours',
    featuredOnHomepage: true,
    steps: [
        {
          "id": "book-step-1",
          "number": "01",
          "title": "WhatsApp Booking Architectures",
          "subtitle": "Mapping the conversation to calendar states",
          "status": "locked",
          "duration": "30 min",
          "category": "Architecture",
          "summary": "Learn how to structure a conversational booking flow that moves a client from inquiry to confirmed appointment seamlessly.",
          "isGated": false,
          "content": {
            "overview": "Before writing code, we map out the state machine of a booking interaction. You'll learn how to handle the greeting, service selection, date proposal, and confirmation states typical in a Kenyan salon or clinic.",
            "keyLearnings": [
              "Designing the state machine for conversational scheduling",
              "Mapping WhatsApp message triggers to booking states",
              "Handling missing information gracefully without frustrating the user"
            ]
          }
        },
        {
          "id": "book-step-2",
          "number": "02",
          "title": "Google Calendar API Integration",
          "subtitle": "Connecting WhatsApp to live availability",
          "status": "locked",
          "duration": "45 min",
          "category": "Integrations",
          "summary": "Set up the Google Calendar API to enable real-time free/busy lookups for your booking agent.",
          "isGated": false,
          "content": {
            "overview": "A booking agent is useless if it double-books. Here we integrate Google Calendar via Node.js, authenticating securely to check actual availability before suggesting a time slot to the customer.",
            "keyLearnings": [
              "Authenticating with Google Cloud Service Accounts",
              "Querying the freeBusy API endpoint for specific time ranges",
              "Formatting calendar availability into clean WhatsApp text"
            ],
            "codeSnippet": "const { google } = require('googleapis');\n\nasync function checkAvailability(calendarId, startTime, endTime) {\n  const calendar = google.calendar({ version: 'v3', auth: jwtClient });\n  const res = await calendar.freebusy.query({\n    requestBody: {\n      timeMin: startTime.toISOString(),\n      timeMax: endTime.toISOString(),\n      items: [{ id: calendarId }]\n    }\n  });\n  return res.data.calendars[calendarId].busy.length === 0;\n}"
          }
        },
        {
          "id": "book-step-3",
          "number": "03",
          "title": "Parsing Natural Language Dates",
          "subtitle": "Translating 'kesho asubuhi' into ISO strings",
          "status": "locked",
          "duration": "35 min",
          "category": "Data Extraction",
          "summary": "Use AI to convert casual time expressions and local slang into strict date/time formats for API scheduling.",
          "isGated": false,
          "content": {
            "overview": "Clients don't say '2026-08-20T09:00:00Z'. They say 'tomorrow morning', 'next week Tuesday', or 'kesho asubuhi'. You'll build a prompt that reliably parses these expressions into standardized machine-readable timestamps.",
            "keyLearnings": [
              "Handling timezone awareness (EAT / UTC+3)",
              "Prompting the LLM to output strict JSON dates from casual text",
              "Dealing with ambiguous time requests like 'afternoon'"
            ],
            "testCase": {
              "input": "Can I get my hair done kesho around 2pm?",
              "expectedOutput": "{\"date\": \"2026-08-20\", \"time\": \"14:00:00\", \"timezone\": \"Africa/Nairobi\"}"
            }
          }
        },
        {
          "id": "book-step-4",
          "number": "04",
          "title": "Multi-Staff Resource Management",
          "subtitle": "Routing bookings to the right calendar",
          "status": "locked",
          "duration": "40 min",
          "category": "Architecture",
          "summary": "Expand your system to handle multiple stylists, doctors, or technicians simultaneously.",
          "isGated": false,
          "content": {
            "overview": "A real salon has multiple staff members with overlapping schedules. We'll upgrade our calendar logic to query a resource array, finding the first available staff member or routing the client to their requested favorite.",
            "keyLearnings": [
              "Mapping WhatsApp options to specific employee calendar IDs",
              "Querying multiple calendars simultaneously in a single API call",
              "Handling fallback logic when a specific staff member is booked"
            ]
          }
        },
        {
          "id": "book-step-5",
          "number": "05",
          "title": "The Core Booking Prompt",
          "subtitle": "Tuning the persona for hospitality",
          "status": "locked",
          "duration": "35 min",
          "category": "Prompt Design",
          "summary": "Craft the system prompt that ensures the AI stays polite, focused on booking, and doesn't get distracted.",
          "isGated": false,
          "content": {
            "overview": "You will design the core AI persona for a Kenyan service business. The agent must warmly greet customers, offer available slots concisely, and refuse to answer questions unrelated to the business.",
            "keyLearnings": [
              "Writing constraint-heavy system prompts",
              "Injecting business hours and service menus into the context",
              "Maintaining professional Swahili/English code-switching"
            ],
            "samplePrompt": "You are a booking assistant for [Your Client's Salon Name] in Nairobi.\nAlways be polite and use greetings like 'Karibu'.\nOnly offer times within our business hours (Tue-Sun, 9AM-6PM).\nIf a user asks about something other than our services, politely guide them back to booking.\nFormat available times as a bulleted list using WhatsApp markdown."
          }
        },
        {
          "id": "book-step-6",
          "number": "06",
          "title": "Preventing Double Bookings",
          "subtitle": "Handling race conditions in live scheduling",
          "status": "locked",
          "duration": "50 min",
          "category": "Logic",
          "summary": "Implement robust locking and verification steps to ensure two users cannot book the same slot simultaneously.",
          "isGated": true,
          "content": {
            "overview": "Concurrency is the enemy of scheduling. We will build a pre-confirmation check that re-verifies calendar availability at the exact moment the user says 'yes', preventing overlapping appointments during peak hours.",
            "keyLearnings": [
              "Understanding race conditions in asynchronous booking",
              "Implementing a final availability check before calendar insertion",
              "Drafting graceful apology messages when a slot is lost"
            ]
          }
        },
        {
          "id": "book-step-7",
          "number": "07",
          "title": "M-Pesa Booking Deposits",
          "subtitle": "Securing appointments with partial payments",
          "status": "locked",
          "duration": "55 min",
          "category": "Payments",
          "summary": "Integrate Safaricom Daraja API to request a commitment deposit before confirming the calendar slot.",
          "isGated": true,
          "content": {
            "overview": "To drastically reduce no-shows, many Kenyan businesses require a deposit. You will trigger an M-Pesa STK push for a KES 500 deposit and only create the Google Calendar event once the payment callback succeeds.",
            "keyLearnings": [
              "Triggering M-Pesa STK Push from a WhatsApp flow",
              "Listening for Daraja API payment callbacks",
              "Holding a slot temporarily (pending state) while awaiting payment"
            ]
          }
        },
        {
          "id": "book-step-8",
          "number": "08",
          "title": "Automated Reminder Sequences",
          "subtitle": "Cutting no-shows with timely alerts",
          "status": "locked",
          "duration": "40 min",
          "category": "Automation",
          "summary": "Build a background job that automatically sends WhatsApp reminders 24 hours and 2 hours before the appointment.",
          "isGated": true,
          "content": {
            "overview": "A booked appointment isn't revenue until the client walks in. We'll set up a cron job that reads upcoming Google Calendar events and fires off automated WhatsApp reminders with confirmation buttons.",
            "keyLearnings": [
              "Querying upcoming calendar events programmatically",
              "Scheduling recurring background jobs with Node.js/Cron",
              "Using WhatsApp message templates for proactive outreach"
            ]
          }
        },
        {
          "id": "book-step-9",
          "number": "09",
          "title": "Cancellations & Rescheduling",
          "subtitle": "Handling changes without manual intervention",
          "status": "locked",
          "duration": "45 min",
          "category": "Operations",
          "summary": "Empower the AI to cancel or move appointments, automatically freeing up calendar space.",
          "isGated": true,
          "content": {
            "overview": "When a client texts 'I need to cancel', the AI shouldn't just say 'okay'—it needs to actually delete the event from Google Calendar so another client can book it. You'll build the logic to identify existing user appointments and modify them.",
            "keyLearnings": [
              "Retrieving a user's existing calendar events by phone number",
              "Using the Calendar API to delete or patch events",
              "Automating waitlist notifications when a premium slot opens up"
            ]
          }
        },
        {
          "id": "book-step-10",
          "number": "10",
          "title": "Advanced Prompt Engineering for Edge Cases",
          "subtitle": "Keeping the bot on track",
          "status": "locked",
          "duration": "50 min",
          "category": "Prompt Engineering",
          "summary": "Master strict JSON extraction and constraint enforcement to handle difficult customers and complex requests.",
          "isGated": true,
          "content": {
            "overview": "What happens when a client asks for a haircut at midnight, or requests a service you don't offer? This lesson dives deep into prompt engineering techniques that force the LLM to gracefully reject impossible requests and return precise JSON payloads for the backend.",
            "keyLearnings": [
              "Extracting structured JSON payloads for API consumption",
              "Handling multi-service requests (e.g., 'nails and hair')",
              "Writing negative constraints against inventing unavailable times"
            ],
            "samplePrompt": "You are the scheduling agent. If the user requests a time outside of our operating hours (9 AM - 6 PM), you MUST decline and suggest the closest available slots. Extract the finalized appointment details strictly in this JSON format: {\"action\": \"book\", \"service\": \"string\", \"time\": \"ISO-8601\"}. Do not include markdown around the JSON."
          }
        },
        {
          "id": "book-step-11",
          "number": "11",
          "title": "Calendar Utilization Analytics",
          "subtitle": "Giving owners visibility into business performance",
          "status": "locked",
          "duration": "30 min",
          "category": "Reporting",
          "summary": "Generate weekly utilization summaries so the business owner knows their busiest days and top staff.",
          "isGated": true,
          "content": {
            "overview": "A good automation system doesn't just run; it reports. You'll create a simple script that aggregates completed calendar events and sends a weekly WhatsApp summary to the owner, highlighting no-show rates and peak booking hours.",
            "keyLearnings": [
              "Aggregating calendar data for business insights",
              "Calculating no-show vs. completion rates",
              "Formatting clean, actionable reporting messages"
            ]
          }
        },
        {
          "id": "book-step-12",
          "number": "12",
          "title": "Verified Portfolio Deployment",
          "subtitle": "Launching your real-world scheduling agent",
          "status": "locked",
          "duration": "45 min",
          "category": "Deployment",
          "summary": "Deploy your booking agent to a live WhatsApp number and verify it with a real Kenyan service business.",
          "isGated": true,
          "content": {
            "overview": "It's time to go live. You will connect your fully functioning booking bot to a live WhatsApp Business number, hook it up to a real Google Calendar, and have a local salon or clinic owner test it. Complete this to earn your Verified Portfolio status.",
            "keyLearnings": [
              "Deploying the Node.js webhook securely to production",
              "Finalizing the WhatsApp Cloud API webhook connection",
              "Recording a live demo and capturing the owner's verification quote"
            ]
          }
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
    totalSteps: 10,
    completedSteps: 0,
    description: 'Build an agent that turns a business owner\'s voice notes into ready-to-post captions for Instagram and Facebook, scheduled automatically around real engagement patterns.',
    badgeTitle: 'Verified Marketing Automation Specialist',
    price: 2999,
    rating: 4.7,
    reviewCount: 2,
    tags: ['Content Generation', 'Post Scheduling', 'Voice-to-Caption'],
    whoBuysThis: 'Small brands, boutiques, and local businesses',
    impactStat: 'Kenyan SMEs are shifting from rented social platforms to owned, automated systems',
    featuredOnHomepage: true,
    steps: [
        {
          "id": "soc-step-1",
          "number": "01",
          "title": "Voice Note Transcription Foundation",
          "subtitle": "Processing raw owner ideas via audio",
          "status": "locked",
          "duration": "30 min",
          "category": "Architecture",
          "summary": "Building the intake pipeline to receive an audio message and convert it to clean text using the Whisper API.",
          "isGated": false,
          "content": {
            "overview": "Business owners are busy; they prefer speaking over typing. In this lesson, we capture incoming audio notes and use OpenAI's Whisper API to transcribe them accurately, accounting for local accents and background noise.",
            "keyLearnings": [
              "Handling audio file ingestion from webhooks",
              "Calling the Whisper API for accurate voice-to-text",
              "Pre-processing audio for better transcription results"
            ]
          }
        },
        {
          "id": "soc-step-2",
          "number": "02",
          "title": "The Caption Generation Engine",
          "subtitle": "From raw transcript to engaging copy",
          "status": "locked",
          "duration": "35 min",
          "category": "Content Engine",
          "summary": "Using LLMs to turn a raw, unedited voice transcript into a structured, engaging social media caption.",
          "isGated": false,
          "content": {
            "overview": "We will write a system prompt that transforms a rough voice transcription into a polished caption. We'll enforce a specific brand voice, ensuring prices are listed in KES and the tone matches a local boutique.",
            "keyLearnings": [
              "Prompt engineering for tone matching and brand voice",
              "Extracting prices and product details from unstructured speech",
              "Formatting output safely without markdown hallucinations"
            ],
            "samplePrompt": "You are a social media copywriter for a trendy Nairobi boutique. Take the raw voice transcript and write an Instagram caption. Keep it under 4 sentences. Include relevant emojis, format prices clearly in KES, and end with a call to action to visit the store or WhatsApp to order."
          }
        },
        {
          "id": "soc-step-3",
          "number": "03",
          "title": "Multi-Platform Adaptation",
          "subtitle": "One voice note, multiple channel formats",
          "status": "locked",
          "duration": "25 min",
          "category": "Prompt Design",
          "summary": "Adapting the generated content for different platforms—differentiating a visual Instagram caption from a conversational Facebook Page post.",
          "isGated": false,
          "content": {
            "overview": "Different platforms require different copy structures. We will extend our prompt engine to return a JSON payload with platform-specific variations: a hashtag-heavy Instagram version and a link-focused Facebook version.",
            "keyLearnings": [
              "Structuring LLM outputs into strictly typed JSON",
              "Adapting tone and length per social media platform",
              "Generating platform-specific calls-to-action"
            ]
          }
        },
        {
          "id": "soc-step-4",
          "number": "04",
          "title": "Meta Graph API Authentication",
          "subtitle": "Connecting the business accounts securely",
          "status": "locked",
          "duration": "45 min",
          "category": "Integrations",
          "summary": "Navigating Meta's OAuth flow to connect an Instagram Professional account and Facebook Page for API publishing.",
          "isGated": false,
          "content": {
            "overview": "To publish automatically, we need the right permissions. This lesson covers setting up a Meta App, authenticating a business account, and generating the required long-lived access tokens for seamless background posting.",
            "keyLearnings": [
              "Understanding Meta App Review and required permissions",
              "Linking Instagram Professional accounts to Facebook Pages",
              "Generating and securing long-lived access tokens"
            ]
          }
        },
        {
          "id": "soc-step-5",
          "number": "05",
          "title": "Media Handling & Public URLs",
          "subtitle": "Preparing images for Meta's servers",
          "status": "locked",
          "duration": "30 min",
          "category": "Media Engine",
          "summary": "Processing product images and ensuring they are hosted on publicly accessible URLs required by the Instagram API.",
          "isGated": false,
          "content": {
            "overview": "The Instagram Graph API cannot accept direct file uploads; it requires a public URL to fetch the image. We will build a pipeline to temporarily host uploaded product photos and pass the correct URL format to the API.",
            "keyLearnings": [
              "Hosting media securely for API access",
              "Validating image aspect ratios and formats for Instagram",
              "Handling temporary presigned URLs for privacy"
            ]
          }
        },
        {
          "id": "soc-step-6",
          "number": "06",
          "title": "The 2-Step Publishing Pipeline",
          "subtitle": "Creating containers and pushing to feed",
          "status": "locked",
          "duration": "50 min",
          "category": "Backend Dev",
          "summary": "Implementing the core Instagram Graph API logic: creating a media container and executing the publish command.",
          "isGated": true,
          "content": {
            "overview": "In this core lesson, you will build the actual posting logic. Meta requires a two-step process: first, creating a media container with the image URL and caption, and second, triggering the publish endpoint once the container is ready.",
            "keyLearnings": [
              "Executing the POST request to /{ig-user-id}/media",
              "Capturing the creation_id container reference",
              "Publishing the container to the live Instagram feed",
              "Handling Meta API error codes and rate limits gracefully"
            ],
            "codeSnippet": "export async function publishToInstagram(igUserId: string, imageUrl: string, caption: string, token: string) {\n  // Step 1: Create Container\n  const containerRes = await fetch(`https://graph.facebook.com/v22.0/${igUserId}/media`, {\n    method: 'POST',\n    body: new URLSearchParams({ image_url: imageUrl, caption, access_token: token })\n  });\n  const { id: creationId } = await containerRes.json();\n\n  // Step 2: Publish\n  const publishRes = await fetch(`https://graph.facebook.com/v22.0/${igUserId}/media_publish`, {\n    method: 'POST',\n    body: new URLSearchParams({ creation_id: creationId, access_token: token })\n  });\n  return publishRes.json();\n}"
          }
        },
        {
          "id": "soc-step-7",
          "number": "07",
          "title": "Building the Scheduling Logic",
          "subtitle": "Automating the timing of posts",
          "status": "locked",
          "duration": "45 min",
          "category": "Automation",
          "summary": "Moving away from instant publishing by building a background scheduler to post content at optimal engagement times.",
          "isGated": true,
          "content": {
            "overview": "Because the Instagram API doesn't have a native 'schedule for later' endpoint, we must build our own. We will store approved captions and image URLs in a database with a target timestamp, then use a cron job to trigger the publish pipeline.",
            "keyLearnings": [
              "Storing scheduled post metadata and target timestamps",
              "Writing a reliable background worker or cron job",
              "Ensuring idempotent operations so posts don't duplicate"
            ]
          }
        },
        {
          "id": "soc-step-8",
          "number": "08",
          "title": "Hashtag & Visual Suggestion",
          "subtitle": "Enriching the post metadata automatically",
          "status": "locked",
          "duration": "35 min",
          "category": "Content Gen",
          "summary": "Using AI to automatically recommend locally trending hashtags and visual directions based on the generated caption.",
          "isGated": true,
          "content": {
            "overview": "A good post needs discoverability. We will add a pipeline step that reads the drafted caption and suggests relevant Kenyan hashtags (e.g., #NairobiFashion, #MadeInKenya) and prompts the owner on what kind of photo would match the text best.",
            "keyLearnings": [
              "Generating contextual hashtag clusters",
              "Avoiding banned or overused spam tags",
              "Prompting the business owner for the correct media type"
            ],
            "testCase": {
              "input": "Transcript: 'Just got the new leather tote bags in, selling them for 4500 shillings. Really great quality for office wear.'",
              "expectedOutput": "{\"caption\": \"Upgrade your office look! ✨ New premium leather tote bags just landed in store. Only KES 4,500. DM or WhatsApp to reserve yours before they sell out!\", \"hashtags\": [\"#NairobiFashion\", \"#KenyanLeather\", \"#OfficeWearNairobi\"], \"visual_suggestion\": \"A well-lit photo of the tote bag resting on an office desk next to a laptop.\"}"
            }
          }
        },
        {
          "id": "soc-step-9",
          "number": "09",
          "title": "Analytics & Content Calendar",
          "subtitle": "Giving the owner a clear view of their strategy",
          "status": "locked",
          "duration": "40 min",
          "category": "Reporting",
          "summary": "Fetching basic engagement metrics from the API and organizing scheduled posts into a readable calendar view.",
          "isGated": true,
          "content": {
            "overview": "An automation tool is only useful if the owner trusts it. We will build a simple dashboard view that lists upcoming scheduled posts and pulls basic engagement metrics (likes, comments) for previously published content using the Graph API.",
            "keyLearnings": [
              "Querying the Instagram API for post-level insights",
              "Displaying upcoming database records in a calendar format",
              "Aggregating engagement data to inform future content"
            ]
          }
        },
        {
          "id": "soc-step-10",
          "number": "10",
          "title": "Verified Portfolio Deployment",
          "subtitle": "Going live for a real local boutique",
          "status": "locked",
          "duration": "60 min",
          "category": "Deployment",
          "summary": "Deploying the full voice-to-caption scheduling agent for an actual business, verifying a successful automated post, and securing your portfolio proof.",
          "isGated": true,
          "content": {
            "overview": "This is where you prove your system works in the real world. You will deploy the scheduling agent for a real local boutique or brand, configure their Meta credentials, and verify a live automated post pipeline. You walk away with a live link and a verified quote from the owner.",
            "keyLearnings": [
              "Handling production environment variables and security",
              "Onboarding a real business owner onto the Meta authentication flow",
              "Capturing the successful deployment for your verified portfolio"
            ]
          }
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
    totalSteps: 12,
    completedSteps: 0,
    description: 'Build an agent that watches stock levels in real time, predicts when a Kenyan SME will run out based on real sales velocity, and messages the supplier to reorder before shelves go empty.',
    badgeTitle: 'Verified Supply Chain Automation Engineer',
    price: 4999,
    rating: 4.8,
    reviewCount: 7,
    tags: ['Stock Forecasting', 'Supplier Messaging', 'Reorder Triggers'],
    whoBuysThis: 'Retailers, distributors, and small manufacturers',
    impactStat: 'Better demand forecasting means shops stock what actually sells, not what they guess',
    steps: [
        {
          "id": "inv2-step-1",
          "number": "01",
          "title": "Sales Velocity & Stockout Prediction",
          "subtitle": "Moving beyond flat reorder thresholds",
          "status": "locked",
          "duration": "35 min",
          "category": "Forecasting",
          "summary": "Calculate dynamic sales velocity based on rolling averages and predict exact stockout dates for fast-moving items.",
          "isGated": false,
          "content": {
            "overview": "Abandon the arbitrary 'reorder when stock hits 10' rule. In this lesson, you'll build a rolling-average sales velocity calculator that adapts to recent trends and predicts precise stockout dates.",
            "keyLearnings": [
              "Calculating 7-day and 30-day rolling sales averages",
              "Predicting stockout dates using current inventory divided by sales velocity",
              "Accounting for supplier lead time in the replenishment formula"
            ]
          }
        },
        {
          "id": "inv2-step-2",
          "number": "02",
          "title": "Automated Supplier Reorder Messaging",
          "subtitle": "Programmatic restock alerts",
          "status": "locked",
          "duration": "30 min",
          "category": "Automation",
          "summary": "Trigger templated reorder messages to suppliers instantly when a SKU hits its dynamic reorder point.",
          "isGated": false,
          "content": {
            "overview": "Connect your forecasting engine to the WhatsApp Cloud API. When stock hits the critical threshold, automatically send a formatted restock request to your supplier with exact SKU quantities.",
            "keyLearnings": [
              "Triggering events based on dynamic stock thresholds",
              "Formatting WhatsApp Cloud API Template Messages for B2B",
              "Including SKU, Quantity, and requested delivery date in outbound payloads"
            ]
          }
        },
        {
          "id": "inv2-step-3",
          "number": "03",
          "title": "Incorporating Supplier Lead Times",
          "subtitle": "Accounting for delivery delays",
          "status": "locked",
          "duration": "25 min",
          "category": "Supply Chain",
          "summary": "Adjust your reorder logic by baking in historical supplier lead times to prevent stockouts during transit.",
          "isGated": false,
          "content": {
            "overview": "A supplier taking 4 days instead of 2 changes everything. We'll add lead time data to our forecasting engine to ensure we reorder before the critical window, keeping shelves stocked.",
            "keyLearnings": [
              "Storing and updating average supplier delivery days",
              "Calculating Lead Time Demand (Sales Velocity × Lead Time)",
              "Establishing Safety Stock buffers for unreliable vendors"
            ]
          }
        },
        {
          "id": "inv2-step-4",
          "number": "04",
          "title": "Seasonal Demand & Trend Adjustments",
          "subtitle": "Tuning forecasts for peaks and dips",
          "status": "locked",
          "duration": "40 min",
          "category": "Forecasting",
          "summary": "Adapt the baseline forecasting model to account for seasonal spikes, holidays, or sudden trend shifts in the market.",
          "isGated": false,
          "content": {
            "overview": "Learn to inject a seasonality multiplier into your forecast. This ensures you don't under-order during peak seasons (like holidays) or over-order immediately after the rush ends.",
            "keyLearnings": [
              "Applying seasonality indexes to base sales velocity",
              "Smoothing outliers from viral sales events",
              "Using moving averages for short-term trend detection"
            ],
            "codeSnippet": "export function calculateAdjustedVelocity(baseVelocity: number, seasonalIndex: number, trendMultiplier: number) {\n  // Smooths out spikes while respecting the overall trend direction\n  const adjusted = baseVelocity * seasonalIndex * trendMultiplier;\n  return Math.max(adjusted, 1); // Never project zero sales if item is active\n}"
          }
        },
        {
          "id": "inv2-step-5",
          "number": "05",
          "title": "Dead-Stock & Slow-Mover Detection",
          "subtitle": "Freeing up trapped capital",
          "status": "locked",
          "duration": "30 min",
          "category": "Analytics",
          "summary": "Identify inventory that isn't moving, flagging slow-moving SKUs so you can liquidate and reallocate budget.",
          "isGated": false,
          "content": {
            "overview": "Capital tied up in dust-gathering products is a killer for SMEs. We build an analyzer that flags items with zero movement over 60 days, triggering liquidation alerts before they become dead stock.",
            "keyLearnings": [
              "Defining aging criteria (30, 60, 90 days without sales)",
              "Generating slow-mover alerts for the business owner",
              "Prioritizing capital reallocation to fast-moving SKUs"
            ]
          }
        },
        {
          "id": "inv2-step-6",
          "number": "06",
          "title": "Multi-Supplier & Multi-SKU Prioritization",
          "subtitle": "Routing orders when budget is limited",
          "status": "locked",
          "duration": "45 min",
          "category": "Logic",
          "summary": "Build a decision engine that prioritizes reordering high-margin SKUs from the most reliable suppliers when cash is tight.",
          "isGated": true,
          "content": {
            "overview": "If you only have KES 50,000 for restocking but need KES 80,000 in goods, what do you order? We'll create logic that prioritizes high-margin, fast-velocity items and routes the orders to the suppliers with the best terms.",
            "keyLearnings": [
              "Ranking products by Gross Margin Return on Investment (GMROI)",
              "Dynamic supplier routing based on pricing and reliability",
              "Creating budget-constrained cart payloads"
            ],
            "testCase": {
              "input": "Available Budget: KES 30,000. Needed: SKU_A (Margin 40%, Velocity 5/day, KES 20k), SKU_B (Margin 15%, Velocity 2/day, KES 20k).",
              "expectedOutput": "Order Generation: Allocate KES 20,000 to SKU_A (High Priority). Allocate remaining KES 10,000 to SKU_B (Partial Restock)."
            }
          }
        },
        {
          "id": "inv2-step-7",
          "number": "07",
          "title": "Building the Supplier Chatbot Agent",
          "subtitle": "LLMs for vendor negotiations",
          "status": "locked",
          "duration": "50 min",
          "category": "Prompt Engineering",
          "summary": "Design the core system prompt that enables your AI agent to negotiate quantities, handle out-of-stock replies from vendors, and confirm delivery schedules.",
          "isGated": true,
          "content": {
            "overview": "When a supplier replies 'We only have 20 units left', your agent needs to understand and adjust. We'll use Gemini to interpret unstructured supplier WhatsApp replies and update the internal order state.",
            "keyLearnings": [
              "Structuring system prompts for B2B negotiation and context awareness",
              "Extracting adjusted quantities and dates from unstructured vendor text",
              "Enforcing polite but firm tone constraints suitable for suppliers"
            ],
            "samplePrompt": "You are a procurement assistant for a Nairobi hardware store. A supplier has responded to your restock request.\nExtract the confirmed quantities and delivery dates.\n- If a requested item is out of stock, ask when the next shipment arrives.\n- If they offer a partial quantity, accept it and output JSON: [{\"sku\": \"...\", \"confirmedQty\": 10}]\n- Maintain a professional, concise tone. Do not make small talk."
          }
        },
        {
          "id": "inv2-step-8",
          "number": "08",
          "title": "Handling Supplier Non-Response Escalation",
          "subtitle": "Never let an order stall",
          "status": "locked",
          "duration": "35 min",
          "category": "Flow Design",
          "summary": "Implement a timeout and escalation flow if a supplier ignores the restock request, routing to alternatives or human managers.",
          "isGated": true,
          "content": {
            "overview": "Suppliers don't always reply immediately. We build an escalation sequence: a 24-hour reminder, 48-hour routing to an alternate supplier, and an alert to the owner. This ensures procurement never stalls silently.",
            "keyLearnings": [
              "Setting up scheduled delays and webhooks for check-ins",
              "Routing orders to backup vendors dynamically when primary fails",
              "Alerting human managers when all automated paths are exhausted"
            ]
          }
        },
        {
          "id": "inv2-step-9",
          "number": "09",
          "title": "M-Pesa Supplier Payment Prep (B2B)",
          "subtitle": "Streamlining vendor settlement",
          "status": "locked",
          "duration": "45 min",
          "category": "Payments",
          "summary": "Format and prep Safaricom Daraja B2B Paybill payloads once a supplier confirms an order, readying it for human approval.",
          "isGated": true,
          "content": {
            "overview": "Once the vendor confirms the delivery schedule and total price, the agent prepares the exact M-Pesa Paybill payload. A human manager just clicks 'Approve' to release the funds, securely merging communication and finance.",
            "keyLearnings": [
              "Understanding Safaricom Daraja B2B API requirements",
              "Generating structured payment approval summaries for management",
              "Validating vendor Paybill numbers and expected totals"
            ],
            "codeSnippet": "export function formatDarajaB2BRequest(paybill: string, accountNo: string, amount: number) {\n  return {\n    Initiator: \"procurement_agent\",\n    CommandID: \"BusinessPayBill\",\n    PartyA: process.env.SHORTCODE,\n    PartyB: paybill,\n    AccountReference: accountNo,\n    Amount: amount,\n    Remarks: \"Restock payment approved via automated agent\"\n  };\n}"
          }
        },
        {
          "id": "inv2-step-10",
          "number": "10",
          "title": "Owner-Facing Inventory Health Dashboard",
          "subtitle": "Visualizing supply chain status",
          "status": "locked",
          "duration": "40 min",
          "category": "Reporting",
          "summary": "Roll up velocity, stockouts, and pending orders into a clear, single-view dashboard for the business owner.",
          "isGated": true,
          "content": {
            "overview": "The agent does the heavy lifting, but the owner needs oversight. We'll structure the data to populate a simple dashboard showing critical alerts, pending deliveries, and capital trapped in dead stock.",
            "keyLearnings": [
              "Aggregating inventory metrics into summary objects",
              "Designing intuitive status indicators (Red for stockouts, Green for healthy)",
              "Structuring JSON payloads for frontend dashboard ingestion"
            ]
          }
        },
        {
          "id": "inv2-step-11",
          "number": "11",
          "title": "Edge Cases: Damaged Goods & Returns",
          "subtitle": "Handling reality on the ground",
          "status": "locked",
          "duration": "30 min",
          "category": "Operations",
          "summary": "Add logic for logging damaged deliveries and automatically requesting credit notes from suppliers via WhatsApp.",
          "isGated": true,
          "content": {
            "overview": "When a delivery arrives with broken items, the inventory count drops. We'll build a flow where the staff inputs the damage count, and the agent automatically messages the supplier requesting a credit note.",
            "keyLearnings": [
              "Adjusting received inventory versus ordered inventory",
              "Automating credit note request formatting via Meta Graph API",
              "Tracking pending supplier credits in the database"
            ]
          }
        },
        {
          "id": "inv2-step-12",
          "number": "12",
          "title": "Verified Portfolio Deployment",
          "subtitle": "Launching your live procurement engine",
          "status": "locked",
          "duration": "60 min",
          "category": "Deployment",
          "summary": "Connect your fully tested agent to a live WhatsApp Business number, run a real supplier interaction, and secure your verified portfolio link.",
          "isGated": true,
          "content": {
            "overview": "It's time to go live. You will deploy the application, integrate it with a test supplier number, process a simulated restock cycle end-to-end, and generate your verified portfolio link complete with a demo.",
            "keyLearnings": [
              "End-to-end production testing of the restock agent",
              "Live deployment and webhook configuration for Meta and M-Pesa",
              "Generating your verified portfolio artifact demonstrating a working system"
            ]
          }
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
    totalSteps: 12,
    completedSteps: 0,
    description: 'Build an agent that screens incoming job applications against a role\'s actual requirements, ranks candidates fairly, and messages shortlisted applicants to schedule an interview.',
    badgeTitle: 'Verified HR Automation Specialist',
    price: 2999,
    rating: 4.9,
    reviewCount: 3,
    tags: ['Resume Parsing', 'Candidate Ranking', 'Interview Scheduling'],
    whoBuysThis: 'Growing SMEs that hire regularly',
    impactStat: 'Automated screening reads every CV the same way, so no candidate gets missed in the pile',
    steps: [
        {
          "id": "hr-step-1",
          "number": "01",
          "title": "Structured Resume Parsing",
          "subtitle": "From messy PDFs to clean JSON",
          "status": "locked",
          "duration": "35 min",
          "category": "Data Extraction",
          "summary": "Learn how to use AI to reliably extract structured candidate information from unstructured CV PDFs and Word documents.",
          "isGated": false,
          "content": {
            "overview": "Resume parsing is the foundation of any HR agent. In this lesson, you build a pipeline to extract raw text from candidate CVs and use an LLM to map that text into a standardized JSON schema representing their skills, experience, and education.",
            "keyLearnings": [
              "Extracting clean text from PDF and Word documents using Python libraries",
              "Defining a strict Pydantic JSON schema for candidate profiles",
              "Handling missing data gracefully when a candidate's CV is incomplete"
            ]
          }
        },
        {
          "id": "hr-step-2",
          "number": "02",
          "title": "Defining the Job Profile",
          "subtitle": "Translating JD requirements into logic",
          "status": "locked",
          "duration": "30 min",
          "category": "Architecture",
          "summary": "Convert a standard job description into explicit, measurable criteria for the AI to score against.",
          "isGated": false,
          "content": {
            "overview": "To evaluate candidates fairly, the AI needs strict rules. You'll translate an unstructured job description into a clear set of weighted requirements, ensuring the agent evaluates exactly what the SME owner needs.",
            "keyLearnings": [
              "Deconstructing a Job Description (JD) into mandatory and nice-to-have skills",
              "Assigning numerical weights to different qualifications",
              "Setting up the baseline for bias-free objective ranking"
            ]
          }
        },
        {
          "id": "hr-step-3",
          "number": "03",
          "title": "Kenyan HR Context & Nuance",
          "subtitle": "Localizing the parsing engine",
          "status": "locked",
          "duration": "35 min",
          "category": "Data Processing",
          "summary": "Train the parser to correctly interpret local job titles, Kenyan university acronyms, and regional experience.",
          "isGated": false,
          "content": {
            "overview": "A generic AI might misunderstand local context. You'll configure the agent to recognize Kenyan institutions (like JKUAT or UoN), local tools (M-Pesa integrations, KRA iTax), and regional slang in job titles so no qualified candidate is skipped.",
            "keyLearnings": [
              "Building a custom dictionary of Kenyan universities and common certifications",
              "Mapping local job titles to standard roles",
              "Configuring the LLM to understand Nairobi-specific geography for commute considerations"
            ]
          }
        },
        {
          "id": "hr-step-4",
          "number": "04",
          "title": "Bias-Aware Candidate Scoring",
          "subtitle": "Scoring explicitly, not implicitly",
          "status": "locked",
          "duration": "40 min",
          "category": "Flow Design",
          "summary": "Design prompts that force the LLM to justify its scores based solely on explicit CV evidence.",
          "isGated": false,
          "content": {
            "overview": "AI hiring tools can introduce bias if not carefully constrained. In this lesson, you write system prompts that strictly map CV facts against the rubric and prevent the model from hallucinating or inferring skills based on unrelated factors.",
            "keyLearnings": [
              "Writing negative constraints to prevent bias on name, age, or gender",
              "Forcing the AI to quote the CV snippet that justifies its score",
              "Creating a multi-tier categorization: Shortlist, Maybe, and Reject"
            ]
          }
        },
        {
          "id": "hr-step-5",
          "number": "05",
          "title": "Respectful Rejection Messaging",
          "subtitle": "Protecting the employer's brand",
          "status": "locked",
          "duration": "25 min",
          "category": "Content Engine",
          "summary": "Generate polite, brand-aligned decline emails that provide standard feedback without discouraging candidates.",
          "isGated": false,
          "content": {
            "overview": "Applicant experience matters, even for rejected candidates. You'll build a module that drafts professional, empathetic rejection messages tailored to the missing requirements, maintaining the hiring company's good reputation.",
            "keyLearnings": [
              "Calibrating a polite, professional, and empathetic tone",
              "Using the AI's scoring justification to provide constructive feedback",
              "Formatting clean, standard emails for bulk dispatch"
            ]
          }
        },
        {
          "id": "hr-step-6",
          "number": "06",
          "title": "LLM Structured Outputs for Resumes",
          "subtitle": "Guaranteeing schema adherence",
          "status": "locked",
          "duration": "45 min",
          "category": "API Integrations",
          "summary": "Use Gemini or OpenAI API structured output features to ensure the extracted candidate data never breaks your app.",
          "isGated": true,
          "content": {
            "overview": "Relying on standard text generation for data extraction often fails. You'll implement API-level structured JSON modes to force the LLM to return exactly the nested schema required for your ranking logic.",
            "keyLearnings": [
              "Implementing JSON Schema enforcement via the Gemini/OpenAI API",
              "Handling API errors and retry logic for unparseable documents",
              "Validating the extracted payload before passing it to the scoring engine"
            ],
            "samplePrompt": "You are an objective HR assistant. Extract the candidate's details from the provided text. Return ONLY valid JSON matching this schema:\n{\n  \"name\": \"string\",\n  \"years_experience\": \"number\",\n  \"skills\": [\"string\"],\n  \"education\": [{\"degree\": \"string\", \"institution\": \"string\"}]\n}\nDo not guess or infer missing data; leave it null.",
            "codeSnippet": "const completion = await openai.chat.completions.create({\n  model: \"gpt-4o\",\n  messages: [{ role: \"system\", content: prompt }, { role: \"user\", content: cvText }],\n  response_format: { type: \"json_object\" },\n});\nconst candidateData = JSON.parse(completion.choices[0].message.content);",
            "testCase": {
              "input": "My name is John Doe. I worked at Safaricom as a DevOps engineer for 4 years, focusing on AWS and Kubernetes. I hold a BSc in Computer Science from Strathmore University.",
              "expectedOutput": "{\n  \"name\": \"John Doe\",\n  \"years_experience\": 4,\n  \"skills\": [\"AWS\", \"Kubernetes\", \"DevOps\"],\n  \"education\": [{\"degree\": \"BSc Computer Science\", \"institution\": \"Strathmore University\"}]\n}"
            }
          }
        },
        {
          "id": "hr-step-7",
          "number": "07",
          "title": "Handling High Applicant Volume",
          "subtitle": "Managing webhooks and queues",
          "status": "locked",
          "duration": "50 min",
          "category": "Architecture",
          "summary": "Process bulk applications securely using webhooks and queueing so your system doesn't crash under load.",
          "isGated": true,
          "content": {
            "overview": "A single job post on BrighterMonday can yield 500+ CVs overnight. You'll build a resilient webhook ingestion pipeline that queues incoming applications and processes them asynchronously to respect API rate limits.",
            "keyLearnings": [
              "Setting up a webhook endpoint to receive applications from Google Forms or ATS",
              "Implementing a simple background queue for processing",
              "Handling API rate limits and exponential backoff"
            ]
          }
        },
        {
          "id": "hr-step-8",
          "number": "08",
          "title": "Human-in-the-Loop Handoff",
          "subtitle": "Keeping managers in control",
          "status": "locked",
          "duration": "35 min",
          "category": "Operations",
          "summary": "Notify the hiring manager with a concise summary before any automated rejections or bookings occur.",
          "isGated": true,
          "content": {
            "overview": "AI shouldn't hire or fire in a vacuum. You'll build a Slack or WhatsApp notification flow that sends the hiring manager a summary of scored candidates, allowing them to explicitly approve the shortlist and reject list before the system takes action.",
            "keyLearnings": [
              "Formatting an easy-to-read candidate summary card for WhatsApp",
              "Building interactive approval buttons or keyword replies (e.g., 'APPROVE ALL')",
              "Ensuring no candidate is permanently rejected without a human sign-off"
            ]
          }
        },
        {
          "id": "hr-step-9",
          "number": "09",
          "title": "WhatsApp Interview Scheduling",
          "subtitle": "Automating candidate outreach",
          "status": "locked",
          "duration": "45 min",
          "category": "Automation",
          "summary": "Message shortlisted candidates via the WhatsApp Business API to seamlessly book their interview slots.",
          "isGated": true,
          "content": {
            "overview": "Once the manager approves the shortlist, the agent takes over logistics. You'll integrate the WhatsApp Business API to text approved candidates, offer available calendar slots, and parse their responses to confirm the booking.",
            "keyLearnings": [
              "Using WhatsApp message templates for compliant outbound messaging",
              "Parsing candidate replies to extract preferred dates and times",
              "Handling edge cases like requests for rescheduling or out-of-office hours"
            ],
            "samplePrompt": "You are the scheduling assistant for an HR team. The candidate replied: '{userReply}'. \nAvailable slots: {availableSlots}. \nMatch their preference to the available slots and return the selected time in ISO format. If no match, suggest the next closest time.",
            "codeSnippet": "export async function sendWhatsAppInvite(phone: string, candidateName: string, link: string) {\n  return await whatsapp.messages.create({\n    to: phone,\n    type: 'template',\n    template: {\n      name: 'interview_invite',\n      language: { code: 'en' },\n      components: [\n        { type: 'body', parameters: [{ type: 'text', text: candidateName }, { type: 'text', text: link }] }\n      ]\n    }\n  });\n}"
          }
        },
        {
          "id": "hr-step-10",
          "number": "10",
          "title": "Calendar Sync Integration",
          "subtitle": "Securing the time slots",
          "status": "locked",
          "duration": "35 min",
          "category": "Integrations",
          "summary": "Connect the confirmed WhatsApp slots to Google Calendar API to finalize the booking and generate meeting links.",
          "isGated": true,
          "content": {
            "overview": "After agreeing on a time over WhatsApp, the agent must officially book the meeting. You'll use the Google Calendar API to lock in the time, invite both the manager and candidate, and auto-generate a Google Meet link.",
            "keyLearnings": [
              "Authenticating with the Google Calendar API",
              "Creating events with attendees and automated reminders",
              "Sending the final confirmation message with the meeting link back via WhatsApp"
            ]
          }
        },
        {
          "id": "hr-step-11",
          "number": "11",
          "title": "Hiring Funnel Analytics Dashboard",
          "subtitle": "Visualizing the pipeline",
          "status": "locked",
          "duration": "30 min",
          "category": "Reporting",
          "summary": "Export pipeline states to Google Sheets so the SME owner can track their entire hiring funnel in real time.",
          "isGated": true,
          "content": {
            "overview": "Business owners need visibility. You'll build an integration that logs every candidate's status (Received, Scored, Shortlisted, Scheduled, Rejected) into a live Google Sheet dashboard, giving the employer a clear view of the hiring progress.",
            "keyLearnings": [
              "Writing data sequentially to a Google Sheet using its API",
              "Updating specific row statuses as candidates move through the funnel",
              "Generating basic metrics like 'Time to Hire' and 'Pass Rate'"
            ]
          }
        },
        {
          "id": "hr-step-12",
          "number": "12",
          "title": "Verified Portfolio Deployment",
          "subtitle": "Ship your live HR Screening Agent",
          "status": "locked",
          "duration": "45 min",
          "category": "Deployment",
          "summary": "Deploy the complete end-to-end system and process a dummy application to earn your verified portfolio link.",
          "isGated": true,
          "content": {
            "overview": "It's time to go live. You'll deploy your HR screening pipeline to a production server, submit a test application with a sample CV, and verify the WhatsApp booking flow. Complete this process to receive your shareable portfolio link proving you built a functional HR agent.",
            "keyLearnings": [
              "Deploying the webhook and background workers to a cloud provider",
              "Running an end-to-end test with a dummy CV and phone number",
              "Securing your Verified Portfolio link and live demo"
            ]
          }
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
    totalSteps: 11,
    completedSteps: 0,
    description: 'Build an agent that tracks unpaid invoices, sends a polite escalating sequence of WhatsApp payment reminders with a live M-Pesa link, and flags genuinely stuck accounts for a human to call.',
    badgeTitle: 'Verified Collections Automation Engineer',
    price: 6999,
    rating: 4.7,
    reviewCount: 9,
    tags: ['Escalation Sequencing', 'M-Pesa Payment Links', 'Aging Reports'],
    whoBuysThis: 'Any business that invoices clients',
    impactStat: 'Automated payment reminders close a real, named gap in most SME billing today',
    steps: [
        {
          "id": "col-step-1",
          "number": "01",
          "title": "Overdue Detection & Escalation Sequencing",
          "subtitle": "Triggering the first touchpoint automatically",
          "status": "locked",
          "duration": "30 min",
          "category": "Flow Design",
          "summary": "Mapping out the collection journey from a gentle day-1 reminder to firmer 30-day escalation, ensuring compliance with local standards.",
          "isGated": false,
          "content": {
            "overview": "Before writing code, you need a defined escalation matrix. In this lesson, you map out the transition from a 'friendly nudge' (Day 1-3) to a 'firm reminder' (Day 15) and eventually 'formal notice' (Day 30+), ensuring the AI respects Kenyan data protection and anti-harassment laws.",
            "keyLearnings": [
              "Designing time-based overdue triggers",
              "Understanding Kenyan debt-collection compliance and anti-shaming laws",
              "Mapping variables (invoice amount, due date, customer name) for dynamic injection"
            ]
          }
        },
        {
          "id": "col-step-2",
          "number": "02",
          "title": "WhatsApp Utility Templates for Reminders",
          "subtitle": "Formatting compliant push notifications",
          "status": "locked",
          "duration": "35 min",
          "category": "Messaging",
          "summary": "Crafting Meta-approved Utility templates to initiate outbound payment reminders on WhatsApp.",
          "isGated": false,
          "content": {
            "overview": "WhatsApp requires pre-approved Utility templates to start a conversation with a customer. You'll build and submit non-aggressive, clear reminder templates that include interactive 'Pay Now' buttons, maximizing open and payment rates.",
            "keyLearnings": [
              "Navigating Meta's Business Manager to create Utility templates",
              "Using variables like {{1}} for names and {{2}} for KES amounts",
              "Adding interactive call-to-action (CTA) buttons to templates"
            ],
            "samplePrompt": "Template Body: 'Hi {{1}}, this is a friendly reminder that invoice {{2}} for KES {{3}} was due on {{4}}. Please tap below to view the invoice or pay via M-Pesa. If already settled, kindly ignore this message.'\nButtons: [Pay via M-Pesa] [Talk to Support]"
          }
        },
        {
          "id": "col-step-3",
          "number": "03",
          "title": "Generating Live M-Pesa Payment Links",
          "subtitle": "Frictionless checkout from WhatsApp",
          "status": "locked",
          "duration": "40 min",
          "category": "Integrations",
          "summary": "Connecting Safaricom's Daraja API to generate STK push prompts or M-Pesa payment links directly inside the chat.",
          "isGated": false,
          "content": {
            "overview": "A reminder is only effective if paying is effortless. You'll integrate the Safaricom Daraja API to trigger an M-Pesa STK push directly to the customer's phone or generate a dynamic payment link when they click the 'Pay Now' button.",
            "keyLearnings": [
              "Authenticating with the Safaricom Daraja API using OAuth 2.0",
              "Formatting the Lipa Na M-Pesa Online (LNMO) payload",
              "Handling asynchronous Daraja callback webhooks for payment success"
            ],
            "codeSnippet": "export async function triggerMpesaSTK(phoneNumber: string, amount: number, reference: string) {\n  const payload = {\n    BusinessShortCode: \"174379\",\n    Password: generateMpesaPassword(),\n    Timestamp: getTimestamp(),\n    TransactionType: \"CustomerPayBillOnline\",\n    Amount: amount,\n    PartyA: phoneNumber,\n    PartyB: \"174379\",\n    PhoneNumber: phoneNumber,\n    CallBackURL: \"https://your-api.com/mpesa/callback\",\n    AccountReference: reference,\n    TransactionDesc: \"Invoice Payment\"\n  };\n  return await axios.post(DARAJA_STK_URL, payload, { headers: { Authorization: `Bearer ${token}` } });\n}"
          }
        },
        {
          "id": "col-step-4",
          "number": "04",
          "title": "Tone Calibration by Account Size",
          "subtitle": "Adapting messaging for different clients",
          "status": "locked",
          "duration": "35 min",
          "category": "Prompt Design",
          "summary": "Using AI to shift the conversation tone dynamically based on the overdue amount and customer history.",
          "isGated": false,
          "content": {
            "overview": "A KES 2,000 overdue personal invoice shouldn't receive the exact same messaging as a KES 500,000 B2B invoice. You'll design prompt logic that instructs the LLM to adjust its formality, patience, and phrasing based on the account size and context.",
            "keyLearnings": [
              "Creating conditional system instructions based on invoice value",
              "Balancing B2B professional tone with B2C approachability",
              "Ensuring the AI never uses threatening or illegal language"
            ],
            "samplePrompt": "You are a collections assistant. The current invoice is for {{AMOUNT}}. \nIf the amount is under KES 10,000, use a friendly, casual tone (e.g., 'Hi [Name], just a quick reminder...'). \nIf the amount is over KES 100,000, use a highly professional, formal corporate tone (e.g., 'Dear [Name], we are writing to follow up on...'). \nNEVER threaten the user or use aggressive language."
          }
        },
        {
          "id": "col-step-5",
          "number": "05",
          "title": "Handling Partial Payments Gracefully",
          "subtitle": "Managing incomplete settlements",
          "status": "locked",
          "duration": "30 min",
          "category": "Logic",
          "summary": "Building logic to correctly acknowledge partial payments while politely requesting the balance.",
          "isGated": false,
          "content": {
            "overview": "Customers often pay part of the balance. The system must recognize the Daraja webhook callback, update the CRM, and have the AI acknowledge the receipt of the partial amount while cleanly restating the remaining balance without sounding robotic.",
            "keyLearnings": [
              "Reconciling M-Pesa receipts against expected invoice totals",
              "Prompting the AI to calculate and state the remaining balance",
              "Resetting the escalation clock when a partial payment is made"
            ]
          }
        },
        {
          "id": "col-step-6",
          "number": "06",
          "title": "Payment Plan Negotiation Flows",
          "subtitle": "AI-driven debt restructuring",
          "status": "locked",
          "duration": "45 min",
          "category": "Prompt Engineering",
          "summary": "Authoring strict prompts that allow the AI to negotiate and agree to structured installment plans within pre-approved business limits.",
          "isGated": true,
          "content": {
            "overview": "In emerging markets, offering a payment plan often secures more revenue than rigid demands. You'll build a negotiation engine where the AI is authorized to offer split payments (e.g., '50% now, 50% next week') if the user claims financial hardship, extracting the agreed dates into structured JSON.",
            "keyLearnings": [
              "Defining negotiation boundaries (e.g., max 3 installments, max 30 days)",
              "Using function calling to extract agreed dates and amounts",
              "Handling user counter-offers gracefully"
            ],
            "samplePrompt": "You may negotiate a payment plan if the user cannot pay in full. \nRules: \n1. Maximum 2 installments. \n2. First installment must be at least 40% paid today. \n3. Final payment must be within 14 days.\nIf the user agrees to a valid plan, output the structured plan using the [PAYMENT_PLAN_AGREED: {\"installment1\": ..., \"date1\": ..., \"installment2\": ..., \"date2\": ...}] format.",
            "testCase": {
              "input": "I don't have the full 10k right now, business is slow. Can I pay 5k today and 5k end of month?",
              "expectedOutput": "I understand. Since the end of the month is within our 14-day window, we can accept KES 5,000 today and KES 5,000 by the 30th. Shall I send the M-Pesa prompt for the first 5,000 now? [PAYMENT_PLAN_AGREED: {\"installment1\": 5000, \"date1\": \"today\", \"installment2\": 5000, \"date2\": \"end_of_month\"}]"
            }
          }
        },
        {
          "id": "col-step-7",
          "number": "07",
          "title": "Dispute Flagging & Resolution",
          "subtitle": "When the customer says 'I already paid'",
          "status": "locked",
          "duration": "35 min",
          "category": "Flow Design",
          "summary": "Building a fallback flow to capture proof of payment and pause automated reminders during a dispute.",
          "isGated": true,
          "content": {
            "overview": "The most common response to a reminder is 'I paid this yesterday.' The agent must instantly stop the dunning sequence, ask the customer for the M-Pesa transaction code, and flag the account for manual reconciliation by the business owner.",
            "keyLearnings": [
              "Detecting dispute intents via LLM classification",
              "Prompting the user for an M-Pesa confirmation code",
              "Pausing scheduled Cron/reminder jobs for a specific invoice"
            ]
          }
        },
        {
          "id": "col-step-8",
          "number": "08",
          "title": "CRM Integration & Aging Reports",
          "subtitle": "Keeping the ledger updated in real-time",
          "status": "locked",
          "duration": "40 min",
          "category": "Backend Dev",
          "summary": "Syncing conversation outcomes back to a Google Sheet or CRM to generate real-time 30/60/90-day aging reports.",
          "isGated": true,
          "content": {
            "overview": "Collections don't happen in a vacuum. You'll build the integration that writes the agent's findings (e.g., 'Promised to pay Friday', 'Disputed', 'Partial Payment') back to the business owner's CRM or Google Sheets, dynamically updating the aging report dashboard.",
            "keyLearnings": [
              "Updating Google Sheets via API to reflect invoice status",
              "Categorizing debt into 30/60/90+ day buckets programmatically",
              "Generating a daily summary alert for the business owner"
            ]
          }
        },
        {
          "id": "col-step-9",
          "number": "09",
          "title": "Human Handoff & Edge Cases",
          "subtitle": "Knowing when to escalate",
          "status": "locked",
          "duration": "30 min",
          "category": "Operations",
          "summary": "Designing safe escape hatches for angry customers or complex B2B negotiations that require a human touch.",
          "isGated": true,
          "content": {
            "overview": "Not every debt can be collected by a bot. When a customer uses abusive language, threatens legal action, or requires a custom B2B settlement, the AI must instantly assign the ticket to a human agent in the WhatsApp shared inbox and mute itself.",
            "keyLearnings": [
              "Configuring sentiment analysis to detect anger or threats",
              "Routing WhatsApp conversations to a human inbox",
              "Muting the AI webhook for a specific phone number"
            ]
          }
        },
        {
          "id": "col-step-10",
          "number": "10",
          "title": "Analytics: Collections Performance",
          "subtitle": "Measuring recovery rates",
          "status": "locked",
          "duration": "35 min",
          "category": "Reporting",
          "summary": "Building a simple dashboard to track how much debt the agent has successfully recovered this month.",
          "isGated": true,
          "content": {
            "overview": "To prove the system's value to the business owner, it needs to show ROI. You'll aggregate the successful M-Pesa callbacks to calculate the total amount recovered by the AI vs the amount still outstanding.",
            "keyLearnings": [
              "Calculating the recovery rate percentage",
              "Tracking which escalation day (Day 3 vs Day 15) yields the most payments",
              "Formatting a weekly WhatsApp summary report for the boss"
            ]
          }
        },
        {
          "id": "col-step-11",
          "number": "11",
          "title": "Verified Portfolio Deployment",
          "subtitle": "Launch your collections agent",
          "status": "locked",
          "duration": "50 min",
          "category": "Deployment",
          "summary": "Deploy your fully functional AI collections agent for a real client, securing your verified portfolio link.",
          "isGated": true,
          "content": {
            "overview": "It's time to go live. You will deploy the collections agent to a cloud environment, connect it to a real business's WhatsApp number, and run a safe test with a live M-Pesa STK push. Once the business confirms it works, you receive your verified portfolio link and a direct quote from the owner.",
            "keyLearnings": [
              "Deploying the webhook safely to a production environment",
              "Running an end-to-end test on a real overdue invoice",
              "Securing a verified client testimonial for your portfolio"
            ]
          }
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
    totalSteps: 12,
    completedSteps: 0,
    description: 'Build a WhatsApp ordering agent for a Kenyan restaurant that reads the daily menu, takes orders with modifications, calculates delivery fees by estate, and hands off confirmed orders to the kitchen and rider.',
    badgeTitle: 'Verified Hospitality Automation Specialist',
    price: 2999,
    rating: 4.8,
    reviewCount: 4,
    tags: ['Menu Parsing', 'Delivery Fee Calculation', 'Kitchen Handoff'],
    whoBuysThis: 'Restaurants, cafes, and food vendors',
    impactStat: 'Direct WhatsApp ordering can save up to 30% in margin lost to delivery apps',
    steps: [
        {
          "id": "food-step-1",
          "number": "01",
          "title": "Introduction & Menu Data Architecture",
          "subtitle": "Structuring restaurant offerings for AI context",
          "status": "locked",
          "duration": "30 min",
          "category": "Architecture",
          "summary": "Learn how to structure a restaurant menu into a clean, LLM-readable format, converting complex PDFs into parseable JSON.",
          "isGated": false,
          "content": {
            "overview": "Learn how to structure a restaurant menu into a clean, LLM-readable format. We cover converting complex PDF menus into JSON structures that the AI can easily parse for items, prices in KES, and available modifications.",
            "keyLearnings": [
              "Structuring menu categories, SKUs, and pricing",
              "Handling dietary tags and customization options",
              "Optimizing data payload size for context windows"
            ]
          }
        },
        {
          "id": "food-step-2",
          "number": "02",
          "title": "Chatbot Personas & Conversational Ordering",
          "subtitle": "Building a friendly Kenyan waiter persona",
          "status": "locked",
          "duration": "35 min",
          "category": "Flow Design",
          "summary": "Train the bot to recognize intent, extract specific menu requests from natural language, and handle custom modifications.",
          "isGated": false,
          "content": {
            "overview": "Build an engaging AI persona that mimics a friendly Kenyan waiter. Train the bot to recognize intent, extract specific menu requests from natural language, and handle custom modifications like 'no onions' or 'extra pilipili'.",
            "keyLearnings": [
              "Crafting a warm, locally-relevant persona",
              "Using structured LLM outputs to extract food items",
              "Handling edge cases in customer requests"
            ],
            "samplePrompt": "Extract food items and modifications from the user's message. Ignore general chatter. Output strict JSON matching this schema: { items: [{ name: string, qty: number, mods: string[] }] }.",
            "testCase": {
              "input": "I want 2 chips masala, but no pilipili on one.",
              "expectedOutput": "{\"items\": [{\"name\": \"Chips Masala\", \"qty\": 1, \"mods\": [\"no pilipili\"]}, {\"name\": \"Chips Masala\", \"qty\": 1, \"mods\": []}]}"
            }
          }
        },
        {
          "id": "food-step-3",
          "number": "03",
          "title": "Real-Time Inventory & 86'd Items Handling",
          "subtitle": "Preventing orders for out-of-stock items",
          "status": "locked",
          "duration": "40 min",
          "category": "Operations",
          "summary": "Connect the bot to a live inventory system to implement '86' logic and gracefully decline requests for finished items.",
          "isGated": false,
          "content": {
            "overview": "Connect the bot to a live inventory system to prevent ordering out-of-stock items. Learn how to implement '86' logic—gracefully declining requests for finished items and suggesting in-stock alternatives.",
            "keyLearnings": [
              "Integrating real-time stock checks before confirming additions",
              "Designing polite fallback responses for 86'd items",
              "Suggesting up-sells and available alternatives"
            ]
          }
        },
        {
          "id": "food-step-4",
          "number": "04",
          "title": "Cart Management & Order Modification",
          "subtitle": "Maintaining user session and order state",
          "status": "locked",
          "duration": "45 min",
          "category": "Data & State",
          "summary": "Maintain user session state to manage an active shopping cart over WhatsApp, allowing customers to add or remove items.",
          "isGated": false,
          "content": {
            "overview": "Maintain user session state to manage an active shopping cart over WhatsApp. Enable customers to add, remove, or modify items, and generate clear, structured order summaries with KES subtotals.",
            "keyLearnings": [
              "Managing state and memory across multiple messages",
              "Calculating subtotals and applying discounts",
              "Generating clean WhatsApp markdown receipts"
            ]
          }
        },
        {
          "id": "food-step-5",
          "number": "05",
          "title": "Location Capture & Estate-Based Zones",
          "subtitle": "Mapping Nairobi addresses to delivery costs",
          "status": "locked",
          "duration": "40 min",
          "category": "Logistics",
          "summary": "Design a conversational flow to capture delivery details accurately and map Nairobi estate names to specific delivery zones.",
          "isGated": false,
          "content": {
            "overview": "Design a conversational flow to capture delivery details accurately. Learn techniques to standardize Nairobi estate names (e.g., Kilimani, South B, Ruaka) to map them to specific delivery zones.",
            "keyLearnings": [
              "Extracting standardized location data from free-text",
              "Mapping user locations to predefined delivery zones",
              "Handling ambiguous or out-of-bounds addresses"
            ]
          }
        },
        {
          "id": "food-step-6",
          "number": "06",
          "title": "Dynamic Delivery Fee Calculation Prompt",
          "subtitle": "Injecting zonal logic for final checkout",
          "status": "locked",
          "duration": "50 min",
          "category": "Prompt Engineering",
          "summary": "Construct a robust prompt that injects delivery zone logic and cart total to calculate final costs.",
          "isGated": true,
          "content": {
            "overview": "In this core lesson, construct a robust prompt that injects the delivery zone logic and cart total to calculate final costs. Ensure the LLM correctly applies flat rates for nearby estates and distance-based fees for outer suburbs.",
            "keyLearnings": [
              "Injecting pricing matrix data into system prompts",
              "Calculating total costs (Cart + Delivery Fee)",
              "Preventing hallucinated discounts or incorrect delivery rates"
            ],
            "samplePrompt": "You are the dispatcher for Nairobi Eats. The customer's cart total is KES 1500. They are in 'Kilimani'. \n\nDELIVERY FEE RULES:\n- CBD, Kilimani, Kileleshwa: KES 150\n- Westlands, Lavington: KES 200\n- Karen, Ruaka: KES 350\n\nCalculate the final total. Summarize the order with [CHECKOUT_READY: {\"subtotal\": 1500, \"delivery\": 150, \"total\": 1650}].",
            "codeSnippet": "export function calculateDelivery(estate: string, total: number) {\n  const zones: Record<string, number> = {\n    'Kilimani': 150, 'Kileleshwa': 150, 'Westlands': 200, 'Karen': 350\n  };\n  const fee = zones[estate] || 300;\n  return { subtotal: total, deliveryFee: fee, finalTotal: total + fee };\n}",
            "testCase": {
              "input": "I'm in Karen. How much is delivery?",
              "expectedOutput": "Delivery to Karen is KES 350. Your new total is KES 1,850. Would you like to proceed to payment?"
            }
          }
        },
        {
          "id": "food-step-7",
          "number": "07",
          "title": "Order Confirmation & M-Pesa STK Push",
          "subtitle": "Triggering instant mobile money payments",
          "status": "locked",
          "duration": "55 min",
          "category": "Payments",
          "summary": "Automate the checkout process using Safaricom's Daraja API to trigger an M-Pesa STK push for the order amount.",
          "isGated": true,
          "content": {
            "overview": "Automate the checkout process using Safaricom's Daraja API. Learn how to trigger an M-Pesa STK push directly to the customer's phone once they confirm the final order amount.",
            "keyLearnings": [
              "Authenticating with the Safaricom Daraja API",
              "Generating secure passwords and timestamps",
              "Triggering the Lipa Na M-Pesa Online prompt"
            ]
          }
        },
        {
          "id": "food-step-8",
          "number": "08",
          "title": "Payment Reconciliation & Callback Parsing",
          "subtitle": "Verifying transaction success automatically",
          "status": "locked",
          "duration": "45 min",
          "category": "Backend Dev",
          "summary": "Build a webhook to receive and parse M-Pesa payment callbacks to automatically mark orders as Paid.",
          "isGated": true,
          "content": {
            "overview": "Build a webhook to receive and parse M-Pesa payment callbacks. Automatically reconcile the transaction with the active order and update the status from 'Pending' to 'Paid'.",
            "keyLearnings": [
              "Setting up secure, HTTPS-enabled webhook endpoints",
              "Parsing Safaricom callback JSON payloads",
              "Handling failed or cancelled transactions gracefully"
            ],
            "codeSnippet": "app.post('/mpesa-callback', (req, res) => {\n  const result = req.body.Body.stkCallback;\n  if (result.ResultCode === 0) {\n    const receipt = result.CallbackMetadata.Item.find(i => i.Name === 'MpesaReceiptNumber').Value;\n    markOrderPaid(receipt);\n  }\n  res.sendStatus(200);\n});"
          }
        },
        {
          "id": "food-step-9",
          "number": "09",
          "title": "Kitchen Handoff & POS Integration",
          "subtitle": "Routing orders to the preparation team",
          "status": "locked",
          "duration": "40 min",
          "category": "Operations",
          "summary": "Translate the completed WhatsApp order into a structured format and route it to a kitchen display system or POS.",
          "isGated": true,
          "content": {
            "overview": "Translate the completed WhatsApp order into a structured format for the kitchen. Send automated tickets to a kitchen display system or POS terminal with clear modification notes.",
            "keyLearnings": [
              "Formatting JSON payloads for external POS APIs",
              "Ensuring critical dietary notes are highlighted",
              "Handling peak-hour queue management and throttling"
            ]
          }
        },
        {
          "id": "food-step-10",
          "number": "10",
          "title": "Order Status Updates & Queue Management",
          "subtitle": "Keeping the customer informed",
          "status": "locked",
          "duration": "35 min",
          "category": "Automation",
          "summary": "Implement automated WhatsApp updates as the order moves through states like Received, Preparing, and Out for Delivery.",
          "isGated": true,
          "content": {
            "overview": "Keep the customer informed to reduce follow-up messages. Implement automated WhatsApp updates as the order moves through states: Received, Preparing, and Out for Delivery.",
            "keyLearnings": [
              "Triggering outbound template messages based on state changes",
              "Providing realistic ETA estimations based on queue length",
              "Sharing rider contact details for the last mile"
            ]
          }
        },
        {
          "id": "food-step-11",
          "number": "11",
          "title": "Daily Sales Analytics & Owner Reporting",
          "subtitle": "Automating end-of-day restaurant metrics",
          "status": "locked",
          "duration": "35 min",
          "category": "Reporting",
          "summary": "Build an automated dashboard for the owner by syncing daily WhatsApp orders and revenue to Google Sheets.",
          "isGated": true,
          "content": {
            "overview": "Build a simple, automated dashboard for the restaurant owner. Sync daily WhatsApp orders, revenue, and popular items to a Google Sheet using API webhooks.",
            "keyLearnings": [
              "Integrating with the Google Sheets API",
              "Summarizing daily M-Pesa collections",
              "Identifying top-selling and frequently 86'd items"
            ]
          }
        },
        {
          "id": "food-step-12",
          "number": "12",
          "title": "Verified Portfolio Deployment: Live Restaurant Bot",
          "subtitle": "Launching your AI food agent in the real world",
          "status": "locked",
          "duration": "45 min",
          "category": "Deployment",
          "summary": "Deploy your completed system for a real food vendor and secure a verified portfolio quote.",
          "isGated": true,
          "content": {
            "overview": "Deploy your completed system for a real restaurant or food vendor. You'll generate a live WhatsApp link, a demo video of a successful order, and gather a quote from the vendor to verify your portfolio.",
            "keyLearnings": [
              "Pushing the final agent codebase to a production server",
              "Conducting end-to-end testing from ordering to kitchen handoff",
              "Securing vendor verification and launching your portfolio"
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
  liveUrl: 'https://afridemy.ke/p/wanjiku-muthoni/retail-agent',
  githubUrl: 'https://github.com/afridemy-verified/wanjiku-muthoni-retail-bot',
  issueDate: 'August 2026',
  status: 'Verified Production Grade',
  summary: 'A WhatsApp assistant that answers customer questions, checks real stock, and takes M-Pesa payments automatically.',
  rubric: [
    {
      id: 'rubric-1',
      criteria: 'Inventory Consistency & Stock Decrement',
      description: "Never makes up a product that doesn't exist, and always suggests something else when an item is out of stock.",
      status: 'Passed'
    },
    {
      id: 'rubric-2',
      criteria: 'M-Pesa STK Push Integration & Error Routing',
      description: "Payments go through cleanly, and a cancelled payment doesn't break the conversation.",
      status: 'Passed'
    },
    {
      id: 'rubric-3',
      criteria: 'Kenyan Regional Nuance & Sheng Comprehension',
      description: 'Understands English, Swahili, and everyday Nairobi slang without getting confused mid-order.',
      status: 'Passed'
    },
    {
      id: 'rubric-4',
      criteria: 'Response Speed Under Load',
      description: 'Replies fast, even when a lot of customers are messaging at once.',
      status: 'Passed'
    },
    {
      id: 'rubric-5',
      criteria: 'Guardrails & Prompt Injection Defense',
      description: "Can't be tricked into ignoring its instructions or going off-script.",
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
  metrics: [
    { label: 'Reply Speed', value: '1.18s' },
    { label: 'Mistake Rate', value: '0.0%' },
    { label: 'Accuracy', value: '100.0%' },
    { label: 'Payment Uptime', value: '99.9%' },
  ]
};

// Founder-approved placeholder graduate profiles for the public Verified Work gallery,
// reusing the same 5 people and quotes already used for the homepage reviews. Swap for
// real student data once the first batch actually completes the program.
export const PLACEHOLDER_VERIFIED_WORK: PortfolioVerification[] = [
  {
    id: 'AFR-2026-KE-1001',
    studentName: 'Manuel Moureh',
    trackTitle: 'WhatsApp AI Agent for Kenyan Retail',
    liveUrl: 'https://afridemy.online/verified/manuel-moureh',
    githubUrl: 'https://github.com/afridemy-verified/manuel-moureh-retail-agent',
    issueDate: 'June 2026',
    status: 'Verified Production Grade',
    summary: 'A Shopify store with WhatsApp ordering and M-Pesa checkout built in, running live for Africore Tech.',
    rubric: [
      { id: 'r1', criteria: 'Product Discovery & Wishlists', description: 'Customers can browse, compare, and save products before they ever reach checkout.', status: 'Passed' },
      { id: 'r2', criteria: 'WhatsApp Ordering & M-Pesa Checkout', description: 'Orders placed over WhatsApp flow straight into a secure checkout with M-Pesa and card payment.', status: 'Passed' },
      { id: 'r3', criteria: 'Delivery Workflow & Mobile Optimization', description: 'Delivery handoff runs without manual coordination, on a store built to work on any phone.', status: 'Passed' },
    ],
    smeReviewer: {
      name: 'Africore Tech',
      role: 'Client Business',
      company: 'Africore Tech',
      location: 'Nairobi, Kenya',
      quote: "This system runs our store today, product discovery, WhatsApp ordering, M-Pesa and card checkout, delivery, all of it. It's reduced buying friction and cut the manual work out of running the shop.",
      avatarInitials: 'AT',
    },
    metrics: [
      { label: 'Reply Speed', value: '1.4s' },
      { label: 'Mistake Rate', value: '0.2%' },
      { label: 'Accuracy', value: '99.1%' },
      { label: 'Payment Success', value: '98.6%' },
    ],
  },
  {
    id: 'AFR-2026-KE-1002',
    studentName: 'Vivian Bii',
    trackTitle: 'Lead Qualification Agent for Real Estate',
    liveUrl: 'https://afridemy.online/verified/vivian-bii',
    githubUrl: 'https://github.com/afridemy-verified/vivian-bii-lead-agent',
    issueDate: 'June 2026',
    status: 'Verified Production Grade',
    summary: 'A chat assistant that qualifies real estate leads and books viewings automatically for a Nairobi agency.',
    rubric: [
      { id: 'r1', criteria: 'Lead Qualification', description: 'Asks for budget, bedroom count, and neighborhood, and never asks the same question twice.', status: 'Passed' },
      { id: 'r2', criteria: 'Viewing Scheduling', description: "Books property viewings straight into the agent's calendar, with no double-bookings.", status: 'Passed' },
      { id: 'r3', criteria: 'CRM & Sheets Sync', description: 'A qualified lead lands in the sales pipeline within seconds, no manual data entry.', status: 'Passed' },
    ],
    smeReviewer: {
      name: 'Peter Otieno',
      role: 'Sales Director',
      company: 'Kilimani Realty Group',
      location: 'Kilimani, Nairobi',
      quote: 'Every lead that reaches my phone now is already qualified. My team stopped wasting time on window-shoppers.',
      avatarInitials: 'PO',
    },
    metrics: [
      { label: 'Reply Speed', value: '1.6s' },
      { label: 'Qualification Accuracy', value: '96.4%' },
      { label: 'Booking Success Rate', value: '92.8%' },
      { label: 'System Uptime', value: '99.7%' },
    ],
  },
  {
    id: 'AFR-2026-KE-1003',
    studentName: 'Liza Malemba',
    trackTitle: 'Invoicing & Receipt AI Assistant',
    liveUrl: 'https://afridemy.online/verified/liza-malemba',
    githubUrl: 'https://github.com/afridemy-verified/liza-malemba-invoicing-agent',
    issueDate: 'May 2026',
    status: 'Verified Production Grade',
    summary: 'An assistant that turns handwritten receipts into proper invoices and matches M-Pesa payments automatically.',
    rubric: [
      { id: 'r1', criteria: 'Receipt Reading', description: 'Reads a photo of a handwritten receipt and turns it into a proper, itemized invoice.', status: 'Passed' },
      { id: 'r2', criteria: 'Invoice Generation', description: 'Creates a branded, downloadable invoice within seconds of a confirmed sale.', status: 'Passed' },
      { id: 'r3', criteria: 'M-Pesa Payment Matching', description: 'Matches M-Pesa payment messages to the right invoice automatically, with almost no manual fixing.', status: 'Passed' },
    ],
    smeReviewer: {
      name: 'Halima Juma',
      role: 'Accountant',
      company: 'Tembo Traders',
      location: 'Mombasa',
      quote: 'I checked every invoice it generated for the first month. It has not made a reconciliation error since.',
      avatarInitials: 'HJ',
    },
    metrics: [
      { label: 'Reply Speed', value: '2.1s' },
      { label: 'Reading Accuracy', value: '95.0%' },
      { label: 'Payment Match Rate', value: '97.3%' },
      { label: 'Invoices Generated', value: '340+' },
    ],
  },
  {
    id: 'AFR-2026-KE-1004',
    studentName: 'Sammy Mwashighadi',
    trackTitle: 'AI Customer Support & Ticketing Agent',
    liveUrl: 'https://afridemy.online/verified/sammy-mwashighadi',
    githubUrl: 'https://github.com/afridemy-verified/sammy-mwashighadi-support-agent',
    issueDate: 'May 2026',
    status: 'Verified Production Grade',
    summary: 'A support assistant that answers customer questions on WhatsApp and knows when to bring in a real person.',
    rubric: [
      { id: 'r1', criteria: 'Accurate Answers', description: "Answers from the business's real policies, never a generic guess.", status: 'Passed' },
      { id: 'r2', criteria: 'Handoff to a Human', description: 'Knows when to stop and bring in a real person, instead of looping the customer.', status: 'Passed' },
    ],
    smeReviewer: {
      name: 'Joseph Mwangangi',
      role: 'Operations Manager',
      company: 'Bahari Electronics',
      location: 'Mombasa',
      quote: 'Our WhatsApp used to pile up overnight. Now most questions get answered before we even open the shop.',
      avatarInitials: 'JM',
    },
    metrics: [
      { label: 'Reply Speed', value: '1.2s' },
      { label: 'Solved on First Reply', value: '81.5%' },
      { label: 'Handoff Accuracy', value: '94.0%' },
      { label: 'Questions Handled', value: '600+' },
    ],
  },
  {
    id: 'AFR-2026-KE-1005',
    studentName: 'Victor Koech',
    trackTitle: 'AI Overdue Payment Follow-Up Agent',
    liveUrl: 'https://afridemy.online/verified/victor-koech',
    githubUrl: 'https://github.com/afridemy-verified/victor-koech-collections-agent',
    issueDate: 'April 2026',
    status: 'Verified Production Grade',
    summary: 'An assistant that follows up on overdue invoices automatically, so a business gets paid without awkward phone calls.',
    rubric: [
      { id: 'r1', criteria: 'Follow-Up Messages', description: 'Starts polite, gets firmer over time, following a clear set of steps.', status: 'Passed' },
      { id: 'r2', criteria: 'Knowing When to Call', description: 'Flags the accounts that genuinely need a phone call instead of another message.', status: 'Passed' },
    ],
    smeReviewer: {
      name: 'Caroline Chebet',
      role: 'Finance Officer',
      company: 'Rift Valley Suppliers',
      location: 'Eldoret',
      quote: 'Overdue accounts used to sit for weeks. The follow-up sequence gets most of them paid within days.',
      avatarInitials: 'CC',
    },
    metrics: [
      { label: 'Reply Speed', value: '1.5s' },
      { label: 'Payment Links Sent', value: '210+' },
      { label: 'Paid Within 30 Days', value: '78.4%' },
      { label: 'Follow-Up Accuracy', value: '93.1%' },
    ],
  },
];
