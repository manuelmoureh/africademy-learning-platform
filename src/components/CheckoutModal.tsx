import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, CreditCard, ArrowRight, Loader2, Smartphone, AlertCircle, Tag } from 'lucide-react';
import { COUPONS } from '../data/coupons';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: { id: string; name: string; price: number };
  userId: string | null;
  email: string | null;
}

// Real checkout: this modal collects a payment-method preference, then hands off to a
// backend route that starts a real Paystack transaction and redirects the whole browser
// to Paystack's own secure hosted page - we never collect a card number or M-Pesa PIN
// ourselves, that's Paystack's job. Success/failure is confirmed on /payment/callback
// after Paystack redirects back, not inside this component (it unmounts on redirect).
export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  product,
  userId,
  email,
}) => {
  const priceDisplay = `KES ${product.price.toLocaleString()}`;
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [status, setStatus] = useState<'idle' | 'starting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState('');

  const discount = appliedCoupon ? COUPONS[appliedCoupon] : 0;
  const finalPrice = discount ? Math.round(product.price * (1 - discount)) : product.price;
  const finalPriceDisplay = `KES ${finalPrice.toLocaleString()}`;

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) return;
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError('');
    } else {
      setAppliedCoupon(null);
      setCouponError('That code is not valid.');
    }
  };

  const handlePay = async () => {
    if (!userId || !email) {
      setStatus('error');
      setErrorMessage('Sign in first, then come back to unlock this system.');
      return;
    }

    setStatus('starting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trackId: product.id,
          userId,
          email,
          channels: paymentMethod === 'mpesa' ? ['mobile_money'] : ['card'],
          couponCode: appliedCoupon,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.authorization_url) {
        setStatus('error');
        setErrorMessage(data.error || 'Could not start payment. Try again in a moment.');
        return;
      }

      window.location.href = data.authorization_url;
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Check your connection and try again.');
    }
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
        className="bg-white border border-[#12102A]/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top Header */}
        <div className="p-6 bg-[#F0EEF6] border-b border-[#12102A]/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-[#F5A623] uppercase tracking-widest font-mono">
                System Checkout
              </span>
              <span className="text-[9px] font-bold font-mono px-2 py-0.5 bg-[#10B981]/15 text-[#10B981] rounded">
                SECURED BY PAYSTACK
              </span>
            </div>
            <h3 className="font-black text-xl text-[#12102A]">
              Unlock {product.name}
            </h3>
          </div>

          <button
            onClick={onClose}
            disabled={status === 'starting'}
            className="p-1.5 text-[#12102A]/40 hover:text-[#12102A] hover:bg-white rounded-lg transition-colors cursor-pointer disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Price Banner */}
          <div className="p-4 rounded-xl bg-[#12102A] text-white flex items-center justify-between">
            <div>
              <p className="text-xs text-white/70 font-mono">One-time payment</p>
              {discount > 0 ? (
                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-black text-white">{finalPriceDisplay}</p>
                  <p className="text-sm text-white/40 line-through">{priceDisplay}</p>
                </div>
              ) : (
                <p className="text-2xl font-black text-white">{priceDisplay}</p>
              )}
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold font-mono px-2 py-1 bg-[#F5A623] text-[#12102A] rounded">
                INSTANT UNLOCK
              </span>
            </div>
          </div>

          {/* Coupon Code */}
          <div>
            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30">
                <div className="flex items-center gap-2 text-xs font-bold text-[#10B981]">
                  <Tag className="w-3.5 h-3.5" />
                  {appliedCoupon} applied - {Math.round(discount * 100)}% off
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setAppliedCoupon(null);
                    setCouponInput('');
                  }}
                  disabled={status === 'starting'}
                  className="text-[11px] font-bold text-[#12102A]/50 hover:text-[#12102A] cursor-pointer disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      setCouponError('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                    disabled={status === 'starting'}
                    placeholder="Have a discount code?"
                    className="flex-1 px-3 py-2.5 rounded-xl border border-[#12102A]/10 text-xs font-mono placeholder:text-[#12102A]/30 focus:outline-none focus:border-[#F5A623] disabled:opacity-60"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={status === 'starting' || !couponInput.trim()}
                    className="px-4 py-2.5 rounded-xl bg-[#12102A]/5 hover:bg-[#12102A]/10 text-[#12102A] text-xs font-bold cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[11px] text-red-600 mt-1.5 font-medium">{couponError}</p>
                )}
              </div>
            )}
          </div>

          {/* Payment Method Preference */}
          <div>
            <label className="text-xs font-bold uppercase font-mono text-[#12102A]/60 block mb-2">
              How do you want to pay?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('mpesa')}
                disabled={status === 'starting'}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer disabled:opacity-60 ${
                  paymentMethod === 'mpesa'
                    ? 'border-[#10B981] bg-[#10B981]/5 ring-2 ring-[#10B981]/20'
                    : 'border-[#12102A]/10 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#00A859] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#12102A]">M-Pesa</p>
                  <p className="text-[10px] text-[#12102A]/60 font-mono">Prompt on phone</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                disabled={status === 'starting'}
                className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer disabled:opacity-60 ${
                  paymentMethod === 'card'
                    ? 'border-[#F5A623] bg-[#F5A623]/5 ring-2 ring-[#F5A623]/20'
                    : 'border-[#12102A]/10 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#12102A] text-[#F5A623] flex items-center justify-center font-bold text-xs shrink-0">
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#12102A]">Card / Bank</p>
                  <p className="text-[10px] text-[#12102A]/60 font-mono">Visa, Mastercard</p>
                </div>
              </button>
            </div>
            <p className="text-[11px] text-[#12102A]/60 mt-2">
              You'll enter your {paymentMethod === 'mpesa' ? 'M-Pesa PIN' : 'card details'} on Paystack's secure
              page - we never see or store it.
            </p>
          </div>

          {/* Included feature list */}
          <div className="p-3.5 rounded-xl bg-[#F0EEF6] border border-[#12102A]/5 space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#12102A]/80 font-medium">
              <Check className="w-3.5 h-3.5 text-[#10B981]" />
              Unlocks every remaining lesson in {product.name}
            </div>
            <div className="flex items-center gap-2 text-xs text-[#12102A]/80 font-medium">
              <Check className="w-3.5 h-3.5 text-[#10B981]" />
              Full live sandbox for this system
            </div>
            <div className="flex items-center gap-2 text-xs text-[#12102A]/80 font-medium">
              <Check className="w-3.5 h-3.5 text-[#10B981]" />
              One-time payment, yours to keep
            </div>
          </div>

          {status === 'error' && (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              {errorMessage}
            </div>
          )}

          <button
            onClick={handlePay}
            disabled={status === 'starting'}
            className="w-full py-3.5 bg-[#00A859] hover:bg-[#008f4c] text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors disabled:opacity-70"
          >
            {status === 'starting' ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Starting secure checkout...
              </>
            ) : (
              <>
                Continue to Payment ({finalPriceDisplay})
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
};
