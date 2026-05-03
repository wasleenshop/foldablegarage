# PageSpeed Insights Report — wasleen.com (foldablegarage.wasleen.com)

---

## 📋 Report Metadata

| Field | Value |
|-------|-------|
| **URL** | https://foldablegarage.wasleen.com |
| **Mobile Report Date** | May 3, 2026, 6:33:18 PM GMT+4 |
| **Desktop Report Date** | May 3, 2026, 6:23:37 PM GMT+4 |

---

## 📊 Overview Scores

| Category | Mobile | Desktop |
|----------|--------|---------|
| **Performance** | 79 | 87 |
| **Accessibility** | 73 | 86 |
| **Best Practices** | 96 | 100 |
| **SEO** | 92 | 100 |

---

## 🚀 Performance

### Core Metrics Comparison

| Metric | Mobile | Desktop |
|--------|--------|---------|
| **First Contentful Paint (FCP)** | 1.1 s | 0.4 s |
| **Largest Contentful Paint (LCP)** | 4.5 s | 1.3 s |
| **Total Blocking Time (TBT)** | 230 ms | 200 ms |
| **Cumulative Layout Shift (CLS)** | 0 | 0 |
| **Speed Index (SI)** | 3.5 s | 1.9 s |

### Capture Environment

#### Mobile
| Field | Value |
|-------|-------|
| Device | Emulated Moto G Power |
| Lighthouse Version | 13.0.1 |
| Session | Single page session, Initial page load |
| Network | Slow 4G throttling |
| Browser | HeadlessChromium 146.0.7680.177 with lrInsights |

#### Desktop
| Field | Value |
|-------|-------|
| Device | Emulated Desktop |
| Lighthouse Version | 13.0.1 |
| Session | Single page session, Initial page load |
| Network | Custom throttling |
| Browser | HeadlessChromium 146.0.7680.177 with lrInsights |

---

## ⚠️ Performance Issues & Diagnostics

### 1. Render Blocking Requests

> **Estimated Savings:** 450 ms (Mobile) | 160 ms (Desktop)
> Requests are blocking the page's initial render, which may delay LCP. Deferring or inlining can move these network requests out of the critical path.

#### Mobile
| URL | Transfer Size | Duration |
|-----|--------------|----------|
| wasleen.com 1st party | 15.9 KiB | 750 ms |
| …css/3faefceeb3031b8b.css | 14.7 KiB | 600 ms |
| …css/8a7a9c5f458446c1.css | 1.2 KiB | 150 ms |

#### Desktop
| URL | Transfer Size | Duration |
|-----|--------------|----------|
| wasleen.com 1st party | 15.9 KiB | 160 ms |
| …css/1be335ba1bf8c511.css | 14.7 KiB | 160 ms |
| …css/8a7a9c5f458446c1.css | 1.2 KiB | — |

---

### 2. Forced Reflow

> A forced reflow occurs when JavaScript queries geometric properties (such as `offsetWidth`) after styles have been invalidated by a change to the DOM state. This can result in poor performance.

#### Mobile — Top Function Calls / Sources

| Source | Total Reflow Time |
|--------|-------------------|
| …chunks/255-4f212…fcab9.js:2:113598 | 147 ms |
| …chunks/535-8d9c26bb1127577d.js:1:5586 | 281 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3673 | 88 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3568 | 80 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3296 | 919 ms |
| …chunks/386-352908c660fb25bc.js:1:2267 | 1 ms |
| …chunks/535-8d9c26bb1127577d.js:1:6768 | 38 ms |
| …chunks/535-8d9c26bb1127577d.js:1:4598 | 84 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3898 | 34 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3912 | 68 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3928 | 125 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3930 | 524 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3931 | 714 ms |
| …chunks/535-8d9c26bb1127577d.js:1:2308 | 232 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3186 | 655 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3282 | 462 ms |
| …chunks/535-8d9c26bb1127577d.js:1:2289 | 918 ms |
| …chunks/535-8d9c26bb1127577d.js:1:1960 | 44 ms |
| [unattributed] | 5 ms |

#### Desktop — Top Function Calls / Sources

