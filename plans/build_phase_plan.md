# Wasleen Foldable Garage — Build Phase Plan (AI Training Document)

> **Purpose:** This document is a complete instruction manual for Roo (the AI coding assistant) to build the Wasleen Foldable Garage website. Follow all steps sequentially. Each phase depends on the previous phase being complete and verified.

---

## 🎯 EXISTING ASSETS — ALREADY BUILT, READY TO USE

The following assets and components already exist in the workspace at `d:/Retractable Carport/Website planning/`. The AI builder must **copy/import these into the project** rather than rebuilding them.

### Logo Assets

| File | Path | Purpose |
|------|------|---------|
| `WasleenGarageLogo.tsx` | [`Logo/WasleenGarageLogo.tsx`](../Logo/WasleenGarageLogo.tsx) | React component — SVG logo with gold gradient, wordmark, inverted mode |
| `wasleen-garage-logo.svg` | [`Logo/wasleen-garage-logo.svg`](../Logo/wasleen-garage-logo.svg) | Raw SVG — for direct `<img>` use or favicon |
| `garage-logo-preview.html` | [`Logo/garage-logo-preview.html`](../Logo/garage-logo-preview.html) | Preview page — visual reference for logo appearance |

**How to use in the project:**
- Copy `WasleenGarageLogo.tsx` → `src/components/layout/Logo.tsx`
- Copy `wasleen-garage-logo.svg` → `public/images/logo.svg`
- The React component accepts: `size`, `showWordmark`, `inverted`, `className`, `style` props
- Use `<WasleenGarageLogo size={40} inverted />` in Navbar (on dark background)
- Use `<WasleenGarageLogo size={32} showWordmark />` in Footer

### Legal Policies Page

| File | Path | Purpose |
|------|------|---------|
| `wasleen-legal-policies.html` | [`wasleen-legal-policies.html`](../wasleen-legal-policies.html) | Complete legal policies (Warranty, Returns, Terms, Privacy) |

**How to use:**
- Reference the legal content from this HTML file when building the `/warranty`, `/returns`, `/terms`, `/privacy` pages
- Convert the content into Next.js page components with the dark theme styling

### Planning Documents (Reference Only)

| File | Path | Purpose |
|------|------|---------|
| `setup_guide_and_plan.md` | [`plans/setup_guide_and_plan.md`](../plans/setup_guide_and_plan.md) | Setup guide + 4-phase plan + pricing |
| `ui_design_spec.md` | [`plans/ui_design_spec.md`](../plans/ui_design_spec.md) | Complete UI spec for all 11 pages |
| `credentials_and_config.md` | [`plans/credentials_and_config.md`](../plans/credentials_and_config.md) | All credentials and environment variables |
| `google_analytics_tag_manager_setup.md` | [`plans/google_analytics_tag_manager_setup.md`](../plans/google_analytics_tag_manager_setup.md) | GA4 + GTM setup guide |
| `logo_redesign_concepts.md` | [`plans/logo_redesign_concepts.md`](../plans/logo_redesign_concepts.md) | 4 logo concepts (Concept 1 was selected and built) |
| `wasleen_website_mega_plan.html` | [`wasleen_website_mega_plan.html`](../wasleen_website_mega_plan.html) | Interactive mega plan reference |

---

## 📋 PROJECT OVERVIEW

| Property | Value |
|----------|-------|
| **Product** | Foldable Premium Garage (Retractable Carport) |
| **Domain** | `foldablegarage.wasleen.com` |
| **Stack** | Next.js 15 (App Router) · Tailwind CSS v4 · TypeScript · Supabase · Paddle · GSAP · Framer Motion · GA4 + GTM · Vercel |
| **Target** | UAE market — Bilingual (Arabic + English) |
| **Design** | Dark theme (`#0A0A0A` base), gold accents (`#C9A84C`), Plus Jakarta Sans font |
| **Target Audience** | UAE villa owners — high net worth individuals |

### Credentials Reference

All credentials are in [`plans/credentials_and_config.md`](./credentials_and_config.md). Key values:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://fqgobatptemhejusgsfd.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `NEXT_PUBLIC_GTM_ID` | `GTM-59Z5PLJS` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-6RDTW68FJC` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `971542330837` |
| `NEXT_PUBLIC_PADDLE_TOKEN` | Sandbox token in credentials file |
| `NEXT_PUBLIC_PADDLE_PRICE_ID` | `pri_01kqkgq674ywevhy0gp136jfpk` |
| `NEXT_PUBLIC_SITE_URL` | `https://foldablegarage.wasleen.com` |

---

## 📁 COMPLETE FILE STRUCTURE

