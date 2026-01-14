"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useI18n";
import { localeNames, type Locale } from "@/config/i18n";

interface LanguageSwitcherProps {
  className?: string;
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const { locale, setLocale } = useTranslation();

  const toggleLocale = () => {
    const newLocale: Locale = locale === "pt-BR" ? "en" : "pt-BR";
    setLocale(newLocale);
  };

  return (
    <motion.button
      onClick={toggleLocale}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full",
        "bg-bg-secondary border border-border-primary",
        "text-sm text-text-secondary hover:text-text-primary",
        "hover:border-accent-primary/50 transition-all duration-200",
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${locale === "pt-BR" ? "English" : "Português"}`}
    >
      <span className="text-xs font-mono uppercase">
        {locale === "pt-BR" ? "🇧🇷" : "🇺🇸"}
      </span>
      <span className="hidden sm:inline">{localeNames[locale]}</span>
    </motion.button>
  );
}
