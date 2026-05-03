'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { STATS } from '@/lib/constants';

/**
 * Stat entry from constants — may have `suffix` or `prefix`.
 */
type StatEntry = (typeof STATS)[number];

/**
 * Section 3 — Stats counter with spring-animated count-up.
 * Each stat animates when scrolled into view. Background image shows the product diagram.
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
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let current = 0;
    const duration = 1500; // ms
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
  }, [isActive, target]);

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
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

      {/* Animated number */}
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
      {/* Background image — subtle engineering diagram */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <Image
          src="/images/foldable-garage-diagram-aluminium-alloy-by-wasleen-pergolas.webp"
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
