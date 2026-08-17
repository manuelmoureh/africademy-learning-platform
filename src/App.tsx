/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { CurriculumRoadmap } from './components/CurriculumRoadmap';
import { PortfolioStatus } from './components/PortfolioStatus';
import { BuildWorkspaceCard } from './components/BuildWorkspaceCard';
import { WhatsAppSandboxModal } from './components/WhatsAppSandboxModal';
import { LessonDetailModal } from './components/LessonDetailModal';
import { PricingModal } from './components/PricingModal';
import { CheckoutModal } from './components/CheckoutModal';
import { AuthModal } from './components/AuthModal';
import { VerifiedPortfolioModal } from './components/VerifiedPortfolioModal';
import { SubmitProjectModal } from './components/SubmitProjectModal';
import { LandingPage } from './components/LandingPage';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseDetailPage } from './components/CourseDetailPage';
import { AboutPage } from './components/AboutPage';
import { VerifiedWorkPage } from './components/VerifiedWorkPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { CommunityView } from './components/CommunityView';
import { INITIAL_TRACKS, INITIAL_PORTFOLIO_VERIFICATION } from './data/courses';
import { Step, Track, UserAccount, PortfolioVerification } from './types';
import { Play, Sparkles, CheckCheck, ShieldCheck, Check } from 'lucide-react';
import { supabase } from './lib/supabase';
import { fetchUserProgress, setStepProgress } from './lib/db';

// Maps the URL to what used to be `viewMode`/`activeNav` state, so every page the app
// can show has a real, bookmarkable, back-button-friendly URL instead of living entirely
// in memory.
function parseRoute(pathname: string): { view: 'landing' | 'about' | 'privacy' | 'terms' | 'verified-work' | 'app'; activeNav: string; trackId: string | null } {
  if (pathname === '/about') return { view: 'about', activeNav: '', trackId: null };
  if (pathname === '/privacy') return { view: 'privacy', activeNav: '', trackId: null };
  if (pathname === '/terms') return { view: 'terms', activeNav: '', trackId: null };
  if (pathname === '/verified') return { view: 'verified-work', activeNav: '', trackId: null };
  if (pathname === '/community') return { view: 'app', activeNav: 'community', trackId: null };
  if (pathname === '/systems') return { view: 'app', activeNav: 'catalog', trackId: null };

  const learnMatch = pathname.match(/^\/systems\/([^/]+)\/learn\/?$/);
  if (learnMatch) return { view: 'app', activeNav: 'curriculum', trackId: learnMatch[1] };

  const detailMatch = pathname.match(/^\/systems\/([^/]+)\/?$/);
  if (detailMatch) return { view: 'app', activeNav: 'course-detail', trackId: detailMatch[1] };

  return { view: 'landing', activeNav: '', trackId: null };
}

const GUEST_USER: UserAccount = {
  name: 'Guest',
  email: '',
  role: 'Learner',
  initials: 'GU',
  plan: 'free',
  location: 'Nairobi, Kenya',
};

