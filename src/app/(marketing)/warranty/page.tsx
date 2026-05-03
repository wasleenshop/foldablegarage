import type { Metadata } from 'next';
import { WarrantyContent } from '@/components/legal/WarrantyContent';

export const metadata: Metadata = {
  title: 'Warranty Policy | Wasleen Foldable Garage Dubai',
  description:
    'Wasleen offers a multi-tiered warranty: 15-year aluminium frame, 5-year panels, 3-year motor. Coverage for UAE installations with clear claims process.',
};

export default function WarrantyPage() {
  return <WarrantyContent />;
}
