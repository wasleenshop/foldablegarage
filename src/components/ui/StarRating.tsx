'use client';

import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
  showValue?: boolean;
  showCount?: number;
}

const SIZE_MAP = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

/**
 * Reusable star rating component.
 * Displays filled/empty stars. When `interactive`, allows clicking to set rating.
 */
export function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  interactive = false,
  onChange,
  className,
  showValue,
  showCount,
}: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-1.5', className)} role={interactive ? 'radiogroup' : 'img'} aria-label={`${rating} out of ${maxRating} stars`}>
      {Array.from({ length: maxRating }, (_, i) => {
        const starValue = i + 1;
        const filled = starValue <= rating;
        const halfFilled = !filled && starValue - 0.5 <= rating;

        return (
          <button
            key={i}
            type={interactive ? 'button' : undefined}
            disabled={!interactive}
            onClick={() => interactive && onChange?.(starValue)}
            className={cn(
              'transition-colors',
              interactive && 'cursor-pointer hover:scale-110',
              !interactive && 'cursor-default'
            )}
            role={interactive ? 'radio' : undefined}
            aria-checked={interactive ? filled : undefined}
            aria-label={interactive ? `${starValue} star${starValue > 1 ? 's' : ''}` : undefined}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 20 20"
              fill={filled ? '#C9A84C' : halfFilled ? 'url(#half)' : '#2A2A2A'}
              className={cn(SIZE_MAP[size], 'shrink-0')}
            >
              {halfFilled && (
                <defs>
                  <linearGradient id="half">
                    <stop offset="50%" stopColor="#C9A84C" />
                    <stop offset="50%" stopColor="#2A2A2A" />
                  </linearGradient>
                </defs>
              )}
              <path d="M10 1l2.39 4.84L17.6 6.7l-3.8 3.7.9 5.24L10 13.3l-4.7 2.34.9-5.24L2.4 6.7l5.21-.86L10 1z" />
            </svg>
          </button>
        );
      })}
      {showValue && (
        <span className="text-sm font-semibold text-accent-gold">
          {rating.toFixed(1)}
        </span>
      )}
      {showCount !== undefined && (
        <span className="text-xs text-text-tertiary">
          ({showCount.toLocaleString()} reviews)
        </span>
      )}
    </div>
  );
}
