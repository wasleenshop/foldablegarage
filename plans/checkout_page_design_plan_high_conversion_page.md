# Wasleen Foldable Garage — Checkout Page Design Plan

> **Objective:** A single-page, Amazon-style product detail + checkout page with live automatic pricing that sends the exact calculated amount to Paddle for payment.

---

## 1. Architecture Overview

### Route

```
/checkout          → page.tsx
```

### Component Tree

```
src/app/checkout/
├── page.tsx                          ← Server component (layout + metadata)
├── CheckoutContent.tsx               ← 'use client' — main orchestrator
│
├── components/checkout/
│   ├── CheckoutMediaGallery.tsx       ← Amazon-style images + video tabs
│   ├── CheckoutConfigurator.tsx       ← Single-page live calculator
│   ├── CheckoutSpecTable.tsx          ← Beautiful specification table
│   ├── CheckoutFeatureShowcase.tsx    ← Features with engineering images
│   ├── CheckoutReviews.tsx            ← review browser
│   └── CheckoutBuyButton.tsx          ← "Buy Now — AED X" with Paddle integration
│
└── api/
    └── create-transaction/
        └── route.ts                  ← POST — creates Paddle transaction with exact amount
```

### Section Flow (Top to Bottom)

```
┌─────────────────────────────────────┐
│  CHECKOUT MEDIA GALLERY             │
│  [Image tab] [Video tab]            │
│  Thumbnail strip underneath         │
├─────────────────────────────────────┤
│  PRODUCT TITLE + PRICE              │
│  "Foldable Premium Garage"          │
│               │
├─────────────────────────────────────┤
│  LIVE CONFIGURATOR                  │
│  ┌──────────────────┬──────────────┐│
│  │ Width: 2-12m     │ Roof: PC/Glass││
│  │ Length: 6-30m    │ Colour picker ││
│  │ Options checkboxes │             ││
│  └──────────────────┴──────────────┘│
│  ┌──────────────────────────────────┐│
│  │ PRICE BREAKDOWN + BUY NOW       ││
│  │ Base:          AED 33,600       ││
│  │ Auto System:   +AED 10,283      ││
│  │ ────────────────────────────    ││
│  │ TOTAL:         AED 43,883       ││
│  │                                  ││
│  │ [ 💳 Buy Now — AED 43,883 ]     ││
│  └──────────────────────────────────┘│
├─────────────────────────────────────┤
│  TECHNICAL SPECIFICATIONS TABLE     │
│  ┌──────────────┬──────────────────┐│
│  │ Frame Material│ 6063-T5 Aluminium││
│  │ Coating       │ PVDF Kynar 500® ││
│  │ ...           │ ...             ││
│  └──────────────┴──────────────────┘│
├─────────────────────────────────────┤
│  FEATURES WITH IMAGES               │
│  [img] Precision Rail System  [text]│
│  [text] Heavy-Duty Roller    [img]  │
│  [img] PVDF Coating          [text] │
│  ... alternating layout             │
├─────────────────────────────────────┤
│  CUSTOMER REVIEWS                   │
│  ⭐⭐⭐⭐⭐ 4.8 (24 reviews)           │
│  ┌──────────────────────────────────┐│
│  │ "Excellent quality..." - Ahmed   ││
│  │ Sort: Recent | Rating filter     ││
│  │ Pagination                       ││
│  └──────────────────────────────────┘│
├─────────────────────────────────────┤
│  BOTTOM CTA  [Buy Now — AED X]     │
└─────────────────────────────────────┘
```

---

## 2. Dynamic Pricing + Paddle Integration

### 2.1 Live Frontend Calculation

The exact same `[calculatePrice(config)](../../src/lib/utils.ts:20)` function used in the quote configurator runs on the checkout page client-side. Every time the user changes any control, the price updates instantly.

```typescript
// CheckoutConfigurator.tsx conceptual
const [config, setConfig] = useState<ProductConfig>(INITIAL_CONFIG);
const totalPrice = calculatePrice(config); // ← live, reactive
```

