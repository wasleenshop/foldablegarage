'use client';

import { useState, useCallback } from 'react';
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
 * Select width, length (manual text input), and roof type (polycarbonate or glass).
 */
export function StepSizeAndRoof({ config, onUpdate, onNext }: StepSizeAndRoofProps) {
  const { minWidth, maxWidth, minLength, maxLength, step } = DIMENSIONS;

  const [widthInput, setWidthInput] = useState(String(config.width));
  const [lengthInput, setLengthInput] = useState(String(config.length));
  const [widthError, setWidthError] = useState('');
  const [lengthError, setLengthError] = useState('');

  // Only enforces minimum — no max cap
  const sanitiseDimension = useCallback((value: string, min: number): number | null => {
    const num = parseFloat(value);
    if (isNaN(num)) return null;
    // Round to nearest step
    const rounded = Math.round(num / step) * step;
    return Math.max(rounded, min);
  }, [step]);

  const handleWidthBlur = useCallback(() => {
    const sanitised = sanitiseDimension(widthInput, minWidth);
    if (sanitised === null) {
      setWidthError('Please enter a valid number');
      return;
    }
    if (sanitised < minWidth) {
      setWidthError(`Minimum width is ${minWidth}m`);
      return;
    }
    setWidthError('');
    setWidthInput(String(sanitised));
    onUpdate({ width: sanitised });
  }, [widthInput, minWidth, sanitiseDimension, onUpdate]);

  const handleLengthBlur = useCallback(() => {
    const sanitised = sanitiseDimension(lengthInput, minLength);
    if (sanitised === null) {
      setLengthError('Please enter a valid number');
      return;
    }
    if (sanitised < minLength) {
      setLengthError(`Minimum length is ${minLength}m`);
      return;
    }
    setLengthError('');
    setLengthInput(String(sanitised));
    onUpdate({ length: sanitised });
  }, [lengthInput, minLength, sanitiseDimension, onUpdate]);

  const handleWidthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setWidthInput(e.target.value);
    if (widthError) setWidthError('');
  }, [widthError]);

  const handleLengthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLengthInput(e.target.value);
    if (lengthError) setLengthError('');
  }, [lengthError]);

  const handleWidthKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  }, []);

  const handleLengthKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  }, []);

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
      {/* Width input */}
      <div>
        <label className="mb-3 block text-sm font-medium text-text-secondary">
          Width (metres)
        </label>
        <div className="relative">
          <input
            type="number"
            step={step}
            min={minWidth}
            value={widthInput}
            onChange={handleWidthChange}
            onBlur={handleWidthBlur}
            onKeyDown={handleWidthKeyDown}
            placeholder={`Min. ${minWidth}m`}
            className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-lg font-semibold text-text-primary placeholder:text-text-tertiary/50 backdrop-blur-sm transition-all focus:outline-none ${
              widthError
                ? 'border-error ring-1 ring-error/20'
                : 'border-white/10 focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20'
            }`}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-text-tertiary">
            metres
          </span>
        </div>
        {widthError && (
          <p className="mt-1.5 text-xs text-error flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 3.5v3M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {widthError}
          </p>
        )}
        <p className="mt-1.5 text-xs text-text-tertiary">
          Min. {minWidth}m ({step}m increments)
        </p>
      </div>

      {/* Length input */}
      <div>
        <label className="mb-3 block text-sm font-medium text-text-secondary">
          Length (metres)
        </label>
        <div className="relative">
          <input
            type="number"
            step={step}
            min={minLength}
            value={lengthInput}
            onChange={handleLengthChange}
            onBlur={handleLengthBlur}
            onKeyDown={handleLengthKeyDown}
            placeholder={`Min. ${minLength}m`}
            className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-lg font-semibold text-text-primary placeholder:text-text-tertiary/50 backdrop-blur-sm transition-all focus:outline-none ${
              lengthError
                ? 'border-error ring-1 ring-error/20'
                : 'border-white/10 focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20'
            }`}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-text-tertiary">
            metres
          </span>
        </div>
        {lengthError && (
          <p className="mt-1.5 text-xs text-error flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
              <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M6 3.5v3M6 8v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            {lengthError}
          </p>
        )}
        <p className="mt-1.5 text-xs text-text-tertiary">
          Min. {minLength}m ({step}m increments)
        </p>
      </div>

      {/* Roof type selection */}
      <div>
        <label className="mb-3 block text-sm font-medium text-text-secondary">
          Roof Material
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleRoofSelect('polycarbonate')}
            className={`rounded-xl border p-5 text-left transition-all backdrop-blur-sm ${
              config.roofType === 'polycarbonate'
                ? 'border-accent-gold bg-accent-gold/5'
                : 'border-white/10 bg-white/[0.02] hover:border-white/20'
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
            className={`rounded-xl border p-5 text-left transition-all backdrop-blur-sm ${
              config.roofType === 'glass'
                ? 'border-accent-gold bg-accent-gold/5'
                : 'border-white/10 bg-white/[0.02] hover:border-white/20'
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
      <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm">
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
