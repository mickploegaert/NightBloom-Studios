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
 * Contain-fit, centered, original ratio.
 * Never draws larger than the source bitmap, so a 1280×720 frame is not blown up.
 */
export function drawFrameContain(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  canvasWidth: number,
  canvasHeight: number,
  light: boolean,
) {
  const iw = image.naturalWidth || image.width;
  const ih = image.naturalHeight || image.height;
  if (!iw || !ih) return;

  const fit = Math.min(canvasWidth / iw, canvasHeight / ih);
  const scale = Math.min(fit, 1);
  const dw = Math.max(1, Math.round(iw * scale));
  const dh = Math.max(1, Math.round(ih * scale));
  const dx = Math.round((canvasWidth - dw) / 2);
  const dy = Math.round((canvasHeight - dh) / 2);

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.imageSmoothingEnabled = scale < 0.999;
  ctx.imageSmoothingQuality = "high";
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  if (!light) {
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }
  ctx.drawImage(image, 0, 0, iw, ih, dx, dy, dw, dh);
  if (light) knockOutBackdrop(ctx, dx, dy, dw, dh);
  else crushNearBlack(ctx, dx, dy, dw, dh);
}

/** JPEG "black" is blotchy. Flatten those pixels so the backdrop is #000. */
function crushNearBlack(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  if (width < 1 || height < 1) return;
  const imageData = ctx.getImageData(x, y, width, height);
  const data = imageData.data;
  const limit = 18;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] <= limit && data[i + 1] <= limit && data[i + 2] <= limit) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(imageData, x, y);
}

/**
 * The studio backdrop is nearly black and touches the frame edge.
 * The screen is the same darkness but sealed inside the bezel, so only
 * edge-connected backdrop pixels are cleared.
 */
function knockOutBackdrop(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  if (width < 2 || height < 2) return;
  const imageData = ctx.getImageData(x, y, width, height);
  const data = imageData.data;
  const limit = 6;
  const count = width * height;
  const dark = new Uint8Array(count);

  for (let p = 0, i = 0; p < count; p++, i += 4) {
    const max = data[i] > data[i + 1] ? data[i] : data[i + 1];
    dark[p] = (max > data[i + 2] ? max : data[i + 2]) <= limit ? 1 : 0;
  }

  const seen = new Uint8Array(count);
  const queue = new Int32Array(count);
  let head = 0;
  let tail = 0;

  const push = (px: number, py: number) => {
    if (px < 0 || py < 0 || px >= width || py >= height) return;
    const index = py * width + px;
    if (seen[index] || !dark[index]) return;
    seen[index] = 1;
    queue[tail++] = index;
  };

  for (let px = 0; px < width; px++) {
    push(px, 0);
    push(px, height - 1);
  }
  for (let py = 0; py < height; py++) {
    push(0, py);
    push(width - 1, py);
  }

  while (head < tail) {
    const index = queue[head++];
    const px = index % width;
    const py = (index / width) | 0;
    push(px - 1, py);
    push(px + 1, py);
    push(px, py - 1);
    push(px, py + 1);
    push(px - 1, py - 1);
    push(px + 1, py - 1);
    push(px - 1, py + 1);
    push(px + 1, py + 1);
  }

  for (let p = 0; p < count; p++) {
    if (seen[p]) data[p * 4 + 3] = 0;
  }
  ctx.putImageData(imageData, x, y);
}
