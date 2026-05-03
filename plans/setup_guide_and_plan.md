# Wasleen Foldable Garage — Complete Setup Guide & Build Plan

## 📋 Overview

**Product:** Foldable Premium Garage (Retractable Carport)
**Domain:** foldablegarage.wasleen.com
**Stack:** Next.js 15 · Supabase · Paddle · Vercel · GSAP · Framer Motion · GA4 + GTM · Vercel Analytics
**Target:** UAE market (Arabic + English)

---

## ✅ Confirmed Product Configuration

### Pricing Table


| Item                        | Price                | Unit         |
| --------------------------- | -------------------- | ------------ |
| **Polycarbonate roof**      | AED 1,050            | per sqm      |
| **Glass roof**              | AED 1,530            | per sqm      |
| **Electric Roller Shutter** | AED 6,620            | per unit     |
| **Automatic System**        | AED 10,283           | per unit     |
| **Glass Tint (Black)**      | AED 552              | per sqm      |
| **Shipping**                | FREE                 | —            |
| **Installation**            | Contact us for quote | Extra charge |


### Colour Options


| Colour            | Style Description                         |
| ----------------- | ----------------------------------------- |
| **Bronze/Tea**    | Warm amber, blends with sandstone villas  |
| **Sapphire Blue** | Cool clarity, modern contrast for facades |
| **Light Smoke**   | Neutral, timeless soft grey               |
| **Medium Smoke**  | Classic anthracite, most popular choice   |
| **Dark Charcoal** | Bold, premium, maximum UV block           |


### Dimensional Rules


| Rule             | Value                                   |
| ---------------- | --------------------------------------- |
| **Minimum size** | 4m × 2m                                 |
| **Maximum size** | No limit (custom)                       |
| **Formula**      | `width × length × rate_per_sqm`         |
| **Payment**      | Full amount at checkout (no deposit)    |
| **Installation** | Separate — client contacts us for quote |


### Quote Calculator Logic

```
Total = (width × length × roof_rate) + options

Roof rate:      1,050 AED/sqm (Polycarbonate)
                1,530 AED/sqm (Glass)

Options:
  Electric Roller Shutter:  +6,620 AED
  Automatic System:        +10,283 AED
  Glass Tint (Black):       +552 AED/sqm × (width × length)

Example: 6m × 3.5m Polycarbonate + Automatic
= (6 × 3.5 × 1,050) + 10,283
= 22,050 + 10,283
= AED 32,333 ← Full payment via Paddle
```

---

## SECTION A: MANUAL SETUP ACTIONS (Do These First)

### Step 1: GitHub Repository


