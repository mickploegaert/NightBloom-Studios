"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = {
  Services: [
    { label: "Websites", href: "#services" },
    { label: "Web Applications", href: "#services" },
    { label: "UI/UX Design", href: "#services" },
    { label: "Branding", href: "#services" },
  ],
  Company: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#portfolio" },
    { label: "Pricing", href: "#pricing" },
    { label: "Contact", href: "#contact" },
  ],
  Resources: [
    { label: "Blog", href: "#" },
    { label: "FAQ", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const socialLinks = [
  {
    label: "Discord",
    href: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
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
  const brandName = "NIGHTBLOOM".split("");

  return (
    <footer className="relative bg-[#f8f8f8] dark:bg-[#111111] pt-24 pb-8 z-10 transition-colors duration-500 border-t-[4px] border-black/30 dark:border-white/30">
      <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 xl:px-24">
        
        {/* Large Centered Logo */}
        <div className="flex justify-center mb-24 relative z-20">
          <motion.img 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/logos/logo.png" 
            alt="Nightbloom Logo" 
            className="w-48 sm:w-56 h-auto object-contain dark:invert-0 invert transition-all duration-700 hover:scale-105" 
          />
        </div>

        {/* Top Section: availability, links, socials -> Formatted like one seamless block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 pb-20 border-t-[4px] border-black/30 dark:border-white/30 pt-20">
          
          {/* Brand Intro / Availability (replaces redundant logo) */}
          <div className="md:col-span-4 flex flex-col gap-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4 tracking-tight leading-snug font-(family-name:--font-cinzel) overflow-visible py-1">
                Let&apos;s build something <br className="hidden sm:block" /> brilliant together.
              </h3>
              <a 
                href="mailto:info@nightbloom.nl" 
                className="inline-flex items-center gap-2 text-sm text-purple-600 dark:text-fuchsia-400 hover:text-purple-500 dark:hover:text-fuchsia-300 transition-all font-semibold uppercase tracking-widest group"
              >
                info@nightbloom.nl
                <span className="transform transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>

            <p className="text-sm text-black/60 dark:text-white/50 leading-relaxed font-light mt-4 border-l border-black/10 dark:border-white/10 pl-4 relative">
              Zeeland, NL.<br />
              We design and build digital experiences that inspire, connect, and grow.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="md:col-span-2">
              <h4 className="text-[11px] font-bold tracking-[0.25em] uppercase text-black/40 dark:text-white/50 mb-8 border-b border-black/10 dark:border-white/10 pb-4 inline-block pr-6">
                {category}
              </h4>
              <ul className="flex flex-col gap-4">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white transition-colors font-light relative w-fit group"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-500 dark:bg-fuchsia-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social Column */}
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
                  <span className="flex items-center justify-center w-8 h-8 border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 text-black/50 dark:text-white/50 group-hover:text-purple-600 dark:group-hover:text-fuchsia-400 dark:group-hover:bg-fuchsia-900/20 group-hover:border-purple-600 dark:group-hover:border-fuchsia-400 transition-all duration-300 group-hover:bg-purple-100">
                    {social.icon}
                  </span>
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Centerpiece: Huge Animated Brand Name anchoring the footer */}
        <div className="flex justify-center w-full pointer-events-none pb-12 select-none border-t-[4px] border-black/30 dark:border-white/30 pt-16 overflow-visible">
          <motion.div
            className="flex text-[12vw] sm:text-[11vw] leading-[1] font-bold text-black dark:text-white uppercase font-(family-name:--font-cinzel) tracking-tighter overflow-visible"
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
                className="inline-block origin-bottom text-transparent bg-clip-text bg-linear-to-b from-black to-black/40 dark:from-white dark:to-white/40 drop-shadow-2xl"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-[4px] border-black/30 dark:border-white/30 z-20 relative">
          <p className="text-[10px] font-bold text-black/40 dark:text-white/40 tracking-[0.2em] uppercase">
            &copy; 2026 NIGHTBLOOM STUDIOS. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] font-bold text-black/40 dark:text-white/40 tracking-[0.2em] uppercase flex items-center gap-2">
            MADE IN THE NETHERLANDS
          </p>
        </div>

      </div>
    </footer>
  );
}

