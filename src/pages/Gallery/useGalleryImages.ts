import { useMemo } from 'react';

import manifestJson from '@/assets/gallery-manifest.json';

import type {
  ImageData,
  ImageExif,
  ImageVariant,
  Location,
} from './Gallery.types';

interface ManifestEntry {
  file: string;
  src: string;
  location: string;
  width: number;
  height: number;
  exif?: ImageExif | null;
  variants?: ImageVariant[];
}

const manifest = manifestJson as ManifestEntry[];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function useGalleryImages() {
  return useMemo(() => {
    const images: ImageData[] = shuffle(
      manifest.map((entry) => ({
        src: entry.src,
        alt: entry.file.replace(/[-_]/g, ' ').replace('.webp', ''),
        location: entry.location,
        width: entry.width,
        height: entry.height,
        exif: entry.exif ?? undefined,
        variants: entry.variants,
      }))
    );

    const uniqueLocations = [...new Set(images.map((img) => img.location))];
    const locations: Location[] = [
      'Tous',
      ...(uniqueLocations.sort() as Location[]),
    ];

    return { images, locations };
  }, []);
}
