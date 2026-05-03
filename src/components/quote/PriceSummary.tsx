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
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
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
      className="rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
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
          <span className="font-sans text-2xl font-bold text-accent-gold">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <p className="mt-1 text-xs text-text-tertiary">
          *Final price may vary based on site assessment
        </p>
      </div>
    </motion.div>
  );
}
