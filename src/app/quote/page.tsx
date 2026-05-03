import type { Metadata } from 'next';
import { QuoteHeroSection } from '@/components/quote/QuoteHeroSection';
import { QuoteConfigurator } from '@/components/quote/QuoteConfigurator';
import { QuoteFeaturesSection } from '@/components/quote/QuoteFeaturesSection';
import { QuoteSpecifications } from '@/components/quote/QuoteSpecifications';

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
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero section with animated gradient background */}
      <QuoteHeroSection />

      {/* Configuration section */}
      <QuoteConfigurator />

      {/* Features section — Precision in Every Detail */}
      <QuoteFeaturesSection />

      {/* Detailed specifications section */}
      <QuoteSpecifications />
    </main>
  );
}
