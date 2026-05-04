'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Technical specification table extracted from QuoteSpecifications.
 * Clean, beautifully designed table with subtle row animations on scroll.
 */
const TECH_SPECS = [
  { label: 'Frame Material', value: 'Aviation-grade 6063-T5 aluminium alloy' },
  { label: 'Surface Treatment', value: 'PVDF fluorocarbon coating (AAMA 2605)' },
  { label: 'Corrosion Rating', value: 'No rust, no fade — 15+ year guarantee' },
  { label: 'Roof Panel', value: 'Deep smoke PC board or double-layer laminated glass' },
  { label: 'UV Protection', value: 'Blocks 99.9% of ultraviolet radiation' },
  { label: 'Shutter Door', value: 'High-strength aluminium electric rolling shutter' },
  { label: 'Shutter Control', value: 'Remote one-touch wireless operation' },
  { label: 'Wind Resistance', value: 'High-efficiency sealing — blocks sand and dust' },
  { label: 'Dimensions Range', value: '2–12m width × 6–30m length (0.5m increments)' },
  { label: 'Colours', value: '5 premium PVDF finishes' },
  { label: 'Warranty', value: '5-year structural, 15-year coating' },
];

export function CheckoutSpecTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
    >
      <SectionHeading
        title="Technical Specifications"
        subtitle="Precision-engineered with the highest-grade materials and advanced manufacturing processes."
        align="center"
      />

      <div className="overflow-hidden rounded-2xl border border-border-subtle bg-bg-card/50 backdrop-blur-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border-subtle bg-bg-card/80">
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-accent-gold">
                Specification
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-accent-gold">
                Detail
              </th>
            </tr>
          </thead>
          <tbody>
            {TECH_SPECS.map((spec, i) => (
              <motion.tr
                key={spec.label}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className={`group border-b border-border-subtle/50 transition-colors last:border-0 hover:bg-accent-gold/[0.02] ${
                  i % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.01]'
                }`}
              >
                <td className="px-6 py-4 text-sm font-medium text-text-primary">
                  {spec.label}
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">
                  {spec.value}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
