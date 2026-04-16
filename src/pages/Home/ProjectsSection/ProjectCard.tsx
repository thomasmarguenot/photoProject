import { motion } from 'framer-motion';

import { staggerContainerVariants } from '@/utils/animations';

import type { Project } from '../Home.types';
import { ProjectCardInfo } from './ProjectCardInfo';
import { ProjectImageReveal } from './ProjectImageReveal';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const isReverse = index % 2 === 1;

  return (
    <motion.article
      className={`project-row${isReverse ? ' project-row--reverse' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-200px' }}
      variants={staggerContainerVariants}
    >
      <ProjectImageReveal
        src={project.image}
        alt={project.title}
        direction={isReverse ? 'right' : 'left'}
      />
      <ProjectCardInfo project={project} index={index} />
    </motion.article>
  );
}
