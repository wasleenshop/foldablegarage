'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarRating } from '@/components/ui/StarRating';
import { ReviewCard } from '@/components/ui/ReviewCard';
import { Button } from '@/components/ui/Button';
import { WriteReview } from '@/components/homepage/WriteReview';
import { SEED_REVIEWS } from '@/data/reviews-seed';
import { cn } from '@/lib/utils';
import type { Review } from '@/lib/types';

type SortOption = 'most-recent' | 'highest-rated' | 'lowest-rated' | 'most-helpful';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'most-recent', label: 'Most Recent' },
  { value: 'highest-rated', label: 'Highest Rated' },
  { value: 'lowest-rated', label: 'Lowest Rated' },
  { value: 'most-helpful', label: 'Most Helpful' },
];

const REVIEWS_PER_PAGE = 5;

// Aggregate rating stats
const TOTAL_REVIEWS = SEED_REVIEWS.length;
const AVERAGE_RATING =
  SEED_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / TOTAL_REVIEWS;

const RATING_DISTRIBUTION = [5, 4, 3, 2, 1].map((star) => {
  const count = SEED_REVIEWS.filter((r) => Math.round(r.rating) === star).length;
  return { star, count, percentage: (count / TOTAL_REVIEWS) * 100 };
});

/**
 * Full-featured review browser for the product page.
 * Includes aggregate stats, rating distribution bars, sort/filter, pagination.
 */
export function ProductReviews() {
  const [sort, setSort] = useState<SortOption>('most-recent');
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);

  // Sort and filter reviews
  const filtered = useMemo(() => {
    let result = [...SEED_REVIEWS];

    // Filter by rating
    if (filterRating !== null) {
      result = result.filter((r) => Math.round(r.rating) === filterRating);
    }

    // Sort
    switch (sort) {
      case 'most-recent':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'highest-rated':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest-rated':
        result.sort((a, b) => a.rating - b.rating);
        break;
      case 'most-helpful':
        result.sort((a, b) => b.helpful - a.helpful);
        break;
    }

    return result;
  }, [sort, filterRating]);

  const totalPages = Math.ceil(filtered.length / REVIEWS_PER_PAGE);
  const paged = filtered.slice((page - 1) * REVIEWS_PER_PAGE, page * REVIEWS_PER_PAGE);

  // Reset page when filters change
  const handleFilterChange = (rating: number | null) => {
    setFilterRating(rating);
    setPage(1);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSort(newSort);
    setPage(1);
  };

  return (
    <>
      <section className="relative bg-bg-secondary py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
          {/* ── Summary Header ── */}
          <div className="rounded-2xl border border-border-subtle bg-bg-card p-6 md:p-8">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="flex items-center gap-3">
                  <StarRating rating={AVERAGE_RATING} size="lg" showValue />
                  <span className="font-sans text-2xl font-bold text-text-primary">
                    {AVERAGE_RATING.toFixed(1)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-text-tertiary">
                  {TOTAL_REVIEWS.toLocaleString()} verified reviews
                </p>
              </div>
              <Button variant="outline" onClick={() => setWriteReviewOpen(true)}>
                ✍ Write a Review
              </Button>
            </div>

            {/* ── Rating Distribution Bars ── */}
            <div className="mt-8 space-y-2">
              {RATING_DISTRIBUTION.map(({ star, count, percentage }) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="w-8 text-right text-sm text-text-secondary">
                    {star}★
                  </span>
                  <div className="relative h-3 flex-1 overflow-hidden rounded-full bg-border-subtle">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-accent-gold to-accent-gold-hover"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                  <span className="w-20 text-right text-xs text-text-tertiary">
                    {count} ({percentage.toFixed(0)}%)
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Sort & Filter Controls ── */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            {/* Sort */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-text-tertiary">Sort by:</span>
              <div className="flex flex-wrap gap-1">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleSortChange(opt.value)}
                    className={cn(
                      'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                      sort === opt.value
                        ? 'bg-accent-gold text-bg-primary'
                        : 'bg-bg-card text-text-secondary hover:text-text-primary'
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by rating */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm text-text-tertiary">Rating:</span>
              {[
                { label: 'All', value: null },
                { label: '5★', value: 5 },
                { label: '4★', value: 4 },
                { label: '3★', value: 3 },
                { label: '2★', value: 2 },
                { label: '1★', value: 1 },
              ].map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleFilterChange(opt.value)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-medium transition-all',
                    filterRating === opt.value
                      ? 'bg-accent-gold text-bg-primary'
                      : 'bg-bg-card text-text-secondary hover:text-text-primary'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Review List ── */}
          <div className="mt-6 space-y-4">
            <AnimatePresence mode="wait">
              {paged.length > 0 ? (
                <motion.div
                  key={`${sort}-${filterRating}-${page}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {paged.map((review: Review) => (
                    <ReviewCard
                      key={review.id}
                      name={review.name}
                      location={review.location}
                      rating={review.rating}
                      title={review.title}
                      content={review.content}
                      date={review.date}
                      verified={review.verified}
                      productVariant={review.productVariant}
                      colour={review.colour}
                      helpful={review.helpful}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center rounded-2xl border border-border-subtle bg-bg-card p-12 text-center"
                >
                  <p className="text-lg font-semibold text-text-primary">
                    No reviews match this filter
                  </p>
                  <p className="mt-2 text-sm text-text-tertiary">
                    Try a different filter or be the first to write a review
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setWriteReviewOpen(true)}
                  >
                    Write a Review
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className={cn(
                  'flex items-center gap-1 rounded-lg border border-border-subtle px-3 py-2 text-sm transition-all',
                  page <= 1
                    ? 'cursor-not-allowed text-text-tertiary'
                    : 'text-text-secondary hover:border-accent-gold/30 hover:text-text-primary'
                )}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11L5 7l4-4" />
                </svg>
                Prev
              </button>

              <span className="text-sm text-text-tertiary">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className={cn(
                  'flex items-center gap-1 rounded-lg border border-border-subtle px-3 py-2 text-sm transition-all',
                  page >= totalPages
                    ? 'cursor-not-allowed text-text-tertiary'
                    : 'text-text-secondary hover:border-accent-gold/30 hover:text-text-primary'
                )}
              >
                Next
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 3l4 4-4 4" />
                </svg>
              </button>
            </div>
          )}

          {/* ── Bottom CTA ── */}
          <div className="mt-8 text-center">
            <Button variant="primary" onClick={() => setWriteReviewOpen(true)}>
              ✍ Write a Review
            </Button>
          </div>
        </div>
      </section>

      {/* Write Review Modal */}
      <WriteReview isOpen={writeReviewOpen} onClose={() => setWriteReviewOpen(false)} />
    </>
  );
}
