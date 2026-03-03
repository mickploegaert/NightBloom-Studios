"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Turnstile } from "@marsidev/react-turnstile";

// Globe is client-only (Three.js)
const Globe = dynamic(() => import("../components/Globe"), { ssr: false });

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
            background: `radial-gradient(circle, rgba(168,85,247,${p.opacity}) 0%, rgba(217,70,239,${p.opacity * 0.5}) 50%, transparent 70%)`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

const PROJECT_TYPES = ["Website", "Webshop", "Landing Page", "Web App", "Rebranding"];

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
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const toggleType = (t: string) =>
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) return;
    setSending(true);
    // TODO: replace with your own API handler — e.g. POST /api/contact
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-white dark:bg-[#111111] overflow-hidden transition-colors duration-500">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-purple-500/10 dark:bg-fuchsia-900/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-violet-500/10 dark:bg-purple-900/10 blur-[100px]" />
      </div>

      <Particles />

      {/* Back link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-24 left-6 sm:left-10 lg:left-16 z-10"
      >
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors duration-300"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:-translate-x-1 transition-transform duration-300"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          Back
        </Link>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24 pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-10">

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="text-xs font-bold tracking-[0.3em] uppercase text-purple-600 dark:text-fuchsia-400 font-[family-name:var(--font-geist-mono)] mb-4 block">
                Contact
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight font-[family-name:var(--font-cinzel)] text-black dark:text-white">
                Let&apos;s Create
                <br />
                <span className="bg-gradient-to-r from-purple-600 via-fuchsia-500 to-violet-600 bg-clip-text text-transparent">
                  Something
                </span>
                <br />
                Magical.
              </h1>
              <p className="mt-6 text-base text-black/60 dark:text-white/50 leading-relaxed max-w-md">
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
                  label: "hello@nightbloom.nl",
                  href: "mailto:hello@nightbloom.nl",
                },
                {
                  icon: (
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  ),
                  icon2: <circle cx="12" cy="10" r="3" />,
                  label: "Amsterdam, Netherlands",
                  href: null,
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="flex items-center justify-center w-10 h-10 border border-black/10 dark:border-white/10 text-purple-600 dark:text-fuchsia-400 shrink-0">
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
                      className="text-sm text-black/60 dark:text-white/50 hover:text-purple-600 dark:hover:text-fuchsia-400 transition-colors duration-300"
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

            {/* Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-[340px] lg:h-[400px]"
            >
              <Globe />
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

            <div className="relative z-10 p-8 sm:p-10">

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
                      <div className="absolute inset-0 rounded-full bg-purple-600/20 dark:bg-fuchsia-600/20 animate-ping" />
                      <div className="w-16 h-16 rounded-full border border-purple-600 dark:border-fuchsia-500 flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-fuchsia-400">
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
                      className="mt-4 group/btn relative inline-flex items-center gap-2 border border-black dark:border-white bg-transparent px-8 py-3 text-xs font-bold text-black dark:text-white tracking-widest uppercase overflow-hidden hover:border-purple-600 dark:hover:border-fuchsia-600 transition-all"
                    >
                      <span className="absolute inset-0 -z-10 bg-purple-600 dark:bg-fuchsia-600 [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]" />
                      <span className="group-hover/btn:text-white transition-colors duration-300 relative z-10">Back to Home</span>
                    </Link>
                  </motion.div>
                ) : (
                  /* ── FORM STATE ── */
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <motion.div custom={0} variants={FIELD_VARIANTS} initial="hidden" animate="visible">
                      <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-black/40 dark:text-white/40 font-[family-name:var(--font-geist-mono)]">
                        New Project
                      </span>
                    </motion.div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <motion.div custom={1} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">Name <span className="text-purple-600 dark:text-fuchsia-400">*</span></label>
                        <div className="relative group/input">
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="w-full bg-transparent border border-black/15 dark:border-white/10 px-4 py-3 text-sm text-black dark:text-white placeholder-black/25 dark:placeholder-white/20 outline-none transition-all duration-300 focus:border-purple-600 dark:focus:border-fuchsia-500 focus:shadow-[0_0_0_1px_rgba(147,51,234,0.3)] dark:focus:shadow-[0_0_0_1px_rgba(217,70,239,0.3)]"
                          />
                        </div>
                      </motion.div>

                      <motion.div custom={2} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-2">
                        <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">Email <span className="text-purple-600 dark:text-fuchsia-400">*</span></label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@company.com"
                          className="w-full bg-transparent border border-black/15 dark:border-white/10 px-4 py-3 text-sm text-black dark:text-white placeholder-black/25 dark:placeholder-white/20 outline-none transition-all duration-300 focus:border-purple-600 dark:focus:border-fuchsia-500 focus:shadow-[0_0_0_1px_rgba(147,51,234,0.3)] dark:focus:shadow-[0_0_0_1px_rgba(217,70,239,0.3)]"
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
                        className="w-full bg-transparent border border-black/15 dark:border-white/10 px-4 py-3 text-sm text-black dark:text-white placeholder-black/25 dark:placeholder-white/20 outline-none transition-all duration-300 focus:border-purple-600 dark:focus:border-fuchsia-500 focus:shadow-[0_0_0_1px_rgba(147,51,234,0.3)] dark:focus:shadow-[0_0_0_1px_rgba(217,70,239,0.3)]"
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
                                  ? "border-purple-600 dark:border-fuchsia-500 text-white"
                                  : "border-black/15 dark:border-white/10 text-black/60 dark:text-white/50 hover:border-purple-600/50 dark:hover:border-fuchsia-500/50"
                              }`}
                            >
                              {active && (
                                <span className="absolute inset-0 bg-purple-600 dark:bg-fuchsia-600" />
                              )}
                              <span className="relative z-10">{t}</span>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>

                    {/* Message */}
                    <motion.div custom={5} variants={FIELD_VARIANTS} initial="hidden" animate="visible" className="flex flex-col gap-2">
                      <label className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40">
                        Tell Us About Your Project <span className="text-purple-600 dark:text-fuchsia-400">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe what you want to build, your goals, timeline, budget…"
                        className="w-full bg-transparent border border-black/15 dark:border-white/10 px-4 py-3 text-sm text-black dark:text-white placeholder-black/25 dark:placeholder-white/20 outline-none resize-none transition-all duration-300 focus:border-purple-600 dark:focus:border-fuchsia-500 focus:shadow-[0_0_0_1px_rgba(147,51,234,0.3)] dark:focus:shadow-[0_0_0_1px_rgba(217,70,239,0.3)]"
                      />
                    </motion.div>

                    {/* Turnstile */}
                    <motion.div custom={6} variants={FIELD_VARIANTS} initial="hidden" animate="visible">
                      <Turnstile
                        // ⚠️  Replace with your actual Cloudflare Turnstile site key
                        // Get one at: https://dash.cloudflare.com → Turnstile
                        siteKey="1x00000000000000000000AA"
                        onSuccess={(token) => setTurnstileToken(token)}
                        onExpire={() => setTurnstileToken(null)}
                        options={{
                          theme: "auto",
                          size: "normal",
                        }}
                      />
                    </motion.div>

                    {/* Submit */}
                    <motion.div custom={7} variants={FIELD_VARIANTS} initial="hidden" animate="visible">
                      <button
                        type="submit"
                        disabled={!turnstileToken || sending}
                        className="group/btn relative w-full inline-flex items-center justify-center gap-3 border border-black dark:border-white bg-transparent px-10 py-4 text-sm font-bold text-black dark:text-white tracking-widest uppercase overflow-hidden hover:border-purple-600 dark:hover:border-fuchsia-600 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <span className="absolute inset-0 -z-10 bg-purple-600 dark:bg-fuchsia-600 [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1]" />
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
      </div>
    </main>
  );
}
