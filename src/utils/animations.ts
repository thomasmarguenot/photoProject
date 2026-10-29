import type { Transition, Variants } from 'framer-motion';

import { ANIMATION } from './constants';

type BezierEasing = [number, number, number, number];

const EASE_DEFAULT = [...ANIMATION.EASING] as BezierEasing;
const EASE_SMOOTH = [...ANIMATION.EASING_SMOOTH] as BezierEasing;
const EASE_REVEAL = [...ANIMATION.EASING_REVEAL] as BezierEasing;

/** Base transitions derived from constants — use as building blocks */
export const baseTransition: Transition = {
  duration: ANIMATION.DURATION,
  ease: EASE_DEFAULT,
};

const slowTransition: Transition = {
  duration: ANIMATION.DURATION_SLOW,
  ease: EASE_DEFAULT,
};

/** Factory: fade + translateY. Distance configurable; no built-in delay. */
const createFadeUpVariants = (
  distance: number = ANIMATION.OFFSET.SM,
  transition: Transition = slowTransition
): Variants => ({
  hidden: { opacity: 0, y: distance },
  visible: { opacity: 1, y: 0, transition },
});

/** Factory: orchestrating parent — staggers direct motion children. */
const createStaggerContainer = (
  staggerChildren: number = ANIMATION.STAGGER.CHILDREN,
  delayChildren: number = ANIMATION.STAGGER.DELAY_CHILDREN
): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/* ——— Shared presets ——— */

export const fadeUpVariants = createFadeUpVariants(ANIMATION.OFFSET.SM);
export const fadeUpVariants30 = createFadeUpVariants(
  ANIMATION.OFFSET.MD,
  baseTransition
);
/** Item of a page-level cascade (hero, about, contact). */
export const pageItemVariants = createFadeUpVariants(ANIMATION.OFFSET.MD);

export const fadeOpacityVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

export const staggerContainerVariants = createStaggerContainer();
export const pageStaggerVariants = createStaggerContainer(
  ANIMATION.STAGGER.CHILDREN_WIDE,
  ANIMATION.DELAY.XS
);
export const sectionStaggerVariants = createStaggerContainer(
  ANIMATION.STAGGER.CHILDREN,
  ANIMATION.DELAY.SM
);

/** Variable-font weight morph for headings. */
export const fontWeightVariants: Variants = {
  hidden: { fontVariationSettings: '"wght" 400', opacity: 0 },
  visible: {
    fontVariationSettings: '"wght" 800',
    opacity: 1,
    transition: { duration: ANIMATION.DURATION_FONT_MORPH, ease: EASE_DEFAULT },
  },
};

/* ——— Layout ——— */

/** Full-screen wipe between pages. Starts off-screen on the side the user
 *  navigates from (`offLeft` / `offRight`). */
export const pageTransitionOverlayVariants: Variants = {
  offLeft: { x: '-100%' },
  offRight: { x: '100%' },
  cover: {
    x: '0%',
    transition: { duration: ANIMATION.DURATION, ease: EASE_DEFAULT },
  },
};

const headerTransition: Transition = {
  duration: ANIMATION.DURATION_FAST,
  ease: EASE_DEFAULT,
};

/** `hidden` slides the header away (e.g. while the gallery lightbox is open). */
export const headerVariants: Variants = {
  enter: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...headerTransition, delay: ANIMATION.DELAY.HEADER },
  },
  hidden: { opacity: 0, y: -100, transition: headerTransition },
};

export const mobileMenuOverlayVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: ANIMATION.DURATION_FAST } },
  visible: { opacity: 1, transition: { duration: ANIMATION.DURATION_FAST } },
};

export const mobileMenuNavVariants = createStaggerContainer(
  ANIMATION.STAGGER.MENU,
  ANIMATION.DELAY.MENU
);

export const mobileMenuItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: ANIMATION.SPRING },
};

/* ——— Home ——— */

export const scrollArrowVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: ANIMATION.DELAY.AFTER_FIRST_VIEWPORT },
  },
};

// Clients cascade starts only once the Hero cascade has settled,
// so the first-viewport sequence reads as one continuous flow.
export const clientsSectionVariants = createStaggerContainer(
  0,
  ANIMATION.DELAY.SECTION_AFTER_HERO
);

// EASE_REVEAL is an s-curve: visually the bg reads as "done" before the
// animation technically ends. Trim ~15% so content kicks in when the eye expects it.
export const clientsContentVariants = createStaggerContainer(
  ANIMATION.STAGGER.CHILDREN_WIDE,
  ANIMATION.DURATION_REVEAL * 0.85
);

export const clientsBgVariants: Variants = {
  hidden: { height: '0%' },
  visible: {
    height: '100%',
    transition: { duration: ANIMATION.DURATION_REVEAL, ease: EASE_REVEAL },
  },
};

export const clientsMarqueeAnimation = { x: ['0%', '-50%'] };

export const clientsMarqueeTransition: Transition = {
  repeat: Infinity,
  repeatType: 'loop',
  duration: ANIMATION.MARQUEE_DURATION,
  ease: 'linear',
};

export const projectPanelVariants: Variants = {
  collapsed: { height: 0, opacity: 0, transition: baseTransition },
  expanded: { height: 'auto', opacity: 1, transition: baseTransition },
};

export const agencyServicesVariants = createStaggerContainer(
  ANIMATION.STAGGER.CHILDREN,
  ANIMATION.DELAY.AGENCY_SERVICES
);

export const lineGrowXVariants: Variants = {
  hidden: { width: '0%' },
  visible: { width: '100%', transition: slowTransition },
};

export const lineGrowYVariants: Variants = {
  hidden: { height: '0%' },
  visible: { height: '100%', transition: baseTransition },
};

/* ——— Gallery ——— */

export const galleryFilterContainerVariants = createStaggerContainer(0.08, 0.1);

export const galleryFilterItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const galleryFilterUnderlineTransition: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 34,
};

/** Fades the filter bar out while the lightbox is open. */
export const galleryFilterBarVariants: Variants = {
  visible: { opacity: 1, transition: { duration: 0.2 } },
  dimmed: { opacity: 0, transition: { duration: 0.2 } },
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
    transition: { duration: ANIMATION.DURATION_XFAST, ease: EASE_SMOOTH },
  },
};

/** Lightbox backdrop fade (the blurred layer behind the photo). */
export const lightboxBackdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: EASE_DEFAULT } },
  exit: {
    opacity: 0,
    transition: { duration: ANIMATION.DURATION_FAST, ease: EASE_DEFAULT },
  },
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
  exit: { opacity: 0, transition: { duration: ANIMATION.DURATION_XFAST } },
};

/** Fade-in for the lightbox chrome (close / nav / counter). */
export const lightboxChromeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: ANIMATION.DURATION_FAST, delay: 0.15 },
  },
  exit: { opacity: 0, transition: { duration: ANIMATION.DURATION_XFAST } },
};
