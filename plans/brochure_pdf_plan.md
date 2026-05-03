# Wasleen Foldable Garage — Company Brochure PDF Plan

> **Purpose:** Complete architectural plan for building a world-class, professionally designed 12-page company brochure PDF using `@react-pdf/renderer`. The brochure mirrors the premium dark/gold design language of the website and serves as both a downloadable asset and a lead-generation tool.

---

## 📋 TABLE OF CONTENTS

1. [Overview & Goals](#-overview--goals)
2. [Technology Architecture](#-technology-architecture)
3. [Page-by-Page Design](#-page-by-page-design)
4. [Component Architecture](#-component-architecture)
5. [PDF Generation System](#-pdf-generation-system)
6. [Delivery Methods](#-delivery-methods)
7. [Data Flow](#-data-flow)
8. [Implementation Checklist](#-implementation-checklist)
9. [Dependencies & Installation](#-dependencies--installation)

---

## 🎯 OVERVIEW & GOALS

### Why a PDF Brochure?

| Goal | Description |
|------|-------------|
| **Sales enablement** | Prospects download and share with family, architects, contractors |
| **Lead generation** | Email-gated download captures leads into Supabase |
| **Offline reach** | Works without internet — PDFs shared on WhatsApp, email |
| **Brand consistency** | Matches website design language exactly (dark theme, gold accents) |
| **Professional credibility** | Real PDF with vectors, not screenshot — shows Wasleen as a premium brand |

### Design Language

The brochure uses the **exact same design tokens** as the website:

| Token | Value | Usage |
|-------|-------|-------|
| Primary Background | `#0A0A0A` | Page backgrounds, cover |
| Secondary Background | `#111111` | Content section backgrounds |
| Card Background | `#1A1A1A` | Feature cards, spec tables |
| Accent Gold | `#C9A84C` | Headlines, dividers, badges, stats |
| Accent Gold Hover | `#D4B85A` | Highlight effects |
| Primary Text | `#FFFFFF` | All headlines |
| Secondary Text | `#999999` | Body copy, descriptions |
| Tertiary Text | `#666666` | Footer, metadata |

**Typography:** Plus Jakarta Sans (Bold 700, Semibold 600, Medium 500, Regular 400)
**Format:** A4 (210×297 mm) — standard print and digital format

---

## 🏗️ TECHNOLOGY ARCHITECTURE

### Core Library: `@react-pdf/renderer`

This is NOT a screenshot tool. It generates real PDFs with:

- **Vector text** — searchable, selectable, copyable
- **True gradients** — gold gradients render as real PDF gradients, not JPEG approximations
- **Embedded fonts** — Plus Jakarta Sans embedded directly in the PDF
- **Full-resolution images** — product photos at native resolution
- **Hyperlinks** — clickable URLs, email addresses, WhatsApp links
- **Small file size** — ~3-5 MB for 12 pages with photos (vs 15-30 MB from PowerPoint)

### Component Model

Each brochure page is a standalone React component:

```
src/components/brochure/
├── BrochurePDF.tsx              # Root Document wrapper (assembles all pages)
├── pages/
│   ├── CoverPage.tsx            # Page 1 — Full-bleed hero + logo + tagline
│   ├── AboutPage.tsx            # Page 2 — Brand story + stats
│   ├── FeaturePages.tsx         # Pages 3-5 — 5 feature cards with photos
│   ├── ColourPage.tsx           # Pages 6-7 — 5 colour swatches with photos
│   ├── SpecsPage.tsx            # Page 8 — Technical specifications table
│   ├── PricingPage.tsx          # Page 9 — 3-tier pricing + gold badge
│   ├── GalleryPage.tsx          # Pages 10-11 — Installation photo grid
│   └── ContactPage.tsx          # Page 12 — Contact info + QR code + CTA
├── shared/
│   ├── GoldDivider.tsx          # Gold accent line divider
│   ├── PageBackground.tsx       # Dark gradient page background
│   ├── PageFooter.tsx           # Consistent page footer (logo + domain + page #)
│   ├── LogoMark.tsx             # Gold W-mark logo for PDF
│   ├── StatNumber.tsx           # Large gold stat number
│   └── FeatureBullet.tsx        # Gold bullet point
└── api/
    └── route.ts                 # API route to serve PDF (static + lead-gated)
```

### Font Strategy

Plus Jakarta Sans fonts are embedded directly in the PDF:

```typescript
import Font from '@react-pdf/renderer';

Font.register({
  family: 'Plus Jakarta Sans',
  fonts: [
    { src: '/fonts/PlusJakartaSans-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/PlusJakartaSans-Medium.ttf', fontWeight: 500 },
    { src: '/fonts/PlusJakartaSans-SemiBold.ttf', fontWeight: 600 },
    { src: '/fonts/PlusJakartaSans-Bold.ttf', fontWeight: 700 },
  ],
});
```

**Fallback:** If local font files aren't available, use Google Fonts URL:
`https://fonts.gstatic.com/s/plusjakartasans/v8/...`

---

## 📄 PAGE-BY-PAGE DESIGN

### Page 1 — Cover

```
┌─────────────────────────────────────────────────┐
│  ██████████████████████████████████████████████  │
│  ██  Full-bleed hero product photo           ██  │
│  ██  (2400×1350, dark vignette overlay)      ██  │
│  ██                                           ██  │
│  ██                                           ██  │
│  ██                                           ██  │
│  ██                                           ██  │
│  ██          ⬩ Gold W-Mark Logo ⬩            ██  │
│  ██                                           ██  │
│  ██    WASLEEN                                ██  │
│  ██    FOLDABLE PREMIUM GARAGE                ██  │
│  ██                                           ██  │
│  ██    "Intelligent Motion.                   ██  │
│  ██     Absolute Protection."                 ██  │
│  ██                                           ██  │
│  ██    ───── Gold accent line ─────           ██  │
│  ██    foldablegarage.wasleen.com  |  UAE     ██  │
│  ██████████████████████████████████████████████  │
└─────────────────────────────────────────────────┘
```

**Layout:**
- Full-page background: Hero product photo (2400×1350) with dark gradient overlay
- Center: Gold W-mark logo (size: 80px)
- Below logo: "WASLEEN" (48pt, white, bold)
- Below: "FOLDABLE PREMIUM GARAGE" (14pt, gold, tracked 0.3em)
- Tagline: "Intelligent Motion. Absolute Protection." (24pt, white, semibold)
- Bottom: Gold line + domain + location (10pt, tertiary text)

---

### Page 2 — About Wasleen

```
┌─────────────────────────────────────────────────┐
│  ██  Secondary BG (#111111)                   ██  │
│  ██                                           ██  │
│  ██  ⬩ ABOUT WASLEEN                         ██  │
│  ██  ──── Gold underline ────                ██  │
│  ██                                           ██  │
│  ██  Two-column layout:                      ██  │
│  ██                                           ██  │
│  ██  ┌─ Text (60%) ──┐ ┌─ Photo (40%) ──┐  ██  │
│  ██  │ Engineering    │ │ Workshop image │  ██  │
│  ██  │ excellence     │ │ (1600×1067)    │  ██  │
│  ██  │ from Dubai     │ └────────────────┘  ██  │
│  ██  │ for UAE villa  │                      ██  │
│  ██  │ owners.        │                      ██  │
│  ██  │                │                      ██  │
│  ██  │ 6063-T5        │                      ██  │
│  ██  │ aluminium      │                      ██  │
│  ██  │ frames,        │                      ██  │
│  ██  │ precision      │                      ██  │
│  ██  │ German-        │                      ██  │
│  ██  │ engineered     │                      ██  │
│  ██  │ mechanisms.    │                      ██  │
│  ██  └────────────────┘                      ██  │
│  ██                                           ██  │
│  ██  ── Stats Strip (4 columns) ──           ██  │
│  ██   15+        99.9%      <60 Days   5-Year │  │
│  ██   Years      UV Block   Delivery   Warranty│  │
│  ██   No-Fade                                  │  │
│  ██                                           ██  │
│  ██  ──── Gold line ────                     ██  │
│  ██  foldablegarage.wasleen.com          Page 2 ██  │
│  ██████████████████████████████████████████████  │
└─────────────────────────────────────────────────┘
```

**Content source:** [`src/lib/constants.ts`](src/lib/constants.ts) — `STATS` array

---

### Pages 3-5 — Product Features (5 Cards)

```
┌─────────────────────────────────────────────────┐
│  Page 3: Feature 1 + 2                        │  │
│  ██                                           ██  │
│  ██  ⬩ ENGINEERED FOR EXCELLENCE             ██  │
│  ██  ──── Gold underline ────                ██  │
│  ██                                           ██  │
│  ██  ┌────────────────┐ ┌────────────────┐   ██  │
│  ██  │ Precision Rail │ │ Heavy-Duty     │   ██  │
│  ██  │ System         │ │ Roller Assembly│   ██  │
│  ██  │                │ │                │   ██  │
│  ██  │ [Photo]        │ │ [Photo]        │   ██  │
│  ██  │ 1600×1067      │ │ 1600×1067      │   ██  │
│  ██  │                │ │                │   ██  │
│  ██  │ • 6063-T5 alum │ │ • Sealed ball  │   ██  │
│  ██  │ • Anodised     │ │   bearings     │   ██  │
│  ██  │ • ±1mm tol.   │ │ • 500kg rated  │   ██  │
│  ██  └────────────────┘ └────────────────┘   ██  │
│  ██                                           ██  │
│  ██  ┌────────────────────────────────────┐   ██  │
│  ██  │ Feature 3: PVDF Coating (15-Years) │   ██  │
│  ██  │ [Photo]    • Kynar 500 resin       │   ██  │
│  ██  │            • UV-stable 15+ years   │   ██  │
│  ██  │            • Chemical-resistant    │   ██  │
│  ██  └────────────────────────────────────┘   ██  │
│  ██                                           ██  │
│  ██  ──── Gold line ────                     ██  │
│  ██  foldablegarage.wasleen.com          Page 3 ██  │
│  ██████████████████████████████████████████████  │
└─────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────┐
│  Page 4: Feature 4 + 5                        │  │
│  ██                                           ██  │
│  ██  ⬩ ENGINEERED FOR EXCELLENCE (cont.)     ██  │
│  ██                                           ██  │
│  ██  ┌────────────────┐ ┌────────────────┐   ██  │
│  ██  │ Polycarbonate  │ │ Smart           │   ██  │
│  ██  │ Panels         │ │ Automation      │   ██  │
│  ██  │                │ │                 │   ██  │
│  ██  │ [Photo]        │ │ [Photo]         │   ██  │
│  ██  │ 1600×1067      │ │ 1600×1067       │   ██  │
│  ██  │                │ │                 │   ██  │
│  ██  │ • 6mm twin-wall│ │ • Remote control│   ██  │
│  ██  │ • 99.9% UV     │ │ • Rain/heat     │   ██  │
│  ██  │ • 50x glass    │ │   sensor        │   ██  │
│  ██  │   impact       │ │ • Smartphone app│   ██  │
│  ██  └────────────────┘ └────────────────┘   ██  │
│  ██                                           ██  │
│  ██  [Feature highlight banner]               ██  │
│  ██  "German-engineered retraction mechanism  ██  │
│  ██   |  Seamless one-touch operation"        ██  │
│  ██                                           ██  │
│  ██  ──── Gold line ────                     ██  │
│  ██  foldablegarage.wasleen.com          Page 4 ██  │
│  ██████████████████████████████████████████████  │
└─────────────────────────────────────────────────┘
```

**Content source:** [`src/lib/constants.ts`](src/lib/constants.ts) — `FEATURES` array

---

### Pages 6-7 — Colour Collection

```
┌─────────────────────────────────────────────────┐
│  Page 6: Colour Collection                      │
│  ██                                           ██  │
│  ██  ⬩ COLOUR COLLECTION                      ██  │
│  ██  ──── Gold underline ────                ██  │
│  ██                                           ██  │
│  ██  ┌─────────────┐ ┌─────────────┐         ██  │
│  ██  │ Bronze/Tea   │ │ Sapphire    │         ██  │
│  ██  │ #8B7355      │ │ Blue        │         ██  │
│  ██  │ Warm amber   │ │ #2E5E8E     │         ██  │
│  ██  │ that blends  │ │ Cool clarity │         ██  │
│  ██  │ sandstone    │ │ modern      │         ██  │
│  ██  │ [Photo]      │ │ [Photo]     │         ██  │
│  ██  └─────────────┘ └─────────────┘         ██  │
│  ██                                           ██  │
│  ██  ┌─────────────┐ ┌─────────────┐         ██  │
│  ██  │ Light Smoke  │ │ Medium Smoke│         ██  │
│  ██  │ #9EA2A8      │ │ #6B6F75     │         ██  │
│  ██  │ Neutral      │ │ Classic     │         ██  │
│  ██  │ timeless     │ │ anthracite  │         ██  │
│  ██  │ [Photo]      │ │ [Photo]     │         ██  │
│  ██  └─────────────┘ └─────────────┘         ██  │
│  ██                                           ██  │
│  ██  ──── Gold line ────                     ██  │
│  ██  foldablegarage.wasleen.com          Page 6 ██  │
│  ██████████████████████████████████████████████  │
└─────────────────────────────────────────────────┘
```

```
┌─────────────────────────────────────────────────┐
│  Page 7: Colour Collection (cont.)              │
│  ██                                           ██  │
│  ██  Full-page hero: Dark Charcoal            ██  │
│  ██                                           ██  │
│  ██  ⬩ DARK CHARCOAL                          ██  │
│  ██  #36383A                                  ██  │
│  ██                                           ██  │
│  ██  "Bold, premium, maximum UV block         ██  │
│  ██   — the most sophisticated choice         ██  │
│  ██   for modern UAE villas"                  ██  │
│  ██                                           ██  │
│  ██  ┌──────────────────────────────────────┐ ██  │
│  ██  │ Full-width hero image of Dark        │ ██  │
│  ██  │ Charcoal carport installation        │ ██  │
│  ██  │ (2000×1500)                          │ ██  │
│  ██  └──────────────────────────────────────┘ ██  │
│  ██                                           ██  │
│  ██  All panels are available in any colour.  ██  │
│  ██  Custom RAL colours available on request. ██  │
│  ██                                           ██  │
│  ██  ──── Gold line ────                     ██  │
│  ██  foldablegarage.wasleen.com          Page 7 ██  │
│  ██████████████████████████████████████████████  │
└─────────────────────────────────────────────────┘
```

**Content source:** [`src/lib/constants.ts`](src/lib/constants.ts) — `COLOURS` array

---

### Page 8 — Technical Specifications

```
┌─────────────────────────────────────────────────┐
│  ██  ⬩ TECHNICAL SPECIFICATIONS               ██  │
│  ██  ──── Gold underline ────                ██  │
│  ██                                           ██  │
│  ██  ┌──────────────────────────────────────┐ ██  │
│  ██  │ Two-column spec table               │ ██  │
│  ██  │                                      │ ██  │
│  ██  │ Structure      │ 6063-T5 Aluminium   │ ██  │
│  ██  │ Finish         │ PVDF Coating        │ ██  │
│  ██  │                │ Kynar 500 Resin     │ ██  │
│  ██  │ Width Range    │ 2m — 12m            │ ██  │
│  ██  │ Length Range   │ 6m — 30m            │ ██  │
│  ██  │ Roof Option 1  │ 6mm Twin-Wall       │ ██  │
│  ██  │                │ Polycarbonate       │ ██  │
│  ██  │ Roof Option 2  │ 6mm Toughened Glass │ ██  │
│  ██  │ Wind Load      │ 120 km/h rated      │ ██  │
│  ██  │ UV Protection  │ 99.9%               │ ██  │
│  ██  │ Rail System    │ Precision Rail      │ ██  │
│  ██  │                │ ±1mm tolerance      │ ██  │
│  ██  │ Roller Rating  │ 500 kg per roller   │ ██  │
│  ██  │ Automation     │ Remote / App /      │ ██  │
│  ██  │                │ Rain Sensor         │ ██  │
│  ██  │ Warranty       │ 5 Years Structural  │ ██  │
│  ██  │ Delivery       │ < 60 Days           │ ██  │
│  ██  │ Installation   │ By Wasleen Team     │ ██  │
│  ██  │                │ (quote separately)  │ ██  │
│  ██  └──────────────────────────────────────┘ ██  │
│  ██                                           ██  │
│  ██  Right side: Tech diagram SVG             ██  │
│  ██  (from src/components/product/TechDiagram) ██  │
│  ██                                           ██  │
│  ██  ──── Gold line ────                     ██  │
│  ██  foldablegarage.wasleen.com          Page 8 ██  │
│  ██████████████████████████████████████████████  │
└─────────────────────────────────────────────────┘
```

---

### Page 9 — Pricing

```
┌─────────────────────────────────────────────────┐
│  ██  ⬩ PRICING                                 ██  │
│  ██  ──── Gold underline ────                ██  │
│  ██                                           ██  │
│  ██  ┌──────────┐ ┌──────────┐ ┌──────────┐  ██  │
│  ██  │ MANUAL   │ │ SMART    │ │COMMERCIAL│  ██  │
│  ██  │          │ │ ★★★★★   │ │          │  ██  │
│  ██  │ [icon]   │ │ MOST     │ │ [icon]   │  ██  │
│  ██  │          │ │ POPULAR ★│ │          │  ██  │
│  ██  │          │ │ Gold badge│ │          │  ██  │
│  ██  │          │ │          │ │          │  ██  │
│  ██  │ From     │ │ From     │ │ Custom   │  ██  │
│  ██  │ AED      │ │ AED      │ │ Pricing  │  ██  │
│  ██  │ 12,000   │ │ 25,000   │ │          │  ██  │
│  ██  │          │ │          │ │          │  ██  │
│  ██  │ • Manual │ │ • Auto   │ │ • Custom │  ██  │
│  ██  │ • PC     │ │ • PC     │ │   dims   │  ██  │
│  ██  │ • 5yr    │ │ • 5yr    │ │ • Com.   │  ██  │
│  ██  │ • Free   │ │ • Smart  │ │   grade  │  ██  │
│  ██  │   ship   │ │   sensor │ │ • Bulk   │  ██  │
│  ██  │          │ │          │ │ • PM     │  ██  │
│  ██  └──────────┘ └──────────┘ └──────────┘  ██  │
│  ██                                           ██  │
│  ██  [Gold CTA Banner]                        ██  │
│  ██  "Get your exact quote online →           ██  │
│  ██   Configure your custom carport in 3 steps" │  │
│  ██                                           ██  │
│  ██  ──── Gold line ────                     ██  │
│  ██  foldablegarage.wasleen.com          Page 9 ██  │
│  ██████████████████████████████████████████████  │
└─────────────────────────────────────────────────┘
```

**Content source:** [`src/lib/constants.ts`](src/lib/constants.ts) — `PRICING_TIERS` array

---

### Pages 10-11 — Installation Gallery

```
┌─────────────────────────────────────────────────┐
│  Page 10: Installation Gallery                  │
│  ██                                           ██  │
│  ██  ⬩ INSTALLATION GALLERY                   ██  │
│  ██  ──── Gold underline ────                ██  │
│  ██                                           ██  │
│  ██  ┌────────────────┐ ┌────────────────┐   ██  │
│  ██  │ [Photo 1]      │ │ [Photo 2]      │   ██  │
│  ██  │ Palm Jumeirah  │ │ Arabian Ranches│   ██  │
│  ██  │ Villa          │ │ Villa          │   ██  │
│  ██  │ Medium Smoke   │ │ Dark Charcoal  │   ██  │
│  ██  └────────────────┘ └────────────────┘   ██  │
│  ██                                           ██  │
│  ██  ┌────────────────┐ ┌────────────────┐   ██  │
│  ██  │ [Photo 3]      │ │ [Photo 4]      │   ██  │
│  ██  │ Dubai Marina   │ │ Al Barari      │   ██  │
│  ██  │ Residence      │ │ Villa          │   ██  │
│  ██  │ Bronze/Tea     │ │ Sapphire Blue  │   ██  │
│  ██  └────────────────┘ └────────────────┘   ██  │
│  ██                                           ██  │
│  ██  ──── Gold line ────                     ██  │
│  ██  foldablegarage.wasleen.com         Page 10 ██  │
│  ██████████████████████████████████████████████  │
└─────────────────────────────────────────────────┘
```

---

### Page 12 — Contact / Back Cover

```
┌─────────────────────────────────────────────────┐
│  ██  Full dark background (#0A0A0A)           ██  │
│  ██                                           ██  │
│  ██                                           ██  │
│  ██           ⬩ Gold W-Mark ⬩                ██  │
│  ██                                           ██  │
│  ██   Ready to protect what matters?          ██  │
│  ██                                           ██  │
│  ██   ──── Gold line ────                    ██  │
│  ██                                           ██  │
│  ██   📞  +971 54 233 0837                   ██  │
│  ██   ✉️  info@wasleen.com                    ██  │
│  ██   🌐  foldablegarage.wasleen.com          ██  │
│  ██                                           ██  │
│  ██   [QR Code → Get a Quote]                 ██  │
│  ██                                           ██  │
│  ██   Or configure and order online:          ██  │
│  ██   foldablegarage.wasleen.com/quote        ██  │
│  ██                                           ██  │
│  ██   ──── Gold line ────                    ██  │
│  ██   © Wasleen 2025 · Dubai, United Arab    ██  │
│  ██   Emirates                                ██  │
│  ██                                           ██  │
│  ██         ⬩⬩⬩ Wasleen ⬩⬩⬩                  ██  │
│  ██████████████████████████████████████████████  │
└─────────────────────────────────────────────────┘
```

---

## 🧩 COMPONENT ARCHITECTURE

### BrochurePDF.tsx — Root Component

```typescript
// src/components/brochure/BrochurePDF.tsx
import { Document } from '@react-pdf/renderer';
import { CoverPage } from './pages/CoverPage';
import { AboutPage } from './pages/AboutPage';
import { FeaturePages } from './pages/FeaturePages';
import { ColourPage } from './pages/ColourPage';
import { SpecsPage } from './pages/SpecsPage';
import { PricingPage } from './pages/PricingPage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

export function BrochurePDF() {
  return (
    <Document
      title="Wasleen Foldable Garage — Company Brochure"
      author="Wasleen Pergolas"
      subject="Premium Retractable Carports UAE"
      keywords="retractable carport, foldable garage, UAE, Dubai, carport, aluminium pergola"
    >
      <CoverPage />
      <AboutPage />
      <FeaturePages />
      <ColourPage />
      <ColourPageDark />
      <SpecsPage />
      <PricingPage />
      <GalleryPage />
      <GalleryPageTwo />
      <ContactPage />
    </Document>
  );
}
```

### Shared Styles

All shared styles in a single file:

```typescript
// src/components/brochure/shared/styles.ts
import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#0A0A0A',
    padding: 40,
    fontFamily: 'Plus Jakarta Sans',
  },
  pageLight: {
    backgroundColor: '#111111',
    padding: 40,
    fontFamily: 'Plus Jakarta Sans',
  },
  goldDivider: {
    width: 60,
    height: 3,
    backgroundColor: '#C9A84C',
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 700,
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: 400,
    color: '#999999',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
  },
  bodyText: {
    fontSize: 10,
    color: '#999999',
    lineHeight: 1.6,
  },
  goldText: {
    color: '#C9A84C',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1px solid #C9A84C',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 8,
    color: '#666666',
  },
  // ... more styles
});
```

### Page Background Pattern

```typescript
// Kinetic laser lines as subtle background decoration (10% opacity)
// Matching the website's KineticBackground component aesthetic
export function LaserLinesBackground() {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <Svg viewBox="0 0 595 842" width="595" height="842">
        <Line x1="0" y1="0" x2="595" y2="842" stroke="#00D4FF" strokeWidth={0.5} opacity={0.08} />
        <Line x1="200" y1="0" x2="595" y2="500" stroke="#7C3AED" strokeWidth={0.5} opacity={0.06} />
        {/* More subtle laser lines */}
      </Svg>
    </View>
  );
}
```

---

## 🔄 PDF GENERATION SYSTEM

### Static Generation (Build-time)

Generate PDF once during build, serve from `public/`:

```typescript
// scripts/generate-brochure.mjs
import React from 'react';
import { renderToFile } from '@react-pdf/renderer';
import { BrochurePDF } from '../src/components/brochure/BrochurePDF';
import path from 'path';

async function generate() {
  const outputPath = path.join(process.cwd(), 'public', 'pdfs', 'wasleen-brochure.pdf');
  await renderToFile(<BrochurePDF />, outputPath);
  console.log('✅ Brochure PDF generated at:', outputPath);
}

generate();
```

Add to `package.json`:
```json
"scripts": {
  "generate-brochure": "node scripts/generate-brochure.mjs",
  "build": "npm run generate-brochure && next build"
}
```

### Dynamic Generation (Runtime API)

For lead-gated downloads — generate on-demand:

```typescript
// src/app/api/brochure/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import { BrochurePDF } from '@/components/brochure/BrochurePDF';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = body.email;

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  // Save lead to Supabase
  const supabase = await createClient();
  await supabase.from('leads').insert({
    name: body.name || '',
    email,
    phone: body.phone || '',
    source: 'brochure-download',
    status: 'new',
  });

  // Push GTM event
  // window.dataLayer.push({ event: 'brochure_downloaded', email });

  // Generate PDF stream
  const pdfStream = await renderToStream(<BrochurePDF />);

  // Return as downloadable PDF
  return new NextResponse(pdfStream as unknown as ReadableStream, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="wasleen-foldable-garage-brochure.pdf"',
    },
  });
}
```

### Direct Static Download (No Gate)

For direct linking without email capture:

```typescript
// src/app/api/brochure/static/route.ts
import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  const pdfPath = path.join(process.cwd(), 'public', 'pdfs', 'wasleen-brochure.pdf');
  const pdfBuffer = await readFile(pdfPath);

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="wasleen-foldable-garage-brochure.pdf"',
    },
  });
}
```

---

## 📊 DATA FLOW

```
                    ┌──────────────────────────────────────┐
                    │       Brochure Data Sources          │
                    ├──────────────────────────────────────┤
                    │  src/lib/constants.ts                │
                    │  ├── COLOURS (5 colours)            │
                    │  ├── PRICING (rates)                │
                    │  ├── FEATURES (5 features)          │
                    │  ├── STATS (4 stats)                │
                    │  ├── PRICING_TIERS (3 tiers)        │
                    │  └── WHATSAPP_NUMBER / COMPANY_EMAIL │
                    │                                      │
                    │  public/images/                      │
                    │  ├── hero-product.webp              │
                    │  ├── feature-*.webp (×5)            │
                    │  ├── colour-*.webp (×5)             │
                    │  ├── gallery-*.webp (×4+)           │
                    │  └── about-workshop.webp            │
                    │                                      │
                    │  Logo/wasleen-garage-logo.svg       │
                    └──────────┬───────────────────────────┘
                               │
                               ▼
              ┌────────────────────────────────────┐
              │    BrochurePDF React Components     │
              │    (@react-pdf/renderer)           │
              │                                    │
              │  CoverPage → AboutPage → Features  │
              │  → Colours → Specs → Pricing       │
              │  → Gallery → Contact               │
              └──────────┬─────────────────────────┘
                         │
              ┌──────────▼──────────┐
              │   renderToFile()    │
              │   or                │
              │   renderToStream()  │
              └──────────┬──────────┘
                         │
              ┌──────────▼──────────┐
              │  Output: PDF File    │
              │                     │
              │  /public/pdfs/      │
              │  wasleen-brochure.pdf│
              └─────────────────────┘
```

---

## ✅ IMPLEMENTATION CHECKLIST

### Phase 1: Setup & Foundation
- [ ] Install `@react-pdf/renderer` — `npm install @react-pdf/renderer`
- [ ] Create directory structure: `src/components/brochure/`, `src/components/brochure/pages/`, `src/components/brochure/shared/`
- [ ] Register Plus Jakarta Sans fonts (download TTF/WOFF2 font files to `public/fonts/`)
- [ ] Create shared styles file (`styles.ts`)
- [ ] Create shared UI components (`GoldDivider`, `PageBackground`, `PageFooter`, `LogoMark`)
- [ ] Test: Render a single test page with font + logo

### Phase 2: Page Components
- [ ] Build `CoverPage.tsx` — full-bleed hero photo, logo, tagline, gold line
- [ ] Build `AboutPage.tsx` — brand story text + workshop photo + 4 stats
- [ ] Build `FeaturePages.tsx` — 5 feature cards with photos + spec bullets
- [ ] Build `ColourPage.tsx` — 4 colour swatches grid with photos
- [ ] Build `ColourPageDark.tsx` — Dark Charcoal hero spread
- [ ] Build `SpecsPage.tsx` — technical specifications table
- [ ] Build `PricingPage.tsx` — 3-tier pricing cards with gold badge
- [ ] Build `GalleryPage.tsx` — 2×2 installation photo grid (pages 10-11)
- [ ] Build `ContactPage.tsx` — contact info + QR code + CTA
- [ ] Build `BrochurePDF.tsx` — root document assembling all pages

### Phase 3: Generation System
- [ ] Create static generation script `scripts/generate-brochure.mjs`
- [ ] Add `generate-brochure` script to `package.json`
- [ ] Run generation and verify output PDF
- [ ] Create API route for lead-gated download (`src/app/api/brochure/route.ts`)
- [ ] Create API route for static download (`src/app/api/brochure/static/route.ts`)
- [ ] Create lead-gated download page or modal component
- [ ] Push GTM event `brochure_downloaded` on download

### Phase 4: Polish & Review
- [ ] Verify Plus Jakarta Sans renders correctly in PDF
- [ ] Check all images render at full resolution
- [ ] Verify gold gradients render properly
- [ ] Test clickable links (WhatsApp, email, website)
- [ ] Test file size — target < 5 MB
- [ ] Test with actual PDF viewer (Adobe Acrobat, browser, mobile)
- [ ] Print test — verify A4 layout, margins, crop marks
- [ ] Add `robots.txt` rule to allow crawling of PDF

---

## 📦 DEPENDENCIES & INSTALLATION

### Install Command

```bash
cd d:\Retractable Carport\foldablegarage.wasleen.com
npm install @react-pdf/renderer
```

### Required Font Files

Download Plus Jakarta Sans TTF files and place in `public/fonts/`:

| File | Weight |
|------|--------|
| `PlusJakartaSans-Regular.ttf` | 400 |
| `PlusJakartaSans-Medium.ttf` | 500 |
| `PlusJakartaSans-SemiBold.ttf` | 600 |
| `PlusJakartaSans-Bold.ttf` | 700 |

**Download source:** [Google Fonts — Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans)

### Required Photo Assets

The brochure needs these images from `public/images/` (already planned in build plan Step 0.7):

| Image | Used On | File |
|-------|---------|------|
| Hero product | Cover page | `hero-product.webp` |
| Feature: Rail | Page 3 | `feature-rail.webp` |
| Feature: Roller | Page 3 | `feature-roller.webp` |
| Feature: Coating | Page 3 | `feature-coating.webp` |
| Feature: Polycarbonate | Page 4 | `feature-polycarbonate.webp` |
| Feature: Smart | Page 4 | `feature-smart.webp` |
| Colour: Bronze | Page 6 | `colour-bronze.webp` |
| Colour: Sapphire | Page 6 | `colour-sapphire.webp` |
| Colour: Light Smoke | Page 6 | `colour-light-smoke.webp` |
| Colour: Medium Smoke | Page 6 | `colour-medium-smoke.webp` |
| Colour: Dark Charcoal | Page 7 | `colour-dark-charcoal.webp` |
| Gallery × 4 | Pages 10-11 | `gallery-1.webp` through `gallery-4.webp` |
| Workshop | Page 2 | `about-workshop.webp` |

---

## 📎 REFERENCES

| Document | Link | What It Contains |
|----------|------|-----------------|
| Design tokens | [`.roo/rules/01-design-system.md`](../.roo/rules/01-design-system.md) | Colors, typography, spacing |
| Media specs | [`.roo/rules/04-media-specs.md`](../.roo/rules/04-media-specs.md) | Image canvas sizes, formats |
| App constants | [`src/lib/constants.ts`](src/lib/constants.ts) | All pricing, features, colours, stats |
| Build plan | [`plans/build_phase_plan.md`](../plans/build_phase_plan.md) | Phase 3 Step 3.7 — spec download |
| Logo SVG | [`Logo/wasleen-garage-logo.svg`](../Logo/wasleen-garage-logo.svg) | Gold gradient W-mark |
| Setup guide | [`plans/setup_guide_and_plan.md`](../plans/setup_guide_and_plan.md) | Pricing table, colour options |
| Existing PPTX | [`Wasleen_Retractable_Carport_Brochure.pptx`](/Wasleen_Retractable_Carport_Brochure.pptx) | Reference content for brochure |
| @react-pdf docs | [react-pdf.org](https://react-pdf.org/) | Library documentation |