### 2.2 "Buy Now" Button with Dynamic Amount

```typescript
// CheckoutBuyButton.tsx
<Button variant="primary" size="xl" onClick={handleBuyNow}>
  <span>Buy Now — {formatPrice(totalPrice)}</span>
</Button>
```

### 2.3 Paddle Custom Transaction Flow

The current `[openPaddleCheckout](../../src/lib/paddle.ts:38)` uses a **fixed** `priceId`. For variable pricing, we create a **custom Paddle transaction server-side**:

**New API Route:** `[POST /api/create-transaction](../../src/app/api/)`

```typescript
// /api/create-transaction/route.ts (conceptual)
export async function POST(req: Request) {
  const { config } = await req.json();
  const amount = calculatePrice(config); // server-side verification
  
  // Call Paddle API to create a transaction
  const response = await fetch('https://api.paddle.com/transactions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      items: [{
        price: {
          description: `Wasleen Foldable Garage (${config.width}×${config.length}m)`,
          unit_price: {
            amount: String(amount * 100), // in cents
            currency_code: 'AED',
          },
          quantity: {
            maximum: 1,
            minimum: 1,
          },
        },
        quantity: 1,
      }],
      custom_data: { config: JSON.stringify(config) },
    }),
  });
  
  const transaction = await response.json();
  return Response.json({ checkoutUrl: transaction.data.checkout_url });
}
```

**Frontend call:**

```typescript
const handleBuyNow = async () => {
  pushGTMEvent('checkout_started', { amount: totalPrice, config });
  const res = await fetch('/api/create-transaction', {
    method: 'POST',
    body: JSON.stringify({ config }),
  });
  const { checkoutUrl } = await res.json();
  window.location.href = checkoutUrl; // redirect to Paddle checkout
};
```

> **Note:** Paddle's Checkout overlay (`paddle.Checkout.open`) works with price IDs. For fully custom amounts, use Paddle's Transaction API to get a hosted checkout URL, then redirect.

---

## 3. Reusable Existing Components


| Component                                                                     | Source                                          | How to Reuse                                                |
| ----------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------- |
| `[calculatePrice(config)](../../src/lib/utils.ts:20)`                         | `src/lib/utils.ts`                              | Import directly — same logic                                |
| `[formatPrice(amount)](../../src/lib/utils.ts:40)`                            | `src/lib/utils.ts`                              | Import directly                                             |
| `[COLOURS, PRICING, DIMENSIONS](../../src/lib/constants.ts)`                  | `src/lib/constants.ts`                          | Import directly                                             |
| `[ProductConfig](../../src/lib/types.ts:18)`                                  | `src/lib/types.ts`                              | Import directly                                             |
| `[Button](../../src/components/ui/Button.tsx)`                                | `src/components/ui/Button.tsx`                  | Import directly                                             |
| `[SectionHeading](../../src/components/ui/SectionHeading.tsx)`                | `src/components/ui/SectionHeading.tsx`          | Import directly                                             |
| `[SwatchCircle](../../src/components/ui/SwatchCircle.tsx)`                    | `src/components/ui/SwatchCircle.tsx`            | Colour swatches                                             |
| `[StarRating](../../src/components/ui/StarRating.tsx)`                        | `src/components/ui/StarRating.tsx`              | Review stars                                                |
| `[ReviewCard](../../src/components/ui/ReviewCard.tsx)`                        | `src/components/ui/ReviewCard.tsx`              | Review cards                                                |
| `[ProductReviews](../../src/components/product/ProductReviews.tsx)`           | `src/components/product/ProductReviews.tsx`     | Full review section — import as-is                          |
| `[QuoteFeaturesSection](../../src/components/quote/QuoteFeaturesSection.tsx)` | `src/components/quote/QuoteFeaturesSection.tsx` | Features with images — adapt to remove cyan accent taglines |
| `[QuoteSpecifications](../../src/components/quote/QuoteSpecifications.tsx)`   | `src/components/quote/QuoteSpecifications.tsx`  | Spec table (lines 400-445) — extract just the table section |
| GTM helpers                                                                   | `src/lib/gtm.ts`                                | Push `checkout_started`, `purchase_completed` events        |
| `[pushGTMEvent](../../src/lib/gtm.ts)`                                        | `src/lib/gtm.ts`                                | Import directly                                             |


