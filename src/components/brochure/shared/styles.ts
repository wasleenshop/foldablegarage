// ═══════════════════════════════════════════════════
// Wasleen Brochure PDF — Shared Styles
// ═══════════════════════════════════════════════════

import { StyleSheet, Font } from '@react-pdf/renderer';

// ─── Font Registration ──────────────────────────────

Font.register({
  family: 'Plus Jakarta Sans',
  fonts: [
    { src: '/fonts/PlusJakartaSans-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/PlusJakartaSans-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/PlusJakartaSans-SemiBold.ttf', fontWeight: 600 },
    { src: '/fonts/PlusJakartaSans-Bold.ttf', fontWeight: 700 },
  ],
});

// ─── Design Tokens ──────────────────────────────────

export const COLOURS = {
  bgPrimary: '#0A0A0A',
  bgSecondary: '#111111',
  bgCard: '#1A1A1A',
  border: '#2A2A2A',
  textPrimary: '#FFFFFF',
  textSecondary: '#999999',
  textTertiary: '#666666',
  accentGold: '#C9A84C',
  accentGoldHover: '#D4B85A',
  accentCyan: '#00D4FF',
  accentViolet: '#7C3AED',
} as const;

export const SPACING = {
  pagePadding: 40,
  sectionGap: 20,
  cardGap: 16,
} as const;

// ─── Shared Styles ──────────────────────────────────

export const styles = StyleSheet.create({
  // ── Page ───────────────────────────────────────
  page: {
    backgroundColor: COLOURS.bgPrimary,
    padding: SPACING.pagePadding,
    fontFamily: 'Plus Jakarta Sans',
    position: 'relative',
    overflow: 'hidden',
  },
  pageLight: {
    backgroundColor: COLOURS.bgSecondary,
    padding: SPACING.pagePadding,
    fontFamily: 'Plus Jakarta Sans',
    position: 'relative',
    overflow: 'hidden',
  },

  // ── Typography ─────────────────────────────────
  sectionTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: COLOURS.textPrimary,
    marginBottom: 4,
    letterSpacing: '0.02em',
  },
  sectionSubtitle: {
    fontSize: 10,
    fontWeight: 500,
    color: COLOURS.accentGold,
    letterSpacing: '0.3em',
    textTransform: 'uppercase' as const,
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 9.5,
    fontWeight: 400,
    color: COLOURS.textSecondary,
    lineHeight: 1.65,
  },
  bodyTextSmall: {
    fontSize: 8.5,
    fontWeight: 400,
    color: COLOURS.textSecondary,
    lineHeight: 1.5,
  },
  goldText: {
    color: COLOURS.accentGold,
  },

  // ── Dividers ───────────────────────────────────
  goldDivider: {
    width: 60,
    height: 3,
    backgroundColor: COLOURS.accentGold,
    marginVertical: 10,
  },
  goldLineFull: {
    width: '100%',
    height: 1,
    backgroundColor: COLOURS.accentGold,
    opacity: 0.3,
    marginVertical: 8,
  },

  // ── Layout Helpers ─────────────────────────────
  flexRow: {
    flexDirection: 'row' as const,
    gap: 16,
  },
  flexCol: {
    flexDirection: 'column' as const,
  },
  flex1: {
    flex: 1,
  },
  flex2: {
    flex: 2,
  },

  // ── Cards ──────────────────────────────────────
  card: {
    backgroundColor: COLOURS.bgCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOURS.border,
    padding: 16,
  },
  cardHighlight: {
    backgroundColor: COLOURS.bgCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOURS.accentGold,
    padding: 16,
  },

  // ── Stats ──────────────────────────────────────
  statNumber: {
    fontSize: 28,
    fontWeight: 700,
    color: COLOURS.accentGold,
    lineHeight: 1,
  },
  statLabel: {
    fontSize: 7.5,
    fontWeight: 500,
    color: COLOURS.textSecondary,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
    marginTop: 2,
  },
  statPrefix: {
    fontSize: 16,
    fontWeight: 700,
    color: COLOURS.accentGold,
  },

  // ── Footer ─────────────────────────────────────
  footer: {
    position: 'absolute',
    bottom: 16,
    left: SPACING.pagePadding,
    right: SPACING.pagePadding,
    flexDirection: 'row' as const,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLOURS.accentGold,
    opacity: 0.4,
    paddingTop: 6,
  },
  footerText: {
    fontSize: 7,
    fontWeight: 400,
    color: COLOURS.textTertiary,
  },
  footerPageNum: {
    fontSize: 7,
    fontWeight: 500,
    color: COLOURS.textTertiary,
  },

  // ── Gold Badge ─────────────────────────────────
  goldBadge: {
    backgroundColor: COLOURS.accentGold,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start' as const,
    marginBottom: 6,
  },
  goldBadgeText: {
    fontSize: 7,
    fontWeight: 700,
    color: COLOURS.bgPrimary,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
  },

  // ── Bullet Points ──────────────────────────────
  bulletRow: {
    flexDirection: 'row' as const,
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 4,
  },
  bulletPoint: {
    width: 4,
    height: 4,
    backgroundColor: COLOURS.accentGold,
    borderRadius: 2,
    marginTop: 5,
    flexShrink: 0,
  },
  bulletText: {
    fontSize: 8,
    fontWeight: 400,
    color: COLOURS.textSecondary,
    lineHeight: 1.4,
    flex: 1,
  },

  // ── Image Placeholders ─────────────────────────
  image: {
    width: '100%',
    borderRadius: 4,
    marginBottom: 8,
  },
  imageHalf: {
    width: '100%',
    height: 120,
    borderRadius: 4,
    marginBottom: 8,
    objectFit: 'cover' as const,
  },
  imageFull: {
    width: '100%',
    borderRadius: 4,
    marginBottom: 10,
    objectFit: 'cover' as const,
  },
});
