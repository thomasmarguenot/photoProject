import { useState, useEffect } from 'react';

import type { ImageData } from './Gallery.types';

export function useGalleryImages() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Use eager mode to load all images in parallel instead of sequentially
    const imageModules = import.meta.glob<{ default: string }>(
      '@/assets/pictures/**/*.webp',
      { eager: true }
    );

    const loadImages = async () => {
      setIsLoading(true);

      const loadedImages = Object.entries(imageModules).map(
        ([path, module]) => {
          const fileName = path.split('/').pop()?.split('.')[0] || 'image';
          const isPortrait = path.includes('/portrait/');

          return {
            src: module.default,
            alt: fileName.replace(/[-_]/g, ' '),
            // Provide default dimensions based on orientation to prevent CLS
            width: isPortrait ? 800 : 1200,
            height: isPortrait ? 1200 : 800,
          };
        }
      );

      setImages(loadedImages);
      setIsLoading(false);
    };

    loadImages();
  }, []);

  return { images, isLoading };
}
