import { useState } from 'react';

import canalImage from '@/assets/projects/canal.webp';
import quotatisImage from '@/assets/projects/quotatis.webp';
import rolex from '@/assets/projects/rolex.webp';
import tabacInfoService from '@/assets/projects/tabac-info-service.webp';
import { AnimatedHeading } from '@/components/common/TextAnimations';

import { ProjectRow } from './ProjectRow';
import type { ProjectsSectionProps } from './ProjectsSection.types';
import './ProjectsSection.css';

const defaultProjects = [
  {
    id: '1',
    title: 'Canal Plus',
    description:
      "Développement sur MyCanal de cards de recommandation personnalisée et du module TVoD (achat de contenus à l'unité, internationalisation). Haute exigence qualité : CI/CD, tests unitaires, cycles agiles courts.",
    image: canalImage,
    technologies: ['React', 'Redux', 'Redux-Saga', 'TypeScript'],
    details: [
      { label: 'Rôle', value: 'Développeur Front-End Senior' },
      { label: 'Mission', value: 'Via Ekino pour Canal Plus (MyCanal)' },
      { label: 'Stack', value: 'React, Redux, Redux-Saga, TypeScript' },
      { label: 'Durée', value: '18 mois' },
    ],
  },
  {
    id: '3',
    title: 'Quotatis',
    description:
      "Référent technique front sur 7 ans. Application mobile artisans (React Native), backoffice RC (Material-UI), GED, CI/CD avec Drone CI. Refonte complète de l'app mobile en autonomie avec UIKit Storybook et atomic design.",
    image: quotatisImage,
    technologies: ['React', 'React Native', 'Redux', 'Auth0', 'TypeScript'],
    details: [
      { label: 'Rôle', value: 'Tech Lead Front-End' },
      { label: 'Stack', value: 'React, React Native, Redux, Auth0, Material-UI, TypeScript' },
      { label: 'Durée', value: '7 ans' },
      { label: 'Périmètre', value: 'Web, mobile iOS/Android, backoffice' },
    ],
  },
  {
    id: '4',
    title: 'Rolex',
    description:
      'Audit de performance et optimisations sur la map mondiale interactive des boutiques Rolex (globe Three.js + pins React). Analyse LCP, CLS, INP via Chrome DevTools — recommandations hooks, refs, useMemo/useCallback.',
    image: rolex,
    technologies: ['Three.js', 'React', 'WebGL'],
    details: [
      { label: 'Rôle', value: 'Consultant Performance Front-End' },
      { label: 'Stack', value: 'React, Three.js, WebGL' },
      { label: 'Mission', value: 'Audit + rapport de recommandations' },
      { label: 'Durée', value: '3 mois' },
    ],
  },
  {
    id: '2',
    title: 'Tabac Info Service',
    description:
      "Application mobile de sevrage tabagique de l'Institut National du Cancer. Ajout de fonctionnalités (conseils, rappels, calculateur d'économies). Découverte de React Native Reanimated et pattern custom hooks avancés.",
    image: tabacInfoService,
    technologies: ['React Native', 'Reanimated', 'GraphQL'],
    details: [
      { label: 'Rôle', value: 'Développeur React Native' },
      { label: 'Client', value: 'Institut National du Cancer' },
      { label: 'Stack', value: 'React Native, Reanimated, GraphQL, Push notifications' },
      { label: 'Durée', value: '3 mois' },
    ],
  },
];

export function ProjectsSection({
  projects = defaultProjects,
}: ProjectsSectionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <AnimatedHeading as="h2" className="projects-label">
          Projets récents
        </AnimatedHeading>

        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              isOpen={openId === project.id}
              onToggle={() =>
                setOpenId((prev) => (prev === project.id ? null : project.id))
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
