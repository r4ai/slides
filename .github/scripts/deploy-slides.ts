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
const slideDirs = await fs.readdir(slidesDir);
for (const slideDir of slideDirs) {
  const slideDistDir = path.join(slidesDir, slideDir, "dist");
  if (!fs.exists(slideDistDir)) {
    continue;
  }
  await fs.cp(slideDistDir, path.join(distDir, slideDir), { recursive: true });
}

// create index.html
const slidesHtml = slideDirs
  .map((slideDir) => {
    return `<li><a href="/slides/${slideDir}">${slideDir}</a></li>`;
  })
  .join("");
const licenseYear = () => {
  const startYear = 2024;
  const currentYear = new Date().getFullYear();
  return startYear === currentYear
    ? startYear.toString()
    : `${startYear}-${currentYear}`;
};
const indexHtml = (
  await fs.readFile(path.join(import.meta.dirname, "index.html"), "utf-8")
)
  .replaceAll("<!-- {{ slides }} -->", slidesHtml)
  .replaceAll("<!-- {{ licenseYear }} -->", licenseYear());
await fs.writeFile(path.join(distDir, "index.html"), indexHtml);
