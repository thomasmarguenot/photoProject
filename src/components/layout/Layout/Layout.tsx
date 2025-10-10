import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import type { LayoutProps } from './types';
import './Layout.css';

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Header />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
}
