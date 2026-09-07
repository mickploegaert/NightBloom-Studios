import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Space_Grotesk } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Providers } from "./components/Providers";
import Navbar from "./components/Navbar";
import NoiseTexture from "./components/NoiseTexture";
import LoadingScreen from "./components/LoadingScreen";
import PageTransition from "./components/PageTransition";

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

// Sleek, professional brand typeface — used for the MK Studios wordmark
const brandFont = Space_Grotesk({
  weight: ["500", "600", "700"],
  variable: "--font-brand",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mkstudios.nl"),
  title: {
    default: "MK Studios | Creative Digital Agency",
    template: "%s | MK Studios",
  },
  description: "MK Studios designs and builds digital experiences that inspire.",
  keywords: ["MK Studios", "web design", "web development", "Next.js", "digital agency", "Zeeland"],
  authors: [{ name: "MK Studios" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MK Studios | Creative Digital Agency",
    description: "MK Studios designs and builds digital experiences that inspire.",
    url: "https://mkstudios.nl",
    siteName: "MK Studios",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MK Studios | Creative Digital Agency",
    description: "MK Studios designs and builds digital experiences that inspire.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${myMagicalFont.variable} ${brandFont.variable} antialiased bg-white text-black dark:bg-[#111111] dark:text-white transition-colors duration-500`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <NoiseTexture />
        <Providers>
          <LoadingScreen />
          <Navbar />
          <div id="main-content">
            <PageTransition>{children}</PageTransition>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}