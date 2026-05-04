import { NextResponse } from 'next/server';
import { calculatePrice } from '@/lib/utils';
import type { ProductConfig } from '@/lib/types';

/**
 * POST /api/create-transaction
 *
 * Creates a custom Paddle transaction with the exact calculated amount.
 * Used by the checkout page for dynamic pricing (no fixed price IDs).
 *
 * Flow:
 * 1. Receives product config from the frontend
 * 2. Server-side recalculates price (trusted calculation)
 * 3. Calls Paddle API to create a custom transaction
 * 4. Returns the hosted checkout URL
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { config } = body as { config: ProductConfig };

    // Validate required config fields
    if (!config.width || !config.length || !config.roofType || !config.colour) {
      return NextResponse.json(
        { error: 'Invalid product configuration' },
        { status: 400 }
      );
    }

    // Server-side price calculation (trusted — never trust the client)
    const amount = calculatePrice(config);

    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid price calculated' },
        { status: 400 }
      );
    }

    const paddleToken = process.env.PADDLE_API_KEY;
    if (!paddleToken) {
      console.error('PADDLE_API_KEY is not configured');
      return NextResponse.json(
        { error: 'Payment service not configured' },
        { status: 500 }
      );
    }

    // Call Paddle API to create a transaction with custom pricing
    const response = await fetch(
      'https://api.paddle.com/transactions',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${paddleToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [
            {
              price: {
                description: `Wasleen Foldable Garage (${config.width}×${config.length}m — ${config.roofType === 'glass' ? 'Glass' : 'Polycarbonate'})`,
                unit_price: {
                  amount: String(Math.round(amount * 100)), // Paddle expects cents
                  currency_code: 'USD',
                },
                quantity: {
                  maximum: 1,
                  minimum: 1,
                },
              },
              quantity: 1,
            },
          ],
          custom_data: {
            config: JSON.stringify(config),
          },
        }),
      }
    );

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Paddle API error:', response.status, errorBody);
      return NextResponse.json(
        { error: 'Failed to create payment transaction' },
        { status: 502 }
      );
    }

    const transaction = await response.json();

    // Paddle returns checkout URL in different paths depending on API version
    const checkoutUrl =
      transaction?.data?.checkout_url ||
      transaction?.data?.urls?.checkout ||
      null;

    if (!checkoutUrl) {
      console.error('Paddle response missing checkout URL:', JSON.stringify(transaction));
      return NextResponse.json(
        { error: 'No checkout URL in Paddle response' },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      checkoutUrl,
      transactionId: transaction?.data?.id,
      amount,
    });
  } catch (error) {
    console.error('Create transaction API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
