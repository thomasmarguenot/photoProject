import { motion } from 'framer-motion';

import canalImage from '@/assets/projects/canal.webp';
import quotatisImage from '@/assets/projects/quotatis.webp';
import rolex from '@/assets/projects/rolex.webp';
import tabacInfoService from '@/assets/projects/tabac-info-service.webp';
import { TRANSITION } from '@/utils/constants';

import type { ProjectsSectionProps } from './ProjectsSection.types';
import './ProjectsSection.css';

const defaultProjects = [
  {
    id: '1',
    title: 'Canal Plus',
    description:
      "Développement de nouvelles fonctionnalités sur MyCanal : cards de recommandation personnalisée, section TVoD avec achat de films à l'unité. Travail en équipe produit agile avec cycles de delivery courts.",
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
      "Lead Frontend chez Quotatis. Conception et développement de l'application mobile React Native et du backoffice relation client (Material-UI). Référent technique front de l'équipe.",
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
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <motion.p
          className="projects-label"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...TRANSITION.SLOW, delay: 0.1 }}
        >
          Projets récents
        </motion.p>

        <div className="projects-list">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className={`project-row${index % 2 === 1 ? ' project-row--reverse' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ ...TRANSITION.SLOW, delay: 0.1 }}
            >
              <div className="project-image-wrap">
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>

              <div className="project-info">
                <span className="project-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
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
    </section>
  );
}
