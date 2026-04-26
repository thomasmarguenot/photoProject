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
  onToggle: () => void;
}

const ArrowIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="18"
    height="20"
    viewBox="0 0 37 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="project-row-arrow-svg"
    style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
  >
    <path
      d="M17.2793 40.8137C18.281 41.764 19.8634 41.7223 20.8137 40.7207L36.2995 24.3977C37.2498 23.3961 37.2082 21.8137 36.2065 20.8634C35.2049 19.9131 33.6225 19.9548 32.6722 20.9564L18.907 35.4657L4.39772 21.7005C3.39606 20.7502 1.8137 20.7918 0.863407 21.7935C-0.0868821 22.7951 -0.0452409 24.3775 0.956415 25.3278L17.2793 40.8137ZM15.5009 1.06577L16.5009 39.0658L21.4991 38.9342L20.4991 0.934233L15.5009 1.06577Z"
      fill="currentColor"
    />
  </svg>
);

export function ProjectRow({
  project,
  index,
  isOpen,
  onToggle,
}: ProjectRowProps) {
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      className={`project-row${isOpen ? ' project-row--open' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={staggerContainerVariants}
    >
      <motion.button
        type="button"
        className="project-row-trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
        variants={fadeUpVariants30}
      >
        <span className="project-row-sweep" aria-hidden="true" />

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
