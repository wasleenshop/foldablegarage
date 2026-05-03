'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const GALLERY_IMAGES = [
  '/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp',
  '/images/foldable-and-retractable-carport-engineering-specification-drawing-by-wasleen-pergolas.webp',
  '/images/retractable-carport-aluminium-alloy-by-wasleen-pergolas.webp',
  '/images/specification-foldable-and-retractable-garage.webp',
];

/**
 * Product page hero with image gallery, product info, and CTA.
 * Features arrow navigation + dot indicators for the gallery.
 */
export function ProductHero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative bg-bg-primary pt-24 md:pt-28">
      <div className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6 md:pb-20 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          {/* ── Image Gallery ── */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={GALLERY_IMAGES[activeIndex]}
                    alt="Wasleen Foldable Premium Garage"
                    fill
                    className="object-cover"
                    priority={activeIndex === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border-subtle bg-bg-primary/80 p-2 text-text-primary backdrop-blur-sm transition-colors hover:bg-bg-primary"
                aria-label="Previous image"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 15L6 9l6-6" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border-subtle bg-bg-primary/80 p-2 text-text-primary backdrop-blur-sm transition-colors hover:bg-bg-primary"
                aria-label="Next image"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 3l6 6-6 6" />
                </svg>
              </button>
            </div>

            {/* Dot indicators */}
            <div className="mt-4 flex justify-center gap-2">
              {GALLERY_IMAGES.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    index === activeIndex
                      ? 'w-6 bg-accent-gold'
                      : 'w-2 bg-border-subtle hover:bg-text-tertiary'
                  )}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── Product Info ── */}
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <span className="inline-flex w-fit rounded-full border border-accent-gold/20 bg-accent-gold/5 px-3 py-1 text-xs font-medium uppercase tracking-widest text-accent-gold">
              Premium Product
            </span>

            {/* Title */}
            <h1 className="mt-4 font-sans text-[clamp(1.75rem,3.5vw,3rem)] font-bold leading-[1.05] text-text-primary">
              Foldable Premium Garage
            </h1>

            {/* Price range */}
            <p className="mt-4 font-sans text-[clamp(1.25rem,2vw,1.75rem)] font-bold text-accent-gold">
              AED 28,000 – 85,000
            </p>
            <p className="mt-1 text-sm text-text-tertiary">
              Based on 6m × 4m — final price depends on size, roof type, and options
            </p>

            {/* Description */}
            <div className="mt-6 space-y-3 text-sm leading-relaxed text-text-secondary">
              <p>
                Engineered for the UAE climate, the Wasleen Foldable Premium Garage combines
                architectural-grade materials with precision German-engineered mechanics. The
                retractable system allows you to transform your driveway in seconds.
              </p>
              <ul className="space-y-2">
                {[
                  '6063-T5 aluminium alloy frame — corrosion-resistant',
                  'PVDF Kynar 500® coating — 15-year no-fade warranty',
                  'Retractable panels — manual or smart automatic operation',
                  'Polycarbonate or laminated glass roof options',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 shrink-0 text-accent-gold"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 7 6 10 11 4" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/quote">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Get Exact Quote
                  <svg className="ml-2" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </Button>
              </Link>
              <Link href="https://wa.me/971542330837" target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" className="w-full sm:w-auto">
                  <svg className="mr-2" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 1.53.43 2.96 1.18 4.17L.32 15.68l3.51-.86C5.04 15.57 6.48 16 8 16c4.42 0 8-3.58 8-8s-3.58-8-8-8zm3.87 11.41c-.15.43-.75.79-1.23.93-.34.1-.79.14-2.51-.54-2.18-.86-3.58-3.1-3.69-3.24-.12-.14-.87-1.16-.87-2.21 0-1.05.55-1.57.74-1.78.19-.21.42-.26.56-.26s.28.01.4.01c.13 0 .33-.05.53.4.2.46.68 1.59.74 1.71.06.12.1.26.02.42-.08.16-.12.23-.24.38-.12.14-.24.25-.36.4-.12.14-.24.28-.1.54.14.26.61 1.01 1.31 1.64.9.8 1.66 1.05 1.89 1.17.2.1.43.08.58-.04.14-.12.62-.72.79-.97.17-.24.34-.2.57-.12.24.08 1.46.72 1.71.85.25.13.42.19.48.3.07.11.07.64-.08 1.07z" />
                  </svg>
                  WhatsApp Us Now
                </Button>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-text-tertiary">
              <span className="flex items-center gap-1">
                <svg className="text-accent-gold" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="1" y="4" width="10" height="7" rx="1" />
                  <path d="M3 4V3a3 3 0 016 0v1" />
                </svg>
                Secure checkout
              </span>
              <span className="flex items-center gap-1">
                <svg className="text-accent-gold" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="6" cy="6" r="4" />
                  <path d="M6 3.5V6l1.5 1.5" />
                </svg>
                Free shipping
              </span>
              <span className="flex items-center gap-1">
                <svg className="text-accent-gold" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 1v10M1 6h10" />
                </svg>
                5-year warranty
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
