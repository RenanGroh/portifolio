/**
 * Project type definition
 */
export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
  featured: boolean;
  year: number;
}

/**
 * Projects data
 * Add your projects here
 */
export const projects: Project[] = [
  {
    slug: "project-example",
    title: "Project Example",
    description:
      "A brief description of the project showcasing the main technologies and purpose.",
    longDescription:
      "A longer description that goes into more detail about the project, its architecture, challenges faced, and solutions implemented.",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    github: "https://github.com/yourusername/project",
    demo: "https://project-demo.com",
    featured: true,
    year: 2025,
  },
  // Add more projects here...
];

/**
 * Get featured projects
 */
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
