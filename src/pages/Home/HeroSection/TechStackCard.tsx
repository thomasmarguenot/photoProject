import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

import type { Technology, TechStackCardProps } from './TechStackCard.types';
import './TechStackCard.css';

const defaultTechnologies: Technology[] = [
  {
    name: 'React',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    color: '#61DAFB',
  },
  {
    name: 'TypeScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    color: '#3178C6',
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    color: '#339933',
  },
  {
    name: 'Tailwind CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    color: '#06B6D4',
  },
  {
    name: 'Next.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
    color: '#000000',
  },
  {
    name: 'Vite',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg',
    color: '#646CFF',
  },
  {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    color: '#F05032',
  },
  {
    name: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    color: '#4169E1',
  },
  {
    name: 'Docker',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    color: '#2496ED',
  },
  {
    name: 'Python',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    color: '#3776AB',
  },
];

export function TechStackCard({
  technologies = defaultTechnologies,
}: TechStackCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const visibleTechs = technologies.slice(0, 5);
  const hiddenTechs = technologies.slice(5);

  return (
    <>
      <div className="tech-stack-card">
        <h3 className="tech-stack-title">J&apos;aime travailler avec</h3>

        <div className="tech-grid">
          {visibleTechs.map((tech) => (
            <div key={tech.name} className="tech-item" title={tech.name}>
              <img src={tech.icon} alt={tech.name} className="tech-icon" />
            </div>
          ))}

          {hiddenTechs.length > 0 && (
            <button
              type="button"
              className="tech-item tech-more"
              onClick={() => setIsModalOpen(true)}
              aria-label="Voir plus de technologies"
            >
              <span className="more-icon">+{hiddenTechs.length}</span>
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="modal-header">
                <h3 className="modal-title">Toutes mes technologies</h3>
                <button
                  type="button"
                  className="modal-close"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Fermer"
                >
                  ×
                </button>
              </div>

              <div className="modal-tech-grid">
                {technologies.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    className="modal-tech-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="modal-tech-icon"
                    />
                    <span className="modal-tech-name">{tech.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
