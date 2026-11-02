"use client";

import { useTheme } from "next-themes";
import ProductTurntable from "./ProductTurntable";

const MODEL = "/models/source/apple_iphone_18_pro_max_black.glb";

export default function PhoneModel() {
  const { resolvedTheme } = useTheme();

  return (
    <ProductTurntable
      url={MODEL}
      light={resolvedTheme === "light"}
      fit={1.95}
      cameraZ={5.1}
      fov={28}
      restYaw={Math.PI - 0.5}
      restPitch={0.14}
      offsetY={0}
      className="relative h-full w-full"
    />
  );
}
