import type { ImageData } from '../Gallery.types';

export interface GalleryGridProps {
  images: ImageData[];
  onImageClick: (index: number) => void;
  isLightboxOpen: boolean;
  /** Disables parallax (opacity-only) for accessibility. */
  reducedMotion: boolean;
}
