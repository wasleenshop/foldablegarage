'use client';

import { motion } from 'framer-motion';

export function GalleryHero() {
  return (
    <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-bg-primary md:min-h-[400px]">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-1/2 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent-gold/5 blur-[100px]" />
        <div className="absolute -right-1/2 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-accent-cyan/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[800px] px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-4 text-xs font-semibold tracking-[0.2em] text-accent-gold"
        >
          GALLERY
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-sans text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-text-primary"
        >
          Our{' '}
          <span className="gold-gradient">Installations</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mx-auto mt-4 max-w-[600px] text-[clamp(0.875rem,1vw,1rem)] leading-relaxed text-text-secondary"
        >
          Explore real projects across the UAE. From villa driveways to
          commercial parking, see how Wasleen transforms outdoor spaces with
          precision-engineered foldable carports.
        </motion.p>
      </div>
    </section>
  );
}
