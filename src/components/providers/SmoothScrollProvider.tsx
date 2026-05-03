'use client';

import { createContext, useContext, useRef, useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

/**
 * Context to provide the Lenis instance to child components.
 */
const LenisContext = createContext<React.RefObject<Lenis | null>>({
  current: null,
});

/**
 * Hook to access the Lenis instance from any child component.
 * Use `lenisRef.current?.scrollTo(target)` for imperative scrolling.
 */
export function useLenis() {
  return useContext(LenisContext);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
  /** Whether smooth scrolling is enabled. Default: true. */
  enabled?: boolean;
  /** Scroll duration — higher = slower. Default: 1.2. */
  duration?: number;
}

/**
 * App-level provider that initialises Lenis smooth scroll + GSAP ScrollTrigger.
 *
 * Place this at the root layout level, wrapping all page content.
 * Automatically respects `prefers-reduced-motion`.
 * Provides the Lenis instance via context for imperative scrollTo() calls.
 */
export function SmoothScrollProvider({
  children,
  enabled = true,
  duration = 1.2,
}: SmoothScrollProviderProps) {
  const lenisRef = useSmoothScroll({ enabled, duration });

  return (
    <LenisContext.Provider value={lenisRef}>
      {children}
    </LenisContext.Provider>
  );
}
