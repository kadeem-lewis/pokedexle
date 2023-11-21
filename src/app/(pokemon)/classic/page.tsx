import GameWrapper from "@/components/GameWrapper";
import Guesses from "@/components/Guesses";
import ModeSwitch from "@/components/ModeSwitch";
import { readJson } from "@/helpers/FileSystem";

export const metadata = {
  title: "Classic",
  description: "Guess the Pokémon based on hints from previous guesses",
};


export default async function Classic() {
  const pokedex = await readJson("/data/pokedex.json");

  return (
    <>
      <ModeSwitch href="/classic"/>
      <Guesses />
      <GameWrapper pokedex={pokedex} />
    </>
  );
}
