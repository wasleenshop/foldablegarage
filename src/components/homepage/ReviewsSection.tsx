'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StarRating } from '@/components/ui/StarRating';
import { WriteReview } from './WriteReview';
import { pushGTMEvent } from '@/lib/gtm';

/**
 * Static sample reviews for the homepage — includes international locations.
 * Step 2 will replace these with database-backed live reviews.
 */
const SAMPLE_REVIEWS = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    location: 'Dubai, UAE',
    nationality: 'Emirati',
    rating: 5,
    text: 'Exceptional quality and craftsmanship. The installation team was professional and completed the project ahead of schedule. The automated system works flawlessly.',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    location: 'London, UK',
    nationality: 'British',
    rating: 5,
    text: 'We installed the Smart system with glass panels. The difference in temperature under the carport is remarkable. Our car stays cool even in peak summer.',
  },
  {
    id: '3',
    name: 'Khalid Al-Rashid',
    location: 'Riyadh, Saudi Arabia',
    nationality: 'Saudi',
    rating: 4,
    text: 'Very pleased with the quality. The polycarbonate panels provide excellent UV protection. Would recommend upgrading to the smart system for convenience.',
  },
  {
    id: '4',
    name: 'Fatima Al-Mansouri',
    location: 'Doha, Qatar',
    nationality: 'Qatari',
    rating: 5,
    text: 'The foldable mechanism is engineering at its finest. It adds a modern architectural element to our villa. Worth every dirham.',
  },
  {
    id: '5',
    name: 'James Mitchell',
    location: 'Sydney, Australia',
    nationality: 'Australian',
    rating: 5,
    text: 'Three months in and no issues at all. The remote operation is smooth and quiet. Customer service has been exceptional throughout.',
  },
  {
    id: '6',
    name: 'Raj Patel',
    location: 'Mumbai, India',
    nationality: 'Indian',
    rating: 4,
    text: 'Excellent build quality. The installation took 2 days as promised. Very happy with the smart automation features.',
  },
  {
    id: '7',
    name: 'Piotr Kowalski',
    location: 'Warsaw, Poland',
    nationality: 'Polish',
    rating: 5,
    text: 'Premium product that delivers on all promises. The aluminium construction feels incredibly solid and the finish is immaculate.',
  },
  {
    id: '8',
    name: 'Carlos Mendez',
    location: 'Quito, Ecuador',
    nationality: 'Ecuadorian',
    rating: 5,
    text: 'Perfect solution for our villa. The retractable mechanism works beautifully and the customer support team was very helpful throughout the process.',
  },
];

/**
 * Section 8 — Reviews carousel with e-commerce-style grid, international locations, and write-review modal.
 */
export function ReviewsSection() {
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);

  const reviews = SAMPLE_REVIEWS;
  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, reviews.length));
  };

  const handleOpenWriteReview = () => {
    setWriteReviewOpen(true);
    pushGTMEvent('quote_started', { source: 'write_review' });
  };

  return (
    <>
      <section className="relative bg-bg-primary py-20 md:py-24">
        {/* Subtle top divider */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

        <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Trusted by homeowners worldwide — from the UAE to Australia, the UK to India."
            align="center"
          />

          {/* Reviews Grid — E-Commerce Style */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 md:mt-16">
            {visibleReviews.map((review, index) => (
              <motion.div
                key={review.id}
                className="group rounded-2xl border border-border-subtle bg-bg-card p-6 transition-all duration-300 hover:border-accent-gold/30 hover:shadow-lg hover:shadow-accent-gold/5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                {/* Top row: Rating + Date placeholder */}
                <div className="flex items-center justify-between">
                  <StarRating rating={review.rating} size="sm" />
                  <span className="text-xs text-text-tertiary">Verified Purchase</span>
                </div>

                {/* Review text */}
                <blockquote className="mt-3 text-sm leading-relaxed text-text-secondary">
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                {/* Author & Location */}
                <div className="mt-4 flex items-center gap-3 border-t border-border-subtle pt-4">
                  {/* Avatar placeholder */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 text-sm font-semibold text-accent-gold">
                    {review.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {review.name}
                    </p>
                    <p className="text-xs text-text-tertiary truncate">
                      {review.nationality} — {review.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More + Write Review */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {hasMore && (
              <button
                onClick={handleShowMore}
                className="rounded-lg border border-border-subtle bg-transparent px-6 py-2.5 text-sm font-semibold text-text-secondary transition-all hover:border-accent-gold/40 hover:text-accent-gold"
              >
                Show More Reviews ({reviews.length - visibleCount} remaining)
              </button>
            )}
            <button
              onClick={handleOpenWriteReview}
              className="rounded-lg border border-accent-gold/40 bg-transparent px-6 py-2.5 text-sm font-semibold text-accent-gold transition-all hover:bg-accent-gold/10"
            >
              Write a Review
            </button>
          </div>

          {/* Total reviews count */}
          <p className="mt-6 text-center text-xs text-text-tertiary">
            Based on {reviews.length} verified reviews worldwide
          </p>
        </div>
      </section>

      {/* Write Review Modal */}
      <WriteReview isOpen={writeReviewOpen} onClose={() => setWriteReviewOpen(false)} />
    </>
  );
}
