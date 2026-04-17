import type { Variants } from 'framer-motion';

import { ANIMATION } from '@/utils/constants';

export const ANIMATION_DURATION = ANIMATION.DURATION;
export const ANIMATION_EASING = ANIMATION.EASING;

export const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};
