import type { ReactNode } from 'react';

export interface AnimatedHeadingProps {
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p';
  /** Inherit animation from parent stagger container instead of self-triggering */
  orchestrated?: boolean;
}
