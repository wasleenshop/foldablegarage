// ═══════════════════════════════════════════════════
// FeaturePages — Pages 3-4: 5 engineering feature cards
// ═══════════════════════════════════════════════════

import { Page, View, Text, Image } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { styles, COLOURS } from '../shared/styles';
import { PageFooter } from '../shared/PageFooter';
import { GoldDivider } from '../shared/GoldDivider';
import { FEATURES } from '@/lib/constants';

const featureStyles = StyleSheet.create({
  page: {
    backgroundColor: COLOURS.bgSecondary,
    padding: 40,
    fontFamily: 'Plus Jakarta Sans',
    position: 'relative',
  },
  cardRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 10,
  },
  featureCard: {
    backgroundColor: COLOURS.bgCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOURS.border,
    padding: 14,
    flex: 1,
  },
  featureImage: {
    width: '100%',
    height: 110,
    objectFit: 'cover',
    borderRadius: 4,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: COLOURS.textPrimary,
    marginBottom: 6,
  },
  featureBadge: {
    backgroundColor: COLOURS.accentGold,
    borderRadius: 3,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  featureBadgeText: {
    fontSize: 6.5,
    fontWeight: 700,
    color: COLOURS.bgPrimary,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },
  specBullet: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 5,
    marginBottom: 3,
  },
  bullet: {
    width: 3,
    height: 3,
    backgroundColor: COLOURS.accentGold,
    borderRadius: 1.5,
    marginTop: 4,
    flexShrink: 0,
  },
  specText: {
    fontSize: 7.5,
    fontWeight: 400,
    color: COLOURS.textSecondary,
    lineHeight: 1.35,
    flex: 1,
  },
  fullWidthCard: {
    backgroundColor: COLOURS.bgCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOURS.border,
    padding: 14,
    marginTop: 14,
    flexDirection: 'row',
    gap: 14,
  },
  fullWidthImage: {
    width: 140,
    height: 110,
    objectFit: 'cover',
    borderRadius: 4,
  },
  fullWidthContent: {
    flex: 1,
    justifyContent: 'center',
  },
  highlightBanner: {
    backgroundColor: COLOURS.accentGold,
    borderRadius: 6,
    padding: 12,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  highlightIcon: {
    fontSize: 18,
    color: COLOURS.bgPrimary,
  },
  highlightText: {
    fontSize: 9,
    fontWeight: 700,
    color: COLOURS.bgPrimary,
    letterSpacing: '0.05em',
    flex: 1,
  },
  highlightSub: {
    fontSize: 7.5,
    fontWeight: 500,
    color: COLOURS.bgPrimary,
    opacity: 0.8,
  },
  sectionSubtitle: {
    fontSize: 10,
    fontWeight: 500,
    color: COLOURS.accentGold,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: COLOURS.textPrimary,
    marginBottom: 4,
  },
});

// Image mapping for features
const FEATURE_IMAGES: Record<string, string> = {
  'precision-rail': '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas.webp',
  'heavy-duty-roller': '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-2.webp',
  'pvdf-coating': '/images/foldable-carport-material-choice-by-wasleen-pergolas.webp',
  'polycarbonate-panels': '/images/foldable-carport-color-selection-guide-by-wasleen-pergolas.webp',
  'smart-automation': '/images/foldable-garage-diagram-aluminium-alloy-by-wasleen-pergolas.webp',
};

function FeatureBullet({ text }: { text: string }) {
  return (
    <View style={featureStyles.specBullet}>
      <View style={featureStyles.bullet} />
      <Text style={featureStyles.specText}>{text}</Text>
    </View>
  );
}

function FeatureCard({
  feature,
  badge,
}: {
  feature: (typeof FEATURES)[number];
  badge?: string;
}) {
  return (
    <View style={featureStyles.featureCard}>
      {badge && (
        <View style={featureStyles.featureBadge}>
          <Text style={featureStyles.featureBadgeText}>{badge}</Text>
        </View>
      )}
      <Image
        style={featureStyles.featureImage}
        src={FEATURE_IMAGES[feature.id] || FEATURE_IMAGES['precision-rail']}
      />
      <Text style={featureStyles.featureTitle}>{feature.title}</Text>
      {feature.specs.map((spec, i) => (
        <FeatureBullet key={i} text={spec} />
      ))}
    </View>
  );
}

