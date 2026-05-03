'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FEATURES } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

/**
 * Feature entry type from constants.
 */
type FeatureEntry = (typeof FEATURES)[number];

/**
 * Section 6 — Horizontal scrolling feature track.
 * Phase 2: GSAP horizontal scroll with 5 cards, each 80vw wide.
 * Per-card effects: Ken Burns zoom (1.1→1.0), gold underline draw-in, spec highlight.
 */

const FEATURE_IMAGES: Record<string, string> = {
  'precision-rail': '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas.webp',
  'heavy-duty-roller': '/images/foldable-garage-alluminium-alloy-cross-section-image-aluminium-alloy-by-wasleen-pergolas-2.webp',
  'pvdf-coating': '/images/foldable-carport-color-selection-guide-by-wasleen-pergolas.webp',
  'polycarbonate-panels': '/images/foldable-carport-material-choice-by-wasleen-pergolas.webp',
  'smart-automation': '/images/retractable-carport-aluminium-alloy-by-wasleen-pergolas.webp',
};

const FEATURE_DESCRIPTIONS: Record<string, string> = {
  'precision-rail':
    'Our precision rail system ensures smooth, silent operation for decades. Manufactured from 6063-T5 aluminium, each rail is anodised for maximum corrosion resistance in the UAE coastal climate.',
  'heavy-duty-roller':
    'Built to withstand heavy daily use, our roller assembly features sealed ball bearings rated to 500 kg each and self-lubricating polymer bushings for maintenance-free operation.',
  'pvdf-coating':
    'Using Kynar 500® PVDF resin, our coatings deliver 15+ years of colour retention without fading, chalking, or delamination — even under intense UAE sun exposure.',
  'polycarbonate-panels':
    '6mm twin-wall polycarbonate panels offer 99.9% UV protection while diffusing natural light. 50 times more impact-resistant than glass, they provide safety and comfort.',
  'smart-automation':
    'Control your foldable garage from anywhere. Remote operation, rain and heat sensors, and smartphone app compatibility make daily use effortless.',
};

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Calculate total scrollable distance
      const scrollDistance = -(track.scrollWidth - window.innerWidth);

      // Main horizontal track scroll
      const mainScroll = gsap.to(track, {
        x: scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => '+=' + track.scrollWidth,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Track which card is active based on progress
            const cardCount = FEATURES.length;
            const idx = Math.min(
              Math.floor(self.progress * cardCount),
              cardCount - 1
            );
            setActiveIndex(idx);

            // Per-card Ken Burns zoom + gold underline
            const cards = track.querySelectorAll('.feature-card');
            cards.forEach((card, i) => {
              const cardStart = i / cardCount;
              const cardEnd = (i + 1) / cardCount;
              const inView = self.progress >= cardStart && self.progress < cardEnd;

              // Image zoom: 1.1→1.0 as card comes into focus
              const img = card.querySelector('.feature-image') as HTMLElement | null;
              if (img) {
                const localT = Math.max(
                  0,
                  Math.min((self.progress - cardStart) / (cardEnd - cardStart), 1)
                );
                gsap.to(img, {
                  scale: 1.1 - localT * 0.1,
                  duration: 0.1,
                  overwrite: 'auto',
                });
              }

              // Gold underline: width 0→100%
              const underline = card.querySelector('.feature-underline') as HTMLElement | null;
              if (underline) {
                const localT = Math.max(
                  0,
                  Math.min((self.progress - cardStart) / (cardEnd - cardStart), 1)
                );
                gsap.to(underline, {
                  width: `${localT * 100}%`,
                  duration: 0.1,
                  overwrite: 'auto',
                });
              }
            });
          },
        },
      });
    }, section);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      ref={sectionRef}
      className="features-wrapper relative overflow-hidden bg-bg-primary py-20 md:py-24"
    >
      {/* Heading (static — above the scroll track) */}
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          title="Engineered for the UAE"
          subtitle="Every detail, from material selection to thermal performance, is optimised for the region's climate."
          align="center"
        />
      </div>

      {/* Horizontal scroll track — data-cursor="drag" enables the "DRAG" magnetic cursor label */}
      <div
        ref={trackRef}
        data-cursor="drag"
        className="features-track mt-12 flex gap-8 md:mt-16 md:pl-[calc((100vw-1200px)/2)]"
      >
        {FEATURES.map((feature, index) => {
          const f = feature as FeatureEntry;
          const imageSrc = FEATURE_IMAGES[f.id];
          const isActive = activeIndex === index;

          return (
            <div
              key={f.id}
              className={`feature-card shrink-0 w-[80vw] max-w-[900px] rounded-2xl bg-bg-card border transition-colors duration-500 ${
                isActive
                  ? 'border-accent-gold/40 shadow-lg shadow-accent-gold/5'
                  : 'border-border-subtle'
              }`}
            >
              <div className="flex flex-col md:flex-row">
                {/* Feature image with Ken Burns zoom */}
                <div className="relative aspect-[3/2] w-full overflow-hidden rounded-l-2xl md:w-1/2">
                  {/* Gold underline draw-in at top */}
                  <div className="absolute top-0 left-0 z-10 h-[3px] bg-accent-gold feature-underline w-0" />

                  {/* Animated gradient border overlay */}
                  <div className="absolute inset-0 rounded-l-2xl overflow-hidden pointer-events-none">
                    <div
                      className="absolute -inset-[2px] rounded-l-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          'conic-gradient(from var(--angle, 0deg), transparent 0deg, #C9A84C 90deg, #00D4FF 180deg, #7C3AED 270deg, transparent 360deg)',
                        animation: 'gradientBorderRotate 4s linear infinite',
                      }}
                    />
                    <div className="absolute inset-[1px] rounded-l-2xl bg-bg-card" />
                  </div>

                  <Image
                    src={imageSrc}
                    alt={`Wasleen ${f.title.toLowerCase()} — engineering detail and material quality`}
                    fill
                    className="feature-image object-cover relative z-[5]"
                    style={{ transform: 'scale(1.1)' }}
                    sizes="80vw"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-6 md:w-1/2 md:p-8">
                  <span className="text-xs font-medium uppercase tracking-widest text-accent-gold">
                    Feature {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 font-sans text-[clamp(1.25rem,2vw,1.75rem)] font-semibold text-text-primary">
                    {f.title}
                  </h3>
                  <p className="mt-4 leading-relaxed text-text-secondary">
                    {FEATURE_DESCRIPTIONS[f.id] || ''}
                  </p>

                  {/* Specs */}
                  {f.specs && f.specs.length > 0 && (
                    <ul className="mt-6 space-y-3">
                      {f.specs.map((spec, si) => (
                        <li
                          key={spec}
                          className="flex items-start gap-3 text-sm text-text-secondary transition-all duration-300"
                          style={{
                            opacity: isActive ? 1 : 0.6,
                            transform: isActive ? 'translateX(0)' : 'translateX(-8px)',
                            transitionDelay: `${si * 100}ms`,
                          }}
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-gold" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
