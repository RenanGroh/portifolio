"use client";

import { FadeIn, Parallax } from "@/components/animations";
import { Typography } from "@/components/atoms/Typography";
import { Container } from "@/components/atoms/Layout";
import { ContactForm } from "@/components/organisms/ContactForm";
import { SocialLinks } from "@/components/molecules/SocialLinks";
import { siteConfig } from "@/config/site";
import { Mail, MapPin, Calendar } from "lucide-react";
import { useTranslation } from "@/hooks/useI18n";

export function ContactSection() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-gradient-to-b from-transparent to-bg-secondary/50">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Contact Info */}
          <div className="space-y-8">
            <div>
              <FadeIn>
                <Typography as="span" variant="small" className="text-accent-primary font-medium uppercase tracking-wider">
                  {t.contact.label}
                </Typography>
              </FadeIn>

              <FadeIn delay={0.1}>
                <Typography as="h2" variant="h2" className="text-text-primary mt-2">
                  {t.contact.title}{" "}
                  <span className="text-accent-primary">{t.contact.titleHighlight}</span> {t.contact.titleSuffix}
                </Typography>
              </FadeIn>

              <FadeIn delay={0.2}>
                <Typography as="p" variant="body" className="text-text-secondary mt-4 max-w-md">
                  {t.contact.description}
                </Typography>
              </FadeIn>
            </div>

            <FadeIn delay={0.3}>
              <div className="space-y-4">
                <a
                  href={`mailto:${siteConfig.author.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-bg-tertiary/50 border border-border-primary hover:border-accent-primary/50 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent-primary/10 flex items-center justify-center group-hover:bg-accent-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-accent-primary" />
                  </div>
                  <div>
                    <Typography as="p" variant="small" className="text-text-muted">
                      {t.contact.email}
                    </Typography>
                    <Typography as="p" variant="body" className="text-text-primary">
                      {siteConfig.author.email}
                    </Typography>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-tertiary/50 border border-border-primary">
                  <div className="w-12 h-12 rounded-lg bg-accent-secondary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-accent-secondary" />
                  </div>
                  <div>
                    <Typography as="p" variant="small" className="text-text-muted">
                      {t.contact.location}
                    </Typography>
                    <Typography as="p" variant="body" className="text-text-primary">
                      {t.contact.locationValue}
                    </Typography>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-bg-tertiary/50 border border-border-primary">
                  <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <Typography as="p" variant="small" className="text-text-muted">
                      {t.contact.availability}
                    </Typography>
                    <Typography as="p" variant="body" className="text-text-primary">
                      {t.contact.availabilityValue}
                    </Typography>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="pt-4">
                <Typography as="p" variant="small" className="text-text-muted mb-3">
                  {t.contact.socials}
                </Typography>
                <SocialLinks />
              </div>
            </FadeIn>
          </div>

          {/* Right: Contact Form */}
          <Parallax speed={0.1}>
            <FadeIn direction="right" delay={0.2}>
              <div className="p-6 md:p-8 rounded-2xl bg-bg-tertiary/30 border border-border-primary backdrop-blur-sm">
                <Typography as="h3" variant="h4" className="text-text-primary mb-6">
                  {t.contact.formTitle}
                </Typography>
                <ContactForm />
              </div>
            </FadeIn>
          </Parallax>
        </div>
      </Container>

      {/* Background decorations */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border-primary to-transparent" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}
