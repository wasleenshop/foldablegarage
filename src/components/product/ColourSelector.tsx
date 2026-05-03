'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SwatchCircle } from '@/components/ui/SwatchCircle';
import { COLOURS, COLOUR_MAP } from '@/lib/constants';
import type { ColourOption } from '@/lib/types';

/**
 * Product colour selector — 5 swatches with large preview image.
 * Clicking a swatch transitions the preview to show that colour.
 */
export function ColourSelector() {
  const [selected, setSelected] = useState<ColourOption>('medium-smoke');
  const selectedColour = COLOUR_MAP[selected];

  return (
    <section className="relative bg-bg-secondary py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Choose Your Finish"
          subtitle="Five premium PVDF-coated colour options, each engineered for UAE sun durability"
        />

        <div className="mt-10 grid gap-8 md:grid-cols-2 md:gap-12">
          {/* ── Colour Preview ── */}
          <div className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-border-subtle bg-bg-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/foldable-carport-color-selection-guide-by-wasleen-pergolas.webp"
                  alt={`Wasleen Foldable Garage in ${selectedColour.name} finish`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Colour overlay hint */}
            <div className="absolute bottom-4 left-4 rounded-lg border border-border-subtle bg-bg-primary/80 px-4 py-2 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div
                  className="h-6 w-6 rounded-full border-2 border-border-subtle"
                  style={{ backgroundColor: selectedColour.hex }}
                />
                <div>
                  <p className="text-sm font-semibold text-text-primary">
                    {selectedColour.name}
                  </p>
                  <p className="text-xs text-text-tertiary">
                    {selectedColour.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Swatches ── */}
          <div className="flex flex-col justify-center">
            <h3 className="font-sans text-lg font-semibold text-text-primary">
              Available Finishes
            </h3>
            <p className="mt-1 text-sm text-text-tertiary">
              All colours feature Kynar 500® PVDF coating with 15-year no-fade warranty
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              {COLOURS.map((colour) => (
                <button
                  key={colour.id}
                  onClick={() => setSelected(colour.id as ColourOption)}
                  className="group flex flex-col items-center gap-2"
                >
                  <SwatchCircle
                    colour={colour.hex}
                    name={colour.name}
                    selected={selected === colour.id}
                    onClick={() => setSelected(colour.id as ColourOption)}
                  />
                  <span
                    className={`text-xs transition-colors ${
                      selected === colour.id
                        ? 'font-semibold text-accent-gold'
                        : 'text-text-tertiary group-hover:text-text-secondary'
                    }`}
                  >
                    {colour.name}
                  </span>
                </button>
              ))}
            </div>

            {/* Details */}
            <div className="mt-8 space-y-3 rounded-2xl border border-border-subtle bg-bg-card p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-gold/10">
                  <svg className="text-accent-gold" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 4v4l2.5 2.5" />
                  </svg>
                </div>
                <p className="text-sm text-text-secondary">
                  <span className="font-medium text-text-primary">15-Year No-Fade</span> — Kynar 500® PVDF coating
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-gold/10">
                  <svg className="text-accent-gold" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 1v14M1 8h14" />
                    <path d="M3 3l10 10M13 3L3 13" />
                  </svg>
                </div>
                <p className="text-sm text-text-secondary">
                  <span className="font-medium text-text-primary">UV-Stable Pigments</span> — tested to ASTM D4587
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-gold/10">
                  <svg className="text-accent-gold" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="4" width="12" height="10" rx="1" />
                    <path d="M5 4V3a3 3 0 016 0v1" />
                  </svg>
                </div>
                <p className="text-sm text-text-secondary">
                  <span className="font-medium text-text-primary">Anti-Corrosion</span> — salt spray tested per ASTM B117
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