| Source | Total Reflow Time |
|--------|-------------------|
| …chunks/255-4f212…fcab9.js:2:113598 | 183 ms |
| [unattributed] | 52 ms |
| …chunks/386-352908c660fb25bc.js:1:2267 | 1 ms |
| …chunks/535-8d9c26bb1127577d.js:1:6768 | 38 ms |
| …chunks/535-8d9c26bb1127577d.js:1:4598 | 85 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3898 | 34 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3912 | 69 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3928 | 128 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3930 | 526 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3931 | 713 ms |
| …chunks/535-8d9c26bb1127577d.js:1:2308 | 238 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3186 | 696 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3282 | 489 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3296 | 920 ms |
| …chunks/535-8d9c26bb1127577d.js:1:2289 | 921 ms |
| …chunks/535-8d9c26bb1127577d.js:1:1960 | 47 ms |
| …chunks/535-8d9c26bb1127577d.js:1:3673 | 86 ms |

---

### 3. Network Dependency Tree

> Avoid chaining critical requests by reducing the length of chains, reducing the download size of resources, or deferring the download of unnecessary resources to improve page load.

#### Mobile
- **Maximum Critical Path Latency:** 90 ms
- **Preconnected Origins:** No origins were preconnected
- **Preconnect Candidates:** No additional origins are good candidates for preconnecting

```
Initial Navigation: https://foldablegarage.wasleen.com — 67 ms, 20.13 KiB
  └── …css/8a7a9c5f458446c1.css — 83 ms, 1.17 KiB
       └── …css/3faefceeb3031b8b.css — 90 ms, 14.73 KiB
```

#### Desktop
- **Maximum Critical Path Latency:** 85 ms
- **Preconnected Origins:** No origins were preconnected
- **Preconnect Candidates:** No additional origins are good candidates for preconnecting

```
Initial Navigation: https://foldablegarage.wasleen.com — 74 ms, 20.13 KiB
  └── …css/8a7a9c5f458446c1.css — 72 ms, 1.17 KiB
       └── …css/1be335ba1bf8c511.css — 85 ms, 14.70 KiB
```

---

### 4. Improve Image Delivery

> **Mobile Est. Savings:** 891 KiB | **Desktop Est. Savings:** 975 KiB
> Reducing the download time of images can improve the perceived load time of the page and LCP.

#### Mobile
| URL / Element | Resource Size | Est. Savings |
|---------------|--------------|-------------|
| wasleen.com 1st party (total) | 1,163.0 KiB | 890.6 KiB |
| …foldable-and-retractable-carport-engineering-speci….webp | 241.6 KiB | 198.2 KiB |
| …foldable-garage-alluminium-alloy-cross-section-ima….webp | 210.9 KiB | 173.0 KiB |
| …retractable-carport-aluminium-alloy-by-wasleen-per….webp | 203.6 KiB | 167.1 KiB |
| …foldable-carport-material-choice-by-wasleen-pergol….webp | 164.1 KiB | 134.6 KiB |
| …foldable-carport-color-selection-guide-by-wasleen-….webp | 145.1 KiB | 119.1 KiB |
| …foldable-garage-wasleen-pergolas-dubai-hero-image.webp | 197.8 KiB | 98.6 KiB |

#### Desktop
| URL / Element | Resource Size | Est. Savings |
|---------------|--------------|-------------|
| wasleen.com 1st party (total) | 1,041.2 KiB | 974.8 KiB |
| …foldable-and-retractable-carport-engineering-speci….webp | 241.6 KiB | 228.3 KiB |
| …retractable-carport-aluminium-alloy-by-wasleen-per….webp | 203.6 KiB | 192.4 KiB |
| …foldable-garage-alluminium-alloy-cross-section-ima….webp | 210.9 KiB | 190.2 KiB |
| …foldable-carport-material-choice-by-wasleen-pergol….webp | 164.1 KiB | 155.1 KiB |
| …foldable-carport-color-selection-guide-by-wasleen-….webp | 145.1 KiB | 137.2 KiB |
| …specification-foldable-and-retractable-garage.webp | 75.9 KiB | 71.8 KiB |

---

### 5. Legacy JavaScript

> **Estimated Savings:** 12 KiB (Both Mobile & Desktop)
> Polyfills and transforms enable older browsers to use new JavaScript features.

| URL / Feature | Wasted Bytes |
|---------------|-------------|
| wasleen.com 1st party — …chunks/255-4f212…fcab9.js | 11.5 KiB |

