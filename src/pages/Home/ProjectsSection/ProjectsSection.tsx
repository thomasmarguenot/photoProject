import { motion } from 'framer-motion';

import canalImage from '@/assets/projects/canal.jpg';
import quotatisImage from '@/assets/projects/quotatis.jpg';
import rolex from '@/assets/projects/rolex.webp';
import tabacInfoService from '@/assets/projects/tabac-info-service.webp';

import type { ProjectsSectionProps } from './ProjectsSection.types';
import './ProjectsSection.css';

const defaultProjects = [
  {
    id: '1',
    title: 'Canal Plus',
    description:
      "Développements divers sur le site MyCanal. Création de nouvelles fonctionnalités: cards recommandation, section TVod: possibilité d'acheter des films à l'unité, etc.",
    image: canalImage,
    technologies: ['React', 'Redux', 'Redux-Saga'],
  },
  {
    id: '4',
    title: 'Rolex',
    description:
      'Optimisation de la map monde interactive des boutiques Rolex avec Three.js pour une expérience utilisateur immersive.',
    image: rolex,
    technologies: ['Three.js', 'React'],
  },
  {
    id: '3',
    title: 'Quotatis',
    description:
      "Lead front de l’entreprise Quotatis. Création de l'application mobile sur React-Native, backoffice pour la relation client avec Material-UI.",
    image: quotatisImage,
    technologies: ['React', 'React-Native', 'Redux', 'Auth0'],
  },
  {
    id: '2',
    title: 'Tabac Info Service',
    description:
      "Développements sur l'application mobile Tabac Info Service (TIS) de l'Institut National du Cancer. Ajout de fonctionnalités pour aider les utilisateurs dans leur sevrage tabagique.",
    image: tabacInfoService,
    technologies: ['React-Native'],
  },
];

export function ProjectsSection({
  projects = defaultProjects,
}: ProjectsSectionProps) {
  return (
    <motion.section
      className="projects-section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="projects-container">
        <h2 className="projects-title">Derniers projets</h2>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
              <div className="project-content">
                <h3 className="project-name">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                {project.technologies && (
                  <div className="project-tech">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="project-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
