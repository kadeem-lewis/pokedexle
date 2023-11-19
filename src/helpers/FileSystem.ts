import type { Pokemon } from "@/atoms/GameAtoms";
import { promises as fs } from "fs";

export async function readJson(path: string): Promise<Pokemon[]> {
  try {
    const fullPath = process.cwd() + "/src" + path;
    const data = await fs.readFile(fullPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}
