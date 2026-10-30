export interface ColorToken {
  name: string;
  token: `--color-${string}`;
  description?: string;
}

export interface TypographyExample {
  label: string;
  element: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  text: string;
  fontSize?: string;
}

export interface ButtonExample {
  variant: 'primary' | 'secondary' | 'ghost';
  label: string;
}

export interface ScaleToken {
  size: string;
  value: string;
}

export interface CardExample {
  title: string;
  text: string;
}

export interface GlassExample extends CardExample {
  background: string;
  blur: string;
}
