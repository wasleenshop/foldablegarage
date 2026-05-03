'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

const SPECS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="7" width="22" height="14" rx="2" />
        <path d="M9 5v4M19 5v4M5 15h18" />
        <circle cx="9" cy="17" r="1.5" />
        <circle cx="19" cy="17" r="1.5" />
      </svg>
    ),
    label: 'Dimensions',
    value: '2–12m × 6–30m',
    sub: 'Custom sizes, 0.5m increments',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="4" y="4" width="20" height="20" rx="3" />
        <path d="M4 12h20" />
        <path d="M4 18h20" />
        <path d="M12 4v20" />
      </svg>
    ),
    label: 'Materials',
    value: '6063-T5 Aluminium',
    sub: 'Anodised + PVDF coating',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="14" cy="10" r="6" />
        <path d="M14 16v6M10 22h8" />
        <path d="M8 24a6 6 0 0112 0" opacity="0.4" />
      </svg>
    ),
    label: 'Structure Weight',
    value: '450–1,200 kg',
    sub: 'Depends on size & roof type',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 3v4M10 5a6 6 0 008 0" />
        <path d="M6 10h4M18 10h4" />
        <path d="M5 16l2-2M23 16l-2-2" />
        <rect x="7" y="14" width="14" height="9" rx="2" />
        <path d="M10 23v2M18 23v2" />
        <text x="14" y="21" textAnchor="middle" fontSize="8" fill="currentColor" stroke="none">5</text>
      </svg>
    ),
    label: 'Warranty',
    value: '5 Years',
    sub: '15-year no-fade on coating',
  },
];

/**
 * Key technical specs displayed as a 4-column strip.
 */
export function TechSpecs() {
  return (
    <section className="relative bg-bg-secondary py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Technical Specifications"
          subtitle="Engineered to the highest standards for the UAE climate"
        />

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {SPECS.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative rounded-2xl border border-border-subtle bg-bg-card p-6 transition-all duration-300 hover:border-accent-gold/20 hover:shadow-lg hover:shadow-accent-gold/5"
            >
              {/* Icon */}
              <div className="mb-4 text-accent-gold transition-colors group-hover:text-accent-gold-hover">
                {spec.icon}
              </div>

              {/* Value */}
              <p className="font-sans text-lg font-bold text-text-primary">
                {spec.value}
              </p>

              {/* Label */}
              <p className="mt-1 text-sm font-medium text-accent-gold">
                {spec.label}
              </p>

              {/* Sub */}
              <p className="mt-1 text-xs text-text-tertiary">
                {spec.sub}
              </p>

              {/* Gold accent line on hover */}
              <div className="mt-4 h-px w-0 bg-gradient-to-r from-accent-gold to-transparent transition-all duration-300 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
