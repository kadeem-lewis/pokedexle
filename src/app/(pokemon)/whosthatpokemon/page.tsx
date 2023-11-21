import GameWrapper from "@/components/GameWrapper";
import Guesses from "@/components/Guesses";
import ModeSwitch from "@/components/ModeSwitch";
import { readJson } from "@/helpers/FileSystem";

export const metadata = {
  title: "Who's That Pokémon",
  description: "Guess the Pokémon based on the image",
};


export default async function WhosThatPokemon() {
  const pokedex = await readJson("/data/pokedex.json");
  return (
    <>
      <ModeSwitch href="/whosthatpokemon"/>
      <Guesses/>
      <GameWrapper pokedex={pokedex} />
    </>
  );
}
