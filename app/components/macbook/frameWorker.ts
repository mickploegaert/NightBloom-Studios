/// <reference lib="webworker" />

import { knockOutAndSolidify } from "./processPixels";

type InMessage = { bitmap: ImageBitmap; light: boolean };

self.onmessage = (event: MessageEvent<InMessage>) => {
  const { bitmap, light } = event.data;
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    self.postMessage({ bitmap }, [bitmap]);
    return;
  }
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  knockOutAndSolidify(image.data, canvas.width, canvas.height, light);
  ctx.putImageData(image, 0, 0);
  const out = canvas.transferToImageBitmap();
  self.postMessage({ bitmap: out }, [out]);
};
