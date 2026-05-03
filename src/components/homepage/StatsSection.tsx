'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { STATS } from '@/lib/constants';

/**
 * Stat entry from constants — may have `suffix` or `prefix`.
 */
type StatEntry = (typeof STATS)[number];

/**
 * Section 3 — Stats counter with spring-animated count-up.
 * Uses Framer Motion `useSpring` for compositor-thread smooth animation
 * that doesn't jank on scroll — replaces legacy setInterval approach.
 * Background image shows the product diagram.
 */

function CountUp({
  target,
  isActive,
  suffix,
  prefix,
}: {
  target: number;
  isActive: boolean;
  suffix: string;
  prefix: string;
}) {
  const motionValue = useMotionValue(0);

  const spring = useSpring(motionValue, {
    stiffness: 50,
    damping: 12,
    mass: 0.5,
  });

  const rounded = useTransform(spring, (v) => Math.round(v));
  const [displayValue, setDisplayValue] = useState(0);

  // Sync motion value → React state for TypeScript-safe rendering
  useMotionValueEvent(rounded, 'change', (v) => setDisplayValue(v));

  // Trigger spring animation when component becomes active
  useEffect(() => {
    if (isActive) {
      motionValue.set(target);
    }
  }, [isActive, target, motionValue]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
}

function AnimatedStat({ stat, index }: { stat: StatEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const numericValue = parseInt(stat.value.replace(/[^0-9.]/g, ''), 10);
  const suffix = 'suffix' in stat ? stat.suffix : '';
  const prefix = 'prefix' in stat ? stat.prefix : '';

  const icons = ['🏗️', '🏠', '⭐', '🔧'];

  return (
    <motion.div
      ref={ref}
      className="group flex flex-col items-center p-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Icon */}
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl border border-border-subtle bg-bg-card transition-colors duration-300 group-hover:border-accent-gold/40">
        <span className="text-xl">{icons[index]}</span>
      </div>

      {/* Animated number — spring-driven for zero-jank scroll performance */}
      <div className="font-sans text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none text-text-primary">
        {isInView ? (
          <CountUp
            target={numericValue}
            isActive={isInView}
            suffix={suffix}
            prefix={prefix}
          />
        ) : (
          <span>{prefix}0{suffix}</span>
        )}
      </div>

      {/* Label */}
      <p className="mt-2 text-center text-sm text-text-secondary md:text-base">
        {stat.label}
      </p>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section className="relative bg-bg-primary py-20 md:py-24 overflow-hidden">
      {/* Background — animated foldable mechanism SVG */}
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
        <Image
          src="/foldable-garage-svg.svg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Subtle top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Trusted Across the UAE"
          subtitle="Numbers that reflect our commitment to quality and excellence in every installation."
          align="center"
        />

        <div className="mt-12 grid grid-cols-2 gap-6 md:mt-16 md:grid-cols-4 md:gap-8">
          {STATS.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              stat={stat as StatEntry}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
