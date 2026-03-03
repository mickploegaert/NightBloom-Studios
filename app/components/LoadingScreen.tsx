"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   3D wireframe icosahedron
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function WireSphere({ color = "#c084fc", speed = 1 }: { color?: string; speed?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.35 * speed;
      ref.current.rotation.y = state.clock.elapsedTime * 0.5 * speed;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.7} />
    </mesh>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Mini Three.js canvas for each sphere
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
function SphereCanvas({ speed = 1 }: { speed?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[2, 2, 3]} intensity={1.5} color="#a855f7" />
      <pointLight position={[-2, -1, 2]} intensity={0.8} color="#d946ef" />
      <WireSphere color="#c084fc" speed={speed} />
    </Canvas>
  );
}

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Alleen bij volledige reload of eerste load. Geen sessionStorage guard!
    const timers = [
      setTimeout(() => setPhase(1), 800),    // show "2"
      setTimeout(() => setPhase(2), 1600),   // show "1"
      setTimeout(() => setPhase(3), 2400),   // huge spheres appear in center
      setTimeout(() => setPhase(4), 3800),   // shrink and slide to form NIGHTBLOOM
      setTimeout(() => setPhase(5), 5500),   // hold
      setTimeout(() => setPhase(6), 6100),   // begin exit
      setTimeout(() => setShow(false), 7100),
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  if (!show) return null;
  if (!mounted) {
    return <div className="fixed inset-0 z-[9999] bg-white dark:bg-[#111111] pointer-events-none" />;
  }

  const countdownNumber = phase <= 2 ? 3 - phase : null;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <AnimatePresence>
      {phase < 6 && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-[#111111]"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.85, 0, 0.15, 1] }}
        >
          {/* Countdown */}
          <AnimatePresence mode="wait">
            {countdownNumber !== null && (
              <motion.span
                key={"cd-" + countdownNumber}
                initial={{ scale: 0.3, opacity: 0, filter: "blur(18px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 1.8, opacity: 0, filter: "blur(12px)" }}
                transition={{ duration: 0.4, ease }}
                className="absolute text-[clamp(5rem,18vw,12rem)] font-bold text-black dark:text-white font-(family-name:--font-cinzel) select-none"
                style={{ textShadow: "0 0 80px rgba(168, 85, 247, 0.4)" }}
              >
                {countdownNumber}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Spheres & Text */}
          {phase >= 1 && (
            <motion.div 
              className="flex items-center justify-center select-none overflow-hidden pb-4"
              initial={{ x: "-12vw" }}
              animate={phase >= 4 ? { x: "0vw" } : { x: "-12vw" }}
              transition={{ duration: 1.0, ease }}
            >
              <motion.span
                initial={{ opacity: 0, x: -60, filter: "blur(8px)" }}
                animate={phase >= 4 ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: -60, filter: "blur(8px)" }}
                transition={{ duration: 0.9, ease }}
                className="text-[clamp(1.8rem,6.5vw,5rem)] font-bold tracking-[0.03em] text-black dark:text-white font-(family-name:--font-cinzel) leading-none"
              >
                NIGHTBL
              </motion.span>

              {/* Twee Spheres container: gigantisch en ver uit elkaar, krimp en kom samen als letter OO */}
              <motion.div
                initial={{ scale: 0, opacity: 0, gap: "12vw" }}
                animate={
                  phase >= 4 ? { scale: 1, opacity: 1, gap: "0vw", rotate: 0 } :
                  phase >= 3 ? { scale: 5, opacity: 1, gap: "10vw", rotate: -5 } :
                  { scale: 0, opacity: 0, gap: "10vw", rotate: -15 }
                }
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center justify-center shrink-0 origin-center z-20"
              >
                {/* O 1 */}
                <div className="w-[clamp(1.8rem,6.5vw,5rem)] h-[clamp(1.8rem,6.5vw,5rem)] shrink-0">
                  {phase >= 3 && <SphereCanvas speed={1} />}
                </div>

                {/* O 2 */}
                <div className="w-[clamp(1.8rem,6.5vw,5rem)] h-[clamp(1.8rem,6.5vw,5rem)] shrink-0">
                  {phase >= 3 && <SphereCanvas speed={-0.85} />}
                </div>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, x: 60, filter: "blur(8px)" }}
                animate={phase >= 4 ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 60, filter: "blur(8px)" }}
                transition={{ duration: 0.9, ease, delay: 0.05 }}
                className="text-[clamp(1.8rem,6.5vw,5rem)] font-bold tracking-[0.03em] text-black dark:text-white font-(family-name:--font-cinzel) leading-none"
              >
                M
              </motion.span>
            </motion.div>
          )}

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="absolute bottom-[38%] sm:bottom-[40%] text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-purple-600/50 dark:text-fuchsia-400/50 font-(family-name:--font-geist-mono)"
          >
            Creative Digital Agency
          </motion.p>

          {phase >= 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.08) 0%, transparent 55%)",
              }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
