import { knockOutAndSolidify } from "./processPixels";

type Job = {
  bitmap: ImageBitmap;
  light: boolean;
  resolve: (bitmap: ImageBitmap | null) => void;
};

const queue: Job[] = [];
const idle: Worker[] = [];
const busy = new WeakMap<Worker, Job>();
let poolReady = false;
let useMain = false;

function finish(worker: Worker, bitmap: ImageBitmap) {
  const job = busy.get(worker);
  busy.delete(worker);
  idle.push(worker);
  job?.resolve(bitmap);
  pump();
}

function ensurePool() {
  if (poolReady) return;
  poolReady = true;
  if (typeof Worker === "undefined" || typeof OffscreenCanvas === "undefined") {
    useMain = true;
    return;
  }
  try {
    for (let i = 0; i < 2; i += 1) {
      const worker = new Worker(new URL("./frameWorker.ts", import.meta.url));
      worker.onmessage = (event: MessageEvent<{ bitmap: ImageBitmap }>) => {
        finish(worker, event.data.bitmap);
      };
      worker.onerror = () => {
        const job = busy.get(worker);
        busy.delete(worker);
        worker.terminate();
        job?.resolve(null);
        useMain = true;
        pump();
      };
      idle.push(worker);
    }
  } catch {
    useMain = true;
  }
}

function processOnMain(bitmap: ImageBitmap, light: boolean): ImageBitmap {
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return bitmap;
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  knockOutAndSolidify(image.data, canvas.width, canvas.height, light);
  ctx.putImageData(image, 0, 0);
  return canvas.transferToImageBitmap();
}

function pump() {
  ensurePool();
  if (useMain) {
    const job = queue.shift();
    if (!job) return;
    job.resolve(processOnMain(job.bitmap, job.light));
    if (queue.length > 0) setTimeout(pump, 0);
    return;
  }
  while (queue.length > 0 && idle.length > 0) {
    const job = queue.shift();
    const worker = idle.pop();
    if (!job || !worker) return;
    busy.set(worker, job);
    worker.postMessage({ bitmap: job.bitmap, light: job.light }, [job.bitmap]);
  }
}

export function prepareFrame(bitmap: ImageBitmap, light: boolean): Promise<ImageBitmap | null> {
  ensurePool();
  return new Promise((resolve) => {
    queue.push({ bitmap, light, resolve });
    pump();
  });
}

export async function loadPreparedFrame(
  src: string,
  light: boolean,
  signal: AbortSignal,
): Promise<ImageBitmap | null> {
  try {
    const response = await fetch(src, { signal, cache: "force-cache" });
    if (!response.ok) return null;
    const blob = await response.blob();
    if (signal.aborted) return null;
    const bitmap = await createImageBitmap(blob, {
      resizeWidth: 1600,
      resizeQuality: "high",
    });
    if (signal.aborted) {
      bitmap.close();
      return null;
    }
    return await prepareFrame(bitmap, light);
  } catch {
    return null;
  }
}