function applyProgressToTracks(baseTracks: Track[], rows: { track_id: string; step_id: string; is_completed: boolean }[]): Track[] {
  if (rows.length === 0) return baseTracks;
  const byTrack = new Map<string, Map<string, boolean>>();
  for (const row of rows) {
    if (!byTrack.has(row.track_id)) byTrack.set(row.track_id, new Map());
    byTrack.get(row.track_id)!.set(row.step_id, row.is_completed);
  }
  return baseTracks.map((track) => {
    const stepStates = byTrack.get(track.id);
    if (!stepStates) return track;
    const steps = track.steps.map((step) => {
      const isCompleted = stepStates.get(step.id);
      if (isCompleted === undefined) return step;
      if (isCompleted) return { ...step, status: 'completed' as Step['status'] };
      // Explicit "not completed" row — honor it even if the mock baseline had this
      // step pre-marked complete, instead of silently falling back to that mock status.
      return { ...step, status: (step.status === 'completed' ? 'current' : step.status) as Step['status'] };
    });
    const completedSteps = steps.filter((s) => s.status === 'completed').length;
    return { ...track, steps, completedSteps, progress: Math.round((completedSteps / track.totalSteps) * 100) };
  });
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { view: viewMode, activeNav, trackId: routeTrackId } = parseRoute(location.pathname);

  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS);
  const [selectedTrackId, setSelectedTrackId] = useState<string>('whatsapp-retail-agent');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // The URL is the source of truth for which track is open; keep local state in sync so
  // existing lookups (activeTrack, progress, handleToggleCompleteStep) keep working as-is.
  useEffect(() => {
    if (routeTrackId && routeTrackId !== selectedTrackId) {
      setSelectedTrackId(routeTrackId);
    }
  }, [routeTrackId]);

  // User Account State — starts as guest, replaced by the real Supabase session on mount
  const [user, setUser] = useState<UserAccount>(GUEST_USER);
  const [authUserId, setAuthUserId] = useState<string | null>(null);

  // Bootstrap the real auth session and any saved progress
  useEffect(() => {
    let active = true;

    async function loadProfileAndProgress(userId: string) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('name, email, plan, location')
        .eq('id', userId)
        .single();
      if (!active) return;
      if (profile) {
        const parts = profile.name.trim().split(' ');
        const initials = parts.length > 1
          ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
          : profile.name.slice(0, 2).toUpperCase();
        setUser({
          name: profile.name,
          email: profile.email,
          role: profile.plan === 'pro' ? 'Pro Member' : 'Learner',
          initials,
          plan: profile.plan === 'pro' ? 'pro' : 'free',
          location: profile.location || 'Nairobi, Kenya',
        });
      }
      const progressRows = await fetchUserProgress(userId);
      if (!active) return;
      if (progressRows.length > 0) {
        setTracks((prev) => applyProgressToTracks(prev, progressRows));
      }
    }

    supabase.auth.getSession()
      .then(({ data }) => {
        if (data.session?.user) {
          setAuthUserId(data.session.user.id);
          loadProfileAndProgress(data.session.user.id);
        }
      })
      .catch((err) => console.warn('Supabase session check failed', err));

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setAuthUserId(null);
        setUser(GUEST_USER);
        setTracks(INITIAL_TRACKS);
      } else if (session?.user) {
        setAuthUserId(session.user.id);
      }
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // Portfolio Verification State
  const [portfolioData, setPortfolioData] = useState<PortfolioVerification>(INITIAL_PORTFOLIO_VERIFICATION);

  // Modals
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [showUpgradeToast, setShowUpgradeToast] = useState(false);

  const activeTrack = tracks.find(t => t.id === selectedTrackId) || tracks[0];
  const isProUser = user.plan === 'pro';

  // Calculate live progress
  const completedStepsCount = activeTrack.steps.filter(s => s.status === 'completed').length;
  const totalStepsCount = activeTrack.steps.length || 12;
  const progressPercent = Math.round((completedStepsCount / totalStepsCount) * 100);

  const handleToggleCompleteStep = (stepId: string) => {
    let newlyCompleted = false;
    setTracks(prevTracks => prevTracks.map(track => {
      if (track.id !== selectedTrackId) return track;

      const updatedSteps = track.steps.map(step => {
        if (step.id === stepId) {
          const newStatus: Step['status'] = step.status === 'completed' ? 'current' : 'completed';
          newlyCompleted = newStatus === 'completed';
          return { ...step, status: newStatus };
        }
        return step;
      });

      const newCompleted = updatedSteps.filter(s => s.status === 'completed').length;
      return {
        ...track,
        steps: updatedSteps,
        completedSteps: newCompleted,
        progress: Math.round((newCompleted / track.totalSteps) * 100)
      };
    }));

    if (authUserId) {
      setStepProgress(authUserId, selectedTrackId, stepId, newlyCompleted);
    }

    if (selectedStep && selectedStep.id === stepId) {
      setSelectedStep(prev => prev ? {
        ...prev,
        status: prev.status === 'completed' ? 'current' : 'completed'
      } : null);
    }
  };

  const handleUpgradeSuccess = () => {
    setUser(prev => ({
      ...prev,
      plan: 'pro',
      role: 'Pro Member'
    }));

    // Unlock all steps on active track
    setTracks(prevTracks => prevTracks.map(track => ({
      ...track,
      steps: track.steps.map(s => ({
        ...s,
        status: s.status === 'locked' ? 'current' : s.status
      }))
    })));

    setShowUpgradeToast(true);
    setTimeout(() => setShowUpgradeToast(false), 5000);
  };

  if (viewMode === 'about') {
    return (
      <AboutPage
        tracks={tracks}
        user={user}
        isAuthenticated={!!authUserId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => navigate('/systems')}
        onGoHome={() => navigate('/')}
        onEnterApp={() => navigate('/systems')}
        onSelectCourse={(id) => navigate(`/systems/${id}`)}
        onOpenVerifiedWork={() => navigate('/verified')}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
    );
  }

  if (viewMode === 'privacy') {
    return <PrivacyPolicyPage onBack={() => navigate('/')} />;
  }

  if (viewMode === 'terms') {
    return <TermsOfServicePage onBack={() => navigate('/')} />;
  }

  if (viewMode === 'verified-work') {
    return (
      <VerifiedWorkPage
        tracks={tracks}
        user={user}
        isAuthenticated={!!authUserId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => navigate('/systems')}
        onGoHome={() => navigate('/')}
        onEnterApp={() => navigate('/systems')}
        onSelectCourse={(id) => navigate(`/systems/${id}`)}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenAbout={() => navigate('/about')}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
    );
  }

  // If on Landing Page view
  if (viewMode === 'landing') {
    return (
      <>
        <Header
          tracks={tracks}
          activeNav={activeNav}
          user={user}
          isAuthenticated={!!authUserId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={() => navigate('/systems')}
          onGoHome={() => navigate('/')}
          onEnterApp={() => navigate('/systems')}
          onSelectCourse={(id) => navigate(`/systems/${id}`)}
          onOpenVerifiedWork={() => navigate('/verified')}
          onOpenPricing={() => setIsPricingOpen(true)}
          onOpenAbout={() => navigate('/about')}
          onOpenAuth={() => setIsAuthOpen(true)}
        />

        <LandingPage
          onEnterApp={() => navigate('/systems')}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenVerifiedWork={() => navigate('/verified')}
          onOpenAbout={() => navigate('/about')}
          onOpenPrivacy={() => navigate('/privacy')}
          onOpenTerms={() => navigate('/terms')}
          onSearch={(query) => {
            setSearchQuery(query);
            navigate('/systems');
          }}
          tracks={tracks}
        />

        {/* Global Modals on Landing Page */}
        <WhatsAppSandboxModal
          isOpen={isSandboxOpen}
          onClose={() => setIsSandboxOpen(false)}
        />

        <PricingModal
          isOpen={isPricingOpen}
          onClose={() => setIsPricingOpen(false)}
          onOpenCheckout={() => {
            setIsPricingOpen(false);
            setIsCheckoutOpen(true);
          }}
          isProUser={isProUser}
        />

        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          onSuccess={handleUpgradeSuccess}
        />

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          currentUser={user}
          isAuthenticated={!!authUserId}
          onSignOut={handleSignOut}
          onLogin={(updatedUser) => {
            setUser(updatedUser);
            setPortfolioData(prev => ({
              ...prev,
              studentName: updatedUser.name
            }));
          }}
        />

        <VerifiedPortfolioModal
          isOpen={isPortfolioOpen}
          onClose={() => setIsPortfolioOpen(false)}
          verification={portfolioData}
          completedSteps={completedStepsCount}
          totalSteps={totalStepsCount}
        />
      </>
    );
  }

  return (
    <div 
      className="flex flex-col min-h-screen w-full overflow-x-hidden bg-[#F0EEF6] text-[#12102A]"
      style={{ fontFamily: "'Satoshi', sans-serif" }}
    >
      {/* Upgrade Toast Notification */}
      {showUpgradeToast && (
        <div className="bg-[#10B981] text-white px-6 py-2.5 text-xs font-bold font-mono flex items-center justify-between shadow-md sticky top-0 z-50 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Afridemy Pro is now Active! All 12 production steps & Safaricom Daraja webhooks unlocked.</span>
          </div>
          <button 
            onClick={() => setShowUpgradeToast(false)}
            className="text-white/80 hover:text-white underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Header Navigation */}
      <Header
        tracks={tracks}
        activeNav={activeNav}
        user={user}
        isAuthenticated={!!authUserId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => navigate('/systems')}
        onGoHome={() => navigate('/')}
        onEnterApp={() => navigate('/systems')}
        onSelectCourse={(id) => navigate(`/systems/${id}`)}
        onOpenVerifiedWork={() => navigate('/verified')}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenAbout={() => navigate('/about')}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Learning Hub Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Navigation Sidebar: hidden on the Systems catalog page, it's built around an
            already-selected track (progress, hardcoded track-specific specs) which doesn't
            apply while someone is still browsing */}
        {activeNav !== 'catalog' && (
          <Sidebar
            tracks={tracks}
            selectedTrackId={selectedTrackId}
            onSelectTrack={(id) => navigate(`/systems/${id}`)}
            onOpenPricing={() => setIsPricingOpen(true)}
            onOpenPortfolio={() => setIsPortfolioOpen(true)}
            isProUser={isProUser}
            activeTrackProgress={progressPercent}
          />
        )}

        {/* Dynamic Center Stage */}
        <main className="flex-1 overflow-y-auto">
          {activeNav === 'community' && (
            <CommunityView user={user} />
          )}

          {activeNav === 'catalog' && (
            <CourseCatalog
              tracks={tracks}
              searchQuery={searchQuery}
              onSelectCourse={(id) => navigate(`/systems/${id}`)}
              onGoHome={() => navigate('/')}
            />
          )}

          {activeNav === 'course-detail' && (
            <CourseDetailPage
              track={activeTrack}
              isProUser={isProUser}
              userId={authUserId}
              onBack={() => navigate('/systems')}
              onStart={() => navigate(`/systems/${activeTrack.id}/learn`)}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}

          {activeNav === 'curriculum' && (
            <section className="p-6 md:p-10 flex flex-col gap-8 max-w-7xl mx-auto w-full">
              {/* Active Track Title & Status Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-[#F5A623] uppercase tracking-widest font-mono">
                      {activeTrack.trackNumber}
                    </span>
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-[#12102A] text-white rounded">
                      NAIROBI RETAIL COMMERCE
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[#12102A]">
                    {activeTrack.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#12102A]/70 mt-1 max-w-2xl font-medium leading-relaxed">
                    {activeTrack.description}
                  </p>
                </div>

                {/* Pipeline Active status badge */}
                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#10B981]/10 text-[#10B981] rounded-full self-start sm:self-auto shrink-0 border border-[#10B981]/20">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wider font-mono">
                    Pipeline Active
                  </span>
                </div>
              </div>

              {/* Grid content matching the Professional Polish Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left 2 Cols: Curriculum Roadmap */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                  <CurriculumRoadmap
                    steps={activeTrack.steps}
                    selectedStepId={selectedStep?.id || null}
                    onSelectStep={(step) => setSelectedStep(step)}
                    onToggleCompleteStep={handleToggleCompleteStep}
                    onOpenSandbox={() => setIsSandboxOpen(true)}
                    isProUser={isProUser}
                  />
                </div>

                {/* Right 1 Col: Portfolio Status & Build Workspace */}
                <div className="flex flex-col gap-6">
                  <PortfolioStatus
                    onOpenPortfolio={() => setIsPortfolioOpen(true)}
                    onSubmitProject={() => setIsSubmitOpen(true)}
                    completedSteps={completedStepsCount}
                    totalSteps={totalStepsCount}
                  />

                  <BuildWorkspaceCard
                    onOpenSandbox={() => setIsSandboxOpen(true)}
                    onOpenPricing={() => setIsPricingOpen(true)}
                    isUnlocked={isProUser}
                  />
                </div>

              </div>
            </section>
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      <WhatsAppSandboxModal
        isOpen={isSandboxOpen}
        onClose={() => setIsSandboxOpen(false)}
      />

      <LessonDetailModal
        step={selectedStep}
        onClose={() => setSelectedStep(null)}
        onOpenSandbox={() => {
          setSelectedStep(null);
          setIsSandboxOpen(true);
        }}
        onOpenPricing={() => {
          setSelectedStep(null);
          setIsPricingOpen(true);
        }}
        onToggleComplete={handleToggleCompleteStep}
        isProUser={isProUser}
      />

      <PricingModal
        isOpen={isPricingOpen}
        onClose={() => setIsPricingOpen(false)}
        onOpenCheckout={() => {
          setIsPricingOpen(false);
          setIsCheckoutOpen(true);
        }}
        isProUser={isProUser}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onSuccess={handleUpgradeSuccess}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={user}
        isAuthenticated={!!authUserId}
        onSignOut={handleSignOut}
        onLogin={(updatedUser) => {
          setUser(updatedUser);
          setPortfolioData(prev => ({
            ...prev,
            studentName: updatedUser.name
          }));
        }}
      />

      <VerifiedPortfolioModal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
        verification={portfolioData}
        completedSteps={completedStepsCount}
        totalSteps={totalStepsCount}
      />

      <SubmitProjectModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        userId={authUserId}
        trackId={activeTrack.id}
        trackTitle={activeTrack.title}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
    </div>
  );
}
