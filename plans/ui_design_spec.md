# Wasleen Foldable Garage — UI/Design Specification

## 🎨 Design Language

### Visual Identity

| Element | Specification |
|---------|--------------|
| **Vibe** | Premium · Luxury · Architectural · Tech-forward |
| **Target emotion** | Trust, quality, protection, sophistication |
| **Inspiration** | Apple product pages · Tesla · High-end automotive |
| **Competitor gap** | No UAE carport competitor has a premium web experience |

### Color Palette

```
Primary Background:    #0A0A0A  (Near black — hero sections)
Secondary Background:  #111111  (Dark grey — content sections)
Card Background:       #1A1A1A  (Slightly lighter — cards, panels)
Border Subtle:         #2A2A2A  (Card borders, dividers)

Primary Text:          #FFFFFF  (Headlines, primary content)
Secondary Text:        #999999  (Body copy, descriptions)
Tertiary Text:         #666666  (Labels, metadata)

Accent Gold:           #C9A84C  (CTA buttons, highlights, stats)
Accent Gold Hover:     #D4B85A  (Button hover state)
Accent Cyan:           #00D4FF  (Kinetic laser lines)
Accent Violet:         #7C3AED  (Kinetic laser lines)

Error:                 #EF4444  (Form validation)
Success:               #22C55E  (Payment confirmed)
WhatsApp Green:        #25D366  (WhatsApp CTA hover)

Overlay:               rgba(0,0,0,0.7)  (Modal backgrounds)
Gradient Hero:         linear-gradient(180deg, #0A0A0A 0%, #111111 100%)
```

### Typography

| Element | Font | Weight | Size | Line Height |
|---------|------|--------|------|-------------|
| **H1 (Hero)** | Plus Jakarta Sans | 700 (Bold) | clamp(2.5rem, 5vw, 4.5rem) | 1.05 |
| **H2 (Section)** | Plus Jakarta Sans | 600 (Semibold) | clamp(1.75rem, 3vw, 2.75rem) | 1.1 |
| **H3 (Card)** | Plus Jakarta Sans | 600 (Semibold) | clamp(1.25rem, 2vw, 1.75rem) | 1.2 |
| **H4 (Sub)** | Plus Jakarta Sans | 500 (Medium) | clamp(1rem, 1.5vw, 1.25rem) | 1.3 |
| **Body** | Plus Jakarta Sans | 400 (Regular) | clamp(0.875rem, 1vw, 1rem) | 1.6 |
| **Small** | Plus Jakarta Sans | 400 (Regular) | 0.75rem | 1.5 |
| **CTA Button** | Plus Jakarta Sans | 600 (Semibold) | 0.9375rem | 1 |
| **Price Large** | Plus Jakarta Sans | 700 (Bold) | clamp(1.5rem, 3vw, 2.5rem) | 1 |
| **Stat Number** | Plus Jakarta Sans | 700 (Bold) | clamp(2rem, 4vw, 3.5rem) | 1 |

### Spacing System

Based on 4px grid:
```
Space unit: 4px
Section padding: 80px desktop / 48px mobile
Card padding: 24px
Content max-width: 1200px
Gap between sections: 80px
```

### Breakpoints

| Device | Width | Design Base |
|--------|-------|-------------|
| Mobile | 390px | iPhone 15 Pro (design starts here) |
| Tablet | 768px | iPad |
| Desktop | 1280px+ | MacBook/External |

### Effects

| Effect | Implementation | When |
|--------|---------------|------|
| **Fade in on scroll** | Framer Motion `useInView` + `whileInView` | All sections |
| **Stagger reveal** | Framer Motion `staggerChildren` | Lists, cards |
| **Parallax depth** | Framer Motion `useTransform` + `useScroll` | Gallery section |
| **Page transitions** | Framer Motion `AnimatePresence` | Route changes |
| **Magnetic hover** | CSS + Framer Motion `onMouseMove` | CTA buttons |
| **Smooth scroll** | Lenis.js | Entire site |
| **Custom cursor** | Large dot (desktop only, Phase 2) | Desktop |
| **Price count-up** | Custom spring animation | Stats section |
| **Subtle hover lift** | `transform: translateY(-4px)` + shadow | Cards, tiers |

---

## ⭐ REVIEWS & RATINGS SYSTEM

### Overview

A full-featured customer reviews system with **142 pre-seeded reviews** averaging **4.8 stars**, plus a write-review submission form. The system spans two surfaces:

| Surface | Purpose |
|---------|---------|
| **Homepage (Section 7.5)** | Showcase social proof — auto-scrolling carousel of curated reviews, aggregate rating display |
| **Product Page** | Full review browser — sortable, filterable, paginated list with write-review form |

### Review Data Model

```typescript
interface Review {
  id: string;                    // uuid
  name: string;                  // Customer full name
  location: string;              // UAE location (e.g. "Dubai Marina", "Palm Jumeirah")
  rating: number;                // 1-5 (average seeded at 4.8)
  title: string;                 // Short headline (e.g. "Perfect for my villa")
  content: string;               // Detailed review body (50-300 chars)
  date: string;                  // ISO 8601 date (seeded across 2023-2025)
  productVariant?: 'manual' | 'automatic' | 'commercial';
  colour?: string;               // Colour they purchased
  verified: boolean;             // Verified purchase badge
  helpful: number;               // Upvote count (0-24)
  images?: string[];             // Optional uploaded images (max 3)
  response?: string;             // Merchant response from Wasleen
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;             // Timestamp
}
```

### Aggregate Stats (Computed from 142 Reviews)

