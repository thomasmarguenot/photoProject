import { useState, useEffect } from 'react';

import type { ImageFormat } from './Gallery.types';
import { loadImagesFromModules, mixImages } from './galleryUtils';

export function useGalleryImages() {
  const [images, setImages] = useState<
    Array<{ src: string; alt: string; format: ImageFormat }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const landscapeModules = import.meta.glob<{ default: string }>(
      '@/assets/pictures/landscape/*.webp'
    );
    const portraitModules = import.meta.glob<{ default: string }>(
      '@/assets/pictures/portrait/*.webp'
    );

    const loadImages = async () => {
      setIsLoading(true);

      const [landscapeImages, portraitImages] = await Promise.all([
        loadImagesFromModules(landscapeModules, 'landscape'),
        loadImagesFromModules(portraitModules, 'portrait'),
      ]);

      const mixedImages = mixImages(landscapeImages, portraitImages);
      setImages(mixedImages);
      setIsLoading(false);
    };

    loadImages();
  }, []);

  return { images, isLoading };
}
