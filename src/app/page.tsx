import { HeroSection } from '@/components/homepage/HeroSection';
import dynamic from 'next/dynamic';

// Statically import above-the-fold sections for fastest LCP
import { MechanismReveal } from '@/components/homepage/MechanismReveal';
import { StatsSection } from '@/components/homepage/StatsSection';

// Dynamically import below-the-fold sections to reduce initial JS bundle
const GallerySection = dynamic(
  () =>
    import('@/components/homepage/GallerySection').then(
      (mod) => mod.GallerySection
    ),
  { ssr: true }
);

const PricingSection = dynamic(
  () =>
    import('@/components/homepage/PricingSection').then(
      (mod) => mod.PricingSection
    ),
  { ssr: true }
);

const FeaturesSection = dynamic(
  () =>
    import('@/components/homepage/FeaturesSection').then(
      (mod) => mod.FeaturesSection
    ),
  { ssr: true }
);

const VideoSection = dynamic(
  () =>
    import('@/components/homepage/VideoSection').then(
      (mod) => mod.VideoSection
    ),
  { ssr: true }
);

const ReviewsSection = dynamic(
  () =>
    import('@/components/homepage/ReviewsSection').then(
      (mod) => mod.ReviewsSection
    ),
  { ssr: true }
);

const SocialProof = dynamic(
  () =>
    import('@/components/homepage/SocialProof').then(
      (mod) => mod.SocialProof
    ),
  { ssr: true }
);

const FooterCTA = dynamic(
  () =>
    import('@/components/homepage/FooterCTA').then((mod) => mod.FooterCTA),
  { ssr: true }
);

export default function HomePage() {
  return (
    <main>
      {/* Section 1 — Hero (above fold) */}
      <HeroSection />

      {/* Section 2 — Mechanism Reveal */}
      <MechanismReveal />

      {/* Section 3 — Stats Counter */}
      <StatsSection />

      {/* Section 4 — Gallery */}
      <GallerySection />

      {/* Section 5 — Pricing Tiers */}
      <PricingSection />

      {/* Section 6 — Feature Cards */}
      <FeaturesSection />

      {/* Section 7 — Mechanism Video */}
      <VideoSection />

      {/* Section 8 — Reviews Carousel */}
      <ReviewsSection />

      {/* Section 9 — Social Proof (Bento Testimonial Grid) */}
      <SocialProof />

      {/* Section 10 — Final CTA */}
      <FooterCTA />
    </main>
  );
}
