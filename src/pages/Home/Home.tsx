import './Home.css';

export function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <section className="home-hero">
          <h1 className="home-title">Welcome to PhotoProject</h1>
          <p className="home-subtitle">
            A modern React application with TypeScript, Vite, and Tailwind CSS
          </p>
        </section>

        <section className="home-features">
          <div className="feature-card">
            <h3 className="feature-title">⚡ Fast Development</h3>
            <p className="feature-description">
              Built with Vite for lightning-fast HMR and optimized builds
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">🎨 Styled with Tailwind</h3>
            <p className="feature-description">
              Utility-first CSS with custom components using @apply
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">📦 Type-Safe</h3>
            <p className="feature-description">
              Full TypeScript support with strict mode enabled
            </p>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">✨ Code Quality</h3>
            <p className="feature-description">
              ESLint, Prettier, and Husky for consistent code quality
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
