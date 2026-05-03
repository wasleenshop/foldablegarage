'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export function AboutCTA() {
  return (
    <section className="relative bg-bg-primary py-20 md:py-24">
      {/* Background gradient */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-1/2 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-accent-gold/5 blur-[120px]" />
        <div className="absolute -right-1/2 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-accent-cyan/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto max-w-[700px] text-center"
        >
          {/* Decorative line */}
          <div className="mx-auto mb-8 h-px w-16 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />

          <h2 className="font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.1] text-text-primary">
            Ready to Work{' '}
            <span className="gold-gradient">With Us?</span>
          </h2>

          <p className="mt-6 text-[clamp(0.875rem,1vw,1rem)] leading-relaxed text-text-secondary">
            Whether you're planning a new installation, need a custom size,
            or simply want to learn more about our foldable garage solutions,
            our team is here to help. Get in touch and we'll guide you
            through every step.
          </p>

          {/* Contact options */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Contact Us
              </Button>
            </Link>
            <Link href="/quote">
              <Button variant="outline" size="lg">
                Get a Free Quote
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-text-tertiary">
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-success"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Free Site Survey
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-success"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              Same-Day Response
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-success"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              UAE-Wide Installation
            </span>
            <span className="flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-success"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              5-Year Warranty
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
