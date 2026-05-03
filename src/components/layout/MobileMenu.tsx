'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { WasleenGarageLogo } from './Logo';
import { Button } from '@/components/ui/Button';
import { NAV_LINKS } from '@/lib/constants';

interface MobileMenuProps {
  onClose: () => void;
}

/**
 * Full-height slide-in mobile navigation drawer.
 */
export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-50 bg-black/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <motion.div
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-bg-primary border-l border-border-subtle"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border-subtle px-6 py-4">
          <WasleenGarageLogo size={32} inverted />
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-text-secondary hover:text-text-primary"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1 px-6 py-8">
          {NAV_LINKS.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className="block rounded-lg px-4 py-3 text-lg font-medium text-text-secondary transition-colors hover:bg-white/5 hover:text-text-primary"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* CTA */}
        <div className="border-t border-border-subtle px-6 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              href="/quote"
              onClick={onClose}
            >
              Get a Quote
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}
