import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Track } from '../types';

interface CourseCatalogProps {
  tracks: Track[];
  searchQuery?: string;
  onSelectCourse: (trackId: string) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ tracks, searchQuery = '', onSelectCourse }) => {
  const q = searchQuery.trim().toLowerCase();
  const visibleTracks = q
    ? tracks.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      )
    : tracks;

  return (
    <section className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-8">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#12102A] tracking-tight">
          Pick What You Want to Build
        </h1>
        <p className="text-sm text-[#12102A]/70 mt-2 max-w-xl font-medium">
          Every course ends with a real, working system for a real business, checked and confirmed by the person using it.
        </p>
      </div>

      {visibleTracks.length === 0 && (
        <div className="p-8 rounded-2xl border border-dashed border-[#12102A]/20 text-center">
          <p className="text-sm font-bold text-[#12102A]">No courses match "{searchQuery}"</p>
          <p className="text-xs text-[#12102A]/60 mt-1">Try WhatsApp, leads, invoicing, or support.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleTracks.map((track) => (
          <button
            key={track.id}
            onClick={() => onSelectCourse(track.id)}
            className="text-left p-6 rounded-2xl border border-[#12102A]/10 bg-white flex flex-col justify-between hover:border-[#F5A623] transition-all active:scale-[0.98] cursor-pointer group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold text-[#F5A623] uppercase tracking-wider">
                  {track.trackNumber}
                </span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#12102A] text-white">
                  {track.steps.length || 8} lessons
                </span>
              </div>

              <h3 className="font-bold text-lg text-[#12102A] group-hover:text-[#F5A623] transition-colors">
                {track.title}
              </h3>

              <p className="text-xs text-[#12102A]/70 mt-2 leading-relaxed font-medium">
                {track.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#12102A]/10 flex items-center justify-between">
              <span className="text-xs font-bold text-[#10B981] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                First 5 lessons free
              </span>
              <span className="text-xs font-bold text-[#12102A] flex items-center gap-1">
                View Course <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