---

## 4. New Components — Detailed Spec

### 4.1 CheckoutMediaGallery

**Purpose:** Amazon-style media gallery with image thumbnails and video tab.

**Layout:**

```
┌────────────────────────────────┐
│                                │
│        MAIN DISPLAY            │
│   (Image or Video player)      │
│                                │
├────────────────────────────────┤
│ 📷  📷  📷  ▶️  📷  📷        │
│   Thumbnail strip (horizontal) │
└────────────────────────────────┘
```

**States:**

- **Image mode:** Same as existing `[ProductHero](../../src/components/product/ProductHero.tsx)` gallery but with arrow navigation removed — use thumbnail clicks only (Amazon-style)
- **Video mode:** When video thumbnail is clicked, swap main display to autoplay video player
- **Transitions:** Framer Motion crossfade between images, smooth swap to video

**Images used:**


| Thumbnail           | Source                                                                                                    |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| Hero product        | `/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp`                                          |
| Engineering drawing | `/images/foldable-and-retractable-carport-engineering-specification-drawing-by-wasleen-pergolas.webp`     |
| Aluminium detail    | `/images/retractable-carport-aluminium-alloy-by-wasleen-pergolas.webp`                                    |
| Specification       | `/images/specification-foldable-and-retractable-garage.webp`                                              |
| Cross-section 1     | `/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas.webp`   |
| Cross-section 2     | `/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-2.webp` |
| Cross-section 3     | `/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-3.webp` |
| **Video thumbnail** | `/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp`                                          |


**Videos:**


| Asset              | Source                                           |
| ------------------ | ------------------------------------------------ |
| Hero product video | `/videos/foldable-garage-hero-product-video.mp4` |
| Mechanism video    | `/videos/foldable-garage-mechanism-video.mp4`    |


### 4.2 CheckoutConfigurator

**Purpose:** All configuration controls on a single page (no steps, no wizard). Price recalculates live.

**Layout:**

```
┌─────────────────────┬─────────────────────┐
│  Dimensions          │  Roof & Colour      │
│  ┌── WIDTH ────────┐│  ┌── ROOF TYPE ────┐│
│  │ 2m ──●────── 12m││  │ [PC] [Glass]    ││
│  │ 6.0m             ││  └────────────────┘│
│  └────────────────┘│  ┌── COLOUR ───────┐│
│  ┌── LENGTH ──────┐│  │ 🟤 🔵 ⚪ ⚫ ⬛  ││
│  │ 6m ──●────── 30m││  │ Medium Smoke    ││
│  │ 10.0m            ││  └────────────────┘│
│  └────────────────┘│  │                    │
│                      │  ┌── OPTIONS ─────┐│
│                      │  │ ☑ Auto System  ││
│                      │  │ ☑ Roller Shutter││
│                      │  │ ☑ Glass Tint   ││
│                      │  └────────────────┘│
├─────────────────────┴─────────────────────┤
│  REAL-TIME PRICE BREAKDOWN                │
│  ┌─────────────────────────────────────┐  │
│  │ Base (10×6m = 60 sqm): AED 63,000  │  │
│  │ Auto System:              +AED 10,283│  │
│  │ ──────────────────────────────────  │  │
│  │ **TOTAL:**          **AED 73,283**  │  │
│  │                                      │  │
│  │  [ 💳 Buy Now — AED 73,283 ]        │  │
│  └─────────────────────────────────────┘  │
└───────────────────────────────────────────┘
```

**Controls reused from existing:**

