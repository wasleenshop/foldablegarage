// ═══════════════════════════════════════════════════
// Google Tag Manager — dataLayer Helpers
// ═══════════════════════════════════════════════════

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export type GTMEvent =
  | 'quote_started'
  | 'size_selected'
  | 'type_selected'
  | 'colour_selected'
  | 'quote_details_submitted'
  | 'deposit_started'
  | 'deposit_completed'
  | 'deposit_failed'
  | 'whatsapp_clicked'
  | 'abandoned_quote'
  | 'spec_downloaded'
  | 'video_played'
  | 'brochure_downloaded'
  | 'checkout_viewed'
  | 'config_updated'
  | 'checkout_started'
  | 'purchase_completed';

/**
 * Pushes an event to the GTM dataLayer.
 */
export function pushGTMEvent(event: GTMEvent, data?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({ event, ...data });
  }
}
