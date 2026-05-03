'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StepSizeAndRoof } from './StepSizeAndRoof';
import { StepColourAndOptions } from './StepColourAndOptions';
import { StepPersonalDetails } from './StepPersonalDetails';
import { PriceSummary } from './PriceSummary';
import { pushGTMEvent } from '@/lib/gtm';
import { openPaddleCheckout } from '@/lib/paddle';
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

      // Open Paddle checkout with lead and order IDs
      await openPaddleCheckout({
        customData: {
          lead_id: data.leadId,
          order_id: data.orderId || '',
        },
        successUrl: `${window.location.origin}/thank-you?orderId=${data.orderId || ''}`,
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
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="font-sans text-[clamp(1.75rem,3vw,2.75rem)] font-semibold leading-[1.1] text-text-primary">
          Configure Your Foldable Garage
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
          Select your dimensions, colour, and options to receive an instant price estimate.
        </p>
      </div>

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
                        : 'bg-bg-card text-text-tertiary'
                    }`}
                  >
                    {index < currentStep ? '✓' : index + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
            {/* Progress bar */}
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-bg-card">
              <div
                className="h-full rounded-full bg-accent-gold transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Step content */}
          <div className="rounded-2xl border border-border-subtle bg-bg-card p-6 md:p-8">
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

        {/* Price summary sidebar */}
        <div className="w-full lg:w-[340px] lg:shrink-0">
          <div className="sticky top-24 space-y-4">
            <PriceSummary config={config} />

            {/* Trust signals */}
            <div className="rounded-xl border border-border-subtle bg-bg-card p-4">
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

            {/* Contact support */}
            <div className="rounded-xl border border-border-subtle bg-bg-card p-4">
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
  );
}
