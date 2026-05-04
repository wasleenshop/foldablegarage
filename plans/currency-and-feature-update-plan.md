# Wasleen — Currency Conversion & Feature Update Plan

> **Goal:** Fix Paddle 403 error by converting AED → USD, plus 8 homepage/site updates requested by the client.
> **Risk Level:** Low to Medium — all changes are isolated to specific components, no structural refactoring.

---

## Overview

| # | Task | Files Affected | Risk | Dependency |
|---|------|---------------|------|------------|
| P0 | Currency Conversion AED → USD | 4 files | Low | None — unblocks Paddle payments |
| 1 | Hero Banner: remove UAE, add Buy button | 1 file | Low | None |
| 2 | MechanismReveal: remove 3-grid + scroll effects | 1 file | Low | None |
| 3 | Logo golden + "wasleen pergolas" in header | 2 files | Low | None |
| 4 | Check "Engineered for the UAE" duplication | 1 file (inspect) | Very Low | None |
| 5 | "See It in Motion": full-view video, remove caption | 1 file | Low | None |
| 6 | Reviews: remove royal names, add English countries | 2 files | Low | None |
| 7 | WhatsApp: page-specific predefined messages | 1 file | Low | None |
| 8 | Footer: add "Other Services" section | 1 file | Low | None |

---

## Phase P0 — Currency Conversion (AED → USD)

**Why:** Paddle does not support AED currency. All prices must be in USD.
**Conversion rate:** 1 USD ≈ 3.67 AED (fixed rate, used throughout the project).

### P0.1 — [`src/lib/constants.ts`](../src/lib/constants.ts) — Update PRICING constants

Current (AED):
```
polycarbonateRate: 1050      →  286 USD  (1050 / 3.67)
glassRate: 1530              →  417 USD  (1530 / 3.67)
automaticSystemPrice: 10283  →  2802 USD (10283 / 3.67)
rollerShutterPrice: 6620     →  1804 USD (6620 / 3.67)
glassTintRate: 552           →  150 USD  (552 / 3.67)
```

Converted to USD (rounded to nearest whole number):
```typescript
export const PRICING: PricingConfig = {
  polycarbonateRate: 286,
  glassRate: 417,
  automaticSystemPrice: 2802,
  rollerShutterPrice: 1804,
  glassTintRate: 150,
};
```

Also update `PRICING_TIERS` priceFrom strings:
- Manual: `'12,000'` → `'3,270'`
- Smart: `'25,000'` → `'6,812'`

### P0.2 — [`src/lib/utils.ts`](../src/lib/utils.ts) — Update formatPrice()

Change line 41-46:
```typescript
// BEFORE:
return new Intl.NumberFormat('en-AE', {
  style: 'currency',
  currency: 'AED',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(amount);

// AFTER:
return new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(amount);
```

### P0.3 — [`src/lib/types.ts`](../src/lib/types.ts) — Update PricingConfig comments

Update the inline comments from AED to USD:
```
// Pricing configuration — all values in USD
// Rounding: nearest whole dollar
```

### P0.4 — [`src/app/api/create-transaction/route.ts`](../src/app/api/create-transaction/route.ts) — Update currency_code

Line 65: `currency_code: 'AED'` → `currency_code: 'USD'`

Also update line 64 comment: `// Paddle expects cents` — this stays valid (USD has cents too).

---

## Phase 1 — Hero Banner Updates

### [`src/components/homepage/HeroSection.tsx`](../src/components/homepage/HeroSection.tsx)

**1a — Remove "UAE" from subtitle** (line 165):
```
BEFORE: Architectural-grade retractable carports for the UAE — engineered from 6063-T5 aluminium...
AFTER:  Architectural-grade retractable carports — engineered from 6063-T5 aluminium with precision automation.
```

