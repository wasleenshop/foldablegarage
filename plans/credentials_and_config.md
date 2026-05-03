# Wasleen Foldable Garage — Credentials & Configuration

> ⚠️ **SECURITY WARNING:** This file contains sensitive credentials. Do not commit to GitHub. Keep local only.

---

## GitHub

| Field | Value |
|-------|-------|
| **Email** | wasleenshop@gmail.com |
| **Repo URL** | https://github.com/wasleenshop/foldablegarage |
| **Repo name** | `foldablegarage` |

## Vercel

| Field | Value |
|-------|-------|
| **Email** | Wasleenshop@gmail.com |
| **Domain** | foldablegarage.wasleen.com |

## Supabase

| Field | Value |
|-------|-------|
| **Email** | Kavyfinapp@gmail.com  |
| **Project URL** | https://fqgobatptemhejusgsfd.supabase.co |
| **Anon Key** | `your-supabase-anon-key` |
| **DB Password** | `your-supabase-db-password` |
| **Region** | Singapore (ap-southeast-1) |

## Paddle

| Field | Value |
|-------|-------|
| **Dashboard** | https://sandbox-vendors.paddle.com (Sandbox) |
| **Product ID** | `pri_01kqkgq674ywevhy0gp136jfpk` |
| **API Key** | `your-paddle-api-key` |
| **Webhook events** | transaction.billed, .canceled, .completed, .created, .paid, .past_due, .payment_failed, .ready, .updated, .revised |
| **Environment** | Sandbox (test mode) |
| **Type** | Paddle Billing (`pri_` format) |

## Google Analytics & Tag Manager

| Field | Value |
|-------|-------|
| **GA4 Measurement ID** | G-6RDTW68FJC |
| **GTM Container ID** | GTM-59Z5PLJS |

## WhatsApp Business

| Field | Value |
|-------|-------|
| **Number** | +971542330837 |
| **Format for code** | `971542330837` (without + for wa.me links) |

---

## Environment Variables (for .env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://fqgobatptemhejusgsfd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Paddle
NEXT_PUBLIC_PADDLE_TOKEN=your-paddle-api-key
NEXT_PUBLIC_PADDLE_PRICE_ID=pri_01kqkgq674ywevhy0gp136jfpk
PADDLE_WEBHOOK_SECRET=your-webhook-secret-here

# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-59Z5PLJS

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-6RDTW68FJC

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=971542330837

# Site URL (change in production)
NEXT_PUBLIC_SITE_URL=https://foldablegarage.wasleen.com
SUPPORT_EMAIL=support@wasleen.com
```

---

## Product Configuration (Final)

### Pricing

| Item | Price | Unit |
|------|-------|------|
| Polycarbonate roof | AED 1,050 | per sqm |
| Glass roof | AED 1,530 | per sqm |
| Electric Roller Shutter | AED 6,620 | per unit |
| Automatic System | AED 10,283 | per unit |
| Glass Tint (Black) | AED 552 | per sqm |
| Shipping | FREE | — |
| Installation | Quote on contact | Extra |

### Colours

| Colour | Description |
|--------|-------------|
| Bronze/Tea | Warm amber, blends with sandstone villas |
| Sapphire Blue | Cool clarity, modern contrast |
| Light Smoke | Neutral, timeless soft grey |
| Medium Smoke | Classic anthracite, most popular |
| Dark Charcoal | Bold premium, maximum UV block |

### Dimensions

| Rule | Value |
|------|-------|
| Minimum | 6m × 2m |
| Maximum | No limit |
| Payment | Full amount at checkout |
| Formula | `(width × length × roof_rate) + options` |
