// ═══════════════════════════════════════════════════
// AboutPage — Page 2: Brand story + stats
// ═══════════════════════════════════════════════════

import { Page, View, Text, Image } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { styles, COLOURS } from '../shared/styles';
import { PageFooter } from '../shared/PageFooter';
import { GoldDivider } from '../shared/GoldDivider';
import { StatNumber } from '../shared/StatNumber';
import { STATS } from '@/lib/constants';

const aboutStyles = StyleSheet.create({
  page: {
    backgroundColor: COLOURS.bgSecondary,
    padding: 40,
    fontFamily: 'Plus Jakarta Sans',
    position: 'relative',
  },
  contentRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 8,
    flex: 1,
  },
  textCol: {
    flex: 3,
    justifyContent: 'center',
  },
  imageCol: {
    flex: 2,
    justifyContent: 'center',
  },
  aboutImage: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
    borderRadius: 8,
  },
  paragraph: {
    fontSize: 9.5,
    fontWeight: 400,
    color: COLOURS.textSecondary,
    lineHeight: 1.7,
    marginBottom: 10,
  },
  highlight: {
    color: COLOURS.accentGold,
    fontWeight: 600,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: COLOURS.border,
    borderBottomWidth: 1,
    borderBottomColor: COLOURS.border,
  },
  brandValues: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  valueBadge: {
    backgroundColor: COLOURS.bgCard,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLOURS.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    flex: 1,
    alignItems: 'center',
  },
  valueText: {
    fontSize: 8,
    fontWeight: 600,
    color: COLOURS.textPrimary,
    textAlign: 'center',
  },
  valueSub: {
    fontSize: 6.5,
    fontWeight: 400,
    color: COLOURS.textTertiary,
    textAlign: 'center',
    marginTop: 2,
  },
});

export function AboutPage() {
  return (
    <Page size="A4" style={aboutStyles.page}>
      {/* Header */}
      <Text style={styles.sectionSubtitle}>About</Text>
      <Text style={styles.sectionTitle}>WASLEEN</Text>
      <GoldDivider />

      {/* Content row: Text + Image */}
      <View style={aboutStyles.contentRow}>
        <View style={aboutStyles.textCol}>
          <Text style={aboutStyles.paragraph}>
            Wasleen is a Dubai-based engineering company specializing in premium retractable
            carports and foldable garage systems. We combine <Text style={aboutStyles.highlight}>German-engineered
            mechanisms</Text> with precision-fabricated aluminium structures to deliver carports
            that are as sophisticated as the vehicles they protect.
          </Text>
          <Text style={aboutStyles.paragraph}>
            Every Wasleen structure is built from <Text style={aboutStyles.highlight}>6063-T5 aluminium alloy</Text> —
            the same aerospace-grade material used in architectural masterpieces worldwide.
            Our PVDF coating, featuring <Text style={aboutStyles.highlight}>Kynar 500® resin</Text>, guarantees
            no fading or chalking for 15+ years under the intense UAE sun.
          </Text>
          <Text style={aboutStyles.paragraph}>
            From villa driveways in Palm Jumeirah to commercial forecourts in Dubai Marina,
            Wasleen carports are engineered to the highest standards of quality, durability,
            and aesthetic refinement.
          </Text>

          {/* Brand values */}
          <View style={aboutStyles.brandValues}>
            <View style={aboutStyles.valueBadge}>
              <Text style={aboutStyles.valueText}>Quality</Text>
              <Text style={aboutStyles.valueSub}>German precision</Text>
            </View>
            <View style={aboutStyles.valueBadge}>
              <Text style={aboutStyles.valueText}>Durability</Text>
              <Text style={aboutStyles.valueSub}>15-year coating</Text>
            </View>
            <View style={aboutStyles.valueBadge}>
              <Text style={aboutStyles.valueText}>Design</Text>
              <Text style={aboutStyles.valueSub}>Architectural grade</Text>
            </View>
          </View>
        </View>

        <View style={aboutStyles.imageCol}>
          <Image
            style={aboutStyles.aboutImage}
            src="/images/retractable-carport-aluminium-alloy-by-wasleen-pergolas.webp"
          />
        </View>
      </View>

      {/* Stats strip */}
      <View style={aboutStyles.statsRow}>
        <StatNumber value={STATS[0].value} label={STATS[0].label} suffix={'suffix' in STATS[0] ? STATS[0].suffix : undefined} />
        <StatNumber value={STATS[1].value} label={STATS[1].label} suffix={'suffix' in STATS[1] ? STATS[1].suffix : undefined} />
        <StatNumber value={STATS[2].value} label={STATS[2].label} prefix={'prefix' in STATS[2] ? STATS[2].prefix : undefined} />
        <StatNumber value={STATS[3].value} label={STATS[3].label} suffix={'suffix' in STATS[3] ? STATS[3].suffix : undefined} />
      </View>

      <PageFooter pageNumber={2} />
    </Page>
  );
}
