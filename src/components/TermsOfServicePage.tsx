import React from 'react';
import { StaticPage } from './StaticPage';

export const TermsOfServicePage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <StaticPage title="Terms of Service" onBack={onBack}>
    <p className="text-xs text-[#12102A]/50 italic">
      Draft, last updated August 2026. This is an early-stage product notice, not a substitute for formal legal
      review before real payments go live.
    </p>
    <h2>The service</h2>
    <p>
      Afridemy provides AI Systems Builder courses, a live agent sandbox, and a verification process that turns
      completed projects into a public, verified portfolio page.
    </p>
    <h2>Your work stays yours</h2>
    <p>
      You own the AI systems and code you build on Afridemy. We only publish a project to your public portfolio
      with your explicit consent, and you can ask us to take it down at any time.
    </p>
    <h2>Subscriptions and refunds</h2>
    <p>
      Afridemy Pro is billed monthly. You can cancel anytime, and cancellation stops future billing but doesn't
      retroactively refund the current period unless required by law. If something's genuinely broken on our end,
      contact us, we'll sort it out directly rather than hide behind a policy.
    </p>
    <h2>Acceptable use</h2>
    <p>
      Don't use the platform, or the live agent sandbox, to test real customer or business data you don't have
      permission to use. Don't attempt to fake or misrepresent evidence submitted for verification, this is exactly
      the kind of gaming the verification process is built to catch and refuse.
    </p>
    <h2>No guarantee of income</h2>
    <p>
      Afridemy trains real, market-relevant skills and helps you prove them, but we can't guarantee you'll land
      paying clients or a specific income. What we guarantee is that a verified project on your portfolio is real,
      checked, and confirmed by the business that used it.
    </p>
  </StaticPage>
);
