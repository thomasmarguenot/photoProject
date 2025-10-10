import { Link } from 'react-router-dom';

import type { HeaderProps } from './types';
import './Header.css';

export function Header({ title = 'PhotoProject' }: HeaderProps) {
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
