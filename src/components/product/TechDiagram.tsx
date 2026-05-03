'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';

const CALLOUTS = [
  { number: 1, label: 'Aluminium Rail', desc: 'Precision-extruded 6063-T5 rail with anodised finish' },
  { number: 2, label: 'Heavy-Duty Roller', desc: 'Sealed ball-bearing roller, rated to 500 kg' },
  { number: 3, label: 'Polycarbonate Panel', desc: '6mm twin-wall, 99.9% UV block, impact-resistant' },
  { number: 4, label: 'Automatic Motor', desc: 'SOMFY 600N tubular motor, 10,000+ cycles' },
  { number: 5, label: 'Support Column', desc: 'Box-section aluminium, anchored to concrete foundation' },
  { number: 6, label: 'Control Unit', desc: 'RF receiver + rain/heat sensor integration' },
];

/**
 * Annotated technical diagram of the foldable garage structure.
 * Uses a real product image with numbered callout labels overlaid.
 */
export function TechDiagram() {
  return (
    <section className="relative bg-bg-primary py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Technical Diagram"
          subtitle="Annotated cross-section of the Wasleen Foldable Garage system"
        />

        <div className="mt-10">
          {/* Diagram container */}
          <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-bg-card">
            {/* Product diagram image */}
            <div className="relative aspect-[16/9] w-full">
              <Image
                src="/images/foldable-garage-diagram-aluminium-alloy-by-wasleen-pergolas.webp"
                alt="Wasleen Foldable Garage — annotated technical cross-section diagram"
                fill
                className="object-contain p-4 md:p-8"
                sizes="100vw"
                priority={false}
              />
            </div>

            {/* Callout labels — bottom of diagram */}
            <div className="border-t border-border-subtle bg-bg-secondary p-6 md:p-8">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3 md:gap-x-8">
                {CALLOUTS.map((callout, index) => (
                  <motion.div
                    key={callout.number}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="flex items-start gap-3"
                  >
                    {/* Number badge */}
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-gold/10 text-xs font-bold text-accent-gold">
                      {callout.number}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">
                        {callout.label}
                      </p>
                      <p className="text-xs text-text-tertiary">
                        {callout.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Engineering note */}
          <p className="mt-4 text-center text-xs text-text-tertiary">
            Diagram represents the standard configuration. Actual specifications may vary based on custom dimensions and options.
          </p>
        </div>
      </div>
    </section>
  );
}
