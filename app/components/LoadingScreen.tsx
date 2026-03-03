"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Premium Framer-Style Loading Screen 
   Always shows on refresh
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const STEPS = [0, 14, 38, 64, 82, 96, 100];
const STEP_DURATION = 350;
const HOLD_END = 600;
const EXIT_DURATION = 1000;

export default function LoadingScreen() {
  const [show, setShow] = useState<boolean>(true);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"counting" | "done" | "exit">("counting");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if we already showed the loading screen this session
    const hasLoaded = sessionStorage.getItem("hasLoadedNightbloom");
    if (hasLoaded) {
      setShow(false);
      setPhase("exit");
    } else {
      sessionStorage.setItem("hasLoadedNightbloom", "true");
    }
  }, []);

  const counter = STEPS[idx];

  // Counting steps
  useEffect(() => {
    if (!show || phase !== "counting") return;
    const interval = setInterval(() => {
      setIdx((prev) => {
        const next = prev + 1;
        if (next >= STEPS.length - 1) {
          clearInterval(interval);
          setPhase("done");
          return STEPS.length - 1;
        }
        return next;
      });
    }, STEP_DURATION);
    return () => clearInterval(interval);
  }, [show, phase]);

  // Hold at 100 then exit
  useEffect(() => {
    if (phase === "done") {
      const t1 = setTimeout(() => setPhase("exit"), HOLD_END);
      const t2 = setTimeout(() => {
        setShow(false);
      }, HOLD_END + EXIT_DURATION);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, [phase]);

  // If we shouldn't show it at all, just return early.
  if (show === false) return null;
  // If ssr/unmounted, just show the solid background
  if (!mounted) return <div className="fixed inset-0 z-9999 bg-white dark:bg-[#111111]" />;

  const progress = counter / 100;
  const framerEase = [0.83, 0, 0.17, 1] as const;

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#f8f8f8] dark:bg-[#111111]"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.2, ease: framerEase }}
        >

          {/* Progress bar at top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-black/5 dark:bg-white/5">
            <motion.div
              className="h-full bg-purple-600 dark:bg-fuchsia-500"
              initial={{ width: "0%" }}
              animate={{ width: `${counter}%` }}
              transition={{ duration: STEP_DURATION / 1000, ease: "easeOut" }}
            />
          </div>

          {/* 3D Book Page Flip Counter */}
          <div className="relative flex items-center justify-center w-full" style={{ perspective: "1500px" }}>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={counter}
                // Like a page turning from right to left
                initial={{ rotateY: 90, opacity: 0, x: 20, filter: "blur(4px)" }}
                animate={{ rotateY: 0, opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ rotateY: -90, opacity: 0, x: -20, filter: "blur(4px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-[clamp(6rem,25vw,16rem)] font-bold text-black dark:text-white font-(family-name:--font-cinzel) leading-none tabular-nums tracking-tighter"
                style={{ transformOrigin: "left center" }}
              >
                {counter}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Brand name, fades in at the end cleanly */}
          <motion.div
            className="absolute bottom-12 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: progress > 0.8 ? 1 : 0, y: progress > 0.8 ? 0 : 15 }}
            transition={{ duration: 0.8, ease: framerEase }}
          >
            <span className="text-sm font-black tracking-[0.4em] uppercase text-black dark:text-white font-(family-name:--font-cinzel)">
              NIGHTBLOOM
            </span>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
