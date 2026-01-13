"use client";

import { FadeIn, StaggerContainer, StaggerItem, Parallax } from "@/components/animations";
import { Typography } from "@/components/atoms/Typography";
import { Container } from "@/components/atoms/Layout";
import { SkillBadge } from "@/components/molecules/SkillBadge";
import { siteConfig } from "@/config/site";
import { skills } from "@/config/skills";

export function AboutSection() {
  const techStack = skills.filter((s) => s.category === "frontend" || s.category === "backend");
  const tools = skills.filter((s) => s.category === "tools");

  return (
    <section
      id="about"
      className="relative py-24 md:py-32 bg-gradient-to-b from-transparent via-bg-secondary/30 to-transparent"
    >
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: About text */}
          <div className="space-y-6">
            <FadeIn>
              <Typography as="span" variant="small" className="text-accent-primary font-medium uppercase tracking-wider">
                Sobre mim
              </Typography>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Typography as="h2" variant="h2" className="text-text-primary">
                Desenvolvedor apaixonado por{" "}
                <span className="text-accent-primary">criar experiências</span>
              </Typography>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Typography as="p" variant="body" className="text-text-secondary leading-relaxed">
                Sou {siteConfig.author.name}, um Desenvolvedor Fullstack com expertise em
                Java, Node.js e C#. Acredito que código limpo e arquitetura sólida são a
                base para produtos excepcionais.
              </Typography>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Typography as="p" variant="body" className="text-text-secondary leading-relaxed">
                Além do desenvolvimento web, sou apaixonado por Game Development,
                combinando criatividade com lógica para construir experiências interativas
                memoráveis. Sigo princípios SOLID e Clean Architecture em todos os projetos.
              </Typography>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="flex gap-4 pt-4">
                <div className="text-center">
                  <Typography as="p" variant="h3" className="text-accent-primary">
                    5+
                  </Typography>
                  <Typography as="p" variant="small" className="text-text-muted">
                    Anos de experiência
                  </Typography>
                </div>
                <div className="w-px bg-border-primary" />
                <div className="text-center">
                  <Typography as="p" variant="h3" className="text-accent-primary">
                    20+
                  </Typography>
                  <Typography as="p" variant="small" className="text-text-muted">
                    Projetos entregues
                  </Typography>
                </div>
                <div className="w-px bg-border-primary" />
                <div className="text-center">
                  <Typography as="p" variant="h3" className="text-accent-primary">
                    100%
                  </Typography>
                  <Typography as="p" variant="small" className="text-text-muted">
                    Comprometimento
                  </Typography>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right: Skills */}
          <div className="space-y-8">
            <Parallax speed={0.2}>
              <FadeIn direction="right">
                <div className="p-6 rounded-2xl bg-bg-tertiary/50 border border-border-primary backdrop-blur-sm">
                  <Typography as="h3" variant="h4" className="text-text-primary mb-4">
                    Tech Stack
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
                    Ferramentas
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

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-secondary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
