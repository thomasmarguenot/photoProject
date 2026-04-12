import type { Variants } from 'framer-motion';

import { ANIMATION } from './constants';

type BezierEasing = [number, number, number, number];

const EASE_DEFAULT = [...ANIMATION.EASING] as BezierEasing;
const EASE_REVEAL = [...ANIMATION.EASING_REVEAL] as BezierEasing;

/** Reveals an element via clip-path (left→right), border-radius preserved */
export const imageRevealVariants: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0 round 24px)' },
  visible: {
    clipPath: 'inset(0 0% 0 0 round 24px)',
    transition: {
      duration: ANIMATION.DURATION_REVEAL,
      ease: EASE_REVEAL,
      delay: 0.4,
    },
  },
};

/** Fades an element up into position */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION.DURATION_SLOW,
      ease: EASE_DEFAULT,
    },
  },
};

/** Container that staggers its direct motion children */
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};
