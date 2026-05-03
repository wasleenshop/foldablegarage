import type { Metadata } from 'next';
import { ThankYouContent } from './ThankYouContent';

export const metadata: Metadata = {
  title: 'Thank You | Wasleen Foldable Garage',
  description:
    'Thank you for your enquiry. A Wasleen specialist will contact you shortly to confirm your order.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}
