"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Link from "next/link";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";
import Footer from "../components/Footer";

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
            background: `radial-gradient(circle, rgba(236,72,153,${p.opacity}) 0%, rgba(244,114,182,${p.opacity * 0.5}) 50%, transparent 70%)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const PROJECT_TYPES = ["Website", "Webshop", "Landing Page", "Web App", "Rebranding"];
const BUDGET_RANGES = ["< €1.000", "€1.000 – €2.500", "€2.500 – €5.000", "€5.000+"];

const FAQ_ITEMS = [
  {
    q: "How long does a typical project take?",
    a: "Most single-page or Essential websites launch within 1–2 weeks. Advanced sites with CMS or custom functionality typically take 3–5 weeks. E-commerce builds vary based on scope — we'll give you a clear timeline after the intake call.",
  },
  {
    q: "What do you need from me to get started?",
    a: "Just your goals, brand assets (logo, colors, fonts if you have them), and any content or copy you already have. If you don't have branding yet, we can help design that too.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes — every package includes post-launch support and revision rounds. We also offer ongoing maintenance plans for updates, hosting, and monitoring.",
  },
  {
    q: "Can I request changes during the design phase?",
    a: "Absolutely. Our process includes dedicated revision rounds so the design matches your vision before development starts.",
  },
  {
    q: "What's included in the price?",
    a: "Design, development, responsive layout, basic SEO setup, and deployment. Anything beyond the selected package (e.g. copywriting, custom integrations) is quoted separately and agreed upfront — no surprise costs.",
  },
];

const TESTIMONIAL = {
  quote:
    "MK Studios turned our vague idea into a site that actually converts. Fast communication, sharp design, and they delivered ahead of schedule.",
  name: "Sanne de Vries",
  role: "Founder, Axelfest",
  avatar: "https://i.pravatar.cc/100?img=47",
};

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const toggleType = (t: string) =>
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (selected && selected.size > MAX_FILE_SIZE) {
      setFileError("File is too large (max 10MB).");
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
      body.append("budget", budget ?? "");
      selectedTypes.forEach((t) => body.append("projectTypes", t));
      body.append("turnstileToken", turnstileToken);
      if (file) body.append("file", file);

      const res = await fetch("/api/contact", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
    <main className="relative bg-white dark:bg-[#111111] overflow-hidden transition-colors duration-500">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-black/10 dark:bg-pink-900/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-pink-400/10 dark:bg-pink-900/10 blur-[100px]" />
      </div>

      <Particles />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24 pt-36 sm:pt-44 lg:pt-48 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-10">

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-black dark:text-pink-400 font-[family-name:var(--font-geist-mono)] mb-3 block">
                Web Studio
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight font-[family-name:var(--font-cinzel)] text-black dark:text-white">
                Let&apos;s Create
                <br />
                <span className="bg-gradient-to-r from-black via-pink-400 to-violet-600 bg-clip-text text-transparent">
                  Something
                </span>
                <br />
                Magical.
              </h1>
              <p className="mt-4 text-sm text-black/60 dark:text-white/50 leading-relaxed max-w-md">
                Tell us about your project. We&apos;ll get back to you within
                24 hours — no fluff, just a real conversation about how we can
                bring your vision to life.
              </p>
            </motion.div>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-4"
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
                  label: "Zeeland, Netherlands",
                  href: null,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="flex items-center justify-center w-10 h-10 border border-black/10 dark:border-white/10 text-black dark:text-pink-400 shrink-0">
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
                      className="text-sm text-black/60 dark:text-white/50 hover:text-black dark:hover:text-pink-400 transition-colors duration-300"
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

            {/* Testimonial / social proof */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative border-l-2 border-black/30 dark:border-pink-400/30 pl-6 py-1"
            >
              <div className="flex gap-1 mb-3 text-black dark:text-pink-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm sm:text-base text-black/70 dark:text-white/60 italic leading-relaxed">
                &ldquo;{TESTIMONIAL.quote}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={TESTIMONIAL.avatar}
                  alt={TESTIMONIAL.name}
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full object-cover border border-black/10 dark:border-white/10"
                />
                <p className="text-xs font-bold tracking-[0.1em] uppercase text-black/50 dark:text-white/40">
                  {TESTIMONIAL.name} <span className="font-normal normal-case text-black/30 dark:text-white/25">— {TESTIMONIAL.role}</span>
                </p>
              </div>
            </motion.div>

            {/* 3D model placeholder — gets replaced tomorrow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative pt-2"
            >
              {/* Random glowing lines */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {[
                  { top: "20%", left: "0%", w: "55%", rotate: "-6deg", delay: "0s", dur: "3.2s" },
                  { top: "50%", left: "10%", w: "40%", rotate: "2deg",  delay: "0.8s", dur: "4.1s" },
                  { top: "75%", left: "5%",  w: "65%", rotate: "-3deg", delay: "0.3s", dur: "2.8s" },
                  { top: "38%", left: "20%", w: "30%", rotate: "8deg",  delay: "1.2s", dur: "3.7s" },
                ].map((l, i) => (
                  <div
                    key={i}
                    className="absolute h-px"
                    style={{
                      top: l.top, left: l.left, width: l.w,
                      transform: `rotate(${l.rotate})`,
                      background: "linear-gradient(90deg,transparent,rgba(168,85,247,0.55),transparent)",
                      animation: `glow-pulse ${l.dur} ease-in-out ${l.delay} infinite`,
                    }}
                  />
                ))}
              </div>
              <div className="relative flex items-center gap-5">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/30 dark:via-pink-400/30 to-transparent" />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/30 dark:text-white/25 font-[family-name:var(--font-geist-mono)] whitespace-nowrap">
                  MK Studios · Est. 2026
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/30 dark:via-pink-400/30 to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — FORM CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative group"
          >
            {/* Spinning conic-gradient border (same as pricing cards) */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
              <div className="absolute inset-[-100%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(168,85,247,0.9)_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_75%,rgba(217,70,239,1)_100%)] opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
              <div className="absolute inset-[1px] bg-white dark:bg-[#111111] transition-colors duration-500" />
            </div>
            <div className="absolute inset-0 border border-black/10 dark:border-white/10 z-0 pointer-events-none mix-blend-overlay" />

            <div className="relative z-10 p-6 sm:p-8">

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
                      <div className="absolute inset-0 rounded-full bg-black/20 dark:bg-pink-500/20 animate-ping" />
                      <div className="w-16 h-16 rounded-full border border-black dark:border-pink-400 flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black dark:text-pink-400">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold font-[family-name:var(--font-cinzel)] text-black dark:text-white mb-3">Message Sent!</h2>
                      <p className="text-black/50 dark:text-white/40 max-w-xs">We&apos;ll be in touch within 24 hours. Something magical is about to begin.</p>
                    </div>
                    <Link
                      href="/"
                      className="mt-4 group/btn relative inline-flex items-center gap-2 border border-black dark:border-white bg-transparent px-8 py-3 text-xs font-bold text-black dark:text-white tracking-widest uppercase overflow-hidden hover:border-black dark:hover:border-pink-500 transition-all"
                    >
                      <span className="absolute inset-0 -z-10 bg-black dark:bg-pink-500 [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]" />
                      <span className="group-hover/btn:text-white transition-colors duration-300 relative z-10">Back to Home</span>
                    </Link>
                  </motion.div>
                ) : (
                  /* ── FORM STATE ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4"
                  >
                    <motion.div custom={0} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="mb-1">
                      <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black dark:text-pink-400 font-[family-name:var(--font-geist-mono)] block mb-2">
                        Contact
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-cinzel)] text-black dark:text-white leading-tight">
                        Start a Project
                      </h2>
                      <p className="mt-1 text-xs text-black/50 dark:text-white/40 leading-relaxed">
                        Fill in the form and we&apos;ll get back to you within 24 hours.
                      </p>
                    </motion.div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div custom={1} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">Name <span className="text-black dark:text-pink-400">*</span></label>
                        <div className="relative group/input">
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="w-full bg-transparent border border-black/15 dark:border-white/10 px-4 py-3 text-sm text-black dark:text-white placeholder-black/25 dark:placeholder-white/20 outline-none transition-all duration-300 focus:border-black dark:focus:border-pink-400 focus:shadow-[0_0_0_1px_rgba(147,51,234,0.3)] dark:focus:shadow-[0_0_0_1px_rgba(217,70,239,0.3)]"
                          />
                        </div>
                      </motion.div>

                      <motion.div custom={2} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">Email <span className="text-black dark:text-pink-400">*</span></label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className="w-full bg-transparent border border-black/15 dark:border-white/10 px-4 py-3 text-sm text-black dark:text-white placeholder-black/25 dark:placeholder-white/20 outline-none transition-all duration-300 focus:border-black dark:focus:border-pink-400 focus:shadow-[0_0_0_1px_rgba(147,51,234,0.3)] dark:focus:shadow-[0_0_0_1px_rgba(217,70,239,0.3)]"
                        />
                      </motion.div>
                    </div>

                    {/* Company */}
                    <motion.div custom={3} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">
                        Company <span className="text-black/25 dark:text-white/20 normal-case font-normal tracking-normal text-[10px]">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        className="w-full bg-transparent border border-black/15 dark:border-white/10 px-4 py-3 text-sm text-black dark:text-white placeholder-black/25 dark:placeholder-white/20 outline-none transition-all duration-300 focus:border-black dark:focus:border-pink-400 focus:shadow-[0_0_0_1px_rgba(147,51,234,0.3)] dark:focus:shadow-[0_0_0_1px_rgba(217,70,239,0.3)]"
                      />
                    </motion.div>

                    {/* Project type pills */}
                    <motion.div custom={4} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-3">
                      <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">
                        Project Type <span className="text-black/25 dark:text-white/20 normal-case font-normal tracking-normal text-[10px]">(select all that apply)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {PROJECT_TYPES.map((t) => {
                          const active = selectedTypes.includes(t);
                          return (
                            <button
                              key={t}
                              type="button"
                              onClick={() => toggleType(t)}
                              className={`group/pill relative px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase overflow-hidden border transition-all duration-300 ${
                                active
                                  ? "border-black dark:border-pink-400 text-white"
                                  : "border-black/15 dark:border-white/10 text-black/60 dark:text-white/50 hover:border-black/50 dark:hover:border-pink-400/50"
                              }`}
                            >
                              {active && (
                                <span className="absolute inset-0 bg-black dark:bg-pink-500" />
                              )}
                              <span className="relative z-10">{t}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Budget pills */}
                    <motion.div custom={4.5} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-3">
                      <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">
                        Estimated Budget <span className="text-black/25 dark:text-white/20 normal-case font-normal tracking-normal text-[10px]">(optional)</span>
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {BUDGET_RANGES.map((b) => {
                          const active = budget === b;
                          return (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setBudget(active ? null : b)}
                              className={`group/pill relative px-4 py-2 text-xs font-bold tracking-[0.15em] uppercase overflow-hidden border transition-all duration-300 ${
                                active
                                  ? "border-black dark:border-pink-400 text-white"
                                  : "border-black/15 dark:border-white/10 text-black/60 dark:text-white/50 hover:border-black/50 dark:hover:border-pink-400/50"
                              }`}
                            >
                              {active && (
                                <span className="absolute inset-0 bg-black dark:bg-pink-500" />
                              )}
                              <span className="relative z-10">{b}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Message */}
                    <motion.div custom={5} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">
                        Tell Us About Your Project <span className="text-black dark:text-pink-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe what you want to build, your goals, timeline, budget…"
                        className="w-full bg-transparent border border-black/15 dark:border-white/10 px-4 py-3 text-sm text-black dark:text-white placeholder-black/25 dark:placeholder-white/20 outline-none resize-none transition-all duration-300 focus:border-black dark:focus:border-pink-400 focus:shadow-[0_0_0_1px_rgba(147,51,234,0.3)] dark:focus:shadow-[0_0_0_1px_rgba(217,70,239,0.3)]"
                      />
                    </motion.div>

                    {/* File upload */}
                    <motion.div custom={5.5} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">
                        Attachment <span className="text-black/25 dark:text-white/20 normal-case font-normal tracking-normal text-[10px]">(briefing, moodboard, current site — optional)</span>
                      </label>
                      <label
                        htmlFor="file-upload"
                        className="w-full flex items-center gap-3 bg-transparent border border-dashed border-black/20 dark:border-white/15 px-4 py-3 text-sm cursor-pointer transition-all duration-300 hover:border-black dark:hover:border-pink-400 group/file"
                      >
                        <span className="flex items-center justify-center w-8 h-8 border border-black/10 dark:border-white/10 text-black/40 dark:text-white/40 group-hover/file:text-black dark:group-hover/file:text-pink-400 group-hover/file:border-black dark:group-hover/file:border-pink-400 transition-all shrink-0">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                          </svg>
                        </span>
                        <span className="text-black/50 dark:text-white/40 truncate">
                          {file ? file.name : "Click to attach a file (max 10MB)"}
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
                          setError("Verification failed to load. Please refresh and try again.");
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
                        className="group/btn relative w-full inline-flex items-center justify-center gap-3 border border-black dark:border-white bg-transparent px-10 py-4 text-sm font-bold text-black dark:text-white tracking-widest uppercase overflow-hidden hover:border-black dark:hover:border-pink-500 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <span className="absolute inset-0 -z-10 bg-black dark:bg-pink-500 [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]" />
                        <span className="group-hover/btn:text-white transition-colors duration-300 relative z-10">
                          {sending ? "Sending…" : "Send Message"}
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
                      <p className="mt-3 text-[10px] text-black/30 dark:text-white/25 text-center tracking-wide">
                        Protected by Cloudflare Turnstile · We respect your privacy
                      </p>
                    </motion.div>
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
            <span className="w-10 h-px bg-black dark:bg-pink-400"></span>
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-black dark:text-pink-400 font-[family-name:var(--font-geist-mono)]">
              FAQ
            </span>
            <span className="w-10 h-px bg-black dark:bg-pink-400"></span>
          </motion.div>

          <div className="flex flex-col gap-3">
            {FAQ_ITEMS.map((item, i) => {
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
                      className="shrink-0 flex items-center justify-center w-7 h-7 border border-black/15 dark:border-white/15 text-black dark:text-pink-400"
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
