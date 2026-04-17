import type { Variants } from 'framer-motion';
import type { ReactNode } from 'react';

export interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}
