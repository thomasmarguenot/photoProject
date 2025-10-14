export const APP_NAME = 'PhotoProject';
export const APP_VERSION = '0.0.0';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const ANIMATION = {
  DURATION: 0.6,
  EASING: [0.25, 0.46, 0.45, 0.94] as const,
  EASING_SMOOTH: [0.32, 0.72, 0, 1] as const,
} as const;

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
} as const;
