// ═══════════════════════════════════════════════════
// PricingPage — Page 9: 3-tier pricing
// ═══════════════════════════════════════════════════

import { Page, View, Text } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { styles, COLOURS } from '../shared/styles';
import { PageFooter } from '../shared/PageFooter';
import { GoldDivider } from '../shared/GoldDivider';
import { PRICING_TIERS, SITE_URL } from '@/lib/constants';

const pricingStyles = StyleSheet.create({
  page: {
    backgroundColor: COLOURS.bgSecondary,
    padding: 40,
    fontFamily: 'Plus Jakarta Sans',
    position: 'relative',
  },
  tierRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 10,
    flex: 1,
    alignItems: 'flex-start',
  },
  tierCard: {
    flex: 1,
    backgroundColor: COLOURS.bgCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOURS.border,
    padding: 16,
    alignItems: 'center',
  },
  tierCardPopular: {
    flex: 1,
    backgroundColor: COLOURS.bgCard,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLOURS.accentGold,
    padding: 16,
    alignItems: 'center',
    // Elevation effect via shadow-like border
    marginTop: -4,
  },
  popularBadge: {
    backgroundColor: COLOURS.accentGold,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
  },
  popularBadgeText: {
    fontSize: 7,
    fontWeight: 700,
    color: COLOURS.bgPrimary,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  tierTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: COLOURS.textPrimary,
    marginBottom: 4,
    letterSpacing: '0.1em',
  },
  tierPrice: {
    fontSize: 22,
    fontWeight: 700,
    color: COLOURS.accentGold,
    marginBottom: 2,
  },
  tierPriceLabel: {
    fontSize: 8,
    fontWeight: 400,
    color: COLOURS.textTertiary,
    marginBottom: 12,
  },
  tierFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 5,
    width: '100%',
  },
  tierBullet: {
    width: 3,
    height: 3,
    backgroundColor: COLOURS.accentGold,
    borderRadius: 1.5,
    flexShrink: 0,
  },
  tierFeatureText: {
    fontSize: 8,
    fontWeight: 400,
    color: COLOURS.textSecondary,
    flex: 1,
  },
  ctaBanner: {
    backgroundColor: COLOURS.accentGold,
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: COLOURS.bgPrimary,
    marginBottom: 4,
  },
  ctaSub: {
    fontSize: 8.5,
    fontWeight: 500,
    color: COLOURS.bgPrimary,
    opacity: 0.85,
    textAlign: 'center',
  },
  noteText: {
    fontSize: 7.5,
    fontWeight: 400,
    color: COLOURS.textTertiary,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 1.4,
  },
});

export function PricingPage() {
  return (
    <Page size="A4" style={pricingStyles.page}>
      <Text style={styles.sectionSubtitle}>Investment</Text>
      <Text style={styles.sectionTitle}>PRICING</Text>
      <GoldDivider />

      <Text style={{ fontSize: 8.5, color: COLOURS.textTertiary, marginBottom: 6, lineHeight: 1.4 }}>
        Choose the configuration that suits your needs. All prices are indicative — get your
        exact quote online in 3 simple steps.
      </Text>

      {/* Three pricing tiers */}
      <View style={pricingStyles.tierRow}>
        {PRICING_TIERS.map((tier) => {
          const isPopular = 'popular' in tier && tier.popular === true;
          return (
            <View
              key={tier.id}
              style={isPopular ? pricingStyles.tierCardPopular : pricingStyles.tierCard}
            >
              {/* Popular badge */}
              {isPopular && (
                <View style={pricingStyles.popularBadge}>
                  <Text style={pricingStyles.popularBadgeText}>★ Most Popular</Text>
                </View>
              )}

              {/* Title */}
              <Text style={pricingStyles.tierTitle}>{tier.title}</Text>

              {/* Price */}
              <Text style={pricingStyles.tierPrice}>
                {tier.priceFrom === 'Custom' ? 'Custom' : `AED ${tier.priceFrom}`}
              </Text>
              <Text style={pricingStyles.tierPriceLabel}>
                {tier.priceFrom === 'Custom' ? 'Request a quote' : 'Starting price'}
              </Text>

              {/* Features */}
              {tier.features.map((feature, i) => (
                <View key={i} style={pricingStyles.tierFeature}>
                  <View style={pricingStyles.tierBullet} />
                  <Text style={pricingStyles.tierFeatureText}>{feature}</Text>
                </View>
              ))}
            </View>
          );
        })}
      </View>

      {/* CTA Banner */}
      <View style={pricingStyles.ctaBanner}>
        <Text style={pricingStyles.ctaTitle}>
          Get your exact quote online →
        </Text>
        <Text style={pricingStyles.ctaSub}>
          Configure your custom carport in 3 easy steps
        </Text>
      </View>

      <Text style={pricingStyles.noteText}>
        Prices include VAT. Delivery and installation quoted separately.{'\n'}
        Commercial and custom-RAL projects — contact us for a tailored proposal.
      </Text>

      <PageFooter pageNumber={9} />
    </Page>
  );
}
