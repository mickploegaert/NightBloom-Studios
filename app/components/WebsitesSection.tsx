
"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function TiltCard({ children, delay = 0, index }: { children: React.ReactNode, delay?: number, index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["100%", "0%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["100%", "0%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate normalized position -0.5 to 0.5
    const xPct = (e.clientX - rect.left) / width - 0.5;
    const yPct = (e.clientY - rect.top) / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-1000 w-full h-full"
      style={{ perspective: "1000px" }}
    >
      {/* Spinning border wrapper */}
      <div className="relative group overflow-hidden">
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute inset-[-100%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_78%,rgba(8,52,199,0.55)_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_78%,rgba(11,70,253,0.85)_100%)] opacity-40 group-hover:opacity-90 transition-opacity duration-500" />
          <div className="absolute inset-[1px] bg-white dark:bg-black transition-colors duration-500" />
        </div>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative flex flex-col sm:flex-row gap-8 p-8 sm:p-12 rounded-none bg-transparent shadow-sm hover:shadow-2xl dark:shadow-none transition-shadow duration-500 overflow-visible h-full ml-auto mr-auto w-full"
      >
        <motion.div 
          className="absolute inset-0 pointer-events-none z-10 z-[1] mix-blend-overlay opacity-0 group-hover:opacity-30 dark:group-hover:opacity-20 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, white, transparent 40%)`
          }}
        />
        
        {/* Pink magical glow effect on hover */}
        <div className="absolute -inset-full z-0 bg-gradient-to-r from-transparent via-brand/10 dark:via-brand/10 to-transparent group-hover:animate-[glow-pulse_2s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl transform -rotate-45" />

        <div className="relative z-10 flex flex-col justify-between w-full h-full transform-style-preserve-3d" style={{ transform: "translateZ(30px)" }}>
          {children}
        </div>
      </motion.div>
      </div>
    </motion.div>
  );
}
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import MagicalParticles from "./MagicalParticles";
import { useLanguage } from "./LanguageProvider";
import type { TranslationKey } from "../i18n/translations";

const WebsitesHero3D = dynamic(() => import("./WebsitesHero3D"), { ssr: false });

const processSteps = [
  { 
    number: "01", 
    title: "Strategy",
    description: "We analyze your brand, audience, and goals. Define the sitemap, user flows, and technical requirements before a single pixel is designed.",
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10 text-brand group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    )
  },
  { 
    number: "02", 
    title: "Design",
    description: "High-fidelity mockups crafted in Figma with obsessive attention to typography, spacing, and interaction design. We iterate until it feels right.",
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10 text-brand group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    )
  },
  { 
    number: "03", 
    title: "Develop",
    description: "Built with Next.js, React, and modern tooling. Every component is engineered for performance, accessibility, and smooth 60fps animations.",
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10 text-brand group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    )
  },
  { 
    number: "04", 
    title: "Launch",
    description: "Deployed on edge infrastructure with SSL, CDN, and analytics. Ongoing support to keep your site fast, secure, and evolving.",
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10 text-brand group-hover:scale-110 transition-transform duration-500 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    )
  },
];

type PriceRow = {
  label: TranslationKey;
  essential: TranslationKey;
  advanced: TranslationKey;
  shop: TranslationKey;
  essentialOn: boolean;
  advancedOn: boolean;
  shopOn: boolean;
};

const PRICE_ROWS: PriceRow[] = [
  { label: "price_row_pages", essential: "price_essential_pages", advanced: "price_advanced_pages", shop: "price_shop_pages", essentialOn: true, advancedOn: true, shopOn: true },
  { label: "price_row_design", essential: "price_essential_design", advanced: "price_advanced_design", shop: "price_shop_design", essentialOn: true, advancedOn: true, shopOn: true },
  { label: "price_row_cms", essential: "price_no_cms", advanced: "price_yes_cms", shop: "price_yes_cms", essentialOn: false, advancedOn: true, shopOn: true },
  { label: "price_row_seo", essential: "price_essential_seo", advanced: "price_advanced_seo", shop: "price_shop_seo", essentialOn: true, advancedOn: true, shopOn: true },
  { label: "price_row_motion", essential: "price_essential_motion", advanced: "price_advanced_motion", shop: "price_shop_motion", essentialOn: true, advancedOn: true, shopOn: true },
  { label: "price_row_form", essential: "price_yes_form", advanced: "price_yes_form", shop: "price_yes_form", essentialOn: true, advancedOn: true, shopOn: true },
  { label: "price_row_revisions", essential: "price_essential_revisions", advanced: "price_advanced_revisions", shop: "price_shop_revisions", essentialOn: true, advancedOn: true, shopOn: true },
  { label: "price_row_support", essential: "price_essential_support", advanced: "price_advanced_support", shop: "price_shop_support", essentialOn: true, advancedOn: true, shopOn: true },
  { label: "price_row_shop", essential: "price_no_shop", advanced: "price_no_shop", shop: "price_yes_shop", essentialOn: false, advancedOn: false, shopOn: true },
  { label: "price_row_copy", essential: "price_no_copy", advanced: "price_no_copy", shop: "price_shop_copy", essentialOn: false, advancedOn: false, shopOn: false },
];

