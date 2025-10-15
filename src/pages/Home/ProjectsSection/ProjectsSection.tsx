import { motion } from 'framer-motion';

import canalImage from '@/assets/projects/canal.jpg';
import lorealImage from '@/assets/projects/loreal.webp';
import quotatisImage from '@/assets/projects/quotatis.jpg';
import woodAndMaryImage from '@/assets/projects/wood-and-mary.jpg';

import type { ProjectsSectionProps } from './ProjectsSection.types';
import './ProjectsSection.css';

const defaultProjects = [
  {
    id: '1',
    title: 'Canal Plus',
    description:
      'Refonte complète de la plateforme de streaming avec une architecture moderne React et une expérience utilisateur repensée.',
    image: canalImage,
    technologies: ['React', 'TypeScript', 'Node.js'],
  },
  {
    id: '2',
    title: "L'Oréal Digital",
    description:
      "Création d'une plateforme e-commerce innovante avec personnalisation avancée et intégration d'IA pour recommandations produits.",
    image: lorealImage,
    technologies: ['Next.js', 'Tailwind', 'AI'],
  },
  {
    id: '3',
    title: 'Quotatis',
    description:
      'Plateforme de mise en relation entre particuliers et professionnels du bâtiment avec système de devis intelligent.',
    image: quotatisImage,
    technologies: ['React', 'WebSocket', 'AWS'],
  },
  {
    id: '4',
    title: 'Wood and Mary',
    description:
      'Site e-commerce haut de gamme avec configurateur 3D interactif et système de réservation sur-mesure.',
    image: woodAndMaryImage,
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
