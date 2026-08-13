import React from 'react';
import { StaticPage } from './StaticPage';

export const PrivacyPolicyPage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <StaticPage title="Privacy Policy" onBack={onBack}>
    <p className="text-xs text-[#12102A]/50 italic">
      Draft, last updated August 2026. This is an early-stage product notice, not a substitute for formal legal
      review before real user data or payments go live.
    </p>
    <h2>What we collect</h2>
    <p>
      Your name and email when you sign up. The details of any project you submit for verification, including a
      live link, a demo recording, and the name of the business you built it for. Basic usage information needed
      to run the platform.
    </p>
    <h2>Why we collect it</h2>
    <ul>
      <li>To create and run your account</li>
      <li>To verify submitted work against the published rubric</li>
      <li>To generate your public verified-portfolio page, only with your consent</li>
      <li>To process payment for the Pro plan, handled by our payment processor, not stored by us directly</li>
    </ul>
    <h2>AI processing</h2>
    <p>
      The live agent sandbox sends your test messages to Google's Gemini API to generate responses. That's a
      cross-border data transfer, your input leaves Kenya to be processed. Don't paste real customer or business
      data into the sandbox for testing.
    </p>
    <h2>Your rights</h2>
    <p>
      You can ask to see, correct, or delete the personal data we hold on you at any time. A verified portfolio
      page is only published with your explicit consent, and you can request it be taken down.
    </p>
    <h2>What we don't do</h2>
    <p>We don't sell your personal data to third parties.</p>
  </StaticPage>
);
