'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EMIRATES, PROPERTY_TYPES } from '@/lib/constants';
import { isValidUAAPhone, isValidEmail } from '@/lib/utils';
import { pushGTMEvent } from '@/lib/gtm';
import type { QuoteFormData, Emirate, PropertyType } from '@/lib/types';

interface StepPersonalDetailsProps {
  data: QuoteFormData;
  onUpdate: (updates: Partial<QuoteFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

/**
 * Step 3 of the quote configurator.
 * Collects personal details and submits the quote.
 */
export function StepPersonalDetails({
  data,
  onUpdate,
  onSubmit,
  onBack,
  isSubmitting,
}: StepPersonalDetailsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = 'Name is required';
    }
    if (!data.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!isValidUAAPhone(data.phone)) {
      newErrors.phone = 'Enter a valid UAE phone number';
    }
    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(data.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!data.emirate) {
      newErrors.emirate = 'Select an emirate';
    }
    if (!data.propertyType) {
      newErrors.propertyType = 'Select property type';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    pushGTMEvent('quote_details_submitted', {});
    onSubmit();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      {/* Full Name */}
      <div>
        <label htmlFor="quote-name" className="mb-1.5 block text-sm font-medium text-text-secondary">
          Full Name *
        </label>
        <input
          id="quote-name"
          type="text"
          value={data.fullName}
          onChange={(e) => onUpdate({ fullName: e.target.value })}
          className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/50 backdrop-blur-sm transition-all focus:outline-none ${
            errors.fullName ? 'border-error ring-1 ring-error/20' : 'border-white/10 focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20'
          }`}
          placeholder="Your full name"
        />
        {errors.fullName && <p className="mt-1 text-xs text-error">{errors.fullName}</p>}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="quote-phone" className="mb-1.5 block text-sm font-medium text-text-secondary">
          Phone Number *
        </label>
        <input
          id="quote-phone"
          type="tel"
          value={data.phone}
          onChange={(e) => onUpdate({ phone: e.target.value })}
          className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/50 backdrop-blur-sm transition-all focus:outline-none ${
            errors.phone ? 'border-error ring-1 ring-error/20' : 'border-white/10 focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20'
          }`}
          placeholder="+971 50 123 4567"
        />
        {errors.phone && <p className="mt-1 text-xs text-error">{errors.phone}</p>}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="quote-email" className="mb-1.5 block text-sm font-medium text-text-secondary">
          Email Address *
        </label>
        <input
          id="quote-email"
          type="email"
          value={data.email}
          onChange={(e) => onUpdate({ email: e.target.value })}
          className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/50 backdrop-blur-sm transition-all focus:outline-none ${
            errors.email ? 'border-error ring-1 ring-error/20' : 'border-white/10 focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20'
          }`}
          placeholder="your@email.com"
        />
        {errors.email && <p className="mt-1 text-xs text-error">{errors.email}</p>}
      </div>

      {/* Emirate + Property Type */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="quote-emirate" className="mb-1.5 block text-sm font-medium text-text-secondary">
            Emirate *
          </label>
          <select
            id="quote-emirate"
            value={data.emirate}
            onChange={(e) => onUpdate({ emirate: e.target.value as Emirate })}
            className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-text-primary backdrop-blur-sm transition-all focus:outline-none ${
              errors.emirate ? 'border-error ring-1 ring-error/20' : 'border-white/10 focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20'
            }`}
          >
            <option value="">Select...</option>
            {EMIRATES.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
          {errors.emirate && <p className="mt-1 text-xs text-error">{errors.emirate}</p>}
        </div>
        <div>
          <label htmlFor="quote-property" className="mb-1.5 block text-sm font-medium text-text-secondary">
            Property Type *
          </label>
          <select
            id="quote-property"
            value={data.propertyType}
            onChange={(e) => onUpdate({ propertyType: e.target.value as PropertyType })}
            className={`w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-text-primary backdrop-blur-sm transition-all focus:outline-none ${
              errors.propertyType ? 'border-error ring-1 ring-error/20' : 'border-white/10 focus:border-accent-gold/50 focus:ring-1 focus:ring-accent-gold/20'
            }`}
          >
            <option value="">Select...</option>
            {PROPERTY_TYPES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          {errors.propertyType && <p className="mt-1 text-xs text-error">{errors.propertyType}</p>}
        </div>
      </div>

      {/* Message (optional) */}
      <div>
        <label htmlFor="quote-message" className="mb-1.5 block text-sm font-medium text-text-secondary">
          Additional Notes (optional)
        </label>
        <textarea
          id="quote-message"
          rows={3}
          value={data.message || ''}
          onChange={(e) => onUpdate({ message: e.target.value })}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary/50 backdrop-blur-sm transition-all focus:border-accent-gold/50 focus:outline-none focus:ring-1 focus:ring-accent-gold/20"
          placeholder="Any specific requirements..."
        />
      </div>

      {/* Navigation */}
      <div className="flex gap-4 pt-2">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] py-3.5 text-center font-medium text-text-secondary backdrop-blur-sm transition-colors hover:border-white/20 disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-[2] rounded-xl bg-accent-gold py-3.5 text-center font-semibold text-black transition-colors hover:bg-accent-gold-hover disabled:opacity-50"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
        </button>
      </div>
    </motion.div>
  );
}
