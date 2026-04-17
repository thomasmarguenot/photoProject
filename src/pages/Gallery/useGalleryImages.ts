import { useState, useEffect } from 'react';

import type { ImageData, Location } from './Gallery.types';

const LOCATION_MAP: Record<string, string> = {
  japon: 'Japon',
  marseille: 'Marseille',
  paris: 'Paris',
  vietnam: 'Vietnam',
};

function loadImageDimensions(
  src: string
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = () => {
      resolve({ width: 1200, height: 800 });
    };
    img.src = src;
  });
}

function getLocationFromFilename(filename: string): string {
  const baseName = filename.split('/').pop()?.replace('.webp', '') || '';
  // Handle both "japon_001" and "japon_p_001" formats
  const prefix = baseName.replace(/_p_\d+$/, '').split('_')[0];
  return LOCATION_MAP[prefix] || 'Japon';
}

export function useGalleryImages() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    const imageModules = import.meta.glob<{ default: string }>(
      '@/assets/pictures/*.webp',
      { eager: true }
    );

    const loadImages = async () => {
      setIsLoading(true);

      const imagePromises = Object.entries(imageModules).map(
        async ([path, module]) => {
          const fileName = path.split('/').pop() || 'image';
          const location = getLocationFromFilename(fileName);
          const dimensions = await loadImageDimensions(module.default);

          return {
            src: module.default,
            alt: fileName.replace(/[-_]/g, ' ').replace('.webp', ''),
            location,
            width: dimensions.width,
            height: dimensions.height,
          };
        }
      );

      const loadedImages = await Promise.all(imagePromises);

      const uniqueImages = loadedImages.filter(
        (img, index, self) => index === self.findIndex((i) => i.src === img.src)
      );

      const uniqueLocations = [
        ...new Set(uniqueImages.map((img) => img.location)),
      ];
      const orderedLocations: Location[] = [
        'Tous' as Location,
        ...(uniqueLocations.sort() as Location[]),
      ];

      setImages(uniqueImages);
      setLocations(orderedLocations);
      setIsLoading(false);
    };

    loadImages();
  }, []);

  return { images, isLoading, locations };
}
