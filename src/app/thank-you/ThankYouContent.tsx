'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { pushGTMEvent } from '@/lib/gtm';

const STEPS = [
  {
    title: 'Order Review',
    description:
      'Our team reviews your configuration and checks product availability.',
    duration: 'Within 24 hours',
  },
  {
    title: 'Confirmation Call',
    description:
      'A Wasleen specialist calls to confirm details, answer questions, and schedule installation.',
    duration: '24–48 hours',
  },
  {
    title: 'Installation Scheduled',
    description:
      'We coordinate delivery and professional installation at your convenience.',
    duration: 'Within 7 days',
  },
];

/**
 * Client component for the thank-you landing page.
 * Reads orderId from URL search params and displays a success confirmation.
 */
export function ThankYouContent() {
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('orderId');
    if (id) setOrderId(id);

    pushGTMEvent('deposit_completed', { orderId: id || undefined });
  }, []);

  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero section */}
      <section className="flex min-h-[60vh] items-center justify-center px-4 pt-24">
        <div className="mx-auto max-w-[600px] text-center">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-accent-gold/10"
          >
            <motion.svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.path
                d="M10 24L20 34L38 14"
                stroke="#C9A84C"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              />
            </motion.svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.1] text-text-primary"
          >
            Thank You for Your Enquiry
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-text-secondary"
          >
            Your foldable garage configuration has been received. A Wasleen
            specialist will contact you shortly.
          </motion.p>

          {/* Order ID */}
          {orderId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 inline-block rounded-lg border border-border-subtle bg-bg-card px-6 py-3"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                Reference
              </span>
              <p className="mt-1 font-mono text-lg font-bold text-accent-gold">
                #{orderId.slice(0, 8).toUpperCase()}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Next steps */}
      <section className="px-4 pb-24">
        <div className="mx-auto max-w-[800px]">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center font-sans text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-[1.2] text-text-primary"
          >
            What Happens Next
          </motion.h2>

          <div className="space-y-8">
            {STEPS.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative flex gap-6"
              >
                {/* Step number */}
                <div className="flex shrink-0 flex-col items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-gold text-sm font-bold text-black">
                    {index + 1}
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className="mt-2 h-full w-px bg-border-subtle" />
                  )}
                </div>

                {/* Step content */}
                <div className="pb-8">
                  <h3 className="font-sans text-lg font-semibold text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-text-secondary">
                    {step.description}
                  </p>
                  <span className="mt-2 inline-block text-xs font-medium text-accent-gold">
                    {step.duration}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="border-t border-border-subtle px-4 py-12">
        <div className="mx-auto flex max-w-[400px] flex-col items-center gap-4 text-center">
          <p className="text-sm text-text-secondary">
            Have questions in the meantime?
          </p>

          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20BD5A]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>

          <Link
            href="/"
            className="text-sm text-text-tertiary underline transition-colors hover:text-text-secondary"
          >
            Back to Homepage
          </Link>
        </div>
      </section>
    </main>
  );
}
