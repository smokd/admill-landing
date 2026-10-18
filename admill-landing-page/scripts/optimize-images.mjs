// Optimizes oversized images in public/ in place (same filenames/formats).
// Usage: node scripts/optimize-images.mjs
// Static export disables Next's image optimizer, so source files must be lean.
import sharp from "sharp";
import { readFile, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const publicDir = path.resolve("public");

// width = max width in px; quality = lossy quality for jpg/webp
const jobs = [
  { file: "eng.jpg", width: 1920, quality: 80 },
  { file: "mtgs.jpg", width: 1200, quality: 78 },
  { file: "lds.jpg", width: 1200, quality: 78 },
  { file: "hh.png", width: 1200 },
  { file: "turn.png", width: 1200 },
  { file: "board.webp", width: 1200, quality: 78 },
  { file: "byd-600x338.webp", width: 1200, quality: 78 },
];

const kb = (n) => `${Math.round(n / 1024)} KB`;

for (const job of jobs) {
  const filePath = path.join(publicDir, job.file);
  const before = (await stat(filePath)).size;
  const input = await readFile(filePath);
  const base = sharp(input, { failOn: "none" }).resize({
    width: job.width,
    withoutEnlargement: true,
  });

  const ext = path.extname(job.file).toLowerCase();
  let out;
  if (ext === ".jpg" || ext === ".jpeg") {
    out = await base.jpeg({ quality: job.quality, mozjpeg: true }).toBuffer();
  } else if (ext === ".png") {
    out = await base
      .png({ compressionLevel: 9, effort: 10, palette: true, quality: 85 })
      .toBuffer();
  } else if (ext === ".webp") {
    out = await base.webp({ quality: job.quality }).toBuffer();
  } else {
    console.log(`skip ${job.file} (unsupported)`);
    continue;
  }

  if (out.length < before) {
    await writeFile(filePath, out);
    console.log(`${job.file}: ${kb(before)} -> ${kb(out.length)}`);
  } else {
    console.log(`${job.file}: kept (optimized would be larger: ${kb(out.length)} vs ${kb(before)})`);
  }
}
