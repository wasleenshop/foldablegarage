'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StarRating } from '@/components/ui/StarRating';

/**
 * Bento grid items — project photos with overlay text.
 */
const PROJECTS = [
  {
    src: '/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp',
    alt: 'Wasleen Foldable Garage installed at a Dubai villa showcasing the retractable carport in open position',
    label: 'Palm Jumeirah Villa',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas.webp',
    alt: 'Wasleen foldable garage aluminium alloy cross section showing precision engineering of the 6063-T5 frame',
    label: 'Engineering Precision',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/retractable-carport-aluminium-alloy-by-wasleen-pergolas.webp',
    alt: 'Wasleen retractable carport aluminium alloy frame installed at a UAE property showcasing the structure',
    label: 'Al Barari Estate',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/foldable-carport-material-choice-by-wasleen-pergolas.webp',
    alt: 'Wasleen foldable carport material choice comparison showing polycarbonate and glass panel options',
    label: 'Material Options',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-2.webp',
    alt: 'Wasleen foldable garage aluminium alloy cross section detail engineering drawing with technical specifications',
    label: 'Structural Detail',
    span: 'col-span-1 row-span-1',
  },
];

/**
 * Section 7 — Social Proof / Trust section.
 * Bento grid of project photos with overlay labels, aggregate rating display.
 */
export function SocialProof() {
  return (
    <section className="relative bg-bg-primary py-20 md:py-24 overflow-hidden">
      {/* Subtle top divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(201, 168, 76, 0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Trusted by Dubai Villa Owners"
          subtitle="Every installation tells a story of precision, quality, and unmatched protection for what matters most."
          align="center"
        />

        {/* Aggregate rating banner */}
        <motion.div
          className="mx-auto mb-12 flex max-w-xl flex-col items-center gap-3 rounded-2xl border border-border-subtle bg-bg-card/60 px-8 py-5 backdrop-blur-sm md:flex-row md:justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <StarRating rating={4.8} size="md" showValue showCount={142} />
          <span className="hidden text-text-tertiary md:inline">—</span>
          <span className="text-sm text-text-secondary">
            98% of customers recommend Wasleen
          </span>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.label}
              className={`group relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card ${project.span}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Image
                src={project.src}
                alt={project.alt}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                <p className="text-sm font-medium text-white md:text-base">
                  {project.label}
                </p>
                <div className="mt-1 flex items-center gap-1.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-accent-gold"
                  >
                    <path
                      d="M6 0L7.35 4.14L11.83 4.14L8.24 6.95L9.58 11.09L6 8.28L2.42 11.09L3.76 6.95L0.17 4.14L4.65 4.14L6 0Z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="text-xs text-accent-gold">Verified Installation</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust indicators */}
        <motion.div
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs text-text-tertiary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-accent-gold">
              <path d="M7 0L8.57 4.86L13.76 4.86L9.59 7.86L11.16 12.72L7 9.72L2.84 12.72L4.41 7.86L0.24 4.86L5.43 4.86L7 0Z" fill="currentColor" />
            </svg>
            4.8 ★ Average Rating
          </span>
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-accent-gold">
              <path d="M7 1L9.5 4.5L13.5 5.5L10.5 9L11 13L7 11.5L3 13L3.5 9L0.5 5.5L4.5 4.5L7 1Z" fill="currentColor" />
            </svg>
            142 Verified Reviews
          </span>
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-accent-gold">
              <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M4 7.5L6 9.5L10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            5-Year Warranty
          </span>
          <span className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-accent-gold">
              <rect x="1" y="3" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <path d="M4 3V2.5C4 1.67 4.67 1 5.5 1H8.5C9.33 1 10 1.67 10 2.5V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Certified Installation
          </span>
        </motion.div>
      </div>
    </section>
  );
}
