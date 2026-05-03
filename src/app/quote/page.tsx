import type { Metadata } from 'next';
import { QuoteConfigurator } from '@/components/quote/QuoteConfigurator';

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
      <QuoteConfigurator />
    </main>
  );
}
