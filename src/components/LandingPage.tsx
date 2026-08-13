import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ShieldCheck, ArrowRight, Play, CheckCircle2,
  Check, Users
} from 'lucide-react';
import { Track } from '../types';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenPricing: () => void;
  onOpenAuth: () => void;
  onOpenSandbox: () => void;
  onOpenPortfolio: () => void;
  onOpenAbout: () => void;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
  tracks: Track[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  onOpenPricing,
  onOpenAuth,
  onOpenSandbox,
  onOpenPortfolio,
  onOpenAbout,
  onOpenPrivacy,
  onOpenTerms,
  tracks,
}) => {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#12102A] flex flex-col">
      {/* Top Navbar — translucent, stays legible over whatever scrolls beneath it */}
      <nav className="flex items-center justify-between px-6 lg:px-12 h-20 bg-white/80 backdrop-blur-md border-b border-[#12102A]/10 sticky top-0 z-30">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onEnterApp}>
          <div className="w-10 h-10 rounded-lg bg-[#12102A] flex items-center justify-center shadow-xs">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="3">
              <path d="M20 6L9 17L4 12" />
            </svg>
          </div>
          <div>
            <span className="text-2xl font-black tracking-tighter text-[#12102A] block leading-none">
              AFRICADEMY
            </span>
            <span className="text-[9px] font-bold text-[#F5A623] uppercase tracking-widest font-mono block mt-0.5">
              Learn. Build. Get Paid.
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <button onClick={onEnterApp} className="text-[#12102A]/70 hover:text-[#12102A] cursor-pointer transition-colors">
            Courses
          </button>
          <button onClick={onOpenSandbox} className="text-[#12102A]/70 hover:text-[#12102A] cursor-pointer transition-colors">
            See It Work
          </button>
          <button onClick={onOpenPortfolio} className="text-[#12102A]/70 hover:text-[#12102A] cursor-pointer transition-colors">
            Verified Work
          </button>
          <button onClick={onOpenPricing} className="text-[#12102A]/70 hover:text-[#12102A] cursor-pointer transition-colors">
            Pricing
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAuth}
            className="px-4 py-2 rounded-lg border border-[#12102A]/10 bg-white hover:bg-[#FAF9FC] text-xs font-bold text-[#12102A] cursor-pointer transition-all active:scale-[0.97]"
          >
            Sign In
          </button>
          <button
            onClick={onEnterApp}
            className="px-4 py-2 rounded-lg bg-[#12102A] hover:bg-[#1c1940] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-[0.97] shadow-xs"
          >
            Start Learning
            <ArrowRight className="w-3.5 h-3.5 text-[#F5A623]" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 lg:px-12 py-16 md:py-24 max-w-6xl mx-auto w-full overflow-hidden">
        {/* Subtle living background: a soft amber glow that breathes, motivated by the "still alive" ask, not decoration for its own sake */}
        {!reduce && (
          <motion.div
            aria-hidden
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F5A623]/10 blur-3xl pointer-events-none"
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/20">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#12102A]">
                Now Enrolling: Nairobi Cohort
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#12102A] tracking-[-0.02em] leading-[1.05]">
              Build AI Tools. Get Paid by Real Businesses.
            </h1>

            <p className="text-base sm:text-lg text-[#12102A]/75 font-medium leading-relaxed max-w-xl">
              No diploma to hang on a wall. You build a real AI system, WhatsApp orders, M-Pesa payments, for a real Kenyan business, then show it off with a verified link instead of a resume that just claims you can do it.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onEnterApp}
                className="px-6 py-3.5 bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] font-black text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-[0.97]"
              >
                Start Free, No Card Needed
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSandbox}
                className="px-6 py-3.5 bg-white hover:bg-[#FAF9FC] border border-[#12102A]/10 text-[#12102A] font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.97] shadow-2xs"
              >
                <Play className="w-4 h-4 text-[#F5A623] fill-current" />
                Watch It Answer a Customer
              </button>
            </div>

            {/* Value checklist — outcomes, not spec sheets */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#12102A]/10">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#12102A]/80">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                Works on WhatsApp, where customers already are
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#12102A]/80">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                Takes M-Pesa payments on its own
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#12102A]/80">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                Answers customers instantly, day or night
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#12102A]/80">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                Your work is the proof, not a certificate
              </div>
            </div>
          </div>

          {/* Right Column: Authentic WhatsApp preview, not a dev terminal */}
          <div className="lg:col-span-5">
            <div className="bg-[#E5DDD5] rounded-2xl shadow-2xl border border-[#12102A]/10 overflow-hidden">
              {/* WhatsApp-style header */}
              <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#12102A] flex items-center justify-center text-[#F5A623] font-bold text-xs">
                    AB
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold leading-none">AfrikBot</p>
                    <p className="text-white/70 text-[10px] mt-0.5">online</p>
                  </div>
                </div>
                <span className="text-[9px] font-bold text-[#F5A623] bg-white/10 px-2 py-1 rounded-full">
                  Built by a learner
                </span>
              </div>

              {/* Chat body */}
              <div className="p-4 space-y-3">
                <div className="flex justify-start">
                  <div className="max-w-[85%] bg-white rounded-xl rounded-tl-none px-3 py-2 text-sm text-[#12102A] shadow-sm">
                    Habari! Do you have Maasai beaded sandals, size 40? Can I pay by M-Pesa?
                    <div className="text-[10px] text-[#12102A]/40 mt-1">10:41 AM</div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-[#DCF8C6] rounded-xl rounded-tr-none px-3 py-2 text-sm text-[#12102A] shadow-sm">
                    Karibu! Yes, 18 pairs in stock at KES 2,800. Reply "pay" and I'll send you the M-Pesa prompt right now.
                    <div className="text-[10px] text-[#12102A]/40 mt-1 flex items-center justify-end gap-1">
                      10:41 AM
                      <Check className="w-3 h-3 text-[#34B7F1]" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="bg-white/70 text-[#12102A]/70 text-[11px] font-semibold px-3 py-1.5 rounded-full">
                    M-Pesa payment received, order confirmed
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-white/60 border-t border-[#12102A]/5 flex items-center justify-between">
                <span className="text-[11px] text-[#12102A]/60 font-semibold">This is a real, live conversation</span>
                <button
                  onClick={onOpenSandbox}
                  className="px-3 py-1.5 bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] text-xs font-black rounded-lg transition-all active:scale-[0.97] cursor-pointer"
                >
                  Try It Yourself
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Curriculum Tracks Section */}
      <section className="px-6 lg:px-12 py-16 bg-white border-y border-[#12102A]/10">
        <div className="max-w-6xl mx-auto space-y-12">

          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-3xl sm:text-4xl font-black text-[#12102A]">
              Built Around What African Businesses Actually Pay For
            </h2>
            <p className="text-xs sm:text-sm text-[#12102A]/60">
              Every track ends with you building a real, working system for a real business, not a practice exercise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tracks.map((track, i) => (
              <motion.div
                key={track.id}
                initial={reduce ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 rounded-2xl border border-[#12102A]/10 bg-[#FAF9FC] flex flex-col justify-between hover:border-[#F5A623] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-[#F5A623] uppercase tracking-wider">
                      {track.trackNumber}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#12102A] text-white">
                      {track.steps.length || 8} steps
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-[#12102A] group-hover:text-[#F5A623] transition-colors">
                    {track.title}
                  </h3>

                  <p className="text-xs text-[#12102A]/70 mt-2 leading-relaxed font-medium">
                    {track.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#12102A]/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#10B981]">
                    {track.badgeTitle}
                  </span>
                  <button
                    onClick={onEnterApp}
                    className="text-xs font-bold text-[#12102A] hover:text-[#F5A623] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    See the Steps <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Verified Portfolio vs Certificate Section */}
      <section className="px-6 lg:px-12 py-16 max-w-6xl mx-auto w-full space-y-8">
        <motion.div
          initial={reduce ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 md:p-12 rounded-3xl bg-[#12102A] text-white flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Not a Certificate. A Working System, Live, With Your Name on It.
            </h2>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-medium">
              Anyone can print a PDF. Africademy gives you a real, live link to something a business is actually using, checked and confirmed by that business, not just claimed by you.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenPortfolio}
                className="px-5 py-2.5 bg-[#10B981] hover:bg-[#0ea572] text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer transition-all active:scale-[0.97] shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                See a Real Verified Profile
              </button>
            </div>
          </div>

          <div className="w-full lg:w-96 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 shrink-0">
            <div className="text-xs font-bold text-[#F5A623] uppercase">
              What Gets Checked
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white/90">
                <Check className="w-4 h-4 text-[#10B981]" />
                Never quotes a customer the wrong price
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Check className="w-4 h-4 text-[#10B981]" />
                Never misses an M-Pesa payment
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Check className="w-4 h-4 text-[#10B981]" />
                Can't be tricked into giving away free stuff
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Check className="w-4 h-4 text-[#10B981]" />
                Understands Sheng and Swahili, not just English
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pricing Comparison Section */}
      <section className="px-6 lg:px-12 py-16 bg-white border-t border-[#12102A]/10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#12102A]">
              Start Free. Upgrade When You're Ready to Earn.
            </h2>
            <p className="text-xs text-[#12102A]/60">
              No hidden steps, no surprise charges, exactly what's included at each level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Free Tier */}
            <div className="p-6 rounded-2xl border border-[#12102A]/10 bg-[#FAF9FC] flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-[#12102A]">Learner Free</h3>
                <div className="my-4">
                  <span className="text-3xl font-black text-[#12102A]">KES 0</span>
                  <span className="text-xs text-[#12102A]/60 font-mono ml-2">Forever</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#12102A]/80">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    The first 5 lessons of any track, free
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    Try the live AI agent yourself
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    Ask questions in the community
                  </li>
                </ul>
              </div>

              <button
                onClick={onEnterApp}
                className="w-full mt-6 py-2.5 bg-white border border-[#12102A]/10 hover:bg-gray-50 text-xs font-bold text-[#12102A] rounded-lg cursor-pointer transition-all active:scale-[0.97]"
              >
                Start Free
              </button>
            </div>

            {/* Pro Tier */}
            <div className="p-6 rounded-2xl border-2 border-[#F5A623] bg-[#F5A623]/5 flex flex-col justify-between relative shadow-sm">
              <div className="absolute -top-3 right-6 bg-[#12102A] text-[#F5A623] px-3 py-0.5 rounded-full text-[10px] font-black font-mono">
                MOST POPULAR
              </div>

              <div>
                <h3 className="font-bold text-lg text-[#12102A]">Africademy Pro</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-[#12102A]">KES 3,800</span>
                  <span className="text-xs text-[#12102A]/60 font-mono">/ month (or $29)</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#12102A] font-semibold">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    Every lesson unlocked, including WhatsApp and M-Pesa
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    Practice on a real, live AI agent
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    A verified portfolio link you can show real clients
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    Ready-to-use M-Pesa payment code
                  </li>
                </ul>
              </div>

              <button
                onClick={onOpenPricing}
                className="w-full mt-6 py-2.5 bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] text-xs font-black rounded-lg cursor-pointer transition-all active:scale-[0.97] shadow-xs"
              >
                Upgrade to Pro
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-10 bg-[#12102A] text-white/60 text-xs flex flex-col gap-6 border-t border-white/10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-semibold text-white/80">
            Africademy, based in Nairobi, Kenya
          </div>
          <div className="flex items-center gap-6">
            <button onClick={onOpenAbout} className="hover:text-white transition-colors cursor-pointer">About</button>
            <button onClick={onOpenPrivacy} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={onOpenTerms} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
          </div>
        </div>
        <div className="text-white/40 font-mono text-[10px]">
          Built for real WhatsApp and M-Pesa agents, made for Africa, by Africans.
        </div>
      </footer>
    </div>
  );
};
