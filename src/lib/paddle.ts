import { initializePaddle } from '@paddle/paddle-js';
import { pushGTMEvent } from '@/lib/gtm';
import type { Paddle } from '@paddle/paddle-js';

/**
 * Paddle SDK singleton.
 * Initialised on first call and cached for subsequent calls.
 */
let paddleInstance: Paddle | undefined;

/**
 * Returns the Paddle SDK instance, initialising it if necessary.
 * Uses sandbox environment by default; switch to 'production' for live.
 */
export async function getPaddle(): Promise<Paddle | undefined> {
  if (paddleInstance) return paddleInstance;

  paddleInstance = await initializePaddle({
    environment:
      (process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT as 'sandbox' | 'production') ||
      'sandbox',
    token: process.env.NEXT_PUBLIC_PADDLE_TOKEN!,
  });

  return paddleInstance;
}

/**
 * Opens the Paddle checkout overlay for a single price item.
 *
 * Defaults to the product price ID from `NEXT_PUBLIC_PADDLE_PRICE_ID`.
 * Falls back to a normal redirect to `/thank-you` if Paddle fails.
 *
 * @param priceId    - Paddle price ID (defaults to env var)
 * @param customData - Data passed back to the webhook (leadId, orderId, etc.)
 * @param successUrl - Redirect URL after successful payment
 */
export async function openPaddleCheckout({
  priceId,
  customData,
  successUrl,
}: {
  priceId?: string;
  customData?: Record<string, string | number | boolean>;
  successUrl?: string;
}) {
  try {
    const paddle = await getPaddle();

    if (!paddle) {
      console.error('Paddle failed to initialise');
      window.location.href = successUrl || '/thank-you';
      return;
    }

    pushGTMEvent('deposit_started', {
      ...customData,
    });

    paddle.Checkout.open({
      items: [
        {
          priceId:
            priceId || process.env.NEXT_PUBLIC_PADDLE_PRICE_ID!,
          quantity: 1,
        },
      ],
      customData,
      settings: {
        displayMode: 'overlay',
        successUrl:
          successUrl || `${window.location.origin}/thank-you`,
      },
    });
  } catch (error) {
    console.error('Paddle checkout error:', error);
    // Fallback redirect so the user still lands on thank-you
    window.location.href = successUrl || '/thank-you';
  }
}
