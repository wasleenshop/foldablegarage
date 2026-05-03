import type { Metadata } from 'next';
import Script from 'next/script';
import { AboutHero } from '@/components/about/AboutHero';
import { OurStory } from '@/components/about/OurStory';
import { TeamSection } from '@/components/about/TeamSection';
import { Certifications } from '@/components/about/Certifications';
import { PastProjects } from '@/components/about/PastProjects';
import { AboutCTA } from '@/components/about/AboutCTA';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'About Us | Wasleen Foldable Garage Dubai',
  description:
    'Wasleen Pergolas is a Dubai-based manufacturer of premium retractable carports. Engineered from 6063-T5 aluminium with PVDF coating. 5-year warranty, UAE delivery.',
  openGraph: {
    title: 'About Wasleen Foldable Garage — Dubai, UAE',
    description:
      'Discover the story behind Wasleen\u2019s architectural-grade retractable carports. Precision engineering for UAE villa owners.',
  },
};

export default function AboutPage() {
  const breadcrumbJson = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ]);

  return (
    <main>
      {/* BreadcrumbList structured data */}
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <AboutHero />
      <OurStory />
      <TeamSection />
      <Certifications />
      <PastProjects />
      <AboutCTA />
    </main>
  );
}
