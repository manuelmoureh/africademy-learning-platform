/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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
import { LandingPage } from './components/LandingPage';
import { CourseCatalog } from './components/CourseCatalog';
import { CourseDetailPage } from './components/CourseDetailPage';
import { AboutPage } from './components/AboutPage';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { CommunityView } from './components/CommunityView';
import { INITIAL_TRACKS, INITIAL_PORTFOLIO_VERIFICATION } from './data/courses';
import { Step, Track, UserAccount, PortfolioVerification } from './types';
import { Play, Sparkles, CheckCheck, ShieldCheck, Check } from 'lucide-react';

export default function App() {
  const [tracks, setTracks] = useState<Track[]>(INITIAL_TRACKS);
  const [selectedTrackId, setSelectedTrackId] = useState<string>('whatsapp-retail-agent');
  const [activeNav, setActiveNav] = useState<string>('catalog');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'landing' | 'app' | 'about' | 'privacy' | 'terms'>('landing');

  // User Account State
  const [user, setUser] = useState<UserAccount>({
    name: 'Wanjiku Muthoni',
    email: 'wanjiku@africademy.ke',
    role: 'Learner',
    initials: 'WM',
    plan: 'free',
    location: 'Nairobi, Kenya'
  });

  // Portfolio Verification State
  const [portfolioData, setPortfolioData] = useState<PortfolioVerification>(INITIAL_PORTFOLIO_VERIFICATION);

  // Modals
  const [selectedStep, setSelectedStep] = useState<Step | null>(null);
  const [isSandboxOpen, setIsSandboxOpen] = useState(false);
  const [isPricingOpen, setIsPricingOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [showUpgradeToast, setShowUpgradeToast] = useState(false);

  const activeTrack = tracks.find(t => t.id === selectedTrackId) || tracks[0];
  const isProUser = user.plan === 'pro';

  // Calculate live progress
  const completedStepsCount = activeTrack.steps.filter(s => s.status === 'completed').length;
  const totalStepsCount = activeTrack.steps.length || 12;
  const progressPercent = Math.round((completedStepsCount / totalStepsCount) * 100);

  const handleToggleCompleteStep = (stepId: string) => {
    setTracks(prevTracks => prevTracks.map(track => {
      if (track.id !== selectedTrackId) return track;

      const updatedSteps = track.steps.map(step => {
        if (step.id === stepId) {
          const newStatus: Step['status'] = step.status === 'completed' ? 'current' : 'completed';
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
    return <AboutPage onBack={() => setViewMode('landing')} />;
  }

  if (viewMode === 'privacy') {
    return <PrivacyPolicyPage onBack={() => setViewMode('landing')} />;
  }

  if (viewMode === 'terms') {
    return <TermsOfServicePage onBack={() => setViewMode('landing')} />;
  }

  // If on Landing Page view
  if (viewMode === 'landing') {
    return (
      <>
        <LandingPage
          onEnterApp={() => setViewMode('app')}
          onOpenPricing={() => setIsPricingOpen(true)}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenSandbox={() => setIsSandboxOpen(true)}
          onOpenPortfolio={() => setIsPortfolioOpen(true)}
          onOpenAbout={() => setViewMode('about')}
          onOpenPrivacy={() => setViewMode('privacy')}
          onOpenTerms={() => setViewMode('terms')}
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
      className="flex flex-col min-h-screen w-full overflow-x-hidden bg-[#FAF9FC] text-[#12102A]"
      style={{ fontFamily: "'Satoshi', sans-serif" }}
    >
      {/* Upgrade Toast Notification */}
      {showUpgradeToast && (
        <div className="bg-[#10B981] text-white px-6 py-2.5 text-xs font-bold font-mono flex items-center justify-between shadow-md sticky top-0 z-50 animate-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4" />
            <span>Africademy Pro is now Active! All 12 production steps & Safaricom Daraja webhooks unlocked.</span>
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
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        onOpenWorkspace={() => setIsSandboxOpen(true)}
        onOpenPricing={() => setIsPricingOpen(true)}
        onOpenPortfolio={() => setIsPortfolioOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onGoHome={() => setViewMode('landing')}
        onOpenAbout={() => setViewMode('about')}
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={() => setActiveNav('catalog')}
      />

      {/* Main Learning Hub Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          tracks={tracks}
          selectedTrackId={selectedTrackId}
          onSelectTrack={(id) => {
            setSelectedTrackId(id);
            setActiveNav('course-detail');
          }}
          onOpenPricing={() => setIsPricingOpen(true)}
          onOpenPortfolio={() => setIsPortfolioOpen(true)}
          isProUser={isProUser}
          activeTrackProgress={progressPercent}
        />

        {/* Dynamic Center Stage */}
        <main className="flex-1 overflow-y-auto">
          {activeNav === 'community' && (
            <CommunityView user={user} />
          )}

          {activeNav === 'catalog' && (
            <CourseCatalog
              tracks={tracks}
              searchQuery={searchQuery}
              onSelectCourse={(id) => {
                setSelectedTrackId(id);
                setActiveNav('course-detail');
              }}
            />
          )}

          {activeNav === 'course-detail' && (
            <CourseDetailPage
              track={activeTrack}
              isProUser={isProUser}
              onBack={() => setActiveNav('catalog')}
              onStart={() => setActiveNav('curriculum')}
              onOpenPricing={() => setIsPricingOpen(true)}
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
    </div>
  );
}
