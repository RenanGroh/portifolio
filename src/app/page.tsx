import { MainLayout } from "@/components/templates/MainLayout";
import { HeroSection } from "@/features/hero";
import { AboutSection } from "@/features/about";
import { ProjectsSection } from "@/features/projects";
import { ContactSection } from "@/features/contact";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section with 3D particle field */}
      <HeroSection />

      {/* About Section with scroll animations */}
      <AboutSection />

      {/* Projects Section with staggered reveal */}
      <ProjectsSection />

      {/* Contact Section with form */}
      <ContactSection />
    </MainLayout>
  );
}
