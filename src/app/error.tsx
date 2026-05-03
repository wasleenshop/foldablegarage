'use client';

import { useEffect } from 'react';
import Link from 'next/link';

/**
 * Error boundary for the root layout's page content.
 * Catches client-side exceptions in the page component tree
 * and displays a branded error UI instead of a blank white screen.
 */
export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error for diagnostics
    console.error('Wasleen — Page error caught by error boundary:', error);

    // Push error event to dataLayer for GTM tracking
    window.dataLayer?.push({
      event: 'error_boundary_caught',
      digest: error.digest,
      message: error.message,
      url: typeof window !== 'undefined' ? window.location.href : '',
    });
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-primary px-4">
      <div className="mx-auto max-w-[480px] text-center">
        {/* Gold accent line */}
        <div className="mx-auto mb-8 h-px w-16 bg-accent-gold" />

        <h1 className="font-heading text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.1] text-primary-text">
          Something went wrong
        </h1>

        <p className="mt-4 text-[clamp(0.875rem,1vw,1rem)] leading-relaxed text-secondary-text">
          We encountered an unexpected issue. Our team has been notified.
          Please try again, or return to the homepage.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-lg bg-accent-gold px-6 py-3 text-[0.9375rem] font-semibold text-black transition-all duration-300 hover:bg-accent-gold-hover"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-border-subtle px-6 py-3 text-[0.9375rem] font-semibold text-primary-text transition-all duration-300 hover:bg-card-bg"
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-8 text-xs text-tertiary-text">
          Error reference: {error.digest ?? 'N/A'}
        </p>
      </div>
    </main>
  );
}
