import type { ImageVariant } from './Gallery.types';

// Shared by the grid and the lightbox: given the same srcset and sizes, the
// browser picks the same file, so the lightbox opens on an already cached image.
export const GALLERY_IMAGE_SIZES =
  '(max-width: 600px) 600px, (max-width: 1200px) 1200px, 1800px';

export const toSrcSet = (variants?: ImageVariant[]) =>
  variants?.length
    ? variants.map((v) => `${v.src} ${v.width}w`).join(', ')
    : undefined;
