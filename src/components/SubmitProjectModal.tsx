import React, { useState } from 'react';
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react';
import { submitPortfolioProject } from '../lib/db';

interface SubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | null;
  trackId: string;
  trackTitle: string;
  onOpenAuth: () => void;
}

export const SubmitProjectModal: React.FC<SubmitProjectModalProps> = ({
  isOpen,
  onClose,
  userId,
  trackId,
  trackTitle,
  onOpenAuth,
}) => {
  const [projectUrl, setProjectUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setSubmitted(false);
    setProjectUrl('');
    setDemoUrl('');
    setNotes('');
    setError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;
    if (!projectUrl.trim()) return;
    setLoading(true);
    setError(null);
    const { error: submitError } = await submitPortfolioProject({
      userId,
      trackId,
      projectUrl: projectUrl.trim(),
      demoVideoUrl: demoUrl.trim() || undefined,
      notes: notes.trim() || undefined,
    });
    setLoading(false);
    if (submitError) {
      setError(submitError);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12102A]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-[#12102A]/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">

        <div className="p-6 bg-[#FAF9FC] border-b border-[#12102A]/10 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-[#12102A]">Submit Your Project</h3>
            <p className="text-xs text-[#12102A]/60 mt-0.5">{trackTitle}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#12102A]/40 hover:text-[#12102A] hover:bg-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!userId ? (
          <div className="p-6 space-y-4 text-center">
            <p className="text-sm text-[#12102A]/70 font-medium">
              Sign in first so we know whose build this is.
            </p>
            <button
              onClick={() => { handleClose(); onOpenAuth(); }}
              className="px-5 py-2.5 bg-[#12102A] hover:bg-[#1c1940] text-white text-xs font-bold rounded-xl cursor-pointer transition-colors"
            >
              Sign In
            </button>
          </div>
        ) : submitted ? (
          <div className="p-6 space-y-3 text-center">
            <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 text-[#10B981]" />
            </div>
            <p className="text-sm font-bold text-[#12102A]">Submitted for verification</p>
            <p className="text-xs text-[#12102A]/60 leading-relaxed">
              Pending review, placeholder for now, real admin review is not live yet. We'll be in touch once your build is checked.
            </p>
            <button
              onClick={handleClose}
              className="px-5 py-2.5 bg-white border border-[#12102A]/10 hover:bg-[#FAF9FC] text-[#12102A] text-xs font-bold rounded-xl cursor-pointer transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label className="text-xs font-bold uppercase font-mono text-[#12102A]/60 block mb-1.5">
                Live Project URL
              </label>
              <input
                type="url"
                value={projectUrl}
                onChange={(e) => setProjectUrl(e.target.value)}
                placeholder="e.g. your WhatsApp business number, or a live link"
                required
                className="w-full bg-[#FAF9FC] border border-[#12102A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#12102A] font-semibold focus:outline-hidden focus:border-[#F5A623]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase font-mono text-[#12102A]/60 block mb-1.5">
                Demo Link (optional)
              </label>
              <input
                type="url"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="Loom or video link showing it working"
                className="w-full bg-[#FAF9FC] border border-[#12102A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#12102A] font-semibold focus:outline-hidden focus:border-[#F5A623]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase font-mono text-[#12102A]/60 block mb-1.5">
                Notes for the reviewer (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Anything they should know before testing it"
                className="w-full bg-[#FAF9FC] border border-[#12102A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#12102A] font-semibold focus:outline-hidden focus:border-[#F5A623] resize-none"
              />
            </div>

            {error && (
              <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#12102A] hover:bg-[#1c1940] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : (
                <>
                  Submit for Verification
                  <Send className="w-3.5 h-3.5 text-[#F5A623]" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
