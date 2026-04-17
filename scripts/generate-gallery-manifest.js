#!/usr/bin/env node

import { readdir, writeFile } from 'fs/promises';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sharp from 'sharp';

function parseExif(exifBuffer) {
  if (!exifBuffer || exifBuffer.length < 8) return null;

  const offset = 6;
  const isLE = exifBuffer.readUInt16LE(offset) === 0x4949;
  const read16 = (o) =>
    isLE ? exifBuffer.readUInt16LE(o) : exifBuffer.readUInt16BE(o);
  const read32 = (o) =>
    isLE ? exifBuffer.readUInt32LE(o) : exifBuffer.readUInt32BE(o);
  const readRational = (o) => {
    const num = read32(o);
    const den = read32(o + 4);
    return den ? num / den : 0;
  };

  const ifd0 = offset + read32(offset + 4);
  const entries = read16(ifd0);

  const result = {};
  let exifIFDOffset = null;

  for (let i = 0; i < entries; i++) {
    const e = ifd0 + 2 + i * 12;
    const tag = read16(e);
    const count = read32(e + 4);
    const valOff = e + 8;

    if (tag === 0x010f) {
      const strOff = offset + read32(valOff);
      result.make = exifBuffer.toString('ascii', strOff, strOff + count - 1).trim();
    }
    if (tag === 0x0110) {
      const strOff = offset + read32(valOff);
      result.model = exifBuffer.toString('ascii', strOff, strOff + count - 1).trim();
    }
    if (tag === 0x8769) {
      exifIFDOffset = offset + read32(valOff);
    }
  }

  if (exifIFDOffset) {
    const exifEntries = read16(exifIFDOffset);
    for (let i = 0; i < exifEntries; i++) {
      const e = exifIFDOffset + 2 + i * 12;
      const tag = read16(e);
      const valOff = e + 8;

      if (tag === 0x829a) {
        const rOff = offset + read32(valOff);
        const num = read32(rOff);
        const den = read32(rOff + 4);
        if (den) {
          const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
          const g = gcd(num, den);
          result.exposureTime = `${num / g}/${den / g}`;
        }
      }
      if (tag === 0x829d) {
        const rOff = offset + read32(valOff);
        result.fNumber = Math.round(readRational(rOff) * 10) / 10;
      }
      if (tag === 0x8827) {
        result.iso = isLE
          ? exifBuffer.readUInt16LE(valOff)
          : exifBuffer.readUInt16BE(valOff);
      }
      if (tag === 0x920a) {
        const rOff = offset + read32(valOff);
        result.focalLength = Math.round(readRational(rOff));
      }
    }
  }

  return Object.keys(result).length > 0 ? result : null;
}

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
      const meta = await sharp(filePath).metadata();
      const { width, height } = meta;
      const location = getLocationFromFilename(file);
      const exif = parseExif(meta.exif ?? null);
      return {
        file,
        location,
        width: width ?? 1200,
        height: height ?? 800,
        ...(exif && { exif }),
      };
    })
  );

  await writeFile(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
  console.log(`✓ Gallery manifest generated: ${manifest.length} images`);
})();
