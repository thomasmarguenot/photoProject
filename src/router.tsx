import { createBrowserRouter } from 'react-router-dom';

import { Layout } from '@/components/layout/Layout/Layout';
import {
  About,
  Charte,
  Contact,
  Gallery,
  Home,
  NotFound,
} from '@/pages/lazyPages';

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