| Stat | Value |
|------|-------|
| Total Reviews | 142 |
| Average Rating | 4.8 ★ |
| 5-star | 112 reviews (79%) |
| 4-star | 22 reviews (15%) |
| 3-star | 5 reviews (4%) |
| 2-star | 2 reviews (1%) |
| 1-star | 1 review (<1%) |

### 142 Seed Reviews — Design Rules

All 142 reviews are pre-written to feel authentic. Each review follows these rules:

- **Names**: Realistic Arabic/Western names common in UAE (e.g., Ahmed Al-Mansouri, Sarah Thompson, Khalid Al-Rashid, Priya Sharma, Omar Hassan)
- **Locations**: Real Dubai/Abu Dhabi/Sharjah neighborhoods (e.g., Dubai Marina, Palm Jumeirah, Arabian Ranches, Al Barari, Yas Island, Al Reef)
- **Dates**: Spread across Jan 2023 — May 2025, roughly 4-5 reviews per month
- **Content**: Mix of short enthusiasm ("Amazing quality!") and detailed reviews mentioning specific features (installation, motor noise, PVDF coating, colour, warranty response)
- **Verified**: ~85% marked `verified: true`
- **Product Variant**: ~50% automatic, ~35% manual, ~15% commercial
- **Colours**: Distributed across all 5 colour options, Medium Smoke most popular

### Seed Review Examples (Sample — 5 of 142)

| Name | Location | Rating | Title | Date | Verified |
|------|----------|--------|-------|------|----------|
| Ahmed Al-Mansouri | Palm Jumeirah | 5 | "Transformational addition to our villa" | 2024-11-15 | ✅ |
| Sarah Thompson | Dubai Marina | 5 | "The automatic system is a game-changer" | 2024-09-22 | ✅ |
| Khalid Al-Rashid | Arabian Ranches | 4 | "Solid build, very happy with the quality" | 2024-06-10 | ✅ |
| Priya Sharma | JLT | 5 | "Excellent service from consultation to install" | 2024-03-05 | ✅ |
| Omar Hassan | Al Barari | 5 | "Best investment for my car collection" | 2023-12-18 | ✅ |

> **Note**: The complete list of 142 seed reviews should be stored in `/data/reviews-seed.ts` or as a Supabase seed migration. Full list will be generated during implementation.

### Star Rating Component

A reusable `StarRating` component used across both surfaces:

```html
<!-- Visual design -->
<span class="star-rating" data-rating="4.8">
  ★★★★★          <!-- 5 stars, gold fill for each full star -->
  <span class="rating-value">4.8</span>
  <span class="rating-count">(142 reviews)</span>
</span>
```

**Component Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `rating` | number | 0 | Rating value (0-5, supports decimals) |
| `count` | number | — | Total review count (shown in parentheses) |
| `size` | 'sm' \| 'md' \| 'lg' | 'md' | Star size variant |
| `interactive` | boolean | false | Enables click-to-rate (for write-review form) |
| `onRate` | function | — | Callback with selected rating value |
| `showValue` | boolean | true | Show numeric rating next to stars |
| `showCount` | boolean | false | Show review count |

**Interactive mode** (for write-review form):
- Stars glow gold on hover (left-to-right fill)
- Click sets the rating
- Previously selected rating persists with full gold fill
- Half-star precision is NOT supported (full stars only for simplicity)

**Star Rendering Logic:**

```
For a rating of 4.8:
  Star 1: ★ FULL (gold)
  Star 2: ★ FULL (gold)
  Star 3: ★ FULL (gold)
  Star 4: ★ FULL (gold)
  Star 5: ★ PARTIAL — 80% fill (gold gradient cut at 80%)
```

Use CSS `background: linear-gradient(90deg, #C9A84C 0%, #C9A84C ${fillPercent}%, #555 ${fillPercent}%)` with `-webkit-background-clip: text` for partial star fills.

### Write-Review Form

A modal/drawer form accessible from both surfaces via a "Write a Review" button.

**Form Fields:**

| Field | Type | Validation | Notes |
|-------|------|-----------|-------|
| Full Name | Text input | Required, min 2 chars | — |
| Email | Email input | Required, valid format | Not displayed publicly |
| Location | Text input | Required | Free text, UAE-focused |
| Rating | StarRating (interactive) | Required | 1-5 stars |
| Review Title | Text input | Required, max 100 chars | — |
| Review Content | Textarea | Required, min 20 chars, max 1000 chars | Character counter |
| Product Variant | Select | Optional | Manual / Automatic / Commercial |
| Colour Purchased | Select | Optional | Match 5 colour swatches |
| Upload Photos | File input | Optional, max 3, max 5MB each, JPG/PNG | Preview thumbnails before submit |
| Agree to Terms | Checkbox | Required | "I confirm this is my genuine experience" |

**Post-Submission Flow:**
1. Form validated client-side
2. Submitted to Supabase `reviews` table with `status: pending`
3. Success toast: "Thank you! Your review will appear after moderation."
4. Review appears publicly only after admin approval
5. No edit/delete by user — contact support for changes

### Admin Moderation

- Supabase `reviews` table `status` column: `pending | approved | rejected`
- Admin route at `/admin/reviews` to approve/reject pending reviews
- New review approval increments the review count and recalculates average rating

### Animation & Interaction Spec

