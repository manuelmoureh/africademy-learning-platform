import React from 'react';
import { StaticPage } from './StaticPage';

export const AboutPage: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <StaticPage title="About Africademy" onBack={onBack}>
    <p>
      Africademy trains young Kenyans to build real AI automation systems, WhatsApp agents, lead-capture tools,
      invoicing assistants, for real small businesses. Not practice exercises, not a certificate at the end.
    </p>
    <p>
      The problem we set out to fix: a resume lists skills you claim, not skills you've demonstrated. Africademy
      replaces that with a verified portfolio, a real, live system you built, checked against an objective rubric,
      confirmed by the business actually using it. That's the credential. One link, not a claim.
    </p>
    <h2>Why Kenya first</h2>
    <p>
      Over a million young Kenyans enter the labor market every year against roughly 600,000 formal jobs added.
      Meanwhile, most Kenyan SMEs have already bought into AI and can't get it to actually work for them. We train
      people to close that gap directly, real capacity for real businesses, not more competition for scarce jobs
      that already exist somewhere else.
    </p>
    <h2>How verification works</h2>
    <p>
      Every submission needs a live, working link, a demo recording, and a real business contact who can confirm
      it's genuinely in use, not just a description of what it does. Each project is scored against a written
      rubric specific to its track before it's published as verified.
    </p>
  </StaticPage>
);
