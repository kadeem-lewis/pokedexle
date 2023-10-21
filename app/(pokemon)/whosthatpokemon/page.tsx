import { Pokemon } from "@/atoms/GameAtoms";
import Gamebox from "@/components/whosthatpokemon/Gamebox";
import fs from "fs/promises"

export const metadata = {
  title: "Who's That Pokémon",
  description: "Guess the Pokémon based on the image",
};

async function readPokedex():Promise<Pokemon[]>{
  try {
    const data = await fs.readFile(`${process.cwd()}/data/pokedex.json`, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error)
    return []
  }
}
export default async function WhosThatPokemon() {
  const pokedex = await readPokedex()
  return (
    <>
      <Gamebox pokedex={pokedex} />
    </>
  );
}
