import { Pokemon } from "@/atoms/GameAtoms";
import Gamebox from "@/components/classic/Gamebox";
import { readJson } from "@/helpers/FileSystem";
import fs from "fs/promises";

export const metadata = {
  title: "Classic",
  description: "Guess the Pokémon based on hints from previous guesses",
};

export default async function Classic() {
  const pokedex = (await readJson(
    `${process.cwd()}/data/pokedex.json`,
  )) as Pokemon[];
  return <>{pokedex && <Gamebox pokedex={pokedex} />}</>;
}
