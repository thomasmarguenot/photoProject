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

/** Per-item reveal driven by scroll (whileInView). Opacity + scale only —
 *  vertical motion is owned by the parallax MotionValue on the same element. */
export const galleryRevealVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: ANIMATION.DURATION_SLOW, ease: EASE_SMOOTH },
  },
};

/** Crossfade for the whole grid when the active filter changes — masks the
 *  per-item reveal so a category swap reads as one deliberate transition
 *  instead of a blink. */
export const galleryFilterSwapVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: ANIMATION.DURATION_FAST, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: EASE_SMOOTH },
  },
};

/** Lightbox backdrop fade (the blurred layer behind the photo). */
export const lightboxBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE_DEFAULT } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: EASE_DEFAULT } },
};

/** Full-stage slide for the lightbox. `custom` is the direction:
 *  +1 next, -1 prev → opaque cover-slide (no opacity dip → no blink);
 *  0 open/close → centered zoom. The incoming slide stays at z-index 2 and
 *  fully opaque so it always covers the centre — only the outgoing one fades. */
export const lightboxSlideVariants: Variants = {
  enter: (direction: number) =>
    direction === 0
      ? { opacity: 0, x: 0, scale: 0.92, zIndex: 2 }
      : { opacity: 1, x: direction * 180, scale: 1, zIndex: 2 },
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    zIndex: 2,
    transition: { duration: ANIMATION.DURATION, ease: EASE_SMOOTH },
  },
  exit: (direction: number) =>
    direction === 0
      ? {
          opacity: 0,
          x: 0,
          scale: 0.96,
          zIndex: 1,
          transition: { duration: ANIMATION.DURATION_FAST, ease: EASE_SMOOTH },
        }
      : {
          opacity: 0,
          x: direction * -90,
          scale: 1,
          zIndex: 1,
          transition: { duration: ANIMATION.DURATION, ease: EASE_SMOOTH },
        },
};

/** Reduced-motion lightbox transition: opacity only, no movement. */
export const lightboxSlideVariantsReduced: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1, transition: { duration: ANIMATION.DURATION_FAST } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/** Fade-in for the lightbox chrome (close / nav / counter). */
export const lightboxChromeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: ANIMATION.DURATION_FAST, delay: 0.15 },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};
