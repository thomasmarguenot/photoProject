import type { ImageFormat } from './Gallery.types';

export interface ImageModule {
  src: string;
  alt: string;
  format: ImageFormat;
}

export async function loadImagesFromModules(
  modules: Record<string, () => Promise<{ default: string }>>,
  format: ImageFormat
): Promise<ImageModule[]> {
  const promises = Object.entries(modules).map(async ([path, importFunc]) => {
    const module = await importFunc();
    const fileName = path.split('/').pop()?.split('.')[0] || 'image';
    return {
      src: module.default,
      alt: fileName.replace(/[-_]/g, ' '),
      format,
    };
  });

  return Promise.all(promises);
}

export function mixImages(
  landscapeImages: ImageModule[],
  portraitImages: ImageModule[]
): ImageModule[] {
  // Shuffle arrays pour un meilleur mélange
  const shuffledLandscape = [...landscapeImages].sort(
    () => Math.random() - 0.5
  );
  const shuffledPortrait = [...portraitImages].sort(() => Math.random() - 0.5);

  const mixedImages: ImageModule[] = [];
  let landscapeIndex = 0;
  let portraitIndex = 0;

  // Pattern: 2 landscape, 1 portrait
  while (
    landscapeIndex < shuffledLandscape.length &&
    portraitIndex < shuffledPortrait.length
  ) {
    // Ajouter 2 images landscape si disponibles
    for (let i = 0; i < 2 && landscapeIndex < shuffledLandscape.length; i++) {
      mixedImages.push(shuffledLandscape[landscapeIndex++]);
    }

    // Ajouter 1 image portrait si disponible
    if (portraitIndex < shuffledPortrait.length) {
      mixedImages.push(shuffledPortrait[portraitIndex++]);
    }
  }

  // Ajouter les images landscape restantes (s'il y en a)
  while (landscapeIndex < shuffledLandscape.length) {
    mixedImages.push(shuffledLandscape[landscapeIndex++]);
  }

  // Ajouter les images portrait restantes UNE PAR UNE (pas toutes d'un coup)
  while (portraitIndex < shuffledPortrait.length) {
    mixedImages.push(shuffledPortrait[portraitIndex++]);
  }

  return mixedImages;
}
