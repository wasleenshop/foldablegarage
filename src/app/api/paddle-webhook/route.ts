import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

/**
 * POST /api/paddle-webhook
 * Handles Paddle subscription/payment webhook events.
 *
 * Events handled:
 * - transaction.completed: Mark lead as paid, create order
 * - transaction.past_due: Mark lead as payment_issue
 * - transaction.cancelled: Mark lead as cancelled
 *
 * @see https://developer.paddle.com/webhook-reference
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Paddle sends events with a data field
    const { event_type, data } = body;

    if (!event_type || !data) {
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 }
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
      { status: 500 }
    );
  }
}
