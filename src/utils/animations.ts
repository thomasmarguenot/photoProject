import type { Transition, Variants } from 'framer-motion';

import { ANIMATION } from './constants';

type BezierEasing = [number, number, number, number];

export const EASE_DEFAULT = [...ANIMATION.EASING] as BezierEasing;
export const EASE_SMOOTH = [...ANIMATION.EASING_SMOOTH] as BezierEasing;
export const EASE_REVEAL = [...ANIMATION.EASING_REVEAL] as BezierEasing;

/** Base transitions derived from constants — use as building blocks */
export const baseTransition: Transition = {
  duration: ANIMATION.DURATION,
  ease: EASE_DEFAULT,
};

export const slowTransition: Transition = {
  duration: ANIMATION.DURATION_SLOW,
  ease: EASE_DEFAULT,
};

export const revealTransition: Transition = {
  duration: ANIMATION.DURATION_REVEAL,
  ease: EASE_REVEAL,
};

/**
 * Factory: clip-path reveal. No delay baked in — sequencing is a parent/stagger
 * concern so the variant stays reusable in any context.
 */
export const createClipRevealVariants = (
  direction: 'left' | 'right' = 'left',
  radius: number = ANIMATION.REVEAL_RADIUS
): Variants => {
  const hidden =
    direction === 'right'
      ? { clipPath: `inset(0 0 0 100% round ${radius}px)` }
      : { clipPath: `inset(0 100% 0 0 round ${radius}px)` };

  return {
    hidden,
    visible: {
      clipPath: `inset(0 0% 0 0% round ${radius}px)`,
      transition: revealTransition,
    },
  };
};

/** Factory: fade + translateY. Distance configurable; no built-in delay. */
export const createFadeUpVariants = (
  distance: number = ANIMATION.OFFSET.SM,
  transition: Transition = slowTransition
): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition },
});

/** Factory: orchestrating parent — staggers direct motion children. */
export const createStaggerContainer = (
  staggerChildren: number = ANIMATION.STAGGER.CHILDREN,
  delayChildren: number = ANIMATION.STAGGER.DELAY_CHILDREN
): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/* ——— Named presets (thin wrappers around the factories) ——— */

export const imageRevealVariants = createClipRevealVariants('left');
export const imageRevealVariantsRight = createClipRevealVariants('right');

export const fadeUpVariants = createFadeUpVariants(ANIMATION.OFFSET.SM);
export const fadeUpVariants30 = createFadeUpVariants(
  ANIMATION.OFFSET.MD,
  baseTransition
);

export const fadeOpacityVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

export const staggerContainerVariants = createStaggerContainer();

export const galleryFilterContainerVariants = createStaggerContainer(0.08, 0.1);

export const galleryFilterItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const galleryGridContainerVariants = createStaggerContainer(0.06, 0.05);

export const galleryImageItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: ANIMATION.DURATION, ease: EASE_SMOOTH },
  },
};
