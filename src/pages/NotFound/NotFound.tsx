import { Link } from 'react-router-dom';

import { Seo } from '@/components/common/Seo/Seo';

import './NotFound.css';

export function NotFound() {
  return (
    <div className="not-found">
      <Seo title="Page introuvable (404) — Thomas Marguenot" noindex />
      <div className="not-found-container">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-text">Page not found</p>
        <Link to="/" className="not-found-link">
          Go back home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
