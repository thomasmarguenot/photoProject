import React from 'react';

import { useIsMobile } from '@/hooks/useIsMobile';

import type { FooterProps } from './Footer.types';
import './Footer.css';

export const Footer = (() => {
  const isMobile = useIsMobile();

  return (
    <footer className="footer">
      <div className={`footer-bg ${!isMobile ? 'footer-bg--animated' : ''}`} />
      <div className="footer-container">
        <p
          className={`footer-text ${!isMobile ? 'footer-text--animated' : ''}`}
        >
          © {new Date().getFullYear()} Thomas Marguenot - Agence Belle Époque.
        </p>
      </div>
    </footer>
  );
}) as React.FC<FooterProps>;
