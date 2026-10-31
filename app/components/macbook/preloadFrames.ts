type Cancel = { cancelled: boolean };

function loadImage(src: string, cancel: Cancel, attempt = 0): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (cancel.cancelled) {
      resolve(null);
      return;
    }
    const img = new Image();
    img.decoding = "async";
    const finish = (value: HTMLImageElement | null) => {
      if (cancel.cancelled) resolve(null);
      else resolve(value);
    };
    img.onload = () => {
      if (typeof img.decode === "function") {
        img.decode().then(() => finish(img)).catch(() => finish(img));
      } else {
        finish(img);
      }
    };
    img.onerror = () => {
      if (attempt < 1 && !cancel.cancelled) {
        resolve(loadImage(src, cancel, attempt + 1));
      } else {
        finish(null);
      }
    };
    img.src = src;
  });
}

/**
 * Loads every frame once, with a small concurrency cap.
 * Failed frames stay null so the renderer can fall back to a neighbour.
 */
export function preloadFrames(
  sources: readonly string[],
  onProgress: (loaded: number, total: number) => void,
  cancel: Cancel,
  onImage?: (index: number, image: HTMLImageElement | null) => void,
): Promise<(HTMLImageElement | null)[]> {
  const images: (HTMLImageElement | null)[] = new Array(sources.length).fill(null);
  const total = sources.length;
  let loaded = 0;
  let cursor = 0;
  const concurrency = Math.min(8, total);

  const worker = async () => {
    while (!cancel.cancelled) {
      const index = cursor;
      cursor += 1;
      if (index >= total) return;
      const image = await loadImage(sources[index], cancel);
      images[index] = image;
      onImage?.(index, image);
      loaded += 1;
      if (!cancel.cancelled) onProgress(loaded, total);
    }
  };

  return Promise.all(Array.from({ length: concurrency }, () => worker())).then(() => images);
}
