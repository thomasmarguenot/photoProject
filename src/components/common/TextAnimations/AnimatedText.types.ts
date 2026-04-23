import type { Variants } from 'framer-motion';
import type { ReactNode } from 'react';

export interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  /** Inherit animation from parent stagger container instead of self-triggering */
  orchestrated?: boolean;
}