```
foldablegarage/
├── .env.local                          # All credentials (DO NOT COMMIT)
├── .gitignore
├── next.config.ts                      # Next.js 15 configuration
├── tailwind.config.ts                  # Tailwind CSS v4 config
├── tsconfig.json
├── package.json
├── postcss.config.mjs
│
├── public/
│   ├── images/
│   │   ├── hero-product.webp          # Main hero product image
│   │   ├── logo.svg                    # WasleenGarageLogo SVG
│   │   ├── feature-rail.webp          # Precision Rail feature
│   │   ├── feature-roller.webp        # Heavy-Duty Roller feature
│   │   ├── feature-coating.webp       # PVDF Coating feature
│   │   ├── feature-polycarbonate.webp # Polycarbonate Panels feature
│   │   ├── feature-smart.webp         # Smart Automation feature
│   │   ├── colour-bronze.webp         # Bronze/Tea swatch
│   │   ├── colour-sapphire.webp       # Sapphire Blue swatch
│   │   ├── colour-light-smoke.webp    # Light Smoke swatch
│   │   ├── colour-medium-smoke.webp   # Medium Smoke swatch
│   │   ├── colour-dark-charcoal.webp  # Dark Charcoal swatch
│   │   ├── gallery-1.webp             # Installation photo 1
│   │   ├── gallery-2.webp             # Installation photo 2
│   │   ├── gallery-3.webp             # Installation photo 3
│   │   ├── mechanism-video-poster.webp # Video poster frame
│   │   ├── about-workshop.webp        # About page hero
│   │   └── team-*.webp                # Team member photos
│   ├── videos/
│   │   └── mechanism.mp4              # Product mechanism video
│   ├── fonts/
│   │   └── PlusJakartaSans-*.woff2    # Local font files
│   ├── favicon.ico
│   ├── apple-touch-icon.png
│   ├── site.webmanifest               # PWA manifest
│   └── robots.txt
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout — Navbar, Footer, GTM, fonts
│   │   ├── page.tsx                   # Homepage (all 9 sections)
│   │   ├── globals.css                # Tailwind directives + CSS custom properties
│   │   ├── not-found.tsx              # 404 page
│   │   │
│   │   ├── (marketing)/               # Route group for marketing pages
│   │   │   ├── layout.tsx             # Shared marketing layout
│   │   │   ├── product/
│   │   │   │   └── page.tsx           # /product — Product detail page
│   │   │   ├── about/
│   │   │   │   └── page.tsx           # /about — Brand story
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx           # /gallery — Installation portfolio
│   │   │   └── contact/
│   │   │       └── page.tsx           # /contact — Contact form + WhatsApp
│   │   │
│   │   ├── quote/
│   │   │   └── page.tsx               # /quote — 3-step configurator (MONEY PAGE)
│   │   │
│   │   ├── thank-you/
│   │   │   └── page.tsx               # /thank-you — Post-payment confirmation
│   │   │
│   │   ├── blog/
│   │   │   ├── page.tsx               # /blog — Blog index
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # /blog/[slug] — Single blog post
│   │   │
│   │   ├── warranty/
│   │   │   └── page.tsx               # /warranty — Warranty policy
│   │   ├── returns/
│   │   │   └── page.tsx               # /returns — Returns & exchange policy
│   │   ├── terms/
│   │   │   └── page.tsx               # /terms — Terms & conditions
│   │   └── privacy/
│   │       └── page.tsx               # /privacy — Privacy policy
│   │
│   ├── api/
│   │   ├── quote/
│   │   │   └── route.ts              # POST — Save quote to Supabase
│   │   ├── contact/
│   │   │   └── route.ts              # POST — Save contact form to Supabase
│   │   └── paddle-webhook/
│   │       └── route.ts              # POST — Paddle payment webhook
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx             # Sticky nav with mobile drawer
│   │   │   ├── Footer.tsx             # 4-column footer with legal links
│   │   │   ├── MobileMenu.tsx         # Slide-in mobile navigation drawer
│   │   │   ├── WhatsAppButton.tsx     # Floating WhatsApp CTA
│   │   │   └── ScrollToTop.tsx        # Scroll-to-top button
│   │   │
│   │   ├── homepage/
│   │   │   ├── HeroSection.tsx        # Section 1 — Full-screen hero
│   │   │   ├── HeroText.tsx           # Staggered word reveal animation
│   │   │   ├── KineticBackground.tsx  # SVG laser animated background
│   │   │   ├── MechanismReveal.tsx    # Section 2 — Scroll-pinned retraction
│   │   │   ├── FeaturesTrack.tsx      # Section 3 — Horizontal scroll cards
│   │   │   ├── FeatureCard.tsx        # Single feature card
│   │   │   ├── ParallaxVideo.tsx      # Section 4 — Scroll-scrubbed video
│   │   │   ├── StatsStrip.tsx         # Section 5 — Count-up stat numbers
│   │   │   ├── MaterialGallery.tsx    # Section 6 — Colour swatch gallery
│   │   │   ├── SocialProof.tsx        # Section 7 — Bento testimonial grid
│   │   │   ├── ReviewsCarousel.tsx    # Section 7.5 — Auto-scrolling reviews
│   │   │   ├── PricingPreview.tsx     # Section 8 — 3-tier pricing cards
│   │   │   └── FooterCTA.tsx          # Section 9 — Conversion CTA
│   │   │
│   │   ├── quote/
│   │   │   ├── QuoteConfigurator.tsx  # Main 3-step container
│   │   │   ├── StepIndicator.tsx      # Progress bar (Step 1/2/3)
│   │   │   ├── StepDimensions.tsx     # Step 1 — Size, roof, colour
│   │   │   ├── StepDetails.tsx        # Step 2 — Customer info form
│   │   │   ├── StepPayment.tsx        # Step 3 — Order summary + Pay
│   │   │   ├── PriceCalculator.tsx    # Live price calculation
│   │   │   ├── ColourSwatchPicker.tsx # 5 colour swatch circles
│   │   │   └── OrderSummary.tsx       # Final order summary display
│   │   │
│   │   ├── ui/
│   │   │   ├── Button.tsx             # Reusable button (magnetic hover)
│   │   │   ├── CTAButton.tsx          # Gold accent CTA button
│   │   │   ├── SectionHeading.tsx     # Section title component
│   │   │   ├── Container.tsx          # Max-width content wrapper
│   │   │   ├── StarRating.tsx         # Interactive/display star rating
│   │   │   ├── ReviewCard.tsx         # Single review display card
│   │   │   ├── WriteReviewModal.tsx   # Write-review form modal
│   │   │   ├── SwatchCircle.tsx       # Single colour swatch
│   │   │   ├── StatCounter.tsx        # Animated stat number
│   │   │   ├── LoadingSpinner.tsx     # Loading state
│   │   │   └── Toast.tsx              # Success/error toast notifications
│   │   │
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx           # Blog post card
│   │   │   └── BlogContent.tsx        # MDX/Supabase content renderer
│   │   │
│   │   └── product/
│   │       ├── ProductHero.tsx        # Product page hero
│   │       ├── TechSpecs.tsx          # Tech specs accordion/tabs
│   │       ├── ColourSelector.tsx     # Colour selection with preview
│   │       └── TechDiagram.tsx        # Annotated technical SVG
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts              # Supabase browser client
│   │   │   └── server.ts              # Supabase server client
│   │   ├── paddle.ts                  # Paddle SDK initialization
│   │   ├── gtm.ts                     # Google Tag Manager dataLayer helpers
│   │   ├── utils.ts                   # Utility functions (cn, formatPrice, etc.)
│   │   ├── constants.ts               # App-wide constants (pricing, colours, etc.)
│   │   └── types.ts                   # TypeScript type definitions
│   │
│   ├── data/
│   │   └── reviews-seed.ts            # 142 pre-seeded customer reviews
│   │
│   ├── hooks/
│   │   ├── useScrollProgress.ts       # Scroll progress tracking hook
│   │   ├── useCountUp.ts              # Number animation hook
│   │   ├── useInView.ts               # Viewport detection hook
│   │   └── useMediaQuery.ts           # Responsive breakpoint hook
│   │
│   └── styles/
│       └── animations.css             # Custom animation keyframes
│
├── supabase/
│   ├── migrations/
│   │   └── 00001_initial_schema.sql   # Complete database schema
│   └── seed.sql                       # Seed data (reviews, products, blog)
│
└── data/
    └── reviews-seed.json              # 142 reviews in JSON format
```

---

## 🔧 PHASE 0: PREREQUISITES & MANUAL SETUP

> **⚠️ HUMAN MUST COMPLETE:** These steps cannot be automated. Verify completion before starting Phase 1.

### Step 0.1 — GitHub Repository
- [ ] Create private repo `foldablegarage` under `wasleenshop` GitHub org
- [ ] Initialize with Node `.gitignore`
- [ ] Clone locally

