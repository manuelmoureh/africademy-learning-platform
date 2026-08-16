import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useInView, animate, useMotionValue, useSpring } from 'motion/react';
import {
  ShieldCheck, ArrowRight, Play, CheckCircle2,
  Check, Users, Star, Search, ChevronLeft, ChevronRight, Menu, X,
  Wrench, Repeat, ChevronDown, Mail, Loader2
} from 'lucide-react';
import { Track } from '../types';
import { TrackIcon } from '../utils/trackIcons';
import { subscribeToNewsletter } from '../lib/db';
import { SystemThumbnail } from './SystemThumbnail';
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

// Placeholder reviews, founder-approved stand-ins until real Trustpilot reviews replace them at launch
const REVIEWS = [
  {
    name: 'Manuel Moureh',
    location: 'Nairobi',
    quote: "Built the WhatsApp agent for a friend's boutique in under two weeks. That link is still the first thing I show new clients.",
  },
  {
    name: 'Vivian Bii',
    location: 'Nairobi',
    quote: "I'd never touched anything technical before this. The lead-qualification system I built is running for a real estate agent in Kilimani right now.",
  },
  {
    name: 'Liza Malemba',
    location: 'Mombasa',
    quote: 'The invoicing system took me three weekends. What sold me was a real accountant checking it before I could call it done.',
  },
  {
    name: 'Sammy Mwashighadi',
    location: 'Mombasa',
    quote: 'I picked support operations because that\'s what shops around me actually need. Built one, showed it to two businesses, got paid for both.',
  },
  {
    name: 'Victor Koech',
    location: 'Eldoret',
    quote: 'Every other course I tried was theory. This one had me shipping a working payment-reminder system by week two.',
  },
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
      duration: 1.6,
      delay: 0.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [isInView, target, reduce]);

  return <span ref={ref}>{prefix}{Math.round(display)}{suffix}</span>;
};

