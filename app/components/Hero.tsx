"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

const springConfig = {
  damping: 20,
  mass: 0.5,
  stiffness: 120,
};

// Words that cycle in the typewriter
const ROTATING_WORDS = ["Experiences", "Websites", "Brands", "Solutions", "Dreams"];

// Looping Typewriter effect component
function LoopingTypewriter({ words, className = "" }: { words: string[]; className?: string }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayedText.length > 0) {
          setDisplayedText(displayedText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 80);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[3px] h-[0.9em] bg-brand ml-1 align-middle"
      />
    </span>
  );
}

// Parallax grid background
function GridBackground() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const backgroundXSync = useTransform(mouseX, [-1, 1], [25, -25]);
  const backgroundYSync = useTransform(mouseY, [-1, 1], [25, -25]);

  const backgroundX = useSpring(backgroundXSync, springConfig);
  const backgroundY = useSpring(backgroundYSync, springConfig);

  const updateMousePosition = useCallback(
    ({ clientX, clientY }: MouseEvent) => {
      const screenMiddleX = window.innerWidth / 2;
      const screenMiddleY = window.innerHeight / 2;

      const normalizedX = (clientX - screenMiddleX) / screenMiddleX;
      const normalizedY = (clientY - screenMiddleY) / screenMiddleY;

      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [updateMousePosition]);

  return (
    <>
      {/* Dark mode grid */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-[-5%] overflow-hidden hidden dark:block"
        style={{
          backgroundImage: `url(/future-grid.webp)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: useMotionTemplate`calc(50% + ${backgroundX}px) calc(50% + ${backgroundY}px)`,
        }}
      />
      {/* Light mode grid - inverted for visibility */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-[-5%] overflow-hidden dark:hidden invert opacity-30"
        style={{
          backgroundImage: `url(/future-grid.webp)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: useMotionTemplate`calc(50% + ${backgroundX}px) calc(50% + ${backgroundY}px)`,
        }}
      />
    </>
  );
}

export default function Hero() {
  const [playAnimation, setPlayAnimation] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setTimeout(() => setPlayAnimation(true), 100);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f5d0dc] dark:bg-[#1a1a1a] transition-colors duration-500"
    >
      {/* Grid Background with parallax */}
      <GridBackground />

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f5d0dc]/80 dark:to-[#1a1a1a]/60" />

      {/* Content — centered */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center text-center px-6 sm:px-10 lg:px-16">

        {/* Main Heading with looping typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={playAnimation ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-1 sm:space-y-2"
        >
          <h1 className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-black dark:text-white">
            Crafting Digital
          </h1>
          <h1 className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-bold leading-[1.1] tracking-tight min-h-[1.2em]">
            <LoopingTypewriter 
              words={ROTATING_WORDS}
              className="bg-gradient-to-r from-brand via-brand to-brand-bright bg-clip-text text-transparent"
            />
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={playAnimation ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 sm:mt-8 max-w-lg text-sm sm:text-base leading-relaxed text-black/50 dark:text-white/50 font-light"
        >
          We design and build websites that turn visitors into customers.
        </motion.p>

        {/* CTA Buttons with fill animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={playAnimation ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/contact"
            className="group/btn relative inline-flex items-center justify-center gap-2 border border-brand bg-transparent px-7 sm:px-8 py-3 sm:py-3.5 text-xs font-bold text-black dark:text-white tracking-widest uppercase overflow-hidden hover:border-brand-bright transition-all cursor-pointer"
          >
            <span className="absolute inset-0 -z-10 bg-brand [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]"></span>
            <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">{t("hero_cta_primary")}</span>
          </Link>
          <Link
            href="/work"
            className="group/btn relative inline-flex items-center justify-center gap-2 border border-black/25 dark:border-white/25 bg-transparent px-7 sm:px-8 py-3 sm:py-3.5 text-xs font-bold text-black dark:text-white tracking-widest uppercase overflow-hidden hover:border-brand transition-all cursor-pointer"
          >
            <span className="absolute inset-0 -z-10 bg-brand [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]"></span>
            <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">{t("hero_cta_secondary")}</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
