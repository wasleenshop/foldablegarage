'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Section 6 — Full-view video demonstration of the foldable mechanism.
 * Optimized for mobile with touch-friendly controls.
 */
export function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isScrubbing, setIsScrubbing] = useState(false);

  // ── IntersectionObserver: play/pause based on visibility ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
            setIsPlaying(true);
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // ── Scroll-scrub effect ──
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate scroll progress within the section (0 to 1)
      const scrollProgress = Math.max(
        0,
        Math.min(1, -rect.top / (sectionHeight - windowHeight))
      );

      if (scrollProgress > 0 && scrollProgress < 1) {
        setIsScrubbing(true);
        if (video.duration) {
          video.currentTime = scrollProgress * video.duration;
        }
      } else {
        setIsScrubbing(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  return (
    <section ref={sectionRef} className="video-section relative min-h-screen bg-bg-secondary overflow-hidden">
      {/* Subtle divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent z-10" />

      {/* Section heading overlay */}
      <div className="absolute top-8 left-0 right-0 z-20">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
          <SectionHeading
            title="See It in Motion"
            subtitle="Watch the Wasleen Foldable Garage transform from open canopy to fully enclosed shelter."
            align="center"
          />
        </div>
      </div>

      {/* Full-viewport video */}
      <div className="relative h-screen w-full">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onEnded={handleVideoEnded}
          poster="/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp"
        >
          <source src="/videos/foldable-garage-wasleen-pergolas-video.webm" type="video/webm" />
          <source src="/videos/foldable-garage-wasleen-pergolas-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient overlay at bottom for controls readability */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

        {/* Scroll-scrub indicator */}
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 z-10"
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
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center gap-3 px-4 py-4 md:py-6">
          <button
            onClick={handlePlayPause}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:h-12 md:w-12"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 12 12" fill="currentColor">
                <rect x="2" y="1" width="3" height="10" rx="1" />
                <rect x="7" y="1" width="3" height="10" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 12 12" fill="currentColor">
                <polygon points="2,1 11,6 2,11" />
              </svg>
            )}
          </button>
          <span className="text-sm text-white/60">
            Wasleen Foldable Garage — Mechanism in Action
          </span>
          {isScrubbing && (
            <span className="ml-auto text-[10px] text-accent-gold/60 md:text-xs">
              ✦ scrub active
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
