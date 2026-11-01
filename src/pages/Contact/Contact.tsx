import { motion } from 'framer-motion';

import { Seo } from '@/components/common/Seo/Seo';
import {
  AnimatedHeading,
  AnimatedText,
} from '@/components/common/TextAnimations';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import {
  pageItemVariants,
  pageStaggerVariants,
  sectionStaggerVariants,
} from '@/utils/animations';

import './Contact.css';

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

const CopyIcon = () => (
  <svg className="contact-copy-icon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="9" y="9" width="12" height="12" rx="2" />
    <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
  </svg>
);

const CheckIcon = () => (
  <svg className="contact-copy-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 12.5l5 5L20 6.5" />
  </svg>
);

export function Contact() {
  const { copiedText, copy } = useCopyToClipboard();

  return (
    <div className="contact">
      <Seo
        title="Contact — Thomas Marguenot"
        description="Disponible pour des missions freelance React à Paris (remote possible). Contactez Thomas Marguenot pour renforcer votre équipe ou démarrer un projet."
        path="/contact"
      />
      <motion.div
        className="contact-inner"
        variants={pageStaggerVariants}
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
          variants={sectionStaggerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {contacts.map((c) => {
            const isExternal = c.href.startsWith('http');
            const email = c.href.startsWith('mailto:')
              ? c.href.slice('mailto:'.length)
              : undefined;
            const isCopied = email !== undefined && copiedText === email;
            return (
              <motion.div
                key={c.label}
                className="contact-entry"
                variants={pageItemVariants}
              >
                <p className="contact-label">{c.label}</p>
                <div className="contact-actions">
                  <a
                    className="contact-link"
                    href={c.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                  >
                    {c.display}
                  </a>
                  {email && (
                    <>
                      <button
                        type="button"
                        className={`contact-copy${isCopied ? ' contact-copy--copied' : ''}`}
                        onClick={() => copy(email)}
                        aria-label={`Copier l'adresse ${email}`}
                      >
                        {isCopied ? <CheckIcon /> : <CopyIcon />}
                      </button>
                      <span
                        className="contact-copy-feedback"
                        aria-live="polite"
                      >
                        {isCopied ? 'Copiée' : ''}
                      </span>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Contact;