### Step 0.2 — Vercel Project
- [ ] Go to [vercel.com](https://vercel.com) → Add New → Project
- [ ] Import `wasleenshop/foldablegarage`
- [ ] Framework preset: Next.js
- [ ] **Do NOT deploy yet**
- [ ] Add these environment variables (for later):
  - `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `NEXT_PUBLIC_GTM_ID`

### Step 0.3 — Domain DNS (GreenGeeks → Vercel)
- [ ] GreenGeeks cPanel → DNS Zone Editor → Add CNAME:
  - Name: `foldablegarage`
  - Target: `cname.vercel-dns.com`
  - TTL: 3600
- [ ] In Vercel → Project → Settings → Domains → Add `foldablegarage.wasleen.com`

### Step 0.4 — Supabase Project
- [ ] Create Supabase project: `foldablegarage`
- [ ] Region: Singapore (ap-southeast-1) — lowest latency to UAE
- [ ] Copy `Project URL` and `anon public key` to `.env.local`

### Step 0.5 — Paddle (Sandbox)
- [ ] Sign up at `sandbox-vendors.paddle.com`
- [ ] Complete merchant onboarding
- [ ] Copy API credentials to `.env.local`

### Step 0.6 — GA4 + GTM
- [ ] Create GA4 property → Measurement ID: `G-6RDTW68FJC`
- [ ] Create GTM container → Container ID: `GTM-59Z5PLJS`
- [ ] In GTM: Create "GA4 - Page View" tag (All Pages trigger)
- [ ] Publish GTM version `v1 - GA4 base setup`

### Step 0.7 — Content Assets
- [ ] Upload product photos to `public/images/`
- [ ] Upload mechanism video to `public/videos/mechanism.mp4`
- [ ] Prepare 5 feature images
- [ ] Prepare 5 colour swatch images
- [ ] Prepare installation gallery photos (10-15)
- [ ] Prepare team photos (4)

---

## 🏗️ PHASE 1: FOUNDATION & MONEY PAGES

> **Goal:** Site is live on `foldablegarage.wasleen.com` and can take payments.
> **Duration:** ~15 AI build sessions (each session = one tool call group)

---

### STEP 1.1 — Next.js 15 Project Scaffold

**Files to create:**
1. [`package.json`](package.json) — Dependencies
2. [`next.config.ts`](next.config.ts) — Next.js config
3. [`tsconfig.json`](tsconfig.json) — TypeScript config
4. [`tailwind.config.ts`](tailwind.config.ts) — Tailwind v4 config
5. [`postcss.config.mjs`](postcss.config.mjs) — PostCSS config
6. [`.gitignore`](.gitignore) — Standard Node + Next.js
7. [`.env.local`](.env.local) — Credentials (from credentials_and_config.md)
8. [`src/app/globals.css`](src/app/globals.css) — Tailwind directives + CSS custom properties
9. [`src/app/layout.tsx`](src/app/layout.tsx) — Root layout

**package.json dependencies:**
```json
{
  "dependencies": {
    "next": "^15.2.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@supabase/supabase-js": "^2.45.0",
    "@supabase/ssr": "^0.5.0",
    "framer-motion": "^11.15.0",
    "@paddle/paddle-js": "^1.2.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.5.0",
    "lenis": "^1.1.0"
  },
  "devDependencies": {
    "typescript": "^5.6.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "@tailwindcss/postcss": "^4.0.0",
    "postcss": "^8.4.0"
  }
}
```

**IMPORTANT DESIGN TOKENS** (for `globals.css`):
```css
:root {
  --bg-primary: #0A0A0A;
  --bg-secondary: #111111;
  --bg-card: #1A1A1A;
  --border-subtle: #2A2A2A;
  --text-primary: #FFFFFF;
  --text-secondary: #999999;
  --text-tertiary: #666666;
  --accent-gold: #C9A84C;
  --accent-gold-hover: #D4B85A;
  --accent-cyan: #00D4FF;
  --accent-violet: #7C3AED;
  --error: #EF4444;
  --success: #22C55E;
  --whatsapp: #25D366;
}
```

**Root layout must include:**
- [ ] GTM `<script>` in `<head>`
- [ ] GTM `<noscript>` after `<body>`
- [ ] Plus Jakarta Sans via Google Fonts (or local `woff2`)
- [ ] `Navbar` component
- [ ] `Footer` component
- [ ] `WhatsAppButton` (floating)
- [ ] `ScrollToTop` button
- [ ] `<main>` wrapper with min-height
- [ ] Metadata export (`generateMetadata`)

**Build check:** `npm run dev` should show a blank dark page with nav + footer.

---

### STEP 1.2 — Type System & Constants

**Files to create:**
1. [`src/lib/types.ts`](src/lib/types.ts) — All TypeScript interfaces
2. [`src/lib/constants.ts`](src/lib/constants.ts) — Pricing, colours, dimensions
3. [`src/lib/utils.ts`](src/lib/utils.ts) — Utility functions

**Key types to define** (in `types.ts`):
```typescript
// Product configuration
interface ProductConfig {
  width: number;        // meters (2-12, step 0.5)
  length: number;       // meters (6-30, step 0.5)
  roofType: 'polycarbonate' | 'glass';
  colour: ColourOption;
  hasAutomaticSystem: boolean;
  hasRollerShutter: boolean;
  hasGlassTint: boolean;
}

type ColourOption = 'bronze' | 'sapphire-blue' | 'light-smoke' | 'medium-smoke' | 'dark-charcoal';

interface ColourInfo {
  id: ColourOption;
  name: string;
  nameAr: string;
  hex: string;
  description: string;
}

// Pricing
interface PricingConfig {
  polycarbonateRate: number;    // 1050 AED/sqm
  glassRate: number;            // 1530 AED/sqm
  automaticSystemPrice: number; // 10283 AED
  rollerShutterPrice: number;   // 6620 AED
  glassTintRate: number;        // 552 AED/sqm
}

// Quote
interface QuoteFormData {
  fullName: string;
  phone: string;
  email: string;
  emirate: string;
  propertyType: string;
  message?: string;
}

interface QuoteSubmission extends ProductConfig, QuoteFormData {
  totalPrice: number;
  status: 'pending' | 'paid' | 'confirmed';
  createdAt: string;
}

// Review
interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  productVariant?: 'manual' | 'automatic' | 'commercial';
  colour?: string;
  verified: boolean;
  helpful: number;
  images?: string[];
  response?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

// Blog post
interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  contentEn: string;
  contentAr: string;
  excerptEn: string;
  excerptAr: string;
  metaDescriptionEn: string;
  metaDescriptionAr: string;
  publishedAt: string;
  tags: string[];
  featured: boolean;
}

// Lead
interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  emirate: string;
  propertyType: string;
  message?: string;
  source: 'quote' | 'contact' | 'spec-download' | 'whatsapp';
  config?: ProductConfig;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: string;
}
```

**Key constants** (in `constants.ts`):
```typescript
export const COLOURS: ColourInfo[] = [
  { id: 'bronze', name: 'Bronze/Tea', nameAr: 'برونزي/شاي', hex: '#8B7355', description: 'Warm amber, blends with sandstone villas' },
  { id: 'sapphire-blue', name: 'Sapphire Blue', nameAr: 'أزرق ياقوتي', hex: '#2E5E8E', description: 'Cool clarity, modern contrast' },
  { id: 'light-smoke', name: 'Light Smoke', nameAr: 'دخاني فاتح', hex: '#9EA2A8', description: 'Neutral, timeless soft grey' },
  { id: 'medium-smoke', name: 'Medium Smoke', nameAr: 'دخاني متوسط', hex: '#6B6F75', description: 'Classic anthracite, most popular' },
  { id: 'dark-charcoal', name: 'Dark Charcoal', nameAr: 'فحمي غامق', hex: '#36383A', description: 'Bold premium, maximum UV block' },
];

export const PRICING: PricingConfig = {
  polycarbonateRate: 1050,
  glassRate: 1530,
  automaticSystemPrice: 10283,
  rollerShutterPrice: 6620,
  glassTintRate: 552,
};

export const DIMENSIONS = {
  minWidth: 2,    // meters
  maxWidth: 12,
  minLength: 6,
  maxLength: 30,
  step: 0.5,
} as const;

export const WHATSAPP_NUMBER = '971542330837';
export const SITE_URL = 'https://foldablegarage.wasleen.com';
```

---

### STEP 1.3 — Supabase Client & Database Schema

**Files to create:**
1. [`src/lib/supabase/client.ts`](src/lib/supabase/client.ts) — Browser client
2. [`src/lib/supabase/server.ts`](src/lib/supabase/server.ts) — Server client
3. [`supabase/migrations/00001_initial_schema.sql`](supabase/migrations/00001_initial_schema.sql) — Schema

**Supabase browser client** (`client.ts`):
```typescript
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

**Supabase server client** (`server.ts`):
```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { getAll: () => cookieStore.getAll() } }
  );
}
```

**Database schema** (`00001_initial_schema.sql`):
```sql
-- LEADS TABLE
CREATE TABLE leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  emirate text,
  property_type text,
  message text,
  source text NOT NULL DEFAULT 'contact',
  config jsonb,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- ORDERS TABLE
CREATE TABLE orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id uuid REFERENCES leads(id),
  paddle_transaction_id text UNIQUE,
  paddle_order_id text,
  config jsonb NOT NULL,
  total_amount int NOT NULL,
  currency text DEFAULT 'AED',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- PRODUCTS TABLE
CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name_en text NOT NULL,
  name_ar text,
  description_en text,
  description_ar text,
  price_from int,
  specs jsonb,
  images text[],
  active boolean DEFAULT true,
  updated_at timestamptz DEFAULT now()
);

-- BLOG POSTS TABLE
CREATE TABLE blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title_en text NOT NULL,
  title_ar text,
  content_en text NOT NULL,
  content_ar text,
  excerpt_en text,
  excerpt_ar text,
  meta_description_en text,
  meta_description_ar text,
  featured_image text,
  published_at timestamptz,
  tags text[],
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- REVIEWS TABLE
CREATE TABLE reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text,
  location text NOT NULL,
  rating int NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text NOT NULL,
  content text NOT NULL,
  product_variant text,
  colour text,
  verified boolean DEFAULT false,
  helpful int DEFAULT 0,
  images text[],
  response text,
  status text DEFAULT 'approved',
  created_at timestamptz DEFAULT now()
);

-- ENABLE RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES
CREATE POLICY "Anyone can insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can read active products" ON products FOR SELECT USING (active = true);
CREATE POLICY "Anyone can read published posts" ON blog_posts FOR SELECT USING (published_at IS NOT NULL);
CREATE POLICY "Anyone can read approved reviews" ON reviews FOR SELECT USING (status = 'approved');
CREATE POLICY "Anyone can insert reviews" ON reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role full access" ON orders FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');
```

