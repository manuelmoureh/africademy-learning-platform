import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Check, Lock, CheckCircle2, Star } from 'lucide-react';
import { Track } from '../types';
import { TrackIcon } from '../utils/trackIcons';
import { StarRating } from './StarRating';
import { fetchUserTrackRating, submitTrackRating } from '../lib/db';

const RateSystem: React.FC<{ trackId: string; userId: string | null; onOpenAuth: () => void }> = ({ trackId, userId, onOpenAuth }) => {
  const [myRating, setMyRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!userId) return;
    fetchUserTrackRating(userId, trackId).then(setMyRating);
  }, [userId, trackId]);

  const handleRate = async (rating: number) => {
    if (!userId) {
      onOpenAuth();
      return;
    }
    setSaving(true);
    setMyRating(rating);
    await submitTrackRating(userId, trackId, rating);
    setSaving(false);
  };

  return (
    <div className="p-4 rounded-xl border border-[#12102A]/10 bg-[#F0EEF6] space-y-2">
      <p className="text-xs font-bold text-[#12102A]/60">
        {myRating ? 'Your rating' : 'Rate this system'}
      </p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            disabled={saving}
            onClick={() => handleRate(i)}
            onMouseEnter={() => setHoverRating(i)}
            onMouseLeave={() => setHoverRating(null)}
            className="cursor-pointer disabled:cursor-wait"
          >
            <Star
              className={`w-5 h-5 transition-colors ${
                i <= (hoverRating ?? myRating ?? 0) ? 'fill-[#F5A623] text-[#F5A623]' : 'fill-[#12102A]/10 text-[#12102A]/10'
              }`}
            />
          </button>
        ))}
      </div>
      {!userId && <p className="text-[10px] text-[#12102A]/50 font-medium">Sign in to rate this system.</p>}
    </div>
  );
};

const ModuleRow: React.FC<{ step: Track['steps'][number]; isUnlocked: boolean }> = ({ step, isUnlocked }) => {
  const isLocked = step.isGated && !isUnlocked;

  return (
    <div className="rounded-xl border border-[#12102A]/10 bg-white overflow-hidden flex items-center gap-3 p-3">
      <span className="text-xs font-mono font-bold text-[#12102A]/40 w-6 shrink-0">{step.number}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-[#12102A] truncate">{step.title}</p>
        <p className="text-[11px] text-[#12102A]/50 truncate">{step.subtitle}</p>
      </div>
      <span className="text-[10px] font-mono text-[#12102A]/40 shrink-0">{step.duration}</span>
      {isLocked ? (
        <Lock className="w-3.5 h-3.5 text-[#12102A]/30 shrink-0" />
      ) : (
        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]/60 shrink-0" />
      )}
    </div>
  );
};

interface CourseDetailPageProps {
  track: Track;
  isUnlocked: boolean;
  userId: string | null;
  onBack: () => void;
  onStart: () => void;
  onOpenAuth: () => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ track, isUnlocked, userId, onBack, onStart, onOpenAuth }) => {
  const learnings = Array.from(
    new Set(track.steps.flatMap((s) => s.content.keyLearnings).slice(0, 6))
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="p-6 md:p-10 max-w-5xl mx-auto w-full space-y-8"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm font-bold text-[#12102A]/60 hover:text-[#12102A] cursor-pointer transition-all active:scale-[0.97]"
      >
        <ArrowLeft className="w-4 h-4" />
        All systems
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
            <StarRating rating={track.rating} reviewCount={track.reviewCount} className="mt-2" />
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
              System Modules
            </h2>
            {track.steps.length === 0 ? (
              <p className="text-xs text-[#12102A]/60 font-medium p-4 rounded-xl bg-[#F0EEF6] border border-[#12102A]/10">
                Full lesson-by-lesson content for this system is still being written. Join the waitlist by starting free on another track, we'll let you know the moment this one opens.
              </p>
            ) : (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ staggerChildren: 0.06 }}
                className="space-y-2"
              >
                {track.steps.map((step) => (
                  <motion.div
                    key={step.id}
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  >
                    <ModuleRow step={step} isUnlocked={isUnlocked} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Right: pricing + CTA */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-2xl border border-[#12102A]/10 bg-white shadow-xs space-y-5">
            <div>
              <p className="text-xs font-bold text-[#12102A]/50 mb-1">Cost</p>
              <p className="text-2xl font-black text-[#12102A]">KES {track.price.toLocaleString()}</p>
              <p className="text-xs text-[#12102A]/60 mt-1">
                First 5 lessons free, one-time payment for the rest.
              </p>
            </div>

            <button
              onClick={onStart}
              className="w-full py-3 bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] text-sm font-black rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.97] shadow-xs"
            >
              Start This System
              <ArrowRight className="w-4 h-4" />
            </button>

            <RateSystem trackId={track.id} userId={userId} onOpenAuth={onOpenAuth} />
          </div>
        </div>
      </div>
    </motion.section>
  );
};
