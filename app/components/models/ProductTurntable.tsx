"use client";

import { Suspense, useEffect, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useProgress } from "@react-three/drei";
import { useMotionValue, type MotionValue } from "framer-motion";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import * as THREE from "three";

const DRAG_YAW = 0.0036;
const DRAG_PITCH = 0.0022;

type Props = {
  url: string;
  light?: boolean;
  progress?: MotionValue<number>;
  fit?: number;
  cameraZ?: number;
  fov?: number;
  restYaw?: number;
  restPitch?: number;
  offsetX?: number;
  offsetY?: number;
  autoYaw?: number;
  pitchMin?: number;
  pitchMax?: number;
  className?: string;
};

function Studio({ light }: { light: boolean }) {
  const { gl, scene } = useThree();

  useLayoutEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = light ? 1.05 : 1.15;
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene, light]);

  return (
    <>
      <ambientLight intensity={light ? 0.6 : 0.32} />
      <directionalLight position={[3.5, 5, 4]} intensity={light ? 2.1 : 2.4} />
      <directionalLight position={[-4, 1.5, -2]} intensity={0.3} />
    </>
  );
}

function Model({
  url,
  progress,
  fit,
  restYaw,
  restPitch,
  offsetX,
  offsetY,
  autoYaw,
  pitchMin,
  pitchMax,
}: {
  url: string;
  progress?: MotionValue<number>;
  fit: number;
  restYaw: number;
  restPitch: number;
  offsetX: number;
  offsetY: number;
  autoYaw: number;
  pitchMin: number;
  pitchMax: number;
}) {
  const gltf = useGLTF(url);
  const { gl } = useThree();
  const pivot = useRef<THREE.Group>(null);
  const spin = useRef(0);
  const auto = useRef(0);
  const drag = useRef({ on: false, x: 0, y: 0, yaw: 0, pitch: 0 });

  useLayoutEffect(() => {
    const root = gltf.scene;
    root.traverse((obj) => {
      obj.matrixAutoUpdate = true;
    });
    root.matrix.decompose(root.position, root.quaternion, root.scale);
    root.scale.setScalar(1);
    root.position.set(0, 0, 0);
    root.updateMatrix();
    root.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const longest = Math.max(size.x, size.y, size.z) || 1;
    const scale = fit / longest;
    root.scale.setScalar(scale);
    root.position.copy(center).multiplyScalar(-scale);
    root.updateMatrix();
    root.updateMatrixWorld(true);
  }, [gltf, fit]);

  useEffect(() => {
    if (!progress) return;
    spin.current = progress.get();
    return progress.on("change", (value) => {
      spin.current = value;
    });
  }, [progress]);

  useEffect(() => {
    const el = gl.domElement;
    const pointer = drag.current;
    const down = (event: PointerEvent) => {
      pointer.on = true;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      el.setPointerCapture(event.pointerId);
    };
    const move = (event: PointerEvent) => {
      if (!pointer.on) return;
      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointer.yaw += dx * DRAG_YAW;
      pointer.pitch = THREE.MathUtils.clamp(pointer.pitch + dy * DRAG_PITCH, pitchMin, pitchMax);
    };
    const up = () => {
      pointer.on = false;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [gl, pitchMin, pitchMax]);

  useFrame((_, delta) => {
    const node = pivot.current;
    if (!node) return;
    const pointer = drag.current;
    if (autoYaw) auto.current += delta * autoYaw;
    const yaw = restYaw + spin.current * Math.PI * 2 + pointer.yaw + auto.current;
    const pitch = restPitch + pointer.pitch;
    const follow = pointer.on ? 8 : 6;
    node.rotation.y = THREE.MathUtils.damp(node.rotation.y, yaw, follow, delta);
    node.rotation.x = THREE.MathUtils.damp(node.rotation.x, pitch, follow, delta);
  });

  return (
    <group ref={pivot} position={[offsetX, offsetY, 0]} rotation={[restPitch, restYaw, 0]}>
      <primitive object={gltf.scene} />
    </group>
  );
}

export default function ProductTurntable({
  url,
  light = false,
  progress,
  fit = 1.7,
  cameraZ = 5.2,
  fov = 28,
  restYaw = 0.4,
  restPitch = 0.08,
  offsetX = 0,
  offsetY = 0,
  autoYaw = 0,
  pitchMin = -0.7,
  pitchMax = 0.9,
  className = "relative h-full w-full",
}: Props) {
  const { active, progress: loaded } = useProgress();
  const held = useMotionValue(0);
  const pct = Math.round(loaded);
  useGLTF.preload(url);

  return (
    <div className={className}>
      <Canvas
        className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing"
        camera={{ position: [0, 0, cameraZ], fov }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Studio light={light} />
          <Model
            url={url}
            progress={progress ?? held}
            fit={fit}
            restYaw={restYaw}
            restPitch={restPitch}
            offsetX={offsetX}
            offsetY={offsetY}
            autoYaw={autoYaw}
            pitchMin={pitchMin}
            pitchMax={pitchMax}
          />
        </Suspense>
      </Canvas>
      {active && (
        <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
          <div className="w-28">
            <div className="h-px w-full bg-black/15 dark:bg-white/20">
              <div className="h-px bg-[#0B46FD]" style={{ width: `${pct}%` }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