**Unused Modern Features Detected:**
- `Array.prototype.at`
- `Array.prototype.flat`
- `Array.prototype.flatMap`
- `Object.fromEntries`
- `Object.hasOwn`
- `String.prototype.trimEnd`
- `String.prototype.trimStart`

---

### 6. DOM Size Optimization

> A large DOM can increase the duration of style calculations and layout reflows, impacting page responsiveness.

| Statistic | Element | Value |
|-----------|---------|-------|
| Total Elements | — | 753 |
| DOM Depth | `div.flex > ul.mt-6 > li.flex > span.mt-1.5` | 14 |
| Most Children | `body` | 27 |

*(Same values apply to both Mobile and Desktop)*

---

### 7. LCP Breakdown

| Subpart | Mobile Duration | Desktop Duration |
|---------|----------------|-----------------|
| Time to First Byte | 0 ms | 0 ms |
| Element Render Delay | 2,160 ms | 2,600 ms |

---

### 8. Third-Party Code Impact

| 3rd Party | Transfer Size | Main Thread Time |
|-----------|-------------|-----------------|
| Google Tag Manager (`/gtm.js?id=GTM-59Z5PLJS`) | 109 KiB | 87 ms (Mobile) / 99 ms (Desktop) |

---

### 9. Minimize Main-Thread Work

#### Mobile (Total: 2.8 s)
| Category | Time Spent |
|----------|-----------|
| Script Evaluation | 1,101 ms |
| Style & Layout | 768 ms |
| Other | 633 ms |
| Script Parsing & Compilation | 177 ms |
| Rendering | 66 ms |
| Parse HTML & CSS | 28 ms |

#### Desktop (Total: 3.0 s)
| Category | Time Spent |
|----------|-----------|
| Script Evaluation | 960 ms |
| Style & Layout | 956 ms |
| Other | 719 ms |
| Script Parsing & Compilation | 163 ms |
| Rendering | 123 ms |
| Parse HTML & CSS | 29 ms |
| Garbage Collection | 22 ms |

---

### 10. Reduce Unused JavaScript

> **Mobile Est. Savings:** 92 KiB | **Desktop Est. Savings:** 93 KiB

| URL | Transfer Size | Mobile Est. Savings | Desktop Est. Savings |
|-----|-------------|--------------------|--------------------|
| Google Tag Manager (`/gtm.js?id=GTM-59Z5PLJS`) | 108.3 KiB | 71.8 KiB | 71.8 KiB |
| wasleen.com 1st party — …chunks/895-511325d25378d1d5.js | 39.1 KiB | 20.3 KiB | 21.3 KiB |

---

### 11. Reduce Unused CSS

> **Estimated Savings:** 12 KiB (Mobile only reported)

| URL | Transfer Size | Est. Savings |
|-----|-------------|-------------|
| wasleen.com 1st party — …css/3faefceeb3031b8b.css | 14.1 KiB | 11.8 KiB |

---

### 12. Avoid Enormous Network Payloads

#### Mobile (Total: 16,751 KiB) / Desktop (Total: 16,928 KiB)

| URL | Transfer Size |
|-----|-------------|
| wasleen.com 1st party (total) | 16,377.6 KiB (Mobile) / 16,399.2 KiB (Desktop) |
| /videos/foldable-garage-mechanism-video.mp4 | 7,707.7 KiB |
| /videos/foldable-garage-wasleen-pergolas-video.mp4 | 7,448.0 KiB |
| /images/foldable-and-retractable-carport-engineering-speci….webp | 242.3 KiB |
| /images/foldable-garage-alluminium-alloy-cross-section-ima….webp | 211.6 KiB |
| /images/retractable-carport-aluminium-alloy-by-wasleen-per….webp | 204.2 KiB |
| /images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp | 198.4 KiB |
| /images/foldable-carport-material-choice-by-wasleen-pergol….webp | 164.7 KiB |
| /images/foldable-carport-color-selection-guide-by-wasleen-….webp | 145.8 KiB |
| /images/specification-foldable-and-retractable-garage.webp | 76.6 KiB (Desktop only) |
| …chunks/4bd1b696-c023c6e3521b1417.js | 54.9 KiB |
| Google Tag Manager (`/gtm.js?id=GTM-59Z5PLJS`) | 109.0 KiB |

---

### 13. Avoid Long Main-Thread Tasks

#### Mobile (9 Long Tasks Found)

