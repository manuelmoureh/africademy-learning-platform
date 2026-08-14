import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, Sparkles, Shield, Zap, Terminal, ShieldCheck, ArrowRight } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
  isProUser: boolean;
}

export const PricingModal: React.FC<PricingModalProps> = ({
  isOpen,
  onClose,
  onOpenCheckout,
  isProUser,
}) => {
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
        
        {/* Header */}
        <div className="p-6 md:p-8 bg-[#FAF9FC] border-b border-[#12102A]/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold text-[#F5A623] uppercase tracking-widest font-mono">
                Afridemy Membership Plans
              </span>
              <span className="bg-[#12102A] text-white text-[9px] font-bold px-2 py-0.5 rounded font-mono">
                KENYA EDITION
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#12102A]">
              Accelerate Your AI Engineering Career
            </h2>
            <p className="text-xs md:text-sm text-[#12102A]/60 mt-1">
              Unlock the production M-Pesa checkout pipeline, live Gemini AI sandbox, and verified portfolios.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#12102A]/40 hover:text-[#12102A] hover:bg-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Pricing Cards Grid */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto">
          
          {/* Free Starter Tier */}
          <div className="border border-[#12102A]/10 rounded-2xl p-6 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-[#12102A]">Learner Free</h3>
                {!isProUser && (
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 bg-[#FAF9FC] rounded border border-[#12102A]/10 text-[#12102A]">
                    CURRENT PLAN
                  </span>
                )}
              </div>
              
              <div className="mb-6">
                <span className="text-3xl font-black text-[#12102A]">KES 0</span>
                <span className="text-xs text-[#12102A]/60 font-mono ml-2">Forever</span>
              </div>

              <ul className="space-y-3 text-xs text-[#12102A]/80 font-medium">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  Full access to 5 foundation lessons (Steps 01–05)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  Community Q&A Forum read & write access
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  Standard simulated Kenya retail catalog demo
                </li>
                <li className="flex items-center gap-2 text-[#12102A]/40">
                  <X className="w-4 h-4 text-gray-300" />
                  Live Safaricom Daraja M-Pesa STK push steps (Steps 06–12)
                </li>
                <li className="flex items-center gap-2 text-[#12102A]/40">
                  <X className="w-4 h-4 text-gray-300" />
                  Verified Developer Portfolio review & live shareable URL
                </li>
              </ul>
            </div>

            <button
              onClick={onClose}
              className="w-full mt-6 py-2.5 bg-[#FAF9FC] border border-[#12102A]/10 text-xs font-bold text-[#12102A] rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            >
              {isProUser ? 'Switch to Free' : 'Continue Free'}
            </button>
          </div>

          {/* Pro Tier */}
          <div className="border-2 border-[#F5A623] rounded-2xl p-6 flex flex-col justify-between bg-[#F5A623]/5 relative shadow-sm">
            <div className="absolute -top-3 right-6 bg-[#12102A] text-[#F5A623] px-3 py-0.5 rounded-full text-[10px] font-black font-mono tracking-wider">
              {isProUser ? 'ACTIVE' : 'MOST POPULAR'}
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F5A623]" />
                  <h3 className="font-bold text-lg text-[#12102A]">Afridemy Pro</h3>
                </div>
              </div>
              
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-3xl font-black text-[#12102A]">KES 3,800</span>
                <span className="text-xs text-[#12102A]/60 font-mono">/ month (or $29 USD)</span>
              </div>

              <ul className="space-y-3 text-xs text-[#12102A] font-semibold">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  Full access to all 12 production engineering steps
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  Live Gemini 3.7 Flash AI sandbox runtime
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  Verified Public Portfolio Link & 5-Point SME Rubric
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  Production Safaricom Daraja M-Pesa STK webhook code
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  Real Estate & SME Invoicing track access
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full mt-6 py-2.5 bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] text-xs font-black rounded-lg cursor-pointer transition-all shadow-xs flex items-center justify-center gap-2"
            >
              {isProUser ? 'Manage Pro Subscription' : 'Upgrade via M-Pesa (KES 3,800)'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
};
