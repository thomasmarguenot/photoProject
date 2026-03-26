import type { Variants } from 'framer-motion';

import { ANIMATION, TRANSITION } from '@/utils/constants';

export const ANIMATION_DURATION = ANIMATION.DURATION;
export const ANIMATION_EASING = ANIMATION.EASING;

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.08,
      delayChildren: 0.25,
    },
  },
};

export const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: TRANSITION.SMOOTH,
  },
  visible: {
    opacity: 1,
    transition: TRANSITION.SMOOTH,
  },
};
