import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, CheckCircle2, BookOpen, ChevronRight } from 'lucide-react';
import { Track } from '../types';
import { TrackIcon } from '../utils/trackIcons';

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

// Business-function grouping for the field filter. Not a data-model field since it's a
// higher-level bucket over the 10 specific track categories (e.g. "Conversational Commerce"
// and "Lead Generation" both roll up to "Sales").
const FIELD_BY_TRACK_ID: Record<string, string> = {
  'whatsapp-retail-agent': 'Sales',
  'lead-capture-bot': 'Sales',
  'food-ordering-agent': 'Sales',
  'invoicing-assistant': 'Finance',
  'inventory-restock-agent': 'Finance',
  'payment-collections-agent': 'Finance',
  'support-ticketing-agent': 'Support',
  'booking-scheduler-agent': 'Support',
  'hr-screening-agent': 'Support',
  'social-content-agent': 'Marketing',
};

const FIELDS = ['All', 'Sales', 'Finance', 'Support', 'Marketing'];

interface CourseCatalogProps {
  tracks: Track[];
  searchQuery?: string;
  onSelectCourse: (trackId: string) => void;
  onGoHome: () => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ tracks, searchQuery = '', onSelectCourse, onGoHome }) => {
  const reduce = useReducedMotion();
  const [activeField, setActiveField] = useState('All');
  const q = searchQuery.trim().toLowerCase();

  const visibleTracks = tracks.filter((t) => {
    const matchesField = activeField === 'All' || FIELD_BY_TRACK_ID[t.id] === activeField;
    const matchesSearch = !q ||
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some((tag) => tag.toLowerCase().includes(q));
    return matchesField && matchesSearch;
  });

  return (
    <section className="p-6 md:p-10 max-w-7xl mx-auto w-full space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs font-semibold text-[#12102A]/50">
        <button onClick={onGoHome} className="hover:text-[#12102A] transition-colors cursor-pointer">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#12102A]">Systems</span>
      </nav>

      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#12102A] tracking-tight">
          Pick What You Want to Build
        </h1>
        <p className="text-sm text-[#12102A]/70 mt-2 max-w-xl font-medium">
          Build it once, then install it for any business that needs it.
        </p>
      </div>

      {/* Field filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
        {FIELDS.map((field) => (
          <button
            key={field}
            type="button"
            onClick={() => setActiveField(field)}
            className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
              activeField === field
                ? 'bg-[#12102A] border-[#12102A] text-white'
                : 'bg-white border-[#12102A]/10 text-[#12102A]/70 hover:border-[#F5A623]'
            }`}
          >
            {field}
          </button>
        ))}
      </div>

      <p className="text-xs font-semibold text-[#12102A]/50">
        Showing {visibleTracks.length} of {tracks.length} systems
      </p>

      {visibleTracks.length === 0 && (
        <div className="p-8 rounded-2xl border border-dashed border-[#12102A]/20 text-center">
          <p className="text-sm font-bold text-[#12102A]">No systems match{searchQuery ? ` "${searchQuery}"` : ' this filter'}</p>
          <p className="text-xs text-[#12102A]/60 mt-1">Try a different field, or clear your search.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleTracks.map((track, i) => (
          <motion.button
            key={track.id}
            onClick={() => onSelectCourse(track.id)}
            initial={reduce ? false : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
            transition={{ duration: 0.4, delay: Math.min(i, 5) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={reduce ? undefined : { y: -4 }}
            whileTap={reduce ? undefined : { scale: 0.98 }}
            className="text-left rounded-2xl border border-[#12102A]/10 bg-white flex flex-col overflow-hidden hover:border-[#F5A623] hover:shadow-lg transition-colors cursor-pointer group"
          >
            {/* Thumbnail: real image if provided (/course-thumbs/{id}.jpg), otherwise a colored icon tile */}
            <div className="relative h-36 bg-[#12102A] flex items-center justify-center overflow-hidden">
              <img
                src={`/course-thumbs/${track.id}.jpg`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
              <TrackIcon name={track.icon} className="w-10 h-10 text-white/80 relative z-10 group-hover:scale-110 transition-transform" />
              <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-[#12102A]">
                {FIELD_BY_TRACK_ID[track.id]}
              </span>
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-bold text-lg text-[#12102A] group-hover:text-[#F5A623] transition-colors">
                {track.title}
              </h3>

              <p className="text-xs text-[#12102A]/70 mt-2 leading-relaxed font-medium line-clamp-1">
                {track.description}
              </p>

              <span className="flex items-center gap-1 text-[10px] font-bold text-[#12102A]/60 mt-3">
                <BookOpen className="w-3.5 h-3.5" />
                {track.steps.length || track.totalSteps} lessons
              </span>

              <div className="mt-4 pt-4 border-t border-[#12102A]/10 flex items-center justify-between">
                <span className="text-xs font-bold text-[#10B981] flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  First 5 free
                </span>
                <span className="text-xs font-bold text-[#12102A] flex items-center gap-1">
                  View System <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
};
