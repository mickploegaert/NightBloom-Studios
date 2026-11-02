"use client";

import type { MotionValue } from "framer-motion";
import ProductTurntable from "../models/ProductTurntable";

const MODEL = "/models/source/macbook_pro_14_inch_M5.glb";

type Props = {
  progress: MotionValue<number>;
  light?: boolean;
};

export default function MacBookModel({ progress, light = false }: Props) {
  return (
    <ProductTurntable
      url={MODEL}
      light={light}
      progress={progress}
      fit={1.45}
      cameraZ={5.6}
      fov={28}
      restYaw={0.42}
      restPitch={0.62}
      offsetY={0.07}
      className="absolute inset-0 overflow-hidden bg-white dark:bg-[#000000]"
    />
  );
}
