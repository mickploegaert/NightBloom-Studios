"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import ProjectCards, { PackageMark } from "../components/ProjectCards";
import LineIcon, { type IconName } from "../components/LineIcon";
import { useLanguage } from "../components/LanguageProvider";
import { PROJECTS } from "../data/projects";

const FEATURED = PROJECTS[0];
const MORE_PROJECTS = PROJECTS.slice(1);

export default function WorkPage() {
  const { copy, lang } = useLanguage();
  const upcoming: { category: string; href: string; icon: IconName }[] = [
    { category: copy.work.website, href: "/contact?package=custom&kind=website&feel=threed", icon: "cube" },
    { category: copy.work.app, href: "/contact?package=custom&kind=app", icon: "device" },
    { category: copy.work.shop, href: "/contact?package=custom&kind=game", icon: "game" },
  ];
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
              {copy.work.kicker}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black dark:text-white tracking-tight leading-[1.1] mb-8 max-w-3xl"
          >
            {copy.work.title1}
            <br />
            <span className="text-black/40 dark:text-white/40">{copy.work.title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-black/50 dark:text-white/50 leading-relaxed max-w-xl"
          >
            {copy.work.intro}
          </motion.p>
        </div>
      </section>

      {/* Featured Project */}
      <section className="py-12 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
              key={FEATURED.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative block w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden border border-black/10 dark:border-white/10 bg-black"
            >
              <div className="absolute inset-0 z-0">
                <Image
                  src={FEATURED.image}
                  alt={FEATURED.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

              <div className="absolute inset-0 z-20 p-8 sm:p-12 flex flex-col justify-end">
                <div className="mb-4">
                  <PackageMark id={FEATURED.package} overlay />
                </div>
                <span className="text-white/50 text-xs font-bold tracking-[0.2em] uppercase mb-3">
                  {copy.work.category}
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tight mb-4">
                  {FEATURED.title.toUpperCase()}
                </h2>
                <p className="text-white/70 max-w-lg mb-6 text-sm sm:text-base">
                  {FEATURED.description[lang]}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {["Next.js", "Tailwind CSS", "Vercel"].map(t => (
                    <span key={t} className="text-xs text-white/50 border border-white/20 px-3 py-1">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={FEATURED.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex w-fit items-center overflow-hidden border border-white px-8 py-3 text-xs font-bold tracking-widest text-white uppercase"
                >
                  <span className="absolute inset-0 -z-10 bg-white [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)]" />
                  <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-black">{copy.work.live}</span>
                </a>
              </div>
            </motion.div>
          <div className="mt-6">
            <ProjectCards projects={MORE_PROJECTS} />
          </div>
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
            {copy.work.more}
          </motion.h2>
          <p className="mb-8 max-w-xl text-sm leading-relaxed text-black/55 dark:text-white/55">
            {copy.work.soonNote}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {upcoming.map((project, i) => (
              <motion.div
                key={project.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <Link
                  href={project.href}
                  className="group/btn isolate relative flex aspect-[4/3] flex-col items-center justify-center gap-3 overflow-hidden border border-black/20 bg-white transition-colors duration-300 dark:border-white/20 dark:bg-black"
                >
                  <span className="absolute inset-0 -z-10 bg-brand [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)]" />
                  <span className="relative z-10 flex h-12 w-12 items-center justify-center border border-black/20 text-black transition-colors duration-300 group-hover/btn:border-white group-hover/btn:text-white dark:border-white/25 dark:text-white">
                    <LineIcon name={project.icon} className="h-5 w-5" />
                  </span>
                  <span className="relative z-10">
                    <PackageMark id="custom" />
                  </span>
                  <span className="relative z-10 text-[10px] font-bold tracking-[0.2em] text-black/55 uppercase transition-colors duration-300 group-hover/btn:text-white dark:text-white/70">
                    {copy.work.soon}
                  </span>
                  <span className="relative z-10 text-sm font-bold tracking-tight text-black transition-colors duration-300 group-hover/btn:text-white dark:text-white">
                    {project.category}
                  </span>
                </Link>
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
            {copy.work.next}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-black/50 dark:text-white/50 mb-10 max-w-md mx-auto"
          >
            {copy.work.nextBody}
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
              className="group/btn isolate relative inline-flex items-center justify-center overflow-hidden border border-brand px-10 py-4 text-sm font-bold tracking-widest text-white uppercase"
            >
              <span className="absolute inset-0 -z-10 bg-brand [clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1] group-hover/btn:[clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)]" />
              <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-[#071433] dark:group-hover/btn:text-white">{copy.work.start}</span>
            </Link>
            <Link
              href="/websites"
              className="group/btn isolate relative inline-flex items-center justify-center overflow-hidden border border-black/25 bg-white px-10 py-4 text-sm font-bold tracking-widest text-black uppercase dark:border-white/25 dark:bg-black dark:text-white"
            >
              <span className="absolute inset-0 -z-10 bg-brand [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)]" />
              <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">{copy.work.pricing}</span>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