---

### STEP 1.4 — Layout Components (Nav, Footer, UI Shell)

**Files to create:**
1. [`src/components/layout/Navbar.tsx`](src/components/layout/Navbar.tsx) — Sticky nav
2. [`src/components/layout/MobileMenu.tsx`](src/components/layout/MobileMenu.tsx) — Mobile drawer
3. [`src/components/layout/Footer.tsx`](src/components/layout/Footer.tsx) — Footer
4. [`src/components/layout/WhatsAppButton.tsx`](src/components/layout/WhatsAppButton.tsx) — Floating WhatsApp
5. [`src/components/layout/ScrollToTop.tsx`](src/components/layout/ScrollToTop.tsx) — Scroll to top
6. [`src/components/ui/Button.tsx`](src/components/ui/Button.tsx) — Reusable button
7. [`src/components/ui/Container.tsx`](src/components/ui/Container.tsx) — Max-width wrapper

**Navbar requirements:**
- Logo left — use the existing [`WasleenGarageLogo`](../Logo/WasleenGarageLogo.tsx) React component
- Copy the file from `../Logo/WasleenGarageLogo.tsx` to `src/components/layout/Logo.tsx`
- On dark backgrounds: use `<WasleenGarageLogo size={40} inverted />` (white/gold on dark)
- Props available: `size`, `showWordmark`, `inverted`, `className`, `style`
- Nav links: Product, Gallery, About, Contact
- "Get a Quote" CTA button (gold accent)
- Sticky at top, transparent on hero, solid `#111111` on scroll
- Use `framer-motion` for scroll-based background transition
- Mobile: hamburger → slide-in drawer

**Mobile menu requirements:**
- Framer Motion `AnimatePresence` for enter/exit
- Full-height slide-in from right
- All nav links + CTA button
- Close on link click or backdrop click

**Footer requirements:**
- 4-column grid: Logo+description, Products, Support, Contact
- WhatsApp number displayed
- Legal links: Warranty, Returns, Terms, Privacy
- Copyright: "© Wasleen 2025"

**Floating WhatsApp button:**
- Fixed bottom-right
- WhatsApp green (`#25D366`)
- Pulse animation
- `href: https://wa.me/971542330837`
- `target="_blank" rel="noopener noreferrer"`

---

### STEP 1.5 — Homepage Sections (Part 1: Hero + Mechanism)

**Files to create:**
1. [`src/components/homepage/HeroSection.tsx`](src/components/homepage/HeroSection.tsx)
2. [`src/components/homepage/HeroText.tsx`](src/components/homepage/HeroText.tsx)
3. [`src/components/homepage/KineticBackground.tsx`](src/components/homepage/KineticBackground.tsx)
4. [`src/components/homepage/MechanismReveal.tsx`](src/components/homepage/MechanismReveal.tsx)
5. [`src/components/homepage/SectionHeading.tsx`](src/components/ui/SectionHeading.tsx)

**HeroSection requirements:**
- 100vh height, full viewport
- Background: `KineticBackground` component with SVG lasers
- Headline: "Intelligent Motion. Absolute Protection." using `HeroText`
- Subheadline: "Architectural-grade retractable carports for the UAE — engineered from 6063-T5 aluminium."
- Two CTAs: "Request a Consultation" (primary, gold accent) + "▶ Watch it Open" (outline, scrolls to video section)
- Scroll indicator at bottom (animated chevron)
- Use `framer-motion` stagger for text reveal

**HeroText component:**
- Takes `text: string` prop
- Splits into words, each word fades up with 100ms stagger
- Gold accent on key words
- Uses `framer-motion` `staggerChildren` variant

**KineticBackground component:**
- SVG with animated paths (cyan `#00D4FF`, violet `#7C3AED`)
- CSS animation: `@keyframes laser-flow` for path movement
- Responsive — adjusts to viewport
- Subtle opacity pulse

**MechanismReveal requirements:**
- 600px scroll-pinned section (use IntersectionObserver + transform)
- Product image centered, retracts visually on scroll
- Text overlay: "Three sections. One motion. Zero compromise."
- Note: Full GSAP ScrollTrigger animation comes in Phase 2. For Phase 1, use simple CSS transforms triggered by scroll position.

---

### STEP 1.6 — Homepage Sections (Part 2: Stats + Gallery + Pricing)

**Files to create:**
1. [`src/components/homepage/StatsStrip.tsx`](src/components/homepage/StatsStrip.tsx)
2. [`src/components/homepage/MaterialGallery.tsx`](src/components/homepage/MaterialGallery.tsx)
3. [`src/components/homepage/SocialProof.tsx`](src/components/homepage/SocialProof.tsx)
4. [`src/components/homepage/PricingPreview.tsx`](src/components/homepage/PricingPreview.tsx)
5. [`src/components/homepage/FooterCTA.tsx`](src/components/homepage/FooterCTA.tsx)

**StatsStrip requirements:**
- Dark background `#0A0A0A`
- 4 columns: 15+ Years No-Fade · 99.9% UV Block · <60 Day Delivery · 5-Year Warranty
- Gold numbers, white labels
- Count-up animation (basic setInterval for Phase 1, Framer useSpring in Phase 2)
- SVG circular progress rings

**MaterialGallery requirements:**
- Large product image (70% width)
- 5 colour swatches below (clickable circles)
- Click changes product image colour
- Active swatch has gold ring border
- Framer Motion layout animation for image transition

**SocialProof requirements:**
- Bento grid: 2×2 of project photos with overlay text
- "Trusted by Dubai villa owners" header
- Star rating display
- For Phase 1, use placeholder images with gradient backgrounds

**PricingPreview requirements:**
- 3 cards: Manual / Automatic (Most Popular) / Commercial
- Gold "Most Popular" badge on Automatic
- Each card: title, price from, 4 bullet features, CTA button
- Hover: card lifts `translateY(-4px)` + shadow

**FooterCTA requirements:**
- Full-bleed dark with kinetic background (reduced opacity)
- Headline: "Ready to protect what matters?"
- Two buttons: "Get a Quote" + "WhatsApp Us Now"
- WhatsApp number displayed

---

### STEP 1.7 — Homepage Sections (Part 3: Features + Video + Reviews)

**Files to create:**
1. [`src/components/homepage/FeaturesTrack.tsx`](src/components/homepage/FeaturesTrack.tsx)
2. [`src/components/homepage/FeatureCard.tsx`](src/components/homepage/FeatureCard.tsx)
3. [`src/components/homepage/ParallaxVideo.tsx`](src/components/homepage/ParallaxVideo.tsx)
4. [`src/components/homepage/ReviewsCarousel.tsx`](src/components/homepage/ReviewsCarousel.tsx)

**IMPORTANT:** For Phase 1, these sections use simplified versions. Phase 2 upgrades them with GSAP scroll effects.

**FeaturesTrack (Phase 1 simplified):**
- 5 cards in a vertical stack (horizontal scroll in Phase 2)
- Cards: Precision Rail, Heavy-Duty Roller, PVDF Coating, Polycarbonate Options, Smart Automation
- Each card: icon/placeholder, title, 3 spec bullets
- Fade-in on scroll via `framer-motion` `whileInView`

**ParallaxVideo (Phase 1 simplified):**
- Dark background section
- Video element with poster image (auto-play, muted, loop)
- Overlay text: "Every movement. Engineered." in gold
- Basic fade-in on scroll

**ReviewsCarousel (Phase 1):**
- Auto-scrolling carousel (3 cards desktop, 1 card mobile)
- Reads from `/data/reviews-seed.ts` (static data for now)
- Star rating display
- "Write a Review" button → modal
- 5-second auto-advance, pause on hover
- Dot indicators

