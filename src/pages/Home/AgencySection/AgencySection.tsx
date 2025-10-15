import { motion } from 'framer-motion';

import './AgencySection.css';

export function AgencySection() {
  return (
    <motion.section
      className="agency-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="agency-container">
        <div className="agency-content">
          <motion.div
            className="agency-logo"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="agency-logo-text">BE</span>
          </motion.div>

          <div className="agency-text">
            <h2 className="agency-title">Agence Belle Époque</h2>
            <p className="agency-tagline">
              CRÉATEURS DE BELLES HISTOIRES DIGITALES
            </p>
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
                  Expérience Utilisateur • Webdesign • Développement • Mobile •
                  E-Commerce
                </p>
              </div>
              <div className="service-item">
                <h3 className="service-title">Création graphique</h3>
                <p className="service-detail">
                  Identités visuelles • Contenus digitaux • Créativité •
                  Simplicité
                </p>
              </div>
              <div className="service-item">
                <h3 className="service-title">Identité de marque</h3>
                <p className="service-detail">
                  Wording • Stratégie de communication • Publicité • Édition
                </p>
              </div>
            </div>

            <a
              href="https://agence-belle-epoque.fr/fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="agency-link"
            >
              Découvrir l&apos;agence →
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
