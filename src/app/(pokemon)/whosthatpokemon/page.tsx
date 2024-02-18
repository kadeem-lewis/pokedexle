import GameWrapper from "@/components/GameWrapper";
import Guesses from "@/components/Guesses";
import ModeSwitch from "@/components/ModeSwitch";
import pokedex from "@/data/pokedex.json";

export const metadata = {
  title: "Who's That Pokémon",
  description: "Guess the Pokémon based on the image",
};

export default async function WhosThatPokemon() {
  return (
    <>
      <ModeSwitch href="/whosthatpokemon" />
      <Guesses />
      <GameWrapper pokedex={pokedex} />
    </>
  );
}
