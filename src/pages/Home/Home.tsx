import { MotionConfig } from 'framer-motion';

import { baseTransition } from '@/utils/animations';

import { AgencySection } from './AgencySection/AgencySection';
import { ClientsSection } from './ClientsSection/ClientsSection';
import { HeroSection } from './HeroSection/HeroSection';
import { ProjectsSection } from './ProjectsSection/ProjectsSection';
import './Home.css';

export function Home() {
  return (
    <MotionConfig reducedMotion="user" transition={baseTransition}>
      <div className="home">
        <div className="home-hero-clients">
          <HeroSection />
          <ClientsSection />
        </div>
        <ProjectsSection />
        <AgencySection />
      </div>
    </MotionConfig>
  );
}

export default Home;
