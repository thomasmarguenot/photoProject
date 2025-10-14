import type { ImageData } from '../Gallery.types';

export interface GalleryGridProps {
  images: ImageData[];
  onImageClick: (index: number) => void;
  selectedIndex: number | null;
  isLightboxOpen: boolean;
  shouldExpand: boolean;
}
