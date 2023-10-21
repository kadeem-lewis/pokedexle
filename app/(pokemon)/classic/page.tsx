import { Pokemon } from "@/atoms/GameAtoms";
import Gamebox from "@/components/classic/Gamebox";
import fs from "fs/promises";

export const metadata = {
  title: "Classic",
  description: "Guess the Pokémon based on hints from previous guesses",
};

async function readPokedex(): Promise<Pokemon[]> {
  try {
    const data = await fs.readFile(
      `${process.cwd()}/data/pokedex.json`,
      "utf8",
    );
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Classic() {
  const pokedex = await readPokedex();
  return <>{pokedex && <Gamebox pokedex={pokedex} />}</>;
}
