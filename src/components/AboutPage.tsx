import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, AlertCircle, Lightbulb, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Track, UserAccount } from '../types';
import { Header } from './Header';
import { useDocumentMeta } from '../lib/useDocumentMeta';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface AboutPageProps {
  tracks: Track[];
  user: UserAccount;
  isAuthenticated: boolean;
  authLoading?: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onGoHome: () => void;
  onEnterApp: () => void;
  onSelectCourse: (trackId: string) => void;
  onOpenVerifiedWork: () => void;
  onOpenAuth: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  tracks,
  user,
  isAuthenticated,
  authLoading,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onGoHome,
  onEnterApp,
  onSelectCourse,
  onOpenVerifiedWork,
  onOpenAuth,
}) => {
  useDocumentMeta('About', "Meet the founder and the story behind Afridemy - teaching young Kenyans to build AI systems businesses actually pay for.");
  return (
  <div className="min-h-screen bg-[#F0EEF6] text-[#12102A]">
    <Header
      tracks={tracks}
      activeNav="about"
      user={user}
      isAuthenticated={isAuthenticated}
      authLoading={authLoading}
      searchQuery={searchQuery}
      onSearchChange={onSearchChange}
      onSearchSubmit={onSearchSubmit}
      onGoHome={onGoHome}
      onEnterApp={onEnterApp}
      onSelectCourse={onSelectCourse}
      onOpenVerifiedWork={onOpenVerifiedWork}
      onOpenAbout={() => {}}
      onOpenAuth={onOpenAuth}
    />

    {/* Hero */}
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="px-6 lg:px-12 py-16 md:py-20"
    >
      <div className="max-w-3xl mx-auto text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-[#12102A] leading-tight">
          We train young Kenyans to build AI systems real businesses actually use.
        </h1>
        <p className="text-sm md:text-base text-[#12102A]/70 font-medium max-w-xl mx-auto">
          The proof is a live system with your name on it, not a piece of paper.
        </p>
      </div>
    </motion.section>

    {/* Stat row */}
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="px-6 lg:px-12 pb-16"
    >
      <div className="max-w-3xl mx-auto grid grid-cols-2 gap-6 p-8 rounded-3xl bg-[#12102A] text-white">
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-black text-[#F5A623]">1M+</p>
          <p className="text-xs text-white/60 font-semibold mt-1">Young Kenyans entering the job market every year</p>
        </div>
        <div className="text-center border-l border-white/10">
          <p className="text-3xl md:text-4xl font-black text-[#F5A623]">600K</p>
          <p className="text-xs text-white/60 font-semibold mt-1">Formal jobs added in the same year</p>
        </div>
      </div>
    </motion.section>

    {/* Problem, Insight, Solution */}
    <section className="px-6 lg:px-12 py-16 bg-white border-y border-[#12102A]/10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.12 }}
        className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.4, ease: 'easeOut' }} className="space-y-3">
          <span className="w-10 h-10 rounded-xl bg-[#F5A623]/15 flex items-center justify-center">
            <AlertCircle className="w-5 h-5 text-[#F5A623]" />
          </span>
          <h2 className="font-bold text-[#12102A]">The gap</h2>
          <p className="text-sm text-[#12102A]/70 leading-relaxed">
            That gap between new workers and new jobs doesn't close on its own, and most training doesn't touch it either.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} transition={{ duration: 0.4, ease: 'easeOut' }} className="space-y-3">
          <span className="w-10 h-10 rounded-xl bg-[#F5A623]/15 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-[#F5A623]" />
          </span>
          <h2 className="font-bold text-[#12102A]">What we noticed</h2>
          <p className="text-sm text-[#12102A]/70 leading-relaxed">
            Most Kenyan SMEs already want AI. They just can't get it to actually work for them. That's a skills gap, not a hiring problem.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} transition={{ duration: 0.4, ease: 'easeOut' }} className="space-y-3">
          <span className="w-10 h-10 rounded-xl bg-[#F5A623]/15 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-[#F5A623]" />
          </span>
          <h2 className="font-bold text-[#12102A]">What we do</h2>
          <p className="text-sm text-[#12102A]/70 leading-relaxed">
            We train people to close that gap directly: build the system a business needs, install it for them, and walk away with proof it works.
          </p>
        </motion.div>
      </motion.div>
    </section>

    {/* Verification */}
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="px-6 lg:px-12 py-16"
    >
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-[#10B981]/15 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#10B981]" />
          </span>
          <h2 className="font-bold text-lg text-[#12102A]">How verification works</h2>
        </div>
        <p className="text-sm text-[#12102A]/70 leading-relaxed">
          A verified system isn't a claim, it's proof: a live link, a short demo, and a quote from the real business running it. That's what carries the verified badge.
        </p>
      </div>
    </motion.section>

    {/* Founder note */}
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="px-6 lg:px-12 pb-16"
    >
      <div className="max-w-3xl mx-auto p-6 md:p-8 rounded-2xl border border-[#12102A]/10 bg-white space-y-2">
        <p className="text-sm text-[#12102A]/80 leading-relaxed italic">
          "I'm Manuel, born and raised in Nairobi. I've spent years scaling AI-driven systems for brands like Jumia and my own company, Trance AI, and I kept seeing the same gap: young Kenyans with real hustle, but nothing to prove what they can actually do. Afridemy is how I'm fixing that, because I want to see more of us, tukitoka block, build the life we actually chose for ourselves."
        </p>
        <p className="text-xs font-bold text-[#12102A]/50">Manuel, Founder</p>
      </div>
    </motion.section>

    {/* CTA */}
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      variants={fadeUp}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="px-6 lg:px-12 pb-20"
    >
      <div className="max-w-3xl mx-auto p-8 md:p-10 rounded-3xl bg-[#12102A] text-white text-center space-y-4">
        <h2 className="text-xl md:text-2xl font-black">Ready to build something real?</h2>
        <button
          onClick={onEnterApp}
          className="px-6 py-3 bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] font-black text-sm rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-xs transition-all active:scale-[0.97]"
        >
          Start Learning
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.section>
  </div>
  );
};
