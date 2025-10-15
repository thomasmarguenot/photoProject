import { motion } from 'framer-motion';

import type { ProjectsSectionProps } from './ProjectsSection.types';
import './ProjectsSection.css';

const defaultProjects = [
  {
    id: '1',
    title: 'Canal Plus',
    description:
      'Refonte complète de la plateforme de streaming avec une architecture moderne React et une expérience utilisateur repensée.',
    image: '🎬',
    technologies: ['React', 'TypeScript', 'Node.js'],
  },
  {
    id: '2',
    title: "L'Oréal Digital",
    description:
      "Création d'une plateforme e-commerce innovante avec personnalisation avancée et intégration d'IA pour recommandations produits.",
    image: '💄',
    technologies: ['Next.js', 'Tailwind', 'AI'],
  },
  {
    id: '3',
    title: 'The Voice TF1',
    description:
      "Application mobile et web pour le vote en direct avec gestion temps réel et scalabilité pour millions d'utilisateurs.",
    image: '🎤',
    technologies: ['React Native', 'WebSocket', 'AWS'],
  },
  {
    id: '4',
    title: 'Wood and Mary',
    description:
      'Site e-commerce haut de gamme avec configurateur 3D interactif et système de réservation sur-mesure.',
    image: '🪵',
    technologies: ['Three.js', 'React', 'Stripe'],
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
              className={`project-card ${index % 2 === 0 ? 'project-card-left' : 'project-card-right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.02, y: -10 }}
            >
              <div className="project-image">
                <span className="project-icon">{project.image}</span>
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
