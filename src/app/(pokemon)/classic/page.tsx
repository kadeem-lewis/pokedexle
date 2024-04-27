import Guesses from "@/app/(pokemon)/_components/Guesses";
import ModeSwitch from "@/app/(pokemon)/_components/ModeSwitch";
import pokedex from "@/data/pokedex.json";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Classic",
  description: "Guess the Pokémon based on hints from previous guesses",
};

const GameWrapper = dynamic(
  () => import("@/app/(pokemon)/_components/GameWrapper"),
  {
    ssr: false,
  },
);

export default async function Classic() {
  return (
    <>
      <ModeSwitch href="/classic" />
      <Guesses />
      <GameWrapper pokedex={pokedex} />
    </>
  );
}
