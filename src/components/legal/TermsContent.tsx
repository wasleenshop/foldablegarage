'use client';

import {
  LegalPageTemplate,
  PolicySection,
  PolicyBody,
  PolicySubSection,
  PolicyList,
  AlertBox,
  PolicyDivider,
} from '@/components/legal/LegalPageTemplate';

export function TermsContent() {
  return (
    <LegalPageTemplate
      title="Terms & Conditions of Sale and Service"
      subtitle="These Terms & Conditions govern the design, fabrication, supply, and installation of retractable garage and carport structures by Wasleen Foldable Garage in the UAE."
      effectiveDate="1 June 2025"
    >
      {/* Section 1 */}
      <PolicySection
        id="t-parties"
        number="01"
        title="Parties & Agreement"
      >
        <PolicyBody>
          <p>
            These Terms and Conditions ("Terms") constitute a legally binding agreement
            between Wasleen Foldable Garage ("Wasleen," "we," "our,"
            or "us"), operating under Wasleen Premium Products in the Emirate of Dubai,
            United Arab Emirates, and you, the customer ("Client," "you," or
            "your"), in relation to the design, fabrication, supply, and installation
            of retractable garage and carport structures.
          </p>
          <p>
            By placing a deposit, signing a project quotation, or instructing Wasleen to commence
            work, you confirm that you have read, understood, and accepted these Terms in their
            entirety. These Terms govern all current and future commercial transactions between
            Wasleen and the Client unless explicitly superseded in writing by a signed project
            agreement.
          </p>
        </PolicyBody>
      </PolicySection>

      <PolicyDivider />

      {/* Section 2 */}
      <PolicySection
        id="t-orders"
        number="02"
        title="Quotations, Orders & Custom Specifications"
      >
        <PolicyBody>
          <p>
            All quotations provided by Wasleen are valid for fourteen (14) calendar days from the
            date of issue, unless stated otherwise in writing. Quotations are prepared based on
            information provided by the Client at the time of site survey and are subject to
            revision if site conditions differ materially from those surveyed.
          </p>
          <p>
            A quotation becomes a binding order upon the Client's written confirmation of the
            specified design, materials, and dimensions, and the receipt of the reservation deposit
            as specified in our Returns Policy. The Client is responsible for verifying all
            specifications — dimensions, colour selection, material choice, and motor configuration
            — prior to providing written confirmation.
          </p>
          <p>
            Any change to an approved specification requested after written order confirmation
            must be submitted in writing to the project manager. Changes are subject to feasibility
            assessment, and any associated costs or lead time extensions will be communicated to
            the Client for approval prior to implementation.
          </p>
        </PolicyBody>
      </PolicySection>

      <PolicyDivider />

      {/* Section 3 */}
      <PolicySection
        id="t-installation"
        number="03"
        title="Site Conditions & Installation"
      >
        <PolicySubSection title="Client Obligations — Site Readiness">
          <p>
            The Client is responsible for ensuring that the installation site is accessible,
            cleared, and prepared in accordance with the requirements communicated by
            Wasleen's site survey team. Specifically: the installation surface must be level
            concrete or equivalent hard standing capable of supporting the structure's load;
            power supply (230V AC) must be available within 5 metres of the installation point for
            motorised units; and the Client must obtain any applicable NOC from their building
            management or master developer prior to the agreed installation date.
          </p>
          <p>
            Any delay to the installation schedule resulting from incomplete site preparation,
            inaccessibility, or absence of a required permit will be documented, and any associated
            rescheduling costs will be the Client's responsibility.
          </p>
        </PolicySubSection>

        <PolicySubSection title="Installation Completion & Handover">
          <p>
            Upon completion of installation, Wasleen's installation lead will conduct a
            comprehensive handover inspection in the presence of the Client or their authorised
            representative. The Client will be given a demonstration of the retraction mechanism
            and all operational features. The Client or their representative must sign the
            Installation Completion Certificate at handover. The date of this signature constitutes
            the official installation completion date for all warranty and return policy purposes.
          </p>
        </PolicySubSection>
      </PolicySection>

      <PolicyDivider />

      {/* Section 4 */}
      <PolicySection
        id="t-liability"
        number="04"
        title="Limitation of Liability"
      >
        <PolicyBody>
          <p>
            Wasleen's total liability to the Client for any claim arising under these Terms
            — whether in contract, tort, or otherwise — shall not exceed the total value of the
            project as stated in the signed quotation.
          </p>
          <p>
            Wasleen shall not be liable for any indirect, consequential, or economic losses arising
            from the use or unavailability of the installed structure, including but not limited to:
            vehicle damage occurring while the structure is in use; loss of use of the structure
            during a warranty repair period; or damage to property adjacent to the installation
            arising from structural failure caused by an event excluded from warranty coverage.
          </p>
          <p>
            Wasleen maintains professional indemnity and public liability insurance appropriate to
            the nature of our installation activities. Evidence of this insurance is available upon
            written request.
          </p>
        </PolicyBody>
      </PolicySection>

      <PolicyDivider />

      {/* Section 5 */}
      <PolicySection
        id="t-disputes"
        number="05"
        title="Dispute Resolution & Governing Law"
      >
        <PolicyBody>
          <p>
            These Terms are governed by the laws of the United Arab Emirates and, where applicable,
            the laws of the Emirate of Dubai. In the event of any dispute arising under these Terms
            that cannot be resolved through good-faith direct discussion between the parties, both
            parties agree to first submit to non-binding mediation administered by the Dubai Chamber
            of Commerce and Industry before initiating any formal legal proceeding.
          </p>
          <p>
            Should mediation fail to produce resolution within sixty (60) days, disputes shall be
            referred to the exclusive jurisdiction of the courts of the Emirate of Dubai.
          </p>
        </PolicyBody>

        <AlertBox title="Our Commitment to Fair Resolution">
          In our experience, disputes that reach the formal mediation stage are rare — because we
          communicate proactively, document everything in writing, and treat every client concern
          as a priority. Our project managers are your first and most effective point of resolution,
          and we encourage direct communication above all else.
        </AlertBox>
      </PolicySection>

      <PolicyDivider />

      {/* Section 6 */}
      <PolicySection
        id="t-general"
        number="06"
        title="General Provisions"
      >
        <PolicyList
          items={[
            {
              number: '1',
              content:
                <><strong>Entire Agreement:</strong> These Terms, together with the signed project quotation, constitute the entire agreement between the parties and supersede all prior representations, discussions, or correspondence relating to the subject matter of the project.</>,
            },
            {
              number: '2',
              content:
                <><strong>Severability:</strong> If any provision of these Terms is found by a competent authority to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.</>,
            },
            {
              number: '3',
              content:
                <><strong>Waiver:</strong> Failure by Wasleen to enforce any provision of these Terms on one occasion shall not constitute a waiver of our right to enforce that provision on any subsequent occasion.</>,
            },
            {
              number: '4',
              content:
                <><strong>Assignment:</strong> The Client may not assign rights or obligations under these Terms without Wasleen's prior written consent. Wasleen may assign performance of the installation to a qualified subcontractor while retaining full responsibility for the quality and outcome of all work carried out.</>,
            },
            {
              number: '5',
              content:
                <><strong>Force Majeure:</strong> Neither party shall be liable for delay or failure to perform obligations under these Terms arising from events genuinely outside their reasonable control, including but not limited to natural disasters, pandemics, government orders, or civil unrest.</>,
            },
            {
              number: '6',
              content:
                <><strong>Policy Updates:</strong> Wasleen reserves the right to update these Terms periodically. Updated Terms take effect from their published effective date and apply to orders placed after that date.</>,
            },
          ]}
        />
      </PolicySection>
    </LegalPageTemplate>
  );
}
