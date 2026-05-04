import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import crypto from 'crypto';

/**
 * Verifies that a webhook request genuinely came from Paddle.
 *
 * Paddle sends a `Paddle-Signature` header containing:
 *   ts=<unix_timestamp>;h1=<hmac_hex_digest>
 *
 * We recompute the HMAC-SHA256 of `ts:body` using the webhook secret
 * and compare it against the `h1` value.
 */
function verifyPaddleSignature(
  rawBody: string,
  paddleSignature: string | null,
  secret: string,
): boolean {
  if (!paddleSignature || !secret) return false;

  // Parse the signature header: ts=...;h1=...
  const parts = paddleSignature.split(';');
  let ts = '';
  let h1 = '';
  for (const part of parts) {
    const [key, value] = part.split('=');
    if (key === 'ts') ts = value;
    if (key === 'h1') h1 = value;
  }
  if (!ts || !h1) return false;

  // Recompute the HMAC: timestamp + ':' + raw body
  const signedPayload = `${ts}:${rawBody}`;
  const computedHmac = crypto
    .createHmac('sha256', secret)
    .update(signedPayload, 'utf8')
    .digest('hex');

  // Constant-time comparison to prevent timing attacks
  return crypto.timingSafeEqual(Buffer.from(computedHmac), Buffer.from(h1));
}

/**
 * POST /api/paddle-webhook
 *
 * Handles Paddle Billing transaction webhook events.
 * Verifies the Paddle-Signature header before processing.
 *
 * Events handled:
 * - transaction.completed → Mark lead as converted, create order
 * - transaction.past_due  → Mark lead as contacted
 * - transaction.cancelled → Mark lead as lost
 *
 * @see https://developer.paddle.com/webhook-reference/verify-webhooks
 */
export async function POST(request: Request) {
  try {
    // 1. Read raw body (needed for signature verification)
    const rawBody = await request.text();
    const body = JSON.parse(rawBody);

    // 2. Verify the Paddle signature
    const secret = process.env.PADDLE_WEBHOOK_SECRET;
    if (!secret) {
      console.error('PADDLE_WEBHOOK_SECRET is not configured');
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 },
      );
    }

    const paddleSignature = request.headers.get('Paddle-Signature');
    const isValid = verifyPaddleSignature(rawBody, paddleSignature, secret);

    if (!isValid) {
      console.error('Paddle webhook: Invalid signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 },
      );
    }

    // 3. Process the event
    const { event_type, data } = body;

    if (!event_type || !data) {
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 },
      );
    }

    const supabase = await createServerSupabaseClient();

    switch (event_type) {
      case 'transaction.completed': {
        const transactionId = data.id;
        const customData = data.custom_data || {};

        // Update lead status
        if (customData.lead_id) {
          await supabase
            .from('leads')
            .update({ status: 'converted' })
            .eq('id', customData.lead_id);

          // Create order record
          await supabase.from('orders').insert({
            lead_id: customData.lead_id,
            paddle_transaction_id: transactionId,
            total_amount: data.details?.totals?.grand_total
              ? parseFloat(data.details.totals.grand_total) / 100
              : 0,
            currency: data.currency_code || 'AED',
            status: 'paid',
          });
        }

        console.log(`Paddle: Transaction ${transactionId} completed`);
        break;
      }

      case 'transaction.past_due': {
        if (data.custom_data?.lead_id) {
          await supabase
            .from('leads')
            .update({ status: 'contacted' })
            .eq('id', data.custom_data.lead_id);
        }
        break;
      }

      case 'transaction.cancelled': {
        if (data.custom_data?.lead_id) {
          await supabase
            .from('leads')
            .update({ status: 'lost' })
            .eq('id', data.custom_data.lead_id);
        }
        break;
      }

      default:
        console.log(`Paddle: Unhandled event type: ${event_type}`);
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Paddle webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 },
    );
  }
}