| Action                                                               | Details                                                                   |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| Go to [github.com](https://github.com) and create a **private** repo | Name: **[foldablegarage](https://github.com/wasleenshop/foldablegarage)** |
| Initialize with `.gitignore` (Node template)                         | GitHub provides this option during creation                               |
| Clone to your local machine                                          | `git clone https://github.com/wasleenshop/foldablegarage`                 |
| Do NOT add any files yet                                             | The code phase will scaffold the project                                  |


### Step 2: Vercel Project


| Action                                           | Details                                                                    |
| ------------------------------------------------ | -------------------------------------------------------------------------- |
| Go to [vercel.com](https://vercel.com)           | Sign in with GitHub                                                        |
| Click **Add New → Project**                      | Import **[foldablegarage](https://github.com/wasleenshop/foldablegarage)** |
| Framework preset: **Next.js**                    | Auto-detected                                                              |
| Do NOT deploy yet                                | We deploy after Phase 1 code is complete                                   |
| Environment variables (set later during deploy): | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `NEXT_PUBLIC_GTM_ID`                  |


### Step 3: Domain DNS — GreenGeeks → Vercel


| Action                                                | Details                              |
| ----------------------------------------------------- | ------------------------------------ |
| Log into **GreenGeeks** cPanel                        | Your existing hosting                |
| Go to **DNS Zone Editor**                             | For `wasleen.com` domain             |
| Add **CNAME record**:                                 |                                      |
| - Name: `foldablegarage`                              | Result: `foldablegarage.wasleen.com` |
| - Target: `cname.vercel-dns.com`                      | Vercel's standard CNAME target       |
| - TTL: 3600                                           |                                      |
| Remove any existing A/AAAA records for this subdomain | Prevents DNS conflicts               |
| In Vercel → Project → Settings → Domains              | Add `foldablegarage.wasleen.com`     |


**⚠️ Do this BEFORE first deployment** so Vercel can provision SSL certificates automatically.

### Step 4: Supabase Project


| Action                                      | Details                                                                              |
| ------------------------------------------- | ------------------------------------------------------------------------------------ |
| Go to [supabase.com](https://supabase.com)  | Create account or sign in                                                            |
| Create **New Project**                      | Name: **[foldablegarage](https://github.com/wasleenshop/foldablegarage)**            |
| **Region:** India Mumbai                    | Lowest latency to UAE (50ms)                                                         |
| Set a strong **database password**          | XZsPScZAqWzTM5ue                                                                     |
| Wait ~2 min for provisioning                |                                                                                      |
| Go to **Project Settings → API**            | Copy these two values:                                                               |
| - **Project URL** → `SUPABASE_URL`          | [https://fqgobatptemhejusgsfd.supabase.co](https://fqgobatptemhejusgsfd.supabase.co) |
| - **anon public key** → `SUPABASE_ANON_KEY` | sb_publishable_52Yzme27r9G0P4p9xIzzqg_PpWCSG_s                                       |
| Enable **Row Level Security (RLS)**         | Will be configured by code                                                           |
| **Billing:** Free tier is sufficient        | 500 MB database, 2 GB bandwidth                                                      |


### Step 5: Paddle (Payments)


| Action                                 | Details                                                 |
| -------------------------------------- | ------------------------------------------------------- |
| Go to [paddle.com](https://paddle.com) | Sign up as a **Seller/Merchant**                        |
| Complete **merchant onboarding**       | Takes 1–2 days for approval                             |
| Upload business documents + ID         | Required for UAE VAT handling                           |
| Go to **Developer Tools → Public Key** | Copy for environment variable                           |
| Go to **Developer Tools → Webhooks**   |                                                         |
| Set webhook URL:                       | `https://foldablegarage.wasleen.com/api/paddle-webhook` |
| Enable events:                         | `transaction.completed`, `transaction.paid`             |
| Configure currencies:                  | AED, USD, EUR                                           |
| Default country:                       | AE (United Arab Emirates)                               |


**⚠️ Without Paddle, the /quote page cannot collect money. This is your revenue page.**

### Step 6: Google Analytics 4 + Google Tag Manager

This is covered in detail in `[google_analytics_tag_manager_setup.md](./google_analytics_tag_manager_setup.md)`. Quick checklist:

- Create GA4 property → Copy **Measurement ID** (`G-XXXXXXXXXX`)
- Create GTM container → Copy **Container ID** (`GTM-XXXXXXX`)
- In GTM: Create "GA4 - Page View" tag (All Pages trigger)
- Publish GTM version `v1 - GA4 base setup`
- Send me the **GTM Container ID** and **GA4 Measurement ID**

**Vercel Analytics** is toggled ON in Vercel dashboard (no code needed).

### Step 7: Content You Must Prepare


| Item                                                             | Details                                          | Needed By |
| ---------------------------------------------------------------- | ------------------------------------------------ | --------- |
| **Product specs** (all dimensions, materials, colours, warranty) | Word/Excel doc                                   | Phase 1   |
| **Confirmed AED pricing**                                        | All config options with final prices             | Phase 1   |
| **Hero headline** (English)                                      | e.g., "Intelligent Motion. Absolute Protection." | Phase 1   |
| **Product photos** (4–5 high-res)                                | Place in `public/images/` folder                 | Phase 1   |
| **Feature descriptions**                                         | 5 features: Rail, Roller, Coating, Panels, Smart | Phase 2   |
| **Testimonials** (3–5 quotes)                                    | Client first name + villa location               | Phase 2   |
| **Mechanism video** (30–60 sec MP4)                              | Carport opening/closing                          | Phase 2   |
| **Colour swatch images**                                         | 5 finish options                                 | Phase 2   |
| **Brand story**                                                  | Company history, team, certs                     | Phase 3   |
| **SEO articles** (English)                                       | 800–1500 words each                              | Phase 3   |
| **Installation photos** (10–15)                                  | Completed projects                               | Phase 3   |
| **Spec PDF**                                                     | Technical spec sheet                             | Phase 3   |
| **WhatsApp business number**                                     | Full international format: `971542330837`        | Phase 1   |


---

## SECTION B: BUILD PLAN — 4 PHASES

### Phase 1 — Foundation & Money Pages

**Goal: Site is live and taking deposits.**


| Day   | What Gets Built                                                          |
| ----- | ------------------------------------------------------------------------ |
| 1     | Next.js 15 scaffold + Tailwind v4 + TypeScript + font setup              |
| 1     | Global layout, navigation skeleton, mobile menu                          |
| 2     | Supabase schema (leads, products, orders, blog_posts) + RLS policies     |
| 2     | Supabase client library + server-side helpers                            |
| 3–4   | **Homepage Hero** — SVG kinetic background + headline + CTA buttons      |
| 5     | **Homepage Pricing** — 3 tiers: Manual / Automatic / Commercial          |
| 5     | **Homepage Stats + Testimonials**                                        |
| 6     | **Homepage Footer CTA** — "Get a Quote" + "WhatsApp Us"                  |
| 7–9   | **/quote page** — 3-step configurator (size/options → details → payment) |
| 9–10  | **/quote page** — Live price calculator + Paddle checkout integration    |
| 10    | **/contact page** — Form → Supabase + WhatsApp click-to-chat             |
| 10    | **/thank-you page** — Post-payment confirmation                          |
| 11    | **/api/quote** — Save to Supabase, trigger confirmation                  |
| 11    | **/api/paddle-webhook** — Validate payment, update order                 |
| 12    | GA4 + GTM snippet installation + dataLayer events                        |
| 12    | Basic SEO: `generateMetadata()` for all pages                            |
| 13    | **Deploy to Vercel** + domain + SSL + test                               |
| 14–15 | Testing: full flow visit → configure → pay deposit → confirm             |


---

### Phase 2 — Animations & 3D Effects

**Goal: Apple product ad-level visual experience.**


| Week | What Gets Built                                            |
| ---- | ---------------------------------------------------------- |
| 4    | Lenis smooth scroll + GSAP ScrollTrigger integration       |
| 4    | Hero: pin + scroll-scrub fade of kinetic lasers            |
| 4    | Mechanism reveal: pinned retraction animation (3 panels)   |
| 5    | Horizontal feature track: 5 cards scroll horizontally      |
| 5    | Parallax gallery: 3 depth layers (bg/mid/foreground)       |
| 5    | Scroll-scrubbed video: playback linked to scroll position  |
| 6    | Stats counter: count-up animation with progress rings      |
| 6    | Custom magnetic cursor (desktop) + page transitions        |
| 6    | Mobile: reduced effects + `prefers-reduced-motion` support |


---

### Phase 3 — SEO Content Engine & Arabic

**Goal: Ranking for UAE carport keywords.**


| Week | What Gets Built                                                     |
| ---- | ------------------------------------------------------------------- |
| 7    |                                                                     |
| 7    | hreflang tags + canonical URLs for all language variants            |
| 8    | Blog: Contentlayer MDX + `/blog` index + `/blog/[slug]`             |
| 8    | JSON-LD schema (Product, LocalBusiness, FAQ) on all pages           |
| 8    | Dynamic OG images via `@vercel/og`                                  |
| 9    | Gallery: masonry grid with size/colour filter                       |
| 9    | About page: brand story + team + certifications                     |
| 9    | Product page: deep specs, materials, tech diagram, video            |
| 9    | Spec-sheet: lead-gated PDF download + auto-sitemap + Search Console |


---

### Phase 4 — PWA & Advanced Features

**Goal: Fully automated lead-to-sale pipeline.**


| Week | What Gets Built                                                         |
| ---- | ----------------------------------------------------------------------- |
| 10   | PWA: service worker, app manifest, offline page, A2HS install prompt    |
| 11   | React Three Fiber 3D product viewer (360° rotation)                     |
| 11   | Post-launch analytics review + funnel optimization                      |
| 12   | Performance audit: Lighthouse 95+ on mobile + desktop                   |
| 12   | Final end-to-end testing: SEO → quote → deposit → WhatsApp confirmation |


---

## SECTION C: FINAL TECH STACK


| Service                     | Purpose                               | Cost                |
| --------------------------- | ------------------------------------- | ------------------- |
| **Next.js 15** (App Router) | Website framework                     | Free                |
| **Vercel**                  | Hosting + CDN + Analytics             | Free tier           |
| **Supabase**                | Database (Postgres) + Auth            | Free tier           |
| **Paddle**                  | Payment processing (deposits)         | Pay-per-transaction |
| **GSAP**                    | Scroll animations (Phase 2)           | Free                |
| **Framer Motion**           | UI animations                         | Free                |
| **Google Analytics 4**      | Behavior tracking + conversion funnel | Free                |
| **Google Tag Manager**      | Event management hub                  | Free                |
| **Vercel Analytics**        | High-level traffic metrics            | Free                |


**Removed:** Cloudinary · Resend · Posthog · React Three Fiber (deferred to Phase 4)

---

## Workflow

1. **You** complete Section A manual setup
2. **You** send me: `GTM Container ID`, `GA4 Measurement ID`, `WhatsApp number`, `Supabase URL + key`
3. **I switch to Code mode** → Build Phase 1 step by step
4. **You review** live on `foldablegarage.wasleen.com`
5. **Feedback** → fixes → approval → next phase

