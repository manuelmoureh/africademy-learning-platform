import React from 'react';
import { ShieldCheck, Search } from 'lucide-react';
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
    <header className="flex items-center justify-between gap-4 px-6 lg:px-8 h-20 bg-white border-b border-[#12102A]/10 select-none shrink-0 z-20">
      {/* Brand Logo, larger, and Home */}
      <button
        type="button"
        onClick={onGoHome}
        className="flex items-center shrink-0 cursor-pointer"
      >
        <img src="/logo-dark.png" alt="Afridemy" className="h-16 w-auto transition-transform hover:scale-105" />
      </button>

      {/* Search, softer rounded pill treatment */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearchSubmit();
        }}
        className="hidden lg:flex items-center flex-1 max-w-sm"
      >
        <div className="relative w-full">
          <Search className="w-4 h-4 text-[#12102A]/35 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search courses"
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#12102A]/10 bg-[#F0EEF6] text-sm font-medium text-[#12102A] placeholder:text-[#12102A]/40 focus:outline-none focus:border-[#F5A623] focus:bg-white focus:shadow-sm transition-all"
          />
        </div>
      </form>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-5 lg:gap-7 shrink-0">
        <button
          onClick={onGoHome}
          className="text-sm font-semibold text-[#12102A]/70 hover:text-[#12102A] transition-colors cursor-pointer"
        >
          Home
        </button>

        <button
          onClick={() => setActiveNav('catalog')}
          className={`text-sm font-bold transition-all cursor-pointer ${
            activeNav === 'catalog' || activeNav === 'course-detail' || activeNav === 'curriculum'
              ? 'text-[#12102A]'
              : 'text-[#12102A]/60 hover:text-[#12102A]'
          }`}
        >
          Courses
        </button>

        <button
          onClick={onOpenPortfolio}
          className="text-sm font-semibold text-[#12102A]/70 hover:text-[#12102A] transition-colors cursor-pointer"
        >
          Verified Work
        </button>

        <button
          onClick={onOpenPricing}
          className="text-sm font-semibold text-[#12102A]/70 hover:text-[#12102A] transition-colors cursor-pointer"
        >
          Pricing
        </button>

        <button
          onClick={onOpenAbout}
          className="text-sm font-semibold text-[#12102A]/70 hover:text-[#12102A] transition-colors cursor-pointer"
        >
          About
        </button>
      </nav>

      {/* User profile & Actions, rounded-pill treatment matching the reference */}
      <div className="hidden md:flex items-center gap-2.5 shrink-0">
        <button
          onClick={onOpenPricing}
          className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-[0.97] ${
            user.plan === 'pro'
              ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
              : 'bg-[#12102A] text-white hover:bg-[#1c1940]'
          }`}
        >
          {user.plan === 'pro' ? 'Pro Active' : 'Upgrade'}
        </button>

        <button
          type="button"
          onClick={onOpenAuth}
          className="flex items-center gap-2.5 cursor-pointer p-1 pr-1.5 rounded-full hover:bg-[#F0EEF6] transition-colors"
          title="Click to Switch Profile / Edit Account"
        >
          <div className="text-right hidden lg:block">
            <p className="text-xs font-bold leading-none text-[#12102A]">{user.name}</p>
            <p className="text-[10px] text-[#12102A]/50 font-semibold mt-0.5">
              {user.plan === 'pro' ? 'Pro Member' : 'Free Learner'}
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

      {/* Mobile Action buttons */}
      <div className="flex md:hidden items-center gap-2.5">
        <button
          onClick={onOpenWorkspace}
          className="px-2.5 py-1.5 bg-[#F5A623] text-[#12102A] text-xs font-bold rounded-full"
        >
          Demo
        </button>
        <button
          onClick={onOpenPortfolio}
          className="p-1.5 rounded-full border border-[#12102A]/10 text-[#10B981]"
        >
          <ShieldCheck className="w-4 h-4" />
        </button>
        <button
          onClick={onOpenAuth}
          className="w-8 h-8 rounded-full bg-[#12102A] text-[#F5A623] flex items-center justify-center font-black text-xs cursor-pointer"
        >
          {user.initials}
        </button>
      </div>
    </header>
  );
};
