import pokedex from "@/data/pokedex.json";
import dynamic from "next/dynamic";
import DailyGame from "./_components/DailyGame";

export const metadata = {
  title: "Who's That Pokémon",
  description: "Guess the Pokémon based on the image",
};

const GameWrapper = dynamic(
  () => import("@/app/(pokemon)/_components/GameWrapper"),
);

export default async function WhosThatPokemon() {
  return (
    <>
      <GameWrapper pokedex={pokedex}>
        <DailyGame />
      </GameWrapper>
    </>
  );
}
