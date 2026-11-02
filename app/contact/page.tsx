"use client";

import { Suspense, useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import Footer from "../components/Footer";
import { PROJECTS } from "../data/projects";
import { useLanguage } from "../components/LanguageProvider";
import { useCurrency } from "../components/CurrencyProvider";
import CurrencySwitch from "../components/CurrencySwitch";
import { formatRange } from "../i18n/currency";
import LineIcon, { type IconName } from "../components/LineIcon";
import PhoneModel from "../components/models/PhoneModel";

// Falls back to Cloudflare's public test key (always passes) if no env key is set,
// so the form keeps working out of the box in local development.
const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA";

// Seeded particles — same engine as Hero
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 24 }).map((_, i) => ({
        size: seededRandom(i * 7) * 4 + 2,
        left: seededRandom(i * 7 + 1) * 100,
        top: seededRandom(i * 7 + 2) * 100,
        duration: seededRandom(i * 7 + 3) * 8 + 6,
        delay: seededRandom(i * 7 + 4) * 5,
        opacity: seededRandom(i * 7 + 5) * 0.45 + 0.1,
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
            background: `radial-gradient(circle, rgba(11,70,253,${p.opacity}) 0%, rgba(11,70,253,${p.opacity * 0.5}) 50%, transparent 70%)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const KIND_IDS = ["website", "webshop", "app", "game"] as const;
const FEEL_IDS = ["calm", "professional", "motion", "threed"] as const;
const KIND_ICONS: IconName[] = ["monitor", "bag", "device", "game"];
const FEEL_ICONS: IconName[] = ["calm", "briefcase", "motion", "cube"];
const PACKAGE_IDS = ["essential", "advanced", "shop", "custom"] as const;
const STEP_ICONS: IconName[] = ["phone", "file", "flag"];
const BUDGETS = [
  { id: "lt", min: null, max: 1000 },
  { id: "mid", min: 1000, max: 2500 },
  { id: "high", min: 2500, max: 5000 },
  { id: "top", min: 5000, max: null },
] as const;

const FIELD_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.05 * i,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ease: [0.22, 1, 0.36, 1] as any,
    },
  }),
};

function ChoiceGrid({
  ids,
  labels,
  icons,
  values,
  onToggle,
  columns = "grid-cols-2",
}: {
  ids: readonly string[];
  labels: readonly string[];
  icons: readonly IconName[];
  values: string[];
  onToggle: (id: string) => void;
  columns?: string;
}) {
  return (
    <div className={`grid min-w-0 gap-2 ${columns}`}>
      {ids.map((id, index) => {
        const active = values.includes(id);
        return (
          <button
            key={id}
            type="button"
            onClick={() => onToggle(id)}
            className={`flex min-w-0 items-center gap-2 border px-2.5 py-2 text-left text-[13px] font-semibold leading-tight transition-colors duration-300 ${
              active
                ? "border-brand bg-brand text-white"
                : "border-black/15 text-black hover:border-brand dark:border-white/15 dark:text-white"
            }`}
          >
            <LineIcon name={icons[index]} className="h-4 w-4 shrink-0" />
            <span className="min-w-0">{labels[index]}</span>
          </button>
        );
      })}
    </div>
  );
}

function ContactPage() {
  const { copy } = useLanguage();
  const { currency } = useCurrency();
  const params = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [kinds, setKinds] = useState<string[]>([]);
  const [feels, setFeels] = useState<string[]>([]);
  const [pickedPackage, setPickedPackage] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const turnstileRef = useRef<TurnstileInstance | undefined>(undefined);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  useEffect(() => {
    const allowed = (value: string | null, ids: readonly string[]) =>
      (value ?? "").split(",").filter((id) => ids.includes(id));
    const nextKinds = allowed(params.get("kind"), KIND_IDS);
    const nextFeels = allowed(params.get("feel"), FEEL_IDS);
    const nextPackage = params.get("package");
    if (nextKinds.length) setKinds(nextKinds);
    if (nextFeels.length) setFeels(nextFeels);
    if (nextPackage && (PACKAGE_IDS as readonly string[]).includes(nextPackage)) {
      setPickedPackage(nextPackage);
      if (!nextKinds.length) setKinds([nextPackage === "shop" ? "webshop" : "website"]);
    }
  }, [params]);

  const toggle = (id: string, values: string[], setValues: (next: string[]) => void) =>
    setValues(values.includes(id) ? values.filter((item) => item !== id) : [...values, id]);

  const packageLabel =
    pickedPackage === "essential" ? copy.footer.essential
    : pickedPackage === "advanced" ? copy.footer.advanced
    : pickedPackage === "shop" ? copy.footer.shop
    : pickedPackage === "custom" ? copy.footer.custom
    : "";

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (selected && selected.size > MAX_FILE_SIZE) {
      setFileError(copy.contact.fileBig);
      setFile(null);
      e.target.value = "";
      return;
    }
    setFileError(null);
    setFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) return;
    setSending(true);
    setError(null);

    try {
      const body = new FormData();
      body.append("name", formData.name);
      body.append("email", formData.email);
      body.append("company", formData.company);
      body.append("message", formData.message);
      const budgetItem = BUDGETS.find((item) => item.id === budget);
      body.append("budget", budgetItem ? formatRange(budgetItem.min, budgetItem.max, currency) : "");
      kinds.forEach((id) => {
        const index = KIND_IDS.indexOf(id as (typeof KIND_IDS)[number]);
        if (index >= 0) body.append("kind", copy.contact.kinds[index]);
      });
      feels.forEach((id) => {
        const index = FEEL_IDS.indexOf(id as (typeof FEEL_IDS)[number]);
        if (index >= 0) body.append("feel", copy.contact.feels[index]);
      });
      if (packageLabel) body.append("package", packageLabel);
      body.append("turnstileToken", turnstileToken);
      if (file) body.append("file", file);

      const res = await fetch("/api/contact", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || copy.contact.fail);
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : copy.contact.fail);
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
    <main className="relative bg-white dark:bg-black overflow-hidden transition-colors duration-500">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand/10 blur-[100px]" />
      </div>

      <Particles />

      <div className="relative z-10 mx-auto max-w-[88rem] px-6 sm:px-10 lg:px-16 xl:px-24 pt-28 pb-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-brand font-[family-name:var(--font-geist-mono)] mb-3 block">
                {copy.contact.kicker}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold leading-[1.05] tracking-tight font-[family-name:var(--font-cinzel)] text-black dark:text-white">
                {copy.contact.title1}
                <br />
                <span className="bg-gradient-to-r from-brand via-brand to-brand-bright bg-clip-text text-transparent">
                  {copy.contact.title2}
                </span>
                <br />
                {copy.contact.title3}
              </h1>
              <p className="mt-4 text-sm text-black/60 dark:text-white/50 leading-relaxed max-w-md">
                {copy.contact.intro}
              </p>
            </motion.div>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap gap-x-6 gap-y-3"
            >
              {[
                {
                  icon: (
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  ),
                  icon2: <polyline points="22,6 12,13 2,6" />,
                  label: "info@mkstudios.nl",
                  href: "mailto:info@mkstudios.nl",
                },
                {
                  icon: (
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  ),
                  icon2: <circle cx="12" cy="10" r="3" />,
                  label: copy.contact.location,
                  href: null,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="flex items-center justify-center w-10 h-10 border border-black/10 dark:border-white/10 text-brand shrink-0">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {item.icon}
                      {item.icon2}
                    </svg>
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-sm text-black/60 dark:text-white/50 hover:text-brand transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-sm text-black/60 dark:text-white/50">
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="border-l-2 border-brand pl-4"
            >
              <p className="text-[11px] font-semibold tracking-[0.32em] text-brand uppercase">
                {copy.contact.liveKicker}
              </p>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {PROJECTS.map((project) => (
                  <li key={project.title}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-black/70 transition-colors duration-300 hover:text-brand dark:text-white/70"
                    >
                      {project.title}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

        <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[minmax(20rem,28rem)_minmax(0,1fr)]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 h-[30rem] w-full overflow-hidden sm:h-[34rem] lg:h-full"
          >
            <PhoneModel />
          </motion.div>

          {/* ── FORM CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-0 overflow-hidden group shadow-[0_24px_70px_-36px_rgba(7,20,51,0.28)]"
          >
            {/* Spinning conic-gradient border (same as pricing cards) */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
              <div className="absolute inset-[-100%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(11,70,253,0.9)_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(11,70,253,1)_100%)] opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="absolute inset-[1px] bg-white dark:bg-black transition-colors duration-500" />
            </div>
            <div className="absolute inset-0 z-0 border border-black/15 pointer-events-none dark:border-white/15" />

            <div className="relative z-10 p-6 sm:p-8 lg:p-10">

              <AnimatePresence mode="wait">
                {submitted ? (
                  /* ── SUCCESS STATE ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center gap-6 py-20 text-center"
                  >
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-black/20 dark:bg-brand/20 animate-ping" />
                      <div className="w-16 h-16 rounded-full border border-brand flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold font-[family-name:var(--font-cinzel)] text-black dark:text-white mb-3">{copy.contact.sent}</h2>
                      <p className="text-black/50 dark:text-white/40 max-w-xs">{copy.contact.sentBody}</p>
                    </div>
                    <div className="w-full max-w-lg text-left">
                      <p className="mb-4 text-center text-[10px] font-bold tracking-[0.25em] text-brand uppercase">{copy.contact.nextTitle}</p>
                      <ol className="grid gap-3 sm:grid-cols-3">
                        {copy.contact.nextSteps.map((step, index) => (
                          <li key={step.title} className="border border-black/10 p-4 dark:border-white/15">
                            <LineIcon name={STEP_ICONS[index]} className="mb-3 h-5 w-5 text-black dark:text-white" />
                            <p className="text-sm font-bold text-black dark:text-white">{step.title}</p>
                            <p className="mt-1 text-xs leading-relaxed text-black/55 dark:text-white/50">{step.body}</p>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <Link
                      href="/"
                      className="mt-4 group/btn relative inline-flex items-center gap-2 border border-black dark:border-white bg-transparent px-8 py-3 text-xs font-bold text-black dark:text-white tracking-widest uppercase overflow-hidden hover:border-brand transition-all"
                    >
                      <span className="absolute inset-0 -z-10 bg-brand [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]" />
                      <span className="group-hover/btn:text-white transition-colors duration-300 relative z-10">{copy.contact.home}</span>
                    </Link>
                  </motion.div>
                ) : (
                  /* ── FORM STATE ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <motion.div custom={0} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="mb-1">
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-brand font-[family-name:var(--font-geist-mono)] block mb-2">
                        {copy.contact.formKicker}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-cinzel)] text-black dark:text-white leading-tight">
                        {copy.contact.formTitle}
                      </h2>
                      <p className="mt-1 text-xs text-black/50 dark:text-white/40 leading-relaxed">
                        {copy.contact.formIntro}
                      </p>
                      {packageLabel && (
                        <p className="mt-4 inline-flex items-center gap-2 border border-brand/40 bg-brand/10 px-3 py-2 text-sm font-semibold text-black dark:text-white">
                          <LineIcon name="check" className="h-4 w-4 text-brand" />
                          {copy.contact.picked} {packageLabel}
                        </p>
                      )}
                    </motion.div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                      <motion.div custom={1} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">{copy.contact.name} <span className="text-brand">*</span></label>
                        <div className="relative group/input">
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={copy.contact.namePh}
                            className="w-full bg-transparent border border-black/15 dark:border-white/10 px-3 py-2 text-sm text-black dark:text-white placeholder-black/25 dark:placeholder-white/20 outline-none transition-all duration-300 focus:border-brand focus:shadow-[0_0_0_1px_rgba(11,70,253,0.3)] dark:focus:shadow-[0_0_0_1px_rgba(11,70,253,0.3)]"
                          />
                        </div>
                      </motion.div>

                      <motion.div custom={2} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">{copy.contact.email} <span className="text-brand">*</span></label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className="w-full bg-transparent border border-black/15 dark:border-white/10 px-3 py-2 text-sm text-black dark:text-white placeholder-black/25 dark:placeholder-white/20 outline-none transition-all duration-300 focus:border-brand focus:shadow-[0_0_0_1px_rgba(11,70,253,0.3)] dark:focus:shadow-[0_0_0_1px_rgba(11,70,253,0.3)]"
                        />
                      </motion.div>

                      <motion.div custom={3} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">
                          {copy.contact.company} <span className="text-black/25 dark:text-white/20 normal-case font-normal tracking-normal text-[10px]">{copy.contact.optional}</span>
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder={copy.contact.companyPh}
                          className="w-full bg-transparent border border-black/15 dark:border-white/10 px-3 py-2 text-sm text-black dark:text-white placeholder-black/25 dark:placeholder-white/20 outline-none transition-all duration-300 focus:border-brand focus:shadow-[0_0_0_1px_rgba(11,70,253,0.3)] dark:focus:shadow-[0_0_0_1px_rgba(11,70,253,0.3)]"
                        />
                      </motion.div>
                    </div>

                    <div className="grid min-w-0 gap-6 border-t border-black/10 pt-6 dark:border-white/10 lg:grid-cols-2">
                    <motion.div custom={4} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">
                        {copy.contact.kind} <span className="text-black/25 dark:text-white/20 normal-case font-normal tracking-normal text-[10px]">{copy.contact.kindHint}</span>
                      </label>
                      <ChoiceGrid ids={KIND_IDS} labels={copy.contact.kinds} icons={KIND_ICONS} values={kinds} onToggle={(id) => toggle(id, kinds, setKinds)} columns="grid-cols-2" />
                    </motion.div>

                    <motion.div custom={4.2} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">
                        {copy.contact.feel} <span className="text-black/25 dark:text-white/20 normal-case font-normal tracking-normal text-[10px]">{copy.contact.feelHint}</span>
                      </label>
                      <ChoiceGrid ids={FEEL_IDS} labels={copy.contact.feels} icons={FEEL_ICONS} values={feels} onToggle={(id) => toggle(id, feels, setFeels)} columns="grid-cols-2" />
                    </motion.div>
                    </div>

                    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                    {/* Budget pills */}
                    <motion.div custom={4.5} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-3">
                      <div className="flex items-center justify-between gap-3">
                        <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">
                          {copy.contact.budget} <span className="text-black/25 dark:text-white/20 normal-case font-normal tracking-normal text-[10px]">{copy.contact.optional}</span>
                        </label>
                        <CurrencySwitch />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {BUDGETS.map((item) => {
                          const active = budget === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setBudget(active ? null : item.id)}
                              className={`group/pill relative overflow-hidden border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                                active
                                  ? "border-brand text-white"
                                  : "border-black/15 dark:border-white/10 text-black/60 dark:text-white/50 hover:border-brand/50"
                              }`}
                            >
                              <span
                                className={`absolute inset-0 bg-brand transition-[clip-path] duration-500 ease-[0.19,1,0.22,1] ${
                                  active
                                    ? "[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)]"
                                    : "[clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover/pill:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)]"
                                }`}
                              />
                              <span className={`relative z-10 transition-colors duration-300 ${active ? "" : "group-hover/pill:text-white"}`}>
                                {formatRange(item.min, item.max, currency)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Message */}
                    <motion.div custom={5} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">
                        {copy.contact.message} <span className="text-brand">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={copy.contact.messagePh}
                        className="w-full bg-transparent border border-black/15 dark:border-white/10 px-3 py-2 text-sm text-black dark:text-white placeholder-black/25 dark:placeholder-white/20 outline-none resize-none transition-all duration-300 focus:border-brand focus:shadow-[0_0_0_1px_rgba(11,70,253,0.3)] dark:focus:shadow-[0_0_0_1px_rgba(11,70,253,0.3)]"
                      />
                    </motion.div>
                    </div>

                    {/* File upload */}
                    <motion.div custom={5.5} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">
                        {copy.contact.file} <span className="text-black/25 dark:text-white/20 normal-case font-normal tracking-normal text-[10px]">{copy.contact.fileHint}</span>
                      </label>
                      <label
                        htmlFor="file-upload"
                        className="w-full flex items-center gap-3 bg-transparent border border-dashed border-black/20 dark:border-white/15 px-4 py-3 text-sm cursor-pointer transition-all duration-300 hover:border-brand group/file"
                      >
                        <span className="flex items-center justify-center w-8 h-8 border border-black/10 dark:border-white/10 text-black/40 dark:text-white/40 group-hover/file:text-black dark:group-hover/file:text-brand group-hover/file:border-black dark:group-hover/file:border-brand transition-all shrink-0">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                          </svg>
                        </span>
                        <span className="text-black/50 dark:text-white/40 truncate">
                          {file ? file.name : copy.contact.fileEmpty}
                        </span>
                        <input
                          id="file-upload"
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      {fileError && (
                        <p className="text-xs text-red-500 dark:text-red-400">{fileError}</p>
                      )}
                    </motion.div>

                    <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    {/* Turnstile */}
                    <motion.div custom={6} variants={FIELD_VARIANTS} initial="hidden" animate="visible">
                      <Turnstile
                        ref={turnstileRef}
                        siteKey={TURNSTILE_SITE_KEY}
                        onSuccess={(token) => {
                          setError(null);
                          setTurnstileToken(token);
                        }}
                        onExpire={() => setTurnstileToken(null)}
                        onError={() => {
                          setTurnstileToken(null);
                          setError(copy.contact.verify);
                        }}
                        options={{
                          theme: "auto",
                          size: "normal",
                        }}
                      />
                    </motion.div>

                    {/* Error message */}
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 dark:text-red-400 -mt-2"
                      >
                        {error}
                      </motion.p>
                    )}

                    {/* Submit */}
                    <motion.div custom={7} variants={FIELD_VARIANTS} initial="hidden" animate="visible">
                      <button
                        type="submit"
                        disabled={!turnstileToken || sending}
                        className="group/btn isolate relative inline-flex w-full items-center justify-center gap-3 overflow-hidden border border-black bg-transparent px-8 py-4 text-sm font-bold tracking-widest text-black uppercase transition-all duration-300 hover:border-brand disabled:cursor-not-allowed disabled:opacity-40 lg:w-auto dark:border-white dark:text-white"
                      >
                        <span className="absolute inset-0 -z-10 bg-brand [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]" />
                        <span className="group-hover/btn:text-white transition-colors duration-300 relative z-10">
                          {sending ? copy.contact.sending : copy.contact.send}
                        </span>
                        {!sending && (
                          <span className="relative z-10 flex items-center group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all duration-300">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </span>
                        )}
                      </button>
                      <p className="mt-3 text-[10px] text-black/30 dark:text-white/25 text-center tracking-wide lg:text-right">
                        {copy.contact.privacy}
                      </p>
                    </motion.div>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* ── FAQ ── */}
        <div className="mt-28 sm:mt-36 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-10 justify-center"
          >
            <span className="w-10 h-px bg-brand"></span>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-brand font-[family-name:var(--font-geist-mono)]">
              FAQ
            </span>
            <span className="w-10 h-px bg-brand"></span>
          </motion.div>

          <div className="flex flex-col gap-3">
            {copy.contact.faq.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="border border-black/10 dark:border-white/10"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left"
                  >
                    <span className="text-sm sm:text-base font-bold text-black dark:text-white">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="shrink-0 flex items-center justify-center w-7 h-7 border border-black/15 dark:border-white/15 text-brand"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-black/60 dark:text-white/50 leading-relaxed">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-white dark:bg-black" />}>
      <ContactPage />
    </Suspense>
  );
}