const otherProjects = [
  {
    title: "Your Brand Here",
    category: "Website",
    status: "Coming Soon",
  },
  {
    title: "Your Brand Here",
    category: "Web Application",
    status: "Coming Soon",
  },
  {
    title: "Your Brand Here",
    category: "E-Commerce",
    status: "Coming Soon",
  },
];

const testimonials = [
  {
    quote: "MK Studios turned our vague idea into a site that actually converts. Fast communication, sharp design, and they delivered ahead of schedule.",
    name: "Sanne de Vries",
    role: "Founder, Axelfest",
    avatar: "https://i.pravatar.cc/100?img=47",
  },
  {
    quote: "The attention to detail is unreal. Every animation, every pixel feels intentional. Our site finally matches the quality of our product.",
    name: "Tom Bakker",
    role: "CEO, StartupName",
    avatar: "https://i.pravatar.cc/100?img=12",
  },
  {
    quote: "Clear process from day one, no surprises on price, and the end result exceeded what we pitched internally. Would work with them again in a heartbeat.",
    name: "Lisa Jansen",
    role: "Marketing Lead, BrandCo",
    avatar: "https://i.pravatar.cc/100?img=33",
  },
];

const techStack = [
  { name: "Next.js" },
  { name: "React" },
  { name: "TypeScript" },
  { name: "Tailwind CSS" },
  { name: "Framer Motion" },
  { name: "Three.js" },
];

