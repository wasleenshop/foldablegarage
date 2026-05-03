'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const TABS = [
  {
    id: 'structure',
    label: 'Structure',
    content: [
      ['Frame Material', 'Premium 6063-T5 aluminium alloy — the same grade used in architectural curtain walls and marine applications. Corrosion-resistant, lightweight, and structurally rated for UAE wind loads.'],
      ['Rail System', 'Precision-extruded aluminium rail with ±1mm tolerance. Anodised finish prevents corrosion. Self-lubricating polymer bushings ensure smooth, silent operation.'],
      ['Support Columns', 'Heavy-duty box-section aluminium columns anchored to reinforced concrete foundations. Designed to withstand 120 km/h wind loads as per Dubai Municipality standards.'],
    ],
  },
  {
    id: 'mechanism',
    label: 'Mechanism',
    content: [
      ['Retraction System', 'Three-panel foldable mechanism inspired by concertina folding. Panels glide on sealed ball-bearing rollers rated to 500 kg each. Manual operation requires minimal effort.'],
      ['Motor (Automatic)', 'SOMFY or equivalent tubular motor with 600N torque. Rated for 10,000+ cycles. Integrated rain and heat sensor for automatic closure in adverse weather.'],
      ['Control System', 'RF remote control with 50m range. Optional smartphone app integration for iOS/Android. Programmable auto-open/close schedules.'],
    ],
  },
  {
    id: 'finish',
    label: 'Finish',
    content: [
      ['PVDF Coating', 'Kynar 500® resin-based PVDF coating applied via electrostatic spray. 15-year no-fade warranty. UV-stable — retains >90% gloss after 10 years UAE sun exposure.'],
      ['Colour Options', '5 premium finishes: Bronze/Tea, Sapphire Blue, Light Smoke, Medium Smoke, Dark Charcoal. Each with UV-stable pigments and anti-chalking formulation.'],
      ['Anodised Components', 'Rail system and hardware are anodised per AA-M10C22-A31 / ISO 7599. Minimum 15μm coating thickness for maximum corrosion resistance.'],
    ],
  },
  {
    id: 'options',
    label: 'Options',
    content: [
      ['Roof Types', 'Choose between 6mm twin-wall polycarbonate (99.9% UV block, impact-resistant) or 8mm laminated safety glass (clear/tinted, superior optics, +20°C reduction).'],
      ['Glass Tinting', 'Black ceramic frit tinting for laminated glass option. Reduces interior temperature by up to 20°C. Available only with glass roof selection.'],
      ['Roller Shutter', 'Electric roller shutter for the open side of the carport. Provides additional security, privacy, and wind protection. 220V motor with remote control.'],
    ],
  },
];

/**
 * Technical details with tabbed accordion interface.
 * Each tab reveals a set of spec rows when selected.
 */
export function TechDetails() {
  const [activeTab, setActiveTab] = useState('structure');

  const activeData = TABS.find((t) => t.id === activeTab);

  return (
    <section className="relative bg-bg-primary py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Technical Details"
          subtitle="Precision engineering, documented in full transparency"
        />

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap gap-1 rounded-xl border border-border-subtle bg-bg-card p-1.5">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-accent-gold text-bg-primary shadow-lg'
                  : 'text-text-secondary hover:text-text-primary'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mt-8 space-y-6"
          >
            {activeData?.content.map(([title, description], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="group rounded-2xl border border-border-subtle bg-bg-card p-6 transition-all duration-300 hover:border-accent-gold/20"
              >
                <div className="flex items-start gap-4">
                  {/* Number */}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-gold/10 text-sm font-bold text-accent-gold">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-sans text-base font-semibold text-text-primary">
                      {title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
