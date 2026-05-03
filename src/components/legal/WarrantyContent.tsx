'use client';

import {
  LegalPageTemplate,
  PolicySection,
  PolicyBody,
  PolicyList,
  PolicyTable,
  AlertBox,
  WarrantyTierCard,
  PolicyDivider,
  PolicySubSection,
} from '@/components/legal/LegalPageTemplate';

export function WarrantyContent() {
  return (
    <LegalPageTemplate
      title="Wasleen Comprehensive Warranty Policy"
      subtitle="Every Wasleen structure is an investment. These policies are written to protect that investment — yours and ours — with complete transparency and mutual respect."
      effectiveDate="1 June 2025"
    >
      {/* Section 1 */}
      <PolicySection
        id="w-intro"
        number="01"
        title="The Wasleen Comprehensive Warranty"
        intro="We engineer our retractable garages to withstand the harsh Middle Eastern climate. Because we use premium, aviation-grade materials and precision manufacturing, we proudly stand behind our structures with one of the most robust warranties in the industry."
      >
        <PolicyBody>
          <p>
            At Wasleen, our warranty is not a legal formality — it is the ultimate expression
            of our confidence in our engineering and craftsmanship. Each structure is
            custom-manufactured using internationally certified materials and installed by our
            accredited technical team.
          </p>
          <p>
            This Warranty Policy applies to all retractable garage and carport structures
            installed by Wasleen's authorised technical team at the registered installation
            address. Coverage commences on the date of final installation sign-off and runs
            for the periods specified below.
          </p>
        </PolicyBody>
      </PolicySection>

      <PolicyDivider />

      {/* Section 2 - Multi-Tier Coverage */}
      <PolicySection
        id="w-coverage"
        number="02"
        title="Multi-Tiered Coverage"
      >
        <PolicyBody>
          <p>
            Your Wasleen installation is protected by a structured, multi-tiered warranty that
            addresses each principal component of your structure individually — because different
            materials perform over different timescales, and our commitment to each reflects that
            reality.
          </p>
        </PolicyBody>

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          <WarrantyTierCard
            years="15"
            label="Year Guarantee"
            component="Aluminium Alloy Frame"
            description="Structural integrity, severe warping, and manufacturing defects of the 6063-T5 aviation-grade aluminium framing system, extrusion profiles, and load-bearing components."
          />
          <WarrantyTierCard
            years="5"
            label="Year Guarantee"
            component="Enclosure Panels"
            description="Premature degradation, severe discolouration beyond normal weathering tolerance, delamination, and structural failure of polycarbonate or laminated glass enclosure panels."
          />
          <WarrantyTierCard
            years="3"
            label="Year Guarantee"
            component="Motor & Mechanical Systems"
            description="The motorised retraction system, electronic control unit, sliding mechanisms, precision ground tracks, heavy-duty roller assemblies, and sealed bearing components."
          />
        </div>
      </PolicySection>

      <PolicyDivider />

      {/* Section 3 - What is Covered */}
      <PolicySection
        id="w-covered"
        number="03"
        title="What Your Warranty Covers"
      >
        <PolicyBody>
          <p>
            Wasleen's warranty covers defects that originate from the manufacturing process,
            material specification, or our installation workmanship. Specifically, coverage includes:
          </p>
        </PolicyBody>

        <PolicyList
          items={[
            {
              number: '1',
              content:
                'Structural failure or severe deformation of the aluminium frame caused by a manufacturing defect, not by external physical damage or unauthorised load-bearing.',
            },
            {
              number: '2',
              content:
                'Coating failure of the PVDF fluorocarbon surface treatment that manifests as peeling, blistering, or colour change beyond the AAMA 2605 standard\'s accepted tolerance within the warranty period.',
            },
            {
              number: '3',
              content:
                'Premature brittleness, cracking, or yellowing of polycarbonate panels that occurs under normal operating conditions and within the warranty period, attributable to material or manufacturing defect.',
            },
            {
              number: '4',
              content:
                'Failure of the motorised retraction mechanism, including the motor unit, control board, remote receiver, or rail system, arising from manufacturing or installation defect.',
            },
            {
              number: '5',
              content:
                'Water or air ingress through the sealed perimeter system that results from a manufacturing or installation defect in the gasket or sealing system, identified within the warranty period.',
            },
            {
              number: '6',
              content:
                'Any defect in workmanship attributable to Wasleen\'s installation team, including misaligned rails, improperly secured anchors, or incorrect motor calibration.',
            },
          ]}
        />
      </PolicySection>

      <PolicyDivider />

      {/* Section 4 - Exclusions */}
      <PolicySection
        id="w-exclusions"
        number="04"
        title="Warranty Exclusions"
      >
        <PolicyBody>
          <p>
            In the interest of complete transparency, the following circumstances fall outside
            the scope of this warranty. We present these exclusions clearly so that expectations
            are fully aligned from the outset of your project.
          </p>
        </PolicyBody>

        <AlertBox title="Important — Please Read Carefully" caution>
          The following exclusions are standard across the premium outdoor structure industry and
          reflect events or actions that are outside Wasleen's control, scope of supply, or
          responsibility.
        </AlertBox>

        <PolicyTable
          headers={['Exclusion Category', 'Description']}
          rows={[
            [
              'Acts of God & Extreme Weather',
              'Damage resulting from unprecedented natural events including exceptional sandstorms, flooding, seismic activity, lightning strike, hail, or wind events exceeding the structure\'s rated specification.',
            ],
            [
              'Unauthorised Modifications',
              'Any structural or mechanical alteration carried out by a party other than Wasleen\'s authorised technical personnel, including additions of weight loads not specified in the original project scope.',
            ],
            [
              'Third-Party Tampering',
              'Damage or malfunction resulting from attempted repair, adjustment, or modification of the motorised system by any party not certified by Wasleen.',
            ],
            [
              'Neglect & Improper Maintenance',
              'Failure arising from failure to perform the recommended routine maintenance as set out in your Installation & Care Manual.',
            ],
            [
              'Physical Damage',
              'Impact damage from vehicles, tools, falling objects, or deliberate acts. Scratches, dents, or surface abrasion resulting from daily use.',
            ],
            [
              'Cosmetic Wear & Tear',
              'Normal surface oxidation, minor surface scratches, or minor colour variation within the accepted AAMA 2605 tolerance after extended outdoor exposure.',
            ],
            [
              'Electrical Supply Issues',
              'Damage to the motorised system resulting from power surges, voltage fluctuations, or incorrect electrical supply at the installation site.',
            ],
            [
              'Site Conditions & Foundation',
              'Any issue attributable to the condition, movement, or failure of the foundation, ground, or permanent structure to which the installation is anchored.',
            ],
          ]}
        />
      </PolicySection>

      <PolicyDivider />

      {/* Section 5 - Claims */}
      <PolicySection
        id="w-claims"
        number="05"
        title="Making a Warranty Claim"
      >
        <PolicySubSection title="Step-by-step claim process">
          <p>
            We have designed our claims process to be as frictionless as possible. Our goal is to
            resolve every genuine warranty matter within a defined timeframe, with minimal disruption
            to you.
          </p>
        </PolicySubSection>

        <PolicyList
          items={[
            {
              number: '1',
              content:
                <><strong>Notify Us in Writing:</strong> Submit your warranty claim via email to <em>warranty@wasleen.com</em> or via WhatsApp to your assigned project manager. Include your project reference number, the date of installation, a clear description of the issue, and supporting photographs.</>,
            },
            {
              number: '2',
              content:
                <><strong>Initial Assessment (Within 48 hours):</strong> Our technical team will review your submission and provide an initial assessment within two (2) business days, confirming whether the reported issue falls within warranty scope.</>,
            },
            {
              number: '3',
              content:
                <><strong>Site Inspection (Within 5 Business Days):</strong> For claims that require on-site assessment, a Wasleen-certified engineer will attend the installation address within five (5) business days of claim submission.</>,
            },
            {
              number: '4',
              content:
                <><strong>Resolution (Within 14 Business Days):</strong> All confirmed warranty repairs or replacements will be completed within fourteen (14) business days of claim confirmation, subject to component availability.</>,
            },
            {
              number: '5',
              content:
                <><strong>Confirmation of Completion:</strong> Upon resolution, Wasleen will issue a written Warranty Completion Certificate confirming the work carried out and confirming the remainder of your warranty period remains in force.</>,
            },
          ]}
        />

        <AlertBox title="Warranty Transferability">
          Your Wasleen warranty is registered to the installation address and transfers automatically
          to any subsequent owner of the property within the warranty period. To update ownership
          records, please notify us at <em>warranty@wasleen.com</em> with proof of ownership transfer.
          There is no transfer fee.
        </AlertBox>
      </PolicySection>
    </LegalPageTemplate>
  );
}
