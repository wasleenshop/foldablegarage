import type { Metadata } from 'next';
import Script from 'next/script';
import { TermsContent } from '@/components/legal/TermsContent';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Wasleen Foldable Garage Dubai',
  description:
    'Terms and conditions of sale and service for Wasleen Foldable Garage. Governing quotations, orders, site conditions, liability, and dispute resolution in the UAE.',
};

export default function TermsPage() {
  const breadcrumbJson = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Terms', url: '/terms' },
  ]);

  return (
    <>
      {/* BreadcrumbList structured data */}
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <TermsContent />
    </>
  );
}
