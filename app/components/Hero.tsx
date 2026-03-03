"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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

      {/* Solid overlay instead of gradients to prevent color banding (pixelated black) */}
      <div className="absolute inset-0 bg-white/40 dark:bg-black/60 transition-colors duration-500" />

      {/* Floating Particles */}
      <Particles />

      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_150px_20px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_0_200px_50px_rgba(0,0,0,0.8)] transition-all duration-500" />

      {/* Content */}
      <div className="relative z-10 flex w-full flex-col justify-center items-start px-6 md:px-10 lg:px-20 text-left mt-[15vh]">

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl font-bold leading-[1.1] tracking-tighter text-black dark:text-white sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl flex flex-col items-start -ml-2 sm:-ml-4 md:ml-0 transition-colors duration-500 overflow-visible"
        >
          <span className="opacity-95 drop-shadow-md pb-2">Where</span>
          <span className="opacity-95 drop-shadow-md ml-8 md:ml-20 pb-2">ideas</span>
          <span className="bg-linear-to-r from-purple-600 via-fuchsia-500 to-indigo-600 dark:from-purple-200 dark:via-fuchsia-300 dark:to-indigo-200 bg-clip-text text-transparent font-(family-name:--font-cinzel) font-normal italic tracking-wider drop-shadow-xl translate-x-12 md:translate-x-32 mt-2 md:mt-4 transition-all duration-500 leading-[1.3] py-1 overflow-visible">
            blossom.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 max-w-xl text-base leading-relaxed text-black/70 dark:text-white/60 sm:text-lg lg:text-xl font-light tracking-wide border-l border-purple-500/30 pl-5 ml-4 md:ml-12 backdrop-blur-sm transition-colors duration-500"
        >
          We design and build digital experiences that inspire, connect, and grow. From concept to launch.
        </motion.p>
      </div>

    </section>
  );
}
