import { siteConfig, getFeaturedProjects, skills, categoryLabels, type SkillCategory } from "@/config";
import { MainLayout } from "@/components/templates/MainLayout";
import { Container, Section } from "@/components/atoms/Layout";
import { Typography } from "@/components/atoms/Typography";
import { GradientText } from "@/components/atoms/GlowText";
import { ProjectGrid } from "@/components/organisms/ProjectCard";
import { ContactForm } from "@/components/organisms/ContactForm";
import { SkillBadgeGroup } from "@/components/molecules/SkillBadge";

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<SkillCategory, typeof skills>);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6">
        <div className="text-center">
          <Typography variant="muted" className="mb-4 font-mono tracking-wider uppercase">
            Fullstack Developer & Gamedev
          </Typography>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <GradientText animate>{siteConfig.author.name}</GradientText>
          </h1>
          <Typography variant="lead" className="max-w-xl mx-auto">
            {siteConfig.description}
          </Typography>
          
          {/* Placeholder for 3D Canvas - Phase 3 */}
          <div className="mt-12 glass rounded-2xl p-8 max-w-md mx-auto">
            <Typography variant="small" color="muted">
              ✨ 3D Particle Scene will be rendered here
            </Typography>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-border flex justify-center pt-2">
            <div className="w-1 h-2 bg-text-muted rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about">
        <Container size="md" className="text-center">
          <Typography variant="h2" className="mb-8">About</Typography>
          <Typography variant="lead" className="mb-6">
            I&apos;m a passionate developer who loves building scalable systems
            and creating immersive experiences. With expertise in backend
            technologies and a growing interest in game development, I bring
            a unique perspective to every project.
          </Typography>
          <Typography variant="body" color="secondary">
            I value clean code, solid architecture, and continuous learning.
            When I&apos;m not coding, you&apos;ll find me exploring new technologies
            or working on indie game projects.
          </Typography>
        </Container>
      </Section>

      {/* Stack Section */}
      <Section id="stack" className="bg-bg-secondary">
        <Container size="lg">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">Tech Stack</Typography>
            <Typography variant="lead">
              Technologies and tools I work with
            </Typography>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(Object.keys(skillsByCategory) as SkillCategory[]).map((category) => (
              <div key={category} className="space-y-4">
                <Typography variant="h4" className="text-text-secondary">
                  {categoryLabels[category]}
                </Typography>
                <SkillBadgeGroup 
                  skills={skillsByCategory[category]} 
                  animate 
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Projects Section */}
      <Section id="projects">
        <Container size="lg">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">Projects</Typography>
            <Typography variant="lead">
              Featured work and side projects
            </Typography>
          </div>
          
          {featuredProjects.length > 0 ? (
            <ProjectGrid projects={featuredProjects} columns={2} />
          ) : (
            <div className="text-center py-12">
              <Typography variant="body" color="muted">
                Projects coming soon...
              </Typography>
            </div>
          )}
        </Container>
      </Section>

      {/* Contact Section */}
      <Section id="contact" className="bg-bg-secondary">
        <Container size="sm">
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">Get in Touch</Typography>
            <Typography variant="lead">
              Have a project in mind? Let&apos;s talk about it.
            </Typography>
          </div>
          
          <ContactForm />
        </Container>
      </Section>
    </MainLayout>
  );
}
