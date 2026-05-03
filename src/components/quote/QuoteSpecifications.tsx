'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Specification details section for the Quote page.
 * Showcases material quality, coating system, panel options, and technical specs.
 */
const COATING_LAYERS = [
  { label: 'Clearcoat', description: 'Scratch-resistant topmost protective layer', color: 'from-amber-200/30 to-amber-400/10' },
  { label: 'PVDF Topcoat', description: 'AAMA 2605 standard — 20-year colour retention', color: 'from-accent-gold/30 to-accent-gold/10' },
  { label: 'Primer Layer', description: 'Powerful adhesion and corrosion barrier', color: 'from-accent-cyan/20 to-accent-cyan/5' },
  { label: 'Pre-treatment Layer', description: 'Chromate-free micro-etch bonding base', color: 'from-accent-violet/20 to-accent-violet/5' },
  { label: 'Core Material', description: 'Aviation-grade 6063-T5 structural aluminium alloy', color: 'from-blue-400/20 to-blue-600/10' },
];

const PANEL_OPTIONS = [
  {
    name: 'PC Insulation Panel',
    features: [
      'Deep smoke-coloured, high-strength polycarbonate',
      'Blocks 99.9% of ultraviolet radiation',
      'Reduces greenhouse temperatures during summer',
      '15+ years lifespan — no yellowing or brittleness',
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent-gold">
        <rect x="4" y="8" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M8 14h16M8 18h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M16 6v2M16 24v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    name: 'Double-Layer Laminated Glass',
    features: [
      'Double-layer glass with PVB interlayer',
      'High-end villa specification (SGP option available)',
      'Excellent acoustic insulation',
      'Shatter-safe laminated design',
    ],
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-accent-cyan">
        <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="6" y="8" width="20" height="16" rx="1" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
        <path d="M10 12l6 8 4-4 4 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const COLOUR_OPTIONS_SPEC = [
  { name: 'Bronze / Tea', hex: '#8B7355', desc: 'Warm amber — blends with sandstone villas' },
  { name: 'Sapphire Blue', hex: '#2E5E8E', desc: 'Cool clarity — modern contrast' },
  { name: 'Light Smoke', hex: '#9EA2A8', desc: 'Neutral, timeless soft grey' },
  { name: 'Medium Smoke', hex: '#6B6F75', desc: 'Classic anthracite — most popular' },
  { name: 'Dark Charcoal', hex: '#36383A', desc: 'Bold premium — max UV blocking' },
];

const TECH_SPECS = [
  { label: 'Frame Material', value: 'Aviation-grade 6063-T5 aluminium alloy' },
  { label: 'Surface Treatment', value: 'PVDF fluorocarbon coating (AAMA 2605)' },
  { label: 'Corrosion Rating', value: 'No rust, no fade — 15+ year guarantee' },
  { label: 'Roof Panel', value: 'Deep smoke PC board or double-layer laminated glass' },
  { label: 'UV Protection', value: 'Blocks 99.9% of ultraviolet radiation' },
  { label: 'Shutter Door', value: 'High-strength aluminium electric rolling shutter' },
  { label: 'Shutter Control', value: 'Remote one-touch wireless operation' },
  { label: 'Wind Resistance', value: 'High-efficiency sealing — blocks sand and dust' },
];

const SMART_FEATURES = [
  'One-touch remote rolling shutter control',
  'Firmly seals to the ground — prevents sand/rain ingress',
  'Robust locking mechanism for enhanced security',
  'Fully customisable colours and dimensions',
  'Integrates seamlessly with existing courtyard designs',
  'Suitable for both residential and commercial use',
];

export function QuoteSpecifications() {
  return (
    <section className="relative bg-bg-primary py-20 md:py-28">
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute left-0 top-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-accent-gold/5 blur-[150px]" />
        <div className="absolute right-0 bottom-1/4 h-[400px] w-[400px] translate-x-1/2 rounded-full bg-accent-cyan/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        {/* ── Ultra-Luxury Intro ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="inline-block rounded-full border border-accent-gold/20 bg-accent-gold/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-accent-gold">
            WASLEEN
          </span>
          <h2 className="mt-4 font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.1] text-text-primary">
            Ultra-Luxury{' '}
            <span className="bg-gradient-to-r from-accent-gold to-accent-gold-hover bg-clip-text text-transparent">
              Retractable Carport
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg">
            The new generation of smart parking canopies. Say goodbye to the hassles of traditional
            parking with a solution that serves not only as a dedicated shelter for your vehicle but
            also as a stylish architectural accent reflecting your unique taste and lifestyle.
          </p>

          {/* USP chips */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {['Intelligent', 'Customised', 'Protected'].map((word) => (
              <span
                key={word}
                className="inline-flex items-center gap-2 rounded-full border border-accent-gold/10 bg-accent-gold/5 px-5 py-2 text-sm font-medium text-accent-gold"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {word}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Key Benefits Cards ── */}
        <div className="mb-20 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Ultimate Customisation',
              description: 'From dimensions to colour schemes, we offer comprehensive personalised customisation to create a space that seamlessly integrates with your courtyard.',
              gradient: 'from-accent-gold/10 to-transparent',
              borderColor: 'border-accent-gold/20',
            },
            {
              title: 'Intelligent Upgrade',
              description: 'Features a high-strength aluminium alloy electric rolling shutter door that can be remotely closed with a single button press. Dust-free, secure, and private.',
              gradient: 'from-accent-cyan/10 to-transparent',
              borderColor: 'border-accent-cyan/20',
            },
            {
              title: 'Selected Materials',
              description: 'Aviation-grade 6063-T5 aluminium alloy frame with fluorocarbon coating. Exceptional corrosion resistance with 15+ years no-fade and no-rust guarantee.',
              gradient: 'from-accent-violet/10 to-transparent',
              borderColor: 'border-accent-violet/20',
            },
          ].map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className={`group relative overflow-hidden rounded-2xl border ${card.borderColor} bg-gradient-to-b ${card.gradient} p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Shimmer overlay on hover */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              <div className="relative z-10">
                <h3 className="font-sans text-lg font-semibold text-text-primary">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Advanced Surface Technology ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <SectionHeading
            title="Advanced Surface Technology"
            subtitle="Our carports utilize a PVDF Fluorocarbon Coating System that meets the AAMA 2605 international standard — the highest performance level for architectural aluminium coatings."
            align="center"
          />

          <div className="mt-10 space-y-3">
            {COATING_LAYERS.map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative overflow-hidden rounded-xl border border-border-subtle bg-bg-card/50 backdrop-blur-sm transition-all hover:border-accent-gold/30"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${layer.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                <div className="relative z-10 flex items-center gap-4 p-4 md:gap-6">
                  {/* Layer number */}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-gold/10 text-xs font-bold text-accent-gold">
                    {i + 1}
                  </span>
                  {/* Content */}
                  <div className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-text-primary">{layer.label}</span>
                    <span className="mt-0.5 block text-xs text-text-tertiary">{layer.description}</span>
                  </div>
                  {/* Visual bar */}
                  <div className="hidden h-2 w-24 overflow-hidden rounded-full bg-bg-primary md:block">
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: `${100 - i * 15}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.2, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-accent-gold to-accent-cyan"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Concealed Engineering ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <SectionHeading
            title="Concealed Engineering & Mechanisms"
            subtitle="Designed with a state-of-the-art 3-Tier Telescopic Sliding System for seamless operation."
            align="center"
          />

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: 'Structural Layout',
                items: ['Section 1 (Fixed)', 'Section 2 (Sliding)', 'Section 3 (Sliding)'],
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-accent-gold">
                    <rect x="2" y="10" width="24" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="3" y="11" width="7" height="6" rx="0.5" fill="currentColor" fillOpacity="0.2"/>
                    <rect x="11" y="11" width="7" height="6" rx="0.5" fill="currentColor" fillOpacity="0.4"/>
                    <rect x="19" y="11" width="6" height="6" rx="0.5" fill="currentColor" fillOpacity="0.6"/>
                  </svg>
                ),
              },
              {
                title: 'Hardware',
                items: ['Precision rail mechanism', 'Heavy-duty roller system', 'Sealed ball bearings'],
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-accent-cyan">
                    <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="14" cy="14" r="4" fill="currentColor" fillOpacity="0.3"/>
                    <path d="M14 4v4M14 20v4M4 14h4M20 14h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                ),
              },
              {
                title: 'Design',
                items: ['Seamless telescopic nesting', 'Precision sliding rails', 'Silent smooth operation'],
                icon: (
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-accent-violet">
                    <path d="M4 14h20M8 8l6 6-6 6M20 8l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ),
              },
            ].map((eng, i) => (
              <motion.div
                key={eng.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="rounded-xl border border-border-subtle bg-bg-card/50 p-6 backdrop-blur-sm transition-all hover:border-accent-gold/30"
              >
                <div className="flex items-center gap-3">
                  {eng.icon}
                  <h3 className="font-sans text-base font-semibold text-text-primary">{eng.title}</h3>
                </div>
                <ul className="mt-4 space-y-2">
                  {eng.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gold/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Dual Panel Material Selection ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <SectionHeading
            title="Dual Panel Material Selection System"
            subtitle="Choose the perfect roofing material tailored to your climate and lifestyle needs."
            align="center"
          />

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {PANEL_OPTIONS.map((panel, i) => (
              <motion.div
                key={panel.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-b from-bg-card/80 to-bg-card/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent-gold/30 hover:-translate-y-1"
              >
                {/* Top accent line */}
                <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-accent-gold via-accent-cyan to-accent-violet opacity-60" />

                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-gold/5">
                      {panel.icon}
                    </span>
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wider text-accent-gold">
                        Option {['A', 'B'][i]}
                      </span>
                      <h3 className="font-sans text-lg font-semibold text-text-primary">{panel.name}</h3>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {panel.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-sm text-text-secondary">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="mt-0.5 shrink-0 text-accent-gold"
                        >
                          <path
                            d="M13 4L5.5 11.5L2 8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Polycarbonate Colour Options ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <SectionHeading
            title="Polycarbonate Colour Options"
            subtitle="Customise your aesthetic with our premium polycarbonate panel colours."
            align="center"
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {COLOUR_OPTIONS_SPEC.map((colour, i) => (
              <motion.div
                key={colour.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group cursor-pointer rounded-xl border border-border-subtle bg-bg-card/50 p-4 text-center backdrop-blur-sm transition-all hover:border-accent-gold/30"
              >
                <span
                  className="mx-auto mb-3 block h-16 w-16 rounded-xl border border-border-subtle shadow-lg transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: colour.hex }}
                />
                <span className="block text-sm font-semibold text-text-primary">{colour.name}</span>
                <span className="mt-1 block text-xs text-text-tertiary">{colour.desc}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Technical Specifications Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <SectionHeading
            title="Technical Specifications"
            subtitle="Precision-engineered with the highest-grade materials and advanced manufacturing processes."
            align="center"
          />

          <div className="mt-10 overflow-hidden rounded-2xl border border-border-subtle bg-bg-card/50 backdrop-blur-sm">
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
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">{spec.label}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{spec.value}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ── Smart Protection Features ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          <SectionHeading
            title="Smart Protection Features"
            subtitle="Advanced technology that safeguards your vehicle with intelligence and precision."
            align="center"
          />

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SMART_FEATURES.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-3 rounded-xl border border-border-subtle bg-bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-accent-gold/30"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-gold/10 text-sm font-bold text-accent-gold">
                  {i + 1}
                </span>
                <span className="pt-1 text-sm leading-relaxed text-text-secondary">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
