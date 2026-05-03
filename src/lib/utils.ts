import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ProductConfig } from './types';
import { PRICING } from './constants';

// ═══════════════════════════════════════════════════
// Wasleen Foldable Garage — Utility Functions
// ═══════════════════════════════════════════════════

/**
 * Merges Tailwind CSS classes, resolving conflicts.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates total price based on product configuration.
 */
export function calculatePrice(config: ProductConfig): number {
  const area = config.width * config.length;
  const roofRate =
    config.roofType === 'polycarbonate'
      ? PRICING.polycarbonateRate
      : PRICING.glassRate;

  let total = area * roofRate;

  if (config.hasAutomaticSystem) total += PRICING.automaticSystemPrice;
  if (config.hasRollerShutter) total += PRICING.rollerShutterPrice;
  if (config.hasGlassTint && config.roofType === 'glass')
    total += area * PRICING.glassTintRate;

  return total;
}

/**
 * Formats a number as AED currency.
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats a date string to relative time (e.g., "2 months ago").
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  return 'just now';
}

/**
 * Generates WhatsApp URL with optional pre-filled message.
 */
export function getWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/**
 * Pushes an event to the GTM dataLayer.
 */
export function pushGTMEvent(event: string, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event, ...data });
  }
}

/**
 * Validates UAE phone number format.
 */
export function isValidUAAPhone(phone: string): boolean {
  // Accept formats: 0501234567, +971501234567, 971501234567
  const cleaned = phone.replace(/\s/g, '');
  return /^(\+?971|0)?5[0-9]{8}$/.test(cleaned);
}

/**
 * Validates email format.
 */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Truncates text to a specified length with ellipsis.
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '…';
}
