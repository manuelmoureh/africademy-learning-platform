import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, CheckCircle2, Share2, Link2, Check, Copy, UserCheck } from 'lucide-react';
import { PortfolioVerification } from '../types';

interface VerifiedPortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  verification: PortfolioVerification;
  completedSteps: number;
  totalSteps: number;
}

export const VerifiedPortfolioModal: React.FC<VerifiedPortfolioModalProps> = ({
  isOpen,
  onClose,
  verification,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'rubric' | 'reviewer'>('rubric');
  const statusLabel = verification.status === 'Verified Production Grade' ? 'Verified' : 'In Progress';

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(verification.liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12102A]/60 backdrop-blur-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-white border border-[#12102A]/10 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#12102A]/10 bg-[#F0EEF6]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#10B981]/15 text-[#10B981] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-[#12102A]">Verified System</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-[#10B981]/15 text-[#10B981] rounded-full">
                  {statusLabel}
                </span>
              </div>
              <p className="text-xs text-[#12102A]/60">
                Verified {verification.issueDate}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#12102A]/40 hover:text-[#12102A] hover:bg-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          
          {/* Top Hero Banner - Student & Artifact Summary */}
          <div className="p-6 rounded-2xl bg-[#12102A] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-xs text-white/60 font-semibold mb-2">
                {verification.trackTitle}
              </p>
              <h2 className="text-2xl font-black tracking-tight text-white">
                {verification.studentName}
              </h2>
              <p className="text-xs text-white/70 mt-1 max-w-xl leading-relaxed">
                {verification.summary}
              </p>
            </div>

            {/* Verified Badge */}
            <div className="flex items-center gap-3 bg-white/10 p-4 rounded-xl border border-white/10 shrink-0 self-stretch md:self-auto justify-center md:justify-center">
              <div className="w-10 h-10 rounded-lg bg-[#10B981]/20 flex items-center justify-center text-[#10B981]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <span className="text-lg font-black text-[#10B981]">Verified</span>
            </div>
          </div>

          {/* Live Portfolio Shareable Link Box */}
          <div className="p-4 rounded-xl border border-[#12102A]/10 bg-[#F0EEF6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#12102A]/5 flex items-center justify-center text-[#12102A] shrink-0">
                <Link2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-[#12102A]/50">
                  Shareable Link
                </p>
                <a
                  href={verification.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold font-mono text-[#12102A] hover:text-[#F5A623] truncate block"
                >
                  {verification.liveUrl}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <button
                onClick={handleCopyLink}
                className="px-3 py-1.5 rounded-lg border border-[#12102A]/10 bg-white hover:bg-gray-50 text-xs font-bold text-[#12102A] flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied Link' : 'Copy Link'}
              </button>
            </div>
          </div>

          {/* Telemetry Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {verification.metrics.map((metric) => (
              <div key={metric.label} className="p-3.5 rounded-xl border border-[#12102A]/10 bg-white text-center">
                <span className="text-[10px] text-[#12102A]/50 block">{metric.label}</span>
                <span className="text-base font-bold font-mono text-[#12102A]">{metric.value}</span>
              </div>
            ))}
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex border-b border-[#12102A]/10 gap-6 text-xs font-bold">
            <button
              onClick={() => setActiveTab('rubric')}
              className={`pb-2 transition-all ${
                activeTab === 'rubric'
                  ? 'text-[#12102A] border-b-2 border-[#F5A623]'
                  : 'text-[#12102A]/50 hover:text-[#12102A]'
              }`}
            >
              What Was Checked
            </button>
            <button
              onClick={() => setActiveTab('reviewer')}
              className={`pb-2 transition-all ${
                activeTab === 'reviewer'
                  ? 'text-[#12102A] border-b-2 border-[#F5A623]'
                  : 'text-[#12102A]/50 hover:text-[#12102A]'
              }`}
            >
              What The Business Says
            </button>
          </div>

          {/* Tab 1: Rubric Breakdown */}
          {activeTab === 'rubric' && (
            <div className="space-y-3">
              {verification.rubric.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 rounded-xl border border-[#12102A]/10 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#10B981]/15 text-[#10B981] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#12102A]">
                        {item.criteria}
                      </h4>
                      <p className="text-[11px] text-[#12102A]/70 mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-[#10B981]/10 text-[#10B981] rounded">
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: SME Reviewer Card */}
          {activeTab === 'reviewer' && (
            <div className="p-6 rounded-2xl border border-[#12102A]/10 bg-[#F0EEF6] space-y-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-[#12102A] text-[#F5A623] font-bold text-sm flex items-center justify-center font-mono">
                  {verification.smeReviewer.avatarInitials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#12102A]">
                    {verification.smeReviewer.name}
                  </h4>
                  <p className="text-xs text-[#12102A]/60">
                    {verification.smeReviewer.role}, {verification.smeReviewer.company}
                  </p>
                  <p className="text-[10px] text-[#12102A]/40 mt-0.5">
                    {verification.smeReviewer.location}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-[#12102A]/5 text-xs text-[#12102A]/85 italic leading-relaxed">
                "{verification.smeReviewer.quote}"
              </div>

              <div className="flex items-center gap-2 text-[10px] font-bold text-[#10B981]">
                <UserCheck className="w-4 h-4" />
                Confirmed by the business, not self-reported
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-[#F0EEF6] border-t border-[#12102A]/10 flex items-center justify-between gap-3">
          <span className="text-xs text-[#12102A]/60 hidden sm:inline">
            Live and in real use
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-lg border border-[#12102A]/10 bg-white hover:bg-gray-50 text-xs font-bold text-[#12102A] flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              Share Link
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#12102A] hover:bg-[#1c1940] text-white text-xs font-bold rounded-lg cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
};
