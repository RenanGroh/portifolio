import { cn } from "@/lib/utils";
import { siteConfig, navLinks } from "@/config/site";
import { SocialLinks } from "@/components/molecules/SocialLinks";
import { Container, Divider } from "@/components/atoms/Layout";

export interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("py-12 bg-bg-secondary", className)}>
      <Container size="lg">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-text-primary">
              {siteConfig.name}
            </h3>
            <p className="text-sm text-text-secondary max-w-xs">
              {siteConfig.description}
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider">
              Navigation
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-text-muted uppercase tracking-wider">
              Connect
            </h4>
            <SocialLinks />
          </div>
        </div>

        <Divider className="mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-text-muted">
          <p>
            © {currentYear} {siteConfig.author.name}. All rights reserved.
          </p>
          <p>
            Built with{" "}
            <span className="text-text-secondary">Next.js</span>,{" "}
            <span className="text-text-secondary">Three.js</span>, and{" "}
            <span className="text-text-secondary">Framer Motion</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
