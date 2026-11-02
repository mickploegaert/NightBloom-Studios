const BACKDROP_LIMIT = 6;
const SCREEN_LIMIT = 18;

/**
 * Clears edge-connected studio black and, in dark mode, keeps the sealed
 * screen solid so the rim light cannot show through it.
 */
export function knockOutAndSolidify(
  data: Uint8ClampedArray,
  width: number,
  height: number,
  light: boolean,
): void {
  if (width < 2 || height < 2) return;
  const count = width * height;
  const dark = new Uint8Array(count);

  for (let p = 0, i = 0; p < count; p += 1, i += 4) {
    const max = data[i] > data[i + 1] ? data[i] : data[i + 1];
    dark[p] = (max > data[i + 2] ? max : data[i + 2]) <= BACKDROP_LIMIT ? 1 : 0;
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
    queue[tail] = index;
    tail += 1;
  };

  for (let px = 0; px < width; px += 1) {
    push(px, 0);
    push(px, height - 1);
  }
  for (let py = 0; py < height; py += 1) {
    push(0, py);
    push(width - 1, py);
  }

  while (head < tail) {
    const index = queue[head];
    head += 1;
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

  for (let p = 0; p < count; p += 1) {
    const i = p * 4;
    if (seen[p]) {
      data[i + 3] = 0;
      continue;
    }
    if (light) continue;
    if (data[i] <= SCREEN_LIMIT && data[i + 1] <= SCREEN_LIMIT && data[i + 2] <= SCREEN_LIMIT) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
      data[i + 3] = 255;
    }
  }
}
