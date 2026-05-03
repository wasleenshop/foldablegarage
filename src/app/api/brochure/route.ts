// ═══════════════════════════════════════════════════
// POST /api/brochure — Lead-gated brochure download
// ═══════════════════════════════════════════════════
//
// 1. Captures lead info (name, email, phone)
// 2. Saves to Supabase leads table
// 3. Generates PDF dynamically via renderToStream
// 4. Returns PDF as downloadable file
// 5. Pushes GTM event

import { NextRequest, NextResponse } from 'next/server';
import { renderToStream } from '@react-pdf/renderer';
import React from 'react';
import { BrochurePDF } from '@/components/brochure/BrochurePDF';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // Validate required fields
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Save lead to Supabase
    const supabase = await createServerSupabaseClient();
    const { error: leadError } = await supabase.from('leads').insert({
      name: name || '',
      email,
      phone: phone || '',
      source: 'brochure-download',
      status: 'new',
      created_at: new Date().toISOString(),
    });

    if (leadError) {
      console.error('Supabase lead insert error:', leadError);
      // Continue anyway — don't block the download
    }

    // Generate PDF stream
    const pdfStream = await renderToStream(React.createElement(BrochurePDF));

    // Convert the stream to a ReadableStream for the response
    const readableStream = new ReadableStream({
      start(controller) {
        pdfStream.on('data', (chunk: Buffer) => {
          controller.enqueue(chunk);
        });
        pdfStream.on('end', () => {
          controller.close();
        });
        pdfStream.on('error', (err: Error) => {
          controller.error(err);
        });
      },
    });

    // Return as downloadable PDF
    return new NextResponse(readableStream, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition':
          'attachment; filename="wasleen-foldable-garage-brochure.pdf"',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Brochure API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
