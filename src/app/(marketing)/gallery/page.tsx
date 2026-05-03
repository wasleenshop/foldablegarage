import type { Metadata } from 'next';
import { GalleryHero } from '@/components/gallery/GalleryHero';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';

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
  return (
    <main>
      <GalleryHero />
      <GalleryGrid />
    </main>
  );
}
