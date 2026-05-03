'use client';

import { motion } from 'framer-motion';

export function BlogHero() {
  return (
    <section className="relative flex min-h-[320px] items-center justify-center overflow-hidden bg-bg-primary md:min-h-[400px]">
      {/* Gradient Orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 -top-32 h-[400px] w-[400px] rounded-full bg-accents-gold/5 blur-[120px]" />
        <div className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-accents-cyan/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[800px] px-4 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-3 text-sm font-semibold tracking-[0.2em] text-accents-gold"
        >
          BLOG
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="font-heading text-[clamp(2rem,_4vw,_3.5rem)] font-bold leading-[1.05] text-text-primary"
        >
          <span className="bg-gradient-to-r from-accents-gold to-accents-gold/70 bg-clip-text text-transparent">
            Insights & Guides
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mx-auto mt-4 max-w-[600px] text-text-secondary"
        >
          Expert advice on retractable carports, outdoor living trends, maintenance tips,
          and everything Dubai villa owners need to know.
        </motion.p>
      </div>
    </section>
  );
}
