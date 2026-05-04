'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { calculatePrice, formatPrice } from '@/lib/utils';
import { pushGTMEvent } from '@/lib/gtm';
import { openPaddleCheckout } from '@/lib/paddle';
import type { ProductConfig } from '@/lib/types';

interface CheckoutBuyButtonProps {
  config: ProductConfig;
  className?: string;
}

/**
 * "Buy Now — $X" button that opens the Paddle Classic checkout overlay
 * directly in the browser with the exact calculated amount as a price
 * override. No server-side API call needed.
 */
export function CheckoutBuyButton({ config, className }: CheckoutBuyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = calculatePrice(config);

  const handleBuyNow = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      // Push GTM event
      pushGTMEvent('checkout_started', {
        amount: totalPrice,
        width: config.width,
        length: config.length,
        roofType: config.roofType,
        colour: config.colour,
        hasAutomaticSystem: config.hasAutomaticSystem,
        hasRollerShutter: config.hasRollerShutter,
        hasGlassTint: config.hasGlassTint,
      });

      // Open Paddle Classic checkout overlay directly in-browser
      // Paddle.Checkout.open() handles the payment modal — no redirect needed
      await openPaddleCheckout({
        price: totalPrice,
        customData: {
          config: JSON.stringify(config),
        },
        successUrl: `${window.location.origin}/thank-you`,
      });

      // Reset loading after checkout modal closes
      setIsLoading(false);
    } catch (err) {
      console.error('Buy Now error:', err);
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsLoading(false);
    }
  }, [config, totalPrice, isLoading]);

  const handleWhatsAppFallback = useCallback(() => {
    const message = `Hi Wasleen, I'm interested in the Foldable Garage. Configuration: ${config.width}m×${config.length}m, ${config.roofType === 'glass' ? 'Glass' : 'Polycarbonate'} roof, Colour: ${config.colour}.`;
    window.open(
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971542330837'}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  }, [config]);

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
    >
      <Button
        variant="primary"
        size="lg"
        className="w-full text-base md:text-lg"
        onClick={handleBuyNow}
        isLoading={isLoading}
      >
        {isLoading ? (
          'Processing...'
        ) : (
          <span className="flex items-center justify-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            Buy Now — {formatPrice(totalPrice)}
          </span>
        )}
      </Button>

      {/* Error message */}
      {error && (
        <div className="mt-3 rounded-lg border border-error/20 bg-error/5 p-3">
          <p className="text-sm text-error">{error}</p>
          <button
            onClick={handleWhatsAppFallback}
            className="mt-2 text-xs font-medium text-accent-gold underline underline-offset-2 hover:text-accent-gold-hover"
          >
            Or contact us on WhatsApp
          </button>
        </div>
      )}

      {/* Trust badges */}
      <div className="mt-3 flex items-center justify-center gap-4 text-xs text-text-tertiary">
        <span className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          Secure checkout
        </span>
        <span className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Pay with Paddle
        </span>
        <span className="flex items-center gap-1">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
          Instant redirect
        </span>
      </div>
    </motion.div>
  );
}
