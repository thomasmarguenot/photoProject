import { AgencySection } from './AgencySection/AgencySection';
import { ClientsSection } from './ClientsSection/ClientsSection';
import { HeroSection } from './HeroSection/HeroSection';
import { ProjectsSection } from './ProjectsSection/ProjectsSection';
import { TechnologiesSection } from './TechnologiesSection/TechnologiesSection';
import './Home.css';

export function Home() {
  return (
    <div className="home">
      <HeroSection />
      <TechnologiesSection />
      <ClientsSection />
      <ProjectsSection />
      <AgencySection />
    </div>
  );
}

export default Home;
