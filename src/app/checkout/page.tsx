import type { Metadata } from 'next';
import Script from 'next/script';
import { CheckoutContent } from '@/components/checkout/CheckoutContent';
import { productSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Buy Foldable Premium Garage Online | Wasleen Pergolas Dubai',
  description:
    'Customise your retractable carport with live pricing. Choose dimensions, roof type, colour, and options. Secure checkout with Paddle.',
  openGraph: {
    title: 'Wasleen Foldable Premium Garage — Checkout',
    description:
      'Configure and buy your premium retractable carport online. Live pricing, instant checkout.',
    images: [
      {
        url: '/images/foldable-garage-wasleen-pergolas-dubai-og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Wasleen Foldable Premium Garage Checkout',
      },
    ],
  },
};

export default function CheckoutPage() {
  const productJson = productSchema();

  return (
    <main>
      {/* Product structured data */}
      <Script
        id="schema-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJson) }}
      />

      <CheckoutContent />
    </main>
  );
}
