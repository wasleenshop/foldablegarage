# Wasleen — Design System Tokens

## Color Palette

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

## Typography

| Element | Font | Weight | Size | Line Height |
|---------|------|--------|------|-------------|
| H1 (Hero) | Plus Jakarta Sans | 700 Bold | clamp(2.5rem, 5vw, 4.5rem) | 1.05 |
| H2 (Section) | Plus Jakarta Sans | 600 Semibold | clamp(1.75rem, 3vw, 2.75rem) | 1.1 |
| H3 (Card) | Plus Jakarta Sans | 600 Semibold | clamp(1.25rem, 2vw, 1.75rem) | 1.2 |
| H4 (Sub) | Plus Jakarta Sans | 500 Medium | clamp(1rem, 1.5vw, 1.25rem) | 1.3 |
| Body | Plus Jakarta Sans | 400 Regular | clamp(0.875rem, 1vw, 1rem) | 1.6 |
| Small | Plus Jakarta Sans | 400 Regular | 0.75rem | 1.5 |
| CTA Button | Plus Jakarta Sans | 600 Semibold | 0.9375rem | 1 |
| Price Large | Plus Jakarta Sans | 700 Bold | clamp(1.5rem, 3vw, 2.5rem) | 1 |
| Stat Number | Plus Jakarta Sans | 700 Bold | clamp(2rem, 4vw, 3.5rem) | 1 |

## Spacing System (4px grid)
- Section padding: 80px desktop / 48px mobile
- Card padding: 24px
- Content max-width: 1200px
- Gap between sections: 80px

## Breakpoints
- Mobile: 390px (iPhone 15 Pro — design starts here)
- Tablet: 768px (iPad)
- Desktop: 1280px+ (MacBook/External)

## Effects Map
| Effect | Implementation | Scope |
|--------|---------------|-------|
| Fade in on scroll | Framer Motion `useInView` + `whileInView` | All sections |
| Stagger reveal | Framer Motion `staggerChildren` | Lists, cards |
| Smooth scroll | Lenis.js | Entire site (Phase 2) |
| Page transitions | Framer Motion `AnimatePresence` | Route changes |
| Count-up animation | Framer Motion `useSpring` | Stats section |
| Subtle hover lift | `transform: translateY(-4px)` + shadow | Cards, tiers |
| prefers-reduced-motion | Wrapped in `@media (prefers-reduced-motion: no-preference)` | All animations |
