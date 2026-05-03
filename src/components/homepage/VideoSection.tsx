'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pushGTMEvent } from '@/lib/gtm';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 7 — Scroll-scrubbed video showcase.
 * Phase 2: Video currentTime linked to scroll position via GSAP ScrollTrigger.
 * Faster scroll = faster video playback. Pauses when scroll stops.
 */
export function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);

  // ── GSAP ScrollTrigger — scroll-scrubbed video ──
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onEnter: () => {
          video.pause();
          setIsScrubbing(true);
        },
        onUpdate: (self) => {
          if (video.readyState >= 2 && video.duration) {
            video.currentTime = self.progress * video.duration;
          }
          if (!isScrubbing) setIsScrubbing(true);
        },
        onLeave: () => {
          setIsScrubbing(false);
        },
        onLeaveBack: () => {
          setIsScrubbing(false);
        },
      });
    }, section);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <section ref={sectionRef} className="video-section relative bg-bg-secondary py-20 md:py-24">
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
            preload="auto"
            onEnded={handleVideoEnded}
            poster="/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp"
          >
            <source src="/videos/foldable-garage-wasleen-pergolas-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Gradient overlay at bottom for controls readability */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Scroll-scrub indicator */}
          <div
            className="absolute inset-x-0 top-0 z-10 flex items-center justify-center px-4 py-2"
            style={{ opacity: isScrubbing ? 1 : 0 }}
          >
            <span className="rounded-full bg-accent-gold/20 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-accent-gold backdrop-blur-sm transition-opacity duration-300">
              Scroll to scrub
            </span>
          </div>

          {/* Play/Pause overlay — visible when paused & not scrubbing */}
          {!isPlaying && !isScrubbing && (
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
            {isScrubbing && (
              <span className="ml-auto text-[10px] text-accent-gold/60">
                ✦ scrub active
              </span>
            )}
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
