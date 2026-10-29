import { motion } from 'framer-motion';

import ppImage from '@/assets/home/pp.webp';
import {
  AnimatedHeading,
  AnimatedText,
} from '@/components/common/TextAnimations';
import {
  pageItemVariants,
  pageStaggerVariants,
  scrollArrowVariants,
} from '@/utils/animations';

import { ScrollArrow } from './ScrollArrow';
import './HeroSection.css';

export function HeroSection() {
  return (
    <section className="hero-section">
      <motion.div
        className="hero-content"
        variants={pageStaggerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatedHeading as="h1" className="hero-title" orchestrated>
          Je construis des apps web et mobiles.
        </AnimatedHeading>

        <div className="hero-row">
          <motion.div className="hero-photo" variants={pageItemVariants}>
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
                      À LA RECHERCHE D&apos;UNE MISSION SUR PARIS • DÉVELOPPEUR
                      JS FULL STACK •
                    </textPath>
                  </text>
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div className="hero-intro" variants={pageStaggerVariants}>
            <AnimatedText
              className="hero-description hero-description--black"
              orchestrated
            >
              Développeur JS Full-Stack avec plus de 15 ans d&apos;expérience,
              je crée des expériences digitales modernes et performantes.
              Spécialisé React et Node.js, j&apos;accompagne agences et
              entreprises dans la conception de solutions sur-mesure qui allient
              esthétique et fonctionnalité.
            </AnimatedText>
            <AnimatedText
              className="hero-description hero-description--black"
              orchestrated
            >
              De la conception à la mise en production, je m&apos;assure que
              chaque projet reflète l&apos;identity de la marque tout en offrant
              une expérience utilisateur exceptionnelle.
            </AnimatedText>
          </motion.div>
        </div>
      </motion.div>
      <motion.button
        className="hero-scroll-arrow"
        onClick={() =>
          document
            .getElementById('projects')
            ?.scrollIntoView({ behavior: 'smooth' })
        }
        aria-label="Voir les projets récents"
        variants={scrollArrowVariants}
        initial="hidden"
        animate="visible"
      >
        <ScrollArrow />
      </motion.button>
    </section>
  );
}
