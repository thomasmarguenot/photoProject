import { motion } from 'framer-motion';

import canalLogo from '@/assets/logo/canal.webp';
import konbibiLogo from '@/assets/logo/Konbibi.webp';
import leroyMerlinLogo from '@/assets/logo/Leroy-Merlin.webp';
import lorealLogo from '@/assets/logo/LOreal-logo-1536x864.webp';
import petitBateauLogo from '@/assets/logo/Petit-bateau.webp';
import peugeotLogo from '@/assets/logo/Peugeot-logo.webp';
import rolexLogo from '@/assets/logo/Rolex-logo.webp';
import tf1Logo from '@/assets/logo/TF1.webp';
import { AnimatedHeading } from '@/components/common/TextAnimations';
import {
  createFadeUpVariants,
  createStaggerContainer,
  EASE_REVEAL,
} from '@/utils/animations';
import { ANIMATION } from '@/utils/constants';

// Clients cascade starts only once the Hero cascade has settled,
// so the first-viewport sequence reads as one continuous flow.
const containerVariants = createStaggerContainer(
  0,
  ANIMATION.DELAY.SECTION_AFTER_HERO
);
// EASE_REVEAL is an s-curve: visually the bg reads as "done" before the
// animation technically ends. Trim ~15% so content kicks in when the eye expects it.
const contentContainerVariants = createStaggerContainer(
  ANIMATION.STAGGER.CHILDREN_WIDE,
  ANIMATION.DURATION_REVEAL * 0.85
);
const itemVariants = createFadeUpVariants(ANIMATION.OFFSET.SM);
const bgVariants = {
  hidden: { height: '0%' },
  visible: {
    height: '100%',
    transition: {
      duration: ANIMATION.DURATION_REVEAL,
      ease: EASE_REVEAL,
    },
  },
};

import type { ClientsSectionProps } from './ClientsSection.types';
import './ClientsSection.css';

const defaultClients = [
  {
    name: 'Canal Plus',
    logo: canalLogo,
  },
  {
    name: 'Leroy Merlin',
    logo: leroyMerlinLogo,
  },
  {
    name: 'Rolex',
    logo: rolexLogo,
  },
  {
    name: 'Konbibi',
    logo: konbibiLogo,
  },
  {
    name: "L'Oréal",
    logo: lorealLogo,
  },
  {
    name: 'Petit Bateau',
    logo: petitBateauLogo,
  },
  {
    name: 'TF1',
    logo: tf1Logo,
  },
  {
    name: 'Peugeot',
    logo: peugeotLogo,
  },
];

export function ClientsSection({
  clients = defaultClients,
}: ClientsSectionProps) {
  const scrollingClients = [...clients, ...clients, ...clients];

  return (
    <motion.section
      className="clients-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="clients-bg" variants={bgVariants} />
      <motion.div
        className="clients-content"
        variants={contentContainerVariants}
      >
        <motion.div className="clients-container" variants={itemVariants}>
          <div className="clients-title-wrapper">
            <AnimatedHeading as="h2" className="clients-title" orchestrated>
              Ils m&apos;ont fait confiance
            </AnimatedHeading>
          </div>
          <div className="clients-scroll-wrapper">
            <motion.div
              className="clients-scroll-row"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: ANIMATION.MARQUEE_DURATION,
                ease: 'linear',
              }}
            >
              {scrollingClients.map((client, index) => (
                <div className="client-card" key={client.name + index}>
                  {client.logo ? (
                    <img
                      src={client.logo}
                      alt={client.name}
                      className="client-logo"
                      loading="lazy"
                    />
                  ) : (
                    <span className="client-name">{client.name}</span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
