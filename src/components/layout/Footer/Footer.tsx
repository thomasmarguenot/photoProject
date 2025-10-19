import type { FooterProps } from './Footer.types';
import './Footer.css';

export function Footer({
  year = new Date().getFullYear(),
  companyName = 'Thomas Marguenot - Agence Belle Époque',
}: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">
            © {year} {companyName}.
          </p>
        </div>
      </div>
    </footer>
  );
}
