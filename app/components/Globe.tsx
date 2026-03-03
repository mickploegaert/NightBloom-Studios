"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const lineGroupRef = useRef<THREE.Group>(null!);

  // Auto-rotate
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) meshRef.current.rotation.y = t * 0.18;
    if (lineGroupRef.current) lineGroupRef.current.rotation.y = t * 0.18;
    if (glowRef.current) {
      glowRef.current.rotation.y = t * 0.18;
      (glowRef.current.material as THREE.MeshStandardMaterial).opacity =
        0.08 + Math.sin(t * 0.8) * 0.04;
    }
  });

  // Latitude/longitude grid lines — as THREE.Line primitives (avoids SVG <line> conflict)
  const lineObjects = useMemo(() => {
    const result: THREE.Line[] = [];
    const R = 1.01;

    const makeLine = (points: THREE.Vector3[], isLat: boolean) => {
      const geo = new THREE.BufferGeometry().setFromPoints(points);
      const mat = new THREE.LineBasicMaterial({
        color: isLat ? "#c026d3" : "#7c3aed",
        transparent: true,
        opacity: 0.22,
      });
      return new THREE.Line(geo, mat);
    };

    // Latitude lines (horizontal)
    for (let lat = -75; lat <= 75; lat += 15) {
      const points: THREE.Vector3[] = [];
      const phi = (lat * Math.PI) / 180;
      for (let i = 0; i <= 128; i++) {
        const theta = (i / 128) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            R * Math.cos(phi) * Math.cos(theta),
            R * Math.sin(phi),
            R * Math.cos(phi) * Math.sin(theta)
          )
        );
      }
      result.push(makeLine(points, true));
    }

    // Longitude lines (vertical meridians)
    for (let lon = 0; lon < 360; lon += 20) {
      const points: THREE.Vector3[] = [];
      const theta = (lon * Math.PI) / 180;
      for (let i = 0; i <= 128; i++) {
        const phi = (i / 128) * Math.PI - Math.PI / 2;
        points.push(
          new THREE.Vector3(
            R * Math.cos(phi) * Math.cos(theta),
            R * Math.sin(phi),
            R * Math.cos(phi) * Math.sin(theta)
          )
        );
      }
      result.push(makeLine(points, false));
    }

    return result;
  }, []);

  return (
    <group>
      {/* Core sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="#1a0a2e"
          transparent
          opacity={0.85}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Grid lines */}
      <group ref={lineGroupRef}>
        {lineObjects.map((obj, i) => (
          <primitive key={i} object={obj} />
        ))}
      </group>

      {/* Outer glow sphere */}
      <mesh ref={glowRef} scale={1.18}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#a855f7"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default function Globe() {
  return (
    <div className="relative w-full h-full min-h-[400px]">
      {/* Ambient glow behind globe */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[280px] h-[280px] rounded-full bg-purple-600/20 dark:bg-fuchsia-600/15 blur-[60px] animate-pulse" />
      </div>

      <Canvas
        camera={{ position: [0, 0, 2.6], fov: 50 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#c026d3" />
        <pointLight position={[-5, -3, -5]} intensity={0.6} color="#7c3aed" />
        <GlobeMesh />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />
      </Canvas>

      {/* Floating label underneath */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <span className="text-xs font-medium tracking-[0.3em] uppercase text-black/30 dark:text-white/25">
          Available Worldwide
        </span>
      </div>
    </div>
  );
}
