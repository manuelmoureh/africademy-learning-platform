import React from 'react';
import { Star } from 'lucide-react';

// Displays a placeholder rating today (courses.ts) - real submissions come from
// track_ratings via lib/db.ts, not yet aggregated into what's shown here.
interface StarRatingProps {
  rating: number;
  reviewCount: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, reviewCount, className = '' }) => (
  <div className={`flex items-center gap-1.5 ${className}`}>
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`w-3 h-3 ${i <= Math.round(rating) ? 'fill-[#F5A623] text-[#F5A623]' : 'fill-[#12102A]/10 text-[#12102A]/10'}`}
        />
      ))}
    </div>
    <span className="text-[10px] font-bold text-[#12102A]/60">
      {rating.toFixed(1)} ({reviewCount})
    </span>
  </div>
);
