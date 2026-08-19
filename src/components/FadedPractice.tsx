import React, { useState } from 'react';
import { PenLine, Eye } from 'lucide-react';
import { Step } from '../types';
import { CodeBlock } from './CodeBlock';

interface FadedPracticeProps {
  data: NonNullable<Step['content']['fadedPractice']>;
}

// The technical-lesson version of the active-recall beat (the worked example effect -
// Sweller 1988): show a fully solved reference, then a near-identical problem with the
// critical piece removed, and let the learner attempt it before revealing the answer.
// Ungraded by design - there's no "wrong" state, just attempt-then-compare, so it never
// manufactures a fake failure the way a strictly-graded blank would.
export const FadedPractice: React.FC<FadedPracticeProps> = ({ data }) => {
  const [guess, setGuess] = useState('');
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="rounded-2xl border border-[#12102A]/10 bg-white p-6 space-y-5">
      <div className="flex items-center gap-2">
        <PenLine className="w-4 h-4 text-[#F5A623]" />
        <h2 className="text-sm font-bold uppercase tracking-wider text-[#12102A] font-mono">
          Your Turn
        </h2>
      </div>

      <p className="text-sm text-[#12102A]/70 leading-relaxed font-medium">{data.setup}</p>

      <CodeBlock code={data.workedExample} label="Worked Example" colorClass="text-emerald-400" />

      <CodeBlock code={data.challenge} label="Now You Try" colorClass="text-amber-300" />

      <textarea
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder={data.placeholder}
        rows={2}
        disabled={revealed}
        className="w-full p-3 rounded-xl border border-[#12102A]/15 font-mono text-xs text-[#12102A] placeholder:text-[#12102A]/35 focus:outline-none focus:border-[#F5A623] disabled:bg-[#12102A]/5 disabled:text-[#12102A]/50"
      />

      {!revealed ? (
        <button
          onClick={() => setRevealed(true)}
          className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 bg-[#12102A] text-white hover:bg-[#12102A]/85 cursor-pointer transition-all active:scale-[0.98]"
        >
          <Eye className="w-4 h-4" />
          Reveal the Answer
        </button>
      ) : (
        <div className="space-y-3 pt-1">
          <CodeBlock code={data.solution} label="Solution" colorClass="text-[#10B981]" />
          <p className="text-sm text-[#12102A]/80 leading-relaxed font-medium">{data.explanation}</p>
        </div>
      )}
    </div>
  );
};
