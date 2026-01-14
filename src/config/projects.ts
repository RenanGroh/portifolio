/**
 * Project type definition with i18n support
 */
export interface Project {
  slug: string;
  title: string;
  description: {
    "pt-BR": string;
    en: string;
  };
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
    title: "Rota Otimizada API",
    description: {
      "pt-BR":
        "API de otimização de rotas para entregas desenvolvida durante estágio na Compass UOL. Arquitetura de microsserviços com containerização Docker e deploy na AWS.",
      en:
        "Delivery route optimization API developed during internship at Compass UOL. Microservices architecture with Docker containerization and AWS deployment.",
    },
    tags: ["Node.js", "NestJS", "MongoDB", "Docker", "AWS"],
    github: "https://github.com/samuvf/rota-otimizada-microservice",
    featured: true,
    year: 2025,
  },
  {
    slug: "digitano",
    title: "Digitano",
    description: {
      "pt-BR":
        "Jogo de digitação estilo Monkeytype desenvolvido em equipe. Sistema completo com autenticação, modo multiplayer e ranking de ligas competitivas.",
      en:
        "Monkeytype-style typing game developed as a team project. Full-featured with authentication, multiplayer mode, and competitive league rankings.",
    },
    tags: ["PHP", "React", "MySQL", "Docker"],
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
