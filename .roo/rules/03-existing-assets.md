# Wasleen — Existing Assets Reference

These files already exist in the workspace at `d:/Retractable Carport/Website planning/`. **Copy/import them into the project — do not rebuild.**

## Logo

| File | Source Path | Destination | Purpose |
|------|-----------|-------------|---------|
| `WasleenGarageLogo.tsx` | [`Logo/WasleenGarageLogo.tsx`](../Logo/WasleenGarageLogo.tsx) | `src/components/layout/Logo.tsx` | React SVG component with gold gradient, wordmark, inverted mode |
| `wasleen-garage-logo.svg` | [`Logo/wasleen-garage-logo.svg`](../Logo/wasleen-garage-logo.svg) | `public/images/logo.svg` | Raw SVG for OG images, fallback |

**Logo component props:** `size`, `showWordmark`, `inverted`, `className`, `style`
- Use `inverted` on dark backgrounds (white/gold on `#0A0A0A`)
- Use default on light backgrounds (gold on `#1A1A1A`)

## Legal Policies

| File | Source Path | Purpose |
|------|-----------|---------|
| `wasleen-legal-policies.html` | [`wasleen-legal-policies.html`](../wasleen-legal-policies.html) | Contains Warranty, Returns, Terms, Privacy content. Convert to Next.js page components. |

## Planning Documents (Reference Only)

| File | Path | What It Contains |
|------|------|-----------------|
| `build_phase_plan.md` | [`plans/build_phase_plan.md`](../plans/build_phase_plan.md) | **Primary build instruction manual** — follow this step by step |
| `ui_design_spec.md` | [`plans/ui_design_spec.md`](../plans/ui_design_spec.md) | Complete UI spec for all 11 pages |
| `setup_guide_and_plan.md` | [`plans/setup_guide_and_plan.md`](../plans/setup_guide_and_plan.md) | Setup guide, pricing table, product config |
| `credentials_and_config.md` | [`plans/credentials_and_config.md`](../plans/credentials_and_config.md) | All API keys and env vars (sensitive — do not commit) |
| `google_analytics_tag_manager_setup.md` | [`plans/google_analytics_tag_manager_setup.md`](../plans/google_analytics_tag_manager_setup.md) | GA4 + GTM setup guide |
| `logo_redesign_concepts.md` | [`plans/logo_redesign_concepts.md`](../plans/logo_redesign_concepts.md) | Logo concept history (Concept 1 "Kinetic Fold" was built) |
| `wasleen_website_mega_plan.html` | [`wasleen_website_mega_plan.html`](../wasleen_website_mega_plan.html) | Interactive mega plan (reference only) |

## Key Credentials

All credentials (Supabase URL, GTM ID, Paddle tokens, etc.) are stored in [`plans/credentials_and_config.md`](../plans/credentials_and_config.md) and `.env.local`. **Do not commit these values directly.**
