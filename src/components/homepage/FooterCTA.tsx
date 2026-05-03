'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { WHATSAPP_LINK } from '@/lib/constants';
import { pushGTMEvent } from '@/lib/gtm';

/**
 * Section 9 — Final conversion CTA at the bottom of the homepage.
 * Full-bleed dark section with kinetic background effect, dual CTAs.
 */
export function FooterCTA() {
  const handleQuoteClick = () => {
    pushGTMEvent('quote_started', { source: 'footer_cta' });
  };

  const handleWhatsAppClick = () => {
    pushGTMEvent('whatsapp_clicked', { source: 'footer_cta' });
  };

  return (
    <section className="relative overflow-hidden bg-bg-primary py-20 md:py-28">
      {/* Animated kinetic background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Glowing orbs */}
        <div
          className="absolute -left-32 -top-32 h-80 w-80 rounded-full opacity-[0.04]"
          style={{
            background:
              'radial-gradient(circle, rgba(0,212,255,0.4) 0%, transparent 70%)',
            animation: 'pulseGlowSlow 6s ease-in-out infinite',
          }}
        />
        <div
          className="absolute -right-32 -bottom-32 h-80 w-80 rounded-full opacity-[0.04]"
          style={{
            background:
              'radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)',
            animation: 'pulseGlowSlow 6s ease-in-out infinite 2s',
          }}
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Foldable mechanism hint */}
        <div className="absolute inset-0 opacity-[0.05]">
          <div
            className="absolute top-1/2 left-1/2 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-accent-cyan/20"
            style={{
              transform: 'skewX(-35deg) scaleY(0.6) translate(-50%, -50%)',
              animation: 'foldableSlideLeft 8s ease-in-out infinite',
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 h-32 w-64 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-accent-gold/20"
            style={{
              transform: 'skewX(-35deg) scaleY(0.6) translate(-50%, -50%)',
              animation: 'foldableSlideRight 8s ease-in-out infinite 0.5s',
            }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Decorative gold line */}
          <div className="mx-auto mb-6 h-px w-16 bg-accent-gold" />

          {/* Headline */}
          <h2 className="font-sans text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.1] text-text-primary">
            Ready to protect{' '}
            <span className="gold-gradient">what matters?</span>
          </h2>

          {/* Description */}
          <p className="mt-6 text-lg leading-relaxed text-text-secondary">
            Join hundreds of UAE villa owners who trust Wasleen for premium
            carport solutions. Get your personalized quote in under 2 minutes.
          </p>

          {/* Trust indicators */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-text-tertiary">
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent-gold">
                <path d="M8 1L10 5.5L15 6L11.5 9.5L12.5 14.5L8 12L3.5 14.5L4.5 9.5L1 6L6 5.5L8 1Z" fill="currentColor" />
              </svg>
              5-Year Warranty
            </span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent-gold">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M5 8.5L7 10.5L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Free Site Survey
            </span>
            <span className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent-gold">
                <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
                <path d="M5 3V2C5 1.45 5.45 1 6 1H10C10.55 1 11 1.45 11 2V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Certified Installation
            </span>
          </div>

          {/* Dual CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              variant="primary"
              size="lg"
              href="/quote"
              onClick={handleQuoteClick}
            >
              Get a Quote
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 4L9 8L5 12" />
              </svg>
            </Button>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 rounded-lg border border-whatsapp/40 bg-whatsapp/10 px-8 py-4 text-base font-semibold text-whatsapp transition-all duration-200 hover:bg-whatsapp hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us Now
            </a>
          </div>

          {/* Phone number display */}
          <p className="mt-6 text-xs text-text-tertiary">
            Or call us directly:{' '}
            <a
              href="tel:+971542330837"
              className="text-accent-gold underline-offset-2 hover:underline"
            >
              +971 54 233 0837
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
