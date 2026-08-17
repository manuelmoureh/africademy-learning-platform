import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, Check, ShieldCheck, Phone, CreditCard, Sparkles,
  ArrowRight, Loader2, CheckCircle2, Lock, Smartphone
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  // When set, this is a one-time per-system unlock rather than the Pro subscription
  // checkout, so the copy and price reflect the specific track being bought.
  product?: { name: string; price: number };
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  product,
}) => {
  const label = product ? product.name : 'Afridemy Pro';
  const price = product ? product.price : 3800;
  const priceDisplay = `KES ${price.toLocaleString()}`;
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card'>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('0712 345 678');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [stage, setStage] = useState<'form' | 'processing' | 'confirmed'>('form');
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    let timer: any;
    if (stage === 'processing' && countdown > 0) {
      timer = setTimeout(() => setCountdown(c => c - 1), 1000);
    } else if (stage === 'processing' && countdown === 0) {
      setStage('confirmed');
    }
    return () => clearTimeout(timer);
  }, [stage, countdown]);

  const handleInitiatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStage('processing');
    setCountdown(5); // 5 second simulation for snappy experience
  };

  const handleFinish = () => {
    onSuccess();
    onClose();
    setStage('form');
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
                {product ? 'System Checkout' : 'Afridemy Pro Checkout'}
              </span>
              <span className="text-[9px] font-bold font-mono px-2 py-0.5 bg-[#10B981]/15 text-[#10B981] rounded">
                SECURE 256-BIT
              </span>
            </div>
            <h3 className="font-black text-xl text-[#12102A]">
              {stage === 'confirmed' ? 'Payment Confirmed' : `Unlock ${label}`}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#12102A]/40 hover:text-[#12102A] hover:bg-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stage 1: Form */}
        {stage === 'form' && (
          <form onSubmit={handleInitiatePayment} className="p-6 space-y-5">
            {/* Price Banner */}
            <div className="p-4 rounded-xl bg-[#12102A] text-white flex items-center justify-between">
              <div>
                <p className="text-xs text-white/70 font-mono">{product ? 'One-time payment' : 'Monthly Pro Membership'}</p>
                <p className="text-2xl font-black text-white">{priceDisplay}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold font-mono px-2 py-1 bg-[#F5A623] text-[#12102A] rounded">
                  INSTANT UNLOCK
                </span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="text-xs font-bold uppercase font-mono text-[#12102A]/60 block mb-2">
                Select Payment Gateway
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('mpesa')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                    paymentMethod === 'mpesa'
                      ? 'border-[#10B981] bg-[#10B981]/5 ring-2 ring-[#10B981]/20'
                      : 'border-[#12102A]/10 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#00A859] text-white flex items-center justify-center font-bold text-xs shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#12102A]">M-Pesa STK</p>
                    <p className="text-[10px] text-[#12102A]/60 font-mono">Prompt on phone</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
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
            </div>

            {/* Inputs based on payment method */}
            {paymentMethod === 'mpesa' ? (
              <div>
                <label className="text-xs font-bold uppercase font-mono text-[#12102A]/60 block mb-1.5">
                  Safaricom M-Pesa Phone Number
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-mono px-3 py-2.5 bg-[#F0EEF6] border border-[#12102A]/10 rounded-xl text-[#12102A]">
                    +254
                  </span>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="712 345 678"
                    required
                    className="flex-1 bg-[#F0EEF6] border border-[#12102A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#12102A] font-mono font-bold focus:outline-hidden focus:border-[#00A859]"
                  />
                </div>
                <p className="text-[11px] text-[#12102A]/60 mt-1.5">
                  A Daraja prompt will appear on your phone asking for your M-Pesa PIN.
                </p>
              </div>
            ) : (
              <div>
                <label className="text-xs font-bold uppercase font-mono text-[#12102A]/60 block mb-1.5">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Card Number"
                  required
                  className="w-full bg-[#F0EEF6] border border-[#12102A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#12102A] font-mono font-bold focus:outline-hidden focus:border-[#F5A623]"
                />
              </div>
            )}

            {/* Included feature list */}
            <div className="p-3.5 rounded-xl bg-[#F0EEF6] border border-[#12102A]/5 space-y-2">
              {product ? (
                <>
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
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-xs text-[#12102A]/80 font-medium">
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                    Unlocks all 12 production steps across all tracks
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#12102A]/80 font-medium">
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                    Full live Gemini 3.7 Flash AI sandbox runtime
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#12102A]/80 font-medium">
                    <Check className="w-3.5 h-3.5 text-[#10B981]" />
                    Verified developer portfolio with live shareable link & rubric
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#00A859] hover:bg-[#008f4c] text-white font-black text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors"
            >
              {paymentMethod === 'mpesa' ? `Send M-Pesa STK Push (${priceDisplay})` : `Pay ${priceDisplay} with Card`}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Stage 2: Processing STK Push */}
        {stage === 'processing' && (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-[#00A859]/10 text-[#00A859] flex items-center justify-center mx-auto animate-pulse">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>

            <div>
              <h4 className="text-lg font-black text-[#12102A]">
                Check Your Phone (+254 {phoneNumber})
              </h4>
              <p className="text-xs text-[#12102A]/70 mt-1 max-w-sm mx-auto leading-relaxed">
                Safaricom STK Push has been dispatched. Enter your M-Pesa PIN to complete payment of <b>{priceDisplay}</b> to Till Number <b>542109</b> (Afridemy Kenya).
              </p>
            </div>

            <div className="p-3 bg-[#F0EEF6] rounded-xl border border-[#12102A]/10 max-w-xs mx-auto text-xs font-mono text-[#12102A]/60">
              Awaiting Daraja confirmation... ({countdown}s)
            </div>

            <button
              onClick={() => setStage('confirmed')}
              className="text-xs font-bold text-[#00A859] hover:underline cursor-pointer"
            >
              Simulate Instant PIN Entry
            </button>
          </div>
        )}

        {/* Stage 3: Confirmed */}
        {stage === 'confirmed' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="p-8 text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-[#10B981] text-white flex items-center justify-center mx-auto shadow-md"
            >
              <CheckCircle2 className="w-9 h-9" />
            </motion.div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-[#10B981] block mb-1">
                Transaction Verified • Daraja Ref: QK918237
              </span>
              <h4 className="text-2xl font-black text-[#12102A]">
                {product ? `${product.name} Unlocked` : 'Welcome to Afridemy Pro'}
              </h4>
              <p className="text-xs text-[#12102A]/70 mt-2 max-w-sm mx-auto leading-relaxed font-medium">
                {product
                  ? 'Every remaining lesson and the live sandbox for this system are now fully unlocked.'
                  : 'Your account has been upgraded. All 12 production steps, the live Gemini AI sandbox, and verified developer portfolio are now fully unlocked.'}
              </p>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3.5 bg-[#12102A] hover:bg-[#1c1940] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-colors active:scale-[0.98]"
            >
              {product ? 'Continue Learning' : 'Access Pro Dashboard'}
              <ArrowRight className="w-4 h-4 text-[#F5A623]" />
            </button>
          </motion.div>
        )}

      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
};
