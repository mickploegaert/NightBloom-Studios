
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MagicalParticles from "./MagicalParticles";

const processSteps = [
  { num: "01", title: "PLAN" },
  { num: "02", title: "DESIGN" },
  { num: "03", title: "BUILD" },
  { num: "04", title: "DEPLOY" },
];

export default function HomeWebsites() {
  return (
    <section id="services" className="relative transition-colors duration-500 py-24 sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black/50 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 border-[2px] border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 backdrop-blur-sm overflow-hidden shadow-2xl relative"
        >
          {/* Subtle Magical 3D Particles behind the content */}
          <div className="absolute inset-0 z-0 opacity-40">
            <MagicalParticles />
          </div>

          {/* Left: Content */}
          <div className="p-10 sm:p-14 lg:p-16 flex flex-col justify-center border-b-[2px] lg:border-b-0 lg:border-r-[2px] border-black/20 dark:border-white/20 dark:bg-[#111111] bg-white z-10">
            <div className="flex items-center gap-3 mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-fuchsia-400">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="text-sm font-bold tracking-[0.2em] uppercase text-purple-600 dark:text-fuchsia-400 font-(family-name:--font-geist-mono)">
                WEBSITES
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-black dark:text-white tracking-tight leading-tight mb-2 font-(family-name:--font-cinzel) overflow-hidden py-1">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                Build Your
              </motion.span>
            </h2>
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold tracking-tight leading-tight mb-6 overflow-hidden py-1">
              <motion.span
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="block bg-linear-to-r from-purple-600 via-fuchsia-500 to-indigo-600 dark:from-purple-300 dark:via-fuchsia-300 dark:to-indigo-300 bg-clip-text text-transparent font-(family-name:--font-cinzel) italic"
              >
                Digital Presence
              </motion.span>
            </h2>

            <p className="text-black/70 dark:text-white/70 leading-relaxed text-sm sm:text-base mb-10 max-w-md font-light">
              High-performance websites engineered with precision. We combine striking design with clean, scalable code to deliver digital experiences that convert visitors into customers.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/websites"
                className="group/btn relative inline-flex items-center justify-center gap-2 rounded-none border border-black dark:border-white bg-transparent px-8 py-3 text-xs font-bold text-black dark:text-white tracking-widest uppercase overflow-hidden hover:border-purple-600 dark:hover:border-fuchsia-500 transition-all"
              >
                <span className="absolute top-0 left-[-20%] w-[140%] h-full -z-10 bg-purple-600 dark:bg-fuchsia-600 -translate-x-full skew-x-[-30deg] group-hover/btn:translate-x-0 transition-transform duration-500 ease-[0.19,1,0.22,1]"></span>
                <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">LEARN MORE &rarr;</span>
              </Link>
              <Link
                href="/#contact"
                className="group/btn relative inline-flex items-center justify-center gap-2 rounded-none border border-black dark:border-white bg-transparent px-8 py-3 text-xs font-bold text-black dark:text-white tracking-widest uppercase overflow-hidden hover:border-purple-600 dark:hover:border-fuchsia-500 transition-all"
              >
                <span className="absolute top-0 left-[-20%] w-[140%] h-full -z-10 bg-purple-600 dark:bg-fuchsia-600 -translate-x-full skew-x-[-30deg] group-hover/btn:translate-x-0 transition-transform duration-500 ease-[0.19,1,0.22,1]"></span>
                <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">CONTACT US</span>
              </Link>
            </div>
          </div>

          {/* Right: The Process */}
          <div className="p-10 sm:p-14 lg:p-16 flex flex-col justify-center dark:bg-black/80 bg-white/80 backdrop-blur-md relative z-10">
            <h3 className="text-xl sm:text-2xl font-bold text-black/50 dark:text-white/50 tracking-[0.2em] uppercase mb-10 relative z-10 font-(family-name:--font-geist-mono)">
              THE PROCESS
            </h3>
            <div className="flex flex-col gap-6 relative z-10">
              {processSteps.map((step, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 + (i * 0.1), ease: [0.22, 1, 0.36, 1] }}
                  key={i} 
                  className="flex items-center gap-6 group"
                >
                  <span className="flex items-center justify-center w-10 h-10 border border-black/20 dark:border-white/20 text-purple-600 dark:text-fuchsia-400 font-mono text-sm font-bold group-hover:bg-purple-600 dark:group-hover:bg-fuchsia-600 group-hover:text-white group-hover:border-purple-600 dark:group-hover:border-fuchsia-600 transition-all duration-300">
                    {step.num}
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-black dark:text-white tracking-wider font-(family-name:--font-geist-mono) uppercase group-hover:translate-x-2 group-hover:text-purple-600 dark:group-hover:text-fuchsia-400 transition-all duration-300">
                    {step.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
