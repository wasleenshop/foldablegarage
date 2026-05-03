'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastProps {
  toast: ToastMessage | null;
  duration?: number;
  onDismiss?: () => void;
}

const ICON_MAP: Record<ToastType, React.ReactNode> = {
  success: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6 10.5L8.5 13L14 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  error: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 7L13 13M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9.5V14M10 7V7.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const COLOR_MAP: Record<ToastType, string> = {
  success: 'border-success/30 text-success',
  error: 'border-error/30 text-error',
  info: 'border-accent-cyan/30 text-accent-cyan',
};

const BG_MAP: Record<ToastType, string> = {
  success: 'bg-success/10',
  error: 'bg-error/10',
  info: 'bg-accent-cyan/10',
};

/**
 * Toast notification component with auto-dismiss.
 */
export function Toast({ toast, duration = 4000, onDismiss }: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (toast) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(() => onDismiss?.(), 300);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [toast, duration, onDismiss]);

  return (
    <AnimatePresence>
      {toast && visible && (
        <motion.div
          className={cn(
            'pointer-events-auto fixed bottom-6 right-6 z-[9999] flex max-w-sm items-start gap-3 rounded-xl border p-4 shadow-xl backdrop-blur-md',
            COLOR_MAP[toast.type],
            BG_MAP[toast.type]
          )}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          role="alert"
        >
          <span className="mt-0.5 shrink-0">{ICON_MAP[toast.type]}</span>
          <div className="flex-1">
            <p className="text-sm font-semibold text-text-primary">
              {toast.title}
            </p>
            {toast.message && (
              <p className="mt-1 text-xs text-text-secondary">
                {toast.message}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              setVisible(false);
              setTimeout(() => onDismiss?.(), 300);
            }}
            className="shrink-0 text-text-tertiary transition-colors hover:text-text-primary"
            aria-label="Dismiss"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 3L11 11M11 3L3 11" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export type { ToastMessage, ToastType };
