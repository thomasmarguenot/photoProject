import { AnimatePresence, motion } from 'framer-motion';

import {
  baseTransition,
  fadeUpVariants30,
  staggerContainerVariants,
} from '@/utils/animations';

import type { Project } from '../Home.types';
import './ProjectRow.css';

interface ProjectRowProps {
  project: Project;
  index: number;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="project-row-arrow-svg"
    style={{ transform: isOpen ? 'rotate(0deg)' : 'rotate(-45deg)' }}
  >
    <path
      d="M5 12H19M19 12L13 6M19 12L13 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function ProjectRow({
  project,
  index,
  isOpen,
  onOpen,
  onClose,
}: ProjectRowProps) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      className={`project-row${isOpen ? ' project-row--open' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainerVariants}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <span className="project-row-sweep" aria-hidden="true" />

      <motion.button
        type="button"
        className="project-row-trigger"
        aria-expanded={isOpen}
        variants={fadeUpVariants30}
      >
        <span className="project-row-num">{num}</span>

        <div className="project-row-content">
          <h3 className="project-row-title">{project.title}</h3>
          <p className="project-row-desc">{project.description}</p>
          {project.technologies && (
            <div className="project-row-tags">
              {project.technologies.map((t) => (
                <span key={t} className="project-row-tag">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="project-row-aside">
          <div className="project-row-thumb">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="project-row-thumb-img"
            />
          </div>
          <span className="project-row-arrow">
            <ArrowIcon isOpen={isOpen} />
          </span>
        </div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="panel"
            className="project-row-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={baseTransition}
          >
            <div className="project-row-panel-inner">
              {project.details?.map((d) => (
                <div key={d.label} className="project-row-panel-item">
                  <span className="project-row-panel-label">{d.label}</span>
                  <span className="project-row-panel-value">{d.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
