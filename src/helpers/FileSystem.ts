import type { Pokemon } from "@/atoms/GameAtoms";
import { promises as fs } from "fs";
import path from "path";

export async function readJson(filePath: string): Promise<Pokemon[]> {
  try {
    const segments = filePath.split("/");
    const fullPath = path.join(process.cwd(), "src", ...segments);
    const data = await fs.readFile(fullPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}
