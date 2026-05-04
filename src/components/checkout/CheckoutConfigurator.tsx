'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { SwatchCircle } from '@/components/ui/SwatchCircle';
import { COLOURS, PRICING, DIMENSIONS } from '@/lib/constants';
import { calculatePrice, formatPrice } from '@/lib/utils';
import type { ProductConfig, RoofType, ColourOption } from '@/lib/types';

interface CheckoutConfiguratorProps {
  config: ProductConfig;
  onChange: (updated: Partial<ProductConfig>) => void;
}

/**
 * Single-page live configurator for the checkout page.
 * All controls visible at once — no steps, no wizard.
 * Price recalculates live on every change.
 */
export function CheckoutConfigurator({ config, onChange }: CheckoutConfiguratorProps) {
  const area = config.width * config.length;
  const roofRate =
    config.roofType === 'glass' ? PRICING.glassRate : PRICING.polycarbonateRate;
  const totalPrice = calculatePrice(config);

  const handleWidthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ width: parseFloat(e.target.value) });
    },
    [onChange]
  );

  const handleLengthChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ length: parseFloat(e.target.value) });
    },
    [onChange]
  );

  const handleRoofTypeChange = useCallback(
    (type: RoofType) => {
      onChange({ roofType: type });
    },
    [onChange]
  );

  const handleColourChange = useCallback(
    (colour: ColourOption) => {
      onChange({ colour });
    },
    [onChange]
  );

  const toggleOption = useCallback(
    (key: 'hasAutomaticSystem' | 'hasRollerShutter' | 'hasGlassTint') => {
      onChange({ [key]: !config[key] });
    },
    [onChange, config]
  );

  // Calculate line items for breakdown
  const lineItems: { label: string; amount: string }[] = [
    {
      label: `Base (${config.width}×${config.length}m = ${area} sqm)`,
      amount: formatPrice(area * roofRate),
    },
  ];

  if (config.hasAutomaticSystem) {
    lineItems.push({
      label: 'Automatic System',
      amount: `+${formatPrice(PRICING.automaticSystemPrice)}`,
    });
  }

  if (config.hasRollerShutter) {
    lineItems.push({
      label: 'Roller Shutter',
      amount: `+${formatPrice(PRICING.rollerShutterPrice)}`,
    });
  }

  if (config.hasGlassTint && config.roofType === 'glass') {
    lineItems.push({
      label: 'Glass Tint',
      amount: `+${formatPrice(area * PRICING.glassTintRate)}`,
    });
  }

  return (
    <div className="space-y-8">
      {/* Product Title + Price */}
      <div>
        <h2 className="font-sans text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-tight text-text-primary">
          Foldable Premium Garage
        </h2>
        <p className="mt-1 text-sm text-text-tertiary">
          SKU: WFG-{config.width}x{config.length}-{config.roofType === 'glass' ? 'GL' : 'PC'}
        </p>
      </div>

      {/* ── Dimensions Section ── */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-tertiary">
          Dimensions
        </h3>

        {/* Width Slider */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm text-text-secondary">Width</label>
            <span className="font-sans text-lg font-bold text-accent-gold">
              {config.width}m
            </span>
          </div>
          <input
            type="range"
            min={DIMENSIONS.minWidth}
            max={DIMENSIONS.maxWidth}
            step={DIMENSIONS.step}
            value={config.width}
            onChange={handleWidthChange}
            className="slider-gold w-full"
            aria-label={`Width: ${config.width} meters`}
          />
          <div className="mt-1 flex justify-between text-xs text-text-tertiary">
            <span>{DIMENSIONS.minWidth}m</span>
            <span>{DIMENSIONS.maxWidth}m</span>
          </div>
        </div>

        {/* Length Slider */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="text-sm text-text-secondary">Length</label>
            <span className="font-sans text-lg font-bold text-accent-gold">
              {config.length}m
            </span>
          </div>
          <input
            type="range"
            min={DIMENSIONS.minLength}
            max={DIMENSIONS.maxLength}
            step={DIMENSIONS.step}
            value={config.length}
            onChange={handleLengthChange}
            className="slider-gold w-full"
            aria-label={`Length: ${config.length} meters`}
          />
          <div className="mt-1 flex justify-between text-xs text-text-tertiary">
            <span>{DIMENSIONS.minLength}m</span>
            <span>{DIMENSIONS.maxLength}m</span>
          </div>
        </div>
      </motion.div>

      {/* ── Roof & Colour Section ── */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* Roof Type Toggle */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
            Roof Type
          </h3>
          <div className="flex gap-3">
            {(['polycarbonate', 'glass'] as RoofType[]).map((type) => {
              const isActive = config.roofType === type;
              return (
                <button
                  key={type}
                  onClick={() => handleRoofTypeChange(type)}
                  className={`flex-1 rounded-xl border px-4 py-3 text-center text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'border-accent-gold bg-accent-gold/10 text-accent-gold shadow-sm shadow-accent-gold/10'
                      : 'border-border-subtle bg-bg-card/50 text-text-secondary hover:border-text-tertiary'
                  }`}
                >
                  {type === 'polycarbonate' ? 'PC Panel' : 'Glass Panel'}
                  <span className="mt-0.5 block text-xs font-normal text-text-tertiary">
                    {type === 'polycarbonate'
                      ? `${formatPrice(PRICING.polycarbonateRate)}/sqm`
                      : `${formatPrice(PRICING.glassRate)}/sqm`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Colour Selector */}
        <div>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-tertiary">
            Frame Colour
          </h3>
          <div className="flex flex-wrap gap-3">
            {COLOURS.map((colour) => (
              <SwatchCircle
                key={colour.id}
                colour={colour.hex}
                name={colour.name}
                selected={config.colour === colour.id}
                onClick={() => handleColourChange(colour.id)}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Options Section ── */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-tertiary">
          Additional Options
        </h3>

        {/* Auto System */}
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border-subtle bg-bg-card/50 p-4 transition-all hover:border-accent-gold/30">
          <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
            <input
              type="checkbox"
              checked={config.hasAutomaticSystem}
              onChange={() => toggleOption('hasAutomaticSystem')}
              className="peer sr-only"
            />
            <div className="h-5 w-5 rounded-md border border-border-subtle bg-transparent transition-all peer-checked:border-accent-gold peer-checked:bg-accent-gold/20" />
            {config.hasAutomaticSystem && (
              <svg className="absolute h-3 w-3 text-accent-gold" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <span className="block text-sm font-medium text-text-primary">Automatic System</span>
            <span className="block text-xs text-text-tertiary">Remote control + smartphone app</span>
          </div>
          <span className="text-sm font-semibold text-accent-gold">
            +{formatPrice(PRICING.automaticSystemPrice)}
          </span>
        </label>

        {/* Roller Shutter */}
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border-subtle bg-bg-card/50 p-4 transition-all hover:border-accent-gold/30">
          <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
            <input
              type="checkbox"
              checked={config.hasRollerShutter}
              onChange={() => toggleOption('hasRollerShutter')}
              className="peer sr-only"
            />
            <div className="h-5 w-5 rounded-md border border-border-subtle bg-transparent transition-all peer-checked:border-accent-gold peer-checked:bg-accent-gold/20" />
            {config.hasRollerShutter && (
              <svg className="absolute h-3 w-3 text-accent-gold" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <span className="block text-sm font-medium text-text-primary">Roller Shutter</span>
            <span className="block text-xs text-text-tertiary">Aluminium electric rolling shutter door</span>
          </div>
          <span className="text-sm font-semibold text-accent-gold">
            +{formatPrice(PRICING.rollerShutterPrice)}
          </span>
        </label>

        {/* Glass Tint (only for glass roof) */}
        {config.roofType === 'glass' && (
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border-subtle bg-bg-card/50 p-4 transition-all hover:border-accent-gold/30">
            <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
              <input
                type="checkbox"
                checked={config.hasGlassTint}
                onChange={() => toggleOption('hasGlassTint')}
                className="peer sr-only"
              />
              <div className="h-5 w-5 rounded-md border border-border-subtle bg-transparent transition-all peer-checked:border-accent-gold peer-checked:bg-accent-gold/20" />
              {config.hasGlassTint && (
                <svg className="absolute h-3 w-3 text-accent-gold" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div className="flex-1">
              <span className="block text-sm font-medium text-text-primary">Glass Tint</span>
              <span className="block text-xs text-text-tertiary">UV-reducing tint for glass panels</span>
            </div>
            <span className="text-sm font-semibold text-accent-gold">
              +{formatPrice(area * PRICING.glassTintRate)}
            </span>
          </label>
        )}
      </motion.div>

      {/* ── Price Breakdown ── */}
      <motion.div
        className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        {/* Shimmer line */}
        <div className="pointer-events-none absolute -inset-x-full top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent animate-[shimmerSlide_3s_ease-in-out_infinite]" />

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
                <span className="text-text-primary">{item.amount}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-border-subtle pt-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-semibold text-text-primary">
                Total
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
    </div>
  );
}