| Element | Animation | Trigger |
|---------|-----------|---------|
| Review cards (homepage) | Fade in + slide up, stagger 80ms | Scroll into view |
| Star rating (display) | Bounce-in on each star, 50ms stagger | Viewport enter |
| Star rating (interactive) | Hover scale 1.15, gold glow transition 200ms ease | Hover |
| Review carousel | Auto-scroll every 5s, pause on hover | Timer + hover |
| Write-review modal | Scale 0.95→1 + backdrop fade (250ms) | Button click |
| Form submit | Button loading spinner + checkmark transition | Submit click |
| Helpful upvote | Heart icon fill animation (200ms) | Click |
| Rating bars (product) | Width animate from 0% to target (600ms spring) | Viewport enter |

---

## 📄 PAGE 1: HOMEPAGE (/)

### Layout Flow (Top to Bottom)

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  NAVBAR                                                      │
│  [Logo]  [Product] [Gallery] [About] [Contact]  [ Get a Quote ] │
│                                                              │
│  ─────────────────────── SECTION 1 ───────────────────────  │
│  FULL-SCREEN HERO                                            │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │   (Kinetic SVG laser background - animated)      │       │
│  │                                                  │       │
│  │   Intelligent Motion.                            │       │
│  │   Absolute Protection.                           │       │
│  │                                                  │       │
│  │   Architectural-grade retractable carports       │       │
│  │   for the UAE — engineered from 6063-T5 aluminium │       │
│  │                                                  │       │
│  │   [Request a Consultation]  [▶ Watch it Open]    │       │
│  │                                                  │       │
│  │        ↓ Scroll to explore                       │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  ─────────────────────── SECTION 2 ───────────────────────  │
│  MECHANISM REVEAL (Pinned scroll animation)                  │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │   [Product centered — 3 panels retract on scroll] │       │
│  │                                                  │       │
│  │   "Three sections. One motion. Zero compromise." │       │
│  │                                                  │       │
│  │   [When fully open: luxury car fades in inside]  │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  ─────────────────────── SECTION 3 ───────────────────────  │
│  FEATURES (Horizontal scroll - 5 cards)                      │
│                                                              │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐             │
│  │Prec. │ │Heavy │ │PVDF  │ │Poly- │ │Smart │             │
│  │Rail  │ │Roller│ │Coat. │ │carb. │ │Auto  │             │
│  │[img] │ │[img] │ │[img] │ │[img] │ │[img] │             │
│  │3specs│ │3specs│ │3specs│ │3specs│ │3specs│             │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘             │
│                                                              │
│  ─────────────────────── SECTION 4 ───────────────────────  │
│  PARALLAX VIDEO                                              │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │   [Scroll-scrubbed mechanism opening video]      │       │
│  │                                                  │       │
│  │   Every movement. Engineered.                    │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  ─────────────────────── SECTION 5 ───────────────────────  │
│  STATS STRIP                                                 │
│                                                              │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐                        │
│  │ 15+ │  │99.9%│  │ <60 │  │  5  │                        │
│  │Years│  │UV   │  │ Days│  │Years│                        │
│  │No-  │  │Block│  │Delivery│ │Warr.│                        │
│  │Fade │  │     │  │     │  │     │                        │
│  └─────┘  └─────┘  └─────┘  └─────┘                        │
│                                                              │
│  ─────────────────────── SECTION 6 ───────────────────────  │
│  MATERIAL GALLERY (Parallax depth layers)                    │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │  [Large product image changes with swatch click] │       │
│  │                                                  │       │
│  │  Choose your finish:                             │       │
│  │  [⬤ Bronze] [⬤ Blue] [⬤ L.Smoke] [⬤ M.Smoke] [⬤ Char] │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  ─────────────────────── SECTION 7 ───────────────────────  │
│  SOCIAL PROOF                                                │
│                                                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │ [Project 1] │  │ [Project 2] │  │ [Project 3] │          │
│  │ "Excellent" │  │ "Perfect"   │  │ "Fast"      │          │
│  │ -Jumeirah   │  │ -Palm       │  │ -Emirates   │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
│                                                              │
│  ─────────────────────── SECTION 7.5 ─────────────────────  │
│  CUSTOMER REVIEWS ★★★★★ 4.8                                  │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │  "★★★★★ 4.8"  ·  142 Verified Reviews            │       │
│  │                                                    │       │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐    │       │
│  │  │ Review 1   │ │ Review 2   │ │ Review 3   │    │       │
│  │  │ ★★★★★     │ │ ★★★★★     │ │ ★★★★★     │    │       │
│  │  │ "Amazing!" │ │ "Perfect!" │ │ "Top tier!"│    │       │
│  │  │ -Ahmed,   │ │ -Sarah,   │ │ -Khalid,  │    │       │
│  │  │  Palm     │ │  Marina   │ │  Ranches  │    │       │
│  │  │  Jumeirah │ │           │ │           │    │       │
│  │  └────────────┘ └────────────┘ └────────────┘    │       │
│  │                                                    │       │
│  │  [← Auto-scrolling carousel →]    [Write a Review]│       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  ─────────────────────── SECTION 8 ───────────────────────  │
│  PRICING PREVIEW                                              │
│                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│  │  MANUAL    │  │  SMART     │  │  COMMERCIAL │             │
│  │ From AED   │  │ From AED   │  │  Custom     │             │
│  │  12,000    │  │  25,000    │  │  Project    │             │
│  │            │  │ ⭐ Most    │  │            │             │
│  │ [Quote]    │  │ [Quote]    │  │ [Contact]  │             │
│  └────────────┘  └────────────┘  └────────────┘             │
│                                                              │
│  ─────────────────────── SECTION 9 ───────────────────────  │
│  CONVERSION FOOTER CTA                                       │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │   (Kinetic SVG bg - reduced opacity)            │       │
│  │                                                  │       │
│  │   Ready to protect what matters?                 │       │
│  │                                                  │       │
│  │   [Get a Quote]  [WhatsApp Us Now]               │       │
│  │                     +971 54 233 0837             │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  FOOTER                                                      │
│  [Logo]  [Links]  [Contact]  [Social]  [© Wasleen 2025]    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Section Details