**1b — Add "Buy Now" button** (after line 184, in the CTA buttons section):
Add a new `<Button variant="primary" size="lg" href="/checkout">Buy Now</Button>` as the first button.
Keep "Request a Consultation" button as second option.
Keep "▶ Watch it Open" as third option (or remove depending on design preference — clarify with user).

---

## Phase 2 — MechanismReveal Simplification

### [`src/components/homepage/MechanismReveal.tsx`](../src/components/homepage/MechanismReveal.tsx)

**Changes:**
1. Remove GSAP ScrollTrigger pin effect (lines 50-90 — the entire `useEffect` with ScrollTrigger)
2. Remove all 3-panel grid elements (left panel div lines 163-172, center panel div lines 175-182, right panel div lines 185-194)
3. Remove all derived scroll state calculations (lines 92-118: `leftPanelProgress`, `rightPanelT`, `centerT`, `carT`, `railWidth`, `textOpacity`, `bgOpacity`)
4. Remove rail track div (lines 152-158)
5. Remove luxury car reveal div (lines 197-219)
6. Remove text overlay div (lines 222-229)
7. Keep the `<section>` wrapper with `id="mechanism"` but remove `h-screen`, replace with appropriate height
8. Keep the `<video>` background (lines 127-139) at 100% opacity
9. Remove dark overlay div (line 142) — or keep minimal for text readability
10. Simplify to just: full-bleed video background with subtle gradient overlay

**Result:** A clean, full-width video section showing the mechanism with no scroll-triggered animations.

---

## Phase 3 — Logo & Header Updates

### 3a — [`src/components/layout/Logo.tsx`](../src/components/layout/Logo.tsx)

**Change logo to always render in gold gradient** (remove inverted/white mode):
- Modify the component to ignore the `inverted` prop — always render the gold gradient version (the `else` branch at line 101)
- This ensures the logo icon is always golden regardless of background

### 3b — [`src/components/layout/Navbar.tsx`](../src/components/layout/Navbar.tsx)

**Change "Wasleen" to "Wasleen Pergolas" in gold gradient** (lines 54-56):
```tsx
// BEFORE:
<span className="hidden text-sm font-semibold text-white sm:inline">
  Wasleen
</span>

// AFTER:
<span className="hidden bg-gradient-to-r from-[#F9D976] via-[#E8B84B] to-[#A67C00] bg-clip-text text-sm font-semibold text-transparent sm:inline">
  Wasleen Pergolas
</span>
```

---

## Phase 4 — "Engineered for the UAE" Duplication Check

### [`src/components/homepage/FeaturesSection.tsx`](../src/components/homepage/FeaturesSection.tsx)

**Check:** Line 136 uses `title="Engineered for the UAE"` as the section heading.

**Search the codebase** for any other occurrence of "Engineered for the UAE" — check:
- HeroSection subtitle (line 165) — already being changed in Phase 1 to remove "UAE"
- Product/About pages
- Any other component

**Action:** If found duplicated, remove the duplicate. If only in FeaturesSection, it's unique and can stay (or rename if user prefers).

---

## Phase 5 — "See It in Motion" Full Video

### [`src/components/homepage/VideoSection.tsx`](../src/components/homepage/VideoSection.tsx)

**5a — Make video full view:**
- Change section from `py-20 md:py-24` to `min-h-screen` or full-bleed height
- Remove the `max-w-[900px]` constraint from the video container, make it `max-w-full`
- Remove the rounded corners (`rounded-2xl`) for edge-to-edge look
- Remove the border (`border border-border-subtle`)

**5b — Remove caption text** (lines 209-219):
Delete the entire `<motion.p>` block containing "The foldable mechanism operates on precision-engineered rails..."

**5c — Mobile view:**
- Ensure the video fills the viewport height on mobile
- Adjust the play button size for mobile touch targets
- Remove or simplify the bottom controls bar for mobile

---

## Phase 6 — Reviews Section Update

