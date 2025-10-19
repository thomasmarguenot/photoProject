import { AgencySection } from './AgencySection/AgencySection';
import { ClientsSection } from './ClientsSection/ClientsSection';
import { HeroSection } from './HeroSection/HeroSection';
import { ProjectsSection } from './ProjectsSection/ProjectsSection';
import './Home.css';

export function Home() {
  return (
    <div className="home">
      <div className="home-hero-clients">
        <HeroSection />
        <ClientsSection />
      </div>
      <ProjectsSection />
      <AgencySection />
    </div>
  );
}

export default Home;
