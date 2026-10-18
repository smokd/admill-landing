// Reports images in public/ that exceed the weight budget.
// Static export serves these files as-is, so keep sources lean.
// Usage: node scripts/check-image-budget.mjs   (or: npm run check:images)
import { readdir, stat } from "node:fs/promises";
import path from "node:path";

const dir = path.resolve("public");
const MAX_BYTES = 350 * 1024;
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif", ".svg"]);

let offenders = 0;

async function walk(current) {
  for (const entry of await readdir(current, { withFileTypes: true })) {
    const p = path.join(current, entry.name);
    if (entry.isDirectory()) {
      await walk(p);
      continue;
    }
    if (!EXTS.has(path.extname(entry.name).toLowerCase())) continue;
    const size = (await stat(p)).size;
    if (size > MAX_BYTES) {
      offenders++;
      console.log(`OVER BUDGET  ${Math.round(size / 1024)} KB  ${path.relative(process.cwd(), p)}`);
    }
  }
}

await walk(dir);
console.log(
  offenders
    ? `\n${offenders} image(s) over the ${Math.round(MAX_BYTES / 1024)} KB budget.`
    : `\nAll images within the ${Math.round(MAX_BYTES / 1024)} KB budget.`
);
process.exit(offenders ? 1 : 0);
