export interface ImageExif {
  make?: string;
  model?: string;
  focalLength?: number;
  fNumber?: number;
  exposureTime?: string;
  iso?: number;
}

export interface ImageVariant {
  src: string;
  width: number;
  height: number;
}

export interface ImageData {
  src: string;
  alt: string;
  location: string;
  width?: number;
  height?: number;
  exif?: ImageExif;
  variants?: ImageVariant[];
}

export type ImageFormat = 'portrait' | 'landscape' | 'large';

export type Location = 'Japon' | 'Marseille' | 'Paris' | 'Vietnam' | 'Tous';
