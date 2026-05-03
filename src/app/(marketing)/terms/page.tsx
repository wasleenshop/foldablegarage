import type { Metadata } from 'next';
import { TermsContent } from '@/components/legal/TermsContent';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Wasleen Foldable Garage Dubai',
  description:
    'Terms and conditions of sale and service for Wasleen Foldable Garage. Governing quotations, orders, site conditions, liability, and dispute resolution in the UAE.',
};

export default function TermsPage() {
  return <TermsContent />;
}
