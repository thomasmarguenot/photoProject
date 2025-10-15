import { motion } from 'framer-motion';

import type { TechnologiesSectionProps } from './TechnologiesSection.types';
import './TechnologiesSection.css';

const defaultTechnologies = [
  { name: 'JavaScript' },
  { name: 'TypeScript' },
  { name: 'React' },
  { name: 'Node.js' },
  { name: 'Tailwind CSS' },
  { name: 'Next.js' },
  { name: 'Vite' },
  { name: 'Git' },
];

export function TechnologiesSection({
  technologies = defaultTechnologies,
}: TechnologiesSectionProps) {
  return (
    <motion.section
      className="technologies-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="technologies-container">
        <h2 className="technologies-title">J&apos;aime travailler avec</h2>

        <div className="technologies-grid">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="tech-card"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <span className="tech-name">{tech.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
