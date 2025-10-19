import { motion } from 'framer-motion';

import canalLogo from '@/assets/logo/canal.png';
import konbibiLogo from '@/assets/logo/Konbibi.png';
import leroyMerlinLogo from '@/assets/logo/Leroy-Merlin.png';
import lorealLogo from '@/assets/logo/LOreal-logo-1536x864.png';
import petitBateauLogo from '@/assets/logo/Petit-bateau.png';
import peugeotLogo from '@/assets/logo/Peugeot-logo.png';
import rolexLogo from '@/assets/logo/Rolex-logo.png';
import tf1Logo from '@/assets/logo/TF1.png';

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
    <section className="clients-section">
      <motion.div
        className="clients-bg"
        initial={{ height: '0%' }}
        animate={{ height: '100%' }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
      <motion.div
        className="clients-container"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.7, ease: 'easeOut' }}
      >
        <div className="clients-title-wrapper">
          <h2 className="clients-title">Ils m&apos;ont fait confiance</h2>
        </div>
        <div className="clients-scroll-wrapper">
          <motion.div
            className="clients-scroll-row"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              repeatType: 'loop',
              duration: 80,
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
    </section>
  );
}
