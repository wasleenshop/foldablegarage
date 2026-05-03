import { type Metadata } from 'next';
import { Suspense } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Script from 'next/script';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { GtmPageView } from '@/components/layout/GtmPageView';
import { SmoothScrollProvider } from '@/components/providers/SmoothScrollProvider';
import { PageTransitionProvider } from '@/components/providers/PageTransitionProvider';
import { MagneticCursor } from '@/components/ui/MagneticCursor';
import { rootLayoutGraph } from '@/lib/schema';
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

        {/* Preload hero image for fastest LCP */}
        <link
          rel="preload"
          href="/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
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
          {/* Schema.org structured data — Generated from src/lib/schema.ts */}
          <Script
            id="schema-org"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(rootLayoutGraph()),
            }}
          />
  
          <Suspense fallback={null}>
            <GtmPageView />
          </Suspense>
        </Suspense>

        <SmoothScrollProvider>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
              <PageTransitionProvider>{children}</PageTransitionProvider>
            </main>
            <Footer />
          </div>
        </SmoothScrollProvider>

        {/* Floating UI */}
        <MagneticCursor />
        <WhatsAppButton />
        <ScrollToTop />
      </body>
    </html>
  );
}
