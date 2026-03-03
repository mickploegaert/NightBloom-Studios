"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Magnetic from "./Magnetic";

// Seeded pseudo-random for deterministic particle placement
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

// Floating particles that create a "bloom" / firefly effect
function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => ({
        size: seededRandom(i * 6) * 4 + 2,
        left: seededRandom(i * 6 + 1) * 100,
        top: seededRandom(i * 6 + 2) * 100,
        duration: seededRandom(i * 6 + 3) * 8 + 6,
        delay: seededRandom(i * 6 + 4) * 5,
        opacity: seededRandom(i * 6 + 5) * 0.5 + 0.1,
      })),
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: `radial-gradient(circle, rgba(168,85,247,${p.opacity}) 0%, rgba(217,70,239,${p.opacity * 0.5}) 50%, transparent 70%)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [playAnimation, setPlayAnimation] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  useEffect(() => {
    // Check if loading screen runs (only on very first load of session)
    const hasLoaded = sessionStorage.getItem("hasLoadedNightbloom");
    if (!hasLoaded) {
      // It's the very first load, LoadingScreen will set this to true, but we know it's currently running.
      setIsInitialLoad(true);
      // Wait for LoadingScreen to finish (approx ~3.5s)
      setTimeout(() => setPlayAnimation(true), 3200);
    } else {
      setPlayAnimation(true);
    }
  }, []);

  // Subtle parallax on mouse move (like UNESCO museum immersive feel)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20;
      const y = (clientY / innerHeight - 0.5) * 20;

      const bg = container.querySelector(".hero-bg") as HTMLElement;
      if (bg) {
        bg.style.transform = `translate(${-x}px, ${-y}px) scale(1.1)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-500"
    >
      {/* Background Video */}
      <div className="hero-bg absolute -inset-5 transition-transform duration-1500 ease-out">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-80 dark:opacity-100 transition-opacity duration-500"
        >
          <source src="/herovideo.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient overlay — fades from left so text is readable, right side shows video */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-white/10 dark:from-black/80 dark:via-black/50 dark:to-black/10 transition-colors duration-500" />

      {/* Floating Particles */}
      <Particles />

      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_20px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_0_200px_50px_rgba(0,0,0,0.8)] transition-all duration-500" />

      {/* Content — left-aligned so video bloom stays visible */}
      <div className="relative z-10 flex w-full flex-col justify-end items-start px-6 sm:px-10 lg:px-20 pb-24 pt-[30vh] sm:pt-[35vh]">

        {/* Small label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={playAnimation ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="w-10 h-px bg-purple-600 dark:bg-fuchsia-500"></span>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-purple-600 dark:text-fuchsia-400 font-(family-name:--font-geist-mono)">NIGHTBLOOM STUDIOS</span>
        </motion.div>

        {/* Main Heading — large left-aligned */}
        <motion.h1
          className="text-[clamp(3rem,8vw,8rem)] font-bold leading-[0.95] md:leading-[0.92] tracking-tighter text-black dark:text-white transition-colors duration-500 overflow-hidden flex flex-col"
          initial="hidden"
          animate={playAnimation ? "visible" : "hidden"}
          variants={{
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
          }}
        >
          <div className="overflow-hidden py-1">
            <motion.span 
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="block"
            >
              Where ideas
            </motion.span>
          </div>
          <div className="overflow-hidden py-2">
            <motion.span 
              variants={{
                hidden: { y: "100%" },
                visible: { y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } }
              }}
              className="block bg-linear-to-r from-purple-600 via-fuchsia-500 to-indigo-600 dark:from-purple-300 dark:via-fuchsia-300 dark:to-indigo-200 bg-clip-text text-transparent font-(family-name:--font-cinzel) italic font-normal tracking-tight"
            >
              blossom.
            </motion.span>
          </div>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={playAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 md:mt-8 max-w-md text-sm md:text-base leading-relaxed text-black/60 dark:text-white/50 font-light tracking-wide transition-colors duration-500"
        >
          We design and build digital experiences that inspire, connect, and grow.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={playAnimation ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-8 flex flex-wrap gap-4"
        >
          <Magnetic>
            <Link
              href="/#contact"
              className="group/btn relative inline-flex items-center justify-center gap-2 border border-black dark:border-white bg-transparent px-8 py-3 text-xs font-bold text-black dark:text-white tracking-widest uppercase overflow-hidden hover:border-purple-600 dark:hover:border-fuchsia-500 transition-all cursor-pointer"
            >
              <span className="absolute inset-0 -z-10 bg-purple-600 dark:bg-fuchsia-600 [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]"></span>
              <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">Get Started</span>
            </Link>
          </Magnetic>
          <Magnetic>
            <Link
              href="/websites"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 text-xs font-bold text-black/50 dark:text-white/50 tracking-widest uppercase hover:text-black dark:hover:text-white transition-colors cursor-pointer"
            >
              Our Work &rarr;
            </Link>
          </Magnetic>
        </motion.div>
      </div>

    </section>
  );
}
