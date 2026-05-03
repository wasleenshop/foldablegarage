'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KineticBackground } from './KineticBackground';
import { HeroText } from './HeroText';
import { Button } from '@/components/ui/Button';
import { pushGTMEvent } from '@/lib/gtm';
import { useLenis } from '@/components/providers/SmoothScrollProvider';

gsap.registerPlugin(ScrollTrigger);

/**
 * Section 1 — Full-screen hero with hero image background, kinetic lasers, staggered headline, and CTAs.
 *
 * Phase 2 enhancements:
 * - ScrollTrigger pin for 300px scroll distance
 * - Laser SVG opacity fades 1→0 as user scrolls
 * - Headline words particle-dissolve downward
 * - Background transitions #0A0A0A → #111111
 */
export function HeroSection() {
  const lenisRef = useLenis();
  const sectionRef = useRef<HTMLElement>(null);

  const handleQuoteClick = () => {
    pushGTMEvent('quote_started', { source: 'hero_cta' });
  };

  const handleWatchVideo = () => {
    // Use Lenis smooth scroll if available, fall back to native
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#mechanism');
    } else {
      document.getElementById('mechanism')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ── GSAP ScrollTrigger — pin hero, fade lasers, dissolve headline ──
  useEffect(() => {
    const hero = sectionRef.current;
    if (!hero) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: hero,
        start: 'top top',
        end: '+=300',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;

          // 1. Fade lasers 1→0
          gsap.to('.hero-lasers', { opacity: 1 - p, duration: 0.1 });

          // 2. Headline words — dissolve downward
          gsap.to('.hero-headline span', {
            y: p * 30,
            opacity: 1 - p,
            duration: 0.1,
            stagger: 0.02 * p,
          });

          // 3. Background transition #0A0A0A → #111111
          gsap.to(hero, {
            backgroundColor: p > 0.5 ? '#111111' : '#0A0A0A',
            duration: 0.1,
          });
        },
      });
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Hero background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp"
          alt="Wasleen Foldable Premium Garage — Dubai installation showcasing retractable carport"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/80 via-bg-primary/60 to-bg-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/30" />
      </div>

      {/* Foldable-style animated circles — like mechanism panels folding/unfolding */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Circle 1 — Cyan, slides and morphs like a folding panel */}
        <div
          className="absolute top-1/4 -left-[10%] h-[50vh] w-[50vh] opacity-[0.06]"
          style={{
            background: 'radial-gradient(circle, #00D4FF 0%, transparent 70%)',
            animation: 'foldCircle1 12s ease-in-out infinite',
          }}
        />
        {/* Circle 2 — Violet, counter-slides like the opposing panel */}
        <div
          className="absolute bottom-1/4 -right-[10%] h-[55vh] w-[55vh] opacity-[0.05]"
          style={{
            background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
            animation: 'foldCircle2 12s ease-in-out infinite',
          }}
        />
        {/* Ambient pulse glow */}
        <div
          className="absolute top-1/2 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 -translate-y-1/2 opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #C9A84C 0%, transparent 60%)',
            animation: 'foldablePulse 8s ease-in-out infinite',
          }}
        />
      </div>

      {/* Kinetic laser background overlay */}
      <div className="hero-lasers absolute inset-0 z-[2]">
        <KineticBackground />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[3] bg-gradient-to-b from-transparent via-transparent to-bg-primary/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 text-center md:px-6 lg:px-8">
        {/* Headline */}
        <HeroText text="Intelligent Motion. Absolute Protection." className="hero-headline" />

        {/* Subheadline */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-[clamp(0.875rem,1vw,1rem)] leading-relaxed text-text-secondary md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Architectural-grade retractable carports for the UAE — engineered from 6063-T5 aluminium with precision automation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Button variant="primary" size="lg" href="/quote" onClick={handleQuoteClick}>
            Request a Consultation
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={handleWatchVideo}
          >
            <span className="mr-2">▶</span> Watch it Open
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
            Scroll to explore
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-scroll-indicator text-text-tertiary"
          >
            <polyline points="8 16 14 10 8 4" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
