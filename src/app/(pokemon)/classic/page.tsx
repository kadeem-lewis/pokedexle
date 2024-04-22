import Guesses from "@/components/Guesses";
import ModeSwitch from "@/components/ModeSwitch";
import pokedex from "@/data/pokedex.json";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Classic",
  description: "Guess the Pokémon based on hints from previous guesses",
};

const GameWrapper = dynamic(() => import("@/components/GameWrapper"), {
  ssr: false,
});

export default async function Classic() {
  return (
    <>
      <ModeSwitch href="/classic" />
      <Guesses />
      <GameWrapper pokedex={pokedex} />
    </>
  );
}
