import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

// ═══════════════════════════════════════════════════
// Paddle Billing — Webhook Handler
// ═══════════════════════════════════════════════════
//
// Paddle Billing sends webhook events as JSON POST payloads.
// Each event has an `event_type` and `data` object.
//
// Events handled:
//   transaction.completed    → Mark lead as converted, create order
//   transaction.paid         → Same as completed (payment confirmed)
//   transaction.canceled     → Mark order as cancelled
//
// @see https://developer.paddle.com/webhooks/overview
// ═══════════════════════════════════════════════════

interface PaddleBillingWebhook {
  event_id: string;
  event_type: string;
  occurred_at: string;
  data: {
    id: string;
    status: string;
    customer?: {
      id: string;
      email?: string;
      name?: string;
    };
    items?: Array<{
      price: {
        id: string;
        product_id: string;
      };
      quantity: number;
    }>;
    details?: {
      totals?: {
        total: string;
        currency_code: string;
      };
      line_items?: Array<{
        product: {
          id: string;
        };
        total: string;
      }>;
    };
    custom_data?: Record<string, string>;
    created_at: string;
    updated_at: string;
  };
}

export async function POST(request: Request) {
  try {
    // Paddle Billing sends JSON payloads (not form-encoded like Classic)
    const payload: PaddleBillingWebhook = await request.json();

    const { event_type, data: transaction } = payload;

    if (!event_type) {
      return NextResponse.json(
        { error: 'Invalid webhook payload: missing event_type' },
        { status: 400 },
      );
    }

    console.log(
      `[Paddle Billing] Webhook received: ${event_type} (txn: ${transaction?.id})`,
    );

    const supabase = await createServerSupabaseClient();

    switch (event_type) {
      case 'transaction.completed':
      case 'transaction.paid': {
        const transactionId = transaction.id;
        const customerEmail = transaction.customer?.email;
        const customerName = transaction.customer?.name;
        const totalAmount = transaction.details?.totals?.total
          ? parseFloat(transaction.details.totals.total)
          : 0;
        const currency =
          transaction.details?.totals?.currency_code || 'USD';
        const customConfig =
          transaction.custom_data?.config || '';
        const calculatedPrice =
          transaction.custom_data?.calculated_price || '';

        // Parse config from custom data
        let config: Record<string, unknown> | null = null;
        try {
          if (customConfig) {
            config = JSON.parse(customConfig);
          }
        } catch {
          console.warn(
            '[Paddle Billing] Failed to parse custom_data.config JSON',
          );
        }

        // Try to find a matching lead
        let leadId: string | null = null;

        if (config && typeof config === 'object' && 'lead_id' in config) {
          leadId = config.lead_id as string;
        }

        if (leadId) {
          // Update lead status to converted
          await supabase
            .from('leads')
            .update({ status: 'converted' })
            .eq('id', leadId);

          // Create order record
          await supabase.from('orders').insert({
            lead_id: leadId,
            paddle_transaction_id: transactionId,
            total_amount: totalAmount,
            currency,
            customer_email: customerEmail,
            customer_name: customerName,
            config: customConfig,
            calculated_price: calculatedPrice,
            status: 'paid',
          });
        } else {
          // No lead_id in custom data — just log the sale
          console.log(
            `[Paddle Billing] Sale completed: Txn ${transactionId}, ` +
              `Amount ${currency} ${totalAmount}, Email: ${customerEmail}`,
          );

          // Still create a minimal order record
          await supabase.from('orders').insert({
            paddle_transaction_id: transactionId,
            total_amount: totalAmount,
            currency,
            customer_email: customerEmail,
            customer_name: customerName,
            config: customConfig,
            calculated_price: calculatedPrice,
            status: 'paid',
          });
        }

        break;
      }

      case 'transaction.canceled':
      case 'transaction.past_due': {
        const cancelledTxnId = transaction.id;
        console.log(
          `[Paddle Billing] Transaction ${cancelledTxnId} was ${event_type}`,
        );

        // Update order status
        if (cancelledTxnId) {
          await supabase
            .from('orders')
            .update({
              status:
                event_type === 'transaction.canceled'
                  ? 'cancelled'
                  : 'pending',
            })
            .eq('paddle_transaction_id', cancelledTxnId);
        }
        break;
      }

      default:
        console.log(
          `[Paddle Billing] Unhandled event_type: ${event_type}`,
        );
    }

    // Always return 200 to acknowledge receipt
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('[Paddle Billing] Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 },
    );
  }
}
