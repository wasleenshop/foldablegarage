import type { Metadata } from 'next';
import Script from 'next/script';
import { BlogHero } from '@/components/blog/BlogHero';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { breadcrumbSchema } from '@/lib/schema';

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
  const breadcrumbJson = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ]);

  return (
    <main>
      {/* BreadcrumbList structured data */}
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <BlogHero />
      <BlogIndex />
    </main>
  );
}
