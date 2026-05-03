# Google Analytics 4 + Google Tag Manager — Complete Setup Guide for Wasleen Foldable Garage

## 📋 Overview

We will use **Google Tag Manager (GTM)** as the central hub for all tracking. GTM injects Google Analytics 4 and all custom event tracking into the website. The website code will only need **one GTM container snippet** — everything else is configured inside GTM's web interface by you (no developer needed for tracking changes later).

---

## SECTION 1: Account Creation — Your Manual Actions

### Step 1: Create Google Analytics 4 Property


| Action                                                      | Instructions                         | Screenshot Reference                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Go to [analytics.google.com](https://analytics.google.com)  | Sign in with your Google account     | —                                                                                                                                                                                                                                                                                                                                                                          |
| Click **Admin** (gear icon, bottom left)                    | →                                    |                                                                                                                                                                                                                                                                                                                                                                            |
| In **Account** column, click **Create Account**             | Account name: `Wasleen Group`        |                                                                                                                                                                                                                                                                                                                                                                            |
| Click **Property** column → **Create Property**             |                                      |                                                                                                                                                                                                                                                                                                                                                                            |
| **Property name:**                                          | `Wasleen Foldable Garage`            |                                                                                                                                                                                                                                                                                                                                                                            |
| **Reporting time zone:**                                    | `United Arab Emirates (GMT+04:00)`   | ⚠️ Critical for correct daily reporting                                                                                                                                                                                                                                                                                                                                    |
| **Currency:**                                               | `AED - United Arab Emirates Dirham`  | ⚠️ Critical for e-commerce revenue tracking                                                                                                                                                                                                                                                                                                                                |
| Click **Next**                                              |                                      |                                                                                                                                                                                                                                                                                                                                                                            |
| **Industry:**                                               | `Shopping / Automotive`              |                                                                                                                                                                                                                                                                                                                                                                            |
| **Business size:**                                          | `Small`                              |                                                                                                                                                                                                                                                                                                                                                                            |
| Click **Create**                                            |                                      |                                                                                                                                                                                                                                                                                                                                                                            |
| After creation, you'll see **Data Streams** → Click **Web** |                                      |                                                                                                                                                                                                                                                                                                                                                                            |
| **Website URL:**                                            | `https://foldablegarage.wasleen.com` |                                                                                                                                                                                                                                                                                                                                                                            |
| **Stream name:**                                            | `Wasleen Foldable Garage Web`        |                                                                                                                                                                                                                                                                                                                                                                            |
| Click **Create Stream**                                     |                                      |                                                                                                                                                                                                                                                                                                                                                                            |
| **Copy your Measurement ID**                                | Looks like `G-XXXXXXXXXX`            | G-6RDTW68FJC<!-- Google tag (gtag.js) --> <script async src="[https://www.googletagmanager.com/gtag/js?id=G-6RDTW68FJC"></script>](https://www.googletagmanager.com/gtag/js?id=G-6RDTW68FJC"></script>) <script> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-6RDTW68FJC'); </script> |


### Step 2: Create Google Tag Manager Container


| Action                                                       | Instructions                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Go to [tagmanager.google.com](https://tagmanager.google.com) | Sign in with same Google account                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Click **Create Account**                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Account Name:**                                            | `Wasleen Group`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Country:**                                                 | `United Arab Emirates`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Click **Continue**                                           |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Container name:**                                          | `Wasleen Foldable Garage`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| **Target platform:**                                         | `Web`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Click **Create**                                             |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| Accept Terms of Service                                      |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| **Copy your GTM Container ID**                               | Looks like GTM-59Z5PLJS1. Paste this code as high in the **<head>** of the page as possible:<!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='[https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f)](https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f));})(window,document,'script','dataLayer','GTM-59Z5PLJS');</script><!-- End Google Tag Manager -->2. Paste this code immediately after the opening **<body>** tag:<!-- Google Tag Manager (noscript) --><noscript><iframe src="[https://www.googletagmanager.com/ns.html?id=GTM-59Z5PLJS](https://www.googletagmanager.com/ns.html?id=GTM-59Z5PLJS)"height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><!-- End Google Tag Manager (noscript) --> |


### Step 3: Link GTM to GA4


| Action                                                                       | Instructions                           |
| ---------------------------------------------------------------------------- | -------------------------------------- |
| In GTM, click **Add a New Tag**                                              |                                        |
| Click **Tag Configuration** → Choose **Google Analytics: GA4 Configuration** |                                        |
| **Measurement ID:**                                                          | Paste your `G-XXXXXXXXXX` from Step 1  |
| Click **Triggering** → Choose **All Pages**                                  | This makes GA4 fire on every page load |
| **Tag name:**                                                                | `GA4 - Page View`                      |
| Click **Save**                                                               |                                        |
| Click **Submit** (top right)                                                 |                                        |
| Add version name: `v1 - GA4 base setup`                                      |                                        |
| Click **Publish**                                                            |                                        |


You now have basic page view tracking live (once the GTM snippet is on the site).

---

## SECTION 2: Data That GA4 Tracks Automatically (Zero Extra Code)

Once GA4 is linked to the website via GTM, these are **automatically collected** with no additional configuration:


| Data Category      | What's Tracked                                                                        | Where to See It in GA4                      |
| ------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------- |
| **Page views**     | Every URL visited, time on page, scroll depth                                         | Reports → Engagement → Pages and screens    |
| **Users**          | New vs returning, total users, active users                                           | Reports → User → Users overview             |
| **Geo data**       | Country, city, language                                                               | Reports → User → Tech details → Location    |
| **Device data**    | Desktop/mobile/tablet, browser, OS, screen resolution                                 | Reports → User → Tech details               |
| **Traffic source** | Google organic, direct, social, referral, paid                                        | Reports → Acquisition → Traffic acquisition |
| **Session data**   | Session duration, sessions per user, engaged sessions                                 | Reports → Engagement → Overview             |
| **Events**         | First visit, page view, session start, scroll, click, file download, video engagement | Configure → Events (these are auto-tracked) |


**All of this works from Day 1 with just the GTM container snippet on the site.**

---

## SECTION 3: Custom Events You Must Configure (Via GTM Interface)

These events **track the money flow** — visitor → quote → deposit. You configure them inside GTM (no code changes needed after initial setup).

### 3.1 — Event Definitions

Here are all the custom events we need. Each one tells you exactly where the user is in your sales funnel.


| #   | Event Name                | When It Fires                                       | Data Collected                                      | Funnel Stage             |
| --- | ------------------------- | --------------------------------------------------- | --------------------------------------------------- | ------------------------ |
| 1   | `quote_started`           | User clicks "Get a Quote" or "Request Consultation" | —                                                   | Awareness → Interest     |
| 2   | `size_selected`           | User picks a size in Step 1 of quote                | `size: "6x3.5m"`, `price: 28000`                    | Interest → Consideration |
| 3   | `type_selected`           | User picks Manual or Automatic                      | `type: "automatic"`, `price_addon: 10000`           | Consideration            |
| 4   | `colour_selected`         | User picks a colour finish                          | `colour: "Glacier White"`                           | Consideration            |
| 5   | `quote_details_submitted` | User fills Step 2 (name, phone, emirate)            | `emirate: "Dubai"`, `quote_value: 38000`            | Consideration → Intent   |
| 6   | `deposit_started`         | User clicks "Pay Deposit" — Paddle overlay opens    | `deposit_amount: 7600`                              | Intent → Purchase        |
| 7   | `deposit_completed`       | Paddle payment succeeds                             | `transaction_id`, `amount: 7600`, `currency: "AED"` | ✅ **Conversion**         |
| 8   | `deposit_failed`          | Paddle payment fails or user closes overlay         | `error_reason: "card_declined"`                     | ❌ Drop-off               |
| 9   | `whatsapp_clicked`        | User clicks any WhatsApp button on the site         | `source: "hero_cta"` (or "footer", "contact_page")  | Lead capture             |
| 10  | `abandoned_quote`         | User leaves the /quote page without paying          | `quote_value: 38000`, `step_reached: 2`             | ❌ Drop-off               |
| 11  | `spec_downloaded`         | User downloads the spec PDF (Phase 3)               | `email: "user@example.com"`                         | Lead capture             |


### 3.2 — How Events Reach GTM

The website's code will use `dataLayer.push()` — this is a standard JavaScript array that GTM automatically reads. For example, when a user selects a carport size, the code will execute:

```javascript
window.dataLayer.push({
  event: 'size_selected',
  size: '6x3.5m',
  price: 28000
});
```

GTM picks this up and forwards it to GA4 as a tracked event.
**You don't write this code — the development phase handles it.**

### 3.3 — Your Manual GTM Configuration

After the website is deployed, you need to create **triggers and tags in GTM** for each event. Here's how:

#### Step-by-step: Create a GA4 Event Tag in GTM

**Example: Track `quote_started` event**

1. Go to [tagmanager.google.com](https://tagmanager.google.com) → Your container
2. Click **Tags** → **New**
3. **Tag name:** `GA4 Event - Quote Started`
4. Click **Tag Configuration** → Choose **Google Analytics: GA4 Event**
5. **Configuration Tag:** Select your existing `GA4 - Page View` tag (the one you created in Step 1)
6. **Event Name:** `quote_started`
7. Click **Triggering** → Click **+** in top right
8. **Trigger name:** `Custom Event - quote_started`
9. Click **Trigger Configuration** → Choose **Custom Event**
10. **Event name:** `quote_started`
11. Click **Save**
12. Click **Save** on the tag
13. **Repeat for ALL 11 events above** — create one tag per event

**To save time, batch them:**


| Tag Name                      | Event Name                | Trigger (Custom Event)    |
| ----------------------------- | ------------------------- | ------------------------- |
| GA4 Event - Quote Started     | `quote_started`           | `quote_started`           |
| GA4 Event - Size Selected     | `size_selected`           | `size_selected`           |
| GA4 Event - Type Selected     | `type_selected`           | `type_selected`           |
| GA4 Event - Colour Selected   | `colour_selected`         | `colour_selected`         |
| GA4 Event - Details Submitted | `quote_details_submitted` | `quote_details_submitted` |
| GA4 Event - Deposit Started   | `deposit_started`         | `deposit_started`         |
| GA4 Event - Deposit Completed | `deposit_completed`       | `deposit_completed`       |
| GA4 Event - Deposit Failed    | `deposit_failed`          | `deposit_failed`          |
| GA4 Event - WhatsApp Clicked  | `whatsapp_clicked`        | `whatsapp_clicked`        |
| GA4 Event - Abandoned Quote   | `abandoned_quote`         | `abandoned_quote`         |
| GA4 Event - Spec Downloaded   | `spec_downloaded`         | `spec_downloaded`         |


1. After creating all tags, click **Submit** → Name: `v2 - All custom events` → **Publish**

---

## SECTION 4: Enhanced Measurement (Auto-Configure in GA4)

Google Analytics 4 has **Enhanced Measurement** that auto-tracks common interactions without GTM tags. Enable these:


| Feature              | What It Tracks                                                | Enable In GA4   |
| -------------------- | ------------------------------------------------------------- | --------------- |
| **Page views**       | Every page load                                               | ✅ On by default |
| **Scrolls**          | User scrolls 90% of page                                      | ✅ On by default |
| **Outbound clicks**  | User clicks a link to another website (e.g., Paddle checkout) | ✅ On by default |
| **Site search**      | If you add a search bar                                       | Turn ON         |
| **Video engagement** | If you embed YouTube or embedded videos                       | Turn ON         |
| **File downloads**   | PDF spec sheet downloads                                      | Turn ON         |


**How to configure:**

1. GA4 → Admin → Data Streams → Click your web stream
2. Toggle **Enhanced Measurement** ON
3. Click the gear icon → Enable all options
4. Click **Save**

---

## SECTION 5: Key Reports You'll Use in GA4

After launch, here are the reports you should check weekly:

### Report 1: Traffic Acquisition (Where visitors come from)

GA4 → Reports → Acquisition → Traffic acquisition

Shows you: Google organic vs direct vs social vs WhatsApp clicks vs referral.
If you invest in Google Ads later, paid traffic appears here too.

### Report 2: User Engagement (What they do)

GA4 → Reports → Engagement → Pages and screens

Shows you: Most popular pages. If `/quote` is not in top 3, your CTAs are not working.

### Report 3: Conversion Funnel (The money flow)

GA4 → Explore → Funnel Exploration

**Create this funnel:**

```
Step 1: quote_started      → How many people click "Get Quote"
Step 2: size_selected      → How many pick a size
Step 3: quote_details_submitted → How many fill their info
Step 4: deposit_completed  → How many actually pay
```

This single report tells you **exactly where people drop off**. If 100 people start but only 10 pay, you see which step loses them.

### Report 4: Events Overview

GA4 → Reports → Engagement → Events

Shows you: Count of every event. You'll see `whatsapp_clicked` count vs `deposit_completed` count — this tells you if WhatsApp is converting better than the form.

### Report 5: User Explorer (Individual user behavior)

GA4 → Explore → User Explorer

Shows you: Every action a specific user took. You can see: User clicked Google ad → viewed homepage → read product page → started quote → abandoned at Step 2. This helps you understand real behavior patterns.

---

## SECTION 6: Google Tag Manager — Additional Tracking (Phase 2+)

### 6.1 — Scroll Depth Tracking (Phase 2)

After animations are built, track if users scroll through the full homepage:

**In GTM:**

1. Tags → New → **GA4 Event**
2. Event name: `scroll_depth`
3. Trigger → New → **Scroll Depth**
4. Set: Vertical, 25%, 50%, 75%, 90%
5. Save

This tells you: Do users reach the pricing section at the bottom? If 90% scroll drops at 50%, your mid-page content isn't engaging.

### 6.2 — Video Engagement Tracking (Phase 2)

Track if users watch the mechanism video:

**In GTM:**

1. Tags → New → **GA4 Event**
2. Event name: `video_progress`
3. Trigger → New → **YouTube Video** (if YouTube embedded) or **Custom Event** for HTML5 video
4. Track: Start, 25%, 50%, 75%, Complete

### 6.3 — Form Interaction Tracking

Track which form fields users interact with:

**In GTM:**

1. Tags → New → **GA4 Event**
2. Event name: `form_field_focus`
3. Trigger → New → **Form Focus**
4. Target: `/quote` page fields

### 6.4 — Error Tracking

Track JavaScript errors that might break the quote flow:

**In GTM:**

1. Tags → New → **GA4 Event**
2. Event name: `js_error`
3. Trigger → New → **JavaScript Error**
4. Save

---

## SECTION 7: What You Need to Give Me (For the Website Code)

To build tracking into the website, I need from you:


| Item                                                    | Example        | Where to Find It                                   |
| ------------------------------------------------------- | -------------- | -------------------------------------------------- |
| **GTM Container ID**                                    | `GTM-XXXXXXX`  | GTM → Admin → Container Settings                   |
| **GA4 Measurement ID**                                  | `G-XXXXXXXXXX` | GA4 → Admin → Data Streams → Your Stream           |
| **WhatsApp number**                                     | `971501234567` | Your business WhatsApp (full international format) |
| **Google Ads Conversion ID** (optional, for future ads) | `AW-123456789` | Google Ads → Tools → Conversions                   |


---

## SECTION 8: Implementation Checklist — Your Manual Actions Summary

### Phase 0 (Before Development Starts)

- Create GA4 property → Copy **Measurement ID** (`G-XXXXXXXXXX`)
- Create GTM container → Copy **Container ID** (`GTM-XXXXXXX`)
- In GTM: Create "GA4 - Page View" tag (fires on All Pages)
- In GTM: Publish version `v1 - GA4 base setup`
- Send me the **GTM Container ID** and **GA4 Measurement ID**

After I give you these, I'll integrate them into the website code.

### Phase 1 (After Website is Deployed)

- Enable **Enhanced Measurement** in GA4 (scrolls, outbound clicks, file downloads)
- In GTM: Create all 11 custom event tags + triggers (Section 3.3)
- In GTM: Publish version `v2 - All custom events`
- In GA4: Mark `deposit_completed` as a **Conversion** event
  - GA4 → Admin → Events → Toggle `deposit_completed` = Mark as conversion
  - This makes it show up as a primary metric

### Phase 2 (After Animations)

- In GTM: Add Scroll Depth tracking (Section 6.1)
- In GTM: Add Video Engagement tracking (Section 6.2)
- Publish GTM version `v3 - Scroll + video`

### Phase 3 (After SEO Content)

- In GTM: Add Form Interaction tracking (Section 6.3)
- In GTM: Add Error tracking (Section 6.4)
- Publish GTM version `v4 - Form + errors`

---

## 📊 Summary: The Tracking Architecture

```
Visitor opens website
        │
        ▼
┌─────────────────────┐
│  GTM Container      │  ← A single snippet in <head>
│  (GTM-XXXXXXX)      │
└─────────┬───────────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
┌────────┐ ┌────────┐
│ GA4    │ │ Custom │
│ Page   │ │ Events │
│ View   │ │ (x11)  │
│ (auto) │ │        │
└────────┘ └────────┘
    │           │
    └─────┬─────┘
          ▼
┌─────────────────────┐
│  GA4 Property       │
│  Wasleen Garage     │
│  (G-XXXXXXXXXX)     │
└─────────┬───────────┘
          │
    ┌─────┴─────┐
    │           │
    ▼           ▼
┌────────┐ ┌──────────────┐
│Standard│ │Custom        │
│Reports │ │Funnel        │
│        │ │Exploration   │
└────────┘ └──────────────┘
```

The website developer (me) only needs to:

1. Add the GTM snippet to the site layout
2. Add `dataLayer.push()` calls at each conversion step

You (the business owner) configure all the GA4 events and reports inside GTM's interface — no code changes needed.

---

## ❓ Ready to Proceed?

Once you've completed the account setup steps above and have your **GTM Container ID** and **GA4 Measurement ID**, I'll build Phase 1. 

Please also confirm: **GA4 + GTM + Vercel Analytics** is your final analytics decision? (I'll remove Posthog from the plan entirely.)