export default function WebsitesSection() {
  const { t } = useLanguage();
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 pb-32">
      
      {/* 1. HERO with Three.js Crystal */}
      <div className="relative flex items-center pt-28 pb-8">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <WebsitesHero3D />
        </div>
        {/* Gradient overlays ? seamlessly match page bg */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-white/90 via-white/40 to-transparent dark:from-black/90 dark:via-black/40 dark:to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 z-[1] bg-gradient-to-t from-white via-white/80 dark:from-black dark:via-black/80 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-32 z-[1] bg-gradient-to-b from-white dark:from-black to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-12 h-px bg-brand"></span>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-brand font-(family-name:--font-geist-mono)">{t("price_kicker")}</span>
          </motion.div>
          
          <div className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-black sm:text-6xl dark:text-white font-(family-name:--font-cinzel)">
            <div className="overflow-hidden py-1">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {t("price_title_1")}
              </motion.div>
            </div>
            <div className="overflow-hidden py-1">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="bg-gradient-to-r from-brand via-brand to-brand-bright bg-clip-text text-transparent italic"
              >
                {t("price_title_2")}
              </motion.div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-black/70 dark:text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed font-light border-l-2 border-brand/40 pl-6"
          >
            {t("price_intro")}
          </motion.div>
        </div>
      </div>

      <PricingBoard />

      {/* TECH STACK STRIP */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 py-10 mb-16 border-y border-black/10 dark:border-white/10"
      >
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-black/30 dark:text-white/30 font-(family-name:--font-geist-mono)">
          Built With
        </span>
        {techStack.map((tech) => (
          <span
            key={tech.name}
            className="text-sm font-bold tracking-wide text-black/40 dark:text-white/40 hover:text-brand transition-colors duration-300 cursor-default"
          >
            {tech.name}
          </span>
        ))}
      </motion.div>

      <hr className="border-t border-black/10 dark:border-white/10 w-full mb-24" />

      {/* 2. HOW WE WORK */}
      <div className="mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white uppercase tracking-tight flex items-center gap-4 font-(family-name:--font-cinzel) py-1">
            <span className="w-12 h-px bg-brand"></span>
            <div className="overflow-hidden">
               <motion.span 
                 initial={{ y: "100%" }} 
                 whileInView={{ y: 0 }} 
                 viewport={{ once: true, margin: "-100px" }} 
                 transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                 className="block"
               >
                 How We Work
               </motion.span>
            </div>
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-black/40 dark:text-white/40 text-sm font-light max-w-sm"
          >
            Four focused phases. No wasted time.
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {processSteps.map((step, index) => (
            <TiltCard key={step.number} index={index} delay={index * 0.1}>
              {/* Giant Faint Number in Background */}
              <div className="absolute -bottom-4 -right-4 text-[120px] font-bold text-black/[0.03] dark:text-white/[0.02] font-(family-name:--font-geist-mono) pointer-events-none select-none transition-transform duration-500 group-hover:scale-110 group-hover:-translate-x-4 group-hover:-translate-y-4" style={{ transform: "translateZ(0px)" }}>
                {step.number}
              </div>

              <div className="h-full flex flex-col justify-between z-10 w-full relative">
                {/* Icon */}
                <div className="shrink-0 text-brand drop-shadow-none dark:drop-shadow-[0_0_15px_rgba(11,70,253,0.3)] mb-8" style={{ transform: "translateZ(30px)" }}>
                  {step.icon}
                </div>

                <div>
                  <h3 className="text-sm font-bold tracking-[0.2em] text-brand mb-2 uppercase" style={{ transform: "translateZ(40px)" }}>
                    Phase {step.number}
                  </h3>
                  <h4 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 tracking-tight group-hover:text-brand transition-colors duration-300 font-(family-name:--font-cinzel)" style={{ transform: "translateZ(50px)" }}>
                    {step.title}
                  </h4>
                  <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed font-light max-w-sm" style={{ transform: "translateZ(20px)" }}>
                    {step.description}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>

      <hr className="border-t border-black/10 dark:border-white/10 w-full mb-24" />

      {/* 3. FEATURED PROJECT (AXELFEST) */}
      <div id="portfolio" className="mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white uppercase tracking-tight flex items-center gap-4 font-(family-name:--font-cinzel) py-1">
            <span className="w-12 h-px bg-brand"></span>
            <div className="overflow-hidden">
               <motion.span 
                 initial={{ y: "100%" }} 
                 whileInView={{ y: 0 }} 
                 viewport={{ once: true, margin: "-100px" }} 
                 transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                 className="block"
               >
                 Featured Project
               </motion.span>
            </div>
          </h2>
          <Link href="/projects" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand hover:text-brand-bright transition-colors">
            VIEW ALL PROJECTS
            <span className="transform transition-transform group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative block w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden border border-black/20 dark:border-white/10 bg-black"
        >
          {/* Background Image axelfestproject.jpg */}
          <div className="absolute inset-0 z-0">
             <Image 
                src="/axelfestproject.jpg" 
                alt="Axelfest Featured Project" 
                fill 
                className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
             />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

          <div className="absolute inset-0 z-20 p-8 sm:p-12 flex flex-col justify-end">
            <h4 className="text-4xl sm:text-5xl md:text-7xl font-black font-(family-name:--font-cinzel) text-white tracking-widest mb-2 overflow-hidden py-1 leading-[1.1]">
              <motion.span 
                 initial={{ y: "100%" }} 
                 whileInView={{ y: 0 }} 
                 viewport={{ once: true, margin: "-50px" }} 
                 transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                 className="block transform transition-transform duration-500 group-hover:-translate-y-2 drop-shadow-2xl"
               >
                 AXELFEST
               </motion.span>
            </h4>
            <p className="text-white/80 tracking-[0.2em] text-xs sm:text-sm font-mono uppercase transform transition-transform duration-500 group-hover:-translate-y-2 mb-8">
              Festival Website & Ticketing Experience
            </p>

            <a
              href="https://axelfest.nl"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit pointer-events-auto bg-transparent border border-white text-white font-bold uppercase tracking-widest px-8 py-3 flex items-center justify-center gap-3 text-xs overflow-hidden relative group/btn"
            >
              <span className="absolute inset-0 -z-10 bg-brand [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]"></span>
              <span className="relative z-10 transition-colors duration-300">VIEW PROJECT &rarr;</span>
            </a>
          </div>
        </motion.div>

        {/* More projects grid — placeholders until case studies are ready */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {otherProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative aspect-[4/3] overflow-hidden border border-dashed border-black/15 dark:border-white/15 flex flex-col items-center justify-center gap-3 hover:border-brand/50 transition-colors duration-500"
            >
              <div className="flex items-center justify-center w-12 h-12 border border-black/10 dark:border-white/10 text-black/20 dark:text-white/20 group-hover:text-brand group-hover:border-brand group-hover:border-brand transition-all duration-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/25 dark:text-white/25">
                {project.status}
              </span>
              <span className="text-sm font-bold text-black/40 dark:text-white/40">
                {project.category}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <hr className="border-t border-black/10 dark:border-white/10 w-full mb-24" />

      {/* TESTIMONIALS */}
      <div className="mb-32">
        <div className="flex items-center gap-4 mb-16 justify-center">
          <span className="w-12 h-px bg-brand"></span>
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-brand font-(family-name:--font-geist-mono)">
            What Clients Say
          </span>
          <span className="w-12 h-px bg-brand"></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col p-8 border border-black/10 dark:border-white/10 hover:border-brand/30 transition-colors duration-500"
            >
              <div className="flex gap-1 mb-5 text-brand">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-black/65 dark:text-white/60 leading-relaxed italic mb-6 flex-grow">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={t.avatar}
                  alt={t.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border border-black/10 dark:border-white/10"
                />
                <div>
                  <p className="text-sm font-bold text-black dark:text-white">{t.name}</p>
                  <p className="text-xs text-black/40 dark:text-white/40">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}

function PricingBoard() {
  const { t } = useLanguage();
  const columns = [
    {
      key: "essential" as const,
      name: "ESSENTIAL",
      price: "€800",
      time: t("price_time_essential"),
      description: t("price_desc_essential"),
      highlight: false,
      cta: t("price_inquire"),
    },
    {
      key: "advanced" as const,
      name: "ADVANCED",
      price: "€1.200",
      time: t("price_time_advanced"),
      description: t("price_desc_advanced"),
      highlight: true,
      cta: t("price_start"),
    },
    {
      key: "shop" as const,
      name: "E-COMMERCE",
      price: t("price_custom"),
      time: t("price_time_shop"),
      description: t("price_desc_shop"),
      highlight: false,
      cta: t("price_inquire"),
    },
  ];

  return (
    <div id="pricing" className="relative z-10 mb-24">
      <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
        {columns.map((col) => (
          <article
            key={col.key}
            className={`relative flex flex-col bg-white p-8 dark:bg-black ${
              col.highlight ? "" : "border border-black/10 dark:border-white/15"
            }`}
          >
            {col.highlight && (
              <>
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_80%,rgba(8,52,199,0.55)_100%)] opacity-80 dark:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_80%,rgba(11,70,253,0.9)_100%)]" />
                  <div className="absolute inset-px bg-white dark:bg-black" />
                </div>
                <div className="absolute -top-3 left-8 z-20">
                  <span className="bg-brand px-4 py-1 text-[10px] font-bold tracking-[0.15em] text-white uppercase">
                    {t("price_popular")}
                  </span>
                </div>
              </>
            )}

            <div className="relative z-10 flex h-full flex-col">
              <span className={`mb-6 font-(family-name:--font-geist-mono) text-[10px] font-bold tracking-[0.25em] uppercase ${col.highlight ? "text-brand" : "text-black/40 dark:text-white/40"}`}>
                {col.name}
              </span>
              <span className="text-xs font-medium tracking-widest text-black/40 uppercase dark:text-white/40">
                {t("price_from")}
              </span>
              <div className="mt-1 text-4xl font-bold tracking-tight text-black sm:text-5xl dark:text-white font-(family-name:--font-cinzel)">
                {col.price}
              </div>
              <p className="mt-2 text-xs font-bold tracking-widest text-black/40 uppercase dark:text-white/40">
                {col.time}
              </p>
              <p className="mt-4 min-h-16 text-sm leading-relaxed font-light text-black/55 dark:text-white/50">
                {col.description}
              </p>

              <ul className="mt-6 flex flex-col gap-2.5 border-t border-black/10 pt-6 dark:border-white/10">
                {PRICE_ROWS.map((row) => {
                  const on = col.key === "essential" ? row.essentialOn : col.key === "advanced" ? row.advancedOn : row.shopOn;
                  const value = t(col.key === "essential" ? row.essential : col.key === "advanced" ? row.advanced : row.shop);
                  return (
                    <li key={row.label} className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="text-black/45 dark:text-white/40">{t(row.label)}</span>
                      <span className={on ? "text-right text-black/80 dark:text-white/80" : "text-right text-black/35 line-through decoration-black/20 dark:text-white/30 dark:decoration-white/20"}>
                        {value}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <Link
                href="/contact"
                className={`group/btn relative mt-8 flex items-center justify-center overflow-hidden border px-8 py-4 text-xs font-bold tracking-widest uppercase ${
                  col.highlight
                    ? "border-brand text-brand"
                    : "border-black/20 text-black dark:border-white/20 dark:text-white"
                }`}
              >
                <span className="absolute inset-0 -z-10 bg-brand [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)]" />
                <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">{col.cta}</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-5 text-xs tracking-wide text-black/40 dark:text-white/40">{t("price_vat")}</p>
    </div>
  );
}
