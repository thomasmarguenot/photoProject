import { Link, NavLink } from 'react-router-dom';

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
          <NavLink to="/" className="header-link" end>
            Home
          </NavLink>
          <NavLink to="/gallery" className="header-link">
            Gallery
          </NavLink>
          <NavLink to="/about" className="header-link">
            About
          </NavLink>
          <NavLink to="/charte" className="header-link">
            Charte
          </NavLink>
          <NavLink to="/contact" className="header-link">
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
