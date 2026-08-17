import React, { useState } from 'react';
import { Search, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Track, UserAccount } from '../types';
import { TrackIcon } from '../utils/trackIcons';
import {
  MotionNavigationMenu,
  MotionNavigationMenuContent,
  MotionNavigationMenuItem,
  MotionNavigationMenuLink,
  MotionNavigationMenuList,
  MotionNavigationMenuTrigger,
} from './ui/motion-navigation-menu';

// The one header used on every page (homepage and the Systems/app pages alike), so the
// nav never visually jumps between them. Swaps only its right-side actions based on
// whether someone is signed in.
interface HeaderProps {
  tracks: Track[];
  activeNav?: string;
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
  onOpenPricing: () => void;
  onOpenAbout: () => void;
  onOpenAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  tracks,
  activeNav,
  user,
  isAuthenticated,
  authLoading = false,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onGoHome,
  onEnterApp,
  onSelectCourse,
  onOpenVerifiedWork,
  onOpenPricing,
  onOpenAbout,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const systemsActive = activeNav === 'catalog' || activeNav === 'course-detail' || activeNav === 'curriculum';
  const homeActive = !activeNav;

  // A query left over from a previous search shouldn't silently keep filtering
  // the catalog once someone clicks away to browse something else.
  const goTo = (action: () => void) => () => {
    onSearchChange('');
    action();
  };

  return (
    <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#12102A]/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between gap-6">
        <button type="button" onClick={onGoHome} className="flex items-center gap-3 cursor-pointer shrink-0">
          <img src="/logo-dark.png" alt="Afridemy" className="h-14 w-auto" />
        </button>

        <MotionNavigationMenu className="hidden md:flex" viewportClassName="border-[#12102A]/10">
          <MotionNavigationMenuList>
            <MotionNavigationMenuItem>
              <MotionNavigationMenuLink
                onClick={goTo(onGoHome)}
                className={`flex h-9 items-center px-4 py-2 text-sm font-semibold cursor-pointer ${homeActive ? 'text-[#12102A]' : 'text-[#12102A]/70'}`}
              >
                Home
              </MotionNavigationMenuLink>
            </MotionNavigationMenuItem>

            <MotionNavigationMenuItem value="courses">
              <MotionNavigationMenuTrigger
                onClick={goTo(onEnterApp)}
                className={`data-[state=open]:text-[#12102A] font-semibold ${systemsActive ? 'text-[#12102A]' : 'text-[#12102A]/70'}`}
              >
                Systems
              </MotionNavigationMenuTrigger>
              <MotionNavigationMenuContent>
                <div className="w-[420px] p-1">
                  <div className="grid grid-cols-2 gap-1">
                    {tracks.slice(0, 4).map((track) => (
                      <MotionNavigationMenuLink key={track.id} onClick={goTo(() => onSelectCourse(track.id))} className="cursor-pointer">
                        <span className="flex items-center gap-2 text-sm font-bold text-[#12102A]">
                          <TrackIcon name={track.icon} className="w-3.5 h-3.5 text-[#F5A623]" />
                          {track.category}
                        </span>
                        <span className="text-[#12102A]/60 text-xs">{track.title}</span>
                      </MotionNavigationMenuLink>
                    ))}
                  </div>
                  <MotionNavigationMenuLink
                    onClick={goTo(onEnterApp)}
                    className="cursor-pointer mt-1 flex items-center justify-between border-t border-[#12102A]/10 pt-2"
                  >
                    <span className="text-sm font-bold text-[#F5A623]">See all systems</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#F5A623]" />
                  </MotionNavigationMenuLink>
                </div>
              </MotionNavigationMenuContent>
            </MotionNavigationMenuItem>

            <MotionNavigationMenuItem>
              <MotionNavigationMenuLink
                onClick={goTo(onOpenVerifiedWork)}
                className={`flex h-9 items-center px-4 py-2 text-sm font-semibold cursor-pointer ${activeNav === 'verified-work' ? 'text-[#12102A]' : 'text-[#12102A]/70'}`}
              >
                Verified Work
              </MotionNavigationMenuLink>
            </MotionNavigationMenuItem>

            <MotionNavigationMenuItem>
              <MotionNavigationMenuLink
                onClick={goTo(onOpenAbout)}
                className={`flex h-9 items-center px-4 py-2 text-sm font-semibold cursor-pointer ${activeNav === 'about' ? 'text-[#12102A]' : 'text-[#12102A]/70'}`}
              >
                About
              </MotionNavigationMenuLink>
            </MotionNavigationMenuItem>
          </MotionNavigationMenuList>
        </MotionNavigationMenu>

        <div className="flex items-center gap-3 shrink-0">
          <form
            onSubmit={(e) => { e.preventDefault(); onSearchSubmit(); }}
            className="hidden lg:block relative"
          >
            <Search className="w-3.5 h-3.5 text-[#12102A]/35 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search systems"
              aria-label="Search AI systems"
              className="w-40 focus:w-56 pl-9 pr-7 py-2 rounded-full border border-[#12102A]/10 bg-[#F0EEF6] text-xs font-medium text-[#12102A] placeholder:text-[#12102A]/40 focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all duration-300"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-[#12102A]/35 hover:text-[#12102A] hover:bg-[#12102A]/5 cursor-pointer transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </form>

          {authLoading ? (
            <div className="hidden md:flex items-center gap-2.5 p-1 pr-1.5">
              <div className="w-16 h-7 rounded-full bg-[#12102A]/8 animate-pulse" />
              <div className="w-9 h-9 rounded-full bg-[#12102A]/8 animate-pulse" />
            </div>
          ) : isAuthenticated ? (
            <>
              <button
                onClick={onOpenPricing}
                className={`hidden md:block px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer active:scale-[0.97] ${
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
                className="hidden md:flex items-center gap-2.5 cursor-pointer p-1 pr-1.5 rounded-full hover:bg-[#F0EEF6] transition-colors"
                title="Click to switch profile / edit account"
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
            </>
          ) : (
            <>
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
            </>
          )}

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
              onSubmit={(e) => { e.preventDefault(); setMobileMenuOpen(false); onSearchSubmit(); }}
              className="relative mb-2"
            >
              <Search className="w-3.5 h-3.5 text-[#12102A]/35 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search systems"
                aria-label="Search AI systems"
                className="w-full pl-9 pr-9 py-2.5 rounded-full border border-[#12102A]/10 bg-[#F0EEF6] text-sm font-medium text-[#12102A] placeholder:text-[#12102A]/40 focus:outline-none focus:border-[#F5A623] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-[#12102A]/35 hover:text-[#12102A] cursor-pointer transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {[
              { label: 'Home', onClick: goTo(onGoHome) },
              { label: 'Systems', onClick: goTo(onEnterApp) },
              { label: 'Verified Work', onClick: goTo(onOpenVerifiedWork) },
              { label: 'About', onClick: goTo(onOpenAbout) },
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

            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="mt-3 w-full py-2.5 rounded-full border border-[#12102A]/10 bg-white hover:bg-[#F0EEF6] text-sm font-bold text-[#12102A] cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-[#10B981]" />
                {user.name}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => { setMobileMenuOpen(false); onOpenAuth(); }}
                className="mt-3 w-full py-2.5 rounded-full border border-[#12102A]/10 bg-white hover:bg-[#F0EEF6] text-sm font-bold text-[#12102A] cursor-pointer transition-all"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
