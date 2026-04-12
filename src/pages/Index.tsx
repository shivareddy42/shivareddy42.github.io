import Navbar from "@/components/Navbar";
import CyberSkyCanvas from "@/components/CyberSkyCanvas";
import ParticleCanvas from "@/components/ParticleCanvas";
import CursorTrail from "@/components/CursorTrail";
import HeroSection from "@/components/HeroSection";
import HolographicSection from "@/components/HolographicSection";
import StreetDivider from "@/components/StreetDivider";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <CyberSkyCanvas />
      <ParticleCanvas />
      <CursorTrail />
      <Navbar />
      
      <HeroSection />
      
      <StreetDivider variant="lamp" label="Entering the Grid" />

      <HolographicSection id="about">
        <AboutSection />
      </HolographicSection>

      <StreetDivider variant="neon" label="District: Projects" />

      <HolographicSection id="projects">
        <ProjectsSection />
      </HolographicSection>

      <StreetDivider variant="lamp" label="District: Experience" />

      <HolographicSection id="experience">
        <ExperienceSection />
      </HolographicSection>

      <StreetDivider variant="neon" label="District: Arsenal" />

      <HolographicSection id="skills">
        <SkillsSection />
      </HolographicSection>

      <StreetDivider variant="lamp" label="End of the Road" />

      <HolographicSection id="contact">
        <ContactSection />
      </HolographicSection>
    </div>
  );
};

export default Index;
