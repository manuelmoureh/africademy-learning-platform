import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatDemoProps {
  messages: { sender: 'customer' | 'agent'; text: string }[];
  label?: string;
}

// A larger, multi-turn version of the small chat mockup used on course cards
// (SystemThumbnail) - dropped inline in a lesson's prose to show what the exchange being
// described actually looks like on a phone screen, not just describe it in words (Mayer's
// dual coding principle). Deliberately stays in the brand's own ink/paper/amber palette
// rather than copying WhatsApp's real green/white chrome - a believable phone conversation,
// not an impersonation of WhatsApp's actual UI.
export const ChatDemo: React.FC<ChatDemoProps> = ({ messages, label = 'Customer Chat' }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl border border-[#12102A]/10 shadow-lg shadow-[#12102A]/5 overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 bg-[#12102A]">
        <MessageCircle className="w-3.5 h-3.5 text-[#F5A623]" />
        <span className="text-xs font-bold text-white/90">{label}</span>
      </div>
      <div className="p-4 space-y-2.5 bg-[#F0EEF6]/60">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-sm font-medium leading-snug px-3.5 py-2.5 max-w-[85%] ${
              msg.sender === 'customer'
                ? 'bg-white text-[#12102A]/85 rounded-2xl rounded-bl-sm shadow-sm mr-auto'
                : 'bg-[#F5A623] text-[#12102A] font-semibold rounded-2xl rounded-br-sm ml-auto'
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};
