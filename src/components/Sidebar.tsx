import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Target, ArrowLeft } from 'lucide-react';
import { Track } from '../types';
import { TrackIcon } from '../utils/trackIcons';

interface SidebarProps {
  track: Track;
  onBrowseAll: () => void;
  onUnlockTrack: () => void;
  isUnlocked: boolean;
  activeTrackProgress: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  track,
  onBrowseAll,
  onUnlockTrack,
  isUnlocked,
  activeTrackProgress,
}) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="w-full lg:w-72 border-r border-[#12102A]/10 bg-white p-6 flex flex-col shrink-0 overflow-y-auto"
    >
      {/* Active Track Highlight Box */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#12102A]/40 font-mono flex items-center gap-1.5">
            <Target className="w-3 h-3" />
            This System
          </h3>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
          </span>
        </div>

        <div className="p-4 rounded-xl border-2 border-[#F5A623] bg-[#F5A623]/5">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-md bg-[#F5A623]/20 flex items-center justify-center shrink-0">
              <TrackIcon name={track.icon} className="w-3.5 h-3.5 text-[#F5A623]" />
            </div>
            <span className="text-[9px] font-mono font-bold uppercase text-[#F5A623]">
              {track.trackNumber}
            </span>
          </div>
          <p className="font-bold text-sm text-[#12102A] leading-snug">
            {track.title}
          </p>

          <div className="w-full bg-[#12102A]/10 h-1.5 rounded-full overflow-hidden mt-3">
            <motion.div
              className="h-full bg-[#F5A623] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${activeTrackProgress}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          </div>

          <div className="flex items-center justify-between mt-2 text-[10px] font-mono font-bold">
            <span className="text-[#12102A]/60">
              {activeTrackProgress}% COMPLETE
            </span>
            <span className="text-[#F5A623]">
              {track.completedSteps}/{track.steps.length} STEPS
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onBrowseAll}
          className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-[#12102A]/50 hover:text-[#12102A] cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          Browse other systems
        </button>
      </div>

      {/* Stack Specifications, driven by this track's own data */}
      <div className="flex-1">
        <div className="pt-4 border-t border-[#12102A]/10">
          <div className="text-[10px] font-bold text-[#12102A]/40 uppercase tracking-[0.2em] font-mono mb-2.5">
            Stack Specifications
          </div>
          <div className="flex flex-wrap gap-1.5">
            {track.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono bg-[#F0EEF6] border border-[#12102A]/10 px-2 py-0.5 rounded text-[#12102A]/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Unlock This System Card */}
      {!isUnlocked && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15, ease: 'easeOut' }}
          className="mt-auto pt-6"
        >
          <div className="p-4 rounded-xl bg-[#12102A] text-white shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3 h-3 text-[#F5A623]" />
              <p className="text-[10px] font-bold text-[#F5A623] uppercase font-mono tracking-widest">
                Unlock This System
              </p>
            </div>
            <p className="text-xs leading-relaxed text-white/80 mb-3.5 font-medium">
              The first 5 lessons are free. Unlock the rest of {track.title} for a one-time KES {track.price.toLocaleString()}.
            </p>
            <button
              onClick={onUnlockTrack}
              className="w-full py-2 bg-[#F5A623] hover:bg-[#e4971c] transition-all text-[#12102A] text-xs font-black rounded-lg cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98]"
            >
              UNLOCK VIA M-PESA
            </button>
          </div>
        </motion.div>
      )}
    </motion.aside>
  );
};
