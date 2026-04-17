import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { LoadingFallback } from '@/components/common/LoadingFallback/LoadingFallback';
import { Footer } from '@/components/layout/Footer/Footer';
import { Header } from '@/components/layout/Header/Header';
import PageTransitionProvider from '@/components/layout/PageTransition/PageTransition';
import { HeaderProvider, useHeader } from '@/context/Header.context';

import './Layout.css';

function HeaderWrapper() {
  const { hidden } = useHeader();
  return <Header hidden={hidden} />;
}

export function Layout() {
  return (
    <HeaderProvider>
      <Suspense fallback={<LoadingFallback />}>
        <div className="layout">
          <PageTransitionProvider>
            <HeaderWrapper />
            <main className="layout-main">
              <Outlet />
            </main>
            <Footer />
          </PageTransitionProvider>
          <Analytics />
        </div>
      </Suspense>
    </HeaderProvider>
  );
}