| URL / Task | Start Time | Duration |
|------------|-----------|---------|
| wasleen.com 1st party | 726 ms | — |
| …chunks/4bd1b696-c023c6e3521b1417.js | 4,952 ms | 171 ms |
| …chunks/255-4f212…fcab9.js | 5,123 ms | 162 ms |
| https://foldablegarage.wasleen.com | 948 ms | 152 ms |
| …chunks/255-4f212…fcab9.js | 4,585 ms | 93 ms |
| …chunks/c15bf2b0-52e8419f34af26ab.js | 5,285 ms | 77 ms |
| …chunks/255-4f212…fcab9.js | 4,223 ms | 71 ms |
| Unattributable | 118 ms | 1,112 ms / 62 ms / 1,174 ms / 56 ms |
| Google Tag Manager | 3,452 ms | 96 ms |

#### Desktop (7 Long Tasks Found)

| URL / Task | Start Time | Duration |
|------------|-----------|---------|
| wasleen.com 1st party | 523 ms | — |
| https://foldablegarage.wasleen.com | 292 ms | 193 ms |
| …chunks/255-4f212…fcab9.js | 1,099 ms | 158 ms |
| …chunks/c15bf2b0-52e8419f34af26ab.js | 1,257 ms | 95 ms |
| …chunks/255-4f212…fcab9.js | 1,022 ms | 77 ms |
| Unattributable | 159 ms | 576 ms / 81 ms / 498 ms / 78 ms |
| Google Tag Manager | 780 ms | 88 ms |

---

### 14. Avoid Non-Composited Animations (Mobile — 7 Animated Elements Found)

- `main > section.hero-section > div.absolute > div.absolute`
- `section.relative > div.absolute > div.absolute > div.absolute`
- `div.flex > div.relative > div.absolute > div.absolute`
- `span` (text: "Intelligent")
- `span` (text: "Motion.")
- `span` (text: "Absolute")
- `span` (text: "Protection.")

---

### 15. JavaScript Execution Time

#### Mobile (Total: 1.2 s)

| URL | Total CPU Time | Script Evaluation | Script Parse |
|-----|--------------|-----------------|-------------|
| wasleen.com 1st party | 2,228 ms | 1,026 ms | 102 ms |
| …chunks/255-4f212…fcab9.js | 900 ms | 585 ms | 21 ms |
| https://foldablegarage.wasleen.com | 402 ms | 12 ms | 8 ms |
| …chunks/4bd1b696-c023c6e3521b1417.js | 402 ms | 250 ms | 27 ms |
| …chunks/c15bf2b0-52e8419f34af26ab.js | 316 ms | 100 ms | 8 ms |
| …chunks/535-8d9c26bb1127577d.js | 91 ms | 35 ms | 12 ms |
| …app/page-4bfa376b70b9ba3f.js | 67 ms | 15 ms | 6 ms |
| …chunks/895-511325d25378d1d5.js | 51 ms | 29 ms | 20 ms |
| Unattributable | 383 ms | 7 ms | 0 ms |
| Google Tag Manager | 104 ms | 44 ms | 60 ms |

#### Desktop (Total: 1.0 s)

| URL | Total CPU Time | Script Evaluation | Script Parse |
|-----|--------------|-----------------|-------------|
| wasleen.com 1st party | 2,285 ms | 857 ms | 72 ms |
| …chunks/255-4f212…fcab9.js | 850 ms | 628 ms | 17 ms |
| https://foldablegarage.wasleen.com | 651 ms | 8 ms | 5 ms |
| …chunks/c15bf2b0-52e8419f34af26ab.js | 263 ms | 28 ms | 6 ms |
| …chunks/535-8d9c26bb1127577d.js | 200 ms | 50 ms | 8 ms |
| …chunks/4bd1b696-c023c6e3521b1417.js | 101 ms | 35 ms | 17 ms |
| …chunks/895-511325d25378d1d5.js | 96 ms | 46 ms | 14 ms |
| …app/page-4bfa376b70b9ba3f.js | 71 ms | 17 ms | 3 ms |
| …chunks/webpack-9b0dba45f3d97dbe.js | 53 ms | 44 ms | 1 ms |
| Unattributable | 463 ms | 21 ms | 0 ms |
| Google Tag Manager | 101 ms | 48 ms | 52 ms |

---

