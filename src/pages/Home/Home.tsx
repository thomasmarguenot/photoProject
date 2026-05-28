import { MotionConfig } from 'framer-motion';

import { Seo } from '@/components/common/Seo/Seo';
import { baseTransition } from '@/utils/animations';

import { AgencySection } from './AgencySection/AgencySection';
import { ClientsSection } from './ClientsSection/ClientsSection';
import { HeroSection } from './HeroSection/HeroSection';
import { ProjectsSection } from './ProjectsSection/ProjectsSection';
import './Home.css';

export function Home() {
  return (
    <MotionConfig reducedMotion="user" transition={baseTransition}>
      <Seo
        title="Thomas Marguenot — Développeur React & React Native, Paris"
        description="Développeur JS Full-Stack freelance à Paris, spécialisé React et React Native. 15 ans d'expérience (MyCanal, Quotatis, Rolex). Disponible pour vos projets web et mobiles."
        path="/"
      />
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
