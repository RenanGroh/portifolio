"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { 
  type Locale, 
  type Translations, 
  defaultLocale, 
  translations 
} from "@/config/i18n";

interface I18nState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

export const useI18n = create<I18nState>()(
  persist(
    (set) => ({
      locale: defaultLocale,
      t: translations[defaultLocale],
      setLocale: (locale: Locale) =>
        set({
          locale,
          t: translations[locale],
        }),
    }),
    {
      name: "portfolio-locale",
      partialize: (state) => ({ locale: state.locale }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.t = translations[state.locale];
        }
      },
    }
  )
);

/**
 * Hook to get translation function with interpolation support
 */
export function useTranslation() {
  const { locale, setLocale, t } = useI18n();

  const interpolate = (text: string, vars: Record<string, string>) => {
    return text.replace(/{(\w+)}/g, (_, key) => vars[key] || `{${key}}`);
  };

  return { locale, setLocale, t, interpolate };
}
