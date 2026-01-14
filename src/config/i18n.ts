/**
 * Internationalization (i18n) configuration
 * Supports Portuguese (BR) and English
 */

export type Locale = "pt-BR" | "en";

export const defaultLocale: Locale = "pt-BR";

export const locales: Locale[] = ["pt-BR", "en"];

export const localeNames: Record<Locale, string> = {
  "pt-BR": "Português",
  "en": "English",
};

/**
 * Translation strings
 */
export const translations = {
  "pt-BR": {
    // Navigation
    nav: {
      about: "Sobre",
      projects: "Projetos",
      contact: "Contato",
    },
    
    // Hero
    hero: {
      greeting: "Olá, eu sou",
      role: "Desenvolvedor Fullstack",
      description: "Construindo sistemas escaláveis com arquitetura limpa e princípios SOLID. Apaixonado por Game Development.",
      cta: {
        primary: "Ver projetos",
        secondary: "Entrar em contato",
      },
      scroll: "Role para explorar",
    },
    
    // About
    about: {
      label: "Sobre mim",
      title: "Desenvolvedor apaixonado por",
      titleHighlight: "criar experiências",
      description1: "Sou {name}, um Desenvolvedor Fullstack com expertise em Java, Node.js e C#. Acredito que código limpo e arquitetura sólida são a base para produtos excepcionais.",
      description2: "Além do desenvolvimento web, sou apaixonado por Game Development, combinando criatividade com lógica para construir experiências interativas memoráveis. Sigo princípios SOLID e Clean Architecture em todos os projetos.",
      techStack: "Tech Stack",
      tools: "Ferramentas",
    },
    
    // Projects
    projects: {
      label: "Portfólio",
      title: "Projetos em",
      titleHighlight: "destaque",
      description: "Uma seleção dos meus trabalhos mais recentes, demonstrando habilidades em diferentes tecnologias e domínios.",
      viewAll: "Ver todos os projetos",
      comingSoon: "Projetos em breve...",
      featured: "Destaque",
      code: "Código",
      demo: "Demo",
    },
    
    // Contact
    contact: {
      label: "Contato",
      title: "Vamos construir algo",
      titleHighlight: "incrível",
      titleSuffix: "juntos?",
      description: "Estou sempre aberto a novas oportunidades e parcerias. Entre em contato e vamos conversar sobre seu próximo projeto.",
      email: "Email",
      location: "Localização",
      locationValue: "Brasil",
      availability: "Disponibilidade",
      availabilityValue: "Aberto a propostas",
      socials: "Redes sociais",
      formTitle: "Envie uma mensagem",
      form: {
        name: "Nome",
        namePlaceholder: "Seu nome",
        email: "Email",
        emailPlaceholder: "seu@email.com",
        message: "Mensagem",
        messagePlaceholder: "Sua mensagem...",
        submit: "Enviar mensagem",
        sending: "Enviando...",
        success: "Mensagem enviada com sucesso!",
        error: "Erro ao enviar. Tente novamente.",
      },
    },
    
    // Footer
    footer: {
      rights: "Todos os direitos reservados.",
      builtWith: "Feito com",
    },
  },
  
  "en": {
    // Navigation
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    
    // Hero
    hero: {
      greeting: "Hi, I'm",
      role: "Fullstack Developer",
      description: "Building scalable systems with clean architecture and SOLID principles. Passionate about Game Development.",
      cta: {
        primary: "View projects",
        secondary: "Get in touch",
      },
      scroll: "Scroll to explore",
    },
    
    // About
    about: {
      label: "About me",
      title: "A developer passionate about",
      titleHighlight: "creating experiences",
      description1: "I'm {name}, a Fullstack Developer with expertise in Java, Node.js and C#. I believe that clean code and solid architecture are the foundation for exceptional products.",
      description2: "Beyond web development, I'm passionate about Game Development, combining creativity with logic to build memorable interactive experiences. I follow SOLID principles and Clean Architecture in all projects.",
      techStack: "Tech Stack",
      tools: "Tools",
    },
    
    // Projects
    projects: {
      label: "Portfolio",
      title: "Featured",
      titleHighlight: "projects",
      description: "A selection of my most recent work, showcasing skills across different technologies and domains.",
      viewAll: "View all projects",
      comingSoon: "Projects coming soon...",
      featured: "Featured",
      code: "Code",
      demo: "Demo",
    },
    
    // Contact
    contact: {
      label: "Contact",
      title: "Let's build something",
      titleHighlight: "amazing",
      titleSuffix: "together?",
      description: "I'm always open to new opportunities and partnerships. Get in touch and let's talk about your next project.",
      email: "Email",
      location: "Location",
      locationValue: "Brazil",
      availability: "Availability",
      availabilityValue: "Open to opportunities",
      socials: "Social media",
      formTitle: "Send a message",
      form: {
        name: "Name",
        namePlaceholder: "Your name",
        email: "Email",
        emailPlaceholder: "your@email.com",
        message: "Message",
        messagePlaceholder: "Your message...",
        submit: "Send message",
        sending: "Sending...",
        success: "Message sent successfully!",
        error: "Error sending. Please try again.",
      },
    },
    
    // Footer
    footer: {
      rights: "All rights reserved.",
      builtWith: "Built with",
    },
  },
} as const;

export type Translations = {
  nav: {
    about: string;
    projects: string;
    contact: string;
  };
  hero: {
    greeting: string;
    role: string;
    description: string;
    cta: {
      primary: string;
      secondary: string;
    };
    scroll: string;
  };
  about: {
    label: string;
    title: string;
    titleHighlight: string;
    description1: string;
    description2: string;
    techStack: string;
    tools: string;
  };
  projects: {
    label: string;
    title: string;
    titleHighlight: string;
    description: string;
    viewAll: string;
    comingSoon: string;
    featured: string;
    code: string;
    demo: string;
  };
  contact: {
    label: string;
    title: string;
    titleHighlight: string;
    titleSuffix: string;
    description: string;
    email: string;
    location: string;
    locationValue: string;
    availability: string;
    availabilityValue: string;
    socials: string;
    formTitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
    };
  };
  footer: {
    rights: string;
    builtWith: string;
  };
};
