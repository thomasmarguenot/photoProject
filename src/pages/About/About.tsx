import { motion } from 'framer-motion';

import photo from '@/assets/about/thomas-marguenot.webp';
import { Seo } from '@/components/common/Seo/Seo';
import {
  AnimatedHeading,
  AnimatedText,
} from '@/components/common/TextAnimations';
import {
  fadeOpacityVariants,
  fadeUpVariants,
  pageItemVariants,
  pageStaggerVariants,
} from '@/utils/animations';

import { EXPERIENCES, GRAPH_LEGEND, PASSIONS } from './About.data';
import { AboutSection } from './AboutSection';
import { TechGraph } from './TechGraph';
import { useAboutTheme } from './useAboutTheme';
import './About.css';

export function About() {
  useAboutTheme();

  return (
    <div className="about">
      <Seo
        title="À propos — Thomas Marguenot"
        description="15 ans de développement web et mobile : MyCanal, Quotatis, Rolex. Parcours, stack technique React / React Native et passions de Thomas Marguenot."
        path="/about"
      />
      <motion.div
        className="about-hero"
        variants={pageStaggerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatedHeading as="h1" className="about-headline" orchestrated>
          Mon parcours.
        </AnimatedHeading>

        <AnimatedText className="about-lead" orchestrated>
          Spécialisé React et React Native. J&apos;ai travaillé sur MyCanal,
          Quotatis et Rolex — des produits où la qualité et la performance
          comptent.
        </AnimatedText>

        <motion.div className="about-hero-photo" variants={fadeOpacityVariants}>
          <img
            src={photo}
            alt="Portrait de Thomas Marguenot"
            loading="eager"
            decoding="async"
          />
        </motion.div>
      </motion.div>

      <AboutSection title="Parcours">
        <div className="about-timeline">
          {EXPERIENCES.map((exp) => (
            <motion.div
              key={exp.index}
              className="about-timeline-item"
              variants={pageItemVariants}
            >
              <div className="about-timeline-left">
                <p className="about-timeline-role">{exp.role}</p>
                <div className="about-timeline-meta">
                  <span className="about-timeline-period">{exp.period}</span>
                  <span className="about-timeline-company">{exp.company}</span>
                </div>
              </div>
              <p className="about-timeline-desc">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </AboutSection>

      <AboutSection title="Stack technique" className="about-section--graph">
        <motion.p className="about-section-desc" variants={fadeUpVariants}>
          Un écosystème construit sur 15 ans — chaque techno a sa raison
          d&apos;être, et leurs liens racontent comment je les combine au
          quotidien.
        </motion.p>

        <div className="about-graph-wrapper">
          <TechGraph />
        </div>

        <motion.div className="about-graph-legend" variants={fadeUpVariants}>
          {GRAPH_LEGEND.map(({ category, label }) => (
            <span
              key={category}
              className={`about-legend-item about-legend-item--${category}`}
            >
              {label}
            </span>
          ))}
        </motion.div>
      </AboutSection>

      <AboutSection title="Côté passion" className="about-section--passions">
        <div className="about-passions">
          {PASSIONS.map((p) => (
            <motion.div
              key={p.label}
              className="about-passion-item"
              variants={pageItemVariants}
            >
              <p className="about-passion-label">{p.label}</p>
              <p className="about-passion-desc">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </AboutSection>
    </div>
  );
}

export default About;
