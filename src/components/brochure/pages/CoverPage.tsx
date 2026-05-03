// ═══════════════════════════════════════════════════
// CoverPage — Page 1: Full-bleed hero cover
// ═══════════════════════════════════════════════════

import { Page, View, Text, Image } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { COLOURS } from '../shared/styles';

const coverStyles = StyleSheet.create({
  page: {
    backgroundColor: COLOURS.bgPrimary,
    position: 'relative',
    overflow: 'hidden',
  },
  heroImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 595,
    height: 842,
    objectFit: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // Simulated gradient via stacked views
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 60,
    zIndex: 10,
  },
  logoWrapper: {
    marginBottom: 20,
  },
  companyName: {
    fontSize: 48,
    fontWeight: 700,
    color: COLOURS.textPrimary,
    letterSpacing: '0.15em',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 500,
    color: COLOURS.accentGold,
    letterSpacing: '0.3em',
    textTransform: 'uppercase',
    textAlign: 'center',
    marginBottom: 30,
  },
  tagline: {
    fontSize: 22,
    fontWeight: 600,
    color: COLOURS.textPrimary,
    textAlign: 'center',
    lineHeight: 1.3,
    marginBottom: 20,
  },
  goldLine: {
    width: 80,
    height: 2,
    backgroundColor: COLOURS.accentGold,
    marginBottom: 16,
  },
  domainLine: {
    fontSize: 10,
    fontWeight: 400,
    color: COLOURS.textTertiary,
    letterSpacing: '0.15em',
    textAlign: 'center',
  },
  bottomGrad: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: 'rgba(10,10,10,0)',
  },
  // Gold corner accents
  cornerTL: {
    position: 'absolute',
    top: 30,
    left: 30,
    width: 40,
    height: 40,
    borderTopWidth: 2,
    borderTopColor: COLOURS.accentGold,
    borderLeftWidth: 2,
    borderLeftColor: COLOURS.accentGold,
    opacity: 0.3,
    zIndex: 10,
  },
  cornerTR: {
    position: 'absolute',
    top: 30,
    right: 30,
    width: 40,
    height: 40,
    borderTopWidth: 2,
    borderTopColor: COLOURS.accentGold,
    borderRightWidth: 2,
    borderRightColor: COLOURS.accentGold,
    opacity: 0.3,
    zIndex: 10,
  },
  cornerBL: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: COLOURS.accentGold,
    borderLeftWidth: 2,
    borderLeftColor: COLOURS.accentGold,
    opacity: 0.3,
    zIndex: 10,
  },
  cornerBR: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: COLOURS.accentGold,
    borderRightWidth: 2,
    borderRightColor: COLOURS.accentGold,
    opacity: 0.3,
    zIndex: 10,
  },
});

export function CoverPage() {
  return (
    <Page size="A4" style={coverStyles.page}>
      {/* Hero image — full bleed */}
      <Image
        style={coverStyles.heroImage}
        src="/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp"
      />

      {/* Dark overlay */}
      <View style={coverStyles.overlay} />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 400,
          backgroundColor: '#0A0A0A',
          opacity: 0.85,
        }}
      />
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 200,
          backgroundColor: '#0A0A0A',
          opacity: 0.3,
        }}
      />

      {/* Gold corner accents */}
      <View style={coverStyles.cornerTL} />
      <View style={coverStyles.cornerTR} />
      <View style={coverStyles.cornerBL} />
      <View style={coverStyles.cornerBR} />

      {/* Main content */}
      <View style={coverStyles.content}>
        {/* Gold W-Mark Logo */}
        <View style={coverStyles.logoWrapper}>
          <Text style={{ fontSize: 60, color: COLOURS.accentGold, textAlign: 'center' }}>W</Text>
        </View>

        {/* Company name */}
        <Text style={coverStyles.companyName}>WASLEEN</Text>

        {/* Subtitle */}
        <Text style={coverStyles.subtitle}>Foldable Premium Garage</Text>

        {/* Gold line */}
        <View style={coverStyles.goldLine} />

        {/* Tagline */}
        <Text style={coverStyles.tagline}>
          "Intelligent Motion.{'\n'}Absolute Protection."
        </Text>

        {/* Domain */}
        <Text style={coverStyles.domainLine}>foldablegarage.wasleen.com  |  Dubai, UAE</Text>
      </View>
    </Page>
  );
}
