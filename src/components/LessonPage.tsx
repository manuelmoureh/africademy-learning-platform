import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, Lock, ChevronRight } from 'lucide-react';
import { Track, Step, UserAccount } from '../types';
import { Header } from './Header';
import { SystemThumbnail } from './SystemThumbnail';
import { RetrievalCheck } from './RetrievalCheck';
import { FadedPractice } from './FadedPractice';
import { CodeBlock } from './CodeBlock';
import { ChatDemo } from './ChatDemo';
import { FlowDiagram } from './FlowDiagram';
import { CompareCard } from './CompareCard';
import { useDocumentMeta } from '../lib/useDocumentMeta';

interface LessonPageProps {
  tracks: Track[];
  track: Track;
  step: Step;
  isUnlocked: boolean;
  user: UserAccount;
  isAuthenticated: boolean;
  authLoading?: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onGoHome: () => void;
  onEnterApp: () => void;
  onSelectCourse: (trackId: string) => void;
  onOpenVerifiedWork: () => void;
  onOpenAbout: () => void;
  onOpenAuth: () => void;
  onBack: () => void;
  onToggleComplete: (stepId: string) => void;
  onUnlock: () => void;
  onNavigateToStep: (stepId: string) => void;
}

export const LessonPage: React.FC<LessonPageProps> = ({
  tracks,
  track,
  step,
  isUnlocked,
  user,
  isAuthenticated,
  authLoading,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onGoHome,
  onEnterApp,
  onSelectCourse,
  onOpenVerifiedWork,
  onOpenAbout,
  onOpenAuth,
  onBack,
  onToggleComplete,
  onUnlock,
  onNavigateToStep,
}) => {
  useDocumentMeta(`${step.title} - ${track.title}`, step.summary);
  const isLocked = step.isGated && !isUnlocked;
  const isCompleted = step.status === 'completed';
  const badgeLabel = isLocked ? 'LOCKED' : isCompleted ? 'COMPLETED' : 'AVAILABLE';

  const stepIndex = track.steps.findIndex((s) => s.id === step.id);
  const nextStep = track.steps[stepIndex + 1];

  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [hasWaitedEnough, setHasWaitedEnough] = useState(false);
  const bottomSentinelRef = useRef<HTMLDivElement>(null);

  // Same read-engagement gate as the modal version, adapted to a real page. An
  // IntersectionObserver on a sentinel at the end of the content is the robust way to
  // detect "scrolled this far" - it fires immediately if the sentinel is already in
  // view (a short lesson that needs no scrolling), and doesn't depend on scroll-event
  // timing math the way a raw scroll listener does.
  useEffect(() => {
    window.scrollTo(0, 0);
    setHasReachedEnd(false);
    setHasWaitedEnough(false);
    const timer = setTimeout(() => setHasWaitedEnough(true), 4000);

    const el = bottomSentinelRef.current;
    let observer: IntersectionObserver | null = null;
    if (el) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setHasReachedEnd(true);
        },
        { threshold: 0 }
      );
      observer.observe(el);
    }

    return () => {
      clearTimeout(timer);
      observer?.disconnect();
    };
  }, [step.id]);

  const canMarkComplete = isCompleted || (hasReachedEnd && hasWaitedEnough);

  return (
    <div className="min-h-screen bg-[#F0EEF6] text-[#12102A]">
      <Header
        tracks={tracks}
        activeNav="curriculum"
        user={user}
        isAuthenticated={isAuthenticated}
        authLoading={authLoading}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        onGoHome={onGoHome}
        onEnterApp={onEnterApp}
        onSelectCourse={onSelectCourse}
        onOpenVerifiedWork={onOpenVerifiedWork}
        onOpenAbout={onOpenAbout}
        onOpenAuth={onOpenAuth}
      />

      <motion.article
        key={step.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="max-w-2xl mx-auto px-6 py-12"
      >
        <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#12102A]/50 mb-4 flex-wrap">
          <button onClick={onGoHome} className="hover:text-[#12102A] transition-colors cursor-pointer">Home</button>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <button onClick={() => onSelectCourse(track.id)} className="hover:text-[#12102A] transition-colors cursor-pointer">{track.title}</button>
          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
          <span className="text-[#12102A] truncate max-w-[160px] sm:max-w-none">{step.title}</span>
        </nav>

        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-bold text-[#12102A]/60 hover:text-[#12102A] cursor-pointer transition-all active:scale-[0.97] mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {track.title}
        </button>

        {/* Hero */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#12102A] text-[#F5A623] flex items-center justify-center font-mono font-bold text-xs shrink-0">
              {step.number}
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#F5A623]">
              {step.category} • {step.duration}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
              isLocked
                ? 'bg-gray-100 text-gray-500'
                : isCompleted
                ? 'bg-[#10B981]/15 text-[#10B981]'
                : 'bg-[#F5A623]/20 text-[#F5A623]'
            }`}>
              {badgeLabel}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#12102A] tracking-tight leading-tight">
            {step.title}
          </h1>
          <p className="text-base text-[#12102A]/60 font-medium mt-2">
            {step.subtitle}
          </p>
        </div>

        {isLocked ? (
          /* Locked State */
          <div className="flex flex-col items-center text-center py-16 space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] flex items-center justify-center">
              <Lock className="w-8 h-8" />
            </div>
            <div className="max-w-md space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-[#F5A623]">
                Locked Lesson
              </span>
              <h2 className="text-2xl font-black text-[#12102A]">
                Step {step.number} is Locked
              </h2>
              <p className="text-sm text-[#12102A]/70 leading-relaxed font-medium">
                {step.summary}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#12102A]/10 text-left w-full max-w-md space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-[#12102A]/50 block">
                What's inside:
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
              onClick={onUnlock}
              className="px-6 py-3 bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] text-sm font-black rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-all active:scale-[0.98]"
            >
              Unlock {track.title} (KES {track.price.toLocaleString()})
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Lede */}
            <p className="text-lg text-[#12102A]/80 leading-relaxed font-medium">
              {step.content.overview}
            </p>

            {/* One visual break, so a lesson isn't just a wall of text */}
            <div className="rounded-2xl bg-[#12102A] p-8 flex items-center justify-center">
              <SystemThumbnail trackId={track.id} />
            </div>

            {/* The actual lesson, with visual breaks interleaved between paragraphs so it
                isn't one long scroll of text - each break is placed to reinforce the
                paragraph it follows, not decorate it (Mayer's coherence/signaling). */}
            {step.content.lessonBody && (
              <div className="space-y-6">
                {step.content.lessonBody.split(/\n\s*\n/).map((paragraph, idx) => {
                  const breaks = (step.content.visualBreaks ?? []).filter((b) => b.afterParagraph === idx);
                  return (
                    <React.Fragment key={idx}>
                      <p className="text-base text-[#12102A]/80 leading-relaxed font-medium">
                        {paragraph.trim()}
                      </p>
                      {breaks.map((brk, bIdx) => (
                        <figure key={bIdx} className="flex flex-col items-center gap-3 py-2">
                          {brk.chat && <ChatDemo messages={brk.chat} />}
                          {brk.flow && <FlowDiagram steps={brk.flow} />}
                          {brk.compare && <CompareCard items={brk.compare} />}
                          <figcaption className="text-xs text-[#12102A]/50 font-semibold text-center max-w-sm">
                            {brk.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </React.Fragment>
                  );
                })}
              </div>
            )}

            {/* Worked example, placed where it's relevant rather than tacked on at the end */}
            {(step.content.samplePrompt || step.content.codeSnippet || step.content.testCase) && (
              <div className="rounded-2xl border border-[#12102A]/10 bg-white p-6 space-y-5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F5A623]" />
                  <h2 className="text-sm font-bold uppercase tracking-wider text-[#12102A] font-mono">
                    Worked Example
                  </h2>
                </div>

                {step.content.samplePrompt && (
                  <CodeBlock code={step.content.samplePrompt} label="Production System Prompt" colorClass="text-emerald-400" />
                )}

                {step.content.codeSnippet && (
                  <CodeBlock code={step.content.codeSnippet} label="Implementation" colorClass="text-amber-300" />
                )}

                {step.content.testCase && (
                  <div className="p-4 rounded-xl border-2 border-[#F5A623]/30 bg-[#F5A623]/5">
                    <p className="text-xs text-[#12102A]/70 mb-1">
                      <b>Input:</b> "{step.content.testCase.input}"
                    </p>
                    <p className="text-xs text-[#12102A]/70">
                      <b>Expected Output:</b> "{step.content.testCase.expectedOutput}"
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* The lesson's one active-recall beat (the "testing effect" / "worked example
                effect") - fadedPractice for hands-on/code lessons, interactiveCheck for
                conceptual ones. Placed after the concept and worked example, before the
                recap, so it asks the learner to retrieve rather than just re-read. */}
            {step.content.fadedPractice && (
              <FadedPractice data={step.content.fadedPractice} />
            )}
            {step.content.interactiveCheck && (
              <RetrievalCheck data={step.content.interactiveCheck} />
            )}

            {/* Recap */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#12102A]/50 mb-3">
                What you'll walk away knowing
              </h2>
              <div className="space-y-2">
                {step.content.keyLearnings.map((learning, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-[#12102A]/5">
                    <div className="w-5 h-5 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span className="text-sm font-semibold text-[#12102A]/85">{learning}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Marks "you've scrolled through the actual content" for the read gate below */}
            <div ref={bottomSentinelRef} aria-hidden="true" className="h-px" />

            {/* Completion + progression */}
            <div className="pt-6 border-t border-[#12102A]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => onToggleComplete(step.id)}
                disabled={!canMarkComplete}
                title={!canMarkComplete ? 'Finish reading this lesson to mark it complete' : undefined}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-1.5 transition-all ${
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

              {nextStep ? (
                <button
                  onClick={() => onNavigateToStep(nextStep.id)}
                  disabled={!canMarkComplete}
                  title={!canMarkComplete ? 'Finish reading this lesson to continue' : undefined}
                  className={`w-full sm:w-auto px-4 py-2.5 text-sm font-black rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-all ${
                    canMarkComplete
                      ? 'bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] cursor-pointer active:scale-[0.97]'
                      : 'bg-[#12102A]/10 text-[#12102A]/35 cursor-not-allowed shadow-none'
                  }`}
                >
                  Next: {nextStep.title}
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </button>
              ) : (
                <button
                  onClick={onBack}
                  disabled={!canMarkComplete}
                  className={`w-full sm:w-auto px-4 py-2.5 text-sm font-black rounded-lg flex items-center justify-center gap-1.5 shadow-xs transition-all ${
                    canMarkComplete
                      ? 'bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] cursor-pointer active:scale-[0.97]'
                      : 'bg-[#12102A]/10 text-[#12102A]/35 cursor-not-allowed shadow-none'
                  }`}
                >
                  Back to Curriculum
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </motion.article>
    </div>
  );
};
