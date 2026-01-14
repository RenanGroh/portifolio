"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animations";
import { Typography } from "@/components/atoms/Typography";
import { Container } from "@/components/atoms/Layout";
import { ProjectCard } from "@/components/organisms/ProjectCard";
import { Button } from "@/components/atoms/Button";
import { ProjectsScene } from "@/components/three/SectionScenes";
import { projects } from "@/config/projects";
import { useTranslation } from "@/hooks/useI18n";

export function ProjectsSection() {
  const { t } = useTranslation();
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      {/* 3D Background */}
      <ProjectsScene />
      
      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <FadeIn>
            <Typography as="span" variant="small" className="text-accent-primary font-medium uppercase tracking-wider">
              {t.projects.label}
            </Typography>
          </FadeIn>

          <FadeIn delay={0.1}>
            <Typography as="h2" variant="h2" className="text-text-primary mt-2">
              {t.projects.title}{" "}
              <span className="text-accent-primary">{t.projects.titleHighlight}</span>
            </Typography>
          </FadeIn>

          <FadeIn delay={0.2}>
            <Typography as="p" variant="body" className="text-text-secondary mt-4">
              {t.projects.description}
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
                {t.projects.comingSoon}
              </Typography>
            </div>
          </FadeIn>
        )}

        {/* View all button */}
        {projects.length > 3 && (
          <FadeIn delay={0.4}>
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" asChild>
                <a href="/projects">{t.projects.viewAll}</a>
              </Button>
            </div>
          </FadeIn>
        )}
      </Container>
    </section>
  );
}
