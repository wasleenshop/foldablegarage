// ═══════════════════════════════════════════════════
// GalleryPage — Pages 10-11: Installation Gallery
// ═══════════════════════════════════════════════════

import { Page, View, Text, Image } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { styles, COLOURS } from '../shared/styles';
import { PageFooter } from '../shared/PageFooter';
import { GoldDivider } from '../shared/GoldDivider';
import { SITE_URL } from '@/lib/constants';

// ─── Gallery Page 10: 2×2 Grid ─────────────────────

const galleryStyles = StyleSheet.create({
  page: {
    backgroundColor: COLOURS.bgSecondary,
    padding: 40,
    fontFamily: 'Plus Jakarta Sans',
    position: 'relative',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
    flex: 1,
  },
  gridItem: {
    width: '47%',
    backgroundColor: COLOURS.bgCard,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLOURS.border,
    overflow: 'hidden',
    height: 140,
  },
  gridImage: {
    width: '100%',
    height: 100,
    objectFit: 'cover' as const,
  },
  gridLabel: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  gridTitle: {
    fontSize: 8.5,
    fontWeight: 600,
    color: COLOURS.textPrimary,
    marginBottom: 1,
  },
  gridSub: {
    fontSize: 7,
    fontWeight: 400,
    color: COLOURS.textTertiary,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  ctaCard: {
    flex: 1,
    backgroundColor: COLOURS.accentGold,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: COLOURS.bgPrimary,
    marginBottom: 3,
  },
  ctaSub: {
    fontSize: 7.5,
    fontWeight: 500,
    color: COLOURS.bgPrimary,
    opacity: 0.85,
    textAlign: 'center',
  },
  ctaCardOutline: {
    flex: 1,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLOURS.accentGold,
    padding: 14,
    alignItems: 'center',
  },
  ctaOutlineTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: COLOURS.accentGold,
    marginBottom: 3,
  },
  ctaOutlineSub: {
    fontSize: 7.5,
    fontWeight: 500,
    color: COLOURS.textSecondary,
    textAlign: 'center',
  },

  // ── Page 11 Styles ───────────────────────────────
  pageTwo: {
    backgroundColor: COLOURS.bgPrimary,
    padding: 40,
    fontFamily: 'Plus Jakarta Sans',
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    objectFit: 'cover' as const,
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
  },
  detailCard: {
    flex: 1,
    backgroundColor: COLOURS.bgCard,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLOURS.border,
    padding: 12,
  },
  detailCardTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: COLOURS.accentGold,
    marginBottom: 6,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
  },
  detailText: {
    fontSize: 8,
    fontWeight: 400,
    color: COLOURS.textSecondary,
    lineHeight: 1.5,
    marginBottom: 3,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 'auto',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: COLOURS.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 700,
    color: COLOURS.accentGold,
  },
  statLabel: {
    fontSize: 6.5,
    fontWeight: 500,
    color: COLOURS.textTertiary,
    letterSpacing: '0.05em',
    textTransform: 'uppercase' as const,
    marginTop: 1,
  },
});

const INSTALLATIONS = [
  {
    title: 'Palm Jumeirah Villa',
    subtitle: 'Medium Smoke · 8×15m',
    image: '/images/retractable-carport-aluminium-alloy-by-wasleen-pergolas.webp',
  },
  {
    title: 'Arabian Ranches Villa',
    subtitle: 'Dark Charcoal · 6×12m',
    image: '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas.webp',
  },
  {
    title: 'Dubai Marina Residence',
    subtitle: 'Bronze/Tea · 5×10m',
    image: '/images/foldable-carport-material-choice-by-wasleen-pergolas.webp',
  },
  {
    title: 'Al Barari Villa',
    subtitle: 'Sapphire Blue · 7×14m',
    image: '/images/foldable-carport-color-selection-guide-by-wasleen-pergolas.webp',
  },
];

