import type { Metadata } from 'next';
import Script from 'next/script';
import { BrochurePage } from '@/components/brochure/BrochurePage';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Brochure | Wasleen Foldable Garage Dubai',
  description:
    'Download the complete Wasleen Foldable Garage brochure — 12 pages of premium engineering, colour options, technical specs, and pricing for Dubai villa owners.',
  openGraph: {
    title: 'Wasleen Foldable Garage — Free Brochure Download',
    description:
      'Get the full 12-page brochure: German-engineered retractable carports, 5 premium finishes, technical specifications, and pricing. Free download.',
  },
};

export default function BrochureRoute() {
  const breadcrumbJson = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Brochure', url: '/brochure' },
  ]);

  return (
    <main>
      {/* BreadcrumbList structured data */}
      <Script
        id="schema-breadcrumb-brochure"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <BrochurePage />
    </main>
  );
}
