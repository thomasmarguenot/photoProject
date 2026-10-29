import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bg" />
      <div className="footer-container">
        <p className="footer-text">
          © {new Date().getFullYear()} Thomas Marguenot - Agence Belle Époque.
        </p>
      </div>
    </footer>
  );
}
