import React from 'react';
import { Sparkles, ShieldCheck, Terminal, User, ArrowUpRight, Globe, Search, Info } from 'lucide-react';
import { UserAccount } from '../types';

interface HeaderProps {
  onOpenWorkspace: () => void;
  onOpenPricing: () => void;
  onOpenPortfolio: () => void;
  onOpenAuth: () => void;
  onGoHome: () => void;
  onOpenAbout: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  user: UserAccount;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenWorkspace,
  onOpenPricing,
  onOpenPortfolio,
  onOpenAuth,
  onGoHome,
  onOpenAbout,
  activeNav,
  setActiveNav,
  user,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}) => {
  return (
    <header className="flex items-center justify-between px-6 lg:px-8 h-20 bg-white border-b border-[#12102A]/10 select-none shrink-0 z-20">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={onGoHome}>
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center shadow-xs transition-transform hover:scale-105"
          style={{ backgroundColor: '#12102A' }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 6L9 17L4 12" stroke="#F5A623" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <span className="text-2xl font-black tracking-tighter text-[#12102A] block leading-none">
            AFRICADEMY
          </span>
          <span className="text-[9px] font-bold text-[#F5A623] uppercase tracking-widest font-mono block mt-0.5">
            Kenya AI Engineering Hub
          </span>
        </div>
      </div>

      {/* Search */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearchSubmit();
        }}
        className="hidden lg:flex items-center flex-1 max-w-xs mx-4"
      >
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#12102A]/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search courses"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#12102A]/10 bg-[#FAF9FC] text-xs font-semibold text-[#12102A] placeholder:text-[#12102A]/40 focus:outline-none focus:border-[#F5A623] transition-colors"
          />
        </div>
      </form>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8">
        <button
          onClick={() => setActiveNav('catalog')}
          className={`text-sm font-bold transition-all cursor-pointer ${
            activeNav === 'catalog' || activeNav === 'course-detail' || activeNav === 'curriculum'
              ? 'text-[#12102A] border-b-2 border-[#F5A623] pb-1'
              : 'text-[#12102A]/60 hover:text-[#12102A]'
          }`}
        >
          Courses
        </button>

        <button
          onClick={onOpenWorkspace}
          className="text-sm font-semibold text-[#12102A]/70 hover:text-[#12102A] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Terminal className="w-4 h-4 text-[#F5A623]" />
          Simulator Lab
        </button>

        <button
          onClick={onOpenPortfolio}
          className="text-sm font-semibold text-[#12102A]/70 hover:text-[#12102A] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-[#10B981]" />
          Verified Portfolio
        </button>

        <button
          onClick={() => setActiveNav('community')}
          className={`text-sm font-semibold transition-all cursor-pointer ${
            activeNav === 'community' 
              ? 'text-[#12102A] border-b-2 border-[#F5A623] pb-1' 
              : 'text-[#12102A]/60 hover:text-[#12102A]'
          }`}
        >
          Community
        </button>

        <button
          onClick={onOpenAbout}
          className="text-sm font-semibold text-[#12102A]/70 hover:text-[#12102A] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Info className="w-4 h-4 text-[#12102A]/40" />
          About
        </button>

        {/* User profile & Actions */}
        <div className="flex items-center gap-3 pl-4 lg:pl-6 border-l border-[#12102A]/10">
          <button 
            onClick={onOpenPricing}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
              user.plan === 'pro'
                ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                : 'bg-[#FAF9FC] border border-[#12102A]/10 text-[#12102A] hover:border-[#F5A623]'
            }`}
          >
            {user.plan === 'pro' ? 'PRO ACTIVE' : 'UPGRADE PRO'}
          </button>

          <button
            type="button"
            onClick={onOpenAuth}
            className="flex items-center gap-2.5 cursor-pointer p-1 rounded-lg hover:bg-gray-50 transition-colors"
            title="Click to Switch Profile / Edit Account"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold leading-none text-[#12102A]">{user.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-[#12102A]/50 font-bold font-mono mt-0.5">
                {user.plan === 'pro' ? 'PRO MEMBER' : 'FREE LEARNER'}
              </p>
            </div>
            <div 
              className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                user.plan === 'pro'
                  ? 'bg-[#12102A] text-[#F5A623] ring-2 ring-[#F5A623]/30'
                  : 'bg-[#12102A]/10 text-[#12102A]'
              }`}
            >
              {user.initials}
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Action buttons */}
      <div className="flex md:hidden items-center gap-2.5">
        <button
          onClick={onOpenWorkspace}
          className="px-2.5 py-1.5 bg-[#F5A623] text-[#12102A] text-xs font-bold rounded-lg"
        >
          Lab
        </button>
        <button
          onClick={onOpenPortfolio}
          className="p-1.5 rounded-lg border border-[#12102A]/10 text-[#10B981]"
        >
          <ShieldCheck className="w-4 h-4" />
        </button>
        <div 
          onClick={onOpenAuth}
          className="w-8 h-8 rounded-full bg-[#12102A] text-[#F5A623] flex items-center justify-center font-black text-xs cursor-pointer"
        >
          {user.initials}
        </div>
      </div>
    </header>
  );
};
