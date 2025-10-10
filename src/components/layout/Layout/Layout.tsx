import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingFallback } from '@/components/common/LoadingFallback';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import './Layout.css';

export function Layout() {
  return (
    <div className="layout">
      <Header />
      <main className="layout-main">
        <Suspense fallback={<LoadingFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
