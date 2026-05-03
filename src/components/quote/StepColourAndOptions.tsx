'use client';

import { motion } from 'framer-motion';
import { COLOURS, PRICING } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { pushGTMEvent } from '@/lib/gtm';
import type { ProductConfig, ColourOption } from '@/lib/types';

interface StepColourAndOptionsProps {
  config: ProductConfig;
  onUpdate: (updates: Partial<ProductConfig>) => void;
  onNext: () => void;
  onBack: () => void;
}

/**
 * Step 2 of the quote configurator.
 * Select colour, automatic system, roller shutter, and glass tint.
 */
export function StepColourAndOptions({
  config,
  onUpdate,
  onNext,
  onBack,
}: StepColourAndOptionsProps) {
  const area = config.width * config.length;

  const handleColourSelect = (colour: ColourOption) => {
    onUpdate({ colour });
    pushGTMEvent('colour_selected', { colour });
  };

  const options = [
    {
      id: 'hasAutomaticSystem' as const,
      label: 'Automatic Retraction System',
      description: 'Motorised operation with remote control',
      price: PRICING.automaticSystemPrice,
      selected: config.hasAutomaticSystem,
    },
    {
      id: 'hasRollerShutter' as const,
      label: 'Roller Shutter Side Panels',
      description: 'Enclosed sides for maximum security',
      price: PRICING.rollerShutterPrice,
      selected: config.hasRollerShutter,
    },
    {
      id: 'hasGlassTint' as const,
      label: 'Glass Tint Coating',
      description: 'Privacy and heat reduction (glass only)',
      price: area * PRICING.glassTintRate,
      selected: config.hasGlassTint,
      disabled: config.roofType !== 'glass',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      {/* Colour selection */}
      <div>
        <label className="mb-3 block text-sm font-medium text-text-secondary">
          Choose Your Colour
        </label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {COLOURS.map((colour) => (
            <button
              key={colour.id}
              onClick={() => handleColourSelect(colour.id as ColourOption)}
              className={`group relative flex items-center gap-4 overflow-hidden rounded-xl border p-4 text-left backdrop-blur-sm transition-all ${
                config.colour === colour.id
                  ? 'border-accent-gold bg-accent-gold/5'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              {/* Animated glow ring behind the swatch */}
              <span className="pointer-events-none absolute -inset-1 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="absolute inset-0 animate-[pulseGlowSlow_3s_ease-in-out_infinite] rounded-xl bg-gradient-to-r from-accent-gold/10 via-accent-cyan/10 to-accent-violet/10 blur-sm" />
              </span>

              {/* Colour swatch with animated border glow */}
              <span className="relative">
                <span
                  className="relative block h-10 w-10 shrink-0 rounded-lg border border-border-subtle transition-shadow duration-500 group-hover:shadow-[0_0_12px_rgba(201,168,76,0.3)]"
                  style={{ backgroundColor: colour.hex }}
                />
                {/* Animated corner sparkle on hover */}
                <span className="pointer-events-none absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent-cyan/0 transition-all duration-500 group-hover:bg-accent-cyan/40 group-hover:animate-ping" />
              </span>
              <div className="min-w-0 flex-1">
                <span className="block text-sm font-medium text-text-primary">
                  {colour.name}
                </span>
                <span className="mt-0.5 block text-xs text-text-tertiary truncate">
                  {colour.description}
                </span>
              </div>
              {config.colour === colour.id && (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="shrink-0 text-accent-gold"
                >
                  <path
                    d="M15 4.5L6.75 12.75L3 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Optional upgrades */}
      <div>
        <label className="mb-3 block text-sm font-medium text-text-secondary">
          Optional Upgrades
        </label>
        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                if (!option.disabled) {
                  onUpdate({ [option.id]: !option.selected });
                }
              }}
              disabled={option.disabled}
              className={`flex w-full items-center justify-between rounded-xl border p-4 text-left backdrop-blur-sm transition-all ${
                option.disabled
                  ? 'cursor-not-allowed border-white/10 opacity-40'
                  : option.selected
                  ? 'border-accent-gold bg-accent-gold/5'
                  : 'border-white/10 bg-white/[0.02] hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Checkbox */}
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded border ${
                    option.selected
                      ? 'border-accent-gold bg-accent-gold'
                      : 'border-border-subtle bg-transparent'
                  } transition-colors`}
                >
                  {option.selected && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                    >
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                  )}
                </span>
                <div>
                  <span className="block text-sm font-medium text-text-primary">
                    {option.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-text-tertiary">
                    {option.description}
                  </span>
                </div>
              </div>
              <span className="text-sm font-medium text-accent-gold">
                +{formatPrice(option.price)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] py-3.5 text-center font-medium text-text-secondary backdrop-blur-sm transition-colors hover:border-white/20"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="flex-[2] rounded-xl bg-accent-gold py-3.5 text-center font-semibold text-black transition-colors hover:bg-accent-gold-hover"
        >
          Continue — Personal Details
        </button>
      </div>
    </motion.div>
  );
}
