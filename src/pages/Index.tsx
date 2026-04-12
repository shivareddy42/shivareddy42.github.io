import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";

const SectionDivider = () => (
  <div className="max-w-6xl mx-auto px-6">
    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative grain-overlay">
      <Navbar />
      <HeroSection />
      <SectionDivider />
      <section id="about" className="py-24 sm:py-32 px-6">
        <AboutSection />
      </section>
      <SectionDivider />
      <section id="projects" className="py-24 sm:py-32 px-6">
        <ProjectsSection />
      </section>
      <SectionDivider />
      <section id="experience" className="py-24 sm:py-32 px-6">
        <ExperienceSection />
      </section>
      <SectionDivider />
      <section id="skills" className="py-24 sm:py-32 px-6">
        <SkillsSection />
      </section>
      <SectionDivider />
      <section id="contact" className="py-24 sm:py-32 px-6">
        <ContactSection />
      </section>
    </div>
  );
};

export default Index;
