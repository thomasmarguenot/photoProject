import type { ImageFormat } from '../Gallery.types';

export interface LightboxProps {
  image: {
    src: string;
    alt: string;
    format: ImageFormat;
  };
  onClose: () => void;
}
