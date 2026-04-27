import { motion } from 'framer-motion';

import { MOTION, TRANSITION } from '@/utils/constants';

import './Contact.css';

export function Contact() {
  return (
    <div className="contact">
      <div className="contact-inner">
        <main className="contact-content" role="main">
          <section className="contact-block contact-center">
            <motion.h1
              className="contact-title"
              {...MOTION.FONT_WEIGHT}
              transition={TRANSITION.FONT_MORPH}
            >
              Travaillons ensemble.
            </motion.h1>

            <p className="contact-description contact-description--black">
              Disponible pour des missions freelance sur Paris (remote
              possible), je recherche des projets frontend ambitieux en React.
              Que ce soit pour renforcer une équipe, piloter un développement ou
              démarrer une collaboration en agence, contactez-moi directement.
              Je réponds rapidement.
            </p>

            <div className="contact-list">
              <div className="contact-entry">
                <div className="contact-label">Un projet agence ?</div>
                <a
                  className="contact-link"
                  href="mailto:hello@agence-belle-epoque.fr"
                >
                  hello@agence-belle-epoque.fr
                </a>
              </div>

              <div className="contact-entry">
                <div className="contact-label">Une mission, une question ?</div>
                <a
                  className="contact-link"
                  href="mailto:thomas@agence-belle-epoque.fr"
                >
                  thomas@agence-belle-epoque.fr
                </a>
              </div>

              <div className="contact-entry">
                <div className="contact-label">Social</div>
                <a
                  className="contact-link"
                  href="https://www.linkedin.com/in/thomas-marguenot-72a51863/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>

      <div className="contact-stamp" aria-hidden>
        contact
      </div>
    </div>
  );
}

export default Contact;
