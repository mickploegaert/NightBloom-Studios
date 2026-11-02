"use client";

import { ThemeProvider } from "next-themes";
import { CurrencyProvider } from "./CurrencyProvider";
import { LanguageProvider } from "./LanguageProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <LanguageProvider>
        <CurrencyProvider>{children}</CurrencyProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}