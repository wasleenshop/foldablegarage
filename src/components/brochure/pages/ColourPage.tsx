// ═══════════════════════════════════════════════════
// ColourPage — Pages 6-7: Colour collection swatches
// ═══════════════════════════════════════════════════

import { Page, View, Text, Image } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { styles, COLOURS } from '../shared/styles';
import { PageFooter } from '../shared/PageFooter';
import { GoldDivider } from '../shared/GoldDivider';
import { COLOURS as COLOUR_DATA } from '@/lib/constants';

const colourStyles = StyleSheet.create({
  page: {
    backgroundColor: COLOURS.bgSecondary,
    padding: 40,
    fontFamily: 'Plus Jakarta Sans',
    position: 'relative',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginTop: 10,
    flex: 1,
  },
  colourCard: {
    width: '47%',
    backgroundColor: COLOURS.bgCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOURS.border,
    overflow: 'hidden',
  },
  colourImage: {
    width: '100%',
    height: 130,
    objectFit: 'cover',
  },
  colourSwatch: {
    height: 12,
    width: '100%',
  },
  colourInfo: {
    padding: 12,
  },
  colourName: {
    fontSize: 13,
    fontWeight: 700,
    color: COLOURS.textPrimary,
    marginBottom: 2,
  },
  colourHex: {
    fontSize: 8,
    fontWeight: 500,
    color: COLOURS.accentGold,
    fontFamily: 'Courier',
    marginBottom: 4,
  },
  colourDesc: {
    fontSize: 8,
    fontWeight: 400,
    color: COLOURS.textSecondary,
    lineHeight: 1.4,
  },
});

const COLOUR_IMAGES: Record<string, string> = {
  'bronze': '/images/foldable-carport-color-selection-guide-by-wasleen-pergolas.webp',
  'sapphire-blue': '/images/foldable-carport-material-choice-by-wasleen-pergolas.webp',
  'light-smoke': '/images/retractable-carport-aluminium-alloy-by-wasleen-pergolas.webp',
  'medium-smoke': '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-3.webp',
  'dark-charcoal': '/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp',
};

/** Page 6: Colour grid (4 swatches) */
export function ColourPage() {
  const colours = COLOUR_DATA.slice(0, 4);

  return (
    <Page size="A4" style={colourStyles.page}>
      <Text style={styles.sectionSubtitle}>Selection</Text>
      <Text style={styles.sectionTitle}>COLOUR COLLECTION</Text>
      <GoldDivider />

      <Text style={{ fontSize: 8.5, color: COLOURS.textTertiary, marginBottom: 8, lineHeight: 1.4 }}>
        Five sophisticated finishes, each precision-coated with PVDF Kynar 500® resin.
        Every colour is UV-stable for 15+ years under the UAE sun.
      </Text>

      <View style={colourStyles.grid}>
        {colours.map((c) => (
          <View key={c.id} style={colourStyles.colourCard}>
            <Image
              style={colourStyles.colourImage}
              src={COLOUR_IMAGES[c.id] || COLOUR_IMAGES['bronze']}
            />
            {/* Actual colour swatch bar */}
            <View style={[colourStyles.colourSwatch, { backgroundColor: c.hex }]} />
            <View style={colourStyles.colourInfo}>
              <Text style={colourStyles.colourName}>{c.name}</Text>
              <Text style={colourStyles.colourHex}>{c.hex}</Text>
              <Text style={colourStyles.colourDesc}>{c.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <PageFooter pageNumber={6} />
    </Page>
  );
}

/** Page 7: Dark Charcoal hero spread + CTA */
export function ColourPageDark() {
  const darkCharcoal = COLOUR_DATA[4];

  return (
    <Page size="A4" style={{
      backgroundColor: COLOURS.bgPrimary,
      padding: 40,
      fontFamily: 'Plus Jakarta Sans',
      position: 'relative',
    }}>
      {/* Dark Charcoal hero section */}
      <Text style={{
        fontSize: 10,
        fontWeight: 500,
        color: COLOURS.accentGold,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        marginBottom: 6,
      }}>
        Premium Choice
      </Text>
      <Text style={{
        fontSize: 32,
        fontWeight: 700,
        color: COLOURS.textPrimary,
        marginBottom: 4,
      }}>
        DARK CHARCOAL
      </Text>
      <GoldDivider />

      {/* Hero image */}
      <View style={{
        width: '100%',
        height: 200,
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 14,
      }}>
        <Image
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          src={COLOUR_IMAGES['dark-charcoal']}
        />
      </View>

      {/* Colour detail */}
      <View style={{
        flexDirection: 'row',
        gap: 14,
        marginBottom: 14,
      }}>
        <View style={{
          width: 50,
          height: 50,
          backgroundColor: darkCharcoal.hex,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: COLOURS.border,
        }} />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 14, fontWeight: 700, color: COLOURS.textPrimary, marginBottom: 2 }}>
            {darkCharcoal.name}
          </Text>
          <Text style={{ fontSize: 9, fontWeight: 500, color: COLOURS.accentGold, fontFamily: 'Courier' }}>
            {darkCharcoal.hex}
          </Text>
        </View>
      </View>

      {/* Quote */}
      <View style={{
        backgroundColor: COLOURS.bgCard,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLOURS.border,
        borderLeftWidth: 3,
        borderLeftColor: COLOURS.accentGold,
        padding: 14,
        marginBottom: 14,
      }}>
        <Text style={{
          fontSize: 10,
          fontWeight: 500,
          color: COLOURS.textSecondary,
          lineHeight: 1.6,
          fontStyle: 'italic',
        }}>
          "Bold, premium, maximum UV block — the most sophisticated choice for modern UAE villas."
        </Text>
      </View>

      {/* Custom colours CTA */}
      <View style={{
        backgroundColor: COLOURS.bgCard,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: COLOURS.border,
        padding: 14,
        alignItems: 'center',
      }}>
        <Text style={{
          fontSize: 12,
          fontWeight: 700,
          color: COLOURS.accentGold,
          marginBottom: 4,
          textAlign: 'center',
        }}>
          Custom RAL Colours Available
        </Text>
        <Text style={{
          fontSize: 8.5,
          fontWeight: 400,
          color: COLOURS.textSecondary,
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          All panels are available in any colour from our standard range.{'\n'}
          Custom RAL colours can be produced on request for large projects.
        </Text>
      </View>

      <PageFooter pageNumber={7} />
    </Page>
  );
}
