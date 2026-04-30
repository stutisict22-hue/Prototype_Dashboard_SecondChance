import { Star, Lock } from 'lucide-react';
import { Badge } from '../../data/types';

interface BadgeReelProps {
  badges: Badge[];
}

export default function BadgeReel({ badges }: BadgeReelProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
      {badges.map((badge) => (
        <div
          key={badge.id}
          title={badge.description}
          className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium ${
            badge.earned
              ? 'bg-emerald-100 text-emerald-800'
              : 'bg-slate-100 text-slate-400'
          }`}
        >
          {badge.earned ? (
            <Star size={14} className="text-emerald-500 fill-emerald-500" />
          ) : (
            <Lock size={14} className="text-slate-400" />
          )}
          <span>{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
