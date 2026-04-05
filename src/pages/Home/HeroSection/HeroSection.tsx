import { motion } from 'framer-motion';

import ppImage from '@/assets/home/pp.webp';
import { MOTION, TRANSITION } from '@/utils/constants';

import './HeroSection.css';

export function HeroSection() {
  return (
    <motion.section
      className="hero-section"
      {...MOTION.FADE_UP}
      transition={TRANSITION.DEFAULT}
    >
      <div className="hero-content">
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
                    À LA RECHERCHE D&apos;UNE MISSION SUR PARIS • DÉVELOPPEUR JS
                    FULL STACK •
                  </textPath>
                </text>
              </svg>
            </div>
          </div>
        </div>

        <div className="hero-intro">
          <motion.h1
            className="hero-title"
            {...MOTION.FONT_WEIGHT}
            transition={TRANSITION.FONT_MORPH}
          >
            Je construis des sites web.
          </motion.h1>
          <p className="hero-description hero-description--black">
            Développeur JS Full-Stack avec plus de 15 ans d&apos;expérience, je
            crée des expériences digitales modernes et performantes. Spécialisé
            React et Node.js, j&apos;accompagne agences et entreprises dans la
            conception de solutions sur-mesure qui allient esthétique et
            fonctionnalité.
          </p>
          <p className="hero-description hero-description--black">
            De la conception à la mise en production, je m&apos;assure que
            chaque projet reflète l&apos;identité de la marque tout en offrant
            une expérience utilisateur exceptionnelle.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
