import { Link } from 'react-router-dom';

import type { FooterProps } from './types';
import './Footer.css';

export function Footer({
  year = new Date().getFullYear(),
  companyName = 'PhotoProject',
}: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">
            © {year} {companyName}. All rights reserved.
          </p>
          <div className="footer-links">
            <Link to="/privacy" className="footer-link">
              Privacy Policy
            </Link>
            <Link to="/terms" className="footer-link">
              Terms of Service
            </Link>
            <Link to="/contact" className="footer-link">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
