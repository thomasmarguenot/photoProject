import { motion, useScroll, useTransform } from 'framer-motion';

import photo from '@/assets/about/thomas-marguenot.webp';
import {
  AnimatedHeading,
  AnimatedText,
} from '@/components/common/TextAnimations';
import {
  createFadeUpVariants,
  createStaggerContainer,
  fadeOpacityVariants,
} from '@/utils/animations';
import { ANIMATION } from '@/utils/constants';

import './About.css';
import TechGraph from './TechGraph';

const pageStagger = createStaggerContainer(
  ANIMATION.STAGGER.CHILDREN_WIDE,
  ANIMATION.DELAY.XS
);
const sectionStagger = createStaggerContainer(
  ANIMATION.STAGGER.CHILDREN,
  ANIMATION.DELAY.SM
);
const itemVariants = createFadeUpVariants(ANIMATION.OFFSET.MD);
const itemVariantsSm = createFadeUpVariants(ANIMATION.OFFSET.SM);

const experiences = [
  {
    index: '01',
    period: '2024 →',
    company: 'Freelance',
    role: 'Développeur JS Full-Stack',
    description:
      "Accompagnement d'agences et d'entreprises sur des projets React et React Native. Architecture front, performance, delivery.",
  },
  {
    index: '02',
    period: '2016 — 2023',
    company: 'Quotatis',
    role: 'Lead Developer Front-End',
    description:
      '7 ans sur un produit de mise en relation artisans/particuliers. App mobile React Native, back-office React, CI/CD Drone, TypeScript, Storybook atomic design, team lead 5 devs.',
  },
  {
    index: '03',
    period: '2017 — 2019',
    company: 'Canal+ / MyCanal',
    role: 'Développeur React (via Ekino)',
    description:
      "Développement de fonctionnalités clés sur MyCanal — cards de recommandation, module d'achat TVoD, internationalisation. Haute exigence qualité, CI/CD, tests unitaires.",
  },
  {
    index: '04',
    period: '2013 — 2016',
    company: 'Agence Belle Époque',
    role: 'Co-fondateur & Développeur',
    description:
      "Création d'une agence web avec deux associés de promo. Sites sur-mesure, WordPress, formation, recrutement. Premières incursions dans React et Node.js.",
  },
];

const passions = [
  { label: 'Japon', desc: "Fasciné par l'équilibre et l'esthétique" },
  { label: 'Cinéma', desc: 'Nourrit mon imaginaire visuel' },
  { label: 'Photographie', desc: 'Micro-récits transposés en web' },
  { label: 'Natation & Échecs', desc: 'Discipline et pensée systémique' },
];

export function About() {
  const { scrollYProgress } = useScroll();

  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.28, 0.35],
    ['#ffffff', '#0d0d0d', '#0d0d0d']
  );
  const fgColor = useTransform(
    scrollYProgress,
    [0, 0.28, 0.35],
    ['#111111', '#f5f5f7', '#f5f5f7']
  );
  const borderColor = useTransform(
    scrollYProgress,
    [0, 0.28],
    ['rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)']
  );

  return (
    <motion.div
      className="about"
      style={{ backgroundColor: bgColor, color: fgColor }}
    >
      {/* ── Hero ── */}
      <motion.div
        className="about-hero"
        variants={pageStagger}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="about-hero-top" variants={sectionStagger}>
          <AnimatedText className="about-eyebrow" orchestrated>
            Développeur JS — Paris
          </AnimatedText>
          <motion.div
            className="about-hero-photo"
            variants={fadeOpacityVariants}
          >
            <img
              src={photo}
              alt="Portrait de Thomas Marguenot"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </motion.div>

        <AnimatedHeading as="h1" className="about-headline" orchestrated>
          Voici mon histoire.
        </AnimatedHeading>

        <AnimatedText className="about-lead" orchestrated>
          Spécialisé React et React Native. J&apos;ai travaillé sur MyCanal,
          Quotatis et Rolex — des produits où la qualité et la performance
          comptent.
        </AnimatedText>
      </motion.div>

      {/* ── Parcours ── */}
      <motion.section
        className="about-section"
        variants={sectionStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{ borderColor }}
      >
        <motion.div className="about-section-header" variants={itemVariantsSm}>
          <span className="about-section-number">—</span>
          <h2 className="about-section-title">Parcours</h2>
        </motion.div>

        <div className="about-timeline">
          {experiences.map((exp) => (
            <motion.div
              key={exp.index}
              className="about-timeline-item"
              variants={itemVariants}
              style={{ borderColor }}
            >
              <span className="about-timeline-index">{exp.index}</span>
              <div className="about-timeline-content">
                <div className="about-timeline-meta">
                  <span className="about-timeline-period">{exp.period}</span>
                  <span className="about-timeline-company">{exp.company}</span>
                </div>
                <p className="about-timeline-role">{exp.role}</p>
                <p className="about-timeline-desc">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Stack technique ── */}
      <motion.section
        className="about-section about-section--graph"
        variants={sectionStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{ borderColor }}
      >
        <motion.div className="about-section-header" variants={itemVariantsSm}>
          <span className="about-section-number">—</span>
          <h2 className="about-section-title">Stack technique</h2>
        </motion.div>

        <motion.p className="about-section-desc" variants={itemVariantsSm}>
          Un écosystème construit sur 15 ans — chaque techno a sa raison
          d&apos;être, et leurs liens racontent comment je les combine au
          quotidien.
        </motion.p>

        <div className="about-graph-wrapper">
          <TechGraph />
        </div>

        <motion.div className="about-graph-legend" variants={itemVariantsSm}>
          <span className="about-legend-item about-legend-item--frontend">
            Frontend
          </span>
          <span className="about-legend-item about-legend-item--mobile">
            Mobile
          </span>
          <span className="about-legend-item about-legend-item--backend">
            Backend
          </span>
          <span className="about-legend-item about-legend-item--tooling">
            Outillage
          </span>
        </motion.div>
      </motion.section>

      {/* ── Côté passion ── */}
      <motion.section
        className="about-section about-section--passions"
        variants={sectionStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        style={{ borderColor }}
      >
        <motion.div className="about-section-header" variants={itemVariantsSm}>
          <span className="about-section-number">—</span>
          <h2 className="about-section-title">Côté passion</h2>
        </motion.div>

        <div className="about-passions">
          {passions.map((p) => (
            <motion.div
              key={p.label}
              className="about-passion-item"
              variants={itemVariants}
            >
              <p className="about-passion-label">{p.label}</p>
              <p className="about-passion-desc">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="about-stamp" aria-hidden>
        about
      </div>
    </motion.div>
  );
}

export default About;
