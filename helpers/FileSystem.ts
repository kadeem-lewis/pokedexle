import { Move, Pokemon } from "@/atoms/GameAtoms";
import fs from "fs/promises";

export async function readJson(path: string): Promise<Pokemon[] | Move[]> {
  try {
    const data = await fs.readFile(path, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}
