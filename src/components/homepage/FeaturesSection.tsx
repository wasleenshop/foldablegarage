'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FEATURES } from '@/lib/constants';

/**
 * Feature entry type from constants.
 */
type FeatureEntry = (typeof FEATURES)[number];

/**
 * Section 6 — Feature cards with spec lists and real product images.
 * 5 cards showcasing key product benefits.
 */

const FEATURE_IMAGES: Record<string, string> = {
  'precision-rail': '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas.webp',
  'heavy-duty-roller': '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-2.webp',
  'pvdf-coating': '/images/foldable-carport-color-selection-guide-by-wasleen-pergolas.webp',
  'polycarbonate-panels': '/images/foldable-carport-material-choice-by-wasleen-pergolas.webp',
  'smart-automation': '/images/retractable-carport-aluminium-alloy-by-wasleen-pergolas.webp',
};

const FEATURE_DESCRIPTIONS: Record<string, string> = {
  'precision-rail':
    'Our precision rail system ensures smooth, silent operation for decades. Manufactured from 6063-T5 aluminium, each rail is anodised for maximum corrosion resistance in the UAE coastal climate.',
  'heavy-duty-roller':
    'Built to withstand heavy daily use, our roller assembly features sealed ball bearings rated to 500 kg each and self-lubricating polymer bushings for maintenance-free operation.',
  'pvdf-coating':
    'Using Kynar 500® PVDF resin, our coatings deliver 15+ years of colour retention without fading, chalking, or delamination — even under intense UAE sun exposure.',
  'polycarbonate-panels':
    '6mm twin-wall polycarbonate panels offer 99.9% UV protection while diffusing natural light. 50 times more impact-resistant than glass, they provide safety and comfort.',
  'smart-automation':
    'Control your foldable garage from anywhere. Remote operation, rain and heat sensors, and smartphone app compatibility make daily use effortless.',
};

export function FeaturesSection() {
  return (
    <section className="relative bg-bg-primary py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Engineered for the UAE"
          subtitle="Every detail, from material selection to thermal performance, is optimised for the region's climate."
          align="center"
        />

        <div className="mt-12 space-y-16 md:mt-16 md:space-y-24">
          {FEATURES.map((feature, index) => {
            const f = feature as FeatureEntry;
            const isReversed = index % 2 === 1;
            const imageSrc = FEATURE_IMAGES[f.id];

            return (
              <motion.div
                key={f.id}
                className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-16 ${
                  isReversed ? 'md:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                {/* Feature image */}
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl border border-border-subtle bg-bg-card md:w-1/2">
                  <Image
                    src={imageSrc}
                    alt={`Wasleen ${f.title.toLowerCase()} — engineering detail and material quality`}
                    fill
                    className="object-cover transition-all duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="md:w-1/2">
                  <span className="text-xs font-medium uppercase tracking-widest text-accent-gold">
                    Feature {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-sans text-[clamp(1.25rem,2vw,1.75rem)] font-semibold text-text-primary">
                    {f.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-text-secondary">
                    {FEATURE_DESCRIPTIONS[f.id] || ''}
                  </p>

                  {/* Specs */}
                  {f.specs && f.specs.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {f.specs.map((spec) => (
                        <li
                          key={spec}
                          className="flex items-start gap-3 text-sm text-text-secondary"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gold" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
