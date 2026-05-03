'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { KineticBackground } from './KineticBackground';
import { HeroText } from './HeroText';
import { Button } from '@/components/ui/Button';
import { pushGTMEvent } from '@/lib/gtm';

/**
 * Section 1 — Full-screen hero with hero image background, kinetic lasers, staggered headline, and CTAs.
 */
export function HeroSection() {
  const handleQuoteClick = () => {
    pushGTMEvent('quote_started', { source: 'hero_cta' });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-primary">
      {/* Hero background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp"
          alt="Wasleen Foldable Premium Garage — Dubai installation showcasing retractable carport"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/80 via-bg-primary/60 to-bg-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-bg-primary/30" />
      </div>

      {/* Kinetic laser background overlay */}
      <div className="absolute inset-0 z-[1]">
        <KineticBackground />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-transparent via-transparent to-bg-primary/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 text-center md:px-6 lg:px-8">
        {/* Headline */}
        <HeroText text="Intelligent Motion. Absolute Protection." />

        {/* Subheadline */}
        <motion.p
          className="mx-auto mt-6 max-w-2xl text-[clamp(0.875rem,1vw,1rem)] leading-relaxed text-text-secondary md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Architectural-grade retractable carports for the UAE — engineered from 6063-T5 aluminium with precision automation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <Button variant="primary" size="lg" href="/quote" onClick={handleQuoteClick}>
            Request a Consultation
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              document.getElementById('mechanism')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="mr-2">▶</span> Watch it Open
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
            Scroll to explore
          </span>
          <svg
            width="16"
            height="24"
            viewBox="0 0 16 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="animate-scroll-indicator text-text-tertiary"
          >
            <polyline points="8 16 14 10 8 4" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
}
