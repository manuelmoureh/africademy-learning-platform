import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Send, RefreshCw, Bot, User, CheckCheck, ShoppingBag, 
  Sparkles, Code2, Database, AlertCircle, Phone, Video, MoreVertical,
  CheckCircle, ArrowRight, Activity, Terminal
} from 'lucide-react';
import { INVENTORY_CATALOG } from '../data/courses';
import { InventoryItem, ChatMessage } from '../types';

interface WhatsAppSandboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WhatsAppSandboxModal: React.FC<WhatsAppSandboxModalProps> = ({ isOpen, onClose }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>(INVENTORY_CATALOG);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'inventory' | 'prompt'>('chat');
  const [runtimeStatus, setRuntimeStatus] = useState<{ model: string; isReal: boolean }>({
    model: 'Gemini 3.7 Flash / Kenya Engine',
    isReal: true
  });

  const [systemPrompt, setSystemPrompt] = useState(`You are AfrikBot, a warm and polite sales assistant for Africademy Artisan Kenya in Nairobi.
Always format prices in KES (Kenyan Shillings) and USD ($1 = 128 KES).
Check the LIVE INVENTORY table before answering.
- If an item is "Out of Stock", politely explain and recommend an in-stock alternative.
- If in stock, state the quantity available in Nairobi and total price.
- Keep WhatsApp messages concise (under 3 sentences) with clean formatting.
- If the customer wants to buy, summarize the order with [ORDER_CONFIRMED] and M-Pesa STK Push details.`);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Karibu! Welcome to *Africademy Artisan Kenya* (Nairobi) ✨ How can I assist you with handcrafted Maasai sandals, Mombasa kikoys, or Kericho black tea today?',
      timestamp: '12:15 PM',
      meta: {
        intent: 'GREETING',
        confidence: 0.99,
        modelUsed: 'Gemini 3.7 Flash',
        isRealGemini: true
      }
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Call server backend endpoint /api/agent/chat
      const response = await fetch('/api/agent/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          inventory,
          systemPrompt,
          history: messages.slice(-6)
        })
      });

      if (response.ok) {
        const data = await response.json();
        setRuntimeStatus({
          model: data.meta?.model || data.modelUsed,
          isReal: !!data.isRealGemini
        });

        setMessages(prev => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            sender: 'bot',
            text: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            meta: {
              ...data.meta,
              modelUsed: data.modelUsed,
              isRealGemini: data.isRealGemini
            }
          }
        ]);
        setIsTyping(false);
        return;
      }
    } catch (err) {
      console.warn('Backend call failed, using client-side simulator:', err);
    }

    // Client-side fallback simulator
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply = '';
      let meta: ChatMessage['meta'] = {};

      if (lower.includes('sandals') || lower.includes('maasai') || lower.includes('beaded') || lower.includes('leather')) {
        const item = inventory.find(i => i.sku === 'MSI-SND-01')!;
        reply = `Karibu! We have *${item.name}* available in Size 38-43! We currently have *${item.stock} in stock* at *KES ${item.priceKES}* (~$${item.priceUSD}). Would you like me to reserve a pair for you in Nairobi?`;
        meta = {
          intent: 'PRODUCT_INQUIRY',
          inventoryChecked: item.sku,
          confidence: 0.98,
          priceCalculated: `KES ${item.priceKES}`,
          modelUsed: 'Kenya Retail Engine'
        };
      } else if (lower.includes('kikoy') || lower.includes('wrap') || lower.includes('towel')) {
        const item = inventory.find(i => i.sku === 'KKY-WRT-02')!;
        reply = `Our authentic *${item.name}* is *KES ${item.priceKES}* ($${item.priceUSD}). We have ${item.stock} pieces ready for dispatch.`;
        meta = {
          intent: 'PRODUCT_INQUIRY',
          inventoryChecked: item.sku,
          confidence: 0.97,
          priceCalculated: `KES ${item.priceKES}`,
          modelUsed: 'Kenya Retail Engine'
        };
      } else if (lower.includes('soapstone') || lower.includes('kisii') || lower.includes('decor')) {
        const item = inventory.find(i => i.sku === 'KSS-STN-05')!;
        const alternative = inventory.find(i => i.sku === 'MSI-SND-01')!;
        reply = `The *${item.name}* is currently *Out of Stock* at our Kilimani warehouse. However, our *${alternative.name}* (KES ${alternative.priceKES}) is in stock! Would you like to view that instead?`;
        meta = {
          intent: 'OUT_OF_STOCK_FALLBACK',
          inventoryChecked: item.sku,
          confidence: 0.95,
          modelUsed: 'Kenya Retail Engine'
        };
      } else if (lower.includes('tea') || lower.includes('kericho')) {
        const item = inventory.find(i => i.sku === 'KRC-TEA-03')!;
        reply = `Yes! The *${item.name}* is *KES ${item.priceKES}* ($${item.priceUSD}). We only have *${item.stock} left in stock*, so order soon to secure yours!`;
        meta = {
          intent: 'LOW_STOCK_ALERT',
          inventoryChecked: item.sku,
          confidence: 0.96,
          priceCalculated: `KES ${item.priceKES}`,
          modelUsed: 'Kenya Retail Engine'
        };
      } else if (lower.includes('buy') || lower.includes('order') || lower.includes('reserve') || lower.includes('pay') || lower.includes('yes')) {
        reply = `Order Confirmed! [ORDER_CONFIRMED]\n*Item:* Maasai Beaded Sandals (Size 40)\n*Total:* KES 2,800 (Incl. Nairobi dispatch)\n\nPlease trigger M-Pesa STK Push via Till *542109* or visit: *pay.africademy.ke/mpesa-254*`;
        meta = {
          intent: 'CHECKOUT_TRIGGER',
          confidence: 0.99,
          priceCalculated: 'KES 2,800',
          modelUsed: 'Kenya Retail Engine'
        };
      } else {
        reply = `Karibu to Africademy Artisan Kenya! I can check live stock for *Maasai Sandals*, *Mombasa Kikoys*, *Kericho Black Tea*, and *Mt. Kenya Macadamia Oil*. What would you like to explore?`;
        meta = {
          intent: 'GENERAL_HELP',
          confidence: 0.92,
          modelUsed: 'Kenya Retail Engine'
        };
      }

      setMessages(prev => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          meta
        }
      ]);
      setIsTyping(false);
    }, 500);
  };

  const updateStock = (id: string, delta: number) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const newStock = Math.max(0, item.stock + delta);
        return {
          ...item,
          stock: newStock,
          status: newStock === 0 ? 'Out of Stock' : newStock < 10 ? 'Low Stock' : 'In Stock'
        };
      }
      return item;
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12102A]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FAF9FC] border border-[#12102A]/10 rounded-2xl w-full max-w-5xl h-[85vh] max-h-[760px] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-[#12102A]/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#12102A] flex items-center justify-center text-[#F5A623]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-[#12102A]">WhatsApp AI Retail Agent Sandbox</h3>
                <span className="text-[10px] font-mono font-bold bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
                  {runtimeStatus.isReal ? 'Gemini 3.7 Flash Live' : 'Kenya Simulator'}
                </span>
              </div>
              <p className="text-xs text-[#12102A]/60 font-mono">
                Active Runtime: Meta Cloud API v21.0 • Nairobi Merchant Node
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex bg-[#FAF9FC] p-1 rounded-lg border border-[#12102A]/10 text-xs font-bold font-mono">
              <button
                onClick={() => setActiveTab('chat')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeTab === 'chat' ? 'bg-[#12102A] text-white' : 'text-[#12102A]/60 hover:text-[#12102A]'
                }`}
              >
                Simulator
              </button>
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeTab === 'inventory' ? 'bg-[#12102A] text-white' : 'text-[#12102A]/60 hover:text-[#12102A]'
                }`}
              >
                Live Catalog
              </button>
              <button
                onClick={() => setActiveTab('prompt')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeTab === 'prompt' ? 'bg-[#12102A] text-white' : 'text-[#12102A]/60 hover:text-[#12102A]'
                }`}
              >
                Prompt Instructions
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#12102A]/40 hover:text-[#12102A] hover:bg-[#FAF9FC] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Main WhatsApp Window */}
          <div className={`flex-1 flex flex-col bg-[#F0EBE3] relative overflow-hidden ${activeTab !== 'chat' ? 'hidden md:flex' : 'flex'}`}>
            
            {/* WhatsApp Header bar */}
            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-xs z-10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#12102A] border border-white/20 flex items-center justify-center text-[#F5A623] font-bold text-xs font-mono">
                  AK
                </div>
                <div>
                  <h4 className="text-sm font-bold leading-none flex items-center gap-1.5">
                    AfrikBot • Nairobi Store
                    <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                  </h4>
                  <p className="text-[11px] text-white/80 mt-0.5 font-medium">WhatsApp Business Verified</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-white/80">
                <button 
                  onClick={() => setMessages([messages[0]])}
                  title="Reset conversation"
                  className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Bubble Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              <div className="text-center my-2">
                <span className="text-[10px] font-semibold bg-white/70 text-[#12102A]/60 px-3 py-1 rounded-full shadow-2xs font-mono">
                  End-to-end encrypted AI retail session • Nairobi Node
                </span>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-xl px-3.5 py-2 text-sm shadow-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#DCF8C6] text-[#12102A] rounded-tr-none'
                        : 'bg-white text-[#12102A] rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line leading-relaxed">
                      {msg.text}
                    </div>

                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#12102A]/50 font-mono">
                      <span>{msg.timestamp}</span>
                      {msg.sender === 'user' && <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" />}
                    </div>
                  </div>

                  {/* Metadata pill for developers */}
                  {msg.meta && (
                    <div className="text-[9px] font-mono text-[#12102A]/60 mt-1 px-1 flex items-center gap-1.5">
                      <span className="bg-white/80 px-1.5 py-0.5 rounded border border-[#12102A]/10">
                        Intent: <b>{msg.meta.intent}</b>
                      </span>
                      {msg.meta.inventoryChecked && (
                        <span className="bg-white/80 px-1.5 py-0.5 rounded border border-[#12102A]/10">
                          SKU: {msg.meta.inventoryChecked}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl rounded-tl-none w-16 shadow-xs">
                  <span className="w-1.5 h-1.5 bg-[#075E54] rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-[#075E54] rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-[#075E54] rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Test Prompt Buttons */}
            <div className="px-4 py-2 bg-white/90 border-t border-[#12102A]/5 flex items-center gap-2 overflow-x-auto shrink-0">
              <span className="text-[10px] font-bold uppercase font-mono text-[#12102A]/40 shrink-0">
                Quick Tests:
              </span>
              <button
                onClick={() => handleSendMessage("Habari! Do you have the Maasai Beaded Sandals in stock, and how much is it in KES?")}
                className="text-xs bg-[#FAF9FC] hover:bg-[#F5A623]/20 border border-[#12102A]/10 px-2.5 py-1 rounded-md text-[#12102A] whitespace-nowrap transition-colors cursor-pointer font-medium"
              >
                Inquire Maasai Sandals
              </button>
              <button
                onClick={() => handleSendMessage("Do you have the Kisii Soapstone Decor in Kilimani?")}
                className="text-xs bg-[#FAF9FC] hover:bg-[#F5A623]/20 border border-[#12102A]/10 px-2.5 py-1 rounded-md text-[#12102A] whitespace-nowrap transition-colors cursor-pointer font-medium"
              >
                Test Out-of-Stock Fallback
              </button>
              <button
                onClick={() => handleSendMessage("I want to buy 1 pair of sandals please! Can you send M-Pesa prompt?")}
                className="text-xs bg-[#FAF9FC] hover:bg-[#F5A623]/20 border border-[#12102A]/10 px-2.5 py-1 rounded-md text-[#12102A] whitespace-nowrap transition-colors cursor-pointer font-medium"
              >
                Trigger M-Pesa Checkout
              </button>
            </div>

            {/* Message Input bar */}
            <div className="p-3 bg-[#F0F2F5] border-t border-[#12102A]/10 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type customer message to test your AI agent..."
                className="flex-1 bg-white border border-[#12102A]/10 rounded-full px-4 py-2 text-xs text-[#12102A] font-medium focus:outline-hidden focus:border-[#075E54]"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                className="w-9 h-9 rounded-full bg-[#075E54] hover:bg-[#064e46] text-white flex items-center justify-center transition-all disabled:opacity-40 cursor-pointer"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>

          {/* Right Inspector & Settings Drawer */}
          <div className="w-full md:w-80 lg:w-96 bg-white border-l border-[#12102A]/10 flex flex-col overflow-y-auto">
            <div className="p-4 border-b border-[#12102A]/10 bg-[#FAF9FC]">
              <h4 className="text-xs font-bold text-[#12102A] uppercase tracking-wider font-mono">
                Store Live Memory & State
              </h4>
              <p className="text-[11px] text-[#12102A]/60 mt-0.5">
                Dynamic inventory injected into the LLM system prompt
              </p>
            </div>

            {/* Catalog Manager */}
            <div className="p-4 flex-1 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#12102A]/50 font-mono">
                    Live Stock Levels
                  </span>
                  <span className="text-[10px] text-[#10B981] font-bold font-mono">{inventory.length} SKUs ACTIVE</span>
                </div>

                <div className="space-y-2">
                  {inventory.map((item) => (
                    <div
                      key={item.id}
                      className="p-2.5 rounded-xl border border-[#12102A]/10 bg-[#FAF9FC] hover:border-[#12102A]/20 transition-all text-xs"
                    >
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-bold text-[#12102A] leading-snug">{item.name}</span>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 font-mono ${
                          item.status === 'In Stock' 
                            ? 'bg-[#10B981]/15 text-[#10B981]' 
                            : item.status === 'Low Stock' 
                            ? 'bg-[#F5A623]/20 text-[#F5A623]' 
                            : 'bg-red-500/10 text-red-600'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#12102A]/5 text-[11px] text-[#12102A]/70">
                        <span className="font-mono font-semibold">KES {item.priceKES.toLocaleString()} (${item.priceUSD})</span>
                        
                        <div className="flex items-center gap-1.5 font-mono">
                          <button
                            onClick={() => updateStock(item.id, -1)}
                            className="w-5 h-5 rounded bg-white border border-[#12102A]/10 flex items-center justify-center font-bold hover:bg-gray-100 cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-bold w-6 text-center">{item.stock}</span>
                          <button
                            onClick={() => updateStock(item.id, 1)}
                            className="w-5 h-5 rounded bg-white border border-[#12102A]/10 flex items-center justify-center font-bold hover:bg-gray-100 cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Prompt View */}
              <div className="pt-2 border-t border-[#12102A]/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#12102A]/50 font-mono">
                    System Instructions
                  </span>
                  <Code2 className="w-3.5 h-3.5 text-[#12102A]/40" />
                </div>
                <textarea
                  value={systemPrompt}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  rows={5}
                  className="w-full text-xs font-mono bg-[#FAF9FC] border border-[#12102A]/10 rounded-lg p-2.5 text-[#12102A]/80 focus:outline-hidden focus:border-[#F5A623] leading-relaxed"
                />
              </div>
            </div>

            <div className="p-4 border-t border-[#12102A]/10 bg-white">
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-[#12102A] text-white text-xs font-bold rounded-lg hover:bg-[#1c1940] transition-colors cursor-pointer"
              >
                Apply & Return to Curriculum
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
