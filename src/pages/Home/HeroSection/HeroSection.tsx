import { motion } from 'framer-motion';
import { lazy, Suspense } from 'react';

import ppImage from '@/assets/home/pp.jpeg';
const TechStackCard = lazy(() => import('./TechStackCard'));
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
                fetchPriority="high"
                decoding="async"
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
            {/* Animate font weight using Framer Motion and variable font */}
            <motion.h1
              className="hero-title"
              initial={{
                fontVariationSettings: '"wght" 400',
                fontStyle: 'normal',
              }}
              animate={{
                fontVariationSettings: '"wght" 900',
                fontStyle: 'normal',
              }}
              whileHover={{
                fontVariationSettings: '"wght" 100',
                fontStyle: 'normal',
              }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            >
              Je construis des sites web.
            </motion.h1>
            <p className="hero-description hero-description--black">
              Développeur full-stack passionné, je crée des expériences
              digitales modernes et performantes. Spécialisé dans les
              technologies React et Node.js, j&apos;accompagne mes clients dans
              leur transformation digitale en concevant des solutions sur-mesure
              qui allient esthétique et fonctionnalité.
            </p>
            <p className="hero-description hero-description--black">
              De la conception à la mise en production, je m&apos;assure que
              chaque projet reflète l&apos;identité de la marque tout en offrant
              une expérience utilisateur exceptionnelle.
            </p>
          </div>
        </div>

        <div className="hero-card">
          <Suspense fallback={null}>
            <TechStackCard />
          </Suspense>
        </div>
      </div>
    </motion.section>
  );
}
