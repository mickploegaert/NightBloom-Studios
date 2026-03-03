
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
    title: "DISCOVERY & PLAN",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
    ),
    description: "We start with a deep dive into your brand. We outline the architecture, map user journeys, and define the core objective to ensure our digital spellcasting hits the mark." 
  },
  { 
    number: "02", 
    title: "DESIGN & PROTOTYPE",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"></circle><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"></circle><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"></circle><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"></circle><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"></path></svg>
    ),
    description: "Our artisans forge visual mockups with an emphasis on brutalist aesthetics and seamless user experience. We iterate together until the design resonates perfectly." 
  },
  { 
    number: "03", 
    title: "DEVELOP & ANIMATE",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
    ),
    description: "We transform the vision into reality using modern web technologies. Every animation is tuned, and every line of code is optimized for blazing fast performance." 
  },
  { 
    number: "04", 
    title: "LAUNCH & SCALE",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
    ),
    description: "We handle the deployment ritual, setting up CDN, SSL, and analytics. Your new realm goes live gracefully, ready to enchant your audience." 
  },
];

const pricingPackages = [
  {
    name: "ESSENTIAL",
    price: "Custom",
    description: "Perfect for brands needing a robust and stunning online presence.",
    features: ["Custom UI Design", "Responsive Layout", "Basic SEO Setup", "Contact Form", "Standard Animations"],
  },
  {
    name: "ADVANCED",
    price: "Custom",
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
        {/* Subtle gradient overlays for readability */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-white/80 via-white/40 to-transparent dark:from-[#050505]/90 dark:via-[#050505]/50 dark:to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 z-[1] bg-gradient-to-t from-[#f8f8f8] dark:from-[#050505] to-transparent pointer-events-none" />
        
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
            Custom websites engineered to perfection. From immersive landing pages to full web applications — clean code, striking aesthetics, zero bloat.
          </motion.p>
        </div>
      </div>

      <hr className="border-black/20 dark:border-white/10 w-full mb-24" />

      {/* 2. THE RITUAL (OUR PROCESS) - Alternate Magical Layout */}
      <div className="mb-32">
        <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white uppercase tracking-tight mb-16 flex items-center gap-4 font-(family-name:--font-cinzel) overflow-visible py-1">
          <span className="w-12 h-px bg-purple-600 dark:bg-fuchsia-500"></span>
          Our Process
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 relative">
          {/* Connecting magical line */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-purple-500/30 dark:via-fuchsia-500/30 to-transparent"></div>

          {processSteps.map((step, index) => (
            <motion.div 
              key={step.number} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col p-8 sm:p-10 border border-black/10 dark:border-white/10 bg-white/50 dark:bg-[#050505]/50 backdrop-blur-md overflow-hidden group ${index % 2 === 1 ? "md:mt-24" : ""}`}
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-purple-600/0 group-hover:from-purple-600/5 dark:group-hover:from-fuchsia-600/5 group-hover:to-transparent transition-all duration-700 pointer-events-none"></div>
              
              <div className="flex items-center gap-4 mb-6 z-10">
                <span className="flex items-center justify-center w-12 h-12 border border-purple-600/30 dark:border-fuchsia-500/30 text-purple-600 dark:text-fuchsia-400 bg-purple-600/5 dark:bg-fuchsia-500/10 font-bold group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </span>
                <span className="font-(family-name:--font-geist-mono) text-xs font-bold tracking-[0.2em] text-black/50 dark:text-white/50">STEP {step.number}</span>
              </div>

              <h3 className="text-2xl font-bold text-black dark:text-white uppercase mb-4 tracking-wide z-10 group-hover:text-purple-600 dark:group-hover:text-fuchsia-400 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed z-10 font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <hr className="border-black/20 dark:border-white/10 w-full mb-24" />

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
              <span className="absolute inset-0 -z-10 bg-purple-600 dark:bg-fuchsia-600 [clip-path:circle(0%_at_0%_0%)] group-hover/btn:[clip-path:circle(150%_at_0%_0%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]"></span>
              <span className="relative z-10 transition-colors duration-300">VIEW PROJECT &rarr;</span>
            </a>
          </div>
        </motion.div>
      </div>

      <hr className="border-black/20 dark:border-white/10 w-full mb-24" />

      {/* 4. PRICING */}
      <div id="pricing" className="mb-20 relative">
        <div className="absolute -left-32 top-32 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>
        
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white uppercase tracking-tight flex items-center gap-4 font-(family-name:--font-cinzel) overflow-visible py-1">
            <span className="w-12 h-px bg-purple-600 dark:bg-fuchsia-500"></span>
            Investment Plan
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPackages.map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`relative flex flex-col p-8 sm:p-10 border transition-all duration-500 group overflow-hidden ${
                pkg.highlight 
                  ? "border-purple-600 dark:border-fuchsia-500 bg-white/60 dark:bg-[#0a0a0a]/80 backdrop-blur-sm shadow-[0_0_30px_rgba(147,51,234,0.15)] dark:shadow-[0_0_30px_rgba(217,70,239,0.15)]" 
                  : "border-black/20 dark:border-white/10 bg-white/40 dark:bg-[#050505]/40 backdrop-blur-sm"
              }`}
            >
              {/* Most Chosen Tag */}
              {pkg.highlight && (
                 <div className="absolute top-0 right-0 bg-purple-600 dark:bg-fuchsia-600 text-white text-[10px] font-bold px-4 py-1.5 tracking-widest uppercase shadow-lg">
                   Most Chosen
                 </div>
              )}

              <h4 className="text-sm font-bold tracking-[0.2em] uppercase text-black dark:text-white mt-4 mb-2">
                {pkg.name}
              </h4>
              <div className="text-2xl sm:text-3xl font-light font-(family-name:--font-cinzel) text-black dark:text-white mb-4 overflow-visible py-1">
                {pkg.price}
              </div>
              <p className="text-black/60 dark:text-white/60 text-sm font-mono leading-relaxed mb-8 min-h-[3rem]">
                {pkg.description}
              </p>

              <div className="mb-10 grow">
                <ul className="flex flex-col gap-4">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-black/70 dark:text-white/70 tracking-wide font-light">
                      <span className="text-purple-600 dark:text-fuchsia-400 font-bold">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/#contact"
                className={`group/btn relative flex justify-center items-center gap-2 rounded-none border ${pkg.highlight ? "border-purple-600 dark:border-fuchsia-500" : "border-black dark:border-white"} bg-transparent px-8 py-4 text-xs font-bold text-black dark:text-white tracking-widest uppercase overflow-hidden transition-all w-full hover:border-purple-600 dark:hover:border-fuchsia-500`}
              >
                <span className="absolute inset-0 -z-10 bg-purple-600 dark:bg-fuchsia-600 [clip-path:circle(0%_at_0%_0%)] group-hover/btn:[clip-path:circle(150%_at_0%_0%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]"></span>
                <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">Learn More</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
