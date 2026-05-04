import { NextResponse } from 'next/server';
import { calculatePrice } from '@/lib/utils';
import type { ProductConfig } from '@/lib/types';

// ═══════════════════════════════════════════════════
// Paddle Billing — Create Transaction API
// ═══════════════════════════════════════════════════
//
// This endpoint takes the product configuration, calculates
// the total price, and creates a Paddle Billing transaction.
// The returned transaction ID is then used by the client
// to open the Paddle Checkout overlay.
//
// @see https://developer.paddle.com/api-reference/transactions/create-transaction
// ═══════════════════════════════════════════════════

const PADDLE_API_KEY = process.env.PADDLE_API_KEY || '';
const PADDLE_PRICE_ID =
  process.env.NEXT_PUBLIC_PADDLE_PRICE_ID || 'pri_01kqkgq674ywevhy0gp136jfpk';
const PADDLE_IS_SANDBOX =
  process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'sandbox';

function getApiBaseUrl(): string {
  return PADDLE_IS_SANDBOX
    ? 'https://sandbox-api.paddle.com'
    : 'https://api.paddle.com';
}

interface CreateTransactionRequest {
  config: ProductConfig;
  totalPrice: number;
  customerEmail?: string;
  customerName?: string;
}

export async function POST(request: Request) {
  try {
    const body: CreateTransactionRequest = await request.json();
    const { config, totalPrice, customerEmail, customerName } = body;

    // Validate config
    if (!config || !config.width || !config.length || !config.roofType) {
      return NextResponse.json(
        { error: 'Invalid product configuration' },
        { status: 400 },
      );
    }

    // Re-validate the price server-side
    const calculatedPrice = calculatePrice(config);
    const priceDifference = Math.abs(calculatedPrice - totalPrice);

    // Allow 1 cent tolerance for floating point
    if (priceDifference > 0.01) {
      console.error(
        `Price mismatch: client sent ${totalPrice}, server calculated ${calculatedPrice}`,
      );
      return NextResponse.json(
        { error: 'Price validation failed' },
        { status: 400 },
      );
    }

    if (!PADDLE_API_KEY) {
      console.error(
        'PADDLE_API_KEY is not configured. Create-transaction will fail.',
      );
      return NextResponse.json(
        {
          error:
            'Payment provider not configured. Please contact support.',
        },
        { status: 500 },
      );
    }

    // ─── Create Transaction via Paddle Billing API ───

    const transactionPayload: Record<string, unknown> = {
      items: [
        {
          price_id: PADDLE_PRICE_ID,
          quantity: 1,
        },
      ],
      custom_data: {
        config: JSON.stringify(config),
        calculated_price: totalPrice.toString(),
      },
    };

    // Add customer info if provided
    if (customerEmail) {
      transactionPayload.customer = {
        email: customerEmail,
        ...(customerName ? { name: customerName } : {}),
      };
    }

    console.log(
      `[Paddle Billing] Creating transaction for price: ${totalPrice}, config: ${JSON.stringify(config)}`,
    );

    const response = await fetch(`${getApiBaseUrl()}/transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${PADDLE_API_KEY}`,
      },
      body: JSON.stringify(transactionPayload),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error(
        '[Paddle Billing] Transaction creation failed:',
        JSON.stringify(responseData, null, 2),
      );

      // Check for specific Paddle error
      const errorDetail =
        responseData.error?.detail ||
        responseData.detail ||
        'Transaction creation failed';

      return NextResponse.json(
        { error: errorDetail },
        { status: response.status },
      );
    }

    const transaction = responseData.data;
    const transactionId = transaction.id;

    console.log(
      `[Paddle Billing] Transaction created: ${transactionId}, status: ${transaction.status}`,
    );

    // Return the transaction ID so the client can open checkout
    return NextResponse.json({
      transactionId,
      status: transaction.status,
      checkoutUrl: transaction.checkout?.url || null,
    });
  } catch (error) {
    console.error('[Paddle Billing] Create transaction error:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 },
    );
  }
}
