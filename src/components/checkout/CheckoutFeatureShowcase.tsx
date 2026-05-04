'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

const CHECKOUT_FEATURES = [
  {
    id: 'precision-rail',
    title: 'Precision Rail System',
    description:
      'Our precision rail system ensures smooth, silent operation for decades. Manufactured from 6063-T5 aluminium, each rail is anodised for maximum corrosion resistance in the UAE coastal climate.',
    specs: ['6063-T5 aluminium rail', 'Anodised corrosion-resistant finish', '±1mm precision tolerance'],
    image: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas.webp',
  },
  {
    id: 'heavy-duty-roller',
    title: 'Heavy-Duty Roller Assembly',
    description:
      'Built to withstand heavy daily use, our roller assembly features sealed ball bearings rated to 500 kg each and self-lubricating polymer bushings for maintenance-free operation.',
    specs: ['Sealed ball bearings', 'Load-rated to 500 kg per roller', 'Self-lubricating polymer bushings'],
    image: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-2.webp',
  },
  {
    id: 'pvdf-coating',
    title: 'PVDF Fluorocarbon Coating',
    description:
      'Using Kynar 500® PVDF resin, our coatings deliver 15+ years of colour retention without fading, chalking, or delamination — even under intense UAE sun exposure.',
    specs: ['Kynar 500® resin-based', 'UV-stable — no fading for 15+ years', 'Chemical-resistant finish'],
    image: '/images/foldable-carport-color-selection-guide-by-wasleen-pergolas.webp',
  },
  {
    id: 'alloy-structure',
    title: 'Aviation-Grade 6063-T5 Frame',
    description:
      'The backbone of every Wasleen carport is a 6063-T5 aluminium alloy frame — the same grade used in aerospace engineering. Heat-treated for maximum strength and corrosion resistance.',
    specs: ['Aviation-grade 6063-T5 aluminium', 'Heat-treated structural alloy', 'Zero rust — guaranteed'],
    image: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-3.webp',
  },
  {
    id: 'pc-panels',
    title: 'Polycarbonate Insulation Panels',
    description:
      '6mm twin-wall polycarbonate panels offer 99.9% UV protection while diffusing natural light. 50 times more impact-resistant than glass, they provide safety and comfort.',
    specs: ['6mm twin-wall polycarbonate', '99.9% UV protection', '50× impact resistance vs glass'],
    image: '/images/foldable-carport-material-choice-by-wasleen-pergolas.webp',
  },
];

/**
 * Features showcase for the checkout page.
 * Alternating left-right layout with images, adapted from QuoteFeaturesSection
 * with gold accents instead of cyan.
 */
export function CheckoutFeatureShowcase() {
  return (
    <section className="relative bg-gradient-to-b from-bg-secondary to-bg-primary py-20 md:py-28">
      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(201, 168, 76, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(201, 168, 76, 0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Precision in Every Detail"
          subtitle="From material selection to thermal performance — every component is engineered for the UAE climate."
          align="center"
        />

        <div className="mt-14 space-y-20 md:mt-20">
          {CHECKOUT_FEATURES.map((feature, index) => {
            const isReversed = index % 2 === 1;

            return (
              <motion.div
                key={feature.id}
                className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-16 ${
                  isReversed ? 'md:flex-row-reverse' : ''
                }`}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                {/* Image with animated gold border */}
                <div className="group relative aspect-[3/2] w-full overflow-hidden rounded-2xl bg-bg-card md:w-1/2">
                  {/* Border glow layer */}
                  <div className="absolute inset-0 rounded-2xl">
                    <div
                      className="absolute -inset-[2px] rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          'conic-gradient(from var(--angle, 0deg), transparent 0deg, #C9A84C 90deg, #D4B85A 180deg, #C9A84C 270deg, transparent 360deg)',
                        animation: 'gradientBorderRotate 4s linear infinite',
                      }}
                    />
                    <div className="absolute inset-[1px] rounded-2xl bg-bg-card" />
                  </div>

                  {/* Static border */}
                  <div className="absolute inset-0 z-10 rounded-2xl border border-border-subtle pointer-events-none" />

                  <Image
                    src={feature.image}
                    alt={`Wasleen ${feature.title.toLowerCase()} — engineering detail and material quality`}
                    fill
                    className="relative z-[5] scale-100 object-cover transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                {/* Content */}
                <div className="md:w-1/2">
                  <h3 className="font-sans text-[clamp(1.25rem,2vw,1.75rem)] font-semibold text-text-primary">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-text-secondary">
                    {feature.description}
                  </p>

                  {/* Specs */}
                  {feature.specs && feature.specs.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {feature.specs.map((spec) => (
                        <li
                          key={spec}
                          className="flex items-start gap-3 text-sm text-text-secondary"
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-gold/10">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M2 5l2 2 4-4" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
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
