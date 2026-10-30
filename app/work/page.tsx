"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";

const PROJECTS = [
  {
    title: "Axelfest",
    category: "Festival Website",
    description: "A vibrant festival website with ticketing integration and real-time updates. Built for high traffic during ticket sales.",
    image: "/axelfestproject.jpg",
    link: "https://axelfest.nl",
    featured: true,
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
  },
];

const UPCOMING_PROJECTS = [
  {
    title: "Your Brand Here",
    category: "Website",
  },
  {
    title: "Your Brand Here", 
    category: "Web Application",
  },
  {
    title: "Your Brand Here",
    category: "E-Commerce",
  },
];

const TESTIMONIALS = [
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
    quote: "Clear process from day one, no surprises on price, and the end result exceeded what we pitched internally.",
    name: "Lisa Jansen",
    role: "Marketing Lead, BrandCo",
    avatar: "https://i.pravatar.cc/100?img=33",
  },
];

export default function WorkPage() {
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
              OUR WORK
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white tracking-tight leading-[1.1] mb-8 max-w-3xl"
          >
            Projects that
            <br />
            <span className="text-black/40 dark:text-white/40">speak for themselves.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-black/50 dark:text-white/50 leading-relaxed max-w-xl"
          >
            A selection of websites we've designed and built. Each project is unique, crafted to meet specific business goals.
          </motion.p>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-12 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          {PROJECTS.filter(p => p.featured).map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative block w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden border border-black/10 dark:border-white/10 bg-black"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

              <div className="absolute inset-0 z-20 p-8 sm:p-12 flex flex-col justify-end">
                <span className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase mb-3">
                  {project.category}
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight mb-4">
                  {project.title.toUpperCase()}
                </h2>
                <p className="text-white/70 max-w-lg mb-6 text-sm sm:text-base">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs text-white/50 border border-white/20 px-3 py-1">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit border border-white text-white font-bold uppercase tracking-widest px-8 py-3 text-xs hover:bg-white hover:text-black transition-all duration-300"
                >
                  View Live Site &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* More Projects Grid */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 xl:px-24 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-black dark:text-white tracking-tight mb-12"
          >
            More coming soon
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {UPCOMING_PROJECTS.map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group aspect-[4/3] border border-dashed border-black/15 dark:border-white/15 flex flex-col items-center justify-center gap-3 hover:border-black/30 dark:hover:border-white/30 transition-colors duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 border border-black/10 dark:border-white/10 text-black/20 dark:text-white/20 group-hover:text-black/50 dark:group-hover:text-white/50 group-hover:border-black/30 dark:group-hover:border-white/30 transition-all duration-300">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-black/25 dark:text-white/25">
                  Coming Soon
                </span>
                <span className="text-sm font-bold text-black/40 dark:text-white/40">
                  {project.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 xl:px-24 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="w-12 h-px bg-black/30 dark:bg-white/30"></span>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-black/50 dark:text-white/50 font-(family-name:--font-geist-mono)">
              What Clients Say
            </span>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="flex flex-col p-8 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-colors duration-300"
              >
                <div className="flex gap-1 mb-5 text-black/30 dark:text-white/30">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed italic mb-6 flex-grow">
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

      {/* CTA */}
      <section className="py-24 px-6 sm:px-10 lg:px-16 xl:px-24 border-t border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight mb-6"
          >
            Want to be next?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-black/50 dark:text-white/50 mb-10 max-w-md mx-auto"
          >
            Let's create something great together. Start with a conversation.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              href="/contact"
              className="border border-brand bg-brand text-white px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-transparent hover:text-brand transition-all duration-300"
            >
              Start a Project
            </Link>
            <Link
              href="/websites"
              className="border border-black/20 dark:border-white/20 text-black dark:text-white px-10 py-4 text-sm font-bold tracking-widest uppercase hover:border-black dark:hover:border-white transition-all duration-300"
            >
              View Pricing
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
