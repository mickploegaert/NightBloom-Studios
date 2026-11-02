"use client";

import Image from "next/image";
import { useLanguage } from "./LanguageProvider";
import { packageLabel, type PackageId, type Project } from "../data/projects";

export function PackageMark({ id, overlay = false }: { id: PackageId; overlay?: boolean }) {
  const { lang } = useLanguage();
  const label = packageLabel(id, lang);
  const tone =
    id === "advanced" && overlay
      ? "border-brand bg-brand text-white"
      : id === "custom"
        ? "border-brand bg-brand text-white"
        : id === "advanced"
          ? "border-brand text-brand"
          : overlay
            ? "border-white/50 bg-black/50 text-white"
            : "border-black/15 text-black/70 dark:border-white/25 dark:text-white/80";

  return (
    <span className={`inline-block border px-2.5 py-1 text-[10px] font-bold tracking-[0.22em] uppercase ${tone}`}>
      {label}
    </span>
  );
}

export default function ProjectCards({
  projects,
  columns = "3",
}: {
  projects: Project[];
  columns?: "2" | "3";
}) {
  const { lang, copy } = useLanguage();
  const grid = columns === "2" ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 gap-6 ${grid}`}>
      {projects.map((project) => (
        <a
          key={project.title}
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block overflow-hidden border border-black/10 bg-white dark:border-white/10 dark:bg-black"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-black">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`object-cover transition-transform duration-700 group-hover:scale-105 ${
                project.focus === "top" ? "object-top" : "object-center"
              }`}
            />
          </div>
          <div className="p-5 sm:p-6">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <PackageMark id={project.package} />
              <p className="text-[10px] font-bold tracking-[0.2em] text-black/45 uppercase dark:text-white/45">
                {project.category[lang]}
              </p>
            </div>
            <h3 className="text-xl font-bold tracking-tight text-black dark:text-white">{project.title}</h3>
            <p className="mt-2 line-clamp-2 text-sm text-black/60 dark:text-white/60">{project.description[lang]}</p>
            <span className="mt-4 inline-block text-[10px] font-bold tracking-[0.2em] text-brand uppercase">
              {copy.work.live}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
