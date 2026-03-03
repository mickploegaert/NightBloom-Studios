
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function ParticleField({ count = 800 }) {
  const points = useRef<THREE.Points>(null);

  // Generate random positions and colors for particles
  const particlesPosition = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x -= delta / 10;
      points.current.rotation.y -= delta / 15;
    }
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#D94696"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

export default function MagicalParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ParticleField count={1500} />
      </Canvas>
    </div>
  );
}
