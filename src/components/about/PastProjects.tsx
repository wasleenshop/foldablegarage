'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface PastProject {
  title: string;
  location: string;
  description: string;
  image: string;
  year: string;
}

const PAST_PROJECTS: PastProject[] = [
  {
    title: 'Palm Jumeirah Villa',
    location: 'Dubai, UAE',
    description:
      'Custom 6m × 8m foldable carport in Crystal White. Installed over a marble courtyard with automated rain-sensor retraction.',
    image: '/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp',
    year: '2025',
  },
  {
    title: 'Emirates Hills Estate',
    location: 'Dubai, UAE',
    description:
      'Dual 7m × 10m carports in Matte Black, side-by-side configuration with integrated LED strip lighting and smart home integration.',
    image: '/images/retractable-carport-aluminium-alloy-by-wasleen-pergolas.webp',
    year: '2024',
  },
  {
    title: 'Al Barari Residence',
    location: 'Dubai, UAE',
    description:
      '12m × 6m premium glass-panel carport in Champagne Gold, designed to complement the villa\u2019s contemporary landscape architecture.',
    image: '/images/foldable-carport-material-choice-by-wasleen-pergolas.webp',
    year: '2024',
  },
  {
    title: 'Saadiyat Island Villa',
    location: 'Abu Dhabi, UAE',
    description:
      '8m × 8m polycarbonate carport in Sand Beige, engineered with enhanced wind bracing for coastal exposure.',
    image: '/images/foldable-carport-color-selection-guide-by-wasleen-pergolas.webp',
    year: '2023',
  },
  {
    title: 'Dubai Hills Golf Villa',
    location: 'Dubai, UAE',
    description:
      '5m × 12m automatic carport in Crystal White with side enclosure panels, providing full protection for a luxury SUV collection.',
    image: '/images/specification-foldable-and-retractable-garage.webp',
    year: '2023',
  },
  {
    title: 'Al Raha Beach Residence',
    location: 'Abu Dhabi, UAE',
    description:
      '6m × 6m compact carport in Matte Black, space-optimised for a beachfront townhouse with limited driveway area.',
    image: '/images/foldable-and-retractable-carport-engineering-specification-drawing-by-wasleen-pergolas.webp',
    year: '2023',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const projectVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export function PastProjects() {
  return (
    <section className="relative bg-bg-primary py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <div className="mb-12 space-y-4 md:mb-16">
          <p className="text-center text-xs font-semibold tracking-[0.2em] text-accent-gold">
            PORTFOLIO
          </p>
          <h2 className="text-center font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.1] text-text-primary">
            Past Installations
          </h2>
          <p className="mx-auto max-w-2xl text-center text-[clamp(0.875rem,1vw,1rem)] leading-relaxed text-text-secondary">
            Every project is tailored to the client\u2019s architecture, climate, and lifestyle. Browse a selection of completed installations across the UAE.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PAST_PROJECTS.map((project) => (
            <motion.article
              key={project.title}
              variants={projectVariants}
              className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-card-bg transition-shadow duration-300 hover:shadow-lg hover:shadow-accent-gold/5"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image}
                  alt={`${project.title} — ${project.location}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Year badge */}
                <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {project.year}
                </span>

                {/* Hover overlay with description */}
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-sm leading-relaxed text-white/90">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Info bar */}
              <div className="p-4">
                <h3 className="text-base font-semibold text-primary-text">
                  {project.title}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-secondary-text">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-accent-gold"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {project.location}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 rounded-full border border-border-subtle px-8 py-3 text-sm font-semibold text-primary-text transition-all duration-300 hover:border-accent-gold hover:text-accent-gold"
          >
            View Full Gallery
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
