'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { pushGTMEvent } from '@/lib/gtm';

interface ContactFormData {
  fullName: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_FORM: ContactFormData = {
  fullName: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
};

const CONTACT_INFO = [
  {
    label: 'Phone',
    value: '+971 54 233 0837',
    href: 'tel:+971542330837',
  },
  {
    label: 'Email',
    value: 'info@wasleen.com',
    href: 'mailto:info@wasleen.com',
  },
  {
    label: 'Location',
    value: 'Dubai, United Arab Emirates',
    href: null,
  },
  {
    label: 'Hours',
    value: 'Sat–Thu: 9:00 AM – 7:00 PM',
    href: null,
  },
];

/**
 * Client component — Contact form with validation and Supabase submission.
 */
export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateField = (field: keyof ContactFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    pushGTMEvent('quote_details_submitted', {});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          phone: form.phone,
          email: form.email,
          emirate: form.subject || 'Dubai',
          propertyType: 'Villa',
          message: form.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Submission failed');
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-bg-primary pt-24">
        <section className="flex min-h-[50vh] items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-[480px] text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent-gold/10">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path
                  d="M8 20L17 29L32 11"
                  stroke="#C9A84C"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h1 className="font-sans text-[clamp(1.5rem,2.5vw,2rem)] font-semibold text-text-primary">
              Message Sent Successfully
            </h1>
            <p className="mt-3 text-text-secondary">
              Thank you for reaching out. We will get back to you within 24 hours.
            </p>
            <Link
              href="/"
              className="mt-6 inline-block text-sm text-accent-gold underline transition-colors hover:text-accent-gold-hover"
            >
              Back to Homepage
            </Link>
          </motion.div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg-primary pt-24">
      <section className="px-4 py-12 md:py-20">
        <div className="mx-auto max-w-[1200px]">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.1] text-text-primary">
              Get in Touch
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
              Have a question about our foldable garages? We are here to help.
              Reach out and our team will respond promptly.
            </p>
          </div>

          <div className="flex flex-col gap-12 lg:flex-row">
            {/* Form column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-tertiary"
                    >
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className="w-full rounded-xl border border-border-subtle bg-bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-gold focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-tertiary"
                    >
                      Phone *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="w-full rounded-xl border border-border-subtle bg-bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-gold focus:outline-none"
                      placeholder="+971 5X XXX XXXX"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-tertiary"
                  >
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full rounded-xl border border-border-subtle bg-bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-gold focus:outline-none"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-tertiary"
                  >
                    Subject *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => updateField('subject', e.target.value)}
                    className="w-full rounded-xl border border-border-subtle bg-bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-gold focus:outline-none"
                    placeholder="How can we help?"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-text-tertiary"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    className="w-full resize-none rounded-xl border border-border-subtle bg-bg-card px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-gold focus:outline-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {error && <p className="text-sm text-error">{error}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-accent-gold px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-accent-gold-hover disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>

            {/* Contact info column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="w-full lg:w-[380px] lg:shrink-0"
            >
              <div className="space-y-6">
                {/* Contact details */}
                <div className="space-y-4">
                  {CONTACT_INFO.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-border-subtle bg-bg-card p-4"
                    >
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-text-primary transition-colors hover:text-accent-gold"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-text-primary">{item.value}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <div className="rounded-xl border border-border-subtle bg-bg-card p-5 text-center">
                  <p className="mb-3 text-sm text-text-secondary">
                    Prefer instant messaging?
                  </p>
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20BD5A]"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Chat on WhatsApp
                  </a>
                </div>

                {/* Map placeholder */}
                <div className="overflow-hidden rounded-xl border border-border-subtle bg-bg-card">
                  <div className="flex h-[200px] items-center justify-center bg-bg-secondary">
                    <div className="text-center">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="mx-auto mb-2 text-text-tertiary"
                      >
                        <path
                          d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <p className="text-xs text-text-tertiary">
                        Dubai, United Arab Emirates
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
