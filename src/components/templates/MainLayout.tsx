"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { Header } from "@/components/organisms/Header";
import { Footer } from "@/components/organisms/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  smoothScroll?: boolean;
}

export function MainLayout({
  children,
  showHeader = true,
  showFooter = true,
  smoothScroll = true,
}: MainLayoutProps) {
  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    if (!smoothScroll) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [smoothScroll]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {showHeader && <Header />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
}
