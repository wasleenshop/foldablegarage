import type { Metadata } from 'next';
import Script from 'next/script';
import { WarrantyContent } from '@/components/legal/WarrantyContent';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Warranty Policy | Wasleen Foldable Garage Dubai',
  description:
    'Wasleen offers a multi-tiered warranty: 15-year aluminium frame, 5-year panels, 3-year motor. Coverage for UAE installations with clear claims process.',
};

export default function WarrantyPage() {
  const breadcrumbJson = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Warranty', url: '/warranty' },
  ]);

  return (
    <>
      {/* BreadcrumbList structured data */}
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <WarrantyContent />
    </>
  );
}