### [`src/components/homepage/ReviewsSection.tsx`](../src/components/homepage/ReviewsSection.tsx)

**Replace names and locations:**

| Current | Replace With |
|---------|-------------|
| Ahmed Al Maktoum, Dubai, United Arab Emirates | Ahmed Hassan, Dubai, UAE |
| Khalid Al Saud, Riyadh, Saudi Arabia | Khalid Al-Rashid, Riyadh, Saudi Arabia |
| Fatima Al Hashimi, Doha, Qatar | Fatima Al-Mansouri, Doha, Qatar |

**Also update** location format to shorter English names:
- "United Arab Emirates" → "UAE"
- "United Kingdom" → "UK"

**Review content** stays the same (the review text itself doesn't reference the name).

---

## Phase 7 — WhatsApp Page-Specific Messages

### [`src/components/layout/WhatsAppButton.tsx`](../src/components/layout/WhatsAppButton.tsx)

The file already has page-specific messages (lines 11-25). **No changes needed** — this was already implemented correctly.

However, let's add messages for pages currently missing:
- `/checkout` — missing, add a checkout-specific message
- `/privacy` — missing, add a privacy-specific message

---

## Phase 8 — Footer: Other Services Section

### [`src/components/layout/Footer.tsx`](../src/components/layout/Footer.tsx)

**Add a 5th column** (or replace Column 1's description space) with links to other Wasleen services:

```tsx
{/* Column 5 — Other Services */}
<div>
  <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
    Our Services
  </h4>
  <ul className="space-y-3">
    <li>
      <a href="https://www.wasleen.com" target="_blank" rel="noopener noreferrer"
         className="text-sm text-text-secondary transition-colors hover:text-accent-gold">
        Interior & Fitout
      </a>
    </li>
    <li>
      <a href="https://www.pergolas.wasleen.com" target="_blank" rel="noopener noreferrer"
         className="text-sm text-text-secondary transition-colors hover:text-accent-gold">
        Premium Pergolas
      </a>
    </li>
    <li>
      <a href="https://www.shop.wasleen.com" target="_blank" rel="noopener noreferrer"
         className="text-sm text-text-secondary transition-colors hover:text-accent-gold">
        Pergola Shop
      </a>
    </li>
    <li>
      <a href="https://www.wasafseo.wasleen.com" target="_blank" rel="noopener noreferrer"
         className="text-sm text-text-secondary transition-colors hover:text-accent-gold">
        WasafSEO App
      </a>
    </li>
    <li>
      <a href="https://www.kavyfin.com" target="_blank" rel="noopener noreferrer"
         className="text-sm text-text-secondary transition-colors hover:text-accent-gold">
        KavyFin AI
      </a>
    </li>
  </ul>
</div>
```

The grid needs updating from `sm:grid-cols-2 lg:grid-cols-4` to `sm:grid-cols-2 lg:grid-cols-5` to accommodate the new column.

---

## Execution Order

1. **Phase P0** (Currency) — must be done first as it unblocks Paddle payments
2. **Phase 1-8** — can be done in any order after P0, no interdependencies
3. **Phase 4** (duplication check) — informational only, may not need code changes

## Verification Checklist

After all phases complete:
- [ ] `formatPrice()` returns USD strings (e.g., "$286" instead of "AED 1,050")
- [ ] Paddle transaction API call uses `currency_code: 'USD'`
- [ ] All displayed prices across site show USD
- [ ] Hero banner has Buy button, no "UAE" reference
- [ ] Mechanism section shows clean video only (no 3-panel scroll effect)
- [ ] Logo icon is golden, header shows "Wasleen Pergolas" in gold gradient
- [ ] "Engineered for the UAE" heading is not duplicated (or resolved)
- [ ] Video section is full-view with no caption text
- [ ] Review cards show non-royal names, English country names
- [ ] WhatsApp buttons send page-specific messages
- [ ] Footer shows "Our Services" column with all 5 links
