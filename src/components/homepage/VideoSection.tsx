'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pushGTMEvent } from '@/lib/gtm';

/**
 * Section 7 — Mechanism video showcase.
 * Phase 1: Video player with play/pause controls.
 * Phase 2 will add scroll-scrubbing via GSAP ScrollTrigger.
 */
export function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      pushGTMEvent('video_played', { source: 'mechanism_showcase' });
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section className="relative bg-bg-secondary py-20 md:py-24">
      {/* Subtle divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="See It in Motion"
          subtitle="Watch the Wasleen Foldable Garage transform from open canopy to fully enclosed shelter."
          align="center"
        />

        <motion.div
          className="relative mx-auto mt-12 aspect-video max-w-[900px] overflow-hidden rounded-2xl border border-border-subtle bg-black md:mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Actual video */}
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            playsInline
            preload="metadata"
            onEnded={handleVideoEnded}
            poster="/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp"
          >
            <source src="/videos/foldable-garage-wasleen-pergolas-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Gradient overlay at bottom for controls readability */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Play/Pause overlay — visible when paused */}
          {!isPlaying && (
            <div
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 backdrop-blur-[1px] transition-all hover:bg-black/20"
              onClick={handlePlayPause}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent-gold/50 bg-accent-gold/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-accent-gold/20 md:h-24 md:w-24">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="ml-1 text-accent-gold"
                >
                  <path
                    d="M10 6L26 16L10 26V6Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Bottom controls bar */}
          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-3 px-4 py-3">
            <button
              onClick={handlePlayPause}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <rect x="2" y="1" width="3" height="10" rx="1" />
                  <rect x="7" y="1" width="3" height="10" rx="1" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <polygon points="2,1 11,6 2,11" />
                </svg>
              )}
            </button>
            <span className="text-xs text-white/60">
              Wasleen Foldable Garage — Mechanism in Action
            </span>
          </div>
        </motion.div>

        {/* Video specs caption */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-center text-xs text-text-tertiary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          The foldable mechanism operates on precision-engineered rails with
          weather-resistant seals. Full demonstration video in 4K HDR.
        </motion.p>
      </div>
    </section>
  );
}