---

### STEP 1.8 — Reviews System (Stars + Write Review)

**Files to create:**
1. [`src/components/ui/StarRating.tsx`](src/components/ui/StarRating.tsx)
2. [`src/components/ui/ReviewCard.tsx`](src/components/ui/ReviewCard.tsx)
3. [`src/components/ui/WriteReviewModal.tsx`](src/components/ui/WriteReviewModal.tsx)
4. [`src/data/reviews-seed.ts`](src/data/reviews-seed.ts)

**StarRating requirements:**
```typescript
interface StarRatingProps {
  rating: number;           // 0-5, supports decimals
  count?: number;           // Review count (shown in parentheses)
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;    // Enables click-to-rate
  onRate?: (rating: number) => void;
  showValue?: boolean;
  showCount?: boolean;
}
```
- Gold `#C9A84C` fill for full stars
- Partial fill for decimal ratings (CSS gradient)
- Interactive mode: hover fills gold, click sets rating

**Star rendering logic:**
```
For 4.8 rating:
  Star 1-4: FULL gold
  Star 5: linear-gradient(90deg, #C9A84C 80%, #555 80%)
```

**WriteReviewModal requirements:**
- Framer Motion modal: scale 0.95→1 + backdrop fade (250ms)
- Fields: Name, Email, Location, Rating (interactive stars), Title, Content (20-1000 chars), Product Variant (select), Colour (select), Photo Upload (max 3), Terms checkbox
- Validation: all required fields, email format, min content length
- Submit → POST to `/api/quote` or Supabase directly
- Success toast on completion

**Reviews seed data** (`reviews-seed.ts`):
- 142 reviews with realistic Arabic/Western names
- UAE locations (Dubai Marina, Palm Jumeirah, Arabian Ranches, etc.)
- Dates spread Jan 2023 - May 2025
- ~85% verified, ratings distributed (79% 5-star, 15% 4-star, etc.)
- Mix of product variants and colours

---

### STEP 1.9 — Quote Page (3-Step Configurator) — THE MONEY PAGE

**Files to create:**
1. [`src/app/quote/page.tsx`](src/app/quote/page.tsx)
2. [`src/components/quote/QuoteConfigurator.tsx`](src/components/quote/QuoteConfigurator.tsx)
3. [`src/components/quote/StepIndicator.tsx`](src/components/quote/StepIndicator.tsx)
4. [`src/components/quote/StepDimensions.tsx`](src/components/quote/StepDimensions.tsx)
5. [`src/components/quote/StepDetails.tsx`](src/components/quote/StepDetails.tsx)
6. [`src/components/quote/StepPayment.tsx`](src/components/quote/StepPayment.tsx)
7. [`src/components/quote/PriceCalculator.tsx`](src/components/quote/PriceCalculator.tsx)
8. [`src/components/quote/ColourSwatchPicker.tsx`](src/components/quote/ColourSwatchPicker.tsx)
9. [`src/components/quote/OrderSummary.tsx`](src/components/quote/OrderSummary.tsx)

**QuoteConfigurator state machine:**
```
Step 1 (Dimensions) → Step 2 (Details) → Step 3 (Payment)
    ↑                    ↑                    ↑
  User selects:        User fills:          User sees:
  - Width slider      - Full name          - Order summary
  - Length slider     - Phone              - Total price
  - Roof type         - Email              - Pay button → Paddle
  - Colour            - Emirate            - WhatsApp escape
  - Options            - Property type
                       - Message (opt)
```

**Step 1 — Dimensions:**
- Width slider: 2m - 12m, step 0.5m
- Length slider: 6m - 30m, step 0.5m
- Area display: calculated live
- Roof type: Polycarbonate / Glass toggle
- Colour: 5 swatch circles (Bronze, Blue, Light Smoke, Medium Smoke, Dark Charcoal)
- Options checkboxes: Automatic System (+AED 10,283), Electric Roller Shutter (+AED 6,620), Glass Tint (+AED 552/sqm, only if Glass)
- Live price display updating in real-time

**Step 2 — Details:**
- Full Name (required)
- Phone (required, UAE format)
- Email (required)
- Emirate dropdown (Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain)
- Property Type dropdown (Villa, Apartment, Commercial, Other)
- Message (optional textarea)

**Step 3 — Payment:**
- Order summary (Product, Size, Roof, Colour, Options)
- Price breakdown (Subtotal, Add-ons, Total)
- "Pay AED X — Secured by Paddle" button
- Trust badges (5-year warranty, UAE team, Paddle secure)
- "Prefer to discuss?" WhatsApp escape link

**Price calculation** (`PriceCalculator.tsx`):
```typescript
function calculatePrice(config: ProductConfig): number {
  const area = config.width * config.length;
  const roofRate = config.roofType === 'polycarbonate' ? 1050 : 1530;
  
  let total = area * roofRate;
  if (config.hasAutomaticSystem) total += 10283;
  if (config.hasRollerShutter) total += 6620;
  if (config.hasGlassTint && config.roofType === 'glass') total += area * 552;
  
  return total;
}
```

---

### STEP 1.10 — API Routes (Quote + Contact + Paddle Webhook)

**Files to create:**
1. [`src/app/api/quote/route.ts`](src/app/api/quote/route.ts)
2. [`src/app/api/contact/route.ts`](src/app/api/contact/route.ts)
3. [`src/app/api/paddle-webhook/route.ts`](src/app/api/paddle-webhook/route.ts)

**Quote API** (`/api/quote`):
```typescript
// POST handler
// Request body: { config: ProductConfig, details: QuoteFormData, totalPrice: number }
// Steps:
// 1. Insert into `leads` table
// 2. Insert into `orders` table with status 'pending'
// 3. Return { leadId, orderId }
// 4. Trigger GTM dataLayer event

export async function POST(request: Request) {
  const body = await request.json();
  const supabase = createClient();
  
  // Insert lead
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .insert({ ...body.details, source: 'quote', config: body.config })
    .select()
    .single();
    
  // Insert order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      lead_id: lead.id,
      config: body.config,
      total_amount: body.totalPrice,
      status: 'pending'
    })
    .select()
    .single();
    
  return Response.json({ leadId: lead.id, orderId: order.id });
}
```

**Contact API** (`/api/contact`):
- Simple lead capture
- Insert into `leads` table with `source: 'contact'`
- Return success

**Paddle Webhook** (`/api/paddle-webhook`):
```typescript
// POST handler
// Paddle sends webhook events (transaction.completed, transaction.paid, etc.)
// Steps:
// 1. Verify webhook signature (Paddle SDK)
// 2. Find order by transaction ID
// 3. Update order status
// 4. Return 200 OK

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get('paddle-signature');
  
  // Verify webhook signature
  // Update order status based on event type
  // Return 200 for Paddle to stop retrying
  
  return new Response('OK', { status: 200 });
}
```

---

### STEP 1.11 — Paddle Payment Integration

**Files to create/modify:**
1. [`src/lib/paddle.ts`](src/lib/paddle.ts) — Paddle SDK initialization
2. Modify [`StepPayment.tsx`](src/components/quote/StepPayment.tsx) — Add Paddle checkout

**Paddle setup** (`paddle.ts`):
```typescript
import { initializePaddle } from '@paddle/paddle-js';

let paddleInstance: any = null;

export async function getPaddle() {
  if (paddleInstance) return paddleInstance;
  
  paddleInstance = await initializePaddle({
    environment: 'sandbox', // Change to 'production' for live
    token: process.env.NEXT_PUBLIC_PADDLE_TOKEN!,
  });
  
  return paddleInstance;
}
```

**Paddle checkout in StepPayment:**
```typescript
const handlePayment = async () => {
  // 1. Save quote to Supabase via /api/quote
  const response = await fetch('/api/quote', {
    method: 'POST',
    body: JSON.stringify({ config, details, totalPrice })
  });
  const { leadId, orderId } = await response.json();
  
  // 2. Open Paddle checkout
  const paddle = await getPaddle();
  paddle.Checkout.open({
    items: [{ priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID!, quantity: 1 }],
    customData: { leadId, orderId },
    successUrl: `${window.location.origin}/thank-you?orderId=${orderId}`,
  });
};
```

