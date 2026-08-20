import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';

interface PaymentCallbackPageProps {
  reference: string | null;
  onDone: (trackId: string | null) => void;
}

// Where Paystack redirects the browser back to after the customer pays (or cancels) on
// its hosted page. Confirms the result immediately via /api/payments/verify rather than
// waiting on the webhook, which can lag a few seconds and, during local dev, can't reach
// this machine at all.
export const PaymentCallbackPage: React.FC<PaymentCallbackPageProps> = ({ reference, onDone }) => {
  const [state, setState] = useState<'checking' | 'success' | 'failed' | 'error'>('checking');
  const [trackId, setTrackId] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) {
      setState('error');
      return;
    }

    let cancelled = false;
    fetch(`/api/payments/verify?reference=${encodeURIComponent(reference)}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.status === 'success') {
          setTrackId(data.trackId ?? null);
          setState('success');
        } else if (data.status === 'failed' || data.status === 'abandoned') {
          setState('failed');
        } else {
          setState('error');
        }
      })
      .catch(() => {
        if (!cancelled) setState('error');
      });

    return () => {
      cancelled = true;
    };
  }, [reference]);

  return (
    <div className="min-h-screen bg-[#F0EEF6] text-[#12102A] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-[#12102A]/10 shadow-lg p-8 text-center space-y-5">
        {state === 'checking' && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-[#F5A623]/10 text-[#F5A623] flex items-center justify-center mx-auto">
              <Loader2 className="w-7 h-7 animate-spin" />
            </div>
            <h1 className="text-xl font-black">Confirming your payment...</h1>
            <p className="text-sm text-[#12102A]/60">This only takes a moment.</p>
          </>
        )}

        {state === 'success' && (
          <>
            <div className="w-14 h-14 rounded-full bg-[#10B981] text-white flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-black">Payment confirmed</h1>
            <p className="text-sm text-[#12102A]/60">
              Every remaining lesson in this system is unlocked, yours to keep.
            </p>
            <button
              onClick={() => onDone(trackId)}
              className="w-full py-3 bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] text-sm font-black rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              Continue Learning
              <ArrowRight className="w-4 h-4" />
            </button>
          </>
        )}

        {state === 'failed' && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <XCircle className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-black">Payment didn't go through</h1>
            <p className="text-sm text-[#12102A]/60">
              Nothing was charged. You can try again whenever you're ready.
            </p>
            <button
              onClick={() => onDone(null)}
              className="w-full py-3 bg-[#12102A] hover:bg-[#1c1940] text-white text-sm font-bold rounded-xl cursor-pointer transition-all active:scale-[0.98]"
            >
              Back to Afridemy
            </button>
          </>
        )}

        {state === 'error' && (
          <>
            <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <XCircle className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-black">Couldn't confirm this payment</h1>
            <p className="text-sm text-[#12102A]/60">
              If you were charged, it'll still be recorded and unlock automatically -
              email hello@afridemy.online if it doesn't show up shortly.
            </p>
            <button
              onClick={() => onDone(null)}
              className="w-full py-3 bg-[#12102A] hover:bg-[#1c1940] text-white text-sm font-bold rounded-xl cursor-pointer transition-all active:scale-[0.98]"
            >
              Back to Afridemy
            </button>
          </>
        )}
      </div>
    </div>
  );
};
