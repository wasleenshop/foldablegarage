'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Category = 'all' | 'residential' | 'commercial' | 'installation';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: Category;
  title: string;
  location: string;
  width: number;
  height: number;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const CATEGORIES: { key: Category; label: string }[] = [
  { key: 'all', label: 'All Projects' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial', label: 'Commercial' },
  { key: 'installation', label: 'Installation Process' },
];

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'g01',
    src: '/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp',
    alt: 'Foldable garage installation at a Dubai villa property by Wasleen Pergolas',
    category: 'residential',
    title: 'Palm Jumeirah Villa',
    location: 'Dubai',
    width: 1600,
    height: 1067,
  },
  {
    id: 'g02',
    src: '/images/retractable-carport-aluminium-alloy-by-wasleen-pergolas.webp',
    alt: 'Retractable carport aluminium alloy structure for commercial property',
    category: 'commercial',
    title: 'Emirates Hills Estate',
    location: 'Dubai',
    width: 1600,
    height: 1067,
  },
  {
    id: 'g03',
    src: '/images/foldable-carport-material-choice-by-wasleen-pergolas.webp',
    alt: 'Foldable carport material choice and colour selection showcase',
    category: 'residential',
    title: 'Al Barari Residence',
    location: 'Dubai',
    width: 1600,
    height: 1067,
  },
  {
    id: 'g04',
    src: '/images/foldable-carport-color-selection-guide-by-wasleen-pergolas.webp',
    alt: 'Carport colour selection guide with premium coating options',
    category: 'residential',
    title: 'Saadiyat Island Villa',
    location: 'Abu Dhabi',
    width: 1600,
    height: 1067,
  },
  {
    id: 'g05',
    src: '/images/specification-foldable-and-retractable-garage.webp',
    alt: 'Technical specification of foldable and retractable garage system',
    category: 'installation',
    title: 'Site Measurement & Planning',
    location: 'Dubai',
    width: 1600,
    height: 1067,
  },
  {
    id: 'g06',
    src: '/images/foldable-and-retractable-carport-engineering-specification-drawing-by-wasleen-pergolas.webp',
    alt: 'Engineering specification drawing for foldable carport system by Wasleen',
    category: 'installation',
    title: 'Engineering Blueprint Review',
    location: 'Dubai',
    width: 1600,
    height: 1067,
  },
  {
    id: 'g07',
    src: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas.webp',
    alt: 'Aluminium alloy cross section detail of foldable garage rail system',
    category: 'installation',
    title: 'Aluminium Rail Installation',
    location: 'Dubai',
    width: 1600,
    height: 1067,
  },
  {
    id: 'g08',
    src: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-2.webp',
    alt: 'Cross section technical view of foldable garage aluminium components',
    category: 'installation',
    title: 'Component Assembly',
    location: 'Abu Dhabi',
    width: 1600,
    height: 1067,
  },
  {
    id: 'g09',
    src: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-3.webp',
    alt: 'Detailed aluminium profile cross section for foldable garage system',
    category: 'commercial',
    title: 'Commercial Complex Carport',
    location: 'Dubai',
    width: 1600,
    height: 1067,
  },
  {
    id: 'g10',
    src: '/images/foldable-garage-diagram-aluminium-alloy-by-wasleen-pergolas.webp',
    alt: 'Technical diagram of foldable garage aluminium alloy structure',
    category: 'residential',
    title: 'Dubai Hills Villa',
    location: 'Dubai',
    width: 1600,
    height: 1067,
  },
  {
    id: 'g11',
    src: '/images/foldable-carport-material-choice-by-wasleen-pergolas.webp',
    alt: 'Foldable carport material options and premium finish selection',
    category: 'residential',
    title: 'Al Raha Beach Residence',
    location: 'Abu Dhabi',
    width: 1600,
    height: 1067,
  },
  {
    id: 'g12',
    src: '/images/foldable-carport-color-selection-guide-by-wasleen-pergolas.webp',
    alt: 'Professional colour selection guide for foldable carport exterior',
    category: 'commercial',
    title: 'Business Bay Parking',
    location: 'Dubai',
    width: 1600,
    height: 1067,
  },
];

/* ------------------------------------------------------------------ */
/*  Animation Variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function GalleryGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filtered =
    activeCategory === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  /* Keyboard navigation for lightbox */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!selectedImage) return;
      const currentIndex = GALLERY_IMAGES.findIndex(
        (img) => img.id === selectedImage.id
      );
      if (e.key === 'Escape') {
        setSelectedImage(null);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setSelectedImage(GALLERY_IMAGES[currentIndex - 1]);
      } else if (
        e.key === 'ArrowRight' &&
        currentIndex < GALLERY_IMAGES.length - 1
      ) {
        setSelectedImage(GALLERY_IMAGES[currentIndex + 1]);
      }
    },
    [selectedImage]
  );

  useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedImage, handleKeyDown]);

  return (
    <section className="bg-bg-secondary py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        {/* ---- Filter Tabs ---- */}
        <div className="mb-12 flex flex-wrap justify-center gap-x-2 gap-y-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-accent-gold text-bg-primary shadow-lg shadow-accent-gold/20'
                  : 'border border-border-subtle bg-card-bg text-secondary-text hover:border-accent-gold/50 hover:text-primary-text'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ---- Grid ---- */}
        <motion.div
          key={activeCategory}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((image) => (
              <motion.button
                key={image.id}
                layout
                variants={itemVariants}
                exit="exit"
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border-subtle bg-card-bg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-sm font-semibold text-white">
                    {image.title}
                  </h3>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-white/70">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {image.location}
                  </p>
                </div>

                {/* Zoom indicator on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                      <path d="M11 8v6" />
                      <path d="M8 11h6" />
                    </svg>
                  </span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ---- Empty State ---- */}
        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-secondary-text">
              No projects found in this category yet.
            </p>
          </div>
        )}
      </div>

      {/* ================================================================ */}
      {/*  Lightbox                                                        */}
      {/* ================================================================ */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-overlay px-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Close lightbox"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            {/* Previous */}
            {GALLERY_IMAGES.findIndex((i) => i.id === selectedImage.id) > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = GALLERY_IMAGES.findIndex(
                    (i) => i.id === selectedImage.id
                  );
                  setSelectedImage(GALLERY_IMAGES[idx - 1]);
                }}
                className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:block"
                aria-label="Previous image"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            )}

            {/* Next */}
            {GALLERY_IMAGES.findIndex((i) => i.id === selectedImage.id) <
              GALLERY_IMAGES.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const idx = GALLERY_IMAGES.findIndex(
                    (i) => i.id === selectedImage.id
                  );
                  setSelectedImage(GALLERY_IMAGES[idx + 1]);
                }}
                className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:block"
                aria-label="Next image"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            )}

            {/* Image container */}
            <motion.div
              key={selectedImage.id}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="relative w-full max-w-[1000px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border-subtle">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-white">
                  {selectedImage.title}
                </h3>
                <p className="mt-1 text-sm text-white/60">
                  {selectedImage.location}
                </p>
              </div>

              {/* Dot indicators */}
              <div className="mt-4 flex items-center justify-center gap-2">
                {filtered.map((img) => (
                  <button
                    key={img.id}
                    onClick={() => setSelectedImage(img)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      img.id === selectedImage.id
                        ? 'w-6 bg-accent-gold'
                        : 'w-1.5 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`View ${img.title}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
