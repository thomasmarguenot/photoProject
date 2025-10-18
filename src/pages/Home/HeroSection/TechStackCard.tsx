import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

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
  const [expanded, setExpanded] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [hasAnimated] = useState(true);
  const visibleTechs = technologies.slice(0, 5);
  const hiddenTechs = technologies.slice(5);

  useEffect(() => {
    if (!expanded || revealedCount === hiddenTechs.length) return;
    if (revealedCount === 0) {
      const timer = setTimeout(() => {
        setRevealedCount(1);
      }, 600);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => {
      setRevealedCount((c) => Math.min(c + 1, hiddenTechs.length));
    }, 120);
    return () => clearTimeout(timer);
  }, [expanded, revealedCount, hiddenTechs.length]);

  return (
    <div className="tech-stack-card m-1 p-6 min-h-[281px]">
      <motion.div
        className={
          expanded
            ? 'tech-stack-card-more-elements'
            : 'tech-stack-card-more-elements pointer-events-none'
        }
        animate={hasAnimated ? { width: expanded ? 320 : 0 } : false}
        initial={false}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="tech-grid">
          <AnimatePresence>
            {expanded &&
              hiddenTechs.slice(0, revealedCount).map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="tech-item"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.3, delay: i * 0.08 }}
                  title={tech.name}
                  whileHover={{ scale: 1.6 }}
                >
                  <img src={tech.icon} alt={tech.name} className="tech-icon" />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </motion.div>
      <div className="tech-stack-card-initial-elements">
        <h3 className="tech-stack-title">J&apos;aime travailler avec</h3>
        <div className="tech-grid p-0">
          {visibleTechs.map((tech) => (
            <motion.div
              key={tech.name}
              className="tech-item"
              title={tech.name}
              whileHover={{ scale: 1.6 }}
            >
              <img src={tech.icon} alt={tech.name} className="tech-icon" />
            </motion.div>
          ))}
          {!expanded && hiddenTechs.length > 0 && (
            <button
              type="button"
              className="tech-item tech-more"
              aria-label="Voir plus de technologies"
              tabIndex={-1}
              onClick={() => setExpanded(true)}
            >
              <span className="more-icon">+{hiddenTechs.length}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
