#!/usr/bin/env node

/**
 * Resize a small set of logo images under src/assets/logo
 * - Creates a backup with the same name + ".original"
 * - Resizes to MAX_WIDTH (without enlarging)
 * - Re-encodes as WebP with reasonable quality
 *
 * Usage: node scripts/resize-logos.js
 */

import { stat, rename } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LOGO_DIR = join(__dirname, '../src/assets/logo');
const MAX_WIDTH = 1000; // reasonable "reduce a bit" width
const QUALITY = 85;

const FILES = [
  'Leroy-Merlin.webp',
  'Petit-bateau.webp',
  'Rolex-logo.webp',
];

async function fileExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

async function resizeFile(filename) {
  const filePath = join(LOGO_DIR, filename);
  if (!(await fileExists(filePath))) {
    console.warn(`⚠️  Not found: ${filePath}`);
    return { file: filename, ok: false, reason: 'not found' };
  }

  const ext = extname(filePath);
  const base = basename(filePath, ext);
  const backupPath = join(LOGO_DIR, `${base}${ext}.original`);

  // Create backup if not exists
  if (!(await fileExists(backupPath))) {
    await rename(filePath, backupPath);
    console.log(`🔁 Backup created: ${basename(backupPath)}`);
  } else {
    console.log(`ℹ️  Backup already exists: ${basename(backupPath)}`);
  }

  try {
    // Resize and re-encode as webp
    await sharp(backupPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(filePath);

    console.log(`✅ Resized: ${filename} -> max width ${MAX_WIDTH}px`);
    return { file: filename, ok: true };
  } catch (err) {
    console.error(`❌ Error resizing ${filename}:`, err.message);
    return { file: filename, ok: false, reason: err.message };
  }
}

async function main() {
  console.log('🔧 Resize logos script');
  console.log(`Directory: ${LOGO_DIR}`);
  console.log(`Target max width: ${MAX_WIDTH}px`);

  const results = [];
  for (const f of FILES) {
    const r = await resizeFile(f);
    results.push(r);
  }

  console.log('\n--- Summary ---');
  for (const r of results) {
    if (r.ok) console.log(`✅ ${r.file}`);
    else console.log(`⚠️  ${r.file}: ${r.reason}`);
  }
}

main().catch((e) => {
  console.error('Fatal error:', e.message);
  process.exit(1);
});
