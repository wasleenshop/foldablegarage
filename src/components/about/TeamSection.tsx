'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';

const TEAM = [
  {
    name: 'Ahmed Al Wasleen',
    role: 'Founder & CEO',
    bio: '15+ years in architectural aluminium systems. Pioneered retractable carport engineering in the UAE.',
  },
  {
    name: 'Rashid Al-Mansouri',
    role: 'Head of Engineering',
    bio: 'Former aerospace engineer. Leads R&D for structural design, material science, and PVDF coating formulation.',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Operations Director',
    bio: 'Oversees all installations across the UAE and GCC. Ensures every project meets our quality standards.',
  },
  {
    name: 'Khalid Al-Qasimi',
    role: 'Customer Relations',
    bio: 'Dedicated to ensuring every client experience exceeds expectations. Multilingual support in English, Arabic, Urdu.',
  },
];

/**
 * Team member cards section.
 */
export function TeamSection() {
  return (
    <section className="relative bg-bg-primary py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Meet the Team"
          subtitle="The people behind Wasleen — dedicated to engineering excellence"
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-2xl border border-border-subtle bg-bg-card p-6 text-center transition-all duration-300 hover:border-accent-gold/20 hover:shadow-lg hover:shadow-accent-gold/5"
            >
              {/* Avatar */}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-accent-gold/20 to-accent-gold/5 text-2xl font-bold text-accent-gold">
                {member.name.split(' ').map((n) => n[0]).join('')}
              </div>

              {/* Name & Role */}
              <h3 className="mt-4 font-sans text-base font-semibold text-text-primary">
                {member.name}
              </h3>
              <p className="text-xs font-medium uppercase tracking-wider text-accent-gold">
                {member.role}
              </p>

              {/* Bio */}
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {member.bio}
              </p>

              {/* Gold underline on hover */}
              <div className="mx-auto mt-4 h-px w-0 bg-gradient-to-r from-transparent via-accent-gold to-transparent transition-all duration-300 group-hover:w-12" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
