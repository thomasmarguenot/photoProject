import { lazy } from 'react';

import { ROUTES } from '@/utils/constants';

// Single source of truth for page dynamic imports. The same specifier is reused
// by lazy() and by the preloaders, so Vite serves one shared chunk per page.
const importers = {
  home: () => import('@/pages/Home/Home'),
  about: () => import('@/pages/About/About'),
  gallery: () => import('@/pages/Gallery/Gallery'),
  charte: () => import('@/pages/Charte/Charte'),
  contact: () => import('@/pages/Contact/Contact'),
  notFound: () => import('@/pages/NotFound/NotFound'),
};

export const Home = lazy(importers.home);
export const About = lazy(importers.about);
export const Gallery = lazy(importers.gallery);
export const Charte = lazy(importers.charte);
export const Contact = lazy(importers.contact);
export const NotFound = lazy(importers.notFound);

export const pagePreloaders: Record<string, () => Promise<unknown>> = {
  [ROUTES.HOME]: importers.home,
  [ROUTES.GALLERY]: importers.gallery,
  [ROUTES.ABOUT]: importers.about,
  [ROUTES.CHARTE]: importers.charte,
  [ROUTES.CONTACT]: importers.contact,
};

export const preloadRoute = (to: string) => pagePreloaders[to]?.();
