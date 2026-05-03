'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 2 — Scroll-pinned mechanism reveal with 3-panel retraction effect.
 * Phase 2: GSAP ScrollTrigger pin + scrub for panel retraction, rail highlight, car reveal.
 *
 * Animation spec:
 * - Pinned for 600px scroll distance
 * - 3 panels progressively "retract" via CSS transform
 * - Rail highlight travels left-to-right
 * - Luxury car fades in at 80% progress
 * - Background transitions from black → villa exterior
 */
export function MechanismReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // ── IntersectionObserver: load video only when section is close to viewport ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Set preload to auto when nearing viewport
            video.preload = 'auto';
            video.load();
            setVideoLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [videoLoaded]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    // Attempt autoplay (only after video has been loaded)
    if (videoRef.current && videoLoaded) {
      videoRef.current.play().catch(() => {});
    }

    try {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: '+=600',
          onUpdate: (self) => {
            // Only update state when progress changes meaningfully to reduce re-renders
            setProgress((prev) => {
              const diff = Math.abs(self.progress - prev);
              return diff > 0.01 ? self.progress : prev;
            });
          },
        });
      }, section);

      return () => ctx.revert();
    } catch (err) {
      console.warn(
        'Wasleen — MechanismReveal ScrollTrigger creation failed:',
        err
      );
    }
  }, [videoLoaded]);

  // ── Panel transforms derived from scroll progress ──

  // Left panel: retracts 0–33% progress (0% → -100%)
  const leftPanelProgress = Math.min(progress / 0.33, 1);
  const leftPanelX = `${-leftPanelProgress * 100}%`;

  // Right panel: retracts 33–66% progress (0% → 100%)
  const rightPanelT = Math.max(0, Math.min((progress - 0.33) / 0.33, 1));
  const rightPanelX = `${rightPanelT * 100}%`;

  // Center panel: scales down 66–100% progress (1 → 0.85)
  const centerT = Math.max(0, Math.min((progress - 0.66) / 0.34, 1));
  const centerScale = 1 - centerT * 0.15;

  // Car fade-in at 80% progress (opacity 0→1, scale 0.95→1)
  const carT = Math.max(0, Math.min((progress - 0.8) / 0.2, 1));
  const carOpacity = carT;
  const carScale = 0.95 + carT * 0.05;

  // Rail highlight travels left-to-right (0% → 100%)
  const railWidth = `${progress * 100}%`;

  // Text fades in between 30–50% progress
  const textOpacity = Math.max(0, Math.min((progress - 0.3) / 0.2, 1));

  // Background overlay opacity (0 → 1 over first 66% progress)
  const bgOpacity = Math.min(progress / 0.66, 1);

  return (
    <section
      id="mechanism"
      ref={sectionRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Video background — plays the mechanism video */}
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

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/80 via-bg-primary/40 to-bg-primary/80" />

      {/* Background transition overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-bg-secondary/60 to-bg-primary/80"
        style={{ opacity: bgOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-[900px] px-4">
        {/* Rail track — highlight travels left-to-right */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-border-subtle/50">
          <div
            className="h-full bg-accent-gold transition-none"
            style={{ width: railWidth }}
          />
        </div>

        {/* Product mechanism panels */}
        <div className="relative flex items-center justify-center">
          {/* Left panel — slides out to the left (0–33%) */}
          <div
            className="relative z-10 h-[300px] w-[280px] rounded-l-2xl bg-gradient-to-r from-bg-card/90 to-bg-secondary/90 backdrop-blur-sm border border-border-subtle md:h-[400px] md:w-[320px]"
            style={{ transform: `translateX(${leftPanelX})` }}
          >
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <span className="text-4xl text-text-tertiary">⟐</span>
              </div>
            </div>
          </div>

          {/* Center panel — the main product (scales 66–100%) */}
          <div
            className="relative z-20 flex h-[320px] w-[320px] items-center justify-center rounded-2xl bg-gradient-to-b from-bg-card/80 to-bg-primary/80 backdrop-blur-sm border border-accent-gold/30 shadow-2xl shadow-accent-gold/10 md:h-[440px] md:w-[400px]"
            style={{ transform: `scale(${centerScale})` }}
          >
            <div className="text-center">
              <span className="text-6xl text-accent-gold/40">⛭</span>
            </div>
          </div>

          {/* Right panel — slides out to the right (33–66%) */}
          <div
            className="relative z-10 h-[300px] w-[280px] rounded-r-2xl bg-gradient-to-l from-bg-card/90 to-bg-secondary/90 backdrop-blur-sm border border-border-subtle md:h-[400px] md:w-[320px]"
            style={{ transform: `translateX(${rightPanelX})` }}
          >
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <span className="text-4xl text-text-tertiary">⟐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Luxury car reveal at 80% progress */}
        <div
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
          style={{ opacity: carOpacity, transform: `scale(${carScale})` }}
        >
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-accent-gold/10 border border-accent-gold/30">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 17a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2" />
                <circle cx="7" cy="15" r="1.5" />
                <circle cx="17" cy="15" r="1.5" />
                <path d="M9 13h6" />
                <path d="M3 9l3-3h12l3 3" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-accent-gold md:text-xl">
              Your vehicle, perfectly sheltered
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Precision-engineered to protect what matters most
            </p>
          </div>
        </div>

        {/* Text overlay */}
        <div
          className="mt-8 text-center"
          style={{ opacity: textOpacity }}
        >
          <p className="text-lg font-semibold text-accent-gold md:text-2xl">
            Three sections. One motion. Zero compromise.
          </p>
        </div>
      </div>
    </section>
  );
}
