import { readdir, readFile, writeFile } from 'fs/promises';
import { join, resolve } from 'path';
import sharp from 'sharp';

const [targetDir] = process.argv.slice(2);

async function rotatePortraitImages() {
  if (!targetDir) {
    console.error('Usage: pnpm rotate-portraits <directory>');
    process.exit(1);
  }

  const dir = resolve(targetDir);
  console.log(`🔄 Rotating images in ${dir}...\n`);

  try {
    const files = await readdir(dir);
    const imageFiles = files.filter((file) =>
      /\.(webp|jpg|jpeg|png)$/i.test(file)
    );

    if (imageFiles.length === 0) {
      console.log('❌ No images found in', dir);
      return;
    }

    console.log(`📸 ${imageFiles.length} images found\n`);

    for (const file of imageFiles) {
      const filePath = join(dir, file);

      try {
        const imageBuffer = await readFile(filePath);
        const rotatedBuffer = await sharp(imageBuffer).rotate(270).toBuffer();
        await writeFile(filePath, rotatedBuffer);

        console.log(`✅ ${file} - rotated 270°`);
      } catch (error) {
        console.error(`❌ Error with ${file}:`, error.message);
      }
    }

    console.log('\n✨ Rotation done!');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

rotatePortraitImages();