/** Page 3: Features 1, 2, 3 */
export function FeaturePages() {
  const feature1 = FEATURES[0];
  const feature2 = FEATURES[1];
  const feature3 = FEATURES[2];

  return (
    <Page size="A4" style={featureStyles.page}>
      <Text style={featureStyles.sectionSubtitle}>Engineering Excellence</Text>
      <Text style={featureStyles.sectionTitle}>FEATURES</Text>
      <GoldDivider />

      <Text style={{ fontSize: 8.5, color: COLOURS.textTertiary, marginBottom: 6, lineHeight: 1.4 }}>
        Every Wasleen carport is engineered with precision German mechanisms and aerospace-grade
        materials. Here's what sets us apart.
      </Text>

      {/* Top row: 2 cards */}
      <View style={featureStyles.cardRow}>
        <FeatureCard feature={feature1} badge="Precision" />
        <FeatureCard feature={feature2} badge="Strength" />
      </View>

      {/* Full-width card: Feature 3 */}
      <View style={featureStyles.fullWidthCard}>
        <Image
          style={featureStyles.fullWidthImage}
          src={FEATURE_IMAGES[feature3.id]}
        />
        <View style={featureStyles.fullWidthContent}>
          <View style={featureStyles.featureBadge}>
            <Text style={featureStyles.featureBadgeText}>15-Year Durability</Text>
          </View>
          <Text style={featureStyles.featureTitle}>{feature3.title}</Text>
          {feature3.specs.map((spec, i) => (
            <FeatureBullet key={i} text={spec} />
          ))}
        </View>
      </View>

      {/* Highlight banner */}
      <View style={featureStyles.highlightBanner}>
        <Text style={featureStyles.highlightIcon}>⚙️</Text>
        <View style={{ flex: 1 }}>
          <Text style={featureStyles.highlightText}>
            German-engineered retraction mechanism
          </Text>
          <Text style={featureStyles.highlightSub}>
            Seamless one-touch operation · Maintenance-free bearings
          </Text>
        </View>
      </View>

      <PageFooter pageNumber={3} />
    </Page>
  );
}

/** Page 4: Features 4, 5 + full-width highlight */
export function FeaturePagesTwo() {
  const feature4 = FEATURES[3];
  const feature5 = FEATURES[4];

  return (
    <Page size="A4" style={featureStyles.page}>
      <Text style={featureStyles.sectionSubtitle}>Engineering Excellence (cont.)</Text>
      <Text style={featureStyles.sectionTitle}>FEATURES</Text>
      <GoldDivider />

      {/* Two cards side by side */}
      <View style={featureStyles.cardRow}>
        <FeatureCard feature={feature4} badge="Impact Resistance" />
        <FeatureCard feature={feature5} badge="Smart Tech" />
      </View>

      {/* Mechanism highlight banner */}
      <View style={{
        backgroundColor: COLOURS.bgCard,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLOURS.accentGold,
        padding: 16,
        marginTop: 14,
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: 16,
          fontWeight: 700,
          color: COLOURS.accentGold,
          marginBottom: 6,
          textAlign: 'center',
        }}>
          German-Engineered Retraction Mechanism
        </Text>
        <Text style={{
          fontSize: 9,
          fontWeight: 400,
          color: COLOURS.textSecondary,
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          Seamless one-touch operation with self-lubricating roller bearings.
          Precision-machined 6063-T5 aluminium rails ensure ±1mm tolerance
          across the full 12-metre width. No sag, no sticking — guaranteed.
        </Text>
      </View>

      {/* Feature summary */}
      <View style={{
        flexDirection: 'row',
        gap: 10,
        marginTop: 14,
      }}>
        {[
          { label: 'Materials', value: '6063-T5 Aluminium' },
          { label: 'Finish', value: 'PVDF Kynar 500®' },
          { label: 'Tolerance', value: '±1mm Precision' },
          { label: 'Load Rating', value: '500 kg/roller' },
        ].map((item, i) => (
          <View key={i} style={{
            backgroundColor: COLOURS.bgCard,
            borderRadius: 4,
            borderWidth: 1,
            borderColor: COLOURS.border,
            padding: 8,
            flex: 1,
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 6.5, fontWeight: 500, color: COLOURS.accentGold, marginBottom: 2, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {item.label}
            </Text>
            <Text style={{ fontSize: 7.5, fontWeight: 600, color: COLOURS.textPrimary, textAlign: 'center' }}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>

      <PageFooter pageNumber={4} />
    </Page>
  );
}
