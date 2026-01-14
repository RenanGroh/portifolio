/**
 * Skill/Technology type definition
 */
export interface Skill {
  name: string;
  category: SkillCategory;
  level: "expert" | "advanced" | "intermediate";
  icon?: string;
  color?: string;
}

export type SkillCategory =
  | "backend"
  | "frontend"
  | "database"
  | "devops"
  | "gamedev"
  | "tools";

/**
 * Skills/Technologies data
 */
export const skills: Skill[] = [
  // Backend
  { name: "Java", category: "backend", level: "expert" },
  { name: "Spring Boot", category: "backend", level: "expert" },
  { name: "Node.js", category: "backend", level: "advanced" },
  { name: "C#", category: "backend", level: "advanced" },
  { name: ".NET", category: "backend", level: "advanced" },
  { name: "TypeScript", category: "backend", level: "advanced" },

  // Frontend
  { name: "React", category: "frontend", level: "advanced" },
  { name: "Next.js", category: "frontend", level: "advanced" },
  { name: "TailwindCSS", category: "frontend", level: "advanced" },
  { name: "Three.js", category: "frontend", level: "intermediate" },

  // Database
  { name: "PostgreSQL", category: "database", level: "expert" },
  { name: "MongoDB", category: "database", level: "advanced" },
  { name: "Redis", category: "database", level: "intermediate" },

  // DevOps
  { name: "Docker", category: "devops", level: "advanced" },
  { name: "Git", category: "devops", level: "expert" },
  { name: "Linux", category: "devops", level: "advanced" },
  { name: "CI/CD", category: "devops", level: "intermediate" },

  // Game Development
  { name: "Unity", category: "gamedev", level: "advanced" },
  { name: "Godot", category: "gamedev", level: "intermediate" },

  // Tools & Practices
  { name: "Clean Architecture", category: "tools", level: "expert" },
  { name: "SOLID", category: "tools", level: "expert" },
  { name: "TDD", category: "tools", level: "advanced" },
  { name: "Docker", category: "tools", level: "advanced" },
  { name: "AWS", category: "tools", level: "advanced" },
  { name: "Git", category: "tools", level: "advanced" },
  { name: "Linux", category: "tools", level: "advanced" },
  { name: "Microservices", category: "tools", level: "advanced" },
];

/**
 * Get skills by category
 */
export function getSkillsByCategory(category: SkillCategory): Skill[] {
  return skills.filter((s) => s.category === category);
}

/**
 * Skill category labels for display
 */
export const categoryLabels: Record<SkillCategory, string> = {
  backend: "Backend",
  frontend: "Frontend",
  database: "Database",
  devops: "DevOps",
  gamedev: "Game Dev",
  tools: "Practices",
};
