'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

const MILESTONES = [
  { year: '2018', title: 'Founded', desc: 'Wasleen established in Dubai with a vision to bring architectural-grade shading solutions to the UAE market.' },
  { year: '2019', title: 'First Installation', desc: 'Completed our first premium retractable carport for a villa in Emirates Hills. Set the standard for quality.' },
  { year: '2021', title: 'R&D Breakthrough', desc: 'Developed our proprietary PVDF coating process specifically formulated for UAE sun exposure — 15-year no-fade guarantee.' },
  { year: '2023', title: '100+ Installations', desc: 'Surpassed 100 installations across all 7 Emirates plus exports to Saudi Arabia, Qatar, and Kuwait.' },
  { year: '2024', title: 'Smart Integration', desc: 'Launched IoT-enabled automatic systems with rain/heat sensors and smartphone app control.' },
  { year: '2025', title: 'Expansion', desc: 'Opened expanded workshop facility. Now serving clients across the GCC and international markets.' },
];

/**
 * Brand story section with timeline milestones.
 */
export function OurStory() {
  return (
    <section className="relative bg-bg-secondary py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Our Story"
          subtitle="From a simple idea to a premium engineering brand — our journey in the UAE"
        />

        <div className="mt-12">
          {/* Story paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="text-base leading-relaxed text-text-secondary md:text-lg">
              Wasleen was born from a simple observation: UAE villa owners deserved better than 
              standard carports. Off-the-shelf solutions couldn't withstand the region's extreme 
              heat, humidity, and UV exposure. So we engineered our own.
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-secondary md:text-lg">
              Every Wasleen carport is fabricated in our Dubai workshop using 6063-T5 aluminium 
              alloy — the same grade used in architectural curtain walls. Each unit is coated with 
              Kynar 500® PVDF resin, tested to withstand 15+ years of UAE sun without fading or 
              chalking. We don't just build carports; we engineer peace of mind.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="mt-16 space-y-8">
            {MILESTONES.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex items-start gap-6 rounded-2xl border border-border-subtle bg-bg-card p-6 transition-all duration-300 hover:border-accent-gold/20"
              >
                {/* Year badge */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent-gold/10">
                  <span className="font-sans text-lg font-bold text-accent-gold">
                    {milestone.year}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-sans text-lg font-semibold text-text-primary">
                    {milestone.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                    {milestone.desc}
                  </p>
                </div>

                {/* Connecting line (except last) */}
                {index < MILESTONES.length - 1 && (
                  <div className="absolute bottom-0 left-[1.65rem] hidden h-8 w-px bg-gradient-to-b from-accent-gold/30 to-transparent md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
