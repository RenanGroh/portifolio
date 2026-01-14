"use client";

import { FadeIn, StaggerContainer, StaggerItem, Parallax } from "@/components/animations";
import { Typography } from "@/components/atoms/Typography";
import { Container } from "@/components/atoms/Layout";
import { SkillBadge } from "@/components/molecules/SkillBadge";
import { AboutScene } from "@/components/three/SectionScenes";
import { siteConfig } from "@/config/site";
import { skills } from "@/config/skills";
import { useTranslation } from "@/hooks/useI18n";

export function AboutSection() {
  const { t, interpolate } = useTranslation();
  const techStack = skills.filter((s) => s.category === "frontend" || s.category === "backend");
  const tools = skills.filter((s) => s.category === "tools");

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* 3D Background */}
      <AboutScene />
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: About text */}
          <div className="space-y-6">
            <FadeIn>
              <Typography as="span" variant="small" className="text-accent-primary font-medium uppercase tracking-wider">
                {t.about.label}
              </Typography>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Typography as="h2" variant="h2" className="text-text-primary">
                {t.about.title}{" "}
                <span className="text-accent-primary">{t.about.titleHighlight}</span>
              </Typography>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Typography as="p" variant="body" className="text-text-secondary leading-relaxed">
                {interpolate(t.about.description1, { name: siteConfig.author.name })}
              </Typography>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Typography as="p" variant="body" className="text-text-secondary leading-relaxed">
                {t.about.description2}
              </Typography>
            </FadeIn>


          </div>

          {/* Right: Skills */}
          <div className="space-y-8">
            <Parallax speed={0.2}>
              <FadeIn direction="right">
                <div className="p-6 rounded-2xl bg-bg-tertiary/50 border border-border-primary backdrop-blur-sm">
                  <Typography as="h3" variant="h4" className="text-text-primary mb-4">
                    {t.about.techStack}
                  </Typography>
                  <StaggerContainer className="flex flex-wrap gap-2" staggerDelay={0.05}>
                    {techStack.map((skill) => (
                      <StaggerItem key={skill.name}>
                        <SkillBadge
                          name={skill.name}
                          level={skill.level}
                          category={skill.category}
                        />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </FadeIn>
            </Parallax>

            <Parallax speed={0.1}>
              <FadeIn direction="right" delay={0.2}>
                <div className="p-6 rounded-2xl bg-bg-tertiary/50 border border-border-primary backdrop-blur-sm">
                  <Typography as="h3" variant="h4" className="text-text-primary mb-4">
                    {t.about.tools}
                  </Typography>
                  <StaggerContainer className="flex flex-wrap gap-2" staggerDelay={0.05}>
                    {tools.map((skill) => (
                      <StaggerItem key={skill.name}>
                        <SkillBadge
                          name={skill.name}
                          level={skill.level}
                          category={skill.category}
                        />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </FadeIn>
            </Parallax>
          </div>
        </div>
      </Container>

      {/* Gradient overlay for content readability */}
      <div className="absolute inset-0 -z-5 bg-gradient-to-r from-bg-primary/90 via-bg-primary/70 to-transparent pointer-events-none" />
    </section>
  );
}
