"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const brandName = "MK STUDIOS".split("");
  const { t, copy } = useLanguage();
  const columns = [
    {
      title: copy.footer.services,
      links: [
        { label: copy.footer.essential, href: "/websites#pricing" },
        { label: copy.footer.advanced, href: "/websites#pricing" },
        { label: copy.footer.custom, href: "/websites#pricing" },
        { label: copy.footer.shop, href: "/websites#pricing" },
      ],
    },
    {
      title: copy.footer.company,
      links: [
        { label: copy.footer.about, href: "/about" },
        { label: copy.footer.projects, href: "/work" },
        { label: copy.footer.pricing, href: "/websites#pricing" },
        { label: copy.footer.contact, href: "/contact" },
      ],
    },
    {
      title: copy.footer.resources,
      links: [{ label: copy.footer.faq, href: "/contact" }],
    },
  ];
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <footer className="relative bg-white dark:bg-black pt-24 pb-8 z-10 transition-colors duration-500 border-t border-black/10 dark:border-white/10">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        
        {/* Large Centered Logo */}
        <div className="flex justify-center mb-24 relative z-20">
          <motion.img 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/logos/MK.png" 
            alt="MK Studios Logo" 
            className="w-48 sm:w-56 h-auto object-contain brightness-0 dark:brightness-100 transition-all duration-700 hover:scale-105" 
          />
        </div>

        {/* Top Section: availability, links, socials -> Formatted like one seamless block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-20 border-t border-black/10 dark:border-white/10 pt-20">
          
          {/* Brand Intro / Availability (replaces redundant logo) */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 tracking-tight leading-snug font-(family-name:--font-cinzel) overflow-visible py-1">
                {t("footer_tagline")}
              </h3>
              <a 
                href="mailto:info@mkstudios.nl" 
                className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand-bright transition-all font-semibold uppercase tracking-widest group"
              >
                info@mkstudios.nl
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            <p className="text-sm text-black/60 dark:text-white/50 leading-relaxed font-light mt-4 border-l border-black/10 dark:border-white/10 pl-4 relative whitespace-pre-line">
              {t("footer_location")}
            </p>

            {/* Newsletter signup */}
            <div className="mt-2">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-black/50 dark:text-white/40 mb-3">
                {t("newsletter_heading")}
              </p>
              <p className="text-xs text-black/40 dark:text-white/30 mb-4 max-w-xs">
                {t("newsletter_subtext")}
              </p>
              {status === "success" ? (
                <p className="text-sm text-brand font-semibold">
                  {t("newsletter_success")}
                </p>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex w-full max-w-xs">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("newsletter_placeholder")}
                    className="w-full min-w-0 bg-transparent border border-black/15 dark:border-white/15 px-4 py-3 text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/25 outline-none transition-all duration-300 focus:border-brand"
                  />
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    aria-label={t("newsletter_button")}
                    className="group/btn relative flex w-12 shrink-0 items-center justify-center overflow-hidden border border-l-0 border-brand bg-brand text-white disabled:opacity-40"
                  >
                    <span className="absolute inset-0 bg-brand-bright [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)]" />
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </form>
              )}
              {status === "error" && (
                <p className="text-xs text-red-500 dark:text-red-400 mt-2">{copy.contact.fail}</p>
              )}
            </div>
          </div>

          {/* Link Columns */}
          {columns.map((column) => (
            <div key={column.title} className="md:col-span-2">
              <h4 className="text-[11px] font-bold tracking-[0.25em] uppercase text-black/40 dark:text-white/50 mb-8 border-b border-black/10 dark:border-white/10 pb-4 inline-block pr-6">
                {column.title}
              </h4>
              <ul className="flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors font-light relative w-fit group"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-bold tracking-[0.25em] uppercase text-black/40 dark:text-white/50 mb-8 border-b border-black/10 dark:border-white/10 pb-4 inline-block pr-6">
              Socials
            </h4>
            <div className="flex flex-col gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="flex items-center gap-3 text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-all font-light group w-fit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="flex items-center justify-center w-8 h-8 border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-black/50 dark:text-white/50 group-hover:text-brand group-hover:bg-brand/15 group-hover:border-brand transition-all duration-300">
                    {social.icon}
                  </span>
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Centerpiece: Huge Animated Brand Name anchoring the footer */}
        <div className="flex justify-center w-full pointer-events-none pb-12 select-none border-t border-black/10 dark:border-white/10 pt-16 overflow-visible">
          <motion.div
            className="flex text-[12vw] sm:text-[11vw] leading-[1] font-bold text-black dark:text-white uppercase font-(family-name:--font-brand) tracking-tighter overflow-visible"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.08 }
              }
            }}
          >
            {brandName.map((letter, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 150, scale: 0.8 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", damping: 15, stiffness: 100 } }
                }}
                className="inline-block origin-bottom text-transparent bg-clip-text bg-gradient-to-b from-black to-black/40 dark:from-white dark:to-white/40 drop-shadow-2xl"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/10 dark:border-white/10 z-20 relative">
          <p className="text-[10px] font-bold text-black/40 dark:text-white/40 tracking-[0.2em] uppercase">
            &copy; 2026 MK STUDIOS. {t("footer_rights")}
          </p>
          <p className="text-[10px] font-bold text-black/40 dark:text-white/40 tracking-[0.2em] uppercase flex items-center gap-2">
            {t("footer_made_in")}
          </p>
        </div>

      </div>
    </footer>
  );
}

