'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  alt: string;
  videoSrc?: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'hero',
    type: 'image',
    src: '/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp',
    thumbnail: '/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp',
    alt: 'Wasleen Foldable Premium Garage — hero product shot in Dubai villa setting',
  },
  {
    id: 'engineering',
    type: 'image',
    src: '/images/foldable-and-retractable-carport-engineering-specification-drawing-by-wasleen-pergolas.webp',
    thumbnail: '/images/foldable-and-retractable-carport-engineering-specification-drawing-by-wasleen-pergolas.webp',
    alt: 'Foldable carport engineering specification drawing by Wasleen Pergolas',
  },
  {
    id: 'aluminium',
    type: 'image',
    src: '/images/retractable-carport-aluminium-alloy-by-wasleen-pergolas.webp',
    thumbnail: '/images/retractable-carport-aluminium-alloy-by-wasleen-pergolas.webp',
    alt: 'Retractable carport aluminium alloy detail by Wasleen Pergolas',
  },
  {
    id: 'spec',
    type: 'image',
    src: '/images/specification-foldable-and-retractable-garage.webp',
    thumbnail: '/images/specification-foldable-and-retractable-garage.webp',
    alt: 'Specification sheet for foldable and retractable garage',
  },
  {
    id: 'cross-section-1',
    type: 'image',
    src: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas.webp',
    thumbnail: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas.webp',
    alt: 'Foldable garage aluminium alloy cross-section diagram by Wasleen Pergolas',
  },
  {
    id: 'cross-section-2',
    type: 'image',
    src: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-2.webp',
    thumbnail: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-2.webp',
    alt: 'Foldable garage aluminium alloy cross-section diagram 2 by Wasleen Pergolas',
  },
  {
    id: 'cross-section-3',
    type: 'image',
    src: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-3.webp',
    thumbnail: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-3.webp',
    alt: 'Foldable garage aluminium alloy cross-section diagram 3 by Wasleen Pergolas',
  },
  {
    id: 'hero-video',
    type: 'video',
    src: '/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp',
    thumbnail: '/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp',
    alt: 'Wasleen Foldable Garage product video',
    videoSrc: '/videos/foldable-garage-hero-product-video.mp4',
  },
];

/**
 * Amazon-style media gallery with image thumbnails and video tab.
 * Users click thumbnails to switch the main display. No arrow navigation.
 */
export function CheckoutMediaGallery() {
  const [activeId, setActiveId] = useState(GALLERY_ITEMS[0].id);
  const [isVideoLoading, setIsVideoLoading] = useState(false);

  const activeItem = GALLERY_ITEMS.find((item) => item.id === activeId) ?? GALLERY_ITEMS[0];

  const handleThumbnailClick = useCallback((id: string) => {
    setIsVideoLoading(true);
    setActiveId(id);
  }, []);

  const handleVideoReady = useCallback(() => {
    setIsVideoLoading(false);
  }, []);

  return (
    <div className="space-y-4">
      {/* Main Display */}
      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-bg-card">
        {/* Static border */}
        <div className="absolute inset-0 z-10 rounded-2xl border border-border-subtle pointer-events-none" />

        {/* Animated border glow on video items */}
        {activeItem.type === 'video' && (
          <div className="absolute inset-0 z-20 rounded-2xl pointer-events-none">
            <div
              className="absolute -inset-[1px] rounded-2xl opacity-60"
              style={{
                background:
                  'conic-gradient(from var(--angle, 0deg), transparent 0deg, #00D4FF 90deg, #7C3AED 180deg, #C9A84C 270deg, transparent 360deg)',
                animation: 'gradientBorderRotate 4s linear infinite',
              }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          {activeItem.type === 'video' ? (
            <motion.div
              key={activeItem.id}
              className="relative h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Loading overlay */}
              {isVideoLoading && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-bg-card/60">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent-gold border-t-transparent" />
                </div>
              )}
              <video
                key={activeItem.videoSrc}
                className="h-full w-full object-cover"
                src={activeItem.videoSrc}
                controls
                autoPlay
                muted
                playsInline
                poster={activeItem.src}
                onCanPlay={handleVideoReady}
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeItem.id}
              className="relative h-full w-full"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={activeItem.id === 'hero'}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border-subtle scrollbar-track-transparent">
        {GALLERY_ITEMS.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => handleThumbnailClick(item.id)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                isActive
                  ? 'border-accent-gold ring-1 ring-accent-gold/50'
                  : 'border-border-subtle hover:border-text-tertiary'
              }`}
              aria-label={`View ${item.alt}`}
            >
              {item.type === 'video' ? (
                <>
                  <Image
                    src={item.thumbnail}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="drop-shadow-lg"
                    >
                      <polygon points="8,5 19,12 8,19" />
                    </svg>
                  </div>
                </>
              ) : (
                <Image
                  src={item.thumbnail}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
