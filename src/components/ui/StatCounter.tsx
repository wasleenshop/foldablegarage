'use client';

import { useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  className?: string;
}

/**
 * Animated stat counter that counts up when scrolled into view.
 */
export function StatCounter({
  target,
  suffix = '',
  prefix = '',
  label,
  duration = 1500,
  className,
}: StatCounterProps) {
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

  return (
    <div ref={ref} className={cn('flex flex-col items-center', className)}>
      <span className="font-sans text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none text-accent-gold">
        {isInView ? (
          <>
            {prefix}
            {count.toLocaleString()}
            {suffix}
          </>
        ) : (
          <span>{prefix}0{suffix}</span>
        )}
      </span>
      <p className="mt-2 text-center text-sm text-text-secondary md:text-base">
        {label}
      </p>
    </div>
  );
}
