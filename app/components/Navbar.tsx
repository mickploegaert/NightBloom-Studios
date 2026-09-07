"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  const navLinks = [
    { label: t("nav_home"), href: "/" },
    { label: t("nav_about"), href: "/about" },
    { label: t("nav_work"), href: "/work" },
    { label: t("nav_websites"), href: "/websites" },
    { label: t("nav_contact"), href: "/contact" },
  ];

  const toggleTheme = (e: React.MouseEvent) => {
    const x = (e as React.MouseEvent).clientX;
    const y = (e as React.MouseEvent).clientY;
    document.documentElement.style.setProperty("--vt-x", `${x}px`);
    document.documentElement.style.setProperty("--vt-y", `${y}px`);
    const newTheme = theme === "dark" ? "light" : "dark";
    const doc = document as any;
    if (!doc.startViewTransition) {
      setTheme(newTheme);
      return;
    }
    doc.startViewTransition(() => {
      // Synchronously flip the class so the transition captures the new state
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      setTheme(newTheme);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[600ms] flex justify-center ${
          scrolled
            ? "pt-0 md:pt-4"
            : "pt-4 md:pt-6"
        }`}
      >
        <div className={`mx-auto flex items-center justify-between transition-all duration-[600ms] ease-[0.22,1,0.36,1] relative overflow-hidden ${
          scrolled && !menuOpen
            ? "h-16 w-full max-w-5xl bg-white/20 dark:bg-[#111111]/30 backdrop-blur-xl border-b md:border border-black/5 dark:border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)] px-6" 
            : "h-20 w-full max-w-[100vw] px-6 sm:px-10 lg:px-16 xl:px-24 bg-transparent border-transparent"
        }`}>
          {/* Left: Toggles */}
          <motion.div
            className="flex items-center gap-3 z-50 group origin-left h-full"
            animate={{ opacity: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: menuOpen ? "none" : "auto" }}
          >
            {/* Theme Toggle */}
            <button 
              onClick={(e) => toggleTheme(e)}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className={`relative flex items-center justify-center w-10 h-10 border transition-all duration-300 ${
                scrolled
                  ? 'border-black/20 text-black/70 hover:text-black hover:bg-black/5 dark:border-white/20 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10 bg-transparent'
                  : 'border-black/20 bg-black/5 text-black/70 hover:text-black hover:bg-black/10 dark:border-white/20 dark:bg-white/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10'
              }`}
            >
              {!mounted ? (
                <div className="w-4 h-4" />
              ) : theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
            
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              aria-label={`Switch language to ${lang === "en" ? "Dutch" : "English"}`}
              className={`flex items-center justify-center h-10 px-4 border text-xs font-bold tracking-[0.2em] font-(family-name:--font-geist-mono) gap-2 transition-all duration-300 ${
              scrolled
                ? 'border-black/20 bg-transparent text-black/70 hover:text-black hover:bg-black/5 dark:border-white/20 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10'
                : 'border-black/20 bg-black/5 text-black/70 hover:text-black dark:border-white/20 dark:bg-white/5 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10'
            }`}>
              <span className={lang === "en" ? "text-black dark:text-white" : "opacity-40"}>EN</span>
              <span className="opacity-30">/</span>
              <span className={lang === "nl" ? "text-black dark:text-white" : "opacity-40"}>NL</span>
            </button>
          </motion.div>

          {/* Center: MK Studios Logo */}
          <motion.a
            href="/"
            aria-label="MK Studios — home"
            animate={{ opacity: menuOpen ? 0 : 1, y: menuOpen ? -20 : 0 }}
            transition={{ duration: 0.4 }}
            style={{ pointerEvents: menuOpen ? "none" : "auto" }}
            whileHover={{ scale: 1.06 }}
            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center items-center h-full m-0 transition-transform duration-300"
          >
            <Image
              src="/logos/MK.png"
              alt="MK Studios"
              width={220}
              height={125}
              priority
              className={`w-auto object-contain brightness-0 dark:brightness-100 transition-all duration-[600ms] ${scrolled ? "h-11 md:h-12" : "h-14 md:h-16"}`}
            />
          </motion.a>

          {/* Right: Animated Hamburger Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="group relative z-50 flex h-10 w-10 items-center justify-center border border-black/20 dark:border-white/20 hover:border-black dark:hover:border-pink-400 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-4 flex flex-col justify-between">
              {/* Top line */}
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="block h-[2px] w-full bg-black dark:bg-white origin-center group-hover:bg-black dark:group-hover:bg-pink-500 transition-colors duration-300"
              />
              {/* Middle line */}
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="block h-[2px] w-3/4 bg-black dark:bg-white origin-right group-hover:bg-black dark:group-hover:bg-pink-500 group-hover:w-full transition-all duration-300"
              />
              {/* Bottom line */}
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7, width: "100%" } : { rotate: 0, y: 0, width: "50%" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="block h-[2px] bg-black dark:bg-white origin-center group-hover:bg-black dark:group-hover:bg-pink-500 group-hover:w-full transition-all duration-300"
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Fullscreen Animated Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at right top)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at right top)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at right top)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white dark:bg-[#111111] overflow-hidden transition-colors duration-500"
          >
            {/* Background elements for magical feel */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 0.5 }} 
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute pointer-events-none inset-0 flex items-center justify-center"
            >
               <div className="w-[50vw] h-[50vw] rounded-full bg-black/5 dark:bg-pink-900/10 blur-[100px] animate-pulse"></div>
            </motion.div>

            <nav className="relative flex flex-col items-center gap-6 w-full max-w-4xl px-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.9 }}
                  transition={{
                    delay: 0.1 * i + 0.2,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex w-full justify-center"
                >
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group relative flex items-center justify-center py-2 text-4xl sm:text-5xl md:text-6xl font-medium tracking-wide text-black/50 dark:text-white/50 font-(family-name:--font-brand) w-full overflow-visible leading-tight"
                  >
                    <div className="relative flex items-center h-[1.4em] px-4 overflow-hidden">
                      {/* Default text - pushed up on hover */}
                      <span className="flex items-center py-1 transition-transform duration-[0.6s] ease-[0.19,1,0.22,1] group-hover:-translate-y-[150%]">
                        {link.label}
                      </span>
                      {/* Hover text - slides in from bottom */}
                      <span className="absolute left-4 flex items-center py-1 translate-y-[150%] text-black dark:text-white transition-transform duration-[0.6s] ease-[0.19,1,0.22,1] group-hover:translate-y-0">
                        {link.label}
                      </span>
                    </div>
                  </a>
                </motion.div>
              ))}

              <motion.a
                href="/contact"
                onClick={() => setMenuOpen(false)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-12 group relative inline-flex items-center gap-2 rounded-none border border-black dark:border-white bg-transparent px-10 py-4 text-sm font-bold text-black dark:text-white tracking-widest uppercase overflow-hidden hover:border-black dark:hover:border-pink-400 transition-all z-10"
              >
                <span className="absolute inset-0 -z-10 bg-black dark:bg-pink-500 [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]"></span>
                <span className="group-hover:text-white transition-colors duration-300 relative z-10">{t("nav_lets_talk")}</span>
                <span className="relative z-10 flex h-6 w-6 items-center justify-center text-black dark:text-white group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

