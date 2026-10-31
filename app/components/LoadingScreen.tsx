"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const STEPS = [0, 14, 38, 64, 82, 96, 100];
const STEP_DURATION = 350;
const HOLD_END = 600;

const EASE = [0.83, 0, 0.17, 1] as const;

const INTRO_KEY = "mk-intro-seen";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);
  const [skip, setSkip] = useState(false);

  const counter = STEPS[idx];

  useEffect(() => {
    try {
      if (sessionStorage.getItem(INTRO_KEY) === "1") {
        setSkip(true);
        setVisible(false);
      }
    } catch {
      /* private mode */
    }
  }, []);

  useEffect(() => {
    if (done || skip) return;
    const interval = setInterval(() => {
      setIdx((prev) => {
        const next = prev + 1;
        if (next >= STEPS.length - 1) {
          clearInterval(interval);
          setDone(true);
          return STEPS.length - 1;
        }
        return next;
      });
    }, STEP_DURATION);
    return () => clearInterval(interval);
  }, [done, skip]);

  useEffect(() => {
    if (!done || skip) return;
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* private mode */
    }
    const timer = setTimeout(() => setVisible(false), HOLD_END);
    return () => clearTimeout(timer);
  }, [done, skip]);

  const progress = counter / 100;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-screen"
          data-intro-screen
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden bg-white dark:bg-black"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.15, ease: EASE }}
        >
          <div className="absolute top-0 right-0 left-0 h-[2px] bg-black/5 dark:bg-white/10">
            <motion.div
              className="h-full bg-brand"
              initial={{ width: "0%" }}
              animate={{ width: `${counter}%` }}
              transition={{ duration: STEP_DURATION / 1000, ease: "easeOut" }}
            />
          </div>

          <div className="relative flex h-[1.7em] w-full items-center justify-center overflow-hidden text-[clamp(5.5rem,18vw,11rem)]">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={counter}
                initial={{ y: "70%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-70%", opacity: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="block px-6 py-[0.16em] text-center leading-[1.15] font-bold tracking-tighter text-black tabular-nums dark:text-white font-(family-name:--font-cinzel)"
              >
                {counter}
              </motion.span>
            </AnimatePresence>
          </div>

          <motion.div
            className="absolute bottom-12 flex flex-col items-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: progress > 0.8 ? 1 : 0, y: progress > 0.8 ? 0 : 15 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <span className="text-sm font-black tracking-[0.4em] text-black uppercase dark:text-white font-(family-name:--font-cinzel)">
              MK Studios
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
