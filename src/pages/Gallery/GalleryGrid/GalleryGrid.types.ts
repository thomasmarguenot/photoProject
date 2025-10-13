import type { ImageFormat } from '../Gallery.types';

export interface GalleryGridProps {
  images: Array<{ src: string; alt: string; format: ImageFormat }>;
  onImageClick: (index: number) => void;
}
