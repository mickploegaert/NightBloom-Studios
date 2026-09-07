"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { translations, type Lang, type TranslationKey } from "../i18n/translations";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "mk-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === "en" || stored === "nl") {
      setLangState(stored);
    } else {
      // Best-effort auto-detect for Dutch visitors on first load.
      const browserLang = navigator.language?.toLowerCase() ?? "";
      if (browserLang.startsWith("nl")) setLangState("nl");
    }
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    window.localStorage.setItem(STORAGE_KEY, newLang);
  };

  const toggleLang = () => setLang(lang === "en" ? "nl" : "en");

  const t = (key: TranslationKey) => translations[key][lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