- Width slider → from `[StepSizeAndRoof](../../src/components/quote/StepSizeAndRoof.tsx)` (extract slider logic)
- Length slider → from `StepSizeAndRoof`
- Roof type toggle → from `StepSizeAndRoof`
- Colour swatches → from `[ColourSelector](../../src/components/product/ColourSelector.tsx)`
- Auto system checkbox → from `[StepColourAndOptions](../../src/components/quote/StepColourAndOptions.tsx)`
- Roller shutter checkbox → from `StepColourAndOptions`
- Glass tint checkbox → from `StepColourAndOptions`

**Price breakdown:** Extract the breakdown section from `[PriceSummary](../../src/components/quote/PriceSummary.tsx)` (lines 74-133) and embed it directly below the controls with the Buy Now button.

### 4.3 CheckoutSpecTable

**Purpose:** Clean, beautifully designed specification table.

**Implementation:** Extract the table section from `[QuoteSpecifications](../../src/components/quote/QuoteSpecifications.tsx)` (lines 400-445) into its own component. Add subtle row animations on scroll.

**Specs displayed:**


| Specification     | Detail                                              |
| ----------------- | --------------------------------------------------- |
| Frame Material    | Aviation-grade 6063-T5 aluminium alloy              |
| Surface Treatment | PVDF fluorocarbon coating (AAMA 2605)               |
| Corrosion Rating  | No rust, no fade — 15+ year guarantee               |
| Roof Panel        | Deep smoke PC board or double-layer laminated glass |
| UV Protection     | Blocks 99.9% of ultraviolet radiation               |
| Shutter Door      | High-strength aluminium electric rolling shutter    |
| Shutter Control   | Remote one-touch wireless operation                 |
| Wind Resistance   | High-efficiency sealing — blocks sand and dust      |
| Dimensions Range  | 2-12m width × 6-30m length (0.5m increments)        |
| Colours           | 5 premium PVDF finishes                             |
| Warranty          | 5-year structural, 15-year coating                  |


### 4.4 CheckoutFeatureShowcase

**Purpose:** Features arranged with engineering images in alternating left-right layout.

**Implementation:** Reuse the layout from `[QuoteFeaturesSection](../../src/components/quote/QuoteFeaturesSection.tsx)` but swap the cyan accent taglines for a simpler gold-accented design that matches the checkout page theme.

**5 features displayed:**

1. Precision Rail System
2. Heavy-Duty Roller Assembly
3. PVDF Fluorocarbon Coating
4. Aviation-Grade 6063-T5 Frame
5. Polycarbonate Insulation Panels

### 4.5 CheckoutReviews

**Purpose:** Dynamic review browser like Amazon product page.

**Implementation:** Import `[ProductReviews](../../src/components/product/ProductReviews.tsx)` directly — it already has:

- Aggregate rating with star display
- Rating distribution bars (5★ down to 1★)
- Sort by (Most Recent, Highest/Lowest Rated, Most Helpful)
- Filter by star rating
- Pagination (5 per page)
- Write a Review modal

---

## 5. Route and Navigation Changes

### 5.1 New Route

```
src/app/checkout/
├── page.tsx          ← Server component with metadata + structured data
├── CheckoutContent.tsx  ← Client component orchestrating all sections
```

### 5.2 Add "Buy Now" Button to Existing Pages

**Product page** `[/product](../../src/app/(marketing)`/product/page.tsx):

- Replace "Get Exact Quote" → add `Buy Now — from AED X` button that links to `/checkout`
- Keep WhatsApp button as secondary CTA

**Quote page** `[/quote](../../src/app/quote/page.tsx)`:

- Add "Buy Now" CTA in the price summary sidebar

**Navbar** `[Navbar.tsx](../../src/components/layout/Navbar.tsx)`:

- Add `/checkout` link or make it prominent

### 5.3 Navbar Updates

Add a "Buy Now" or "Shop" link to the main navigation. Consider making it a gold-accented CTA button in the navbar for prominence.

---

## 6. GTM / Analytics Events


| Event                | Trigger                 | Data                             |
| -------------------- | ----------------------- | -------------------------------- |
| `checkout_viewed`    | Page load               | config, referrer                 |
| `config_updated`     | Any config change       | width, length, roofType, options |
| `checkout_started`   | Click Buy Now           | totalAmount, config              |
| `purchase_completed` | Paddle success redirect | transactionId, amount            |


