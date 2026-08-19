import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface BuildWorkspaceCardProps {
  onStartBuilding: () => void;
  nextLessonTitle?: string;
}

export const BuildWorkspaceCard: React.FC<BuildWorkspaceCardProps> = ({
  onStartBuilding,
  nextLessonTitle,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onStartBuilding}
      className="rounded-2xl p-6 text-[#12102A] flex flex-col justify-between cursor-pointer transition-all duration-200 group shadow-xs relative overflow-hidden bg-[#F5A623] hover:bg-[#efa11e]"
    >
      {/* Decorative subtle background pattern */}
      <div className="absolute -right-8 -top-8 w-28 h-28 bg-white/10 rounded-full blur-lg pointer-events-none" />

      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="p-1.5 rounded-lg bg-[#12102A]/10 text-[#12102A]">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="text-[10px] font-bold tracking-widest uppercase font-mono text-[#12102A]/80">
            Curriculum
          </span>
        </div>

        <h3 className="font-black text-xl leading-tight mb-2 tracking-tight">
          Start Building
        </h3>
        <p className="text-xs font-semibold text-[#12102A]/85 mb-6 leading-relaxed">
          {nextLessonTitle
            ? `Pick up where you left off with "${nextLessonTitle}".`
            : 'Jump into your next lesson and keep building this system.'}
        </p>
      </div>

      <div className="mt-auto p-3.5 rounded-xl flex items-center justify-between transition-colors bg-[#12102A] group-hover:bg-[#1c1940]">
        <span className="text-[10px] font-black tracking-widest font-mono text-[#F5A623]">
          START BUILDING
        </span>
        <div className="w-6 h-6 rounded-full flex items-center justify-center group-hover:translate-x-0.5 transition-transform bg-[#F5A623]/20 text-[#F5A623]">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </motion.div>
  );
};
