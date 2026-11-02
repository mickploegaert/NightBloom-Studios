import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public/background/ezgif-7bf02b80a4e8d776-jpg");
const srcDir = path.join(root, "upscayl_png_upscayl-standard-4x_2x");
const outDir = path.join(root, "upscayl-webp");
fs.mkdirSync(outDir, { recursive: true });

const files = fs
  .readdirSync(srcDir)
  .filter((name) => name.endsWith(".png"))
  .sort();

let cursor = 0;
let done = 0;

async function worker() {
  for (;;) {
    const index = cursor;
    cursor += 1;
    if (index >= files.length) return;
    const name = files[index];
    const out = path.join(outDir, name.replace(/\.png$/, ".webp"));
    if (!fs.existsSync(out)) {
      await sharp(path.join(srcDir, name)).webp({ quality: 90, effort: 4 }).toFile(out);
    }
    done += 1;
    if (done % 25 === 0 || done === files.length) {
      console.log(`${done}/${files.length}`);
    }
  }
}

await Promise.all(Array.from({ length: 4 }, () => worker()));
console.log("webp-done");
