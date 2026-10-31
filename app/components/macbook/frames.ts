const FRAME_DIR = "/background/ezgif-7bf02b80a4e8d776-jpg";

/** ezgif-frame-001.jpg … ezgif-frame-290.jpg */
export const FRAME_COUNT = 290;

export function frameSrc(index: number): string {
  const n = String(index + 1).padStart(3, "0");
  return `${FRAME_DIR}/ezgif-frame-${n}.jpg`;
}

export function frameSources(): string[] {
  return Array.from({ length: FRAME_COUNT }, (_, i) => frameSrc(i));
}

/** Second file of an identical pair (0-based). Ezgif repeated a frame every few steps. */
const DUPLICATE_INDEX = new Set([
  14, 20, 26, 32, 38, 43, 49, 55, 61, 67, 72, 78, 84, 90, 96, 101, 107, 113,
  119, 125, 130, 136, 142, 148, 154, 159, 165, 171, 177, 183, 188, 194, 200,
  206, 212, 217, 223, 229, 235, 241, 246, 252, 258, 264, 270, 275, 281, 287,
]);

function uniqueIndices(count: number): number[] {
  const out: number[] = [];
  for (let i = 0; i < count; i += 1) {
    if (!DUPLICATE_INDEX.has(i)) out.push(i);
  }
  return out;
}

const PLAYBACK = uniqueIndices(FRAME_COUNT);

function slotForFrame(frame: number): number {
  let slot = 0;
  for (let i = 0; i < PLAYBACK.length; i += 1) {
    if (PLAYBACK[i] <= frame) slot = i;
    else break;
  }
  return slot;
}

/**
 * Scroll progress → unique frame. Stages follow this export:
 * assembled, rotation, explode, exploded hold, close.
 * Duplicate files are skipped so a repeated JPEG is not held twice.
 */
const SCROLL_SLOTS: ReadonlyArray<readonly [number, number]> = [
  [0, slotForFrame(0)],
  [0.08, slotForFrame(18)],
  [0.42, slotForFrame(112)],
  [0.72, slotForFrame(215)],
  [1, PLAYBACK.length - 1],
];

export function progressToFrame(progress: number, count: number): number {
  if (count <= 1) return 0;
  const list = count === FRAME_COUNT ? PLAYBACK : uniqueIndices(count);
  const p = Math.min(1, Math.max(0, progress));

  let i = 0;
  while (i < SCROLL_SLOTS.length - 2 && p > SCROLL_SLOTS[i + 1][0]) i += 1;

  const [p0, s0] = SCROLL_SLOTS[i];
  const [p1, s1] = SCROLL_SLOTS[i + 1];
  const span = p1 - p0 || 1;
  const slot = s0 + ((p - p0) / span) * (s1 - s0);
  const index = Math.min(list.length - 1, Math.max(0, Math.round(slot)));
  return list[index] ?? 0;
}

export function nearestLoaded(
  images: readonly (HTMLImageElement | null)[],
  index: number,
): HTMLImageElement | null {
  if (images[index]) return images[index];
  const max = images.length;
  for (let distance = 1; distance < max; distance++) {
    const before = images[index - distance];
    if (before) return before;
    const after = images[index + distance];
    if (after) return after;
  }
  return null;
}
