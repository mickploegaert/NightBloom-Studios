"use client";

import { useLayoutEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const SESSION_KEY = "mk-intro-shown";

export default function LoadingScreen() {
  const [show, setShow] = useState(false);

  useLayoutEffect(() => {
    const alreadyShown = window.sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) return;

    window.sessionStorage.setItem(SESSION_KEY, "1");
    setShow(true);

    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/logos/MK.png"
              alt="MK Studios"
              width={300}
              height={170}
              priority
              className="h-24 sm:h-32 w-auto object-contain"
            />
          </motion.div>

          {/* Loading bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="absolute bottom-[40%] h-[2px] w-32 origin-left bg-gradient-to-r from-pink-400 to-pink-300"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
