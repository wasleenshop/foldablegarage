// ═══════════════════════════════════════════════════
// SpecsPage — Page 8: Technical Specifications Table
// ═══════════════════════════════════════════════════

import { Page, View, Text, Image } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { styles, COLOURS } from '../shared/styles';
import { PageFooter } from '../shared/PageFooter';
import { GoldDivider } from '../shared/GoldDivider';

const specStyles = StyleSheet.create({
  page: {
    backgroundColor: COLOURS.bgSecondary,
    padding: 40,
    fontFamily: 'Plus Jakarta Sans',
    position: 'relative',
  },
  contentRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
    flex: 1,
  },
  tableCol: {
    flex: 3,
  },
  diagramCol: {
    flex: 2,
    justifyContent: 'center',
  },
  table: {
    width: '100%',
    borderWidth: 1,
    borderColor: COLOURS.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.border,
  },
  tableRowLast: {
    flexDirection: 'row',
  },
  tableLabel: {
    flex: 2,
    padding: 8,
    backgroundColor: COLOURS.bgCard,
  },
  tableValue: {
    flex: 3,
    padding: 8,
  },
  labelText: {
    fontSize: 8,
    fontWeight: 600,
    color: COLOURS.accentGold,
    letterSpacing: '0.05em',
  },
  valueText: {
    fontSize: 8,
    fontWeight: 400,
    color: COLOURS.textPrimary,
    lineHeight: 1.4,
  },
  sectionLabel: {
    fontSize: 9,
    fontWeight: 700,
    color: COLOURS.textPrimary,
    padding: 10,
    backgroundColor: COLOURS.bgCard,
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.border,
  },
  diagram: {
    width: '100%',
    height: 280,
    objectFit: 'contain',
  },
  noteBox: {
    backgroundColor: COLOURS.bgCard,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLOURS.border,
    borderLeftWidth: 3,
    borderLeftColor: COLOURS.accentGold,
    padding: 10,
    marginTop: 10,
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  noteText: {
    fontSize: 7.5,
    fontWeight: 400,
    color: COLOURS.textTertiary,
    lineHeight: 1.4,
    flex: 1,
  },
});

const specsData = [
  { label: 'Structure Material', value: '6063-T5 Aluminium Alloy' },
  { label: 'Finish', value: 'PVDF Coating — Kynar 500® Resin' },
  { label: 'Width Range', value: '2m — 12m' },
  { label: 'Length Range', value: '6m — 30m' },
  { label: 'Roof Option 1', value: '6mm Twin-Wall Polycarbonate (99.9% UV)' },
  { label: 'Roof Option 2', value: '6mm Toughened Glass' },
  { label: 'Wind Load Rating', value: '120 km/h' },
  { label: 'UV Protection', value: '99.9%' },
  { label: 'Rail System', value: 'Precision Rail ±1mm Tolerance' },
  { label: 'Roller Rating', value: '500 kg per roller' },
  { label: 'Automation', value: 'Remote / App / Rain Sensor' },
  { label: 'Structural Warranty', value: '5 Years' },
  { label: 'Delivery Time', value: '< 60 Days' },
  { label: 'Installation', value: 'By Wasleen Team (quote separately)' },
];

export function SpecsPage() {
  return (
    <Page size="A4" style={specStyles.page}>
      <Text style={styles.sectionSubtitle}>Engineering Data</Text>
      <Text style={styles.sectionTitle}>TECHNICAL SPECIFICATIONS</Text>
      <GoldDivider />

      <View style={specStyles.contentRow}>
        <View style={specStyles.tableCol}>
          <View style={specStyles.table}>
            {/* Header */}
            <View style={[specStyles.tableRow, { backgroundColor: COLOURS.accentGold }]}>
              <View style={[specStyles.tableLabel, { backgroundColor: 'transparent' }]}>
                <Text style={{ fontSize: 8, fontWeight: 700, color: COLOURS.bgPrimary }}>Specification</Text>
              </View>
              <View style={[specStyles.tableValue, { backgroundColor: 'transparent' }]}>
                <Text style={{ fontSize: 8, fontWeight: 700, color: COLOURS.bgPrimary }}>Value</Text>
              </View>
            </View>

            {/* Rows */}
            {specsData.map((spec, i) => (
              <View
                key={i}
                style={i === specsData.length - 1 ? specStyles.tableRowLast : specStyles.tableRow}
              >
                <View style={specStyles.tableLabel}>
                  <Text style={specStyles.labelText}>{spec.label}</Text>
                </View>
                <View style={specStyles.tableValue}>
                  <Text style={specStyles.valueText}>{spec.value}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Note */}
          <View style={specStyles.noteBox}>
            <Text style={{ fontSize: 12, color: COLOURS.accentGold }}>⚙️</Text>
            <Text style={specStyles.noteText}>
              All specifications are for standard configurations. Custom dimensions and
              commercial-grade specifications available on request.
            </Text>
          </View>
        </View>

        {/* Right: Engineering diagram */}
        <View style={specStyles.diagramCol}>
          <Image
            style={specStyles.diagram}
            src="/images/specification-foldable-and-retractable-garage.webp"
          />
          <Text style={{
            fontSize: 7,
            fontWeight: 400,
            color: COLOURS.textTertiary,
            textAlign: 'center',
            marginTop: 6,
          }}>
            Engineering cross-section — 6063-T5 aluminium alloy frame
          </Text>
        </View>
      </View>

      <PageFooter pageNumber={8} />
    </Page>
  );
}
