import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import type { QuoteFormData } from '@/lib/types';

/**
 * POST /api/contact
 * Saves a contact form submission to Supabase leads table.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, emirate, propertyType, message } =
      body as QuoteFormData;

    // Validate
    if (!fullName || !phone || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: fullName,
        phone,
        email,
        emirate,
        property_type: propertyType,
        message: message || null,
        source: 'contact',
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, leadId: data.id });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
