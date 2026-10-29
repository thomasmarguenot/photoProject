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
  clientsBgVariants,
  clientsContentVariants,
  clientsMarqueeAnimation,
  clientsMarqueeTransition,
  clientsSectionVariants,
  fadeUpVariants,
} from '@/utils/animations';

import './ClientsSection.css';

const CLIENTS = [
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

const SCROLLING_CLIENTS = [...CLIENTS, ...CLIENTS, ...CLIENTS];

export function ClientsSection() {
  return (
    <motion.section
      className="clients-section"
      variants={clientsSectionVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="clients-bg" variants={clientsBgVariants} />
      <motion.div className="clients-content" variants={clientsContentVariants}>
        <motion.div className="clients-container" variants={fadeUpVariants}>
          <div className="clients-title-wrapper">
            <AnimatedHeading as="h2" className="clients-title" orchestrated>
              Ils m&apos;ont fait confiance
            </AnimatedHeading>
          </div>
          <div className="clients-scroll-wrapper">
            <motion.div
              className="clients-scroll-row"
              animate={clientsMarqueeAnimation}
              transition={clientsMarqueeTransition}
            >
              {SCROLLING_CLIENTS.map((client, index) => (
                <div className="client-card" key={client.name + index}>
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="client-logo"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