// Shared behavior for the category and reviews strips: scroll-state tracking (for arrow disabled state),
// pausable auto-scroll, and click-and-drag scrolling. Kept as one hook since both strips need identical behavior.
function useHorizontalCarousel(itemCount: number, reduce: boolean | null, step: number, intervalMs: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = ref.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  const scroll = (direction: 'left' | 'right') => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    return () => el.removeEventListener('scroll', updateScrollState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemCount]);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    let paused = false;
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    el.addEventListener('touchstart', pause, { passive: true });
    const interval = setInterval(() => {
      if (paused) return;
      const atEnd = el.scrollLeft >= el.scrollWidth - el.clientWidth - 4;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: step, behavior: 'smooth' });
      }
    }, intervalMs);
    return () => {
      clearInterval(interval);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
      el.removeEventListener('touchstart', pause);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce, itemCount]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    const onDown = (e: MouseEvent) => {
      isDown = true;
      el.classList.add('cursor-grabbing');
      startX = e.pageX;
      startScroll = el.scrollLeft;
    };
    const onMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      el.scrollLeft = startScroll - (e.pageX - startX);
    };
    const onUp = () => {
      isDown = false;
      el.classList.remove('cursor-grabbing');
    };
    el.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      el.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return { ref, canScrollLeft, canScrollRight, scroll };
}

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || newsletterStatus === 'loading') return;
    setNewsletterStatus('loading');
    const { error } = await subscribeToNewsletter(newsletterEmail.trim());
    setNewsletterStatus(error ? 'error' : 'done');
  };

  const categoryCarousel = useHorizontalCarousel(tracks.length, reduce, 240, 3200);
  const reviewsCarousel = useHorizontalCarousel(REVIEWS.length, reduce, 300, 3600);

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
    <div className="min-h-screen bg-[#F0EEF6] text-[#12102A] flex flex-col">
      {/* Top Navbar — translucent, stays legible over whatever scrolls beneath it */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#12102A]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={onEnterApp}>
            <img src="/logo-dark.png" alt="Afridemy" className="h-14 w-auto" />
          </div>

          <MotionNavigationMenu className="hidden md:flex" viewportClassName="border-[#12102A]/10">
            <MotionNavigationMenuList>
              <MotionNavigationMenuItem value="courses">
                <MotionNavigationMenuTrigger onClick={onEnterApp} className="text-[#12102A]/70 data-[state=open]:text-[#12102A]">
                  Systems
                </MotionNavigationMenuTrigger>
                <MotionNavigationMenuContent>
                  <div className="grid w-[420px] grid-cols-2 gap-1 p-1">
                    {tracks.slice(0, 4).map((track) => (
                      <MotionNavigationMenuLink key={track.id} onClick={onEnterApp} className="cursor-pointer">
                        <span className="flex items-center gap-2 text-sm font-bold text-[#12102A]">
                          <TrackIcon name={track.icon} className="w-3.5 h-3.5 text-[#F5A623]" />
                          {track.category}
                        </span>
                        <span className="text-[#12102A]/60 text-xs">{track.title}</span>
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
                placeholder="Search systems"
                className="w-40 focus:w-56 pl-9 pr-3 py-2 rounded-full border border-[#12102A]/10 bg-[#F0EEF6] text-xs font-medium text-[#12102A] placeholder:text-[#12102A]/40 focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all duration-300"
              />
            </form>

            <button
              onClick={onOpenAuth}
              className="hidden md:block px-4 py-2 rounded-full border border-[#12102A]/10 bg-white hover:bg-[#F0EEF6] text-xs font-bold text-[#12102A] cursor-pointer transition-all active:scale-[0.97]"
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

            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-lg text-[#12102A] hover:bg-[#F0EEF6] cursor-pointer transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
            <div className="md:hidden border-t border-[#12102A]/10 bg-white">
              <div className="px-6 py-4 flex flex-col gap-1">
                <form
                  onSubmit={(e) => { e.preventDefault(); setMobileMenuOpen(false); onSearch(navSearch); }}
                  className="relative mb-2"
                >
                  <Search className="w-3.5 h-3.5 text-[#12102A]/35 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={navSearch}
                    onChange={(e) => setNavSearch(e.target.value)}
                    placeholder="Search systems"
                    className="w-full pl-9 pr-3 py-2.5 rounded-full border border-[#12102A]/10 bg-[#F0EEF6] text-sm font-medium text-[#12102A] placeholder:text-[#12102A]/40 focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all"
                  />
                </form>

                {[
                  { label: 'Systems', onClick: onEnterApp },
                  { label: 'See It Work', onClick: onOpenSandbox },
                  { label: 'Verified Work', onClick: onOpenPortfolio },
                  { label: 'Pricing', onClick: onOpenPricing },
                  { label: 'About', onClick: onOpenAbout },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => { setMobileMenuOpen(false); item.onClick(); }}
                    className="text-left py-2.5 text-sm font-semibold text-[#12102A]/80 hover:text-[#12102A] cursor-pointer transition-colors border-b border-[#12102A]/5 last:border-b-0"
                  >
                    {item.label}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                  className="mt-3 w-full py-2.5 rounded-full border border-[#12102A]/10 bg-white hover:bg-[#F0EEF6] text-sm font-bold text-[#12102A] cursor-pointer transition-all"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
      </nav>

      {/* Hero Section */}
      <section
        className="relative px-6 lg:px-12 pt-4 pb-6 md:pt-6 md:pb-10 max-w-6xl mx-auto w-full overflow-hidden min-h-[calc(100dvh-5rem)] flex flex-col justify-center"
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
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-6 space-y-5">
            {/* Placeholder rating — swap for the real embedded Trustpilot widget once the account exists */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#12102A]/10 shadow-sm">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-4 h-4 rounded-[3px] bg-[#00B67A] flex items-center justify-center">
                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                  </div>
                ))}
              </div>
              <span className="text-[11px] font-bold text-[#12102A]">4.9 <span className="font-semibold text-[#12102A]/50">on</span> Trustpilot</span>
            </div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-[#12102A] tracking-[-0.02em] leading-[1.1]"
            >
              Build <span className="text-[#F5A623]">AI Systems</span> That Businesses Pay For.
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-[#12102A]/75 font-medium leading-relaxed max-w-xl"
            >
              Learn the skills. Build the proof. Earn from it.
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
                  className="px-6 py-3.5 bg-white hover:bg-[#F0EEF6] border border-[#12102A]/10 text-[#12102A] font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.97] shadow-2xs"
                >
                  <Play className="w-4 h-4 text-[#F5A623] fill-current" />
                  See What Our Students Are Building
                </button>
              </div>
            </div>

            {/* Stat row */}
            <div className="flex items-start gap-8 pt-8 border-t border-[#12102A]/10 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#12102A]"><Counter target={10} suffix="+" /></p>
                <p className="text-[10px] sm:text-[11px] text-[#12102A]/60 font-semibold leading-tight mt-0.5">On-demand systems</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#12102A]"><Counter target={1} prefix="KES " suffix="M+" /></p>
                <p className="text-[10px] sm:text-[11px] text-[#12102A]/60 font-semibold leading-tight mt-0.5">Earned by our students</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#12102A]"><Counter target={15} prefix="KES " suffix="K+" /></p>
                <p className="text-[10px] sm:text-[11px] text-[#12102A]/60 font-semibold leading-tight mt-0.5">Estimated per system sold</p>
              </div>
            </div>
          </div>

          {/* Right Column: one dominant photo with floating badges, top-right pill pair + stacked left cards + bottom-right stat */}
          <div className="lg:col-span-6">
            <motion.div
              className="relative min-h-[300px] sm:min-h-[360px]"
              style={{ x: springX, y: springY }}
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-[#12102A]/10 shadow-xl bg-[#12102A] p-1.5 grid grid-cols-3 grid-rows-2 gap-1.5">
                <div className="col-span-2 row-span-2 relative rounded-xl overflow-hidden">
                  <img
                    src="/hero-photo.jpg"
                    alt="A learner building a real AI system on her laptop"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="col-span-1 relative rounded-xl overflow-hidden">
                  <img
                    src="/hero-photo-2.jpg"
                    alt="A learner studying in a school library"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
                <div className="col-span-1 relative rounded-xl overflow-hidden">
                  <img
                    src="/hero-photo-3.jpg"
                    alt="A learner studying at home with a laptop and notebook"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>
              </div>

              {/* Top pill pair: left one straddles the top-left edge, right one straddles the right edge at the photo seam */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-3 left-10 sm:left-14 bg-white text-[#12102A] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                Build market ready AI systems
              </motion.div>
              <motion.div
                initial={reduce ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-[46%] -translate-y-1/2 -right-9 sm:-right-11 bg-white text-[#12102A] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                First 5 Lessons Free
              </motion.div>

              {/* Left side: skill picker, straddling the bottom-left edge so it clears the subject */}
              <motion.div
                initial={reduce ? false : { opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-6 -left-5 sm:-left-6 bg-white rounded-xl shadow-lg p-3 max-w-[170px] z-10"
              >
                <p className="text-[10px] font-bold text-[#12102A] mb-1.5">Pick your field</p>
                <div className="flex flex-wrap gap-1">
                  {['Sales', 'Finance', 'Support', 'Marketing'].map((field) => (
                    <button
                      key={field}
                      type="button"
                      onClick={() => onSearch(field)}
                      className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[#F0EEF6] border border-[#12102A]/10 text-[#12102A]/70 hover:border-[#F5A623] hover:text-[#12102A] cursor-pointer transition-colors"
                    >
                      + {field}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Bottom amber stat card, pulled in from the corner toward bottom-center */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-4 -right-3 sm:right-28 bg-[#F5A623] text-[#12102A] rounded-xl shadow-lg p-3 w-[160px] z-10"
              >
                <p className="text-2xl font-black leading-none">KES 15K+</p>
                <p className="text-[10px] font-bold leading-tight mt-1">Estimated per system sold</p>
              </motion.div>
            </motion.div>
          </div>

        </div>
        <p className="relative text-[10px] text-[#12102A]/40 mt-2 max-w-6xl">*Based on current Nairobi freelance market rates for AI automation builders. Not a guaranteed income.</p>
      </section>

      {/* How It Works */}
      <section className="px-6 lg:px-12 py-14 bg-white border-y border-[#12102A]/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-[#12102A]">How It Works</h2>
          </div>

          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {[
              { icon: Search, title: 'Pick a system', body: 'Browse the categories and choose one that matches a real business need.' },
              { icon: Wrench, title: 'Build it for real', body: 'Work through the lessons and build the actual thing, not a mock exercise.' },
              { icon: ShieldCheck, title: 'Get it verified', body: 'Install it for a business you bring on. They confirm it works, not you.' },
              { icon: Repeat, title: 'Resell it', body: 'Use the verified link to pitch the same system to your next client.' },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={reduce ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative space-y-2"
              >
                <div className="flex items-center gap-3">
                  <span className="relative z-10 w-10 h-10 rounded-xl bg-[#F5A623]/15 ring-4 ring-white flex items-center justify-center shrink-0">
                    <step.icon className="w-5 h-5 text-[#F5A623]" />
                  </span>
                  <span className="text-sm font-bold text-[#12102A]/30">0{i + 1}</span>
                </div>
                <h3 className="font-bold text-[#12102A]">{step.title}</h3>
                <p className="text-sm text-[#12102A]/60 leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Strip */}
      <section className="px-6 lg:px-12 pt-6 pb-14 max-w-6xl mx-auto w-full">
        <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-[#12102A]">Explore AI Systems by Category</h2>
          <p className="text-xs sm:text-sm text-[#12102A]/60">See what real African businesses already pay for.</p>
        </div>

        <div className="relative">
          {/* Edge fades: only visible when there's actually more to scroll that way, so they never wash out the first/last fully-visible card */}
          <div className={`hidden md:block absolute -left-1 top-0 bottom-2 w-28 z-[5] bg-gradient-to-r from-[#F0EEF6] via-[#F0EEF6]/90 to-transparent pointer-events-none transition-opacity duration-300 ${categoryCarousel.canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`hidden md:block absolute -right-1 top-0 bottom-2 w-28 z-[5] bg-gradient-to-l from-[#F0EEF6] via-[#F0EEF6]/90 to-transparent pointer-events-none transition-opacity duration-300 ${categoryCarousel.canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

          <button
            type="button"
            onClick={() => categoryCarousel.scroll('left')}
            aria-label="Scroll categories left"
            disabled={!categoryCarousel.canScrollLeft}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-[#12102A]/10 shadow-lg items-center justify-center cursor-pointer transition-all hover:border-[#F5A623] disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronLeft className="w-4 h-4 text-[#12102A]" />
          </button>
          <button
            type="button"
            onClick={() => categoryCarousel.scroll('right')}
            aria-label="Scroll categories right"
            disabled={!categoryCarousel.canScrollRight}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-[#12102A]/10 shadow-lg items-center justify-center cursor-pointer transition-all hover:border-[#F5A623] disabled:opacity-0 disabled:pointer-events-none"
          >
            <ChevronRight className="w-4 h-4 text-[#12102A]" />
          </button>

          <div
            ref={categoryCarousel.ref}
            className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 lg:-mx-12 lg:px-12 scroll-px-6 lg:scroll-px-12 snap-x snap-mandatory cursor-grab select-none [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none' }}
          >
          {tracks.map((track) => {
            return (
              <motion.button
                key={track.id}
                onClick={onEnterApp}
                whileHover={reduce ? undefined : { y: -3 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="group text-left shrink-0 snap-start w-[220px] sm:w-[240px] rounded-2xl border p-5 flex flex-col gap-3 cursor-pointer transition-colors bg-white border-[#12102A]/10 hover:border-[#F5A623] hover:shadow-sm"
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
        </div>
      </section>

      {/* Curriculum Tracks Section */}
      <section className="px-6 lg:px-12 py-16 bg-white border-y border-[#12102A]/10">
        <div className="max-w-6xl mx-auto space-y-12">

          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#12102A]">
              Every System Solves a Real Business Problem
            </h2>
            <p className="text-xs sm:text-sm text-[#12102A]/60">
              Backed by real numbers, not a hypothetical exercise.
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
                className="rounded-2xl border border-[#12102A]/10 bg-[#F0EEF6] flex flex-col overflow-hidden hover:border-[#F5A623] transition-all group"
              >
                <div
                  className="relative h-24 bg-[#12102A] flex items-center justify-center p-3"
                  style={{
                    backgroundImage: 'radial-gradient(rgba(245,166,35,0.15) 1px, transparent 1px)',
                    backgroundSize: '14px 14px',
                  }}
                >
                  <SystemThumbnail trackId={track.id} />
                  <span className="absolute top-2 right-2 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/90 text-[#12102A]">
                    {track.steps.length || track.totalSteps} lessons
                  </span>
                  <span className="absolute top-2 left-2 w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                    <TrackIcon name={track.icon} className="w-3.5 h-3.5 text-white/70" />
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-[10px] font-mono font-bold text-[#F5A623] tracking-wider">
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
              Browse All {tracks.length} Systems
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
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Not a Certificate. A Working System, Live, With Your Name on It.
            </h2>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-medium">
              Anyone can print a PDF. You walk away with a real portfolio you can use to start earning.
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
            <p className="text-xs font-bold text-[#F5A623]">
              What You Get
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white/90">
                <Check className="w-4 h-4 text-[#10B981]" />
                A verified portfolio
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Check className="w-4 h-4 text-[#10B981]" />
                A system you can resell again and again
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Check className="w-4 h-4 text-[#10B981]" />
                A real skill, not just theory
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Check className="w-4 h-4 text-[#10B981]" />
                A safe space to test it before it goes live
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Reviews Section */}
      <section className="px-6 lg:px-12 py-16 bg-white border-t border-[#12102A]/10">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#12102A]">What Students Are Saying</h2>
            <p className="text-xs sm:text-sm text-[#12102A]/60">Real people, building real systems.</p>
          </div>

          <div className="relative">
            <div className={`hidden md:block absolute -left-1 top-0 bottom-2 w-28 z-[5] bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none transition-opacity duration-300 ${reviewsCarousel.canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`hidden md:block absolute -right-1 top-0 bottom-2 w-28 z-[5] bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none transition-opacity duration-300 ${reviewsCarousel.canScrollRight ? 'opacity-100' : 'opacity-0'}`} />

            <button
              type="button"
              onClick={() => reviewsCarousel.scroll('left')}
              aria-label="Scroll reviews left"
              disabled={!reviewsCarousel.canScrollLeft}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-[#12102A]/10 shadow-lg items-center justify-center cursor-pointer transition-all hover:border-[#F5A623] disabled:opacity-0 disabled:pointer-events-none"
            >
              <ChevronLeft className="w-4 h-4 text-[#12102A]" />
            </button>
            <button
              type="button"
              onClick={() => reviewsCarousel.scroll('right')}
              aria-label="Scroll reviews right"
              disabled={!reviewsCarousel.canScrollRight}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white border border-[#12102A]/10 shadow-lg items-center justify-center cursor-pointer transition-all hover:border-[#F5A623] disabled:opacity-0 disabled:pointer-events-none"
            >
              <ChevronRight className="w-4 h-4 text-[#12102A]" />
            </button>

          <div
            ref={reviewsCarousel.ref}
            className="flex gap-5 overflow-x-auto pb-2 -mx-6 px-6 lg:-mx-12 lg:px-12 scroll-px-6 lg:scroll-px-12 snap-x snap-mandatory cursor-grab select-none [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none' }}
          >
            {REVIEWS.map((review) => (
              <div
                key={review.name}
                className="shrink-0 snap-start w-[300px] sm:w-[340px] rounded-2xl border border-[#12102A]/10 bg-[#F0EEF6] p-6 flex flex-col gap-4"
              >
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 rounded-[3px] bg-[#00B67A] flex items-center justify-center">
                      <Star className="w-2.5 h-2.5 fill-white text-white" />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#12102A]/80 leading-relaxed flex-1">&ldquo;{review.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-3 border-t border-[#12102A]/10">
                  <div className="w-9 h-9 rounded-full bg-[#12102A]/10 flex items-center justify-center text-xs font-bold text-[#12102A] shrink-0">
                    {review.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#12102A]">{review.name}</p>
                    <p className="text-[10px] text-[#12102A]/50">{review.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 lg:px-12 py-16 bg-white border-t border-[#12102A]/10">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-[#12102A]">Questions People Actually Ask</h2>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How do I find a business to install it for?',
                a: 'Start with one you already know: a family shop, a friend\'s business, someone in your neighborhood. You\'re offering something useful for free at first, most people say yes to that.',
              },
              {
                q: 'Do I need any tech experience to start?',
                a: 'No. Every system starts from zero. If you can use WhatsApp, you can follow along.',
              },
              {
                q: 'What makes a verified portfolio different from a certificate?',
                a: 'A certificate says you finished a course. A verified portfolio is a live system you can showcase to clients.',
              },
              {
                q: 'Can I do this alongside school or a job?',
                a: "Yes. You move at your own pace, there's no fixed schedule to keep up with.",
              },
              {
                q: 'How long does it take to finish a system?',
                a: 'It depends on the system. Some take a few days, others a few weeks. You move at your own pace.',
              },
              {
                q: 'What does it cost?',
                a: 'The first 5 lessons of every system are free, so you can try it before paying anything.',
              },
            ].map((item) => (
              <details key={item.q} className="group rounded-xl border border-[#12102A]/10 bg-[#F0EEF6] px-5 py-4">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-bold text-sm text-[#12102A]">
                  {item.q}
                  <ChevronDown className="w-4 h-4 text-[#12102A]/50 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="text-xs text-[#12102A]/70 leading-relaxed mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 pt-14 pb-10 bg-[#12102A] text-white/60 text-xs border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-10 border-b border-white/10">
            <div className="space-y-3 max-w-sm">
              <img src="/logo-light.png" alt="Afridemy" className="h-6 w-auto" />
              <p className="text-white/50 leading-relaxed">Get notified when new systems and categories launch.</p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-3.5 h-3.5 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => { setNewsletterEmail(e.target.value); setNewsletterStatus('idle'); }}
                    placeholder="your@email.com"
                    disabled={newsletterStatus === 'loading' || newsletterStatus === 'done'}
                    className="w-full pl-9 pr-3 py-2.5 rounded-full border border-white/15 bg-white/5 text-white placeholder:text-white/30 text-xs focus:outline-none focus:border-[#F5A623] disabled:opacity-60"
                  />
                </div>
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading' || newsletterStatus === 'done'}
                  className="shrink-0 px-4 py-2.5 rounded-full bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] text-xs font-bold cursor-pointer transition-all active:scale-[0.97] disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {newsletterStatus === 'loading' && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {newsletterStatus === 'done' ? 'Subscribed' : 'Notify me'}
                </button>
              </form>
              {newsletterStatus === 'error' && (
                <p className="text-red-400 text-[11px]">Something went wrong, try again in a moment.</p>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div className="space-y-2.5">
                <p className="text-white/80 font-bold text-[11px] tracking-wider">Systems</p>
                <button onClick={onEnterApp} className="block text-left hover:text-white transition-colors cursor-pointer">All Systems</button>
                <button onClick={onOpenSandbox} className="block text-left hover:text-white transition-colors cursor-pointer">See It Work</button>
                <button onClick={onOpenPortfolio} className="block text-left hover:text-white transition-colors cursor-pointer">Verified Work</button>
              </div>
              <div className="space-y-2.5">
                <p className="text-white/80 font-bold text-[11px] tracking-wider">Company</p>
                <button onClick={onOpenAbout} className="block text-left hover:text-white transition-colors cursor-pointer">About</button>
                <button onClick={onOpenPricing} className="block text-left hover:text-white transition-colors cursor-pointer">Pricing</button>
              </div>
              <div className="space-y-2.5">
                <p className="text-white/80 font-bold text-[11px] tracking-wider">Legal</p>
                <button onClick={onOpenPrivacy} className="block text-left hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
                <button onClick={onOpenTerms} className="block text-left hover:text-white transition-colors cursor-pointer">Terms of Service</button>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-semibold text-white/50">Based in Nairobi, Kenya</span>
            <span className="text-white/30 font-mono text-[10px]">Built for real WhatsApp and M-Pesa agents, made for Africa, by Africans.</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
