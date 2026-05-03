import { type Metadata } from 'next';
import { Suspense } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { GtmPageView } from '@/components/layout/GtmPageView';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'Wasleen Foldable Garage — Premium Retractable Carports UAE',
    template: '%s | Wasleen Foldable Garage',
  },
  description:
    'Architectural-grade retractable carports engineered in Dubai. 6063-T5 aluminium, PVDF coating, automatic systems. Request a consultation.',
  metadataBase: new URL('https://foldablegarage.wasleen.com'),
  openGraph: {
    title: 'Wasleen Foldable Garage — Intelligent Motion. Absolute Protection.',
    description: 'Premium retractable carports for UAE villas.',
    url: 'https://foldablegarage.wasleen.com',
    siteName: 'Wasleen Foldable Garage',
    images: [
      {
        url: '/images/og-homepage.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wasleen Foldable Garage',
    description: 'Premium retractable carports for UAE villas.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://foldablegarage.wasleen.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-59Z5PLJS');`,
          }}
        />
      </head>
      <body className={`${plusJakartaSans.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-59Z5PLJS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Suspense fallback={null}>
          {/* Schema.org structured data — Product + LocalBusiness */}
          <Script
            id="schema-org"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@graph': [
                  {
                    '@type': 'Product',
                    name: 'Wasleen Foldable Premium Garage',
                    description:
                      'Architectural-grade retractable carport engineered in Dubai. 6063-T5 aluminium alloy frame with PVDF coating.',
                    brand: {
                      '@type': 'Brand',
                      name: 'Wasleen Pergolas',
                    },
                    offers: {
                      '@type': 'AggregateOffer',
                      priceCurrency: 'AED',
                      lowPrice: 33600,
                      highPrice: 120000,
                      availability: 'https://schema.org/InStock',
                      url: 'https://foldablegarage.wasleen.com/quote',
                    },
                    material: '6063-T5 Aluminium Alloy',
                    color: [
                      'Bronze / Tea',
                      'Sapphire Blue',
                      'Light Smoke',
                      'Medium Smoke',
                      'Dark Smoke',
                    ],
                    countryOfOrigin: 'AE',
                  },
                  {
                    '@type': 'LocalBusiness',
                    name: 'Wasleen Pergolas',
                    url: 'https://foldablegarage.wasleen.com',
                    telephone: '+971542330837',
                    address: {
                      '@type': 'PostalAddress',
                      addressLocality: 'Dubai',
                      addressCountry: 'AE',
                    },
                    openingHours: 'Sa-Th 09:00-19:00',
                  },
                ],
              }),
            }}
          />
  
          <Suspense fallback={null}>
            <GtmPageView />
          </Suspense>
        </Suspense>

        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

        {/* Floating UI */}
        <WhatsAppButton />
        <ScrollToTop />
      </body>
    </html>
  );
}
