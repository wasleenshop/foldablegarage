'use client';

import { motion } from 'framer-motion';
import { DIMENSIONS, PRICING } from '@/lib/constants';
import { formatPrice, calculatePrice } from '@/lib/utils';
import { pushGTMEvent } from '@/lib/gtm';
import type { ProductConfig, RoofType } from '@/lib/types';

interface StepSizeAndRoofProps {
  config: ProductConfig;
  onUpdate: (updates: Partial<ProductConfig>) => void;
  onNext: () => void;
}

/**
 * Step 1 of the quote configurator.
 * Select width, length, and roof type (polycarbonate or glass).
 */
export function StepSizeAndRoof({ config, onUpdate, onNext }: StepSizeAndRoofProps) {
  const { minWidth, maxWidth, minLength, maxLength, step } = DIMENSIONS;

  // Generate dimension options
  const widthOptions: number[] = [];
  for (let w = minWidth; w <= maxWidth; w += step) {
    widthOptions.push(w);
  }
  const lengthOptions: number[] = [];
  for (let l = minLength; l <= maxLength; l += step) {
    lengthOptions.push(l);
  }

  const area = config.width * config.length;
  const partialPrice = calculatePrice(config);

  const handleRoofSelect = (type: RoofType) => {
    onUpdate({ roofType: type });
    pushGTMEvent('type_selected', { roofType: type });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      {/* Width selector */}
      <div>
        <label className="mb-3 block text-sm font-medium text-text-secondary">
          Width: <span className="text-text-primary">{config.width}m</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {widthOptions.map((w) => (
            <button
              key={w}
              onClick={() => onUpdate({ width: w })}
              className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                config.width === w
                  ? 'border-accent-gold bg-accent-gold/10 text-accent-gold'
                  : 'border-border-subtle text-text-secondary hover:border-text-tertiary hover:text-text-primary'
              }`}
            >
              {w}m
            </button>
          ))}
        </div>
      </div>

      {/* Length selector */}
      <div>
        <label className="mb-3 block text-sm font-medium text-text-secondary">
          Length: <span className="text-text-primary">{config.length}m</span>
        </label>
        <div className="flex max-h-[200px] flex-wrap gap-2 overflow-y-auto">
          {lengthOptions.map((l) => (
            <button
              key={l}
              onClick={() => onUpdate({ length: l })}
              className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                config.length === l
                  ? 'border-accent-gold bg-accent-gold/10 text-accent-gold'
                  : 'border-border-subtle text-text-secondary hover:border-text-tertiary hover:text-text-primary'
              }`}
            >
              {l}m
            </button>
          ))}
        </div>
      </div>

      {/* Roof type selection */}
      <div>
        <label className="mb-3 block text-sm font-medium text-text-secondary">
          Roof Material
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleRoofSelect('polycarbonate')}
            className={`rounded-xl border p-5 text-left transition-all ${
              config.roofType === 'polycarbonate'
                ? 'border-accent-gold bg-accent-gold/5'
                : 'border-border-subtle bg-bg-card hover:border-text-tertiary'
            }`}
          >
            <span className="mb-2 block text-2xl">💎</span>
            <span className="block text-sm font-semibold text-text-primary">
              Polycarbonate
            </span>
            <span className="mt-1 block text-xs text-text-tertiary">
              {formatPrice(PRICING.polycarbonateRate)}/sqm
            </span>
            <span className="mt-1 block text-xs text-text-tertiary">
              99.9% UV block · Impact resistant
            </span>
          </button>
          <button
            onClick={() => handleRoofSelect('glass')}
            className={`rounded-xl border p-5 text-left transition-all ${
              config.roofType === 'glass'
                ? 'border-accent-gold bg-accent-gold/5'
                : 'border-border-subtle bg-bg-card hover:border-text-tertiary'
            }`}
          >
            <span className="mb-2 block text-2xl">🪟</span>
            <span className="block text-sm font-semibold text-text-primary">
              Glass
            </span>
            <span className="mt-1 block text-xs text-text-tertiary">
              {formatPrice(PRICING.glassRate)}/sqm
            </span>
            <span className="mt-1 block text-xs text-text-tertiary">
              Premium finish · Natural light
            </span>
          </button>
        </div>
      </div>

      {/* Area & price preview */}
      <div className="rounded-xl border border-border-subtle bg-bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-text-secondary">Coverage Area</p>
            <p className="font-sans text-lg font-semibold text-text-primary">
              {area} sqm
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-text-secondary">Est. Price</p>
            <p className="font-sans text-lg font-bold text-accent-gold">
              {formatPrice(partialPrice)}
            </p>
          </div>
        </div>
      </div>

      {/* Next button */}
      <button
        onClick={onNext}
        className="w-full rounded-xl bg-accent-gold py-3.5 text-center font-semibold text-black transition-colors hover:bg-accent-gold-hover"
      >
        Continue — Choose Colour & Options
      </button>
    </motion.div>
  );
}
