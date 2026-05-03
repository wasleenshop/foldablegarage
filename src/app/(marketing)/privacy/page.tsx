import type { Metadata } from 'next';
import { PrivacyContent } from '@/components/legal/PrivacyContent';

export const metadata: Metadata = {
  title: 'Privacy Policy | Wasleen Foldable Garage Dubai',
  description:
    'Wasleen respects your privacy. We collect only what we need, never sell your data, and comply with UAE Federal Decree-Law No. 45 of 2021 on data protection.',
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
