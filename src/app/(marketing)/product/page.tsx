import type { Metadata } from 'next';
import Script from 'next/script';
import { ProductHero } from '@/components/product/ProductHero';
import { TechSpecs } from '@/components/product/TechSpecs';
import { TechDetails } from '@/components/product/TechDetails';
import { ColourSelector } from '@/components/product/ColourSelector';
import { TechDiagram } from '@/components/product/TechDiagram';
import { ProductReviews } from '@/components/product/ProductReviews';
import { FooterCTA } from '@/components/homepage/FooterCTA';
import { aggregateRatingSchema, breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Foldable Premium Garage | Wasleen Pergolas Dubai',
  description:
    'Architectural-grade retractable carport engineered from 6063-T5 aluminium. Available in 5 colours, polycarbonate or glass roof. Price from AED 12,000. 5-year warranty.',
  openGraph: {
    title: 'Wasleen Foldable Premium Garage — Dubai',
    description:
      'Premium retractable carport for UAE villas. Engineered with precision rail system, PVDF coating, and smart automation options.',
    images: [
      {
        url: '/images/foldable-garage-wasleen-pergolas-dubai-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Wasleen Foldable Premium Garage',
      },
    ],
  },
};

export default function ProductPage() {
  const ratingJson = aggregateRatingSchema();
  const breadcrumbJson = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Product', url: '/product' },
  ]);

  return (
    <main>
      {/* AggregateRating structured data — shows star rating in search */}
      <Script
        id="schema-aggregate-rating"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingJson) }}
      />

      {/* BreadcrumbList structured data */}
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      {/* Hero with image gallery + product info */}
      <ProductHero />

      {/* Key specs strip (4 columns) */}
      <TechSpecs />

      {/* Technical details accordion */}
      <TechDetails />

      {/* Colour selector with preview */}
      <ColourSelector />

      {/* Annotated tech diagram */}
      <TechDiagram />

      {/* Full customer reviews browser */}
      <ProductReviews />

      {/* Bottom CTA banner */}
      <FooterCTA />
    </main>
  );
}
