import { motion } from 'framer-motion';

import { fadeUpVariants } from '@/utils/animations';

import type { Project } from '../Home.types';
import './ProjectCardInfo.css';

interface ProjectCardInfoProps {
  project: Project;
  index: number;
}

export function ProjectCardInfo({ project, index }: ProjectCardInfoProps) {
  return (
    <div className="project-info">
      <motion.span className="project-number" variants={fadeUpVariants}>
        {String(index + 1).padStart(2, '0')}
      </motion.span>

      <motion.h3 className="project-name" variants={fadeUpVariants}>
        {project.title}
      </motion.h3>

      <motion.p className="project-description" variants={fadeUpVariants}>
        {project.description}
      </motion.p>

      {project.technologies && (
        <motion.div className="project-tech" variants={fadeUpVariants}>
          {project.technologies.map((tech) => (
            <span key={tech} className="project-tech-tag">
              {tech}
            </span>
          ))}
        </motion.div>
      )}
    </div>
  );
}
