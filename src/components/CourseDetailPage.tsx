import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Lock, CheckCircle2, Star, ChevronDown } from 'lucide-react';
import { Track } from '../types';
import { TrackIcon } from '../utils/trackIcons';

const ModuleRow: React.FC<{ step: Track['steps'][number]; isProUser: boolean }> = ({ step, isProUser }) => {
  const [showReviews, setShowReviews] = useState(false);
  const reviews = step.reviews ?? [];
  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="rounded-xl border border-[#12102A]/10 bg-white overflow-hidden">
      <div className="flex items-center gap-3 p-3">
        <span className="text-xs font-mono font-bold text-[#12102A]/40 w-6 shrink-0">{step.number}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-[#12102A] truncate">{step.title}</p>
          <p className="text-[11px] text-[#12102A]/50 truncate">{step.subtitle}</p>
        </div>
        <span className="text-[10px] font-mono text-[#12102A]/40 shrink-0">{step.duration}</span>
        {step.isGated && !isProUser ? (
          <Lock className="w-3.5 h-3.5 text-[#12102A]/30 shrink-0" />
        ) : (
          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]/60 shrink-0" />
        )}
      </div>

      <button
        onClick={() => setShowReviews((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2 border-t border-[#12102A]/5 bg-[#F0EEF6] text-[11px] font-semibold text-[#12102A]/70 hover:text-[#12102A] cursor-pointer transition-colors"
      >
        <span className="flex items-center gap-1.5">
          {reviews.length > 0 ? (
            <>
              <Star className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]" />
              {avgRating.toFixed(1)} ({reviews.length} review{reviews.length === 1 ? '' : 's'})
            </>
          ) : (
            'No reviews yet, be the first learner to complete this lesson'
          )}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showReviews ? 'rotate-180' : ''}`} />
      </button>

      {showReviews && (
        <div className="px-3 pb-3 pt-1 space-y-2 border-t border-[#12102A]/5">
          {reviews.length === 0 ? (
            <p className="text-[11px] text-[#12102A]/50 font-medium pt-2">
              This lesson doesn't have reviews yet. Once learners complete it, their feedback shows up here.
            </p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="pt-2">
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'fill-[#F5A623] text-[#F5A623]' : 'text-[#12102A]/15'}`} />
                  ))}
                </div>
                <p className="text-xs text-[#12102A]/80 font-medium leading-relaxed">"{r.quote}"</p>
                <p className="text-[10px] text-[#12102A]/40 mt-1">{r.learnerName}, {r.cohort}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

interface CourseDetailPageProps {
  track: Track;
  isProUser: boolean;
  onBack: () => void;
  onStart: () => void;
  onOpenPricing: () => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ track, isProUser, onBack, onStart, onOpenPricing }) => {
  const learnings = Array.from(
    new Set(track.steps.flatMap((s) => s.content.keyLearnings).slice(0, 6))
  );

  return (
    <section className="p-6 md:p-10 max-w-5xl mx-auto w-full space-y-8">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-bold text-[#12102A]/60 hover:text-[#12102A] cursor-pointer transition-all active:scale-[0.97]"
      >
        <ArrowLeft className="w-4 h-4" />
        All courses
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: overview + curriculum */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#F5A623]/10 flex items-center justify-center shrink-0">
                <TrackIcon name={track.icon} className="w-4 h-4 text-[#F5A623]" />
              </div>
              <span className="text-[10px] font-mono font-bold text-[#F5A623] uppercase tracking-wider">
                {track.trackNumber}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#12102A] tracking-tight mt-1">
              {track.title}
            </h1>
            <p className="text-sm text-[#12102A]/70 mt-3 leading-relaxed font-medium max-w-xl">
              {track.description}
            </p>
          </div>

          {learnings.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#12102A]/50 mb-3">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {learnings.map((l, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs font-semibold text-[#12102A]/85">
                    <Check className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                    {l}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#12102A]/50 mb-3">
              Course Modules
            </h2>
            {track.steps.length === 0 ? (
              <p className="text-xs text-[#12102A]/60 font-medium p-4 rounded-xl bg-[#F0EEF6] border border-[#12102A]/10">
                Full lesson-by-lesson content for this course is still being written. Join the waitlist by starting free on another track, we'll let you know the moment this one opens.
              </p>
            ) : (
              <div className="space-y-2">
                {track.steps.map((step) => (
                  <ModuleRow key={step.id} step={step} isProUser={isProUser} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: pricing + CTA */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-2xl border border-[#12102A]/10 bg-white shadow-xs space-y-5">
            <div>
              <p className="text-xs font-bold text-[#12102A]/50 uppercase tracking-wider mb-1">Cost</p>
              <p className="text-2xl font-black text-[#12102A]">Free to start</p>
              <p className="text-xs text-[#12102A]/60 mt-1">
                First 5 lessons free. Full course and the live sandbox are KES 3,800/month on Pro.
              </p>
            </div>

            <button
              onClick={onStart}
              className="w-full py-3 bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] text-sm font-black rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.97] shadow-xs"
            >
              Start This Course
              <ArrowRight className="w-4 h-4" />
            </button>

            {!isProUser && (
              <button
                onClick={onOpenPricing}
                className="w-full py-2.5 border border-[#12102A]/10 hover:bg-[#F0EEF6] text-[#12102A] text-xs font-bold rounded-xl cursor-pointer transition-all active:scale-[0.97]"
              >
                See what Pro unlocks
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