---

### STEP 1.12 — Thank You + Contact Pages

**Files to create:**
1. [`src/app/thank-you/page.tsx`](src/app/thank-you/page.tsx)
2. [`src/app/(marketing)/contact/page.tsx`](src/app/(marketing)/contact/page.tsx)

**Thank You page:**
- Success checkmark with animation
- Order confirmation number
- "What happens next" steps (3 steps)
- WhatsApp CTA for updates
- Social share buttons

**Contact page:**
- Two-column layout: Form | Contact Info
- Form fields: Name, Phone, Email, Subject, Message
- Contact info: Phone, Email, Location, Hours
- WhatsApp CTA button
- Google Maps embed (Dubai showroom)

---

### STEP 1.13 — GA4 + GTM Integration

**Files to create/modify:**
1. [`src/lib/gtm.ts`](src/lib/gtm.ts) — DataLayer helpers
2. Update [`RootLayout`](src/app/layout.tsx) — Add GTM snippets

**GTM helper** (`gtm.ts`):
```typescript
type GTMEvent = 
  | 'quote_started'
  | 'size_selected'
  | 'type_selected'
  | 'colour_selected'
  | 'quote_details_submitted'
  | 'deposit_started'
  | 'deposit_completed'
  | 'deposit_failed'
  | 'whatsapp_clicked'
  | 'abandoned_quote'
  | 'spec_downloaded';

export function pushGTMEvent(event: GTMEvent, data?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event, ...data });
  }
}
```

**DataLayer push points throughout the app:**
- Hero CTA click → `quote_started`
- Each config change → `size_selected`, `type_selected`, `colour_selected`
- Step 2 submit → `quote_details_submitted`
- Pay button click → `deposit_started`
- Paddle success → `deposit_completed`
- Paddle fail → `deposit_failed`
- WhatsApp click → `whatsapp_clicked`
- Quote page exit → `abandoned_quote`

---

### STEP 1.14 — SEO Foundation + Metadata

**Tasks:**
- Add `generateMetadata()` to every page
- Create `robots.txt`
- Create dynamic OG images (basic version for Phase 1)

**Metadata example** (for homepage):
```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Wasleen Foldable Garage — Premium Retractable Carports UAE',
    description: 'Architectural-grade retractable carports engineered in Dubai. 6063-T5 aluminium, PVDF coating, automatic systems. Request a consultation.',
    openGraph: {
      title: 'Wasleen Foldable Garage — Intelligent Motion. Absolute Protection.',
      description: 'Premium retractable carports for UAE villas.',
      url: 'https://foldablegarage.wasleen.com',
      siteName: 'Wasleen Foldable Garage',
      images: [{ url: '/images/og-homepage.jpg', width: 1200, height: 630 }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: { card: 'summary_large_image', title: 'Wasleen Foldable Garage', description: 'Premium retractable carports for UAE villas.' },
    robots: { index: true, follow: true },
    alternates: { canonical: 'https://foldablegarage.wasleen.com' },
  };
}
```

---

### STEP 1.15 — Deploy to Vercel

**Deployment checklist:**
- [ ] Push code to GitHub `main` branch
- [ ] Vercel auto-deploys (already linked from Step 0.2)
- [ ] Set all environment variables in Vercel dashboard
- [ ] Verify domain: `foldablegarage.wasleen.com`
- [ ] SSL certificate auto-provisioned (may take a few minutes)
- [ ] Test full flow: homepage → quote → configure → pay → confirm

**Post-deploy test checklist:**
- [ ] Homepage loads with all sections
- [ ] Navbar sticky + scroll background change
- [ ] Mobile menu opens/closes
- [ ] Quote calculator updates price correctly
- [ ] Form submission saves to Supabase
- [ ] Paddle checkout overlay opens
- [ ] WhatsApp buttons open correct chat
- [ ] All pages return 200
- [ ] Lighthouse score ≥ 80 (minimum)

---

## 🎨 PHASE 2: ANIMATIONS & 3D EFFECTS

> **Goal:** Apple product ad-level visual experience.
> **Prerequisite:** Phase 1 fully deployed and verified.
> **Duration:** ~3 weeks of development sessions.

---

### STEP 2.1 — Lenis Smooth Scroll + GSAP Setup

**Files to create/modify:**
1. [`src/hooks/useSmoothScroll.ts`](src/hooks/useSmoothScroll.ts) — Lenis hook
2. [`src/components/providers/SmoothScrollProvider.tsx`](src/components/providers/SmoothScrollProvider.tsx)
3. Update `package.json` — Add `gsap`, `@gsap/react`, `lenis`

**Install:** `npm install gsap @gsap/react lenis`

**Lenis + GSAP integration:**
```typescript
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
}
```

---

### STEP 2.2 — Hero Kinetic Lasers (GSAP ScrollTrigger)

**Modify:** [`HeroSection.tsx`](src/components/homepage/HeroSection.tsx)

**Animation spec:**
- Hero pinned via ScrollTrigger
- Laser SVG opacity fades from 1→0 over 200px scroll
- Headline words particle-dissolve downward
- Background transitions from `#0A0A0A` → `#111111`

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'top top',
      end: '+=300',
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        // Fade lasers based on scroll progress
        gsap.to('.hero-lasers', { opacity: 1 - self.progress, duration: 0.1 });
      },
    });
  });
  return () => ctx.revert();
}, []);
```

---

### STEP 2.3 — Mechanism Retraction (Scroll-Scrubbed)

**Modify:** [`MechanismReveal.tsx`](src/components/homepage/MechanismReveal.tsx)

**Animation spec:**
- Pinned for 600px scroll distance
- 3 panels progressively "retract" via CSS clip-path or transform
- Rail highlight travels left-to-right
- Luxury car fades in at 80% progress (opacity 0→1, scale 0.95→1)
- Background transitions from black → villa exterior

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    ScrollTrigger.create({
      trigger: '#mechanism',
      pin: true,
      scrub: 1,
      start: 'top top',
      end: '+=600',
      onUpdate: (self) => {
        const progress = self.progress;
        // Panel 1: retracts 0-33% progress
        // Panel 2: retracts 33-66% progress
        // Panel 3: retracts 66-100% progress
        setMechanismProgress(progress);
      },
    });
  });
  return () => ctx.revert();
}, []);
```

---

### STEP 2.4 — Horizontal Feature Track

**Modify:** [`FeaturesTrack.tsx`](src/components/homepage/FeaturesTrack.tsx)

**Animation spec:**
- GSAP horizontalScroll plugin
- 5 cards, each 80vw wide
- Cards scroll horizontally as user scrolls vertically
- Each card: image zoom 1.1→1.0 (Ken Burns), spec numbers count up, gold underline draws in

```typescript
useEffect(() => {
  const ctx = gsap.context(() => {
    const cards = document.querySelectorAll('.feature-card');
    const track = document.querySelector('.features-track');
    
    gsap.to(track, {
      xPercent: -80 * (cards.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: '.features-wrapper',
        pin: true,
        scrub: 1,
        end: () => '+=' + track.offsetWidth,
      },
    });
  });
  return () => ctx.revert();
}, []);
```

---

### STEP 2.5 — Parallax Gallery (Framer Motion)

**Modify:** [`MaterialGallery.tsx`](src/components/homepage/MaterialGallery.tsx)

**Animation spec:**
- Three depth layers: background (sky, 0.3× speed), midground (product, 0.6×), foreground (text, 1.0×)
- Pure Framer Motion (no GSAP needed)

```typescript
const { scrollY } = useScroll();
const y1 = useTransform(scrollY, [0, 500], [0, -150]); // Background
const y2 = useTransform(scrollY, [0, 500], [0, -90]);  // Midground
const y3 = useTransform(scrollY, [0, 500], [0, -40]);  // Foreground
```

---

