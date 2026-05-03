import type { ColourInfo, PricingConfig, ColourOption } from './types';

// ═══════════════════════════════════════════════════
// Wasleen Foldable Garage — App Constants
// ═══════════════════════════════════════════════════

// ─── Colours ───────────────────────────────────────

export const COLOURS: ColourInfo[] = [
  {
    id: 'bronze',
    name: 'Bronze/Tea',
    nameAr: 'برونزي/شاي',
    hex: '#8B7355',
    description: 'Warm amber, blends with sandstone villas',
  },
  {
    id: 'sapphire-blue',
    name: 'Sapphire Blue',
    nameAr: 'أزرق ياقوتي',
    hex: '#2E5E8E',
    description: 'Cool clarity, modern contrast for facades',
  },
  {
    id: 'light-smoke',
    name: 'Light Smoke',
    nameAr: 'دخاني فاتح',
    hex: '#9EA2A8',
    description: 'Neutral, timeless soft grey',
  },
  {
    id: 'medium-smoke',
    name: 'Medium Smoke',
    nameAr: 'دخاني متوسط',
    hex: '#6B6F75',
    description: 'Classic anthracite, most popular choice',
  },
  {
    id: 'dark-charcoal',
    name: 'Dark Charcoal',
    nameAr: 'فحمي غامق',
    hex: '#36383A',
    description: 'Bold premium, maximum UV block',
  },
];

export const COLOUR_MAP: Record<ColourOption, ColourInfo> = Object.fromEntries(
  COLOURS.map((c) => [c.id, c])
) as Record<ColourOption, ColourInfo>;

// ─── Pricing ───────────────────────────────────────

export const PRICING: PricingConfig = {
  polycarbonateRate: 1050,
  glassRate: 1530,
  automaticSystemPrice: 10283,
  rollerShutterPrice: 6620,
  glassTintRate: 552,
};

// ─── Dimensions ────────────────────────────────────

export const DIMENSIONS = {
  minWidth: 2,
  maxWidth: 12,
  minLength: 6,
  maxLength: 30,
  step: 0.5,
} as const;

// ─── Contact Info ──────────────────────────────────

export const WHATSAPP_NUMBER = '971542330837';
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
export const SITE_URL = 'https://foldablegarage.wasleen.com';
export const COMPANY_EMAIL = 'info@wasleen.com';

// ─── Emirates ──────────────────────────────────────

export const EMIRATES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain',
] as const;

// ─── Property Types ────────────────────────────────

export const PROPERTY_TYPES = ['Villa', 'Apartment', 'Commercial', 'Other'] as const;

// ─── Navigation ────────────────────────────────────

export const NAV_LINKS = [
  { label: 'Product', href: '/product' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

// ─── Features ──────────────────────────────────────

export const FEATURES = [
  {
    id: 'precision-rail',
    title: 'Precision Rail System',
    specs: ['6063-T5 aluminium rail', 'Anodised corrosion-resistant finish', '±1mm precision tolerance'],
  },
  {
    id: 'heavy-duty-roller',
    title: 'Heavy-Duty Roller Assembly',
    specs: ['Sealed ball bearings', 'Load-rated to 500 kg per roller', 'Self-lubricating polymer bushings'],
  },
  {
    id: 'pvdf-coating',
    title: 'PVDF Coating (15-Years)',
    specs: ['Kynar 500® resin-based', 'UV-stable — no fading for 15+ years', 'Chemical-resistant finish'],
  },
  {
    id: 'polycarbonate-panels',
    title: 'Polycarbonate Option',
    specs: ['6mm twin-wall polycarbonate', '99.9% UV protection', 'Impact-resistant (50x glass)'],
  },
  {
    id: 'smart-automation',
    title: 'Smart Automation',
    specs: ['Remote control operation', 'Rain/heat sensor integration', 'Smartphone app compatible'],
  },
] as const;

// ─── Stats ─────────────────────────────────────────

export const STATS = [
  { value: '15+', label: 'Years No-Fade', suffix: '' },
  { value: '99.9', label: 'UV Block', suffix: '%' },
  { value: '60', label: 'Day Delivery', prefix: '<' },
  { value: '5', label: 'Year Warranty', suffix: '' },
] as const;

// ─── Pricing Tiers ─────────────────────────────────

export const PRICING_TIERS = [
  {
    id: 'manual',
    title: 'Manual',
    priceFrom: '12,000',
    features: ['Manual retraction system', 'Polycarbonate panels', '5-year warranty', 'Free shipping'],
  },
  {
    id: 'automatic',
    title: 'Smart',
    priceFrom: '25,000',
    popular: true as const,
    features: ['Automatic retraction system', 'Polycarbonate panels', '5-year warranty', 'Smart sensor ready'],
  },
  {
    id: 'commercial',
    title: 'Commercial',
    priceFrom: 'Custom',
    features: ['Custom dimensions', 'Commercial-grade materials', 'Bulk pricing available', 'Dedicated project manager'],
  },
] as const;
