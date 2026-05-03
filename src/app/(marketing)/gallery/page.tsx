import type { Metadata } from 'next';
import Script from 'next/script';
import { GalleryHero } from '@/components/gallery/GalleryHero';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Installation Gallery | Wasleen Foldable Garage Dubai',
  description:
    'Browse our portfolio of premium foldable carport installations across the UAE. Residential and commercial projects in Dubai, Abu Dhabi, and beyond.',
  openGraph: {
    title: 'Wasleen Foldable Garage — Installation Gallery Dubai',
    description:
      'Real installations across UAE villas, estates, and commercial properties. See the craft behind every Wasleen foldable carport.',
  },
};

export default function GalleryPage() {
  const breadcrumbJson = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Gallery', url: '/gallery' },
  ]);

  return (
    <main>
      {/* BreadcrumbList structured data */}
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <GalleryHero />
      <GalleryGrid />
    </main>
  );
}
