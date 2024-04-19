import { promises as fs } from "fs";
import path from "path";
import { parse } from "node-html-parser";

const cwd = process.cwd();
const spritesheetFilePath = path.join(
  cwd,
  "public",
  "icons",
  "spritesheet.svg",
);

const spritesheet = await fs.readFile(spritesheetFilePath, "utf8");

const root = parse(spritesheet);
const symbols = root.querySelectorAll("symbol");
const iconNames = symbols
  .map((symbol) => symbol.getAttribute("id"))
  .filter((id) => id);

if (iconNames.length === 0) {
  console.log("No symbols found in the SVG file.");
} else {
  generateTypes();
}

async function generateTypes() {
  const typeFilepath = path.join(cwd, "src", "types", "Icons.d.ts");
  const typeContent = `export type IconName = ${iconNames
    .map((name) => `"${name}"`)
    .join(" | ")};`;

  await fs.writeFile(typeFilepath, typeContent, "utf8");

  console.log(`Types generated at ${path.relative(cwd, typeFilepath)}`);
}
