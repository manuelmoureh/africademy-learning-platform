import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ShieldCheck, ArrowRight, Play, CheckCircle2,
  Check, Users
} from 'lucide-react';
import { Track } from '../types';
import { TrackIcon } from '../utils/trackIcons';

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
  onOpenCaseStudies: () => void;
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
  onOpenCaseStudies,
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
          <img src="/logo-dark.png" alt="Afridemy" className="h-8 w-auto" />
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
      <section className="relative px-6 lg:px-12 pt-6 pb-10 md:pt-8 md:pb-14 max-w-6xl mx-auto w-full overflow-hidden">
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              <span className="text-[11px] font-bold text-[#12102A]">
                Every build checked and confirmed by a real business
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#12102A] tracking-[-0.02em] leading-[1.1]">
              We Help You Build <span className="text-[#F5A623]">AI Systems</span> That Businesses Pay For.
            </h1>

            <p className="text-base sm:text-lg text-[#12102A]/75 font-medium leading-relaxed max-w-xl">
              Learn how to build on-demand AI skills that African businesses need and start earning.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={onEnterApp}
                  className="px-6 py-3.5 bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] font-black text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all active:scale-[0.97]"
                >
                  Start Now
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenCaseStudies}
                  className="px-6 py-3.5 bg-white hover:bg-[#FAF9FC] border border-[#12102A]/10 text-[#12102A] font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.97] shadow-2xs"
                >
                  <Play className="w-4 h-4 text-[#F5A623] fill-current" />
                  See What Our Students Are Building
                </button>
              </div>
            </div>

            {/* Stat row — placeholder figures per founder direction, swap for real numbers before launch */}
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-[#12102A]/10 text-center">
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#12102A]">100+</p>
                <p className="text-[10px] sm:text-[11px] text-[#12102A]/60 font-semibold leading-tight mt-0.5">On-demand courses</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#12102A]">KES 10M+</p>
                <p className="text-[10px] sm:text-[11px] text-[#12102A]/60 font-semibold leading-tight mt-0.5">Earned by our students</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#12102A]">KES 80K+</p>
                <p className="text-[10px] sm:text-[11px] text-[#12102A]/60 font-semibold leading-tight mt-0.5">Per system built</p>
              </div>
            </div>
          </div>

          {/* Right Column: one dominant photo with floating badges, top-right pill pair + stacked left cards + bottom-right stat */}
          <div className="lg:col-span-5">
            <div className="relative min-h-[420px] sm:min-h-[520px]">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-[#12102A]/10 shadow-xl bg-gradient-to-br from-[#12102A] to-[#3f3a6b]">
                <img
                  src="/hero-photo.jpg"
                  alt="A learner building a real AI system"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>

              {/* Top-right diagonal pill pair, straddling the top and right edges */}
              <div className="absolute -top-3 right-10 sm:right-12 bg-white text-[#12102A] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10">
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                Verified, not self-reported
              </div>
              <div className="absolute top-10 sm:top-12 -right-3 bg-white text-[#12102A] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                First 5 Lessons Free
              </div>

              {/* Left side, stacked amber stat card + white track-picker card, straddling the left edge */}
              <div className="absolute top-[34%] -left-5 sm:-left-6 bg-[#F5A623] text-[#12102A] rounded-xl shadow-lg p-3 w-[128px] z-10">
                <p className="text-2xl font-black leading-none">10</p>
                <p className="text-[10px] font-bold leading-tight mt-1">Business systems to build</p>
              </div>

              <div className="absolute top-[54%] -left-5 sm:-left-6 bg-white rounded-xl shadow-lg p-3 max-w-[170px] z-10">
                <p className="text-[10px] font-bold text-[#12102A] mb-1.5">Pick your track</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF9FC] border border-[#12102A]/10 text-[#12102A]/70">+ Support</span>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF9FC] border border-[#12102A]/10 text-[#12102A]/70">+ Sales</span>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF9FC] border border-[#12102A]/10 text-[#12102A]/70">+ Finance</span>
                </div>
              </div>

              {/* Bottom-right amber stat card, straddling the corner */}
              <div className="absolute -bottom-4 -right-3 sm:-right-4 bg-[#F5A623] text-[#12102A] rounded-xl shadow-lg p-3 w-[150px] z-10">
                <p className="text-2xl font-black leading-none">80K+</p>
                <p className="text-[10px] font-bold leading-tight mt-1">KES earned per system installed</p>
              </div>
            </div>
          </div>

        </div>
        <p className="relative text-[10px] text-[#12102A]/40 mt-2 max-w-6xl">*Based on current Nairobi freelance market rates for AI automation builders. Not a guaranteed income.</p>
      </section>

      {/* Category Strip */}
      <section className="px-6 lg:px-12 py-14 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <p className="text-[11px] font-bold text-[#F5A623] uppercase tracking-wider">Categories</p>
          <h2 className="text-2xl sm:text-3xl font-black text-[#12102A]">Explore Courses by Category</h2>
          <p className="text-xs sm:text-sm text-[#12102A]/60">Browse by what real African businesses are hiring for.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {tracks.map((track) => {
            const isFeatured = track.id === 'whatsapp-retail-agent';
            const lessonCount = track.steps.length || track.totalSteps;
            return (
              <div
                key={track.id}
                className={`rounded-2xl border p-4 flex items-center gap-3 transition-colors ${
                  isFeatured
                    ? 'bg-[#F5A623] border-[#F5A623]'
                    : 'bg-white border-[#12102A]/10 hover:border-[#F5A623]'
                }`}
              >
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                  isFeatured ? 'bg-white/25' : 'bg-[#F5A623]/15'
                }`}>
                  <TrackIcon name={track.icon} className={`w-5 h-5 ${isFeatured ? 'text-[#12102A]' : 'text-[#F5A623]'}`} />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-tight truncate text-[#12102A]">
                    {track.category}
                  </p>
                  <p className={`text-[11px] font-semibold mt-0.5 ${isFeatured ? 'text-[#12102A]/70' : 'text-[#12102A]/50'}`}>
                    {lessonCount} lessons
                  </p>
                </div>
              </div>
            );
          })}
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
            {tracks.slice(0, 6).map((track, i) => (
              <motion.div
                key={track.id}
                initial={reduce ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-[#12102A]/10 bg-[#FAF9FC] flex flex-col overflow-hidden hover:border-[#F5A623] transition-all group"
              >
                <div className="relative h-24 bg-gradient-to-br from-[#12102A] to-[#3f3a6b] flex items-center justify-center">
                  <TrackIcon name={track.icon} className="w-8 h-8 text-white/80" />
                  <span className="absolute top-2 right-2 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/90 text-[#12102A]">
                    {track.steps.length || track.totalSteps} lessons
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-mono font-bold text-[#F5A623] uppercase tracking-wider">
                    {track.trackNumber}
                  </span>
                  <h3 className="font-bold text-lg text-[#12102A] group-hover:text-[#F5A623] transition-colors mt-1">
                    {track.title}
                  </h3>
                  <p className="text-xs text-[#12102A]/70 font-bold mt-2">
                    {track.impactStat}
                  </p>
                  <div className="mt-auto pt-4 border-t border-[#12102A]/10 flex items-center justify-between">
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
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={onEnterApp}
              className="px-6 py-3 rounded-xl border border-[#12102A]/10 bg-white hover:border-[#F5A623] text-sm font-bold text-[#12102A] cursor-pointer transition-all active:scale-[0.97] inline-flex items-center gap-2"
            >
              Browse All {tracks.length} Courses
              <ArrowRight className="w-4 h-4" />
            </button>
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
              Anyone can print a PDF. Afridemy gives you a real, live link to something a business is actually using, checked and confirmed by that business, not just claimed by you.
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
                <h3 className="font-bold text-lg text-[#12102A]">Afridemy Pro</h3>
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
          <div className="flex items-center gap-3">
            <img src="/logo-light.png" alt="Afridemy" className="h-6 w-auto" />
            <span className="font-semibold text-white/80">Based in Nairobi, Kenya</span>
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
