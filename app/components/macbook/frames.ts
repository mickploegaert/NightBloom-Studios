const FRAME_DIR = "/background/ezgif-7bf02b80a4e8d776-jpg/upscayl-webp";

/** ezgif-frame-001.webp … ezgif-frame-120.webp. Rotation only. */
export const FRAME_COUNT = 120;

export function frameSrc(index: number): string {
  const n = String(index + 1).padStart(3, "0");
  return `${FRAME_DIR}/ezgif-frame-${n}.webp`;
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

export function playbackIndices(): readonly number[] {
  return PLAYBACK;
}

/** Even steps across the turn. Repeated ezgif files are left out so the spin does not pause. */
export function progressToFrame(progress: number): number {
  if (PLAYBACK.length <= 1) return 0;
  const p = Math.min(1, Math.max(0, progress));
  const slot = Math.round(p * (PLAYBACK.length - 1));
  return PLAYBACK[slot] ?? 0;
}

/** Playback indices around a source frame. Skips the ezgif duplicate files. */
export function framesAround(index: number, behind: number, ahead: number): number[] {
  let slot = 0;
  for (let i = 0; i < PLAYBACK.length; i += 1) {
    if (PLAYBACK[i] <= index) slot = i;
    else break;
  }
  const from = Math.max(0, slot - behind);
  const to = Math.min(PLAYBACK.length - 1, slot + ahead);
  const out: number[] = [];
  for (let i = from; i <= to; i += 1) out.push(PLAYBACK[i]);
  return out;
}

export function nearestLoaded<T>(
  images: readonly (T | null)[],
  index: number,
): T | null {
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
