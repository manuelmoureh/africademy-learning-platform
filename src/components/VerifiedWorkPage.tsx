import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';
import { PortfolioVerification } from '../types';
import { PLACEHOLDER_VERIFIED_WORK } from '../data/courses';
import { VerifiedPortfolioModal } from './VerifiedPortfolioModal';

function initialsOf(name: string): string {
  const parts = name.trim().split(' ');
  return parts.length > 1 ? `${parts[0][0]}${parts[1][0]}`.toUpperCase() : name.slice(0, 2).toUpperCase();
}

interface VerifiedWorkPageProps {
  onBack: () => void;
}

export const VerifiedWorkPage: React.FC<VerifiedWorkPageProps> = ({ onBack }) => {
  const [openProfile, setOpenProfile] = useState<PortfolioVerification | null>(null);

  return (
    <div className="min-h-screen bg-[#F0EEF6] text-[#12102A]">
      <nav className="flex items-center gap-4 px-6 lg:px-12 h-20 bg-white/80 backdrop-blur-md border-b border-[#12102A]/10 sticky top-0 z-30">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-bold text-[#12102A]/70 hover:text-[#12102A] cursor-pointer transition-all active:scale-[0.97]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <div className="w-px h-5 bg-[#12102A]/10" />
        <img src="/logo-dark.png" alt="Afridemy" className="h-14 w-auto" />
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16 space-y-10">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#12102A]">
            Verified Work
          </h1>
          <p className="text-sm text-[#12102A]/70 font-medium leading-relaxed">
            Every profile here is a system built by a student and confirmed working by the business it was installed for. Open any profile to see the full verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLACEHOLDER_VERIFIED_WORK.map((profile) => (
            <button
              key={profile.id}
              onClick={() => setOpenProfile(profile)}
              className="text-left rounded-2xl border border-[#12102A]/10 bg-white overflow-hidden flex flex-col hover:border-[#F5A623] hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="p-5 flex items-center justify-between gap-3 border-b border-[#12102A]/10 bg-[#F0EEF6]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-full bg-[#12102A] text-[#F5A623] font-black text-sm flex items-center justify-center shrink-0">
                    {initialsOf(profile.studentName)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#12102A]">{profile.studentName}</p>
                    <p className="text-[11px] text-[#12102A]/50 font-semibold leading-snug">{profile.trackTitle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                  <span className="text-sm font-black text-[#10B981]">Verified</span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <p className="text-[10px] font-bold text-[#12102A]/40">Confirmed by</p>
                <h3 className="font-bold text-lg text-[#12102A] group-hover:text-[#F5A623] transition-colors mt-0.5 leading-snug">
                  {profile.smeReviewer.company}
                </h3>
                <p className="text-xs text-[#12102A]/60 mt-1">
                  {profile.smeReviewer.role}, {profile.smeReviewer.location}
                </p>

                <div className="mt-4 pt-4 border-t border-dashed border-[#12102A]/10 flex-1">
                  <p className="text-xs text-[#12102A]/70 italic leading-relaxed">"{profile.smeReviewer.quote}"</p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#12102A]/10 flex items-center justify-end">
                  <span className="text-xs font-bold text-[#12102A] flex items-center gap-1">
                    View Verification <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <VerifiedPortfolioModal
        isOpen={openProfile !== null}
        onClose={() => setOpenProfile(null)}
        verification={openProfile ?? PLACEHOLDER_VERIFIED_WORK[0]}
        completedSteps={openProfile?.rubric.length ?? 0}
        totalSteps={openProfile?.rubric.length ?? 0}
      />
    </div>
  );
};
