'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { PRICING_TIERS } from '@/lib/constants';
import { pushGTMEvent } from '@/lib/gtm';

type PricingTier = {
  readonly id: string;
  readonly title: string;
  readonly priceFrom: string;
  readonly popular?: boolean;
  readonly features: readonly string[];
};

/**
 * Section 5 — Pricing tiers (Manual / Smart / Commercial).
 */
export function PricingSection() {
  const handleCtaClick = (tierId: string) => {
    pushGTMEvent('quote_started', { source: 'pricing_tier', tier: tierId });
  };

  return (
    <section className="relative bg-bg-secondary py-20 md:py-24 overflow-hidden">
      {/* Subtle divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent" />

      {/* Animated 3D Foldable Mechanism Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Foldable panels sliding in isometric style */}
        <div className="absolute inset-0 opacity-[0.06]">
          {/* Panel 1 — top moving left */}
          <div
            className="absolute top-[15%] left-1/2 h-[30%] w-[40%] -translate-x-1/2 rounded-sm border border-accent-cyan/30 bg-accent-cyan/5"
            style={{
              transform: 'skewX(-35deg) scaleY(0.6)',
              animation: 'foldableSlideLeft 8s ease-in-out infinite',
            }}
          />
          {/* Panel 2 — middle moving right */}
          <div
            className="absolute top-[35%] left-1/2 h-[30%] w-[40%] -translate-x-1/2 rounded-sm border border-accent-gold/30 bg-accent-gold/5"
            style={{
              transform: 'skewX(-35deg) scaleY(0.6)',
              animation: 'foldableSlideRight 8s ease-in-out infinite 0.5s',
            }}
          />
          {/* Panel 3 — bottom moving left */}
          <div
            className="absolute top-[55%] left-1/2 h-[30%] w-[40%] -translate-x-1/2 rounded-sm border border-accent-violet/30 bg-accent-violet/5"
            style={{
              transform: 'skewX(-35deg) scaleY(0.6)',
              animation: 'foldableSlideLeft 8s ease-in-out infinite 1s',
            }}
          />
        </div>

        {/* Laser scan lines */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-accent-cyan to-transparent"
            style={{ animation: 'foldableScan 4s linear infinite', top: '0%' }}
          />
        </div>

        {/* Isometric grid dots */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Choose Your Configuration"
          subtitle="From manual retraction to full automation — select the system that matches your lifestyle."
          align="center"
        />

        <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
          {PRICING_TIERS.map((tier, index) => {
            const t = tier as PricingTier;
            return (
            <motion.div
              key={t.id}
              className={`group relative flex flex-col rounded-2xl border p-8 transition-all duration-300 ${
                t.popular
                  ? 'border-accent-gold bg-gradient-to-b from-bg-card to-bg-primary shadow-xl shadow-accent-gold/10'
                  : 'border-border-subtle bg-bg-card hover:border-accent-gold/40'
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -4 }}
            >
              {/* Popular badge */}
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-block rounded-full bg-accent-gold px-4 py-1 text-xs font-semibold uppercase tracking-wider text-black">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier header */}
              <div className="mb-6">
                <h3 className="font-sans text-[clamp(1.25rem,2vw,1.75rem)] font-semibold text-text-primary">
                  {t.title}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-sm text-text-tertiary">From</span>
                  <span className="font-sans text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-accent-gold">
                    AED {t.priceFrom}
                  </span>
                </div>
                <p className="mt-1 text-xs text-text-tertiary">+ installation</p>
              </div>

              {/* Divider */}
              <div className="mb-6 h-px bg-gradient-to-r from-border-subtle to-transparent" />

              {/* Features */}
              <ul className="mb-8 flex-1 space-y-3">
                {t.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="mt-0.5 shrink-0 text-accent-gold"
                    >
                      <path
                        d="M13.333 4L6 11.333L2.667 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={t.popular ? 'primary' : 'outline'}
                size="lg"
                href="/quote"
                className="w-full"
                onClick={() => handleCtaClick(t.id)}
              >
                Get a Quote
              </Button>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
