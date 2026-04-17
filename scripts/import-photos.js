#!/usr/bin/env node

import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SOURCE_DIR = '/Users/thomasmarguenot/Photos';
const DEST_DIR = join(__dirname, '../src/assets/pictures');
const MAX_WIDTH = 3000;
const QUALITY = 100;

const locations = ['Japon', 'Marseille', 'Paris', 'Vietnam'];

async function processLocation(location) {
  const sourcePath = join(SOURCE_DIR, location);
  const prefix = location.toLowerCase();
  const portraitPath = join(sourcePath, 'Portrait');

  // Process main photos
  await processFolder(sourcePath, prefix, '');

  // Process portrait folder if exists
  try {
    await processFolder(portraitPath, prefix, 'p_');
  } catch (err) {
    // Portrait folder doesn't exist
  }
}

async function processFolder(folderPath, prefix, suffix) {
  const files = await readdir(folderPath);
  const images = files.filter((f) => /\.(jpg|jpeg|png|tif|tiff)$/i.test(f));

  console.log(`📁 ${folderPath}: ${images.length} photos`);

  let index = 1;
  for (const file of images) {
    const inputPath = join(folderPath, file);
    const outputName = `${prefix}_${suffix}${String(index).padStart(3, '0')}.webp`;
    const outputPath = join(DEST_DIR, outputName);

    try {
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      let processor = image;

      // Auto-rotate based on EXIF orientation
      if (metadata.orientation) {
        switch (metadata.orientation) {
          case 2:
            processor = processor.flop();
            break;
          case 3:
            processor = processor.rotate(180);
            break;
          case 4:
            processor = processor.flip();
            break;
          case 5:
            processor = processor.flop().rotate(90);
            break;
          case 6:
            processor = processor.rotate(90);
            break;
          case 7:
            processor = processor.flop().rotate(90);
            break;
          case 8:
            processor = processor.rotate(270);
            break;
        }
      }

      // Remove EXIF orientation after rotation
      processor = processor.withMetadata({ orientation: undefined });

      await processor
        .resize(MAX_WIDTH, null, { withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      console.log(`  ✅ ${file} → ${outputName}`);
      index++;
    } catch (err) {
      console.error(`  ❌ ${file}: ${err.message}`);
    }
  }
}

async function main() {
  console.log('🖼️  Processing original photos...\n');

  for (const location of locations) {
    await processLocation(location);
  }

  console.log('\n✅ Done!');
}

main();
