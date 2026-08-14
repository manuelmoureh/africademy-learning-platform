import React from 'react';
import { Lock, Sparkles, ShieldCheck, CheckCircle2, Terminal, Target, MessageCircle, Smartphone } from 'lucide-react';
import { Track } from '../types';
import { TrackIcon } from '../utils/trackIcons';

interface SidebarProps {
  tracks: Track[];
  selectedTrackId: string;
  onSelectTrack: (trackId: string) => void;
  onOpenPricing: () => void;
  onOpenPortfolio: () => void;
  isProUser: boolean;
  activeTrackProgress: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  tracks,
  selectedTrackId,
  onSelectTrack,
  onOpenPricing,
  onOpenPortfolio,
  isProUser,
  activeTrackProgress,
}) => {
  const activeTrack = tracks.find(t => t.id === selectedTrackId) || tracks[0];
  const otherTracks = tracks.filter(t => t.id !== selectedTrackId);

  return (
    <aside className="w-full lg:w-72 border-r border-[#12102A]/10 bg-white p-6 flex flex-col shrink-0 overflow-y-auto">
      {/* Active Track Highlight Box */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#12102A]/40 font-mono flex items-center gap-1.5">
            <Target className="w-3 h-3" />
            Active Track
          </h3>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
          </span>
        </div>

        <div className="p-4 rounded-xl border-2 border-[#F5A623] bg-[#F5A623]/5 transition-all hover:bg-[#F5A623]/10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-[#F5A623]/20 flex items-center justify-center shrink-0">
              <TrackIcon name={activeTrack.icon} className="w-3.5 h-3.5 text-[#F5A623]" />
            </div>
            <span className="text-[9px] font-mono font-bold uppercase text-[#F5A623]">
              {activeTrack.trackNumber}
            </span>
          </div>
          <p className="font-bold text-sm text-[#12102A] leading-snug">
            {activeTrack.title}
          </p>
          
          <div className="w-full bg-[#12102A]/10 h-1.5 rounded-full overflow-hidden mt-3">
            <div 
              className="h-full bg-[#F5A623] transition-all duration-500 rounded-full" 
              style={{ width: `${activeTrackProgress}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between mt-2 text-[10px] font-mono font-bold">
            <span className="text-[#12102A]/60">
              {activeTrackProgress}% COMPLETE
            </span>
            <span className="text-[#F5A623]">
              {activeTrack.completedSteps}/{activeTrack.steps.length} STEPS
            </span>
          </div>
        </div>
      </div>

      {/* Learning Library Section */}
      <div className="flex-1">
        <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#12102A]/40 mb-3 font-mono">
          Available Tracks ({tracks.length})
        </h3>
        
        <ul className="space-y-2">
          {otherTracks.map((track) => (
            <li
              key={track.id}
              onClick={() => onSelectTrack(track.id)}
              className="p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all hover:bg-[#F0EEF6] border border-[#12102A]/5 hover:border-[#F5A623] group"
            >
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <div className="w-7 h-7 rounded-md bg-[#12102A]/5 flex items-center justify-center shrink-0 group-hover:bg-[#F5A623]/15 transition-colors">
                  <TrackIcon name={track.icon} className="w-3.5 h-3.5 text-[#12102A]/60 group-hover:text-[#F5A623] transition-colors" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-mono font-bold text-[#12102A]/40 block uppercase">
                    {track.trackNumber}
                  </span>
                  <span className="text-xs font-bold text-[#12102A]/80 group-hover:text-[#12102A] transition-colors truncate block">
                    {track.title}
                  </span>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 shrink-0">
                {track.steps.length} STEPS
              </span>
            </li>
          ))}
        </ul>

        {/* Verified Portfolio Trigger Card */}
        <button
          type="button"
          onClick={onOpenPortfolio}
          className="w-full text-left mt-6 p-4 rounded-xl bg-[#F0EEF6] border border-[#10B981]/30 hover:border-[#10B981] transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#12102A]">
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              Verified Portfolio
            </div>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-[#10B981]/15 text-[#10B981]">
              Preview
            </span>
          </div>
          <p className="text-[11px] text-[#12102A]/70 leading-relaxed font-medium">
            Live public link & 5-point SME engineering audit preview.
          </p>
        </button>

        {/* Track Specifications */}
        <div className="mt-6 pt-4 border-t border-[#12102A]/10">
          <div className="text-[10px] font-bold text-[#12102A]/40 uppercase tracking-[0.2em] font-mono mb-2.5">
            Stack Specifications
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="flex items-center gap-1 text-[10px] font-mono bg-[#F0EEF6] border border-[#12102A]/10 px-2 py-0.5 rounded text-[#12102A]/70">
              <MessageCircle className="w-2.5 h-2.5" />
              Meta WhatsApp v21.0
            </span>
            <span className="flex items-center gap-1 text-[10px] font-mono bg-[#F0EEF6] border border-[#12102A]/10 px-2 py-0.5 rounded text-[#12102A]/70">
              <Sparkles className="w-2.5 h-2.5" />
              Gemini 3.7 Flash
            </span>
            <span className="flex items-center gap-1 text-[10px] font-mono bg-[#F0EEF6] border border-[#12102A]/10 px-2 py-0.5 rounded text-[#12102A]/70">
              <Smartphone className="w-2.5 h-2.5" />
              Safaricom Daraja
            </span>
          </div>
        </div>
      </div>

      {/* Upgrade to Pro Card */}
      {!isProUser && (
        <div className="mt-auto pt-6">
          <div className="p-4 rounded-xl bg-[#12102A] text-white shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3 h-3 text-[#F5A623]" />
              <p className="text-[10px] font-bold text-[#F5A623] uppercase font-mono tracking-widest">
                Afridemy Pro
              </p>
            </div>
            <p className="text-xs leading-relaxed text-white/80 mb-3.5 font-medium">
              Unlock steps 06-12, real M-Pesa payment code, and your verified portfolio.
            </p>
            <button 
              onClick={onOpenPricing}
              className="w-full py-2 bg-[#F5A623] hover:bg-[#e4971c] transition-all text-[#12102A] text-xs font-black rounded-lg cursor-pointer flex items-center justify-center gap-1.5"
            >
              UPGRADE VIA M-PESA
            </button>
          </div>
        </div>
      )}
    </aside>
  );
};
