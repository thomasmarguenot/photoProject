import { useIsMobile } from '@/hooks/useIsMobile';

import type { FooterProps } from './Footer.types';
import './Footer.css';

export function Footer({
  year = new Date().getFullYear(),
  companyName = 'Agence Belle Époque',
}: FooterProps) {
  const isMobile = useIsMobile();

  return (
    <footer className="footer">
      <div className={`footer-bg ${!isMobile ? 'footer-bg--animated' : ''}`} />
      <div className="footer-container">
        <p
          className={`footer-text ${!isMobile ? 'footer-text--animated' : ''}`}
        >
          © {year} Thomas Marguenot - {companyName}.
        </p>
      </div>
    </footer>
  );
}
