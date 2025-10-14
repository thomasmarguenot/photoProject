export interface GalleryGridProps {
  images: Array<{ src: string; alt: string }>;
  onImageClick: (index: number) => void;
  selectedIndex: number | null;
  isLightboxOpen: boolean;
  shouldExpand: boolean;
}
