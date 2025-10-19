import type { Variants } from 'framer-motion';

import { ANIMATION } from '@/utils/constants';

export const ANIMATION_DURATION = ANIMATION.DURATION;
export const ANIMATION_EASING = ANIMATION.EASING;

const smoothTransition = {
  duration: ANIMATION.DURATION,
  ease: ANIMATION.EASING_SMOOTH,
};

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
    transition: smoothTransition,
  },
  visible: {
    opacity: 1,
    transition: smoothTransition,
  },
};