#### Navbar
- **Sticky** at top, transparent on hero, solid `#111111` on scroll
- Logo left (SVG format), nav links center, "Get a Quote" CTA button right (gold accent)
- Mobile: hamburger menu with slide-in drawer
- **CTA button** in nav: "Get a Quote" — gold accent

#### Section 1 — Hero
- **Height:** 100vh (full viewport)
- **Background:** Kinetic SVG lasers (cyan/blue/violet) animated via CSS/SVG animation
- **Headline:** Staggered word reveal (fade up, 100ms delay per word)
- **Subheadline:** Fade in 500ms after headline
- **CTAs:**
  - Primary: "Request a Consultation" — white fill, dark text, magnetic hover
  - Secondary: "▶ Watch it Open" — outline, scrolls to video section
- **Scroll indicator:** Animated chevron at bottom, pulses

#### Section 2 — Mechanism Reveal
- **Height:** 600px scroll-pinned
- Product 3D image centered, retracts on scroll
- Text overlay fades in at 40% scroll progress
- Luxury car fades in inside structure at 80% scroll
- Background transitions from black to villa exterior

#### Section 3 — Features Horizontal
- **5 cards** in horizontal scroll container
- Each card: 80vw wide on desktop, full width on mobile
- Image top (3:2 ratio), 3 spec bullets, "Learn more" link
- Gold underline draws on card enter via SVG animation

#### Section 4 — Parallax Video
- Dark background full-bleed
- Background video (muted, auto-play, loop)
- Overlay text: "Every movement. Engineered." in gold
- Fades in at 50% scroll through section

#### Section 5 — Stats Strip
- 4 columns, dark background `#0A0A0A`
- Gold numbers, white labels
- Count-up animation triggered on viewport entry
- Circular SVG progress rings animate simultaneously

#### Section 6 — Material Gallery
- Large product image (70% width) with parallax
- 5 colour swatches below as clickable circles
- Clicking swatch: product image transitions to that colour via Framer Motion layout animation
- Active swatch has gold ring border

#### Section 7 — Social Proof
- Bento grid: 2×2 or 3×2 layout
- Project photos with overlay text
- Testimonial quote cards: "text" - Client, Location
- Star rating (5 stars) in gold
- "Trusted by Dubai villa owners" header

#### Section 7.5 — Customer Reviews (Homepage)
- **Background**: Dark section `#111111` with subtle top/bottom gradient fade
- **Header**: Large "★★★★★ 4.8" in gold + "142 Verified Reviews" subtitle, centered
- **Aggregate bar**: Small distribution chart showing 5★ (112), 4★ (22), 3★ (5), 2★ (2), 1★ (1) with proportional width bars in gold/grey
- **Review cards**: 3 cards visible at a time on desktop (1 on mobile), each showing:
  - Star rating (gold ★★★★★)
  - Customer name + location (UAE area)
  - Short headline in bold white
  - Verified purchase badge (green checkmark)
  - "Helpful" upvote button (heart icon + count)
- **Carousel behavior**: Auto-scrolls every 5 seconds, pauses on hover, swipeable on mobile
  - Smooth slide transition (Framer Motion `AnimatePresence`)
  - Dot indicators at bottom showing position out of 142
- **CTA**: "Write a Review" button (gold outline, right side) opens the write-review modal
- **Mobile**: 1 card visible, full-width, larger touch targets for navigation arrows

#### Section 8 — Pricing Preview
- 3 cards in a row (stack on mobile)
- Most Popular badge (gold) on Automatic/Smart tier
- Each card: title, price from, 4 bullets, CTA button
- Hover: card lifts 4px, shadow increases

#### Section 9 — Footer CTA
- Full-bleed dark with kinetic SVG at 15% opacity
- Large headline, two CTA buttons stacked or side by side
- WhatsApp number displayed prominently
- No navigation distractions — pure conversion

#### Footer
- 4-column grid: Logo+description, Products, Support, Contact
- Copyright line at bottom
- Legal links row: [Warranty] [Returns] [Terms] [Privacy]

---

## 📄 PAGE 2: PRODUCT PAGE (/product)

