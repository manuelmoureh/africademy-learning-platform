import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useInView, animate, useMotionValue, useSpring } from 'motion/react';
import {
  ShieldCheck, ArrowRight, Play, CheckCircle2,
  Check, Users, Star, Search, Megaphone, Brain, MessageSquare, Coins
} from 'lucide-react';
import { Track } from '../types';
import { TrackIcon } from '../utils/trackIcons';
import {
  MotionNavigationMenu,
  MotionNavigationMenuContent,
  MotionNavigationMenuItem,
  MotionNavigationMenuLink,
  MotionNavigationMenuList,
  MotionNavigationMenuTrigger,
} from './ui/motion-navigation-menu';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const workflowSteps = [
  { key: 'ads', icon: Megaphone },
  { key: 'ai', icon: Brain },
  { key: 'whatsapp', icon: MessageSquare },
  { key: 'sale', icon: Coins },
];

interface CounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ target, prefix = '', suffix = '' }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (reduce) {
      setDisplay(target);
      return;
    }
    const controls = animate(0, target, {
      type: 'spring',
      stiffness: 40,
      damping: 12,
      restDelta: 0.5,
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [isInView, target, reduce]);

  return <span ref={ref}>{prefix}{Math.round(display)}{suffix}</span>;
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
  onSearch: (query: string) => void;
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
  onSearch,
  tracks,
}) => {
  const reduce = useReducedMotion();
  const [navSearch, setNavSearch] = useState('');

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 0.5 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(relX * 20);
    mouseY.set(relY * 20);
  };

  const handleHeroMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#12102A] flex flex-col">
      {/* Top Navbar — translucent, stays legible over whatever scrolls beneath it */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#12102A]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={onEnterApp}>
            <img src="/logo-dark.png" alt="Afridemy" className="h-14 w-auto" />
          </div>

          <MotionNavigationMenu className="hidden md:flex" viewportClassName="border-[#12102A]/10">
            <MotionNavigationMenuList>
              <MotionNavigationMenuItem value="courses">
                <MotionNavigationMenuTrigger className="text-[#12102A]/70 data-[state=open]:text-[#12102A]">
                  Courses
                </MotionNavigationMenuTrigger>
                <MotionNavigationMenuContent>
                  <div className="grid w-[420px] grid-cols-2 gap-1 p-1">
                    {tracks.slice(0, 4).map((track) => (
                      <MotionNavigationMenuLink key={track.id} onClick={onEnterApp} className="cursor-pointer">
                        <span className="flex items-center gap-2 text-sm font-bold text-[#12102A]">
                          <TrackIcon name={track.icon} className="w-3.5 h-3.5 text-[#F5A623]" />
                          {track.category}
                        </span>
                        <span className="text-[#12102A]/60 text-xs line-clamp-1">{track.title}</span>
                      </MotionNavigationMenuLink>
                    ))}
                  </div>
                </MotionNavigationMenuContent>
              </MotionNavigationMenuItem>

              <MotionNavigationMenuItem>
                <MotionNavigationMenuLink
                  onClick={onOpenSandbox}
                  className="flex h-9 items-center px-4 py-2 text-sm font-semibold text-[#12102A]/70 cursor-pointer"
                >
                  See It Work
                </MotionNavigationMenuLink>
              </MotionNavigationMenuItem>

              <MotionNavigationMenuItem>
                <MotionNavigationMenuLink
                  onClick={onOpenPortfolio}
                  className="flex h-9 items-center px-4 py-2 text-sm font-semibold text-[#12102A]/70 cursor-pointer"
                >
                  Verified Work
                </MotionNavigationMenuLink>
              </MotionNavigationMenuItem>

              <MotionNavigationMenuItem>
                <MotionNavigationMenuLink
                  onClick={onOpenPricing}
                  className="flex h-9 items-center px-4 py-2 text-sm font-semibold text-[#12102A]/70 cursor-pointer"
                >
                  Pricing
                </MotionNavigationMenuLink>
              </MotionNavigationMenuItem>

              <MotionNavigationMenuItem>
                <MotionNavigationMenuLink
                  onClick={onOpenAbout}
                  className="flex h-9 items-center px-4 py-2 text-sm font-semibold text-[#12102A]/70 cursor-pointer"
                >
                  About
                </MotionNavigationMenuLink>
              </MotionNavigationMenuItem>
            </MotionNavigationMenuList>
          </MotionNavigationMenu>

          <div className="flex items-center gap-3 shrink-0">
            <form
              onSubmit={(e) => { e.preventDefault(); onSearch(navSearch); }}
              className="hidden lg:block relative"
            >
              <Search className="w-3.5 h-3.5 text-[#12102A]/35 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search courses"
                className="w-40 focus:w-56 pl-9 pr-3 py-2 rounded-full border border-[#12102A]/10 bg-[#FAF9FC] text-xs font-medium text-[#12102A] placeholder:text-[#12102A]/40 focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all duration-300"
              />
            </form>

            <button
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-full border border-[#12102A]/10 bg-white hover:bg-[#FAF9FC] text-xs font-bold text-[#12102A] cursor-pointer transition-all active:scale-[0.97]"
            >
              Sign In
            </button>
            <button
              onClick={onEnterApp}
              className="px-4 py-2 rounded-full bg-[#12102A] hover:bg-[#1c1940] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-[0.97] shadow-xs"
            >
              Start Learning
              <ArrowRight className="w-3.5 h-3.5 text-[#F5A623]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative px-6 lg:px-12 pt-6 pb-10 md:pt-8 md:pb-14 max-w-6xl mx-auto w-full overflow-hidden"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
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
            {/* Placeholder rating — swap for the real embedded Trustpilot widget once the account exists */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#12102A]/10 shadow-sm">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#F5A623] text-[#F5A623]" />
                ))}
              </div>
              <span className="text-[11px] font-bold text-[#12102A]">4.9 on Trustpilot</span>
            </div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-[#12102A] tracking-[-0.02em] leading-[1.1]"
            >
              We Help You Build <span className="text-[#F5A623]">AI Systems</span> That Businesses Pay For.
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#12102A]/75 font-medium leading-relaxed max-w-xl"
            >
              Build for a real business first. Once they confirm it works, you're ready to get paid to do it again.
            </motion.p>

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
                <p className="text-xl sm:text-2xl font-black text-[#12102A]"><Counter target={100} suffix="+" /></p>
                <p className="text-[10px] sm:text-[11px] text-[#12102A]/60 font-semibold leading-tight mt-0.5">On-demand courses</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#12102A]"><Counter target={10} prefix="KES " suffix="M+" /></p>
                <p className="text-[10px] sm:text-[11px] text-[#12102A]/60 font-semibold leading-tight mt-0.5">Earned by our students</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#12102A]"><Counter target={80} prefix="KES " suffix="K+" /></p>
                <p className="text-[10px] sm:text-[11px] text-[#12102A]/60 font-semibold leading-tight mt-0.5">Per system built</p>
              </div>
            </div>
          </div>

          {/* Right Column: one dominant photo with floating badges, top-right pill pair + stacked left cards + bottom-right stat */}
          <div className="lg:col-span-5">
            <motion.div
              className="relative min-h-[420px] sm:min-h-[520px]"
              style={{ x: springX, y: springY }}
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-[#12102A]/10 shadow-xl bg-gradient-to-br from-[#12102A] to-[#3f3a6b]">
                <img
                  src="/hero-photo.jpg"
                  alt="A learner building a real AI system"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>

              {/* Top-right diagonal pill pair, straddling the top and right edges */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-3 right-10 sm:right-12 bg-white text-[#12102A] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                Checked by real businesses
              </motion.div>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-10 sm:top-12 -right-3 bg-white text-[#12102A] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                First 5 Lessons Free
              </motion.div>

              {/* Left side: how-it-works flow diagram + skill picker, straddling the left edge */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-[30%] -left-5 sm:-left-6 bg-[#F5A623] text-[#12102A] rounded-xl shadow-lg p-3 w-[196px] z-10"
              >
                <p className="text-[9px] font-bold uppercase tracking-wider opacity-70 mb-2">What you'll build</p>
                <div className="flex items-center">
                  {workflowSteps.map((step, i) => (
                    <React.Fragment key={step.key}>
                      <div className="w-6 h-6 rounded-full bg-[#12102A] flex items-center justify-center shrink-0">
                        <step.icon className="w-3 h-3 text-[#F5A623]" />
                      </div>
                      {i < workflowSteps.length - 1 && (
                        <div className="flex-1 h-[2px] mx-1 rounded-full bg-[#12102A]/20 relative overflow-hidden">
                          {!reduce && (
                            <motion.div
                              className="absolute inset-y-0 w-2.5 rounded-full bg-[#12102A]"
                              animate={{ x: ['-100%', '900%'] }}
                              transition={{ duration: 1.4, repeat: Infinity, ease: 'linear', delay: i * 0.25 }}
                            />
                          )}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                <p className="text-[9px] font-bold leading-tight mt-2">Ads to AI agent to WhatsApp to sale</p>
              </motion.div>

              <motion.div
                initial={reduce ? false : { opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-[58%] -left-5 sm:-left-6 bg-white rounded-xl shadow-lg p-3 max-w-[170px] z-10"
              >
                <p className="text-[10px] font-bold text-[#12102A] mb-1.5">Pick what to build</p>
                <div className="flex flex-wrap gap-1">
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF9FC] border border-[#12102A]/10 text-[#12102A]/70">+ Support</span>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF9FC] border border-[#12102A]/10 text-[#12102A]/70">+ Sales</span>
                  <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#FAF9FC] border border-[#12102A]/10 text-[#12102A]/70">+ Finance</span>
                </div>
              </motion.div>

              {/* Bottom-right amber stat card, straddling the corner */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-4 -right-3 sm:-right-4 bg-[#F5A623] text-[#12102A] rounded-xl shadow-lg p-3 w-[150px] z-10"
              >
                <p className="text-2xl font-black leading-none">80K+</p>
                <p className="text-[10px] font-bold leading-tight mt-1">KES earned per system installed</p>
              </motion.div>
            </motion.div>
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

        <div
          className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 lg:-mx-12 lg:px-12 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {tracks.map((track) => {
            const isFeatured = track.id === 'whatsapp-retail-agent';
            return (
              <motion.button
                key={track.id}
                onClick={onEnterApp}
                whileHover={reduce ? undefined : { y: -3 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className={`group text-left shrink-0 snap-start w-[220px] sm:w-[240px] rounded-2xl border p-5 flex flex-col gap-3 cursor-pointer transition-colors ${
                  isFeatured
                    ? 'bg-[#F5A623]/8 border-[#F5A623]'
                    : 'bg-white border-[#12102A]/10 hover:border-[#F5A623] hover:shadow-sm'
                }`}
              >
                <span className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#F5A623]/15">
                  <TrackIcon name={track.icon} className="w-6 h-6 text-[#F5A623]" />
                </span>
                <div>
                  <p className="text-base font-bold leading-snug text-[#12102A]">
                    {track.category}
                  </p>
                  <p className="text-xs font-medium leading-relaxed mt-1.5 text-[#12102A]/60">
                    For {track.whoBuysThis.charAt(0).toLowerCase() + track.whoBuysThis.slice(1)}.
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 mt-auto text-[#F5A623] transition-transform group-hover:translate-x-1" />
              </motion.button>
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
            <motion.div
              initial={reduce ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="p-6 rounded-2xl border border-[#12102A]/10 bg-[#FAF9FC] flex flex-col justify-between"
            >
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
            </motion.div>

            {/* Pro Tier */}
            <motion.div
              initial={reduce ? false : 'hidden'}
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={reduce ? undefined : { y: -4 }}
              className="p-6 rounded-2xl border-2 border-[#F5A623] bg-[#F5A623]/5 flex flex-col justify-between relative shadow-sm"
            >
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
            </motion.div>

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