### STEP 2.6 — Scroll-Scrubbed Video

**Modify:** [`ParallaxVideo.tsx`](src/components/homepage/ParallaxVideo.tsx)

**Animation spec:**
- Video playback speed linked to scroll speed
- Faster scroll = faster video
- Pause when scroll stops
- `currentTime = scrollProgress * video.duration`

```typescript
useEffect(() => {
  const video = videoRef.current;
  if (!video) return;
  
  ScrollTrigger.create({
    trigger: '.video-section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      video.currentTime = self.progress * video.duration;
    },
  });
}, []);
```

---

### STEP 2.7 — Stats Counter (Spring Animation)

**Modify:** [`StatsStrip.tsx`](src/components/homepage/StatsStrip.tsx)
**Create:** [`src/hooks/useCountUp.ts`](src/hooks/useCountUp.ts)

**Animation spec:**
- Numbers count from 0 to target using Framer Motion `useSpring`
- SVG circular progress rings animate simultaneously
- Triggered on viewport entry

```typescript
export function useCountUp(target: number) {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  
  useEffect(() => {
    if (inView) {
      const controls = animate(count, target, { type: 'spring', stiffness: 50, damping: 20 });
      return controls.stop;
    }
  }, [inView, target]);
  
  return { ref, count: rounded };
}
```

---

### STEP 2.8 — Custom Magnetic Cursor (Desktop)

**Create:** [`src/components/ui/MagneticCursor.tsx`](src/components/ui/MagneticCursor.tsx)

**Requirements:**
- Only on desktop (min-width 1024px)
- Large dot replaces default cursor
- Expands on hover over CTAs
- Shows "DRAG" label on horizontal scroll sections
- Hidden on mobile/touch devices

---

### STEP 2.9 — Page Transitions

**Create:** [`src/components/providers/PageTransitionProvider.tsx`](src/components/providers/PageTransitionProvider.tsx)

**Requirements:**
- Framer Motion `AnimatePresence`
- Fade + vertical slide between pages (300ms)
- Preserve scroll position between navigations
- No flash on route change

```typescript
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

---

### STEP 2.10 — Mobile Effects Reduction

**Add to all animated components:**
```typescript
const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: no-preference)');
const isMobile = useMediaQuery('(max-width: 768px)');

// Skip GSAP animations on mobile or if user prefers reduced motion
if (!prefersReducedMotion || isMobile) return null;
```

**Mobile fallbacks:**
- Horizontal scroll → vertical stack
- ScrollTrigger scrub → simple fade-in
- Parallax → static
- Custom cursor → hidden

---

## 🌐 PHASE 3: SEO CONTENT ENGINE & ARABIC

> **Goal:** Ranking for UAE carport keywords.
> **Prerequisite:** Phase 2 complete and verified.
> **Duration:** ~3 weeks.

---

### STEP 3.1 — Bilingual Routing (next-intl)

**Install:** `npm install next-intl`

**Files to create/modify:**
1. [`src/i18n/request.ts`](src/i18n/request.ts) — Locale config
2. [`src/i18n/routing.ts`](src/i18n/routing.ts) — Routing config
3. [`src/middleware.ts`](src/middleware.ts) — i18n middleware
4. [`messages/en.json`](messages/en.json) — English translations
5. [`messages/ar.json`](messages/ar.json) — Arabic translations

**Structure:**
- `/en/` — English routes
- `/ar/` — Arabic routes (RTL)
- Auto-detect language based on browser preference
- Language switcher in navbar

**Arabic requirements:**
- RTL layout (`dir="rtl"`)
- Arabic font support (Noto Naskh Arabic or similar)
- Right-aligned text, reversed layouts
- All content translated

---

### STEP 3.2 — Blog Section (Contentlayer MDX)

**Install:** `npm install contentlayer @contentlayer/core next-contentlayer`

**Files to create:**
1. [`contentlayer.config.ts`](contentlayer.config.ts) — Contentlayer config
2. [`src/app/blog/page.tsx`](src/app/blog/page.tsx) — Blog index
3. [`src/app/blog/[slug]/page.tsx`](src/app/blog/[slug]/page.tsx) — Blog post

**Blog posts directory:**
```
content/
├── blog/
│   ├── en/
│   │   ├── retractable-carport-uae-guide.mdx
│   │   ├── automatic-carport-dubai-villa.mdx
│   │   ├── carport-installation-cost-uae.mdx
│   │   ├── aluminium-carport-vs-steel.mdx
│   │   └── car-protection-sand-dubai.mdx
│   └── ar/
│       ├── دليل-الكاربورت-القابل-للطي-في-الإمارات.mdx
│       ├── مظلة-سيارة-أوتوماتيكية-دبي.mdx
│       └── تكلفة-تركيب-الكاربورت-في-الإمارات.mdx
```

**Each MDX post frontmatter:**
```yaml
---
title: "Retractable Carport UAE: Complete Guide 2025"
title_ar: "دليل الكاربورت القابل للطي في الإمارات 2025"
description: "Everything you need to know about retractable carports in the UAE"
description_ar: "كل ما تحتاج معرفته عن الكاربورت القابل للطي في الإمارات"
published_at: 2025-01-15
tags: [retractable-carport, uae, guide]
featured: true
---
```

---

### STEP 3.3 — JSON-LD Schema Markup

**Create:** [`src/lib/schema.ts`](src/lib/schema.ts)

**Schema types to implement:**
```typescript
// Product schema
export function productSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Foldable Premium Garage',
    description: 'Architectural-grade retractable carport',
    brand: { '@type': 'Brand', name: 'Wasleen' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'AED',
      lowPrice: 28000,
      highPrice: 85000,
    },
  };
}

// LocalBusiness schema
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Wasleen Foldable Garage',
    address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
    telephone: '+971542330837',
    areaServed: 'UAE',
  };
}

