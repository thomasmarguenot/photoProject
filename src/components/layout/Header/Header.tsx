import { Link } from 'react-router-dom';

import type { HeaderProps } from './Header.types';
import './Header.css';

export function Header({ title = 'とーます・まるぐの' }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/" className="header-title-wrapper">
            <span className="header-title header-title-base">{title}</span>
            <span
              className="header-title header-title-overlay"
              aria-hidden="true"
            >
              {title}
            </span>
          </Link>
        </div>
        <nav className="header-nav">
          <Link to="/" className="header-link">
            Home
          </Link>
          <Link to="/gallery" className="header-link">
            Gallery
          </Link>
          <Link to="/about" className="header-link">
            About
          </Link>
          <Link to="/charte" className="header-link">
            Charte
          </Link>
          <Link to="/contact" className="header-link">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
