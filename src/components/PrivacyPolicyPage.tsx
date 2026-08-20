import React from 'react';
import { StaticPage } from './StaticPage';

export const PrivacyPolicyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <StaticPage title="Privacy Policy" onBack={onBack}>
    <p className="text-xs text-[#12102A]/50 italic">
      Last updated August 2026. We've written this ourselves to be complete and accurate about what the platform
      actually does today - it hasn't been through a formal legal review, so treat it as our honest word rather
      than a lawyer-certified document.
    </p>
    <h2>What we collect</h2>
    <ul>
      <li>Your name and email when you create an account, and your password (handled securely by our authentication provider, Supabase - we never see or store it in plain text)</li>
      <li>Your progress through lessons, which tracks you've enrolled in or unlocked, and any ratings you leave on a system</li>
      <li>The details of any project you submit for verification: a live link, a demo recording, and the name of the business you built it for</li>
      <li>Your email if you sign up for launch notifications, even if you don't create a full account</li>
      <li>Basic usage data (which pages you visit, general device/browser info) via Google Analytics</li>
    </ul>
    <h2>Why we collect it</h2>
    <ul>
      <li>To create and run your account, and remember your progress between visits</li>
      <li>To verify submitted work against the published rubric</li>
      <li>To generate your public verified-portfolio page, only with your consent</li>
      <li>To process payment when you unlock a system, handled by our payment processor, not stored by us directly</li>
      <li>To understand which pages and systems people actually use, so we know what to build next</li>
    </ul>
    <h2>Who we share it with</h2>
    <p>
      We don't sell your data to anyone. A short list of services we rely on to run the platform, and what each one
      sees:
    </p>
    <ul>
      <li><b>Supabase</b> - hosts your account, password, progress, and submitted project data</li>
      <li><b>Google Analytics</b> - receives anonymized usage data (pages visited, general device info), not your name, email, or lesson content</li>
      <li><b>Google's Gemini API</b> - receives whatever you type into the live agent sandbox, to generate a response (see below)</li>
      <li><b>Our payment processor</b> - receives payment details directly when you unlock a system; we never see or store your card or M-Pesa PIN</li>
      <li><b>Vercel</b> - hosts the site itself and processes standard web request logs</li>
    </ul>
    <h2>AI processing</h2>
    <p>
      The live agent sandbox sends your test messages to Google's Gemini API to generate responses. That's a
      cross-border data transfer, your input leaves Kenya to be processed. Don't paste real customer or business
      data into the sandbox for testing.
    </p>
    <h2>How long we keep it</h2>
    <p>
      We keep your account and progress data for as long as your account is active. If you delete your account, we
      remove your personal data within 30 days, except where we're required to keep records longer (for example,
      payment records for tax purposes) or where a verified portfolio page you consented to publish needs to stay
      up for other people to view.
    </p>
    <h2>Your rights</h2>
    <p>
      You can ask to see, correct, or delete the personal data we hold on you at any time by emailing us (see
      below). A verified portfolio page is only published with your explicit consent, and you can request it be
      taken down whenever you like.
    </p>
    <h2>What we don't do</h2>
    <p>We don't sell your personal data to third parties, and we don't use it to train AI models.</p>
    <h2>Changes to this policy</h2>
    <p>
      If this policy changes in a way that affects how your data is handled, we'll update the date at the top of
      this page and, for significant changes, let you know directly.
    </p>
    <h2>Contact us</h2>
    <p>
      Questions about this policy, or want to access, correct, or delete your data? Email{' '}
      <a href="mailto:hello@afridemy.online" className="underline hover:text-[#12102A]">hello@afridemy.online</a>.
    </p>
  </StaticPage>
);
