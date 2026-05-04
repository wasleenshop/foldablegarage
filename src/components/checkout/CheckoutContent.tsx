'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { CheckoutMediaGallery } from './CheckoutMediaGallery';
import { CheckoutConfigurator } from './CheckoutConfigurator';
import { CheckoutSpecTable } from './CheckoutSpecTable';
import { CheckoutFeatureShowcase } from './CheckoutFeatureShowcase';
import { CheckoutBuyButton } from './CheckoutBuyButton';
import { ProductReviews } from '@/components/product/ProductReviews';
import { pushGTMEvent } from '@/lib/gtm';
import { DIMENSIONS } from '@/lib/constants';
import type { ProductConfig } from '@/lib/types';

const INITIAL_CONFIG: ProductConfig = {
  width: 6,
  length: 10,
  roofType: 'polycarbonate',
  colour: 'medium-smoke',
  hasAutomaticSystem: true,
  hasRollerShutter: false,
  hasGlassTint: false,
};

/**
 * Main client orchestrator for the /checkout page.
 * Manages the product configuration state and passes it down to all child components.
 */
export function CheckoutContent() {
  const [config, setConfig] = useState<ProductConfig>(INITIAL_CONFIG);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    pushGTMEvent('checkout_viewed', {
      config: JSON.stringify(config),
      referrer: document.referrer || 'direct',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfigChange = (updated: Partial<ProductConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...updated };
      if (mounted) {
        pushGTMEvent('config_updated', {
          width: next.width,
          length: next.length,
          roofType: next.roofType,
          hasAutomaticSystem: next.hasAutomaticSystem,
          hasRollerShutter: next.hasRollerShutter,
          hasGlassTint: next.hasGlassTint,
        });
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-bg-primary pt-24 md:pt-28">
      {/* Page Header */}
      <Container className="pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.1] text-text-primary">
            Configure Your{' '}
            <span className="bg-gradient-to-r from-accent-gold to-accent-gold-hover bg-clip-text text-transparent">
              Foldable Garage
            </span>
          </h1>
          <p className="mt-3 max-w-2xl text-base text-text-secondary">
            Customise every detail — from dimensions and roof type to colour and smart features.
            Your price updates instantly.
          </p>
        </motion.div>
      </Container>

      {/* Main Content: Gallery + Configurator */}
      <section className="pb-12">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Column — Media Gallery */}
            <div className="lg:sticky lg:top-28 lg:self-start">
              <CheckoutMediaGallery />
            </div>

            {/* Right Column — Configurator + Buy Button */}
            <div>
              <CheckoutConfigurator
                config={config}
                onChange={handleConfigChange}
              />
              <div className="mt-6">
                <CheckoutBuyButton config={config} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Technical Specifications Table */}
      <section className="py-12 md:py-20">
        <Container>
          <CheckoutSpecTable />
        </Container>
      </section>

      {/* Features Showcase */}
      <CheckoutFeatureShowcase />

      {/* Customer Reviews */}
      <section className="py-12 md:py-20">
        <Container>
          <ProductReviews />
        </Container>
      </section>

      {/* Bottom Sticky Buy Button (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border-subtle bg-bg-primary/95 backdrop-blur-md md:hidden">
        <div className="px-4 py-3">
          <CheckoutBuyButton config={config} />
        </div>
      </div>
    </div>
  );
}
