/**
 * Wasleen — Paddle Billing Integration
 *
 * Loads Paddle.js from CDN and provides a client-side checkout helper
 * that opens the Paddle Checkout overlay with a transaction created
 * server-side via our /api/create-transaction endpoint.
 *
 * @see https://developer.paddle.com/paddlejs/checkout
 */

// ─── Config ─────────────────────────────────────────

const PADDLE_CDN = 'https://cdn.paddle.com/paddle/paddle.js';
const PADDLE_CLIENT_TOKEN =
  process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '';
const PADDLE_IS_SANDBOX =
  process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'sandbox';

// ─── Types ──────────────────────────────────────────

type PaddleEventCallback = (event: PaddleEvent) => void;

type PaddleEvent =
  | { name: 'checkout-loaded'; data: Record<string, unknown> }
  | { name: 'checkout-completed'; data: { transactionId: string } }
  | { name: 'checkout-error'; data?: { error?: string } };

interface PaddleInstance {
  Environment: {
    set: (env: string) => void;
  };
  Init: (options: { token: string; eventCallback?: PaddleEventCallback }) => void;
  Checkout: {
    open: (options: {
      transactionId?: string;
      settings?: {
        displayMode?: 'overlay' | 'inline';
        theme?: 'light' | 'dark';
        locale?: string;
        successUrl?: string;
      };
    }) => void;
    close: () => void;
  };
}

// ─── Loading / Initialisation ───────────────────────

let loadPromise: Promise<PaddleInstance> | null = null;

/**
 * Dynamically loads Paddle.js from the CDN and initialises it
 * with the client-side token. Returns the global `Paddle` object.
 *
 * Idempotent — safe to call multiple times.
 */
async function loadPaddle(): Promise<PaddleInstance> {
  if (typeof window === 'undefined') {
    throw new Error('Paddle can only be loaded in the browser');
  }

  // Already loaded and initialised?
  const existing = (window as unknown as { Paddle?: PaddleInstance }).Paddle;
  if (existing && typeof existing.Checkout?.open === 'function' && typeof existing.Init === 'function') {
    return existing;
  }

  // Already loading? Reuse the promise.
  if (loadPromise) return loadPromise;

  loadPromise = new Promise<PaddleInstance>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = PADDLE_CDN;
    script.async = true;
    script.onload = () => {
      const paddle = (window as unknown as { Paddle?: PaddleInstance }).Paddle;
      if (!paddle) {
        reject(
          new Error('Paddle script loaded but Paddle global not found'),
        );
        return;
      }

      // Validate required API surface for Billing
      if (typeof paddle.Init !== 'function') {
        console.warn(
          '[Paddle Billing] Paddle.Init not found — script may be Classic version. Full API:',
          Object.keys(paddle),
        );
      }

      // Set environment
      if (PADDLE_IS_SANDBOX && paddle.Environment?.set) {
        paddle.Environment.set('sandbox');
      }

      // Initialise with client-side token
      // (Paddle Billing requires at minimum a client-side token)
      if (PADDLE_CLIENT_TOKEN) {
        try {
          paddle.Init({ token: PADDLE_CLIENT_TOKEN });
        } catch (initError) {
          console.error(
            '[Paddle Billing] Paddle.Init() threw:',
            initError,
          );
        }
      } else {
        console.warn(
          '[Paddle Billing] No client token set. Checkout may fail.',
        );
      }

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

export interface CreateTransactionResponse {
  transactionId: string;
  status: string;
  checkoutUrl: string | null;
}

/**
 * Calls our server-side /api/create-transaction to create a
 * Paddle Billing transaction, then opens the Paddle Checkout
 * overlay with the returned transaction ID.
 */
export async function openPaddleCheckout({
  config,
  totalPrice,
  customerEmail,
  customerName,
}: {
  config: Record<string, unknown>;
  totalPrice: number;
  customerEmail?: string;
  customerName?: string;
}): Promise<void> {
  try {
    // Step 1: Create transaction via our server API
    const response = await fetch('/api/create-transaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        config,
        totalPrice,
        customerEmail,
        customerName,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || `Transaction creation failed (${response.status})`,
      );
    }

    const { transactionId } = data as CreateTransactionResponse;

    if (!transactionId) {
      throw new Error('No transaction ID returned from server');
    }

    // Step 2: Load Paddle.js and open checkout overlay
    const paddle = await loadPaddle();

    paddle.Checkout.open({
      transactionId,
      settings: {
        displayMode: 'overlay',
        theme: 'dark',
        locale: 'en',
        successUrl: `${window.location.origin}/thank-you`,
      },
    });
  } catch (error) {
    console.error('[Paddle Billing] Checkout error:', error);
    throw error; // Let the caller handle the error
  }
}
