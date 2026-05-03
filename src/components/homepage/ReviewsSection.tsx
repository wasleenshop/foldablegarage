'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StarRating } from '@/components/ui/StarRating';
import { WriteReview } from './WriteReview';
import { pushGTMEvent } from '@/lib/gtm';

/**
 * Static sample reviews for the homepage carousel.
 * Step 2 will replace these with database-backed live reviews.
 */
const SAMPLE_REVIEWS = [
  {
    id: '1',
    name: 'Ahmed Al Maktoum',
    location: 'Dubai',
    rating: 5,
    text: 'Exceptional quality and craftsmanship. The installation team was professional and completed the project ahead of schedule. The automated system works flawlessly.',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    location: 'Abu Dhabi',
    rating: 5,
    text: 'We installed the Smart system with glass panels. The difference in temperature under the carport is remarkable. Our car stays cool even in peak summer.',
  },
  {
    id: '3',
    name: 'Khalid Al Zaabi',
    location: 'Sharjah',
    rating: 4,
    text: 'Very pleased with the quality. The polycarbonate panels provide excellent UV protection. Would recommend upgrading to the smart system for convenience.',
  },
  {
    id: '4',
    name: 'Fatima Al Hashimi',
    location: 'Dubai',
    rating: 5,
    text: 'The foldable mechanism is engineering at its finest. It adds a modern architectural element to our villa. Worth every dirham.',
  },
  {
    id: '5',
    name: 'James Mitchell',
    location: 'Ajman',
    rating: 5,
    text: 'Three months in and no issues at all. The remote operation is smooth and quiet. Customer service has been exceptional throughout.',
  },
];

/**
 * Section 8 — Reviews carousel with star ratings and write-review modal.
 */
export function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [writeReviewOpen, setWriteReviewOpen] = useState(false);

  const reviews = SAMPLE_REVIEWS;
  const current = reviews[currentIndex];

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handleOpenWriteReview = () => {
    setWriteReviewOpen(true);
    pushGTMEvent('quote_started', { source: 'write_review' });
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <>
      <section className="relative bg-bg-primary py-20 md:py-24">
        {/* Subtle top divider */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

        <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
          <SectionHeading
            title="What Our Clients Say"
            subtitle="Trusted by villa owners across the UAE for quality, durability, and exceptional service."
            align="center"
          />

          <div className="relative mx-auto mt-12 max-w-[700px] md:mt-16">
            {/* Carousel */}
            <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-border-subtle bg-bg-card p-8 md:p-12">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={current.id}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="flex flex-col items-center text-center"
                >
                  {/* Star rating */}
                  <StarRating rating={current.rating} size="md" />

                  {/* Review text */}
                  <blockquote className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
                    &ldquo;{current.text}&rdquo;
                  </blockquote>

                  {/* Author */}
                  <div className="mt-6">
                    <p className="font-medium text-text-primary">{current.name}</p>
                    <p className="text-sm text-text-tertiary">{current.location}</p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-bg-card text-text-tertiary transition-colors hover:border-accent-gold/40 hover:text-accent-gold"
                onClick={handlePrev}
                aria-label="Previous review"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="10 12 6 8 10 4" />
                </svg>
              </button>
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle bg-bg-card text-text-tertiary transition-colors hover:border-accent-gold/40 hover:text-accent-gold"
                onClick={handleNext}
                aria-label="Next review"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 4 10 8 6 12" />
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-6 bg-accent-gold'
                      : 'w-2 bg-border-subtle hover:bg-text-tertiary'
                  }`}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            {/* Write a review CTA */}
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <button
                onClick={handleOpenWriteReview}
                className="rounded-lg border border-accent-gold/40 bg-transparent px-6 py-2.5 text-sm font-semibold text-accent-gold transition-all hover:bg-accent-gold/10"
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Write Review Modal */}
      <WriteReview isOpen={writeReviewOpen} onClose={() => setWriteReviewOpen(false)} />
    </>
  );
}
