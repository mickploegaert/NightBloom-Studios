export function sizeCanvas(canvas: HTMLCanvasElement): boolean {
  const parent = canvas.parentElement;
  if (!parent) return false;

  const cssWidth = parent.clientWidth;
  const cssHeight = parent.clientHeight;
  if (cssWidth === 0 || cssHeight === 0) return false;

  const dpr = window.devicePixelRatio || 1;
  const width = Math.max(1, Math.round(cssWidth * dpr));
  const height = Math.max(1, Math.round(cssHeight * dpr));

  canvas.style.width = `${cssWidth}px`;
  canvas.style.height = `${cssHeight}px`;
  canvas.style.imageRendering = "auto";

  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }
  return false;
}

/**
 * Contain-fit of an already prepared frame. Backdrop removal happens when
 * the frame is loaded, so scrolling only blits.
 */
export function drawFrameContain(
  ctx: CanvasRenderingContext2D,
  image: ImageBitmap,
  canvasWidth: number,
  canvasHeight: number,
) {
  const iw = image.width;
  const ih = image.height;
  if (!iw || !ih) return;

  const scale = Math.min(canvasWidth / iw, canvasHeight / ih);
  const dw = Math.max(1, Math.round(iw * scale));
  const dh = Math.max(1, Math.round(ih * scale));
  const dx = Math.round((canvasWidth - dw) / 2);
  const dy = Math.round((canvasHeight - dh) / 2);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = Math.abs(scale - 1) > 0.01;
  ctx.imageSmoothingQuality = "medium";
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(image, 0, 0, iw, ih, dx, dy, dw, dh);
}
