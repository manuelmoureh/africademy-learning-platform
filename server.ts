import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return geminiClient;
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    environment: process.env.NODE_ENV || 'development'
  });
});

// Chat endpoint with Gemini AI integration and Kenyan retail fallback
app.post('/api/agent/chat', async (req: Request, res: Response) => {
  try {
    const { message, inventory, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const ai = getGemini();

    // If real Gemini API key is configured, call Gemini 3.7 Flash
    if (ai) {
      try {
        const inventoryContext = Array.isArray(inventory)
          ? inventory.map((i: any) => `- ${i.name} (SKU: ${i.sku}) | KES ${i.priceKES} / $${i.priceUSD} | Stock: ${i.stock} (${i.status}) | Location: ${i.location || 'Nairobi'}`).join('\n')
          : '';

        const systemInstructionText = `You are an autonomous WhatsApp retail sales agent for a Kenyan merchant in Nairobi.

LIVE STORE INVENTORY:
${inventoryContext}

RESPONSE RULES:
- Reply in natural, professional Kenyan commerce tone (English with polite Kenyan touches when appropriate like "Karibu", "Asante").
- Prices must be clearly quoted in KES (Kenyan Shillings) with approximate USD.
- If an item is Out of Stock, politely suggest an in-stock alternative.
- Keep WhatsApp messages crisp and scannable (under 3 sentences) with WhatsApp bold (*text*).
- When the customer confirms an order, output the structured confirmation code [ORDER_CONFIRMED: {"sku": "...", "qty": 1, "priceKES": ...}] followed by M-Pesa instructions.`;

        // Format conversation history for Gemini
        const formattedContents: any[] = [];
        if (Array.isArray(history)) {
          for (const h of history) {
            if (h.sender === 'user') {
              formattedContents.push({ role: 'user', parts: [{ text: h.text }] });
            } else if (h.sender === 'bot') {
              formattedContents.push({ role: 'model', parts: [{ text: h.text }] });
            }
          }
        }
        formattedContents.push({ role: 'user', parts: [{ text: message }] });

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents: formattedContents,
          config: {
            systemInstruction: systemInstructionText,
            temperature: 0.3,
          }
        });

        const replyText = response.text || 'Karibu! How can I assist you with your order today?';

        res.json({
          reply: replyText,
          modelUsed: 'gemini-3.7-flash',
          isRealGemini: true,
          meta: {
            intent: message.toLowerCase().includes('buy') || message.toLowerCase().includes('order') ? 'CHECKOUT_TRIGGER' : 'PRODUCT_INQUIRY',
            confidence: 0.99,
            model: 'Gemini 3.7 Flash Live'
          }
        });
        return;
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to Kenya Retail Simulator:', geminiError?.message || geminiError);
      }
    }

    // Fallback: Intelligent Kenyan Retail Agent Simulator
    const lower = message.toLowerCase();
    let reply = '';
    let intent = 'GENERAL_HELP';
    let skuChecked = '';

    if (lower.includes('sandals') || lower.includes('maasai') || lower.includes('beaded') || lower.includes('leather')) {
      reply = `Karibu! We have the *Handmade Maasai Beaded Sandals* (Size 38-43) in stock! Price is *KES 2,800* ($22). We currently have 18 pairs available in Nairobi. Would you like us to dispatch a pair to your location?`;
      intent = 'PRODUCT_INQUIRY';
      skuChecked = 'MSI-SND-01';
    } else if (lower.includes('kikoy') || lower.includes('wrap') || lower.includes('towel') || lower.includes('cotton')) {
      reply = `Yes, our authentic *Handwoven Mombasa Kikoy Wrap* is available at *KES 1,400* ($11). We have 12 pieces in vibrant blue/turquoise patterns ready for dispatch across Kenya.`;
      intent = 'PRODUCT_INQUIRY';
      skuChecked = 'KKY-WRT-02';
    } else if (lower.includes('soapstone') || lower.includes('kisii') || lower.includes('sculpture') || lower.includes('decor')) {
      reply = `Our *Handcarved Kisii Soapstone Decor* is currently *Out of Stock* at our Kilimani warehouse. However, our *Handwoven Sisal Kiondo Bag* (KES 3,200) just arrived from Machakos! Would you like to view that instead?`;
      intent = 'OUT_OF_STOCK_FALLBACK';
      skuChecked = 'KSS-STN-05';
    } else if (lower.includes('tea') || lower.includes('kericho') || lower.includes('black tea')) {
      reply = `The *Kericho Reserve Pure Black Tea (500g Tin)* is in stock at *KES 850* ($7). We only have *5 tins left in stock*, so order soon to secure yours!`;
      intent = 'LOW_STOCK_ALERT';
      skuChecked = 'KRC-TEA-03';
    } else if (lower.includes('buy') || lower.includes('order') || lower.includes('reserve') || lower.includes('pay') || lower.includes('yes') || lower.includes('send')) {
      reply = `Order Confirmed! [ORDER_CONFIRMED]\n*Item:* Maasai Beaded Sandals (1 Pair)\n*Total:* KES 2,800 (Incl. Nairobi dispatch)\n\nTo pay instantly via M-Pesa Express (STK Push), please use Till Number *542109* or visit: *pay.africademy.ke/mpesa-254*`;
      intent = 'CHECKOUT_TRIGGER';
    } else {
      reply = `Karibu to Africademy Artisan Kenya! I can check live stock and pricing for *Maasai Beaded Sandals*, *Mombasa Kikoy Wraps*, *Kericho Reserve Black Tea*, *Sisal Kiondo Bags*, and *Mt. Kenya Macadamia Oil*. What can I prepare for you?`;
      intent = 'GENERAL_HELP';
    }

    res.json({
      reply,
      modelUsed: 'africademy-kenya-simulator',
      isRealGemini: false,
      meta: {
        intent,
        inventoryChecked: skuChecked || undefined,
        confidence: 0.96,
        model: 'Kenya Retail Simulator'
      }
    });

  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ error: 'Internal server error processing agent conversation' });
  }
});

// Vite middleware and static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Africademy Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
