"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Loading Screen — Flipping counter 00 → 100
   Only shows on very first page load per session
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const STEPS = [0, 4, 14, 28, 43, 61, 76, 88, 96, 100];
const STEP_DURATION = 250;
const HOLD_END = 600;
const EXIT_DURATION = 1000;

export default function LoadingScreen() {
  const [show, setShow] = useState<boolean | null>(null);
  const [counter, setCounter] = useState(0);
  const [phase, setPhase] = useState<"counting" | "done" | "exit">("counting");
  const [mounted, setMounted] = useState(false);

  // Only show once per session
  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("nb-loaded")) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, []);

  // Counting steps
  useEffect(() => {
    if (!show) return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx >= STEPS.length) {
        clearInterval(interval);
        setCounter(100);
        setPhase("done");
        return;
      }
      setCounter(STEPS[idx]);
    }, STEP_DURATION);
    return () => clearInterval(interval);
  }, [show]);

  // Hold at 100 then exit
  useEffect(() => {
    if (counter === 100) {
      const t1 = setTimeout(() => setPhase("exit"), HOLD_END);
      const t2 = setTimeout(() => {
        sessionStorage.setItem("nb-loaded", "true");
        setShow(false);
      }, HOLD_END + EXIT_DURATION);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [counter]);

  // If we shouldn't show it at all, just return early.
  if (show === false) return null;
  // If ssr/unmounted, just show the solid background
  if (!mounted) return <div className="fixed inset-0 z-9999 bg-white dark:bg-[#111111]" />;

  const progress = counter / 100;

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white dark:bg-[#111111] overflow-hidden"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.85, 0, 0.15, 1] }}
        >
          {/* Subtle radial glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: progress * 0.6 }}
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(147,51,234,0.1) 0%, transparent 60%)",
            }}
          />

          {/* Progress bar at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/5 dark:bg-white/5">
            <motion.div
              className="h-full bg-linear-to-r from-purple-600 via-fuchsia-500 to-purple-600 dark:from-fuchsia-500 dark:via-purple-400 dark:to-fuchsia-500"
              initial={{ width: "0%" }}
              animate={{ width: `${counter}%` }}
              transition={{ duration: STEP_DURATION / 1000, ease: "easeOut" }}
            />
          </div>

          {/* Flipping counter */}
          <div className="relative flex items-center justify-center p-10" style={{ perspective: "800px" }}>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={counter}
                initial={{ y: 50, opacity: 0, rotateX: -60, filter: "blur(4px)", scale: 0.9 }}
                animate={{ y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)", scale: 1 }}
                exit={{ y: -50, opacity: 0, rotateX: 60, filter: "blur(4px)", scale: 1.1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(6rem,22vw,16rem)] font-black text-black dark:text-white font-(family-name:--font-cinzel) select-none tabular-nums leading-none tracking-tighter"
                style={{
                  textShadow: `0 0 ${40 + counter}px rgba(168,85,247,${0.05 + progress * 0.25})`,
                }}
              >
                {counter}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Brand name fades in after 50% */}
          <motion.div
            className="absolute bottom-12 sm:bottom-16 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: progress > 0.4 ? 1 : 0, y: progress > 0.4 ? 0 : 10 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-lg sm:text-xl font-bold tracking-[0.35em] uppercase text-black dark:text-white font-(family-name:--font-cinzel)">
              NIGHTBLOOM
            </span>
            <span className="text-[10px] sm:text-xs font-medium tracking-[0.3em] uppercase text-purple-600/60 dark:text-fuchsia-400/60 font-(family-name:--font-geist-mono)">
              Creative Digital Agency
            </span>
          </motion.div>

          {/* Corner accents */}
          <div className="absolute top-8 left-8 w-6 h-6 border-l-[2px] border-t-[2px] border-purple-600/20 dark:border-fuchsia-400/20" />
          <div className="absolute top-8 right-8 w-6 h-6 border-r-[2px] border-t-[2px] border-purple-600/20 dark:border-fuchsia-400/20" />
          <div className="absolute bottom-8 left-8 w-6 h-6 border-l-[2px] border-b-[2px] border-purple-600/20 dark:border-fuchsia-400/20" />
          <div className="absolute bottom-8 right-8 w-6 h-6 border-r-[2px] border-b-[2px] border-purple-600/20 dark:border-fuchsia-400/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
