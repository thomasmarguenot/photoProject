import { motion } from 'framer-motion';
import './Contact.css';

export function Contact() {
  return (
    <div className="contact">
      <div className="contact-inner">
        <main className="contact-content" role="main">
          <section className="contact-block contact-center">
            <motion.h1
              className="contact-title"
              initial={{
                fontVariationSettings: '"wght" 400',
                fontStyle: 'normal',
              }}
              animate={{
                fontVariationSettings: '"wght" 900',
                fontStyle: 'normal',
              }}
              whileHover={{
                fontVariationSettings: '"wght" 100',
                fontStyle: 'normal',
              }}
              transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
            >
              travaillons ensemble.
            </motion.h1>

            <p className="contact-description contact-description--black">
              Je suis ouvert aux collaborations, aux missions et aux échanges
              autour de la passion du développement. Que ce soit pour un projet
              d&apos;agence, une mission courte ou simplement pour discuter
              technique et inspiration, n&apos;hésitez pas à me contacter. Je
              réponds habituellement rapidement et j&apos;aime échanger sur des
              idées, prototypes ou de simples retours d&apos;expérience.
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
