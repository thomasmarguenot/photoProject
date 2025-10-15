import { motion } from 'framer-motion';

import type { ClientsSectionProps } from './ClientsSection.types';
import './ClientsSection.css';

const defaultClients = [
  {
    name: 'Canal Plus',
    logo: 'https://logo.clearbit.com/canalplus.com',
  },
  {
    name: 'Leroy Merlin',
    logo: 'https://logo.clearbit.com/leroymerlin.fr',
  },
  {
    name: 'Rolex',
    logo: 'https://logo.clearbit.com/rolex.com',
  },
  {
    name: 'LVMH',
    logo: 'https://logo.clearbit.com/lvmh.com',
  },
  {
    name: "L'Oréal",
    logo: 'https://logo.clearbit.com/loreal.com',
  },
  {
    name: 'BNP Paribas',
    logo: 'https://logo.clearbit.com/bnpparibas.com',
  },
  {
    name: 'TF1',
    logo: 'https://logo.clearbit.com/tf1.fr',
  },
  {
    name: 'Peugeot',
    logo: 'https://logo.clearbit.com/peugeot.com',
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
