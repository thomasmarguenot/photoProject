export const APP_NAME = 'PhotoProject';
export const APP_VERSION = '0.0.0';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const ANIMATION = {
  /** Standard duration for most transitions (0.6s) */
  DURATION: 0.6,
  /** Slightly longer duration for emphasis animations (0.7s) */
  DURATION_SLOW: 0.7,
  /** Quick micro-interactions (0.3s) */
  DURATION_FAST: 0.3,
  /** Variable-font weight morph duration (0.8s) */
  DURATION_FONT_MORPH: 0.8,
  /** Standard easing — ease-out-quad feel */
  EASING: [0.25, 0.46, 0.45, 0.94] as const,
  /** Smooth Apple-style easing */
  EASING_SMOOTH: [0.32, 0.72, 0, 1] as const,
  /** Dramatic reveal easing — slow start, hard stop */
  EASING_REVEAL: [0.76, 0, 0.24, 1] as const,
  /** Duration for width/clip reveal animations */
  DURATION_REVEAL: 1.5,
  /** Spring config for staggered reveals */
  SPRING: { type: 'spring' as const, stiffness: 300, damping: 24 },
} as const;

/** Reusable Framer Motion transition presets */
export const TRANSITION = {
  /** Default page/section entrance */
  DEFAULT: { duration: ANIMATION.DURATION, ease: ANIMATION.EASING },
  /** Smooth entrance for hero/gallery elements */
  SMOOTH: { duration: ANIMATION.DURATION, ease: ANIMATION.EASING_SMOOTH },
  /** Slower entrance for whileInView sections */
  SLOW: { duration: ANIMATION.DURATION_SLOW, ease: ANIMATION.EASING },
  /** Fast micro-interaction (hover, tooltip, etc.) */
  FAST: { duration: ANIMATION.DURATION_FAST },
  /** Variable-font weight morphing */
  FONT_MORPH: {
    duration: ANIMATION.DURATION_FONT_MORPH,
    ease: ANIMATION.EASING_SMOOTH,
  },
  /** Spring for staggered list items */
  SPRING: ANIMATION.SPRING,
} as const;

/** Reusable Framer Motion initial/animate pairs */
export const MOTION = {
  FADE_UP: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
  },
  FADE_IN: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  /** Variable-font weight animation (400 → 900, hover → 100) */
  FONT_WEIGHT: {
    initial: {
      fontVariationSettings: '"wght" 400',
      fontStyle: 'normal' as const,
    },
    animate: {
      fontVariationSettings: '"wght" 900',
      fontStyle: 'normal' as const,
    },
    whileHover: {
      fontVariationSettings: '"wght" 100',
      fontStyle: 'normal' as const,
    },
  },
} as const;

export const ROUTES = {
  HOME: '/',
  GALLERY: '/gallery',
  ABOUT: '/about',
  CHARTE: '/charte',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
} as const;

// Canonical page order to infer navigation direction for global page transitions
// Update this array if you change route structure. Keep paths as defined in ROUTES
export const PAGE_ORDER = [
  ROUTES.HOME,
  ROUTES.GALLERY,
  ROUTES.ABOUT,
  ROUTES.CHARTE,
  ROUTES.CONTACT,
] as const;
