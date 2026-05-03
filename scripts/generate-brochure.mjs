// ═══════════════════════════════════════════════════
// Wasleen Brochure PDF — Static Build-time Generator
// ═══════════════════════════════════════════════════
//
// Generates the brochure PDF at build time into public/pdfs/
// Usage: node scripts/generate-brochure.mjs
//
// NOTE: Since the brochure components use TypeScript/JSX and
// path aliases (@/), this script requires a build step.
// Options:
//   1. Use `npx tsx scripts/generate-brochure.ts` (recommended)
//   2. Run via `npm run generate-brochure` after installing tsx
//   3. Or the API routes handle runtime generation

import { renderToFile } from '@react-pdf/renderer';
import React from 'react';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generate() {
  // Ensure output directory exists
  const outputDir = path.join(process.cwd(), 'public', 'pdfs');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, 'wasleen-brochure.pdf');
  console.log('📄 Generating Wasleen Brochure PDF...');
  console.log('   Output:', outputPath);

  // Dynamic import of the BrochurePDF component
  // Note: This requires the project to be built first, or use tsx
  const { BrochurePDF } = await import('../src/components/brochure/BrochurePDF.tsx');

  await renderToFile(React.createElement(BrochurePDF), outputPath);
  console.log('✅ Brochure PDF generated successfully!');
  console.log(`   File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB`);
}

generate().catch((err) => {
  console.error('❌ Brochure generation failed:', err);
  process.exit(1);
});
