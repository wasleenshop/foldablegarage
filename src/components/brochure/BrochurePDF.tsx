// ═══════════════════════════════════════════════════
// BrochurePDF — Root Document (assembles all 12 pages)
// ═══════════════════════════════════════════════════

import { Document } from '@react-pdf/renderer';

import { CoverPage } from './pages/CoverPage';
import { AboutPage } from './pages/AboutPage';
import { FeaturePages, FeaturePagesTwo } from './pages/FeaturePages';
import { ColourPage, ColourPageDark } from './pages/ColourPage';
import { SpecsPage } from './pages/SpecsPage';
import { PricingPage } from './pages/PricingPage';
import { GalleryPage, GalleryPageTwo } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';

// ─── StyleSheet needed for font registration side-effect ───
import './shared/styles';

export function BrochurePDF() {
  return (
    <Document
      title="Wasleen Foldable Garage — Premium Retractable Carport Brochure"
      author="Wasleen Pergolas"
      subject="Premium Retractable Carports UAE — Company Brochure"
      keywords="retractable carport, foldable garage, UAE, Dubai, carport, aluminium pergola, Wasleen, premium carport"
    >
      {/* Page 1 — Cover */}
      <CoverPage />

      {/* Page 2 — About Us */}
      <AboutPage />

      {/* Pages 3-4 — Features */}
      <FeaturePages />
      <FeaturePagesTwo />

      {/* Pages 5 — Colour pages (we have 5 colours) */}
      {/* Note: ColourPage = 5 colours shown; ColourPageDark = hero detail spread */}
      <ColourPage />
      <ColourPageDark />

      {/* Page 8 — Technical Specs */}
      <SpecsPage />

      {/* Page 9 — Pricing */}
      <PricingPage />

      {/* Pages 10-11 — Gallery */}
      <GalleryPage />
      <GalleryPageTwo />

      {/* Page 12 — Contact / Back Cover */}
      <ContactPage />
    </Document>
  );
}

export default BrochurePDF;
