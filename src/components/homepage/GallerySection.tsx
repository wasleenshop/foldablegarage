'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Gallery images — placeholder references.
 * Replace with actual SEO-named files from public/images/.
 */
const GALLERY_IMAGES = [
  {
    src: '/images/foldable-and-retractable-carport-engineering-specification-drawing-by-wasleen-pergolas.jpg',
    alt: 'Wasleen Foldable Garage engineering specification drawing showing dimensions and retraction mechanism',
    caption: 'Engineering Precision',
  },
  {
    src: '/images/foldable-carport-color-selection-guide-by-wasleen-pergolas.jpg',
    alt: 'Wasleen carport colour selection guide with five colour options for UAE villas',
    caption: 'Colour Selection Guide',
  },
  {
    src: '/images/foldable-carport-material-choice-by-wasleen-pergolas.jpg',
    alt: 'Wasleen foldable carport material choice comparison between polycarbonate and glass panels',
    caption: 'Material Excellence',
  },
  {
    src: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-2.jpg',
    alt: 'Wasleen foldable garage 6063-T5 aluminium alloy cross-section detail engineering view',
    caption: 'Structural Integrity',
  },
  {
    src: '/images/retractable-carport-aluminium-alloy-by-wasleen-pergolas.jpg',
    alt: 'Wasleen retractable carport aluminium alloy frame installed on a UAE villa parking area',
    caption: 'Installation Showcase',
  },
  {
    src: '/images/specification-foldable-and-retractable-garage.jpg',
    alt: 'Wasleen foldable and retractable garage technical specification sheet with dimensions',
    caption: 'Technical Specifications',
  },
];

/**
 * Section 4 — Product gallery with lightbox modal.
 */
export function GallerySection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrev = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev === 0 ? GALLERY_IMAGES.length - 1 : prev - 1) : null
    );
  };

  const handleNext = () => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev === GALLERY_IMAGES.length - 1 ? 0 : prev + 1) : null
    );
  };

  return (
    <section className="relative bg-bg-primary py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Precision in Every Detail"
          subtitle="Explore the craftsmanship, materials, and engineering that define the Wasleen Foldable Garage."
          align="center"
        />

        {/* Gallery Grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.button
              key={image.src}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border-subtle bg-bg-card text-left"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedIndex(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-all duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="text-sm font-medium text-white">
                  {image.caption}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-[90vw]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] w-[80vw] max-w-[1000px] overflow-hidden rounded-2xl border border-border-subtle">
                <Image
                  src={GALLERY_IMAGES[selectedIndex].src}
                  alt={GALLERY_IMAGES[selectedIndex].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="text-sm text-text-secondary">
                  {GALLERY_IMAGES[selectedIndex].caption}
                </p>
                <p className="mt-1 text-xs text-text-tertiary">
                  {selectedIndex + 1} / {GALLERY_IMAGES.length}
                </p>
              </div>

              {/* Navigation */}
              <button
                className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                onClick={handlePrev}
                aria-label="Previous image"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="12 16 6 10 12 4" />
                </svg>
              </button>
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                onClick={handleNext}
                aria-label="Next image"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="8 4 14 10 8 16" />
                </svg>
              </button>

              {/* Close */}
              <button
                className="absolute -top-10 right-0 text-sm text-text-secondary transition-colors hover:text-text-primary"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close lightbox"
              >
                Close [Esc]
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
