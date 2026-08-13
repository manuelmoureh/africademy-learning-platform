import React from 'react';
import { 
  Terminal, ShieldCheck, Zap, ArrowRight, Play, CheckCircle2, 
  MessageSquare, Lock, Sparkles, Code2, Layers, Check, ExternalLink,
  Users, Building2
} from 'lucide-react';
import { Track } from '../types';

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenPricing: () => void;
  onOpenAuth: () => void;
  onOpenSandbox: () => void;
  onOpenPortfolio: () => void;
  tracks: Track[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  onOpenPricing,
  onOpenAuth,
  onOpenSandbox,
  onOpenPortfolio,
  tracks,
}) => {
  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#12102A] flex flex-col">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-6 lg:px-12 h-20 bg-white border-b border-[#12102A]/10 sticky top-0 z-30">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onEnterApp}>
          <div className="w-10 h-10 rounded-lg bg-[#12102A] flex items-center justify-center shadow-xs">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="3">
              <path d="M20 6L9 17L4 12" />
            </svg>
          </div>
          <div>
            <span className="text-2xl font-black tracking-tighter text-[#12102A] block leading-none">
              AFRICADEMY
            </span>
            <span className="text-[9px] font-bold text-[#F5A623] uppercase tracking-widest font-mono block mt-0.5">
              Kenya AI Engineering
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold">
          <button onClick={onEnterApp} className="text-[#12102A]/70 hover:text-[#12102A] cursor-pointer">
            Curriculum
          </button>
          <button onClick={onOpenSandbox} className="text-[#12102A]/70 hover:text-[#12102A] flex items-center gap-1.5 cursor-pointer">
            <Terminal className="w-4 h-4 text-[#F5A623]" />
            Agent Simulator
          </button>
          <button onClick={onOpenPortfolio} className="text-[#12102A]/70 hover:text-[#12102A] flex items-center gap-1.5 cursor-pointer">
            <ShieldCheck className="w-4 h-4 text-[#10B981]" />
            Verified Portfolios
          </button>
          <button onClick={onOpenPricing} className="text-[#12102A]/70 hover:text-[#12102A] cursor-pointer">
            Pricing
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAuth}
            className="px-4 py-2 rounded-lg border border-[#12102A]/10 bg-white hover:bg-[#FAF9FC] text-xs font-bold text-[#12102A] cursor-pointer transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={onEnterApp}
            className="px-4 py-2 rounded-lg bg-[#12102A] hover:bg-[#1c1940] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
          >
            Explore Dashboard
            <ArrowRight className="w-3.5 h-3.5 text-[#F5A623]" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 lg:px-12 py-16 md:py-24 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F5A623]/10 border border-[#F5A623]/20">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#12102A]">
                Nairobi Cohort • Meta WhatsApp & M-Pesa Pipelines
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#12102A] tracking-tight leading-[1.08]">
              Build Production AI Agents for African Commerce.
            </h1>

            <p className="text-base sm:text-lg text-[#12102A]/75 font-medium leading-relaxed max-w-xl">
              No vanity diplomas. Master autonomous WhatsApp retail agents, Safaricom M-Pesa STK push integration, and live inventory state management — backed by <b>verified developer portfolios</b> evaluated against production SME rubrics.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onEnterApp}
                className="px-6 py-3.5 bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] font-black text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all"
              >
                Start Track 01 Free (Steps 1–5)
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenSandbox}
                className="px-6 py-3.5 bg-white hover:bg-[#FAF9FC] border border-[#12102A]/10 text-[#12102A] font-bold text-sm rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
              >
                <Play className="w-4 h-4 text-[#F5A623] fill-current" />
                Launch Live Simulator
              </button>
            </div>

            {/* Value checklist */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#12102A]/10">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#12102A]/80">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                Meta WhatsApp API v21.0
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#12102A]/80">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                Safaricom Daraja STK Push
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#12102A]/80">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                Gemini 3.7 Flash Architecture
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#12102A]/80">
                <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                Verified Live Portfolio Links
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Terminal & Spec Preview */}
          <div className="lg:col-span-5">
            <div className="bg-[#12102A] rounded-2xl p-6 text-white shadow-2xl border border-white/10 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#FF5F56]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#FFBD2E]"></span>
                  <span className="w-3 h-3 rounded-full bg-[#27C93F]"></span>
                  <span className="text-[10px] font-mono text-white/50 ml-2">nairobi-agent-runtime</span>
                </div>
                <span className="text-[10px] font-bold font-mono text-[#F5A623] bg-[#F5A623]/10 px-2 py-0.5 rounded">
                  LIVE ENGINE
                </span>
              </div>

              {/* Simulated terminal dialogue */}
              <div className="space-y-3 font-mono text-xs">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-white/90">
                  <span className="text-emerald-400 font-bold block mb-1">Customer (WhatsApp):</span>
                  "Habari! Do you have Maasai beaded sandals size 40, and can I pay via M-Pesa?"
                </div>

                <div className="p-2.5 rounded-lg bg-[#075E54]/40 border border-[#25D366]/20 text-white/90">
                  <span className="text-[#25D366] font-bold block mb-1">AfrikBot (Gemini 3.7 Flash):</span>
                  "Karibu! Yes, we have 18 pairs of Handmade Maasai Sandals in stock at KES 2,800. Click to trigger M-Pesa STK Push to your phone!"
                </div>

                <div className="p-2.5 rounded-lg bg-[#F5A623]/10 border border-[#F5A623]/20 text-[11px] text-[#F5A623]">
                  <span>Daraja Webhook: [STK_PUSH_TRIGGERED: KES 2800 &rarr; 254712345678]</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] text-white/60 font-mono">Response Latency: 1.18s</span>
                <button
                  onClick={onOpenSandbox}
                  className="px-3 py-1.5 bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] text-xs font-black rounded-lg transition-colors cursor-pointer"
                >
                  Test In Sandbox
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Curriculum Tracks Section */}
      <section className="px-6 lg:px-12 py-16 bg-white border-y border-[#12102A]/10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-bold text-[#F5A623] uppercase tracking-widest font-mono">
              Curriculum Tracks
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#12102A]">
              Engineered for Real African Business Use Cases
            </h2>
            <p className="text-xs sm:text-sm text-[#12102A]/60">
              Each track is structured into progressive modular steps with interactive development labs and verified portfolio milestones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tracks.map((track) => (
              <div
                key={track.id}
                className="p-6 rounded-2xl border border-[#12102A]/10 bg-[#FAF9FC] flex flex-col justify-between hover:border-[#F5A623] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-[#F5A623] uppercase tracking-wider">
                      {track.trackNumber}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#12102A] text-white">
                      {track.steps.length || 8} STEPS
                    </span>
                  </div>

                  <h3 className="font-bold text-lg text-[#12102A] group-hover:text-[#F5A623] transition-colors">
                    {track.title}
                  </h3>

                  <p className="text-xs text-[#12102A]/70 mt-2 leading-relaxed font-medium">
                    {track.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {track.tags.map((tag, idx) => (
                      <span key={idx} className="text-[9px] font-mono bg-white border border-[#12102A]/5 px-2 py-0.5 rounded text-[#12102A]/70">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#12102A]/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#10B981]">
                    {track.badgeTitle}
                  </span>
                  <button
                    onClick={onEnterApp}
                    className="text-xs font-bold text-[#12102A] hover:text-[#F5A623] flex items-center gap-1 cursor-pointer"
                  >
                    View Roadmap <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Verified Portfolio Philosophy vs Fake Certificate Section */}
      <section className="px-6 lg:px-12 py-16 max-w-6xl mx-auto w-full space-y-8">
        <div className="p-8 md:p-12 rounded-3xl bg-[#12102A] text-white flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-4 max-w-xl">
            <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-widest font-mono">
              The Africademy Standard
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
              Why Verified Portfolios Outperform Static Diplomas
            </h2>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-medium">
              Anyone can print a PDF certificate. Africademy provides live, interactive links to your tested agents, complete with 5-point SME engineering audits, latency telemetry, and code repository links that enterprise clients can test directly.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenPortfolio}
                className="px-5 py-2.5 bg-[#10B981] hover:bg-[#0ea572] text-white text-xs font-bold rounded-xl flex items-center gap-2 cursor-pointer transition-colors shadow-xs"
              >
                <ShieldCheck className="w-4 h-4" />
                Preview Sample Verified Portfolio
              </button>
            </div>
          </div>

          <div className="w-full lg:w-96 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-3 shrink-0">
            <div className="text-xs font-mono font-bold text-[#F5A623] uppercase">
              Production Rubric Checklist
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-white/90">
                <Check className="w-4 h-4 text-[#10B981]" />
                Zero SKU Hallucination Under Stress
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Check className="w-4 h-4 text-[#10B981]" />
                Safaricom Daraja Webhook Uptime
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Check className="w-4 h-4 text-[#10B981]" />
                Prompt Injection Defense Hardening
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Check className="w-4 h-4 text-[#10B981]" />
                Sheng & Swahili Natural Parsing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison Section */}
      <section className="px-6 lg:px-12 py-16 bg-white border-t border-[#12102A]/10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-bold text-[#F5A623] uppercase tracking-widest font-mono">
              Transparent Pricing
            </span>
            <h2 className="text-3xl font-black text-[#12102A]">
              Honest Plans for Learners & Pro Engineers
            </h2>
            <p className="text-xs text-[#12102A]/60">
              Start free with core fundamentals or upgrade to Pro for the full production pipeline and verified portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Free Tier */}
            <div className="p-6 rounded-2xl border border-[#12102A]/10 bg-[#FAF9FC] flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg text-[#12102A]">Learner Free</h3>
                <div className="my-4">
                  <span className="text-3xl font-black text-[#12102A]">KES 0</span>
                  <span className="text-xs text-[#12102A]/60 font-mono ml-2">Forever</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#12102A]/80">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    Full access to Steps 01–05 (Fundamentals)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    Interactive Agent Simulator demo mode
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    Community forum discussions
                  </li>
                </ul>
              </div>

              <button
                onClick={onEnterApp}
                className="w-full mt-6 py-2.5 bg-white border border-[#12102A]/10 hover:bg-gray-50 text-xs font-bold text-[#12102A] rounded-lg cursor-pointer transition-colors"
              >
                Start Free Steps
              </button>
            </div>

            {/* Pro Tier */}
            <div className="p-6 rounded-2xl border-2 border-[#F5A623] bg-[#F5A623]/5 flex flex-col justify-between relative shadow-sm">
              <div className="absolute -top-3 right-6 bg-[#12102A] text-[#F5A623] px-3 py-0.5 rounded-full text-[10px] font-black font-mono">
                POPULAR
              </div>

              <div>
                <h3 className="font-bold text-lg text-[#12102A]">Africademy Pro</h3>
                <div className="my-4 flex items-baseline gap-1">
                  <span className="text-3xl font-black text-[#12102A]">KES 3,800</span>
                  <span className="text-xs text-[#12102A]/60 font-mono">/ month (or $29)</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#12102A] font-semibold">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    All 12 Steps Unlocked (M-Pesa, Webhooks, Rerouting)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    Live Gemini 3.7 Flash sandbox access
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    Verified Public Portfolio link & SME Rubric
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#10B981]" />
                    Production Safaricom Daraja code templates
                  </li>
                </ul>
              </div>

              <button
                onClick={onOpenPricing}
                className="w-full mt-6 py-2.5 bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] text-xs font-black rounded-lg cursor-pointer transition-all shadow-xs"
              >
                Upgrade to Pro
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 lg:px-12 py-8 bg-[#12102A] text-white/60 text-xs font-mono flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10">
        <div>
          Africademy Kenya • Nairobi AI Engineering Hub
        </div>
        <div>
          Built for production WhatsApp & M-Pesa agents
        </div>
      </footer>
    </div>
  );
};
