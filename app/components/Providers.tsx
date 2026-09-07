"use client";

import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "./LanguageProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}