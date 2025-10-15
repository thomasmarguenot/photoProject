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
  return (
    <motion.section
      className="clients-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="clients-container">
        <h2 className="clients-title">Ils m&apos;ont fait confiance</h2>

        <div className="clients-grid">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              className="client-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