// FAQ schema
export function faqSchema(questions: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: { '@type': 'Answer', text: q.answer },
    })),
  };
}
```

**Add to all pages as `<script type="application/ld+json">`**

---

### STEP 3.4 — Gallery Page (/gallery)

**Files to create:**
1. [`src/app/(marketing)/gallery/page.tsx`](src/app/(marketing)/gallery/page.tsx)

**Requirements:**
- Masonry grid layout (use CSS columns or a library)
- Filter by size, colour, or installation type
- Before/after image sliders
- Lightbox on click
- All images optimized via `next/image`

---

### STEP 3.5 — About Page (/about)

**Files to create:**
1. [`src/app/(marketing)/about/page.tsx`](src/app/(marketing)/about/page.tsx)

**Requirements:**
- Hero: brand story with workshop image
- Our Story: company history, mission, values
- Team: 4 team member cards
- Certifications: ISO, TUV, CE badges
- Past Projects: gallery grid
- CTA: "Ready to work with us?" → Contact

---

### STEP 3.6 — Product Page (/product)

**Files to create:**
1. [`src/app/(marketing)/product/page.tsx`](src/app/(marketing)/product/page.tsx)
2. [`src/components/product/ProductHero.tsx`](src/components/product/ProductHero.tsx)
3. [`src/components/product/TechSpecs.tsx`](src/components/product/TechSpecs.tsx)
4. [`src/components/product/ColourSelector.tsx`](src/components/product/ColourSelector.tsx)
5. [`src/components/product/TechDiagram.tsx`](src/components/product/TechDiagram.tsx)

**Requirements:**
- Product hero with image gallery (thumbnails → large preview)
- Key specs: Dimensions, Materials, Weight, Warranty
- Technical details in accordion/tabs
- Full customer reviews section (sortable, paginated)
- Colour options with preview
- Tech diagram (SVG with callouts)
- "Get Exact Quote" CTA

---

### STEP 3.7 — Spec Sheet Download (Lead-Gated)

**Create:** [`src/app/api/spec-download/route.ts`](src/app/api/spec-download/route.ts)

**Requirements:**
- User enters email → PDF downloads
- Email saved to Supabase `leads` table with `source: 'spec-download'`
- PDF stored in `public/pdfs/wasleen-spec-sheet.pdf`
- GTM event `spec_downloaded` fired

---

### STEP 3.8 — Sitemap + Search Console

**Files to create:**
1. [`src/app/sitemap.ts`](src/app/sitemap.ts) — Dynamic sitemap
2. [`src/app/robots.ts`](src/app/robots.ts) — Dynamic robots.txt

**Sitemap includes:**
- All static pages
- All blog posts (fetched from Supabase)
- Both language variants with hreflang
- Last modified dates

---

## 🚀 PHASE 4: PWA & ADVANCED FEATURES

> **Goal:** Fully automated lead-to-sale pipeline.
> **Prerequisite:** Phase 3 complete and verified.
> **Duration:** ~3 weeks.

---

### STEP 4.1 — PWA Setup (Service Worker)

**Install:** `npm install next-pwa` or `@serwist/next` (modern alternative)

**Files to create:**
1. [`public/sw.js`](public/sw.js) — Service worker (auto-generated)
2. [`public/site.webmanifest`](public/site.webmanifest) — App manifest
3. Update `next.config.ts` — PWA plugin

**Manifest config:**
```json
{
  "name": "Wasleen Foldable Garage",
  "short_name": "Wasleen",
  "description": "Premium retractable carports for UAE villas",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0A0A0A",
  "theme_color": "#0A0A0A",
  "icons": [
    { "src": "/images/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/images/icon-512.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

**Offline page:**
- Branded offline page with kinetic background
- Message: "Your quote is saved — reconnect to submit."
- Cached quote data from localStorage

---

### STEP 4.2 — 3D Product Viewer (React Three Fiber)

**Install:** `npm install @react-three/fiber @react-three/drei three`

**Files to create:**
1. [`src/components/product/ProductViewer3D.tsx`](src/components/product/ProductViewer3D.tsx) — R3F canvas
2. [`src/components/product/CarportModel.tsx`](src/components/product/CarportModel.tsx) — 3D model
3. [`src/components/product/ModelControls.tsx`](src/components/product/ModelControls.tsx) — OrbitControls

**Requirements:**
- 360° rotation via OrbitControls
- Colour change on swatch click
- Dimension scaling (width/length adjust model)
- Auto-rotate on idle
- Lazy loaded (only when in viewport, with suspense fallback)

---

### STEP 4.3 — Analytics Review + Funnel Optimization

**Create conversion funnel in GA4:**
```
Step 1: quote_started      → How many people click "Get Quote"
Step 2: size_selected      → How many pick a size
Step 3: quote_details_submitted → How many fill their info
Step 4: deposit_completed  → How many actually pay
```

**Optimization targets:**
- Quote start → deposit paid: 25-35% conversion
- If drop-off at Step 2 → simplify dimension options
- If drop-off at Step 3 → reduce form fields
- If drop-off at payment → WhatsApp escape valve

---

### STEP 4.4 — Performance Audit

**Lighthouse targets:**
| Metric | Target |
|--------|--------|
| Performance | 95+ |
| Accessibility | 95+ |
| Best Practices | 95+ |
| SEO | 100 |
| LCP | < 2.0s |
| FID/INP | < 100ms |
| CLS | 0 |

**Optimization checklist:**
- [ ] All images use `next/image` with proper sizes
- [ ] Fonts preloaded with `display: swap`
- [ ] GSAP/Framer animations lazy-loaded below fold
- [ ] Video has poster frame preloaded
- [ ] JS bundles code-split by route
- [ ] Supabase queries cached with React cache()
- [ ] Static pages use ISR with appropriate revalidation
- [ ] Dynamic OG images cached at edge

---

### STEP 4.5 — Final End-to-End Testing

**Test flow:**
```
Google organic search → Homepage
  → Read hero + scroll through sections
  → Click "Get a Quote" → /quote
  → Configure size, roof, colour, options
  → Live price updates correctly
  → Continue to Step 2 → fill details
  → Continue to Step 3 → see order summary
  → Click Pay → Paddle overlay opens
  → Complete payment → redirect to /thank-you
  → WhatsApp confirmation received
```

**Test on:**
- Chrome (desktop + mobile)
- Safari (iOS)
- Samsung Internet (Android)
- Lighthouse CI

---

## 📋 DEPLOYMENT CHECKLIST (ALL PHASES)

### Phase 1 Deployment
- [ ] All Phase 1 code pushed to GitHub `main`
- [ ] Vercel auto-deploys successfully
- [ ] Domain `foldablegarage.wasleen.com` resolves
- [ ] SSL certificate valid
- [ ] Environment variables set in Vercel
- [ ] Quote calculator works end-to-end
- [ ] Paddle checkout opens and processes sandbox payment
- [ ] Supabase tables created and RLS enabled
- [ ] GA4 + GTM snippets verified in page source
- [ ] All pages return 200 status

### Phase 2 Deployment
- [ ] Smooth scroll works on desktop
- [ ] GSAP animations don't break on mobile
- [ ] `prefers-reduced-motion` respected
- [ ] No layout shift during animations
- [ ] All browsers tested (Chrome, Safari, Firefox, Edge)

### Phase 3 Deployment
- [ ] Arabic routes work at `/ar/*`
- [ ] RTL layout correct
- [ ] Blog posts render with proper formatting
- [ ] JSON-LD schema valid (test with Google Rich Results)
- [ ] Sitemap submitted to Google Search Console
- [ ] Hreflang tags present on all pages

### Phase 4 Deployment
- [ ] PWA install prompt works
- [ ] Offline page displays
- [ ] 3D viewer loads and responds
- [ ] Lighthouse 95+ on mobile + desktop
- [ ] Conversion funnel tracked in GA4

---

## ⚠️ COMMON PITFALLS & GUIDELINES

### For the AI Builder (Roo Code):

1. **Always create files in the correct order.** Database schema must exist before API routes. API routes must exist before components that call them.

2. **Test each step before proceeding.** After creating a component, verify it renders without errors. After creating an API route, test it with curl or browser.

3. **Use relative imports.** All component imports should be relative (`../../components/...`), not absolute.

4. **'use client' directive.** Add `'use client'` to any component that uses:
   - React hooks (`useState`, `useEffect`, etc.)
   - Framer Motion
   - GSAP
   - Browser APIs (localStorage, etc.)
   - Event handlers

5. **Server components by default.** All other components should be server components (no `'use client'` directive).

6. **Environment variables.** Never hardcode credentials. Always use `process.env.NEXT_PUBLIC_*`.

7. **Accessibility.** Every interactive element needs:
   - Keyboard support (Tab, Enter, Escape)
   - ARIA labels where visual label isn't clear
   - Focus indicators

8. **Mobile-first CSS.** Use Tailwind's responsive prefixes (`sm:`, `md:`, `lg:`) with mobile (390px) as the base.

9. **Don't commit `.env.local`.** It's in `.gitignore` by default.

10. **One component, one file.** Each component gets its own file, named after the component.

---

## 🔄 WORKFLOW SUMMARY

```
HUMAN: Complete Phase 0 (manual setup)
  ↓
HUMAN: Send credentials to AI
  ↓
AI (Code mode): Build Phase 1 → Steps 1.1 through 1.15
  ↓
HUMAN: Review on foldablegarage.wasleen.com → Feedback
  ↓
AI (Code mode): Fix issues → Deploy
  ↓
HUMAN: Approve Phase 1
  ↓
AI (Code mode): Build Phase 2 → Steps 2.1 through 2.10
  ↓
HUMAN: Review → Feedback → Approve
  ↓
AI (Code mode): Build Phase 3 → Steps 3.1 through 3.8
  ↓
HUMAN: Review → Feedback → Approve
  ↓
AI (Code mode): Build Phase 4 → Steps 4.1 through 4.5
  ↓
HUMAN: Final review → Go live
```

---

> **This document is the complete instruction manual for building the Wasleen Foldable Garage website.** Each step contains specific file paths, code requirements, and acceptance criteria. Follow sequentially. Do not skip steps. Verify each step before proceeding to the next.
