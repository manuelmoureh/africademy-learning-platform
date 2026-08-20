import React from 'react';
import { StaticPage } from './StaticPage';

export const TermsOfServicePage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <StaticPage title="Terms of Service" onBack={onBack}>
    <p className="text-xs text-[#12102A]/50 italic">
      Last updated August 2026. We've written this ourselves to be complete and accurate about what the platform
      actually does today - it hasn't been through a formal legal review, so treat it as our honest word rather
      than a lawyer-certified document.
    </p>
    <h2>The service</h2>
    <p>
      Afridemy provides AI Systems Builder training, a live agent sandbox, and a verification process that turns
      completed projects into a public, verified portfolio page.
    </p>
    <h2>Accounts</h2>
    <p>
      You need an account to track progress and submit work for verification. You're responsible for keeping your
      login details secure and for whatever happens under your account. Give us accurate information when you sign
      up, one person, one account.
    </p>
    <h2>Your work stays yours</h2>
    <p>
      You own the AI systems and code you build on Afridemy. We only publish a project to your public portfolio
      with your explicit consent, and you can ask us to take it down at any time.
    </p>
    <h2>Purchases and refunds</h2>
    <p>
      Most systems are a one-time payment that unlocks the remaining lessons for that system permanently - the
      first few lessons of every system are free, so you can try it before paying. Afridemy Pro, where offered, is
      billed monthly and you can cancel anytime; cancellation stops future billing but doesn't retroactively refund
      the current period unless required by law. If something's genuinely broken on our end, either kind of
      purchase, contact us and we'll sort it out directly rather than hide behind a policy.
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
    <h2>Systems you build for real businesses</h2>
    <p>
      The systems you build in these courses are designed to be installed for real businesses, sometimes handling
      real customer data or real payments. That responsibility sits with you and the business you're building for,
      not with Afridemy - we teach the skill and verify the outcome, we don't operate, monitor, or take liability
      for systems you deploy after the course.
    </p>
    <h2>Termination</h2>
    <p>
      We can suspend or close an account that violates these terms, most commonly for faking verification evidence
      or abusing the live agent sandbox. We'll tell you why if we do.
    </p>
    <h2>Changes to these terms</h2>
    <p>
      If we change these terms in a way that meaningfully affects you, we'll update the date at the top of this
      page and, for significant changes, let you know directly.
    </p>
    <h2>Contact us</h2>
    <p>
      Questions about these terms, a purchase, or anything else? Email{' '}
      <a href="mailto:hello@afridemy.online" className="underline hover:text-[#12102A]">hello@afridemy.online</a>.
    </p>
  </StaticPage>
);
