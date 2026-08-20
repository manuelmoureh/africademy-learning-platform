import { useEffect } from 'react';

const DEFAULT_TITLE = 'Afridemy - Verified AI Automation Engineering';
const DEFAULT_DESCRIPTION = 'Build production WhatsApp AI agents, Kenyan M-Pesa pipelines, and real retail automation with verified developer portfolios.';

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

// This is a client-only SPA (see vercel.json's catch-all rewrite), so this only reaches
// crawlers that execute JS (modern Googlebot). Non-JS social-preview bots will still see
// the static defaults baked into index.html - there's no SSR here to serve them a
// per-route snapshot.
export function useDocumentMeta(title: string, description: string = DEFAULT_DESCRIPTION) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Afridemy` : DEFAULT_TITLE;
    document.title = fullTitle;
    setMeta('description', description);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);

    return () => {
      document.title = DEFAULT_TITLE;
      setMeta('description', DEFAULT_DESCRIPTION);
      setMeta('og:title', DEFAULT_TITLE, 'property');
      setMeta('og:description', DEFAULT_DESCRIPTION, 'property');
      setMeta('twitter:title', DEFAULT_TITLE);
      setMeta('twitter:description', DEFAULT_DESCRIPTION);
    };
  }, [title, description]);
}
