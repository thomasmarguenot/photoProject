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
    <section className="projects-section">
      <motion.div
        className="projects-container"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <motion.h2
          className="projects-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          Derniers projets
        </motion.h2>

        <div className="projects-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card">
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
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
