import React from 'react';
import { ArrowRight } from 'lucide-react';

interface FlowDiagramProps {
  steps: string[];
}

// Turns a pipeline described in prose (e.g. "a message arrives, then gets checked against
// inventory, then...") into a visual sequence, applying Mayer's signaling principle -
// arrows that make the existing structure explicit rather than a decorative image with no
// connection to the text. Wraps to a vertical stack on narrow screens.
export const FlowDiagram: React.FC<FlowDiagramProps> = ({ steps }) => {
  return (
    <div className="w-full max-w-xl bg-white rounded-2xl border border-[#12102A]/10 p-5">
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex-1 min-w-[120px] px-3.5 py-3 rounded-xl bg-[#F0EEF6] border border-[#12102A]/5 text-center">
              <span className="text-xs font-bold text-[#12102A]/85 leading-snug">{step}</span>
            </div>
            {idx < steps.length - 1 && (
              <ArrowRight className="w-4 h-4 text-[#F5A623] shrink-0 mx-auto sm:mx-0 rotate-90 sm:rotate-0" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
