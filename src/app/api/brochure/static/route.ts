// ═══════════════════════════════════════════════════
// GET /api/brochure/static — Direct static PDF download
// ═══════════════════════════════════════════════════
//
// Serves the pre-generated static PDF from public/pdfs/
// No lead capture — for direct linking / SEO purposes.
// The file must be generated first via:
//   npm run generate-brochure

import { NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const pdfPath = path.join(
      process.cwd(),
      'public',
      'pdfs',
      'wasleen-brochure.pdf'
    );

    const pdfBuffer = await readFile(pdfPath);

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition':
          'inline; filename="wasleen-foldable-garage-brochure.pdf"',
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    });
  } catch (error) {
    console.error('Static brochure error:', error);
    return NextResponse.json(
      {
        error: 'Brochure PDF not found. Run `npm run generate-brochure` first.',
      },
      { status: 404 }
    );
  }
}
