"use client";

import { motion } from "framer-motion";
import {
  siSpotify,
  siGoogle,
  siNetflix,
  siApple,
  siAirbnb,
  siMeta,
  siDropbox,
  siShopify,
} from "simple-icons";
import { useLanguage } from "./LanguageProvider";

// Recognizable brand marks — purely illustrative "as-seen-with" style logo cloud.
const brands = [
  siSpotify,
  siGoogle,
  siNetflix,
  siApple,
  siAirbnb,
  siMeta,
  siDropbox,
  siShopify,
];

export default function LogoCloud() {
  const { lang } = useLanguage();
  // One "set" is repeated enough times to always be wider than the viewport
  // (even on ultra-wide monitors), so the -50% loop never runs out of logos
  // and shows an empty gap before it seamlessly restarts.
  const singleSet = [...brands, ...brands, ...brands, ...brands];
  const loopedBrands = [...singleSet, ...singleSet];

  return (
    <section className="relative py-14 sm:py-16 border-b border-black/10 dark:border-white/10 overflow-hidden bg-white dark:bg-transparent">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center text-[10px] font-bold tracking-[0.3em] uppercase text-black/35 dark:text-white/30 font-(family-name:--font-geist-mono) mb-9"
      >
        {lang === "nl" ? "Vertrouwd door" : "Trusted by"}
      </motion.p>

      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max items-center gap-16 sm:gap-24 will-change-transform animate-[marquee_50s_linear_infinite]">
          {loopedBrands.map((brand, i) => (
            <span
              key={`${brand.slug}-${i}`}
              title={brand.title}
              className="group shrink-0 flex items-center justify-center grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="h-6 sm:h-7 w-auto"
                style={{ ["--brand-hex" as string]: `#${brand.hex}` }}
                aria-label={brand.title}
              >
                <title>{brand.title}</title>
                <path
                  d={brand.path}
                  className="fill-black dark:fill-white group-hover:fill-[var(--brand-hex)] transition-colors duration-300"
                />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
