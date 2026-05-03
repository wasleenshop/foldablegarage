import type { Metadata } from 'next';
import { ReturnsContent } from '@/components/legal/ReturnsContent';

export const metadata: Metadata = {
  title: 'Returns & Refund Policy | Wasleen Foldable Garage Dubai',
  description:
    'Wasleen offers a 30-day structural integrity policy, component exchanges, and a clear deposit and cancellation policy for custom-manufactured foldable carports.',
};

export default function ReturnsPage() {
  return <ReturnsContent />;
}
