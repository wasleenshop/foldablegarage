'use client';

import { motion } from 'framer-motion';
import { calculatePrice, formatPrice } from '@/lib/utils';
import { PRICING } from '@/lib/constants';
import type { ProductConfig, ColourOption, RoofType } from '@/lib/types';

interface PriceSummaryProps {
  config: ProductConfig;
  compact?: boolean;
}

/**
 * Real-time price summary displayed in the quote configurator.
 * Shows area breakdown, options selected, and total price.
 */
export function PriceSummary({ config, compact = false }: PriceSummaryProps) {
  const totalPrice = calculatePrice(config);
  const area = config.width * config.length;
  const roofRate =
    config.roofType === 'glass' ? PRICING.glassRate : PRICING.polycarbonateRate;

  const lineItems = [
    {
      label: `Base (${config.width}×${config.length}m = ${area} sqm)`,
      detail: `${formatPrice(area * roofRate)}`,
      highlight: false,
    },
  ];

  if (config.hasAutomaticSystem) {
    lineItems.push({
      label: 'Automatic System',
      detail: `+${formatPrice(PRICING.automaticSystemPrice)}`,
      highlight: false,
    });
  }

  if (config.hasRollerShutter) {
    lineItems.push({
      label: 'Roller Shutter',
      detail: `+${formatPrice(PRICING.rollerShutterPrice)}`,
      highlight: false,
    });
  }

  if (config.hasGlassTint && config.roofType === 'glass') {
    lineItems.push({
      label: 'Glass Tint',
      detail: `+${formatPrice(area * PRICING.glassTintRate)}`,
      highlight: false,
    });
  }

  if (compact) {
    return (
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
        {/* Subtle gradient shimmer */}
        <div className="pointer-events-none absolute -inset-x-full top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent animate-[shimmerSlide_3s_ease-in-out_infinite]" />
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm text-text-secondary">Estimated Total</span>
          <span className="font-sans text-xl font-bold text-accent-gold">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <p className="text-xs text-text-tertiary">
          {config.roofType === 'glass' ? 'Glass' : 'Polycarbonate'} ·{' '}
          {config.width}×{config.length}m · {area} sqm
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Animated gradient border — rotating conic border */}
      <div className="pointer-events-none absolute inset-0 rounded-xl">
        <div className="absolute -inset-[1px] animate-[gradientOrbRotate_6s_linear_infinite] rounded-xl opacity-40"
          style={{
            background: 'conic-gradient(from var(--angle, 0deg), transparent 35%, var(--color-accent-gold) 45%, var(--color-accent-cyan) 55%, var(--color-accent-violet) 65%, transparent 75%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '1px',
          }}
        />
      </div>

      {/* Shimmer line */}
      <div className="pointer-events-none absolute -inset-x-full top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent animate-[shimmerSlide_3s_ease-in-out_infinite]" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-accent-gold/5 blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-accent-cyan/5 blur-[60px]" />

      <div className="relative z-10">
        <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
          Price Breakdown
        </h4>

        <div className="space-y-3">
          {lineItems.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-text-secondary">{item.label}</span>
              <span className="text-text-primary">{item.detail}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-border-subtle pt-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-text-primary">
              Estimated Total
            </span>
            <span className="font-sans text-2xl font-bold gold-gradient">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <p className="mt-1 text-xs text-text-tertiary">
            *Final price may vary based on site assessment
          </p>
        </div>
      </div>
    </motion.div>
  );
}
