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
  isInfoOpen: boolean;
  onToggleInfo: () => void;
}

export interface LightboxSlideProps {
  image: ImageData;
  direction: number;
  variants: Variants;
  isInfoOpen: boolean;
  onToggleInfo: () => void;
}

export interface LightboxInfoProps {
  image: ImageData;
  isOpen: boolean;
  isVisible: boolean;
  onToggle: () => void;
}

export interface PhotoDetail {
  label: string;
  value: string;
}