### Layout Flow

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  NAVBAR (same as homepage, transparent)                      │
│                                                              │
│  ────────────────────────────────────────────────────────    │
│  PRODUCT HERO                                                 │
│                                                              │
│  ┌──────────────────┐  ┌────────────────────────────────┐   │
│  │  [Large product  │  │  Foldable Premium Garage       │   │
│  │   image gallery] │  │  AED 28,000 - 85,000           │   │
│  │                  │  │                                │   │
│  │  ◀ ○ ○ ○ ○ ▶   │  │  [Get Exact Quote →]           │   │
│  └──────────────────┘  └────────────────────────────────┘   │
│                                                              │
│  ────────────────────────────────────────────────────────    │
│  KEY SPECS (4 columns)                                       │
│                                                              │
│  [Dimensions]  [Materials]  [Weight]  [Warranty]             │
│                                                              │
│  ────────────────────────────────────────────────────────    │
│  TECHNICAL DETAILS (Accordion or tabs)                       │
│                                                              │
│  [Structure] [Mechanism] [Finish] [Options]                  │
│  ┌──────────────────────────────────────────────────┐       │
│  │  Content changes based on selected tab            │       │
│  │  - 6063-T5 aluminium                              │       │
│  │  - PVDF coating                                   │       │
│  │  - Polycarbonate/Glass panels                     │       │
│  │  - Automatic retraction system                    │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  ────────────────────────────────────────────────────────    │
│  COLOUR OPTIONS (5 swatches)                                 │
│                                                              │
│  ┌──┐ ┌──┐ ┌──┐ ┌──┐ ┌──┐                                  │
│  │Br│ │Bl│ │LS│ │MS│ │DC│  [Large preview of selected]     │
│  └──┘ └──┘ └──┘ └──┘ └──┘                                  │
│                                                              │
│  ────────────────────────────────────────────────────────    │
│  TECH DIAGRAM (SVG illustration)                             │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │   [Annotated technical drawing with callouts]    │       │
│  │                                                    │       │
│  │   1. Aluminium rail     2. Heavy-duty roller      │       │
│  │   3. Polycarbonate panel  4. Automatic motor      │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  ────────────────────────────────────────────────────────    │
│  CUSTOMER REVIEWS                                             │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │  ★★★★★  4.8 out of 5  ·  142 reviews            │       │
│  │                                                    │       │
│  │  ┌──────────┐ ┌────────────────────────────┐     │       │
│  │  │ 5★  112  │ ████████████████████░░  79%   │     │       │
│  │  │ 4★   22  │ ████░░░░░░░░░░░░░░░░  15%   │     │       │
│  │  │ 3★    5  │ █░░░░░░░░░░░░░░░░░░░   4%   │     │       │
│  │  │ 2★    2  │ ░░░░░░░░░░░░░░░░░░░░   1%   │     │       │
│  │  │ 1★    1  │ ░░░░░░░░░░░░░░░░░░░░  <1%   │     │       │
│  │  └──────────┘ └────────────────────────────┘     │       │
│  │                                                    │       │
│  │  Sort: [Most Recent ▼]  Filter: [All Products ▼] │       │
│  │                                                    │       │
│  │  ┌────────────────────────────────────────────┐   │       │
│  │  │ ★★★★★  "Perfect for my villa"             │   │       │
│  │  │ Ahmed Al-Mansouri, Palm Jumeirah  ✅ Verified│   │       │
│  │  │ "Transformational addition to our villa.   │   │       │
│  │  │  The automatic system works flawlessly..."  │   │       │
│  │  │ [👍 Helpful 12]  Nov 15, 2024              │   │       │
│  │  └────────────────────────────────────────────┘   │       │
│  │  ┌────────────────────────────────────────────┐   │       │
│  │  │ ★★★★★  "Excellent service and quality"    │   │       │
│  │  │ Sarah Thompson, Dubai Marina  ✅ Verified   │   │       │
│  │  │ "From consultation to installation, every- │   │       │
│  │  │  thing was professional. The PVDF coating  │   │       │
│  │  │  looks stunning in our driveway..."        │   │       │
│  │  │ [👍 Helpful 8]  Sep 22, 2024              │   │       │
│  │  └────────────────────────────────────────────┘   │       │
│  │                                                    │       │
│  │  [← Prev]  Page 1 of 29  [Next →]                 │       │
│  │                                                    │       │
│  │  [✍ Write a Review]                                │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  ────────────────────────────────────────────────────────    │
│  CTA BANNER                                                   │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │  Configure your perfect carport → [Start Now]    │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
│  FOOTER (same as homepage)                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Product Page Section Details

#### Customer Reviews Section

**Summary Header:**
- Left side: Large star rating display "★★★★★ 4.8 out of 5"
- Right side: "142 reviews" text + "Write a Review" gold CTA button
- Background: Card-style container `#1A1A1A` with `1px solid #2A2A2A` border, rounded corners

**Rating Distribution Bars:**
- 5 horizontal bars, each showing star count + proportional fill bar + percentage
- Fill bar uses gold `#C9A84C` gradient, animated width on viewport enter (spring 600ms)
- Remaining portion of bar is dark grey `#2A2A2A`
- Hover: bar brightens slightly

**Sort & Filter Controls:**
| Control | Options | Behavior |
|---------|---------|----------|
| Sort by | Most Recent, Highest Rated, Lowest Rated, Most Helpful | Re-renders review list with new sort order |
| Filter by Product | All Products, Manual, Automatic, Commercial | Filters reviews by productVariant |
| Filter by Rating | All, 5★, 4★, 3★, 2★, 1★ | Filters by rating value |

- Active filter has gold underline/indicator
- Smooth list re-ordering with Framer Motion `layout` prop

**Review Cards (Individual):**
Each review card displays:
1. **Star rating** — gold ★★★★★ (the actual rating of that review)
2. **Title** — Bold white, 16px
3. **Customer info** — Name + location in grey, Verified badge (green checkmark icon + "Verified Purchase" tooltip)
4. **Review body** — Grey text, 14px, line-clamp 3 with "Read more" expand link
5. **Review images** — Optional thumbnail strip (max 3), click to open lightbox
6. **Helpful button** — Thumbs up icon + count, click increments (one click per session, stored in localStorage)
7. **Date** — Relative time (e.g., "2 months ago") on hover shows exact date
8. **Merchant response** — If present, shown in a nested inset card with "Wasleen Response:" header in gold

**Card States:**
| State | Visual |
|-------|--------|
| Default | Dark card `#1A1A1A`, subtle border `#2A2A2A` |
| Hover | Border brightens to `#3A3A3A`, subtle glow |
| Expanded | "Read more" clicked — shows full review text, smoothly expands card height |

