import { HeroSection } from '@/components/homepage/HeroSection';
import { MechanismReveal } from '@/components/homepage/MechanismReveal';
import { StatsSection } from '@/components/homepage/StatsSection';
import { GallerySection } from '@/components/homepage/GallerySection';
import { PricingSection } from '@/components/homepage/PricingSection';
import { FeaturesSection } from '@/components/homepage/FeaturesSection';
import { VideoSection } from '@/components/homepage/VideoSection';
import { ReviewsSection } from '@/components/homepage/ReviewsSection';
import { SocialProof } from '@/components/homepage/SocialProof';
import { FooterCTA } from '@/components/homepage/FooterCTA';

export default function HomePage() {
  return (
    <main>
      {/* Section 1 — Hero */}
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
