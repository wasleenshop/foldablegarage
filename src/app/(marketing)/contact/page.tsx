import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';

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
  return <ContactForm />;
}
