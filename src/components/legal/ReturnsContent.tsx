'use client';

import {
  LegalPageTemplate,
  PolicySection,
  PolicyBody,
  PolicySubSection,
  PolicyTable,
  AlertBox,
  PolicyDivider,
} from '@/components/legal/LegalPageTemplate';

export function ReturnsContent() {
  return (
    <LegalPageTemplate
      title="Returns, Exchanges & Refund Policy"
      subtitle="Because every Wasleen structure is custom-manufactured and permanently installed at your property, standard retail return policies do not apply. However, your absolute satisfaction and safety are our highest priorities."
      effectiveDate="1 June 2025"
    >
      {/* Section 1 */}
      <PolicySection
        id="r-intro"
        number="01"
        title="30-Day Structural Integrity & Modification Policy"
        intro="Because every Wasleen structure is custom-manufactured and permanently installed at your property, standard retail return policies do not apply. However, your absolute satisfaction and safety are our highest priorities."
      >
        <PolicyBody>
          <p>
            Every Wasleen retractable garage is engineered and fabricated to your precise
            specifications — your chosen dimensions, material selection, colour finish, and
            configuration are custom-produced upon order confirmation. Unlike off-the-shelf
            products, a Wasleen structure cannot be restocked, resold, or repurposed once
            fabricated and installed.
          </p>
          <p>
            This policy is written to be fair to both parties: to give you meaningful,
            substantive protections and a genuine resolution pathway for any structural concern,
            while accurately reflecting the bespoke nature of the product you have commissioned.
          </p>
        </PolicyBody>
      </PolicySection>

      <PolicyDivider />

      {/* Section 2 - Structural Resolution */}
      <PolicySection
        id="r-structural"
        number="02"
        title="Structural Issue Resolution — Within 30 Days"
      >
        <PolicyBody>
          <p>
            If you identify any structural issue, manufacturing defect, or installation concern
            within thirty (30) calendar days of the installation completion date, please notify
            your Wasleen project manager immediately. This 30-day period is your primary window
            for raising installation-related concerns.
          </p>
        </PolicyBody>

        <PolicySubSection title="Our Commitment — Priority Resolution at No Cost">
          <p>
            Upon receipt of a structural concern raised within the 30-day window, Wasleen will
            dispatch our engineering team for a comprehensive site assessment within three (3)
            business days. All confirmed structural issues, manufacturing defects, or installation
            workmanship concerns identified within this period will be resolved entirely at
            Wasleen's cost — including materials, fabrication, labour, and any required
            disassembly and reinstallation.
          </p>
          <p>
            This is unconditional. We will not charge you for resolving any issue that originates
            from our manufacturing or installation process, and we will not require you to
            demonstrate negligence on our part. Our standard is simple: if it is not right, we
            make it right.
          </p>
        </PolicySubSection>

        <PolicySubSection title="Refund Protocol — Catastrophic Structural Failure">
          <p>
            In the highly unlikely event of a catastrophic structural failure that our engineering
            team determines cannot be remedied through repair or component replacement to
            Wasleen's exacting standards, a full return and refund protocol will be initiated.
          </p>
        </PolicySubSection>

        <AlertBox title="Refund Process & Timeline">
          Upon confirmation of a qualifying catastrophic failure: (1) Wasleen will remove the
          structure at our cost within ten (10) business days. (2) A full refund of the total
          amount paid — including the deposit — will be processed within fifteen (15) business
          days of structure removal. (3) Refunds are issued via the original payment method where
          possible, or by bank transfer to a UAE account.
        </AlertBox>

        <PolicySubSection title="What Does Not Qualify for Refund">
          <p>
            To be explicit and fair: a change of preference, a change of circumstance, or a
            decision that you no longer require the structure after installation does not
            constitute grounds for a refund. This is a custom-manufactured, permanently installed
            structure commissioned at your instruction.
          </p>
        </PolicySubSection>
      </PolicySection>

      <PolicyDivider />

      {/* Section 3 - Exchanges */}
      <PolicySection
        id="r-exchange"
        number="03"
        title="Component Exchanges & Upgrades — Within 30 Days"
      >
        <PolicyBody>
          <p>
            We understand that seeing your structure fully installed may prompt a desire to
            modify certain cosmetic or functional elements. We accommodate exchange requests
            within the first thirty (30) days of installation.
          </p>
        </PolicyBody>

        <PolicySubSection title="What Can Be Exchanged">
          <PolicyTable
            headers={['Component', 'Exchange Available?', 'Notes']}
            rows={[
              ['Polycarbonate panel tint/colour', 'Yes', 'Subject to exchange fee. New panels custom-cut to specification.'],
              ['Glass panel type (PC to laminated glass)', 'Yes', 'Subject to exchange fee + material cost differential.'],
              ['Frame colour (powder coat)', 'Limited', 'Assessed case by case. Factory refinishing required.'],
              ['Motor system upgrade (manual → automatic)', 'Yes', 'Subject to upgrade fee. Full motor kit installation included.'],
              ['LED lighting addition', 'Yes', 'Standard add-on. Quoted separately. No exchange fee applies.'],
              ['Structure dimensions', 'No', 'Custom-fabricated to original specification. Cannot be altered post-installation.'],
            ]}
          />
        </PolicySubSection>

        <PolicySubSection title="Understanding Exchange Fees — Why They Apply">
          <p>
            Exchange fees are not a commercial penalty. They are a transparent recovery of the
            genuine costs incurred when custom components are replaced. Specifically, exchange
            fees cover the cost of new custom-cut or factory-fabricated replacement materials,
            the skilled labour required to safely dismantle the existing components without
            structural damage, the reinstallation of the new components to our installation
            standard, and the safe disposal or return-to-factory of the removed originals.
          </p>
          <p>
            We provide a fully itemised exchange quotation — broken down by material, fabrication,
            and labour — for your review and written approval before any exchange work begins.
            No work commences without your explicit written confirmation.
          </p>
        </PolicySubSection>
      </PolicySection>

      <PolicyDivider />

      {/* Section 4 - Deposit */}
      <PolicySection
        id="r-deposit"
        number="04"
        title="Deposit & Cancellation Policy"
      >
        <PolicySubSection title="Payment Schedule">
          <PolicyTable
            headers={['Stage', 'Amount', 'When Due']}
            rows={[
              ['Reservation Deposit', '20% of total project value', 'Upon order confirmation. Secures your installation slot and initiates custom fabrication.'],
              ['Pre-Installation Payment', '60% of total project value', '7 days prior to confirmed installation date.'],
              ['Completion Payment', '20% of total project value', 'Upon installation completion and client sign-off.'],
            ]}
          />
        </PolicySubSection>

        <PolicySubSection title="Cancellation Before Fabrication Commences">
          <p>
            If you choose to cancel your order within seventy-two (72) hours of placing it, and
            prior to any custom fabrication commencing, your reservation deposit will be refunded
            in full. To confirm whether fabrication has commenced, contact your project manager
            immediately.
          </p>
        </PolicySubSection>

        <PolicySubSection title="Cancellation After Fabrication Has Commenced">
          <p>
            Once custom fabrication has been initiated using your approved specifications, material
            and fabrication costs are committed and non-recoverable. In this event, the reservation
            deposit is non-refundable as it represents a direct offset against committed
            fabrication costs.
          </p>
        </PolicySubSection>

        <AlertBox title="Important — Custom Fabrication Begins Promptly" caution>
          Wasleen initiates the custom fabrication process within five (5) business days of order
          confirmation and deposit receipt. If you have any concern about your order, please
          contact your project manager immediately.
        </AlertBox>
      </PolicySection>
    </LegalPageTemplate>
  );
}
