import React, { useState } from 'react';
import { Brain, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';
import { Step } from '../types';

interface RetrievalCheckProps {
  data: NonNullable<Step['content']['interactiveCheck']>;
}

// One low-stakes active-recall moment per lesson (the "testing effect" - Roediger &
// Karpicke 2006: actively retrieving information cements it far better than re-reading).
// Ungraded on purpose: a learner can pick a different option and see its feedback too,
// there's no locked-in "wrong" state, no score, nothing recorded. The goal is the act of
// retrieving, not a test.
export const RetrievalCheck: React.FC<RetrievalCheckProps> = ({ data }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const isScenario = data.type === 'scenario';
  const selectedOption = selected !== null ? data.options[selected] : null;

  return (
    <div className="rounded-2xl border border-[#12102A]/10 bg-white p-6 space-y-4">
      <div className="flex items-center gap-2">
        <Brain className="w-4 h-4 text-[#F5A623]" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#12102A] font-mono">
          {isScenario ? 'Your Call' : 'Quick Check'}
        </h2>
      </div>

      <p className="text-base font-semibold text-[#12102A]/90 leading-snug">{data.question}</p>

      <div className="space-y-2">
        {data.options.map((option, idx) => {
          const isSelected = selected === idx;
          const showState = isSelected && !isScenario;
          return (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer border ${
                showState && option.correct
                  ? 'border-[#10B981] bg-[#10B981]/10 text-[#12102A]'
                  : showState && !option.correct
                  ? 'border-red-400 bg-red-50 text-[#12102A]'
                  : isSelected
                  ? 'border-[#F5A623] bg-[#F5A623]/10 text-[#12102A]'
                  : 'border-[#12102A]/10 hover:border-[#12102A]/30 text-[#12102A]/80'
              }`}
            >
              <span className="flex items-center gap-2">
                {showState && (option.correct ? (
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                ))}
                {option.text}
              </span>
            </button>
          );
        })}
      </div>

      {selectedOption && (
        <div className="flex items-start gap-2.5 p-4 rounded-xl bg-[#12102A]/5 border border-[#12102A]/10">
          <Lightbulb className="w-4 h-4 text-[#F5A623] shrink-0 mt-0.5" />
          <p className="text-sm text-[#12102A]/80 leading-relaxed font-medium">{selectedOption.feedback}</p>
        </div>
      )}
    </div>
  );
};
