import { motion } from 'framer-motion';

import ppImage from '@/assets/home/pp.jpeg';

import { TechStackCard } from './TechStackCard';
import './HeroSection.css';

export function HeroSection() {
  return (
    <motion.section
      className="hero-section"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="hero-content">
        <div className="hero-left">
          <div className="hero-photo">
            <div className="photo-container">
              <img
                src={ppImage}
                alt="Thomas Marguenot"
                className="photo-image"
              />
              <div className="circular-text">
                <svg viewBox="0 0 280 280" className="circular-text-svg">
                  <defs>
                    <path
                      id="circlePath"
                      d="M 140, 140 m -125, 0 a 125,125 0 1,1 250,0 a 125,125 0 1,1 -250,0"
                    />
                  </defs>
                  <text className="circular-text-path">
                    <textPath href="#circlePath" startOffset="0%">
                      À LA RECHERCHE D&apos;UNE MISSION SUR PARIS • DEVELOPPEUR
                      JS FULL STACK •
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </div>

          <div className="hero-intro">
            <h1 className="hero-title">Je construis des sites web.</h1>
            <p className="hero-description">
              Développeur full-stack passionné, je crée des expériences
              digitales modernes et performantes. Spécialisé dans les
              technologies React et Node.js, j&apos;accompagne mes clients dans
              leur transformation digitale en concevant des solutions sur-mesure
              qui allient esthétique et fonctionnalité.
            </p>
            <p className="hero-description">
              De la conception à la mise en production, je m&apos;assure que
              chaque projet reflète l&apos;identité de la marque tout en offrant
              une expérience utilisateur exceptionnelle.
            </p>
          </div>
        </div>

        <div className="hero-card">
          <TechStackCard />
        </div>
      </div>
    </motion.section>
  );
}
