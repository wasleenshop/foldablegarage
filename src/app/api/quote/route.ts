import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { calculatePrice } from '@/lib/utils';
import type { ProductConfig, QuoteFormData } from '@/lib/types';

/**
 * POST /api/quote
 * Creates a lead + pending order in Supabase.
 * Returns leadId + orderId for Paddle checkout integration.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { config, form } = body as {
      config: ProductConfig;
      form: QuoteFormData;
    };

    // Validate required fields
    if (!form.fullName || !form.phone || !form.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate price
    const totalPrice = calculatePrice(config);

    const supabase = await createServerSupabaseClient();

    // 1. Insert lead
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        name: form.fullName,
        phone: form.phone,
        email: form.email,
        emirate: form.emirate,
        property_type: form.propertyType,
        message: form.message || null,
        source: 'quote',
        config,
        status: 'new',
      })
      .select()
      .single();

    if (leadError) {
      console.error('Supabase lead insert error:', leadError);
      return NextResponse.json(
        { error: 'Failed to save quote' },
        { status: 500 }
      );
    }

    // 2. Insert pending order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        lead_id: lead.id,
        config,
        total_amount: totalPrice,
        currency: 'AED',
        status: 'pending',
      })
      .select()
      .single();

    if (orderError) {
      console.error('Supabase order insert error:', orderError);
      // Lead was created but order failed — still return leadId but no orderId
      return NextResponse.json({
        success: true,
        leadId: lead.id,
        orderId: null,
        totalPrice,
        config,
        form,
      });
    }

    // 3. Return both IDs for Paddle checkout
    return NextResponse.json({
      success: true,
      leadId: lead.id,
      orderId: order.id,
      totalPrice,
      config,
      form,
    });
  } catch (error) {
    console.error('Quote API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
