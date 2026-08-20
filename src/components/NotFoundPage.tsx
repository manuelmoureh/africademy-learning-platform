import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass } from 'lucide-react';
import { Track, UserAccount } from '../types';
import { Header } from './Header';
import { useDocumentMeta } from '../lib/useDocumentMeta';

interface NotFoundPageProps {
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
  onOpenAbout: () => void;
  onOpenAuth: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
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
  onOpenAbout,
  onOpenAuth,
}) => {
  useDocumentMeta('Page Not Found', "The page you're looking for doesn't exist. Browse Afridemy's AI automation systems instead.");

  return (
    <div className="min-h-screen bg-[#F0EEF6] text-[#12102A]">
      <Header
        tracks={tracks}
        activeNav=""
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
        onOpenAbout={onOpenAbout}
        onOpenAuth={onOpenAuth}
      />

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="flex flex-col items-center text-center px-6 py-28 max-w-lg mx-auto"
      >
        <div className="w-16 h-16 rounded-2xl bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#F5A623] flex items-center justify-center mb-6">
          <Compass className="w-8 h-8" />
        </div>
        <span className="text-[10px] font-bold uppercase tracking-widest font-mono text-[#F5A623]">
          404
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#12102A] tracking-tight mt-2">
          This page doesn't exist
        </h1>
        <p className="text-sm text-[#12102A]/70 leading-relaxed font-medium mt-3">
          The link might be broken, or the page may have moved. Head back to the systems catalog or the homepage.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <button
            onClick={onEnterApp}
            className="px-6 py-3 bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] text-sm font-black rounded-xl flex items-center gap-2 cursor-pointer shadow-xs transition-all active:scale-[0.98]"
          >
            Browse Systems
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onGoHome}
            className="px-6 py-3 bg-white border border-[#12102A]/10 hover:border-[#12102A]/20 text-[#12102A] text-sm font-bold rounded-xl cursor-pointer transition-all active:scale-[0.98]"
          >
            Go Home
          </button>
        </div>
      </motion.section>
    </div>
  );
};