## ♿ Accessibility

### Scores

| Device | Score |
|--------|-------|
| Mobile | 73 |
| Desktop | 86 |

---

### Failing Audits

#### Mobile Only
| Issue | Category | Failing Element |
|-------|----------|----------------|
| `<html>` element does not have a `[lang]` attribute | Internationalization | `<html id="__next_error__">` |
| Document does not have a main landmark | Best Practices | `<html id="__next_error__">` |

#### Desktop Only
| Issue | Category | Failing Element(s) |
|-------|----------|--------------------|
| Buttons do not have an accessible name | Names and Labels | Multiple `<button disabled="" class="transition-colors cursor-default">` elements |
| `<object>` elements do not have alternate text | Names and Labels | `<object data="/foldable-garage-svg.svg" ...>` |
| Background and foreground colors insufficient contrast | Contrast | `<p class="mt-6 text-center text-xs text-text-tertiary">` and `<section class="relative bg-bg-primary py-20 md:py-24">` |
| Heading elements not in sequentially-descending order | Navigation | `<h4 class="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">` |
| `<video>` elements do not contain a `<track>` with `[kind="captions"]` | Audio and Video | — |
| Identical links have same purpose (ambiguous) | Best Practices | `<a href="tel:+971542330837">` and `<a href="https://wa.me/971542330837">` |

---

### Additional Items to Manually Check (Both Devices — 10 Items)

1. Interactive controls are keyboard focusable
2. Interactive elements indicate their purpose and state
3. The page has a logical tab order
4. Visual order on the page follows DOM order
5. User focus is not accidentally trapped in a region
6. The user's focus is directed to new content added to the page
7. HTML5 landmark elements are used to improve navigation
8. Offscreen content is hidden from assistive technology
9. Custom controls have associated labels
10. Custom controls have ARIA roles

---

### Passed Accessibility Audits

#### Mobile (4 Passed)
1. `[aria-hidden="true"]` is not present on the document `<body>`
2. Background and foreground colors have a sufficient contrast ratio
3. Document has a `<title>` element
4. Heading elements appear in a sequentially-descending order

#### Desktop (21 Passed)
1. `[aria-*]` attributes match their roles
2. `[aria-hidden="true"]` is not present on the document `<body>`
3. `[role]`s have all required `[aria-*]` attributes
4. `[role]` values are valid
5. `[aria-*]` attributes have valid values
6. `[aria-*]` attributes are valid and not misspelled
7. Image elements have `[alt]` attributes
8. `[user-scalable="no"]` is not used in the `<meta name="viewport">` element and the `[maximum-scale]` attribute is not less than 5
9. ARIA attributes are used as specified for the element's role
10. `[aria-hidden="true"]` elements do not contain focusable descendants
11. Elements use only permitted ARIA attributes
12. Document has a `<title>` element
13. `<html>` element has a `[lang]` attribute
14. `<html>` element has a valid value for its `[lang]` attribute
15. Links are distinguishable without relying on color
16. Links have a discernible name
17. Lists contain only `<li>` elements and script supporting elements
18. List items (`<li>`) are contained within `<ul>`, `<ol>` or `<menu>` parent elements
19. Touch targets have sufficient size and spacing
20. Document has a main landmark
21. Deprecated ARIA roles were not used

---

## 🔒 Best Practices

### Scores

| Device | Score |
|--------|-------|
| Mobile | 96 |
| Desktop | 100 |

---

### Failing Audits

#### Mobile Only
| Issue | Detail |
|-------|--------|
| Browser errors logged to the console | Source: wasleen.com 1st party (`…chunks/4bd1b696-c023c6e3521b1417.js:1:51267`) — Error: Minified React error #300 |

#### Both Devices — Trust and Safety Issues

| Issue | Severity | Detail |
|-------|---------|--------|
| Ensure CSP is effective against XSS attacks | **High** | No CSP found in enforcement mode |
| Use a strong HSTS policy | **Medium** | No `includeSubDomains` and `preload` directives found |
| Ensure proper origin isolation with COOP | **High** | No COOP header found |
| Mitigate clickjacking with XFO or CSP | **High** | No frame control policy found |
| Mitigate DOM-based XSS with Trusted Types | **High** | No `Content-Security-Policy` header with Trusted Types directive found |

---

### Passed Best Practice Audits

