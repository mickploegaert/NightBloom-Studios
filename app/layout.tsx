import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./components/Providers";
import Navbar from "./components/Navbar";
import NoiseTexture from "./components/NoiseTexture";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const myMagicalFont = Playfair_Display({
  weight: ["400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-cinzel", /* keeping the CSS var name to save grep refactoring */
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nightbloom | Creative Digital Agency",
  description: "Where ideas bloom — Nightbloom designs and builds digital experiences that inspire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${myMagicalFont.variable} antialiased bg-white text-black dark:bg-[#111111] dark:text-white transition-colors duration-500`}
      >
        <NoiseTexture />
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}