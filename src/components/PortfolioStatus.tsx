import React from 'react';
import { ShieldCheck, ArrowUpRight, CheckCircle2, Award } from 'lucide-react';

interface PortfolioStatusProps {
  onOpenPortfolio: () => void;
  completedSteps: number;
  totalSteps: number;
}

export const PortfolioStatus: React.FC<PortfolioStatusProps> = ({
  onOpenPortfolio,
  completedSteps,
  totalSteps,
}) => {
  const isComplete = completedSteps >= totalSteps;

  return (
    <div className="bg-white border border-[#12102A]/10 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#12102A]/40 font-mono">
            Portfolio Verification
          </h3>
          <span className="text-[10px] font-bold font-mono text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded">
            98/100 AUDIT
          </span>
        </div>

        <div className="flex flex-col items-center py-3 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center mb-3">
            <ShieldCheck className="w-8 h-8 text-[#10B981]" />
          </div>

          <h4 className="font-bold text-sm text-[#12102A]">
            Verified Developer Portfolio
          </h4>
          <p className="text-xs text-[#12102A]/70 mt-1.5 px-2 leading-relaxed font-medium">
            Includes your live interactive demo link, 5-point SME engineering rubric audit, and Safaricom webhook telemetry.
          </p>
        </div>
      </div>

      <div className="pt-4 border-t border-[#12102A]/5 mt-2">
        <button
          onClick={onOpenPortfolio}
          className="w-full py-2.5 px-3 rounded-xl bg-[#FAF9FC] hover:bg-[#FAF9FC]/80 border border-[#12102A]/10 text-xs font-bold text-[#12102A] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          View Verified Portfolio
          <ArrowUpRight className="w-3.5 h-3.5 text-[#12102A]/40" />
        </button>
      </div>
    </div>
  );
};
