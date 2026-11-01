export interface ImageExif {
  make?: string;
  model?: string;
  lensModel?: string;
  focalLength?: number;
  focalLength35?: number;
  fNumber?: number;
  exposureTime?: string;
  exposureBias?: number;
  iso?: number;
  takenAt?: string; // YYYY-MM-DD
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

export type Location =
  | 'Corée'
  | 'Japon'
  | 'Marseille'
  | 'Paris'
  | 'Vietnam'
  | 'Tous';
