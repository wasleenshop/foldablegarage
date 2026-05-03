'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * About page hero with workshop image and brand introduction.
 */
export function AboutHero() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-bg-primary pt-24 md:min-h-[70vh]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/foldable-and-retractable-carport-engineering-specification-drawing-by-wasleen-pergolas.webp"
          alt="Wasleen Pergolas workshop and engineering facility"
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary/80 via-bg-primary/60 to-bg-primary" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[800px] px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="inline-block rounded-full border border-accent-gold/20 bg-accent-gold/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-accent-gold">
            About Wasleen
          </span>

          <h1 className="mt-6 font-sans text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.05] text-text-primary">
            Engineered in Dubai.{' '}
            <span className="bg-gradient-to-r from-accent-gold to-accent-gold-hover bg-clip-text text-transparent">
              Built for the UAE.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary md:text-lg">
            Since our founding, Wasleen has been redefining what a carport can be — 
            combining architectural-grade materials with precision engineering to create 
            retractable structures that protect, enhance, and inspire.
          </p>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </section>
  );
}
