# Wasleen — Coding Standards & Conventions

## General Rules

1. **'use client' only where needed.** Server components by default. Only add `'use client'` to components that use: hooks, event handlers, browser APIs, Framer Motion, GSAP.

2. **One component = one file.** Named exports preferred over default exports. File name matches component name (PascalCase).

3. **Use `next/image` for all images.** Always provide `sizes` attribute for responsive images. Hero images get `priority` prop.

4. **Tailwind CSS v4 for styling.** Use CSS custom properties for design tokens defined in globals.css. Avoid inline styles.

5. **TypeScript everywhere.** No `any` types. Use `interface` over `type` for object shapes. Define all types in `src/lib/types.ts`.

## React Patterns

```typescript
// Component pattern
interface ComponentProps {
  title: string;
  children?: React.ReactNode;
}

export function Component({ title, children }: ComponentProps) {
  return <div>{title}{children}</div>;
}
```

## Import Order

```typescript
// 1. React/Next.js
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// 2. Third-party
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

// 3. Internal lib
import { cn } from '@/lib/utils';
import { PRICING, COLOURS } from '@/lib/constants';

// 4. Components
import { Button } from '@/components/ui/Button';

// 5. Types
import type { ProductConfig, Review } from '@/lib/types';
```

## Routing Convention

```
src/app/
  page.tsx            → /
  layout.tsx          → Root layout
  (marketing)/        → Route group (shared layout)
    about/page.tsx    → /about
    contact/page.tsx  → /contact
    product/page.tsx  → /product
    gallery/page.tsx  → /gallery
  quote/page.tsx      → /quote (no group — unique layout)
  thank-you/page.tsx  → /thank-you
  blog/
    page.tsx          → /blog
    [slug]/page.tsx   → /blog/[slug]
  api/
    quote/route.ts    → POST /api/quote
    contact/route.ts  → POST /api/contact
    paddle-webhook/   → POST /api/paddle-webhook
```

## Animation Rules

- **Phase 1:** Simple Framer Motion fade-ins. `motion.div` with `whileInView`. No GSAP yet.
- **Phase 2:** Add GSAP ScrollTrigger, Lenis smooth scroll. Complex scroll-choreographed animations.
- **Always wrap animations** in `prefers-reduced-motion` media query check.
- **Mobile:** No parallax, no scroll-triggered animations beyond fade-in.

## GTM / dataLayer

Push events at every conversion step:
```typescript
window.dataLayer.push({ event: 'quote_started' });
window.dataLayer.push({ event: 'deposit_completed', amount: 32333 });
```

## Environment Variables

Always use `process.env.NEXT_PUBLIC_*` for client-side vars. Never hardcode credentials. Reference `.env.local` template from [`plans/credentials_and_config.md`](plans/credentials_and_config.md).
