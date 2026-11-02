"use client";

import { motion } from "framer-motion";
import Footer from "../components/Footer";
import ProjectCards from "../components/ProjectCards";
import { useLanguage } from "../components/LanguageProvider";
import { PROJECTS } from "../data/projects";

export default function ProjectsPage() {
  const { copy } = useLanguage();

  return (
    <div className="bg-white dark:bg-black min-h-screen transition-colors duration-500">
      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-40 pb-32 sm:px-10 lg:px-16 xl:px-24">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-6xl leading-none font-black tracking-tighter text-black uppercase sm:text-7xl lg:text-[100px] dark:text-white"
        >
          {copy.footer.projects}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-20 max-w-2xl font-mono text-lg leading-relaxed text-black/70 sm:text-xl dark:text-white/70"
        >
          {copy.work.intro}
        </motion.p>

        <ProjectCards projects={PROJECTS} columns="2" />
      </main>

      <Footer />
    </div>
  );
}
