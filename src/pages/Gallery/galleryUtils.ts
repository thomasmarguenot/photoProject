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
  const mixedImages: ImageModule[] = [];
  let landscapeIndex = 0;
  let portraitIndex = 0;

  while (
    landscapeIndex < landscapeImages.length ||
    portraitIndex < portraitImages.length
  ) {
    for (let i = 0; i < 2 && landscapeIndex < landscapeImages.length; i++) {
      mixedImages.push(landscapeImages[landscapeIndex++]);
    }

    if (portraitIndex < portraitImages.length) {
      mixedImages.push(portraitImages[portraitIndex++]);
    }
  }

  return mixedImages;
}
