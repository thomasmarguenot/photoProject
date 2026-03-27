import { motion } from 'framer-motion';

import belleEpoqueLogo from '@/assets/logo-belle-epoque.png';
import { MOTION, TRANSITION } from '@/utils/constants';

import './AgencySection.css';

export function AgencySection() {
  return (
    <motion.section
      className="agency-section"
      {...MOTION.FADE_UP}
      whileInView={MOTION.FADE_UP.animate}
      viewport={{ once: true }}
      transition={TRANSITION.DEFAULT}
    >
      <div className="agency-container">
        <p className="agency-section-label">L&apos;agence</p>

        <div className="agency-content">
          {/* Colonne gauche */}
          <div className="agency-left">
            <div className="agency-logo">
              <img
                src={belleEpoqueLogo}
                alt="Belle Époque Logo"
                className="agency-logo-img"
                loading="lazy"
              />
            </div>

            <a
              href="https://agence-belle-epoque.fr/fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="agency-link"
            >
              Découvrir l&apos;agence{' '}
              <span className="agency-link-arrow">→</span>
            </a>
          </div>

          {/* Colonne droite */}
          <div className="agency-text">
            <p className="agency-tagline">Fondateur associé</p>
            <h2 className="agency-title">Agence Belle Époque</h2>
            <p className="agency-description">
              Chez Belle Époque, nous produisons des identités visuelles, des
              contenus digitaux, de l&apos;édition et de la publicité porteuse
              de sens, de créativité et de simplicité.
            </p>
            <p className="agency-description">
              Nous accompagnons votre transformation digitale en nous imprégnant
              de vos problématiques et en mettant nos connaissances et notre
              expertise à votre service pour vous apporter une réponse éclairée.
            </p>

            <div className="agency-services">
              <div className="service-item">
                <h3 className="service-title">Site Web & App</h3>
                <p className="service-detail">
                  UX · Webdesign · Développement · Mobile · E-Commerce
                </p>
              </div>
              <div className="service-item">
                <h3 className="service-title">Création graphique</h3>
                <p className="service-detail">
                  Identités visuelles · Contenus digitaux · Créativité
                </p>
              </div>
              <div className="service-item">
                <h3 className="service-title">Identité de marque</h3>
                <p className="service-detail">
                  Wording · Stratégie · Publicité · Édition
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
