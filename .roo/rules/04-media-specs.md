# Wasleen — Media Specifications

## Photo Canvas Sizes

| Asset | Canvas (px) | Aspect Ratio | Max File | Notes |
|-------|-------------|--------------|----------|-------|
| Hero product | `2400×1350` | 16:9 | 500 KB | Full-bleed, 2× retina. `priority` loading |
| Feature cards (×5) | `1600×1067` | 3:2 | 300 KB each | 80vw desktop, `loading=lazy` |
| Colour swatches (×5) | `1200×800` | 3:2 | 200 KB each | Large preview when swatch clicked |
| Gallery / Installation | `2000×1500` | 4:3 | 400 KB each | Masonry grid, flexible crop |
| Product page main | `1800×1200` | 3:2 | 400 KB | Gallery main image |
| Product thumbnails | `400×267` | 3:2 | 50 KB each | Gallery thumbnail strip |
| About / Workshop | `2400×1350` | 16:9 | 400 KB | About page hero |
| Team photos (×4) | `800×800` | 1:1 square | 150 KB each | Square cards |
| Blog featured | `1200×630` | 1.91:1 | 200 KB | Same as OG ratio |
| OG Image | `1200×630` | 1.91:1 | 300 KB | Social sharing |
| Favicon / PWA | `512×512` | 1:1 | 50 KB | Manifest icon |

## Video Specs

| Asset | Resolution | Bitrate | Format | Max File | Notes |
|-------|------------|---------|--------|----------|-------|
| Mechanism video | `1920×1080` | 8-12 Mbps | H.264 MP4 | 30-50 MB | Keyframe every 1s (scroll-scrubbed) |
| Mobile fallback | `1080×608` | 4 Mbps | H.264 MP4 | 15-25 MB | Alternative for mobile |
| Poster frame | `1920×1080` | — | WebP | 200 KB | `priority` loading before video |

## Format Rules
- **Photos:** WebP (primary, `next/image` auto-serves this), JPEG fallback
- **Icons/Graphics:** SVG only
- **Video:** H.264 MP4 (100% browser compat)
- **Video poster:** Same dimensions as video, served as WebP

## `next/image` Usage Pattern

> **⚠️ IMPORTANT:** Do NOT hardcode image filenames. The user has already created SEO-optimized image files with descriptive names. Reference the actual files from `public/images/` — the developer should use the exact filename as provided by the user for each asset type.

```tsx
// Hero (priority, full-width)
// → Use the actual SEO-named file from public/images/
<Image
  src="/images/{seo-filename-here}.webp"
  alt="Wasleen Foldable Premium Garage"
  width={2400}
  height={1350}
  priority
  sizes="100vw"
  className="object-cover"
/>

// Feature card (lazy, responsive)
// → Use the actual SEO-named file from public/images/
<Image
  src="/images/{seo-filename-here}.webp"
  alt="Feature description — update to match content"
  width={1600}
  height={1067}
  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 80vw"
  className="object-cover"
/>
```

The placeholders above (`{seo-filename-here}`) must be replaced with the actual SEO‑named files the user has prepared. The developer should ask the user for the correct filenames if they are not immediately obvious from the `public/images/` directory listing.
