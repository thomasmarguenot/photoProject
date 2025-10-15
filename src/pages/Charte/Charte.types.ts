import type { ReactNode } from 'react';

export interface ColorCardProps {
  name: string;
  value: string;
  description?: string;
}

export interface TypographyExampleProps {
  tag:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body-large'
    | 'body'
    | 'small';
  text: string;
}

export interface ButtonExampleProps {
  variant: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
  onClick?: () => void;
}

export interface SpacingExampleProps {
  size: string;
  value: string;
}
