'use client';

// ═══════════════════════════════════════════════════
// BrochurePage — Stunning Web Brochure Landing Page
// ═══════════════════════════════════════════════════
//
// Features:
// - Immersive hero with kinetic background + cascading text
// - Brochure preview carousel/grid
// - Lead capture form (name, email, phone)
// - WhatsApp CTA
// - GTM event on download
// - Framer Motion staggered reveals

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { pushGTMEvent } from '@/lib/gtm';
import { WHATSAPP_LINK, WHATSAPP_NUMBER, SITE_URL, FEATURES, COLOURS, STATS } from '@/lib/constants';

// ─── Animation Variants ────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ─── Form State ────────────────────────────────────

interface FormState {
  name: string;
  email: string;
  phone: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

// ─── Component ─────────────────────────────────────

export function BrochurePage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = useCallback(
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
      },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!form.email) {
        setErrorMsg('Email is required');
        return;
      }

      setStatus('loading');
      setErrorMsg('');

      try {
        const res = await fetch('/api/brochure', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Download failed');
        }

        // Push GTM event
        pushGTMEvent('brochure_downloaded', {
          email: form.email,
          name: form.name,
        });

        // Trigger PDF download
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'wasleen-foldable-garage-brochure.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        setStatus('success');
      } catch (err) {
        setStatus('error');
        setErrorMsg(
          err instanceof Error ? err.message : 'Something went wrong'
        );
      }
    },
    [form]
  );

  // ── Format WhatsApp number for display ───────────
  const displayPhone = `+${WHATSAPP_NUMBER.slice(0, 3)} ${WHATSAPP_NUMBER.slice(3, 5)} ${WHATSAPP_NUMBER.slice(5, 8)} ${WHATSAPP_NUMBER.slice(8)}`;

  return (
    <main className="relative bg-bg-primary min-h-screen overflow-hidden">
      {/* ═══ HERO SECTION ═══ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Kinetic background */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary">
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `
                linear-gradient(135deg, #00D4FF 1px, transparent 1px),
                linear-gradient(225deg, #7C3AED 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px, 100px 100px',
            }}
          />
          {/* Radial glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-gold/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-accent-cyan/5 rounded-full blur-[100px]" />
        </div>

        <Container className="relative z-10 pt-24 pb-16">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Eyebrow */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 mb-6"
              variants={fadeUp}
              custom={0}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
              <span className="text-[0.7rem] font-semibold tracking-[0.2em] text-accent-gold uppercase">
                Company Brochure
              </span>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              className="text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] text-text-primary mb-4 tracking-[-0.02em]"
              variants={fadeUp}
              custom={1}
            >
              Everything You Need{'\n'}
              <span className="text-accent-gold">to Know</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              className="text-[clamp(1rem,1.5vw,1.25rem)] text-text-secondary max-w-2xl mx-auto mb-8 leading-relaxed"
              variants={fadeUp}
              custom={2}
            >
              12 pages of premium engineering, colour options, technical specs,
              and pricing — all in one beautifully designed PDF.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={fadeUp}
              custom={3}
            >
              {/* Scroll to download form */}
              <a
                href="#download-form"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent-gold text-bg-primary font-semibold text-[0.9375rem] hover:bg-accent-gold-hover transition-all duration-200 shadow-lg shadow-accent-gold/20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download Free Brochure
              </a>

              {/* WhatsApp CTA */}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushGTMEvent('whatsapp_clicked', { source: 'brochure-hero' })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-whatsapp text-white font-semibold text-[0.9375rem] hover:bg-[#20BD5C] transition-all duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {displayPhone}
              </a>
            </motion.div>

            {/* Trust markers */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-6 mt-10 text-text-tertiary text-xs"
              variants={fadeUp}
              custom={4}
            >
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Free Download
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                No Spam
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                12 Pages
              </span>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ═══ BROCHURE PREVIEW ═══ */}
      <section className="relative py-24 bg-bg-secondary">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-[0.6rem] font-semibold tracking-[0.2em] text-accent-gold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
                Preview
              </span>
            </motion.div>
            <SectionHeading
              title="What's Inside the Brochure"
              subtitle="A complete guide to Wasleen's premium retractable carports — from engineering specs to colour selection."
            />

            {/* Preview cards */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12"
              variants={staggerContainer}
            >
              {/* Card 1: Cover Preview */}
              <motion.div
                className="relative group cursor-pointer rounded-xl overflow-hidden bg-bg-card border border-border-subtle hover:border-accent-gold/40 transition-all duration-500"
                variants={scaleIn}
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <Image
                    src="/images/foldable-garage-wasleen-pergolas-dubai-hero-image.webp"
                    alt="Brochure cover preview"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/30 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[0.6rem] font-semibold tracking-[0.15em] text-accent-gold uppercase">
                      Cover
                    </span>
                    <h3 className="text-lg font-bold text-text-primary mt-1">
                      Wasleen Foldable Garage
                    </h3>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Premium Retractable Carports
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Card 2: About & Stats */}
              <motion.div
                className="relative group cursor-pointer rounded-xl overflow-hidden bg-bg-card border border-border-subtle hover:border-accent-gold/40 transition-all duration-500"
                variants={scaleIn}
              >
                <div className="p-6 h-full flex flex-col">
                  <span className="text-[0.6rem] font-semibold tracking-[0.15em] text-accent-gold uppercase mb-3">
                    About
                  </span>
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    Who We Are
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
                    Dubai-based manufacturer of German-engineered retractable
                    carports using 6063-T5 aluminium with Kynar 500® coating.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {STATS.slice(0, 4).map((stat) => (
                      <div key={stat.label} className="bg-bg-secondary rounded-lg p-3 text-center">
                        <span className="text-xl font-bold text-accent-gold block">
                          {'prefix' in stat ? stat.prefix || '' : ''}{stat.value}{'suffix' in stat ? stat.suffix || '' : ''}
                        </span>
                        <span className="text-[0.6rem] text-text-tertiary uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Card 3: Specs Preview */}
              <motion.div
                className="relative group cursor-pointer rounded-xl overflow-hidden bg-bg-card border border-border-subtle hover:border-accent-gold/40 transition-all duration-500"
                variants={scaleIn}
              >
                <div className="p-6 h-full flex flex-col">
                  <span className="text-[0.6rem] font-semibold tracking-[0.15em] text-accent-gold uppercase mb-3">
                    Specifications
                  </span>
                  <h3 className="text-lg font-bold text-text-primary mb-2">
                    Technical Details
                  </h3>
                  <div className="space-y-2 flex-1">
                    {[
                      { label: 'Structure', value: '6063-T5 Aluminium' },
                      { label: 'Finish', value: 'Kynar 500® PVDF' },
                      { label: 'Wind Load', value: '120 km/h rated' },
                      { label: 'UV Protection', value: '99.9%' },
                      { label: 'Warranty', value: '5 Years Structural' },
                      { label: 'Delivery', value: '< 60 Days' },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center justify-between py-1.5 border-b border-border-subtle/50 last:border-0"
                      >
                        <span className="text-xs text-text-tertiary">{s.label}</span>
                        <span className="text-xs text-text-primary font-medium">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ═══ FEATURES HIGHLIGHTS ═══ */}
      <section className="relative py-24 bg-bg-primary">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-[0.6rem] font-semibold tracking-[0.2em] text-accent-gold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
                Features
              </span>
            </motion.div>
            <SectionHeading
              title="Engineering Excellence"
              subtitle="Every detail engineered for the UAE climate — from precision rails to smart automation."
            />

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12"
              variants={staggerContainer}
            >
              {FEATURES.map((feature) => (
                <motion.div
                  key={feature.id}
                  className="p-6 rounded-xl bg-bg-card border border-border-subtle hover:border-accent-gold/30 transition-all duration-300"
                  variants={fadeUp}
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-gold/10 flex items-center justify-center mb-4">
                    <svg className="w-5 h-5 text-accent-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-text-primary mb-2">{feature.title}</h3>
                  <ul className="space-y-1.5">
                    {feature.specs.map((spec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-accent-gold flex-shrink-0" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ═══ COLOUR OPTIONS ═══ */}
      <section className="relative py-24 bg-bg-secondary">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-[0.6rem] font-semibold tracking-[0.2em] text-accent-gold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
                Colours
              </span>
            </motion.div>
            <SectionHeading
              title="5 Premium Finishes"
              subtitle="Choose from five architectural-grade RAL colours, each engineered for Dubai's unique climate."
            />

            <motion.div
              className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12"
              variants={staggerContainer}
            >
              {COLOURS.map((colour) => (
                <motion.div
                  key={colour.id}
                  className="p-5 rounded-xl bg-bg-card border border-border-subtle text-center group hover:border-accent-gold/40 transition-all duration-300"
                  variants={scaleIn}
                >
                  {/* Colour swatch */}
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-3 ring-2 ring-border-subtle group-hover:ring-accent-gold/50 transition-all duration-300"
                    style={{ backgroundColor: colour.hex }}
                  />
                  <h4 className="text-sm font-semibold text-text-primary mb-0.5">
                    {colour.name}
                  </h4>
                  <span className="text-[0.6rem] text-text-tertiary font-mono uppercase tracking-wider">
                    {colour.hex}
                  </span>
                  <p className="text-[0.7rem] text-text-secondary mt-1.5 leading-relaxed">
                    {colour.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ═══ LEAD CAPTURE + DOWNLOAD ═══ */}
      <section
        id="download-form"
        className="relative py-24 bg-bg-primary overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-gold/5 rounded-full blur-[120px]" />

        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="max-w-2xl mx-auto"
          >
            <motion.div className="text-center mb-10" variants={fadeUp}>
              <span className="text-[0.6rem] font-semibold tracking-[0.2em] text-accent-gold uppercase">
                Download Now
              </span>
              <h2 className="text-[clamp(1.75rem,3vw,2.75rem)] font-bold text-text-primary mt-2 mb-3">
                Get Your Free Brochure
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed max-w-lg mx-auto">
                Enter your details below and we'll send you the complete 12-page
                brochure instantly. No spam, no obligation.
              </p>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5"
              variants={fadeUp}
              custom={2}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label htmlFor="brochure-name" className="block text-xs font-medium text-text-secondary mb-1.5 tracking-wide">
                    Full Name
                  </label>
                  <input
                    id="brochure-name"
                    type="text"
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border-subtle text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="brochure-email" className="block text-xs font-medium text-text-secondary mb-1.5 tracking-wide">
                    Email Address <span className="text-accent-gold">*</span>
                  </label>
                  <input
                    id="brochure-email"
                    type="email"
                    value={form.email}
                    onChange={handleChange('email')}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border-subtle text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20 transition-all"
                  />
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label htmlFor="brochure-phone" className="block text-xs font-medium text-text-secondary mb-1.5 tracking-wide">
                  WhatsApp Number <span className="text-text-tertiary">(optional)</span>
                </label>
                <input
                  id="brochure-phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange('phone')}
                  placeholder="+971 50 123 4567"
                  className="w-full px-4 py-3 rounded-lg bg-bg-card border border-border-subtle text-text-primary placeholder:text-text-tertiary text-sm focus:outline-none focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20 transition-all"
                />
              </div>

              {/* Error message */}
              {status === 'error' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-error bg-error/5 border border-error/20 rounded-lg px-4 py-2.5"
                >
                  {errorMsg}
                </motion.p>
              )}

              {/* Success message */}
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">
                    Brochure Downloaded!
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Check your downloads folder for{' '}
                    <span className="text-accent-gold font-medium">
                      wasleen-foldable-garage-brochure.pdf
                    </span>
                  </p>
                </motion.div>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={status === 'loading'}
                  className="w-full"
                  rightIcon={
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  }
                >
                  Download Free Brochure
                </Button>
              )}
            </motion.form>

            {/* WhatsApp alternative */}
            <motion.div
              className="mt-8 text-center"
              variants={fadeUp}
              custom={4}
            >
              <p className="text-xs text-text-tertiary mb-3">
                Prefer to chat? Get the brochure on WhatsApp
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushGTMEvent('whatsapp_clicked', { source: 'brochure-form' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-whatsapp/10 border border-whatsapp/30 text-whatsapp hover:bg-whatsapp/20 transition-all duration-200 text-sm font-semibold"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Send via WhatsApp
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative py-20 bg-bg-secondary">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2
              className="text-[clamp(1.5rem,2.5vw,2.25rem)] font-bold text-text-primary mb-4"
              variants={fadeUp}
            >
              Ready to Protect What Matters?
            </motion.h2>
            <motion.p
              className="text-text-secondary text-sm mb-8 max-w-lg mx-auto"
              variants={fadeUp}
              custom={1}
            >
              Configure your custom carport online in 3 simple steps — or give us
              a call to discuss your project.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              variants={fadeUp}
              custom={2}
            >
              <a
                href="/quote"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent-gold text-bg-primary font-semibold text-[0.9375rem] hover:bg-accent-gold-hover transition-all duration-200"
              >
                Configure Online →
              </a>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => pushGTMEvent('whatsapp_clicked', { source: 'brochure-cta' })}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg border border-border-subtle text-text-primary hover:bg-bg-card transition-all duration-200 text-[0.9375rem] font-semibold"
              >
                <svg className="w-4 h-4 text-whatsapp" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {displayPhone}
              </a>
            </motion.div>
          </motion.div>
        </Container>
      </section>
    </main>
  );
}
