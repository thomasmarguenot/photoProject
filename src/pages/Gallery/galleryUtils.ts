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
  // Shuffle arrays for better mixing
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
    // Add up to 2 landscape images if available
    for (let i = 0; i < 2 && landscapeIndex < shuffledLandscape.length; i++) {
      mixedImages.push(shuffledLandscape[landscapeIndex++]);
    }

    // Add 1 portrait image if available
    if (portraitIndex < shuffledPortrait.length) {
      mixedImages.push(shuffledPortrait[portraitIndex++]);
    }
  }

  // Append remaining landscape images
  while (landscapeIndex < shuffledLandscape.length) {
    mixedImages.push(shuffledLandscape[landscapeIndex++]);
  }

  // Append remaining portrait images one by one
  while (portraitIndex < shuffledPortrait.length) {
    mixedImages.push(shuffledPortrait[portraitIndex++]);
  }

  return mixedImages;
}
