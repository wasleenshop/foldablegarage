import Link from 'next/link';
import { WasleenGarageLogo } from './Logo';
import { Container } from '@/components/ui/Container';
import { WHATSAPP_LINK, COMPANY_EMAIL } from '@/lib/constants';

/**
 * 4-column footer with logo, links, contact info, legal pages, and SVG background pattern.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border-subtle bg-bg-secondary overflow-hidden">
      {/* SVG Background — Blueprint/Architectural pattern */}
      <div className="absolute inset-0 opacity-[0.15] pointer-events-none">
        <object
          data="/foldable-garage-svg.svg"
          type="image/svg+xml"
          className="h-full w-full"
          aria-label=""
        />
      </div>

      <Container className="relative z-10 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 — Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <WasleenGarageLogo size={36} inverted showWordmark />
            </div>
            <p className="text-sm leading-relaxed text-text-secondary">
              Architectural-grade retractable carports engineered in Dubai.
              Premium protection for your vehicles with intelligent automation.
            </p>
          </div>

          {/* Column 2 — Products */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Products
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/product" className="text-sm text-text-secondary transition-colors hover:text-accent-gold">
                  Foldable Premium Garage
                </Link>
              </li>
              <li>
                <Link href="/brochure" className="text-sm text-text-secondary transition-colors hover:text-accent-gold">
                  Brochure
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-sm text-text-secondary transition-colors hover:text-accent-gold">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-sm text-text-secondary transition-colors hover:text-accent-gold">
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Support */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Support
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/warranty" className="text-sm text-text-secondary transition-colors hover:text-accent-gold">
                  Warranty Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-text-secondary transition-colors hover:text-accent-gold">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-text-secondary transition-colors hover:text-accent-gold">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-text-secondary transition-colors hover:text-accent-gold">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-primary">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary transition-colors hover:text-accent-gold"
                >
                  +971 54 233 0837
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_EMAIL}`}
                  className="text-sm text-text-secondary transition-colors hover:text-accent-gold"
                >
                  {COMPANY_EMAIL}
                </a>
              </li>
              <li className="text-sm text-text-tertiary">Dubai, United Arab Emirates</li>
              <li className="text-sm text-text-tertiary">Sat–Thu: 9AM – 7PM</li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="relative z-10 border-t border-border-subtle">
        <Container className="flex flex-col items-center justify-between py-6 md:flex-row">
          <p className="text-xs text-text-tertiary">
            Designed by{' '}
            <a
              href="https://www.wasleen.com/wasleen-digital"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-accent-gold via-accent-cyan to-accent-violet bg-[length:200%_auto] bg-clip-text text-transparent animate-gradientX"
            >
              WASLEEN DIGITAL SOLUTIONS
            </a>
            . All rights reserved. © {currentYear}
          </p>
          <div className="mt-4 flex gap-6 md:mt-0">
            <Link href="/warranty" className="text-xs text-text-tertiary transition-colors hover:text-text-secondary">
              Warranty
            </Link>
            <Link href="/returns" className="text-xs text-text-tertiary transition-colors hover:text-text-secondary">
              Returns
            </Link>
            <Link href="/terms" className="text-xs text-text-tertiary transition-colors hover:text-text-secondary">
              Terms
            </Link>
            <Link href="/privacy" className="text-xs text-text-tertiary transition-colors hover:text-text-secondary">
              Privacy
            </Link>
          </div>
        </Container>
      </div>
    </footer>
  );
}
