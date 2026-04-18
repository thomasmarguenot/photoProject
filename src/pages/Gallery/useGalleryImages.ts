import { useMemo } from 'react';

import manifest from '@/assets/gallery-manifest.json';

import type { ImageData, ImageExif, Location } from './Gallery.types';

const LOCATION_MAP: Record<string, string> = {
  japon: 'Japon',
  marseille: 'Marseille',
  paris: 'Paris',
  vietnam: 'Vietnam',
};

const imageModules = import.meta.glob<{ default: string }>(
  '@/assets/pictures/*.webp',
  { eager: true }
);

const srcByFile: Record<string, string> = Object.fromEntries(
  Object.entries(imageModules).map(([path, mod]) => [
    path.split('/').pop() ?? '',
    mod.default,
  ])
);

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useGalleryImages() {
  const { images, locations } = useMemo(() => {
    const imgs: ImageData[] = shuffle(
      manifest
        .filter((entry) => srcByFile[entry.file])
        .map((entry) => ({
          src: srcByFile[entry.file],
          alt: entry.file.replace(/[-_]/g, ' ').replace('.webp', ''),
          location: (LOCATION_MAP[entry.location.toLowerCase()] ??
            entry.location) as ImageData['location'],
          width: entry.width,
          height: entry.height,
          exif: (entry as { exif?: ImageExif }).exif,
        }))
    );

    const uniqueLocations = [...new Set(imgs.map((img) => img.location))];
    const orderedLocations: Location[] = [
      'Tous' as Location,
      ...(uniqueLocations.sort() as Location[]),
    ];

    return { images: imgs, locations: orderedLocations };
  }, []);

  return { images, isLoading: false, locations };
}
