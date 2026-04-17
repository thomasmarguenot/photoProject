import { motion } from 'framer-motion';

import ppImage from '@/assets/home/pp.webp';
import {
  AnimatedHeading,
  AnimatedText,
} from '@/components/common/TextAnimations';
import { MOTION, TRANSITION } from '@/utils/constants';

import { ScrollArrow } from './ScrollArrow';
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
          <AnimatedHeading as="h1" className="hero-title">
            Je construis des sites web.
          </AnimatedHeading>
          <AnimatedText className="hero-description hero-description--black">
            Développeur JS Full-Stack avec plus de 15 ans d&apos;expérience, je
            crée des expériences digitales modernes et performantes. Spécialisé
            React et Node.js, j&apos;accompagne agences et entreprises dans la
            conception de solutions sur-mesure qui allient esthétique et
            fonctionnalité.
          </AnimatedText>
          <AnimatedText className="hero-description hero-description--black">
            De la conception à la mise en production, je m&apos;assure que
            chaque projet reflète l&apos;identity de la marque tout en offrant
            une expérience utilisateur exceptionnelle.
          </AnimatedText>
        </div>
      </div>
      <motion.button
        className="hero-scroll-arrow"
        onClick={() =>
          document
            .getElementById('projects')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
        aria-label="Voir les projets récents"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.4,
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <ScrollArrow />
      </motion.button>
    </motion.section>
  );
}
