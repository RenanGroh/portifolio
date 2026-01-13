import { siteConfig } from "@/config";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section Placeholder */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6">
        <div className="text-center">
          <p className="mb-4 font-mono text-sm text-text-muted tracking-wider uppercase">
            Fullstack Developer & Gamedev
          </p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="text-gradient">{siteConfig.author.name}</span>
          </h1>
          <p className="max-w-xl mx-auto text-lg text-text-secondary leading-relaxed">
            {siteConfig.description}
          </p>
          
          {/* Placeholder for 3D Canvas - Phase 3 */}
          <div className="mt-12 glass rounded-2xl p-8 max-w-md mx-auto">
            <p className="text-text-muted text-sm">
              ✨ 3D Particle Scene will be rendered here
            </p>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-border flex justify-center pt-2">
            <div className="w-1 h-2 bg-text-muted rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* About Section Placeholder */}
      <section id="about" className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About</h2>
          <p className="text-text-secondary text-lg">
            Section content will be added in Phase 4.
          </p>
        </div>
      </section>

      {/* Stack Section Placeholder */}
      <section id="stack" className="min-h-screen flex items-center justify-center px-6 py-24 bg-bg-secondary">
        <div className="max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Tech Stack</h2>
          <p className="text-text-secondary text-lg">
            Interactive visualization will be added in Phase 3.
          </p>
        </div>
      </section>

      {/* Projects Section Placeholder */}
      <section id="projects" className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Projects</h2>
          <p className="text-text-secondary text-lg">
            Project cards will be added in Phase 4.
          </p>
        </div>
      </section>

      {/* Contact Section Placeholder */}
      <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-24 bg-bg-secondary">
        <div className="max-w-xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Contact</h2>
          <p className="text-text-secondary text-lg">
            Contact form will be added in Phase 4.
          </p>
        </div>
      </section>
    </main>
  );
}
