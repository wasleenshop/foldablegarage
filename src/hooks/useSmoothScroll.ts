'use client';

import { useEffect, useRef, type RefObject } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface UseSmoothScrollOptions {
  /** Whether to enable smooth scrolling. Default: true. */
  enabled?: boolean;
  /** Lenis duration (scroll speed). Default: 1.2. */
  duration?: number;
  /** Easing function. Default: easeOutQuart. */
  easing?: (t: number) => number;
}

/**
 * Default ease-out-quart easing for a premium, weighty scroll feel.
 */
const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

/**
 * Integrates Lenis smooth scroll with GSAP ScrollTrigger.
 * Should be called once at the app root level.
 *
 * - Initialises Lenis with the given options
 * - Connects Lenis scroll events to GSAP ScrollTrigger.update()
 * - Pipes the GSAP ticker through Lenis for frame-synced animation
 * - Respects `prefers-reduced-motion` — disables smooth scroll if active
 * - Automatically cleans up on unmount
 *
 * Returns a ref to the Lenis instance for imperative scrollTo calls.
 */
export function useSmoothScroll({
  enabled = true,
  duration = 1.2,
  easing = easeOutQuart,
}: UseSmoothScrollOptions = {}): RefObject<Lenis | null> {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Check if touch device — disable Lenis on mobile to prevent scroll conflicts
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

    // Don't initialise if disabled, user prefers reduced motion, or touch device
    if (!enabled || prefersReducedMotion || isTouchDevice) {
      // Ensure ScrollTrigger still works without Lenis
      ScrollTrigger.refresh();
      return;
    }

    try {
      // Initialise Lenis
      const lenis = new Lenis({
        duration,
        easing,
        orientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1.2,
        infinite: false,
      });

      lenisRef.current = lenis;

      // Connect Lenis scroll to GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Pipe GSAP's ticker through Lenis for synced animations
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      // Refresh ScrollTrigger after Lenis has settled (DOM fully painted)
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      // Cleanup
      return () => {
        try {
          lenis.destroy();
          gsap.ticker.remove(lenis.raf);
        } catch {
          // Silently handle cleanup errors
        }
        lenisRef.current = null;
      };
    } catch (err) {
      console.warn(
        'Wasleen — Lenis initialisation failed, falling back to native scroll:',
        err
      );
      ScrollTrigger.refresh();
    }
  }, [enabled, duration, easing]);

  return lenisRef;
}
