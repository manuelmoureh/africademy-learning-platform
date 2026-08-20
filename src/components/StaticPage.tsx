import React from 'react';
import { Home } from 'lucide-react';
import { useDocumentMeta } from '../lib/useDocumentMeta';

interface StaticPageProps {
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}

export const StaticPage: React.FC<StaticPageProps> = ({ title, onBack, children }) => {
  useDocumentMeta(title, `Afridemy's ${title.toLowerCase()}.`);
  return (
    <div className="min-h-screen bg-[#F0EEF6] text-[#12102A]">
      <nav className="flex items-center gap-4 px-6 lg:px-12 h-20 bg-white/80 backdrop-blur-md border-b border-[#12102A]/10 sticky top-0 z-30">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-bold text-[#12102A]/70 hover:text-[#12102A] cursor-pointer transition-all active:scale-[0.97]"
        >
          <Home className="w-4 h-4" />
          Home
        </button>
        <div className="w-px h-5 bg-[#12102A]/10" />
        <img src="/logo-dark.png" alt="Afridemy" className="h-14 w-auto" />
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl md:text-4xl font-black text-[#12102A] mb-8 tracking-tight">{title}</h1>
        <div className="space-y-6 text-sm text-[#12102A]/80 leading-relaxed font-medium [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-[#12102A] [&_h2]:mt-8 [&_h2]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5">
          {children}
        </div>
      </div>
    </div>
  );
};
