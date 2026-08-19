import React from 'react';
import { X, Check } from 'lucide-react';

interface CompareCardProps {
  items: { label: string; text: string; good: boolean }[];
}

// The third visual variant alongside ChatDemo and FlowDiagram, for lessons that teach
// through contrast (a generic reply vs. AfrikBot's, a hallucinated answer vs. a grounded
// one, raw vs. normalized phone format). Stays in the brand's ink/amber palette, not
// emerald - emerald is reserved for real "Verified" claims, and these are illustrative
// examples, not verified results.
export const CompareCard: React.FC<CompareCardProps> = ({ items }) => {
  return (
    <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, idx) => (
        <div
          key={idx}
          className={`rounded-xl p-4 space-y-2 border ${
            item.good ? 'bg-white border-[#F5A623]/40' : 'bg-[#12102A]/[0.03] border-[#12102A]/10'
          }`}
        >
          <div className="flex items-center gap-1.5">
            {item.good ? (
              <Check className="w-3.5 h-3.5 text-[#F5A623] shrink-0" />
            ) : (
              <X className="w-3.5 h-3.5 text-[#12102A]/40 shrink-0" />
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#12102A]/60 font-mono">
              {item.label}
            </span>
          </div>
          <p className={`text-sm leading-snug ${item.good ? 'text-[#12102A] font-semibold' : 'text-[#12102A]/60 font-medium'}`}>
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
};
