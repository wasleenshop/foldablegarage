'use client';

import { motion } from 'framer-motion';

/**
 * Full-width autoplay product video with no visible controls.
 * Sits between the configurator and the features/specs sections.
 */
export function QuoteProductVideo() {
  return (
    <section className="relative bg-bg-primary py-12 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-8 text-center"
        >
          <span className="mb-3 inline-block rounded-full border border-accent-cyan/20 bg-accent-cyan/5 px-3 py-1 text-xs font-medium tracking-wider uppercase text-accent-cyan">
            See It in Action
          </span>
          <h2 className="text-2xl font-semibold text-text-primary md:text-3xl">
            Watch the{' '}
            <span className="bg-gradient-to-r from-accent-gold to-accent-gold-hover bg-clip-text text-transparent">
              Wasleen Foldable Garage
            </span>{' '}
            in Motion
          </h2>
        </motion.div>

        {/* Video container — full view width with subtle glass edges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.15 }}
          className="relative mx-auto overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl"
        >
          {/* Top accent shimmer */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent" />

          {/* Ambient glow */}
          <div className="pointer-events-none absolute -left-20 -top-20 z-0 h-40 w-40 rounded-full bg-accent-cyan/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 z-0 h-40 w-40 rounded-full bg-accent-gold/10 blur-[80px]" />

          <video
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            className="relative z-[1] block h-auto w-full"
            style={{ aspectRatio: '16 / 9' }}
          >
            <source
              src="/videos/foldable-garage-hero-product-video.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Bottom gradient fade */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-12 bg-gradient-to-t from-bg-primary to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
