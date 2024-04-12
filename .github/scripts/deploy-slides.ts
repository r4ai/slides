import fs from "node:fs/promises";
import path from "node:path";
import { $ } from "bun";

const rootDir = (await $`git rev-parse --show-toplevel`.text()).trim();

const distDir = path.join(rootDir, "dist");
if (await fs.exists(distDir)) {
  await fs.rm(distDir, { recursive: true });
}
await fs.mkdir(distDir);

const slidesDir = path.join(rootDir, "slides");

// cp slides/${slideDir}/dist dist/${slideDir}
for (const slideDir of await fs.readdir(slidesDir)) {
  const slideDistDir = path.join(slidesDir, slideDir, "dist");
  if (!fs.exists(slideDistDir)) {
    continue;
  }
  await fs.cp(slideDistDir, path.join(distDir, slideDir), { recursive: true });
}
