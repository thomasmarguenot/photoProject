import './About.css';
import photo from '@/assets/about/thomas-marguenot.png';

export function About() {
  return (
    <div className="about">
      <div className="about-inner">
        <aside className="about-photo" aria-hidden>
          <img src={photo} alt="Portrait" />
        </aside>

        <main className="about-content" role="main">
          <section className="about-block">
            <h2 className="about-heading">FORMATION</h2>
            <ul className="about-list">
              <li>
                <strong>2011 - 2013</strong>
                <div className="about-list-item">
                  HETIC — Master d&apos;Expert en Ingénierie de la Communication
                  Numérique
                </div>
              </li>

              <li>
                <strong>2009 - 2011</strong>
                <div className="about-list-item">
                  IESA Multimedia — Titre certifié niveau II : &quot;Chef de
                  projet multimédia&quot;
                </div>
              </li>

              <li>
                <strong>2008 - 2009</strong>
                <div className="about-list-item">
                  ICC — Bachelor : « Web Design et communication intéractive »
                </div>
              </li>
            </ul>
          </section>

          <section className="about-block">
            <h2 className="about-heading">COMPÉTENCES</h2>

            <div className="skills-grid">
              <div>
                <h3 className="skills-title">Programmation & Technologies</h3>
                <p className="skills-text">
                  React, React Native, Redux Toolkit, Jest, Node.js, TypeScript,
                  HTML &amp; CSS, Tailwind, Storybook, styled-components, Nx,
                  Vite, Auth0, bash
                </p>
              </div>

              <div>
                <h3 className="skills-title">API & Frameworks</h3>
                <p className="skills-text">
                  REST, GraphQL, Next.js, Express, Socket.io, Laravel
                </p>
              </div>

              <div>
                <h3 className="skills-title">Serveurs & Outils</h3>
                <p className="skills-text">
                  Apache, Nginx — VSCode, Chrome DevTools, Git, CI (Travis /
                  Drone), Notion, Jira
                </p>
              </div>

              <div>
                <h3 className="skills-title">Méthodologie & Web</h3>
                <p className="skills-text">
                  Agile / SAFe, SEO, Netlinking, Google Analytics, Piano
                  Analytics, Google Tag Manager
                </p>
              </div>
            </div>
          </section>

          <section className="about-block about-passion">
            <h2 className="about-heading">Côté Passion</h2>
            <p>
              J&apos;aime le Japon, faire du sport, le cinéma, la photographie,
              les voyages et surtout mon métier — créer des sites web.
            </p>
          </section>
        </main>
      </div>

      <div className="about-stamp" aria-hidden>
        about
      </div>
    </div>
  );
}

export default About;
