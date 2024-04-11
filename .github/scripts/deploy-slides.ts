import fs from "node:fs";
import path from "node:path";
import { $ } from "bun";

const rootDir = await $`git rev-parse --show-toplevel`.text();
const distDir = path.join(rootDir, "dist");
const slidesDir = path.join(rootDir, "slides");

for (const dir of fs.readdirSync(slidesDir)) {
  const slideDistDir = path.join(slidesDir, dir, "dist");
}
