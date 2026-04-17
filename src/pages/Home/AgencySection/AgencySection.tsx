import { motion } from 'framer-motion';

import belleEpoqueLogo from '@/assets/logo-belle-epoque.png';
import {
  AnimatedHeading,
  AnimatedText,
} from '@/components/common/TextAnimations';
import {
  EASE_DEFAULT,
  fadeUpVariants,
  fadeUpVariants30,
  staggerContainerVariants,
} from '@/utils/animations';
import { ANIMATION } from '@/utils/constants';

import './AgencySection.css';

export function AgencySection() {
  return (
    <section className="agency-section">
      <div className="agency-container">
        <motion.div
          className="agency-content"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="agency-left" variants={fadeUpVariants}>
            <AnimatedHeading as="p" className="agency-section-label">
              L&apos;agence
            </AnimatedHeading>
            <div className="agency-left-row">
              <div className="agency-logo">
                <img
                  src={belleEpoqueLogo}
                  alt="Belle Époque Logo"
                  className="agency-logo-img"
                  loading="lazy"
                />
              </div>
              <AnimatedText className="agency-link" variants={fadeUpVariants30}>
                <a
                  href="https://agence-belle-epoque.fr/fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Découvrir l'agence Belle Époque (nouvel onglet)"
                >
                  Découvrir l&apos;agence{' '}
                  <span className="agency-link-arrow" aria-hidden="true">
                    →
                  </span>
                </a>
              </AnimatedText>
            </div>
          </motion.div>

          <motion.div className="agency-text" variants={fadeUpVariants}>
            <AnimatedText
              className="agency-tagline"
              variants={fadeUpVariants30}
            >
              Fondateur associé
            </AnimatedText>
            <AnimatedHeading as="h2" className="agency-title">
              Agence Belle Époque
            </AnimatedHeading>
            <AnimatedText
              className="agency-description"
              variants={fadeUpVariants30}
            >
              En parallèle de mes missions développement, j&apos;ai co-fondé
              Belle Époque. Nous produisons des identités visuelles, des
              contenus digitaux, de l&apos;édition et de la publicité porteuse
              de sens, de créativité et de simplicité.
            </AnimatedText>
            <AnimatedText
              className="agency-description"
              variants={fadeUpVariants30}
            >
              Nous accompagnons votre transformation digitale en nous imprégnant
              de vos problématiques et en mettant nos connaissances et notre
              expertise à votre service pour vous apporter une réponse éclairée.
            </AnimatedText>

            <div className="agency-services">
              <div className="agency-services-line-wrapper">
                <motion.span
                  className="agency-services-line"
                  initial={{ width: '0%' }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{
                    duration: ANIMATION.DURATION_SLOW,
                    ease: EASE_DEFAULT,
                    delay: 0.6,
                  }}
                />
              </div>

              <div className="service-item">
                <AnimatedHeading as="h3" className="service-title">
                  Site Web & App
                </AnimatedHeading>
                <AnimatedText
                  className="service-detail"
                  variants={fadeUpVariants30}
                >
                  UX · Webdesign · Développement · Mobile · E-Commerce
                </AnimatedText>
                <motion.span
                  className="service-divider"
                  initial={{ height: '0%' }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{
                    duration: ANIMATION.DURATION,
                    ease: EASE_DEFAULT,
                    delay: 0.85,
                  }}
                />
              </div>

              <div className="service-item">
                <AnimatedHeading as="h3" className="service-title">
                  Création graphique
                </AnimatedHeading>
                <AnimatedText
                  className="service-detail"
                  variants={fadeUpVariants30}
                >
                  Identités visuelles · Contenus digitaux · Créativité
                </AnimatedText>
                <motion.span
                  className="service-divider"
                  initial={{ height: '0%' }}
                  whileInView={{ height: '100%' }}
                  viewport={{ once: true }}
                  transition={{
                    duration: ANIMATION.DURATION,
                    ease: EASE_DEFAULT,
                    delay: 1.2,
                  }}
                />
              </div>

              <div className="service-item">
                <AnimatedHeading as="h3" className="service-title">
                  Identité de marque
                </AnimatedHeading>
                <AnimatedText
                  className="service-detail"
                  variants={fadeUpVariants30}
                >
                  Wording · Stratégie · Publicité · Édition
                </AnimatedText>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
