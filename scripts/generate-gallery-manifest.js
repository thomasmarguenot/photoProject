#!/usr/bin/env node

import { readdir, readFile, writeFile } from 'fs/promises';
import { join, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sharp from 'sharp';

const TAG = {
  MAKE: 0x010f,
  MODEL: 0x0110,
  EXIF_IFD: 0x8769,
  EXPOSURE_TIME: 0x829a,
  F_NUMBER: 0x829d,
  ISO: 0x8827,
  DATE_TIME_ORIGINAL: 0x9003,
  EXPOSURE_BIAS: 0x9204,
  FOCAL_LENGTH: 0x920a,
  FOCAL_LENGTH_35MM: 0xa405,
  LENS_MODEL: 0xa434,
};

const TYPE = { ASCII: 2, SHORT: 3, LONG: 4, RATIONAL: 5, SRATIONAL: 10 };

function readExifTags(exifBuffer) {
  if (!exifBuffer || exifBuffer.length < 14) return null;

  // sharp prefixes the TIFF block with the "Exif\0\0" APP1 header.
  const offset = 6;
  const isLE = exifBuffer.readUInt16LE(offset) === 0x4949;
  const read16 = (o) =>
    isLE ? exifBuffer.readUInt16LE(o) : exifBuffer.readUInt16BE(o);
  const read32 = (o) =>
    isLE ? exifBuffer.readUInt32LE(o) : exifBuffer.readUInt32BE(o);
  const readS32 = (o) =>
    isLE ? exifBuffer.readInt32LE(o) : exifBuffer.readInt32BE(o);

  const readValue = (type, count, valueOffset) => {
    switch (type) {
      case TYPE.ASCII: {
        const start = count > 4 ? offset + read32(valueOffset) : valueOffset;
        return exifBuffer
          .toString('ascii', start, start + count)
          .replace(/\0/g, '')
          .trim();
      }
      case TYPE.SHORT:
        return read16(valueOffset);
      case TYPE.LONG:
        return read32(valueOffset);
      case TYPE.RATIONAL: {
        const start = offset + read32(valueOffset);
        return [read32(start), read32(start + 4)];
      }
      case TYPE.SRATIONAL: {
        const start = offset + read32(valueOffset);
        return [readS32(start), readS32(start + 4)];
      }
      default:
        return undefined;
    }
  };

  const tags = {};
  const readIfd = (ifdOffset) => {
    const entries = read16(ifdOffset);
    for (let i = 0; i < entries; i++) {
      const entry = ifdOffset + 2 + i * 12;
      const tag = read16(entry);
      tags[tag] = readValue(read16(entry + 2), read32(entry + 4), entry + 8);
      if (tag === TAG.EXIF_IFD) readIfd(offset + tags[tag]);
    }
  };
  readIfd(offset + read32(offset + 4));

  return tags;
}

const ratio = (value) => (value?.[1] ? value[0] / value[1] : undefined);
const round = (value, decimals = 0) =>
  value === undefined ? undefined : Number(value.toFixed(decimals));

function formatExposureTime(value) {
  if (!value?.[1]) return undefined;
  const [num, den] = value;
  if (num >= den) return String(round(num / den, 1));
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const g = gcd(num, den);
  return `${num / g}/${den / g}`;
}

function parseExif(exifBuffer) {
  const tags = readExifTags(exifBuffer);
  if (!tags) return null;

  // "2026:09:09 03:38:50" → "2026-09-09". The time is dropped on purpose: the
  // camera clock stays on home time while travelling, so the hour is misleading.
  const takenAt = tags[TAG.DATE_TIME_ORIGINAL]
    ?.slice(0, 10)
    .replace(/:/g, '-');

  const exif = {
    make: tags[TAG.MAKE] || undefined,
    model: tags[TAG.MODEL] || undefined,
    lensModel: tags[TAG.LENS_MODEL] || undefined,
    focalLength: round(ratio(tags[TAG.FOCAL_LENGTH])),
    focalLength35: tags[TAG.FOCAL_LENGTH_35MM] || undefined,
    fNumber: round(ratio(tags[TAG.F_NUMBER]), 1),
    exposureTime: formatExposureTime(tags[TAG.EXPOSURE_TIME]),
    exposureBias: round(ratio(tags[TAG.EXPOSURE_BIAS]), 2),
    iso: tags[TAG.ISO],
    takenAt,
  };

  const defined = Object.fromEntries(
    Object.entries(exif).filter(([, value]) => value !== undefined)
  );
  return Object.keys(defined).length > 0 ? defined : null;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PICTURES_DIR = join(__dirname, '../public/images');
const SOURCES_DIR = join(__dirname, '../src/assets/pictures');
const OUTPUT_FILE = join(__dirname, '../src/assets/gallery-manifest.json');
// The WebP files carry no EXIF and most .original sources are git-ignored, so
// the EXIF read locally is committed here for builds that only have the WebP.
const EXIF_CACHE_FILE = join(__dirname, '../src/assets/gallery-exif.json');

const LOCATION_MAP = {
  coree: 'Corée',
  japon: 'Japon',
  marseille: 'Marseille',
  paris: 'Paris',
  vietnam: 'Vietnam',
};

function getLocationFromFilename(filename) {
  const baseName = basename(filename, '.webp');
  // Remove variant suffix like -600w
  const cleanName = baseName.replace(/-\d+w$/, '');
  const prefix = cleanName.replace(/_p_\d+$/, '').split('_')[0];
  return LOCATION_MAP[prefix] || 'Japon';
}

(async () => {
  const allFiles = await readdir(PICTURES_DIR);
  const sourceFiles = await readdir(SOURCES_DIR);
  const exifCache = JSON.parse(
    await readFile(EXIF_CACHE_FILE, 'utf8').catch(() => '{}')
  );

  const readOriginalExif = async (baseName) => {
    const original = sourceFiles.find(
      (f) => f.startsWith(`${baseName}.`) && f.endsWith('.original')
    );
    if (!original) return undefined;
    const { exif } = await sharp(join(SOURCES_DIR, original)).metadata();
    return parseExif(exif ?? null) ?? undefined;
  };

  const files = allFiles
    .filter((f) => {
      if (!f.endsWith('.webp')) return false;
      // Skip variant files (ending with -600w, -1200w, ...)
      if (/-\d+w\.webp$/.test(f)) return false;
      // Skip original backups
      if (f.includes('.original')) return false;
      return true;
    })
    .sort();

  const manifest = await Promise.all(
    files.map(async (file) => {
      const filePath = join(PICTURES_DIR, file);
      const meta = await sharp(filePath).metadata();
      const { width, height } = meta;
      const location = getLocationFromFilename(file);

      const baseName = basename(file, '.webp');
      const exif =
        (await readOriginalExif(baseName)) ?? exifCache[file] ?? null;

      // Read variants from disk so the srcSet never points to a missing file.
      const variants = allFiles
        .map((f) => f.match(new RegExp(`^${baseName}-(\\d+)w\\.webp$`)))
        .filter(Boolean)
        .map(([, w]) => Number(w))
        .sort((a, b) => a - b)
        .map((w) => ({
          src: `/images/${baseName}-${w}w.webp`,
          width: w,
          height: Math.round(((height ?? 800) / (width ?? 1200)) * w),
        }));

      return {
        file,
        src: `/images/${file}`,
        location,
        width: width ?? 1200,
        height: height ?? 800,
        exif,
        variants: variants.length > 0 ? variants : undefined,
      };
    })
  );

  const nextExifCache = Object.fromEntries(
    manifest.filter((entry) => entry.exif).map((entry) => [entry.file, entry.exif])
  );

  await writeFile(OUTPUT_FILE, JSON.stringify(manifest, null, 2));
  await writeFile(EXIF_CACHE_FILE, JSON.stringify(nextExifCache, null, 2));
  const withExif = Object.keys(nextExifCache).length;
  console.log(
    `✓ Gallery manifest generated: ${manifest.length} images (${withExif} with EXIF)`
  );
})();
