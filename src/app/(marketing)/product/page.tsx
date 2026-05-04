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

      {/* Buy Now CTA strip */}
      <section className="border-y border-border-subtle bg-bg-secondary">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-4 py-6 md:px-6 lg:px-8">
          <div>
            <p className="text-sm text-text-secondary">Ready to purchase?</p>
            <p className="font-sans text-lg font-semibold text-text-primary">
              Get your exact price in seconds
            </p>
          </div>
          <a
            href="/checkout"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-accent-gold px-6 py-3 text-[0.9375rem] font-semibold text-bg-primary transition-all duration-200 hover:bg-accent-gold-hover"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Buy Now — from AED 33,600
          </a>
        </div>
      </section>

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
