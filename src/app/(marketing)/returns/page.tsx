import type { Metadata } from 'next';
import Script from 'next/script';
import { ReturnsContent } from '@/components/legal/ReturnsContent';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Returns & Refund Policy | Wasleen Foldable Garage Dubai',
  description:
    'Wasleen offers a 30-day structural integrity policy, component exchanges, and a clear deposit and cancellation policy for custom-manufactured foldable carports.',
};

export default function ReturnsPage() {
  const breadcrumbJson = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Returns', url: '/returns' },
  ]);

  return (
    <>
      {/* BreadcrumbList structured data */}
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <ReturnsContent />
    </>
  );
}
