#!/usr/bin/env node

import { readdir, mkdir, stat, copyFile } from 'fs/promises';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PICTURES_DIR = join(__dirname, '../src/assets/pictures');
const OUTPUT_DIR = join(__dirname, '../public/images');

// Keep in sync with the `sizes` attribute in GalleryGrid.tsx.
const WIDTHS = [600, 1200, 1800];

async function generateResponsiveImages() {
  console.log('🖼️  Generating responsive image variants...\n');

  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = (await readdir(PICTURES_DIR)).filter(
    (f) => f.endsWith('.webp') && !f.includes('.original')
  );

  console.log(`Found ${files.length} images to process\n`);
  console.log('═'.repeat(60));

  for (const file of files) {
    const filePath = join(PICTURES_DIR, file);
    const baseName = basename(file, '.webp');

    console.log(`\n📸 Processing: ${file}`);

    try {
      const { width } = await sharp(filePath).metadata();
      console.log(`   Original: ${width}px wide`);

      for (const w of WIDTHS) {
        if (width < w) {
          console.log(`   ⏭️  Skipping ${w}w (original too small)`);
          continue;
        }

        const outputPath = join(OUTPUT_DIR, `${baseName}-${w}w.webp`);
        await sharp(filePath)
          .rotate()
          .resize(w, null, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(outputPath);

        const sizeKB = ((await stat(outputPath)).size / 1024).toFixed(1);
        console.log(`   ✅ ${w}w: ${sizeKB}KB`);
      }

      await copyFile(filePath, join(OUTPUT_DIR, file));
      console.log(`   ✅ Copied original to /images/${file}`);
    } catch (error) {
      console.error(`   ❌ Error processing ${file}:`, error.message);
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log('✅ Done. Run `pnpm gallery:manifest` to refresh the manifest.');
  console.log('═'.repeat(60));
}

generateResponsiveImages().catch(console.error);
