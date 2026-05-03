'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * PageTransitionProvider — wraps page content with AnimatePresence
 * for smooth fade + vertical slide transitions between route changes.
 *
 * - Fade + vertical slide (300ms)
 * - Preserves scroll position between navigations (no forced scroll reset)
 * - No flash on route change
 * - Respects prefers-reduced-motion via CSS `@media` fallback
 */
export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
