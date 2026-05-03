'use client';

import { useEffect } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
});

/**
 * Global error boundary — catches errors in the root layout itself.
 * Must include its own <html> and <body> tags since the root layout failed.
 * Displays a branded error screen with navigation options.
 */
export default function GlobalErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Wasleen — Global error caught:', error);
  }, [error]);

  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body
        className={`${plusJakartaSans.className} antialiased`}
        style={{
          margin: 0,
          backgroundColor: '#0A0A0A',
          color: '#FFFFFF',
        }}
      >
        <main
          style={{
            display: 'flex',
            minHeight: '100vh',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 16px',
          }}
        >
          <div style={{ maxWidth: '480px', textAlign: 'center' }}>
            {/* Gold accent line */}
            <div
              style={{
                margin: '0 auto 32px',
                height: '1px',
                width: '64px',
                backgroundColor: '#C9A84C',
              }}
            />

            <h1
              style={{
                fontFamily: 'var(--font-plus-jakarta-sans), sans-serif',
                fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
                fontWeight: 600,
                lineHeight: 1.1,
                color: '#FFFFFF',
                margin: 0,
              }}
            >
              Something went wrong
            </h1>

            <p
              style={{
                marginTop: '16px',
                fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                lineHeight: 1.6,
                color: '#999999',
              }}
            >
              We encountered an unexpected issue. Our team has been notified.
              Please try refreshing the page, or return to the homepage.
            </p>

            <div
              style={{
                marginTop: '32px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              <button
                onClick={reset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#C9A84C',
                  color: '#000000',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#D4B85A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#C9A84C';
                }}
              >
                Try Again
              </button>

              <a
                href="/"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  border: '1px solid #2A2A2A',
                  color: '#FFFFFF',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1A1A1A';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Back to Home
              </a>
            </div>

            {error.digest && (
              <p
                style={{
                  marginTop: '32px',
                  fontSize: '0.75rem',
                  color: '#666666',
                }}
              >
                Error reference: {error.digest}
              </p>
            )}
          </div>
        </main>
      </body>
    </html>
  );
}
