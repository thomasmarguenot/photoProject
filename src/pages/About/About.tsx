import './About.css';

export function About() {
  return (
    <div className="about">
      <div className="about-container">
        <h1 className="about-title">About PhotoProject</h1>
        <p className="about-text">
          This is a modern web application built with React, TypeScript, Vite,
          and Tailwind CSS.
        </p>
        <p className="about-text">
          Features include lazy-loaded routes, code splitting, and a
          comprehensive folder structure.
        </p>
      </div>
    </div>
  );
}
