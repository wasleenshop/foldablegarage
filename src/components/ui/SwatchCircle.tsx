'use client';

import { cn } from '@/lib/utils';

interface SwatchCircleProps {
  colour: string;       // hex colour
  name: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Single colour swatch circle.
 * Used in colour selector components throughout the site.
 */
export function SwatchCircle({
  colour,
  name,
  selected = false,
  onClick,
  className,
}: SwatchCircleProps) {
  const isDark =
    parseInt(colour.replace('#', ''), 16) < 0x666666;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative flex flex-col items-center gap-1.5',
        className
      )}
      aria-label={`Select ${name} colour`}
      aria-pressed={selected}
    >
      <div
        className={cn(
          'h-10 w-10 rounded-full transition-all duration-200',
          'ring-2 ring-offset-2 ring-offset-bg-primary',
          selected
            ? 'ring-accent-gold scale-110'
            : 'ring-transparent hover:ring-border-subtle',
          'cursor-pointer'
        )}
        style={{ backgroundColor: colour }}
      >
        {/* Checkmark for selected */}
        {selected && (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke={isDark ? '#fff' : '#000'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 7.5L5.5 10L11 4.5" />
            </svg>
          </div>
        )}
      </div>
      <span
        className={cn(
          'text-[10px] leading-tight transition-colors',
          selected ? 'text-accent-gold font-medium' : 'text-text-tertiary'
        )}
      >
        {name}
      </span>
    </button>
  );
}
