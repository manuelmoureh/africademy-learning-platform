import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { PortfolioVerification } from '../types';
import { PLACEHOLDER_VERIFIED_WORK } from '../data/courses';
import { SystemThumbnail } from './SystemThumbnail';
import { VerifiedPortfolioModal } from './VerifiedPortfolioModal';

// Maps each placeholder profile to its real track/system for the SystemThumbnail preview,
// keyed by student name since PortfolioVerification only stores the human-readable track title.
const TRACK_ID_BY_STUDENT: Record<string, string> = {
  'Manuel Moureh': 'whatsapp-retail-agent',
  'Vivian Bii': 'lead-capture-bot',
  'Liza Malemba': 'invoicing-assistant',
  'Sammy Mwashighadi': 'support-ticketing-agent',
  'Victor Koech': 'payment-collections-agent',
};

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
        <img src="/logo-dark.png" alt="Afridemy" className="h-7 w-auto" />
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
              <div
                className="h-36 bg-[#12102A] flex items-center justify-center p-4"
                style={{
                  backgroundImage: 'radial-gradient(rgba(245,166,35,0.15) 1px, transparent 1px)',
                  backgroundSize: '14px 14px',
                }}
              >
                <SystemThumbnail trackId={TRACK_ID_BY_STUDENT[profile.studentName]} />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <span className="text-xs font-bold text-[#F5A623]">
                  {profile.smeReviewer.company}
                </span>
                <h3 className="font-bold text-base text-[#12102A] group-hover:text-[#F5A623] transition-colors mt-1 leading-snug">
                  {profile.trackTitle}
                </h3>
                <p className="text-xs text-[#12102A]/70 font-semibold mt-1.5">
                  Built by {profile.studentName}
                </p>

                <div className="mt-4 pt-4 border-t border-[#12102A]/10 flex items-center justify-between">
                  <span className="flex items-center gap-1 text-xs font-bold text-[#10B981]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified
                  </span>
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
