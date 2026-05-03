import type { Metadata } from 'next';
import { BlogHero } from '@/components/blog/BlogHero';
import { BlogIndex } from '@/components/blog/BlogIndex';

export const metadata: Metadata = {
  title: 'Blog | Wasleen Foldable Garage Dubai',
  description:
    'Expert articles on retractable carports, outdoor living in Dubai, maintenance tips, aluminium engineering, and guides for UAE villa owners.',
  openGraph: {
    title: 'Wasleen Blog — Carport Guides & Outdoor Living Tips',
    description:
      'Expert insights on foldable garages, retractable roof systems, and outdoor living solutions for Dubai homeowners.',
  },
};

export default function BlogPage() {
  return (
    <main>
      <BlogHero />
      <BlogIndex />
    </main>
  );
}
