"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { Typography } from "@/components/atoms/Typography";
import { Container } from "@/components/atoms/Layout";
import { ProjectCard } from "@/components/organisms/ProjectCard";
import { Button } from "@/components/atoms/Button";
import { projects } from "@/config/projects";

export function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="projects" className="relative py-24 md:py-32">
      <Container>
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeIn>
            <Typography as="span" variant="small" className="text-accent-primary font-medium uppercase tracking-wider">
              Portfólio
            </Typography>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Typography as="h2" variant="h2" className="text-text-primary mt-2">
              Projetos em{" "}
              <span className="text-accent-primary">destaque</span>
            </Typography>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Typography as="p" variant="body" className="text-text-secondary mt-4">
              Uma seleção dos meus trabalhos mais recentes, demonstrando
              habilidades em diferentes tecnologias e domínios.
            </Typography>
          </FadeIn>
        </div>

        {/* Projects Grid */}
        <StaggerContainer
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          staggerDelay={0.15}
        >
          {featuredProjects.map((project, index) => (
            <StaggerItem key={project.slug}>
              <ProjectCard project={project} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Empty state if no projects */}
        {featuredProjects.length === 0 && (
          <FadeIn>
            <div className="text-center py-16">
              <Typography as="p" variant="body" className="text-text-muted">
                Projetos em breve...
              </Typography>
            </div>
          </FadeIn>
        )}

        {/* View all button */}
        {projects.length > 3 && (
          <FadeIn delay={0.4}>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <a href="/projects">Ver todos os projetos</a>
              </Button>
            </div>
          </FadeIn>
        )}
      </Container>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent-primary/5 to-transparent rounded-full" />
      </div>
    </section>
  );
}
