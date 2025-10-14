import { motion, type Variants } from 'framer-motion';

import { ANIMATION } from '@/utils/constants';

import './Home.css';

export function Home() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const heroVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION.DURATION,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: ANIMATION.DURATION,
      },
    },
  };

  return (
    <div className="home">
      <motion.div
        className="home-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.section className="home-hero" variants={heroVariants}>
          <h1 className="home-title">Welcome to PhotoProject</h1>
          <p className="home-subtitle">
            A modern React application with TypeScript, Vite, and Tailwind CSS
          </p>
        </motion.section>

        <motion.section className="home-features" variants={containerVariants}>
          <motion.div className="feature-card" variants={cardVariants}>
            <h3 className="feature-title">⚡ Fast Development</h3>
            <p className="feature-description">
              Built with Vite for lightning-fast HMR and optimized builds
            </p>
          </motion.div>

          <motion.div className="feature-card" variants={cardVariants}>
            <h3 className="feature-title">🎨 Styled with Tailwind</h3>
            <p className="feature-description">
              Utility-first CSS with custom components using @apply
            </p>
          </motion.div>

          <motion.div className="feature-card" variants={cardVariants}>
            <h3 className="feature-title">📦 Type-Safe</h3>
            <p className="feature-description">
              Full TypeScript support with strict mode enabled
            </p>
          </motion.div>

          <motion.div className="feature-card" variants={cardVariants}>
            <h3 className="feature-title">✨ Code Quality</h3>
            <p className="feature-description">
              ESLint, Prettier, and Husky for consistent code quality
            </p>
          </motion.div>
        </motion.section>
      </motion.div>
    </div>
  );
}

export default Home;
