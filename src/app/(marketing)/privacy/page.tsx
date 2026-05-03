import type { Metadata } from 'next';
import Script from 'next/script';
import { PrivacyContent } from '@/components/legal/PrivacyContent';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Privacy Policy | Wasleen Foldable Garage Dubai',
  description:
    'Wasleen respects your privacy. We collect only what we need, never sell your data, and comply with UAE Federal Decree-Law No. 45 of 2021 on data protection.',
};

export default function PrivacyPage() {
  const breadcrumbJson = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Privacy', url: '/privacy' },
  ]);

  return (
    <>
      {/* BreadcrumbList structured data */}
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <PrivacyContent />
    </>
  );
}
