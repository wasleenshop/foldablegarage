/**
 * Download Plus Jakarta Sans font files from Google Fonts
 * Needed by @react-pdf/renderer for the brochure PDF
 */
import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = path.join(__dirname, '..', 'public', 'fonts');

// Google Fonts provides TTF files via this pattern
const FONT_VARIANTS = [
  { weight: 400, file: 'PlusJakartaSans-Regular.ttf', cssFamily: 'Plus+Jakarta+Sans', cssWeight: 400 },
  { weight: 500, file: 'PlusJakartaSans-Medium.ttf', cssFamily: 'Plus+Jakarta+Sans', cssWeight: 500 },
  { weight: 600, file: 'PlusJakartaSans-SemiBold.ttf', cssFamily: 'Plus+Jakarta+Sans', cssWeight: 600 },
  { weight: 700, file: 'PlusJakartaSans-Bold.ttf', cssFamily: 'Plus+Jakarta+Sans', cssWeight: 700 },
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

async function downloadFile(url, dest) {
  const data = await fetchUrl(url);
  fs.writeFileSync(dest, data);
}

async function main() {
  if (!fs.existsSync(FONTS_DIR)) {
    fs.mkdirSync(FONTS_DIR, { recursive: true });
  }

  console.log('⬇️  Fetching Google Fonts CSS to locate TTF files...\n');

  // Get Google Fonts CSS which contains the actual font URLs
  const cssUrl = `https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700`;
  try {
    const cssData = await fetchUrl(cssUrl);
    const cssText = cssData.toString('utf-8');
    console.log('📄 Google Fonts CSS received\n');

    // Parse each @font-face rule to extract the URL and weight
    const fontFaceRegex = /@font-face\s*\{([^}]+)\}/g;
    const urlRegex = /src:\s*url\(([^)]+)\)/;
    const weightRegex = /font-weight:\s*(\d+)/;

    let match;
    let found = 0;
    while ((match = fontFaceRegex.exec(cssText)) !== null) {
      const block = match[1];
      const urlMatch = urlRegex.exec(block);
      const weightMatch = weightRegex.exec(block);
      
      if (urlMatch && weightMatch) {
        const fontUrl = urlMatch[1].replace(/['"]/g, '');
        const weight = parseInt(weightMatch[1]);
        const variant = FONT_VARIANTS.find(v => v.cssWeight === weight);
        
        if (variant) {
          const dest = path.join(FONTS_DIR, variant.file);
          if (fs.existsSync(dest)) {
            console.log(`  ✅ ${variant.file} already exists`);
            found++;
            continue;
          }
          
          console.log(`  ⏳ Downloading ${variant.file} (weight ${weight})...`);
          try {
            await downloadFile(fontUrl, dest);
            const stats = fs.statSync(dest);
            console.log(`  ✅ ${variant.file} — ${(stats.size / 1024).toFixed(1)} KB`);
            found++;
          } catch (err) {
            console.error(`  ❌ Failed: ${err.message}`);
          }
        }
      }
    }

    if (found === 0) {
      console.log('⚠️  Could not extract font URLs from CSS. Trying alternative method...');
      // Fallback: use Google Fonts direct download
      await downloadFromGoogleFontsDirect();
    }
  } catch (err) {
    console.error('❌ Failed to fetch Google Fonts CSS:', err.message);
    console.log('⚠️  Trying alternative download method...');
    await downloadFromGoogleFontsDirect();
  }

  console.log('\n📋 Font download complete!');
  console.log(`📁 Location: ${FONTS_DIR}`);
}

async function downloadFromGoogleFontsDirect() {
  // Alternative: Use Google Fonts API v2
  const apiUrl = 'https://fonts.google.com/download?family=Plus+Jakarta+Sans';
  console.log(`  ⏳ Downloading font family ZIP from Google Fonts...`);
  
  try {
    const data = await fetchUrl(apiUrl);
    // Save as zip and extract
    const zipPath = path.join(FONTS_DIR, 'plus-jakarta-sans.zip');
    fs.writeFileSync(zipPath, data);
    console.log(`  ✅ Downloaded ZIP (${(data.length / 1024 / 1024).toFixed(1)} MB)`);
    console.log(`  ⚠️  Please extract the ZIP file at: ${zipPath}`);
    console.log('     Extract the TTF files to:', FONTS_DIR);
  } catch (err) {
    console.error(`  ❌ Failed: ${err.message}`);
    console.log('\n⚠️  Automatic download failed. Please download manually:');
    console.log('   1. Visit: https://fonts.google.com/specimen/Plus+Jakarta+Sans');
    console.log('   2. Click "Download family"');
    console.log('   3. Extract the TTF files to: public/fonts/');
    console.log('   Required files:');
    FONT_VARIANTS.forEach(v => console.log(`     - ${v.file}`));
  }
}

main();