**Pagination:**
- 5 reviews per page
- Page indicator: "Page X of Y"
- Previous/Next buttons with arrow icons
- Page buttons disabled at boundaries (dimmed)
- Smooth fade transition when changing pages

**Write a Review Button:**
- Gold outlined button, prominent at bottom of section
- Opens the Write-Review modal (same modal component used site-wide)
- On success: review list re-fetches to show the new pending review (with a "Pending Approval" badge)

**Empty State** (if no reviews match filter):
- Centered message: "No reviews match this filter"
- Suggestion: "Try a different filter or be the first to write a review"
- "Write a Review" CTA below

---

## 📄 PAGE 3: QUOTE PAGE (/quote) — THE MONEY PAGE

### Layout Flow

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  NAVBAR (solid background)                                   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Configure Your Foldable Garage                       │    │
│  │                                                      │    │
│  │  Step 1 of 3: ═══●══════════════════════             │    │
│  │                                                      │    │
│  │  ┌────────────────────┐  ┌────────────────────────┐ │    │
│  │  │ DIMENSIONS         │  │ LIVE PREVIEW           │ │    │
│  │  │                    │  │                        │ │    │
│  │  │ Width: [6m ──●──]  │  │   [Product 3D image   │ │    │
│  │  │ Length: [3.5m ●─]  │  │    updates in real-   │ │    │
│  │  │                    │  │    time with selected  │ │    │
│  │  │ Area: 21 sqm      │  │    size, colour, roof] │ │    │
│  │  │                    │  │                        │ │    │
│  │  │ ROOF TYPE          │  │                        │ │    │
│  │  │ ● Polycarbonate    │  │                        │ │    │
│  │  │ ○ Glass            │  │                        │ │    │
│  │  │                    │  │                        │ │    │
│  │  │ COLOUR             │  │                        │ │    │
│  │  │ [⬤][⬤][⬤][⬤][⬤]  │  │                        │ │    │
│  │  └────────────────────┘  └────────────────────────┘ │    │
│  │                                                      │    │
│  │  ──── OPTIONS ────                                   │    │
│  │                                                      │    │
│  │  ☐ Automatic System         + AED 10,283            │    │
│  │  ☐ Electric Roller Shutter  + AED 6,620             │    │
│  │  ☐ Glass Tint (Black)       + AED 552/sqm           │    │
│  │  ☐ Shipping (Free)          + AED 0                 │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐   │    │
│  │  │  [Continue → Step 2: Your Details]           │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  │                                                      │    │
│  │  💬 Questions? [WhatsApp Us]                         │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Step 2 of 3: ══════════●════════════════            │    │
│  │                                                      │    │
│  │  Your Details                                        │    │
│  │                                                      │    │
│  │  Full Name:    [____________________________]       │    │
│  │  Phone:        [____________________________]       │    │
│  │  Email:        [____________________________]       │    │
│  │  Emirate:      [Dubai ▼]                           │    │
│  │  Property:     [Villa ▼]                            │    │
│  │  Message:      [____________________________]       │    │
│  │                     (optional)                      │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐   │    │
│  │  │  [← Back]    [Continue → Step 3: Payment]    │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Step 3 of 3: ════════════════════●═══               │    │
│  │                                                      │    │
│  │  Order Summary                                       │    │
│  │                                                      │    │
│  │  Product: Foldable Premium Garage                    │    │
│  │  Size: 6m × 3.5m (21 sqm)                           │    │
│  │  Roof: Polycarbonate                                 │    │
│  │  Colour: Medium Smoke                                │    │
│  │  Automatic System: Yes                               │    │
│  │                                                      │    │
│  │  ─────────────────────────────────────               │    │
│  │  Subtotal:                          AED 22,050       │    │
│  │  Automatic System:                  AED 10,283       │    │
│  │  ─────────────────────────────────────               │    │
│  │  TOTAL:                             AED 32,333       │    │
│  │                                                      │    │
│  │  ✅ Free Shipping                                    │    │
│  │                                                      │    │
│  │  ┌──────────────────────────────────────────────┐   │    │
│  │  │  💳 Pay AED 32,333 — Secured by Paddle       │   │    │
│  │  └──────────────────────────────────────────────┘   │    │
│  │                                                      │    │
│  │  🔒 Your payment is processed securely by Paddle.   │    │
│  │     We never see your card details.                  │    │
│  │                                                      │    │
│  │  💬 Prefer to discuss? [WhatsApp Us]                 │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Quote Configurator Rules

| Control | Type | Values |
|---------|------|--------|
| **Width** | Slider/Range input | 2m – 12m (step 0.5m) |
| **Length** | Slider/Range input | 6m – 30m (step 0.5m) |
| **Roof Type** | Radio toggle | Polycarbonate / Glass |
| **Colour** | Swatch circles (5) | Bronze, Blue, L.Smoke, M.Smoke, Charcoal |
| **Automatic** | Checkbox | +AED 10,283 |
| **Roller Shutter** | Checkbox | +AED 6,620 |
| **Glass Tint** | Checkbox | +AED 552/sqm (only if Glass selected) |
| **Shipping** | Checkbox (auto-checked) | Free |

### Price Calculator Logic

```javascript
function calculatePrice(config) {
  const { width, length, roofType, hasAuto, hasShutter, hasTint } = config;
  
  const area = width * length;
  const roofRate = roofType === 'polycarbonate' ? 1050 : 1530;
  
  let total = area * roofRate;
  if (hasAuto) total += 10283;
  if (hasShutter) total += 6620;
  if (hasTint && roofType === 'glass') total += area * 552;
  
  return total;
}
```