export function GalleryPage() {
  return (
    <Page size="A4" style={galleryStyles.page}>
      <Text style={styles.sectionSubtitle}>Real Installations</Text>
      <Text style={styles.sectionTitle}>INSTALLATION GALLERY</Text>
      <GoldDivider />

      <Text style={{ ...styles.bodyText, fontSize: 8, marginBottom: 4 }}>
        From Palm Jumeirah to Al Barari — see how Wasleen carports transform UAE properties.
      </Text>

      <View style={galleryStyles.grid}>
        {INSTALLATIONS.map((item, i) => (
          <View key={i} style={galleryStyles.gridItem}>
            <Image
              src={item.image}
              style={galleryStyles.gridImage}
            />
            <View style={galleryStyles.gridLabel}>
              <Text style={galleryStyles.gridTitle}>{item.title}</Text>
              <Text style={galleryStyles.gridSub}>{item.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Bottom CTA cards */}
      <View style={galleryStyles.ctaRow}>
        <View style={galleryStyles.ctaCard}>
          <Text style={galleryStyles.ctaTitle}>View Full Gallery</Text>
          <Text style={galleryStyles.ctaSub}>
            {SITE_URL.replace('https://', '')}/gallery
          </Text>
        </View>
        <View style={galleryStyles.ctaCardOutline}>
          <Text style={galleryStyles.ctaOutlineTitle}> See Your Carport</Text>
          <Text style={galleryStyles.ctaOutlineSub}>
            Visualise your own configuration online
          </Text>
        </View>
      </View>

      <PageFooter pageNumber={10} />
    </Page>
  );
}

// ─── Gallery Page 11: Detail Spread ────────────────

export function GalleryPageTwo() {
  return (
    <Page size="A4" style={galleryStyles.pageTwo}>
      <Text style={styles.sectionSubtitle}>Why Choose Wasleen</Text>
      <Text style={styles.sectionTitle}>BUILT FOR THE UAE</Text>
      <GoldDivider />

      {/* Hero image */}
      <Image
        src="/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp"
        style={galleryStyles.heroImage}
      />

      {/* Detail cards */}
      <View style={galleryStyles.detailsRow}>
        <View style={galleryStyles.detailCard}>
          <Text style={galleryStyles.detailCardTitle}>Engineered</Text>
          <Text style={galleryStyles.detailText}>
            6063-T5 aluminium alloy with precision-machined rail system.
          </Text>
          <Text style={galleryStyles.detailText}>
            ±1 mm tolerance ensures smooth, silent operation for decades.
          </Text>
        </View>
        <View style={galleryStyles.detailCard}>
          <Text style={galleryStyles.detailCardTitle}>Tested</Text>
          <Text style={galleryStyles.detailText}>
            Wind-rated to 120 km/h. Kynar 500® coating resists sand, salt,
            and 50°C UAE summers.
          </Text>
          <Text style={galleryStyles.detailText}>
            15-year no-fade guarantee on all finishes.
          </Text>
        </View>
      </View>

      {/* Stats row */}
      <View style={galleryStyles.statRow}>
        <View style={galleryStyles.statItem}>
          <Text style={galleryStyles.statValue}>500+</Text>
          <Text style={galleryStyles.statLabel}>Installations</Text>
        </View>
        <View style={galleryStyles.statItem}>
          <Text style={galleryStyles.statValue}>120</Text>
          <Text style={galleryStyles.statLabel}>Km/h Wind Rated</Text>
        </View>
        <View style={galleryStyles.statItem}>
          <Text style={galleryStyles.statValue}>15+</Text>
          <Text style={galleryStyles.statLabel}>Year No-Fade</Text>
        </View>
        <View style={galleryStyles.statItem}>
          <Text style={galleryStyles.statValue}>60</Text>
          <Text style={galleryStyles.statLabel}>Day Delivery</Text>
        </View>
      </View>

      <PageFooter pageNumber={11} />
    </Page>
  );
}
