import React from 'react';
import { Terminal, Play, Lock, Sparkles, ExternalLink } from 'lucide-react';

interface BuildWorkspaceCardProps {
  onOpenSandbox: () => void;
  onOpenPricing?: () => void;
  isUnlocked?: boolean;
}

export const BuildWorkspaceCard: React.FC<BuildWorkspaceCardProps> = ({
  onOpenSandbox,
  onOpenPricing,
  isUnlocked = true,
}) => {
  const handleClick = () => {
    if (isUnlocked) {
      onOpenSandbox();
    } else if (onOpenPricing) {
      onOpenPricing();
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`rounded-2xl p-6 text-[#12102A] flex flex-col justify-between cursor-pointer transition-all duration-200 group shadow-xs relative overflow-hidden ${
        isUnlocked 
          ? 'bg-[#F5A623] hover:bg-[#efa11e]' 
          : 'bg-[#F0EEF6] border-2 border-dashed border-[#12102A]/20 hover:border-[#F5A623]'
      }`}
    >
      {/* Decorative subtle background pattern */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-white/10 rounded-full blur-lg pointer-events-none" />
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#12102A]/10 text-[#12102A]">
              <Terminal className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase font-mono text-[#12102A]/80">
              Interactive Dev Lab
            </span>
          </div>
          <span className={`flex items-center gap-1 text-[10px] font-black uppercase font-mono px-2 py-0.5 rounded-full ${
            isUnlocked ? 'bg-[#12102A] text-[#F5A623]' : 'bg-gray-200 text-gray-700'
          }`}>
            {isUnlocked ? 'Live' : 'Pro Only'}
          </span>
        </div>

        <h3 className="font-black text-xl leading-tight mb-2 tracking-tight">
          Build Workspace
        </h3>
        <p className="text-xs font-semibold text-[#12102A]/85 mb-6 leading-relaxed">
          {isUnlocked 
            ? 'Access the live WhatsApp retail sandbox, test prompt memory against product SKUs, and simulate orders.'
            : 'Unlock the full live Gemini 3.7 Flash AI runtime, inventory hooks, and Daraja M-Pesa simulator.'}
        </p>
      </div>

      <div className={`mt-auto p-3.5 rounded-xl flex items-center justify-between transition-colors ${
        isUnlocked 
          ? 'bg-[#12102A] group-hover:bg-[#1c1940]' 
          : 'bg-gray-200 group-hover:bg-gray-300'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-black tracking-widest font-mono ${
            isUnlocked ? 'text-[#F5A623]' : 'text-[#12102A]'
          }`}>
            {isUnlocked ? 'LAUNCH SANDBOX' : 'UPGRADE TO UNLOCK'}
          </span>
        </div>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform ${
          isUnlocked ? 'bg-[#F5A623]/20 text-[#F5A623]' : 'bg-gray-300 text-gray-700'
        }`}>
          {isUnlocked ? (
            <Play className="w-3 h-3 fill-current ml-0.5" />
          ) : (
            <Lock className="w-3 h-3" />
          )}
        </div>
      </div>
    </div>
  );
};
