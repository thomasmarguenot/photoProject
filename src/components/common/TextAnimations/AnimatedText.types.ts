import type { ReactNode } from 'react';
import type { Variants } from 'framer-motion';

export interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}
