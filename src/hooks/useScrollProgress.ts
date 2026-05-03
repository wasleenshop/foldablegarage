'use client';

import { useState, useEffect } from 'react';

/**
 * Tracks scroll progress (0-1) for a given element or the window.
 */
export function useScrollProgress(elementRef?: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef?.current) {
        const el = elementRef.current;
        const rect = el.getBoundingClientRect();
        const total = rect.height + rect.top;
        const current = window.innerHeight - rect.top;
        setProgress(Math.max(0, Math.min(1, current / total)));
      } else {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef]);

  return progress;
}
