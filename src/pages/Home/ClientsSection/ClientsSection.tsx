import { motion } from 'framer-motion';

import type { ClientsSectionProps } from './ClientsSection.types';
import './ClientsSection.css';

const defaultClients = [
  { name: 'Canal Plus' },
  { name: 'Leroy Merlin' },
  { name: 'Rolex' },
  { name: 'LVMH' },
  { name: "L'Oréal" },
  { name: 'BNP Paribas' },
  { name: 'TF1' },
  { name: 'Peugeot' },
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
              <span className="client-name">{client.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
