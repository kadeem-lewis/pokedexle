import Guesses from "@/components/Guesses";
import ModeSwitch from "@/components/ModeSwitch";
import pokedex from "@/data/pokedex.json";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Who's That Pokémon",
  description: "Guess the Pokémon based on the image",
};

const GameWrapper = dynamic(() => import("@/components/GameWrapper"), {
  ssr: false,
});

export default async function WhosThatPokemon() {
  return (
    <>
      <ModeSwitch href="/whosthatpokemon" />
      <Guesses />
      <GameWrapper pokedex={pokedex} />
    </>
  );
}
