import type { HeaderProps } from './types';
import './Header.css';

export function Header({ title = 'PhotoProject' }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1 className="header-title">{title}</h1>
        </div>
        <nav className="header-nav">
          <a href="/" className="header-link">
            Home
          </a>
          <a href="/about" className="header-link">
            About
          </a>
          <a href="/contact" className="header-link">
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
