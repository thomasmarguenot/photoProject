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
            <a href="/privacy" className="footer-link">
              Privacy Policy
            </a>
            <a href="/terms" className="footer-link">
              Terms of Service
            </a>
            <a href="/contact" className="footer-link">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
