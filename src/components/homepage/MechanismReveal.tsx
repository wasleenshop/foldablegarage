'use client';

import { useEffect, useRef } from 'react';

/**
 * Section 2 — Full-bleed mechanism video with subtle gradient overlay.
 * Simplified: no 3-panel grid, no GSAP ScrollTrigger effects.
 */
export function MechanismReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ── IntersectionObserver: load video only when section is close to viewport ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.preload = 'auto';
            video.play().catch(() => {});
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mechanism"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Video background — full bleed */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp"
      >
        <source src="/videos/foldable-garage-mechanism-video.webm" type="video/webm" />
        <source src="/videos/foldable-garage-mechanism-video.mp4" type="video/mp4" />
      </video>

      {/* Subtle gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/60 via-transparent to-bg-primary/20" />

      {/* Minimal content overlay */}
      <div className="relative z-10 mx-auto max-w-[900px] px-4 text-center">
        <p className="text-lg font-semibold text-accent-gold md:text-2xl">
          Three sections. One motion. Zero compromise.
        </p>
      </div>
    </section>
  );
}
