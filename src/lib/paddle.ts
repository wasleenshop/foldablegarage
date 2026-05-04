/**
 * Wasleen — Paddle Classic Integration
 *
 * Loads Paddle.js v1 (Classic) from CDN and provides a client-side
 * checkout helper. No server-side API calls needed — the overlay
 * opens directly in the browser with a custom price override.
 *
 * @see https://developer.paddle.com/classic/reference/ZG9jOjI1MzUzOTg3-paddle-reference
 */

// ─── Config ─────────────────────────────────────────

const PADDLE_CDN = 'https://cdn.paddle.com/paddle/paddle.js';
const PADDLE_VENDOR_ID = Number(
  process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID || 61756,
);
const PADDLE_PRODUCT_ID =
  process.env.NEXT_PUBLIC_PADDLE_PRODUCT_ID || 'pro_01kqkgkwv2tban95rpzpfk4a7c';
const PADDLE_CLIENT_TOKEN =
  process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '';
const PADDLE_IS_SANDBOX =
  process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'sandbox';

// ─── Loading / Initialisation ───────────────────────

type PaddleInstance = {
  Environment?: {
    set: (env: string) => void;
  };
  Checkout: {
    open: (options: PaddleCheckoutOptions) => void;
  };
  Setup: (options: { vendor: number; token?: string }) => void;
};

type PaddleCheckoutOptions = {
  product: string | number;
  price?: string;
  quantity?: number;
  success?: string;
  custom?: Record<string, string>;
};

let loadPromise: Promise<PaddleInstance> | null = null;

/**
 * Dynamically loads the Paddle Classic JS from the CDN and initialises it
 * with the Seller ID. Returns the global `Paddle` object once ready.
 *
 * Idempotent — safe to call multiple times.
 */
async function loadPaddle(): Promise<PaddleInstance> {
  if (typeof window === 'undefined') {
    throw new Error('Paddle can only be loaded in the browser');
  }

  // Already loaded and initialised?
  const existing = (window as unknown as { Paddle?: PaddleInstance }).Paddle;
  if (existing?.Checkout?.open) return existing;

  // Already loading? Reuse the promise.
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<PaddleInstance>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = PADDLE_CDN;
    script.async = true;
    script.onload = () => {
      const paddle = (window as unknown as { Paddle?: PaddleInstance }).Paddle;
      if (!paddle) {
        reject(new Error('Paddle script loaded but Paddle global not found'));
        return;
      }

      // Set sandbox environment first (if applicable)
      if (PADDLE_IS_SANDBOX && paddle.Environment?.set) {
        paddle.Environment.set('sandbox');
      }

      // Initialise with the Seller ID + client token
      paddle.Setup({
        vendor: PADDLE_VENDOR_ID,
        ...(PADDLE_CLIENT_TOKEN ? { token: PADDLE_CLIENT_TOKEN } : {}),
      });

      resolve(paddle);
    };
    script.onerror = () => {
      loadPromise = null; // Reset so we can retry
      reject(new Error('Failed to load Paddle.js from CDN'));
    };
    document.head.appendChild(script);
  });

  return loadPromise;
}

// ─── Public API ─────────────────────────────────────

/**
 * Opens the Paddle Classic checkout overlay for the Foldable Garage
 * product with a dynamically calculated price.
 *
 * Falls back to a normal redirect on failure.
 *
 * @param price      - The calculated total price in USD (e.g. 32333)
 * @param customData - Optional key-value pairs passed back in the webhook
 * @param successUrl - Redirect URL after successful payment
 */
export async function openPaddleCheckout({
  price,
  customData,
  successUrl,
}: {
  price: number;
  customData?: Record<string, string>;
  successUrl?: string;
}): Promise<void> {
  try {
    const paddle = await loadPaddle();

    paddle.Checkout.open({
      product: PADDLE_PRODUCT_ID,
      price: price.toFixed(2), // "32333.00"
      quantity: 1,
      success: successUrl || `${window.location.origin}/thank-you`,
      custom: customData,
    });
  } catch (error) {
    console.error('Paddle checkout error:', error);
    // Fallback redirect so the user still lands on a thank-you page
    window.location.href = successUrl || '/thank-you';
  }
}
