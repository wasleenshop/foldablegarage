import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';

/**
 * POST /api/paddle-webhook
 *
 * Handles Paddle Classic webhook alerts. Paddle Classic sends form-encoded
 * POST data with an `alert_name` field identifying the event type.
 *
 * Events handled:
 * - payment_succeeded    → Mark lead as converted, create order record
 * - payment_refunded     → Mark lead as contacted
 *
 * @see https://developer.paddle.com/classic/reference/ZG9jOjI1MzUzOTg1-alerts-reference
 */
export async function POST(request: Request) {
  try {
    // Paddle Classic sends form-encoded data, not JSON
    const formData = await request.formData();
    const payload: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      payload[key] = String(value);
    }

    const alertName = payload.alert_name;

    if (!alertName) {
      return NextResponse.json(
        { error: 'Invalid webhook payload: missing alert_name' },
        { status: 400 },
      );
    }

    console.log(`Paddle Classic webhook received: ${alertName} (alert_id: ${payload.alert_id})`);

    const supabase = await createServerSupabaseClient();

    switch (alertName) {
      case 'payment_succeeded': {
        const orderId = payload.order_id;
        const paymentId = payload.payment_id;
        const checkoutId = payload.checkout_id;
        const customerEmail = payload.email;
        const saleGross = parseFloat(payload.sale_gross || '0');
        const currency = payload.currency || 'USD';
        const customConfig = payload.custom_config || '';
        const productId = payload.product_id;

        // Parse config from custom data if present
        let config: Record<string, unknown> | null = null;
        try {
          if (customConfig) {
            config = JSON.parse(customConfig);
          }
        } catch {
          console.warn('Paddle webhook: Failed to parse custom_config JSON');
        }

        // Find a matching lead by checkout_id or config
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
            paddle_order_id: orderId,
            paddle_payment_id: paymentId,
            paddle_checkout_id: checkoutId,
            paddle_product_id: productId,
            total_amount: saleGross,
            currency,
            customer_email: customerEmail,
            config: customConfig,
            status: 'paid',
          });
        } else {
          // No lead_id in custom data — just log the sale
          console.log(
            `Paddle sale completed: Order ${orderId}, Payment ${paymentId}, ` +
            `Amount ${currency} ${saleGross}, Email: ${customerEmail}`,
          );

          // Still create a minimal order record
          await supabase.from('orders').insert({
            paddle_order_id: orderId,
            paddle_payment_id: paymentId,
            paddle_checkout_id: checkoutId,
            paddle_product_id: productId,
            total_amount: saleGross,
            currency,
            customer_email: customerEmail,
            config: customConfig,
            status: 'paid',
          });
        }

        break;
      }

      case 'payment_refunded':
      case 'subscription_payment_refunded': {
        const refundOrderId = payload.order_id;
        console.log(`Paddle: Order ${refundOrderId} was refunded`);

        // Update order status to refunded
        if (refundOrderId) {
          await supabase
            .from('orders')
            .update({ status: 'refunded' })
            .eq('paddle_order_id', refundOrderId);
        }
        break;
      }

      default:
        console.log(`Paddle: Unhandled alert_name: ${alertName}`);
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