---

## 7. Files to Create


| #   | File                                                  | Type | Purpose                                       |
| --- | ----------------------------------------------------- | ---- | --------------------------------------------- |
| 1   | `src/app/checkout/page.tsx`                           | New  | Server component, metadata, SEO               |
| 2   | `src/components/checkout/CheckoutContent.tsx`         | New  | Main client orchestrator                      |
| 3   | `src/components/checkout/CheckoutMediaGallery.tsx`    | New  | Amazon-style image+video gallery              |
| 4   | `src/components/checkout/CheckoutConfigurator.tsx`    | New  | Single-page live configurator                 |
| 5   | `src/components/checkout/CheckoutSpecTable.tsx`       | New  | Spec table extracted from QuoteSpecifications |
| 6   | `src/components/checkout/CheckoutFeatureShowcase.tsx` | New  | Features with alternating image layout        |
| 7   | `src/components/checkout/CheckoutBuyButton.tsx`       | New  | "Buy Now — AED X" with Paddle integration     |
| 8   | `src/app/api/create-transaction/route.ts`             | New  | Paddle transaction API for custom pricing     |


## 8. Files to Modify


| #   | File                                               | Change                                      |
| --- | -------------------------------------------------- | ------------------------------------------- |
| 1   | `src/app/(marketing)/product/page.tsx`             | Add "Buy Now" button linking to `/checkout` |
| 2   | `src/components/layout/Navbar.tsx`                 | Add `/checkout` nav link                    |
| 3   | `src/components/quote/PriceSummary.tsx` (optional) | Add "Buy Now" CTA alongside the quote flow  |


---

## 9. Implementation Order

```
Phase 1 — Core Structure
├── Create /api/create-transaction route (Paddle custom pricing)
├── Create /checkout/page.tsx (server layout + metadata)
├── Create CheckoutContent.tsx (orchestrator)
└── Create CheckoutMediaGallery.tsx

Phase 2 — Configurator + Buy Now
├── Create CheckoutConfigurator.tsx (single-page live calculator)
├── Create CheckoutBuyButton.tsx (dynamic amount + Paddle call)
└── Integrate Price Summary + Buy Now

Phase 3 — Content Sections
├── Create CheckoutSpecTable.tsx
├── Create CheckoutFeatureShowcase.tsx
└── Import CheckoutReviews.tsx

Phase 4 — Navigation + Polish
├── Add Buy Now link to Navbar
├── Add Buy Now button to Product page
├── GTM event instrumentation
└── Responsive testing
```

---

## 10. Design Tokens Used

All tokens per `[design-system.md](../../.roo/rules/01-design-system.md)`:


| Token         | Value                                                     |
| ------------- | --------------------------------------------------------- |
| Background    | `#0A0A0A` / `#111111`                                     |
| Card BG       | `#1A1A1A`                                                 |
| Gold Accent   | `#C9A84C`                                                 |
| Gold Hover    | `#D4B85A`                                                 |
| Cyan Accent   | `#00D4FF` (media gallery borders)                         |
| Violet Accent | `#7C3AED` (media gallery borders)                         |
| Font          | Plus Jakarta Sans                                         |
| Max width     | 1200px                                                    |
| Card radius   | 16px (rounded-2xl)                                        |
| Glassmorphism | `bg-white/[0.03] backdrop-blur-xl border border-white/10` |


---

## Summary

**Yes — full auto-calculation with dynamic Paddle pricing is achievable.** The checkout page will:

1. ✅ Use the **same `calculatePrice`** function as the quote configurator — live recalculation on every change
2. ✅ Show the **exact amount in the Buy Now button** — `"Buy Now — AED 43,883"`
3. ✅ Send the **precise calculated amount** to Paddle via the Transaction API — no fixed price IDs
4. ✅ Display **all customization options** (width, length, roof, colour, auto, roller shutter, tint) beautifully on one page
5. ✅ Present an **Amazon-style layout** — media gallery → configurator → specs → features → reviews

