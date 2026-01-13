/**
 * Site configuration and metadata
 */
export const siteConfig = {
  name: "Portfolio",
  title: "Fullstack Developer & Gamedev",
  description:
    "Fullstack Developer specializing in Java, Node.js, C# and Game Development. Building scalable systems with clean architecture and SOLID principles.",
  url: "https://your-domain.com",
  author: {
    name: "Renan Groh",
    email: "renangroh@email.com",
    github: "https://github.com/renangroh",
    linkedin: "https://linkedin.com/in/renangroh",
  },
  keywords: [
    "Fullstack Developer",
    "Java Developer",
    "Node.js",
    "C#",
    "Game Development",
    "Clean Architecture",
    "SOLID",
  ] as string[],
};

/**
 * Navigation links
 */
export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#stack", label: "Stack" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
] as const;

/**
 * Social links
 */
export const socialLinks = [
  {
    name: "GitHub",
    href: siteConfig.author.github,
    icon: "github",
  },
  {
    name: "LinkedIn",
    href: siteConfig.author.linkedin,
    icon: "linkedin",
  },
  {
    name: "Email",
    href: `mailto:${siteConfig.author.email}`,
    icon: "mail",
  },
] as const;
