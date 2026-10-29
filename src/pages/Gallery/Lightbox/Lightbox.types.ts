import type { Variants } from 'framer-motion';
import type { RefObject } from 'react';

import type { ImageData } from '../Gallery.types';

export interface LightboxProps {
  images: ImageData[];
  index: number | null;
  direction: number;
  reducedMotion: boolean;
  dialogRef: RefObject<HTMLDivElement | null>;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export interface LightboxSlideProps {
  image: ImageData;
  direction: number;
  variants: Variants;
}
