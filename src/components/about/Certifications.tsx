'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

const CERTIFICATIONS = [
  {
    name: 'ISO 9001:2015',
    issuer: 'Quality Management',
    description: 'Certified quality management system for design, fabrication, and installation of aluminium structures.',
  },
  {
    name: 'TÜV Rheinland',
    issuer: 'Product Safety',
    description: 'Load-tested and certified for structural integrity. Meets EU and GCC building standards.',
  },
  {
    name: 'CE Marking',
    issuer: 'EU Conformity',
    description: 'Construction Products Regulation (CPR) compliance. Materials tested per EN standards.',
  },
  {
    name: 'Dubai Municipality',
    issuer: 'Approved Contractor',
    description: 'Registered and approved contractor for structural aluminium works in the Emirate of Dubai.',
  },
];

/**
 * Certifications and accreditations display.
 */
export function Certifications() {
  return (
    <section className="relative bg-bg-secondary py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Certifications & Accreditations"
          subtitle="Every Wasleen product meets rigorous international standards"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {CERTIFICATIONS.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex items-start gap-5 rounded-2xl border border-border-subtle bg-bg-card p-6 transition-all duration-300 hover:border-accent-gold/20"
            >
              {/* Badge icon */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-accent-gold/20 bg-accent-gold/5">
                <svg className="text-accent-gold" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-sans text-base font-semibold text-text-primary">
                  {cert.name}
                </h3>
                <p className="text-xs font-medium uppercase tracking-wider text-accent-gold">
                  {cert.issuer}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {cert.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
