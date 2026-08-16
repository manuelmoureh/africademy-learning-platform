import React from 'react';
import { Heart, Check, AlertTriangle, Receipt, CalendarDays } from 'lucide-react';

// Small, honest interface mockups per system: what the thing actually looks like in use,
// not a stock photo or a generic icon. Five reusable shapes cover all 10 tracks, all sharing
// one card language (white card on the dark tile) so the set reads as one system.
// Emerald (#10B981) is reserved app-wide for real "Verified" claims, so these decorative
// mockups stay ink + amber only.

interface ThumbnailConfig {
  kind: 'chat' | 'document' | 'card-list' | 'calendar' | 'post';
  lines: string[];
  label?: string;
  tone?: 'positive' | 'warning';
}

const CONFIG: Record<string, ThumbnailConfig> = {
  'whatsapp-retail-agent': { kind: 'chat', label: 'Nairobi Boutique', lines: ['Do you have size 40?', 'Yes! KES 2,800, in stock'] },
  'lead-capture-bot': { kind: 'card-list', lines: ['Budget: KES 8M', 'Qualified'], tone: 'positive' },
  'invoicing-assistant': { kind: 'document', lines: ['INV-0142', 'Deposit: KES 15,000', 'Balance: KES 30,000', 'Total: KES 45,000'] },
  'support-ticketing-agent': { kind: 'card-list', lines: ['Ticket #204', 'Resolved'], tone: 'positive' },
  'booking-scheduler-agent': { kind: 'calendar', label: 'August', lines: [] },
  'social-content-agent': { kind: 'post', label: 'Kilimani Boutique', lines: ['New stock just arrived', 'Tap to shop the drop'] },
  'inventory-restock-agent': { kind: 'card-list', lines: ['Sandals (3 left)', 'Low Stock'], tone: 'warning' },
  'hr-screening-agent': { kind: 'card-list', lines: ['CV: J. Wanjiru', 'Shortlisted'], tone: 'positive' },
  'payment-collections-agent': { kind: 'document', lines: ['Invoice #88', 'Overdue since 12 Aug', 'Reminder sent'] },
  'food-ordering-agent': { kind: 'chat', label: 'Mama Chapo Kitchen', lines: ['2x Chapati, 1x Chicken Stew', 'Order confirmed, 25 min ETA'] },
};

function ChatMockup({ lines, label }: { lines: string[]; label?: string }) {
  return (
    <div className="w-full max-w-[170px] bg-white/95 rounded-lg p-2.5 space-y-2 shadow-lg shadow-black/10">
      <div className="flex items-center gap-1.5 pb-1.5 border-b border-dashed border-[#12102A]/10">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] shrink-0" />
        <span className="text-[8px] font-bold text-[#12102A]/60">{label}</span>
      </div>
      <div className="bg-[#F0EEF6] text-[#12102A]/80 text-[9px] rounded-lg rounded-bl-none px-2.5 py-1.5 max-w-[90%]">{lines[0]}</div>
      <div className="bg-[#F5A623] text-[#12102A] text-[9px] font-semibold rounded-lg rounded-br-none px-2.5 py-1.5 max-w-[90%] ml-auto">{lines[1]}</div>
    </div>
  );
}

function DocumentMockup({ lines }: { lines: string[] }) {
  return (
    <div className="w-full max-w-[170px] bg-white/95 rounded-lg p-3 space-y-1.5 shadow-lg shadow-black/10">
      <div className="flex items-center gap-1.5 pb-1.5 border-b border-dashed border-[#12102A]/10">
        <Receipt className="w-3 h-3 text-[#F5A623]" />
        <p className="text-[9px] font-bold text-[#12102A]">{lines[0]}</p>
      </div>
      {lines.slice(1, -1).map((l) => (
        <p key={l} className="text-[8px] text-[#12102A]/50">{l}</p>
      ))}
      <p className="text-[9px] font-black text-[#12102A] pt-1 border-t border-dashed border-[#12102A]/10">{lines[lines.length - 1]}</p>
    </div>
  );
}

function CardListMockup({ lines, tone = 'positive' }: { lines: string[]; tone?: 'positive' | 'warning' }) {
  const isWarning = tone === 'warning';
  return (
    <div className="w-full max-w-[170px] bg-white/95 rounded-lg px-3 py-2.5 flex items-center gap-2 shadow-lg shadow-black/10">
      <span className="w-6 h-6 rounded-full bg-[#F5A623]/15 flex items-center justify-center shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
      </span>
      <span className="text-[9px] font-bold text-[#12102A] flex-1">{lines[0]}</span>
      <span
        className={`shrink-0 text-[8px] font-bold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ${
          isWarning ? 'bg-[#F5A623]/15 text-[#F5A623]' : 'bg-[#12102A] text-white'
        }`}
      >
        {isWarning ? <AlertTriangle className="w-2.5 h-2.5" /> : <Check className="w-2.5 h-2.5" />}
        {lines[1]}
      </span>
    </div>
  );
}

function CalendarMockup({ label }: { label?: string }) {
  const days = Array.from({ length: 7 });
  return (
    <div className="w-full max-w-[170px] bg-white/95 rounded-lg p-2.5 space-y-1.5 shadow-lg shadow-black/10">
      <div className="flex items-center gap-1.5 pb-1.5 border-b border-dashed border-[#12102A]/10">
        <CalendarDays className="w-3 h-3 text-[#F5A623]" />
        <p className="text-[9px] font-bold text-[#12102A]">{label}</p>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((_, i) => (
          <div
            key={i}
            className={`aspect-square rounded flex items-center justify-center text-[8px] font-bold ${
              i === 3 ? 'bg-[#F5A623] text-[#12102A]' : 'bg-[#F0EEF6] text-[#12102A]/50'
            }`}
          >
            {i + 12}
          </div>
        ))}
      </div>
    </div>
  );
}

function PostMockup({ lines, label }: { lines: string[]; label?: string }) {
  return (
    <div className="w-full max-w-[170px] bg-white/95 rounded-lg overflow-hidden shadow-lg shadow-black/10">
      <div className="flex items-center gap-1.5 px-2.5 pt-2.5">
        <span className="w-4 h-4 rounded-full bg-[#F5A623]/25 shrink-0" />
        <span className="text-[7px] font-bold text-[#12102A]/70">{label}</span>
      </div>
      <div className="h-9 mx-2.5 mt-1.5 rounded bg-gradient-to-br from-[#F5A623]/30 to-[#F5A623]/10" />
      <div className="p-2.5 space-y-1">
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
    case 'card-list': return <CardListMockup lines={config.lines} tone={config.tone} />;
    case 'calendar': return <CalendarMockup label={config.label} />;
    case 'post': return <PostMockup lines={config.lines} label={config.label} />;
    default: return null;
  }
};
