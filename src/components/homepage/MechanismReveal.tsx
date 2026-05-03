'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * Section 2 — Scroll-pinned mechanism reveal with video + 3-panel retraction effect.
 * Phase 1: Uses Framer Motion scroll transforms with video background.
 * Phase 2: Will integrate GSAP ScrollTrigger for scroll-scrubbed video.
 */
export function MechanismReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Panel retraction transforms
  const leftPanelX = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const rightPanelX = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const centerScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.85]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // Play video when section comes into view
  const handleVideoPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked; user interaction required
      });
    }
  };

  return (
    <section
      id="mechanism"
      ref={sectionRef}
      className="relative h-[300vh]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-bg-primary">
        {/* Video background — plays the mechanism video */}
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={handleVideoPlay}
          poster="/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp"
        >
          <source src="/videos/foldable-garage-mechanism-video.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/80 via-bg-primary/40 to-bg-primary/80" />

        {/* Background transition */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-bg-secondary/60 to-bg-primary/80"
          style={{ opacity: bgOpacity }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-[900px] px-4">
          {/* Product mechanism panels */}
          <div className="relative flex items-center justify-center">
            {/* Left panel — slides out to the left */}
            <motion.div
              className="relative z-10 h-[300px] w-[280px] rounded-l-2xl bg-gradient-to-r from-bg-card/90 to-bg-secondary/90 backdrop-blur-sm border border-border-subtle md:h-[400px] md:w-[320px]"
              style={{ x: leftPanelX }}
            >
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl text-text-tertiary">⟐</span>
                </div>
              </div>
            </motion.div>

            {/* Center panel — the main product */}
            <motion.div
              className="relative z-20 flex h-[320px] w-[320px] items-center justify-center rounded-2xl bg-gradient-to-b from-bg-card/80 to-bg-primary/80 backdrop-blur-sm border border-accent-gold/30 shadow-2xl shadow-accent-gold/10 md:h-[440px] md:w-[400px]"
              style={{ scale: centerScale }}
            >
              <div className="text-center">
                <span className="text-6xl text-accent-gold/40">⛭</span>
              </div>
            </motion.div>

            {/* Right panel — slides out to the right */}
            <motion.div
              className="relative z-10 h-[300px] w-[280px] rounded-r-2xl bg-gradient-to-l from-bg-card/90 to-bg-secondary/90 backdrop-blur-sm border border-border-subtle md:h-[400px] md:w-[320px]"
              style={{ x: rightPanelX }}
            >
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl text-text-tertiary">⟐</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text overlay */}
          <motion.div
            className="mt-8 text-center"
            style={{ opacity: textOpacity }}
          >
            <p className="text-lg font-semibold text-accent-gold md:text-2xl">
              Three sections. One motion. Zero compromise.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
