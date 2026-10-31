"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useLanguage } from "./LanguageProvider";
import MacBookSequence from "./macbook/MacBookSequence";


function LoopingTypewriter({ words, className = "" }: { words: string[]; className?: string }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else if (displayedText.length > 0) {
        setDisplayedText(displayedText.slice(0, -1));
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    }, isDeleting ? 50 : 80);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex, words]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[3px] h-[0.9em] bg-brand ml-1 align-middle"
      />
    </span>
  );
}

type BeatProps = {
  progress: MotionValue<number>;
  range: readonly [number, number, number, number];
  side?: "left" | "right" | "center";
  from?: "left" | "right" | "bottom";
  children: ReactNode;
  className?: string;
};

function ScrollBeat({
  progress,
  range,
  side = "left",
  from = "bottom",
  children,
  className = "",
}: BeatProps) {
  const [inStart, inEnd, outStart, outEnd] = range;
  const arrive = inStart + (inEnd - inStart) * 0.42;
  const opacity = useTransform(progress, [inStart, arrive, inEnd, outStart, outEnd], [0, 1, 1, 1, 0]);
  const scale = useTransform(progress, [inStart, arrive, inEnd, outStart, outEnd], [0.86, 1.04, 1, 1, 0.96]);
  const x = useTransform(
    progress,
    [inStart, arrive, inEnd, outStart, outEnd],
    from === "left" ? [-160, -8, 0, 0, -72] : from === "right" ? [160, 8, 0, 0, 72] : [0, 0, 0, 0, 0],
  );
  const y = useTransform(
    progress,
    [inStart, arrive, inEnd, outStart, outEnd],
    from === "bottom" ? [110, 8, 0, 0, -56] : [36, 0, 0, 0, -20],
  );
  const pointerEvents = useTransform(opacity, (value) => (value > 0.45 ? "auto" : "none"));

  const place =
    side === "center"
      ? "inset-x-0 bottom-[7%] flex justify-center px-6 text-center"
      : side === "right"
        ? "right-[clamp(1.15rem,3.5vw,3.5rem)] w-[min(22rem,28vw)] text-right max-lg:top-[40%] max-lg:right-5 max-lg:bottom-auto max-lg:left-auto max-lg:w-[min(20rem,calc(100%-2.5rem))]"
        : "left-[clamp(1.15rem,3.5vw,3.5rem)] w-[min(22rem,28vw)] text-left max-lg:top-[16%] max-lg:bottom-auto max-lg:left-5 max-lg:w-[min(20rem,calc(100%-2.5rem))]";

  return (
    <motion.div
      style={{ opacity, x, y, scale, pointerEvents }}
      className={`absolute ${place} ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const { t, lang } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const rotatingWords = [
    t("hero_word_1"),
    t("hero_word_2"),
    t("hero_word_3"),
    t("hero_word_4"),
    t("hero_word_5"),
  ];
  const [reducedMotion, setReducedMotion] = useState(false);
  const { resolvedTheme } = useTheme();
  const light = resolvedTheme === "light";
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 32,
    mass: 0.12,
    restDelta: 0.0002,
  });

  const heldProgress = useMotionValue(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className={`relative bg-white dark:bg-[#000000] ${reducedMotion ? "h-screen" : "h-[640vh]"}`}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <MacBookSequence progress={reducedMotion ? heldProgress : smoothProgress} light={light} />

        {reducedMotion ? (
          <>
            <div className="pointer-events-none absolute top-[16%] left-5 z-10 w-[min(17.5rem,calc(100%-2.5rem))] text-left lg:left-[clamp(1.15rem,3.5vw,3.5rem)]">
              <div className="pointer-events-auto">
                <StaticCopy />
              </div>
            </div>
            <div className="pointer-events-auto absolute inset-x-0 bottom-[7%] z-10 flex justify-center px-6">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Ctas />
              </div>
            </div>
          </>
        ) : (
          <div className="pointer-events-none absolute inset-0 z-10">
            <ScrollBeat progress={smoothProgress} range={[0.045, 0.08, 0.125, 0.16]} from="left" className="top-[14%] lg:top-[16%]">
              <p className="mb-4 text-[11px] font-semibold tracking-[0.42em] text-brand uppercase">{t("hero_label")}</p>
              <h1 className="text-[clamp(2.45rem,4.2vw,4.5rem)] leading-[1.02] font-bold tracking-tight text-[#071433] dark:text-white">
                {t("hero_heading_1")}
              </h1>
              <h1 className="mt-1 min-h-[1.15em] text-[clamp(2.45rem,4.2vw,4.5rem)] leading-[1.02] font-bold tracking-tight">
                <LoopingTypewriter
                  key={lang}
                  words={rotatingWords}
                  className="bg-gradient-to-r from-brand via-brand to-brand-bright bg-clip-text text-transparent"
                />
              </h1>
            </ScrollBeat>

            <ScrollBeat progress={smoothProgress} range={[0.2, 0.25, 0.34, 0.4]} side="right" from="right" className="top-[30%] lg:top-[32%]">
              <p className="ml-auto max-w-[20rem] border-r border-[#071433]/15 dark:border-white/20 pr-4 text-base leading-relaxed font-light text-[#071433]/80 dark:text-white/80 sm:text-lg">
                {t("hero_line")}
              </p>
            </ScrollBeat>

            <ScrollBeat progress={smoothProgress} range={[0.46, 0.52, 0.64, 0.7]} from="bottom" className="top-[20%] lg:top-[24%]">
              <p className="text-[11px] font-semibold tracking-[0.42em] text-brand uppercase">{t("hero_beat1_kicker")}</p>
              <p className="mt-4 max-w-[18rem] text-[clamp(2.1rem,3.3vw,3.35rem)] leading-[1.12] font-bold tracking-tight text-[#071433] dark:text-white font-(family-name:--font-cinzel)">
                {t("hero_beat1")}
              </p>
            </ScrollBeat>

            <ScrollBeat progress={smoothProgress} range={[0.74, 0.79, 0.86, 0.91]} side="right" from="right" className="top-[22%] lg:top-[26%]">
              <p className="text-[11px] font-semibold tracking-[0.42em] text-brand uppercase">{t("hero_beat2_kicker")}</p>
              <p className="mt-4 ml-auto max-w-[19rem] text-[clamp(1.85rem,2.8vw,2.75rem)] leading-[1.2] font-medium tracking-tight text-[#071433] dark:text-white/95">
                {t("hero_beat2")}
              </p>
            </ScrollBeat>

            <ScrollBeat progress={smoothProgress} range={[0.12, 0.18, 0.985, 1]} side="center" from="bottom">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Ctas />
              </div>
            </ScrollBeat>
          </div>
        )}
      </div>
    </section>
  );
}

function StaticCopy() {
  const { t } = useLanguage();
  return (
    <>
      <p className="mb-4 text-[10px] font-semibold tracking-[0.42em] text-brand uppercase">{t("hero_label")}</p>
      <h1 className="text-[clamp(2rem,3.4vw,3.6rem)] leading-[1.02] font-bold tracking-tight text-[#071433] dark:text-white">
        {t("hero_heading_1")}
      </h1>
      <p className="mt-5 max-w-[18rem] border-l border-[#071433]/15 dark:border-white/20 pl-4 text-sm leading-relaxed font-light text-[#071433]/70 dark:text-white/75">
        {t("hero_line")}
      </p>
    </>
  );
}

function Ctas() {
  const { t } = useLanguage();
  return (
    <>
      <Link
        href="/contact"
        className="group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden border border-brand bg-transparent px-7 py-3 text-xs font-bold tracking-widest text-[#071433] dark:text-white uppercase transition-all hover:border-brand-bright sm:px-8 sm:py-3.5"
      >
        <span className="absolute inset-0 -z-10 bg-brand [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)]" />
        <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">
          {t("hero_cta_primary")}
        </span>
      </Link>
      <Link
        href="/work"
        className="group/btn relative inline-flex items-center justify-center gap-2 overflow-hidden border border-[#071433]/25 dark:border-white/25 bg-transparent px-7 py-3 text-xs font-bold tracking-widest text-[#071433] dark:text-white uppercase transition-all hover:border-brand sm:px-8 sm:py-3.5"
      >
        <span className="absolute inset-0 -z-10 bg-brand [clip-path:polygon(0_0,0_0,-30%_100%,-30%_100%)] transition-[clip-path] duration-500 ease-[0.19,1,0.22,1] group-hover/btn:[clip-path:polygon(0_0,130%_0,100%_100%,-30%_100%)]" />
        <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-white">
          {t("hero_cta_secondary")}
        </span>
      </Link>
    </>
  );
}