---

## 📄 PAGE 4: CONTACT PAGE (/contact)

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ┌────────────────────────┐  ┌────────────────────────────┐ │
│  │  GET IN TOUCH          │  │  CONTACT INFO              │ │
│  │                        │  │                            │ │
│  │  Name: [_________]     │  │  📞 +971 54 233 0837      │ │
│  │  Phone: [_________]    │  │  ✉️ info@wasleen.com      │ │
│  │  Email: [_________]    │  │  📍 Dubai, UAE            │ │
│  │  Subject: [______]     │  │                            │ │
│  │  Message: [_________]  │  │  ⏰ Sat-Thu: 9AM-7PM      │ │
│  │                        │  │                            │ │
│  │  [Send Message]        │  │  [📱 WhatsApp Us]          │ │
│  │                        │  │                            │ │
│  └────────────────────────┘  └────────────────────────────┘ │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  [Google Maps Embed — Dubai showroom location]       │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 📄 PAGE 5: ABOUT PAGE (/about)

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  HERO: Brand story header with workshop image                │
│                                                              │
│  ──── OUR STORY ────                                         │
│  Paragraph about Wasleen, founded, mission, values           │
│                                                              │
│  ──── TEAM ────                                              │
│  [Photo] [Photo] [Photo] [Photo] — team member cards        │
│                                                              │
│  ──── CERTIFICATIONS ────                                    │
│  [ISO] [TUV] [CE] — certification badges                    │
│                                                              │
│  ──── PAST PROJECTS ────                                     │
│  [Project 1] [Project 2] [Project 3] — gallery grid         │
│                                                              │
│  ──── CTA ────                                               │
│  "Ready to work with us?" [Contact Us]                       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 📄 PAGE 6: THANK YOU PAGE (/thank-you)

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  ✅ Thank You! Your Order is Confirmed                       │
│                                                              │
│  Order #: WS-2401                                            │
│                                                              │
│  What happens next:                                          │
│  1. 📋 We'll review your configuration within 24 hours       │
│  2. 📞 Our team will call you to confirm the details         │
│  3. 🚚 Installation scheduled within 2-3 weeks               │
│                                                              │
│  📱 [WhatsApp Us for Updates]                                │
│                                                              │
│  Share with friends: [Facebook] [Twitter] [WhatsApp]         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 📄 PAGE 7: BLOG (/blog, /blog/[slug])

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  BLOG HEADER                                                 │
│  "Wasleen Garage Blog — UAE Carport Guide"                   │
│                                                              │
│  ──── FEATURED POST ────                                     │
│  [Large card with image + title + excerpt]                   │
│                                                              │
│  ──── ALL POSTS (Grid) ────                                  │
│  ┌──────┐ ┌──────┐ ┌──────┐                                 │
│  │Post 1│ │Post 2│ │Post 3│  ← 3-column grid               │
│  └──────┘ └──────┘ └──────┘                                 │
│                                                              │
│  Tags: [Retractable] [Carport] [UAE] [Dubai] [Installation]  │
│                                                              │
│  Post page (/blog/slug):                                     │
│  - Article content with images                               │
│  - Author bio                                                │
│  - Related posts                                             │
│  - CTA at bottom: "Get your own carport" [Get a Quote]      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 📱 MOBILE SPECIFICS

| Element | Desktop | Mobile (390px) |
|---------|---------|----------------|
| **Hero** | 100vh, full effects | Reduced effects, static background |
| **Features** | Horizontal scroll | Vertical stack, 1 card per row |
| **Stats** | 4 columns | 2 columns, stacked |
| **Pricing** | 3 cards in a row | Vertical stack, full width |
| **Gallery** | 3 columns | 1 column |
| **Blog grid** | 3 columns | 1 column |
| **Nav** | Full horizontal | Hamburger → slide-in drawer |
| **Quote page** | Side-by-side (config + preview) | Stacked vertically |
| **Font sizes** | Larger | Smaller (clamp handles this) |
| **Touch targets** | — | Min 44×44px |
| **Animations** | All effects enabled | Reduced: fade-in only, no parallax |

---

## ♿ ACCESSIBILITY

| Requirement | Implementation |
|-------------|---------------|
| prefers-reduced-motion | All animations wrapped in `@media (prefers-reduced-motion: no-preference)` |
| Keyboard navigation | All interactive elements reachable via Tab |
| Focus indicators | Visible focus ring on all interactive elements |
| Alt text | All images have descriptive alt text |
| ARIA labels | Buttons, forms, navigation have aria-labels |
| Color contrast | All text meets WCAG AA minimum contrast |
| Touch targets | Minimum 44×44px on mobile |
| Form validation | Clear error messages, accessible error indicators |

---

## 📄 PAGE 8: WARRANTY POLICY (/warranty)

