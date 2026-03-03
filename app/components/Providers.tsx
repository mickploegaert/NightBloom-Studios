"use client";

import { ThemeProvider } from "next-themes";
import LoadingScreen from "./LoadingScreen";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <LoadingScreen />
      {children}
    </ThemeProvider>
  );
}