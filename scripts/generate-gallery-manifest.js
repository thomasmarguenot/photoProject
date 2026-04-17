#!/usr/bin/env node

import { readdir, writeFile } from 'fs/promises';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PICTURES_DIR = join(__dirname, '../src/assets/pictures');
const OUTPUT_FILE = join(__dirname, '../src/assets/gallery-manifest.json');

const LOCATION_MAP = {
  japon: 'Japon',
  marseille: 'Marseille',
  paris: 'Paris',
  vietnam: 'Vietnam',
};

function getLocationFromFilename(filename) {
  const baseName = basename(filename, '.webp');
  const prefix = baseName.replace(/_p_\d+$/, '').split('_')[0];
  return LOCATION_MAP[prefix] || 'Japon';
}

(async () => {
  const files = (await readdir(PICTURES_DIR))
    .filter((f) => f.endsWith('.webp'))
    .sort();

  const manifest = await Promise.all(
    files.map(async (file) => {
      const filePath = join(PICTURES_DIR, file);
      const { width, height } = await sharp(filePath).metadata();
      const location = getLocationFromFilename(file);
      return {
        file,
        location,
        width: width ?? 1200,
        height: height ?? 800,
      };
    })
  );

  await writeFile(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
  console.log(`✓ Gallery manifest generated: ${manifest.length} images`);
})();
