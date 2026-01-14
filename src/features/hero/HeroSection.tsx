"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { siteConfig } from "@/config";
import { Typography } from "@/components/atoms/Typography";
import { GradientText } from "@/components/atoms/GlowText";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { SocialLinks } from "@/components/molecules/SocialLinks";
import { SceneLoader } from "@/components/three/Scene";
import { useTranslation } from "@/hooks/useI18n";

// Dynamic import for 3D scene (client-only, no SSR)
const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((mod) => mod.HeroScene),
  {
    ssr: false,
    loading: () => <SceneLoader />,
  }
);

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <HeroScene className="absolute inset-0 -z-10" />

      {/* Content overlay */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Typography
            variant="muted"
            className="mb-4 font-mono tracking-[0.2em] uppercase"
          >
            {t.hero.role}
          </Typography>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <GradientText
            from="#fafafa"
            via="#e4e4e7"
            to="#a1a1aa"
            animate={false}
          >
            {siteConfig.author.name}
          </GradientText>
        </motion.h1>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Typography variant="lead" className="max-w-2xl mx-auto mb-8">
            {t.hero.description}
          </Typography>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button variant="glow" size="lg" asChild>
            <a href="#projects" className="inline-flex items-center gap-2 whitespace-nowrap">
              {t.hero.cta.primary}
              <Icon name="arrow-right" size={18} />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#contact">{t.hero.cta.secondary}</a>
          </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <SocialLinks />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-2 text-text-muted hover:text-text-secondary transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs font-mono tracking-wider uppercase">{t.hero.scroll}</span>
          <Icon name="chevron-down" size={20} />
        </motion.a>
      </motion.div>

      {/* Gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none" />
    </section>
  );
}