#### Mobile (12 Passed)
1. Uses HTTPS
2. Avoids deprecated APIs
3. Avoids third-party cookies
4. Allows users to paste into input fields
5. Avoids requesting the geolocation permission on page load
6. Avoids requesting the notification permission on page load
7. Displays images with correct aspect ratio
8. Serves images with appropriate resolution
9. Page has the HTML doctype

#### Desktop (13 Passed — All Mobile + Additional)
1. Uses HTTPS
2. Avoids deprecated APIs
3. Avoids third-party cookies
4. Allows users to paste into input fields
5. Avoids requesting the geolocation permission on page load
6. Avoids requesting the notification permission on page load
7. Displays images with correct aspect ratio
8. Serves images with appropriate resolution
9. Page has the HTML doctype
10. Properly defines charset
11. No browser errors logged to the console
12. No issues in the Issues panel in Chrome DevTools
13. Page has valid source maps

---

## 🔍 SEO

### Scores

| Device | Score |
|--------|-------|
| Mobile | 92 |
| Desktop | 100 |

---

### Failing Audits

#### Mobile Only
| Issue | Detail |
|-------|--------|
| `robots.txt` is not valid | Lighthouse was unable to download a robots.txt file |

---

### Additional Items to Manually Check

| Item | Status |
|------|--------|
| Structured data is valid | Requires manual verification |

---

### Passed SEO Audits

#### Mobile (8 Passed)
1. Page isn't blocked from indexing
2. Document has a `<title>` element
3. Document has a meta description
4. Page has successful HTTP status code
5. Links have descriptive text
6. Links are crawlable
7. Document has a valid hreflang
8. Document has a valid `rel=canonical`

> **Note:** "Image elements have `[alt]` attributes" — Not Applicable on Mobile

#### Desktop (10 Passed)
1. Page isn't blocked from indexing
2. Document has a `<title>` element
3. Document has a meta description
4. Page has successful HTTP status code
5. Links have descriptive text
6. Links are crawlable
7. `robots.txt` is valid
8. Image elements have `[alt]` attributes
9. Document has a valid hreflang
10. Document has a valid `rel=canonical`

---

## 🏁 Summary of Critical Action Items

| Priority | Issue | Impact | Device |
|----------|-------|--------|--------|
| 🔴 CRITICAL | Two autoplay videos totaling ~15.1 MB loaded on page | Enormous payload, kills LCP | Both |
| 🔴 CRITICAL | Images oversized — 891–975 KiB savings available | LCP, load time | Both |
| 🔴 CRITICAL | No CSP header (XSS vulnerability) | Security | Both |
| 🔴 CRITICAL | No COOP header (Origin isolation) | Security | Both |
| 🔴 CRITICAL | No frame control policy (Clickjacking) | Security | Both |
| 🔴 CRITICAL | No Trusted Types directive (DOM-based XSS) | Security | Both |
| 🟠 HIGH | Render-blocking CSS (450 ms savings mobile) | FCP, LCP | Both |
| 🟠 HIGH | Forced reflow in chunks/535 JS — 919 ms top entry | Main thread blocking | Both |
| 🟠 HIGH | LCP Element Render Delay: 2,160 ms (Mobile), 2,600 ms (Desktop) | LCP | Both |
| 🟠 HIGH | Google Tag Manager unused JS: 71.8 KiB waste | TBT, JS execution | Both |
| 🟡 MEDIUM | `robots.txt` not downloadable | SEO crawlability | Mobile |
| 🟡 MEDIUM | No HSTS `includeSubDomains` + `preload` | Security | Both |
| 🟡 MEDIUM | Accessibility score 73 mobile / 86 desktop | UX, SEO signal | Both |
| 🟡 MEDIUM | `<html>` missing `lang` attribute | Accessibility / i18n | Mobile |
| 🟡 MEDIUM | DOM size: 753 elements — reduce where possible | Layout reflow | Both |
| 🟡 MEDIUM | Legacy JS polyfills — 11.5 KiB waste | JS payload | Both |
| 🟢 LOW | Non-composited animations (7 elements) | Paint performance | Mobile |
| 🟢 LOW | Buttons missing accessible names | Accessibility | Desktop |
| 🟢 LOW | Videos missing captions track | Accessibility | Desktop |
| 🟢 LOW | Identical links ambiguous purpose | Accessibility | Desktop |
