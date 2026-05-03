import type { Metadata } from 'next';
import Script from 'next/script';
import { QuoteHeroSection } from '@/components/quote/QuoteHeroSection';
import { QuoteConfigurator } from '@/components/quote/QuoteConfigurator';
import { QuoteProductVideo } from '@/components/quote/QuoteProductVideo';
import { QuoteFeaturesSection } from '@/components/quote/QuoteFeaturesSection';
import { QuoteSpecifications } from '@/components/quote/QuoteSpecifications';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Get a Quote — Wasleen Foldable Premium Garage',
  description:
    'Configure your retractable carport. Choose dimensions, colour, and options to receive an instant price estimate for your UAE villa.',
  openGraph: {
    title: 'Quote Configurator — Wasleen Foldable Garage',
    description:
      'Configure your premium retractable carport with instant pricing. Select size, colour, and automation options.',
  },
};

export default function QuotePage() {
  const breadcrumbJson = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Quote', url: '/quote' },
  ]);

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* BreadcrumbList structured data */}
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      {/* Hero section with animated gradient background */}
      <QuoteHeroSection />

      {/* Configuration section */}
      <QuoteConfigurator />

      {/* Autoplay product video — full view, no controls */}
      <QuoteProductVideo />

      {/* Features section — Precision in Every Detail */}
      <QuoteFeaturesSection />

      {/* Detailed specifications section */}
      <QuoteSpecifications />
    </main>
  );
}
