import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingFallback } from '@/components/common/LoadingFallback/LoadingFallback';
import { Footer } from '@/components/layout/Footer/Footer';
import { Header } from '@/components/layout/Header/Header';
import PageTransitionProvider from '@/components/layout/PageTransition/PageTransition';

import './Layout.css';

export function Layout() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <div className="layout">
        <PageTransitionProvider>
          <Header />
          <main className="layout-main">
            <Outlet />
          </main>
          <Footer />
        </PageTransitionProvider>
      </div>
    </Suspense>
  );
}
