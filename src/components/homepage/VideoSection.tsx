'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Section 7 — Mechanism video showcase.
 * Phase 1: Placeholder poster with play button overlay.
 * Phase 2: Replace with actual H.264 MP4 video + scroll-scrubbing.
 */
export function VideoSection() {
  return (
    <section className="relative bg-bg-secondary py-20 md:py-24">
      {/* Subtle divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="See It in Motion"
          subtitle="Watch the Wasleen Foldable Garage transform from open canopy to fully enclosed shelter."
          align="center"
        />

        <motion.div
          className="relative mx-auto mt-12 aspect-video max-w-[900px] overflow-hidden rounded-2xl border border-border-subtle bg-bg-card md:mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Video poster placeholder */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-bg-card to-bg-primary">
            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Play button */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent-gold/50 bg-accent-gold/10 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-accent-gold/20 md:h-24 md:w-24">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  className="ml-1 text-accent-gold"
                >
                  <path
                    d="M10 6L26 16L10 26V6Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <p className="text-sm text-text-tertiary">
                Video coming soon — mechanism in action
              </p>
            </div>
          </div>
        </motion.div>

        {/* Video specs caption */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-center text-xs text-text-tertiary"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          The foldable mechanism operates on precision-engineered rails with
          weather-resistant seals. Full demonstration video in 4K HDR.
        </motion.p>
      </div>
    </section>
  );
}
