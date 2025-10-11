import { Link } from 'react-router-dom';

import type { HeaderProps } from './Header.types';
import './Header.css';

export function Header({ title = 'ふぉとぷろじぇくと' }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <Link to="/" className="header-title">
            {title}
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
          <Link to="/contact" className="header-link">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
