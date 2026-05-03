'use client';

import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';

/**
 * Animates a number from 0 to target when element enters viewport.
 */
export function useCountUp(target: number, duration = 1500) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(interval);
      }
      setCount(current);
    }, duration / (target / step));

    return () => clearInterval(interval);
  }, [isInView, target, duration]);

  return { ref, count, isInView };
}
