import type { Metadata } from 'next';
import Script from 'next/script';
import { ContactForm } from '@/components/contact/ContactForm';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Contact Us | Wasleen Foldable Garage',
  description:
    'Get in touch with Wasleen Pergolas. Visit our Dubai showroom, call, or send a message. We respond to all enquiries within 24 hours.',
  openGraph: {
    title: 'Contact Wasleen Foldable Garage',
    description:
      'Reach out to our team for expert advice on retractable carports for your UAE villa.',
  },
};

export default function ContactPage() {
  const breadcrumbJson = breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  return (
    <>
      {/* BreadcrumbList structured data */}
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJson) }}
      />

      <ContactForm />
    </>
  );
}
