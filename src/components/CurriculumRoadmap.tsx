import React from 'react';
import { motion } from 'motion/react';
import { Step } from '../types';
import { Lock, ArrowRight } from 'lucide-react';

const rowFade = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

interface CurriculumRoadmapProps {
  steps: Step[];
  onSelectStep: (step: Step) => void;
  onToggleCompleteStep: (stepId: string) => void;
  isUnlocked: boolean;
}

export const CurriculumRoadmap: React.FC<CurriculumRoadmapProps> = ({
  steps,
  onSelectStep,
  onToggleCompleteStep,
  isUnlocked,
}) => {
  const completedCount = steps.filter(s => s.status === 'completed').length;
  const totalCount = steps.length;

  return (
    <div className="bg-white border border-[#12102A]/10 rounded-2xl p-6 shadow-xs flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <h2 className="font-bold text-lg text-[#12102A]">Curriculum Roadmap</h2>
          <p className="text-xs text-[#12102A]/60 mt-0.5 font-medium">
            Progressive engineering milestones from foundational NLP to M-Pesa checkout webhooks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-[#12102A]/70 font-mono bg-[#F0EEF6] px-2.5 py-1 rounded-md border border-[#12102A]/10">
            {completedCount} OF {totalCount} STEPS COMPLETED
          </span>
        </div>
      </div>

      {/* Roadmap List */}
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.05 }}
        className="space-y-3"
      >
        {steps.map((step) => {
          const isLocked = step.isGated && !isUnlocked;

          if (step.status === 'completed') {
            return (
              <motion.div
                key={step.id}
                variants={rowFade}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                whileHover={{ x: 2 }}
                onClick={() => onSelectStep(step)}
                className="group flex items-center gap-4 p-4 rounded-xl bg-[#10B981]/5 border border-[#10B981]/20 transition-all cursor-pointer hover:border-[#10B981]/40"
              >
                <div className="w-6 h-6 rounded-full bg-[#10B981] flex items-center justify-center text-white text-[10px] font-bold shrink-0 font-mono">
                  ✓
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-[#12102A] truncate">
                      {step.number}. {step.title}
                    </p>
                    <span className="text-[9px] font-mono text-[#10B981] font-bold hidden sm:inline">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-xs text-[#12102A]/60 truncate">
                    {step.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectStep(step);
                    }}
                    className="text-xs font-bold text-[#10B981] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Review <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            );
          }

          if (step.status === 'current' && !isLocked) {
            return (
              <motion.div
                key={step.id}
                variants={rowFade}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                whileHover={{ x: 2 }}
                onClick={() => onSelectStep(step)}
                className="group flex items-center gap-4 p-4 rounded-xl bg-white border border-[#12102A]/10 shadow-xs transition-all cursor-pointer hover:border-[#F5A623]"
              >
                <div className="w-6 h-6 rounded-full border-2 border-[#F5A623] flex items-center justify-center text-[#F5A623] text-[10px] font-bold shrink-0 font-mono">
                  {step.number}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-[#12102A] truncate">
                      {step.number}. {step.title}
                    </p>
                    <span className="text-[9px] font-mono text-[#F5A623] font-bold hidden sm:inline">
                      {step.duration}
                    </span>
                  </div>
                  <p className="text-xs text-[#12102A]/60 truncate">
                    {step.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] font-bold px-2 py-1 bg-[#12102A] text-white rounded font-mono">
                    CURRENT
                  </span>
                </div>
              </motion.div>
            );
          }

          // Locked or Pro Gated state
          return (
            <motion.div
              key={step.id}
              variants={rowFade}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              whileHover={{ x: 2 }}
              onClick={() => onSelectStep(step)}
              className="flex items-center gap-4 p-4 rounded-xl bg-[#F0EEF6] border border-[#12102A]/10 hover:border-[#F5A623] transition-all cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-[10px] font-bold shrink-0 font-mono">
                {step.number}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-[#12102A]/80 group-hover:text-[#12102A] truncate">
                    {step.number}. {step.title}
                  </p>
                  <span className="text-[9px] font-mono text-[#12102A]/40 hidden sm:inline">
                    {step.duration}
                  </span>
                </div>
                <p className="text-xs text-[#12102A]/50 truncate">
                  {step.subtitle}
                </p>
              </div>

              {isLocked && (
                <div className="shrink-0 flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-gray-500" />
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
