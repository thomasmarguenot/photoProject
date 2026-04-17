export interface ImageData {
  src: string;
  alt: string;
  location: string;
  width?: number;
  height?: number;
}

export type ImageFormat = 'portrait' | 'landscape' | 'large';

export type Location = 'Japon' | 'Marseille' | 'Paris' | 'Vietnam' | 'Tous';
