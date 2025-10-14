import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORTRAIT_DIR = join(__dirname, '../src/assets/pictures/portrait');

async function rotatePortraitImages() {
  console.log('🔄 Rotation des images portrait...\n');

  try {
    const files = await readdir(PORTRAIT_DIR);
    const imageFiles = files.filter((file) =>
      /\.(webp|jpg|jpeg|png)$/i.test(file)
    );

    if (imageFiles.length === 0) {
      console.log('❌ Aucune image trouvée dans', PORTRAIT_DIR);
      return;
    }

    console.log(`📸 ${imageFiles.length} images trouvées\n`);

    for (const file of imageFiles) {
      const filePath = join(PORTRAIT_DIR, file);

      try {
        // Lire l'image
        const imageBuffer = await readFile(filePath);

        // Pivoter de 270° (ou -90°) dans le sens antihoraire
        const rotatedBuffer = await sharp(imageBuffer)
          .rotate(270) // Rotation de 270° (équivalent à -90°)
          .toBuffer();

        // Sauvegarder l'image pivotée
        await writeFile(filePath, rotatedBuffer);

        console.log(`✅ ${file} - pivoté de 270°`);
      } catch (error) {
        console.error(`❌ Erreur avec ${file}:`, error.message);
      }
    }

    console.log('\n✨ Rotation terminée !');
    console.log(
      '\n💡 Pensez à retirer la rotation CSS dans Gallery.css :'
    );
    console.log('   - Supprimer: transform: rotate(-90deg) scale(1.5);');
    console.log('   - Supprimer: aspect-ratio: 3/4;');
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    process.exit(1);
  }
}

rotatePortraitImages();
