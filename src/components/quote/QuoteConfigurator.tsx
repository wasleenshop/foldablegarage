'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StepSizeAndRoof } from './StepSizeAndRoof';
import { StepColourAndOptions } from './StepColourAndOptions';
import { StepPersonalDetails } from './StepPersonalDetails';
import { PriceSummary } from './PriceSummary';
import { pushGTMEvent } from '@/lib/gtm';
import { openPaddleCheckout } from '@/lib/paddle';
import { calculatePrice } from '@/lib/utils';
import type { ProductConfig, QuoteFormData, ColourOption, RoofType } from '@/lib/types';

const INITIAL_CONFIG: ProductConfig = {
  width: 4,
  length: 8,
  roofType: 'polycarbonate',
  colour: 'medium-smoke',
  hasAutomaticSystem: false,
  hasRollerShutter: false,
  hasGlassTint: false,
};

const INITIAL_FORM: QuoteFormData = {
  fullName: '',
  phone: '',
  email: '',
  emirate: 'Dubai',
  propertyType: 'Villa',
  message: '',
};

const STEP_LABELS = ['Size & Roof', 'Colour & Options', 'Your Details'];

/**
 * 3-Step quote configurator — the money page.
 * Manages step navigation, config state, and submission.
 */
export function QuoteConfigurator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [config, setConfig] = useState<ProductConfig>(INITIAL_CONFIG);
  const [form, setForm] = useState<QuoteFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateConfig = useCallback((updates: Partial<ProductConfig>) => {
    setConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateForm = useCallback((updates: Partial<QuoteFormData>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    pushGTMEvent('quote_details_submitted', {});

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          config,
          form,
        }),
      });

      if (!res.ok) throw new Error('Submission failed');

      const data = await res.json();

      // Open Paddle Billing checkout via server-side transaction
      await openPaddleCheckout({
        config: config as unknown as Record<string, unknown>,
        totalPrice: calculatePrice(config),
        customerEmail: form.email,
        customerName: form.fullName,
      });
    } catch {
      // Fallback: redirect to thank-you page
      window.location.href = '/thank-you';
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / 3) * 100;

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 md:py-20 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Main configurator */}
          <div className="flex-1">
          {/* Step indicators */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {STEP_LABELS.map((label, index) => (
                <button
                  key={label}
                  onClick={() => {
                    if (index < currentStep) setCurrentStep(index);
                  }}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                    index === currentStep
                      ? 'text-accent-gold'
                      : index < currentStep
                      ? 'text-text-primary cursor-pointer'
                      : 'text-text-tertiary cursor-default'
                  }`}
                  disabled={index > currentStep}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                      index === currentStep
                        ? 'bg-accent-gold text-black'
                        : index < currentStep
                        ? 'bg-accent-gold/20 text-accent-gold'
                        : 'bg-white/5 text-text-tertiary'
                    }`}
                  >
                    {index < currentStep ? '✓' : index + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full bg-accent-gold transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step content — Glassmorphism card */}
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 md:p-8">
            {/* Subtle top shimmer */}
            <div className="pointer-events-none absolute -inset-x-full top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmerSlide_3s_ease-in-out_infinite]" />
            
            {/* Animated architectural SVG background */}
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <object
                data="/foldable-garage-svg.svg"
                type="image/svg+xml"
                className="h-full w-full object-cover"
                aria-label=""
              />
            </div>

            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {currentStep === 0 && (
                  <StepSizeAndRoof
                    key="step-0"
                    config={config}
                    onUpdate={updateConfig}
                    onNext={handleNext}
                  />
                )}
                {currentStep === 1 && (
                  <StepColourAndOptions
                    key="step-1"
                    config={config}
                    onUpdate={updateConfig}
                    onNext={handleNext}
                    onBack={handleBack}
                  />
                )}
                {currentStep === 2 && (
                  <StepPersonalDetails
                    key="step-2"
                    data={form}
                    onUpdate={updateForm}
                    onSubmit={handleSubmit}
                    onBack={handleBack}
                    isSubmitting={isSubmitting}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Price summary sidebar */}
        <div className="w-full lg:w-[340px] lg:shrink-0">
          <div className="sticky top-24 space-y-4">
            <PriceSummary config={config} />

            {/* Trust signals — Glassmorphism */}
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
              <div className="pointer-events-none absolute -right-10 -top-10 h-20 w-20 rounded-full bg-accent-gold/5 blur-[40px]" />
              <div className="relative z-10">
                <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary">
                  Why Wasleen?
                </h4>
                <ul className="space-y-2">
                  {[
                    '6063-T5 aluminium construction',
                    '15-year PVDF coating warranty',
                    'Free delivery across UAE',
                    'Professional installation team',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-text-secondary">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="mt-0.5 shrink-0 text-accent-gold"
                      >
                        <path
                          d="M10 3L4.5 8.5L2 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contact support — Glassmorphism */}
            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">
              <div className="relative z-10">
                <p className="text-xs text-text-tertiary">
                  Need help?{' '}
                  <a
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-gold transition-colors hover:text-accent-gold-hover"
                  >
                    Chat on WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
