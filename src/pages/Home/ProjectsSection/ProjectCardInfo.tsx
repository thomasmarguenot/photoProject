import { motion } from 'framer-motion';

import {
  AnimatedHeading,
  AnimatedText,
} from '@/components/common/TextAnimations';
import { fadeOpacityVariants, fadeUpVariants30 } from '@/utils/animations';

import type { Project } from '../Home.types';
import './ProjectCardInfo.css';

interface ProjectCardInfoProps {
  project: Project;
  index: number;
}

export function ProjectCardInfo({ project, index }: ProjectCardInfoProps) {
  return (
    <div className="project-info">
      <AnimatedText
        className="project-number"
        variants={fadeOpacityVariants}
        orchestrated
      >
        {String(index + 1).padStart(2, '0')}
      </AnimatedText>

      <AnimatedHeading as="h3" className="project-name" orchestrated>
        {project.title}
      </AnimatedHeading>

      <AnimatedText
        className="project-description"
        variants={fadeUpVariants30}
        orchestrated
      >
        {project.description}
      </AnimatedText>

      {project.technologies && (
        <motion.div className="project-tech" variants={fadeUpVariants30}>
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
