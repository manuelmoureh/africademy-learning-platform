// Manual page-view tracking for GA4 (gtag.js, loaded in index.html with
// send_page_view: false). Needed because this is a client-routed SPA - GA's
// automatic pageview only fires once, on the very first document load, and
// would never see any route change made via react-router.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackPageView(path: string): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', 'page_view', {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}