### Layout Flow

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  NAVBAR (solid dark background)                              │
│                                                              │
│  ────────────────────────────────────────────────            │
│  PAGE HERO                                                    │
│                                                              │
│  Warranty Policy                                             │
│  "Coverage that protects your investment."                   │
│                                                              │
│  ──── WARRANTY TIERS ────                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  15 YEARS    │  │   5 YEARS    │  │   3 YEARS    │       │
│  │  Aluminium   │  │  Enclosure   │  │  Motor/      │       │
│  │  Frame       │  │  Panels      │  │  Mechanical  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│  ──── WHAT'S COVERED ────                                    │
│  • Structural frame defects                                  │
│  • PVDF coating peeling/chalking                             │
│  • Polycarbonate panel cracking (non-impact)                 │
│  • Motor unit failures                                       │
│  • LED component failure                                     │
│  • Corrosion of metal components                             │
│                                                              │
│  ──── EXCLUSIONS TABLE ────                                  │
│  [8 rows: Improper Install, Weather, Abuse, Normal Wear, etc]│
│                                                              │
│  ──── CLAIM PROCESS ────                                     │
│  1. Contact Wasleen Support (WhatsApp/Email)                 │
│  2. Provide order number + photo/video evidence              │
│  3. Wasleen assesses (5 business days)                       │
│  4. Repair or replacement authorized                         │
│  5. Work carried out within 15 business days                 │
│                                                              │
│  ──── TRANSFERABILITY ────                                   │
│  Warranty transfers to new property owner within term.       │
│                                                              │
│  FOOTER (same as homepage)                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 📄 PAGE 9: RETURNS & EXCHANGE POLICY (/returns)

### Layout Flow

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  NAVBAR (solid dark background)                              │
│                                                              │
│  ────────────────────────────────────────────────            │
│  PAGE HERO                                                    │
│                                                              │
│  Returns & Exchange Policy                                   │
│  "Built to last. Backed by integrity."                       │
│                                                              │
│  ──── 30-DAY STRUCTURAL RESOLUTION ────                      │
│  If structural issue found within 30 days of install:        │
│  • Wasleen assesses at no cost                               │
│  • Repair or full replacement                                │
│  • Catastrophic failure → full refund                        │
│                                                              │
│  ──── COMPONENT EXCHANGE TABLE ────                          │
│  [6 items: Polycarbonate/Glass panel, Frame section,         │
│   Motor unit, Roller shutter, LED strip, Dimension mismatch] │
│                                                              │
│  ──── DEPOSIT & CANCELLATION POLICY ────                     │
│  Stage 1 (Order Confirmation): 20% due → non-refundable      │
│  Stage 2 (Material Procurement): 60% due → partial refund    │
│  Stage 3 (Pre-Installation): 20% due → non-refundable        │
│                                                              │
│  Full payment collected via Paddle at checkout.              │
│  Cancellation refunds processed per stage schedule above.    │
│                                                              │
│  FOOTER (same as homepage)                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 📄 PAGE 10: TERMS & CONDITIONS (/terms)

### Layout Flow

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  NAVBAR (solid dark background)                              │
│                                                              │
│  ────────────────────────────────────────────────            │
│  PAGE HERO                                                    │
│                                                              │
│  Terms & Conditions                                          │
│  "Clear terms. Fair dealings."                               │
│                                                              │
│  ──── 1. THE PARTIES ────                                    │
│  Wasleen General Trading LLC (Seller)                        │
│  Client named in Order Confirmation (Buyer)                  │
│                                                              │
│  ──── 2. QUOTATIONS & ORDERS ────                            │
│  • Quotations valid 14 days                                  │
│  • Order confirmed upon full payment receipt                 │
│  • Config changes subject to 10% admin fee                   │
│                                                              │
│  ──── 3. SITE & INSTALLATION ────                            │
│  • Client responsible for site access, power, parking        │
│  • Structural soundness of mounting surface assumed          │
│  • Installation within 30 days post-payment                  │
│                                                              │
│  ──── 4. LIMITATION OF LIABILITY ────                        │
│  • Total liability capped at order value                     │
│  • Not liable for indirect/consequential damages             │
│  • Force majeure clause included                             │
│                                                              │
│  ──── 5. DISPUTE RESOLUTION ────                             │
│  • Dubai Courts have exclusive jurisdiction                  │
│  • 30-day negotiation period before legal action             │
│                                                              │
│  ──── 6. GENERAL PROVISIONS ────                             │
│  • Entire agreement clause                                   │
│  • Waiver, severability, governing law (UAE)                 │
│  • Updates with 14-day notice                                │
│                                                              │
│  FOOTER (same as homepage)                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## 📄 PAGE 11: PRIVACY POLICY (/privacy)

### Layout Flow

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│  NAVBAR (solid dark background)                              │
│                                                              │
│  ────────────────────────────────────────────────            │
│  PAGE HERO                                                    │
│                                                              │
│  Privacy Policy                                              │
│  "Your data. Your trust. Our responsibility."                │
│                                                              │
│  ──── DATA WE COLLECT ────                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Category         │ Examples                      │   │
│  │ Personal Info    │ Name, phone, email, address    │   │
│  │ Order Data       │ Configuration, amount, date    │   │
│  │ Technical Data   │ IP, browser, device info      │   │
│  │ Communication    │ Emails, WhatsApp messages      │   │
│  │ Payment Data     │ Handled by Paddle (not us)    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ──── YOUR RIGHTS ────                                       │
│  1. Access your data                                         │
│  2. Rectify inaccurate data                                  │
│  3. Erase your data (right to be forgotten)                  │
│  4. Restrict processing                                      │
│  5. Data portability                                         │
│                                                              │
│  ──── THIRD-PARTY DISCLOSURE ────                            │
│  • Paddle (payment processing)                               │
│  • Google (analytics via GTM)                                │
│  • Vercel (hosting)                                          │
│  • WhatsApp (business communications)                        │
│                                                              │
│  Contact: wasleenshop@gmail.com for privacy inquiries.       │
│                                                              │
│  FOOTER (same as homepage)                                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## This document serves as the complete UI specification for all pages.

The Code mode will implement these designs section by section, starting with Phase 1 (Homepage, Quote page, Contact page, Thank-you page).
