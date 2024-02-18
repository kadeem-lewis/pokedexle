import GameWrapper from "@/components/GameWrapper";
import Guesses from "@/components/Guesses";
import ModeSwitch from "@/components/ModeSwitch";
import { readJson } from "@/helpers/FileSystem";
import pokedex from "@/data/pokedex.json";

export const metadata = {
  title: "Classic",
  description: "Guess the Pokémon based on hints from previous guesses",
};

export default async function Classic() {
  return (
    <>
      <ModeSwitch href="/classic" />
      <Guesses />
      <GameWrapper pokedex={pokedex} />
    </>
  );
}
