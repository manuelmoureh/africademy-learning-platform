import React from 'react';
import { Heart, Check, AlertTriangle, Receipt } from 'lucide-react';

// Small, honest interface mockups per system: what the thing actually looks like in use,
// not a stock photo or a generic icon. Five reusable shapes cover all 10 tracks so the set
// stays visually consistent instead of 10 bespoke one-off designs.

interface ThumbnailConfig {
  kind: 'chat' | 'document' | 'card-list' | 'calendar' | 'post';
  lines: string[];
  label?: string;
}

const CONFIG: Record<string, ThumbnailConfig> = {
  'whatsapp-retail-agent': { kind: 'chat', label: 'Nairobi Boutique', lines: ['Do you have size 40?', 'Yes! KES 2,800, in stock ✅'] },
  'lead-capture-bot': { kind: 'card-list', lines: ['Budget: KES 8M', 'Qualified'] },
  'invoicing-assistant': { kind: 'document', lines: ['INV-0142', 'Deposit: KES 15,000', 'Balance: KES 30,000', 'Total: KES 45,000'] },
  'support-ticketing-agent': { kind: 'card-list', lines: ['Ticket #204', 'Resolved'] },
  'booking-scheduler-agent': { kind: 'calendar', label: 'AUGUST', lines: [] },
  'social-content-agent': { kind: 'post', label: 'Kilimani Boutique', lines: ['New stock just arrived', 'Tap to shop the drop'] },
  'inventory-restock-agent': { kind: 'card-list', lines: ['Sandals (3 left)', 'Low Stock'] },
  'hr-screening-agent': { kind: 'card-list', lines: ['CV: J. Wanjiru', 'Shortlisted'] },
  'payment-collections-agent': { kind: 'document', lines: ['Invoice #88', 'Overdue since 12 Aug', 'Reminder sent'] },
  'food-ordering-agent': { kind: 'chat', label: 'Mama Chapo Kitchen', lines: ['2x Chapati, 1x Chicken Stew', 'Order confirmed, 25 min ETA'] },
};

function ChatMockup({ lines, label }: { lines: string[]; label?: string }) {
  return (
    <div className="w-full max-w-[180px] space-y-2">
      <div className="flex items-center gap-1.5">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
        </span>
        <span className="text-[8px] font-bold text-white/60 uppercase tracking-wide">{label}</span>
      </div>
      <div className="bg-white/10 text-white/80 text-[9px] rounded-lg rounded-bl-none px-2.5 py-1.5 max-w-[85%]">{lines[0]}</div>
      <div className="bg-[#F5A623] text-[#12102A] text-[9px] font-semibold rounded-lg rounded-br-none px-2.5 py-1.5 max-w-[85%] ml-auto">{lines[1]}</div>
    </div>
  );
}

function DocumentMockup({ lines }: { lines: string[] }) {
  return (
    <div className="w-full max-w-[160px] bg-white/95 rounded-lg p-3 space-y-1.5 shadow-lg shadow-black/10">
      <div className="flex items-center gap-1.5 pb-1.5 border-b border-dashed border-[#12102A]/15">
        <Receipt className="w-3 h-3 text-[#F5A623]" />
        <p className="text-[9px] font-bold text-[#12102A]">{lines[0]}</p>
      </div>
      {lines.slice(1, -1).map((l) => (
        <p key={l} className="text-[8px] text-[#12102A]/50">{l}</p>
      ))}
      <p className="text-[9px] font-black text-[#12102A] pt-1 border-t border-dashed border-[#12102A]/15">{lines[lines.length - 1]}</p>
    </div>
  );
}

function CardListMockup({ lines }: { lines: string[] }) {
  return (
    <div className="w-full max-w-[170px] bg-white/95 rounded-lg px-3 py-2.5 flex items-center gap-2 shadow-lg shadow-black/10">
      <span className="w-6 h-6 rounded-full bg-[#F5A623]/15 flex items-center justify-center shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
      </span>
      <span className="text-[9px] font-bold text-[#12102A] truncate flex-1">{lines[0]}</span>
      <span className="shrink-0 text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center gap-0.5">
        <Check className="w-2.5 h-2.5" />
        {lines[1]}
      </span>
    </div>
  );
}

function CalendarMockup({ label }: { label?: string }) {
  const days = Array.from({ length: 7 });
  return (
    <div className="w-full max-w-[170px] space-y-1.5">
      <p className="text-[8px] font-bold text-white/50 tracking-wide">{label}</p>
      <div className="grid grid-cols-7 gap-1">
        {days.map((_, i) => (
          <div key={i} className="space-y-0.5">
            <div
              className={`aspect-square rounded flex items-center justify-center text-[8px] font-bold ${
                i === 3 ? 'bg-[#F5A623] text-[#12102A]' : 'bg-white/10 text-white/50'
              }`}
            >
              {i + 12}
            </div>
            {i === 3 && <div className="h-0.5 rounded-full bg-[#F5A623]/70 mx-1" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function PostMockup({ lines, label }: { lines: string[]; label?: string }) {
  return (
    <div className="w-full max-w-[170px] bg-white/95 rounded-lg overflow-hidden shadow-lg shadow-black/10">
      <div className="flex items-center gap-1.5 px-2 pt-2">
        <span className="w-4 h-4 rounded-full bg-[#F5A623]/25 shrink-0" />
        <span className="text-[7px] font-bold text-[#12102A]/70 truncate">{label}</span>
      </div>
      <div className="h-9 mx-2 mt-1.5 rounded bg-gradient-to-br from-[#F5A623]/30 to-[#F5A623]/10" />
      <div className="p-2 space-y-1">
        <p className="text-[8px] font-bold text-[#12102A] leading-tight">{lines[0]}</p>
        <div className="flex items-center justify-between">
          <p className="text-[7px] text-[#12102A]/50">{lines[1]}</p>
          <Heart className="w-2.5 h-2.5 text-[#F5A623]" />
        </div>
      </div>
    </div>
  );
}

export const SystemThumbnail: React.FC<{ trackId: string }> = ({ trackId }) => {
  const config = CONFIG[trackId];
  if (!config) return <AlertTriangle className="w-6 h-6 text-white/30" />;

  switch (config.kind) {
    case 'chat': return <ChatMockup lines={config.lines} label={config.label} />;
    case 'document': return <DocumentMockup lines={config.lines} />;
    case 'card-list': return <CardListMockup lines={config.lines} />;
    case 'calendar': return <CalendarMockup label={config.label} />;
    case 'post': return <PostMockup lines={config.lines} label={config.label} />;
    default: return null;
  }
};
