import { StarRating } from '@/components/ui/StarRating';

interface ReviewCardProps {
  name: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified?: boolean;
  productVariant?: string;
  colour?: string;
  helpful?: number;
  className?: string;
}

/**
 * Single review display card.
 * Used in product page review list and homepage reviews section.
 */
export function ReviewCard({
  name,
  location,
  rating,
  title,
  content,
  date,
  verified = false,
  productVariant,
  colour,
  helpful = 0,
  className = '',
}: ReviewCardProps) {
  return (
    <article
      className={`rounded-2xl border border-border-subtle bg-bg-card p-6 transition-all duration-300 hover:border-accent-gold/30 hover:shadow-lg hover:shadow-accent-gold/5 ${className}`}
    >
      {/* Header: Stars + Date */}
      <div className="flex items-center justify-between">
        <StarRating rating={rating} size="sm" />
        <span className="text-xs text-text-tertiary">{date}</span>
      </div>

      {/* Title */}
      <h4 className="mt-3 font-sans text-base font-semibold text-text-primary">
        {title}
      </h4>

      {/* Content */}
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">
        &ldquo;{content}&rdquo;
      </p>

      {/* Product info tags */}
      {(productVariant || colour) && (
        <div className="mt-3 flex flex-wrap gap-2">
          {productVariant && (
            <span className="inline-block rounded-full border border-border-subtle px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-text-tertiary">
              {productVariant}
            </span>
          )}
          {colour && (
            <span className="inline-block rounded-full border border-border-subtle px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-text-tertiary">
              {colour}
            </span>
          )}
        </div>
      )}

      {/* Footer: Author + Verified + Helpful */}
      <div className="mt-4 flex items-center justify-between border-t border-border-subtle pt-4">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 text-sm font-semibold text-accent-gold">
            {name.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">{name}</p>
            <p className="text-xs text-text-tertiary">{location}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {verified && (
            <span className="flex items-center gap-1 text-xs text-success">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
                <path d="M4 6L5.5 7.5L8 4.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Verified
            </span>
          )}
          {helpful > 0 && (
            <span className="text-xs text-text-tertiary">
              {helpful} found helpful
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
