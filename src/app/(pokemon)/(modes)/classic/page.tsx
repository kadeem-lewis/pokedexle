import pokedex from "@/data/pokedex.json";
import dynamic from "next/dynamic";
import DailyGame from "./_components/DailyGame";

export const metadata = {
  title: "Classic",
  description: "Guess the Pokémon based on hints from previous guesses",
};

const GameWrapper = dynamic(
  () => import("@/app/(pokemon)/_components/GameWrapper"),
);

export default async function Classic() {
  return (
    <>
      <GameWrapper pokedex={pokedex}>
        <DailyGame />
      </GameWrapper>
    </>
  );
}
