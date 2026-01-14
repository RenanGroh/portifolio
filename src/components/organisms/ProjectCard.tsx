"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type Project } from "@/config/projects";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/molecules/Card";
import { TiltCard } from "@/components/molecules/TiltCard";
import { SkillBadgeGroup } from "@/components/molecules/SkillBadge";
import { Button } from "@/components/atoms/Button";
import { Icon } from "@/components/atoms/Icon";
import { useTranslation } from "@/hooks/useI18n";

export interface ProjectCardProps {
  project: Project;
  className?: string;
  index?: number;
  useTilt?: boolean;
}

export function ProjectCard({
  project,
  className,
  index = 0,
  useTilt = true,
}: ProjectCardProps) {
  const { t } = useTranslation();
  const CardWrapper = useTilt ? TiltCard : Card;
  const wrapperProps = useTilt
    ? { className: cn("h-full", className) }
    : { variant: "default" as const, hover: "lift" as const, className: cn("h-full", className) };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <CardWrapper {...wrapperProps}>
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <CardHeader className="mb-2">
            <div className="flex items-start justify-between gap-4">
              <div>
                <CardTitle className="mb-2">{project.title}</CardTitle>
                <span className="text-xs text-text-muted font-mono">
                  {project.year}
                </span>
              </div>
              {project.featured && (
                <span className="px-2 py-1 text-xs bg-bg-tertiary rounded-full text-text-secondary">
                  {t.projects.featured}
                </span>
              )}
            </div>
          </CardHeader>

          {/* Description */}
          <CardContent className="flex-grow flex flex-col">
            <CardDescription className="mb-4 line-clamp-3 min-h-[4.5rem]">
              {project.description}
            </CardDescription>

            {/* Tags */}
            <div className="mt-auto">
              <SkillBadgeGroup
                skills={project.tags.map((tag) => ({ name: tag }))}
                animate={false}
              />
            </div>
          </CardContent>

          {/* Actions */}
          <CardFooter className="mt-auto pt-4">
            {project.github && (
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="github" size={16} />
                  {t.projects.code}
                </a>
              </Button>
            )}
            {project.demo && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="external-link" size={16} />
                  {t.projects.demo}
                </a>
              </Button>
            )}
          </CardFooter>
        </div>
      </CardWrapper>
    </motion.div>
  );
}

/**
 * Grid of project cards
 */
export interface ProjectGridProps {
  projects: Project[];
  className?: string;
  columns?: 1 | 2 | 3;
}

export function ProjectGrid({
  projects,
  className,
  columns = 2,
}: ProjectGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
