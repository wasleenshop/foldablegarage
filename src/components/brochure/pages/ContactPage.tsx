// ═══════════════════════════════════════════════════
// ContactPage — Page 12: Back Cover / Contact
// ═══════════════════════════════════════════════════

import { Page, View, Text, Link } from '@react-pdf/renderer';
import { StyleSheet } from '@react-pdf/renderer';
import { COLOURS } from '../shared/styles';
import { GoldDivider } from '../shared/GoldDivider';
import { LogoMark } from '../shared/LogoMark';
import {
  WHATSAPP_NUMBER,
  COMPANY_EMAIL,
  SITE_URL,
} from '@/lib/constants';

// ─── Styles ─────────────────────────────────────────

const contactStyles = StyleSheet.create({
  page: {
    backgroundColor: COLOURS.bgPrimary,
    padding: 40,
    fontFamily: 'Plus Jakarta Sans',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 380,
  },
  tagline: {
    fontSize: 18,
    fontWeight: 600,
    color: COLOURS.textPrimary,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 10,
    lineHeight: 1.3,
  },
  taglineSub: {
    fontSize: 10,
    fontWeight: 400,
    color: COLOURS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 1.5,
  },

  // ── Contact Details ──────────────────────────────
  contactCard: {
    backgroundColor: COLOURS.bgCard,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOURS.border,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
    width: '100%',
    justifyContent: 'center',
  },
  contactIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLOURS.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  iconText: {
    fontSize: 10,
    fontWeight: 700,
    color: COLOURS.bgPrimary,
  },
  contactText: {
    fontSize: 10,
    fontWeight: 500,
    color: COLOURS.textPrimary,
    letterSpacing: '0.02em',
  },
  contactLink: {
    fontSize: 10,
    fontWeight: 500,
    color: COLOURS.accentGold,
    textDecoration: 'none',
  },

  // ── QR / CTA Area ────────────────────────────────
  qrPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: COLOURS.bgCard,
    borderWidth: 1.5,
    borderColor: COLOURS.accentGold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  qrInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 40,
    height: 40,
    gap: 3,
  },
  qrDot: {
    width: 7,
    height: 7,
    borderRadius: 1.5,
    backgroundColor: COLOURS.accentGold,
  },
  qrDotEmpty: {
    width: 7,
    height: 7,
    borderRadius: 1.5,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: COLOURS.border,
  },
  qrLabel: {
    fontSize: 7,
    fontWeight: 500,
    color: COLOURS.textTertiary,
    marginTop: 4,
    textAlign: 'center',
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const,
  },

  // ── Divider ──────────────────────────────────────
  goldLine: {
    width: 200,
    height: 1,
    backgroundColor: COLOURS.accentGold,
    opacity: 0.4,
    marginVertical: 14,
  },

  // ── Copyright ────────────────────────────────────
  copyright: {
    fontSize: 7.5,
    fontWeight: 400,
    color: COLOURS.textTertiary,
    textAlign: 'center',
    marginTop: 4,
  },

  // ── Bottom Branding ──────────────────────────────
  bottomBrand: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  bottomLogo: {
    fontSize: 16,
    fontWeight: 700,
    color: COLOURS.accentGold,
    letterSpacing: '0.3em',
    opacity: 0.5,
  },
});

// ─── Component ─────────────────────────────────────

export function ContactPage() {
  return (
    <Page size="A4" style={contactStyles.page}>
      <View style={contactStyles.inner}>
        {/* Gold W-Mark */}
        <LogoMark size={48} />

        {/* Tagline */}
        <Text style={contactStyles.tagline}>Ready to protect{'\n'}what matters?</Text>
        <Text style={contactStyles.taglineSub}>
          Get your custom quote in 3 simple steps — online, no obligation.
        </Text>

        <GoldDivider />

        {/* Contact Info Card */}
        <View style={contactStyles.contactCard}>
          {/* Phone */}
          <View style={contactStyles.contactRow}>
            <View style={contactStyles.contactIcon}>
              <Text style={contactStyles.iconText}>📞</Text>
            </View>
            <Link src={`https://wa.me/${WHATSAPP_NUMBER}`} style={contactStyles.contactLink}>
              +{WHATSAPP_NUMBER.slice(0, 3)} {WHATSAPP_NUMBER.slice(3, 5)} {WHATSAPP_NUMBER.slice(5, 8)} {WHATSAPP_NUMBER.slice(8)}
            </Link>
          </View>

          {/* Email */}
          <View style={contactStyles.contactRow}>
            <View style={contactStyles.contactIcon}>
              <Text style={contactStyles.iconText}>✉️</Text>
            </View>
            <Link src={`mailto:${COMPANY_EMAIL}`} style={contactStyles.contactLink}>
              {COMPANY_EMAIL}
            </Link>
          </View>

          {/* Website */}
          <View style={contactStyles.contactRow}>
            <View style={contactStyles.contactIcon}>
              <Text style={contactStyles.iconText}>🌐</Text>
            </View>
            <Link src={SITE_URL} style={contactStyles.contactLink}>
              {SITE_URL.replace('https://', '')}
            </Link>
          </View>
        </View>

        {/* QR Code Area */}
        <View style={contactStyles.qrPlaceholder}>
          <View style={contactStyles.qrInner}>
            <View style={contactStyles.qrGrid}>
              {Array.from({ length: 25 }).map((_, i) => (
                <View
                  key={i}
                  style={
                    i % 2 === 0 || i === 12
                      ? contactStyles.qrDot
                      : contactStyles.qrDotEmpty
                  }
                />
              ))}
            </View>
          </View>
        </View>
        <Text style={contactStyles.qrLabel}>Scan → Get a Quote</Text>

        {/* Online CTA */}
        <Text style={contactStyles.goldLine} />

        <Text style={{ fontSize: 9, fontWeight: 500, color: COLOURS.textSecondary, textAlign: 'center' }}>
          Or configure and order online:
        </Text>
        <Link
          src={`${SITE_URL}/quote`}
          style={{ fontSize: 10, fontWeight: 700, color: COLOURS.accentGold, marginTop: 4, textDecoration: 'none' }}
        >
          {SITE_URL.replace('https://', '')}/quote
        </Link>

        {/* Copyright */}
        <Text style={contactStyles.copyright}>
          © Wasleen 2025 · Dubai, United Arab Emirates
        </Text>
      </View>

      {/* Bottom brand */}
      <View style={contactStyles.bottomBrand}>
        <Text style={contactStyles.bottomLogo}>WASLEEN</Text>
      </View>
    </Page>
  );
}
