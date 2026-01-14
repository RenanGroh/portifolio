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
    slug: "api-de-rota-otimizada-para-entregas",
    title: "API de Rota Otimizada para Entregas",
    description:
      "Um projeto backend desenvolvido durante o estágio na Compass UOL nas stacks nodejs, nestJs, mongoDB e docker,utilizando arquitetura de microsserviços com dockerização e deploy aws, é um sistema de otimização de rotas para entregas.",
    longDescription:
      "",
    tags: ["NodeJs", "NestJs", "MongoDB", "Docker", "AWS"],
    github: "https://github.com/samuvf/rota-otimizada-microservice",
    //demo: "",
    featured: true,
    year: 2025,
  },
  {
    slug: "digitano",
    title: "Digitano",
    description:
      "Um projeto academico desenvolvido em grupo nas stacks php e react, é um jogo de digitação estilo Monkeytype com atenticação, multiplayer e sistema de ligas",
    longDescription:
      "",
    tags: ["php", "react", "SQL", "Docker"],
    github: "https://github.com/vitor-felipee/digitano",
    demo: "https://digitano.vercel.app",
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
