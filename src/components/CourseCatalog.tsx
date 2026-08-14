import React from 'react';
import { ArrowRight, CheckCircle2, Users, TrendingUp, Star, BookOpen, Clock } from 'lucide-react';
import { Track } from '../types';
import { TrackIcon } from '../utils/trackIcons';

function estimateHours(track: Track): string {
  const totalMinutes = track.steps.reduce((sum, s) => sum + (parseInt(s.duration, 10) || 0), 0);
  if (totalMinutes === 0) return `~${Math.max(track.totalSteps, 1) * 30} min`;
  const hours = totalMinutes / 60;
  return hours < 1 ? `${totalMinutes} min` : `~${hours.toFixed(hours % 1 === 0 ? 0 : 1)} hrs`;
}

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
            className="text-left rounded-2xl border border-[#12102A]/10 bg-white flex flex-col overflow-hidden hover:border-[#F5A623] hover:shadow-md transition-all active:scale-[0.98] cursor-pointer group"
          >
            {/* Thumbnail: real image if provided (/course-thumbs/{id}.jpg), otherwise a colored icon tile */}
            <div className="relative h-36 bg-gradient-to-br from-[#12102A] to-[#3f3a6b] flex items-center justify-center overflow-hidden">
              <img
                src={`/course-thumbs/${track.id}.jpg`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <TrackIcon name={track.icon} className="w-10 h-10 text-white/80 relative z-10 group-hover:scale-110 transition-transform" />
            </div>

            <div className="p-5 flex flex-col flex-1">
              {/* Icon-based content stats, replacing the plain text pill */}
              <div className="flex items-center gap-3 mb-2">
                <span className="flex items-center gap-1 text-[10px] font-bold text-[#12102A]/60">
                  <BookOpen className="w-3.5 h-3.5" />
                  {track.steps.length || track.totalSteps} lessons
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-[#12102A]/60">
                  <Clock className="w-3.5 h-3.5" />
                  {estimateHours(track)}
                </span>
              </div>

              <span className="text-[10px] font-mono font-bold text-[#F5A623] uppercase tracking-wider block mb-1">
                {track.trackNumber}
              </span>

              <h3 className="font-bold text-lg text-[#12102A] group-hover:text-[#F5A623] transition-colors">
                {track.title}
              </h3>

              <p className="text-xs text-[#12102A]/70 mt-2 leading-relaxed font-medium line-clamp-2">
                {track.description}
              </p>

              {/* Who buys this + impact stat, replacing plain spec pills */}
              <div className="mt-3 space-y-1.5">
                <div className="flex items-start gap-1.5 text-[11px] text-[#12102A]/70 font-semibold">
                  <Users className="w-3.5 h-3.5 text-[#12102A]/40 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">Sells to: {track.whoBuysThis}</span>
                </div>
                <div className="flex items-start gap-1.5 text-[11px] text-[#12102A]/80 font-bold">
                  <TrendingUp className="w-3.5 h-3.5 text-[#F5A623] shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{track.impactStat}</span>
                </div>
              </div>

              {/* Honest rating placeholder, not a fabricated number */}
              <div className="flex items-center gap-1 mt-3 text-[11px] text-[#12102A]/40 font-semibold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-[#12102A]/15" />
                ))}
                <span className="ml-1">Not yet rated</span>
              </div>

              <div className="mt-auto pt-4 border-t border-[#12102A]/10 flex items-center justify-between">
                <span className="text-xs font-bold text-[#10B981] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  First 5 lessons free
                </span>
                <span className="text-xs font-bold text-[#12102A] flex items-center gap-1">
                  View Course <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
