import { useState, useEffect } from 'react';

export function useGalleryImages() {
  const [images, setImages] = useState<Array<{ src: string; alt: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const imageModules = import.meta.glob<{ default: string }>(
      '@/assets/pictures/**/*.webp'
    );

    const loadImages = async () => {
      setIsLoading(true);

      const imagePromises = Object.entries(imageModules).map(
        async ([path, importFunc]) => {
          const module = await importFunc();
          const fileName = path.split('/').pop()?.split('.')[0] || 'image';
          return {
            src: module.default,
            alt: fileName.replace(/[-_]/g, ' '),
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
