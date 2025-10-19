import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@/components/layout/Layout/Layout';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home/Home'));
const About = lazy(() => import('@/pages/About/About'));
const Gallery = lazy(() => import('@/pages/Gallery/Gallery'));
const Charte = lazy(() => import('@/pages/Charte/Charte'));
const Contact = lazy(() => import('@/pages/Contact/Contact'));
const NotFound = lazy(() => import('@/pages/NotFound/NotFound'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'gallery',
        element: <Gallery />,
      },
      {
        path: 'charte',
        element: <Charte />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
