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
import { LessonDetailModal } from './components/LessonDetailModal';
import { LessonPage } from './components/LessonPage';
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
import { PaymentCallbackPage } from './components/PaymentCallbackPage';
import { ProfilePage } from './components/ProfilePage';
import { CommunityView } from './components/CommunityView';
import { INITIAL_TRACKS, INITIAL_PORTFOLIO_VERIFICATION } from './data/courses';
import { Step, Track, UserAccount, PortfolioVerification } from './types';
import { Play, Sparkles, CheckCheck, ShieldCheck, Check } from 'lucide-react';
import { supabase } from './lib/supabase';
import { fetchUserProgress, setStepProgress, fetchUserPurchases } from './lib/db';
import { trackPageView } from './lib/analytics';

// Maps the URL to what used to be `viewMode`/`activeNav` state, so every page the app
// can show has a real, bookmarkable, back-button-friendly URL instead of living entirely
// in memory.
function parseRoute(pathname: string): { view: 'landing' | 'about' | 'privacy' | 'terms' | 'verified-work' | 'lesson' | 'payment-callback' | 'profile' | 'app'; activeNav: string; trackId: string | null; stepId: string | null } {
  if (pathname === '/about') return { view: 'about', activeNav: '', trackId: null, stepId: null };
  if (pathname === '/privacy') return { view: 'privacy', activeNav: '', trackId: null, stepId: null };
  if (pathname === '/terms') return { view: 'terms', activeNav: '', trackId: null, stepId: null };
  if (pathname === '/verified') return { view: 'verified-work', activeNav: '', trackId: null, stepId: null };
  if (pathname === '/payment/callback') return { view: 'payment-callback', activeNav: '', trackId: null, stepId: null };
  if (pathname === '/profile') return { view: 'profile', activeNav: '', trackId: null, stepId: null };
  if (pathname === '/community') return { view: 'app', activeNav: 'community', trackId: null, stepId: null };
  if (pathname === '/systems') return { view: 'app', activeNav: 'catalog', trackId: null, stepId: null };

  const lessonMatch = pathname.match(/^\/systems\/([^/]+)\/learn\/([^/]+)\/?$/);
  if (lessonMatch) return { view: 'lesson', activeNav: 'curriculum', trackId: lessonMatch[1], stepId: lessonMatch[2] };

  const learnMatch = pathname.match(/^\/systems\/([^/]+)\/learn\/?$/);
  if (learnMatch) return { view: 'app', activeNav: 'curriculum', trackId: learnMatch[1], stepId: null };

  const detailMatch = pathname.match(/^\/systems\/([^/]+)\/?$/);
  if (detailMatch) return { view: 'app', activeNav: 'course-detail', trackId: detailMatch[1], stepId: null };

  return { view: 'landing', activeNav: '', trackId: null, stepId: null };
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
  const { view: viewMode, activeNav, trackId: routeTrackId, stepId: routeStepId } = parseRoute(location.pathname);

  // GA4 needs a manual page_view on every route change - see index.html for why the
  // automatic one is disabled.
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location.pathname]);

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
  const [authLoading, setAuthLoading] = useState(true);

  // Bootstrap the real auth session and any saved progress
  useEffect(() => {
    let active = true;

    async function loadProfileAndProgress(userId: string) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('name, email, plan, location, avatar_url')
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
          avatarUrl: profile.avatar_url,
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
      .catch((err) => console.warn('Supabase session check failed', err))
      .finally(() => { if (active) setAuthLoading(false); });

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

  // ProfilePage writes to Supabase itself (updateProfile/uploadAvatar); this just syncs the
  // already-saved fields into local state so the rest of the app (Header avatar, etc.)
  // reflects the change without a full profile refetch.
  const handleProfileUpdated = (updates: Partial<UserAccount>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  // Portfolio Verification State
  const [portfolioData, setPortfolioData] = useState<PortfolioVerification>(INITIAL_PORTFOLIO_VERIFICATION);

  // Modals
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isTrackCheckoutOpen, setIsTrackCheckoutOpen] = useState(false);

  // Real, paid track unlocks. purchasedTrackIds is populated from the purchases table
  // (the actual source of truth, written server-side once Paystack confirms payment) and
  // kept in local state only as an optimistic cache, so the UI updates instantly right
  // after a purchase without waiting on a refetch.
  const [purchasedTrackIds, setPurchasedTrackIds] = useState<string[]>([]);
  const isTrackUnlocked = (trackId: string) => purchasedTrackIds.includes(trackId);
  const handlePurchaseTrack = (trackId: string) => {
    setPurchasedTrackIds(prev => (prev.includes(trackId) ? prev : [...prev, trackId]));
  };

  useEffect(() => {
    if (!authUserId) {
      setPurchasedTrackIds([]);
      return;
    }
    fetchUserPurchases(authUserId).then(setPurchasedTrackIds);
  }, [authUserId]);

  // A real purchase has to be tied to a real signed-in account (that's who gets the
  // unlock recorded against them) - if someone hits "Unlock" while signed out, prompt
  // sign-in first instead of opening a checkout that can't actually complete.
  const openCheckout = () => {
    if (!authUserId) {
      setIsAuthOpen(true);
      return;
    }
    setIsTrackCheckoutOpen(true);
  };

  const activeTrack = tracks.find(t => t.id === selectedTrackId) || tracks[0];

  // "Start Building" always resumes at the first lesson that isn't done yet, or lesson 1
  // if nothing's been started.
  const nextStepFor = (track: Track): Step =>
    track.steps.find(s => s.status !== 'completed') || track.steps[0];

  // The new full-page lesson experience (LessonPage) is rolled out per-course as each
  // course's content is reviewed and confirmed complete - courses not in this set still
  // open the older lesson modal (LessonDetailModal), which doesn't render lessonBody,
  // visualBreaks, interactiveCheck, or fadedPractice.
  const LESSON_PAGE_TRACKS = new Set(['whatsapp-retail-agent', 'lead-capture-bot', 'invoicing-assistant', 'support-ticketing-agent', 'booking-scheduler-agent', 'social-content-agent', 'inventory-restock-agent']);
  const openLesson = (step: Step) => {
    if (LESSON_PAGE_TRACKS.has(activeTrack.id)) {
      navigate(`/systems/${activeTrack.id}/learn/${step.id}`);
    } else {
      setSelectedStep(step);
    }
  };

  // Whatever comes immediately after the lesson currently open in the detail modal,
  // so it can offer a "Next Lesson" action instead of dead-ending after "Mark as Completed".
  const nextStepAfterSelected = selectedStep
    ? activeTrack.steps[activeTrack.steps.findIndex(s => s.id === selectedStep.id) + 1]
    : undefined;

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

  if (viewMode === 'lesson') {
    const lessonTrack = tracks.find(t => t.id === routeTrackId) || activeTrack;
    const lessonStep = lessonTrack.steps.find(s => s.id === routeStepId);
    if (!lessonStep) {
      navigate(`/systems/${lessonTrack.id}/learn`);
      return null;
    }
    return (
      <>
        <LessonPage
          tracks={tracks}
          track={lessonTrack}
          step={lessonStep}
          isUnlocked={isTrackUnlocked(lessonTrack.id)}
          user={user}
          isAuthenticated={!!authUserId}
          authLoading={authLoading}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={() => navigate('/systems')}
          onGoHome={() => navigate('/')}
          onEnterApp={() => navigate('/systems')}
          onSelectCourse={(id) => navigate(`/systems/${id}`)}
          onOpenVerifiedWork={() => navigate('/verified')}
          onOpenAbout={() => navigate('/about')}
          onOpenAuth={() => setIsAuthOpen(true)}
          onBack={() => navigate(`/systems/${lessonTrack.id}/learn`)}
          onToggleComplete={handleToggleCompleteStep}
          onUnlock={openCheckout}
          onNavigateToStep={(stepId) => navigate(`/systems/${lessonTrack.id}/learn/${stepId}`)}
        />

        <CheckoutModal
          isOpen={isTrackCheckoutOpen}
          onClose={() => setIsTrackCheckoutOpen(false)}
          product={{ id: lessonTrack.id, name: lessonTrack.title, price: lessonTrack.price }}
          userId={authUserId}
          email={user.email || null}
        />

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          currentUser={user}
          isAuthenticated={!!authUserId}
          onSignOut={handleSignOut}
          onViewProfile={() => navigate('/profile')}
          onLogin={(updatedUser) => {
            setUser(updatedUser);
            setPortfolioData(prev => ({
              ...prev,
              studentName: updatedUser.name
            }));
          }}
        />
      </>
    );
  }

  if (viewMode === 'about') {
    return (
      <AboutPage
        tracks={tracks}
        user={user}
        isAuthenticated={!!authUserId}
        authLoading={authLoading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => navigate('/systems')}
        onGoHome={() => navigate('/')}
        onEnterApp={() => navigate('/systems')}
        onSelectCourse={(id) => navigate(`/systems/${id}`)}
        onOpenVerifiedWork={() => navigate('/verified')}
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

  if (viewMode === 'payment-callback') {
    const reference = new URLSearchParams(location.search).get('reference');
    return (
      <PaymentCallbackPage
        reference={reference}
        onDone={(trackId) => {
          if (trackId) {
            handlePurchaseTrack(trackId);
            navigate(`/systems/${trackId}/learn`);
          } else {
            navigate('/');
          }
        }}
      />
    );
  }

  if (viewMode === 'verified-work') {
    return (
      <VerifiedWorkPage
        tracks={tracks}
        user={user}
        isAuthenticated={!!authUserId}
        authLoading={authLoading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => navigate('/systems')}
        onGoHome={() => navigate('/')}
        onEnterApp={() => navigate('/systems')}
        onSelectCourse={(id) => navigate(`/systems/${id}`)}
        onOpenAbout={() => navigate('/about')}
        onOpenAuth={() => setIsAuthOpen(true)}
      />
    );
  }

  if (viewMode === 'profile') {
    return (
      <ProfilePage
        tracks={tracks}
        user={user}
        userId={authUserId}
        isAuthenticated={!!authUserId}
        authLoading={authLoading}
        purchasedTrackIds={purchasedTrackIds}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => navigate('/systems')}
        onGoHome={() => navigate('/')}
        onEnterApp={() => navigate('/systems')}
        onSelectCourse={(id) => navigate(`/systems/${id}`)}
        onContinueTrack={(id) => navigate(`/systems/${id}/learn`)}
        onOpenVerifiedWork={() => navigate('/verified')}
        onOpenAbout={() => navigate('/about')}
        onOpenAuth={() => setIsAuthOpen(true)}
        onSignOut={handleSignOut}
        onViewProfile={() => navigate('/profile')}
        onProfileUpdated={handleProfileUpdated}
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
          authLoading={authLoading}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearchSubmit={() => navigate('/systems')}
          onGoHome={() => navigate('/')}
          onEnterApp={() => navigate('/systems')}
          onSelectCourse={(id) => navigate(`/systems/${id}`)}
          onOpenVerifiedWork={() => navigate('/verified')}
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
          onSelectCourse={(id) => navigate(`/systems/${id}`)}
          tracks={tracks}
        />

        {/* Global Modals on Landing Page */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          currentUser={user}
          isAuthenticated={!!authUserId}
          onSignOut={handleSignOut}
          onViewProfile={() => navigate('/profile')}
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
      {/* Top Header Navigation */}
      <Header
        tracks={tracks}
        activeNav={activeNav}
        user={user}
        isAuthenticated={!!authUserId}
        authLoading={authLoading}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => navigate('/systems')}
        onGoHome={() => navigate('/')}
        onEnterApp={() => navigate('/systems')}
        onSelectCourse={(id) => navigate(`/systems/${id}`)}
        onOpenVerifiedWork={() => navigate('/verified')}
        onOpenAbout={() => navigate('/about')}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Learning Hub Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Navigation Sidebar: hidden on the Systems catalog and single-course detail
            pages, it's built around an already-selected track (progress, hardcoded
            track-specific specs) which doesn't apply while someone is still browsing -
            course-detail already has its own self-contained price/CTA panel */}
        {activeNav !== 'catalog' && activeNav !== 'course-detail' && (
          <Sidebar
            track={activeTrack}
            onBrowseAll={() => navigate('/systems')}
            onUnlockTrack={openCheckout}
            isUnlocked={isTrackUnlocked(activeTrack.id)}
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
              isUnlocked={isTrackUnlocked(activeTrack.id)}
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
                    <span className="text-[9px] font-mono font-bold px-2 py-0.5 bg-[#12102A] text-white rounded uppercase">
                      {activeTrack.category}
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
                    onSelectStep={openLesson}
                    onToggleCompleteStep={handleToggleCompleteStep}
                    isUnlocked={isTrackUnlocked(activeTrack.id)}
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
                    onStartBuilding={() => openLesson(nextStepFor(activeTrack))}
                    nextLessonTitle={nextStepFor(activeTrack).title}
                  />
                </div>

              </div>
            </section>
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      <LessonDetailModal
        step={selectedStep}
        onClose={() => setSelectedStep(null)}
        onUnlock={() => {
          setSelectedStep(null);
          openCheckout();
        }}
        onToggleComplete={handleToggleCompleteStep}
        onNext={nextStepAfterSelected ? () => setSelectedStep(nextStepAfterSelected) : undefined}
        isUnlocked={isTrackUnlocked(activeTrack.id)}
        trackTitle={activeTrack.title}
        trackPrice={activeTrack.price}
      />

      <CheckoutModal
        isOpen={isTrackCheckoutOpen}
        onClose={() => setIsTrackCheckoutOpen(false)}
        product={{ id: activeTrack.id, name: activeTrack.title, price: activeTrack.price }}
        userId={authUserId}
        email={user.email || null}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={user}
        isAuthenticated={!!authUserId}
        onSignOut={handleSignOut}
        onViewProfile={() => navigate('/profile')}
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
