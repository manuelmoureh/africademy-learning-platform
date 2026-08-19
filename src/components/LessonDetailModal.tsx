import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Step } from '../types';
import { X, CheckCircle2, Code2, BookOpen, Sparkles, ArrowRight, Lock } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface LessonDetailModalProps {
  step: Step | null;
  onClose: () => void;
  onUnlock: () => void;
  onToggleComplete: (stepId: string) => void;
  onNext?: () => void;
  isUnlocked: boolean;
  trackTitle: string;
  trackPrice: number;
}

export const LessonDetailModal: React.FC<LessonDetailModalProps> = ({
  step,
  onClose,
  onUnlock,
  onToggleComplete,
  onNext,
  isUnlocked,
  trackTitle,
  trackPrice,
}) => {
  const isLocked = step ? step.isGated && !isUnlocked : false;
  const isCompleted = step?.status === 'completed';
  // "status" tracks a learner's own progress on this lesson (completed / not yet),
  // separate from isGated (paywall). Never surface the raw "locked" progress value
  // here - it reads as "paywalled" even on a free lesson nobody's started yet.
  const badgeLabel = isLocked ? 'LOCKED' : isCompleted ? 'COMPLETED' : 'AVAILABLE';

  const contentRef = useRef<HTMLDivElement>(null);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [hasWaitedEnough, setHasWaitedEnough] = useState(false);

  // Every time we land on a (possibly new) lesson: jump the content back to the top -
  // without this, "Next Lesson" swaps the content underneath while keeping whatever
  // scroll position you were at, which reads as "nothing happened". Also reset both
  // read-gates. Scrolling to the bottom only proves you SAW everything - a short
  // lesson that fits on screen would satisfy that instantly with zero reading time,
  // so a short minimum dwell is required too, on every lesson regardless of length.
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    el.scrollTop = 0;
    setHasReachedEnd(el.scrollHeight <= el.clientHeight + 4);
    setHasWaitedEnough(false);
    const timer = setTimeout(() => setHasWaitedEnough(true), 4000);
    return () => clearTimeout(timer);
  }, [step?.id]);

  const handleContentScroll = () => {
    if (hasReachedEnd) return;
    const el = contentRef.current;
    if (el && el.scrollHeight - el.scrollTop - el.clientHeight < 24) {
      setHasReachedEnd(true);
    }
  };

  // You can always undo a completion, but you can't mark a lesson done until you've
  // actually scrolled through it - "Mark as Completed" shouldn't be a button that
  // works before anyone's read anything.
  const canMarkComplete = isCompleted || (hasReachedEnd && hasWaitedEnough);

  return (
    <AnimatePresence>
      {step && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12102A]/60 backdrop-blur-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-white border border-[#12102A]/10 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#12102A]/10 bg-[#F0EEF6]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#12102A] text-[#F5A623] flex items-center justify-center font-mono font-bold text-xs">
              {step.number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#F5A623]">
                  {step.category} • {step.duration}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                  isLocked
                    ? 'bg-gray-100 text-gray-500 flex items-center gap-1'
                    : isCompleted
                    ? 'bg-[#10B981]/15 text-[#10B981]'
                    : 'bg-[#F5A623]/20 text-[#F5A623]'
                }`}>
                  {badgeLabel}
                </span>
              </div>
              <h3 className="text-lg font-black text-[#12102A] leading-snug">
                {step.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#12102A]/40 hover:text-[#12102A] hover:bg-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {isLocked ? (
          /* Locked State */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1 p-8 overflow-y-auto flex flex-col items-center justify-center text-center space-y-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] flex items-center justify-center">
              <Lock className="w-8 h-8" />
            </div>

            <div className="max-w-md space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-[#F5A623]">
                Locked Lesson
              </span>
              <h4 className="text-2xl font-black text-[#12102A]">
                Step {step.number} is Locked
              </h4>
              <p className="text-xs text-[#12102A]/70 leading-relaxed font-medium">
                {step.summary}
              </p>
            </div>

            {/* What's inside preview */}
            <div className="p-4 rounded-xl bg-[#F0EEF6] border border-[#12102A]/10 text-left w-full max-w-md space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#12102A]/50 block">
                Modules in this step:
              </span>
              <div className="space-y-1.5 text-xs text-[#12102A]/80 font-medium">
                {step.content.keyLearnings.map((learning, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-[#F5A623] font-bold">•</span>
                    <span>{learning}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onUnlock();
              }}
              className="px-6 py-3 bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] text-xs font-black rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-colors active:scale-[0.98]"
            >
              Unlock {trackTitle} (KES {trackPrice.toLocaleString()})
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          /* Full Unlocked Content */
          <motion.div
            ref={contentRef}
            onScroll={handleContentScroll}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex-1 p-6 overflow-y-auto space-y-6"
          >
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#12102A]/40 font-mono mb-2">
                Lesson Overview
              </h4>
              <p className="text-sm text-[#12102A]/80 leading-relaxed font-medium">
                {step.content.overview}
              </p>
            </div>

            {/* The actual lesson - real instructional content, not a restatement of the overview */}
            {step.content.lessonBody && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#12102A]/40 font-mono mb-3">
                  The Lesson
                </h4>
                <div className="space-y-3">
                  {step.content.lessonBody.split(/\n\s*\n/).map((paragraph, idx) => (
                    <p key={idx} className="text-sm text-[#12102A]/80 leading-relaxed font-medium">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Key Learnings */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#12102A]/40 font-mono mb-3">
                Core Competencies & Objectives
              </h4>
              <div className="space-y-2">
                {step.content.keyLearnings.map((learning, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F0EEF6] border border-[#12102A]/5">
                    <div className="w-5 h-5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-xs font-semibold text-[#12102A]/85">
                      {learning}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Prompt or Code Snippet */}
            {step.content.samplePrompt && (
              <CodeBlock code={step.content.samplePrompt} label="Production System Prompt Blueprint" colorClass="text-emerald-400" />
            )}

            {step.content.codeSnippet && (
              <CodeBlock code={step.content.codeSnippet} label="TypeScript Implementation" colorClass="text-amber-300" />
            )}

            {/* Test Case */}
            {step.content.testCase && (
              <div className="p-4 rounded-xl border-2 border-[#F5A623]/30 bg-[#F5A623]/5">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-[#F5A623]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#12102A] font-mono">
                    Verification Test Case
                  </h4>
                </div>
                <p className="text-xs text-[#12102A]/70 mb-1">
                  <b>Input:</b> "{step.content.testCase.input}"
                </p>
                <p className="text-xs text-[#12102A]/70">
                  <b>Expected Output:</b> "{step.content.testCase.expectedOutput}"
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Footer Actions */}
        {!isLocked && (
          <div className="px-6 py-4 bg-[#F0EEF6] border-t border-[#12102A]/10 flex items-center justify-between gap-3">
            <button
              onClick={() => onToggleComplete(step.id)}
              disabled={!canMarkComplete}
              title={!canMarkComplete ? 'Finish reading this lesson to mark it complete' : undefined}
              className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                !canMarkComplete
                  ? 'bg-white border border-[#12102A]/10 text-[#12102A]/35 cursor-not-allowed'
                  : isCompleted
                  ? 'bg-[#10B981]/15 text-[#10B981] hover:bg-[#10B981]/25 cursor-pointer'
                  : 'bg-white border border-[#12102A]/10 text-[#12102A] hover:border-[#10B981] hover:text-[#10B981] cursor-pointer'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {isCompleted ? 'Completed (Click to Reset)' : canMarkComplete ? 'Mark as Completed' : 'Reading...'}
            </button>

            {onNext && (
              <button
                onClick={onNext}
                disabled={!canMarkComplete}
                title={!canMarkComplete ? 'Finish reading this lesson to continue' : undefined}
                className={`px-4 py-2 text-xs font-black rounded-lg flex items-center gap-1.5 shadow-xs transition-all ${
                  canMarkComplete
                    ? 'bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] cursor-pointer active:scale-[0.97]'
                    : 'bg-[#12102A]/10 text-[#12102A]/35 cursor-not-allowed shadow-none'
                }`}
              >
                Next Lesson
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
};
