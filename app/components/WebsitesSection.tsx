
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import MagicalParticles from "./MagicalParticles";

const WebsitesHero3D = dynamic(() => import("./WebsitesHero3D"), { ssr: false });

const processSteps = [
  { 
    number: "01", 
    title: "Strategy",
    description: "We analyze your brand, audience, and goals. Define the sitemap, user flows, and technical requirements before a single pixel is designed.",
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10 text-purple-600 dark:text-fuchsia-400 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    )
  },
  { 
    number: "02", 
    title: "Design",
    description: "High-fidelity mockups crafted in Figma with obsessive attention to typography, spacing, and interaction design. We iterate until it feels right.",
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10 text-purple-600 dark:text-fuchsia-400 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    )
  },
  { 
    number: "03", 
    title: "Develop",
    description: "Built with Next.js, React, and modern tooling. Every component is engineered for performance, accessibility, and smooth 60fps animations.",
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10 text-purple-600 dark:text-fuchsia-400 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    )
  },
  { 
    number: "04", 
    title: "Launch",
    description: "Deployed on edge infrastructure with SSL, CDN, and analytics. Ongoing support to keep your site fast, secure, and evolving.",
    icon: (
      <svg className="w-8 h-8 md:w-10 md:h-10 text-purple-600 dark:text-fuchsia-400 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
];

const pricingPackages = [
  {
    name: "ESSENTIAL",
    price: "€500",
    description: "Perfect for brands needing a robust and stunning online presence.",
    features: ["Custom UI Design", "Responsive Layout", "Basic SEO Setup", "Contact Form", "Standard Animations"],
  },
  {
    name: "ADVANCED",
    price: "€1200",
    description: "For established brands requiring advanced features and CMS.",
    features: ["Premium UI/UX", "CMS Integration", "Advanced SEO", "Complex Animations", "Speed Optimization"],
    highlight: true,
  },
  {
    name: "E-COMMERCE",
    price: "Custom",
    description: "Scalable online stores engineered for high conversion rates.",
    features: ["Shopify / Next.js", "Payment Gateways", "Inventory Management", "Custom Cart Flow", "Analytics"],
  },
];

export default function WebsitesSection() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-24 pb-32">
      
      {/* 1. HERO with Three.js Crystal */}
      <div className="pt-24 pb-20 relative min-h-[70vh] flex items-center">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <WebsitesHero3D />
        </div>
        {/* Gradient overlays ? seamlessly match page bg */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#f8f8f8]/90 via-[#f8f8f8]/40 to-transparent dark:from-[#111111]/90 dark:via-[#111111]/40 dark:to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-48 z-[1] bg-gradient-to-t from-[#f8f8f8] via-[#f8f8f8]/80 dark:from-[#111111] dark:via-[#111111]/80 to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-32 z-[1] bg-gradient-to-b from-[#f8f8f8] dark:from-[#111111] to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-12 h-px bg-purple-600 dark:bg-fuchsia-500"></span>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-purple-600 dark:text-fuchsia-400 font-(family-name:--font-geist-mono)">WEBSITES</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-[80px] leading-[1.15] font-bold text-black dark:text-white tracking-tight mb-8 font-(family-name:--font-cinzel) overflow-visible"
          >
            Online<br/>
            <span className="bg-linear-to-r from-purple-600 via-fuchsia-500 to-indigo-600 dark:from-purple-300 dark:via-fuchsia-300 dark:to-indigo-300 bg-clip-text text-transparent italic">Experiences</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-black/70 dark:text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed font-light border-l-2 border-purple-500/40 pl-6"
          >
            Custom websites engineered to perfection. From immersive landing pages to full web applications ? clean code, striking aesthetics, zero bloat.
          </motion.p>
        </div>
      </div>

      <hr className="border-t-[4px] border-black/30 dark:border-white/30 w-full mb-24" />

      {/* 2. HOW WE WORK */}
      <div className="mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white uppercase tracking-tight flex items-center gap-4 font-(family-name:--font-cinzel) overflow-visible py-1">
            <span className="w-12 h-px bg-purple-600 dark:bg-fuchsia-500"></span>
            How We Work
          </h2>
          <p className="text-black/40 dark:text-white/40 text-sm font-light max-w-sm">Four focused phases. No wasted time.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {processSteps.map((step, index) => (
            <motion.div 
              key={step.number} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group relative flex flex-col sm:flex-row gap-6 p-8 sm:p-10 border border-purple-100 dark:border-white/5 bg-gradient-to-br from-white to-purple-50/30 dark:from-white/[0.02] dark:to-fuchsia-900/[0.02] hover:shadow-[0_8px_30px_rgba(168,85,247,0.12)] dark:hover:shadow-[0_8px_30px_rgba(217,70,239,0.08)] transition-all duration-500 overflow-hidden"
            >
              {/* Pink/purple magical glow effect on hover */}
              <div className="absolute -inset-full z-0 bg-gradient-to-r from-transparent via-purple-400/10 dark:via-fuchsia-400/10 to-transparent group-hover:animate-[glow-pulse_2s_ease-in-out_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-3xl transform -rotate-45" />

              {/* Icon & Step Number */}
              <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-4 flex-shrink-0 z-10 w-full sm:w-16">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-100/50 dark:bg-fuchsia-900/20 text-purple-600 dark:text-fuchsia-400 shrink-0">
                  {step.icon}
                </div>
                <span className="text-4xl sm:text-5xl font-bold tracking-tighter text-purple-900/10 dark:text-white/10 font-(family-name:--font-cinzel) group-hover:text-purple-600/30 dark:group-hover:text-fuchsia-500/30 transition-colors duration-500 leading-none">
                  {step.number}
                </span>
              </div>

              <div className="flex flex-col justify-center z-10">
                <h3 className="text-xl font-bold text-black dark:text-white mb-3 tracking-tight group-hover:text-purple-600 dark:group-hover:text-fuchsia-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed font-light">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <hr className="border-t-[4px] border-black/30 dark:border-white/30 w-full mb-24" />

      {/* 3. FEATURED PROJECT (AXELFEST) */}
      <div id="portfolio" className="mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white uppercase tracking-tight flex items-center gap-4 font-(family-name:--font-cinzel) overflow-visible py-1">
            <span className="w-12 h-px bg-purple-600 dark:bg-fuchsia-500"></span>
            Featured Project
          </h2>
          <Link href="/projects" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-purple-600 dark:text-fuchsia-400 hover:text-purple-500 dark:hover:text-fuchsia-300 transition-colors">
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
            <h4 className="text-4xl sm:text-5xl md:text-7xl font-black font-(family-name:--font-cinzel) text-white tracking-widest mb-2 transform transition-transform duration-500 group-hover:-translate-y-2 drop-shadow-2xl overflow-visible py-1 leading-[1.1]">
              AXELFEST
            </h4>
            <p className="text-white/80 tracking-[0.2em] text-xs sm:text-sm font-mono uppercase transform transition-transform duration-500 group-hover:-translate-y-2 mb-8">
              Festival Website & Ticketing Experience
            </p>

            <a
              href="https://axelfest.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit pointer-events-auto bg-transparent border border-white text-white font-bold uppercase tracking-widest px-8 py-3 flex items-center justify-center gap-3 text-xs overflow-hidden relative group/btn"
            >
              <span className="absolute inset-0 -z-10 bg-purple-600 dark:bg-fuchsia-600 [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]"></span>
              <span className="relative z-10 transition-colors duration-300">VIEW PROJECT &rarr;</span>
            </a>
          </div>
        </motion.div>
      </div>

      <hr className="border-t-[4px] border-black/30 dark:border-white/30 w-full mb-24" />

      {/* 4. PRICING */}
      <div id="pricing" className="mb-20 relative">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white uppercase tracking-tight flex items-center gap-4 font-(family-name:--font-cinzel) overflow-visible py-1">
              <span className="w-12 h-px bg-purple-600 dark:bg-fuchsia-500"></span>
              Pricing
            </h2>
            <p className="mt-4 text-black/40 dark:text-white/40 text-sm font-light max-w-md ml-16">Transparent pricing. Every package includes revision rounds and post-launch support.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPackages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`relative flex flex-col p-8 sm:p-10 transition-all duration-500 group border ${
                pkg.highlight 
                  ? "border-purple-600 dark:border-fuchsia-500 bg-transparent" 
                  : "border-black/8 dark:border-white/8 bg-transparent"
              }`}
            >
              {/* Popular badge */}
              {pkg.highlight && (
                 <div className="absolute -top-3 left-8">
                   <span className="bg-purple-600 dark:bg-fuchsia-600 text-white text-[10px] font-bold px-4 py-1 tracking-[0.15em] uppercase">Popular</span>
                 </div>
              )}

              <span className={`text-[10px] font-bold tracking-[0.25em] uppercase font-(family-name:--font-geist-mono) mb-8 ${pkg.highlight ? "text-purple-600 dark:text-fuchsia-400" : "text-black/40 dark:text-white/40"}`}>
                {pkg.name}
              </span>

              <div className="text-4xl sm:text-5xl font-bold tracking-tight mb-2 font-(family-name:--font-cinzel) text-black dark:text-white">
                {pkg.price}
              </div>
              <p className="text-sm font-light leading-relaxed mb-10 text-black/45 dark:text-white/45">
                {pkg.description}
              </p>

              <div className="mb-10 grow">
                <ul className="flex flex-col gap-3">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm tracking-wide font-light text-black/55 dark:text-white/55">
                      <span className="text-purple-600 dark:text-fuchsia-400 text-xs">&#x2713;</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/#contact"
                className={`group/btn relative flex justify-center items-center gap-2 rounded-none border px-8 py-4 text-xs font-bold tracking-widest uppercase overflow-hidden transition-all w-full ${
                  pkg.highlight 
                    ? "border-purple-600 dark:border-fuchsia-500 text-purple-600 dark:text-fuchsia-400 hover:text-white dark:hover:text-white" 
                    : "border-black/20 dark:border-white/20 text-black dark:text-white hover:border-purple-600 dark:hover:border-fuchsia-500"
                }`}
              >
                <span className="absolute inset-0 -z-10 bg-purple-600 dark:bg-fuchsia-600 [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]"></span>
                <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">Get Started</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
