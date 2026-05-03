import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  goldAccent?: boolean;
  className?: string;
  align?: 'left' | 'center';
}

/**
 * Reusable section heading component with optional gold accent and subtitle.
 */
export function SectionHeading({
  title,
  subtitle,
  goldAccent = false,
  className,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 space-y-4 md:mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      <h2
        className={cn(
          'font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.1] text-text-primary',
          goldAccent && 'gold-gradient'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto max-w-2xl text-[clamp(0.875rem,1vw,1rem)] leading-relaxed text-text-secondary">
          {subtitle}
        </p>
      )}
    </div>
  );
}
