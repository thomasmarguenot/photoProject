#!/usr/bin/env node

/**
 * Script to optimize existing images in src/assets/pictures/
 *
 * This script will:
 * - Resize images to max 2000px width (keeping aspect ratio)
 * - Compress images with 85% quality (imperceptible loss)
 * - Convert to WebP format (30-50% smaller)
 * - Keep original files as backup (.original extension)
 *
 * Usage: node scripts/optimize-images.js
 */

import { readdir, rename, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PICTURES_DIR = join(__dirname, '../src/assets/pictures');
const MAX_WIDTH = 2000;
const QUALITY = 100;

// Supported image extensions
const SUPPORTED_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.webp',
  '.JPG',
  '.JPEG',
  '.PNG',
  '.WEBP',
];

/**
 * Get file size in MB
 */
async function getFileSizeMB(filePath) {
  const stats = await stat(filePath);
  return (stats.size / (1024 * 1024)).toFixed(2);
}

/**
 * Optimize a single image
 */
async function optimizeImage(filePath) {
  const ext = extname(filePath);
  const base = basename(filePath, ext);
  const dir = dirname(filePath);

  console.log(`\n📸 Processing: ${basename(filePath)}`);

  try {
    // Get original size
    const originalSize = await getFileSizeMB(filePath);
    console.log(`   Original size: ${originalSize} MB`);

    // Load image and get metadata
    const image = sharp(filePath);
    const metadata = await image.metadata();

    console.log(`   Dimensions: ${metadata.width}x${metadata.height}px`);

    // Backup original file
    const backupPath = join(dir, `${base}${ext}.original`);
    await rename(filePath, backupPath);
    console.log(`   ✅ Backup created: ${basename(backupPath)}`);

    // Resize if needed and optimize. .rotate() bakes EXIF orientation into the
    // pixel data and strips the orientation tag — without it, Safari displays
    // portraits as landscape when the WebP encoder drops the EXIF marker.
    const shouldResize = metadata.width > MAX_WIDTH;
    let optimizedImage = sharp(backupPath).rotate();

    if (shouldResize) {
      optimizedImage = optimizedImage.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside',
      });
      console.log(`   🔄 Resizing to max ${MAX_WIDTH}px width`);
    }

    // Determine output format based on original
    const isJpeg = ['.jpg', '.jpeg', '.JPG', '.JPEG'].includes(ext);
    const isPng = ['.png', '.PNG'].includes(ext);

    if (isJpeg) {
      optimizedImage = optimizedImage.jpeg({ quality: QUALITY, mozjpeg: true });
    } else if (isPng) {
      optimizedImage = optimizedImage.png({
        quality: QUALITY,
        compressionLevel: 9,
      });
    }

    // Save optimized image
    await optimizedImage.toFile(filePath);

    // Get new size
    const newSize = await getFileSizeMB(filePath);
    const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);

    console.log(`   ✅ Optimized size: ${newSize} MB`);
    console.log(`   💾 Saved: ${reduction}% reduction`);

    // Also create WebP version for modern browsers
    const webpPath = join(dir, `${base}.webp`);
    await sharp(backupPath)
      .rotate()
      .resize(shouldResize ? MAX_WIDTH : null, null, {
        withoutEnlargement: true,
        fit: 'inside',
      })
      .webp({ quality: QUALITY })
      .toFile(webpPath);

    const webpSize = await getFileSizeMB(webpPath);
    const webpReduction = ((1 - webpSize / originalSize) * 100).toFixed(1);
    console.log(
      `   🚀 WebP created: ${webpSize} MB (${webpReduction}% reduction)`
    );

    return {
      file: basename(filePath),
      originalSize: parseFloat(originalSize),
      newSize: parseFloat(newSize),
      webpSize: parseFloat(webpSize),
      reduction: parseFloat(reduction),
      webpReduction: parseFloat(webpReduction),
    };
  } catch (error) {
    console.error(
      `   ❌ Error processing ${basename(filePath)}:`,
      error.message
    );
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🎨 Image Optimization Script\n');
  console.log(`📁 Directory: ${PICTURES_DIR}\n`);
  console.log('⚙️  Settings:');
  console.log(`   - Max width: ${MAX_WIDTH}px`);
  console.log(`   - Quality: ${QUALITY}%`);
  console.log(`   - Formats: Original + WebP`);
  console.log('─'.repeat(60));

  try {
    // Read directory
    const files = await readdir(PICTURES_DIR);
    const imageFiles = files.filter((file) => {
      const ext = extname(file);
      return SUPPORTED_EXTENSIONS.includes(ext) && !file.includes('.original');
    });

    if (imageFiles.length === 0) {
      console.log('\n⚠️  No images found to optimize.');
      return;
    }

    console.log(`\n📊 Found ${imageFiles.length} images to optimize\n`);

    // Process all images
    const results = [];
    for (const file of imageFiles) {
      const filePath = join(PICTURES_DIR, file);
      const result = await optimizeImage(filePath);
      if (result) {
        results.push(result);
      }
    }

    // Display summary
    console.log('\n' + '═'.repeat(60));
    console.log('📊 OPTIMIZATION SUMMARY');
    console.log('═'.repeat(60));

    const totalOriginal = results.reduce((sum, r) => sum + r.originalSize, 0);
    const totalNew = results.reduce((sum, r) => sum + r.newSize, 0);
    const totalWebP = results.reduce((sum, r) => sum + r.webpSize, 0);
    const avgReduction =
      results.reduce((sum, r) => sum + r.reduction, 0) / results.length;
    const avgWebPReduction =
      results.reduce((sum, r) => sum + r.webpReduction, 0) / results.length;

    console.log(`\n✅ Processed: ${results.length} images`);
    console.log(`\n📦 Total original size: ${totalOriginal.toFixed(2)} MB`);
    console.log(`📦 Total optimized size: ${totalNew.toFixed(2)} MB`);
    console.log(`📦 Total WebP size: ${totalWebP.toFixed(2)} MB`);
    console.log(`\n💾 Average reduction: ${avgReduction.toFixed(1)}%`);
    console.log(`🚀 Average WebP reduction: ${avgWebPReduction.toFixed(1)}%`);
    console.log(
      `\n💡 Tip: Use WebP images in production for best performance!`
    );
    console.log('💡 Original files backed up with .original extension');
    console.log('\n' + '═'.repeat(60) + '\n');
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
