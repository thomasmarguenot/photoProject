import { useState, useEffect } from 'react';

import type { ImageData } from './Gallery.types';

// Load real image dimensions
function loadImageDimensions(
  src: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      // Fallback to default landscape dimensions if loading fails
      resolve({ width: 1200, height: 800 });
    };
    img.src = src;
  });
}

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

      const imagePromises = Object.entries(imageModules).map(
        async ([path, module]) => {
          const fileName = path.split('/').pop()?.split('.')[0] || 'image';
          const src = module.default;

          // Load real dimensions
          const dimensions = await loadImageDimensions(src);

          return {
            src,
            alt: fileName.replace(/[-_]/g, ' '),
            width: dimensions.width,
            height: dimensions.height,
          };
        }
      );

      const loadedImages = await Promise.all(imagePromises);
      setImages(loadedImages);
      setIsLoading(false);
    };

    loadImages();
  }, []);

  return { images, isLoading };
}
