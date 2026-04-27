import { motion } from 'framer-motion';

import {
  AnimatedHeading,
  AnimatedText,
} from '@/components/common/TextAnimations';
import {
  createFadeUpVariants,
  createStaggerContainer,
} from '@/utils/animations';
import { ANIMATION } from '@/utils/constants';

import './Contact.css';

const pageStagger = createStaggerContainer(
  ANIMATION.STAGGER.CHILDREN_WIDE,
  ANIMATION.DELAY.XS
);
const sectionStagger = createStaggerContainer(
  ANIMATION.STAGGER.CHILDREN,
  ANIMATION.DELAY.SM
);
const itemVariants = createFadeUpVariants(ANIMATION.OFFSET.MD);

const contacts = [
  {
    label: 'Un projet agence ?',
    href: 'mailto:hello@agence-belle-epoque.fr',
    display: 'hello@agence-belle-epoque.fr',
  },
  {
    label: 'Une mission, une question ?',
    href: 'mailto:thomas@agence-belle-epoque.fr',
    display: 'thomas@agence-belle-epoque.fr',
  },
  {
    label: 'Social',
    href: 'https://www.linkedin.com/in/thomas-marguenot-72a51863/',
    display: 'LinkedIn',
  },
];

export function Contact() {
  return (
    <div className="contact">
      <motion.div
        className="contact-inner"
        variants={pageStagger}
        initial="hidden"
        animate="visible"
      >
        <AnimatedHeading as="h1" className="contact-title" orchestrated>
          Travaillons ensemble.
        </AnimatedHeading>

        <AnimatedText className="contact-description" orchestrated>
          Disponible pour des missions freelance sur Paris (remote possible), je
          recherche des projets frontend ambitieux en React. Que ce soit pour
          renforcer une équipe, piloter un développement ou démarrer une
          collaboration en agence, contactez-moi directement. Je réponds
          rapidement.
        </AnimatedText>

        <motion.div
          className="contact-list"
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {contacts.map((c) => (
            <motion.div
              key={c.label}
              className="contact-entry"
              variants={itemVariants}
            >
              <p className="contact-label">{c.label}</p>
              <a
                className="contact-link"
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={
                  c.href.startsWith('http') ? 'noopener noreferrer' : undefined
                }
              >
                {c.display}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Contact;
