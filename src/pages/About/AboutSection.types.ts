import type { MotionValue } from 'framer-motion';
import type { ReactNode } from 'react';

export interface AboutSectionProps {
  title: string;
  borderColor: MotionValue<string>;
  className?: string;
  children: ReactNode;
}
