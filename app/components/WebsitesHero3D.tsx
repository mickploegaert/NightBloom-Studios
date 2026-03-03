"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

/* ─── Orbiting particle ring ─── */
function ParticleRing({ count = 200, radius = 2.8, color = "#a855f7" }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = radius + (Math.random() - 0.5) * 0.6;
      const y = (Math.random() - 0.5) * 0.4;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * r;
    }
    return pos;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.15;
      ref.current.rotation.x = Math.sin(Date.now() * 0.0003) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.03}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Floating dust particles ─── */
function FloatingDust({ count = 120 }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#d946ef"
        size={0.02}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Crystal core — morphing icosahedron ─── */
function CrystalCore({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} scale={1.6}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={isDark ? "#9333ea" : "#7c3aed"}
          roughness={isDark ? 0.1 : 0.3}
          metalness={isDark ? 0.9 : 0.6}
          distort={0.3}
          speed={2}
          transparent
          opacity={isDark ? 0.9 : 0.7}
        />
      </mesh>
    </Float>
  );
}

/* ─── Wireframe outer shell ─── */
function WireShell({ isDark }: { isDark: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <mesh ref={ref} scale={2.2}>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial
        color={isDark ? "#c084fc" : "#7c3aed"}
        wireframe
        transparent
        opacity={isDark ? 0.18 : 0.25}
      />
    </mesh>
  );
}

/* ─── Adapt scene background to theme ─── */
function SceneBackground({ isDark }: { isDark: boolean }) {
  const { scene } = useThree();
  scene.background = null; // Always transparent
  return null;
}

/* ─── Scene composition ─── */
function Scene({ isDark }: { isDark: boolean }) {
  return (
    <>
      <SceneBackground isDark={isDark} />
      <ambientLight intensity={isDark ? 0.3 : 0.8} />
      <pointLight position={[5, 5, 5]} intensity={isDark ? 1.2 : 1.5} color={isDark ? "#a855f7" : "#9333ea"} />
      <pointLight position={[-5, -3, -5]} intensity={isDark ? 0.8 : 1.0} color={isDark ? "#d946ef" : "#a855f7"} />
      <pointLight position={[0, 3, -3]} intensity={isDark ? 0.5 : 0.7} color={isDark ? "#6366f1" : "#7c3aed"} />

      {isDark && <CrystalCore isDark={isDark} />}
      <WireShell isDark={isDark} />
      <ParticleRing count={250} radius={3} color={isDark ? "#c084fc" : "#7c3aed"} />
      <ParticleRing count={150} radius={3.8} color={isDark ? "#d946ef" : "#a855f7"} />
      <FloatingDust count={150} />
    </>
  );
}

export default function WebsitesHero3D() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene isDark={isDark} />
      </Canvas>
    </div>
  );
}
