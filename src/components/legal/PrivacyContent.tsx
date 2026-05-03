'use client';

import {
  LegalPageTemplate,
  PolicySection,
  PolicyBody,
  PolicyList,
  PolicyTable,
  AlertBox,
  PolicyDivider,
} from '@/components/legal/LegalPageTemplate';

export function PrivacyContent() {
  return (
    <LegalPageTemplate
      title="Privacy Policy"
      subtitle="We collect only what we need, use it only for the purpose it was given, and never sell your personal information to any third party. Your data is not our product."
      effectiveDate="1 June 2025"
    >
      {/* Section 1 */}
      <PolicySection
        id="p-intro"
        number="01"
        title="Your Privacy — Our Responsibility"
        intro="We collect only what we need, use it only for the purpose it was given, and never sell your personal information to any third party. Your data is not our product."
      >
        <PolicyBody>
          <p>
            Wasleen Foldable Garage respects your privacy and is committed to protecting your
            personal data in compliance with UAE Federal Decree-Law No. 45 of 2021 on the
            Protection of Personal Data. This policy explains what data we collect, why we collect
            it, how we use it, and what rights you have in relation to it.
          </p>
        </PolicyBody>
      </PolicySection>

      <PolicyDivider />

      {/* Section 2 */}
      <PolicySection
        id="p-collect"
        number="02"
        title="What We Collect & Why"
      >
        <PolicyTable
          headers={['Data Collected', 'Purpose', 'Retention']}
          rows={[
            [
              'Name, phone number, email address',
              'To respond to your enquiry, prepare your quotation, and communicate regarding your project.',
              'Duration of the project + 5 years (warranty service requirement).',
            ],
            [
              'Installation address',
              'Site survey scheduling, installation logistics, and warranty registration.',
              'Duration of warranty period.',
            ],
            [
              'Payment information',
              'Processed entirely through Paddle. Wasleen does not store card numbers or payment credentials on our systems.',
              'Not stored by Wasleen.',
            ],
            [
              'Website usage data (analytics)',
              'To understand how visitors use our website and to improve the user experience. Analytics data is aggregated and anonymised.',
              '13 months, then auto-deleted.',
            ],
            [
              'WhatsApp conversation content',
              'Project communication, support, and service delivery. Retained to maintain a complete project record.',
              'Duration of project + 2 years.',
            ],
          ]}
        />
      </PolicySection>

      <PolicyDivider />

      {/* Section 3 */}
      <PolicySection
        id="p-rights"
        number="03"
        title="Your Rights"
      >
        <PolicyList
          items={[
            {
              number: '1',
              content:
                <><strong>Right to Access:</strong> You may request a copy of all personal data we hold about you at any time by emailing <em>privacy@wasleen.com</em>. We will respond within fifteen (15) business days.</>,
            },
            {
              number: '2',
              content:
                <><strong>Right to Correction:</strong> If any personal data we hold is inaccurate, you may request correction and we will update our records promptly.</>,
            },
            {
              number: '3',
              content:
                <><strong>Right to Deletion:</strong> You may request deletion of your personal data where it is no longer required for the purpose for which it was collected, subject to any legal or warranty service retention obligations.</>,
            },
            {
              number: '4',
              content:
                <><strong>Right to Opt Out of Marketing:</strong> Any marketing communications from Wasleen include an unsubscribe option. You may also opt out at any time by contacting your project manager or emailing us directly.</>,
            },
            {
              number: '5',
              content:
                <><strong>Right to Complain:</strong> If you believe we have handled your personal data unlawfully, you have the right to lodge a complaint with the UAE Data Office at dataoffice.ae.</>,
            },
          ]}
        />

        <AlertBox title="We Never Sell Your Data">
          Wasleen does not sell, rent, or trade your personal information to any third party
          under any circumstance. The only third parties who receive your data are those essential
          to delivering your project — payment processing (Paddle), communication (WhatsApp
          Business), and email (Resend). Each is governed by its own GDPR-compliant privacy policy.
        </AlertBox>
      </PolicySection>
    </LegalPageTemplate>
  );
}
