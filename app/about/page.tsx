"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

const VALUES = [
  {
    title: "Craft",
    description: "Every pixel, every line of code is intentional. We obsess over the details so you don't have to.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
  },
  {
    title: "Speed",
    description: "Fast load times, rapid delivery. We build performant sites and stick to deadlines.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Clarity",
    description: "No jargon, no surprises. Clear communication and transparent pricing from day one.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const TECH_STACK = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Framer Motion",
  "Three.js",
  "Vercel",
  "Figma",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-black transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-12 h-px bg-black/30 dark:bg-white/30"></span>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-black/50 dark:text-white/50 font-(family-name:--font-geist-mono)">
              ABOUT US
            </span>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white tracking-tight leading-[1.1] mb-8"
              >
                We build websites
                <br />
                <span className="text-black/40 dark:text-white/40">that work.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-black/60 dark:text-white/60 leading-relaxed mb-6 max-w-xl"
              >
                MK Studios is a web design studio based in Zeeland, Netherlands. We specialize in creating high-performance websites that look great and convert visitors into customers.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-black/50 dark:text-white/50 leading-relaxed max-w-xl"
              >
                Founded with a simple mission: deliver exceptional digital experiences without the agency overhead. No bloated teams, no endless meetings — just focused work that gets results.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="aspect-[4/3] bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center">
                <Image
                  src="/logos/MK.png"
                  alt="MK Studios"
                  width={300}
                  height={170}
                  className="w-48 h-auto brightness-0 dark:brightness-100 opacity-20"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 xl:px-24 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight mb-16"
          >
            What we stand for
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group"
              >
                <div className="text-black/30 dark:text-white/30 mb-6 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-3 tracking-tight">
                  {value.title}
                </h3>
                <p className="text-black/50 dark:text-white/50 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 xl:px-24 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight">
              Our tools
            </h2>
            <p className="text-black/50 dark:text-white/50 max-w-md">
              We use modern, battle-tested technologies to build fast, scalable, and maintainable websites.
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-4">
            {TECH_STACK.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="px-6 py-3 border border-black/10 dark:border-white/10 text-sm font-bold tracking-wide text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-all duration-300"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 xl:px-24 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight mb-6"
          >
            Ready to start?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-black/50 dark:text-white/50 mb-10 max-w-md mx-auto"
          >
            Let's talk about your project and see how we can help bring your vision to life.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="group/btn relative inline-flex items-center justify-center gap-2 border border-black dark:border-white bg-transparent px-10 py-4 text-sm font-bold text-black dark:text-white tracking-widest uppercase overflow-hidden hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
