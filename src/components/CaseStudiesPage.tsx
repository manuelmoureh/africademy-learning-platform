import React from 'react';
import { ArrowLeft, Workflow, Clock } from 'lucide-react';

interface CaseStudy {
  studentName: string;
  track: string;
  business: string;
  systemTitle: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    studentName: 'Vivian K.',
    track: 'SME Finance',
    business: 'Dream Credit',
    systemTitle: 'Automated Invoice Follow-Up AI System',
  },
  {
    studentName: 'Brian O.',
    track: 'Core Commerce',
    business: 'Nyota Fashion House',
    systemTitle: 'WhatsApp AI Agent for Retail',
  },
  {
    studentName: 'Aisha M.',
    track: 'Growth Engines',
    business: 'Coastline Properties',
    systemTitle: 'Lead Qualification Agent for Real Estate',
  },
  {
    studentName: 'Kevin N.',
    track: 'Support Ops',
    business: 'LinkNet Kenya',
    systemTitle: 'AI Customer Support & Ticketing Agent',
  },
  {
    studentName: 'Faith W.',
    track: 'Service Ops',
    business: 'Radiance Beauty Clinic',
    systemTitle: 'AI Booking & Appointment Scheduler',
  },
];

interface CaseStudiesPageProps {
  onBack: () => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#12102A]">
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
            What Our Students Have Built
          </h1>
          <p className="text-sm text-[#12102A]/70 font-medium leading-relaxed">
            Every build here shows a workflow a student shipped for a real business. These five are illustrative placeholders showing how a finished, verified build gets presented, real case studies replace them as students complete verified work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.studentName}
              className="rounded-2xl border border-[#12102A]/10 bg-white overflow-hidden flex flex-col"
            >
              {/* Workflow thumbnail, stylized, not a real screenshot */}
              <div className="h-32 bg-gradient-to-br from-[#12102A] to-[#3f3a6b] flex items-center justify-center">
                <Workflow className="w-10 h-10 text-[#F5A623]" />
              </div>

              <div className="p-5 flex flex-col flex-1">
                <span className="text-[10px] font-mono font-bold text-[#F5A623] uppercase tracking-wider">
                  {cs.track}
                </span>
                <h3 className="font-bold text-base text-[#12102A] mt-1 leading-snug">
                  {cs.systemTitle}
                </h3>
                <p className="text-xs text-[#12102A]/70 font-semibold mt-1.5">
                  {cs.studentName} &middot; built for {cs.business}
                </p>

                <div className="mt-4 pt-4 border-t border-dashed border-[#12102A]/15">
                  <p className="text-[10px] font-bold text-[#12102A]/50 uppercase tracking-wider mb-1">Results</p>
                  <p className="text-xs text-[#12102A]/60 font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    Pending verification, placeholder for now
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
