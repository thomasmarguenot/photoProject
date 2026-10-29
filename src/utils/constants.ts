export const SITE_URL = 'https://thomasmarguenot.fr';

export const ANIMATION = {
  /** Standard duration for most transitions (0.6s) */
  DURATION: 0.6,
  /** Slightly longer duration for emphasis animations (0.7s) */
  DURATION_SLOW: 0.7,
  /** Quick micro-interactions (0.3s) */
  DURATION_FAST: 0.3,
  /** Exits and dismissals (0.15s) */
  DURATION_XFAST: 0.15,
  /** Variable-font weight morph duration (0.8s) */
  DURATION_FONT_MORPH: 0.8,
  /** Duration for width/clip reveal animations */
  DURATION_REVEAL: 2,
  /** Standard easing — ease-out-quad feel */
  EASING: [0.25, 0.46, 0.45, 0.94] as const,
  /** Smooth Apple-style easing */
  EASING_SMOOTH: [0.32, 0.72, 0, 1] as const,
  /** Dramatic reveal easing — slow start, hard stop */
  EASING_REVEAL: [0.76, 0, 0.24, 1] as const,
  /** Spring config for staggered reveals */
  SPRING: { type: 'spring' as const, stiffness: 300, damping: 24 },
  /** Sequencing delays (seconds) — use for orchestration, not inside variants */
  DELAY: {
    NONE: 0,
    XS: 0.1,
    SM: 0.2,
    MD: 0.4,
    LG: 0.6,
    XL: 0.85,
    /** Header entrance, after the page's first cascade has started */
    HEADER: 1,
    /** Mobile menu links start once the overlay has faded in */
    MENU: 0.15,
    /** Agency services list, after the section heading */
    AGENCY_SERVICES: 0.25,
    /** Waits for a preceding section's cascade to finish */
    SECTION_AFTER_HERO: 0.2,
    /** Fires after Hero + Clients cascades have settled */
    AFTER_FIRST_VIEWPORT: 2,
  },
  /** Stagger children config (seconds) */
  STAGGER: {
    CHILDREN: 0.15,
    CHILDREN_WIDE: 0.25,
    MENU: 0.07,
    DELAY_CHILDREN: 0.3,
  },
  /** Travel distance for fade-up variants (px) */
  OFFSET: {
    SM: 18,
    MD: 30,
  },
  /** Logo marquee loop duration (s) — lower = faster */
  MARQUEE_DURATION: 100,
} as const;

export const ROUTES = {
  HOME: '/',
  GALLERY: '/gallery',
  ABOUT: '/about',
  CHARTE: '/charte',
  CONTACT: '/contact',
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
